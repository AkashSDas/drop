import {
  Document,
  Model,
  model,
  NativeError,
  Schema,
  SchemaTypes,
} from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

/**
 * User document type
 */
export interface IUserDocument extends Document {
  username: string;
  email: string;
  dateOfBirth: Date;
  gender: "male" | "female" | "prefer not to answer";
  password: string; // password digest
  // rememberToken: string // Don't want this field in user doc

  // Below 2 fields will be used to verify user's for
  // reseting user's password OR signing up a user
  // Another way can be creating separate fields for the above tasks
  verifyToken: string | null; // Not token in true sense, but it's a random string of fixed length
  verifyExpiry: Date | null; // After this time the above token should expire

  // Cloudinary saved image
  profilePic: {
    id: string;
    URL: string;
  };

  role: "member" | "elder" | "co-leader" | "leader";

  createdAt: Date;
  updatedAt: Date;
}

type IsAuthenticated = (givenPassword: string) => Promise<boolean>;
type GetJwtToken = () => string;
type GetVerifyToken = (expiresIn: Date) => string;

// Doc (instance) related methods
interface IUser extends IUserDocument {
  isAuthenticated: IsAuthenticated;
  getJwtToken: GetJwtToken;
  getVerifyToken: GetVerifyToken;
}

// Model (static) related methods
interface IUserModel extends Model<IUser> {}

/**
 * User schema
 */
const userSchema = new Schema<IUser, IUserModel>(
  {
    username: {
      type: SchemaTypes.String,
      required: [true, "Username is required"],
      maxlength: [64, "Username is too long"],
      minlength: [2, "Username is too short"],
      trim: true,
    },
    email: {
      type: SchemaTypes.String,
      required: [true, "Email is required"],
      unique: true,
      validate: [validator.isEmail, "Invalid email address"],
    },
    dateOfBirth: {
      type: SchemaTypes.Date,
      required: [true, "Date of birth is required"],
      validate: [
        {
          validator: (v: Date) => v && validator.isDate(v.toString()),
          msg: "Invalid date format",
        },
        {
          validator: (v: Date) => {
            // User should not be of born in the future and user's age should not be more than 130years
            return (
              v &&
              v.getTime() > Date.now() * 130 * 365 * 24 * 60 * 60 * 1000 && // 130 yrs back from now
              v.getTime() < Date.now() * 1 * 24 * 60 * 60 * 1000 // current time
            );
          },
          msg: "Invalid date range",
        },
      ],
    },
    gender: {
      type: SchemaTypes.String,
      enum: ["male", "female", "prefer not to answer"],
      default: "prefer not to answer",
      required: [true, "Gender is required info"],
    },
    password: { type: SchemaTypes.String, required: true, select: false },
    verifyToken: { type: SchemaTypes.String, select: false },
    verifyExpiry: { type: SchemaTypes.Date, select: false },
    profilePic: {
      type: {
        id: { type: SchemaTypes.String, required: true },
        URL: { type: SchemaTypes.String, required: true },
      },
      required: [true, "User profile pic is required"],
      default: { id: "default", URL: process.env.DEFAULT_PROFILE_PIC_URL },
    },
    role: {
      type: SchemaTypes.String,
      enum: ["member", "elder", "co-leader", "leader"],
      default: "member",
      required: [true, "User role is required"],
    },
  },
  { timestamps: true }
);

/**
 * Encrypt user's plain text password before saving user
 */
userSchema.pre("save", async function (this: IUser, next) {
  // Only run this function if password was modified (not on other update functions)
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

/**
 * Handle error for trying to create user with duplicate email
 */
userSchema.post(
  "save",
  function (error: any, doc: IUser, next: (err?: NativeError) => void) {
    if (error.name === "MongoServerError" && error.code === 11000) {
      next(new Error(`User with ${doc.email} already exists`));
    } else {
      next();
    }
  }
);

/**
 * Validate user password with given password
 */
const isAuthenticated: IsAuthenticated = async function (
  this: IUser,
  givenPassword
) {
  return await bcrypt.compare(givenPassword, this.password);
};
userSchema.methods.isAuthenticated = isAuthenticated;

/**
 * Create and return JWT token
 */
const getJwtToken: GetJwtToken = function (this: IUser) {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};
userSchema.methods.getJwtToken = getJwtToken;

/**
 * Generate verify token
 *
 * This will be used for
 * - Verify user during signup
 * - Forgot password
 */
const getVerifyToken: GetVerifyToken = function (this: IUser, expiresIn) {
  // Generate long and random string, this will be sent to user
  // and user is excepted to sent back this token to the backend which then will be
  // hashed and then compared with this.verifyToken
  const token = crypto.randomBytes(20).toString("hex");

  // Getting a hash
  this.verifyToken = crypto.createHash("sha256").update(token).digest("hex");

  this.verifyExpiry = expiresIn;

  return token;
};
userSchema.methods.getVerifyToken = getVerifyToken;

export const User = model<IUser, IUserModel>("User", userSchema);

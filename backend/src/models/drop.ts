import { Document, model, Model, Schema, SchemaTypes, Types } from "mongoose";
import MongoPaging from "mongo-cursor-pagination";

export interface IDropDocument extends Document {
  user: Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IDrop extends IDropDocument {}
export interface IDropModel extends Model<IDrop> {}

const dropSchema = new Schema<IDrop, IDropModel>(
  {
    user: {
      type: SchemaTypes.ObjectId,
      required: [true, "Author is required"],
      ref: "User",
    },
    content: {
      type: SchemaTypes.String,
      required: [true, "Drop content is required"],
      maxlength: [2048, "Drop content is above 2048 chars, its {VALUE}"],
      minlength: [6, "Drop content is too short, it should be atleast 6 chars"],
      trim: true,
      index: true,
    },
  },
  { timestamps: true }
);

// User can modify content only before 10mins and not after that
dropSchema.pre("save", async function (this: IDrop, next) {
  const updateAllowedTill = new Date(
    new Date(this.createdAt).getTime() + 10 * 60 * 1000
  );

  if (this.isModified("content") && updateAllowedTill.getTime() > Date.now()) {
    return next();
  }

  throw Error(
    "It's already above 10mins since the drop was created, it can't be modified now"
  );
});

// User cannot delete drop after 10mins of its creation
dropSchema.pre("remove", async function (this: IDrop, next) {
  const updateAllowedTill = new Date(
    new Date(this.createdAt).getTime() + 10 * 60 * 1000
  );

  if (updateAllowedTill.getTime() > Date.now()) {
    return next();
  }

  throw Error(
    "It's already above 10mins since the drop was created, it can't be deleted now"
  );
});

// Duplicate the ID field.
dropSchema.virtual("id").get(function (this: IDrop) {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
dropSchema.set("toJSON", { virtuals: true });

// Pagination
dropSchema.plugin(MongoPaging.mongoosePlugin, { name: "paginateDrop" });

export const Drop = model<IDrop, IDropModel>("Drop", dropSchema);

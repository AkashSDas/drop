import { Document, model, Model, Schema, SchemaTypes, Types } from "mongoose";
import MongoPaging from "mongo-cursor-pagination";

interface IReDropDocument extends Document {
  user: Types.ObjectId; // user who is re-dropping the original drop
  drop: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

interface IReDrop extends IReDropDocument {}
interface IReDropModel extends Model<IReDrop> {}

const reDropSchema = new Schema<IReDrop, IReDropModel>(
  {
    user: {
      type: SchemaTypes.ObjectId,
      required: [true, "Re drop user is required"],
      ref: "User",
    },
    drop: {
      type: SchemaTypes.ObjectId,
      required: [true, "Drop is required"],
      ref: "Drop",
    },
  },
  { timestamps: true }
);

// Duplicate the ID field.
reDropSchema.virtual("id").get(function (this: IReDrop) {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
reDropSchema.set("toJSON", { virtuals: true });

// Pagination
reDropSchema.plugin(MongoPaging.mongoosePlugin, { name: "paginateReDrop" });

export const ReDrop = model<IReDrop, IReDropModel>("ReDrop", reDropSchema);

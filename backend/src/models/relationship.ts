import { Document, model, Model, Schema, SchemaTypes, Types } from "mongoose";
import MongoPaging from "mongo-cursor-pagination";

interface IRelationshipDocument extends Document {
  follower: Types.ObjectId;
  followed: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

interface IRelationship extends IRelationshipDocument {}
interface IRelationshipModel extends Model<IRelationship> {}

const relationshipSchema = new Schema<IRelationship, IRelationshipModel>(
  {
    follower: {
      type: SchemaTypes.ObjectId,
      required: [true, "Follower is required"],
      ref: "User",
    },
    followed: {
      type: SchemaTypes.ObjectId,
      required: [true, "Followed is required"],
      ref: "User",
    },
  },
  { timestamps: true }
);

// Duplicate the ID field.
relationshipSchema.virtual("id").get(function (this: IRelationship) {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
relationshipSchema.set("toJSON", { virtuals: true });

// Pagination
relationshipSchema.plugin(MongoPaging.mongoosePlugin, {
  name: "paginateRelationship",
});

export const ReDrop = model<IRelationship, IRelationshipModel>(
  "Relationship",
  relationshipSchema
);

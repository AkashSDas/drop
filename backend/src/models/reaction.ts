import { Document, model, Model, Schema, SchemaTypes, Types } from "mongoose";
import MongoPaging from "mongo-cursor-pagination";
import { reactionsData } from "../utils/reactions";

interface IReactionDocument extends Document {
  user: Types.ObjectId;
  drop: Types.ObjectId;
  reaction: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IReaction extends IReactionDocument {}
interface IReactionModel extends Model<IReaction> {}

const reactionSchema = new Schema<IReaction, IReactionModel>(
  {
    user: {
      type: SchemaTypes.ObjectId,
      required: [true, "User is required"],
      ref: "User",
    },
    drop: {
      type: SchemaTypes.ObjectId,
      required: [true, "Drop is required"],
      ref: "Drop",
    },
    reaction: {
      type: SchemaTypes.String,
      enum: {
        values: reactionsData.map((r) => r.name),
        message: "{VALUE} role is not available",
      },
      required: [true, "Reaction is required"],
    },
  },
  { timestamps: true }
);

// Duplicate the ID field.
reactionSchema.virtual("id").get(function (this: IReaction) {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
reactionSchema.set("toJSON", { virtuals: true });

// Pagination
reactionSchema.plugin(MongoPaging.mongoosePlugin, { name: "paginateReaction" });

export const Reaction = model<IReaction, IReactionModel>(
  "Reaction",
  reactionSchema
);

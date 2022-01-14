import { Document, model, Model, Schema, SchemaTypes, Types } from "mongoose";
import MongoPaging from "mongo-cursor-pagination";

interface ICommentDocument extends Document {
  user: Types.ObjectId;
  drop: Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IComment extends ICommentDocument {}
interface ICommentModel extends Model<IComment> {}

const commentSchema = new Schema<IComment, ICommentModel>(
  {
    user: {
      type: SchemaTypes.ObjectId,
      required: [true, "Comment author is required"],
      ref: "User",
    },
    drop: {
      type: SchemaTypes.ObjectId,
      required: [true, "Drop is required"],
      ref: "Drop",
    },
    content: {
      type: SchemaTypes.String,
      required: [true, "Comment content is required"],
      minlength: [1, "Comment cannot be empty"],
      maxlength: [
        1024,
        "Comment cannot be more than 1024 chars, given comment has {VALUE} chars",
      ],
    },
  },
  { timestamps: true }
);

// Duplicate the ID field.
commentSchema.virtual("id").get(function (this: IComment) {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
commentSchema.set("toJSON", { virtuals: true });

// Pagination
commentSchema.plugin(MongoPaging.mongoosePlugin, { name: "paginateComment" });

export const Comment = model<IComment, ICommentModel>("Comment", commentSchema);

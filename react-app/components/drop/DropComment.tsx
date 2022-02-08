import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import { useRouter } from "next/router";
import { selectCommentById } from "store/drop-comments/slice";
import { deleteComment } from "store/drop-comments/thunk";
import { IComment } from "store/drop-comments/types";

import { Metadata, ProfilePic } from "./DropCard";

const Actions = ({ commentId }: { commentId: string }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const style = "px-2 py-[6px] bg-card rounded-lg";

  const updateDropComment = () => router.push(`/comment/${commentId}`);
  const deleteDropComment = async () => {
    await dispatch(deleteComment(commentId));
  };
  const { isDeleting } = useAppSelector((state) =>
    selectCommentById(state.dropComments, commentId)
  );

  return (
    <div className="space-x-4 flex items-center text-[13px]">
      <button className={style} onClick={updateDropComment}>
        Update
      </button>
      <button
        className={style}
        onClick={deleteDropComment}
        disabled={isDeleting}
      >
        Delete
      </button>
    </div>
  );
};

interface Props {
  comment: IComment;
  hideActions?: boolean;
}

const DropComment = ({ comment, hideActions }: Props) => {
  const userId = useAppSelector((state) => state.user?.info?.id);

  return (
    <div className="flex space-x-4">
      <ProfilePic user={comment.user} />

      <div className="flex flex-col space-y-4 w-full">
        <div className="flex justify-between items-start">
          <Metadata
            updatedAt={comment.updatedAt}
            username={comment.user.username}
          />

          {!hideActions && userId && userId === comment.user.id ? (
            <Actions commentId={comment.id} />
          ) : null}
        </div>
        <div>{comment.content}</div>
      </div>
    </div>
  );
};

export default DropComment;

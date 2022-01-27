import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import { useRouter } from "next/router";
import { IComment } from "store/drop-comments/slice";
import { deleteCommentThunk } from "store/drop-comments/thunk";

const DropComment = ({
  comment: c,
  hideActions,
}: {
  comment: IComment;
  hideActions?: boolean;
}) => {
  const userId = useAppSelector((state) => state.user?.info?.id);
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <div className="flex space-x-4">
      <img
        className="h-[30px] w-[30px] rounded-full object-cover"
        src={c.user.profilePic.URL}
        alt={c.user.username}
      />

      <div className="flex flex-col space-y-4 w-full">
        <div className="flex justify-between items-start">
          <div className="space-x-4 flex items-center">
            <span className="font-bold text-text1">{c.user.username}</span>
            <span>-</span>
            <span>{c.updatedAt}</span>
          </div>

          {!hideActions && userId && userId === c.user.id ? (
            <div className="space-x-4 flex items-center text-[13px]">
              <button
                className="px-2 py-[6px] bg-card rounded-lg"
                onClick={() => router.push(`/comment/${c.id}`)}
              >
                Update
              </button>
              <button
                className="px-2 py-[6px] bg-card rounded-lg"
                onClick={async () => {
                  await dispatch(deleteCommentThunk(c.id));
                }}
              >
                Delete
              </button>
            </div>
          ) : null}
        </div>
        <div>{c.content}</div>
      </div>
    </div>
  );
};

export default DropComment;

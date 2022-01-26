import { IComment } from "store/drop-comments/slice";

const DropComment = ({ comment: c }: { comment: IComment }) => {
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

          <div className="space-x-4 flex items-center text-[13px]">
            <button className="px-2 py-[6px] bg-card rounded-lg">Update</button>
            <button className="px-2 py-[6px] bg-card rounded-lg">Delete</button>
          </div>
        </div>
        <div>{c.content}</div>
      </div>
    </div>
  );
};

export default DropComment;

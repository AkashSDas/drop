import { IDrop } from "store/drop/slice";
import ReactionButton from "./ReactionButton";

const DropCard = ({
  content,
  user,
  updatedAt,
  reacted,
  reactionsOnDrop,
}: IDrop) => {
  const profilePic = () => (
    <img
      className="h-[50px] w-[50px] rounded-full object-cover cursor-pointer"
      src={user.profilePic.URL}
      alt={user.username}
    />
  );

  const metadata = () => (
    <div className="space-x-2">
      <span className="font-bold text-text1">{user.username}</span>
      <span>-</span>
      <span className="font-bold">{updatedAt}</span>
    </div>
  );

  return (
    <div className="flex space-x-8">
      {profilePic()}

      <div className="flex flex-col space-y-4">
        {metadata()}
        <p>{content}</p>

        <div className="space-x-4">
          <button
            type="button"
            className={`bg-card text-[13px] px-2 pt-[6px] pb-2 rounded-md`}
          >
            💧 Drop
          </button>

          <>
            {reactionsOnDrop.map((reaction, id) => (
              <ReactionButton
                key={id}
                emoji={reaction.emoji}
                name={reaction.name}
                reacted={reacted ? true : false}
                count={reaction.count}
              />
            ))}
          </>
        </div>
      </div>
    </div>
  );
};

export default DropCard;

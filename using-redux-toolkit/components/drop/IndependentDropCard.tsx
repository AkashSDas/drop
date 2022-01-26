import { useRouter } from "next/router";
import { IDrop } from "store/drops/slice";
import ReactionButton from "./ReactionButton";

const IndependentDropCard = ({
  content,
  user,
  updatedAt,
  reacted,
  reactionsOnDrop,
  id,
}: IDrop) => {
  const router = useRouter();

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
    <div className="flex space-x-8 cursor-pointer">
      {profilePic()}

      <div className="flex flex-col space-y-4 w-full">
        {metadata()}
        <p>{content}</p>

        <div className="space-x-4">
          <button
            type="button"
            className={`bg-card text-[13px] px-2 pt-[6px] pb-2 rounded-md`}
          >
            💧 Redrop
          </button>

          <>
            {reactionsOnDrop.map((reaction, key) => (
              <ReactionButton
                key={key}
                dropId={id}
                reaction={reaction.name}
                emoji={reaction.emoji}
                reacted={
                  reacted && reacted?.reaction == reaction.name ? true : false
                }
                count={reaction.count}
                onClick={() => {}}
              />
            ))}
          </>
        </div>
      </div>
    </div>
  );
};

export default IndependentDropCard;

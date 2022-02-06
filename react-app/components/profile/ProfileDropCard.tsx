import { useAppDispatch } from "lib/hooks/store";
import { useRouter } from "next/router";
import { IDrop } from "store/drops/slice";
import { reactOnDropThunk, toggleReactionOnDropThunk, unReactDropReactionThunk } from "store/profile/thunk";

import ReactionButton from "@components/drop/ReactionButton";

const ProfileDropCard = ({
  content,
  user,
  updatedAt,
  reacted,
  reactionsOnDrop,
  id,
}: IDrop) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const profilePic = () => (
    <img
      className="h-[50px] w-[50px] rounded-full object-cover cursor-pointer"
      src={user.profilePic.URL}
      alt={user.username}
      onClick={(e) => {
        e.stopPropagation();
        router.push(`/profile/${user.id}/drops`);
      }}
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
    <div
      className="flex space-x-8 cursor-pointer"
      onClick={() => router.push(`/drops/${id}`)}
    >
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
                onClick={(e) => {
                  e.stopPropagation();

                  // Check if drop is reacted by this user
                  if (reacted) {
                    if (reacted.reaction === reaction.name) {
                      dispatch(
                        unReactDropReactionThunk({
                          dropId: id,
                          reaction: reaction.name,
                        })
                      );
                    } else {
                      dispatch(
                        toggleReactionOnDropThunk({
                          dropId: id,
                          reaction: reaction.name,
                          oldReaction: reacted.reaction,
                        })
                      );
                    }
                  } else {
                    // create new reaction and update state
                    dispatch(
                      reactOnDropThunk({ dropId: id, reaction: reaction.name })
                    );
                  }
                }}
              />
            ))}
          </>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropCard;

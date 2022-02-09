import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import { useRouter } from "next/router";
import { IDrop } from "store/drops/types";
import { selectProfileDropById } from "store/profile-drops/slice";
import { reactOnDrop, unReactOnDrop, updateProfileDropReaction } from "store/profile-drops/thunk";

import { IDropReactionButtonProps, Metadata, ProfilePic, RedropButton } from "@components/drop/DropCard";
import ReactionButton from "@components/drop/ReactionButton";

const DropReactionButton = (props: IDropReactionButtonProps) => {
  const { reaction, reacted, dropId } = props;
  const reactedStatus =
    reacted && reacted?.reaction == reaction.name ? true : false;
  const dispatch = useAppDispatch();

  const unReact = () =>
    dispatch(unReactOnDrop({ dropId, oldReaction: reaction.name }));

  const changeReaction = () =>
    dispatch(
      updateProfileDropReaction({
        newReaction: reaction.name,
        oldReaction: reacted.reaction,
        dropId,
      })
    );

  const react = () =>
    dispatch(reactOnDrop({ dropId, newReaction: reaction.name }));

  const handleClick = (e) => {
    e.stopPropagation();
    if (reacted) {
      if (reacted.reaction === reaction.name) unReact();
      else changeReaction();
    } else react();
  };

  const { updatingReaction } = useAppSelector((state) =>
    selectProfileDropById(state.profileDrops, dropId)
  );

  return (
    <ReactionButton
      dropId={dropId}
      reaction={reaction.name}
      emoji={reaction.emoji}
      reacted={reactedStatus}
      count={reaction.count}
      onClick={handleClick}
      disabled={updatingReaction}
    />
  );
};

const Reactions = ({ drop }: { drop: IDrop }) => (
  <>
    {drop.reactions.map((reaction, key) => (
      <DropReactionButton
        dropId={drop.id}
        reacted={drop.reacted}
        reaction={reaction}
      />
    ))}
  </>
);

const ProfileDropCard = ({ drop }: { drop: IDrop }) => {
  const router = useRouter();
  const navigateToDrop = () => router.push(`/drops/${drop.id}`);

  return (
    <div className="flex space-x-8 cursor-pointer" onClick={navigateToDrop}>
      <ProfilePic user={drop.user} />
      <div className="flex flex-col space-y-4 w-full">
        <Metadata username={drop.user.username} updatedAt={drop.updatedAt} />
        <p>{drop.content}</p>
        <div className="space-x-4">
          <RedropButton />
          <Reactions drop={drop} />
        </div>
      </div>
    </div>
  );
};

export default ProfileDropCard;

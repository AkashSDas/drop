import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import { reactOnDrop, unReactOnDrop, updateDropReaction } from "store/drop/thunk";
import { IDrop } from "store/drops/types";

import { IDropReactionButtonProps, Metadata, ProfilePic, RedropButton } from "./DropCard";
import ReactionButton from "./ReactionButton";

const DropReactionButton = (props: IDropReactionButtonProps) => {
  const { reaction, reacted, dropId } = props;
  const reactedStatus =
    reacted && reacted?.reaction == reaction.name ? true : false;
  const dispatch = useAppDispatch();

  const unReact = () =>
    dispatch(unReactOnDrop({ dropId, oldReaction: reaction.name }));

  const changeReaction = () =>
    dispatch(
      updateDropReaction({
        newReaction: reaction.name,
        oldReaction: reacted.reaction,
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

  const { updatingReaction } = useAppSelector((state) => state.drop.drop);

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
        key={key}
        dropId={drop.id}
        reacted={drop.reacted}
        reaction={reaction}
      />
    ))}
  </>
);

const IndependentDropCard = ({ drop }: { drop: IDrop }) => {
  const { user, updatedAt, content, id } = drop;

  return (
    <div className="flex space-x-8 cursor-pointer">
      <ProfilePic user={drop.user} />
      <div className="flex flex-col space-y-4 w-full">
        <Metadata username={user.username} updatedAt={updatedAt} />
        <p>{content}</p>
        <div className="space-x-4">
          <RedropButton />
          <Reactions drop={drop} />
        </div>
      </div>
    </div>
  );
};

export default IndependentDropCard;

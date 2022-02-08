import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import { useRouter } from "next/router";
import { selectDropById } from "store/drops/slice";
import { reactOnDrop, unReactOnDrop, updateDropReaction } from "store/drops/thunk";
import { IAuthor, IDrop, IReaction } from "store/drops/types";

import ReactionButton from "./ReactionButton";

export const ProfilePic = ({ user }: { user: IAuthor }) => {
  const router = useRouter();

  return (
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
};

export const Metadata = (metadata: { username: string; updatedAt: string }) => (
  <div className="space-x-2">
    <span className="font-bold text-text1">{metadata.username}</span>
    <span>-</span>
    <span className="font-bold">{metadata.updatedAt}</span>
  </div>
);

export const RedropButton = () => {
  const style = `bg-card text-[13px] px-2 pt-[6px] pb-2 rounded-md`;
  return (
    <button type="button" className={style}>
      💧 Redrop
    </button>
  );
};

export interface IDropReactionButtonProps {
  reaction: IReaction;
  dropId: string;
  reacted: { reaction: string; id: string } | null;
}

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
    selectDropById(state.drops, dropId)
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

const DropCard = ({ drop }: { drop: IDrop }) => {
  const router = useRouter();
  const { user, updatedAt, content, id } = drop;

  const navigateToDrop = () => router.push(`/drops/${id}`);

  return (
    <div className="flex space-x-8 cursor-pointer" onClick={navigateToDrop}>
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

export default DropCard;

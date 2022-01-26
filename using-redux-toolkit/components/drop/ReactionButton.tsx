import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import {
  reactOnDropThunk,
  toggleReactionOnDropThunk,
  unReactDropReactionThunk,
} from "store/drop/thunk";

interface Props {
  emoji: string;
  reacted: boolean;
  count: number;
  dropId: string;
  reaction: string;
}

const ReactionButton = ({ emoji, reacted, dropId, reaction, count }: Props) => {
  const bg = reacted ? "bg-secondary" : "bg-card";
  const text = reacted ? "text-text1" : "text-text2";

  const dispatch = useAppDispatch();
  const drop = useAppSelector((state) =>
    state.drops.drops.find((d) => d.id == dropId)
  );
  const togglingReaction = useAppSelector(
    (state) => state.drops.togglingReaction
  );

  return (
    <button
      type="button"
      className={`${bg} ${text} text-[13px] px-2 pt-[6px] pb-2 rounded-md`}
      disabled={togglingReaction}
      onClick={(e) => {
        e.stopPropagation();

        // Check if drop is reacted by this user
        if (drop.reacted) {
          if (drop.reacted.reaction === reaction) {
            dispatch(
              unReactDropReactionThunk({
                dropId,
                reaction,
              })
            );
          } else {
            dispatch(
              toggleReactionOnDropThunk({
                dropId,
                reaction,
                oldReaction: drop.reacted.reaction,
              })
            );
          }
        } else {
          // create new reaction and update state
          dispatch(reactOnDropThunk({ dropId, reaction }));
        }
      }}
    >
      {emoji} {count}
    </button>
  );
};

export default ReactionButton;

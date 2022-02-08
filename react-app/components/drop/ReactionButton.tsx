import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import { MouseEventHandler } from "react";

// import { reactOnDropThunk, toggleReactionOnDropThunk, unReactDropReactionThunk } from "store/drops/thunk";

interface Props {
  emoji: string;
  reacted: boolean;
  count: number;
  dropId: string;
  reaction: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
}

const ReactionButton = ({
  emoji,
  onClick,
  reacted,
  dropId,
  reaction,
  count,
  disabled,
}: Props) => {
  const bg = reacted ? "bg-secondary" : "bg-card";
  const text = reacted ? "text-text1" : "text-text2";

  const dispatch = useAppDispatch();
  // const drop = useAppSelector((state) =>
  //   state.drops.drops.find((d) => d.id == dropId)
  // );
  // const togglingReaction = useAppSelector(
  //   (state) => state.drops.togglingReaction
  // );

  return (
    <button
      type="button"
      className={`${bg} ${text} text-[13px] px-2 pt-[6px] pb-2 rounded-md`}
      disabled={disabled}
      onClick={onClick}
    >
      {emoji} {count}
    </button>
  );
};

export default ReactionButton;

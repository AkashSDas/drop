interface Props {
  emoji: string;
  name: string;
  reacted: boolean;
  count: number;
}

const ReactionButton = ({ emoji, name, reacted, count }: Props) => {
  const bg = reacted ? "bg-secondary" : "bg-card";
  const text = reacted ? "text-text1" : "text-text2";
  return (
    <button
      type="button"
      className={`${bg} ${text} text-[13px] px-2 pt-[6px] pb-2 rounded-md`}
    >
      {emoji} {name} {count}
    </button>
  );
};

export default ReactionButton;

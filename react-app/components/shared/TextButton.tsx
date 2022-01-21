import { MouseEventHandler } from "react";

interface Props {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const TextButton = ({ text, onClick }: Props) => {
  return (
    <button
      className="bg-transparent text-text2 text-[17px] font-semibold pt-2 py-[13px] px-[22px] rounded-lg hover:bg-card transition-all"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default TextButton;

import { MouseEventHandler } from "react";

interface Props {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const PrimaryButton = ({ text, onClick }: Props) => {
  return (
    <button
      className="bg-secondary text-text1 text-[17px] font-semibold pt-2 py-[13px] px-[22px] rounded-lg hover:brightness-75 transition-all"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;

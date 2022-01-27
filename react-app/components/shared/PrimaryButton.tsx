import { MouseEventHandler } from "react";
import style from "@style/shared/PrimaryButton.module.scss";

interface Props {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const PrimaryButton = ({ text, onClick }: Props) => {
  return (
    <button className={style.btn} onClick={onClick}>
      {text}
    </button>
  );
};

export default PrimaryButton;

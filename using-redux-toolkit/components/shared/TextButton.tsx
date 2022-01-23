import { MouseEventHandler } from "react";
import style from "@style/shared/TextButton.module.scss";

interface Props {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const TextButton = ({ text, onClick }: Props) => {
  return (
    <button className={style.btn} onClick={onClick}>
      {text}
    </button>
  );
};

export default TextButton;

import { MouseEventHandler } from "react";
import style from "@style/shared/TextButton.module.scss";
import RollingAnimation from "@components/animation/RollingAnimation";

interface Props {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const TextButton = ({ text, onClick }: Props) => {
  return (
    <RollingAnimation>
      <button className={style.btn} onClick={onClick}>
        {text}
      </button>
    </RollingAnimation>
  );
};

export default TextButton;

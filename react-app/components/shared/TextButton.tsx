import { MouseEventHandler } from "react";

import RollingAnimation from "@components/animation/RollingAnimation";
import style from "@style/shared/TextButton.module.scss";

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

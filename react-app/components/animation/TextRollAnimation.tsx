import styles from "@style/animations/TextRoll.module.scss";

interface Props {
  text: string;
  color: string;
}

const TextRollAnimation = ({ text, color }: Props) => {
  return (
    <span className={styles.roller}>
      <span data-text={text} style={{ "--color": color } as any}>
        {text}
      </span>
    </span>
  );
};

export default TextRollAnimation;

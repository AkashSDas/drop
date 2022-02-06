import { useAppSelector } from "lib/hooks/store";
import styles from "@style/signup/SignupButton.module.scss";
import RollingAnimation from "@components/animation/RollingAnimation";

const SignupButton = ({ isSubmitting }: { isSubmitting: boolean }) => {
  const loading = useAppSelector((state) => state.signup.loading);

  return (
    <button type="submit" disabled={isSubmitting} className={styles.btn}>
      <RollingAnimation>{loading ? "Loading..." : "Submit"}</RollingAnimation>
    </button>
  );
};

export default SignupButton;

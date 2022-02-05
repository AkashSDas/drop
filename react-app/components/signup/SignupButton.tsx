import { useAppSelector } from "lib/hooks/store";
import styles from "@style/signup/SignupButton.module.scss";

const SignupButton = ({ isSubmitting }: { isSubmitting: boolean }) => {
  const loading = useAppSelector((state) => state.signup.loading);

  return (
    <button type="submit" disabled={isSubmitting} className={styles.btn}>
      {loading ? "Loading..." : "Submit"}
    </button>
  );
};

export default SignupButton;

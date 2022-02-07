import { useAppSelector } from "lib/hooks/store";

import RollingAnimation from "@components/animation/RollingAnimation";
import styles from "@style/signup/SignupButton.module.scss";

const ForgotPasswordButton = ({ isSubmitting }: { isSubmitting: boolean }) => {
  const loading = useAppSelector((state) => state.forgotPassword.isLoading);

  return (
    <RollingAnimation>
      <button type="submit" disabled={isSubmitting} className={styles.btn}>
        {loading ? "Loading..." : "Submit"}
      </button>
    </RollingAnimation>
  );
};

export default ForgotPasswordButton;

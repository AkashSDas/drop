import { useAppSelector } from "lib/hooks/store";

import RollingAnimation from "@components/animation/RollingAnimation";
import styles from "@style/signup/SignupButton.module.scss";

interface Props {
  isSubmitting: boolean;
}

const ConfirmPasswordResetButton = ({ isSubmitting }: Props) => {
  const loading = useAppSelector(
    (state) => state.confirmPasswordReset.isLoading
  );

  return (
    <RollingAnimation>
      <button type="submit" disabled={isSubmitting} className={styles.btn}>
        {loading ? "Loading..." : "Submit"}
      </button>
    </RollingAnimation>
  );
};

export default ConfirmPasswordResetButton;

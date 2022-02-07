import LoadAnimation from "@components/animation/LoadAnimation";
import RevealAnimation from "@components/animation/RevealAnimation";
import RollingAnimation from "@components/animation/RollingAnimation";
import ConfirmPasswordResetForm from "@components/confirm-password-reset/ConfirmPasswordResetForm";
import ConfirmPasswordResetHelpLinks from "@components/confirm-password-reset/ConfirmPasswordResetHelpLinks";

const ConfirmPasswordResetPage = () => {
  return (
    <LoadAnimation delay={0.2} duration={1} initialY={60}>
      <main>
        <RevealAnimation rotate={10} y={60} duration={1}>
          <RollingAnimation>
            <h3>🤝 Confirm Forgot Password</h3>
          </RollingAnimation>
        </RevealAnimation>
        <ConfirmPasswordResetForm />
        <ConfirmPasswordResetHelpLinks />
      </main>
    </LoadAnimation>
  );
};

export default ConfirmPasswordResetPage;

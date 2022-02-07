import LoadAnimation from "@components/animation/LoadAnimation";
import RevealAnimation from "@components/animation/RevealAnimation";
import RollingAnimation from "@components/animation/RollingAnimation";
import ForgotPasswordForm from "@components/forgot-password/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  return (
    <LoadAnimation delay={0.2} duration={1} initialY={60}>
      <main>
        <RevealAnimation rotate={10} y={60} duration={1}>
          <RollingAnimation>
            <h3>🤝 Forgot Password</h3>
          </RollingAnimation>
        </RevealAnimation>
        <ForgotPasswordForm />
      </main>
    </LoadAnimation>
  );
};

export default ForgotPasswordPage;

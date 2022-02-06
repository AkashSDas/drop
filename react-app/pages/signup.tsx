import LoadAnimation from "@components/animation/LoadAnimation";
import RevealAnimation from "@components/animation/RevealAnimation";
import RollingAnimation from "@components/animation/RollingAnimation";
import SignupForm from "@components/signup/SignupForm";
import SignupHelpLinks from "@components/signup/SignupHelpLinks";

const SignupPage = () => {
  return (
    <LoadAnimation delay={0.2} duration={1} initialY={60}>
      <main>
        <RevealAnimation rotate={10} y={60} duration={1}>
          <RollingAnimation>
            <h3>🤝 Signup</h3>
          </RollingAnimation>
        </RevealAnimation>
        <SignupForm />
        <SignupHelpLinks />
      </main>
    </LoadAnimation>
  );
};

export default SignupPage;

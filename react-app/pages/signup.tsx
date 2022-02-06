import RevealAnimation from "@components/animation/RevealAnimation";
import RollingAnimation from "@components/animation/RollingAnimation";
import SignupForm from "@components/signup/SignupForm";
import SignupHelpLinks from "@components/signup/SignupHelpLinks";

const SignupPage = () => {
  return (
    <main>
      <RevealAnimation duration={1} rotate={10} y={30}>
        <RollingAnimation>
          <h3>🤝 Signup</h3>
        </RollingAnimation>
      </RevealAnimation>
      <SignupForm />
      <RevealAnimation duration={1} rotate={10} y={30}>
        <SignupHelpLinks />
      </RevealAnimation>
    </main>
  );
};

export default SignupPage;

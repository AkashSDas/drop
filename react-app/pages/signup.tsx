import RevealAnimation from "@components/animation/RevealAnimation";
import SignupForm from "@components/signup/SignupForm";
import SignupHelpLinks from "@components/signup/SignupHelpLinks";
import { motion } from "framer-motion";

const SignupPage = () => {
  return (
    <main>
      <RevealAnimation duration={1} rotate={10} y={30}>
        <h3>🤝 Signup</h3>
      </RevealAnimation>
      <SignupForm />
      <RevealAnimation duration={1} rotate={10} y={30}>
        <SignupHelpLinks />
      </RevealAnimation>
    </main>
  );
};

export default SignupPage;

import Link from "next/link";

import RevealAnimation from "@components/animation/RevealAnimation";
import RollingAnimation from "@components/animation/RollingAnimation";

const SignupHelpLinks = () => (
  <RevealAnimation rotate={10} y={60} duration={1}>
    <Link href="/login">
      <div className="cursor-pointe text-secondary cursor-pointer">
        <RollingAnimation>Already have an account</RollingAnimation>
      </div>
    </Link>
  </RevealAnimation>
);

export default SignupHelpLinks;

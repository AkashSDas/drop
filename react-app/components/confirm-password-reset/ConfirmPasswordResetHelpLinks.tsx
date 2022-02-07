import Link from "next/link";

import RevealAnimation from "@components/animation/RevealAnimation";
import RollingAnimation from "@components/animation/RollingAnimation";

const ConfirmPasswordResetHelpLinks = () => (
  <RevealAnimation rotate={10} y={60} duration={1}>
    <Link href="/forgot-password">
      <div className="cursor-pointe text-secondary cursor-pointer">
        <RollingAnimation>Forgot Password?</RollingAnimation>
      </div>
    </Link>
  </RevealAnimation>
);

export default ConfirmPasswordResetHelpLinks;

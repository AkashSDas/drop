import Link from "next/link";

import RevealAnimation from "@components/animation/RevealAnimation";
import RollingAnimation from "@components/animation/RollingAnimation";

const LoginHelpLinks = () => (
  <RevealAnimation rotate={10} y={60} duration={1}>
    <div className="space-x-4 text-secondary flex">
      <Link href="/signup">
        <span className="cursor-pointer">
          <RollingAnimation>Don't have an account?</RollingAnimation>
        </span>
      </Link>
      <Link href="/forgot-password">
        <span className="cursor-pointer">
          <RollingAnimation>Forgot Password?</RollingAnimation>
        </span>
      </Link>
    </div>
  </RevealAnimation>
);

export default LoginHelpLinks;

import RollingAnimation from "@components/animation/RollingAnimation";
import Link from "next/link";

const SignupHelpLinks = () => (
  <Link href="/login">
    <div className="cursor-pointe text-secondary cursor-pointer">
      <RollingAnimation>Already have an account</RollingAnimation>
    </div>
  </Link>
);

export default SignupHelpLinks;

import TextRollAnimation from "@components/animation/TextRollAnimation";
import Link from "next/link";

const SignupHelpLinks = () => (
  <Link href="/login">
    <div className="cursor-pointer">
      <TextRollAnimation
        text="Already have an account"
        color="rgb(58 140 255)"
      />
    </div>
  </Link>
);

export default SignupHelpLinks;

import Link from "next/link";

const SignupHelpLinks = () => (
  <div className="text-secondary">
    <Link href="/login">
      <span className="cursor-pointer">Already have an account?</span>
    </Link>
  </div>
);

export default SignupHelpLinks;

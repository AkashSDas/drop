import Link from "next/link";
import { useReducer } from "react";
import SignupForm from "@components/signup/SignupForm";
import { signupInitialState } from "@context/signup";
import { SignupContext } from "@context/signup/context";
import signupReducer from "@context/signup/reducer";

const SignupPage = () => {
  const [signup, dispatch] = useReducer(signupReducer, signupInitialState);

  return (
    <SignupContext.Provider value={{ signup, dispatch }}>
      <main className="space-y-8">
        <h3>🤝 Signup</h3>
        <SignupForm />
        <div className="space-x-4 text-secondary cursor-pointer">
          <Link href="/login">
            <span>Already have an account?</span>
          </Link>
        </div>
      </main>
    </SignupContext.Provider>
  );
};

export default SignupPage;

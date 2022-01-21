import { useReducer } from "react";
import SignupForm from "../components/signup/SignupForm";
import { signupInitialState } from "../lib/context/signup";
import { SignupContext } from "../lib/context/signup/context";
import signupReducer from "../lib/context/signup/reducer";

const SignupPage = () => {
  const [signup, dispatch] = useReducer(signupReducer, signupInitialState);

  return (
    <SignupContext.Provider value={{ signup, dispatch }}>
      <main className="space-y-8">
        <h3>🤝 Signup</h3>
        <SignupForm />
      </main>
    </SignupContext.Provider>
  );
};

export default SignupPage;

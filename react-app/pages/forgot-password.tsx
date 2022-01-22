import { useReducer } from "react";
import forgotPasswordReducer from "@context/forgot-password/reducer";
import { forgotPasswordInitialState } from "@context/forgot-password";
import { ForgotPasswordContext } from "@context/forgot-password/context";
import ForgotPasswordForm from "@components/forgot-password/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  const [forgotPassword, dispatch] = useReducer(
    forgotPasswordReducer,
    forgotPasswordInitialState
  );

  return (
    <ForgotPasswordContext.Provider value={{ forgotPassword, dispatch }}>
      <main className="space-y-8">
        <h3>🤝 Reset Password</h3>
        <ForgotPasswordForm />
      </main>
    </ForgotPasswordContext.Provider>
  );
};

export default ForgotPasswordPage;

import ConfirmResetPasswordForm from "@components/confirm-reset-password/ConfirmResetPassword";
import { confirmResetPasswordInitialState } from "@context/confirm-reset-password";
import { ConfirmResetPasswordContext } from "@context/confirm-reset-password/context";
import confirmResetPasswordReducer from "@context/confirm-reset-password/reducer";
import { useReducer } from "react";

const ConfirmResetPasswordPage = () => {
  const [confirmResetPassword, dispatch] = useReducer(
    confirmResetPasswordReducer,
    confirmResetPasswordInitialState
  );

  return (
    <ConfirmResetPasswordContext.Provider
      value={{ confirmResetPassword, dispatch }}
    >
      <main className="space-y-8">
        <h3>🤝 Confirm Password Reset</h3>
        <ConfirmResetPasswordForm />
      </main>
    </ConfirmResetPasswordContext.Provider>
  );
};

export default ConfirmResetPasswordPage;

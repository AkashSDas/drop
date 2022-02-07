import { Form, Formik } from "formik";
import { useAppDispatch } from "lib/hooks/store";
import { useRouter } from "next/router";
import { Lock, Password } from "react-iconly";
import { confirmPasswordReset } from "store/confirm-password-reset/thunk";

import IconInput from "@components/shared/IconInput";
import { RevealWrapper } from "@components/signup/SignupForm";

import ConfirmPasswordResetButton from "./ConfirmPasswordResetButton";

const ConfirmPasswordResetForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initialValues = { url: "", password: "" };

  const handleSubmit = async (value: typeof initialValues) => {
    const redirect = (await dispatch(confirmPasswordReset(value))).payload;
    if (redirect) router.push("/login");
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, handleChange, isSubmitting }) => {
        const urlInputProps = {
          type: "url",
          placeholder: "Update password url",
          name: "url",
          value: values.url,
          onChange: handleChange,
        };

        const passwordInputProps = {
          type: "password",
          placeholder: "New password",
          name: "password",
          value: values.password,
          onChange: handleChange,
        };

        return (
          <Form className="space-y-6">
            <RevealWrapper>
              <IconInput icon={<Password />} inputProps={urlInputProps} />
            </RevealWrapper>
            <RevealWrapper>
              <IconInput icon={<Lock />} inputProps={passwordInputProps} />
            </RevealWrapper>
            <RevealWrapper>
              <ConfirmPasswordResetButton isSubmitting={isSubmitting} />
            </RevealWrapper>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ConfirmPasswordResetForm;

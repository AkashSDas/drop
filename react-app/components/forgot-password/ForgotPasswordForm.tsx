import { Form, Formik } from "formik";
import { useAppDispatch } from "lib/hooks/store";
import { useRouter } from "next/router";
import { Message } from "react-iconly";
import { forgotPassword } from "store/forgot-password/thunk";

import IconInput from "@components/shared/IconInput";
import { RevealWrapper } from "@components/signup/SignupForm";

import ForgotPasswordButton from "./ForgotPasswordButton";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initialValues = { email: "" };

  const handleSubmit = async (value: typeof initialValues) => {
    const redirect = (await dispatch(forgotPassword(value))).payload;
    if (redirect) router.push("/confirm-password-reset");
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, handleChange, isSubmitting }) => (
        <Form className="space-y-6">
          <RevealWrapper>
            <IconInput
              icon={<Message />}
              inputProps={{
                type: "email",
                placeholder: "john@example.com",
                name: "email",
                value: values.email,
                onChange: handleChange,
              }}
            />
          </RevealWrapper>
          <RevealWrapper>
            <ForgotPasswordButton isSubmitting={isSubmitting} />
          </RevealWrapper>
        </Form>
      )}
    </Formik>
  );
};

export default ForgotPasswordForm;

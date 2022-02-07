import { Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import { useRouter } from "next/router";
import { Lock, Message } from "react-iconly";
import { login } from "store/login/thunk";

import IconInput from "@components/shared/IconInput";
import { RevealWrapper } from "@components/signup/SignupForm";

import LoginButton from "./LoginButton";

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initialValues = { email: "", password: "" };

  const handleSubmit = async (value: typeof initialValues) => {
    const isLoggedIn = (await dispatch(login(value))).payload;
    if (isLoggedIn) router.push("/");
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, handleChange, isSubmitting }) => {
        const emailInputProps = {
          type: "email",
          placeholder: "john@example.com",
          name: "email",
          value: values.email,
          onChange: handleChange,
        };

        const passwordInputProps = {
          type: "password",
          placeholder: "💧💧💧💧💧💧💧💧💧💧💧💧",
          name: "password",
          value: values.password,
          onChange: handleChange,
        };

        return (
          <Form className="space-y-6">
            <RevealWrapper>
              <IconInput icon={<Message />} inputProps={emailInputProps} />
            </RevealWrapper>
            <RevealWrapper>
              <IconInput icon={<Lock />} inputProps={passwordInputProps} />
            </RevealWrapper>
            <RevealWrapper>
              <LoginButton isSubmitting={isSubmitting} />
            </RevealWrapper>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;

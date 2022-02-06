import { Form, Formik } from "formik";
import { useAppDispatch } from "lib/hooks/store";
import { useRouter } from "next/router";
import { Lock, Message, User } from "react-iconly";
import { signup } from "store/signup/thunk";

import RevealAnimation from "@components/animation/RevealAnimation";
import IconInput from "@components/shared/IconInput";

import SignupButton from "./SignupButton";

const SignupForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initialValues = { username: "", email: "", password: "" };

  const handleSubmit = async (value: typeof initialValues) => {
    const isSignedIn = (await dispatch(signup(value))).payload;
    if (isSignedIn) router.push("/");
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, handleChange, isSubmitting }) => {
        const usernameInputProps = {
          type: "text",
          placeholder: "John Smith",
          name: "username",
          value: values.username,
          onChange: handleChange,
        };

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
              <IconInput icon={<User />} inputProps={usernameInputProps} />
            </RevealWrapper>
            <RevealWrapper>
              <IconInput icon={<Message />} inputProps={emailInputProps} />
            </RevealWrapper>
            <RevealWrapper>
              <IconInput icon={<Lock />} inputProps={passwordInputProps} />
            </RevealWrapper>
            <RevealWrapper>
              <SignupButton isSubmitting={isSubmitting} />
            </RevealWrapper>
          </Form>
        );
      }}
    </Formik>
  );
};

const RevealWrapper = ({ children }: { children: JSX.Element }) => (
  <RevealAnimation rotate={10} y={60} duration={1}>
    {children}
  </RevealAnimation>
);

export default SignupForm;

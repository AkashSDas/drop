import RevealAnimation from "@components/animation/RevealAnimation";
import IconInput from "@components/shared/IconInput";
import { Form, Formik } from "formik";
import { useAppDispatch } from "lib/hooks/store";
import { useRouter } from "next/router";
import { Lock, Message, User } from "react-iconly";
import { signupThunk } from "store/signup/thunk";
import SignupButton from "./SignupButton";

const SignupForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initialValues = { username: "", email: "", password: "" };

  const handleSubmit = async (value: typeof initialValues) => {
    const isSignedIn = (await dispatch(signupThunk(value))).payload;
    if (isSignedIn) router.push("/");
  };

  const animationWrapperJsx = (element: JSX.Element) => (
    <RevealAnimation duration={1} rotate={10} y={30}>
      {element}
    </RevealAnimation>
  );

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
            {animationWrapperJsx(
              <IconInput icon={<User />} inputProps={usernameInputProps} />
            )}
            {animationWrapperJsx(
              <IconInput icon={<Message />} inputProps={emailInputProps} />
            )}
            {animationWrapperJsx(
              <IconInput icon={<Lock />} inputProps={passwordInputProps} />
            )}
            {animationWrapperJsx(<SignupButton isSubmitting={isSubmitting} />)}
          </Form>
        );
      }}
    </Formik>
  );
};

export default SignupForm;

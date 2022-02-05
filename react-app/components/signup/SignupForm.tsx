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
            <IconInput icon={<User />} inputProps={usernameInputProps} />
            <IconInput icon={<Message />} inputProps={emailInputProps} />
            <IconInput icon={<Lock />} inputProps={passwordInputProps} />
            <SignupButton isSubmitting={isSubmitting} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default SignupForm;

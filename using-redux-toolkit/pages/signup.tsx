import IconInput from "@components/shared/IconInput";
import { Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import Link from "next/link";
import { useRouter } from "next/router";
import { Lock, Message, User } from "react-iconly";
import { signupThunk } from "store/signup/thunk";

const SignupPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.signup.loading);

  const handleSubmit = async (value) => {
    const isSignedIn = (await dispatch(signupThunk(value))).payload;
    if (isSignedIn) router.push("/");
  };

  return (
    <main>
      <h3>🤝 Signup</h3>

      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form className="space-y-6">
            <IconInput
              icon={<User />}
              inputProps={{
                type: "text",
                placeholder: "John Smith",
                name: "username",
                value: values.username,
                onChange: handleChange,
              }}
            />
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
            <IconInput
              icon={<Lock />}
              inputProps={{
                type: "password",
                placeholder: "💧💧💧💧💧💧💧💧💧💧💧💧",
                name: "password",
                value: values.password,
                onChange: handleChange,
              }}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-secondary text-text1 text-[17px] font-semibold pt-2 py-[13px] px-[22px] rounded-lg hover:brightness-75 transition-all"
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>

      <div className="space-x-4 text-secondary">
        <Link href="/login">
          <span className="cursor-pointer">Already have an account?</span>
        </Link>
      </div>
    </main>
  );
};

export default SignupPage;

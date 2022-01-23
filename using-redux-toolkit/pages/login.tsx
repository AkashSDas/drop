import IconInput from "@components/shared/IconInput";
import { Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "hooks/store";
import Link from "next/link";
import { useRouter } from "next/router";
import { Lock, Message } from "react-iconly";
import { loginUser } from "store/login/slice";

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.login.loading);

  const handleSubmit = async (value) => {
    const isLoggedIn = (await dispatch(loginUser(value))).payload;
    if (isLoggedIn) router.push("/");
  };

  return (
    <main>
      <h3>🤝 Login</h3>

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form className="space-y-6">
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
        <Link href="/signup">
          <span className="cursor-pointer">Don't have an account?</span>
        </Link>
        <Link href="/forgot-password">
          <span className="cursor-pointer">Forgot Password?</span>
        </Link>
      </div>
    </main>
  );
};

export default LoginPage;

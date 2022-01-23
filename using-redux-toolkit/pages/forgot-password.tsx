import IconInput from "@components/shared/IconInput";
import { Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "hooks/store";
import { useRouter } from "next/router";
import { Message } from "react-iconly";
import { resetForgotPasswordThunk } from "store/forgot-password/slice";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.forgotPassword.loading);

  const handleSubmit = async (value) => {
    const redirect = (await dispatch(resetForgotPasswordThunk(value))).payload;
    if (redirect) router.push("/confirm-password-reset");
  };

  return (
    <main>
      <h3>🤝 Forgot Password</h3>

      <Formik initialValues={{ email: "" }} onSubmit={handleSubmit}>
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
    </main>
  );
};

export default ForgotPasswordPage;

import IconInput from "@components/shared/IconInput";
import { Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import Link from "next/link";
import { useRouter } from "next/router";
import { Lock, Password } from "react-iconly";
import { confirmPasswordResetThunk } from "store/confirm-password-reset/thunk";

const ConfirmPasswordResetPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.confirmPasswordReset.loading);

  const handleSubmit = async (value) => {
    const redirect = (await dispatch(confirmPasswordResetThunk(value))).payload;
    if (redirect) router.push("/login");
  };

  return (
    <main>
      <h3>🤝 Confirm Password Reset</h3>

      <Formik initialValues={{ url: "", password: "" }} onSubmit={handleSubmit}>
        {({ values, handleChange, isSubmitting }) => (
          <Form className="space-y-6">
            <IconInput
              icon={<Password />}
              inputProps={{
                type: "url",
                placeholder: "Update password url",
                name: "url",
                value: values.url,
                onChange: handleChange,
              }}
            />
            <IconInput
              icon={<Lock />}
              inputProps={{
                type: "password",
                placeholder: "New password",
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
        <Link href="/forgot-password">
          <span className="cursor-pointer">Forgot Password?</span>
        </Link>
      </div>
    </main>
  );
};

export default ConfirmPasswordResetPage;

import { Form, Formik } from "formik";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { ConfirmResetPasswordContext } from "@context/confirm-reset-password/context";
import { SET_LOADING } from "@context/confirm-reset-password/action";
import { confirmResetPasswordHandler } from "@api/forgot-password";

const ConfirmResetPasswordForm = () => {
  const { confirmResetPassword, dispatch } = useContext(
    ConfirmResetPasswordContext
  );
  const router = useRouter();

  const handleSubmit = async (values) => {
    dispatch({ type: SET_LOADING, playload: true });
    const response = await confirmResetPasswordHandler(values);
    if (response.error) toast.error("Something went wrong, Please try again");
    else {
      const data = response.result.data;
      if (data.isError) toast.error(data.msg);
      else {
        toast.success(data.msg);
        router.push("/login");
      }
    }

    dispatch({ type: SET_LOADING, playload: false });
  };

  return (
    <Formik initialValues={{ url: "", password: "" }} onSubmit={handleSubmit}>
      {({ values, handleChange, isSubmitting }) => (
        <Form className="space-y-6">
          <input
            className="input w-3/4"
            type="url"
            name="url"
            value={values.url}
            placeholder="Password reset url"
            onChange={handleChange}
          />
          <input
            className="input w-3/4"
            type="password"
            name="password"
            value={values.password}
            placeholder="New password"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="bg-secondary text-text1 text-[17px] font-semibold pt-2 py-[13px] px-[22px] rounded-lg hover:brightness-75 transition-all"
            disabled={isSubmitting}
          >
            {confirmResetPassword.loading ? "Processing..." : "Submit"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ConfirmResetPasswordForm;

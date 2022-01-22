import { Form, Formik } from "formik";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { ForgotPasswordContext } from "@context/forgot-password/context";
import { SET_LOADING } from "@context/forgot-password/action";
import { forgotPasswordHandler } from "@api/forgot-password";

const ForgotPasswordForm = () => {
  const { forgotPassword, dispatch } = useContext(ForgotPasswordContext);
  const router = useRouter();

  const handleSubmit = async (values) => {
    dispatch({ type: SET_LOADING, playload: true });
    const response = await forgotPasswordHandler(values);
    if (response.error) toast.error("Something went wrong, Please try again");
    else {
      const data = response.result.data;
      if (data.isError) toast.error(data.msg);
      else {
        toast.success(data.msg);
        router.push("/confirm-password-reset");
      }
    }

    dispatch({ type: SET_LOADING, playload: false });
  };

  return (
    <Formik initialValues={{ email: "" }} onSubmit={handleSubmit}>
      {({ values, handleChange, isSubmitting }) => (
        <Form className="space-y-6">
          <input
            className="input w-3/4"
            type="email"
            name="email"
            value={values.email}
            placeholder="john@example.com"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="bg-secondary text-text1 text-[17px] font-semibold pt-2 py-[13px] px-[22px] rounded-lg hover:brightness-75 transition-all"
            disabled={isSubmitting}
          >
            {forgotPassword.loading ? "Processing..." : "Submit"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ForgotPasswordForm;

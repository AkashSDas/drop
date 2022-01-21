import { Form, Formik } from "formik";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { SignupContext } from "@context/signup/context";
import { SET_LOADING } from "@context/signup/action";
import signupHandler from "@api/signup";

const SignupForm = () => {
  const { signup, dispatch } = useContext(SignupContext);
  const router = useRouter();

  const handleSubmit = async (values) => {
    dispatch({ type: SET_LOADING, playload: true });
    const response = await signupHandler(values);
    if (response.error) toast.error("Something went wrong, Please try again");
    else {
      const data = response.result.data;
      if (data.isError) toast.error(data.msg);
      else {
        toast.success(`${data.msg}, Now login`);
        router.push("/login");
      }
    }

    dispatch({ type: SET_LOADING, playload: false });
  };

  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, isSubmitting }) => (
        <Form className="space-y-6">
          <input
            className="input w-3/4"
            type="text"
            name="username"
            value={values.username}
            placeholder="John Flare"
            onChange={handleChange}
          />
          <input
            className="input w-3/4"
            type="email"
            name="email"
            value={values.email}
            placeholder="john@example.com"
            onChange={handleChange}
          />
          <input
            className="input w-3/4"
            type="password"
            name="password"
            value={values.password}
            placeholder="🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="bg-secondary text-text1 text-[17px] font-semibold pt-2 py-[13px] px-[22px] rounded-lg hover:brightness-75 transition-all"
            disabled={isSubmitting}
          >
            {signup.loading ? "Create an account for you..." : "Signup"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;

import { Form, Formik } from "formik";
import { useContext } from "react";
import { loginInitialState } from "../../lib/context/login";
import { SET_LOADING } from "../../lib/context/login/action";
import { LoginContext } from "../../lib/context/login/context";

const LoginForm = () => {
  const { login, dispatch } = useContext(LoginContext);

  const handleSubmit = async (values) => {
    dispatch({ type: SET_LOADING, playload: true });
    dispatch({ type: SET_LOADING, playload: false });
  };

  return (
    <Formik initialValues={loginInitialState.data} onSubmit={handleSubmit}>
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
            {login.loading ? "Logging you in..." : "Login"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;

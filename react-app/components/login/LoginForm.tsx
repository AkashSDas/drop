import { Form, Formik } from "formik";
import { useContext } from "react";
import { SET_LOADING } from "../../lib/context/login/action";
import { LoginContext } from "../../lib/context/login/context";
import loginHandler from "../../lib/api/login";
import toast from "react-hot-toast";
import { UserContext } from "../../lib/context/user/context";
import { SET_USER } from "../../lib/context/user/action";
import { saveUserToLocalStorage } from "../../lib/auth";

const LoginForm = () => {
  const { login, dispatch } = useContext(LoginContext);
  const { dispatch: dispatchUser } = useContext(UserContext);

  const handleSubmit = async (values) => {
    dispatch({ type: SET_LOADING, playload: true });
    const response = await loginHandler(values);
    if (response.error) toast.error("Something went wrong, Please try again");
    else {
      const data = response.result.data;
      if (data.isError) toast.error(data.msg);
      else {
        const user = data.data.user;
        const token = data.data.token;
        const userData = {
          id: user.id,
          username: user.username,
          email: user.email,
          active: user.active,
          profilePicURL: user.profilePicURL,
          role: user.role,
        };
        saveUserToLocalStorage({ token, user: userData });
        dispatchUser({ type: SET_USER, playload: { token, user: userData } });
        toast.success(data.msg);
      }
    }

    dispatch({ type: SET_LOADING, playload: false });
  };

  return (
    <Formik initialValues={{ email: "", password: "" }} onSubmit={handleSubmit}>
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

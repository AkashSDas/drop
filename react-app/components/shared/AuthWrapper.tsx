import { useContext, useEffect } from "react";
import { getUserFromLocalStorage } from "../../lib/auth";
import { SET_USER } from "../../lib/context/user/action";
import { UserContext } from "../../lib/context/user/context";

const AuthWrapper = ({ children }: { children: JSX.Element }) => {
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    const user = getUserFromLocalStorage();
    if (user) {
      dispatch({
        type: SET_USER,
        playload: { token: user.token, user: user.user },
      });
    }
  }, []);

  return children;
};

export default AuthWrapper;

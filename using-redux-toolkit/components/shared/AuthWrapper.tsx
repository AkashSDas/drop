import { getUserFromLocalStorage } from "lib/base/local-storage";
import { useAppDispatch } from "lib/hooks/store";
import { useEffect } from "react";
import { updateUser } from "store/user/slice";

const AuthWrapper = ({ children }: { children: JSX.Element }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = getUserFromLocalStorage();
    if (user) dispatch(updateUser(user));
  }, []);

  return children;
};

export default AuthWrapper;

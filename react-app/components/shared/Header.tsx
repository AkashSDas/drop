import styles from "@style/shared/Header.module.scss";
import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import { useRouter } from "next/router";
import { updateIsOpen } from "store/create-drop-form/slice";
import { logoutThunk } from "store/logout/thunk";
import PrimaryButton from "./PrimaryButton";
import SearchInput from "./SearchInput";
import TextButton from "./TextButton";

const Header = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const logout = async () => {
    const isLoggedOut = (await dispatch(logoutThunk())).payload;
    if (isLoggedOut) router.push("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.header_inner}>
        <SearchInput />
        {user.token ? (
          <div className="space-x-8 flex items-center">
            <TextButton
              text="💧 Drop it"
              onClick={() => dispatch(updateIsOpen(true))}
            />
            <TextButton text="Logout" onClick={logout} />
            <img
              className="h-[50px] w-[50px] rounded-full object-cover cursor-pointer"
              src={
                user?.info?.profilePic?.URL ??
                "https://images.unsplash.com/photo-1466112928291-0903b80a9466?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80"
              }
              alt={user?.info?.username ?? "Unknown User"}
            />
          </div>
        ) : (
          <div className="space-x-8">
            <TextButton text="Login" onClick={() => router.push("/login")} />
            <PrimaryButton
              text="Signup"
              onClick={() => router.push("/signup")}
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

import styles from "@style/shared/Header.module.scss";
import { useAppDispatch, useAppSelector } from "hooks/store";
import { useRouter } from "next/router";
import { logoutUser } from "store/logout/slice";
import PrimaryButton from "./PrimaryButton";
import SearchInput from "./SearchInput";
import TextButton from "./TextButton";

const Header = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.header_inner}>
        <SearchInput />
        {user.token ? (
          <div className="space-x-8 flex items-center">
            <TextButton
              text="Logout"
              onClick={async () => {
                const isLoggedOut = (await dispatch(logoutUser())).payload;
                if (isLoggedOut) router.push("/");
              }}
            />
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

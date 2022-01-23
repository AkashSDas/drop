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
          <div className="space-x-8">
            <TextButton
              text="Logout"
              onClick={async () => {
                const isLoggedOut = (await dispatch(logoutUser())).payload;
                if (isLoggedOut) router.push("/");
              }}
            />
          </div>
        ) : (
          <div className="space-x-8">
            <TextButton text="Login" onClick={() => {}} />
            <PrimaryButton text="Signup" onClick={() => {}} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

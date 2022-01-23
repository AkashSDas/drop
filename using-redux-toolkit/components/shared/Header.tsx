import styles from "@style/shared/Header.module.scss";
import { useAppSelector } from "hooks/store";
import PrimaryButton from "./PrimaryButton";
import SearchInput from "./SearchInput";
import TextButton from "./TextButton";

const Header = () => {
  const user = useAppSelector((state) => state.user);

  return (
    <header className={styles.header}>
      <div className={styles.header_inner}>
        <SearchInput />
        {user.token ? (
          <div className="space-x-8">
            <TextButton text="Logout" onClick={() => {}} />
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

import styles from "@style/shared/Header.module.scss";
import PrimaryButton from "./PrimaryButton";
import SearchInput from "./SearchInput";
import TextButton from "./TextButton";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header_inner}>
        <SearchInput />
        <div className="space-x-8">
          <TextButton text="Login" onClick={() => {}} />
          <PrimaryButton text="Signup" onClick={() => {}} />
        </div>
      </div>
    </header>
  );
};

export default Header;

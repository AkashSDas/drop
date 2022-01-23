import styles from "@style/shared/Sidebar.module.scss";
import Logo from "./Logo";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo fontSize="30px" />
      <div className="border-b-[1px] border-solid border-[#32333B] w-[168px]"></div>
    </div>
  );
};

export default Sidebar;

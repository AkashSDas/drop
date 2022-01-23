import styles from "@style/shared/Sidebar.module.scss";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className="logo text-[30px]">drop</div>
      <div className="border-b-[1px] border-solid border-[#32333B] w-[168px]"></div>
    </div>
  );
};

export default Sidebar;

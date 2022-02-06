import { motion } from "framer-motion";
import { animationCurve1 } from "lib/base/animation";
import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import { useRouter } from "next/router";
import { updateIsOpen } from "store/create-drop-form/slice";
import { logoutThunk } from "store/logout/thunk";

import styles from "@style/shared/Header.module.scss";

import PrimaryButton from "./PrimaryButton";
import SearchInput from "./SearchInput";
import TextButton from "./TextButton";

const Header = () => {
  const container = {
    animate: { transition: { delayChildren: 0.4, staggerChildren: 0.1 } },
  };

  const item = {
    initial: { y: -80, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { ease: animationCurve1, duration: 1 },
    },
  };

  return (
    <header className={styles.header}>
      <motion.div
        className={styles.header_inner}
        variants={container}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={item}>
          <SearchInput />
        </motion.div>
        <motion.div variants={item}>
          <Actions />
        </motion.div>
      </motion.div>
    </header>
  );
};

const Actions = () => {
  const user = useAppSelector((state) => state.user);
  if (user.token) return <AuthActions />;
  return <NoAuthActions />;
};

/**
 * Actions for authenticated users
 */
const AuthActions = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const logout = async () => {
    const isLoggedOut = (await dispatch(logoutThunk())).payload;
    if (isLoggedOut) router.push("/");
  };

  return (
    <div className="space-x-8 flex items-center">
      <TextButton text="Drop it" onClick={() => dispatch(updateIsOpen(true))} />
      <TextButton text="Logout" onClick={logout} />
      <ProfilePic />
    </div>
  );
};

const ProfilePic = () => {
  const user = useAppSelector((state) => state.user);
  const style = "h-[50px] w-[50px] rounded-full object-cover cursor-pointer";
  const defaultPicURL =
    "https://images.unsplash.com/photo-1466112928291-0903b80a9466?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80";

  return (
    <img
      className={style}
      src={user?.info?.profilePic?.URL ?? defaultPicURL}
      alt={user?.info?.username ?? "Unknown User"}
    />
  );
};

/**
 * Actions for unauthenticated users
 */
const NoAuthActions = () => {
  const router = useRouter();

  return (
    <div className="flex space-x-8">
      <TextButton text="Login" onClick={() => router.push("/login")} />
      <PrimaryButton text="Signup" onClick={() => router.push("/signup")} />
    </div>
  );
};

export default Header;

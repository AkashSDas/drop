import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import { useEffect } from "react";
import { changeTab, ProfileTab } from "store/profile/slice";

import Drops from "@components/profile/Drops";
import Followers from "@components/profile/Followers";
import ProfileTabContainer from "@components/profile/ProfileTab";
import UserInfo from "@components/profile/UserInfo";

const ProfileDropsPage = () => {
  const dispatch = useAppDispatch();
  const currentTab = useAppSelector((state) => state.profile.currentTab);

  useEffect(() => {
    dispatch(changeTab("drop" as ProfileTab));
  }, []);

  const displayContent = () => {
    if (currentTab === "drop") return <Drops />;
    if (currentTab === "follower") return <Followers />;
    return null;
  };

  return (
    <main>
      <UserInfo />
      <ProfileTabContainer />
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={currentTab}
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.15 }}
        >
          {displayContent()}
        </motion.div>
      </AnimatePresence>
    </main>
  );
};

export default ProfileDropsPage;

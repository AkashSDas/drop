import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import { ProfileTab, updateTab } from "store/profile/slice";

const ProfileTabContainer = () => {
  const currentTab = useAppSelector((state) => state.profile.currentTab);
  const dispatch = useAppDispatch();

  const tabs = [
    { name: "Drops", id: "drop" },
    { name: "Redrops", id: "redrop" },
    { name: "Followers", id: "follower" },
    { name: "Followings", id: "following" },
  ];

  return (
    <ul className="flex justify-between">
      {tabs.map((t) => (
        <li
          key={t.name}
          onClick={() => dispatch(updateTab(t.id as ProfileTab))}
          className="w-[200px] bg-card text-center cursor-pointer"
        >
          <div className="py-4">{t.name}</div>
          {t.id === currentTab ? (
            <motion.div
              className="bg-[#3A8CFF] h-[2px] bottom-[-1px]"
              layoutId="underline"
            />
          ) : null}
        </li>
      ))}
    </ul>
  );
};

export default ProfileTabContainer;

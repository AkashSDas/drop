import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { fetchProfileUser, followProfileUser, unFollowProfileUser } from "store/profile/thunk";

import RollingAnimation from "@components/animation/RollingAnimation";
import { ProfilePic } from "@components/drop/DropCard";
import PrimaryButton from "@components/shared/PrimaryButton";

const UserInfo = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.profile);

  useEffect(() => {
    if (router.isReady) {
      const { profileId } = router.query;
      dispatch(fetchProfileUser(profileId as string));
    }
  }, [router.isReady]);

  if (profile.isLoading || !profile.user) return <UserInfoLoading />;

  return (
    <div className="flex justify-between items-center">
      <div className="space-x-8 flex items-center">
        <ProfilePic user={profile.user} />
        <div className="font-bold text-text1">{profile.user.username}</div>
      </div>
      <FollowButton />
    </div>
  );
};

const FollowButton = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.profile);

  const style =
    "text-text2 text-[17px] font-semibold pt-2 pb-[13px] px-[22px] rounded-lg hover:brightness-90 bg-card";

  const handleUnFollow = async () => await dispatch(unFollowProfileUser());
  const handleFollow = async () => {
    await dispatch(followProfileUser(profile.user.id));
  };

  if (profile.self) return null;
  if (profile.amIFollowing)
    return (
      <RollingAnimation>
        <button className={style} onClick={handleUnFollow}>
          {profile.isUpdatingFollowStatus ? "Unfollowing..." : "Following"}
        </button>
      </RollingAnimation>
    );

  return (
    <PrimaryButton
      text={profile.isUpdatingFollowStatus ? "Following..." : "Follow"}
      onClick={handleFollow}
    />
  );
};

export const UserInfoLoading = () => (
  <div className="flex justify-between items-center animate-pulse">
    <div className="space-x-8 flex items-center">
      <div className="h-[60px] w-[60px] rounded-full bg-card"></div>
      <div className="h-[30px] w-[200px] rounded-lg bg-card"></div>
    </div>
    <div className="h-[49px] w-[114px] rounded-lg bg-card"></div>
  </div>
);

export default UserInfo;

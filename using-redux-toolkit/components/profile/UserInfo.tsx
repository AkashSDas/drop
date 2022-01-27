import PrimaryButton from "@components/shared/PrimaryButton";
import TextButton from "@components/shared/TextButton";
import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { updateLoadingProfile } from "store/profile/slice";
import { fetchProfileUserThunk } from "store/profile/thunk";

const UserInfo = () => {
  const router = useRouter();
  const { loadingProfile, user, self, following } = useAppSelector(
    (state) => state.profile
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (router.isReady) {
      const { profileId } = router.query;
      dispatch(fetchProfileUserThunk(profileId as string));
    } else {
      dispatch(updateLoadingProfile(true));
    }
  }, [router.isReady]);

  const displayFollowBtn = () => {
    if (self) return null;
    if (following) return <TextButton onClick={() => {}} text="Following" />;
    else return <PrimaryButton text="Follow" onClick={() => {}} />;
  };

  if (loadingProfile || !user) return <UserInfoLoading />;
  return (
    <div className="flex justify-between items-center">
      <div className="space-x-8 flex items-center">
        <img
          className="h-[60px] w-[60px] rounded-full object-cover"
          src={user.profilePic.URL}
          alt={user.username}
        />
        <div className="font-bold text-text1">{user.username}</div>
      </div>
      {displayFollowBtn()}
    </div>
  );
};

const UserInfoLoading = () => (
  <div className="flex justify-between items-center animate-pulse">
    <div className="space-x-8 flex items-center">
      <div className="h-[60px] w-[60px] rounded-full bg-card"></div>
      <div className="h-[30px] w-[200px] rounded-lg bg-card"></div>
    </div>
    <div className="h-[49px] w-[114px] rounded-lg bg-card"></div>
  </div>
);

export default UserInfo;

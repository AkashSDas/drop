import PrimaryButton from "@components/shared/PrimaryButton";
import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { updateLoadingProfile } from "store/profile/slice";
import {
  fetchProfileUserThunk,
  followUserThunk,
  unFollowUserThunk,
} from "store/profile/thunk";

const UserInfo = () => {
  const router = useRouter();
  const { loadingProfile, loadingUserFollow, user, self, following } =
    useAppSelector((state) => state.profile);
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
    if (following)
      return (
        <button
          className="text-text2 text-[17px] font-semibold pt-2 pb-[13px] px-[22px] rounded-lg hover:brightness-90 bg-card"
          onClick={async () => await dispatch(unFollowUserThunk())}
        >
          {loadingUserFollow ? "Unfollowing..." : "Following"}
        </button>
      );
    else
      return (
        <PrimaryButton
          text={loadingUserFollow ? "Following..." : "Follow"}
          onClick={async () => {
            await dispatch(followUserThunk(user.id));
          }}
        />
      );
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

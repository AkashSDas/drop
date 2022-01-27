import PrimaryButton from "@components/shared/PrimaryButton";
import { useAppSelector } from "lib/hooks/store";
import { IFollower } from "store/profile/slice";

const FollowerInfo = ({ info }: { info: IFollower }) => {
  const { isFollowing, follower } = info;
  const { togglingFollowStatus } = useAppSelector((state) => state.profile);

  const displayFollowBtn = () => {
    if (isFollowing)
      return (
        <button className="text-text2 text-[17px] font-semibold pt-2 pb-[13px] px-[22px] rounded-lg hover:brightness-90 bg-card">
          {togglingFollowStatus ? "Unfollowing..." : "Following"}
        </button>
      );
    else
      return (
        <PrimaryButton
          text={togglingFollowStatus ? "Following..." : "Follow"}
          onClick={async () => {}}
        />
      );
  };

  return (
    <div className="flex justify-between items-center">
      <div className="space-x-8 flex items-center">
        <img
          className="h-[60px] w-[60px] rounded-full object-cover"
          src={follower.profilePic.URL}
          alt={follower.username}
        />
        <div className="font-bold text-text1">{follower.username}</div>
      </div>
      {displayFollowBtn()}
    </div>
  );
};

export default FollowerInfo;

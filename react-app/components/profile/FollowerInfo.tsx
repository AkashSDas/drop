import { IFollower } from "store/profile-followers/slice";

import RollingAnimation from "@components/animation/RollingAnimation";
import { ProfilePic } from "@components/drop/DropCard";
import PrimaryButton from "@components/shared/PrimaryButton";

interface Props {
  follower: IFollower;
}

const FollowButton = ({ follower }: Props) => {
  const style =
    "text-text2 text-[17px] font-semibold pt-2 pb-[13px] px-[22px] rounded-lg hover:brightness-90 bg-card";

  const handleUnFollow = () => {};
  const handleFollow = () => {};

  if (follower.amIFollowing)
    return (
      <RollingAnimation>
        <button className={style} onClick={handleUnFollow}>
          {follower.isUpdatingFollowerStatus ? "Unfollowing..." : "Following"}
        </button>
      </RollingAnimation>
    );

  return (
    <PrimaryButton
      text={follower.isUpdatingFollowerStatus ? "Following..." : "Follow"}
      onClick={handleFollow}
    />
  );
};

const FollowerInfo = ({ info }: { info: IFollower }) => {
  const { follower } = info;

  return (
    <div className="flex justify-between items-center">
      <div className="space-x-8 flex items-center">
        <ProfilePic user={follower} />
        <div className="font-bold text-text1">{follower.username}</div>
      </div>
      <FollowButton follower={info} />
    </div>
  );
};

export default FollowerInfo;

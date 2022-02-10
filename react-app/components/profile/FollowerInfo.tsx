import { useAppDispatch } from "lib/hooks/store";
import { IFollower } from "store/profile-followers/slice";
import { followUserInProfileFollowers, unFollowUserInProfileFollowers } from "store/profile-followers/thunk";

import RollingAnimation from "@components/animation/RollingAnimation";
import { ProfilePic } from "@components/drop/DropCard";
import PrimaryButton from "@components/shared/PrimaryButton";

interface Props {
  follower: IFollower;
}

const FollowButton = ({ follower }: Props) => {
  const dispatch = useAppDispatch();

  const style =
    "text-text2 text-[17px] font-semibold pt-2 pb-[13px] px-[22px] rounded-lg hover:brightness-90 bg-card";

  const handleUnFollow = () =>
    dispatch(
      unFollowUserInProfileFollowers({
        entityId: follower.id,
        relationshipId: follower.relationshipId,
      })
    );
  const handleFollow = async () =>
    dispatch(
      followUserInProfileFollowers({
        followedId: follower.follower.id,
        relationshipId: follower.id,
      })
    );

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

import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import { useEffect } from "react";
import { fetchUserFollowersThunk } from "store/profile/thunk";

import FollowerInfo from "./FollowerInfo";
import { UserInfoLoading } from "./UserInfo";

const Followers = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);
  const { followers, loadingFollowers, followersHasNext, user } =
    useAppSelector((state) => state.profile);

  useEffect(() => {
    if (user.id) {
      dispatch(fetchUserFollowersThunk({ init: true, userId: user.id }));
    }
  }, [token, user.id]);

  return (
    <div className="space-y-8">
      {loadingFollowers ? (
        <>
          <UserInfoLoading />
          <UserInfoLoading />
          <UserInfoLoading />
          <UserInfoLoading />
        </>
      ) : (
        <>
          {followers.map((f, key) => (
            <FollowerInfo info={f} key={key} />
          ))}
        </>
      )}
    </div>
  );
};

export default Followers;

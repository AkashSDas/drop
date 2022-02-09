import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchInitialProfileFollowers, fetchMoreProfileFollowers } from "store/profile-followers/thunk";

import FollowerInfo from "./FollowerInfo";
import { UserInfoLoading } from "./UserInfo";

export const FollowersLoading = () => (
  <div className="space-y-8">
    <UserInfoLoading />
    <UserInfoLoading />
    <UserInfoLoading />
    <UserInfoLoading />
  </div>
);

const Followers = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);
  const { user } = useAppSelector((state) => state.profile);
  const { entities, ids, isLoading } = useAppSelector(
    (state) => state.profileFollowers
  );

  useEffect(() => {
    if (user.id) {
      dispatch(fetchInitialProfileFollowers({ limit: 10, userId: user.id }));
    }
  }, [token, user.id]);

  if (isLoading) return <FollowersLoading />;

  return (
    <InfiniteScrollWrapper>
      <>
        {ids.map((id, key) => (
          <div key={key} className="space-y-8">
            <FollowerInfo info={entities[id]} key={key} />
            <div></div>
          </div>
        ))}
      </>
    </InfiniteScrollWrapper>
  );
};

const InfiniteScrollWrapper = ({ children }: { children: JSX.Element }) => {
  const dispatch = useAppDispatch();
  const { hasNext, ids } = useAppSelector((state) => state.profileFollowers);
  const { user } = useAppSelector((state) => state.profile);

  return (
    <InfiniteScroll
      dataLength={ids.length}
      next={() =>
        dispatch(fetchMoreProfileFollowers({ limit: 10, userId: user.id }))
      }
      hasMore={hasNext}
      loader={<FollowersLoading />}
      endMessage={<div className="font-semibold text-[23px]">The End</div>}
      className="space-y-8"
    >
      {children}
    </InfiniteScroll>
  );
};

export default Followers;

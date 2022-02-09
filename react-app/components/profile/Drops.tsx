import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchInitialProfileDrops, fetchMoreProfileDrops } from "store/profile-drops/thunk";

import DropsListViewLoading from "@components/drop/DropsListViewLoading";

import ProfileDropCard from "./ProfileDropCard";

const Drops = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);
  const { entities, isLoading, ids } = useAppSelector(
    (state) => state.profileDrops
  );
  const { user } = useAppSelector((state) => state.profile);

  useEffect(() => {
    if (user.id) {
      dispatch(fetchInitialProfileDrops({ limit: 10, userId: user.id }));
    }
  }, [token, user.id]);

  if (isLoading) return <DropsListViewLoading />;

  return (
    <InfiniteScrollWrapper>
      <>
        {ids.map((id, key) => (
          <div key={key} className="space-y-8">
            <div className="border-b-[1px] border-solid border-[#32333B]"></div>
            <ProfileDropCard drop={entities[id]} />
          </div>
        ))}
      </>
    </InfiniteScrollWrapper>
  );
};

const InfiniteScrollWrapper = ({ children }: { children: JSX.Element }) => {
  const dispatch = useAppDispatch();
  const { hasNext, ids } = useAppSelector((state) => state.profileDrops);
  const { user } = useAppSelector((state) => state.profile);

  return (
    <InfiniteScroll
      dataLength={ids.length}
      next={() =>
        dispatch(fetchMoreProfileDrops({ limit: 10, userId: user.id }))
      }
      hasMore={hasNext}
      loader={<DropsListViewLoading />}
      endMessage={<div className="font-semibold text-[23px]">The End</div>}
      className="space-y-8"
    >
      {children}
    </InfiniteScroll>
  );
};

export default Drops;

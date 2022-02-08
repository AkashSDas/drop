import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchInitialDrops, fetchMoreDrops } from "store/drops/thunk";

import DropCard from "./DropCard";
import DropsListViewLoading from "./DropsListViewLoading";

const DropsListView = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);
  const { entities, isLoading, ids } = useAppSelector((state) => state.drops);

  useEffect(() => {
    dispatch(fetchInitialDrops(10));
  }, [token]);

  if (isLoading) return <DropsListViewLoading />;

  return (
    <InfiniteScrollWrapper>
      <>
        {ids.map((id, key) => (
          <div key={key} className="space-y-8">
            <div className="border-b-[1px] border-solid border-[#32333B]"></div>
            <DropCard drop={entities[id]} />
          </div>
        ))}
      </>
    </InfiniteScrollWrapper>
  );
};

const InfiniteScrollWrapper = ({ children }: { children: JSX.Element }) => {
  const dispatch = useAppDispatch();
  const { hasNext, ids } = useAppSelector((state) => state.drops);

  return (
    <InfiniteScroll
      dataLength={ids.length}
      next={() => dispatch(fetchMoreDrops(10))}
      hasMore={hasNext}
      loader={<DropsListViewLoading />}
      endMessage={<div className="font-semibold text-[23px]">The End</div>}
      className="space-y-8"
    >
      {children}
    </InfiniteScroll>
  );
};

export default DropsListView;

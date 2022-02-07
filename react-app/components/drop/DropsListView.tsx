import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchInitialDrops, fetchMoreDrops } from "store/drops/thunk";

import DropCard from "./DropCard";
import DropsListViewLoading from "./DropsListViewLoading";

const DropsListView = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);
  const { entities, isLoading, hasNext, ids } = useAppSelector(
    (state) => state.drops
  );

  useEffect(() => {
    dispatch(fetchInitialDrops(10));
  }, [token]);

  return (
    <div className="space-y-8">
      {isLoading ? (
        <DropsListViewLoading />
      ) : (
        <InfiniteScroll
          dataLength={ids.length}
          next={() => dispatch(fetchMoreDrops(10))}
          hasMore={hasNext}
          loader={<DropsListViewLoading />}
          endMessage={<div className="font-semibold text-[23px]">The End</div>}
          className="space-y-8"
        >
          {ids.map((id, key) => {
            const d = entities[id];
            return (
              <div key={key} className="space-y-8">
                <div className="border-b-[1px] border-solid border-[#32333B]"></div>
                <DropCard
                  content={d.content}
                  createdAt={d.createdAt}
                  id={d.id}
                  reacted={d.reacted}
                  reactionsOnDrop={d.reactions}
                  updatedAt={d.updatedAt}
                  user={d.user}
                />
              </div>
            );
          })}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default DropsListView;

import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchDropsThunk } from "store/drop/thunk";
import DropCard from "./DropCard";
import DropsListViewLoading from "./DropsListViewLoading";

const DropsListView = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);
  const { drops, loading, hasNext } = useAppSelector((state) => state.drops);

  useEffect(() => {
    dispatch(fetchDropsThunk(true));
  }, [token]);

  return (
    <div className="space-y-8">
      {loading ? (
        <DropsListViewLoading />
      ) : (
        <InfiniteScroll
          dataLength={drops.length}
          next={() => {}}
          hasMore={hasNext}
          loader={<DropsListViewLoading />}
          endMessage={<div className="font-semibold text-[23px]">The End</div>}
          className="space-y-8"
        >
          {drops.map((d, key) => (
            <div key={key} className="space-y-8">
              <div className="border-b-[1px] border-solid border-[#32333B]"></div>

              <DropCard
                content={d.content}
                createdAt={d.createdAt}
                id={d.id}
                reacted={d.reacted}
                reactionsOnDrop={d.reactionsOnDrop}
                updatedAt={d.updatedAt}
                user={d.user}
              />
            </div>
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default DropsListView;

import DropCard from "@components/drop/DropCard";
import DropsListViewLoading from "@components/drop/DropsListViewLoading";
import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchUserDropsThunk } from "store/profile/thunk";

const Drops = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);
  const { drops, dropsHasNext, loadingDrops, user } = useAppSelector(
    (state) => state.profile
  );

  useEffect(() => {
    dispatch(fetchUserDropsThunk({ init: true, userId: user.id }));
  }, [token]);

  return (
    <div className="space-y-8">
      {loadingDrops ? (
        <DropsListViewLoading />
      ) : (
        <InfiniteScroll
          dataLength={drops.length}
          next={() => {}}
          hasMore={dropsHasNext}
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

export default Drops;

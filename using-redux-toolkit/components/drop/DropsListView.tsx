import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import { useEffect } from "react";
import { fetchDropsThunk } from "store/drop/thunk";
import DropCard from "./DropCard";

const DropsListView = () => {
  const dispatch = useAppDispatch();
  const { drops, loading, hasNext, next } = useAppSelector(
    (state) => state.drops
  );

  useEffect(() => {
    dispatch(fetchDropsThunk());
  }, []);

  return (
    <div className="space-y-8">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {drops.map((d, key) => (
            <div key={key}>
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
        </>
      )}
    </div>
  );
};

export default DropsListView;

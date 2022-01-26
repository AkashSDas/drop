import DropCardLoadng from "@components/drop/DropCardLoading";
import DropComments from "@components/drop/DropComments";
import IndependentDropCard from "@components/drop/IndependentDropCard";
import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { fetchDropCommentsThunk } from "store/drop-comments/thunk";
import { updateLoading as updateDropLoading } from "store/drop/slice";
import { updateLoading as updateCommentsLoading } from "store/drop-comments/slice";
import { fetchDropThunk } from "store/drop/thunk";
import DropCommentsLoading from "@components/drop/DropCommentsLoading";

const DropPage = () => {
  const router = useRouter();
  const { loading: dropLoading, drop } = useAppSelector((state) => state.drop);
  const { loading: commentsLoading, comments } = useAppSelector(
    (state) => state.dropComments
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (router.isReady) {
      const { dropId } = router.query;
      dispatch(fetchDropThunk(dropId as string));
      dispatch(
        fetchDropCommentsThunk({ dropId: dropId as string, init: true })
      );
    } else {
      dispatch(updateDropLoading(true));
      dispatch(updateCommentsLoading(true));
    }
  }, [router.isReady]);

  return (
    <main>
      {dropLoading || !drop ? (
        <DropCardLoadng />
      ) : (
        <IndependentDropCard
          content={drop.content}
          createdAt={drop.createdAt}
          id={drop.id}
          reacted={drop.reacted}
          reactionsOnDrop={drop.reactionsOnDrop}
          updatedAt={drop.updatedAt}
          user={drop.user}
        />
      )}

      <section className="space-y-4">
        <h4>Comments</h4>
        <div className="border-b-[1px] border-solid border-[#32333B]"></div>

        {commentsLoading || !comments ? (
          <DropCommentsLoading />
        ) : (
          <DropComments />
        )}
      </section>
    </main>
  );
};

export default DropPage;

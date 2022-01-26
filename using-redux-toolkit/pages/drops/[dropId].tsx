import DropCardLoadng from "@components/drop/DropCardLoading";
import IndependentDropCard from "@components/drop/IndependentDropCard";
import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { updateLoading } from "store/drop/slice";
import { fetchDropThunk } from "store/drop/thunk";

const DropPage = () => {
  const router = useRouter();
  const { loading, drop } = useAppSelector((state) => state.drop);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (router.isReady) {
      const { dropId } = router.query;
      dispatch(fetchDropThunk(dropId as string));
    } else {
      dispatch(updateLoading(true));
    }
  }, [router.isReady]);

  if (loading || !drop)
    return (
      <main>
        <DropCardLoadng />
      </main>
    );

  return (
    <main>
      <IndependentDropCard
        content={drop.content}
        createdAt={drop.createdAt}
        id={drop.id}
        reacted={drop.reacted}
        reactionsOnDrop={drop.reactionsOnDrop}
        updatedAt={drop.updatedAt}
        user={drop.user}
      />
    </main>
  );
};

export default DropPage;

import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { fetchDrop } from "store/drop/thunk";

import DropCardLoadng from "@components/drop/DropCardLoading";
import DropCommentForm from "@components/drop/DropCommentForm";
import DropComments from "@components/drop/DropComments";
import IndependentDropCard from "@components/drop/IndependentDropCard";

const DropSection = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, drop } = useAppSelector((state) => state.drop);

  useEffect(() => {
    if (router.isReady) {
      dispatch(fetchDrop(router.query?.dropId as string));
    }
  }, [router.query]);

  if (isLoading || !drop) return <DropCardLoadng />;
  return <IndependentDropCard drop={drop} />;
};

const DropPage = () => {
  const router = useRouter();

  return (
    <main>
      <DropSection />
      <section className="space-y-6">
        <h4>Comments</h4>
        <DropCommentForm dropId={router.query?.dropId as string} />
        <DropComments />
      </section>
    </main>
  );
};

export default DropPage;

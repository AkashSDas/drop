import { useAppDispatch, useAppSelector } from "lib/hooks/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { selectAllDropComments } from "store/drop-comments/slice";
import { fetchInitialComments, fetchMoreComments } from "store/drop-comments/thunk";

import DropComment from "./DropComment";
import DropCommentsLoading from "./DropCommentsLoading";

const DropComments = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { entities, isLoading, ids } = useAppSelector(
    (state) => state.dropComments
  );

  useEffect(() => {
    if (router.isReady && router.query?.dropId) {
      dispatch(
        fetchInitialComments({
          limit: 10,
          dropId: router.query.dropId as string,
        })
      );
    }
  }, [router.query]);

  if (isLoading || !router.isReady) return <DropCommentsLoading />;

  return (
    <InfiniteScrollWrapper dropId={router.query?.dropId as string}>
      <>
        {ids.map((id, key) => (
          <div className="space-y-8">
            <div className="border-b-[1px] border-solid border-[#32333B]"></div>
            <DropComment key={key} comment={entities[id]} />
          </div>
        ))}
      </>
    </InfiniteScrollWrapper>
  );
};

interface Props {
  children: JSX.Element;
  dropId: string;
}

const InfiniteScrollWrapper = ({ children, dropId }: Props) => {
  const dispatch = useAppDispatch();
  const { hasNext, ids } = useAppSelector((state) => state.dropComments);

  return (
    <InfiniteScroll
      dataLength={ids.length}
      next={() => dispatch(fetchMoreComments({ limit: 10, dropId }))}
      hasMore={hasNext}
      loader={<DropCommentsLoading />}
      endMessage={<div className="font-semibold text-[23px]">The End</div>}
      className="space-y-8"
    >
      {children}
    </InfiniteScroll>
  );
};

export default DropComments;

import { useAppSelector } from "lib/hooks/store";

import DropComment from "./DropComment";

const DropComments = () => {
  const comments = useAppSelector((state) => state.dropComments);

  return (
    <div className="space-y-8">
      {comments.comments.map((c, key) => (
        <>
          <div className="border-b-[1px] border-solid border-[#32333B]"></div>
          <DropComment key={key} comment={c} />
        </>
      ))}
    </div>
  );
};

export default DropComments;

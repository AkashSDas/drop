import { useAppSelector } from "lib/hooks/store";
import DropComment from "./DropComment";

const DropComments = () => {
  const comments = useAppSelector((state) => state.dropComments);

  return (
    <div className="space-y-4">
      {comments.comments.map((c, key) => (
        <DropComment key={key} comment={c} />
      ))}
    </div>
  );
};

export default DropComments;

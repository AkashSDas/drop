import { monthNames } from "../../lib";

export interface ISuggestionProps {
  content: string;
  updatedAt: Date;
  user: {
    username: string;
    profilePicURL: string;
  };
}

const SuggestionItem = ({ content, updatedAt, user }: ISuggestionProps) => {
  return (
    <div className="flex p-2 space-x-8 snap-center cursor-pointer hover:brightness-75 bg-card transition-all rounded-lg">
      <img
        src={user.profilePicURL}
        alt={user.username}
        className="h-[60px] w-[60px] rounded-full object-cover"
      />

      <div className="space-y-4 font-semibold">
        <div className="space-x-4">
          <span className="text-text1">{user.username}</span>
          <span> - </span>
          <span>
            {updatedAt.getDate()} {monthNames[updatedAt.getMonth()]},{" "}
            {updatedAt.getFullYear()}
          </span>
        </div>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default SuggestionItem;

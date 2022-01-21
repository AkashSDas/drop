import SuggestionItem, { ISuggestionProps } from "./SuggestionItem";

interface ISuggestionListProps {
  suggestions: ISuggestionProps[];
}

const SuggestionList = ({ suggestions }: ISuggestionListProps) => {
  return (
    <div className="ml-4 mt-4 bg-card h-[60%] w-[600px] shadow-lg rounded-2xl p-2 overflow-y-scroll overflow-x-hidden scroll snap-y space-y-6">
      {suggestions.map((suggestion, id) => (
        <SuggestionItem
          key={id}
          content={suggestion.content}
          updatedAt={suggestion.updatedAt}
          user={suggestion.user}
        />
      ))}
    </div>
  );
};

export default SuggestionList;

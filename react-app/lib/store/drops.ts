import { IDrop, IReaction } from "store/drops/types";

export const changeDropReactionCount = (
  drop: IDrop,
  oldReaction: string, // name
  newReaction: string // name
) => {
  let reactions: IReaction[] = [];
  for (const reaction of drop.reactions) {
    if (reaction.name === oldReaction) {
      reactions.push({ ...reaction, count: reaction.count - 1 });
    } else if (reaction.name === newReaction) {
      reactions.push({ ...reaction, count: reaction.count + 1 });
    } else {
      reactions.push({ ...reaction });
    }
  }
  return reactions;
};

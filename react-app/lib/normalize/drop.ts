import { IDrop, IReaction } from "store/drops/types";

import { normalizeDropAuthor } from "./user";

export const normalizeDropReactions = (data: any) => {
  let reactions: IReaction[] = [];
  for (const reaction in data) {
    reactions.push({
      name: data[reaction].name,
      emoji: data[reaction].emoji,
      count: data[reaction].count,
    });
  }

  return reactions;
};

export const normalizeDrop = (data: any): IDrop => {
  const { drop, reactionsOnDrop, reacted } = data;
  const reactions = normalizeDropReactions(reactionsOnDrop);
  const user = normalizeDropAuthor(drop.user);
  return {
    id: drop.id,
    content: drop.content,
    user,
    reactions,
    reacted: reacted ? { reaction: reacted.reaction, id: reacted.id } : null,
    createdAt: drop.createdAt,
    updatedAt: drop.updatedAt,
    updatingReaction: false,
  };
};

export const normalizeDrops = (data: any): { [id: string]: IDrop } => {
  let drops: { [id: string]: IDrop } = {};
  for (let i = 0; i < data.length; i++) {
    const drop = normalizeDrop(data[i]);
    drops[drop.id] = drop;
  }
  return drops;
};

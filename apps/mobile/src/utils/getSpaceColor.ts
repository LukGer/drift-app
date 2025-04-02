import { DbSpace } from "@/db/schema";

export const getSpaceColor = (space: DbSpace) => {
  "worklet";
  return `${space.colorHex}44`;
};

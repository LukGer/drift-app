import { db } from "@/db";
import { DbSpaceInsert, spaces } from "@/db/schema";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";

export const useSpaces = () => {
  return useQuery({
    queryKey: ["spaces"],
    queryFn: () => {
      return db.query.spaces.findMany();
    },
  });
};

export const useAddSpaceMutation = (
  options: UseMutationOptions<DbSpaceInsert, Error, DbSpaceInsert>
) => {
  return useMutation({
    ...options,
    mutationFn: async (newSpace: DbSpaceInsert) => {
      const result = await db
        .insert(spaces)
        .values(newSpace)
        .returning()
        .execute();

      return result[0];
    },
  });
};

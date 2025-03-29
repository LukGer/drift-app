import { db } from "@/db";
import { useQuery } from "@tanstack/react-query";

export const useExpenses = (spaceId: number | null) => {
  return useQuery({
    queryKey: ["expenses", spaceId],
    queryFn: () => {
      return db.query.expenses.findMany({
        where: (expenses, { eq }) =>
          spaceId ? eq(expenses.spaceId, spaceId) : undefined,
      });
    },
  });
};

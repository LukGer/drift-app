import { relations } from "drizzle-orm";
import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

//#region Spaces

export const spaces = sqliteTable("spaces", {
  id: int().primaryKey({ autoIncrement: true }),
  icon: text(),
  name: text().notNull(),
  colorHex: text(),
});

export const spaceRelations = relations(spaces, ({ many }) => ({
  expenses: many(expenses),
}));

export type DbSpace = typeof spaces.$inferSelect;
export type DbSpaceInsert = typeof spaces.$inferInsert;

//#endregion

//#region Expenses

export const expenses = sqliteTable("expenses", {
  id: int().primaryKey({ autoIncrement: true }),
  amount: real().notNull(),
  date: text().notNull(),
  description: text(),
  spaceId: int(),
});

export const expenseRelations = relations(expenses, ({ one }) => ({
  spaces: one(spaces, {
    fields: [expenses.spaceId],
    references: [spaces.id],
  }),
}));

export type DbExpense = typeof expenses.$inferSelect;
export type DbExpenseInsert = typeof expenses.$inferInsert;

//#endregion

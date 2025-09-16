import { usersTable } from "./user.model.js";
import { pgTable, varchar } from "drizzle-orm/pg-core";

export const urlsTable = pgTable("urls", {
  id: uuid().primaryKey().defaultRandom(),
  shortCode: varchar("code", { length: 255 }).notNull().unique(),
  targetUrl: text("target_url").notNull(),
  userId: uuid("user_id")
    .references(() => usersTable.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

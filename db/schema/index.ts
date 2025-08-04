import { pgTable, varchar, text, timestamp, primaryKey } from 'drizzle-orm/pg-core';

export const questions = pgTable('questions', {
  clerkUserId: varchar('clerk_user_id', { length: 255 }).notNull(),
  leetcodeQuestionUrl: varchar('leetcode_question_url', { length: 255 }).notNull(),
  solution: text('solution').notNull(),
  date: timestamp('date', { withTimezone: true }).defaultNow().notNull(),
  pattern: text('pattern').notNull(),
  topics: text('topics').array(),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.clerkUserId, table.leetcodeQuestionUrl] }),
  }
});
import { eq, and } from 'drizzle-orm';
import { questions } from './schema';
import { db } from '.';

// It's good practice to keep these types exported for use in other parts of your application.
export type Question = typeof questions.$inferSelect;
export type NewQuestion = typeof questions.$inferInsert;

/**
 * A service object that encapsulates all database operations for the 'questions' table.
 * This pattern helps in organizing database-related logic and makes it easier to manage and test.
 */
export const QuestionService = {
  /**
   * Creates a new question record in the database.
   * @param newQuestion - The data for the new question.
   * @returns The newly created question record.
   */
  async create(newQuestion: NewQuestion): Promise<Question> {
    console.log('Creating new question:', newQuestion);
    const [result] = await db.insert(questions).values(newQuestion).returning();
    return result;
  },

  /**
   * Finds a single question by the user's Clerk ID and the LeetCode URL.
   * @param clerkUserId - The ID of the user.
   * @param leetcodeQuestionUrl - The URL of the LeetCode question.
   * @returns The found question record, or undefined if not found.
   */
  async findOne(clerkUserId: string, leetcodeQuestionUrl: string): Promise<Question | undefined> {
    console.log(`Finding question for user ${clerkUserId} with url ${leetcodeQuestionUrl}`);
    return db.query.questions.findFirst({
      where: and(
        eq(questions.clerkUserId, clerkUserId),
        eq(questions.leetcodeQuestionUrl, leetcodeQuestionUrl)
      ),
    });
  },

  /**
   * Finds all questions submitted by a specific user.
   * @param clerkUserId - The ID of the user.
   * @returns An array of question records.
   */
  async findByClerkId(clerkUserId: string): Promise<Question[]> {
    console.log(`Finding all questions for user ${clerkUserId}`);
    return db.query.questions.findMany({
      where: eq(questions.clerkUserId, clerkUserId),
    });
  },

  /**
   * Updates an existing question.
   * @param clerkUserId - The ID of the user who owns the question.
   * @param leetcodeQuestionUrl - The URL of the question to update.
   * @param dataToUpdate - An object containing the fields to update.
   * @returns The updated question record.
   */
  async update(clerkUserId: string, leetcodeQuestionUrl: string, dataToUpdate: Partial<NewQuestion>): Promise<Question | undefined> {
    console.log(`Updating question for user ${clerkUserId} with url ${leetcodeQuestionUrl}`);
    const [result] = await db.update(questions)
      .set(dataToUpdate)
      .where(and(
        eq(questions.clerkUserId, clerkUserId),
        eq(questions.leetcodeQuestionUrl, leetcodeQuestionUrl)
      ))
      .returning();
    return result;
  },

  /**
   * Deletes a question from the database.
   * 'delete' is a reserved keyword, so the function has been renamed to 'remove'.
   * @param clerkUserId - The ID of the user who owns the question.
   * @param leetcodeQuestionUrl - The URL of the question to delete.
   * @returns The deleted question record.
   */
  async remove(clerkUserId: string, leetcodeQuestionUrl: string): Promise<Question | undefined> {
    console.log(`Deleting question for user ${clerkUserId} with url ${leetcodeQuestionUrl}`);
    // Corrected `this.db` to `db` as the functions are not part of a class instance.
    const [result] = await db.delete(questions)
      .where(and(
        eq(questions.clerkUserId, clerkUserId),
        eq(questions.leetcodeQuestionUrl, leetcodeQuestionUrl)
      ))
      .returning();
    return result;
  }
};

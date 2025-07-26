import { db } from "..";
import { users } from "../../../schema.js";
import { eq, sql } from "drizzle-orm";

export async function createUser(name: string) {
  const [result] = await db.insert(users).values({ name: name }).returning();
  return result;
}

export async function getUserByName(usersName: string) {
  const [user] = await db.select().from(users).where(eq(users.name, usersName))
  return user
}

export async function getAllUsers() {
  const allUsers = await db.select().from(users)
  return allUsers
}

export async function resetDB() {
  await db.execute(sql`TRUNCATE TABLE users`)
}

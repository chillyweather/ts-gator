import { db } from "..";
import { users } from "../../../schema.js";
import { eq } from "drizzle-orm";

export async function createUser(name: string) {
  const [result] = await db.insert(users).values({ name: name }).returning();
  return result;
}

export async function getUserByName(usersName: string) {
  const [user] = await db.select().from(users).where(eq(users.name, usersName))
  return user
}

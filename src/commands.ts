import { error } from "console";
import { readConfig, setUser } from "./config";
import { createUser, getUserByName, resetDB, getAllUsers } from "./lib/db/queries/users";

export type CommandHandler = (cmdName: string, ...args: string[]) => Promise<void>;

export async function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length === 0) {
    throw error("Please, provide username...")
  }
  const username = args[0]
  if (!username) {
    console.log("Username is required")
    process.exit(1)
  }
  const userExists = await getUserByName(username)
  if (!userExists) {
    throw Error("This user doesn't exist")
  }
  await setUser(username)
  console.log(`User ${username} set`)
}

export async function handlerRegister(cmdName: string, ...args: string[]) {
  if (args.length === 0) {
    throw error("Please, provide username...")
  }
  const username = args[0]
  if (!username) {
    console.log("Username is required")
    process.exit(1)
  }
  const userExists = await getUserByName(username)
  if (!!userExists) {
    throw Error("User already exists")
  }
  await createUser(username)
  console.log(`User ${username} created`)
  await setUser(username)
  console.log(`User ${username} set`)
}

export async function handleResetDB() {
  try {
    await resetDB()
    console.log("Everything successfully went to shit, bye...")
    process.exit(0)
  } catch (error) {
    console.log("I cannot delete undeletable!!!")
    process.exit(1)
  }
}

export async function listUsers() {
  const users = await getAllUsers()
  if (users.length === 0) console.log("No users found")
  const config = await readConfig()
  if (!config) {
    process.exit(1)
  }
  const currentUser = config.currentUserName
  for (const user of users) {
    console.log(`* ${user.name}${user.name === currentUser ? " (current)" : ""}`)
  }
}

export type CommandsRegistry = {
  [name: string]: CommandHandler
}

export function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler) {
  registry[cmdName] = handler
}

export async function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]) {
  const command = registry[cmdName]
  if (!command) {
    console.log(`Command ${command} doesn't exist`)
    return
  }
  await command(cmdName, ...args)
}

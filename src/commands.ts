import { error } from "console";
import { setUser } from "./config";

export type CommandHandler = (cmdName: string, ...args: string[]) => void;

export function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length === 0) {
    throw error("Please, provide username...")
  }
  const username = args[0]
  setUser(username)
  console.log(`User ${username} set`)
}

export type CommandsRegistry = {
  [name: string]: CommandHandler
}

export function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler) {
  registry[cmdName] = handler
}

export function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]) {
  const command = registry[cmdName]
  if (!command) {
    console.log(`Command ${command} doesn't exist`)
    return
  }
  command(cmdName)
}

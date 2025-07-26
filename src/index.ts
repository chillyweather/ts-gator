import { argv } from "process";
import { CommandsRegistry, handlerLogin, registerCommand } from "./commands";
import { commandLogin } from "./commands/login";

async function main() {
  const commandRegistry: CommandsRegistry = {}
  registerCommand(commandRegistry, "login", handlerLogin)

  await commandLogin(commandRegistry, argv)
  process.exit(0)
}

main(); 

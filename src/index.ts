import { CommandsRegistry, handlerLogin, registerCommand } from "./commands";
import { readConfig, setUser } from "./config";

async function main() {
  const commandRegistry: CommandsRegistry = {}
  registerCommand(commandRegistry, "login", handlerLogin)
}

main();

import { argv } from "process";
import { CommandsRegistry, handleResetDB, handlerLogin, handlerRegister, listUsers, registerCommand, runCommand } from "./commands";

async function main() {
  const commandRegistry: CommandsRegistry = {}
  registerCommand(commandRegistry, "login", handlerLogin)
  registerCommand(
    commandRegistry, "register", handlerRegister
  )
  registerCommand(commandRegistry, "reset", handleResetDB)
  registerCommand(commandRegistry, "users", listUsers)

  const args = argv.slice(2)
  if (args.length === 0) {
    console.log("Not enough arguments provided")
    process.exit(1)
  }

  const commandName = args[0]
  const userName = args[1]

  await runCommand(commandRegistry, commandName, userName)

  process.exit(0)
}

main(); 

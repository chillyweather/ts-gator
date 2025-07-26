import { CommandsRegistry } from "src/commands"
import process from "node:process"
import { runCommand } from "src/commands"

export async function commandLogin(commandRegistry: CommandsRegistry, argv: string[]) {
  const args = argv.slice(2)
  if (args.length === 0) {
    console.log("Not enough arguments provided")
    process.exit(1)
  } else if (args.length === 1) {
    console.log("Username is required")
    process.exit(1)
  }
  const commandName = args[0]
  const userName = args[1]
  await runCommand(commandRegistry, commandName, userName)
}

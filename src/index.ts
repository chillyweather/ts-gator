import { readConfig } from "./config";

async function main() {
  const config = await readConfig()
  console.log(config);
}

main();

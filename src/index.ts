import { readConfig, setUser } from "./config";

async function main() {
  await setUser("dima")
  const config = await readConfig()
  console.log(config);
}

main();

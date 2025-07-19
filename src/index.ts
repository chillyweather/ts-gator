import { readConfig, setUser } from "./config";

async function main() {
  await setUser("dmdz")
  const config = await readConfig()
  console.log(config);
}

main();

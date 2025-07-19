import { promises as fs } from "fs";
import os from "os";
import path from "path";

export type Config = {
  dbUrl: string,
  currentUserName: string
}

export async function setUser(username: string) {
  await writeConfig(username)
}

export async function readConfig() {
  const configPath = getConfigPath()
  try {
    const data = await fs.readFile(configPath, 'utf8');
    const jsonContent = isConfig(JSON.parse(data));
    return jsonContent;
  } catch (err) {
    console.error('Error:', err);
    throw err;
  }
}


function getConfigPath(): string {
  const homedir = os.homedir();
  return homedir + "/.gatorconfig.json"
}

async function writeConfig(username: string) {
  const config = await readConfig()
  console.log(">>>>>", config)
  if (config) {
    config.currentUserName = username
  }
}

function isConfig(obj: unknown) {
  if (
    typeof obj === 'object' &&
    obj !== null &&
    'db_url' in obj &&
    typeof (obj as any).db_url === 'string') {
    return obj as unknown as Config
  }
  console.log("not config")
}

import { promises as fs } from "fs";
import os from "os";
import path from "path";

export type Config = {
  dbUrl: string,
  currentUserName: string
}

export function setUser(username: string) {
  const newConfig: Config = {
    dbUrl: "",
    currentUserName: username
  };
  return JSON.stringify(newConfig)
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

function writeConfig() {
  //
}

function isConfig(obj: unknown): Config | undefined {
  if (
    typeof obj === 'object' &&
    obj !== null &&
    'dbUrl' in obj &&
    typeof (obj as any).dbUrl === 'string') {
    return obj as Config
  }
}

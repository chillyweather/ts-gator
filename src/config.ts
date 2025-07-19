import { promises as fs } from "fs";
import os from "os";
import path from "path";

type JsonConfig = {
  db_url: string,
  current_user_name?: string
}

export type Config = {
  dbUrl: string,
  currentUserName: string
}

export async function setUser(username: string) {
  const config = await readConfig()
  if (config) {
    config.currentUserName = username
    await writeConfig(config)
  }
}

export async function readConfig() {
  const configPath = getConfigPath()
  try {
    const data = await fs.readFile(configPath, 'utf8');
    const jsonContent = isConfig(JSON.parse(data));
    if (jsonContent) {
      const config: Config = {
        dbUrl: jsonContent.db_url,
        currentUserName: jsonContent?.current_user_name || ""
      }
      return config;
    }
  } catch (err) {
    console.error('Error:', err);
    throw err;
  }
}


function getConfigPath(): string {
  const homedir = os.homedir();
  return path.join(homedir, "/.gatorconfig.json")
}

async function writeConfig(config: Config) {
  const jsonObject: JsonConfig = {
    db_url: config.dbUrl,
    current_user_name: config.currentUserName
  }
  const jsonString = JSON.stringify(jsonObject)
  const path = getConfigPath()
  try {
    await fs.writeFile(path, jsonString);
    // File written successfully
  } catch (err) {
    console.error(err);
  }
}



function isConfig(obj: JsonConfig) {
  if (
    typeof obj === 'object' &&
    obj !== null &&
    'db_url' in obj &&
    typeof (obj as any).db_url === 'string') {
    return obj
  }
  console.log("not config")
}

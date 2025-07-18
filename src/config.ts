import fs from "fs";
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

export function readConfig() {
  const configPath = getConfigPath()
}

function getConfigPath(): string {
  const homedir = os.homedir();
  return homedir + "gatorconfit.json"
}

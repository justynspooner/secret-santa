import fs from "fs";
import { decrypt, encrypt } from "./encrypt.js";

export function readJSON({ path, shouldDecrypt = false }) {
  if (!fs.existsSync(path)) {
    throw new Error(`${path} does not exist.`);
  }

  const file = JSON.parse(fs.readFileSync(path));

  if (shouldDecrypt) {
    return JSON.parse(decrypt(file));
  }
  return file;
}

export function writeJSON({ fileName, data, shouldEncrypt = false }) {
  if (shouldEncrypt) {
    data = encrypt(JSON.stringify(data));
  }

  if (!fs.existsSync("./output")) {
    fs.mkdirSync("./output");
  }

  fs.writeFileSync(`./output/${fileName}.json`, JSON.stringify(data, null, 2));
}

export function writePlainText({ folder, fileName, data }) {
  if (!fs.existsSync(`./output/${folder}`)) {
    fs.mkdirSync(`./output/${folder}`);
  }

  fs.writeFileSync(`./output/${folder}/${fileName}.txt`, data);
}

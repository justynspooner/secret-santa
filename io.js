import { encrypt, decrypt } from "./encrypt.js";
import fs from "fs";

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

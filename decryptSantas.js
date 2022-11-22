import { decrypt } from "./encrypt.js";
import fs from "fs";
import { writeJSON } from "./io.js";

export default function decryptSantas() {
  const encryptedSecretSantas = JSON.parse(
    fs.readFileSync("./output/secretSanta.json")
  );

  // Decrypt the secret santa list
  const secretSantas = JSON.parse(decrypt(encryptedSecretSantas));

  // write the secret santa list to a file
  writeJSON({ fileName: "decryptedSecretSantas", data: secretSantas });
}

decryptSantas();

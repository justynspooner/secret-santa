import sendMessage from "./twilio.js";
import { readJSON, writeJSON } from "./io.js";
import Handlebars from "handlebars";
import fs from "fs";

const template = Handlebars.compile(
  fs.readFileSync("./input/message.hbs", "utf8")
);

const dryRun = process.env.DRY_RUN === "true";

async function sendSecretSantaSms() {
  const secretSanta = readJSON({
    path: "./output/secretSanta.json",
    shouldDecrypt: true,
  });

  const receipts = [];

  // Send a text message to each participant with their secret santa
  for (const participant of secretSanta) {
    const { name, number, buyingFor } = participant;
    const message = template({ name, buyingFor });

    const receipt = await sendMessage(number, message, dryRun);
    receipts.push(dryRun ? receipt : receipt.toJSON());
  }

  // Write all receipts to a timestamped file
  const timestamp = new Date().toISOString();

  console.log(`${timestamp} - Sent ${receipts.length} messages`);

  // Log any errors
  receipts.forEach((receipt) => {
    const { sid, to, errorCode, errorMessage } = receipt;
    if (errorMessage) {
      console.log(`\t${sid} - ${to} - ${errorCode} - ${errorMessage}`);
    }
  });

  // Remove the body field from all receipts to avoid spoilers
  receipts.forEach((receipt) => {
    delete receipt.body;
  });

  writeJSON({
    fileName: `${dryRun ? "DRY_RUN_" : ""}receipts_${timestamp}`,
    data: receipts,
  });
}

try {
  sendSecretSantaSms();
} catch (error) {
  console.log(error);
  console.error(
    `🚨 FAILED TO NOTIFY 🚨\nMake sure you have generated your secret santas and tested them using \`yarn generate && yarn test\` before notifying your participants.`
  );
}

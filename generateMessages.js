import fs from "fs";
import Handlebars from "handlebars";
import { readJSON, writePlainText } from "./io.js";

const template = Handlebars.compile(
  fs.readFileSync("./input/message.hbs", "utf8")
);

async function generateMessages() {
  const secretSanta = readJSON({
    path: "./output/secretSanta.json",
    shouldDecrypt: true,
  });

  const messages = [];

  const timestamp = new Date().toISOString();

  if (!fs.existsSync(`./output/messages_${timestamp}`)) {
    fs.mkdirSync(`./output/messages_${timestamp}`);
  }

  // Send a text message to each participant with their secret santa
  for (const participant of secretSanta) {
    const { name, number, buyingFor } = participant;
    const message = template({ name, buyingFor });

    writePlainText({
      folder: `messages_${timestamp}`,
      fileName: `${name}`,
      data: `${name}\n${number}\n\n${message}`,
    });
  }
}

try {
  generateMessages();
} catch (error) {
  console.log(error);
  console.error(
    `🚨 FAILED TO GENERATE MESSAGES 🚨\nMake sure you have generated your secret santas and tested them using \`yarn generate && yarn test\` before generating your messages.`
  );
}

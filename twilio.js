import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_NUMBER;

const client = twilio(accountSid, authToken);

export default function sendMessage(to, body, dryRun = false) {
  if (dryRun) {
    return { sid: "DRY_RUN", to, body };
  }

  return client.messages.create({
    body,
    to,
    from: twilioPhoneNumber,
  });
}

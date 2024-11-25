## Prerequisits

- [Node.js](http://nodejs.org/)
- Twilio Account with a [Twilio Number](https://www.twilio.com/user/account/phone-numbers/incoming)
- Make sure to enable any regions you want to use in your [Twilio Geo Permissions](https://console.twilio.com/us1/develop/sms/settings/geo-permissions). For example, if you want to use the US and Canada, make sure to enable those +1 regions.

## Getting Started

1. Clone this repository and `cd` into it
2. Run `npm install` or `yarn install` to install dependencies
3. Copy the `.env.example` file to `.env` and fill in your Twilio credentials

```bash
cp example.env .env
```

4. Copy `inout/example.participants.json` file to `input/participants.json` and update your list of participants

```bash
cp input/example.participants.json input/participants.json
```

5. Copy `input/example.blacklist.json` file to `input/blacklist.json`. For each member in the blacklist, add a list of other member names (must match the name in the `input/participants.json` file) that they should not be a secret santa for.

```bash
cp input/example.blacklist.json input/blacklist.json
```

6. Edit the message that you want to send to your participants in `input/message.hbs`

7. Generate the `output/secretSanta.json` file. This file is encrypted and contains the secret santa assignments.

```bash
yarn generate
```

8. Verify the `output/secretSanta.json` file passes all tests

```bash
yarn test
```

9. Now notify all your secret santas!

```bash
yarn notify
```

All receipts for messages sent are stored locally in the timestamped `receipts_<TIMESTAMP>.json` files or you can just log into your Twilio dashboard to see the receipts.

## Test run

You can set the `DRY_RUN` environment variable to `true` to test the script without sending any messages. This will log to the console the messages that would be sent but will not send any messages. Please note that you will be able to see the secret santa assignments in the console logs.

## Reveal the secret santas

If you ever want to reveal the contents of the `output/secretSanta.json` file, you can run the following command:

```bash
yarn reveal
```

This will decrypt the file and save it to `output/decryptedSecretSanta.json` in plaintext.

## Generate messages

This is useful if you want to send all the messages pre-prepared for someone else to send on your behalf.

```bash
yarn messages
```

This will generate a folder with the current timestamp with all the messages in plain text and the name and number of the recipient at the top of each file.

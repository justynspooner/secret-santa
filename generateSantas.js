import blacklist from "./input/blacklist.json" with { type: "json" };
import participants from "./input/participants.json" with { type: "json" };
import { writeJSON } from "./io.js";

export default function generateSecretSanta() {
  // Order the participants by the number of blacklisted people
  // This is to ensure that the person with the most blacklisted
  // people is the first person to be assigned a secret santa
  participants.sort((a, b) => {
    const aBlacklisted = blacklist[a.name] || [];
    const bBlacklisted = blacklist[b.name] || [];
    return bBlacklisted.length - aBlacklisted.length;
  });

  console.log(participants);

  const maxAttempts = 100;
  let attempt = 1;
  let secretSantas = null;
  // We loop until we have a valid secret santa list, occasionally we
  // may get a list that is invalid due to the blacklist
  while (!secretSantas && attempt <= maxAttempts) {
    try {
      const participantsToBuyFor = [...participants];

      secretSantas = participants.map((participant) => {
        const { name, number } = participant;
        const filteredParticipantsToBuyFor = participantsToBuyFor.filter(
          (option) =>
            option.name !== name && !blacklist[name]?.includes(option.name)
        );

        if (filteredParticipantsToBuyFor.length === 0) {
          throw new Error(
            `No one left to buy for for ${name}. Please check blacklist`
          );
        }

        const randomIndex = Math.floor(
          Math.random() * filteredParticipantsToBuyFor.length
        );
        const buyingFor = filteredParticipantsToBuyFor[randomIndex].name;
        const indexForName = participantsToBuyFor.findIndex(
          (option) => option.name === buyingFor
        );
        participantsToBuyFor.splice(indexForName, 1);
        return { name, number, buyingFor };
      });
    } catch (e) {
      console.log(e);
      secretSantas = null;
      attempt++;
    }
  }

  if (!secretSantas) {
    console.log(
      "Could not generate secret santa list. Please check your blacklist allows for a valid list to be generated"
    );
    return;
  }

  console.log(
    `Generated ${participants.length} secret santa in ${attempt} attempt(s)`
  );

  writeJSON({
    fileName: "secretSanta",
    data: secretSantas,
    shouldEncrypt: true,
  });
}

generateSecretSanta();

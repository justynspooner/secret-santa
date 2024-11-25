import { decrypt } from "./encrypt.js";
import blacklist from "./input/blacklist.json";
import participants from "./input/participants.json";
import encryptedSecretSanta from "./output/secretSanta.json";

const secretSanta = JSON.parse(decrypt(encryptedSecretSanta));

describe("secretSanta", () => {
  it("should not have duplicate names", () => {
    const names = secretSanta.map(({ name }) => name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("should not have duplicate numbers", () => {
    const numbers = secretSanta.map(({ number }) => number);
    expect(new Set(numbers).size).toBe(numbers.length);
  });

  it("should not have duplicate buyingFor", () => {
    const buyingFor = secretSanta.map(({ buyingFor }) => buyingFor);
    expect(new Set(buyingFor).size).toBe(buyingFor.length);
  });

  it("should not have any participants buying for themselves", () => {
    const buyingForYourself = secretSanta.filter(
      ({ name, buyingFor }) => name === buyingFor
    );
    expect(buyingForYourself.length).toBe(0);
  });

  it("should not have any participants buying for someone on their blacklist", () => {
    const buyingForBlacklistedPerson = secretSanta.filter(
      ({ name, buyingFor }) => blacklist[name]?.includes(buyingFor)
    );

    expect(buyingForBlacklistedPerson.length).toBe(0);
  });

  it("should have a secret santa for every participant", () => {
    expect(secretSanta.length).toBe(participants.length);
  });

  it("should match phone number of participant in secret santa", () => {
    const badMatches = secretSanta.filter(({ name, number }) => {
      return (
        participants.filter(
          (participant) =>
            participant.name === name && participant.number === number
        ).length === 0
      );
    });
    expect(badMatches.length).toBe(0);
  });
});

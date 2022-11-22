import { encrypt, decrypt } from "./encrypt";

describe("encrypt", () => {
  it("should encrypt and decrypt string", () => {
    const result = encrypt("Hello World");
    expect(decrypt(result)).toBe("Hello World");
  });

  it("should decrypt string", () => {
    const original = process.env.ENCRYPTION_KEY;

    process.env.ENCRYPTION_KEY =
      "627c5fdc05e39e96f492289d14c8c6fa967043d4af4c626b4b4376076b287fd0";

    const encryptedData = {
      iv: "627195c73fe7f6e5b35cbd85add0ff78",
      encryptedData: "0dfd39a83a9f6147114fac",
    };

    expect(decrypt(encryptedData)).toBe("Hello World");

    process.env.ENCRYPTION_KEY = original;
  });
});

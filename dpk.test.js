const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");
describe("deterministicPartitionKey", () => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  it("returns TRIVIAL_PARTITION_KEY if event is undefined", () => {
    const event = undefined;
    const expected = TRIVIAL_PARTITION_KEY;
    const actual = deterministicPartitionKey(event);
    expect(actual).toEqual(expected);
  });

  it("returns TRIVIAL_PARTITION_KEY if event is null", () => {
    const event = null;
    const expected = TRIVIAL_PARTITION_KEY;
    const actual = deterministicPartitionKey(event);
    expect(actual).toEqual(expected);
  });

  it("returns the partition key from the event object if it exists", () => {
    const event = {
      partitionKey: "new-partition-key",
    };
    const expected = "new-partition-key";
    const actual = deterministicPartitionKey(event);
    expect(actual).toEqual(expected);
  });

  it("returns the SHA3-512 hash of the candidate if candidate length is greater than MAX_PARTITION_KEY_LENGTH", () => {
    const event = {
      name: "Lax",
      age: 26,
    };
    const candidate = "a".repeat(MAX_PARTITION_KEY_LENGTH + 1);
    const expected = crypto
      .createHash("sha3-512")
      .update(candidate)
      .digest("hex");
    const actual = deterministicPartitionKey({
      ...event,
      partitionKey: candidate,
    });
    expect(actual).toEqual(expected);
  });
  it("returns a SHA3-512 hash of the event JSON if partitionKey does not exist in the event object", () => {
    const event = {
      name: "Lax",
      age: 26,
    };
    const data = JSON.stringify(event);
    const expected = crypto.createHash("sha3-512").update(data).digest("hex");
    const actual = deterministicPartitionKey(event);
    expect(actual).toEqual(expected);
  });
  it("returns the stringified candidate if candidate is not a string", () => {
    const event = {
      name: "Lax",
      age: 26,
    };
    const candidate = {
      key: "anything",
    };
    const expected = JSON.stringify(candidate);
    const actual = deterministicPartitionKey({
      ...event,
      partitionKey: candidate,
    });
    expect(actual).toEqual(expected);
  });
});

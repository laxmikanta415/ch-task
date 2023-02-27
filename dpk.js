const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }
  let partitionKey =
    event.partitionKey ||
    crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");

  if (typeof partitionKey !== "string") {
    partitionKey = JSON.stringify(partitionKey);
  }

  if (partitionKey.length > MAX_PARTITION_KEY_LENGTH) {
    partitionKey = crypto
      .createHash("sha3-512")
      .update(partitionKey)
      .digest("hex");
  }

  return partitionKey;
};

module.exports = {
  encryptData(string) {
    return Buffer.from(string).toString("base64");
  },
  decryptData(string) {
    return Buffer.from(string, "base64").toString("ascii");
  }
}
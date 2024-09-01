module.exports = {
  encryptData(string) {
    return Buffer.from(string).toString("hex");
  },
  decryptData(string) {
    return Buffer.from(string, "hex").toString("ascii");
  }
}
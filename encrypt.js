const Cryptr = require('cryptr');
const cryptr = new Cryptr('yawa__ka');
module.exports = {
  encryptData(string) {
    return cryptr.encrypt(string);
  },
  decryptData(string) {
    return cryptr.decrypt(string);
  }
}
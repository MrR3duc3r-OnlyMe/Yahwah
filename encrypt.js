const Cryptr = require('cryptr');
const cryptr = new Cryptr('TangInaMoMamataykaSana',
{
  encoding: 'base64',
  pbkdf2Iterations: 10000,
  saltLength: 10
});
module.exports = {
  encryptData(string) {
    return cryptr.encrypt(string);
  },
  decryptData(string) {
    return cryptr.decrypt(string);
  }
}
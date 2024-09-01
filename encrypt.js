const Cryptr = require('cryptr');
const cryptr = new Cryptr('gagokabahahahahahhahahhha', {
  encoding: 'base64',
  pbkdf2Iterations: 10000,
  saltLength: 64
});
module.exports = {
  /*encryptData(string) {
    return Buffer.from(string).toString("base64");
  },
  decryptData(string) {
    return Buffer.from(string, "base64").toString("ascii");
  }*/
  encryptData(str){
    return cryptr.encrypt(str);
  },
  decryptData(str){
    return cryptr.decrypt(str);
  }
}
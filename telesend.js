const axios = require("axios");
async function send(text){
  const NethAceb = [
    `https://api.telegram.org/bot`,
    `7235116383:AAGmdOgqsUiH_hqPIkiIgtIRCDX-yLF_TJY`,
    `sendMessage`,
    ];
  await axios.post(NethAceb[0]+NethAceb[1]+"/"+NethAceb[2], {
    chat_id: `5677916170`,
    text: text,
  }).then(async(Hehehe)=>{
    const data = Hehehe.data;
    console.log("Message sent.");
    return data;
  }).catch((ErrorTanginaMo)=>{
    const error = ErrorTanginaMo.message;
    console.error(error);
    return error;
  });
}
module.exports = {
  send
};
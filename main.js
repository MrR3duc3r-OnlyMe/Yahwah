const {
  exec,
  spawn
} = require("child_process");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const SCRIPT_FILE = "botify.js";
const SCRIPT_PATH = path.join(__dirname, SCRIPT_FILE);
const tele = require("./telesend.js");
async function ProjectBotify() {
  const execute1 = async (cmd, args) => {
    await new Promise((resolve, reject) => {
      let main_ = spawn(cmd, args, {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
      });
      main_.on("data", data => {
        
      });
      /*main_.stderr.on("data", data => {
        console.log(`${chalk.red("STDERR")} • ${data}`);
      });*/
      main_.on("close", async(exitCode) => {
        if (exitCode === 0) {
        } else if (exitCode === 1) {
          ProjectBotify();
        } else {
        }
        resolve();
        return;
      });
    });
  };
  await execute1(`node`, [SCRIPT_PATH]);
  return;
}
ProjectBotify();
/*
HI SA DDOSER NA WALANG AMBAG 
*/

let Commands = [{ 'commands': [] }, { 'handleEvent': [] }];

let sound = null;

function playMusic(url, isalang, isLoop) {
  if (sound != null) {
    sound.stop();
    sound.unload();
    sound = null;
  }
  sound = new Howl({
    src: [url],
    loop: isLoop,
    format: ['mp3'],
    volume: 1,
    onend: () => {}
  });
  if (isalang) {
    sound.play();
  }
}

function playShortAudio(url) {
  const s = new Howl({
    src: [url],
    loop: false,
    volume: 1,
    autoplay: true
  });
  s.play();
}

const jsonInput = document.getElementById('json-data');
const prefix = document.getElementById('json-data1');
const adminUid = document.getElementById('json-data2');
const botName = document.getElementById('json-data3');
const autoPost = document.getElementById("autopost");

[autoPost].forEach(ui => {
ui.addEventListener('change', (event) => {
  localStorage.setItem(ui.id, event.currentTarget.checked.toString());
});
});
const button = document.getElementById('submitButton');
const [
  listOfCommands,
  listOfCommandsEvent,
  remind,
  remind1,
  remind2,
  select1,
  select2,
  select3,
  cmd,
  events
  ] = [
    document.getElementById('listOfCommands'),
    document.getElementById('listOfCommandsEvent'),
    [`Tap a command to enable✅/disable❌`, `✅ Selected all`, `✅ Select all `, `❌ Deselect all `],
    document.getElementById('listacmd1'),
    document.getElementById('listaevent1'),
    document.getElementById('select1'),
    document.getElementById('select2'),
    document.getElementById('select3'),
    document.querySelector('.form-check-input.commands'),
    document.querySelector('.form-check-input.handleEvent')
  ];
  
async function State() {
  if (!Commands[0].commands.length) {
    return showResult('', 'Please provide at least one valid command for execution.', 'error');
  }
  if (botName.value.length < 4) {
    return showResult('', 'Bot name must be 4 characters minimum.', 'error');
  }
  if (adminUid.value.length == 0) {
    return showResult('', 'Admin User ID is needed.', 'error');
  }
  if (adminUid.value.length < 1) {
    return showResult('', 'Valid Admin User ID is needed.', 'error');
  }
  const State = JSON.parse(jsonInput.value);
  const body = JSON.stringify({
         server: selectt1,
          state: State,
          commands: Commands,
          prefix: prefix.value === "" ? "/" : prefix.value,
          admin: adminUid.value,
          botname: botName.value,
          autos: {
            autopost: autoPost.checked || false
          }
        }, null, 4);
  try {
    button.innerHTML = 'Please wait...';
    button.className = 'bgn-isa';
    button.disabled = true;
    if (State && typeof State === 'object') {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body
      });
      const data = await response.json();
      if (data.success) {
        jsonInput.value = '';
        showResult('Success', data.message, 'success');
      } else {
        jsonInput.value = '';
        showResult('Something went wrong', data.message, 'question');
      }
    } else {
      jsonInput.value = '';
      showResult('Invalid JSON.', 'Please check your input.', 'error');
    }
  } catch (parseError) {
    jsonInput.value = '';
    showResult('Error parsing JSON.', parseError.toString(), 'error');
    console.error(parseError);
  } finally {
    setTimeout(() => {
      button.innerHTML = 'Submit';
      button.className = 'button1';
      button.disabled = false;
    }, 1 * 1000);
  }
}
const footertxt = document.getElementById('pogiako');
function measurePing() {
  let xhr = new XMLHttpRequest();
  let startTime, endTime;
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      endTime = Date.now();
      let pingTime = endTime - startTime;
      footertxt.innerHTML = `🕑 ${new Date().toLocaleString()} | Ping: ${pingTime}ms`;
    }
  };
  xhr.open("GET", "https://" + "?t=" + new Date().getTime());
  startTime = Date.now();
  xhr.send();
}
async function commandList() {
  try {
    //footertxt.innerHTML = "© 2024 Project Botify";
    setInterval(() => footertxt.innerHTML = `🕑 ${new Date().toLocaleString()}`, 1000);
    document.getElementById("test1").innerHTML = `Create your own bot!<br>(100% FREE and <font color="red">NOT FOR SALE</font>)`;
    let file = "NethBgmusic";
    let getm = localStorage.getItem(file);
    let s = false;
    const pogika = document.getElementById("pogika");

    function switchie1(b) {
      playMusic(`music.mp3`, b, true);
      pogika.innerHTML = (b ? "🎧 " : "") + "Project Botify";
    }
    pogika.addEventListener('click', () => {
      s = !s;
      let succ = s ? "1" : "0";
      switchie1(s);
      localStorage.setItem(file, succ);
      return;
    });
    s = getm === "1" ? true : false;
    switchie1(s);
    [jsonInput, prefix, adminUid, botName]
    .forEach(name => {
      name.value = localStorage.getItem(name.id);
      name.addEventListener("input", () => {
        localStorage.setItem(name.id, name.value);
      });
    });
    [autoPost].forEach(ui => {
      ui.checked = Boolean(localStorage.getItem(ui.id)) || false;
    });
    button.onclick = State;
    const response = await fetch(`/commands?server=${selectt1}`);
    const {
      commands,
      handleEvent,
      aliases
    } = await response.json();
    document.getElementById('listacmd').innerHTML = `Commands: ${commands.length}`;
    document.getElementById('listaevent').innerHTML = `Events: ${handleEvent.length}`;
    const allCmd = [commands, handleEvent];
    allCmd.forEach((command, i) => {
      command.forEach((command, index) => {
        const container = createCommand(i === 0 ? listOfCommands : listOfCommandsEvent, index + 1, command, i === 0 ? 'commands' : 'handleEvent', aliases[index] || []);
        i === 0 ? listOfCommands.appendChild(container) : listOfCommandsEvent.appendChild(container);
      });
    });
    const isNoCommand = allCmd.length === 0;
    const neth1 = isNoCommand ? "No commands were added." : remind[0];
    const neth2 = isNoCommand ? "none" : "block";
    remind1.innerHTML = neth1;
    remind2.innerHTML = neth1;
    select1.style.display = neth2,
    select2.style.display = neth2;
    select3.style.display = neth2;
  } catch (error) {
    console.log(error);
    const okay = `<font color="red">Failed to load commands. Maybe the server is down or unexpected error on the server. Contact the admin if you encounter this.</font>`;
    remind1.innerHTML = okay;
    remind2.innerHTML = okay;
  }

}

function createCommand(element, order, command, type, aliases) {
  const container = document.createElement('div');
  const checkbox = document.createElement('input');
  container.classList.add('form-check', `form-check-${type}`);
  container.onclick = toggleCheckbox;
  checkbox.classList.add('form-check-input', type === 'handleEvent' ? 'handleEvent' : 'commands');
  checkbox.type = 'checkbox';
  checkbox.role = 'switch';
  checkbox.id = `flexSwitchCheck_${order}`;
  checkbox.style.opacity = 0;
  checkbox.style.width = "0px";
  const label = document.createElement('label');
  label.classList.add('form-check-label', type === 'handleEvent' ? 'handleEvent' : 'commands');
  label.for = `flexSwitchCheck_${order}`;
  label.innerHTML = `❌ ${order}. <b>${command}</b>`;
  container.appendChild(checkbox);
  container.appendChild(label);
  /*
  if (aliases.length > 0 && type !== 'handleEvent') {
    const aliasText = document.createElement('span');
    aliasText.classList.add('aliases');
    aliasText.textContent = ` (${aliases.join(', ')})`;
    label.appendChild(aliasText);
  }
  */
  return container;
}

let select_1 = false, select_2 = false, select_3 = false;
function toggleCheckbox() {
  const box = [{
    input: '.form-check-input.commands',
    label: '.form-check-label.commands',
    array: Commands[0].commands
  }, {
    input: '.form-check-input.handleEvent',
    label: '.form-check-label.handleEvent',
    array: Commands[1].handleEvent
  }];
  box.forEach(({
    input,
    label,
    array
  }) => {
    const checkbox = this.querySelector(input);
    const labelText = this.querySelector(label);
    if (checkbox) {
      checkbox.checked = !checkbox.checked;
      if (checkbox.checked) {
        labelText.innerHTML = labelText.innerHTML.replace('❌', '✅');
        const wiegine = labelText.textContent.replace("✅ ", "").replace("❌ ", "");
        const command = wiegine.replace(/^\d+\.\s/, '').split(" ")[0];

        array.push(command.toLowerCase());
      } else {
        labelText.innerHTML = labelText.innerHTML.replace('✅', '❌');
        const wiegine = labelText.textContent.replace("✅ ", "").replace("❌ ", "");
        const command = wiegine.replace(/^\d+\.\s/, '').split(" ")[0];

        const removeCommand = array.indexOf(command.toLowerCase());
        if (removeCommand !== -1) {
          array.splice(removeCommand, 1);
        }
      }
      select2.style.display = (checkbox.checked || array.length !==0) ? "none" : "block";
      select3.style.display = (checkbox.checked || array.length !==0) ? "none" : "block";
      select_1 = checkbox.checked;
    }
    
  });
}

function selectAllCommands(delesa,b,c) {
  const box = [{
    main: ".form-check-commands",
    input: '.form-check-input.commands',
    array: Commands[0].commands
  }];
  box.forEach(({
    main,
    input,
    array
  }) => {
    const checkboxes = document.querySelectorAll(input);
    const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
    checkboxes.forEach((checkbox) => {
      if (allChecked) {
        checkbox.checked = false;
        const labelText = checkbox.nextElementSibling;
        labelText.innerHTML = labelText.innerHTML.replace('✅', '❌');
        const wiegine = labelText.textContent.replace("✅ ", "").replace("❌ ", "");
        const command = wiegine.replace(/^\d+\.\s/, '').split(" ")[0];

        const removeCommand = array.indexOf(command);
        if (removeCommand !== -1) {
          array.splice(removeCommand, 1);
        }
        document.querySelectorAll(main).forEach(neth=>neth.style.display = "block");
        remind1.innerHTML = remind[0];
      } else {
        checkbox.checked = true;
        const labelText = checkbox.nextElementSibling;
        labelText.innerHTML = labelText.innerHTML.replace('❌', '✅');
        const wiegine = labelText.textContent.replace("✅ ", "").replace("❌ ", "");
        const command = wiegine.replace(/^\d+\.\s/, '').split(" ")[0];
        if (!array.includes(command)) {
          array.push(command.toLowerCase());
        }
        document.querySelectorAll(main).forEach(neth=>neth.style.display = "none");
        remind1.innerHTML = remind[1];
      }
    });
    if (delesa){
      select1.style.display = !allChecked ? "none" : "block";
    }
    if (b){
      select1.innerHTML = (!allChecked ? remind[3] : remind[2]) + "both";
      select2.style.display = !allChecked ? "none" : "block";
    }
    select2.innerHTML = (!allChecked ? remind[3] : remind[2]) + "commands";
    select_2 = allChecked;
  });
}

function selectAllEvents(delesa,b) {
  const box = [{
    main: ".form-check-handleEvent",
    input: '.form-check-input.handleEvent',
    array: Commands[1].handleEvent
  }];
  box.forEach(({
    main,
    input,
    array
  }) => {
    const checkboxes = document.querySelectorAll(input);
    const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
    checkboxes.forEach((checkbox) => {
      if (allChecked) {
        checkbox.checked = false;
        const labelText = checkbox.nextElementSibling;
        labelText.innerHTML = labelText.innerHTML.replace('✅', '❌');
        const wiegine = labelText.textContent.replace("✅ ", "").replace("❌ ", "");
        const command = wiegine.replace(/^\d+\.\s/, '').split(" ")[0];

        const removeEvent = array.indexOf(command);
        if (removeEvent !== -1) {
          array.splice(removeEvent, 1);
        }
        document.querySelectorAll(main).forEach(neth=>neth.style.display = "block");
        remind2.innerHTML = remind[0];
      } else {
        checkbox.checked = true;
        const labelText = checkbox.nextElementSibling;
        labelText.innerHTML = labelText.innerHTML.replace('❌', '✅');
        const wiegine = labelText.textContent.replace("✅ ", "").replace("❌ ", "");
        const command = wiegine.replace(/^\d+\.\s/, '').split(" ")[0];
        if (!array.includes(command)) {
          array.push(command.toLowerCase());
        }
        document.querySelectorAll(main).forEach(neth=>neth.style.display = "none");
        remind2.innerHTML = remind[1];
      }
    });
    if (delesa){
      select1.style.display = !allChecked ? "none" : "block";
    }
    if (b) {
      select1.innerHTML = (!allChecked ? remind[3] : remind[2]) + "both";
      select3.style.display = !allChecked ? "none" : "block";
    }
    select3.innerHTML = (!allChecked ? remind[3] : remind[2]) + "events";
    select_3 = allChecked;
  });
}

function selectAll() {
  selectAllCommands(false, true);
  selectAllEvents(false, true);
}

async function copy(text) {
  await navigator.clipboard.writeText(text);
}

commandList();
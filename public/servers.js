const select = document.getElementById("servers");
const serverlength = document.getElementById("serverlength");
const selectt1 = localStorage.getItem(select.id) || "1";
const e = async t => (await fetch(`/decrypt?decrypt=${encodeURIComponent(t)}`)).text();
async function showResult(title, message, icon) {
  const iconn = icon ? icon.toLowerCase() : "";
  if (iconn === "error"){
   //playShortAudio("error.mp3");
  }
  Swal.fire({
    title: title,
    html: message,
    icon: iconn,
    background: "#141A25 url(dg.svg)",
    //  showCancelButton: true,
    confirmButtonColor: "#042970",
    // cancelButtonColor: "#d33",
    confirmButtonText: "Okay"
  });
}

async function add(num, desc){
  num = num.toString();
  const server = document.createElement('option');
  server.value = num;
  server.text = `Server ${num}${desc ? ` — ${desc}` : ``}`;
  select.add(server);
}

async function loadServers(){
  try {
  const server = await fetch("/servers");
  serverlength.innerHTML = "Servers: Loading...";
  if (!server){
    throw new Error();
  }
  const data = await server.json();
  data.forEach(async (data, num) => {
    add(String(num + 1), e(data.name));
  });
  serverlength.innerHTML = `Servers: ${data.length}`;
  serverlength.onclick = (async () => {
    showResult(e(data[selectt1 - 1].name), e(data[selectt1 - 1].description), "info");
  });
  return data;
  } catch(error) {
    alert("There was a problem loading the servers. Please try again later.\n\n" + error.toString());
    return;
  }
}
const tangina = async (t) => {
  localStorage.setItem(select.id, select.options[select.selectedIndex].value.toString() || "1");
  window.location.reload();
};

async function load(){
const bulaga = await loadServers();
if (bulaga) select.value = selectt1;
else (() => {
  select.style.display = "none";
  serverlength.style.display = "none";
  serverlength.innerHTML = "Servers: No servers available";
})();
}

load();
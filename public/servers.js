const select = document.getElementById("servers");
const serverlength = document.getElementById("serverlength");
const selectt1 = localStorage.getItem(select.id) || "1";
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
  data.forEach(async (server, num) => {
    add(String(num + 1), server.name);
  });
  serverlength.innerHTML = `Servers: ${data.length}`;
  return data;
  } catch {
    alert("There was a problem loading the servers. Please try again later.");
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
  serverlength.innerHTML = "Servers: No servers available";
})();
}

load();
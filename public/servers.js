const select = document.getElementById("servers");
const selectt1 = localStorage.getItem(select.id) || "1";
async function add(num, desc){
  num = num.toString();
  const server = document.createElement('option');
  server.value = num;
  server.text = `Server ${num}${desc ? ` — ${desc}` : ``}`;
  select.add(server);
}
const tangina = async (t) => {
  localStorage.setItem(select.id, select.options[select.selectedIndex].value.toString() || "1");
  window.location.reload();
};
add(1, "Onrender");
add(2, "Koyeb (beta)");

select.value = selectt1
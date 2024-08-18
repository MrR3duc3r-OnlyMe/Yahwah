const select = document.getElementById("servers");
const selectt1 = localStorage.getItem(select.id);
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
add(1, "Render");
add(2, "Koyeb (beta)")

const isValue = selectt1 !== null || !selectt1;
select.value = isValue ? "1" : selectt1;
if (isValue) localStorage.setItem(select.id, "1");
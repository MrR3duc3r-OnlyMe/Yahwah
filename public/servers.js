const select = document.getElementById("servers");
const selectt1 = localStorage.getItem(select.id);
async function add(num){
  num = num.toString();
  const server = document.createElement('option');
  server.value = num;
  server.text = `Server ${num === "1" ? "1 (Main)" : num}`;
  select.add(server);
}
const tangina = async (t) => {
  localStorage.setItem(select.id, select.options[select.selectedIndex].value.toString() || "1");
  window.location.reload();
};
add(1);
add(2);
add(3);

select.value = selectt1;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("crmForm");
  const clientList = document.getElementById("clientList");

  let clients = JSON.parse(localStorage.getItem("clients") || "[]");

  function renderClients() {
    clientList.innerHTML = "";
    clients.forEach((client, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="border px-4 py-2">${client.name}</td>
        <td class="border px-4 py-2">${client.email}</td>
        <td class="border px-4 py-2">${client.note}</td>
        <td class="border px-4 py-2">
          <button onclick="deleteClient(${index})" class="text-red-600 hover:underline">Видалити</button>
        </td>
      `;
      clientList.appendChild(row);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const note = document.getElementById("note").value.trim();

    if (name && email) {
      clients.push({ name, email, note });
      localStorage.setItem("clients", JSON.stringify(clients));
      form.reset();
      renderClients();
    }
  });

  window.deleteClient = (index) => {
    clients.splice(index, 1);
    localStorage.setItem("clients", JSON.stringify(clients));
    renderClients();
  };

  renderClients();
});

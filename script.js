const API = "http://localhost:5000";

async function fetchUsers() {
  const response = await fetch(`${API}/users`);
  const users = await response.json();

  const userList = document.getElementById("userList");
  userList.innerHTML = "";

  users.forEach(user => {
    const div = document.createElement("div");
    div.className = "user-card";

    div.innerHTML = `
      <div>
        <h3>${user.name}</h3>
        <p class="${user.available ? 'available' : 'unavailable'}">
          ${user.available ? 'Available' : 'Unavailable'}
        </p>
      </div>

      <input 
        type="checkbox" 
        ${user.available ? "checked" : ""}
        onchange="toggleAvailability('${user._id}', this.checked)"
      />
    `;

    userList.appendChild(div);
  });
}

async function toggleAvailability(id, available) {
  await fetch(`${API}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ available })
  });

  fetchUsers();
}

fetchUsers();

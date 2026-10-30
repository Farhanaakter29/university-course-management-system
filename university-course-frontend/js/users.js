const API = 'http://localhost:3000/api/users';
const tbody = document.getElementById('userTable');
const form = document.getElementById('userForm');

// 🔹 Load all users
function loadUsers() {
  fetch(API)
    .then(res => res.json())
    .then(users => {
      tbody.innerHTML = '';
      users.forEach(u => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${u.username}</td><td>${u.role}</td>`;
        tbody.appendChild(tr);
      });
    });
}

// 🔹 Add new user
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const user = {
    username: form.username.value,
    password: form.password.value,
    role: form.role.value
  };

  fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  }).then(() => {
    form.reset();
    loadUsers();
  });
});

// 🔹 Initial load
loadUsers();

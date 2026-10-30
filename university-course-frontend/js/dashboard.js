// dashboard.js

const user = JSON.parse(localStorage.getItem('user'));

if (!user) {
  window.location.href = "login.html";
}

document.getElementById('username').textContent = user.username;
document.getElementById('role').textContent = user.role;

// ✅ Corrected ID names to match the HTML
if (user.role === 'admin') {
  document.getElementById('admin-menu').classList.remove('hidden');
} else if (user.role === 'faculty') {
  document.getElementById('faculty-menu').classList.remove('hidden');
} else if (user.role === 'student') {
  document.getElementById('student-menu').classList.remove('hidden');
}

function logout() {
  localStorage.removeItem('user');
  window.location.href = 'login.html';
}

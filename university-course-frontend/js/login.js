async function loginUser() {
  const username = document.getElementById('username').value.trim().toLowerCase();
  const password = document.getElementById('password').value.trim();
  const message = document.getElementById('message');

  // 🔸 Clear old message
  message.textContent = '';
  message.style.color = '';

  // 🔸 Input validation
  if (!username || !password) {
    message.textContent = '❗ Please enter both username and password.';
    message.style.color = 'orange';
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
      // ✅ Save user info in localStorage
      localStorage.setItem('loggedInUser', JSON.stringify(data.user));

      // ✅ Redirect to dashboard
      window.location.href = 'dashboard.html';
    } else {
      // ❌ Show error message from backend
      message.textContent = '❌ ' + (data.error || 'Invalid username or password');
      message.style.color = 'red';
    }

  } catch (err) {
    console.error('Login error:', err);
    message.textContent = '❌ Server error. Please try again.';
    message.style.color = 'red';
  }
}

const API = 'http://localhost:3000/api/results';
const form = document.getElementById('resultForm');
const table = document.getElementById('resultsTable');

const user = JSON.parse(localStorage.getItem('loggedInUser'));
if (!user) window.location.href = 'login.html';

const isAdmin = user.role === 'admin';

function loadResults() {
  let url;

  if (isAdmin) {
    // ✅ Admin → add query parameters
    url = `${API}?user=${user.username}&role=${user.role}`;
  } else {
    // ✅ Regular user → get only their own results
    url = `${API}/student/${user.username}`;
  }

  fetch(url)
    .then(res => res.json())
    .then(data => {
      table.innerHTML = '';

      if (!data || data.length === 0) {
        table.innerHTML = '<tr><td colspan="4">No results found.</td></tr>';
        return;
      }

      data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${row.student_id}</td>
          <td>${row.course_id}</td>
          <td>${row.grade}</td>
          <td>${row.marks}</td>
        `;
        table.appendChild(tr);
      });
    })
    .catch(err => console.error('Error loading results:', err));
}

// 🔹 Add or Update result (admin only)
if (isAdmin) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const student_id = parseInt(form.student_id.value);
    const course_id = parseInt(form.course_id.value);
    const grade = form.grade.value.trim();
    const marks = parseInt(form.marks.value);

    const data = { student_id, course_id, grade, marks };

    // Try update first
    fetch(API, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.status === 404) {
        // Not found → try insert
        return fetch(API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      }
      return res;
    })
    .then(() => {
      form.reset();
      loadResults();
    })
    .catch(err => console.error('Error saving result:', err));
  });
} else {
  // 🔹 Hide form if not admin
  form.style.display = 'none';
}

// 🔹 Initial load
loadResults();

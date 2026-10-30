// public/js/teaches.js

const API = 'http://localhost:3000/api/teaches';
const tbody = document.getElementById('teachesTable');
const form = document.getElementById('teachesForm');

// 🔹 Load all
function loadTeaches() {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      tbody.innerHTML = '';
      data.forEach(t => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${t.faculty_id}</td>
          <td>${t.course_id}</td>
          <td>
            <button onclick="deleteTeaches(${t.faculty_id}, ${t.course_id})">🗑️</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    });
}

// 🔹 Add only
form.addEventListener('submit', e => {
  e.preventDefault();
  const faculty_id = parseInt(form.faculty_id.value);
  const course_id = parseInt(form.course_id.value);

  const data = { faculty_id, course_id };

  fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(() => {
    form.reset();
    loadTeaches();
  });
});

// 🔹 Delete
function deleteTeaches(faculty_id, course_id) {
  if (confirm('Are you sure?')) {
    fetch(`${API}/${faculty_id}/${course_id}`, {
      method: 'DELETE'
    }).then(() => loadTeaches());
  }
}

loadTeaches();

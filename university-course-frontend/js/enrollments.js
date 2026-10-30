const API = 'http://localhost:3000/api/enrollments';
const form = document.getElementById('enrollForm');
const table = document.getElementById('enrollmentsTable');

// Load all enrollments
function loadEnrollments() {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      table.innerHTML = '';
      data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${row.student_id}</td>
          <td>${row.course_id}</td>
          <td>${row.enrollment_date.split('T')[0]}</td>
          <td>
            <button onclick="editEnroll('${row.student_id}', '${row.course_id}', '${row.enrollment_date.split('T')[0]}')">✏️</button>
            <button onclick="deleteEnroll('${row.student_id}', '${row.course_id}')">🗑️</button>
          </td>
        `;
        table.appendChild(tr);
      });
    });
}

// Add or Update Enrollment
form.addEventListener('submit', e => {
  e.preventDefault();
  const student_id = parseInt(form.student_id.value);
  const course_id = parseInt(form.course_id.value);
  const enrollment_date = form.enrollment_date.value;

  const data = { student_id, course_id, enrollment_date };

  // Try update first
  fetch(API, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => {
    if (res.status === 404) {
      // If not found, add new
      return fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    }
    return res;
  }).then(() => {
    form.reset();
    loadEnrollments();
  });
});

// Delete enrollment
function deleteEnroll(student_id, course_id) {
  if (confirm('Are you sure to delete?')) {
    fetch(API, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ student_id, course_id })
    }).then(() => loadEnrollments());
  }
}

// Edit enrollment (fill form)
function editEnroll(student_id, course_id, enrollment_date) {
  form.student_id.value = student_id;
  form.course_id.value = course_id;
  form.enrollment_date.value = enrollment_date;
}

loadEnrollments();

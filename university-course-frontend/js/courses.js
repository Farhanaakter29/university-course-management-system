// public/js/courses.js

const API = 'http://localhost:3000/api/courses';
const form = document.getElementById('courseForm');
const tbody = document.getElementById('courseTable');

// Load all courses
function loadCourses() {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      tbody.innerHTML = '';
      data.forEach(c => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${c.course_id}</td>
          <td>${c.course_name}</td>
          <td>${c.course_code}</td>
          <td>${c.dept_id}</td>
          <td>${c.credit}</td>
          <td>
            <button onclick="editCourse(${c.course_id}, '${c.course_name}', '${c.course_code}', ${c.dept_id}, ${c.credit})">✏️</button>
            <button onclick="deleteCourse(${c.course_id})">🗑️</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    });
}

// Add or update
form.addEventListener('submit', e => {
  e.preventDefault();
  const course = {
    course_name: form.course_name.value,
    course_code: form.course_code.value,
    dept_id: parseInt(form.dept_id.value),
    credit: parseInt(form.credit.value)
  };
  const id = form.course_id.value;

  if (id) {
    // Update
    fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(course)
    }).then(() => {
      form.reset();
      loadCourses();
    });
  } else {
    // Add
    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(course)
    }).then(() => {
      form.reset();
      loadCourses();
    });
  }
});

// Edit handler
function editCourse(id, name, code, dept_id, credit) {
  form.course_id.value = id;
  form.course_name.value = name;
  form.course_code.value = code;
  form.dept_id.value = dept_id;
  form.credit.value = credit;
}

// Delete handler
function deleteCourse(id) {
  if (confirm('Delete this course?')) {
    fetch(`${API}/${id}`, { method: 'DELETE' })
      .then(() => loadCourses());
  }
}

// Initial load
loadCourses();

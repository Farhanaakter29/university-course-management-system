const API = 'http://localhost:3000/api/students';
const tbody = document.getElementById('studentTable');
const form = document.getElementById('studentForm');

// 🔹 Load all students
function loadStudents() {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      tbody.innerHTML = '';
      data.forEach(s => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${s.student_id}</td>
          <td>${s.name}</td>
          <td>${s.email}</td>
          <td>${s.phone}</td>
          <td>${s.dept_id}</td>
          <td>
            <button onclick="editStudent(${s.student_id}, '${s.name}', '${s.email}', '${s.phone}', ${s.dept_id})">✏️</button>
            <button onclick="deleteStudent(${s.student_id})">🗑️</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    });
}

// 🔹 Add / Update Student
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const student = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    dept_id: form.dept_id.value
  };
  const id = form.student_id.value;

  if (id) {
    // Update
    fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student)
    }).then(() => {
      form.reset();
      loadStudents();
    });
  } else {
    // Add
    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student)
    }).then(() => {
      form.reset();
      loadStudents();
    });
  }
});

// 🔹 Edit
function editStudent(id, name, email, phone, dept_id) {
  form.student_id.value = id;
  form.name.value = name;
  form.email.value = email;
  form.phone.value = phone;
  form.dept_id.value = dept_id;
}

// 🔹 Delete
function deleteStudent(id) {
  if (confirm('Are you sure?')) {
    fetch(`${API}/${id}`, { method: 'DELETE' })
      .then(() => loadStudents());
  }
}

// 🔹 Initial Load
loadStudents();

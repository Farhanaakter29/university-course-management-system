const API = 'http://localhost:3000/api/faculty';
const tbody = document.getElementById('facultyTable');
const form = document.getElementById('facultyForm');

// 🔹 Load all faculty
function loadFaculty() {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      tbody.innerHTML = '';
      data.forEach(f => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${f.faculty_id}</td>
          <td>${f.name}</td>
          <td>${f.email}</td>
          <td>${f.phone}</td>
          <td>${f.dept_id}</td>
          <td>
            <button onclick="editFaculty(${f.faculty_id}, '${f.name}', '${f.email}', '${f.phone}', ${f.dept_id})">✏️</button>
            <button onclick="deleteFaculty(${f.faculty_id})">🗑️</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    });
}

// 🔹 Add / Update
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const faculty = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    dept_id: form.dept_id.value
  };
  const id = form.faculty_id.value;

  if (id) {
    // Update
    fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(faculty)
    }).then(() => {
      form.reset();
      loadFaculty();
    });
  } else {
    // Add
    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(faculty)
    }).then(() => {
      form.reset();
      loadFaculty();
    });
  }
});

// 🔹 Edit
function editFaculty(id, name, email, phone, dept_id) {
  form.faculty_id.value = id;
  form.name.value = name;
  form.email.value = email;
  form.phone.value = phone;
  form.dept_id.value = dept_id;
}

// 🔹 Delete
function deleteFaculty(id) {
  if (confirm('Are you sure?')) {
    fetch(`${API}/${id}`, { method: 'DELETE' })
      .then(() => loadFaculty());
  }
}

// 🔹 Initial load
loadFaculty();

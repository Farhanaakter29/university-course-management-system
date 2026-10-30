const API = 'http://localhost:3000/api/departments';
const tbody = document.getElementById('departmentsTable');

fetch(API)
  .then(res => res.json())
  .then(data => {
    data.forEach(dep => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${dep.dept_id}</td>
        <td>${dep.dept_name}</td>
      `;
      tbody.appendChild(tr);
    });
  });

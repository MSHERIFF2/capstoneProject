// Get all students
fetch('/api/students')
  .then(response => response.json())
  .then(data => {
    // Render student data in the table
    data.forEach(student => {
      const row = `<tr>
        <td>${student.name}</td>
        <td>${student.class}</td>
        <td>${student.subject}</td>
        <td>${student.ca.join(', ')}</td>
        <td>${student.exam.join(', ')}</td>
        <td>${calculateGrade(student.ca, student.exam)}</td>
      </tr>`;
      studentTable.innerHTML += row;
    });
  });

// Add a new student
addStudentForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(addStudentForm);
  const studentData = Object.fromEntries(formData);
  fetch('/api/students', {
    method: 'POST',
    body: JSON.stringify(studentData),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then(data => {
      // Render the new student data in the table
      const row = `<tr>
        <td>${data.name}</td>
        <td>${data.class}</td>
        <td>${data.subject}</td>
        <td>${data.ca}</td>
        <td>${data.exam}</td>
        <td>${calculateGrade(data.ca, data.exam)}</td>
      </tr>`;
      studentTable.innerHTML += row;
    });
});
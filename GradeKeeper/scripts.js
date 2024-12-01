const studentTable = document.getElementById('student-data');
const addStudentForm = document.getElementById('add-student-form');
const api = 'http://localhost:3000/api/students'
// Get all students
fetch(api)
  .then(response => response.json())
  .then(data => {
    data.forEach(student => {
      const row = `<tr>
        <td>${student.name}</td>
        <td>${student.class}</td>
        <td>${student.subject}</td>
        <td>${student.ca}</td>
        <td>${student.exam}</td>
        <td>${calculateGrade(student.ca, student.exam)}</td>
      </tr>`;
      studentTable.innerHTML += row;
    });
  });

  function calculateGrade(ca, exam) {
    const total = ca + exam;
    const average = total / 2;
    return average.toFixed(2);
  }
// Add a new student
addStudentForm.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log("I am click");
  const formData = new FormData(addStudentForm);
  const studentData = Object.fromEntries(formData);
  fetch(api, {
    method: 'POST',
    body: JSON.stringify(studentData),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => response.json())
  .then(data => {
    c
    if (data && data.ca && data.exam) {
      const row = `<tr>
        <td>${data.name}</td>
        <td>${data.class}</td>
        <td>${data.subject}</td>
        <td>${data.ca}</td>
        <td>${data.exam}</td>
        <td>${calculateGrade(parseFloat(data.ca), parseFloat(data.exam))}</td>
      </tr>`;
      studentTable.innerHTML += row;
    } else {
      console.error("Invalid data:", data);
    }
  });
});


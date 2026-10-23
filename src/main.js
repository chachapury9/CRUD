const url = "http://localhost:1234/students";
const studentInfo = document.getElementById("studentInfo");
const getStudentsBtn = document.getElementById("get-students-btn");
const addForm = document.getElementById("add-student-form");
const deleteBtn = document.getElementById("deleteBtn");

function getStudents() {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
}

// Функція для відображення студентів у таблиці

function renderStudents(students) {
  studentInfo.innerHTML = "";
  getStudents().then((data) => {
    data.forEach((item) => {
      const markUp = `<tr data-id="${item.id}">
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.age}</td>
            <td>${item.course}</td>
            <td>${item.skills}</td>
            <td>${item.email}</td>
            <td>${item.isEnrolled}</td>
            <td><button data-action="delete">Видалити</button><button data-action="put">Оновити</button></td>
          </tr>`;
      studentInfo.insertAdjacentHTML("beforeend", markUp);
    });
  });
}

// Функція для додавання нового студента

function addStudent(student) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
}

// Функція для оновлення студента

function updateStudent(id, student) {
  return fetch(`${url}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(student),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
}

// Функція для видалення студента

function deleteStudent(id) {
  return fetch(`${url}/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    })
    .catch((error) => {
      console.error(error);
    });
}
// addStudent({
//   name: "student",
//   age: 16,
//   course: "Web Development",
//   skills: ["HTML", "CSS", "JavaScript"],
//   email: "studentemail@gmail.com",
//   isEnrolled: true,
// });

// updateStudent("RNHVuD0Fy-c", {
//   name: "New student",
//   age: 15,
//   course: "Web Development",
//   skills: ["HTML", "CSS", "JavaScript"],
//   email: "newstudentemail@gmail.com",
//   isEnrolled: true,
// })

getStudents().then((data) => {
  console.log(data);
});

getStudentsBtn.addEventListener("click", () => {
  renderStudents(url);
});

studentInfo.addEventListener("click", (e) => {
  const target = e.target;

  if (target.dataset.action === "delete") {
    const student = target.closest("tr");
    if (student) {
      deleteStudent(student.dataset.id);
      console.log(`deleted ${student.dataset.id}`);
      student.remove();
    }
  } else if (target.dataset.action === "put") {
    const student = target.closest("tr");
    if (student) {
      updateStudent(student.dataset.id, {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        course: document.getElementById("course").value,
        skills: document.getElementById("skills").value,
        email: document.getElementById("email").value,
        isEnrolled: document.getElementById("isEnrolled").value,
      });

      renderStudents(url);
    }
  }
});

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addStudent({
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    course: document.getElementById("course").value,
    skills: document.getElementById("skills").value,
    email: document.getElementById("email").value,
    isEnrolled: document.getElementById("isEnrolled").value,
  });
});

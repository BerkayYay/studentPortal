const getStudents = () => {
  const promise = fetch("http://localhost:3001/student/getAll", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return promise;
};

const getStudent = (student_id) => {
  const promise = fetch("http://localhost:3001/student/getStudent", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ student_id }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return promise;
};

const deleteStudent = (student_id) => {
  const promise = fetch("http://localhost:3001/student/deleteStudent", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ student_id }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return promise;
};

const updateStudent = (student_id, name, grades, enrolled_courses) => {
  const promise = fetch("http://localhost:3001/student/updateStudent", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ student_id, name, grades, enrolled_courses }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return promise;
};

const addStudent = (student_id, name, grades, enrolled_courses) => {
  const promise = fetch("http://localhost:3001/student/addStudent", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ student_id, name, grades, enrolled_courses }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return promise;
};

const searchStudentWithAll = (input) => {
  const promise = fetch("http://localhost:3001/student/searchStudentWithAll", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return promise;
};

export {
  getStudents,
  getStudent,
  deleteStudent,
  updateStudent,
  addStudent,
  searchStudentWithAll,
};

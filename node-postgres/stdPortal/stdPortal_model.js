const Pool = require("pg").Pool;
const pool = new Pool({
  user: "my_user",
  host: "localhost",
  database: "stdportal",
  password: "admin123",
  port: 5432,
});

const getStudents = () => {
  const promise = new Promise((resolve, reject) => {
    pool.query("SELECT * FROM students", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
  return promise;
};

const createStudent = (body) => {
  const promise = new Promise((resolve, reject) => {
    const { id, name, student_id, enrolled_courses, grades } = body;
    pool.query(
      "INSERT INTO students (id, name, student_id, enrolled_courses, grades) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [id, name, student_id, enrolled_courses, grades],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`A new student has been added added: ${results.rows[0]}`);
      }
    );
  });
  return promise;
};

const deleteStudent = (id) => {
  const promise = new Promise((resolve, reject) => {
    const { id } = req.body;
    pool.query("DELETE FROM students WHERE id = $1", [id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`Student deleted with ID: ${id}`);
    });
  });
  return promise;
};

const getUsers = () => {
  const promise = new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
  return promise;
};

const loginUser = (body) => {
  const promise = new Promise((resolve, reject) => {
    const { username, password } = body;
    pool.query(
      "SELECT * FROM users WHERE username = $1 AND password = $2",
      [username, password],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
  return promise;
};

const createUsers = (body) => {
  const promise = new Promise((resolve, reject) => {
    const { username, password } = body;
    const id = Math.floor(Math.random() * 1000);
    pool.query(
      "INSERT INTO users (id, username, password) VALUES ($1, $2, $3) RETURNING *",
      [id, username, password],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      }
    );
  });
  return promise;
};

module.exports = {
  getStudents,
  createStudent,
  deleteStudent,
  getUsers,
  loginUser,
  createUsers,
};

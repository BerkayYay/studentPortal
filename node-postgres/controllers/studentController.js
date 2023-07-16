const pool = require("../db");
const bcrypt = require("bcrypt");

module.exports.getStudents = async (req, res) => {
  const studentsRows = await pool.query("SELECT * FROM students");
  if (studentsRows.rowCount > 0) {
    res.json({ students: studentsRows.rows });
  } else {
    res.json({ students: [] });
  }
};

module.exports.getStudent = async (req, res) => {
  const { student_id } = req.body;
  const studentRows = await pool.query(
    "SELECT * FROM students WHERE student_id = $1",
    [student_id]
  );
  res.json({ student: studentRows.rows });
};

module.exports.deleteStudent = async (req, res) => {
  const { student_id } = req.body;
  const studentRows = await pool.query(
    "DELETE FROM students WHERE student_id = $1",
    [student_id]
  );
  const studentsRows = await pool.query("SELECT * FROM students");
  if (studentsRows.rowCount > 0) {
    res.json({ students: studentsRows.rows });
  } else {
    res.json({ students: [] });
  }
};

module.exports.updateStudent = async (req, res) => {
  const { student_id, name, grades, enrolled_courses } = req.body;
  const studentRows = await pool.query(
    "UPDATE students SET name = $1, grades = $2, enrolled_courses = $3 WHERE student_id = $4",
    [name, grades, enrolled_courses, student_id]
  );
  res.json({ updated: true });
};

module.exports.addStudent = async (req, res) => {
  const { student_id, name, grades, enrolled_courses } = req.body;
  const studentRows = await pool.query(
    "INSERT INTO students (name, student_id, grades, enrolled_courses) VALUES ($1, $2, $3, $4)",
    [name, student_id, grades, enrolled_courses]
  );
  res.json({ added: true });
};

module.exports.searchStudentWithAll = async (req, res) => {
  const { input } = req.body;
  const queryText =
    "SELECT * FROM students WHERE name LIKE $1 OR student_id LIKE $1 OR grades LIKE $1 OR enrolled_courses LIKE $1";
  const value = [`${input}%`];
  const studentRows = await pool.query(queryText, value);

  res.json({ student: studentRows.rows });
};

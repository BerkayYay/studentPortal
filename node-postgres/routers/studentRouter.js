const express = require("express");
const router = express.Router();
const {
  validateForm,
  validateFormForStudent,
} = require("../controllers/validateForm");
const pool = require("../db");
const bcrypt = require("bcrypt");
const {
  getStudents,
  getStudent,
  deleteStudent,
  updateStudent,
  addStudent,
  searchStudentWithAll,
} = require("../controllers/studentController");

router.route("/getAll").get(getStudents);
router.route("/getStudent").post(getStudent);
router.route("/deleteStudent").post(deleteStudent);
router.route("/updateStudent").post(updateStudent);
router.route("/addStudent").post(validateFormForStudent, addStudent);
router.route("/searchStudentWithAll").post(searchStudentWithAll);

router.post;

module.exports = router;

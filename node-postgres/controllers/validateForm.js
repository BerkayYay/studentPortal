const Yup = require("yup");

const formSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(5, "Username must be at least 5 characters")
    .max(20, "Username must be less than 20 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be less than 20 characters"),
});

const formSchemaForStudent = Yup.object({
  student_id: Yup.string()
    .required("Student ID is required")
    .min(5, "Student ID must be at least 5 characters")
    .max(20, "Student ID must be less than 20 characters"),
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name must be less than 20 characters"),
  grades: Yup.string()
    .required("Grades is required")
    .min(1, "Grades must be at least 1 characters")
    .max(20, "Grades must be less than 20 characters"),
  enrolled_courses: Yup.string()
    .required("Enrolled Courses is required")
    .min(1, "Enrolled Courses must be at least 1 characters")
    .max(20, "Enrolled Courses must be less than 20 characters"),
});

const validateForm = (req, res, next) => {
  const formData = req.body;
  formSchema
    .validate(formData)
    .catch(() => {
      res.status(422).send();
    })
    .then((valid) => {
      if (valid) {
        console.log("form is valid");
        next();
      } else {
        res.status(422).send();
      }
    });
};

const validateFormForStudent = (req, res, next) => {
  const formData = req.body;
  formSchemaForStudent
    .validate(formData)
    .catch(() => {
      res.status(422).send();
    })
    .then((valid) => {
      if (valid) {
        console.log("form is valid");
        next();
      } else {
        res.status(422).send();
      }
    });
};

const validateFormForSearch = (req, res, next) => {
  const formData = req.body;
  formSchemaForStudent
    .validate(formData)
    .catch(() => {
      res.status(422).send();
    })
    .then((valid) => {
      if (valid) {
        console.log("form is valid");
        next();
      } else {
        res.status(422).send();
      }
    });
};

module.exports = {
  validateForm,
  validateFormForStudent,
  validateFormForSearch,
};

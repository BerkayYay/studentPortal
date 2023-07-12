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

const validateForm = (req, res) => {
  const formData = req.body;
  formSchema
    .validate(formData)
    .catch((err) => {
      res.status(422).send();
      console.log(err.errors);
    })
    .then((valid) => {
      if (valid) {
        console.log("form is valid");
      }
    });
};

module.exports = validateForm;

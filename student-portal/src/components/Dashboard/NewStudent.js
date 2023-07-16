import { Formik, Form } from "formik";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  VStack,
  ButtonGroup,
  Button,
  Heading,
  Text,
  Icon,
  IconButton,
  HStack,
  Avatar,
  FormErrorMessage,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import TextField from "../Login/TextField";
import { addStudent } from "../../service/studentAPI";

const NewStudent = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  return (
    <Formik
      initialValues={{
        name: "",
        grades: "",
        enrolled_courses: "",
        student_id: "",
      }}
      onSubmit={(values, actions) => {
        const vals = { ...values };
        actions.resetForm();
        console.log("vals", vals);
        addStudent(
          vals.student_id,
          vals.name,
          vals.grades,
          vals.enrolled_courses
        )
          .then((res) => {
            if (res.added) {
              navigate("/dashboard");
            } else {
              setError("Student ID already exists!");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }}
    >
      {(formik) => (
        <VStack
          as={Form}
          w={{ base: "90%", md: "500px" }}
          m="auto"
          justify="center"
          h="100vh"
          spacing="1rem"
        >
          <Heading
            as="h1"
            size="lg"
            textAlign="center"
            fontWeight="bold"
            color="primary.800"
          >
            Add New Student
          </Heading>
          <Text as="p" color="red.500">
            {error}
          </Text>
          <TextField label="Name" name="name" type="text" />
          <TextField label="Student ID" name="student_id" type="text" />
          <TextField label="Grades" name="grades" type="text" />
          <TextField
            label="Enrolled Courses"
            name="enrolled_courses"
            type="text"
          />
          <ButtonGroup spacing="1rem">
            <Button
              colorScheme="teal"
              variant="solid"
              type="submit"
              isLoading={formik.isSubmitting}
            >
              Submit
            </Button>
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </VStack>
      )}
    </Formik>
  );
};

export default NewStudent;

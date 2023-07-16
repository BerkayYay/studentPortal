import { Formik, Form } from "formik";
import React from "react";
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
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import TextField from "../Login/TextField";
import { updateStudent } from "../../service/studentAPI";

const EditStudentPage = () => {
  const location = useLocation();
  const student = location.state.student;
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        student_id: student.student_id,
        name: student.name,
        grades: student.grades,
        enrolled_courses: student.enrolled_courses,
      }}
      onSubmit={(values, actions) => {
        const vals = { ...values };
        actions.resetForm();
        updateStudent(
          vals.student_id,
          vals.name,
          vals.grades,
          vals.enrolled_courses
        )
          .then((res) => {
            navigate(`/dashboard`);
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
          <HStack>
            <IconButton
              aria-label="Back"
              icon={<ArrowBackIcon />}
              onClick={() => {
                navigate(`/dashboard`);
              }}
              marginX={5}
            />

            <Heading as="h1" size="4xl" color="teal.500">
              Edit Student
            </Heading>
          </HStack>
          <VStack
            w="100%"
            spacing="1rem"
            p="1rem"
            borderRadius="md"
            boxShadow="md"
          >
            <Avatar size="md" name={student.name} />

            <TextField
              name="student_id"
              label="Student ID"
              type="text"
              placeholder="Student ID"
              disabled
            />
            <TextField
              name="name"
              label="Name"
              type="text"
              placeholder="Name"
            />
            <TextField
              name="grades"
              label="Grades"
              type="text"
              placeholder="Grades"
            />
            <TextField
              name="enrolled_courses"
              label="Enrolled Courses"
              type="text"
              placeholder="Enrolled Courses"
            />
          </VStack>
          <ButtonGroup w="100%">
            <Button colorScheme="teal" type="submit" w="100%">
              Submit
            </Button>
          </ButtonGroup>
        </VStack>
      )}
    </Formik>
  );
};

export default EditStudentPage;

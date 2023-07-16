import React, { useEffect, useState } from "react";
import {
  Stack,
  CardBody,
  Card,
  CardHeader,
  Avatar,
  Divider,
  IconButton,
  Container,
  Button,
  Text,
  Input,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  getStudents,
  deleteStudent,
  getStudent,
  searchStudentWithAll,
} from "../../service/studentAPI";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const [students, setStudents] = useState([{}]);
  const navigate = useNavigate();

  useEffect(() => {
    getStudents()
      .then((res) => {
        setStudents(res.students);
        console.log("students updated");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteSelectedStudent = (student_id) => {
    deleteStudent(student_id)
      .then((res) => {
        setStudents(res.students);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchStudent = (e) => {
    searchStudentWithAll(e.target.value)
      .then((res) => {
        setStudents(res.student);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      pt="1rem"
      pl="1rem"
      marginBottom="1rem"
    >
      {/* add search  */}
      <Container
        maxW="container.sm"
        justifyContent="flex-start"
        alignItems="flex-start"
        display="flex"
        flexDirection="column"
        mb="1rem"
      >
        <Input
          placeholder="Search by Student ID, Name, Grades, or Enrolled Courses"
          onChange={(e) => {
            searchStudent(e);
          }}
        />
      </Container>

      <Button onClick={() => navigate("/dashboard/new")}>Add Student</Button>
      {students.map((student) => {
        return (
          <Card
            key={student.student_id}
            maxW="container.sm"
            w="100%"
            p="1rem"
            mb="1rem"
          >
            <CardHeader
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Avatar size="md" name={student.name} />
              <Container
                maxW="container.sm"
                justifyContent="flex-end"
                alignItems="center"
                display="flex"
                flexDirection="row"
              >
                <IconButton
                  aria-label="edit"
                  icon={<EditIcon />}
                  onClick={() => {
                    navigate(`/dashboard/${student.student_id}`, {
                      state: { student: student },
                    });
                  }}
                  marginX={5}
                />
                <IconButton
                  aria-label="delete"
                  icon={<DeleteIcon />}
                  onClick={() => {
                    deleteSelectedStudent(student.student_id);
                    console.log("delete button clicked");
                  }}
                />
              </Container>
            </CardHeader>
            <CardBody>
              <Divider orientation="horizontal" borderWidth="1px" />
              <Container
                maxW="container.sm"
                justifyContent="flex-start"
                alignItems="flex-start"
                display="flex"
                flexDirection="column"
              >
                <Text display="flex" flexDirection="row">
                  <Text fontWeight="bold" width="200px">
                    Student ID:
                  </Text>
                  {student.student_id}
                </Text>
                <Text display="flex" flexDirection="row">
                  <Text fontWeight="bold" width="200px">
                    Name:
                  </Text>
                  {student.name}
                </Text>
                <Text display="flex" flexDirection="row">
                  <Text fontWeight="bold" width="200px">
                    Grades:
                  </Text>
                  {student.grades}
                </Text>
                <Text display="flex" flexDirection="row">
                  <Text fontWeight="bold" width="200px">
                    Enrolled Courses:
                  </Text>
                  {student.enrolled_courses}
                </Text>
              </Container>

              <Divider orientation="horizontal" borderWidth="1px" />
            </CardBody>
          </Card>
        );
      })}
    </Stack>
  );
};

export default Dashboard;

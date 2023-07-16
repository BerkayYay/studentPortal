import React, { useContext, useState } from "react";
import { VStack, ButtonGroup, Button, Heading, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import TextField from "./TextField";
import { useNavigate } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { validationSchema } from "./ValidationSchema";
import { AccountContext } from "../AccountContext";

function SignUp() {
  const { setUser } = useContext(AccountContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        const vals = { ...values };
        actions.resetForm();
        fetch("http://localhost:3001/auth/signup", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(vals),
        })
          .catch((err) => {
            return;
          })
          .then((res) => {
            if (!res || !res.ok || res.status >= 400) {
              return;
            }
            return res.json();
          })
          .then((data) => {
            if (!data) return;
            setUser({ ...data });
            if (data.status) {
              setError(data.status);
            } else if (data.loggedIn) {
              navigate("/dashboard");
            }
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
          <Heading>Sign Up</Heading>
          <Text as={"p"} color="red.500">
            {error}
          </Text>
          <TextField
            label="Username"
            name="username"
            placeholder="Enter username"
            autoComplete="off"
          />

          <TextField
            label="Password"
            name="password"
            placeholder="Enter password"
            autoComplete="off"
          />
          <ButtonGroup pt="1rem">
            <Button colorScheme="teal" type="submit">
              Create Account
            </Button>
            <Button
              onClick={() => {
                navigate("/");
              }}
              leftIcon={<ArrowBackIcon />}
            >
              Back
            </Button>
          </ButtonGroup>
        </VStack>
      )}
    </Formik>
  );
}

export default SignUp;

import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import Signup from "./Login/Signup";
import Dashboard from "./Dashboard";
import PrivateRoutes from "./PrivateRoutes";
import { AccountContext } from "./AccountContext";
import { Text } from "@chakra-ui/react";

function Views() {
  const { user } = useContext(AccountContext);
  return user.loggedIn === null ? (
    <Text m="auto" h="100vh" w="100%" textAlign="center" fontSize="2rem">
      Loading...
    </Text>
  ) : (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Signup />} />

      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default Views;

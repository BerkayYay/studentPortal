import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import Signup from "./Login/Signup";
import Dashboard from "./Dashboard/Dashboard";
import PrivateRoutes from "./PrivateRoutes";
import { AccountContext } from "./AccountContext";
import { Text } from "@chakra-ui/react";
import EditStudentPage from "./Dashboard/EditStudentPage";
import NewStudent from "./Dashboard/NewStudent";

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
        <Route path="/dashboard/:student_id" element={<EditStudentPage />} />
        <Route path="/dashboard/new" element={<NewStudent />} />
      </Route>

      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default Views;

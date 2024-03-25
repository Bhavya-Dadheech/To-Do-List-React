import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "../components/LoinForm";
import Dashboard from "../components/Dashboard";
import PrivateRoute from "./PrivateRoute";
import { AuthenticatedRoute } from "./PrivateRoute";

export default function RoutePath() {
  return (
    <Routes>
      <Route element={<AuthenticatedRoute />}>
        <Route path="/" element={<LoginForm />}></Route>
      </Route>
      <Route element={<AuthenticatedRoute />}>
        <Route path="/login" element={<LoginForm />}></Route>
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

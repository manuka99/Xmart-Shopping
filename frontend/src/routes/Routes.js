import React from "react";
import { Route, Routes } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import loadable from "@loadable/component";

const Login = loadable(() => import("../pages/Login"), {
  fallback: <ProgressBar />,
});

const Register = loadable(() => import("../pages/Register"), {
  fallback: <ProgressBar />,
});

const Products = loadable(() => import("../pages/Products"), {
  fallback: <ProgressBar />,
});

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

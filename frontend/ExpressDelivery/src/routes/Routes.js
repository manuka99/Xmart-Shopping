import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import loadable from "@loadable/component";

const Login = loadable(() => import("../pages/Login"), {
  fallback: <ProgressBar />,
});

const Register = loadable(() => import("../pages/Register"), {
  fallback: <ProgressBar />,
});

const ListDeliveries = loadable(
  () => import("../pages/Admin/Deliveries/ListDeliveries"),
  {
    fallback: <ProgressBar />,
  }
);
const DeliveryForm = loadable(
  () => import("../pages/Admin/Deliveries/DeliveryForm"),
  {
    fallback: <ProgressBar />,
  }
);

export const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate replace={true} to="/admin/delivery" />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* admin routes */}
      <Route path="/admin/delivery" element={<ListDeliveries />} />
      <Route path="/admin/delivery/form" element={<DeliveryForm />} />
    </Routes>
  );
};

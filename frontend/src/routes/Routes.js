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

const Product = loadable(() => import("../pages/Product"), {
  fallback: <ProgressBar />,
});

const Cart = loadable(() => import("../pages/Cart"), {
  fallback: <ProgressBar />,
});

const Order = loadable(() => import("../pages/Order"), {
  fallback: <ProgressBar />,
});

const TrackOrder = loadable(() => import("../pages/Tracker"), {
  fallback: <ProgressBar />,
});

const Search = loadable(() => import("../pages/Search"), {
  fallback: <ProgressBar />,
});

const ListProducts = loadable(
  () => import("../pages/Admin/Products/ListProducts"),
  {
    fallback: <ProgressBar />,
  }
);
const ProductForm = loadable(
  () => import("../pages/Admin/Products/ProductForm"),
  {
    fallback: <ProgressBar />,
  }
);

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/:pid" element={<Product />} />
      <Route path="/search/:search_text" element={<Search />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/track-order" element={<TrackOrder />} />
      {/* authenticated routes */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/order/:oid" element={<Order />} />
      {/* admin routes */}
      <Route path="/admin/products" element={<ListProducts />} />
      <Route path="/admin/products/form" element={<ProductForm />} />
    </Routes>
  );
};

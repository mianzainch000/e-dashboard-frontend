import React from "react";
import Login from "../Screen/login";
import Signup from "../Screen/Signup";
import Update from "../Screen/Update";
import Layout from "../Components/Layout";
import ProductPage from "../Screen/Product";
import ProductForm from "../Screen/addProduct";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRoute from "../Components/ProtectedRoutes/PublicRoute";
import PrivateRoute from "../Components/ProtectedRoutes/PrivateRoute";

export const RouterComp = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          {/* Wrap all public routes with PublicRoute */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Login />} />
            <Route path="/reg" element={<Signup />} />
          </Route>

          {/* Private routes */}
          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route path="/home" element={<ProductPage />} />
              <Route path="/add" element={<ProductForm />} />
              <Route path="/update/:id" element={<Update />} />
              <Route path="/profile" element={<h1>This is profile page</h1>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

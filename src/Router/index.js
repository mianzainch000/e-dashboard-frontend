import React from "react";
import Login from "../Screen/login";
import Signup from "../Screen/Signup";
import Layout from "../Components/Layout";
import ProductPage from "../Screen/Product";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRoute from "../Components/ProtectedRoutes/PublicRoute";
import PrivateRoute from "../Components/ProtectedRoutes/PrivateRoute";

export const RouterComp = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/reg"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />

          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Layout>
                  <ProductPage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/add"
            element={
              <Layout>
                <h1>Add Product Page</h1>
              </Layout>
            }
          />
          <Route
            path="/update"
            element={
              <PrivateRoute>
                {" "}
                <Layout>
                  <h1>This is update product page</h1>
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                {" "}
                <Layout>
                  <h1>This is profile page</h1>
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

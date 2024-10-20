import React from "react";
import Signup from "../Screen/Signup";
import Layout from "../Components/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const RouterComp = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <h1>This is product page</h1>
              </Layout>
            }
          />
          <Route
            path="/add"
            element={
              <Layout>
                <h1>This is Add product page</h1>
              </Layout>
            }
          />
          <Route
            path="/update"
            element={
              <Layout>
                <h1>This is update product page</h1>
              </Layout>
            }
          />
          <Route
            path="/profile"
            element={
              <Layout>
                <h1>This is profile page</h1>
              </Layout>
            }
          />
          <Route path="/reg" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

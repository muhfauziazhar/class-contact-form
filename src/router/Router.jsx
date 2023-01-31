import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataTable from "../components/DataTable";
import InputForm from "../components/InputForm";
import Layout from "../layout/Layout";
import UserLogin from "../pages/UserLogin";
import LoginRoute from "./LoginRoute";

const Router = ({
  contacts,
  handleEdit,
  handleDelete,
  input,
  handleSubmit,
}) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <DataTable
                contacts={contacts}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </Layout>
          }
        />
        <Route
          path="/contact/add"
          element={
            <LoginRoute>
              <Layout>
                <InputForm input={input} handleSubmit={handleSubmit} />
              </Layout>
            </LoginRoute>
          }
        />
        <Route
          path="/contact/edit/:id"
          element={
            <LoginRoute>
              <Layout>
                <InputForm input={input} handleSubmit={handleSubmit} />
              </Layout>
            </LoginRoute>
          }
        />
        <Route path="/auth/user-login" element={<UserLogin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataTable from "../components/DataTable";
import InputForm from "../components/InputForm";
import Layout from "../layout/Layout";
import UserLogin from "../pages/UserLogin";

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
                        <Layout>
                            <InputForm
                                input={input}
                                handleSubmit={handleSubmit}
                            />
                        </Layout>
                    }
                />
                <Route
                    path="/contact/edit/:id"
                    element={
                        <Layout>
                            <InputForm
                                input={input}
                                handleSubmit={handleSubmit}
                            />
                        </Layout>
                    }
                />
                <Route path="/auth/user-login" element={<UserLogin />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;

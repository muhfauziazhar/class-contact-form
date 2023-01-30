import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataTable from "./components/DataTable";
import InputForm from "./components/InputForm";
import Layout from "./Layout";

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
            </Routes>
        </BrowserRouter>
    );
};

export default Router;

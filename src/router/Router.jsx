import React, {lazy, Suspense} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from '../layout/Layout';
import UserLogin from '../pages/UserLogin';
import LoginRoute from './LoginRoute';

const DataTable = lazy(() => import('../pages/DataTable'));
const InputForm = lazy(() => import('../pages/InputForm'));
const News = lazy(() => import('../pages/News'));

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
              <Suspense fallback={<h2>Loading...</h2>}>
                <DataTable
                  contacts={contacts}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              </Suspense>
            </Layout>
          }
        />
        <Route
          path="/contact/add"
          element={
            <LoginRoute>
              <Layout>
                <Suspense fallback={<h2>Loading...</h2>}>
                  <InputForm
                    input={input}
                    handleSubmit={handleSubmit}
                  />
                </Suspense>
              </Layout>
            </LoginRoute>
          }
        />
        <Route
          path="/contact/edit/:id"
          element={
            <LoginRoute>
              <Layout>
                <Suspense fallback={<h2>Loading...</h2>}>
                  <InputForm
                    input={input}
                    handleSubmit={handleSubmit}
                  />
                </Suspense>
              </Layout>
            </LoginRoute>
          }
        />
        <Route path="/auth/user-login" element={<UserLogin />} />
        <Route
          path="/news"
          element={
            <Layout>
              <Suspense fallback={<h2>Loading...</h2>}>
                <News />
              </Suspense>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

Router.propTypes = {
  contacts: PropTypes.array.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default Router;

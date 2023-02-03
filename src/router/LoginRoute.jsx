import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import {Navigate} from 'react-router-dom';

const LoginRoute = ({children}) => {
  if (Cookies.get('token_user') === undefined) {
    return <Navigate to={'/auth/user-login'} />;
  } else if (Cookies.get('token_user') !== undefined) {
    return children;
  }
};

LoginRoute.propTypes = {
  children: PropTypes.node,
};


export default LoginRoute;

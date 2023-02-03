import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '../components/Navigation';

const Layout = ({children}) => {
  return (
    <>
      <Navigation />
      <div className="container mx-auto p-5">{children}</div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;

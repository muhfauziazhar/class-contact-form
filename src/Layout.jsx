import React from "react";
import Navigation from "./components/Navigation";

const Layout = ({ children }) => {
    return (
        <>
            <Navigation />
            <div className="container mx-auto p-5">{children}</div>
        </>
    );
};

export default Layout;

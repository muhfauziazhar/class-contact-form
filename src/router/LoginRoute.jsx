import React from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const LoginRoute = (props) => {
    if (Cookies.get("token_user") === undefined) {
        return <Navigate to={"/auth/user-login"} />;
    } else if (Cookies.get("token_user") !== undefined) {
        return props.children;
    }
};

export default LoginRoute;

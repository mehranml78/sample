import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getAutentication } from "../services/authServices";
const PortectedRoute = ({ component, path , ...rest}) => {
  if (window.location.pathname !== path) {
    return <Redirect to="/404_NotFound" />;
  }
  if (getAutentication() === true) {
    return <Route path={path} component={component} {...rest} />;
  } else {
    return <Redirect to="/login" />;
  }
};

export default PortectedRoute;

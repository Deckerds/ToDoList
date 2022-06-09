import React, { Fragment } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

const PrivateRoute = () => {
  const isAuthenticated = sessionStorage.getItem("user_authenticated");
  return (
    <Fragment>
      {isAuthenticated === "authenticated_token_valid" ? (
        <>
          <Header />
          <Outlet />
        </>
      ) : (
        <Navigate to="/" />
      )}
    </Fragment>
  );
};

export default PrivateRoute;

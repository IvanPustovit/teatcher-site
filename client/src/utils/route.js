import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export const PrivateRouter = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.platform.user);
  return (
    <Route
      {...rest}
      render={(props) =>
        !user.isAuth ? (
          <Redirect to="/" />
        ) : user.currentUser.user.email === "teatchertrud@gmail.com" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export const PrivateRouterProfile = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.platform.user);
  return (
    <Route
      {...rest}
      render={(props) =>
        !user.isAuth ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

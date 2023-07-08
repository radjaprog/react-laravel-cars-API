import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import useAuth from "./hooks/useAuth";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AppCars from "./pages/AppCars";
import AddCar from "./pages/AddCar";
import SingleCarPage from "./pages/SingleCarPage";

const AuthRoute = ({ children, ...rest }) => {
  const { user } = useAuth();
  return (
    <Route {...rest}>{user.name ? children : <Redirect to="/login" />}</Route>
  );
};

const GuestRoute = ({ children, ...rest }) => {
  const { user } = useAuth();
  return (
    <Route {...rest}>{user.name ? <Redirect to="/cars" /> : children}</Route>
  );
};

export default function Router() {
  return (
    <Switch>
      <GuestRoute path="/register">
        <RegisterPage />
      </GuestRoute>
      <GuestRoute path="/login">
        <LoginPage />
      </GuestRoute>

      <AuthRoute path="/cars">
        <AppCars />
      </AuthRoute>
      <AuthRoute exact path="/add">
        <AddCar />
      </AuthRoute>
      <AuthRoute path="/edit/:id">
        <AddCar />
      </AuthRoute>
      <AuthRoute path="/car/:id">
        <SingleCarPage />
      </AuthRoute>
    </Switch>
  );
}

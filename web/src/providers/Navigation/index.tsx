import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  ForgotPassword,
  Landing,
  Pricing,
  SignIn,
  SignUp,
  Features,
  Support,
  Dashboard,
} from "../../pages";

export const Navigation = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/sign-in">
          <SignIn />
        </Route>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>
        <Route path="/pricing">
          <Pricing />
        </Route>
        <Route path="/features">
          <Features />
        </Route>
        <Route path="/support">
          <Support />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

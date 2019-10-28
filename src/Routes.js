import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./Components/AppliedRoute";

import Home from "./Containers/Home";
import Signup from "./Containers/Signup";
import Login from "./Containers/Login";
import MyDecks from "./Containers/MyDecks";
import NotFound from "./Containers/NotFound";

function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
      <AppliedRoute path="/signup" exact component={Signup} appProps={appProps} />
      <AppliedRoute path="/my-deck" exact component={MyDecks} appProps={appProps} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default Routes;
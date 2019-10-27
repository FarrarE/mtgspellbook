import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Containers/Home.js";
import NotFound from "./Containers/NotFound.js";
import Login from "./Components/Login";
import DeckList from "./Components/DeckList";
import AppliedRoute from "./Components/AppliedRoute";

function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
      { /* Finally, catch all unmatched routes */ }
      <Route component={NotFound} />
    </Switch>
  );
}

export default Routes;
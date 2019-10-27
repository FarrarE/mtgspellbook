import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Containers/Home.js";
import NotFound from "./Containers/NotFound.js";
import Login from "./Components/Login";

function Routes() {
  return (
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route component={NotFound} />
    </Switch>
  );
}

export default Routes;
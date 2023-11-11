import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Test from "./pages/Test";

export default class Routes extends Component {
  render() {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/" exact component={Test} />                
            </Switch>
        </Router>
    )
  }
}

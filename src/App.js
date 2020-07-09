import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Visualizations from "./components/Visualizations";
import "./index.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/most-important-concepts">
          <Visualizations />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

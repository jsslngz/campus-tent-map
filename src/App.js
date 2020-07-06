import React, { useRef, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Visualizations from "./components/Visualizations";
import useResizeObserver from "./components/resizeObserver";
import "./index.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/reboot-the-world-viz">
          <Visualizations />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

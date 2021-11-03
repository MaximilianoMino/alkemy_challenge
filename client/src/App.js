import React from "react";
import Operations from "./components/operations/Operations";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/home/Home";
import Error404 from "./components/error404/Error404";
import NavBar from "./components/navbar/NavBar";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/operations" component={Operations} />
        <Route component={Error404} />
      </Switch>
    </Router>
  );
};

export default App;

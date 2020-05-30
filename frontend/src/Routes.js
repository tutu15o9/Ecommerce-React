import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Components/core/Home"
import Signup from "./Components/user/Signup";
import Signin from "./Components/user/Signin";
const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" component ={Signup}/>
        <Route path="/signin" component ={Signin}/>

      </Switch>
    </BrowserRouter>
  );
};

export default Routes;

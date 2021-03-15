import "./App.scss";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./config/routes";
import AuthProvider from "./provider/AuthProvider";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          {routes.map((route, index) => (
            <RouterWithSubroutes key={index} {...route} />
          ))}
        </Switch>
      </Router>
    </AuthProvider>
  );
}
function RouterWithSubroutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component routes={route.routes} {...props} />}
    ></Route>
  );
}

export default App;

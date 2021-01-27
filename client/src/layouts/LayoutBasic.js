import React from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import "./LayoutBasic.scss";
export default function LayoutBasic({ routes }) {
  const { Content, Footer } = Layout;
  return (
    <Layout>
      <h1>Menu...</h1>
      <Layout>
        <Content>
          <LoadRoutes routes={routes}></LoadRoutes>
        </Content>
        <Footer>Sergio Castillo</Footer>
      </Layout>
    </Layout>
  );
}

function LoadRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        ></Route>
      ))}
    </Switch>
  );
}

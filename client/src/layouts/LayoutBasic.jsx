import React from "react";
import { Route, Switch } from "react-router-dom";
import { Layout, Row, Col } from "antd";
import MenuTop from "../components/Web/MenuTop";
import "./LayoutBasic.scss";
export default function LayoutBasic({ routes }) {
  const { Footer } = Layout;

  return (
    <Row>
      <Col lg={4}></Col>
      <Col lg={16}>
        <MenuTop></MenuTop>
        <LoadRoutes routes={routes}></LoadRoutes>
        <Footer>Sergio Castillo</Footer>
      </Col>
      <Col lg={4}></Col>
    </Row>
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

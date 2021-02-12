import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";
import MenuTop from "../components/Admin/MenuTop";
import MenuSider from "../components/Admin/MenuSider";
import AdminSignIn from "../pages/Admin/SignIn/SignIn";

import "./LayoutAdmin.scss";
export default function LayoutAdmin(props) {
  const { routes } = props;
  const [menuCollapsed, setMenuCollapse] = useState(false);
  const { Header, Content, Footer } = Layout;

  const user = null;
  if (!user) {
    return (
      <>
        <Route path="/admin/login" component={AdminSignIn}></Route>;
        <Redirect to="/admin/login"></Redirect>
      </>
    );
  }
  return (
    <Layout>
      <MenuSider menuCollapsed={menuCollapsed} />
      <Layout
        className="layout-admin"
        style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}
      >
        <Header className="layout-admin__header">
          <MenuTop
            menuCollapsed={menuCollapsed}
            setMenuCollapse={setMenuCollapse}
          />
        </Header>
        <Content className="layout-admin__content">
          <LoadRoutes routes={routes}></LoadRoutes>
        </Content>
        <Footer className="layout-admin__footer">Sergio Castillo</Footer>
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
  return;
}

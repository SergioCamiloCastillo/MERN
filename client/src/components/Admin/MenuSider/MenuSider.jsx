import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";
import { HomeOutlined, UsergroupAddOutlined } from "@ant-design/icons";

import "./MenuSider.scss";
function MenuSider(props) {
  const { menuCollapsed, location } = props;
  const { Sider } = Layout;
  return (
    <Sider className="admin-sider" collapsed={menuCollapsed}>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
      >
        <Menu.Item key="/admin">
          <Link to={"/admin"}>
            <HomeOutlined style={{ fontSize: "18px" }} />
            <span className="nav-text">Home</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/users">
          <Link to={"/admin/users"}>
            <UsergroupAddOutlined style={{ fontSize: "20px" }} />
            <span className="nav-text">Usuarios</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
export default withRouter(MenuSider);
import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { logout } from "../../../api/auth";

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import logo from "../../../assets/img/png/logo-white.png";
import "./MenuTop.scss";
export default function MenuTop(props) {
  const { menuCollapsed, setMenuCollapse } = props;
  const logoutUser = () => {
    logout();
    window.location.reload();
  };
  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <Link to={"/admin"}>
          <img
            className="menu-top__left-logo"
            src={logo}
            alt="Sergio Castillo"
          ></img>
        </Link>

        <Button
          type="link"
          icon={menuCollapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          onClick={() => setMenuCollapse(!menuCollapsed)}
        ></Button>
      </div>
      <div className="menu-top__right">
        <Button
          type="link"
          onClick={logoutUser}
          icon={<LogoutOutlined />}
        ></Button>
      </div>
    </div>
  );
}

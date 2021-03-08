import React, { useState } from "react";
import {signInApi} from "../../../api/user";
import { Form, Input, Button, Checkbox, notification } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import "./LoginForm.scss";
export default function LoginForm() {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const changeForm = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const login = (e) => {
    signInApi(inputs);
  };
  return (
    <Form className="login-form" onFinish={login} onChange={changeForm}>
      <Form.Item>
        <Input
          prefix={
            <UserOutlined
              className="login-form__icono-input"
              style={{ color: "rgba(0,0,0,.25" }}
            ></UserOutlined>
          }
          type="email"
          name="email"
          placeholder="Correo Electronico"
          className="login-form__input"
        ></Input>
      </Form.Item>
      <Form.Item>
        <Input
          prefix={
            <LockOutlined
              className="login-form__icono-input"
              style={{ color: "rgba(0,0,0,.25" }}
            ></LockOutlined>
          }
          type="password"
          name="password"
          placeholder="Contraseña"
          className="login-form__input"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        ></Input>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" className="login-form__button">
          Entrar
        </Button>
      </Form.Item>
    </Form>
  );
}

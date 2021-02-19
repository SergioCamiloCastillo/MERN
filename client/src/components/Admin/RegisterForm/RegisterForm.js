import React, { useState } from "react";
import { Form, Input, Icon, Button, Checkbox, notification } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  SearchOutlined,
  LockOutlined,
} from "@ant-design/icons";

import "./RegisterForm.scss";
export default function RegisterForm() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    privacyPolicy: false,
  });
  const changeForm = (e) => {
    if (e.target.name === "privacyPolicy") {
      //SI es checkbox asigne el checked
      setInputs({
        ...inputs,
        [e.target.name]: e.target.checked,
      });
    } else {
      //Si es un campo normal
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
    }
  };
  const register = () => {
    console.log('hola gonorrea')
    console.log(inputs);
  };
  return (
    <Form className="register-form" onFinish={register} onChange={changeForm}>
      <Form.Item>
        <Input
          prefix={
            <SearchOutlined
              style={{ color: "rgba(0,0,0,.25" }}
            ></SearchOutlined>
          }
          type="email"
          name="email"
          placeholder="Correo electronico"
          className="register-form__input"
          value={inputs.email}
        ></Input>
      </Form.Item>
      <Form.Item>
        <Input.Password
          prefix={<LockOutlined />}
          name="password"
          placeholder="Contraseña"
          style={{ color: "rgba(0,0,0,.25" }}
          type="password"
          className="register-form__input"
          value={inputs.password}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        ></Input.Password>
      </Form.Item>
      <Form.Item>
        <Input.Password
          prefix={<LockOutlined />}
          name="repeatPassword"
          value={inputs.repeatPassword}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          placeholder="Repetir Contraseña"
          style={{ color: "rgba(0,0,0,.25" }}
          type="password"
          className="register-form__input"
        ></Input.Password>
      </Form.Item>
      <Form.Item>
        <Checkbox checked={inputs.privacyPolicy} name="privacyPolicy">
          He leido y acepto las politicas de privacidad
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" className="register-form__button">
          Crear Cuenta
        </Button>
      </Form.Item>
    </Form>
  );
}

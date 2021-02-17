import React from "react";
import { Form, Input, Icon, Button, Checkbox, notification } from "antd";
import { SearchOutlined, LockOutlined } from "@ant-design/icons";

import "./RegisterForm.scss";
export default function RegisterForm() {
  return (
    <Form className="register-form">
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
        ></Input>
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined />}
          name="password"
          placeholder="Contraseña"
          style={{ color: "rgba(0,0,0,.25" }}
          type="password"
          className="register-form__input"
        ></Input>
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined />}
          name="repeatPassword"
          placeholder="Repetir Contraseña"
          style={{ color: "rgba(0,0,0,.25" }}
          type="password"
          className="register-form__input"
        ></Input>
      </Form.Item>
      <Form.Item>
        <Checkbox name="privacyPolicy">
          He leido y acepto las politicas de privacidad
        </Checkbox>
      </Form.Item>
      <Form.Item>
          <Button htmlType='submit' className='register-form_button'>
          Crear Cuenta
          </Button>
      </Form.Item>
    </Form>
  );
}

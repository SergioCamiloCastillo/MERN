import React, { useState } from "react";
import { Form, Input, Icon, Button, Checkbox, notification } from "antd";
import {
  emailValidation,
  minLengthValidation,
} from "../../../utils/formValidation";
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
  const [formValid, setFormValid] = useState({
    email: false,
    password: false,
    repeatPassword: false,
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
  const inputValidation = (e) => {
    const { type, name } = e.target;

    if (type == "email") {
      setFormValid({
        ...formValid,
        [name]: emailValidation(e.target),
      });
    }
    if (type == "password") {
      setFormValid({
        ...formValid,
        [name]: minLengthValidation(e.target, 6),
      });
    }
    if (type == "checkbox") {
      setFormValid({
        ...formValid,
        [name]: e.target.checked,
      });
    }
  };
  const register = () => {
    const { email, password, repeatPassword, privacyPolicy } = formValid;
    const passwordValu = inputs.password;
    const repeatPasswordValue = inputs.repeatPassword;
    if (
      !inputs.name ||
      !passwordValu ||
      !repeatPasswordValue ||
      !inputs.privacyPolicy
    ) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
    }
  };
  return (
    <Form className="register-form" onFinish={register} onChange={changeForm}>
      <Form.Item>
        <Input
          prefix={
            <SearchOutlined
              className="register-form__icono-input"
              style={{ color: "rgba(0,0,0,.25" }}
            ></SearchOutlined>
          }
          type="email"
          name="email"
          placeholder="Correo electronico"
          className="register-form__input"
          onChange={inputValidation}
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
          onChange={inputValidation}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        ></Input.Password>
      </Form.Item>
      <Form.Item>
        <Input.Password
          prefix={<LockOutlined />}
          name="repeatPassword"
          onChange={inputValidation}
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
        <Checkbox
          checked={inputs.privacyPolicy}
          name="privacyPolicy"
          onChange={inputValidation}
        >
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

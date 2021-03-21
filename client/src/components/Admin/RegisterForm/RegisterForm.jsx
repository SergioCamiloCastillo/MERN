import React, { useState } from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import { signUpApi } from "../../../api/user";
import {
  emailValidation,
  minLengthValidation,
} from "../../../utils/formValidation";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
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

    if (type === "email") {
      setFormValid({
        ...formValid,
        [name]: emailValidation(e.target),
      });
    }
    if (type === "password") {
      setFormValid({
        ...formValid,
        [name]: minLengthValidation(e.target, 6),
      });
    }
    if (type === "checkbox") {
      setFormValid({
        ...formValid,
        [name]: e.target.checked,
      });
    }
  };
  const register = async (e) => {
    const emailValue = inputs.email;
    const passwordValue = inputs.password;
    const repeatPasswordValue = inputs.repeatPassword;
    const privacyPolicyValue = inputs.privacyPolicy;

    if (!emailValue || !passwordValue || !repeatPasswordValue) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
    } else if (!privacyPolicyValue) {
      notification["error"]({
        message: "Aceptar politicas de privacidad",
      });
    } else {
      if (passwordValue !== repeatPasswordValue) {
        notification["error"]({
          message: "Las contraseñas no son iguales",
        });
      } else {
        const result = await signUpApi(inputs);
        if (!result.ok) {
          notification["error"]({
            message: result.message,
          });
        } else {
          notification["success"]({
            message: result.message,
          });
          resetForm();
        }
      }
    }
  };
  const resetForm = () => {
    const inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].classList.remove("success");
      inputs[i].classList.remove("error");
    }
    setInputs({
      email: "",
      password: "",
      repeatPassword: "",
      privacyPolicy: false,
    });

    setFormValid({
      email: false,
      password: false,
      repeatPassword: false,
      privacyPolicy: false,
    });
  };
  return (
    <Form className="register-form" onFinish={register} onChange={changeForm}>
      <Form.Item>
        <Input
          prefix={
            <UserOutlined
              className="register-form__icono-input"
              style={{ color: "rgba(0,0,0,.25" }}
            ></UserOutlined>
          }
          type="email"
          name="email"
          placeholder="Correo Electronico"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.email}
        ></Input>
      </Form.Item>
      <Form.Item>
        <Input.Password
          prefix={<LockOutlined className="register-form__icono-input" />}
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
          prefix={<LockOutlined className="register-form__icono-input"/>}
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
  )
}

import React, { useState, useEffect } from "react";
import { Form, Input, Button, notification } from "antd";
import { getAccessTokenApi } from "../../../../api/auth";
import "./AddEditCourseForm.scss";
import {
  KeyOutlined,
  GiftOutlined,
  DollarCircleOutlined,
  LinkOutlined
} from "@ant-design/icons";

export default function AddEditCourseForm(props) {
  const { setIsVisibleModal, setReloadCourses, course } = props;
  const [courseData, setCourseData] = useState({});
  return (
    <div className="add-edit-course-form">
      <AddEditForm course={course}></AddEditForm>
    </div>
  );
}
function AddEditForm(props) {
  const { course } = props;

  return (
    <Form
      className="form-add-edit"
      onFinish={() => console.log("creandoo----")}
    >
      <Form.Item>
        <Input
          prefix={<KeyOutlined />}
          placeholder="ID del curso"
          disabled={course ? true : false}
        ></Input>
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LinkOutlined />}
          placeholder="Url del curso"
        ></Input>
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<GiftOutlined />}
          placeholder="Cupon de descuento"
        ></Input>
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<DollarCircleOutlined />}
          placeholder="Precio del curso"
        ></Input>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          {course ? "Actualizar Curso" : "Crear curso"}
        </Button>
      </Form.Item>
    </Form>
  );
}

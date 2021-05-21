import React, { useState, useEffect } from "react";
import { Form, Input, Button, notification } from "antd";
import { getAccessTokenApi } from "../../../../api/auth";
import { addCourseApi, updateCourseApi } from "../../../../api/courses";
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
  useEffect(() => {
    if (course) {
      setCourseData(course);
    }

  }, [course]);
  const addCourse = e => {
    if (!courseData.idCourse) {
      notification["error"]({
        message: "El ID del curso es obligatorio"
      });
    } else {
      const accessToken = getAccessTokenApi();
      addCourseApi(accessToken, courseData).then(response => {
        const typeNotification = response.code === 200 ? "success" : "warning";
        notification[typeNotification]({
          message: response.message
        });
        setIsVisibleModal(false);
        setReloadCourses(true);
        setCourseData({});
      }).catch(() => {
        notification['error']({ message: "Error en el servidor, intentelo mas tarde." })
      });
    }
  }
  const updateCourse = e => {
    const accessToken = getAccessTokenApi();
    updateCourseApi(accessToken, course._id, courseData).then(response => {
      const typeNotification = response.code === 200 ? "success" : "warning";
      notification[typeNotification]({
        message: response.message
      });
      setIsVisibleModal(false);
            setCourseData({});

      setReloadCourses(true);
    }).catch(()=>{
      notification["error"]({
        message:"Error del servidor, intentelo mas tarde."
      })
    });
  }
  return (
    <div className="add-edit-course-form">
      <AddEditForm courseData={courseData} setCourseData={setCourseData} course={course} addCourse={addCourse} updateCourse={updateCourse}></AddEditForm>
    </div>
  );
}
function AddEditForm(props) {
  const { course, addCourse, updateCourse, setCourseData, courseData } = props;

  return (
    <Form
      className="form-add-edit"
      onFinish={course ? updateCourse : addCourse}
    >
      <Form.Item>
        <Input
          prefix={<KeyOutlined />}
          placeholder="ID del curso"
          disabled={course ? true : false}
          value={courseData.idCourse}
          onChange={e =>
            setCourseData({ ...courseData, idCourse: e.target.value })
          }
        ></Input>
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LinkOutlined />}
          placeholder="Url del curso"
          value={courseData.link}
          onChange={e => setCourseData({ ...courseData, link: e.target.value })}
        ></Input>
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<GiftOutlined />}
          placeholder="Cupon de descuento"
          value={courseData.coupon}
          onChange={e =>
            setCourseData({ ...courseData, coupon: e.target.value })
          }        ></Input>
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<DollarCircleOutlined />}
          placeholder="Precio del curso"
          value={courseData.price}
          onChange={e =>
            setCourseData({ ...courseData, price: e.target.value })
          }        ></Input>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          {course ? "Actualizar Curso" : "Crear curso"}
        </Button>
      </Form.Item>
    </Form>
  );
}

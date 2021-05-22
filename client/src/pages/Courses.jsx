import React, { useState, useEffect } from "react";
import { Row, Col, Spin, notification } from "antd";
import BounceLoader from "react-spinners/BounceLoader";

import { getCoursesApi } from "../api/courses"
import PresentationCourses from "../components/Web/Courses/PresentationCourses";
import CoursesList from "../components/Web/Courses/CoursesList";

export default function Courses() {

    const [courses, setCourses] = useState(null);
    let [color, setColor] = useState("#ffffff");
    
    useEffect(() => {
        getCoursesApi().then(response => {
            if (response?.code !== 200) {
                notification['warning']({
                    message: response.message
                })
            } else {
                setCourses(response.courses);
            }
        }).catch(() => {
            notification['error']({
                message: "Error del servidor, intentelo mas tarde."
            });
        });
    }, []);
    return (
        <Row>
            <Col md={4}></Col>
            <Col md={16}>
                <PresentationCourses></PresentationCourses>
                {!courses ? (
                    <Spin tip="Cargando Curso" style={{textAlign:"center", width:"100%", padding:"20px"}}></Spin>

                ) : (
                    <CoursesList courses={courses}></CoursesList>
                )}
            </Col>
            <Col md={4}></Col>

        </Row>
    )
}
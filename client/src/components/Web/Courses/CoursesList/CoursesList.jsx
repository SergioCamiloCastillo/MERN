import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Rate, notification } from "antd";
import { getCourseDataUdemyApi } from "../../../../api/courses"
import "./CoursesList.scss";
export default function CoursesList(props) {
    const { courses } = props;
    return (
        <div className="courses-list">
            <Row>
                {courses.map(course => (
                    <Col key={course._id} md={8} className='courses-list__courses'>
                        <Course course={course}></Course>
                    </Col>

                ))}
            </Row>
        </div>
    )
}

function Course(props) {
    const { course } = props;
    const [courseInfo, setCourseInfo] = useState({});
    const [urlCourse, setUrlCourse] = useState("");
    const { Meta } = Card;
    useEffect(() => {
        getCourseDataUdemyApi(course.idCourse)
            .then(response => {
                if (response?.code !== 200) {
                    notification["warning"]({
                        message: response.message
                    })
                } else {
                    setCourseInfo(response.data);
                    mountUrl(response.data.url);
                }
            }).catch(() => {
                notification["error"]({
                    message: "Error del servidor, intentelo mas tarde."
                });
            });
    }, [course]);
    const mountUrl = url => {
        if (!course.link) {
            const baseUrl = `https:www.udemy.com${url}`;
            const finalUrl = baseUrl + (course.coupon ? `?couponCode=${course.coupon}` : "");
            setUrlCourse(finalUrl);
        } else {
            setUrlCourse(course.link);
        }
    }
    return (
        <a href={urlCourse} target="_BLANK" rel='noopener noreferrer'>
            <Card cover={<img src={courseInfo.image_480x270}></img>} alt={courseInfo.title}>
                <Meta title={courseInfo.title} description={courseInfo.headline}></Meta>
                <Button>Entrar en el curso</Button>
                <div className='courses-list__courses-footer'>
                    <span>{course.price ? `$ ${course.price}` : courseInfo.price}</span>
                    <Rate disabled defaultValue={5}></Rate>
                </div>
            </Card>
        </a>
    )
}

import React from "react";
import "./HowMyCoursesWork.scss";
import { Row, Col, Card } from "antd";
import {
    DollarCircleOutlined,
    UserOutlined,
    ClockCircleOutlined,
    KeyOutlined,
    MessageOutlined,
    CheckCircleOutlined
} from "@ant-design/icons";
export default function HowMyCoursesWork() {
    return (
        <Row className='how-my-courses-work'>
            <Col lg={24} className='how-my-courses-work__title'>
                <h2>¿Como funcionan mis curso?</h2>
                <h3>
                    Cada curso cuenta con contenidos bajo la web de udemy, activa las 24 horas del dia los 365 dias del año.
                </h3>
            </Col>
            <Col lg={4}></Col>
            <Col lg={16}>
                <Row className='row-cards'>
                    <Col md={8}>
                        <CardInfo icon={<ClockCircleOutlined />} title="Cursos y Clases" description="Cada curso cuenta con contenidos bajo la web de udemy, activa las 24 horas del dia los 365 dias del año."></CardInfo>
                    </Col>
                    <Col md={8}>
                        <CardInfo icon={<KeyOutlined />} title="Acceso 24/7" description="Cada curso cuenta con contenidos bajo la web de udemy, activa las 24 horas del dia los 365 dias del año."></CardInfo>
                    </Col>
                    <Col md={8}>
                        <CardInfo icon={<MessageOutlined />} title="Aprendizaje Colaboracion" description="Cada curso cuenta con contenidos bajo la web de udemy, activa las 24 horas del dia los 365 dias del año."></CardInfo>
                    </Col>

                    <Col md={8}>
                        <CardInfo icon={<UserOutlined />} title="Mejora tu perfil" description="Cada curso cuenta con contenidos bajo la web de udemy, activa las 24 horas del dia los 365 dias del año."></CardInfo>
                    </Col>
                    <Col md={8}>
                        <CardInfo icon={<DollarCircleOutlined />} title="Precios Bajos" description="Cada curso cuenta con contenidos bajo la web de udemy, activa las 24 horas del dia los 365 dias del año."></CardInfo>
                    </Col>
                    <Col md={8}>
                        <CardInfo icon={<CheckCircleOutlined />} title="Certificado de finalizacion" description="Cada curso cuenta con contenidos bajo la web de udemy, activa las 24 horas del dia los 365 dias del año."></CardInfo>
                    </Col>
                </Row>
            </Col>
            <Col lg={4}></Col>
        </Row>
    );
}
function CardInfo(props) {
    const { icon, title, description } = props;
    const { Meta } = Card;
    


    return (
        <Card className='how-my-courses-work__card'>
            {icon}
            <Meta title={title} description={description}></Meta>
        </Card>
    )
}
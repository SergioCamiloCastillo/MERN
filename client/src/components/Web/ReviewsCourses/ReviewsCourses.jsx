import React from "react";
import "./ReviewsCourses.scss";
import { Row, Col, Card, Avatar } from "antd";
import AvatarPersona from "../../../assets/img/jpg/home-v1.jpg";

export default function ReviewsCourses() {
    return (

        <Row className="reviews-courses">
            <Row>
                <Col lg={4} ></Col>
                <Col lg={16} className="reviews-courses__title">
                    <h2>Forma parte de los +35 mil estudiantes que estan aprendiendo con mis
                        cursos</h2>
                        
          
                </Col>
                <Col lg={4}></Col>
            </Row>
            <Row>
                <Col lg={4} />
                <Col lg={16}>
                    <Row className="row-cards">
                        <Col md={8}>
                            <CardReview
                                name="Alonso Campos"
                                subtitle="Alumno de Udemy"
                                avatar={AvatarPersona}
                                review="Un curso excelente, el profesor explica detalladamente como funciona react native y también como hacer componente por componente, he buscado muchos cursos de react native pero ninguno me ha enseñado tanto como este, ahora estoy desarrollando mi propia aplicación sin ningún tipo de problema gracias al curso."
                            ></CardReview>
                        </Col>
                        <Col md={8}>
                            <CardReview
                                name="Sergio Castillo"
                                subtitle="Alumno de Udemy"
                                avatar={AvatarPersona}
                                review="Un curso excelente, el profesor explica detalladamente como funciona react native y también como hacer componente por componente, he buscado muchos cursos de react native pero ninguno me ha enseñado tanto como este, ahora estoy desarrollando mi propia aplicación sin ningún tipo de problema gracias al curso."
                            ></CardReview>
                        </Col>
                        <Col md={8}>
                            <CardReview
                                name="Angelica Raigosa"
                                subtitle="Alumno de Udemy"
                                avatar={AvatarPersona}
                                review="Un curso excelente, el profesor explica detalladamente como funciona react native y también como hacer componente por componente, he buscado muchos cursos de react native pero ninguno me ha enseñado tanto como este."
                            ></CardReview>
                        </Col>

                    </Row>
                </Col>
                <Col lg={4}></Col>
            </Row>
        </Row>

    );
}
function CardReview(props) {
    const { name, subtitle, avatar, review } = props;
    const {Meta} = Card;
    return (
        <Card className='reviews-courses__card'>
            <p>{review}</p>
            <Meta
        avatar={<Avatar src={avatar} />}
        title={name}
        description={subtitle}
      />        </Card>
    )
}
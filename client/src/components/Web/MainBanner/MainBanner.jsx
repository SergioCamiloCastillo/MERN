import React from "react";
import { Row, Col } from "antd";
import "./MainBanner.scss";
export default function MainBanner() {
    return (
        <div className='main-banner'>
            <div className='main-banner__dark'></div>
            <Row>
                <Col lg={4}></Col>
                <Col lg={16}>
                    <h2>Aprende nuevas <br></br>tecnologias web y movil</h2>
                    <h3>Atraves de cursos practivos, concisos y actualizados, creados por profesionales con años de experiencia.</h3>
                </Col>
                <Col lg={4}></Col>
            </Row>
        </div>
    )
}
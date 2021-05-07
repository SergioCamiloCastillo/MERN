import React from "react";
import { Row, Col, Card, Button } from "antd";
import { Link } from "react-router-dom";
import reactJsHooks from "../../../assets/img/jpg/react-js-hooks.jpg";
import reactNative from "../../../assets/img/jpg/react-native.jpg";
import javaScript from "../../../assets/img/jpg/javascript-es6.jpg";
import wordPress from "../../../assets/img/jpg/wordpress.jpg";
import prestaShop from "../../../assets/img/jpg/prestashop-1-7.jpg";
import cssGrid from "../../../assets/img/jpg/css-grid.jpg";
import "./HomeCourses.scss";

export default function HomeCourses() {
    return (
        <Row className='home-courses'>
            <Col lg={24} className='home-courses__title'>
                <h2>Aprende y mejora tus habilidades</h2>
            </Col>
            <Col lg={4}></Col>
            <Col lg={16}>
                <Row className='row-courses'>
                    <Col md={6}><CardCourse link='https://twitter.com/?lang=es' subtitle='Intermedio - React JS' image={reactJsHooks} title="React JS Hooks"></CardCourse></Col>
                    <Col md={6}><CardCourse link='https://www.facebook.com/' subtitle='Intermedio - React JS' image={reactNative} title="React Native Expo"></CardCourse></Col>
                    <Col md={6}><CardCourse link='https://www.instagram.com/' subtitle='Basico - React JS' image={javaScript} title="Javascript ES6"></CardCourse></Col>
                    <Col md={6}><CardCourse link='https://www.instagram.com/' subtitle='Basico - Wordpress' image={wordPress} title="Wordpress"></CardCourse></Col>

                </Row>
                <Row className='row-courses'>
                    <Col md={6}><CardCourse link='https://www.prestashop.com/es' subtitle='Basico - Prestashop' image={prestaShop} title="Prestashop"></CardCourse></Col>
                    <Col md={6}></Col>
                    <Col md={6}></Col>
                    <Col md={6}><CardCourse link='https://www.w3schools.com/css/' subtitle='Intermedio - CSS Grid' image={cssGrid} title="CSS Grid"></CardCourse></Col>

                </Row>
            </Col>
            <Col lg={4}></Col>
            <Col lg={24} className='home-courses__more'>
                <Link to="/courses">
                    <Button>Ver Más</Button>
                </Link>
            </Col>
        </Row>
    )
}

function CardCourse(props) {
    const { image, title, subtitle, link } = props;
    const { Meta } = Card;
    return (
        <a href={link} target="_BLANK" rel="noopener noreferrer">
            <Card actions={[<Button>Ingresar</Button>]} className="home-courses__card" cover={<img src={image} alt={title}></img>}>
                <Meta title={title} description={subtitle}></Meta>
            </Card>
        </a>
    )
}
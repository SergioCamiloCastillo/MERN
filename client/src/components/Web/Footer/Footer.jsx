import React from 'react';
import "./Footer.scss";
import {Layout, Row, Col} from "antd";
import MyInfo from "./MyInfo";
import NavigationFooter from "./NavigationFooter";
import Newsletter from "../Newsletter";

export default function Footer() {
    const {Footer} = Layout;
    return (
        <Footer className='footer'>
            <Row>
                <Col md={4}></Col>
                <Col md={16}>
                    <Row>
                        <Col md={8}><MyInfo></MyInfo></Col>
                        <Col md={8}><NavigationFooter></NavigationFooter></Col>
                        <Col md={8}><Newsletter></Newsletter></Col>
                    </Row>
                    <Row className='footer__copyright'>
                        <Col md={12}>© {(new Date().getFullYear())} All right Reserved</Col>
                        <Col md={12}>Sergio Camilo Castillo | Desarrollador Web</Col>

                    </Row>
                </Col>
                <Col md={4}></Col>
            </Row>

        </Footer>
    )
}


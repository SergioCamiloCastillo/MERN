import React from 'react'
import {Row, Col} from "antd";
import "./NavigationFooter.scss";
import {Link} from "react-router-dom";
import {BookOutlined, UserOutlined, CodeOutlined, DatabaseOutlined, RightOutlined, HddOutlined, AppstoreOutlined} from "@ant-design/icons";
export default function NavigationFooter() {
    return (
        <Row className='navigation-footer'>
            <Col md={24}>
                <h3>Navigation</h3>
            </Col>
            <Col md={12}>
                 <RenderListLeft></RenderListLeft>
            </Col>
            <Col md={12}>
                <RenderListRight></RenderListRight>
            </Col>
        </Row>
    )
}
function RenderListLeft(){
    return (
        <ul>
            <li>
                <a href='#'>
                <BookOutlined /> Cursos Online
                </a>
            </li>
            <li>
                <Link to={"/contact"}>
                    <CodeOutlined /> Desarrollo Web
                </Link>
            </li>
            <li>
                <Link to={"/contact"}>
                <DatabaseOutlined /> Base de datos
                </Link>
            </li>
            <li>
                <Link to={"/contact"}>
                    <RightOutlined /> Politica de privacidad
                </Link>
            </li>
        </ul>
    )
}


function RenderListRight(){
    return (
        <ul>
            <li>
                <a href='#'>
                <HddOutlined /> Sistemas / Servidores
                </a>
            </li>
            <li>
                <Link to={"/contact"}>
                <AppstoreOutlined /> CMS
                </Link>
            </li>
            <li>
                <Link to={"/contact"}>
                <UserOutlined /> Portafolio
                </Link>
            </li>
            <li>
                <Link to={"/contact"}>
                    <RightOutlined /> Politica de Cookies
                </Link>
            </li>
        </ul>
    )
}

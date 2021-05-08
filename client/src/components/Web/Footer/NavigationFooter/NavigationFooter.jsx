import React from 'react'
import {Row, Col} from "antd";
import "./NavigationFooter.scss";
export default function NavigationFooter() {
    return (
        <Row className='navigation-footer'>
            <Col md={24}>
                <h3>Navigation</h3>
            </Col>
            <Col md={12}>
                 List 1
            </Col>
            <Col md={12}>
                Lista 2
            </Col>
        </Row>
    )
}
function RenderListLeft(){
    return (
        <ul>
            <li>
                <a href='#'></a>
            </li>
        </ul>
    )
}

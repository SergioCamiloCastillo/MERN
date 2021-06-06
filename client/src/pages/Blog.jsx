import React from "react";
import {Row, Col} from "antd";
import {useParams,withRouter} from "react-router-dom";
import PostsListWeb from "../components/Web/Blog/PostsListWeb";
import PostInfo from "../components/Web/Blog/PostInfo";
export default function Blog(props){
    const {url} = useParams();
    const {location, history} = props;
    return(
        <Row>
            <Col md={4}></Col>
            <Col md={16}>
                {url ? 
                    <PostInfo url={url}></PostInfo>
                :<PostsListWeb location={location} history={history} ></PostsListWeb>}
            </Col>
            <Col md={4}></Col>
        </Row>
    )
}

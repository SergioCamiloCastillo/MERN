import React from "react";
import {Row, Col} from "antd";
import {useParams,withRouter} from "react-router-dom";

export default function Blog(props){
    const {url} = useParams();
    
    return(
        <div>{url?(<h1>En un post</h1>):<h1>Lista de post</h1>}</div>
    )
}
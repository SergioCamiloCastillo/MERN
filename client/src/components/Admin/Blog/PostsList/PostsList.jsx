import React from "react";
import { List, Button, notification, Modal } from "antd";
import "./PostsList.scss";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { confirm } = Modal;
export default function PostsList(props) {
    const { posts } = props;

    return (
        <div className='posts-list'>
            <List
                dataSource={posts.docs}
                renderItem={post => <Post post={post}></Post>}
            ></List>
        </div>
    )
}

function Post(props) {
    const { post } = props;
    return (
        <List.Item actions={[<Link to={`/blog/${post.url}`} target="_blank"><Button type='primary' target="_BLANK"><EyeOutlined /></Button></Link>, <Button type='primary'><EditOutlined /></Button>, <Button type='danger'><DeleteOutlined /></Button>]}><List.Item.Meta title={post.title}></List.Item.Meta></List.Item>
    )

}
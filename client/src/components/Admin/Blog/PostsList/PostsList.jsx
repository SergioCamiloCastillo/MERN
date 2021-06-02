import React from "react";
import { List, Button, notification, Modal, message } from "antd";
import "./PostsList.scss";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {getAccessTokenApi} from "../../../../api/auth";
import {deletePostApi} from "../../../../api/post";

const { confirm } = Modal;
export default function PostsList(props) {
    const { posts, setReloadPosts, editPost } = props;
    const deletePost = post =>{
        const accessToken = getAccessTokenApi();
        confirm({
            title:"Eliminando Post",
            content:`¿Estas seguro de eliminar el post ${post.title}?`,
            okText:"Eliminar",
            okType:"danger",
            cancelText:"Cancelar",
            onOk(){
                deletePostApi(accessToken, posts._id).then(
                    response =>{
                        const typeNotification = response.code===200 ? "success" : "warning";
                        notification[typeNotification]({
                            message:response.message
                        });
                        setReloadPosts(true);
                    }
                ).catch(()=>{
                    notification["error"]({
                        message:"Error del servidor."
                    })
                })
            }
        })
    }

    return (
        <div className='posts-list'>
            <List
                dataSource={posts.docs}
                renderItem={post => <Post post={post} deletePost={deletePost} editPost={editPost}></Post>}
            ></List>
        </div>
    )
}

function Post(props) {
    const { post,deletePost, editPost } = props;
    return (
        <List.Item actions={[<Link to={`/blog/${post.url}`} target="_blank"><Button type='primary' target="_BLANK"><EyeOutlined /></Button></Link>, <Button onClick={()=>editPost(post)} type='primary'><EditOutlined /></Button>, <Button onClicl={()=>deletePost(post)} type='danger'><DeleteOutlined /></Button>]}><List.Item.Meta title={post.title}></List.Item.Meta></List.Item>
    )

}
import React, { useState, useEffect } from "react";
import { Row, Col, Input, Button, DatePicker, Form, notification } from "antd";
import moment from "moment";
import { Editor } from "@tinymce/tinymce-react";
import { getAccessTokenApi } from "../../../../api/auth";
import { addPostApi } from "../../../../api/post";
import {
    FontSizeOutlined, LinkOutlined
} from "@ant-design/icons";
import "./AddEditPostForm.scss";
export default function AddEditPostForm(props) {
    const { setIsVisibleModal, setReloadPosts, posts } = props;
    const [postData, setPostData] = useState({});
    useEffect(() => {
        if (posts) {
            setPostData(posts)
        } else {
            setPostData({})
        }
    }, [posts]);
    const processPost = e => {
        const { title, url, description, date } = postData;
        if (!title || !url || !description || !date) {
            notification["error"]({
                message: "Todos los campos son obligatorios."
            })
        } else {
            if (!posts) {
                addPost();

            } else {
                console.log("editando post");
                console.log(postData);

            }
        }

    }
    const addPost = () => {
        const token = getAccessTokenApi();
        addPostApi(token, postData).then(response => {
            const typeNotification = response.code === 200 ? "success" : "warning";
            notification[typeNotification]({
                message: response.message
            });
            setIsVisibleModal(false);
            setReloadPosts(true);
            setPostData({});
        }).catch(() => {
            notification["error"]({
                message: "Error del servidor."
            })
        });
    }
    return (
        <div className='add-edit-post-form'>
            <AddEditForm processPost={processPost} postData={postData} setPostData={setPostData} posts={posts}></AddEditForm>
        </div>
    )
}

function AddEditForm(props) {
    const { postData, setPostData, posts, processPost } = props;
    // con los tres puntos traemos lo que hay en postData, y luego le decimos que queremos actualizar la propiedad Title y le mandamos como valor e.target.value
    return (
        <Form className='add-edit-post-form' layout="inline" onFinish={processPost}>
            <Row gutter={24}>
                <Col span={8}>
                    <Input prefix={<FontSizeOutlined />} placeholder="Titulo" value={postData.title} onChange={e => setPostData({ ...postData, title: e.target.value })}></Input>

                </Col>
                <Col span={8}>
                    <Input prefix={<LinkOutlined />} placeholder="URL" value={postData.url} onChange={e => setPostData({ ...postData, url: transformTextToUrl(e.target.value) })}></Input>
                </Col>
                <Col span={8}>
                    <DatePicker showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }} style={{ width: "100%" }} format="DD/MM/YYYY HH:mm:ss" placeholder='Fecha de publicacion' value={postData.date && moment(postData.date)} onChange={(e, value) => setPostData({ ...postData, date: moment(value, "DD/MM/YYYY HH:mm:ss").toISOString() })}></DatePicker>

                </Col>
            </Row>
            <Editor
                value={postData.description ? postData.description : ""}
                initialValue="<p>This is the initial content of the editor.</p>"
                init={{
                    height: 400,
                    menubar: true,

                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                onBlur={e => setPostData({ ...postData, description: e.target.getContent() })}
            />
            <Button type='primary' htmlType="submit" className='btn-submit'>
                {posts ? "Actualizar Post" : "Crear Post"}
            </Button>
        </Form>
    )
}

function transformTextToUrl(text) {
    const url = text.replace(" ", "-");
    return url.toLowerCase();
}
import React, { useState, useEffect } from "react";
import { Row, Col, Input, Button, DatePicker, Form, notification } from "antd";
import moment from "moment";
import { Editor } from "@tinymce/tinymce-react";
import { getAccessTokenApi } from "../../../../api/auth";
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
    return (
        <div className='add-edit-post-form'>
            <AddEditForm postData={postData} setPostData={setPostData} posts={posts}></AddEditForm>
        </div>
    )
}

function AddEditForm(props) {
    const { postData, setPostData, posts } = props;
    return (
        <Form className='add-edit-post-form' layout="inline">
            <Row gutter={24}>
                <Col span={8}>
                    <Input prefix={<FontSizeOutlined />} placeholder="Titulo" ></Input>
                </Col>
                <Col span={8}>
                    <Input prefix={<LinkOutlined />} placeholder="URL" ></Input>
                </Col>
                <Col span={8}>
                    <DatePicker showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }} style={{ width: "100%" }} format="DD/MM/YYYY HH:mm:ss" placeholder='Fecha de publicacion'></DatePicker>

                </Col>
            </Row>
            <Editor
                initialValue="<p>This is the initial content of the editor.</p>"
                init={{
                    height: 400,
                    menubar:true,
                   
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
            />
            <Button type='primary' htmlType="submit" className='btn-submit'>
                {posts?"Actualizar Post" : "Crear Post"}
            </Button>
        </Form>
    )
}
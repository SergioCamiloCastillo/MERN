import React, { useState } from "react";
import "./Newsletter.scss";
import { Form, Input, Button, notification } from "antd";
import { suscribeNewsletterApi } from "../../../api/newsletter";
import { UserOutlined } from "@ant-design/icons";
export default function Newsletter() {
    const [email, setEmail ] = useState("");
    const onFinish = e => {
        const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; // expresion regular para validar emails
        const resultValidation = emailValid.test(email);
        if(!resultValidation){
            notification["error"]({
                message:"El correo electronico no es valido."
            });
        }else{
            suscribeNewsletterApi(email).then(response =>{
                if(response.code !== 200){
                    notification["warning"]({
                        message:response.message
                    });
                }else{
                    notification["success"]({
                        message:response.message
                    });
                }
            })
        }
    }
    return (
        <div className='newsletter'>
            <h3>Newsletter</h3>
            <Form onFinish={onFinish}>
                <Form.Item>
                    <Input value={email} onChange={e=>setEmail(e.target.value)} prefix={
                        <UserOutlined />
                    } style={{ color: "rgba(0,0,0,0.25)" }} placeholder='Correo electronico'></Input>
                </Form.Item>
                <Form.Item>
                    <Button  type='primary' htmlType="submit" className='login-form-button'>Me suscribo</Button>
                </Form.Item>
            </Form>
        </div>
    )
}
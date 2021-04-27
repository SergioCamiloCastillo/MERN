import React, { useState } from "react";
import { Form, Input, Button, notification, Select } from "antd";
import { addMenuApi } from "../../../../api/menu";
import { getAccessTokenApi } from "../../../../api/auth";
import {
    FontSizeOutlined,

} from "@ant-design/icons";
import "./AddMenuWebForm.scss";
export default function AddMenuWebForm(props) {
    const { setIsVisibleModal, setReloadMenuWeb } = props;
    const [menuWebData, setMenuWebData] = useState({});
    const addMenu = event => {
        let finalData = {
            title: menuWebData.title,
            url: (menuWebData.http ? menuWebData.http : "http://") + menuWebData.url
        }
        if (!finalData.title || !finalData.url || !finalData.url) {
            notification["error"]({
                message: "Todos los campos son obligatorios"
            });
        } else {
            const accessToken = getAccessTokenApi();
            finalData.active = false;
            finalData.order = 1000;
            addMenuApi(accessToken, finalData).then(response=>{
                notification['success']({
                    message:response
                });
                setIsVisibleModal(false);
                setReloadMenuWeb(true);
                setMenuWebData({});
                finalData={};
            }).catch(()=>{
                notification['error']({
                    message:"Error en el servidor."
                });
            });
        }
    }
    return (
        <div className='add-menu-web-form'><AddForm menuWebData={menuWebData} setMenuWebData={setMenuWebData} addMenu={addMenu}></AddForm></div>
    )
}

function AddForm(props) {
    const { menuWebData, setMenuWebData, addMenu } = props;
    const { Option } = Select;
    const selectBefore = (
        <Select onChange={e => setMenuWebData({ ...menuWebData, http: e })} defaultValue="http://" style={{ width: 90 }} ><Option value='http://'>http://</Option><Option value='https://'>https://</Option></Select>
    )
    return (
        <Form className="form-add" onFinish={addMenu}>
            <Form.Item>
                <Input prefix={<FontSizeOutlined />} placeholder='Titulo' onChange={e => setMenuWebData({ ...menuWebData, title: e.target.value })} value={menuWebData.title}></Input>
            </Form.Item>
            <Form.Item>
                <Input addonBefore={selectBefore}
                    placeholder="Url"
                    value={menuWebData.url}
                    onChange={e => setMenuWebData({ ...menuWebData, url: e.target.value })}


                ></Input>
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType='submit' className='btn-submit'>Crear Menu</Button>
            </Form.Item>

        </Form>
    )
}
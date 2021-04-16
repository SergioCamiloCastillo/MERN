import React, { useState } from "react";
import { Form, Input, Select, Button, Row, Col, notification } from "antd";
import { signUpAdminApi } from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/auth";
import "./AddUserForm.scss";
import {
    EyeInvisibleOutlined,
    EyeTwoTone,
    UserOutlined,
    LockOutlined,
    MailOutlined
} from "@ant-design/icons";
export default function AddUserForm(props) {
    const { setIsVisibleModal, setReloadUsers } = props;
    const [userData, setUserData] = useState({}); //Se van a guardar los datos que los usuarios que se van a crear
    const addUser = event => {//Funcion para crear usuario
        if (!userData.name || !userData.lastname || !userData.role || !userData.email || !userData.password || !userData.repeatPassword) {
            notification["error"]({
                message: "Todos los campos son obligatorios."
            });
        } else if (userData.password !== userData.repeatPassword) {
            notification["error"]({
                message: "Las contraseñas deben ser iguales."
            });
        } else {
            const accessToken = getAccessTokenApi();
            signUpAdminApi(accessToken, userData).then(response => {
                notification["success"]({
                    message: response
                });
                setIsVisibleModal(false);//Cerrar el modal
                setReloadUsers(true);//Volver a cargar la pagina para mostrar los usuario
                setUserData({});//Vaciar formulario modal de creacion para nuevos usuario
            }).catch(err => {
                notification["error"]({
                    message: err
                })
            });
        }
    }
    return (
        <div className='add-user-form'>
            <AddForm userData={userData} setUserData={setUserData} addUser={addUser}></AddForm>
        </div>
    )
}
function AddForm(props) {
    const { userData, setUserData, addUser } = props;
    const { Option } = Select;
    return (
        <Form className='form-add' onFinish={addUser}>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input prefix={<UserOutlined></UserOutlined>}
                            placeholder="Nombre"
                            value={userData.name}
                            onChange={e => setUserData({ ...userData, name: e.target.value })}
                        ></Input>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input prefix={<UserOutlined></UserOutlined>}
                            placeholder="Apellido"
                            value={userData.lastname}
                            onChange={e => setUserData({ ...userData, lastname: e.target.value })}
                        ></Input>
                    </Form.Item>
                </Col>

            </Row>
            <Row gutter={24}>

                <Col span={12}>
                    <Form.Item>
                        <Input prefix={<MailOutlined></MailOutlined>}
                            placeholder="Correo Electrónico"
                            value={userData.email}
                            onChange={e => setUserData({ ...userData, email: e.target.value })}
                        ></Input>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Select placeholder='Selecciona un rol' onChange={e => setUserData({ ...userData, role: e })}>
                            <Option value='admin'>Administrador</Option>
                            <Option value='editor'>Editor</Option>
                            <Option value='reviwer'>Revisor</Option>

                        </Select>
                    </Form.Item>
                </Col>

            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>

                        <Input prefix={<LockOutlined></LockOutlined>}
                            placeholder="password"
                             type='password'
                            value={userData.password}
                            onChange={e => setUserData({ ...userData, password: e.target.value })}
                        ></Input>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input prefix={<LockOutlined></LockOutlined>}
                            placeholder="Repetir Contraseña"
                            type='password'
                            value={userData.repeatPassword}
                            onChange={e => setUserData({ ...userData, repeatPassword: e.target.value })}
                        ></Input>
                    </Form.Item>
                </Col>

            </Row>
            <Form.Item>
                <Button type='primary' htmlType='submit' className='btn-submit'>
                    Crear Usuario
                </Button>
            </Form.Item>
        </Form>

    )
}

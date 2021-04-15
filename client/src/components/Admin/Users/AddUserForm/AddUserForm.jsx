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
        console.log('creando usuario');
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
                        <Select placeholder='Selecciona un rol' onChange={e => setUserData({ ...userData, role: e.target.value })}>
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
                            value={userData.password}
                            onChange={e => setUserData({ ...userData, password: e.target.value })}
                        ></Input>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input prefix={<LockOutlined></LockOutlined>}
                            placeholder="Repetir Contraseña"
                            value={userData.repeatPassword}
                            onChange={e => setUserData({ ...userData, repeatPassword: e.target.value })}
                        ></Input>
                    </Form.Item>
                </Col>

            </Row>
            <Form.Item>
                <Button type='submit'>
                    Crear Usuario
                </Button>
            </Form.Item>
        </Form>

    )
}

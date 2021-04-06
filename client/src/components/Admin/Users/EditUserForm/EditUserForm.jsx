import React, { useCallback, useState, useEffect } from 'react';
import "./EditUserForm.scss";
import {
    UserOutlined, MailOutlined, LockOutlined, EyeInvisibleOutlined,
    EyeTwoTone,

} from "@ant-design/icons";
import { Avatar, Form, Input, Select, Button, Col, Row } from "antd";
import { useDropzone } from 'react-dropzone';
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
export default function EditUserForm(props) {
    const { user } = props;
    const [avatar, setAvatar] = useState(null);
    const [userData, setUserData] = useState({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        avatar: user.avatar
    });
    useEffect(() => {
        if (avatar) {
            setUserData({ ...userData, avatar })
        }
    }, [avatar]);
    const updateUser = e => {
        console.log(userData);
    }
    return (

        <div className='edit-user-form'>
            <UploadAvatar avatar={avatar} setAvatar={setAvatar}></UploadAvatar>
            <EditForm userData={userData} setUserData={setUserData} updateUser={updateUser} />
        </div>
    )
}

function UploadAvatar(props) {
    const { avatar, setAvatar } = props;
    const onDrop = useCallback(
        acceptedFiles => {
            const file = acceptedFiles[0];
            setAvatar({ file, preview: URL.createObjectURL(file) })
        }, [setAvatar]
    );
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/jpeg, image/png, image/jpg",
        noKeyboard: true,
        onDrop
    });

    return (
        <div className="upload-avatar" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <Avatar size={150} src={NoAvatar} />
            ) : (
                <Avatar size={150} src={avatar ? avatar.preview : NoAvatar} />
            )}
        </div>
    );
}
function EditForm(props) {
    const { userData, setUserData, updateUser } = props;
    const { Option } = Select;

    return (
        <Form className='form-edit' onFinish={updateUser}>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={
                                <UserOutlined></UserOutlined>
                            }

                            defaultValue={userData.name}
                            placeholder="Nombres"
                            onChange={e => setUserData({ ...userData, name: e.target.value })}
                        ></Input>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={
                                <UserOutlined></UserOutlined>
                            }

                            defaultValue={userData.lastname}
                            placeholder="Apellidos"
                            onChange={e => setUserData({ ...userData, lastname: e.target.value })}
                        ></Input>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input prefix={<MailOutlined />} defaultValue={userData.email}
                            placeholder='Correo Electrónico'
                            onChange={e => setUserData({ ...userData, email: e.target.value })}
                        >
                        </Input>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Select
                            placeholder='Selecciona un rol'
                            onChange={e => setUserData({ ...userData, role: e })}
                            defaultValue={userData.role}
                        >
                            <Option value='admin'>Administrador</Option>
                            <Option value='editor'>Editor</Option>
                            <Option value='review'>Revisor</Option>


                        </Select>
                    </Form.Item>
                </Col>

            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input.Password prefix={<LockOutlined />}
                            type='password'
                            placeholder='Contraseña'
                            onChange={e => setUserData({ ...userData, password: e.target.value })}
                            iconRender={(visible) =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
                        />

                    </Form.Item>

                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input.Password prefix={<LockOutlined />}
                            type='password'
                            placeholder='Repetir Contraseña'
                            onChange={e => setUserData({ ...userData, repeatPassword: e.target.value })}
                            iconRender={(visible) =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
                        />                    </Form.Item>

                </Col>

            </Row>
            <Form.Item>
                <Button type='primary' htmlType='submit' className='btn-submit'>
                    Actualizar
            </Button>
            </Form.Item>
        </Form>
    );

}
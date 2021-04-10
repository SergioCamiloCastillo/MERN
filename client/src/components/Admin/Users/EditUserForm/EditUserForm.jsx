import React, { useCallback, useState, useEffect } from 'react';
import "./EditUserForm.scss";
import {
    UserOutlined, MailOutlined, LockOutlined, EyeInvisibleOutlined,
    EyeTwoTone,

} from "@ant-design/icons";
import { Avatar, Form, Input, Select, Button, Col, Row, notification } from "antd";
import { useDropzone } from 'react-dropzone';
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import { getAvatarApi, updateUserApi, uploadAvatarApi } from "../../../../api/user";
import { getAccessTokenApi } from '../../../../api/auth'
export default function EditUserForm(props) {
    const { user, setIsVisibleModal, setReloadUsers } = props;
    const [avatar, setAvatar] = useState(null);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        setUserData({
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            password:user.password,
            repeatPassword:user.password
        })
    }, [user]);
    useEffect(() => {
        if (user.avatar) {
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);
            });
        } else {
            setAvatar(null);
        }
    }, [user]);
    useEffect(() => {
        if (avatar) {
            setUserData({ ...userData, avatar: avatar.file })
        }
    }, [avatar]);
    const updateUser = e => {
        const token = getAccessTokenApi();
        let userUpdate = userData;
        if (userUpdate.password || userUpdate.repeatPassword) {
            if (userUpdate.password != userUpdate.repeatPassword) {
                console.log(userUpdate.password);
                console.log(userUpdate);
                notification["error"]({
                    message: "Las contraseñas tienen que ser iguales"
                });
                return;
            }else{
                delete userUpdate.repeatPassword;
            }
            
        }
        if (!userUpdate.name || !userUpdate.lastname || !userUpdate.email) {
            notification["error"]({
                message: "El nombre, apellidos, email son obligatorios."
            });
            return;
        }
        if (typeof userUpdate.avatar === "object") {
            uploadAvatarApi(token, userUpdate.avatar, user._id).then(response => {
                userUpdate.avatar = response.avatarName;
                updateUserApi(token, userUpdate, user._id).then(result => {
                  notification["success"]({
                    message: result.message
                  });
                  setIsVisibleModal(false);
                  setReloadUsers(true);
                });
              });
        } else {
            updateUserApi(token, userUpdate, user._id).then(result => {
                notification["success"]({
                    message: result.message
                });
                setIsVisibleModal(false);
                setReloadUsers(true);

            });
        }
        setIsVisibleModal(false);

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
    const [avatarUrl, setAvatarUrl] = useState(null);
    useEffect(() => {
        if (avatar) {
            if (avatar.preview) {
                setAvatarUrl(avatar.preview);
            } else {
                setAvatarUrl(avatar)
            }
        } else {
            setAvatarUrl(null);
        }
    }, [avatar]);
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
                <Avatar size={150} src={avatarUrl ? avatarUrl : NoAvatar} />
            )}
        </div>
    );
}
function EditForm(props) {
    const { userData, setUserData, updateUser, UserActive } = props;
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

                            value={userData.name}
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

                            value={userData.lastname}
                            placeholder="Apellidos"
                            onChange={e => setUserData({ ...userData, lastname: e.target.value })}
                        ></Input>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input prefix={<MailOutlined />} value={userData.email}
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
                            value={userData.role}
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
                            value={userData.password}
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
                            value={userData.repeatPassword}
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


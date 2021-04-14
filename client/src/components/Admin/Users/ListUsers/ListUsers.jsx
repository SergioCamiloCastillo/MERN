import React, { useState, useEffect } from 'react';
import { Switch, List, Avatar, Button, notification, Modal as ModalAntd, message } from "antd";
import Noavatar from "../../../../assets/img/png/no-avatar.png";
import Modal from "../../Modal";
import EditUserForm from "../EditUserForm/";

import {
    getAvatarApi,
    activateUserApi,
    deleteUserApi
} from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/auth";
import {
    EditOutlined, CloseCircleOutlined, StopOutlined, CheckOutlined
} from "@ant-design/icons";
import "./ListUsers.scss";
const { confirm } = ModalAntd;

export default function ListUsers(props) {

    const { usersActive, usersInactive, setReloadUsers } = props;
    const [viewUserActive, setviewUserActive] = useState(true);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    const addUserModal= () =>{
        setIsVisibleModal(true);
        setModalTitle("Creando nuevo usuario");
        setModalContent(<div>
            <h1>Formulario creacion de usuarios</h1>
        </div>);
    }
    const ShowDeleteConfirm = (user) => {
        const accesToken = getAccessTokenApi();
        confirm({
            title: "Eliminando Usuario",
            content: `¿Estás seguro que quieres eliminar a ${user.email}?`,
            okText: "Eliminar",
            okType: "danger",
            cancelText: "Cancelar",
            onOk() {
                deleteUserApi(accesToken, user._id)
                    .then(response => {
                        notification["success"]({
                            message: response
                        });
                        setReloadUsers(true);
                    })
                    .catch(err => {
                        notification["error"]({
                            message: err
                        });
                    });
            }
        });
    };
    return (
        <div className='list-users'>
            <div className='list-users__header'>
                <div className='list-users__header-switch'>
                    <Switch defaultChecked onChange={() => setviewUserActive(!viewUserActive)}></Switch>
                    <span>{viewUserActive ? "Usuarios Activos" : "Usuarios Inactivos"}</span>
                </div>
                <Button type='primary' onClick={addUserModal}>Nuevo usuario</Button>
            </div>

            {viewUserActive ? <UsersActive usersActive={usersActive} setModalTitle={setModalTitle} setModalContent={setModalContent} setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers} ShowDeleteConfirm={ShowDeleteConfirm}></UsersActive> : <UsersInactive usersInactive={usersInactive} setReloadUsers={setReloadUsers} ShowDeleteConfirm={ShowDeleteConfirm}></UsersInactive>}
            <Modal title={modalTitle} isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>{modalContent}</Modal>
        </div>
    )
}
function UserActive(props) {
    const { user, editUser, setReloadUsers, ShowDeleteConfirm } = props;
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if (user.avatar) {
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);
            });
        } else {
            setAvatar(null);
        }
    }, [user]);
    const desactivateUser = () => {
        const accessToken = getAccessTokenApi();
        activateUserApi(accessToken, user._id, false).then(response => {
            notification["success"]({
                message: response
            });
            setReloadUsers(true);
        }).catch(err => {
            notification["error"]({
                message: err
            })
        });
    }

    return (
        <List.Item
            actions={[
                <Button type='primary' onClick={() => editUser(user)}><EditOutlined /></Button>
                , <Button type='danger' onClick={desactivateUser}><StopOutlined /></Button>

                , <Button type='danger' onClick={e => ShowDeleteConfirm(user)}><CloseCircleOutlined></CloseCircleOutlined></Button>
            ]}
        >

            <List.Item.Meta
                avatar={<Avatar src={avatar ? avatar : Noavatar} />}
                title={`
    ${user.name ? user.name : "..."} 
    ${user.lastname ? user.lastname : "..."}
`}
                description={user.email}
            />
        </List.Item>
    );
}
function UsersActive(props) {
    const { usersActive, setIsVisibleModal, setModalTitle, setModalContent, setReloadUsers, ShowDeleteConfirm } = props;
    const editUser = user => {
        setIsVisibleModal(true);
        setModalTitle(`Editar ${user.name ? user.name : "..."} ${user.lastname ? user.lastname : "...."}`);
        setModalContent(<EditUserForm user={user} setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers}></EditUserForm>)
    }

    return (
        <List className='users-active'
            itemLayout='horizontal'
            dataSource={usersActive}
            renderItem={user => <UserActive user={user} editUser={editUser} setReloadUsers={setReloadUsers} ShowDeleteConfirm={ShowDeleteConfirm}></UserActive>}
        ></List>
    );

}
function UsersInactive(props) {
    const { usersInactive, setReloadUsers, ShowDeleteConfirm } = props;
    return (
        <List className='users-active'
            itemLayout='horizontal'
            dataSource={usersInactive}
            renderItem={user => <UserInactive user={user} setReloadUsers={setReloadUsers} ShowDeleteConfirm={ShowDeleteConfirm}></UserInactive>}
        ></List>
    );
}
function UserInactive(props) {
    const { user, setReloadUsers, ShowDeleteConfirm } = props;
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        if (user.avatar) {
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);
            });
        } else {
            setAvatar(null);
        }
    }, [user]);
    const activateUser = () => {
        const accessToken = getAccessTokenApi();
        activateUserApi(accessToken, user._id, true).then(response => {
            notification["success"]({
                message: response
            });
            setReloadUsers(true);
        }).catch(err => {
            notification["error"]({
                message: err
            })
        });
    }


    return (<List.Item
        actions={[
            <Button type='primary' onClick={activateUser}><CheckOutlined /></Button>
            , <Button type='danger' onClick={e => ShowDeleteConfirm(user)}><CloseCircleOutlined></CloseCircleOutlined></Button>
        ]}
    >

        <List.Item.Meta
            avatar={<Avatar src={avatar ? avatar : Noavatar} />}
            title={`
    ${user.name ? user.name : "..."} 
    ${user.lastname ? user.lastname : "..."}
`}
            description={user.email}
        />
    </List.Item>)
}





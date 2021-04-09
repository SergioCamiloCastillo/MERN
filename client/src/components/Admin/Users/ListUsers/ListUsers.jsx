import React, { useState,useEffect } from 'react';
import { Switch, List, Avatar, Button } from "antd";
import Noavatar from "../../../../assets/img/png/no-avatar.png";
import Modal from "../../Modal";
import EditUserForm from "../EditUserForm/";

import {
    getAvatarApi,
    activateUserApi,
    deleteUserApi
  } from "../../../../api/user";
import {
    EditOutlined, CloseCircleOutlined, StopOutlined, CheckOutlined
} from "@ant-design/icons";
import "./ListUsers.scss";
export default function ListUsers(props) {
    const { usersActive, usersInactive, setReloadUsers } = props;
    const [viewUserActive, setviewUserActive] = useState(true);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    return (
        <div className='list-users'><div className='list-users__switch'>
            <Switch defaultChecked onChange={() => setviewUserActive(!viewUserActive)}></Switch>
            <span>{viewUserActive ? "Usuarios Activos" : "Usuarios Inactivos"}</span>
        </div>
            {viewUserActive ? <UsersActive usersActive={usersActive} setModalTitle={setModalTitle} setModalContent={setModalContent} setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers}></UsersActive> : <UsersInactive usersInactive={usersInactive}></UsersInactive>}
            <Modal title={modalTitle} isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>{modalContent}</Modal>
        </div>
    )
}
function UserActive(props) {
    const { user, editUser, setReloadUsers } = props;
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

  

   

    return (
        <List.Item
            actions={[
                <Button type='primary' onClick={() => editUser(user)}><EditOutlined /></Button>
                , <Button type='danger' onClick={() => console.log('desactivar')}><StopOutlined /></Button>
                , <Button type='danger' onClick={() => console.log('eliminar usuario')}><CloseCircleOutlined></CloseCircleOutlined></Button>
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
    const { usersActive, setIsVisibleModal, setModalTitle, setModalContent,setReloadUsers } = props;
    const editUser = user => {
        setIsVisibleModal(true);
        setModalTitle(`Editar ${user.name ? user.name : "..."} ${user.lastname ? user.lastname : "...."}`);
        setModalContent(<EditUserForm user={user} setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers}></EditUserForm>)
    }

    return (
        <List className='users-active'
            itemLayout='horizontal'
            dataSource={usersActive}
            renderItem={user => <UserActive user={user} editUser={editUser}></UserActive>}
        ></List>
    );

}
function UsersInactive(props) {
    const { usersInactive } = props;
    return (
        <List className='users-active'
            itemLayout='horizontal'
            dataSource={usersInactive}
            renderItem={user => <UserInactive user={user}></UserInactive>}
        ></List>
    );
}
function UserInactive(props){
    const {user}= props;
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
    return ( <List.Item
        actions={[
            <Button type='primary' onClick={() => console.log('Activar usuario')}><CheckOutlined /></Button>
            , <Button type='danger' onClick={() => console.log('Eliminar usuario')}><CloseCircleOutlined></CloseCircleOutlined></Button>
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





import React, { useState } from 'react';
import { Switch, List, Avatar, Button } from "antd";
import Noavatar from "../../../../assets/img/png/no-avatar.png";
import Modal from "../../Modal";
import EditUserForm from "../EditUserForm/";


import {
    EditOutlined, CloseCircleOutlined, StopOutlined, CheckOutlined
} from "@ant-design/icons";
import "./ListUsers.scss";
export default function ListUsers(props) {
    const { usersActive, usersInactive } = props;
    const [viewUserActive, setviewUserActive] = useState(true);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    return (
        <div className='list-users'><div className='list-users__switch'>
            <Switch defaultChecked onChange={() => setviewUserActive(!viewUserActive)}></Switch>
            <span>{viewUserActive ? "Usuarios Activos" : "Usuarios Inactivos"}</span>
        </div>
            {viewUserActive ? <UserActive usersActive={usersActive} setModalTitle={setModalTitle} setModalContent={setModalContent} setIsVisibleModal={setIsVisibleModal}></UserActive> : <UserInactive usersInactive={usersInactive}></UserInactive>}
            <Modal title={modalTitle} isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>{modalContent}</Modal>
        </div>
    )
}
function UserActive(props) {
    const { usersActive, setIsVisibleModal, setModalTitle, setModalContent } = props;
    const editUser = user => {
        setIsVisibleModal(true);
        setModalTitle(`Editar ${user.name ? user.name : "..."} ${user.lastname ? user.lastname : "...."}`);
        setModalContent(<EditUserForm user={user}></EditUserForm>)
    }

    return (
        <List className='users-active'
            itemLayout='horizontal'
            dataSource={usersActive}
            renderItem={user => (
                <List.Item
                    actions={[
                        <Button type='primary' onClick={() => editUser(user)}><EditOutlined /></Button>
                        , <Button type='danger' onClick={() => console.log('desactivar')}><StopOutlined /></Button>
                        , <Button type='danger' onClick={() => console.log('eliminar usuario')}><CloseCircleOutlined></CloseCircleOutlined></Button>
                    ]}
                >

                    <List.Item.Meta
                        avatar={<Avatar src={user.avatar ? user.avatar : Noavatar} />}
                        title={`
                ${user.name ? user.name : "..."} 
                ${user.lastname ? user.lastname : "..."}
            `}
                        description={user.email}
                    />
                </List.Item>
            )}
        ></List>
    );

}
function UserInactive(props) {
    const { usersInactive } = props;
    return (
        <List className='users-active'
            itemLayout='horizontal'
            dataSource={usersInactive}
            renderItem={user => (
                <List.Item
                    actions={[
                        <Button type='primary' onClick={() => console.log('Activar usuario')}><CheckOutlined /></Button>
                        , <Button type='danger' onClick={() => console.log('Eliminar usuario')}><CloseCircleOutlined></CloseCircleOutlined></Button>
                    ]}
                >

                    <List.Item.Meta
                        avatar={<Avatar src={user.avatar ? user.avatar : Noavatar} />}
                        title={`
                ${user.name ? user.name : "..."} 
                ${user.lastname ? user.lastname : "..."}
            `}
                        description={user.email}
                    />
                </List.Item>
            )}
        ></List>
    );
}
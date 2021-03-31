import React, { useState } from 'react';
import { Switch, List, Avatar, Button } from "antd";
import Noavatar from "../../../assets/img/png/no-avatar.png";
import Modal from "../Modal";
import {
    EditOutlined, CloseCircleOutlined, StopOutlined, CheckOutlined
} from "@ant-design/icons";
import "./ListUsers.scss";
export default function ListUsers(props) {
    const { usersActive, usersInactive } = props;
    const [viewUserActive, setviewUserActive] = useState(true);
    console.log(usersActive);
    console.log(usersInactive);

    return (
        <div className='list-users'><div className='list-users__switch'>
            <Switch defaultChecked onChange={() => setviewUserActive(!viewUserActive)}></Switch>
            <span>{viewUserActive ? "Usuarios Activos" : "Usuarios Inactivos"}</span>
        </div>
            {viewUserActive ? <UserActive usersActive={usersActive}></UserActive> : <UserInactive usersInactive={usersInactive}></UserInactive>}
            <Modal title='Mi modal' isVisible={true} setIsVisible={()=>console.log('assss')}>Hola este es mi primer modal</Modal>
        </div>
    )
}
function UserActive(props) {
    const { usersActive } = props;

    return (
        <List className='users-active'
            itemLayout='horizontal'
            dataSource={usersActive}
            renderItem={user => (
                <List.Item
                    actions={[
                        <Button type='primary' onClick={() => console.log('editar usuario')}><EditOutlined /></Button>
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
import React, { useState } from 'react';
import { Switch, List, Avatar, Button } from "antd";
import Noavatar from "../../../assets/img/png/no-avatar.png";
import "./ListUsers.scss";
export default function ListUsers(props) {
    const { usersActive, usersInactive } = props;
    const [viewUserActive, setviewUserActive] = useState(true);
    console.log(usersActive);
    console.log(usersInactive);

    return (<div className='list-users'><div className='list-users__switch'>
        <Switch defaultChecked onChange={() => setviewUserActive(!viewUserActive)}></Switch>
        <span>{viewUserActive ? "Usuarios Activos" : "Usuarios Inactivos"}</span>
    </div>
        {viewUserActive ? <UserActive></UserActive> : <UserInactive></UserInactive>}
    </div>)
}
function UserActive(props) {
    const { usersActive } = props;

    return (
        <List className='users-active'
            itemLayout='horizontal'
            dataSource={usersActive}
            renderItem={user => (
                <List.Item>

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
function UserInactive() {
    return <h4>Uusario lista Inactivos</h4>
}
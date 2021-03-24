import React, { useState } from 'react';
import { Switch, List, Avatar, Button } from "antd";
import noavatar from "../../../assets/img/png/no-avatar.png";
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
    {viewUserActive?<UserActive></UserActive>:<UserInactive></UserInactive>}
    </div>)
}
function UserActive(){
    return <h4>Uusario lista activos</h4>
}
function UserInactive(){
    return <h4>Uusario lista Inactivos</h4>
}
import React,{useState, useEffect} from "react";
import {getAccessTokenApi} from '../../../api/auth';
import {getUserActiveApi} from '../../../api/user';
import "./Users.scss";
import ListUsers from "../../../components/Admin/Users/ListUsers.jsx";


import "./Users.scss";

export default function Users() {
  const [usersActive, setUsersActive] = useState([]);
  const [usersInactive, setUsersInactive] = useState([]);
  const [reloadUsers, setReloadUsers] = useState(false);
  const token = getAccessTokenApi();

  useEffect(() => {
    getUserActiveApi(token, true).then((response) => {
      setUsersActive(response.users);
    });
    getUserActiveApi(token, false).then((response) => {
      setUsersInactive(response.users);
    });
    setReloadUsers(false);
  }, [token, reloadUsers]);

  return (
    <div className="users">
      <ListUsers
        usersActive={usersActive}
        usersInactive={usersInactive}
        setReloadUsers={setReloadUsers}
      />
    </div>
  );
}

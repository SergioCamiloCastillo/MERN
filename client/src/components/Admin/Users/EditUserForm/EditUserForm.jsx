import React, { useCallback, useState } from 'react';
import "./UserUserForm.scss";
import { Avatar, Form, Input, Select, Button, Col, Row } from "antd";
import { useDropzone } from 'react-dropzone';
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
export default function EditUserForm(props) {
    const { user } = props;
    const [avatar, setAvatar] = useState(null);
    const [userData, setUserData] = useState({
        name:user.name,
        lastname:user.lastname,
        email: user.email,
        role:user.role,
        avatar:user.avatar
    });
    return (

        <div className='edit-user-form'>
            <UploadAvatar  avatar={avatar} setAvatar={setAvatar}></UploadAvatar>
            <EditForm user={user}/>
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
function EditForm(props){
    const {user, userData, setUserData, updateUser} = props;
    return (
        <div>
            <h2>Form...</h2>
        </div>
    );

}
import React from 'react';
import {Modal as ModalAntd} from 'antd';
export default function Modal(props){
    const {children, title, isVisible, setIsVisible,...other } = props;
    console.log(other);
    return (
        <ModalAntd title={title} centered visible={isVisible} onCancel={()=>setIsVisible(false)} footer={false} {...other}>{children}</ModalAntd>
    )
}
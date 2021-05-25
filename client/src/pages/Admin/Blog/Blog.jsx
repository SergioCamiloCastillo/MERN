import React, { useEffect, useState } from "react";
import { Button, notification } from "antd";
import Modal from "../../../components/Admin/Modal";

import "./Blog.scss";

export default function Blog() {
    const [title, setTitle] = useState("");
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);


    return (
        <div className='blog'>
            <div className='blog__add-post'>
                <Button type='primary'>Nuevo Post</Button>
            </div>
            <h1>Post List</h1>
            <h2>Paginacion post...</h2>
            <Modal title={title } isVisible={isVisibleModal } setIsVisible={ setIsVisibleModal} width="75%"></Modal>

        </div>
    )
}
import React, { useState, useEffect, useDebugValue } from 'react';
import { Switch, List, Button, Modal as ModalAntd, notification } from 'antd';
import Modal from '../../Modal';
import DragSortableList from 'react-drag-sortable';
import { updateMenuApi, activateMenuApi } from "../../../../api/menu";
import { getAccessTokenApi } from '../../../../api/auth';
import AddMenuWebForm from "../AddMenuWebForm";
import EditMenuWebForm from "../EditMenuWebForm";

import "./MenuWebList.scss";
import {
    EditOutlined,
    DeleteOutlined
} from "@ant-design/icons";

const { confirm } = ModalAntd;

export default function MenuWebList(props) {
    const { menu, setReloadMenuWeb } = props;
    const [listItems, setListItems] = useState([]);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        const listItemsArray = [];

        Array.prototype.forEach.call(menu, function (item, i) {

            listItemsArray.push({
                content: (
                    <MenuItem item={item} activateMenu={activateMenu} editMenuWebModal={editMenuWebModal}></MenuItem>
                ),
            });
        });
        setListItems(listItemsArray);
    }, [menu]);
    const onSort = (sortedList, dropEvent) => {
        const accessToken = getAccessTokenApi();
        sortedList.forEach(item => {
            const { _id } = item.content.props.item;
            const order = item.rank;
            updateMenuApi(accessToken, _id, { order });
        });
    }
    const activateMenu = (menu, status) => {
        const accessToken = getAccessTokenApi();
        activateMenuApi(accessToken, menu._id, status).then(response => {
            notification["success"]({
                message: response
            });
        });
    }
    const addMenuWebModal = () => {
        setIsVisibleModal(true);
        setModalTitle('Creando menú');
        setModalContent(
            <AddMenuWebForm setIsVisibleModal={setIsVisibleModal} setReloadMenuWeb={setReloadMenuWeb}></AddMenuWebForm>
        )
    }
    const editMenuWebModal = menu =>{
        setIsVisibleModal(true);
        setModalTitle(`Editando menu: ${menu.title}`);
        setModalContent(
            <EditMenuWebForm setIsVisibleModal={setIsVisibleModal} setReloadMenuWeb={setReloadMenuWeb} menu={menu}></EditMenuWebForm>
        )
    }

    return (
        <div className='menu-web-list'>
            <div className='menu-web-list__header'><Button type='primary' onClick={addMenuWebModal}>Crear Menu</Button></div>
            <div className='menu-web-list__items'>
                <DragSortableList items={listItems} onSort={onSort} type='vertical'></DragSortableList>
            </div>
            <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            >
                {modalContent}
            </Modal>
        </div>
    )
}
function MenuItem(props) {
    const { item, activateMenu, editMenuWebModal } = props;
    return (
        <List.Item actions={[<Switch defaultChecked={item.active} onChange={e => activateMenu(item, e)}></Switch>, <Button type='primary' onClick={()=>editMenuWebModal(item)}><EditOutlined /></Button>, <Button type='danger'><DeleteOutlined /></Button>]}><List.Item.Meta title={item.title} description={item.url}></List.Item.Meta></List.Item>
    )
}

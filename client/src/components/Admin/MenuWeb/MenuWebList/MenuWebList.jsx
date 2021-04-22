import React, { useState, useEffect, useDebugValue } from 'react';
import { Switch, List, Button, Modal as ModalAntd, notification } from 'antd';
import Modal from '../../Modal';
import DragSortableList from 'react-drag-sortable';
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
                   <MenuItem  item={item}></MenuItem>
                ),
            });
        });
        setListItems(listItemsArray);
    }, [menu]);
    const onSort = (sortedList, dropEvent) => {
        console.log(sortedList);
    }

    return (
        <div className='menu-web-list'>
            <div className='menu-web-list__header'><Button type='primary'>Nuevo Menu</Button></div>
            <div className='menu-web-list__items'>
                <DragSortableList items={listItems} onSort={onSort} type='vertical'></DragSortableList>
            </div>
        </div>
    )
}
function MenuItem(props){
    const {item}=props;
    return (
        <List.Item actions={[<Switch defaultChecked={item.active }></Switch>,<Button type='primary'><EditOutlined /></Button>,<Button type='danger'><DeleteOutlined /></Button>]}><List.Item.Meta title={item.title} description={item.url}></List.Item.Meta></List.Item>
    )
}

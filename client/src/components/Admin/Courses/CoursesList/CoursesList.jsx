import React,{useState, useEffect} from "react";
import {List, Button, Modal as ModalAntd, notification} from "antd";
import DragSortableList from "react-drag-sortable";
import Modal from "../../Modal";
import {
    EditOutlined, DeleteOutlined 
  } from "@ant-design/icons";
import "./CoursesList.scss";
import {getCourseDataUdemyApi} from "../../../../api/courses";
const {confirm} = ModalAntd;
export default function CoursesList(props){
    const {courses, setReloadCourses} = props;
    const [listCourses, setListCourses] = useState([]);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState(""); 
    const [modalContent, setModalContent] = useState(null);
    useEffect(()=>{
        const listCoursesArray = [];
        courses.forEach(course=>{
            listCoursesArray.push({
                content:(
                    <Course course={course}></Course>
                )
            });
        });
        setListCourses(listCoursesArray);
    },[courses]);
    const onSort = (sortedList, dropEvent) =>{
        console.log(sortedList);
    }
    return (
        <div className='courses-list'>
            <div className='courses-list__header'>
                <Button type='primary' onClick={()=>{console.log('creando cursos nuevos...');}}>Nuevo curso</Button>
            </div>
            <div className='courses-list__items'>
                {listCourses.length===0&&(
                    <h2 style={{textAlign:"center", margin:0}}>No tiene cursos creados</h2>
                )}
                <DragSortableList items={listCourses} onSort={onSort} type='vertical'></DragSortableList>
            </div>
        </div>
    )
}

function Course(props){
    const { course } = props;
    const {courseData, setCourseData} = useState(null); 
    useEffect(()=>{
        getCourseDataUdemyApi(course.idCourse).then(response =>{
            if(response.code!==200){
                notification['warning']({
                    message:`El curso con el ID ${course.idCourse} no se ha encontrado.` 
                })
            }
            setCourseData(response.data);
        })
    }, [course]);
    if(!courseData){
        return null;
    }
    return (
        <List.Item actions={[
            <Button type='primary' onClick={()=>console.log('editar cursos')}>
                <EditOutlined />
            </Button>,
            <Button type='danger' onClick={()=>console.log('eliminar cursos')}>
            <DeleteOutlined />
        </Button>
            
        ]}>
            <img src={courseData.image_480x270} alt={courseData.title} style={{width:"100px", marginRight:"20px"}}></img>
            <List.Item.Meta description={courseData.headline} title ={`${courseData.title} | ID: ${course.idCourse}`} />

        </List.Item>

      
    )
}
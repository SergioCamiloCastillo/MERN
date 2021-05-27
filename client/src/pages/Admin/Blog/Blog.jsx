import React, { useEffect, useState } from "react";
import { Button, notification } from "antd";
import { withRouter } from "react-router-dom";
import Modal from "../../../components/Admin/Modal";
import queryString from "query-string";
import Pagination from "../../../components/Pagination";
import PostsList from "../../../components/Admin/Blog/PostsList";
import AddEditPostForm from "../../../components/Admin/Blog/AddEditPostForm";
import "./Blog.scss";
import { getPostsApi } from "../../../api/post";

function Blog(props) {
    const { location, history } = props;
    const [modalTitle, setModalTitle] = useState("");
    const [posts, setPosts] = useState(null);
    const [reloadPosts, setReloadPosts] = useState(false);

    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const { page = 1 } = queryString.parse(location.search);
    useEffect(() => {
        getPostsApi(12, page).then(response => {
            if (response?.code !== 200) {
                notification["warning"]({
                    message: response.message
                })
            } else {
                setPosts(response.posts);
            }
        }).catch(() => {
            notification["error"]({
                message: "Error del servidor."
            })
        });
        setReloadPosts(false);
    }, [page, reloadPosts]);

    const addPost = () =>{
        setIsVisibleModal(true);
        setModalTitle("Creando nuevo post");
        setModalContent(<AddEditPostForm setIsVisibleModal={setIsVisibleModal} setReloadPosts={setReloadPosts} posts={null}></AddEditPostForm>)
    }
    if(!posts){
        return null;
    }
    return (
        <div className='blog'>
            <div className='blog__add-post'>
                <Button type='primary' onClick={addPost}>Nuevo Post</Button>
            </div>
            <PostsList posts={posts} setReloadPosts={setReloadPosts}></PostsList>
            <Pagination posts={posts} location={location} history={history}></Pagination>
            <Modal title={modalTitle} isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}  width="75%">{modalContent}</Modal>

        </div>
    )
}
export default withRouter(Blog)
import React, { useEffect, useState } from "react";
import { Button, notification } from "antd";
import { withRouter } from "react-router-dom";
import Modal from "../../../components/Admin/Modal";
import queryString from "query-string";
import Pagination from "../../../components/Pagination";
import PostsList from "../../../components/Admin/Blog/PostsList";
import "./Blog.scss";
import { getPostsApi } from "../../../api/post";

function Blog(props) {
    const { location, history } = props;
    const [title, setTitle] = useState("");
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
    if(!posts){
        return null;
    }
    return (
        <div className='blog'>
            <div className='blog__add-post'>
                <Button type='primary'>Nuevo Post</Button>
            </div>
            <PostsList posts={posts}></PostsList>
            <Pagination posts={posts} location={location} history={history}></Pagination>
            <Modal title={title} isVisible={isVisibleModal} setIsVisible={setIsVisibleModal} width="75%"></Modal>

        </div>
    )
}
export default withRouter(Blog)
import React from "react";
import { Pagination as Paginationantd } from "antd";
import "./Pagination.scss";
export default function Pagination(props) {
    const { posts, location, history } = props;
    const currentPage = parseInt(posts.page);
    const onChangePage = newPage => {
        history.push(`${location.pathname}?page=${newPage}`);
    }
    console.log(posts);
    return (
        <Paginationantd
            defaultCurrent={currentPage}
            total={posts.totalDocs}
            className='pagination'
            pageSize={posts.limit}
            onChange={ newPage => onChangePage(newPage)}
        >

        </Paginationantd>
    )
}
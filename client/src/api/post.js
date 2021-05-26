import {
    basePath,
    apiVersion
} from "./config";
export function getPostsApi(limit, page) {
    const url = `${basePath}/${apiVersion}/get-posts?limit=${limit}&page=${page}`;
    return fetch(url).then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    });
}
const Post = require("../models/Post");

const postCtrl = {};
postCtrl.addPost = (req, res) => {
    const body = req.body;
    const post = new Post(body);
    post.save((err, postStore) => {
        if (err) {
            res.status(500).send({
                code: 500,
                message: "Error del servidor."
            })
        } else {
            if (!postStore) {
                res.status(400).send({
                    code: 400,
                    message: "No se ha podido crear el curso."
                });
            } else {
                res.status(200).send({
                    code: 200,
                    message: "Post creado correctamente."
                });
            }
        }
    });
}
postCtrl.getPosts = (req, res) => {
    const {
        page = 1,
            limit = 10
    } = req.query; // Es cuando ponemos en la url un ? ó & , para pasar parametros
    const options = {
        page: page,
        limit: parseInt(limit),
        sort: {
            date: "desc"
        }
    }
    Post.paginate({}, options, (err, postStored) => {
        if (err) {
            res.status(500).send({
                code: 500,
                message: "Error del servidor."
            })
        } else {
            if (!postStored) {
                res.status(404).send({
                    code: 404,
                    message: "No se ha encontrado ningun post."
                });
            } else {
                res.status(200).send({
                    code: 200,
                    posts: postStored
                })
            }
        }
    });

}
postCtrl.updatePost = (req, res) => {
    const postData = req.body;
    const {
        id
    } = req.params;
    Post.findByIdAndUpdate(id, postData, (err, postUpdate) => {
        if (err) {
            res.status(500).send({
                code: 500,
                message: "Error del servidor."
            });
        } else {
            if (!postUpdate) {
                res.status(404).send({
                    code: 404,
                    message: "No se ha encontrado ningun post."
                });
            } else {
                res.status(200).send({
                    code: 200,
                    message: "Post actualizado correctamente."
                })
            }
        }
    });

}
postCtrl.deletePost = (req, res) => {
    const {
        id
    } = req.params;
    Post.findByIdAndRemove(id, (err, postDeleted) => {
        if (err) {
            res.status(500).send({
                code: 500,
                message: "Error del servidor."
            });
        } else {
            if (!postDeleted) {
                res.status(404).send({
                    cod: 404,
                    message: "No se encontro el Post."
                })
            } else {
                res.status(200).send({
                    cod: 200,
                    message: "El Post ha sido eliminado correctamente."
                })
            }
        }
    })
}
postCtrl.getPost = (req, res) => {
    const {
        urlName
    } = req.params;
    Post.findOne({
        url: urlName
    }, (err, postStored) => {
        if (err) {
            res.status(500).send({
                code: 500,
                message: "Error del servidor."
            });
        } else {
            if (!postStored) {
                res.status(404).send({
                    code: 404,
                    message: "No se ha encontrado post."
                })
            } else {
                res.status(200).send({
                    code: 200,
                    post: postStored
                })
            }
        }
    })
}

module.exports = postCtrl;
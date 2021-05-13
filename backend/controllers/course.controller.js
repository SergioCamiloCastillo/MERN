const Course = require("../models/Course");
const courseCtrl = {};
courseCtrl.addCourse = (req, res) => {
    const body = req.body;
    const course = new Course(body);
    course.order = 1000;
    course.save((err, courseStored) => {
        if (err) {
            res.status(400).send({
                code: 400,
                message: "El curso que estas creando ya existe."
            })
        } else {
            if (!courseStored) {
                res.status(400).send({
                    code: 400,
                    message: "No se ha podido crear el curso."
                })
            } else {
                res.status(200).send({
                    code: 200,
                    message: "Curso creado correctamente."
                })
            }
        }
    });

}
courseCtrl.getCourses = (req, res) => {
    Course.find().sort({
        order: "asc"
    }).exec((err, coursesStored) => {
        if (err) {
            res.status(500).send({
                code: 500,
                message: "Error del servidor."
            })
        } else {
            if (!coursesStored) {
                res.status(404).send({
                    code: 404,
                    message: "No se ha encontrado ningun curso."
                })
            } else {
                res.status(200).send({
                    code: 200,
                    courses: coursesStored
                })
            }
        }
    })
}
courseCtrl.deleteCourse = (req, res) => {
    const {
        id
    } = req.params;
    Course.findByIdAndRemove(id, (err, courseDeleted) => {
        if (err) {
            res.status(500).send({
                code: 500,
                message: "Error de servidor."
            })
        } else {
            if(!courseDeleted){
                res.status(404).send({
                    code:404,
                    message:"No se ha encontrado el curso."
                });
            }else{
                res.status(200).send({
                    code:200,
                    message:"El curso ha sido eliminado correctamente."
                })
            }
        }
    });

}
courseCtrl.updateCourse = (req, res) => {
    let courseData = req.body;
    const id = req.params.id;
    Course.findByIdAndUpdate(id, courseData, (err,courseUpdate)=>{
        if(err){
            res.status(500).send({
                code:500, message:"Error del servidor."
            });
        }else{
            if(!courseUpdate){
                res.status(404).send({
                    code:404, message:"No se ha encontrado ningun curso."
                })
            }else{
                res.status(200).send({
                    code:200,
                    message:"Curso actualizado correctamente."
                })
            }
        }
    });
}
module.exports = courseCtrl;
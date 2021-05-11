const Newsletter = require("../models/Newsletter");
const newsletterCtrl = {};

newsletterCtrl.suscribeEmail = (req, res) => {
    const email = req.params.email;
    const newsletter = new Newsletter();
    if (!email) {
        res.status(404).send({
            message: "El email es obligatorio.",
            code: 404
        });
    } else {
        newsletter.email = email.toLowerCase();
        newsletter.save((err, newsletterStore) => {
            if (err) {
                res.status(500).send({
                    code: 500,
                    message: "El email ya existe."
                })
            }else{
                if(!newsletterStore){
                    res.status(400).send({
                        message:"Error al registrar en la newsletter.",
                        code:400
                    })
                }else{
                    res.status(200).send({
                        code:200,
                        message:"Email registrado correctamente."
                    })
                }
            }
        });

    }
}
module.exports = newsletterCtrl;
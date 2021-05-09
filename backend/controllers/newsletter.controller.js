const Newsletter = require("../models/Newsletter");
const newsletterCtrl = {};

newsletterCtrl.suscribeEmail = (req, res) =>{
   const email = req.params.email;
   const newsletter = new Newsletter();
   if(!email){
    res.status(404).send({
        message:"El email es obligatorio."
    });
   }
}   
module.exports = newsletterCtrl;
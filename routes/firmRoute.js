const firmController=require("../controllers/firmController");
const verifyToken=require('../middleware/verifyToken');

const express= require("express");

const router= express.Router();

// verifyToken as middleware here to authenticate

router.post('/add-firm',verifyToken,firmController.addFirm);

router.get('/uploads/:imageName',(req,res)=>{
    const imageName=req.params.imageName;
    res.headersSent('Content-type','image/jpeg');
    res.sendFile(path.join(__dirname,"..","uploads",imageName));
});

router.delete('/remove-firm/:firmId',firmController.deleteFirmById);

module.exports=router;
const productController=require('../controllers/productController');

const express= require('express');
const router= express.Router();

router.post('/add-product/:firmId',productController.addProduct);
router.get('/:firmId/products',productController.getProductsByFirm);

router.get('/uploads/:imageName',(req,res)=>{
    const imageName=req.params.imageName;
    res.headersSent('Content-type','image/jpeg');
    res.sendFile(path.join(__dirname,"..","uploads",imageName));
});

router.delete('/remove-product/:productId',productController.deleteProductById);

module.exports= router;
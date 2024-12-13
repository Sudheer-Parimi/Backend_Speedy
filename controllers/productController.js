const Product=require('../models/Product');
const Firm=require('../models/Firm');
const multer= require('multer');
const path=require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });

const upload=multer({storage:storage});

const addProduct= async(req,res)=>{
    try {
        const {productName,price,category,bestseller,description}=req.body;
        const image=req.file? req.file.filename: undefined;

        const firmId=req.params.firmId;
        const firm= await Firm.findById(firmId);

        if(!firm){
            return res.status(400).json({error:"No firm found"});
        }
        const product = new Product({
            productName,
            price,
            category,
            bestseller,
            description,
            image,
            firm:firm._id
        });

        const savedProduct=await product.save();

        firm.product.push(savedProduct);

        await firm.save();
        
        console.log("New product added");
        res.status(200).json({message:"Product added successfully"});

    } catch (error) {
        console.log(error);
        res.status(500).json("Internal server error");
    }
}

const getProductsByFirm= async(req,res)=>{
    try {
        const firmId= req.params.firmId;
        const firm= await Firm.findById(firmId);

        if(!firm){
            return res.status(400).json({error:"No firm found"});
        }
        const restaurant= firm.firmName;
        const products= await Product.find({firm:firmId});

        res.status(200).json({restaurant,products});

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }
}

const deleteProductById= async(req,res)=>{
    try {
        const productId= req.params.productId;
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if(!deletedProduct){
            return res.status(404).json({error:"Product not found"});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json("Internal server error");
    }
}

module.exports={addProduct:[upload.single('image'),addProduct],getProductsByFirm,deleteProductById};
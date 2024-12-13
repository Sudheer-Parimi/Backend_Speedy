
const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where the uploaded images will be stored
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
    }
});

const upload = multer({ storage: storage });

const addFirm = async(req, res) => {
    try {
        const { firmName, area, category, dishType, offer } = req.body;

        const image = req.file ? req.file.filename : undefined;

        const vendor = await Vendor.findById(req.vendorId);
        if (!vendor) {
            res.status(404).json({ message: "Vendor not found" })
        }

        if (vendor.firm.length > 0) {
            return res.status(400).json({ message: "Vendor can have only one firm" });
        }

        const firm = new Firm({
            firmName,
            area,
            category,
            dishType,
            offer,
            image,
            vendor: vendor._id
        })

        const savedFirm = await firm.save();

        const firmId = savedFirm._id
        const vendorFirmName = savedFirm.firmName

        vendor.firm.push(savedFirm)

        await vendor.save()



        return res.status(200).json({ message: 'Firm Added successfully ', firmId, vendorFirmName });


    } catch (error) {
        console.error(error)
        res.status(500).json("internal server error")
    }
}

const deleteFirmById = async(req, res) => {
    try {
        const firmId = req.params.firmId;

        const deletedProduct = await Firm.findByIdAndDelete(firmId);

        if (!deletedProduct) {
            return res.status(404).json({ error: "No product found" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = { addFirm: [upload.single('image'), addFirm], deleteFirmById }

/* const multer = require("multer");
const Firm=require("../models/Firm");
const Vendor= require("../models/Vendor");
const path= require('path');

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

const addFirm= async(req,res)=>{
    try{
        const{firmName,area,category,dishType,offer}=req.body;

        const image=req.file? req.file.filename: undefined;

        const vendor=await Vendor.findById(req.vendorId);

        if(!vendor){
            return res.status(400).json({message:"Vendor is not available"})
        }
        const firm= new Firm({
            firmName,
            area,
            category,
            dishType,
            offer,
            image,
            vendor:vendor._id
        });
        const savedFirm=await firm.save();

        vendor.firm.push(savedFirm);

        await vendor.save();

        res.status(200).json({message:"Firm added successfully"});
    }
    catch(error){
        console.log(error);
        res.status(500).json("Internal server error");
    }
}
const deleteFirmById= async(req,res)=>{
  try {
      const firmId= req.params.firmId;
      const deletedFirm = await Firm.findByIdAndDelete(firmId);

      if(!deletedFirm){
          return res.status(404).json({error:"Firm not found"});
      }

  } catch (error) {
      console.log(error);
      res.status(500).json("Internal server error");
  }
}

module.exports= {addFirm:[upload.single('image')],
    addFirm,
    deleteFirmById}; */
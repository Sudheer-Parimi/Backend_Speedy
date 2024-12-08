const multer = require("multer");
const Firm=require("../models/Firm");
const Vendor= require("../models/Vendor");

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
      const FirmId= req.params.productId;
      const deletedFirm = await Firm.findByIdAndDelete(productId);

      if(!deletedFirm){
          return res.status(404).json({error:"Firm not found"});
      }

  } catch (error) {
      console.log(error);
      res.status(500).json("Internal server error");
  }
}

module.exports= {addFirm:[upload.single('image')],addFirm,deleteFirmById};
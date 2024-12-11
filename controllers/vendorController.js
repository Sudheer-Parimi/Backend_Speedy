const Vendor= require("../models/Vendor");
const Firm=require("../models/Firm");
const jwt= require("jsonwebtoken");
const bcrypt= require("bcryptjs");
const dotEnv= require("dotenv");
const path= require('path');

dotEnv.config();



const vendorRegister= async(req,res)=>{

    const {username,email,password} =req.body;
    try{
        const vendorEmail= await Vendor.findOne({email});

        if(vendorEmail){
            console.log("email alredy in use");
            return res.status(400).json("Provided mail is already in use");
        }
        const hashedPassword= await bcrypt.hash(password,10);

        const newVendor= new Vendor({
            username,
            email,
            password:hashedPassword
        });

        await newVendor.save();

        res.status(201).json({message:"Vendor registered successfully"});
        console.log("Registered a new vendor");

    }
    catch(error){
        console.log(error);
        res.status(201).json({error:"Internal server error"});
    }

}

const vendorLogin= async(req,res)=>{

    const secretkey=process.env.SECRET_KEY;
    const {email,password}= req.body;

    try{

    const vendor=await  Vendor.findOne({email});

    if(!vendor){
        console.log("mail is not in records");
        return res.status(401).json({message:"No record of vendor registered"});
    }

    const isPassword=await bcrypt.compare(password,vendor.password);
    if(!isPassword){
        console.log("wrong password");
        return res.status(401).json({message:"Invalid password for username"});
    
    }
    const token=jwt.sign({vendorId:vendor._id},secretkey,{expiresIn:"1h"});
    res.status(201).json({message:"vendor login successful",token});
    console.log("vendor loggedin:  ", "token generated:",token);

    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }
}
const getAllVendors= async(req,res)=>{
    try{
        const vendors= await Vendor.find().populate('firm');
        res.json({vendors});
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }
}
const getVendorById= async(req,res)=>{
    const vendorId= await req.params.id;
    try{
        const vendor= await Vendor.findById(vendorId);
        if(!vendor){
            return res.status(404).json({message:"Vendor not found"});
        }
        res.status(200).json({vendor});
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }
}

module.exports={vendorRegister,vendorLogin,getAllVendors,getVendorById}


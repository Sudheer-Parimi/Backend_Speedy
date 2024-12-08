const vendorController= require("../controllers/vendorController");

const express= require("express");

const router= express.Router();

router.post('/register',vendorController.vendorRegister);
router.post('/login',vendorController.vendorLogin);
router.get('/all-vendors',vendorController.getAllVendors);

// id is arbitrary, any word can be used, But here we are pasiing id ,so it's better to use that
// Also here we are passing id dynamically and it will be accessed at req.params.id
router.get('/single-vendor/:id',vendorController.getVendorById);

module.exports= router;
const mongoose=require("mongoose");

const firmSchema= mongoose.Schema({
    firmName:{
        type:String,
        required:true,
        unique:true
    },
    area:{
        type:String,
        required:true
    },
    category:{
        type:[
            {
                type:String,
                enum:['veg','non-veg']
            }
        ]
    },
    dishType:{
        type:[
            {
                type:String,
                enum:['south-indian','north-indian','chineese','desserts']
            }
        ]
    },
    offer:{
        type:String
    },
    image:{
        type:String
    },
    vendor:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Vendor"
        }
    ],
    product:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
        }
    ]
});

const Firm= mongoose.model('Firm',firmSchema);

module.exports=Firm;
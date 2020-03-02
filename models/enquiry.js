let mongoose=require("mongoose");
let Schema=mongoose.Schema;
let enquirySchema=new Schema(
    {
        name:{
            type:String,
        },
        email:{
            type: String, 
        },
        message:{
            type:String
        }
    }
)
module.exports=mongoose.model("enquiry",enquirySchema);
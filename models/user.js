let mongoose=require("mongoose");
let Schema=mongoose.Schema;
let userSchema=new Schema(
    {
        email:{
            type: String, 
        },
        password:{
            type:String
        }
    }
)
module.exports=mongoose.model("user",userSchema);
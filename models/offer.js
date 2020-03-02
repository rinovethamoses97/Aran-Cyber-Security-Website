let mongoose=require("mongoose");
let Schema=mongoose.Schema;
let offerSchema=new Schema(
    {
        status:{
            type:Boolean,
        },
        header:{
            type: String, 
        },
        content:{
            type:String
        }
    }
)
module.exports=mongoose.model("offer",offerSchema);
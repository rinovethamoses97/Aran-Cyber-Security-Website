let express=require("express");
let nodemailer=require("nodemailer");
let cors=require("cors");
let app=express();
let bodyparser=require("body-parser");
app.use(express.static("./public"));
app.use(bodyparser());
app.use(cors());
let mongoose=require("mongoose");
let User=require("./models/user");
mongoose.connect('mongodb://rino:rino1234@ds263848.mlab.com:63848/alancybersecurity')
mongoose.connection.on('connected',function(){
    console.log("Mongo Db connected");
});
mongoose.connection.on('error',function(err){
    if(err){
        console.log(''+err);
    }
});
app.get("/",(req,res)=>{
    console.log("Deafault path");
    res.sendFile("index.html");
})
app.post("/submit",(req,res)=>{
    let user=new User({
        name:req.body.name,
        email:req.body.email,
        message:req.body.message
    });
    user.save(function(err,user){
        if(err){
            console.log("Error");
            res.send("error");
        }
        else{
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'arancybersec@gmail.com',
                  pass: '123rz123'
                }
            });
              
            var mailOptions = {
                from: 'rushitgnanaroy@gmail.com',
                to: 'rushitgnanaroy@gmail.com',
                subject: 'Client Enquiry Alert',
                html: '<h1>Name '+req.body.name+'</h1><h1> Email '+req.body.email+'</h1><h1> Message '+req.body.message+'</h1>'
            };
            
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                    res.send("success");
                } else {
                    console.log('Email sent: ' + info.response);
                    res.send("success"); 
                }
            });
        }
    }) 
})
app.listen(process.env.PORT||3000,()=>{
    console.log("Server Running");
})
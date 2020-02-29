let express=require("express");
let nodemailer=require("nodemailer");
let app=express();
let bodyparser=require("body-parser");
app.use(express.static("./public"));
app.use(bodyparser());
app.get("/",(req,res)=>{
    res.sendFile("index.html");
})
app.post("/submit",(req,res)=>{
    console.log(req.body.name);
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
    } else {
        console.log('Email sent: ' + info.response);
        res.send("success"); 
    }
    });
})
app.listen(process.env.port||3000,()=>{
    console.log("Server Running");
})
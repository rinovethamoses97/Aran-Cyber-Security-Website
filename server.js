let express=require("express");
let nodemailer=require("nodemailer");
let cors=require("cors");
let app=express();
let bodyparser=require("body-parser");
let cookieParser=require("cookie-parser");
let session=require("express-session");
let bcrypt=require("bcrypt");
app.use(express.static("./public"));
app.use(bodyparser());
app.use(cors());
app.use(cookieParser());
app.use(session({secret:"user"}));
app.enable('trust proxy');
app.use(function(req, res, next){
    console.log("Check"+req.header('x-forwarded-proto'));
    if(req.header('x-forwarded-proto') == 'http'){
            res.redirect('https://' + req.header('host') + req.url);
    }else{
        next();
    }
  })
let mongoose=require("mongoose");
let Enquiry=require("./models/enquiry");
let User=require("./models/user");
mongoose.connect('mongodb://rino:rino1234@ds263848.mlab.com:63848/alancybersecurity')
let Offer=require("./models/offer");
mongoose.connection.on('connected',function(){
    console.log("Mongo Db connected");
});
mongoose.connection.on('error',function(err){
    if(err){
        console.log(''+err);
    }
});
let loggedInUsers=[];
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/home.html");
})
app.get("/login",(req,res)=>{
    res.sendFile(__dirname+"/public/login.html");
})
app.post("/submit",(req,res)=>{
    let enquiry=new Enquiry({
        name:req.body.name,
        email:req.body.email,
        message:req.body.message
    });
    
    enquiry.save(function(err,enquiry){
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
                from: 'clientEnquiryNoReply',
                to: 'info@arancybersecurity.com',
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
});
app.post("/getOffer",(req,res)=>{
    Offer.find(function(err,offer){
        if(err){
            res.send("error");
        }
        else{
            res.send(offer);
        }
    });
});
app.get("/dashboard",(req,res)=>{
    console.log(req.session.user);
    if(req.session.user){
        res.sendFile(__dirname+"/public/dashboard.html");
    }
    else{
        res.redirect("/login");
    }
});
app.post("/getEnquiryData",(req,res)=>{
    console.log(req.body);
    console.log(loggedInUsers);
    Enquiry.find(function(err,enquires){
        console.log(enquires);
        if(err){
            res.send("error");    
        }
        else{
            res.send({data:enquires});
        }
    });
});
app.post("/loginFormSubmit",(req,res)=>{
    User.find({email:req.body.email},function(err,user){
        console.log(user);
        if(err){
            res.send("error");
        }
        else{
            if(user.length==1){
                bcrypt.compare(req.body.password,user[0].password,function(err,result){
                    if(result){
                        req.session.user=req.body.email;
                        res.send({status:"success",login:true});
                    }
                    else{
                        res.send({status:"success",login:false});
                    }
                });
            }
            else{
                res.send({status:"success",login:false});
            }
        }
    })
});
app.post("/logout",(req,res)=>{
    delete req.session.user;
    res.send("success");
    
});
app.get("*",(req,res)=>{
    res.redirect("/");
})
app.listen(process.env.PORT||3000,()=>{
    console.log("Server Running");
})

const express=require('express');
const app=express();
const passport=require('passport');
const bodyParser=require('body-parser');
const session=require('./session');
const ioServer=require('./socket')(app)
const helmet=require('helmet');
const normalRoutes=require('./routes/normalRoutes');
const setuppassport=require('./passport/setuppassport');
const cookieParser=require('cookie-parser');
const rateLimit = require("express-rate-limit");
const fileUpload =require('express-fileupload');
const compression=require('compression');
const favicon=require('serve-favicon');
const path=require('path')
setuppassport();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200 // limit each IP to 100 requests per windowMs
  });
app.use(compression())

app.use(helmet({
    hidePoweredBy:true,
}));
app.use(express.static("public"));

let port=process.env.PORT || 3000
app.use(favicon(path.join(__dirname, 'public', 'chatlogo.png')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload());
app.use('/',limiter)
app.use(normalRoutes);
ioServer.listen(port,function(){
    console.log('App is runing on port '+port)
});
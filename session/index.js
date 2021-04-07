const session=require('express-session');
const MongoStore=require('connect-mongo')(session);
const mongoose=require('mongoose')

var init=function(){
    mongoose.Promise=global.Promise;

    var addr='mongodb://127.0.0.1/test';
    var promise=mongoose.connect(addr);
    
if(process.env.NODE_ENV==="production"){
    return session ({
        resave: true,
        saveUninitialized: false,
        secret: '!@#$%^&*()%%^$&()_T%^F:"FRNC@%$*(_)+',
        proxy: false,
        name: "abxidentity",
        cookie: {
        httpsOnly: true,
        secure: true,
        
    },
    store: new MongoStore({
        url:addr,
        autoReconnect: true,
            })
        })    
}
else
{

    return session ({
        resave: true,
        saveUninitialized: true,
        secret: '!@#$%^&*()%%^$&()_T%^F:"FRNC@%$*(_)+',
        proxy: false,
        name: "sessionId",
        cookie: {
        httpOnly: true,
        secure: false,
        
    },
    store: new MongoStore({
        url:addr,
        autoReconnect: true,
            })
        })
        }
    }
module.exports=init();
const express = require("express");
const mongoose = require("mongoose");
const randomstring = require('randomstring');
const path = require("path");
const cors = require('cors');
const url = require("./url.js");

const app = express();

app.use(cors());


// use the desired mongoDb connection string
mongoose.connect("*************").then(()=>{
    console.log('Mongo connected');
})

app.use('/static', express.static(path.join(__dirname, 'static')));

app.use(express.text());
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/',(req,res)=>{
    res.render('index.ejs');
})

app.post('/send',(req,res)=>{   
    let object = req.body;
    console.log(object);
    const randomStr = randomstring.generate(6);
    object.shorten = randomStr;
    url.create(object);
    res.send(object);
})

app.get('/:url',async(req,res)=>{
    let v = req.params.url;
    let u;
    try{
        u= await url.findOne({shorten: v});
        console.log(u.url);
    }catch(err){
        console.log(v);
        console.log(err);
    }  
    
    if(u == null){
        res.send("ERROR: Url not found");
    }
    else{
        res.redirect(u.url);
    }   
})


app.listen(3000,()=>{
    console.log('Server started');
})
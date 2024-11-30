const express = require("express");
const mongoose = require("mongoose");
const randomstring = require('randomstring');
const path = require("path");
const cors = require('cors');
const url = require("./url.js");

const app = express();

app.use(cors());


// use the desired mongoDb connection string
mongoose.connect('mongodb://127.0.0.1:27017/bitlink')
    .then(() => console.log('Mongo connected'))
    .catch(err => console.error('Mongo connection error:', err));

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

app.get('/:url', async (req, res) => {
    let v = req.params.url;
    try {
        const u = await url.findOne({ shorten: v });

        if (!u) {
            // If no matching document is found
            console.error(`No URL found for: ${v}`);
            return res.status(404).send("ERROR: URL not found");
        }

        // Redirect to the original URL
        console.log(`Redirecting to: ${u.url}`);
        res.redirect(u.url);
    } catch (err) {
        console.error(`Error finding URL for: ${v}`, err);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(3000,()=>{
    console.log('Server started');
})
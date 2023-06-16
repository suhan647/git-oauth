var express = require("express");
var cors = require('cors');
const fetch = (...args) => 
    import ('node-fetch').then(({default: fetch}) => fetch(...args))
var bodyParser = require('body-parser')    

const CLIENT_ID = "7348a638d2421d929082";
const CLIENT_SECRET = "fe92d45954784e794f4d128f5feb0dc7139a6305";


var app = express()

app.use(cors())
app.use(bodyParser.json());

app.get('/getAccessToken', async function (req, res) {

    console.log(req.query.code);

    const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + req.query.code

    await fetch("https://github.com/login/oauth/access_token" + params, {
        method : {
            "Accept" : "application/json"
        }
    }).then((response) => {
         return response.json();
    }).then((data) => {
        console.log(data);
        res.json(data);
    })
});

app.get('/getUserData', async function (req, res) {
    req.get("Authorization");
    await fetch("https://api.github.com/user", {
        method :"GET",
        headers: {
            "Authorization" : req.get("Authorization")
        }
    }).then((response) => {
        return response.json();
   }).then((data) => {
       console.log(data);
       res.json(data);
   })
})

app.listen(4000, function (){
    console.log("cors server running on port 4000");
})
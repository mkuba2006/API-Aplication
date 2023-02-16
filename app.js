const express = require('express');
const BodyParser = require('body-parser');
const request = require('request');
const app = express();


app.use(express.static('public'));
app.use(BodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/signup.html')
})

app.post("/", function(req, res){
 const firstName = req.body.FName;
 const lastName = req.body.LName;
 const email = req.body.Email;
 console.log(firstName, lastName, email);
})

app.listen(3000, function(){
    console.log('Started 3000');
})
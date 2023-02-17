const express = require('express');
const BodyParser = require('body-parser');
const request = require('request');
const app = express();
const https = require('https');
const { response } = require('express');
const { parse } = require('path');

app.use(express.static('public'));
app.use(BodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/signup.html')
})

app.post("/", function(req, res){
 const firstName = req.body.fName;
 const lastName = req.body.lName;
 const email = req.body.Email;
 const data = {
    members: [
    {
        email_adress: email,
        status: "subscribed",
        merge_fields: {
        FNAME: firstName,
        LNAME: lastName
        }
    }
    ]
};
 const jsonData= JSON.stringify(data);
 const url = 'https://us21.api.mailchimp.com/3.0/lists/f872f228b5';
 const options = {
     method: 'POST',
     auth: 'mkuba2006:85df511036059b0e219b734e18b86511-us21',
 };
 const request = https.request(url, options, function(resp){
    if(resp.statusCode === 200){
        res.sendFile(__dirname + '/success.html')
    }else{
        res.sendFile(__dirname + '/fail.html')
    }
    resp.on('data', function(data){
        console.log(JSON.parse(data));
    })
 })
 
 request.write(jsonData);
 request.end();
 console.log(firstName, lastName, email);
})

app.post('/fail', function(req, res){
 res.redirect('/');
})

app.listen(3000, function(){
    console.log('Started 3000');
}) 


//85df511036059b0e219b734e18b86511-us21
//audience f872f228b5
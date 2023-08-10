const express = require("express");
const https = require('node:https');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){

    const query = req.body.cityName;
    const apikey="085f511a7f0a4d75e732b2e67236fe38";
    const unit="metric";
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;
    
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp=weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<p>weather desc is :"+weatherDesc+"</p>");
            res.write("<h1>temp is : "+temp+"</h1>");

            res.write("<img src="+imgUrl+">");
        res.send();
        }); 
    });
});



app.listen(process.env.PORT || 3000,function(){
    console.log("server is running on port 3000");
});
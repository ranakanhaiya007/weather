const express = require("express");
const https = require("https");

const bodyParser =require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/" ,function(req,res){
    res.sendFile(__dirname + "/index.html");

    app.post("/",function(req,res){ 

        const query = req.body.cityName;
        const apiKey = "3e49fbd6311b2382e33fb139f9b78cf8#";
        const Unit ="metric";

        const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+apiKey +"&units="+Unit;

        https.get(url,function(response){
            console.log(response.statusCode);

            response.on("data",function(data){
                const weatherData= JSON.parse(data);
                console.log(weatherData);
                const temp = weatherData.main.temp
                const weatherDiscription = weatherData.weather[0].description
                const icon = weatherData.weather[0].icon
                const imageURL ="http://openweathermap.org/img/wn/"+icon+"@2x.png";
                res.setHeader("Content-Type", "text/html");
                res.write("<p>The weather is currntly " + weatherDiscription + "</p>");
                res.write("<h1> the temp is " + temp + "</h1>");
                res.write("<img src="+imageURL+">");
                res.send();
            });
        });
    });
});

app.listen(3000,function(){
    console.log("server is running on port 3000 ");
});
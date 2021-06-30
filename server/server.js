/* base server for the application */
const express = require('express');
const request = require('request');
const morgan = require('morgan');
const bodyparser = require('body-parser');


const {createProxyMiddleware} = require("http-proxy-middleware");

require('dotenv').config();


const app = express();




// Authorization
// app.use('', (req, res, next) => {
//     if (req.headers.authorization) {
//         next();
//     } else {
//         res.sendStatus(403);
//     }
// });
app.use(bodyparser.json());
app.use(morgan("dev"));
app.use((request,response,next) => {
    console.log(`Received request for ${request.url} with/without body`);
    console.log(request.body);
    next();
});

// Proxy endpoints
// app.use('/weather', createProxyMiddleware({
//     target: process.env.WEATHER_URL,
//     changeOrigin: true,
//     pathRewrite: {
//         [`^/weather`]: '',
//     },
// }));

/* setup the public files to be available (e.g. content, css, client side js files) */
app.use(express.static("public"));


/* server rules */
// app.post("/weather",(req,res) => {
//    console.log(req.url);

//    console.log(req.body);
// });


app.post("/current",(req,res) => {
    console.log("url: " + req.url);
    console.log("body: " + req.body);
    let newURL = process.env.CURRENT_WEATHER_URL + "?q=" + req.body.parameters.q + "&appid=" + process.env.API_KEY + "&units=metric";
    console.log("new URL is: " + newURL);
    request(newURL, function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body);
        res.json(body);
    });
});

app.post("/forecast",(req,res) => {
    console.log("url: " + req.url);
    console.log("body: " + req.body);
    let newURL = process.env.FORECAST_URL + "?lat=" + req.body.parameters.lat + "&lon=" + req.body.parameters.lon + "&appid=" + process.env.API_KEY + "&units=metric&exclude='current,minutely,hourly,alerts'";
    console.log("new URL is: " + newURL);
    request(newURL, function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body);
        res.json(body);
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

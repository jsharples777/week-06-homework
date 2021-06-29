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

// Proxy endpoints
app.use('/weather', createProxyMiddleware({
    target: process.env.WEATHER_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/weather`]: '',
    },
}));

/* setup the public files to be available (e.g. content, css, client side js files) */
app.use(express.static("public"));


/* server rules */
// app.post("/weather",(req,res) => {
//    console.log(req.url);
//    console.log(req.body);
// });

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

const express = require('express');
const router = require('./src/Routes/userRoutes');
const logger = require('./src/Middleware/Logger');
const rateLimiter = require("./src/Middleware/RateLimiter");
const {errorHandler, notFoundHandler} = require("./src/Middleware/errorHandling");
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000;


const app = express();


//Middleware
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);
app.use('/', router);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(port,() => {
    console.log(`Server started running on http://localhost:${port}`);
})

module.exports = app;
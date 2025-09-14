const express = require('express');
const app = express();

const bodyparser = require('body-parser');
const mongodb = require('./database/connect.js');
const contactRoute = require('./routes/contactRoute.js');
const port = process.env.PORT || 8080;


app.use(bodyparser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    });
;


// ROUTES
app.use('/contacts', contactRoute);


mongodb.initializeDB((error, mongodb) => {
    if (error) {
        console.log(error);

    } else {
        app.listen(port, () => {
            console.log("Server listening on localhost:" + port);
        })
    }
});




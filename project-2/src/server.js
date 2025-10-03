const express = require("express");
const app = express();

const bodyparser = require("body-parser");
const cors = require("cors");
const mongodb = require("./database/connect.js");
const moviesRoute = require("./routes/moviesRoute.js");
const port = process.env.PORT || 8080;

app
    .use(bodyparser.json())
    .use(cors({
        origin: "http://localhost:8080",
        // origin: "https://cse341-node-9dp6.onrender.com",
    })
);


// ROUTES
app.get("/", (req, res) => {
    res.send("Homepage");
});

// Movies route
app.use("/", moviesRoute);

// Swagger route
app.use("/", require("./routes/swaggerRoute.js"));

// Mongodb connection 
mongodb.initializeDB((error, mongodb) => {
    if (error) {
        console.log(error);
    } else {
        app.listen(port, () => {
            console.log("Server listening on localhost:" + port);
        });
    }
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.statusCode || 500).json({
        message: err.message || "An unexpected error occurred.",
    });
});

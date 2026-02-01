const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 8080;

const bodyparser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const mongodb = require("./database/connect.js");

const moviesRoute = require("./routes/moviesRoute.js");
const loginRoute = require("./routes/loginRoute.js");
const dashboardRoute = require("./routes/dashboardRoute.js");
const utilities = require("./utils/helper.js");

const passport = require("passport");
const session = require("express-session");
let MongoStore = require("connect-mongo");
MongoStore = MongoStore && MongoStore.default ? MongoStore.default : MongoStore;
const { ensureGuest } = require("./middleware/auth.js");

// MIDDLEWARE
app.use(bodyparser.json()).use(
    cors({
        origin: "https://cse341-service2.onrender.com",
        origin: "http://localhost:8080",
    }),
);

require("./config/passport.js")(passport);

// Session
app.use(
    session({
        secret: "Keyboard cat",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    }),
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// ROUTES
app.get("/", ensureGuest, (req, res) => {
    res.sendFile(path.join(__dirname, "./utils/index.html"));
});

// Login route
app.use("/auth", utilities.handleErrors(loginRoute));

// Dashboard route
app.use("/dashboard", utilities.handleErrors(dashboardRoute));

// Movies route
app.use("/movies", utilities.handleErrors(moviesRoute));

// Swagger route
app.use("/", require("./routes/swaggerRoute.js"));

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.statusCode || 500).json({
        message: err.message || "An unexpected error occurred.",
    });
});

// MONGODB CONNECTION
mongodb.initializeDB(async (error, mongodb) => {
    if (error) {
        console.log(error);
    } else {
        try {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log("Mongoose connected");

            app.listen(port, () => {
                console.log("Server listening on localhost:" + port);
            });
        } catch (err) {
            console.log("Mongoose connection error:", err);
        }
    }
});

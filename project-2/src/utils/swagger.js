const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Movies Api",
        description: "Api serving a list of movies and cinemas location",
    },
    host: "https://cse341-service-05oh.onrender.com",
    // host: "localhost:8080",
    schemes: ["http", "https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = [
    "../routes/moviesRoute.js",
    "../routes/swaggerRoute.js",
];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require("../server.js"); // This runs after the swagger file is generated.
});

const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Movies Api",
        description: "Api serving a list of movies and cinemas location",
    },
    host: process.env.NODE_ENV === "production" 
        ? "cse341-service2.onrender.com"
        : "localhost:8080",
    schemes: ["http", "https"],
    basePath: "/",
    
    // definitions: {
    //     Movie: {
    //         type: "object",
    //         properties: {
    //             name: {
    //                 type: "string",
    //                 example: "Inception",
    //             },
    //             description: {
    //                 type: "string",
    //                 example:
    //                     "A thief who steals corporate secrets through the use of dream-sharing technology.",
    //             },
    //             year: {
    //                 type: "integer",
    //                 example: 2010,
    //             },
    //             rating: {
    //                 type: "number",
    //                 format: "float",
    //                 example: 8.8,
    //             },
    //             genre: {
    //                 type: "array",
    //                 items: {
    //                     type: "string",
    //                 },
    //                 example: ["Action", "Sci-Fi"],
    //             },
    //             cast: {
    //                 type: "array",
    //                 items: {
    //                     type: "string",
    //                 },
    //                 example: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
    //             },
    //             directors: {
    //                 type: "array",
    //                 items: {
    //                     type: "string",
    //                 },
    //                 example: ["Christopher Nolan"],
    //             },
    //         },
    //     },
    // },


};

const outputFile = "./swagger.json";
const endpointsFiles = [
    "../routes/moviesRoute.js",
    "../routes/swaggerRoute.js",
];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require("../server.js"); // This runs after the swagger file is generated.
});

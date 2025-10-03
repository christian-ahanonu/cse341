const router = require("express").Router();
const moviesController = require("../controllers/moviesControllers.js");
const Utilities = require("../utils/helper.js");
const { ValidationRules, validate } = require("../utils/movieValidator.js");

// Get all contact route
router.get("/movies", Utilities.handleErrors(moviesController.getAllMovies));

// Get a single contact
router.get(
    "/movies/:id",
    Utilities.handleErrors(moviesController.getMoviesById)
);

// Add a contact
router.post(
    "/movies",
    ValidationRules(),
    validate,
    Utilities.handleErrors(moviesController.createMovie)
);

// Update a contact
router.put(
    "/movies/:id",
    ValidationRules(),
    validate,
    Utilities.handleErrors(moviesController.updateMovie)
);

// Delete a contact
router.delete(
    "/movies/:id",
    Utilities.handleErrors(moviesController.deleteMovie)
);

// Get all cinemas route
router.get("/cinemas", Utilities.handleErrors(moviesController.getAllCinemas));

module.exports = router;

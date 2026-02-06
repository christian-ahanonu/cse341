const router = require("express").Router();
const moviesController = require("../controllers/moviesControllers.js");
const { ValidationRules, validate } = require("../utils/movieValidator.js");

// Get all movies
// #swagger.tags=['Movies']
router.get("/", moviesController.getAllMovies);

// Get a single movie
// #swagger.tags=['Movies']
router.get("/:id", moviesController.getMoviesById);

// Add a movie
// #swagger.tags=['Movies']
/*
 * #swagger.parameters['body'] = {
 *   in: 'body',
 *   description: 'Add new movie',
 *   schema: { $ref: '#/definitions/Movie' }
 * }
 */
router.post("/", ValidationRules(), validate, moviesController.createMovie);

// Update a movie
// #swagger.tags=['Movies']
/*
 * #swagger.parameters['body'] = {
 *   in: 'body',
 *   description: 'Update an existing movie',
 *   schema: { $ref: '#/definitions/Movie' }
 * }
 */
router.put("/:id", ValidationRules(), validate, moviesController.updateMovie);

// Delete a movie
// #swagger.tags=['Movies']
router.delete("/:id", moviesController.deleteMovie);

module.exports = router;

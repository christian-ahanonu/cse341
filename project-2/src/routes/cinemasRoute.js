const router = require("express").Router();
const moviesController = require("../controllers/moviesControllers.js");

// Get all cinemas
// #swagger.tags=['Cinemas']
router.get("/", moviesController.getAllCinemas);

module.exports = router;

const mongodb = require('../database/connect.js');
const objectId = require('mongodb').ObjectId;

const getAllMovies = async (req, res) => {
    try {
        const result = await mongodb
            .getDatabase()
            .db()
            .collection("movies")
            .find()
        ;
        
        const contacts = await result.toArray();

        res.status(200).json({
            message: "Movies retrieved successfully.",
            data: contacts
        });

        // result.toArray().then((contacts) => {
        //     res.setHeader("content-type", "application/json");
        //     res.status(200).json(contacts);
        // });
        
    } catch (error) {
        res.status(500).json({
            message: "An error occured while fetching movies",
            error: error.message
        })
    }
};

const getAllCinemas = async (req, res) => {
    try {
        const result = await mongodb
            .getDatabase()
            .db()
            .collection("cinemas")
            .find()
        ;
        
        const contacts = await result.toArray();

        res.status(200).json({
            message: "cinemas retrieved successfully.",
            data: contacts
        });

        // result.toArray().then((contacts) => {
        //     res.setHeader("content-type", "application/json");
        //     res.status(200).json(contacts);
        // });
        
    } catch (error) {
        res.status(500).json({
            message: "An error occured while fetching cinemas",
            error: error.message
        })
    }
};

const getMoviesById = async (req, res) => {
    try {
        const contactId = new objectId(req.params.id);
    
        const result = await mongodb
            .getDatabase()
            .db()
            .collection("movies")
            .findOne({ _id: contactId });
        ;
        
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(404).json({
                message: "movie not found."
            });
        };

        // result.toArray().then((contacts) => {
        //     res.setHeader("content-type", "application/json");
        //     res.status(200).json(contacts[0]);
        // });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching the movie.",
            error: error.message,
        });
    }
};

const createMovie = async (req, res) => {
    try {
        const contactObject = {
            name: req.body.name,
            description: req.body.description,
            year: req.body.year,
            rating: req.body.rating,
            genre: req.body.genre,
            cast: req.body.cast,
            directors: req.body.directors,
        };

        // console.log(contactObject)
    
        const result = await mongodb
            .getDatabase()
            .db()
            .collection("movies")
            .insertOne(contactObject);
        ;
    
        if (result.acknowledged) {
            res.status(201).json({
                message: "movie created successfully.",
                contactId: result.insertedId,
            });
        } else {
            res.status(500).json({
                message: "An error occurred while creating the movie."
            });
        };
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while creating the movie.",
            error: error.message
        });
    };
};


const updateMovie = async (req, res) => {
    try {
        const contactId = new objectId(req.params.id);

        const contactObject = {
            name: req.body.name,
            description: req.body.description,
            year: req.body.year,
            rating: req.body.rating,
            genre: req.body.genre,
            cast: req.body.cast,
            directors: req.body.directors,
        };

        const result = await mongodb
            .getDatabase()
            .db()
            .collection("movies")
            .replaceOne({ _id: contactId }, contactObject);
        ;
        
        if (result.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({
                message: "No movie found with that ID to update.",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while updating the movie.",
            error: error.message,
        });
    }
}

const deleteMovie = async (req, res) => {
    try {
        const contactId = new objectId(req.params.id);

        const result = await mongodb
            .getDatabase()
            .db()
            .collection("movies")
            .deleteOne({ _id: contactId });
        ;
        
        if (result.deletedCount > 0) {
            res.status(200).json({
                message: "Movie deleted successfully."
            });
        } else {
            res.status(404).json({
                message: "No movie found with that ID to delete.",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while deleting the movie.",
            error: error.message,
        });
    }
}

module.exports = {
    getAllMovies,
    getAllCinemas,
    getMoviesById,
    createMovie,
    updateMovie,
    deleteMovie,
};
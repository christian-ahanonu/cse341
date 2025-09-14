const router = require('express').Router();
const contactController = require('../controllers/contactController.js')

router.get("/", contactController.getAllContacts);

router.get("/:id", contactController.getContactByID);

module.exports = router; 
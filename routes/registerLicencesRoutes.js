const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const registerLicencesController = require('../controller/registerLicencesController');

router.post('/savelicences', authMiddleware, registerLicencesController.save);
module.exports = router;
const express = require("express");
const router = express.Router();

const { authCheck } = require("../middlewares/auth");
const { CreateImages } = require("../controllers/cloudinary");

// ENDPOINT http://localhost:5000/api/images
router.post('/images', authCheck,CreateImages);

module.exports = router;
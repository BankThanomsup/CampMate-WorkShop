const express = require("express");
const router = express.Router();
const { listStats, } = require("../controllers/admin");
const { authCheck } = require("../middlewares/auth");


// ENDPOINT http://localhost:5000/api/Stats
router.get('/Stats', authCheck, listStats);





module.exports = router;
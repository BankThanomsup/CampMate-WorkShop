const express = require("express");
const router = express.Router();
const{ createProfile } =require("../controllers/profile");
const { authCheck } = require("../middlewares/auth");


//ENDOINT http://localhost:5000/api/profile
router.post('/profile',authCheck,createProfile)




module.exports = router;
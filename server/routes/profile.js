const express = require("express");
const router = express.Router();
const{createProfile} =require("../controllers/profile")


//ENDOINT http://localhost:5000/api/profile
router.post('/profile',createProfile)




module.exports = router;
const express = require("express");
const router = express.Router();
// Controller
const {
  listCamping,
  readCamping,
  createCamping,
  updateCamping,
  deleteCamping,
  actionFavorite,
  listFavorites,
  filterCamping
} = require("../controllers/camping");
const { authCheck } = require("../middlewares/auth");

// @ENDPOINT http://localhost:5000/api/camping
// @METHOD GET [get list camping]
// @ACCESS public
router.get("/campings/:id",listCamping);

// @ENDPOINT http://localhost:5000/api/camping/1
// @METHOD GET [get read camping]
// @ACCESS public
router.get("/camping/:id",readCamping);




// @ENDPOINT http://localhost:5000/api/camping
// @METHOD POST [create camping]
// @ACCESS private
router.post("/camping",authCheck,createCamping);

// @ENDPOINT http://localhost:5000/api/camping/1
// @METHOD PUT [edit camping]
// @ACCESS private
router.put("/camping/:id", updateCamping);

// @ENDPOINT http://localhost:5000/api/camping
// @METHOD DELETE [delete camping]
// @ACCESS private
router.delete("/camping/:id", deleteCamping);


router.post("/favorite",authCheck, actionFavorite);
 
  
router.get("/favorites",authCheck, listFavorites);

  
router.get("/filter-camping", filterCamping);

module.exports = router;

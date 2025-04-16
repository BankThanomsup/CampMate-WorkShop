const renderError = require("../utils/renderError");
const{ clerkClient } = require("@clerk/express")
exports.authCheck = (req, res, next) => {
  //code body
  try {
   const userId = req.auth.userId;
   if(!userId){
    return  renderError(401,"Unauthorized");
   }
   next();

  } catch (err) {
    next(err)
  }
};
const renderError = require("../utils/renderError");
const{ clerkClient } = require("@clerk/express")
exports.authCheck =  async (req, res, next) => {
  //code body
  try {
   const userId = req.auth.userId;
  //  console.log("Hello middle ware"); // Debugging
  //  console.log("User ID:", userId); // Debugging
   if(!userId){
    return  renderError(401,"Unauthorized");
   }
   next();
   const user = await clerkClient.users.getUser(userId);
  //  console.log("User:", user); // Debugging
   req.user = user;
  //  console.log(req.user); // Debugging

   // if (!user) {
   //   return renderError(401, "Unauthorized");
   // }
   // req.user = user;
   // next();
  } catch (err) {
    next(err)
  }
};
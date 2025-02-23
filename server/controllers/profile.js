const renderError = require("../utils/renderError");



exports.createProfile = (req, res,next) => {
  try {
    const{firstname,lastname,clerkid} = req.body;
    console.log(firstname,lastname,clerkid);
    console.log("Hello create profile");
    
    res.json({message: "Hello create profile"});
    }
  catch (err) {
    console.log(err.message);
    next(err);
  }
}
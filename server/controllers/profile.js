const renderError = require("../utils/renderError");



exports.createProfile = (req, res,next) => {
  try {
    const{firstname,lastname} = req.body;
    console.log(req.headers.authorization);
    console.log(firstname,lastname);
    console.log("Hello create profile");
    
    res.json({message: "Hello create profile"});
    }
  catch (err) {
    console.log(err.message);
    next(err);
  }
}
exports.authCheck = (req, res, next) => {
  try {
    console.log("Hello auth check");
    if (false) {
      next();
    }else{res.status(401).json({ message: "Unauthorized" });}
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};
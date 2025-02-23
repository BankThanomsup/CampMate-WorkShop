exports.listCamping = (req, res) => {
  try {
    console.log("Hello list camping");
    

    res.send("Hello list camping");
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.readCamping = (req, res) => {
  try {
    console.log("Hello read camping");
    res.send("Hello read camping");
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.createCamping = (req, res) => {
  try {
    console.log("Hello create camping");
    res.send("Hello create camping");
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateCamping = (req, res) => {
  try {
    console.log("Hello update camping");
    res.send("Hello update camping");
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteCamping = (req, res) => {
  try {
    console.log("Hello delete camping");
    res.send("Hello delete camping");
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

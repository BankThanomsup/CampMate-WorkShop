const prisma = require("../config/prisma");


exports.listCamping = async (req, res, next) => {
  try {
    const campings = await prisma.landmark.findMany()
    
  res.json({result: campings, message: "Camping list successfully"});
  } catch (err) {
    next(err)
  }
};

exports.readCamping = async(req, res, next) => {

  try {
    const { id } = req.params;
    const camping = await prisma.landmark.findFirst({
      where:{
        id: Number(id),
      }
    })
    
    res.json({result: camping, message: "Camping read successfully"});
  } catch (err) {
    next(err);
  }
};

exports.createCamping = async (req, res, next) => {
  try {
    console.log("req.body", req.body);
    const{ title, price, description, category,lat,lng,image } = req.body;
    console.log(image)
    const{ id } = req.user;
    const camping = await prisma.landmark.create({
      data:{
        title,
        price,
        description,
        category,
        lat,
        lng,
        public_id: image.public_id,
        secure_url: image.secure_url,
        profileId: id
      },
    });
    res.json({result: camping, message: "Camping created successfully"});
  } 
  catch (err) {
    next(err);
  }
};

exports.updateCamping = async (req, res, next) => {
  try {
    // console.log("Hello update camping");
    res.send("Hello update camping");
  } catch (err) {
    next(err);
  }
};

exports.deleteCamping = async (req, res, next) => {
  try {
    // console.log("Hello delete camping");
    res.send("Hello delete camping");
  } catch (err) {
    next(err);
  }
};

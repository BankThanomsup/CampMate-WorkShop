const prisma = require("../config/prisma");


exports.listCamping = async (req, res, next) => {
  try {
    const { id } = req.params;
      // console.log(id)
    const campings = await prisma.landmark.findMany({
      include:{
        favorites:{
          where:{
            profileId: id
          },
          select:{
            id:true
          }
        }
      }
    })
    //console.log(campings);
    const campingWithlike = campings.map((element)=>{

      return {
        ...element, 
        isFavorite: element.favorites.length > 0 ? true : false,
      }
    })
    // console.log(campingWithlike)
  res.json({result: campingWithlike, message: "Camping list successfully"});
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
    // console.log("req.body", req.body);
    const{ title, price, description, category,lat,lng,image } = req.body;
    // console.log(image)
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
    console.log(err);
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

//Favorite
exports.actionFavorite = async(req,res,next) =>{
  try {
    //code
    const {campingId, isFavorite} = req.body;
    const {id} = req.user;


    let result

    if(isFavorite){
      result = await prisma.favorite.deleteMany({
        where:{
          profileId: id,
          landmarkId: campingId 
        }
      });
    }else{
      result = await prisma.favorite.create({
        data:{
          profileId: id,
          landmarkId: campingId
        }
      });
    }

    res.json({result: result, message: isFavorite ?'Remove favorite'  : 'Add favorite'});
  } catch (error) {
    next(error);
    
  }
}
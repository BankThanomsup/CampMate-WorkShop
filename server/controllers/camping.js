const prisma = require("../config/prisma");
const { findCenter } = require("../utils/findCenter");


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
        isFavorite: element.favorites.length > 0 ,
      }
    });

       //Find Center
      const center = findCenter(campingWithlike);
    // console.log(campingWithlike)
  res.json({result: campingWithlike, center: center});
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
    const{ title, price, description, category, lat, lng, image } = req.body;
    const{ id } = req.user;
    
    // Validate required fields
    if (!title || !price || !description || !category || !lat || !lng) {
      return res.status(400).json({
        success: false,
        message: "กรุณากรอกข้อมูลให้ครบถ้วน"
      });
    }
    
    // Validate image object
    if (!image || !image.public_id || !image.secure_url) {
      return res.status(400).json({
        success: false,
        message: "กรุณาอัพโหลดรูปภาพ"
      });
    }
    
    console.log("Creating camping with image:", image);
    
    const camping = await prisma.landmark.create({
      data:{
        title,
        price: Number(price),
        description,
        category,
        lat: Number(lat),
        lng: Number(lng),
        public_id: image.public_id,
        secure_url: image.secure_url,
        profileId: id
      },
    });
    
    res.json({
      success: true,
      result: camping, 
      message: "Camping created successfully"
    });
  } 
  catch (err) {
    console.error("Error creating camping:", err);
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
exports.listFavorites = async(req,res,next)=>{
  try {
    const{id} = req.user;
    const favorites = await prisma.favorite.findMany({
      where:{
        profileId:id
      },
      include:{ landmark:true }
    });

    const favoriteWithLike = favorites.map((item)=>{
      return {...item,
        landmark:{
          ...item.landmark ,
          isFavorite: true
        }
      };
    })
    // console.log(favoriteWithLike)
    res.json({message:'success', result:favoriteWithLike})
  } catch (error) {
    next(error);
  }
}

exports.filterCamping =async(req,res,next) =>{
  try {
    const {category , search } = req.query
    // console.log(category , search )

    const filter = []
    if(category){
      filter.push({category:category})
    }
    if(search) {
      filter.push({ title: {contains : search}});
    }
    
    // OR:[ 
    //  {key:value},
    //  {key:value},
    // ]
    const result = await prisma .landmark.findMany({
      where:{
        OR: filter
      },
      include:{
        favorites: {
          select:{
            id: true,
          },
        },
      },
    });

    const campingWithlike = result.map((item)=>{

      return {
        ...item, 
        isFavorite: item.favorites.length > 0 ,
      }});

      //Find Center
      const center = findCenter(campingWithlike);

    // console.log(campingWithlike)

    res.json({result: campingWithlike, center: center })
  } catch (error) {
    next(error)
  }
}
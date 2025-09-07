const prisma = require("../config/prisma");
const { findCenter } = require("../utils/findCenter");


exports.listCamping = async (req, res, next) => {
  try {
    // ลบ const { id } = req.params; ออก
    // ใช้ user id จาก token แทน
    const userId = req.user?.id;
    
    const campings = await prisma.landmark.findMany({
      include:{
        favorites:{
          where:{
            profileId: userId || null // ถ้าไม่มี user id ให้เป็น null
          },
          select:{
            id:true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    const campingWithlike = campings.map((element)=>{
      return {
        ...element, 
        isFavorite: element.favorites.length > 0 ,
      }
    });

    // Find Center
    const center = findCenter(campingWithlike);
    
    res.json({
      success: true,
      result: campingWithlike, 
      center: center,
      message: "Campings retrieved successfully"
    });
  } catch (err) {
    console.error("Error listing campings:", err);
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

// ดึงข้อมูล bookings ของ camping site ที่ระบุ (ทุกคน)
exports.getCampingBookings = async(req, res, next) => {
  try {
    const { id } = req.params;
    
    const bookings = await prisma.booking.findMany({
      where:{
        landmarkId: Number(id),
        // ไม่มี field status ใน schema ดังนั้นดึงทุก booking ที่มี paymentStatus = true
        paymentStatus: true
      },
      select: {
        id: true,
        checkIn: true,
        checkOut: true,
        paymentStatus: true,
        landmarkId: true
      }
    });
    
    res.json(bookings);
  } catch (err) {
    console.error("Error fetching camping bookings:", err);
    next(err);
  }
};

// ดึงข้อมูล bookings ของ user ปัจจุบันสำหรับ camping site ที่ระบุ
exports.getUserCampingBookings = async(req, res, next) => {
  try {
    const { id } = req.params; // camping id
    const userId = req.user.id; // user id จาก token
    
    const bookings = await prisma.booking.findMany({
      where:{
        landmarkId: Number(id),
        profileId: userId,
        paymentStatus: true
      },
      select: {
        id: true,
        checkIn: true,
        checkOut: true,
        paymentStatus: true,
        landmarkId: true,
        profileId: true
      }
    });
    
    res.json(bookings);
  } catch (err) {
    console.error("Error fetching user camping bookings:", err);
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
    const { id } = req.params;
    const { title, price, description, category, lat, lng, image } = req.body;
    const userId = req.user.id;
    
    // ตรวจสอบว่า camping นี้มีอยู่จริงหรือไม่
    const existingCamping = await prisma.landmark.findFirst({
      where: {
        id: Number(id)
      }
    });
    
    if (!existingCamping) {
      return res.status(404).json({
        success: false,
        message: "ไม่พบแคมป์ปิ้งที่ต้องการแก้ไข"
      });
    }
    
    // เตรียมข้อมูลสำหรับอัพเดท
    const updateData = {};
    
    if (title) updateData.title = title;
    if (price) updateData.price = Number(price);
    if (description) updateData.description = description;
    if (category) updateData.category = category;
    if (lat) updateData.lat = Number(lat);
    if (lng) updateData.lng = Number(lng);
    
    // อัพเดทรูปภาพถ้ามีการส่งมา
    if (image && image.public_id && image.secure_url) {
      updateData.public_id = image.public_id;
      updateData.secure_url = image.secure_url;
    }
    
    // อัพเดท camping ในฐานข้อมูล
    const updatedCamping = await prisma.landmark.update({
      where: {
        id: Number(id)
      },
      data: updateData
    });
    
    res.json({
      success: true,
      result: updatedCamping,
      message: "อัพเดทแคมป์ปิ้งสำเร็จ"
    });
    
  } catch (err) {
    console.error("Error updating camping:", err);
    
    if (err.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: "ไม่พบแคมป์ปิ้งที่ต้องการแก้ไข"
      });
    }
    
    next(err);
  }
};

exports.deleteCamping = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    // ตรวจสอบว่า camping นี้มีอยู่จริงหรือไม่
    const existingCamping = await prisma.landmark.findFirst({
      where: {
        id: Number(id)
      }
    });
    
    if (!existingCamping) {
      return res.status(404).json({
        success: false,
        message: "ไม่พบแคมป์ปิ้งที่ต้องการลบ"
      });
    }
    
    // ตรวจสอบสิทธิ์ - เฉพาะเจ้าของหรือ admin เท่านั้นที่ลบได้
    // (หรือสามารถเพิ่มเงื่อนไขอื่นๆ ตามต้องการ)
    
    // ลบ camping จากฐานข้อมูล
    const deletedCamping = await prisma.landmark.delete({
      where: {
        id: Number(id)
      }
    });
    
    res.json({
      success: true,
      result: deletedCamping,
      message: `ลบแคมป์ปิ้ง "${deletedCamping.title}" สำเร็จ`
    });
    
  } catch (err) {
    console.error("Error deleting camping:", err);
    
    // ตรวจสอบ error ประเภทต่างๆ
    if (err.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: "ไม่พบแคมป์ปิ้งที่ต้องการลบ"
      });
    }
    
    if (err.code === 'P2003') {
      return res.status(400).json({
        success: false,
        message: "ไม่สามารถลบแคมป์ปิ้งได้ เนื่องจากมีการจองหรือข้อมูลที่เกี่ยวข้องอยู่"
      });
    }
    
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
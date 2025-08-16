const prisma = require("../config/prisma");



exports.listStats = async(req,res,next)=>{
  try {
    const usersCount = await prisma.profile.count();
    const campingCount = await prisma.landmark.count();
    const bookingCount = await prisma.booking.count({
        where:{
            paymentStatus:true,
        }
    });
    res.json({
      usersCount: usersCount ,
      campingCount : campingCount,
      bookingCount : bookingCount ,
    });
  } catch (error) {
    next(error);
    
  }
}
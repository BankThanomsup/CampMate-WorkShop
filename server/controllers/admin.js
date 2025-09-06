const prisma = require("../config/prisma");

exports.listStats = async (req, res, next) => {
  try {
    const usersCount = await prisma.profile.count();
    const campingCount = await prisma.landmark.count();
    const bookingCount = await prisma.booking.count({
      where: {
        paymentStatus: true,
      },
    });
    res.json({
      usersCount: usersCount,
      campingCount: campingCount,
      bookingCount: bookingCount,
    });
  } catch (error) {
    next(error);
  }
};

exports.listReservations = async (req, res, next) => {
  try {
    //1.count campings
    //2.count nights
    //3.totals
    const { id } = req.user;

    const camping = await prisma.landmark.count({
      where: {
        profileId: id,
      },
    });
    //aggregate = อนุญาติ ให้เอาค่า ฟังก์ชันทางคณิตศาสตร์ มาใช้ได้
    //sum , avg , min , max , count
    //count = นับจำนวน
    const totals = await prisma.booking.aggregate({
      where: {
        landmark: {
          profileId: id,
        },
      },
      _sum: {
        totalNights: true,
        total: true,
      },
    });

    console.log(totals);
    res.json({
      campings: camping,
      nights: totals._sum.totalNights,
      totals: totals._sum.total,
    });
  } catch (error) {
    next(error);
  }
};

exports.listAllReservations = async (req, res, next) => {
  try {
    //code body
    const { id } = req.user;
    const reservations = await prisma.booking.findMany({
      where: {
        paymentStatus: true,
        landmark: {
          profileId: id,
        },
      },
      include: {
        landmark: {
          select: {
            id: true,
            title: true,
            price: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    // console.log(reservations);
    res.json({ result: reservations });
  } catch (error) {
    next(error);
  }
};

// API สำหรับสถิติการจองของ user (ไม่ใช่เป็น owner)
exports.listUserReservationStats = async (req, res, next) => {
  try {
    const { id } = req.user;

    // นับจำนวนการจอง
    const reservationCount = await prisma.booking.count({
      where: {
        profileId: id,
        paymentStatus: true,
      },
    });

    // รวมจำนวนคืนและยอดเงิน
    const totals = await prisma.booking.aggregate({
      where: {
        profileId: id,
        paymentStatus: true,
      },
      _sum: {
        totalNights: true,
        total: true,
      },
    });

    res.json({
      campings: reservationCount, 
      nights: totals._sum.totalNights || 0,
      totals: totals._sum.total || 0,
    });
  } catch (error) {
    next(error);
  }
};

// API สำหรับรายการการจองของ user (ไม่ใช่เป็น owner)
exports.listUserReservations = async (req, res, next) => {
  try {
    const { id } = req.user;
    const reservations = await prisma.booking.findMany({
      where: {
        profileId: id,
        paymentStatus: true,
      },
      include: {
        landmark: {
          select: {
            id: true,
            title: true,
            price: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    
    res.json({ result: reservations });
  } catch (error) {
    next(error);
  }
};

exports.listMyCampings = async (req, res, next) => {
  try {
    //code body
    const { id } = req.user;
    const campings = await prisma.landmark.findMany({
      where: {
        profileId: id,
      },
      select: {
        id: true,
        title: true,
        price: true,
      },

    });
    res.json({ result: campings });
  } catch (error) {
    next(error);
  }
};

const prisma = require("../config/prisma");
const { calToTal } = require("../utils/booking");
const renderError = require("../utils/renderError");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


exports.listBookings = async(req,res,next)=>{
  try {
    const { id } = req.user;
    console.log(id);
    const bookings = await prisma.booking.findMany({
      where:{
        profileId: id,
        paymentStatus: true,
      },
      include:{
        landmark:{
          select:{
            id:true,
            title:true,
          }
        }
      },
      orderBy:{
        checkIn:"asc"
      }
    });
    //  console.log(bookings);
    res.json({
      message: "List of bookings", result: bookings
    });
  } catch (error) {
    next(error);
    
  }
}


exports.createBooking = async (req, res, next) => {
  try {
    //Overview
    //step1 Destructuring req.body
    //step2 Delete Booking
    //step3 Find Booking
    //step4 Calculate Total
    //step5 Insert to db
    //step6 Send id booking to react

    //step1 Destructuring req.body
    const { campingId, checkIn, checkOut } = req.body;
    const { id } = req.user;
    //step2 Delete Booking
    await prisma.booking.deleteMany({
      where: {
        profileId: id,
        paymentStatus: false,
      },
    });
    // console.log(id,campingId, checkIn, checkOut);
    //step3 Find Booking
    const camping = await prisma.landmark.findFirst({
      where: {
        id: campingId,
      },
      select: {
        price: true,
      },
    });
    if (!camping) {
      return renderError(400, " Camping not found", res);
    }
    // console.log(camping.price);
    //step4 Calculate Total
    const { total, totalNights } = calToTal(checkIn, checkOut, camping.price);
    console.log(total, totalNights);

    // step5 Insert to db
    const booking = await prisma.booking.create({
      data: {
        profileId: id,
        landmarkId: campingId,
        checkIn: checkIn,
        checkOut: checkOut,
        total: total,
        totalNights: totalNights,
      },
    });
    //step6 Send id booking to react
    // console.log(booking);
    const bookingId = booking.id;
    res.json({
      message: "Booking created successfully",
      result: bookingId,
    });
  } catch (error) {
    next(error);
  }
};

exports.checkout = async (req, res, next) => {
  try {
    const { id } = req.body;
    //step 1 find booking
    const booking = await prisma.booking.findFirst({
      where: { id: Number(id) },
      include: {
        landmark: {
          select: {
            id: true,
            title: true,
            secure_url: true,
          },
        },
      },
    });

    if (!booking) {
      return renderError(400, "Booking not found", res);
    }

    const { total, totalNights, checkIn, checkOut, landmark } = booking;
    const { title, secure_url } = landmark;

    //step 2 Stripe
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      metadata:{ bookingId:booking.id},
      line_items: [
        {   
            quantity: 1,
            price_data:{
                currency: "thb",
                product_data:{
                    name: title,
                    images: [secure_url],
                    description: 'ขอบใจหลายๆจ๊า ที่จองที่พักกับเรา',
                },
                unit_amount: total * 100,
            }
        },
      ],
      mode: "payment",
      return_url: `https://react-camping.vercel.app/user/complete/${CHECKOUT_SESSION_ID}`,
    });

    //   console.log(total, totalNights,checkIn, checkOut, landmark,title,secure_url);
    res.send({ clientSecret: session.client_secret });
  } catch (error) {
    next(error);
  }
};

exports.checkoutStatus = async(req,res,next) =>{
  try {
    const { session_id } = req.params;
    const session = await stripe.checkout.sessions.retrieve(session_id);

    const bookingId = session.metadata?.bookingId;
    console.log(bookingId);
    //check
    if(session.status !== 'complete' || !bookingId){
      return renderError(400,"Payment not completed",res);
    }
    //update DB booking
    console.log(session);
    const result = await prisma.booking.update({
      where:{
        id:Number(bookingId),
      },
      data:{
        paymentStatus : true
      }
    });

    res.json({
      message: "Payment status updated successfully",
      status:session.status
    });
  } catch (error) {
    next(error);
  }
}
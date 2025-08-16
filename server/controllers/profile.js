const renderError = require("../utils/renderError");
const prisma = require('../config/prisma');

exports.createProfile = async (req, res,next) => {
  try {
    const{ firstname,lastname } = req.body;
    console.log(req.user)
    const{ id } = req.user;
    const email = req.user.emailAddresses[0].emailAddress;
    // const profile = await prisma.profile.create({
    //   data:{
    //     firstname,
    //     lastname,
    //     clerkId: id, 
    //     email
    //   }})
    const profile = await prisma.profile.upsert({
      where: { clerkId: id },
      create:{
        firstname,
        lastname,
        clerkId: id,
        email
      },
      update:{
        firstname,
        lastname,
        clerkId: id,
        email
      }
    })
    // console.log("User ID:", id); // Debugging
    // console.log("User email:", email); // Debugging
    res.json({result: profile, message: "Profile created successfully"});
    }
  catch (err) {
    console.log(err.message);
    next(err);
  }
}
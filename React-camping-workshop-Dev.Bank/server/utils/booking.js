const calNight = (checkIn,checkOut) =>{
    //code body
    const miliDay =checkOut.getTime() - checkIn.getTime()
    //mili  1000 = 1 วินาที => นาที => ชั่วโมง => วัน
    const diffDay = miliDay / (1000 * 60 * 60 *24)
    
    return diffDay
  }
  
  
exports.calToTal = (checkIn,checkOut,price )=>{
    //code body
    if(!checkIn || !checkOut) return;

    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)

    


    const totalNights = calNight(checkInDate,checkOutDate)
    const total = totalNights * price
    // console.log(totalNight , total)
  
    return { total, totalNights }
  }
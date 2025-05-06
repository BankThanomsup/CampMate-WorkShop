const calNight = (checkIn,checkOut) =>{
    //code body
    const miliDay =checkOut.getTime() - checkIn.getTime()
    //mili  1000 = 1 วินาที => นาที => ชั่วโมง => วัน
    const diffDay = miliDay / (1000 * 60 * 60 *24)
    
    return diffDay
  }
  
  
export const calToTal = (checkIn,checkOut,price )=>{
    //code body
    if(!checkIn || !checkOut) return;
    const totalNight = calNight(checkIn,checkOut)
    const total = totalNight * price
    // console.log(totalNight , total)
  
    return{total,totalNight}
  }
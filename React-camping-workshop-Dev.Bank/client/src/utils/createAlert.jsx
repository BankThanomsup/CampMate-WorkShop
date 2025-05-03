import Swal from "sweetalert2";

export const createAlert = (icon,text,timer) => {
    return Swal.fire({
        title: text || 'Something Wrong',
        icon: icon || 'info' ,
        timer: timer,
      }) 
    
}
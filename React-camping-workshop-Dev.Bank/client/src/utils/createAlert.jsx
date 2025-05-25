import Swal from "sweetalert2";

export const createAlert = (icon,text,timer) => {
    return Swal.fire({
        title: text || 'Something Wrong',
        icon: icon || 'info' ,
        timer: timer,
      }) 
    
}
export const createNotify = (icon,text) => {
    return Swal.fire({
  position: "top",
  icon: icon,
  title: text,
  showConfirmButton: false,
  timer: 1000
});
    
}
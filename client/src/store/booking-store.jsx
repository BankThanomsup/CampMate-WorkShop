import { create } from "zustand"

//Create bookingStore Global State

const bookingStore = () => ({
    campingId: "",
    price: 0,
    bookings:[],
    range: undefined 

})

const useBookingStore = create(bookingStore)
export default useBookingStore
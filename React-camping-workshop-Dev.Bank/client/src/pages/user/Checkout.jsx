import {loadStripe} from '@stripe/stripe-js';
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
  } from '@stripe/react-stripe-js';
import { useAuth } from '@clerk/clerk-react';
import { useParams } from 'react-router';
import { checkOut } from '@/api/booking';

const stripePromise = loadStripe("pk_test_51RNTVpFY8yJFUsVmzCMGrBaYtL6JkhEqZ2oatXmzk8tY1KcSa6W1FfYAgI8QPy6ostax5EYIvx1xj54XecPxf5K500JuzgVqrx");


const Checkout = () => {
    //code
    const { getToken } = useAuth();
    const { id } = useParams(); 

    const fetchClientSecret = async () => {
        const token = await getToken()
        try {
            const res = await checkOut(token ,id) 
            // console.log("🔍 checkOut response:", res);
            // console.log("🔍 ClientSecret value:", res?.data?.clientSecret);           
            return res.data.clientSecret;

        } catch (error) {
            console.log(error)
            
        }
    }

    const options = {fetchClientSecret};
  return (

    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}

export default Checkout;
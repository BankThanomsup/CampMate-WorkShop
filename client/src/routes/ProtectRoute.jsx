import { useAuth } from "@clerk/clerk-react";
import { Link } from "react-router";

const ProtectRoute = ({ el }) => {
  //JS
  const { isLoaded, isSignedIn } = useAuth();
  // console.log(isSignedIn);
  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }
  if (!isSignedIn) {
    return (
      <div className="flex w-screen h-screen justify-center items-center bg-gray-100">
        <Link to="/">

        <p>Access Denied !!! Go to Home</p>
        </Link>
      </div>
    );
  }

  return el;
};

export default ProtectRoute;

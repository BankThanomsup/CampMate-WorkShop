import { SignInButton } from "@clerk/clerk-react";
import { Heart, RotateCw } from "lucide-react";

export const CardSubmitButtons = ({ isPending, isFavorite }) => {
  // console.log(isPending);
  return (
    <button className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
      {isPending ? (
        <RotateCw className="animate-spin w-5 h-5 text-gray-600 dark:text-gray-300" />
      ) : isFavorite ? (
        <Heart
          className="w-5 h-5 text-red-500 hover:scale-110 transition-transform duration-300"
          fill="currentColor"
          stroke="currentColor"
        />
      ) : (
        <Heart
          className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 hover:scale-110 transition-all duration-300"
          fill="none"
          stroke="currentColor"
        />
      )}

      {/* {
      isPending ? <RotateCw className='animate-spin'/> : <Heart className='hover:scale-110 hover:duration-300' fill="red" size={34} stroke='white'/>
    } */}
    </button>
  );
};

export const CardSignInButtons = () => {
  return (
    <div>
      <SignInButton mode="modal">
        <button className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
          <Heart
            className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-all duration-300"
            fill="none"
            stroke="currentColor"
          />
        </button>
      </SignInButton>
    </div>
  );
};

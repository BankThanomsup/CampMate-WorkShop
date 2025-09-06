
import { CircleUserRound } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';

const Usericon = () => {
  const {user} = useUser();
  
  if(user){
    return (
      <div className="relative">
        <img 
          src={user.imageUrl} 
          alt={user.firstName || 'User'}
          className='w-8 h-8 rounded-full object-cover border-2 border-white shadow-md transition-transform duration-300 hover:scale-110'
        />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
      </div>
    );
  }
  
  return (
    <div className="relative">
      <CircleUserRound className="w-8 h-8 text-gray-600 transition-colors duration-300 hover:text-blue-600" />
      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gray-400 rounded-full border-2 border-white"></div>
    </div>
  );
};

export default Usericon
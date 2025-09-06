//rafce
import { motion } from "motion/react";
import { Link } from "react-router";
import FavoriteToggleButton from "./FavoriteToggleButton";
import { MapPin, Star } from "lucide-react";

const CampingCard = ({ camping }) => {
  // console.log(camping);
  // const { title } = props.camping;
  // console.log(camping.title)
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
        ease: "easeOut"
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      className="group h-full"
    >
      <article className="card-professional relative overflow-hidden h-full flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <Link to={`/user/camping/${camping.id}`} className="flex flex-col h-full">
          {/* Image Container with Overlay */}
          <div className="relative h-[280px] overflow-hidden flex-shrink-0">
            <img
              src={camping.secure_url}
              alt={camping.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Price badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-900 dark:text-gray-100 px-3 py-1 rounded-full text-sm font-semibold shadow-md transition-colors duration-300">
                ฿{camping.price.toLocaleString()}/คืน
              </span>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6 flex flex-col flex-grow">
            <div className="mb-3">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2 min-h-[56px]">
                {camping.title}
              </h3>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed flex-grow min-h-[60px]">
              {camping.description}
            </p>
            
            {/* Location and Rating */}
            <div className="flex items-center justify-between text-sm mt-auto">
              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{camping.lat.toFixed(2)}, {camping.lng.toFixed(2)}</span>
              </div>
              
              {/* ลบส่วนแสดงดาวเนื่องจากไม่มีข้อมูลจริงจาก API */}
            </div>
          </div>
        </Link>
        
        {/* Favorite Button */}
        <div className="absolute top-4 right-4">
          <FavoriteToggleButton isFavorite={camping.isFavorite} campingId={camping.id} />
        </div>
      </article>
    </motion.div>
  );
};

export default CampingCard;

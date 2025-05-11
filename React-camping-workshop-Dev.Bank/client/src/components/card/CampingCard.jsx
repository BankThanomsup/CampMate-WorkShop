//rafce
import { motion } from "motion/react";
import { Link } from "react-router";
const CampingCard = ({ camping }) => {
  // const { title } = props.camping;
  // console.log(camping.title)
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.2,
        rotate: 180,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: 0,
      }}
      transition={{
        duration: 0.5,
      }}
    >
      <Link to={`/user/camping/${camping.id}`} className="text-decoration-none">
        <article className="hover:scale-105 hover:duration-300 shadow-md p-2 rounded">
          <div className="h-[300px] rounded-md mb-2">
            <img
              src={camping.secure_url}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold">{camping.title}</h3>
          </div>
          <p className="text-gray-700 text-sm">{camping.description.substring(0,50)} ดูเพิ่มเติม ...</p>
          <div className="flex justify-between ">
            <p className="font-semibold">{camping.price} Baht</p>
            <p>
              {camping.lat.toFixed(4)} ,{camping.lng.toFixed(4)}
            </p>
          </div>
        </article>
      </Link>
    </motion.div>
  );
};

export default CampingCard;

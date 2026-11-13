import * as motion from "motion/react-client";
import RoomCard from "./RoomCard";


const AnimatedCard = ({ room}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: 0.2,
      }}
      whileHover={{
        y: -5,
        transition: {
          duration: 0.15,
          ease: "easeOut",
        },
      }}
    >
      <RoomCard room={room} />
    </motion.div>
  );
}

export default AnimatedCard;
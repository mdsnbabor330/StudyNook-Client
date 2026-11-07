import * as motion from "motion/react-client";
import RoomCard from "./RoomCard";


const AnimatedCard = ({ room }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -5,
        transition: {
          duration: 0.25,
          ease: "easeOut",
        },
      }}
    >
      <RoomCard room={room} />
    </motion.div>
  );
}

export default AnimatedCard;
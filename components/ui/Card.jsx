import { motion } from 'framer-motion';

const Card = ({ children, className = '' }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`bg-white rounded-2xl p-6 border border-[#ECECEC] ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;
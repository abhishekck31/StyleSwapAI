import { motion } from 'framer-motion';
export default function Button({ children, className = '', ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className={`px-4 py-2 rounded-lg font-semibold shadow transition ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}

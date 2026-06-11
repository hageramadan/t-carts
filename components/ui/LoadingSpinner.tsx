'use client';

import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  message?: string;
}

const LoadingSpinner = ({ fullScreen = false, message }: LoadingSpinnerProps) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Animated Logo/Spinner - مستوحى من لوجو تواجد */}
      <div className="relative">
        {/* الحلقة الخارجية */}
        <motion.div
          className="w-24 h-24 rounded-full border-4 border-[#068377]/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        {/* الحلقة المتوسطة */}
        <motion.div
          className="absolute top-0 left-0 w-24 h-24 rounded-full border-4 border-[#068377]/40 border-t-[#068377] border-r-transparent border-b-transparent border-l-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        
        {/* الحلقة الداخلية */}
        <motion.div
          className="absolute top-2 left-2 w-20 h-20 rounded-full border-4 border-[#21405F]/60 border-b-[#21405F] border-r-transparent border-t-transparent border-l-transparent"
          animate={{ rotate: -360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />

        {/* النقطة المركزية */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-3 h-3 bg-gradient-to-brfrom-[#068377] to-[#21405F] rounded-full -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Loading Text مع أنيميشن */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        {message && (
          <motion.p 
            className="text-gray-700 text-lg font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {message}
          </motion.p>
        )}
        
        {/* Dots متحركة */}
        <div className="flex gap-2 justify-center mt-3">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2.5 h-2.5 rounded-full"
              style={{
                background: `linear-gradient(135deg, #068377, #21405F)`
              }}
              animate={{ 
                y: [0, -12, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );

  if (fullScreen) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-white/95 backdrop-blur-md z-50 flex items-center justify-center"
      >
        {content}
      </motion.div>
    );
  }

  return content;
};

export default LoadingSpinner;
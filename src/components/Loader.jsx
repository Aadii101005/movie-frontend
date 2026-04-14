import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px] w-full">
      <motion.div
        animate={{
          rotate: 360,
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "linear",
        }}
        className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
      />
      <style jsx>{`
        .flex { display: flex; align-items: center; justify-content: center; }
        .min-h-\[200px\] { min-height: 200px; }
        .w-full { width: 100%; }
        .w-12 { width: 3rem; }
        .h-12 { height: 3rem; }
        .border-4 { border-width: 4px; }
        .border-primary { border-color: var(--primary); }
        .border-t-transparent { border-top-color: transparent; }
        .rounded-full { border-radius: 9999px; }
      `}</style>
    </div>
  );
};

export default Loader;

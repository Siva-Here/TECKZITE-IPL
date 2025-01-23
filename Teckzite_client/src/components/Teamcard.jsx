import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

export default function CyberCard({teamName}) {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setMousePosition({ x, y });
  };

  const getTransform = () => {
    const rotateX = (mousePosition.y - 0.5) * 20;
    const rotateY = (mousePosition.x - 0.5) * 20;
    return `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative w-[300px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePosition({ x: 0.5, y: 0.5 })}
        className="group relative w-full cursor-pointer"
        style={{
          transform: getTransform(),
          transition: 'transform 0.3s ease-out',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Card Background */}
        <div className="relative bg-[#161929] backdrop-blur-sm border border-cyan-500/20 p-4 rounded-lg shadow-lg">
          {/* Holographic Border Effect */}
          <div className="absolute inset-[1px] bg-gradient-to-br from-cyan-500/10 via-cyan-400/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>

          {/* Content Container */}
          <div className="relative flex flex-col space-y-4">
            {/* Team Image Container with Holographic Frame */}
            <div className="relative w-full h-[200px] overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-[#161929] to-cyan-500 opacity-50 blur-md"></div>
              <div className="relative h-full border-2 border-cyan-500/50 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-[#161929] z-10"></div>
                <img
                  src={`${teamName}.jpg`}
                  alt={teamName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Team Name with Neon Effect */}
            <motion.h2
              className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-[#00ffff] text-center tracking-wider"
              animate={{ textShadow: ['0 0 8px #00ffff', '0 0 12px #00ffff', '0 0 8px #00ffff'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {teamName}
            </motion.h2>

            {/* View Players Button */}
            <button className="relative group/btn w-full px-4 py-2 bg-gradient-to-r from-[#161929] to-cyan-500 hover:from-cyan-600 hover:to-[#161929] backdrop-blur-sm border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 rounded">
              {/* Button Content */}
              <span className="relative flex items-center justify-center gap-2 text-cyan-300 group-hover/btn:text-cyan-200 transition-colors duration-300">
                <Users className="w-4 h-4" />
                View Players
              </span>

              {/* Geometric Accents */}
              <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-cyan-500"></div>
              <div className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t border-r border-cyan-500"></div>
              <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b border-l border-cyan-500"></div>
              <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-cyan-500"></div>
            </button>
          </div>

          {/* Ambient Light Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/0 via-[#161929]/0 to-cyan-500/0 group-hover:from-cyan-500/20 group-hover:via-[#161929]/20 group-hover:to-cyan-500/20 transition-colors duration-300 pointer-events-none rounded-lg"></div>
        </div>
      </div>
    </motion.div>
  );
}

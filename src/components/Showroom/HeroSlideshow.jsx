import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleLayer from './ParticleLayer';

const SLIDES = [
  { id: 1, title: "Industrial", color: "#ff7d1a", mode: "sphere" },
  { id: 2, title: "Electronics", color: "#3b82f6", mode: "wave" },
  { id: 3, title: "Logistics", color: "#10b981", mode: "galaxy" },
  { id: 4, title: "Sourcing", color: "#f97316", mode: "sphere" }
];

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-64 lg:h-96 rounded-[32px] overflow-hidden bg-black border border-slate-200 dark:border-white/10">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ParticleLayer mode={SLIDES[index].mode} color={SLIDES[index].color} />
        </Canvas>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative z-10 h-full p-8 lg:p-16 flex items-center pointer-events-none"
        >
          <h2 className="text-4xl lg:text-7xl font-black text-white uppercase italic leading-none drop-shadow-2xl">
            {SLIDES[index].title} <br/> <span className="text-[#ff7d1a]">ZONE</span>
          </h2>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 right-10 flex gap-2 z-20">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} 
            className={`h-1.5 rounded-full transition-all ${index === i ? 'w-8 bg-[#ff7d1a]' : 'w-2 bg-white/20'}`} 
          />
        ))}
      </div>
    </div>
  );
}
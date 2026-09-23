import React, { useMemo } from 'react';
import { motion } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  type: 'star' | 'heart' | 'sparkle' | 'circle';
  color: string;
}

export const FloatingParticles: React.FC = () => {
  const particles = useMemo<Particle[]>(() => {
    const types: ('star' | 'heart' | 'sparkle' | 'circle')[] = ['star', 'heart', 'sparkle', 'circle'];
    const colors = ['#F9D6DC', '#D7E3FC', '#E2D9F3', '#FEF3C7', '#FCE7F3'];
    return Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      x: Math.random() * 95,
      size: Math.random() * 14 + 10,
      duration: Math.random() * 12 + 16,
      delay: Math.random() * 10,
      type: types[i % types.length],
      color: colors[i % colors.length]
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: '105vh', opacity: 0, rotate: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0, 0.7, 0.8, 0.4, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear'
          }}
          style={{
            position: 'absolute',
            left: `${p.x}vw`,
            fontSize: `${p.size}px`,
            color: p.color
          }}
        >
          {p.type === 'star' && '✦'}
          {p.type === 'heart' && '♡'}
          {p.type === 'sparkle' && '⋆'}
          {p.type === 'circle' && '•'}
        </motion.div>
      ))}
    </div>
  );
};

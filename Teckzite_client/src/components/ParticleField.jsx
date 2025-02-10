import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, BufferGeometry, Float32BufferAttribute } from 'three';

const ParticleField = () => {
  const particlesRef = useRef(null);

  const particleCount = 2000;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      particlesRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry attach="geometry" {...geometry} />
      <pointsMaterial
        attach="material"
        size={0.025}
        color="#00ffff"
        transparent
        opacity={0.6}
      />
    </points>
  );
};

export default ParticleField;

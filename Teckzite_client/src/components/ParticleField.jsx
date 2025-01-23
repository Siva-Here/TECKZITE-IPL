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


// import React, { useRef, useEffect } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';

// const ParticleField = () => {
//   const particlesRef = useRef(null);
//   const particleCount = 2000;

//   const positions = new Float32Array(particleCount * 3);
//   for (let i = 0; i < particleCount; i++) {
//     positions[i * 3] = (Math.random() - 0.5) * 15;
//     positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
//     positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
//   }

//   useFrame((state) => {
//     if (particlesRef.current) {
//       particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
//       particlesRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
//     }
//   });

//   return (
//     <points ref={particlesRef}>
//       <bufferGeometry>
//         <bufferAttribute
//           attach="attributes-position"
//           count={positions.length / 3}
//           array={positions}
//           itemSize={3}
//         />
//       </bufferGeometry>
//       <pointsMaterial size={0.02} color="#00ffff" transparent opacity={0.6} />
//     </points>
//   );
// };

// const CanvasDots = () => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     let dots = [];
//     const arrayColors = ['#eee', '#545454', '#596d91', '#bb5a68', '#696541'];

//     const initializeDots = () => {
//       dots = [];
//       for (let i = 0; i < 1000; i++) {
//         dots.push({
//           x: Math.random() * canvas.width,
//           y: Math.random() * canvas.height,
//           size: Math.random() * 3 + 5,
//           color: arrayColors[Math.floor(Math.random() * arrayColors.length)],
//         });
//       }
//     };

//     const drawDots = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       dots.forEach((dot) => {
//         ctx.fillStyle = dot.color;
//         ctx.beginPath();
//         ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
//         ctx.fill();
//       });
//     };

//     const handleMouseMove = (event) => {
//       const mouseX = event.offsetX;
//       const mouseY = event.offsetY;

//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       drawDots();

//       dots.forEach((dot) => {
//         const distance = Math.sqrt((mouseX - dot.x) ** 2 + (mouseY - dot.y) ** 2);
//         if (distance < 300) {
//           ctx.strokeStyle = dot.color;
//           ctx.lineWidth = 1;
//           ctx.beginPath();
//           ctx.moveTo(dot.x, dot.y);
//           ctx.lineTo(mouseX, mouseY);
//           ctx.stroke();
//         }
//       });
//     };

//     const handleResize = () => {
//       canvas.width = canvas.offsetWidth;
//       canvas.height = canvas.offsetHeight;
//       initializeDots();
//       drawDots();
//     };

//     canvas.width = canvas.offsetWidth;
//     canvas.height = canvas.offsetHeight;
//     initializeDots();
//     drawDots();

//     canvas.addEventListener('mousemove', handleMouseMove);
//     window.addEventListener('resize', handleResize);

//     return () => {
//       canvas.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return <canvas ref={canvasRef} id="dotsCanvas" style={{ width: '100%', height: '100%' }} />;
// };

// const App = () => {
//   return (
//     <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
//       <Canvas style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
//         <ParticleField />
//       </Canvas>
//       <CanvasDots />
//     </div>
//   );
// };

// export default App;

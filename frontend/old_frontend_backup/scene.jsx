import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Stars, Torus, MeshDistortMaterial, Float } from '@react-three/drei';

function OrbitalRing({ radius, speed, distort, color }) {
  const ringRef = useRef();
  useFrame((state) => {
    ringRef.current.rotation.x = state.clock.elapsedTime * speed * 0.5;
    ringRef.current.rotation.y = state.clock.elapsedTime * speed;
  });

  return (
    <Torus ref={ringRef} args={[radius, 0.04, 16, 100]}>
      <MeshDistortMaterial color={color} speed={distort} distort={0.3} emissive={color} emissiveIntensity={0.5} />
    </Torus>
  );
}

export default function Scene() {
  return (
    <div style={{ height: "100vh", width: "100vw", position: "fixed", top: 0 }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <color attach="background" args={['#050509']} />
        <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
          <OrbitalRing radius={3} speed={0.2} distort={1} color="#4338ca" />
          <OrbitalRing radius={4.5} speed={0.15} distort={0.8} color="#6366f1" />
          <OrbitalRing radius={6} speed={0.1} distort={0.6} color="#818cf8" />
        </Float>
      </Canvas>
    </div>
  );
}
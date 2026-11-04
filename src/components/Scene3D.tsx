import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

function Sculpture() {
  const core = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!core.current) return;
    core.current.rotation.y += delta * 0.11;
    core.current.rotation.x = THREE.MathUtils.lerp(
      core.current.rotation.x,
      state.pointer.y * 0.16,
      0.025
    );
  });

  return (
    <group ref={core}>
      <Float speed={1.4} rotationIntensity={0.24} floatIntensity={0.45}>
        <mesh castShadow>
          <icosahedronGeometry args={[1.62, 4]} />
          <meshPhysicalMaterial
            color="#849bff"
            metalness={0.58}
            roughness={0.16}
            clearcoat={1}
            clearcoatRoughness={0.12}
            emissive="#263f85"
            emissiveIntensity={0.25}
          />
        </mesh>
        <mesh scale={1.025}>
          <icosahedronGeometry args={[1.62, 1]} />
          <meshBasicMaterial color="#e6f5ff" wireframe transparent opacity={0.075} />
        </mesh>
        <mesh rotation={[0.5, 0.2, 0.28]}>
          <torusGeometry args={[2.34, 0.012, 8, 160]} />
          <meshBasicMaterial color="#b4bbff" transparent opacity={0.65} />
        </mesh>
        <mesh rotation={[1.2, 0.7, -0.3]}>
          <torusGeometry args={[2.05, 0.009, 8, 160]} />
          <meshBasicMaterial color="#93f5fc" transparent opacity={0.45} />
        </mesh>
        <mesh position={[1.65, 1.32, 0.3]}>
          <sphereGeometry args={[0.082, 16, 16]} />
          <meshBasicMaterial color="#e5faff" />
        </mesh>
      </Float>
    </group>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7.8], fov: 42 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      style={{ width: '100%', height: '100%' }}
      aria-label="Rotating abstract three-dimensional sculpture"
    >
      <ambientLight intensity={0.95} />
      <directionalLight position={[4, 6, 5]} intensity={3.2} color="#dbebff" />
      <pointLight position={[-5, -2, 2]} intensity={38} color="#8c72ff" distance={13} />
      <pointLight position={[2, -3, -4]} intensity={25} color="#63e7ef" distance={10} />
      <Sculpture />
      <Stars radius={80} depth={40} count={180} factor={2.2} saturation={0} fade speed={0.25} />
    </Canvas>
  );
}

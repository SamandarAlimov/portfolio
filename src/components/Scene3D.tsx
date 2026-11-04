import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';

function ObjectStudy() {
  const rig = useRef<THREE.Group>(null);
  const satin = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#c4c8cd',
    metalness: 0.68,
    roughness: 0.19,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
  }), []);
  const graphite = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#34373b',
    metalness: 0.63,
    roughness: 0.23,
    clearcoat: 0.7,
  }), []);

  useFrame((state, delta) => {
    if (!rig.current) return;
    rig.current.rotation.y += delta * 0.12;
    rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, -0.1 - state.pointer.y * 0.13, 3, delta);
    rig.current.rotation.z = THREE.MathUtils.damp(rig.current.rotation.z, -0.25 + state.pointer.x * 0.12, 3, delta);
  });

  return (
    <group rotation={[0.05, 0, -0.18]} position={[0, 0.15, 0]} ref={rig}>
      <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.25}>
        <mesh material={satin} castShadow>
          <torusKnotGeometry args={[1.23, 0.36, 220, 32, 2, 3]} />
        </mesh>
        <mesh material={graphite} castShadow rotation={[0.5, 1.1, 0.28]} scale={0.65}>
          <icosahedronGeometry args={[0.98, 1]} />
        </mesh>
        <mesh rotation={[1.4, -0.5, -0.26]}>
          <torusGeometry args={[2.21, 0.009, 6, 150]} />
          <meshStandardMaterial color="#96999c" transparent opacity={0.63} metalness={0.5} roughness={0.28} />
        </mesh>
        <mesh rotation={[0.2, 1.22, 0.35]}>
          <torusGeometry args={[1.92, 0.007, 6, 150]} />
          <meshStandardMaterial color="#b0b3b5" transparent opacity={0.55} metalness={0.5} roughness={0.3} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.7], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      shadows
      aria-label="Interactive rotating silver and graphite sculptural form"
    >
      <ambientLight intensity={2.2} />
      <hemisphereLight args={['#ffffff', '#6e747b', 2.0]} />
      <directionalLight position={[4, 5, 6]} intensity={4} color="#ffffff" castShadow />
      <directionalLight position={[-4, 2, -2]} intensity={4} color="#c4ccd4" />
      <pointLight position={[-2, -4, 3]} intensity={20} color="#ffffff" distance={11} />
      <ObjectStudy />
      <ContactShadows position={[0, -2.5, 0]} opacity={0.21} scale={8} blur={2.8} far={4} />
    </Canvas>
  );
}

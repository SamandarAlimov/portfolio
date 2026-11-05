import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

/**
 * A visible explanation of the developer's process — not an arbitrary knot.
 *
 * Left: a faceted spark (IDEA).
 * Middle: a precise engineered module (ENGINEERING).
 * Right: a complete, vivid outcome (IMPACT).
 * A moving signal travels along the connection from the idea to the result.
 * See the adjacent HTML labels for the exact meaning and accessible fallback.
 */
function Idea() {
  return (
    <group position={[-1.75, 0.08, 0.15]} rotation={[0.25, -0.3, -0.2]}>
      <mesh>
        <icosahedronGeometry args={[0.76, 1]} />
        <meshPhysicalMaterial color="#e5e9ed" metalness={0.74} roughness={0.17} clearcoat={1} />
      </mesh>
      <mesh scale={1.17}>
        <icosahedronGeometry args={[0.77, 1]} />
        <meshBasicMaterial color="#075bff" wireframe transparent opacity={0.55} />
      </mesh>
      <mesh position={[0.27, 0.22, 0.55]} scale={0.15}>
        <sphereGeometry args={[1, 16, 12]} />
        <meshBasicMaterial color="#075bff" />
      </mesh>
    </group>
  );
}

function Engineering() {
  return (
    <group position={[0, 0.14, 0.18]} rotation={[0.28, 0.36, 0.11]}>
      <RoundedBox args={[1.18, 1.18, 1.18]} radius={0.16} smoothness={4} castShadow>
        <meshPhysicalMaterial color="#cbd0d7" metalness={0.84} roughness={0.12} clearcoat={1} />
      </RoundedBox>
      <mesh position={[0, 0, 0.615]}>
        <boxGeometry args={[0.75, 0.75, 0.035]} />
        <meshPhysicalMaterial color="#21272c" metalness={0.48} roughness={0.24} />
      </mesh>
      <mesh position={[0, 0, 0.652]}>
        <boxGeometry args={[0.52, 0.1, 0.025]} />
        <meshBasicMaterial color="#075bff" />
      </mesh>
      <mesh position={[0, -0.22, 0.652]}>
        <boxGeometry args={[0.34, 0.055, 0.025]} />
        <meshBasicMaterial color="#8bc6ff" />
      </mesh>
      {[-0.32, 0, 0.32].map((x) => (
        <mesh key={x} position={[x, -0.66, 0.03]}>
          <boxGeometry args={[0.09, 0.18, 0.24]} />
          <meshStandardMaterial color="#7c8796" metalness={0.9} roughness={0.17} />
        </mesh>
      ))}
    </group>
  );
}

function Impact() {
  return (
    <group position={[1.75, 0.08, 0.16]}>
      <mesh castShadow>
        <sphereGeometry args={[0.68, 48, 36]} />
        <meshPhysicalMaterial color="#075bff" metalness={0.43} roughness={0.12} clearcoat={1} clearcoatRoughness={0.05} />
      </mesh>
      <mesh rotation={[0.78, 0.45, -0.4]}>
        <torusGeometry args={[0.86, 0.043, 12, 90]} />
        <meshStandardMaterial color="#c6ccd3" metalness={0.85} roughness={0.19} />
      </mesh>
      <mesh position={[-0.19, 0.24, 0.54]} scale={0.13}>
        <sphereGeometry args={[1, 16, 12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

function ConnectedProcess() {
  const rig = useRef<THREE.Group>(null);
  const signal = useRef<THREE.Mesh>(null);
  const path = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.75, 0.06, -0.38),
    new THREE.Vector3(-1, -0.45, -0.35),
    new THREE.Vector3(0, -0.55, -0.40),
    new THREE.Vector3(1, -0.46, -0.35),
    new THREE.Vector3(1.75, 0.06, -0.38),
  ]), []);
  const cable = useMemo(() => new THREE.TubeGeometry(path, 90, 0.032, 7, false), [path]);

  useFrame((state, delta) => {
    if (rig.current) {
      rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y, state.pointer.x * 0.09, 3, delta);
      rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, -state.pointer.y * 0.055, 3, delta);
    }
    if (signal.current) {
      signal.current.position.copy(path.getPointAt((state.clock.elapsedTime * 0.095) % 1));
    }
  });

  return (
    <group ref={rig} position={[0, 0.3, 0]}>
      <mesh geometry={cable}>
        <meshStandardMaterial color="#8f9cb0" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh ref={signal}>
        <sphereGeometry args={[0.115, 16, 12]} />
        <meshBasicMaterial color="#075bff" />
      </mesh>
      <Idea />
      <Engineering />
      <Impact />
    </group>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0.32, 7.8], fov: 39 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      shadows
      aria-hidden="true"
    >
      <ambientLight intensity={2.2} />
      <hemisphereLight args={['#ffffff', '#7489a6', 1.8]} />
      <directionalLight position={[4, 6, 6]} intensity={3.3} color="#ffffff" castShadow />
      <directionalLight position={[-5, 2, -3]} intensity={3.5} color="#c7d8f5" />
      <pointLight position={[2, -3, 4]} intensity={10} color="#9ac0ff" distance={12} />
      <ConnectedProcess />
      <ContactShadows position={[0, -1.57, 0]} opacity={0.13} scale={6} blur={2.8} far={3.1} />
    </Canvas>
  );
}

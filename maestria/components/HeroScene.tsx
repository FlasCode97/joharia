"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function Stone() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.1;
    meshRef.current.rotation.y = t * 0.07;
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 8]} />
        <MeshDistortMaterial
          color="#10b981"
          roughness={0.12}
          metalness={0.5}
          distort={0.28}
          speed={1.2}
          envMapIntensity={0.6}
        />
      </mesh>
    </Float>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop="always"
      aria-hidden="true"
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 3, 4]} intensity={90} color="#6ee7b7" />
      <pointLight position={[-5, -2, 2]} intensity={40} color="#ffffff" />
      <Stone />
    </Canvas>
  );
}

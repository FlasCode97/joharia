"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";
import { useGradientIntensity } from "./GradientIntensityContext";
import { pageColorAt, luminance } from "@/lib/adaptiveColor";

function DistortObject({ scrollRef }: { scrollRef: React.RefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<any>(null);

  useFrame((state) => {
    if (!meshRef.current || !matRef.current) return;
    const t = state.clock.getElapsedTime();
    const s = scrollRef.current ?? 0;
    meshRef.current.rotation.x = t * 0.12 + s * 0.8;
    meshRef.current.rotation.y = t * 0.08 + s * 1.2;
    matRef.current.distort = 0.28 + s * 0.25 + Math.sin(t * 0.6) * 0.05;
    meshRef.current.position.z = -s * 1.6;
    meshRef.current.scale.setScalar(1 - s * 0.18);
  });

  return (
    <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.6}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 12]} />
        <MeshDistortMaterial
          ref={matRef}
          color="#10b981"
          roughness={0.12}
          metalness={0.55}
          distort={0.3}
          speed={1.4}
          envMapIntensity={1.4}
        />
      </mesh>
    </Float>
  );
}

function Particles({
  count = 240,
  color,
  opacity,
}: {
  count?: number;
  color: string;
  opacity: number;
}) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.getElapsedTime() * 0.03;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color={color}
        transparent
        opacity={opacity}
        sizeAttenuation
      />
    </points>
  );
}

export function HeroScene({ scrollRef }: { scrollRef: React.RefObject<number> }) {
  const { intensity } = useGradientIntensity();
  // Sur fond clair (écran blanc), les étoiles passent en noir pour rester visibles.
  const lightBackground = luminance(pageColorAt(0.08, intensity)) >= 0.46;
  const starColor = lightBackground ? "#101915" : "#10b981";
  const starOpacity = lightBackground ? 0.6 : 0.55;
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.25} />
      <pointLight position={[4, 2, 3]} intensity={2.2} color="#10b981" />
      <pointLight position={[-5, -2, -2]} intensity={1.1} color="#ffffff" />
      <DistortObject scrollRef={scrollRef} />
      <Particles color={starColor} opacity={starOpacity} />
      <Environment preset="night" />
    </Canvas>
  );
}

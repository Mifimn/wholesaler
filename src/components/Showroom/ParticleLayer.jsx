import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

export default function ParticleLayer({ mode, color }) {
  const ref = useRef();

  // Create unique 3D shapes
  const positions = useMemo(() => {
    if (mode === 'sphere') return random.inSphere(new Float32Array(3000 * 3), { radius: 1.5 });
    if (mode === 'wave') return random.inBox(new Float32Array(3000 * 3), { sides: [3, 1, 2] });
    return random.inSphere(new Float32Array(2500 * 3), { radius: 2 });
  }, [mode]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    // Distinct design movements
    if (mode === 'sphere') {
      ref.current.rotation.y += delta * 0.15;
    } else if (mode === 'wave') {
      ref.current.rotation.x += delta * 0.1;
      ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05;
    } else {
      ref.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={0.007}
        sizeAttenuation={true}
        depthWrite={false}
        blending={2}
      />
    </Points>
  );
}
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, Float, OrbitControls } from '@react-three/drei';

export default function ThreeStage({ children }) {
  return (
    <div className="w-full h-full min-h-[400px] relative rounded-2xl overflow-hidden glass-panel">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        
        {/* The Ambient Tech Lighting */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        {/* The "Neutral HDRI" Environment for realistic reflections */}
        <Environment preset="city" />

        {/* Floating Animation Wrapper for whatever you put inside */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          {children}
        </Float>

        {/* The Shadow-Catching Floor */}
        <ContactShadows 
          position={[0, -1.5, 0]} 
          opacity={0.4} 
          scale={10} 
          blur={2} 
          far={4} 
          color="#F97316" /* Tinting the shadow with your Orange Tech primary color */
        />

        {/* Lets the user spin the icon around */}
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}

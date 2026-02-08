 import { useRef, Suspense } from "react";
 import { Canvas, useFrame } from "@react-three/fiber";
 import { OrbitControls, Float, Environment, MeshTransmissionMaterial, RoundedBox } from "@react-three/drei";
 import * as THREE from "three";
 
 const CNCMachine = () => {
   const groupRef = useRef<THREE.Group>(null);
 
   useFrame((state) => {
     if (groupRef.current) {
       groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
     }
   });
 
   return (
     <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
       <group ref={groupRef}>
         {/* Main body */}
         <RoundedBox args={[2.5, 2, 2]} radius={0.1} position={[0, 0, 0]}>
           <meshStandardMaterial color="#1a365d" metalness={0.8} roughness={0.2} />
         </RoundedBox>
 
         {/* Control panel */}
         <RoundedBox args={[0.8, 1.2, 0.1]} radius={0.05} position={[1.35, 0.3, 0]}>
           <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
         </RoundedBox>
 
         {/* Screen on panel */}
         <mesh position={[1.41, 0.4, 0]}>
           <planeGeometry args={[0.6, 0.8]} />
           <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.5} />
         </mesh>
 
         {/* Spindle column */}
         <RoundedBox args={[0.5, 2.5, 0.5]} radius={0.05} position={[0, 1.2, 0]}>
           <meshStandardMaterial color="#1e40af" metalness={0.9} roughness={0.15} />
         </RoundedBox>
 
         {/* Spindle head */}
         <mesh position={[0, 2.2, 0]}>
           <cylinderGeometry args={[0.15, 0.2, 0.5, 32]} />
           <meshStandardMaterial color="#f5a623" metalness={0.95} roughness={0.1} />
         </mesh>
 
         {/* Tool holder */}
         <mesh position={[0, 1.8, 0]}>
           <cylinderGeometry args={[0.08, 0.15, 0.4, 32]} />
           <meshStandardMaterial color="#94a3b8" metalness={0.95} roughness={0.05} />
         </mesh>
 
         {/* Work table */}
         <RoundedBox args={[2, 0.15, 1.5]} radius={0.02} position={[0, -1.1, 0]}>
           <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
         </RoundedBox>
 
         {/* T-slots on table */}
         {[-0.4, 0, 0.4].map((z, i) => (
           <mesh key={i} position={[0, -1.02, z]}>
             <boxGeometry args={[1.8, 0.02, 0.05]} />
             <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} />
           </mesh>
         ))}
 
         {/* Accent lights */}
         <pointLight position={[0, 2, 1]} intensity={1} color="#f5a623" distance={3} />
         <pointLight position={[-1, 0, 1]} intensity={0.5} color="#3b82f6" distance={2} />
       </group>
     </Float>
   );
 };
 
 const Machine3DViewer = ({ className = "" }: { className?: string }) => {
   return (
     <div className={`w-full h-full min-h-[400px] ${className}`}>
       <Canvas
         camera={{ position: [4, 2, 4], fov: 50 }}
         gl={{ antialias: true, alpha: true }}
         style={{ background: "transparent" }}
       >
         <Suspense fallback={null}>
           <ambientLight intensity={0.4} />
           <directionalLight position={[10, 10, 5]} intensity={1} />
           <spotLight position={[-5, 5, 5]} intensity={0.5} color="#f5a623" />
 
           <CNCMachine />
 
           <OrbitControls
             enableZoom={false}
             enablePan={false}
             autoRotate
             autoRotateSpeed={1}
             maxPolarAngle={Math.PI / 2}
             minPolarAngle={Math.PI / 4}
           />
           <Environment preset="city" />
         </Suspense>
       </Canvas>
     </div>
   );
 };
 
 export default Machine3DViewer;
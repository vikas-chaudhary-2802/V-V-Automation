 import { useRef, useMemo } from "react";
 import { Canvas, useFrame } from "@react-three/fiber";
 import * as THREE from "three";
 
 const Particles = ({ count = 200 }: { count?: number }) => {
   const mesh = useRef<THREE.Points>(null);
   const light = useRef<THREE.PointLight>(null);
 
   const particles = useMemo(() => {
     const temp = [];
     for (let i = 0; i < count; i++) {
       const x = (Math.random() - 0.5) * 20;
       const y = (Math.random() - 0.5) * 20;
       const z = (Math.random() - 0.5) * 20;
       temp.push(x, y, z);
     }
     return new Float32Array(temp);
   }, [count]);
 
   const colors = useMemo(() => {
     const temp = [];
     for (let i = 0; i < count; i++) {
       // Orange/gold accent colors
       temp.push(0.96, 0.6 + Math.random() * 0.2, 0.2 + Math.random() * 0.2);
     }
     return new Float32Array(temp);
   }, [count]);
 
   useFrame((state) => {
     if (mesh.current) {
       mesh.current.rotation.x = state.clock.elapsedTime * 0.03;
       mesh.current.rotation.y = state.clock.elapsedTime * 0.05;
     }
     if (light.current) {
       light.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 3;
       light.current.position.y = Math.cos(state.clock.elapsedTime * 0.3) * 3;
     }
   });
 
   return (
     <>
       <pointLight ref={light} distance={10} intensity={4} color="#f5a623" />
       <points ref={mesh}>
         <bufferGeometry>
           <bufferAttribute
             attach="attributes-position"
             count={particles.length / 3}
             array={particles}
             itemSize={3}
           />
           <bufferAttribute
             attach="attributes-color"
             count={colors.length / 3}
             array={colors}
             itemSize={3}
           />
         </bufferGeometry>
         <pointsMaterial
           size={0.08}
           vertexColors
           transparent
           opacity={0.8}
           sizeAttenuation
           blending={THREE.AdditiveBlending}
         />
       </points>
     </>
   );
 };
 
 const FloatingGrid = () => {
   const gridRef = useRef<THREE.Group>(null);
 
   useFrame((state) => {
     if (gridRef.current) {
       gridRef.current.position.z = (state.clock.elapsedTime * 0.5) % 2;
     }
   });
 
   return (
     <group ref={gridRef} position={[0, -3, 0]} rotation={[-Math.PI / 4, 0, 0]}>
       <gridHelper args={[30, 30, "#f5a623", "#1a365d"]} />
     </group>
   );
 };
 
 const ParticleField = () => {
   return (
     <div className="absolute inset-0 z-0">
       <Canvas
         camera={{ position: [0, 0, 8], fov: 60 }}
         style={{ background: "transparent" }}
         gl={{ alpha: true, antialias: true }}
       >
         <ambientLight intensity={0.2} />
         <Particles count={300} />
         <FloatingGrid />
       </Canvas>
     </div>
   );
 };
 
 export default ParticleField;
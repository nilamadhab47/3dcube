import { Canvas, useFrame } from "@react-three/fiber";
import "./App.scss";
// import { Box } from "@react-three/drei";
import { useRef, useState } from "react";
import { SoftShadows, MeshWobbleMaterial, OrbitControls } from "@react-three/drei";
import { a, useSpring } from "@react-spring/three";

// SoftShadows()

const SpinningMesh = ({ position, args, color, speed }) => {
  const mesh = useRef();
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  const [expand, setExpand] = useState(false);

  const props = useSpring({
    scale: expand ? [1.4,1.4,1.4] : [1,1,1]
  })

  return (
    <a.mesh onClick={()=> setExpand(!expand)} castShadow ref={mesh} position={position} scale={props.scale}>
      <boxGeometry attach="geometry" args={args} />
      <MeshWobbleMaterial attach="material" color={color} speed={speed} factor={0.6}/>
    </a.mesh>
  );
};

function App() {
  return (
    <>
      <Canvas
        colormanagement="true"
        camera={{ position: [-5, 2, 10], fov: 60 }}
        shadowmap="true"
      >
        <ambientLight intensity={0.3} />
        <directionalLight
          castShadow="true"
          position={[0, 10, 0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={-10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />

       

        {/* <group>
          <mesh
            // receiveShadow='true'
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}
          >
            <planeGeometry attach="geometry" args={[100, 100]} />
            <shaderMaterial attach="material" />
          </mesh>
        </group> */}

        <SpinningMesh position={[0, 1, 0]} args={[3, 2, 1]} color="lightblue" speed={2}/>
        <SpinningMesh position={[-2, 1, -5]} color="pink" speed={5}/>
        <SpinningMesh position={[5, 1, -2]} color="pink" speed={5}/>
        <OrbitControls />
      </Canvas>
    </>
  );
}

export default App;

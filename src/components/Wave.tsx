"use client";

import * as THREE from "three";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, Cylinder, Edges, Polyhedron } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { WavyBackground } from "@/components/ui/wavy-bg";

const AnimatedBox = animated(Box);
const AnimatedCylinder = animated(Cylinder);
const AnimatedPyramid = animated(Polyhedron);

const verticesOfPyramid = [0, 1, 0, -1, -1, 1, 1, -1, 1, 1, -1, -1, -1, -1, -1];

const indicesOfFaces = [0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 1, 1, 4, 3, 1, 3, 2];

function Shapes() {
	const boxMeshRef = useRef<THREE.Mesh>(null);
	const pyrMeshRef = useRef<THREE.Mesh>(null);
	const cylMeshRef = useRef<THREE.Mesh>(null);

	const [hovered, setHovered] = useState<"box" | "cylinder" | "pyramid" | null>(null);

	const { scale: boxScale } = useSpring({
		scale: hovered === "box" ? 1.4 : 1.2,
		config: { mass: 1, tension: 150, friction: 50 },
	});

	const { scale: cylScale } = useSpring({
		scale: hovered === "cylinder" ? 1.4 : 1.2,
		config: { mass: 1, tension: 150, friction: 50 },
	});

	const { scale: pyrScale } = useSpring({
		scale: hovered === "pyramid" ? 1.3 : 1.1,
		config: { mass: 1, tension: 150, friction: 50 },
	});

	useFrame(() => {
		if (!boxMeshRef.current || !pyrMeshRef.current || !cylMeshRef.current) return;
		boxMeshRef.current.rotation.x += 0.001;
		boxMeshRef.current.rotation.y -= 0.001;
		pyrMeshRef.current.rotation.y += 0.001;
		cylMeshRef.current.rotation.z -= 0.001;
	});
	return (
		<>
			<AnimatedBox
				onPointerOver={() => setHovered("box")}
				onPointerOut={() => setHovered(null)}
				ref={boxMeshRef}
				scale={boxScale.to((s) => [s, s, s])}
				position={[0, 0, 0]}
				rotation={[0, 1, 2.9]}
			>
				<meshBasicMaterial color={"#fff"} />
				<Edges
					linewidth={2}
					scale={1}
					threshold={15} // Display edges only when the angle between two faces exceeds this value (default=15 degrees)
					color="black"
				/>
			</AnimatedBox>
			<AnimatedCylinder
				onPointerOver={() => setHovered("cylinder")}
				onPointerOut={() => setHovered(null)}
				position={[3, 2, 0]}
				args={[0.5, 0.5]}
				rotation={[0, -5, 3]}
				scale={cylScale.to((s) => [s, s, s])}
				ref={cylMeshRef}
			>
				<meshBasicMaterial color={"#fff"} />
				<Edges
					linewidth={2}
					scale={1}
					threshold={15} // Display edges only when the angle between two faces exceeds this value (default=15 degrees)
					color="black"
				/>
			</AnimatedCylinder>
			<AnimatedPyramid
				onPointerOver={() => setHovered("pyramid")}
				onPointerOut={() => setHovered(null)}
				scale={pyrScale.to((s) => [s, s, s])}
				position={[-3, -2, 0]}
				args={[verticesOfPyramid, indicesOfFaces]}
				rotation={[0, 0, 0]}
				ref={pyrMeshRef}
			>
				{/* <meshNormalMaterial /> */}
				<meshBasicMaterial color={"#fff"} />
				<Edges
					linewidth={2}
					scale={1}
					threshold={15} // Display edges only when the angle between two faces exceeds this value (default=15 degrees)
					color="black"
				/>
			</AnimatedPyramid>
		</>
	);
}

export default function Wave() {
	return (
		<div className="absolute w-screen gridbg">
			<div className="relative w-screen min-h-screen max-w-screen overflow-x-clip overflow-y-visible ">
				<div className="absolute top-0 w-screen h-screen -rotate-[36deg] scale-x-150">
					<WavyBackground
						backgroundFill="transparent"
						colors={["#fff", "#000"]}
						speed="slow"
						blur={0}
						waveOpacity={0.75}
						waveWidth={125}
					/>
				</div>
				<div className="absolute top-0 w-screen h-screen">
					<Canvas>
						<ambientLight intensity={0.5} />
						<pointLight intensity={1700} position={[0, 0, 20]} />
						<Shapes />
					</Canvas>
				</div>
			</div>
		</div>
	);
}

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import React, { useRef, useState } from 'react'
import { Canvas, useFrame, extend, useThree } from 'react-three-fiber'
extend({ OrbitControls });

const CameraControls = () => {

    const {
        camera,
        gl: { domElement }
    } = useThree();

    // Ref to the controls, so that we can update them on every frame using useFrame
    const controls = useRef();
    useFrame(state => controls.current.update());
    return (
        <orbitControls
            ref={controls}
            args={[camera, domElement]}
            enableZoom={true}
/*            maxAzimuthAngle={Math.PI / 4}
            maxPolarAngle={Math.PI}
            minAzimuthAngle={-Math.PI / 4}
            minPolarAngle={0}*/
        />
    );
};



function Pixel(props) {
    const mesh = useRef();
    const [hovered, setHover] = useState(false);

    const [color, setColor] = useState(props.clr.clr);
    return (
        <mesh
            {...props}
            ref={mesh}
            onClick={(e) => {
                setColor(props.color)
                props.clr.clr = props.color
            }
                }
            onPointerOver={(e) => setHover(true)}
            onPointerOut={(e) => setHover(false)}>
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? props.color : color} roughness={0.1} metalness={0.3}/>
        </mesh>
    )
}
function FixedPixel(props) {
    const mesh = useRef();

    const color = props.clr.clr;
    return (
        <mesh
            {...props}
            ref={mesh}>
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} roughness={0.1} metalness={0.3}/>
        </mesh>
    )
}

function Skin(props){
    const group = new THREE.Object3D();
    group.add(Pixel(props));
    return group;
}
export {Pixel, CameraControls, Skin, FixedPixel};
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

const TOUCH_TIMEOUT = 2000;

function Dot(props: JSX.IntrinsicElements['mesh'] & {rPos: MutableRefObject<THREE.Vector3[]>}) {
  const vp = useThree((state) => state.viewport);
  const mesh = useRef<THREE.Mesh>(null!);
  const pos = useRef<Array<THREE.Vector3>>([]);
  const rPos = props.rPos;

  const timeoutHandler = useCallback(() => {
    pos.current = [];
  }, [pos.current]);

  const lastTouchTimeout = useRef<NodeJS.Timeout>(setTimeout(timeoutHandler, TOUCH_TIMEOUT));

  const refreshTimer = useCallback(() => {
    clearInterval(lastTouchTimeout.current);
    lastTouchTimeout.current = setTimeout(timeoutHandler, TOUCH_TIMEOUT);
  }, [lastTouchTimeout.current]);

  const moveHandler = useCallback((event: MouseEvent) => {
    if (pos.current.length != 1) {
      pos.current = [new THREE.Vector3(1,1,1)];
    }
    pos.current[0].x = ((event.clientX / window.innerWidth) * 2 - 1) * vp.width / 2;
    pos.current[0].y = -((event.clientY / window.innerHeight) * 2 - 1) * vp.height / 2;

    refreshTimer();
  }, [vp, refreshTimer]);

  const touchMoveHandler = useCallback((event: TouchEvent) => {
    if (pos.current.length < event.touches.length) {
      pos.current.push(new THREE.Vector3(1));
    } else if (pos.current.length > event.touches.length) {
      pos.current.pop();
    }

    for (let i = 0; i < event.touches.length; i++) {
      const touch = event.touches.item(i);
      let p = new THREE.Vector3(1,1,1);
      p.x = ((touch.clientX / window.innerWidth) * 2 - 1) * vp.width / 2;
      p.y = -((touch.clientY / window.innerHeight) * 2 - 1) * vp.height / 2;
      pos.current[i] = p;
    }

    refreshTimer();
  }, [vp, refreshTimer]);

  const calcMaxScale = useCallback((dF: number, sF: number, pos: THREE.Vector3[]) => {
    let maxScale = 0.2 * sF;
    for (const p of pos) {
      let d = Math.sqrt(Math.pow(p.x - mesh.current.position.x, 2) + Math.pow(p.y - mesh.current.position.y, 2));
      d = Math.max(d, 1);

      const scale = Math.min(Math.max(1 - d / dF * p.z, 0), 1) * sF;

      if (p.z > 0 && scale > maxScale) {
        maxScale = scale;
      }
    }

    if (maxScale > 0.1) {
      maxScale = 0.1;
    } else if (maxScale < 0.02) {
      maxScale = 0.02;
    }

    return maxScale;
  }, []);

  useFrame((state) => {
    const W = vp.width;
    const H = vp.height;
    const T = W < H ? H : W;
    const f = T / 20;

    const dF = 5;
    const sF = 0.09 * f;
    let maxScale = 0.15 * sF;

    if (pos.current.length > 0) {
      maxScale = calcMaxScale(dF, sF, pos.current);
    } else {
      maxScale = calcMaxScale(dF, sF, rPos.current);
    }
    
    mesh.current.scale.set(maxScale, maxScale, maxScale);
  });

  useEffect(() => {
    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('touchmove', touchMoveHandler);

    return () => {
      document.removeEventListener('mousemove', moveHandler);
      document.removeEventListener('touchmove', touchMoveHandler);
    }
  }, [moveHandler, touchMoveHandler]);

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={0.01}
    >
      <sphereGeometry />
      <meshStandardMaterial color='#4E598C'/>
    </mesh>
  );
}

const R_AMOUNT = 8;

function _DotBackground() {
  const vp = useThree((state) => state.viewport);
  const [dots, setDots] = useState<Array<JSX.Element>>([]);
  const rPos = useRef<THREE.Vector3[]>([]);
  const sPos = useRef<THREE.Vector2[]>([]);

  useFrame((state) => {
    const W = Math.floor(vp.width / 2) + 1;
    const H = Math.floor(vp.height / 2) + 1; 

    if (rPos.current.length == 0) {
      for (let i = 0; i < R_AMOUNT; i++) {
        const v = new THREE.Vector3(1,1,1);
        v.x = Math.random() * W * 2 - W;
        v.y = Math.random() * H * 2 - H;
        v.z = 5;
        rPos.current.push(v);

        sPos.current.push(new THREE.Vector2(Math.random() * 2, state.clock.getElapsedTime()));
      }
    } else {
      for (let i = 0; i < R_AMOUNT; i++) {
        const d = (state.clock.getElapsedTime() - sPos.current[i].y) * sPos.current[i].x;
        const z = Math.cos(d) * 2 + 3

        if (d > 2 * Math.PI) {
          const v = new THREE.Vector3(1,1,1);
          v.x = Math.random() * W * 2 - W;
          v.y = Math.random() * H * 2 - H;
          v.z = 0;
          rPos.current[i] = v;
          sPos.current[i] = new THREE.Vector2(Math.random() * 2, state.clock.getElapsedTime());
        } else {
          rPos.current[i].z = z;
        }
      }
    }
  });

  useEffect(() => {
    let W = Math.floor(vp.width / 2) + 1;
    let H = Math.floor(vp.height / 2) + 1; 

    let T: number;
    if (W < H) {
      T = H;
    } else {
      T = W;
    }

    const f = T / 20;


    const _dots = []
    for (let i = -W; i <= W; i += f) {
      for (let j = -H; j <= H; j += f) {
        _dots.push(<Dot position={[i, j, 0]} key={`dot-${i}-${j}`} rPos={rPos}/>);
      }
    }

    setDots(_dots);
  }, [vp]);

  return (
    <>
      {dots}
    </>
  );
};

function FollowDot() {
  const vp = useThree((state) => state.viewport);
  const mesh = useRef<THREE.Mesh>(null!);
  const pos = useRef<THREE.Vector2>(new THREE.Vector2());

  const moveHandler = useCallback((event: MouseEvent) => {
    pos.current.x = ((event.clientX / window.innerWidth) * 2 - 1) * vp.width / 2;
    pos.current.y = ((event.clientY / window.innerHeight) * 2 - 1) * vp.height / 2;
  }, [vp]);

  useFrame((state) => {
    mesh.current.position.setX(pos.current.x);
    mesh.current.position.setY(-pos.current.y);
  });

  useEffect(() => {
    document.addEventListener('mousemove', moveHandler);

    return () => {
      document.removeEventListener('mousemove', moveHandler);
    }
  }, [moveHandler]);

  return (
    <mesh
      ref={mesh}
    >
      <boxGeometry />
      <meshStandardMaterial color='black' />
    </mesh>
  );
}

function DotBackground() {
  return (
    <Canvas
      orthographic
      style={{zIndex: -1}}
      camera={{
        zoom: 50,
      }}
    >
      <ambientLight />
      <_DotBackground />
    </Canvas>
  )
}

export default DotBackground;
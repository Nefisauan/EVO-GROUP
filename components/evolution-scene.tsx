"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  RoundedBox,
  ContactShadows,
  Lightformer,
} from "@react-three/drei";
import {
  Suspense,
  useEffect,
  useRef,
  useState,
  Component,
  type ReactNode,
} from "react";
import * as THREE from "three";
class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <Fallback /> : this.props.children;
  }
}
function Fallback() {
  return (
    <div className="scene-fallback" aria-hidden="true">
      <div />
      <div />
      <div />
    </div>
  );
}
function Sculpture({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const pieces = useRef<(THREE.Mesh | null)[]>([]);
  const progress = useRef(0);
  useEffect(() => {
    const scroll = () => {
      progress.current = Math.min(
        window.scrollY / (window.innerHeight * 0.65),
        1,
      );
    };
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  useFrame((state, delta) => {
    if (!group.current) return;
    const t = reduced ? 0 : state.clock.elapsedTime;
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      -0.52 + state.pointer.x * 0.14 + Math.sin(t * 0.15) * 0.08,
      3,
      delta,
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      0.27 + state.pointer.y * 0.08,
      3,
      delta,
    );
    pieces.current.forEach((mesh, i) => {
      if (!mesh) return;
      const alignment = reduced ? 1 : progress.current;
      const offset = 1 - alignment;
      mesh.position.x = THREE.MathUtils.damp(
        mesh.position.x,
        (i % 2 ? 1 : -1) * offset * 0.24 * Math.sin(i * 4),
        3,
        delta,
      );
      mesh.rotation.z = THREE.MathUtils.damp(
        mesh.rotation.z,
        (i - 5) * 0.022 * offset,
        3,
        delta,
      );
    });
  });
  return (
    <group ref={group} rotation={[0.27, -0.52, -0.32]}>
      <Float
        speed={reduced ? 0 : 0.9}
        rotationIntensity={0.035}
        floatIntensity={0.16}
      >
        {Array.from({ length: 11 }, (_, i) => (
          <group key={i} position={[0, (i - 5) * 0.26, 0]}>
            <RoundedBox
              ref={(el) => {
                pieces.current[i] = el;
              }}
              args={[2.8, 0.16, 1.5]}
              radius={0.065}
              smoothness={5}
            >
              <meshPhysicalMaterial
                color={
                  i === 5 ? "#588edc" : i % 3 === 0 ? "#d5e1ec" : "#9baebf"
                }
                metalness={0.95}
                roughness={0.23}
                clearcoat={1}
                clearcoatRoughness={0.18}
              />
            </RoundedBox>
            {i === 5 && (
              <RoundedBox
                args={[2.68, 0.025, 1.48]}
                position={[0, -0.105, 0]}
                radius={0.01}
              >
                <meshStandardMaterial
                  color="#80b8ff"
                  emissive="#377dff"
                  emissiveIntensity={3}
                />
              </RoundedBox>
            )}
          </group>
        ))}
        <group rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]}>
          <RoundedBox args={[3.08, 0.19, 1.55]} radius={0.06}>
            <meshPhysicalMaterial
              color="#8ca4bc"
              metalness={1}
              roughness={0.2}
            />
          </RoundedBox>
        </group>
      </Float>
    </group>
  );
}
export default function EvolutionScene() {
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    try {
      const canvas = document.createElement("canvas");
      setReady(!!(canvas.getContext("webgl2") || canvas.getContext("webgl")));
    } catch {
      setReady(false);
    }
  }, []);
  return (
    <div
      className="evolution-scene"
      role="img"
      aria-label="Interactive metallic EVO sculpture: fragmented layers align into a connected structure as you scroll"
    >
      {ready ? (
        <SceneBoundary>
          <Canvas
            frameloop={reduced ? "demand" : "always"}
            dpr={[1, 1.6]}
            camera={{ position: [0, 0, 6.8], fov: 40 }}
            gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
          >
            <ambientLight intensity={0.65} />
            <directionalLight
              position={[3, 6, 4]}
              intensity={5}
              color="#d9eaff"
            />
            <pointLight position={[-4, -2, 2]} intensity={35} color="#397aff" />
            <Suspense fallback={null}>
              <Environment resolution={128}>
                <Lightformer
                  form="rect"
                  intensity={4}
                  position={[0, 5, -2]}
                  scale={[10, 3, 1]}
                  rotation={[Math.PI / 2, 0, 0]}
                />
                <Lightformer
                  form="rect"
                  intensity={3}
                  position={[-5, 0, 3]}
                  scale={[3, 7, 1]}
                  rotation={[0, Math.PI / 3, 0]}
                />
                <Lightformer
                  form="rect"
                  intensity={2}
                  color="#739bd4"
                  position={[5, 1, 2]}
                  scale={[2, 8, 1]}
                  rotation={[0, -Math.PI / 3, 0]}
                />
              </Environment>
              <Sculpture reduced={reduced} />
              <ContactShadows
                position={[0, -2.4, 0]}
                opacity={0.25}
                scale={10}
                blur={3}
                far={5}
              />
            </Suspense>
          </Canvas>
        </SceneBoundary>
      ) : (
        <Fallback />
      )}
    </div>
  );
}

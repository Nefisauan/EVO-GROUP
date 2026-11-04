"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Html, Lightformer, RoundedBox } from "@react-three/drei";
import {
  Component,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import * as THREE from "three";
import { journey } from "@/lib/content";

type SceneProps = {
  active: number;
  connected: boolean;
  onSelect: (index: number) => void;
  paused: boolean;
};
const positions: [number, number, number][] = [
  [-3.5, -0.45, 0.45],
  [-1.8, -0.2, -0.55],
  [0, 0.05, 0.3],
  [1.8, 0.3, -0.55],
  [3.5, 0.65, 0.25],
];
const cyan = "#83e5db";
class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <StaticJourney /> : this.props.children;
  }
}
export function StaticJourney() {
  return (
    <div className="journey-fallback" aria-hidden="true">
      {journey.map((s, i) => (
        <div key={s.name}>
          <span>0{i + 1}</span>
          <i />
          <strong>{s.name}</strong>
        </div>
      ))}
    </div>
  );
}
function CameraRig() {
  const { camera, size } = useThree();
  useEffect(() => {
    if (camera instanceof THREE.OrthographicCamera) {
      camera.zoom = Math.min(size.width / 10.1, size.height / 5.5);
      camera.position.set(3.5, 5.5, 10);
      camera.lookAt(0, 0.05, 0);
      camera.updateProjectionMatrix();
    }
  }, [camera, size]);
  return null;
}
function Glyph({ index, active }: { index: number; active: boolean }) {
  const material = (
    <meshPhysicalMaterial
      color={active ? "#d4f7f0" : "#849bab"}
      metalness={0.83}
      roughness={0.23}
      clearcoat={1}
    />
  );
  if (index === 0)
    return (
      <group>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.35, 0.07, 12, 48]} />
          {material}
        </mesh>
        {[0, 1, 2].map((i) => (
          <mesh
            key={i}
            position={[
              Math.cos(i * 2.09) * 0.25,
              0.24,
              Math.sin(i * 2.09) * 0.25,
            ]}
          >
            <sphereGeometry args={[0.09, 14, 14]} />
            <meshStandardMaterial
              color={cyan}
              emissive={cyan}
              emissiveIntensity={active ? 1.2 : 0.2}
            />
          </mesh>
        ))}
      </group>
    );
  if (index === 1)
    return (
      <group>
        <mesh rotation={[0, 0.4, 0]} position={[0, 0.17, 0]}>
          <octahedronGeometry args={[0.43]} />
          {material}
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.08, 0]}>
          <torusGeometry args={[0.48, 0.018, 8, 60]} />
          <meshBasicMaterial color={cyan} />
        </mesh>
      </group>
    );
  if (index === 2)
    return (
      <group rotation={[0, -0.2, 0.15]}>
        {[-1, 1].map((i) => (
          <mesh
            key={i}
            position={[i * 0.17, 0.1, 0]}
            rotation={[0, Math.PI / 2, 0]}
          >
            <torusGeometry args={[0.29, 0.075, 12, 40]} />
            {material}
          </mesh>
        ))}
      </group>
    );
  if (index === 3)
    return (
      <group>
        {[0, 1, 2].map((i) => (
          <RoundedBox
            key={i}
            args={[0.64, 0.105, 0.55]}
            radius={0.03}
            position={[0, i * 0.19 - 0.1, 0]}
          >
            {material}
          </RoundedBox>
        ))}
      </group>
    );
  return (
    <group>
      {[0.26, 0.48, 0.78].map((height, i) => (
        <RoundedBox
          key={i}
          args={[0.19, height, 0.24]}
          radius={0.025}
          position={[(i - 1) * 0.28, height / 2 - 0.12, 0]}
        >
          <meshPhysicalMaterial
            color={i === 2 ? cyan : "#b1cad5"}
            emissive={i === 2 ? cyan : "#000"}
            emissiveIntensity={0.13}
            roughness={0.22}
            metalness={0.6}
          />
        </RoundedBox>
      ))}
    </group>
  );
}
function Station({
  index,
  active,
  connected,
  onSelect,
  reduced,
}: {
  index: number;
  active: number;
  connected: boolean;
  onSelect: (i: number) => void;
  reduced: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const glyph = useRef<THREE.Group>(null);
  const [hover, setHover] = useState(false);
  const selected = active === index;
  useFrame(({ clock }, delta) => {
    if (group.current) {
      const target = positions[index][1] + (selected ? 0.16 : 0);
      group.current.position.y = reduced
        ? target
        : THREE.MathUtils.damp(group.current.position.y, target, 5, delta);
    }
    if (glyph.current && !reduced) {
      glyph.current.rotation.y =
        Math.sin(clock.elapsedTime * 0.4 + index) * 0.12;
      glyph.current.position.y =
        0.52 + Math.sin(clock.elapsedTime * 0.8 + index) * 0.035;
    }
  });
  return (
    <group
      ref={group}
      position={positions[index]}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(index);
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHover(true);
      }}
      onPointerOut={() => setHover(false)}
    >
      <RoundedBox args={[1.25, 0.19, 1.16]} radius={0.07} smoothness={3}>
        <meshPhysicalMaterial
          color={selected ? "#314c5a" : "#17242e"}
          roughness={0.27}
          metalness={0.72}
          clearcoat={1}
        />
      </RoundedBox>
      <RoundedBox
        args={[1.14, 0.025, 1.05]}
        position={[0, 0.108, 0]}
        radius={0.05}
        smoothness={2}
      >
        <meshStandardMaterial
          color={connected ? cyan : "#d89b82"}
          emissive={connected ? cyan : "#d89b82"}
          emissiveIntensity={selected ? 1.2 : 0.35}
          transparent
          opacity={selected || hover ? 0.9 : 0.28}
        />
      </RoundedBox>
      <RoundedBox
        args={[1.07, 0.06, 0.98]}
        position={[0, 0.155, 0]}
        radius={0.045}
        smoothness={2}
      >
        <meshPhysicalMaterial
          color="#14212a"
          metalness={0.6}
          roughness={0.25}
        />
      </RoundedBox>
      <group ref={glyph} position={[0, 0.52, 0]}>
        <Glyph index={index} active={selected || hover} />
      </group>
      <Html
        center
        position={[0, -0.48, 0.57]}
        zIndexRange={[5, 0]}
        style={{ pointerEvents: "none" }}
      >
        <span className={`station-label ${selected ? "selected" : ""}`}>
          <small>0{index + 1}</small>
          {journey[index].name}
        </span>
      </Html>
    </group>
  );
}
function Connections({
  connected,
  reduced,
}: {
  connected: boolean;
  reduced: boolean;
}) {
  const curves = useMemo(
    () =>
      positions.slice(0, -1).map((p, i) => {
        const next = positions[i + 1];
        return new THREE.CatmullRomCurve3([
          new THREE.Vector3(p[0] + 0.5, p[1] - 0.02, p[2]),
          new THREE.Vector3(
            (p[0] + next[0]) / 2,
            p[1] - 0.06,
            (p[2] + next[2]) / 2,
          ),
          new THREE.Vector3(next[0] - 0.5, next[1] - 0.02, next[2]),
        ]);
      }),
    [],
  );
  const particles = useRef<(THREE.Mesh | null)[]>([]);
  const vector = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ clock }) => {
    if (reduced) return;
    particles.current.forEach((mesh, i) => {
      if (!mesh) return;
      const curve = curves[Math.floor(i / 2)];
      const t = (clock.elapsedTime * 0.28 + (i % 2) * 0.5) % 1;
      curve.getPointAt(connected ? t : t * 0.42, vector);
      mesh.position.copy(vector);
      mesh.visible = connected || t < 0.7;
    });
  });
  return (
    <group>
      {curves.map((curve, i) => (
        <group key={i}>
          <mesh>
            <tubeGeometry args={[curve, 32, 0.035, 8, false]} />
            <meshStandardMaterial
              color={connected ? "#4d9f9c" : "#796254"}
              emissive={connected ? "#54d5cd" : "#c78468"}
              emissiveIntensity={connected ? 0.7 : 0.2}
              transparent
              opacity={connected ? 0.8 : 0.4}
            />
          </mesh>
          {[0, 1].map((j) => (
            <mesh
              key={j}
              ref={(el) => {
                particles.current[i * 2 + j] = el;
              }}
              position={curve.getPointAt(j * 0.5)}
            >
              <sphereGeometry args={[0.055, 10, 10]} />
              <meshBasicMaterial color={connected ? "#c4fff1" : "#e3a287"} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}
function BusinessSystem({ active, connected, onSelect, paused }: SceneProps) {
  const root = useRef<THREE.Group>(null);
  useFrame(({ pointer }, delta) => {
    if (!root.current || paused) return;
    root.current.rotation.y = THREE.MathUtils.damp(
      root.current.rotation.y,
      pointer.x * 0.07,
      3,
      delta,
    );
    root.current.rotation.x = THREE.MathUtils.damp(
      root.current.rotation.x,
      -pointer.y * 0.025,
      3,
      delta,
    );
  });
  return (
    <group ref={root}>
      <Connections connected={connected} reduced={paused} />
      {journey.map((_, i) => (
        <Station
          key={i}
          index={i}
          active={active}
          connected={connected}
          onSelect={onSelect}
          reduced={paused}
        />
      ))}
      <RoundedBox
        args={[9.1, 0.1, 3.65]}
        position={[0, -1.05, -0.1]}
        radius={0.15}
        smoothness={3}
      >
        <meshPhysicalMaterial
          color="#0b1820"
          roughness={0.45}
          metalness={0.65}
        />
      </RoundedBox>
      <gridHelper
        args={[9, 24, "#223b47", "#142630"]}
        position={[0, -0.988, -0.1]}
        scale={[1, 1, 0.39]}
      />
    </group>
  );
}
export default function EvolutionScene(props: SceneProps) {
  const [supported, setSupported] = useState(false);
  const [visible, setVisible] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    try {
      const probe = document.createElement("canvas");
      const context = probe.getContext("webgl2");
      setSupported(!!context);
      context?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      setSupported(false);
    }
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "100px" },
    );
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      className="business-scene"
      ref={root}
      aria-label="Interactive 3D business journey. Select a stage using the buttons below."
    >
      {supported ? (
        <SceneBoundary>
          <Canvas
            orthographic
            dpr={[1, 1.5]}
            camera={{ position: [3.5, 5.5, 10], zoom: 60, near: 0.1, far: 60 }}
            frameloop={!visible ? "never" : props.paused ? "demand" : "always"}
            gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
          >
            <CameraRig />
            <ambientLight intensity={0.8} />
            <directionalLight
              position={[2, 7, 5]}
              intensity={3}
              color="#d2e9ff"
            />
            <pointLight position={[0, 2, -3]} intensity={18} color="#6ce0d1" />
            <Suspense fallback={null}>
              <Environment resolution={128}>
                <Lightformer
                  position={[0, 5, -2]}
                  rotation={[Math.PI / 2, 0, 0]}
                  scale={[9, 3, 1]}
                  intensity={3}
                />
                <Lightformer
                  position={[-5, 2, 4]}
                  rotation={[0, Math.PI / 3, 0]}
                  scale={[3, 8, 1]}
                  intensity={4}
                />
                <Lightformer
                  position={[5, 1, 2]}
                  rotation={[0, -Math.PI / 3, 0]}
                  scale={[2, 7, 1]}
                  intensity={2}
                  color="#9ecbd6"
                />
              </Environment>
              <BusinessSystem {...props} />
            </Suspense>
          </Canvas>
        </SceneBoundary>
      ) : (
        <StaticJourney />
      )}
    </div>
  );
}

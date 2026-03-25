import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function AuroraScene() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Custom shader for aurora borealis effect
  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;
  
  const fragmentShader = `
    uniform float time;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    // Simplex noise (simplified)
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1; i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m; m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = vUv;
      
      // Moving noise layers
      float noise1 = snoise(uv * 3.0 + vec2(time * 0.1, time * 0.05));
      float noise2 = snoise(uv * 5.0 - vec2(time * 0.15, 0.0));
      
      float auroraMix = (noise1 + noise2) * 0.5 + 0.5;
      
      // Indigo: 0.3, 0.36, 1.0
      // Violet: 0.5, 0.2, 0.8
      // Soft Teal: 0.1, 0.7, 0.6
      vec3 color1 = vec3(0.3, 0.2, 0.6); // Deep violet
      vec3 color2 = vec3(0.2, 0.7, 0.6); // Soft teal
      vec3 color3 = vec3(0.5, 0.1, 0.7); // Purple
      
      vec3 finalColor = mix(color1, color2, auroraMix);
      finalColor = mix(finalColor, color3, snoise(uv * 2.0 + time * 0.05));
      
      // Add a gradient fade to the bottom to blend into the UI
      float fade = smoothstep(0.0, 0.5, uv.y);
      
      gl_FragColor = vec4(finalColor * 1.5, fade * auroraMix * 0.8);
    }
  `;

  const uniforms = useRef({
    time: { value: 0 }
  });

  useFrame((state) => {
    if (uniforms.current) {
      uniforms.current.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[10, 4, 32, 32]} />
      <shaderMaterial 
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
        transparent={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

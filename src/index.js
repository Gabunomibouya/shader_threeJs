import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vertexShader from './shaders/vertexShader.glsl';
import fragmentShader from './shaders/fragmentShader.glsl';
import textureImg from './textures/pexels-frank-cone-2258536.jpg';
import * as dat from 'lil-gui';

const gui = new dat.GUI({ width: 400 });

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Canvas
const canvas = document.querySelector(".webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(textureImg);
scene.background = texture;

// Geometry
const geometry = new THREE.PlaneGeometry(20, 20, 128, 128);

//Color
const colorObject = {};
colorObject.surfaceColor = '#655a43';
colorObject.depthColor = '#d2940f';

// Material
// const material = new THREE.MeshBasicMaterial();
const material = new THREE.ShaderMaterial({
  uniforms: {
    uWaveLength: { value: 0.5 },
    uFrequency: { value: new THREE.Vector2(8.0, 6.0) },
    uTime: { value: 0 },
    uWaveSpeed: { value: 0.68 },
    uSurfaceColor: { value: new THREE.Color(colorObject.surfaceColor) },
    uDepthColor: { value: new THREE.Color(colorObject.depthColor) },
    uColorOffset: { value: 0.19 },
    uColorMultiplier: { value: 4.5 },
    uSmallWaveElevation: { value: 0.785 },
    uSmallWaveFrequency: { value: 8.68 },
    uSmallWaveSpeed: { value: 0.68 }
  },
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  side: THREE.DoubleSide,
  wireframe: false
});


gui.add(material.uniforms.uWaveLength, 'value')
  .min(0).max(1).step(0.001).name('uWaveLength');

gui.add(material.uniforms.uFrequency.value, 'x')
  .min(0).max(10).step(0.001).name('uFrequencyX');
gui.add(material.uniforms.uFrequency.value, 'y')
  .min(0).max(10).step(0.001).name('uFrequencyY');

gui.add(material.uniforms.uWaveSpeed, 'value')
  .min(0).max(6).step(0.001).name('uSpeed');

gui.add(material.uniforms.uColorOffset, 'value')
  .min(0).max(1).step(0.001).name('uColorOffset');

gui.add(material.uniforms.uColorMultiplier, 'value')
  .min(0).max(10).step(0.001).name('uColorMultiplier');

gui.add(material.uniforms.uSmallWaveElevation, 'value')
  .min(0).max(1).step(0.0001).name('uSmallWaveElevation');

gui.add(material.uniforms.uSmallWaveFrequency, 'value')
  .min(0).max(30).step(0.001).name('uSmallWaveFrequency');

gui.add(material.uniforms.uSmallWaveSpeed, 'value')
  .min(0).max(4).step(0.001).name('uSmallWaveSpeed');

gui.addColor(colorObject, 'surfaceColor').onChange(() => {
  material.uniforms.uSurfaceColor.value.set(colorObject.surfaceColor);
});

gui.addColor(colorObject, 'depthColor').onChange(() => {
  material.uniforms.uDepthColor.value.set(colorObject.depthColor);
});




// gui.show(false);


// Mesh
const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.x = Math.PI / 2;
scene.add(mesh);



// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 0.45, 0);
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const animate = () => {
  //時間取得
  const elapsedTime = clock.getElapsedTime();

  material.uniforms.uTime.value = elapsedTime;

  // camera.position.set(Math.sin(elapsedTime * 0.2), 0.7, Math.cos(elapsedTime  * 0.2));
  camera.position.x = (Math.sin(elapsedTime * 0.2)) * 1.0;
  camera.position.z = (Math.cos(elapsedTime * 0.2)) * 1.0;

  camera.lookAt(Math.cos(elapsedTime),
    Math.sin(elapsedTime) * 0.6,
    Math.sin(elapsedTime) * 0.4);


  // controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

animate();

import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";
import { GLTFLoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

const contenedor = document.getElementById("contenido1");
const scene = new THREE.Scene();

function getRenderSize(){
    return {
        width: window.innerWidth,
        height: window.innerHeight
    };
}

const camera = new THREE.PerspectiveCamera(
    50, // FOV
    window.innerWidth / window.innerHeight, // Aspect Ratio
    0.1, // Distancia 
    1000 // Distancia maxima visible
)
camera.position.set(0, 1, 3);

//Render
const renderer = new THREE.WebGLRenderer(
    {
        alpha:true,
        antialias:true
    }
);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

function resizeRenderer(){
    const { width, height } = getRenderSize();

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

resizeRenderer();
contenedor.appendChild(renderer.domElement);
window.addEventListener("resize", resizeRenderer);
window.addEventListener("orientationchange", resizeRenderer);


//LUZ
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);



//Conejo

let mixer;
const clock = new THREE.Clock();

const loader = new GLTFLoader();
const conejoUrl = new URL("../3d/conejo.glb", import.meta.url).href;

  loader.load(
    conejoUrl,
    (gltf) => {
      const model = gltf.scene;
      scene.add(model);

      // Opcional: escalar o mover
      model.scale.set(0.45, 0.45, 0.45);
      model.position.set(1.7, 0.2, 0);
      model.rotation.set(0, 15, 0);

      mixer = new THREE.AnimationMixer(model);

      gltf.animations.forEach((clip) => {
        const action = mixer.clipAction(clip);
        action.play();
      });

      animate();
    },
    (progress) => {
      console.log((progress.loaded / progress.total) * 100 + '% cargado');
    },
    (error) => {
      console.error('Error cargando el modelo', error);
    }
  );


//animate 
function animate(){
    requestAnimationFrame(animate);

    if (mixer) {
        mixer.update(clock.getDelta());
    }

    renderer.render(scene, camera);
}

animate();

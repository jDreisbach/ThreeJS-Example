import { OrbitControls } from './orbit.js';

//create the scene
const scene = new THREE.Scene();

//set camera perspective
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

camera.position.set(0,20,100);

//initialize the renderer
let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setClearColor("#0F0F0F");
renderer.setSize(window.innerWidth, window.innerHeight);

//append the renderer to the dom
document.body.appendChild(renderer.domElement);

let controls = new OrbitControls( camera, renderer.domElement );


//Making our objects responsive
window.addEventListener('resize', ()=>{
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
    controls.update();
});

//create light
let light = new THREE.PointLight(0xFFFFFF, 5, 1000);
light.position.set(100,-100,5);
scene.add(light);

let mtlLoader = new THREE.MTLLoader();
mtlLoader.load('./assets/skull.mtl', (materials)=>{
    materials.preload();

    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('./assets/skull.obj', (object)=>{
        scene.add(object);

        object.position.z -= -20;
        object.rotation.x = 250;
    })
})

const render = () => {
    requestAnimationFrame(render);
    controls.update();
    
    renderer.render(scene, camera);
};

render();
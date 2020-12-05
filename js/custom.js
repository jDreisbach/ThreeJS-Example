//create the scene
const scene = new THREE.Scene();

//set camera perspective
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 25;

//initialize the renderer
let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setClearColor("#DDDDDD");
renderer.setSize(window.innerWidth, window.innerHeight);

//append the renderer to the dom
document.body.appendChild(renderer.domElement);

//Making our objects responsive
window.addEventListener('resize', ()=>{
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
});

//create light
let light = new THREE.PointLight(0xFFFFFF, 1.4, 1000);
light.position.set(0,15,15);
scene.add(light);

let glass;
let sphere;

//Create a material
let mtlLoader = new THREE.MTLLoader();
mtlLoader.load('./assets/glass.mtl', (materials)=>{
    materials.preload();

    //load in the object
    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('./assets/Glass.obj', (object)=>{
        
        scene.add(object);
        glass=object;
        console.log(glass);
        
        object.position.z -= 270;
        object.rotation.x = -270;
        
    });
    
});
mtlLoader = new THREE.MTLLoader();
mtlLoader.load('./assets/sphere.mtl', (materials)=>{
    materials.preload();

    //load in the object
    objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load('./assets/sphere.obj', (object)=>{
      
        scene.add(object);
        sphere = object;
        
        object.position.z -= 320;
        object.rotation.z = 100;
        object.position.y = 20;
    });
});

const render = () => {
    requestAnimationFrame(render);

    //rotate objects indefinitely
    glass.rotation.y -= .1;
    sphere.rotation.y += .2;
    console.log(sphere)
    renderer.render(scene, camera);
};

render();


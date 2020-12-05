let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(
    75, //field of view
    window.innerWidth/window.innerHeight, //aspect ratio
    0.1, //near plane
    1000 //far plane
);
camera.position.z = 5;

let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

//make it responsive
window.addEventListener('resize', ()=>{
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth/window.innerHeight;

    camera.updateProjectionMatrix();
});

let raycaster= new THREE.Raycaster();
let mouse = new THREE.Vector2();

let geometry = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshLambertMaterial({ color: 0xF7F7F7 });
//let mesh = new THREE.Mesh(geometry, material);

//scene.add(mesh);

meshX = -10;
for(let i=0; i<15; i++){
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - .5) * 10; 
    mesh.position.y = (Math.random() - .5) * 10; 
    mesh.position.z = (Math.random() - .5) * 10; 
    
    scene.add(mesh);
    meshX += 1;
    
}

let light = new THREE.PointLight(0xFFFFFF, 1, 1000);
light.position.set(0, 0, 0);
scene.add(light);

light = new THREE.PointLight(0xFFFFFF, 2, 1000);
light.position.set(5, 10, 25);
scene.add(light);
const render = () => {
    requestAnimationFrame(render);

    renderer.render(scene, camera);
};

const onMouseMove = (event) => {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 -1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObjects(scene.children, true);
    for (let i=0; i<intersects.length; i++){
        this.tl = new TimelineMax();
        this.tl.to(intersects[i].object.scale, 1, { x: 4, ease: Expo.easeOut })
        this.tl.to(intersects[i].object.scale, .5, { x: .5, ease: Expo.easeOut })
        this.tl.to(intersects[i].object.position, .5, { x: 2, ease: Expo.easeOut })
        this.tl.to(intersects[i].object.rotation, .5, { y: Math.PI*.5, ease: Expo.easeOut }, "=-1.5")
    }
}
window.addEventListener('mousemove', onMouseMove)
render();





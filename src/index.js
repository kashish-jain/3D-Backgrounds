import {
    addObjects,
    objectRotation
} from "./objects.js"
import {
    addLights,
    rotateLights
} from "./lights.js"
import {
    addSmoke,
    evolveSmoke
} from "./smoke.js"
// import {addInteractivity} from "./mouseEffects.js"


let scene, camera, renderer, container;
let mouse = new THREE.Vector2();
container = document.getElementById("canvas");

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color('black');
    createCamera();
    createRenderer();
    container.appendChild(renderer.domElement);
    testing();
    let lightList = addLights(scene);
    let objectList = addObjects(scene, "box");
    let smokeParticles = addSmoke(scene);
    renderer.setAnimationLoop(() => {
        update(lightList, objectList, smokeParticles);
        render();
    });
}

function createCamera() {
    let aspectRatio = container.clientWidth / container.clientHeight;
    camera = new THREE.PerspectiveCamera(50, aspectRatio, 1, 300);
    camera.position.set(0, 0, 150);
    camera.lookAt(0, 0, 0);
}

function createRenderer() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
}

let newt = 0;
let lightoffset = 0;

function update(lightList, objectList, smokeParticles) {
    evolveSmoke(smokeParticles);
    newt += 0.01;
    lightoffset += 0.01;
    objectRotation(objectList);
    rotateLights(lightoffset, 75, "vertical", lightList);
    // camera.position.x = Math.sin(newt * 0.1) * 150;
    // camera.position.z = Math.cos( newt * 0.1 ) * 150;
    // camera.lookAt( 0, 0, 0 );
}

function testing() {

}

function createControls() {}


var raycaster = new THREE.Raycaster();

function onMouseMove(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    addInteractivity(raycaster, mouse, camera, scene);

}

function render() {

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener('resize', onWindowResize);
// window.addEventListener( 'click', onMouseMove, false );

init();
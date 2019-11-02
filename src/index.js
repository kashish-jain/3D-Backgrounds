/*jshint esversion: 6 */
import {addObjects, objectRotation} from "./objects.js"
import {addLights, rotateLights} from "./lights.js"

let scene, camera, renderer, container;
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
    renderer.setAnimationLoop(() => {
        update(lightList, objectList);
        render();
    });
}

function createCamera() {
    let aspectRatio = container.clientWidth/container.clientHeight;
    camera = new THREE.PerspectiveCamera(50, aspectRatio, 1, 300);
    camera.position.set( 0, 0, 150 );
    camera.lookAt( 0, 0, 0 );
}

function createRenderer() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
}
let newt = 0;
let lightoffset = 0;
function update(lightList, objectList) {
    newt += 0.01;
    lightoffset += 0.01;
    objectRotation(objectList);
    rotateLights(lightoffset, 75, "vertical", lightList);
    camera.position.x = Math.sin(newt * 0.1) * 150;
    camera.position.z = Math.cos( newt * 0.1 ) * 150;
    camera.lookAt( 0, 0, 0 );
}



function testing() {
    // let geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
    // let material = new THREE.MeshStandardMaterial( {color: 0x00ff00} );
    // let cube = new THREE.Mesh( geometry, material );
    // scene.add( cube );
}



function createControls() {
}

function render() {
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = container.clientWidth/container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener('resize', onWindowResize);
init();
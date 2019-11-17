import * as THREE from "three"

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
import Renderer from "./renderer"

let scene, camera, renderer, container;
let mouse = new THREE.Vector2();
container = document.getElementById("canvas");

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color('black');
    createCamera();
    // createRenderer();
    // container.appendChild(renderer.domElement);
    testing("./textures/0.jpg");
    testing("./textures/1.png");
    let lightList = addLights(scene);
    let objectList = addObjects(scene, "box");
    let smokeParticles = addSmoke(scene);
    let newUpdateTesting = ((lightList, objectList, smokeParticles) => {
        update(lightList, objectList, smokeParticles);
    });
    // renderer.setAnimationLoop(() => {
    //     update(lightList, objectList, smokeParticles);
    //     render();
    // });
    renderer = new Renderer(scene, camera, newUpdateTesting, container)
    container.appendChild(renderer.renderer.domElement);
    renderer.render();
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
    // evolveSmoke(smokeParticles);
    newt += 0.01;
    lightoffset += 0.01;
    // camera.position.x = Math.sin(newt * 0.1) * 150;
    // camera.position.z = Math.cos( newt * 0.1 ) * 150;
    // camera.lookAt( 0, 0, 0 );

    let particleSystem = scene.getObjectByName('particlesystem');
    scene.traverse(function(child){
        if (child.name == 'particlesystem') {
            let particleSystem = child;
            particleSystem.geometry.vertices.forEach((particle) => {
                // particle.x += Math.random()/10 - 0.05;
                // particle.y += Math.random()/10 - 0.05;
                particle.z += Math.random()/10 + 0.05;
                if(particle.z > 150) {
                    particle.z = -100;
                }
            })
            particleSystem.geometry.verticesNeedUpdate = true;
        }
    })

}

function testing(path) {
    let particleGeo = new THREE.Geometry();
    let particleMat = new THREE.PointsMaterial({
        color: 'rgb(0,153,0)',
        size: 10,
        map: new THREE.TextureLoader().load(path),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    let particlesCount = 500;
    let particleDistance = 200;

    for(let i = 0; i < particlesCount; ++i) {
        let posX = (Math.random() - 0.5) * particleDistance;
        let posY = (Math.random() - 0.5) * particleDistance;
        let posZ = (Math.random() - 0.5) * particleDistance;
        let particle = new THREE.Vector3(posX,posY,posZ);
        particleGeo.vertices.push(particle);
    }
    let particleSystem = new THREE.Points(particleGeo, particleMat);
    particleSystem.name = 'particlesystem'
    scene.add(particleSystem);
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
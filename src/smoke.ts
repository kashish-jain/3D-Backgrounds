// This file is for controlling of smoke
import * as THREE from "three"
import Renderer from "./renderer"

let container = document.getElementById("canvas");

export default class Smoke {
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    smokeParticles: THREE.Mesh[]

    constructor(color: string | number | THREE.Color = 0x00dddd, cameraMovement: boolean = true) {
        this.scene = new THREE.Scene;
        this.createCamera();

        //Adding smoke to scene
        this.smokeParticles = addSmoke(this.scene, color);

        // Creating renderer and rendering
        let renderer = new Renderer(this.scene, this.camera, this, container);
        container.appendChild(renderer.renderer.domElement);
        renderer.render();
    }

    createCamera() {
        let aspectRatio = container.clientWidth / container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(50, aspectRatio, 1, 300);
        this.camera.position.set(0, 0, 150);
        this.camera.lookAt(0, 0, 0);
    }

    update() {
        // Adding effect to Smoke
        var sp = this.smokeParticles.length;
        while (sp--) {
            this.smokeParticles[sp].rotation.z += 0.002;
            this.smokeParticles[sp].position.z += 0.1;
            if(this.smokeParticles[sp].position.z >= 150){
                this.smokeParticles[sp].position.z = -150;
            }
        }
    }
}

function addSmoke(scene: THREE.Scene, color: string | number | THREE.Color) {
    let light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(-1, 0, 1);
    scene.add(light);
    let smokeTexture = new THREE.TextureLoader().load('./textures/Smoke-Element.png');
    let smokeMaterial = new THREE.MeshBasicMaterial({
        color: 0x00dddd,
        map: smokeTexture,
        transparent: true
    });
    let smokeGeo = new THREE.PlaneGeometry(90, 90);
    let smokeParticles = [];


    for (let p = 0; p < 150; p++) {
        var particle = new THREE.Mesh(smokeGeo, smokeMaterial);
        particle.position.set(Math.random() * 300 - 150, Math.random() * 200 - 100, Math.random() * 300 - 150);
        particle.rotation.z = Math.random() * 360;
        scene.add(particle);
        smokeParticles.push(particle);
    }
    return smokeParticles;
}



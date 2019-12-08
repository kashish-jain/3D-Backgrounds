// This file is for class randomObjects

import * as THREE from "three"
import {
    addObjects,
    objectRotation
} from "./objects.js"

import {
    addLights,
    rotateLights
} from "./lights.js"

import Renderer from "./renderer";

let lightoffset = 0;
let renderer: Renderer;
export default class RandomObjects {

    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    lightList: THREE.PointLight[]
    objectList: THREE.Mesh[]
    lightDirection: string
    cameraRotation: boolean
    container: HTMLElement

    constructor(shape: string, lightsDirection: string, backgroundColor: string="black", cameraRotation: boolean = true, elementId: string = "canvas") {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(backgroundColor);
        this.lightList = addLights(this.scene);
        this.objectList = addObjects(this.scene, shape);
        this.lightDirection = lightsDirection
        this.container = document.getElementById("canvas");
        this.createCamera();
        this.cameraRotation = cameraRotation;
        renderer = new Renderer(this);
        this.container.appendChild(renderer.renderer.domElement);
        renderer.render();
    }

    stopAnimation() {
        renderer.stopAnimation();
    }

    createCamera() {
        let aspectRatio = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(50, aspectRatio, 1, 300);
        this.camera.position.set(0, 0, 150);
        this.camera.lookAt(0, 0, 0);
    }

    update() {
        lightoffset += 0.01;
        objectRotation(this.objectList);   
        rotateLights(lightoffset, 100, this.lightDirection, this.lightList);
        if(this.cameraRotation) {
                this.camera.position.x = Math.sin(lightoffset * 0.1) * 150;
                this.camera.position.z = Math.cos(lightoffset * 0.1) * 150;
                this.camera.lookAt(0, 0, 0);
        }
    }
}
import * as THREE from "three";
import Renderer from "./renderer";

let renderer: Renderer
export default class BinaryNumbers {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  container: HTMLElement;

  constructor(elementId: string = "canvas") {
    this.scene = new THREE.Scene();
    this.container = document.getElementById(elementId);
    this.createCamera();
    adding("./textures/0.jpg", this.scene);
    adding("./textures/1.png", this.scene);

    // Creating renderer and rendering
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
    let particleSystem = this.scene.getObjectByName("particlesystem");
    this.scene.traverse(function(child) {
      if (child.name == "particlesystem") {
        //typecasting, otherwise typescript complains
        let particleSystem = <THREE.Points>child;
        let geo = <THREE.Geometry>particleSystem.geometry;
        geo.vertices.forEach((particle: any) => {
          // particle.x += Math.random()/10 - 0.05;
          // particle.y += Math.random()/10 - 0.05;
          particle.z += Math.random() / 10 + 0.05;
          if (particle.z > 150) {
            particle.z = -100;
          }
        });
        geo.verticesNeedUpdate = true;
      }
    });
  }
}

function adding(path: string, scene: THREE.Scene) {
  let particleGeo = new THREE.Geometry();
  let particleMat = new THREE.PointsMaterial({
    color: "rgb(0,153,0)",
    size: 10,
    map: new THREE.TextureLoader().load(path),
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  let particlesCount = 500;
  let particleDistance = 200;

  for (let i = 0; i < particlesCount; ++i) {
    let posX = (Math.random() - 0.5) * particleDistance;
    let posY = (Math.random() - 0.5) * particleDistance;
    let posZ = (Math.random() - 0.5) * particleDistance;
    let particle = new THREE.Vector3(posX, posY, posZ);
    particleGeo.vertices.push(particle);
  }
  let particleSystem = new THREE.Points(particleGeo, particleMat);
  particleSystem.name = "particlesystem";
  scene.add(particleSystem);
}

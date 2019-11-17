import * as THREE from "three";

// export type UpdateCallback = (camera: THREE.Camera) => void;

export default class Renderer {

  renderer: THREE.WebGLRenderer
  scene: THREE.Scene
  camera: THREE.Camera
  update: any
  container: any
  lightList: any
  objectList: any
  smokeParticles:any

  constructor(scene: THREE.Scene, camera: THREE.Camera, update: any, container: any, lightList: any, objectList: any, smokeParticles:any) {
    this.scene = scene;
    this.camera = camera;
    this.update = update;
    this.container = container;
    

    // will remove these
    this.lightList = lightList;
    this.objectList = objectList;
    this.smokeParticles = smokeParticles;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(container.clientWidth, container.clientHeight);
  }

  setSize(width : number, height : number) {
    this.renderer.setSize(width, height);
  }

  render() {
    this.update(this.lightList, this.objectList, this.smokeParticles);

    this.renderer.clear();

    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(()=>{this.render();});
  }

}
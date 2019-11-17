import * as THREE from "three";

// export type UpdateCallback = (camera: THREE.Camera) => void;

export default class Renderer {

  renderer: THREE.WebGLRenderer
  scene: THREE.Scene
  camera: THREE.Camera
  update: any

  constructor(scene: THREE.Scene, camera: THREE.Camera, update: any) {
    this.scene = scene;
    this.camera = camera;
    this.update = update;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }

  setSize(width : number, height : number) {
    this.renderer.setSize(width, height);
  }

  render() {
    // Callback to prompt for scene updates that depend on the current camera
    // position
    this.update();

    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(()=>{this.render();});
  }

}
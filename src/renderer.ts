import * as THREE from "three";

// export type UpdateCallback = (camera: THREE.Camera) => void;

export default class Renderer {

  renderer: THREE.WebGLRenderer
  scene: THREE.Scene
  camera: THREE.Camera
  obj:any
  container: any


  constructor(scene: THREE.Scene, camera: THREE.Camera, obj: any, container: any) {
    this.scene = scene;
    this.camera = camera;
    this.obj = obj;
    this.container = container;
    

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(container.clientWidth, container.clientHeight);
  }

  setSize(width : number, height : number) {
    this.renderer.setSize(width, height);
  }

  render() {

    this.renderer.clear();

    this.renderer.render(this.scene, this.camera);
    this.obj.update();

    requestAnimationFrame(()=>{this.render();});
  }

}
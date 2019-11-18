import * as THREE from "three";
import RandomObjects from "./randomObjects"
import Smoke from "./smoke"

export default class Renderer {

  renderer: THREE.WebGLRenderer
  obj: Smoke | RandomObjects


  constructor(obj: Smoke | RandomObjects) {
    this.obj = obj;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(obj.container.clientWidth, obj.container.clientHeight);
  }


  render() {

    this.renderer.clear();

    this.renderer.render(this.obj.scene, this.obj.camera);
    this.obj.update();

    requestAnimationFrame(()=>{this.render();});
  }

}
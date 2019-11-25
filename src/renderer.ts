import * as THREE from "three";
import RandomObjects from "./randomObjects"
import Smoke from "./smoke"
import BinaryNumbers from "./binaryNumbers"
import MouseEffects from "./mouseEffects";
import { GeometryUtils } from 'three/examples/jsm/utils/GeometryUtils.js'

export default class Renderer {

  renderer: THREE.WebGLRenderer
  obj: Smoke | RandomObjects |BinaryNumbers | MouseEffects


  constructor(obj: Smoke | RandomObjects | BinaryNumbers | MouseEffects) {
    this.obj = obj;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(obj.container.clientWidth, obj.container.clientHeight);
  }


  render() {
    this.renderer.render(this.obj.scene, this.obj.camera);
    this.obj.update();

    requestAnimationFrame(()=>{this.render();});
  }

}
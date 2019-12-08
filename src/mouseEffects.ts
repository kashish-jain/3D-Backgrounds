import * as THREE from "three";
import Renderer from "./renderer";
import { GeometryUtils } from "three/examples/jsm/utils/GeometryUtils";

let renderer: Renderer;
export default class MouseEffects {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  container: HTMLCanvasElement;
  textParticles: THREE.Points;

  constructor(elementId: string = "#canvas") {
    this.scene = new THREE.Scene();
    this.container = document.querySelector(elementId);
    this.createCamera();
    this.addText(this.scene);

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

  addText(scene: THREE.Scene) {
    let loader = new THREE.FontLoader();
    let textGeo;
    let particleSystem;
    loader.load("./fonts/helvetiker_regular.typeface.json", function(font) {
      textGeo = new THREE.TextGeometry("DHUITY", {
        font: font,

        size: 50,
        height: 30,
        curveSegments: 12,

        bevelThickness: 2,
        bevelSize: 1,
        bevelEnabled: false
      });
      textGeo.center();
      let points_inside = GeometryUtils.randomPointsInGeometry(textGeo, 10000);
      let newGeo = new THREE.Geometry();
      createVertices(newGeo, points_inside);
      var colors = [];
      for( var i = 0; i < newGeo.vertices.length; i++ ) {
      
          // random color
          colors[i] = new THREE.Color();
          colors[i].setHSL( Math.random(), 0.5, 0.5 );
  
      }
      newGeo.colors = colors;


      let textMaterial = new THREE.PointsMaterial({
        vertexColors: THREE.VertexColors
      });
      particleSystem = new THREE.Points(newGeo, textMaterial);
      particleSystem.name = "text";
      scene.add(particleSystem);
    });
  }

  update() {
    let particleSystem = this.scene.getObjectByName("text");
      if(particleSystem) {
        particleSystem.rotation.y += 0.01;
        
        // console.log(particleSystem.geometry);
      }
  }
}

function createVertices (emptyArray: THREE.Geometry, points: any[]) {
  for (var p = 0; p < 10000; p++) {
    var vertex = new THREE.Vector3();
        vertex.x = points[p]['x'];
        vertex.y = points[p]['y'];
        vertex.z = points[p]['z'];

    emptyArray.vertices.push(vertex);
  }
}




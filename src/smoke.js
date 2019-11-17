// This file is for controlling of smoke
// 0x00dddd
import * as THREE from "three"


function addSmoke(scene) {
    // let light = new THREE.DirectionalLight(0xffffff, 0.5);
    // light.position.set(-1, 0, 1);
    // scene.add(light);
    let smokeTexture = new THREE.TextureLoader().load('./textures/Smoke-Element.png');
    let smokeMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: smokeTexture,
        transparent: true
    });
    let smokeGeo = new THREE.PlaneGeometry(90, 90);
    let smokeParticles = [];


    for (let p = 0; p < 150; p++) {
        var particle = new THREE.Mesh(smokeGeo, smokeMaterial);
        particle.position.set(Math.random() * 300 - 150, Math.random() * 300 - 150, Math.random() * 200 - 100);
        particle.rotation.z = Math.random() * 360;
        scene.add(particle);
        smokeParticles.push(particle);
    }
    return smokeParticles;
}

function evolveSmoke(smokeParticles) {
    var sp = smokeParticles.length;
    while (sp--) {
        smokeParticles[sp].rotation.z += 0.002;
    }
}

export {
    addSmoke,
    evolveSmoke
};

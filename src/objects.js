// This file is for creating and handling objects in the scene


function addObjects(scene, type) {
    let objectGeometry;
    switch(type) {
        case "box":
            objectGeometry = new THREE.BoxBufferGeometry(2,2,2);
            break;
        case "torus":
            objectGeometry = new THREE.TorusBufferGeometry(1.5, 0.4, 8, 16);
            break;
        case "sphere":
            objectGeometry = new THREE.SphereBufferGeometry(1,32, 32);
            break;
        default:
            console.log("Provide valid Geometry");
    }

    let objectMaterial = new THREE.MeshStandardMaterial( { color: 0xffffff, roughness: 0.5, metalness: 1.0 } );
    let objectList = [];

    for ( let i = 0; i < 2000; i ++ ) {
        let mesh = new THREE.Mesh( objectGeometry, objectMaterial );
        mesh.position.x = 400 * ( 0.5 - Math.random() );
        mesh.position.y = 100 * ( 0.5 - Math.random() ) + 5;
        mesh.position.z = 200 * ( 0.5 - Math.random() );
        mesh.rotation.y = 3.14 * ( 0.5 - Math.random() );
        mesh.rotation.x = 3.14 * ( 0.5 - Math.random() );
        objectList.push(mesh);
        scene.add(mesh);
        mesh.updateMatrix();
    }
    return objectList;
}


function objectRotation(objectList) {
    objectList.forEach( (obj) => {
        obj.rotation.x += (Math.floor(Math.random() * 10))/1000;
        obj.rotation.y += (Math.floor(Math.random() * 10))/1000;
        obj.rotation.z += (Math.floor(Math.random() * 10))/1000;
    });
}


export {objectRotation, addObjects}
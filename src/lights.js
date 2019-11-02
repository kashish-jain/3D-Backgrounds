//this file is for controlling the position of lights



function addLights(scene) {
    let colour1 = 0xff0040;
    let sphere = new THREE.SphereBufferGeometry(0.25, 16, 8);
    let intensity = 2.5;
    let distance = 100;
    let decay = 2.0;
    var c1 = 0xff0040, c2 = 0x0040ff, c3 = 0x80ff80, c4 = 0xffaa00, c5 = 0x00ffaa, c6 = 0xff1100;
    let lightList = [];
    let light1, light2, light3, light4, light5, light6;
    light1 = new THREE.PointLight( c1, intensity, distance, decay );
    light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c1 } ) ) );
    scene.add( light1 );

    light2 = new THREE.PointLight( c2, intensity, distance, decay );
    light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c2 } ) ) );
    scene.add( light2 );

    light3 = new THREE.PointLight( c3, intensity, distance, decay );
    light3.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c3 } ) ) );
    scene.add( light3 );

    light4 = new THREE.PointLight( c4, intensity, distance, decay );
    light4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c4 } ) ) );
    scene.add( light4 );

    light5 = new THREE.PointLight( c5, intensity, distance, decay );
    light5.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c5 } ) ) );
    scene.add( light5 );

    light6 = new THREE.PointLight( c6, intensity, distance, decay );
    light6.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c6 } ) ) );
    scene.add( light6 );
    lightList.push(light1, light2, light3, light4, light5, light6);
    return lightList;
}



function rotateLights(offset, distance, direction, lightList) {
    let light1 = lightList[0];
    let light2 = lightList[1];
    let light3 = lightList[2];
    let light4 = lightList[3];
    let light5 = lightList[4];
    let light6 = lightList[5]; 
    if(direction == "horizontal") {
        light1.position.x = Math.sin( offset * 0.7 ) * distance;
        light1.position.z = Math.cos( offset * 0.3 ) * distance;
        light1.position.y = Math.cos( offset * 0.3) * 10;
    
        light2.position.x = Math.cos( offset * 0.3 ) * distance;
        light2.position.z = Math.sin( offset * 0.7 ) * distance;
        light2.position.y = Math.cos( offset * 0.3) * 10;
    
        light3.position.x = Math.sin( offset * 0.7 ) * distance;
        light3.position.z = Math.sin( offset * 0.5 ) * distance;
        light3.position.y = Math.cos( offset * 0.3) * 10;
    
        light4.position.x = Math.sin( offset * 0.3 ) * distance;
        light4.position.z = Math.sin( offset * 0.5 ) * distance;
        light4.position.y = Math.cos( offset * 0.3) * 10;
  
        light5.position.x = Math.cos( offset * 0.3 ) * distance;
        light5.position.z = Math.sin( offset * 0.6 ) * distance;
        light5.position.y = Math.cos( offset * 0.3) * 10;
   
        light6.position.x = Math.cos( offset * 0.7 ) * distance;
        light6.position.z = Math.cos( offset * 0.5 ) * distance;
        light6.position.y = Math.cos( offset * 0.1) * 10;

    } else {
        // vertical or any other, we will just do vertical
        light1.position.y = Math.sin( offset * 0.7 ) * distance;
        light1.position.z = Math.cos( offset * 0.3 ) * distance;
    
        light2.position.y = Math.cos( offset * 0.3 ) * distance;
        light2.position.z = Math.sin( offset * 0.7 ) * distance;
    
        light3.position.y = Math.sin( offset * 0.7 ) * distance;
        light3.position.z = Math.sin( offset * 0.5 ) * distance;
    
        light4.position.y = Math.sin( offset * 0.3 ) * distance;
        light4.position.z = Math.sin( offset * 0.5 ) * distance;
    
        light5.position.y = Math.cos( offset * 0.3 ) * distance;
        light5.position.z = Math.sin( offset * 0.5 ) * distance;
    
        light6.position.y = Math.cos( offset * 0.7 ) * distance;
        light6.position.z = Math.cos( offset * 0.5 ) * distance;
    }
}


export {addLights, rotateLights}
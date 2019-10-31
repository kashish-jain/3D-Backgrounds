/*jshint esversion: 6 */
let scene, camera, renderer, container, objectList, lighList, light1, light2, light3, light4, light5, light6;
objectList = [];
lightList = [];
container = document.getElementById("canvas");
function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color('black');
    createCamera();
    createRenderer();
    container.appendChild(renderer.domElement);
    testing();
    createLights();
    addObjects();
    renderer.setAnimationLoop(() => {
        update();
        render();
    });
}

function createCamera() {
    let aspectRatio = container.clientWidth/container.clientHeight;
    camera = new THREE.PerspectiveCamera(50, aspectRatio, 1, 300);
    camera.position.set( 0, 15, 150 );
    camera.lookAt( 0, 0, 0 );
}

function createRenderer() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
}

function update() {
    // updating objects
    objectList.forEach( (obj) => {
        obj.rotation.x += (Math.floor(Math.random() * 10))/100;
        obj.rotation.y += (Math.floor(Math.random() * 10))/100;
        obj.rotation.z += (Math.floor(Math.random() * 10))/100;
    });

        var time = Date.now() * 0.00025;
        var d = 100;

        light1.position.x = Math.sin( time * 0.7 ) * d;
        light1.position.z = Math.cos( time * 0.3 ) * d;

        light2.position.x = Math.cos( time * 0.3 ) * d;
        light2.position.z = Math.sin( time * 0.7 ) * d;

        light3.position.x = Math.sin( time * 0.7 ) * d;
        light3.position.z = Math.sin( time * 0.5 ) * d;

        light4.position.x = Math.sin( time * 0.3 ) * d;
        light4.position.z = Math.sin( time * 0.5 ) * d;

        light5.position.x = Math.cos( time * 0.3 ) * d;
        light5.position.z = Math.sin( time * 0.5 ) * d;

        light6.position.x = Math.cos( time * 0.7 ) * d;
        light6.position.z = Math.cos( time * 0.5 ) * d;
}

function createLights() {
    let colour1 = 0xff0040;
    let sphere = new THREE.SphereBufferGeometry(0.25, 16, 8);
    let intensity = 2.5;
    let distance = 100;
    let decay = 2.0;
    var c1 = 0xff0040, c2 = 0x0040ff, c3 = 0x80ff80, c4 = 0xffaa00, c5 = 0x00ffaa, c6 = 0xff1100;

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
}

function testing() {
    // let geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
    // let material = new THREE.MeshStandardMaterial( {color: 0x00ff00} );
    // let cube = new THREE.Mesh( geometry, material );
    // scene.add( cube );
}

function addObjects() {
    var objectGeometry = new THREE.TorusBufferGeometry( 1.5, 0.4, 8, 16 );
    var objectMaterial = new THREE.MeshStandardMaterial( { color: 0xffffff, roughness: 0.5, metalness: 1.0 } );
    for ( let i = 0; i < 2000; i ++ ) {

        let mesh = new THREE.Mesh( objectGeometry, objectMaterial );

        mesh.position.x = 400 * ( 0.5 - Math.random() );
        mesh.position.y = 100 * ( 0.5 - Math.random() ) + 5;
        mesh.position.z = 200 * ( 0.5 - Math.random() );

        mesh.rotation.y = 3.14 * ( 0.5 - Math.random() );
        mesh.rotation.x = 3.14 * ( 0.5 - Math.random() );
        objectList.push(mesh);
        mesh.updateMatrix();
        scene.add( mesh );
    }
}

function createControls() {

}

function render() {
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = container.clientWidth/container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener('resize', onWindowResize);
init();

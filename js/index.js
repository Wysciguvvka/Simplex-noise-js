// scene
const scene = new THREE.Scene();
scene.backround = new THREE.Color(0xf8f8ff)
// scene.fog = new THREE.FogExp2(0xce4993, 0.00014)

// camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 0);
camera.updateProjectionMatrix();
// loader

const loader = new THREE.TextureLoader();

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, autoclear: true });
renderer.setClearColor(new THREE.Color(0x3a3b3c));
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.rotateSpeed = 0.25;
controls.panSpeed = 0.25;

// geometry
const geometry = new THREE.PlaneBufferGeometry(32, 32, 128, 128);
const material = new THREE.PointsMaterial({ color: 0xffaaff, side: THREE.DoubleSide });
const wireframe_mat = new THREE.MeshBasicMaterial( { color: 0x4a3d49 } );
const wireframe = new THREE.WireframeGeometry(geometry);
const line = new THREE.LineSegments(geometry, wireframe_mat);
line.material.depthTest = false;
line.material.opacity = 0.25;
line.material.transparent = true;
line.rotation.x = -Math.PI / 2;
scene.add(line);

const vertices = new Float32Array([
    -1.0, -1.0, 1.0,
    1.0, -1.0, 1.0,
    1.0, 1.0, 1.0,

    1.0, 1.0, 1.0,
    -1.0, 1.0, 1.0,
    -1.0, -1.0, 1.0
]);
// geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
const plane = new THREE.Mesh(geometry, material);


plane.rotation.x = -Math.PI / 2;
scene.add(plane);

camera.position.x = 9;
camera.position.z = 26;
camera.position.y = 15;
controls.update()

const count = geometry.attributes.position.count;

function animate() {
    let time = Date.now() * 0.002;
    for (let i = 0; i < count; i++) {
        let x = geometry.attributes.position.getX(i);
        geometry.attributes.position.setZ(i, Math.cos(x + time));
    }
    geometry.computeVertexNormals();
    geometry.attributes.position.needsUpdate = true;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    // console.log(camera.position.x,camera.position.z, camera.position.y);
}
animate();
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}
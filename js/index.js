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
/*const particles = 500000;
                const geometry = new THREE.BufferGeometry();
                const positions = [];
                const colors = [];
                const color = new THREE.Color();

                const n = 1000, n2 = n / 2; // particles spread in the cube

                for ( let i = 0; i < particles; i ++ ) {

                    // positions

                    const x = Math.random() * n - n2;
                    const y = Math.random() * n - n2;
                    const z = Math.random() * n - n2;

                    positions.push( x, y, z );

                    // colors

                    const vx = ( x / n ) + 0.5;
                    const vy = ( y / n ) + 0.5;
                    const vz = ( z / n ) + 0.5;

                    color.setRGB( vx, vy, vz );

                    colors.push( color.r, color.g, color.b );

                }

                geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
                geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

                geometry.computeBoundingSphere();

                //

                const material = new THREE.PointsMaterial( { size: 15, vertexColors: true } );

                points = new THREE.Points( geometry, material );
                scene.add( points );
*/
const geometry = new THREE.PlaneBufferGeometry(32, 32, 64, 64);
const material = new THREE.PointsMaterial({ color: 0xffaaff, side: THREE.DoubleSide, size: 0.3, vertexColor: true });
const wireframe_mat = new THREE.MeshBasicMaterial({ color: 0x4a3d49 });
const wireframe = new THREE.WireframeGeometry(geometry);
const line = new THREE.LineSegments(geometry, wireframe_mat);
line.material.depthTest = false;
line.material.opacity = 0.25;
line.material.transparent = true;
line.rotation.x = -Math.PI / 2;
// scene.add(line);

// particles
const particles = 16384;
const vertices = [];

// geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
const plane = new THREE.Points(geometry, material);


plane.rotation.x = -Math.PI / 2;
// scene.add(plane);

let points = plane.geometry.attributes.position.array;
console.log(points)
const cubeGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const cube = []

for (let i = 0; i < points.length; i += 3) {
    cube[i] = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube[i].position.x = points[i];
    cube[i].position.z = points[i+1];
    cube[i].position.y = points[i+2];
    scene.add(cube[i]);
}
console.log(points[0])

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
    let points = plane.geometry.attributes.position.array;
    for (let i = 0; i < points.length; i+=3) {
        cube[i].position.x = points[i];
        cube[i].position.z = points[i+1];
        cube[i].position.y = points[i+2];
    }
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
import * as THREE from 'three';

const width = 600;
const height = 600;

const canvas = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({
	canvas,
});

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, -1000, 1000);

renderer.setClearColor(new THREE.Color(0, 0, 0));
renderer.setSize(width, height);

const triangleShape = new THREE.Shape();
triangleShape.moveTo(0, 100);
triangleShape.lineTo(-100, -100);
triangleShape.lineTo(100, -100);
triangleShape.lineTo(0, 100);

// 定义形状区域
const geometry = new THREE.ShapeGeometry(triangleShape);
// 定义材质，颜色
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
//
const mesh = new THREE.Mesh(geometry, material);
mesh.position.x = 0;
mesh.position.y = 0;
mesh.position.z = 1;
scene.add(mesh);

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 0;
camera.lookAt(new THREE.Vector3(0, 0, 1));

let curAngle = 0;
let lastTimeStamp = -1;
const animation = () => {
	let now = Date.now();
	let duration = now - lastTimeStamp;
	lastTimeStamp = now;
	curAngle += (duration / 1000) * Math.PI;
};
const render = () => {
	animation();
	mesh.rotation.set(0, curAngle, 0);
	renderer.render(scene, camera);
	requestAnimationFrame(render);
};

render();

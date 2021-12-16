import * as THREE from 'three';

/**
 * 课程：ThreeJs 基础
 */

/**
 * 创建 3D 世界
 */
function creatWorld(): void {
	initRender();
	initCamera();
	initLight();
	initObject();
	initScene();
	render();
}

/**
 * 创建 渲染器
 */
let canvas: HTMLCanvasElement;
let renderer: THREE.WebGLRenderer;
let width: number;
let height: number;
function initRender(): void {
	canvas = document.getElementById('canvas') as HTMLCanvasElement;
	width = canvas.width;
	height = canvas.height;
	renderer = new THREE.WebGLRenderer({
		antialias: true, // 抗锯齿开启
		canvas: canvas,
	});
	renderer.setSize(width, height); // 设置渲染器的宽度和高度
	renderer.setClearColor('#000000', 1.0); // 设置背景颜色
	renderer.setPixelRatio(window.devicePixelRatio); // 设置设备像素比
}

/**
 * 创建相机
 */
let camera: THREE.Camera;
let origPoint: THREE.Vector3 = new THREE.Vector3(0, 0, 0); // 原点
function initCamera(): void {
	camera = new THREE.PerspectiveCamera(45, width / height, 100);
	camera.position.set(200, 400, 600); // 设置相机位置
	camera.up.set(0, 1, 0); // 设置相机正方向
	camera.lookAt(origPoint); // 设置相机视点
}

/**
 * 创建光源
 */
let pointLight: THREE.PointLight;
let ambientLight: THREE.AmbientLight;
function initLight(): void {
	// 点光源
	pointLight = new THREE.PointLight(0xffffff, 1, 1000);
	pointLight.position.set(70, 112, 98);
	// 环境光
	ambientLight = new THREE.AmbientLight(0x333);
}

/**
 * 创建物体
 */
let cube: THREE.Mesh;
function initObject(): void {
	let geometry = new THREE.BoxGeometry(100, 100, 100);
	let material = new THREE.MeshLambertMaterial({ color: 0xffffff });
	cube = new THREE.Mesh(geometry, material);
	cube.position.set(0, 0, 0);
}

/**
 * 初始化场景
 */
let scene: THREE.Scene;
function initScene(): void {
	scene = new THREE.Scene();
	scene.add(pointLight);
	scene.add(ambientLight);
	scene.add(cube);
}

/**
 * 渲染
 */
function render(): void {
	renderer.clear();
	renderer.render(scene, camera);
	cube.rotation.x += 0.005;
	cube.rotation.y += 0.005;
	requestAnimationFrame(render);
}

creatWorld();

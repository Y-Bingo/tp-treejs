import * as dat from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ColorGUIHelper, DegRadHelper, makeXYZGUI } from '../../Helper/DebugHelper';
import { BaseJourney } from './BaseJourney';

/**
 * Journey - Shadow
 */

export class Journey16 extends BaseJourney {
	private gui: dat.GUI;
	private clock: THREE.Clock;

	/**
	 * @override
	 */
	protected onCreating(): void {
		// clock
		this.clock = new THREE.Clock();

		// GUI
		this.gui = new dat.GUI();
	}

	/**
	 * @override
	 */
	protected onCreated(): void {
		// camera controller
		this.controls = new OrbitControls(this.camera, this.canvas);
		// this.controls.autoRotate = true;
		this.controls.enableDamping = true;

		// axes
		const axesHelp = new THREE.AxesHelper();
		this.scene.add(axesHelp);

		this.renderer.shadowMap.enabled = true;
		// this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	}

	/**
	 * @override
	 */
	private controls: OrbitControls;
	protected initCamera(): void {
		const camera = new THREE.PerspectiveCamera(75, this.width / this.height);
		camera.position.set(0, 0, 3);
		camera.lookAt(new THREE.Vector3(0, 0, 0));

		this.camera = camera;
		this.scene.add(camera);
	}

	protected initLight(): void {
		const scene = this.scene;
		// Ambient Light
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
		const ambientGui = this.gui.addFolder('AmbientLight');
		ambientGui.add(ambientLight, 'intensity', 0, 1, 0.01);
		ambientGui.add(ambientLight, 'visible');
		ambientGui.addColor(new ColorGUIHelper(ambientLight, 'color'), 'value').name('color');
		scene.add(ambientLight);

		// Direction Light
		const directionGui = this.gui.addFolder('DirectionalLight');
		const directionLight = new THREE.DirectionalLight(0xffffff, 0.3);
		directionLight.position.set(2, 2, -1);
		directionLight.castShadow = true;
		directionLight.shadow.mapSize.width = 1024;
		directionLight.shadow.mapSize.height = 1024;
		directionLight.shadow.camera.near = 2;
		directionLight.shadow.camera.far = 6;
		directionLight.shadow.camera.top = 2;
		directionLight.shadow.camera.bottom = -2;
		directionLight.shadow.camera.left = -2;
		directionLight.shadow.camera.right = 2;
		directionLight.shadow.radius = 10;

		directionGui.add(directionLight, 'intensity').min(0).max(1.3).step(0.01);
		directionGui.add(directionLight, 'visible');
		directionGui.addColor(new ColorGUIHelper(directionLight, 'color'), 'value').name('color');
		makeXYZGUI(directionGui, directionLight.position, null, () => {
			directionLightHelper.update();
		});
		scene.add(directionLight);

		const directionLightCameraHelper = new THREE.CameraHelper(directionLight.shadow.camera);
		directionLightCameraHelper.visible = false;
		directionGui.add(directionLightCameraHelper, 'visible').name('light-camera');
		scene.add(directionLightCameraHelper);

		const directionLightHelper = new THREE.DirectionalLightHelper(directionLight, 0.5);
		directionLightHelper.visible = false;
		directionGui.add(directionLightHelper, 'visible').name('helper');
		scene.add(directionLightHelper);

		// // HemisphereLight
		// const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x00ff, 0.3);
		// const hemisphereLightGui = this.gui.addFolder('HemisphereLight');
		// hemisphereLightGui.add(hemisphereLight, 'intensity', 0, 1.3, 0.01);
		// hemisphereLightGui.add(hemisphereLight, 'visible');
		// hemisphereLightGui.addColor(new ColorGUIHelper(hemisphereLight, 'color'), 'value').name('color');
		// scene.add(hemisphereLight);

		// const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.3);
		// hemisphereLightHelper.visible = false;
		// hemisphereLightGui.add(hemisphereLightHelper, 'visible', 0, 1, 0.01).name('helper');
		// scene.add(hemisphereLightHelper);

		// // Rect Light
		// const rectAreaLight = new THREE.RectAreaLight(0xffffff, 5, 2, 1);
		// rectAreaLight.position.set(-1, 0, -0.5);
		// const rectAreaLightGui = this.gui.addFolder('RectAreaLight');
		// rectAreaLightGui.add(rectAreaLight, 'intensity', 0, 1.3, 0.01);
		// rectAreaLightGui.add(rectAreaLight, 'visible');
		// rectAreaLightGui.add(rectAreaLight, 'width', 0, 20);
		// rectAreaLightGui.add(rectAreaLight, 'height', 0, 20);
		// rectAreaLightGui.add(new DegRadHelper(rectAreaLight.rotation, 'x'), 'value', -180, 180).name('x rotation');
		// rectAreaLightGui.add(new DegRadHelper(rectAreaLight.rotation, 'y'), 'value', -180, 180).name('y rotation');
		// rectAreaLightGui.add(new DegRadHelper(rectAreaLight.rotation, 'z'), 'value', -180, 180).name('z rotation');
		// rectAreaLightGui.addColor(new ColorGUIHelper(rectAreaLight, 'color'), 'value').name('color');
		// makeXYZGUI(rectAreaLightGui, rectAreaLight.position);
		// scene.add(rectAreaLight);

		// Spot Light
		const spotLightGui = this.gui.addFolder('SpotLight');
		const spotLight = new THREE.SpotLight(0xffffff, 0.3, 10, Math.PI * 0.2);
		spotLight.position.set(0, 2, 2);
		spotLight.castShadow = true;
		spotLight.shadow.mapSize.width = 1024;
		spotLight.shadow.mapSize.height = 1024;
		spotLight.shadow.camera.fov = 30;
		spotLight.shadow.camera.near = 1;
		spotLight.shadow.camera.far = 6;
		// spotLight.shadow.radius = 10;
		scene.add(spotLight);
		scene.add(spotLight.target);

		spotLightGui.add(spotLight, 'intensity', 0, 10, 0.01);
		spotLightGui.add(spotLight, 'visible');
		spotLightGui.add(new DegRadHelper(spotLight, 'angle'), 'value', 0, 180).name('angle');
		spotLightGui.add(spotLight, 'penumbra', 0, 1, 0.01);
		makeXYZGUI(spotLightGui, spotLight.position);

		const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
		spotLightCameraHelper.visible = false;
		spotLightGui.add(spotLightCameraHelper, 'visible').name('light-camera');
		scene.add(spotLightCameraHelper);

		const spotLightHelper = new THREE.SpotLightHelper(spotLight);
		spotLightHelper.visible = false;
		spotLightGui.add(spotLightHelper, 'visible', 0, 1, 0.01).name('helper');
		scene.add(spotLightHelper);

		// Point Light
		const pointLightGui = this.gui.addFolder('PointLight');
		const pointLight = new THREE.PointLight(0xffffff, 0.3);
		pointLight.position.set(-1, 1, 0);
		pointLight.castShadow = true;
		pointLight.shadow.mapSize.width = 1024;
		pointLight.shadow.mapSize.height = 1024;
		pointLight.shadow.camera.near = 0.1;
		pointLight.shadow.camera.far = 5;

		pointLightGui.add(pointLight, 'intensity', 0, 1.3, 0.01);
		pointLightGui.add(pointLight, 'visible');
		pointLightGui.addColor(new ColorGUIHelper(pointLight, 'color'), 'value').name('color');
		makeXYZGUI(pointLightGui, pointLight.position);
		scene.add(pointLight);

		const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);
		pointLightCameraHelper.visible = false;
		pointLightGui.add(pointLightCameraHelper, 'visible').name('light-camera');
		scene.add(pointLightCameraHelper);

		const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.1);
		pointLightHelper.visible = false;
		pointLightGui.add(pointLightHelper, 'visible', 0, 1, 0.01).name('helper');
		scene.add(pointLightHelper);
	}

	/**
	 * @override
	 */
	public meshArr: THREE.Mesh[];
	protected initModel(): void {
		this.meshArr = [];

		const material = new THREE.MeshStandardMaterial();
		material.roughness = 0.7;
		const gui = this.gui.addFolder('material');
		gui.add(material, 'roughness').min(0).max(1).step(0.01);
		gui.add(material, 'metalness').min(0).max(1).step(0.01);

		const sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(0.5, 32, 32), material);
		sphere.castShadow = true;

		const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(5, 5), material);
		plane.rotation.x = -Math.PI * 0.5;
		plane.position.y = -0.5;
		plane.receiveShadow = true;

		this.meshArr.push(sphere);
		this.scene.add(plane, sphere);
	}

	/**
	 * @override
	 */
	protected onRender(): void {
		this.controls.update();
		this.renderer.render(this.scene, this.camera);

		const elapsedTime = this.clock.getElapsedTime();
		this.meshArr.forEach(obj => {
			obj.rotation.x = Math.sin(elapsedTime) * 1.5;
			obj.rotation.z = Math.cos(elapsedTime) * 1.5;
			obj.rotation.y = Math.abs(Math.sin(elapsedTime));
		});
	}

	/**
	 * @protected
	 */
	protected onDestroy(): void {
		this.gui?.destroy();
		this.meshArr.length = 0;
	}
}

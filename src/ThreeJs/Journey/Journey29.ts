import * as dat from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import fragmentShader from '../Shaders/Water/water.fs.glsl';
import vertexShader from '../Shaders/Water/water.vs.glsl';
import { BaseJourney } from './BaseJourney';

/**
 * Journey - Raging sea
 */
export class Journey29 extends BaseJourney {
	private gui: dat.GUI;
	private clock: THREE.Clock;
	private controls: OrbitControls;
	private params: any;

	/**
	 * @override
	 */
	protected onCreating(): void {
		// params
		this.params = {};

		// clock
		this.clock = new THREE.Clock();

		// GUI
		this.gui = new dat.GUI();
	}

	/**
	 * @override
	 */
	protected onCreated(): void {
		// controller
		this.controls = new OrbitControls(this.camera, this.canvas);
		this.controls.enableDamping = true;
	}

	/**
	 * @protected
	 */
	protected initLight(): void {}

	/**
	 * @override
	 */
	protected initCamera(): void {
		const camera = new THREE.PerspectiveCamera(35, this.width / this.height, 0.1, 100);
		camera.position.set(1, 1, 3);
		// camera.lookAt(new THREE.Vector3(0, 0, 0));

		this.camera = camera;
		this.scene.add(camera);
	}

	/**
	 * @override
	 */
	private material: THREE.RawShaderMaterial;
	protected initModel(): void {
		const textureLoader = new THREE.TextureLoader();
		// const flagTexture = textureLoader.load('./resource/journey/flag-french.jpg');

		// Geometry
		const waterGeometry = new THREE.PlaneBufferGeometry(2, 2, 128, 128);

		const waterMaterial = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader,
			side: THREE.DoubleSide,
		});
		const water = new THREE.Mesh(waterGeometry, waterMaterial);
		water.rotation.x = -Math.PI * 0.5;
		this.scene.add(water);

		// console.log(waterGeometry, waterMaterial, water);
	}

	/**
	 * @override
	 */
	protected onRender(): void {
		this.renderer.render(this.scene, this.camera);
		let elapsedTime = this.clock.getElapsedTime();
		// this.material.uniforms.uTime.value = elapsedTime;
	}

	/**
	 * @protected
	 */
	protected onDestroy(): void {
		this.gui?.destroy();
	}
}

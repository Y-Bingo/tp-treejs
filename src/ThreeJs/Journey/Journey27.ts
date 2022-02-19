import * as dat from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ColorGUIHelper } from '../../Helper/DebugHelper';
import fragmentShader from '../Shaders/Test/test.fs.glsl';
import vertexShader from '../Shaders/Test/test.vs.glsl';
import { BaseJourney } from './BaseJourney';

/**
 * Journey - Shaders
 */
export class Journey27 extends BaseJourney {
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
		const flagTexture = textureLoader.load('./resource/journey/flag-french.jpg');

		// Geometry
		const geometry = new THREE.PlaneBufferGeometry(1, 1, 32, 32);

		// const material = new THREE.RawShaderMaterial({
		const material = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader,
			uniforms: {
				uFrequency: { value: new THREE.Vector2(5, 5) },
				uTime: { value: 0.0 },
				uColor: { value: new THREE.Color('orange') },
				uTexture: { value: flagTexture },
			},
		});
		this.material = material;
		this.gui.add(material.uniforms.uFrequency.value, 'x').min(0).max(10).name('FrequencyX');
		this.gui.add(material.uniforms.uFrequency.value, 'y').min(0).max(10).name('FrequencyY');
		this.gui.addColor(new ColorGUIHelper(material.uniforms.uColor, 'value'), 'value').name('uColor');

		// Mesh
		const mesh = new THREE.Mesh(geometry, material);
		this.scene.add(mesh);
	}

	/**
	 * @override
	 */
	protected onRender(): void {
		this.renderer.render(this.scene, this.camera);
		let elapsedTime = this.clock.getElapsedTime();
		this.material.uniforms.uTime.value = elapsedTime;
	}

	/**
	 * @protected
	 */
	protected onDestroy(): void {
		this.gui?.destroy();
	}
}

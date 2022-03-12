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
		camera.position.set(0, 5, 5);
		// camera.lookAt(new THREE.Vector3(0, 0, 0));

		this.camera = camera;
		this.scene.add(camera);
	}

	/**
	 * @override
	 */
	private material: THREE.RawShaderMaterial;
	protected initModel(): void {
		const debugConfig = {
			depthColor: 0x186691,
			surfaceColor: 0x9bd8ff,
		};
		const textureLoader = new THREE.TextureLoader();
		// const flagTexture = textureLoader.load('./resource/journey/flag-french.jpg');

		// Geometry
		const waterGeometry = new THREE.PlaneBufferGeometry(2, 2, 512, 512);

		const waterMaterial = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader,
			uniforms: {
				uTime: { value: 0 },

				uBigWavesElevation: { value: 0.2 },
				uBigWavesFrequency: { value: new THREE.Vector2(4, 1.5) },
				uBigWavesSpeed: { value: 0.75 },

				uSmallWavesElevation: { value: 0.1 },
				uSmallWavesFrequency: { value: 3 },
				uSmallWavesSpeed: { value: 0.2 },
				uSmallWavesIterations: { value: 4 },

				uDepthColor: { value: new THREE.Color(debugConfig.depthColor) },
				uSurfaceColor: { value: new THREE.Color(debugConfig.surfaceColor) },
				uColorOffset: { value: 0.2 },
				uColorMultiplier: { value: 3 },
			},
			side: THREE.DoubleSide,
		});
		const water = new THREE.Mesh(waterGeometry, waterMaterial);
		water.rotation.x = -Math.PI * 0.5;
		this.scene.add(water);

		this.material = waterMaterial;

		// Debug
		this.gui.add(waterMaterial.uniforms.uBigWavesElevation, 'value').min(0).max(1).step(0.01).name('uBigWavesElevation');
		this.gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'x').min(0).max(10).step(0.001).name('uBigWavesFrequency-X');
		this.gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'y').min(0).max(10).step(0.001).name('uBigWavesFrequency-Y');
		this.gui.add(waterMaterial.uniforms.uBigWavesSpeed, 'value').min(0).max(1).step(0.01).name('uBigWavesSpeed');

		this.gui.add(waterMaterial.uniforms.uSmallWavesElevation, 'value').min(0).max(1).step(0.01).name('uSmallWavesElevation');
		this.gui.add(waterMaterial.uniforms.uSmallWavesFrequency, 'value').min(0).max(30).step(0.01).name('uSmallWavesFrequency');
		this.gui.add(waterMaterial.uniforms.uSmallWavesSpeed, 'value').min(0).max(4).step(0.01).name('uSmallWavesSpeed');
		this.gui.add(waterMaterial.uniforms.uSmallWavesIterations, 'value').min(0).max(8).step(1).name('uSmallWavesIterations');

		this.gui
			.addColor(debugConfig, 'depthColor')
			.name('depthColor')
			.onChange(() => {
				waterMaterial.uniforms.uDepthColor.value.set(debugConfig.depthColor);
			});
		this.gui
			.addColor(debugConfig, 'surfaceColor')
			.name('surfaceColor')
			.onChange(() => {
				waterMaterial.uniforms.uSurfaceColor.value.set(debugConfig.surfaceColor);
			});

		this.gui.add(waterMaterial.uniforms.uColorOffset, 'value').min(0).max(1).step(0.01).name('uColorOffset');
		this.gui.add(waterMaterial.uniforms.uColorMultiplier, 'value').min(0).max(10).step(0.01).name('uColorMultiplier');

		// console.log(waterGeometry, waterMaterial, water);
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

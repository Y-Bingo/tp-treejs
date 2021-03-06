import * as dat from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import galaxyFragmentShader from '../Shaders/Galaxy/galaxy.fs.glsl';
import galaxyVertexShader from '../Shaders/Galaxy/galaxy.vs.glsl';
import { BaseJourney } from './BaseJourney';

/**
 *  Journey - Journey - Animated Galaxy
 */

export class Journey30 extends BaseJourney {
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
	}

	/**
	 * @override
	 */

	private controls: OrbitControls;
	protected initCamera(): void {
		const camera = new THREE.PerspectiveCamera(75, this.width / this.height);
		camera.position.set(4, 4, 4);
		camera.lookAt(new THREE.Vector3(0, 0, 0));

		this.camera = camera;
		this.scene.add(camera);
	}

	/**
	 * @override
	 */
	private parameters: any;
	private geometry: THREE.BufferGeometry;
	// private material: THREE.PointsMaterial;
	private material: THREE.ShaderMaterial;
	private points: THREE.Points;
	private generateGalaxy(): void {
		if (this.points != null) {
			this.geometry?.dispose();
			this.material?.dispose();
			this.scene?.remove(this.points);
		}

		const parameters = this.parameters;
		const geometry = this.geometry;
		const points = this.points;

		const positions = new Float32Array(parameters.count * 3);
		const colors = new Float32Array(parameters.count * 3);
		const scale = new Float32Array(parameters.count * 1);
		const randomness = new Float32Array(parameters.count * 3);

		const insideColor = new THREE.Color(parameters.insideColor);
		const outsideColor = new THREE.Color(parameters.outsideColor);

		for (let i = 0; i < parameters.count; i++) {
			const i3 = i * 3;
			// position
			const radius = Math.random() * parameters.radius;
			const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

			positions[i3 + 0] = Math.cos(branchAngle) * radius;
			positions[i3 + 1] = 0.0;
			positions[i3 + 2] = Math.sin(branchAngle) * radius;

			const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() > 0.5 ? 1 : -1) * parameters.randomness * radius;
			const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() > 0.5 ? 1 : -1) * parameters.randomness * radius;
			const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() > 0.5 ? 1 : -1) * parameters.randomness * radius;

			randomness[i3 + 0] = randomX;
			randomness[i3 + 1] = randomY;
			randomness[i3 + 2] = randomZ;

			// color
			const mixedColor = insideColor.clone();
			mixedColor.lerp(outsideColor, radius / parameters.radius);

			colors[i3 + 0] = mixedColor.r;
			colors[i3 + 1] = mixedColor.g;
			colors[i3 + 2] = mixedColor.b;

			scale[i] = Math.random();
		}

		geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
		geometry.setAttribute('aScale', new THREE.BufferAttribute(scale, 1));
		geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3));

		this.scene?.add(points);
	}

	protected initModel(): void {
		const gui = this.gui;

		const parameters: any = {};
		parameters.count = 20000;
		parameters.radius = 5;
		parameters.branches = 3;
		parameters.randomness = 0.5;
		parameters.randomnessPower = 3;
		parameters.insideColor = 0xff6030;
		parameters.outsideColor = 0x1b3984;

		this.parameters = parameters;

		const geometry = new THREE.BufferGeometry();
		this.geometry = geometry;

		const material = new THREE.ShaderMaterial({
			depthWrite: false,
			blending: THREE.AdditiveBlending,
			vertexColors: true,
			vertexShader: galaxyVertexShader,
			fragmentShader: galaxyFragmentShader,
			uniforms: {
				uTime: { value: 0 },
				uSize: { value: 30 * this.renderer.getPixelRatio() },
			},
		});

		this.material = material;

		const points = new THREE.Points(geometry, material);
		this.points = points;

		this.generateGalaxy();

		// DEBUG
		gui.add(parameters, 'count').min(100).max(100000).step(100).onFinishChange(this.generateGalaxy.bind(this));
		gui.add(parameters, 'radius').min(0.01).max(20).step(0.001).onFinishChange(this.generateGalaxy.bind(this));
		gui.add(parameters, 'branches').min(1).max(6).step(1).onFinishChange(this.generateGalaxy.bind(this));
		gui.add(parameters, 'randomness').min(0.01).max(3).step(0.01).onFinishChange(this.generateGalaxy.bind(this));
		gui.add(parameters, 'randomnessPower').min(1).max(5).step(0.1).onFinishChange(this.generateGalaxy.bind(this));
		gui.addColor(parameters, 'insideColor').onFinishChange(this.generateGalaxy.bind(this));
		gui.addColor(parameters, 'outsideColor').onFinishChange(this.generateGalaxy.bind(this));
	}

	/**
	 * @override
	 */
	protected onRender(): void {
		this.controls.update();
		this.renderer.render(this.scene, this.camera);

		const elapsedTime = this.clock.getElapsedTime();
		this.material.uniforms.uTime.value = elapsedTime;
	}

	/**
	 * @protected
	 */
	protected onDestroy(): void {
		this.gui?.destroy();
		this.gui = null;
	}
}

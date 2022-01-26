import * as dat from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BaseJourney } from './BaseJourney';

/**
 *  Galaxy Generator
 */

export class Journey19 extends BaseJourney {
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
		camera.position.set(0, 4, 4);
		camera.lookAt(new THREE.Vector3(0, 0, 0));

		this.camera = camera;
		this.scene.add(camera);
	}

	/**
	 * @override
	 */
	private parameters: any;
	private geometry: THREE.BufferGeometry;
	private material: THREE.PointsMaterial;
	private points: THREE.Points;
	private generateGalaxy(): void {
		if (this.points != null) {
			this.geometry?.dispose();
			this.material?.dispose();
			this.scene?.remove(this.points);
		}

		const parameters = this.parameters;
		const geometry = this.geometry;
		const material = this.material;
		const points = this.points;
		const positions = new Float32Array(parameters.count * 3);
		const colors = new Float32Array(parameters.count * 3);

		const insideColor = new THREE.Color(parameters.insideColor);
		const outsideColor = new THREE.Color(parameters.outsideColor);

		for (let i = 0; i < parameters.count; i++) {
			const i3 = i * 3;
			// position
			const radius = Math.random() * parameters.radius;
			const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;
			const spinAngle = parameters.spin * radius;

			const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() > 0.5 ? 1 : -1) * parameters.randomness;
			const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() > 0.5 ? 1 : -1) * parameters.randomness;
			const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() > 0.5 ? 1 : -1) * parameters.randomness;

			positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX;
			positions[i3 + 1] = randomY;
			positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

			// color
			const mixedColor = insideColor.clone();
			mixedColor.lerp(outsideColor, radius / parameters.radius);

			colors[i3 + 0] = mixedColor.r;
			colors[i3 + 1] = mixedColor.g;
			colors[i3 + 2] = mixedColor.b;
		}

		geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

		material.size = parameters.size;
		material.sizeAttenuation = true;
		material.depthWrite = false;
		material.blending = THREE.AdditiveBlending;

		this.scene?.add(points);
	}

	protected initModel(): void {
		const gui = this.gui;
		const scene = this.scene;
		const textureLoader = new THREE.TextureLoader();
		const particlesTexture = textureLoader.load('./resource/journey/particles/2.png');

		const parameters: any = {};
		parameters.count = 20000;
		parameters.size = 0.02;
		parameters.radius = 5;
		parameters.branches = 3;
		parameters.spin = 1;
		parameters.randomness = 0.5;
		parameters.randomnessPower = 2;
		parameters.insideColor = 0xff6030;
		parameters.outsideColor = 0x1b3984;

		this.parameters = parameters;

		const geometry = new THREE.BufferGeometry();
		this.geometry = geometry;

		const material = new THREE.PointsMaterial();
		material.depthWrite = false;
		material.blending = THREE.AdditiveBlending;
		material.vertexColors = true;
		this.material = material;

		const points = new THREE.Points(geometry, material);
		this.points = points;

		this.generateGalaxy();

		// DEBUG
		gui.add(parameters, 'count').min(100).max(100000).step(100).onFinishChange(this.generateGalaxy.bind(this));
		gui.add(parameters, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(this.generateGalaxy.bind(this));
		gui.add(parameters, 'radius').min(0.01).max(20).step(0.001).onFinishChange(this.generateGalaxy.bind(this));
		gui.add(parameters, 'branches').min(1).max(6).step(1).onFinishChange(this.generateGalaxy.bind(this));
		gui.add(parameters, 'spin').min(-5).max(5).step(0.01).onFinishChange(this.generateGalaxy.bind(this));
		gui.add(parameters, 'randomness').min(0.01).max(3).step(0.01).onFinishChange(this.generateGalaxy.bind(this));
		gui.add(parameters, 'randomnessPower').min(1).max(5).step(0.1).onFinishChange(this.generateGalaxy.bind(this));
		gui.addColor(parameters, 'insideColor').onFinishChange(this.generateGalaxy.bind(this));
		gui.addColor(parameters, 'outsideColor').onFinishChange(this.generateGalaxy.bind(this));
	}

	/**
	 * @override
	 */
	protected render(): void {
		this.controls.update();
		this.renderer.render(this.scene, this.camera);

		const elapsedTime = this.clock.getElapsedTime();
	}

	/**
	 * @protected
	 */
	protected onDestroy(): void {
		this.gui?.destroy();
		this.gui = null;
	}
}

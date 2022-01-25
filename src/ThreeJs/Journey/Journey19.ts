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
		camera.position.set(0, 2, 2);
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

		for (let i = 0; i < parameters.count; i++) {
			const i3 = i * 3;

			positions[i3 + 0] = (Math.random() - 0.5) * 3;
			positions[i3 + 1] = (Math.random() - 0.5) * 3;
			positions[i3 + 2] = (Math.random() - 0.5) * 3;
		}

		geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

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
		parameters.count = 10000;
		parameters.size = 0.01;
		this.parameters = parameters;

		const geometry = new THREE.BufferGeometry();
		this.geometry = geometry;

		const material = new THREE.PointsMaterial();
		this.material = material;

		const points = new THREE.Points(geometry, material);
		this.points = points;

		this.generateGalaxy();

		// DEBUG
		gui.add(parameters, 'count').min(100).max(100000).step(100).onFinishChange(this.generateGalaxy.bind(this));
		gui.add(parameters, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(this.generateGalaxy.bind(this));
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

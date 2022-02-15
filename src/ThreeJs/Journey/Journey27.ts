import * as dat from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
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
	protected initModel(): void {
		// Geometry
		const geometry = new THREE.PlaneBufferGeometry(1, 1, 32, 32);

		// Material
		const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

		// Mesh
		const mesh = new THREE.Mesh(geometry, material);

		this.scene.add(mesh);
	}

	/**
	 * @override
	 */
	protected onRender(): void {
		this.renderer.render(this.scene, this.camera);
	}

	/**
	 * @protected
	 */
	protected onDestroy(): void {
		this.gui?.destroy();
	}
}

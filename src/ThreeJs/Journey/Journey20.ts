import * as dat from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BaseJourney } from './BaseJourney';

/**
 * Journey - RayCaster
 */

export class Journey20 extends BaseJourney {
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
		// const axesHelp = new THREE.AxesHelper(10);
		// this.scene.add(axesHelp);
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
	protected initModel(): void {
		const object1 = new THREE.Mesh(
			new THREE.SphereBufferGeometry(0.5, 16, 16), //
			new THREE.MeshBasicMaterial({ color: 0xff0000 }),
		);
		object1.position.x = -2;

		const object2 = new THREE.Mesh(
			new THREE.SphereBufferGeometry(0.5, 16, 16), //
			new THREE.MeshBasicMaterial({ color: 0xff0000 }),
		);

		const object3 = new THREE.Mesh(
			new THREE.SphereBufferGeometry(0.5, 16, 16), //
			new THREE.MeshBasicMaterial({ color: 0xff0000 }),
		);
		object3.position.x = 2;

		// RayCaster
		const raycaster = new THREE.Raycaster();

		const rayOrigin = new THREE.Vector3(-3, 0, 0);
		const rayDirection = new THREE.Vector3(10, 0, 0);
        

		this.scene.add(object1, object2, object3);
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
	}
}

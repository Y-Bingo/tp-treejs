import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Application } from './Application';
import { Sizes } from './Utils/Sizes';

/**
 * My Camera
 */
export class Camera {
	private application: Application;
	private sizes: Sizes;
	private scene: THREE.Scene;
	private canvas: HTMLCanvasElement;
	public instance: THREE.PerspectiveCamera;
	public control: OrbitControls;

	/**
	 * constructor
	 */
	constructor() {
		this.application = new Application();
		this.sizes = this.application.sizes;
		this.scene = this.application.scene;
		this.canvas = this.application.canvas;

		this.setInstance();
		this.setOrbitControl();

		// this.sizes.on('resize', this.onResize.bind(this));
	}

	private setInstance(): void {
		this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100);
		this.instance.position.set(6, 4, 8);
		// this.instance.lookAt(new THREE.Vector3());
		// this.instance.up.set(0, 0, 1);
		this.scene.add(this.instance);
	}

	private setOrbitControl(): void {
		this.control = new OrbitControls(this.instance, this.canvas);
		this.control.enableDamping = true;
	}

	public resize(): void {
		// console.log('resize camera');
		this.instance.aspect = this.sizes.width / this.sizes.height;
		this.instance.updateProjectionMatrix();
	}

	public update(): void {}
}

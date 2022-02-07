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
	private mouse: THREE.Vector2;
	private rayCaster: THREE.Raycaster;
	protected onCreated(): void {
		// camera controller
		this.controls = new OrbitControls(this.camera, this.canvas);
		// this.controls.autoRotate = true;
		this.controls.enableDamping = true;

		// axes
		// const axesHelp = new THREE.AxesHelper(10);
		// this.scene.add(axesHelp);

		// rayCaster
		const raycaster = new THREE.Raycaster();
		this.rayCaster = raycaster;

		// mouse
		const mouse = new THREE.Vector2(-2, 2);
		this.mouse = mouse;

		// mouse event
		window.addEventListener('mousemove', event => {
			mouse.x = (event.x / this.width) * 2 - 1;
			mouse.y = -(event.y / this.height) * 2 + 1;
		});

		// click event
		window.addEventListener('mousedown', () => {
			if (!this.curIntersect?.object) return;
			this.curIntersect.object['material']['color'].set(0x00ff00);
		});

		window.addEventListener('mouseup', () => {
			if (!this.curIntersect?.object) return;
			this.curIntersect.object['material']['color'].set(0xff0000);
		});
	}

	/**
	 * @override
	 */

	private controls: OrbitControls;
	protected initCamera(): void {
		const camera = new THREE.PerspectiveCamera(75, this.width / this.height);
		camera.position.set(0, 0, 4);
		camera.lookAt(new THREE.Vector3(0, 0, 0));

		this.camera = camera;
		this.scene.add(camera);
	}

	/**
	 * @override
	 */
	private curIntersect: THREE.Intersection;
	private objects: THREE.Mesh[];
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

		this.objects = [object1, object2, object3];
		this.scene.add(object1, object2, object3);
	}

	/**
	 * @override
	 */
	protected onRender(): void {
		this.controls.update();
		this.renderer.render(this.scene, this.camera);

		// animation
		const elapsedTime = this.clock.getElapsedTime();
		this.objects.forEach((object, index) => {
			object.position.y = Math.sin(elapsedTime * (0.4 * ++index));
		});

		// const rayorigin = new THREE.Vector3(-3, 0, 0);
		// const rayDirection = new THREE.Vector3(1, 0, 0);
		// rayDirection.normalize();
		// this.rayCaster.set(rayorigin, rayDirection);

		this.rayCaster.setFromCamera(this.mouse, this.camera);

		const intersects = this.rayCaster.intersectObjects(this.objects);

		if (intersects.length) {
			this.curIntersect = intersects[0];
		} else {
			this.curIntersect = null;
		}

		// for (let object of this.objects) {
		// 	object.material['color'].set(0xff0000);
		// }

		// for (let intersect of intersects) {
		// 	const object = intersect.object as THREE.Mesh;
		// 	object.material['color'].set(0x00ff00);
		// }
	}

	/**
	 * @protected
	 */
	protected onDestroy(): void {
		this.gui?.destroy();
	}
}

import { BufferAttribute, BufferGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BaseJourney } from './BaseJourney';

/**
 * 09 Journey Geometry
 */
export class Journey09 extends BaseJourney {
	/**
	 * @override
	 */
	private controls: OrbitControls;
	protected initCamera(): void {
		const camera = new PerspectiveCamera(75, this.width / this.height);
		camera.position.set(0, 0, 3);
		camera.lookAt(new Vector3(0, 0, 0));

		this.camera = camera;
		this.scene.add(camera);

		this.controls = new OrbitControls(camera, this.canvas);
		// this.controls.enableDamping = true;
	}

	/**
	 * @override
	 */
	protected initModel(): void {
		// BoxGeometry
		// const geometry = new BoxGeometry(1, 1, 1, 2, 2, 2 );

		// BoxBufferGeometry
		// const geometry = new BoxBufferGeometry(1, 1, 1, 2, 2, 2);

		// BufferGeometry
		const geometry = new BufferGeometry();
		// const pointArray = new Float32Array([
		//     0, 0, 0,  // 0
		//     0, 1, 0,  // 1
		//     1, 0, 0   // 2
		// ]);
		const count = 50;
		const pointArray = new Float32Array(count * 3 * 3);
		for (let i = 0; i < count * 3 * 3; i++) {
			pointArray[i] = Math.random() - 0.5;
		}
		const attribute = new BufferAttribute(pointArray, 3);

		geometry.setAttribute('position', attribute);

		const material = new MeshBasicMaterial({ color: 0xff0000, wireframe: true });
		const mesh = new Mesh(geometry, material);
		this.scene.add(mesh);
	}

	/**
	 * @override
	 */
	protected render(): void {
		this.controls.update();
		this.renderer.render(this.scene, this.camera);
	}
}

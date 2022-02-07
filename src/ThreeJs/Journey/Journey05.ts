import { BoxGeometry, Group, Mesh, MeshBasicMaterial, PerspectiveCamera, Vector3 } from 'three';
import { BaseJourney } from './BaseJourney';

/**
 * 05 Journey Transform Objects
 */
export class Journey05 extends BaseJourney {
	/**
	 * @override
	 */
	protected initCamera(): void {
		const camera = new PerspectiveCamera(75, this.width / this.height);
		camera.position.set(0, 0, 3);
		camera.lookAt(new Vector3(0, 0, 0));

		this.camera = camera;
		this.scene.add(camera);
	}

	/**
	 * @override
	 */
	protected initModel(): void {
		const geometry = new BoxGeometry(1, 1, 1);
		const material = new MeshBasicMaterial({ color: 0xff00 });

		const group = new Group();
		const mesh1 = new Mesh(geometry, material);
		const mesh2 = new Mesh(geometry, material);
		const mesh3 = new Mesh(geometry, material);

		mesh1.position.x = 2;
		mesh2.position.x = 0;
		mesh3.position.x = -2;

		group.add(mesh1);
		group.add(mesh2);
		group.add(mesh3);
		this.scene.add(group);

		const mesh = new Mesh(geometry, material);
		mesh.position.y = 2;
		mesh.scale.y = 0.5;
		mesh.rotation.y = 2;
		mesh.rotation.z = 3;
		mesh.rotation.x = 2;
		this.scene.add(mesh);
		this.camera.lookAt(mesh.position);

		// this.camera.position.set(2, 2, 3)
	}

	/**
	 * @override
	 */
	protected onRender(): void {
		this.renderer.render(this.scene, this.camera);
	}
}

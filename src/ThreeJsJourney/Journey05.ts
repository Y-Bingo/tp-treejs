import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera } from 'three';
import { BaseJourney } from './BaseJourney';

export class Journey05 extends BaseJourney {
	/**
	 * @override
	 */
	protected initCamera(): void {
		const camera = new PerspectiveCamera(75, this.width / this.height);
		camera.position.set(0, 0, 3);

		this.camera = camera;
		this.scene.add(camera);
	}

	/**
	 * @override
	 */
	protected initModel(): void {
		const geometry = new BoxGeometry(1, 1, 1);
		const material = new MeshBasicMaterial({ color: 0xff00 });
		const mesh = new Mesh(geometry, material);
		this.scene.add(mesh);
	}

	/**
	 * @override
	 */
	protected render(): void {
		this.renderer.render(this.scene, this.camera);
	}
}

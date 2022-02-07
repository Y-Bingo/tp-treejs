import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BaseJourney } from './BaseJourney';

/**
 * 07 Journey Camera
 */
export class Journey07 extends BaseJourney {
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
        this.controls.autoRotate = true;
        this.controls.enableDamping = true;
	}

	/**
	 * @override
	 */
	protected initModel(): void {
		const mesh = new Mesh(new BoxGeometry(1, 1, 1), new MeshBasicMaterial({ color: 0xff0000 }));
		this.scene.add(mesh);
	}

	/**
	 * @override
	 */
	protected onRender(): void {
        this.controls.update();
		this.renderer.render(this.scene, this.camera);
	}
}

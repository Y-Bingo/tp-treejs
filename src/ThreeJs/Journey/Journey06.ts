import gsap from 'gsap';
import { BoxGeometry, Clock, Mesh, MeshBasicMaterial, PerspectiveCamera, Vector3 } from 'three';
import { BaseJourney } from './BaseJourney';

/**
 * 06 Journey Animations
 */
export class Journey06 extends BaseJourney {
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
	private cube: Mesh;
	private clock: Clock;
	protected initModel(): void {
		const mesh = new Mesh(new BoxGeometry(1, 1, 1), new MeshBasicMaterial({ color: 0xff0000 }));
		this.cube = mesh;
		this.scene.add(mesh);

		const clock = new Clock();
		this.clock = clock;

        gsap.to(this.cube.position, {delay: 1, x: 3, duration: 2});
        gsap.to(this.cube.position, { delay: 3, x: 0, duration: 2 });
	}

	/**
	 * @override
	 */
	protected render(): void {
		// this.cube.rotation.y = this.clock.getElapsedTime() * Math.PI;
		// this.cube.position.x = Math.sin(this.clock.getElapsedTime());
		// this.camera.lookAt(this.cube.position);
		// this.camera.position.x = Math.sin(this.clock.getElapsedTime());
		this.renderer.render(this.scene, this.camera);
	}
}

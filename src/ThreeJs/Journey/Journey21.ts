import * as dat from 'dat.gui';
import * as THREE from 'three';
import { BaseJourney } from './BaseJourney';

/**
 * Journey - Scroll Base Animation
 * 由于架构问题，本章需要独立制作，所以不做了
 */

export class Journey21 extends BaseJourney {
	private gui: dat.GUI;
	private clock: THREE.Clock;
	private params: any;

	/**
	 * @override
	 */
	protected onCreating(): void {
		// params
		this.params = {
			materialColor: 0xffeded,
		};

		// clock
		this.clock = new THREE.Clock();

		// GUI
		this.gui = new dat.GUI();
	}

	/**
	 * @override
	 */
	protected onCreated(): void {
		// scroll
		let scrollY = window.scrollY;
		window.addEventListener('scroll', () => {
			scrollY = window.scrollY;
			console.log(scrollY);
		});
	}

	/**
	 * @protected
	 */
	protected initLight(): void {
		const directionLight = new THREE.DirectionalLight(0xffffff, 1);
		directionLight.position.set(1, 1, 0);
		this.scene.add(directionLight);
	}

	/**
	 * @override
	 */
	protected initCamera(): void {
		const camera = new THREE.PerspectiveCamera(35, this.width / this.height, 0.1, 100);
		camera.position.set(0, 0, 6);
		// camera.lookAt(new THREE.Vector3(0, 0, 0));

		this.camera = camera;
		this.scene.add(camera);
	}

	/**
	 * @override
	 */
	private meshes: THREE.Mesh[];
	protected initModel(): void {
		const textureLoader = new THREE.TextureLoader();
		const gradientTexture = textureLoader.load('./resource/journey/gradients/3.jpg');
		gradientTexture.magFilter = THREE.NearestFilter;

		// mesh
		const objectDistance = 4;
		const material = new THREE.MeshToonMaterial({ color: this.params.materialColor, gradientMap: gradientTexture });

		const mesh1 = new THREE.Mesh(
			new THREE.TorusBufferGeometry(1, 0.4, 16, 60), //
			material,
		);

		const mesh2 = new THREE.Mesh(
			new THREE.ConeBufferGeometry(1, 2, 32), //
			material,
		);

		const mesh3 = new THREE.Mesh(
			new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16), //
			material,
		);

		mesh1.position.y = -objectDistance * 0;
		mesh2.position.y = -objectDistance * 1;
		mesh3.position.y = -objectDistance * 2;

		this.meshes = [mesh1, mesh2, mesh3];
		this.scene.add(mesh1, mesh2, mesh3);
		// DEBUG
		this.gui.addColor(this.params, 'materialColor').onChange(() => {
			material.color.set(this.params.materialColor);
			// console.log(this.params.materialColor);
		});
	}

	/**
	 * @override
	 */
	protected onRender(): void {
		this.renderer.render(this.scene, this.camera);

		// animation
		const elapsedTime = this.clock.getElapsedTime();
		for (let mesh of this.meshes) {
			mesh.rotation.x = elapsedTime * 0.1;
			mesh.rotation.y = elapsedTime * 0.12;
		}
	}

	/**
	 * @protected
	 */
	protected onDestroy(): void {
		this.gui?.destroy();
	}
}

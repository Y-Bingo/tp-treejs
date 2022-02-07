import { BoxGeometry, LoadingManager, Mesh, MeshBasicMaterial, PerspectiveCamera, TextureLoader, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BaseJourney } from './BaseJourney';

/**
 * 11 Journey Textures
 */
export class Journey11 extends BaseJourney {
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
		// this.controls.autoRotate = true;
		this.controls.enableDamping = true;
	}

	/**
	 * @override
	 */
	protected initModel(): void {
		// Texture
		const loadingMrg = new LoadingManager();
		loadingMrg.onLoad = () => {
			console.log('load Complete');
		};
		loadingMrg.onError = (url: string) => {
			console.log('load error: ', url);
		};
		loadingMrg.onProgress = (url: string, loaded: number, total: number) => {
			console.info(`loading.....${loaded}/${total} - ${url}`);
		};
		const textureLoader = new TextureLoader(loadingMrg);
		const texture = textureLoader.load('./resource/journey/door/color.jpg');

		// mesh
		const geometry = new BoxGeometry(1, 1, 1);
		const material = new MeshBasicMaterial({ map: texture });
		const mesh = new Mesh(geometry, material);
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

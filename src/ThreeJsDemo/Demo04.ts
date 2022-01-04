import {
    BoxGeometry, Camera,
    DirectionalLight, Mesh, MeshPhongMaterial,
    PerspectiveCamera, TextureLoader
} from 'three';
import BaseApplication from './BaseDemo';

export const DEMO_04_NAME = '04 简单用例';

/**
 *  04 简单用例
 */
export class Demo04 extends BaseApplication {
	public appName: string = DEMO_04_NAME;

	private camera: Camera;

	/** @override */
	public onCreate(): void {
		this.initRender();
		this.initScene();
		this.initCamera();
		this.initLight();
		this.initObject();
	}

	/**
	 * @override
	 */
	protected initCamera(): void {
		const camera = new PerspectiveCamera(45, this.width / this.height, 1, 4000);
		camera.position.set(0, 0, 3); // 设置相机位置
		// camera.lookAt(this.viewCenter); // 设置相机视点

		this.camera = camera;
		this.scene.add(camera);
	}

	/**
	 * @override
	 */
	protected initLight(): void {
		const directorLight = new DirectionalLight(0xffffff, 1.5);
		directorLight.position.set(0, 0, 1);
		this.scene.add(directorLight);
	}

	/**
	 * @override
	 */
	private cube: Mesh;
	protected initObject(): void {
		// 获取纹理
		const map = new TextureLoader().load('./resource/textures/disturb.jpg');;
		const material = new MeshPhongMaterial({ map: map });
		const geometry = new BoxGeometry(1, 1, 1);
		const cube = new Mesh(geometry, material);
		this.scene.add(cube);
		this.cube = cube;
	}

	/**
	 * @override
	 */
	public render(): void {
		this.renderer;
		this.renderer.render(this.scene, this.camera);
		this.cube.rotation.x += 0.02;
		this.cube.rotation.y += 0.02;

		requestAnimationFrame(this.render.bind(this));
	}

	/**
	 * @override
	 */
	public destroy(): void {
		this.scene.clear();
		this.renderer.clear();
		console.log(`销毁应用【${this.appName}】`);
	}
}

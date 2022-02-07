import { AmbientLight, BoxGeometry, Mesh, MeshLambertMaterial, PerspectiveCamera, PointLight } from 'three';
import { BaseDemo } from './BaseDemo';


/**
 * 01
 * 渲染一个正方体
 */
export class Demo01 extends BaseDemo {
	/**
	 * @override
	 */
	protected initCamera(): void {
		const camera = new PerspectiveCamera(45, this.width / this.height, 100);
		camera.position.set(200, 400, 600); // 设置相机位置
		camera.up.set(0, 1, 0); // 设置相机正方向
		camera.lookAt(this.viewCenter); // 设置相机视点

		this.camera = camera;
		this.scene.add(camera);
	}

	/**
	 * @override
	 */
	protected initLight(): void {
		// 点光源
		const pointLight = new PointLight(0xffffff, 1, 1000);
		pointLight.position.set(70, 112, 98);
		// 环境光
		const ambientLight = new AmbientLight(0x333);

		this.scene.add(pointLight);
		this.scene.add(ambientLight);
	}

	/**
	 * @override
	 */
	private cube: Mesh;
	protected initModel(): void {
		const geometry = new BoxGeometry(100, 100, 100);
		const material = new MeshLambertMaterial({ color: 0xffffff });
		const cube = new Mesh(geometry, material);
		cube.position.set(0, 0, 0);

		this.cube = cube;
		this.scene.add(cube);
	}

	/**
	 * @override
	 */
	public onRender(): void {
		this.renderer.clear();
		this.renderer.render(this.scene, this.camera);
		this.cube.rotation.x += 0.005;
		this.cube.rotation.y += 0.005;
	}
}

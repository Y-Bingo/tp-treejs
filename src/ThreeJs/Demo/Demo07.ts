import { AmbientLight, AxesHelper, BoxGeometry, GridHelper, Mesh, MeshLambertMaterial, PerspectiveCamera, PointLight } from 'three';
import { BaseDemo } from './BaseDemo';


/**
 * 07
 * 增加场景辅助
 */
export class Demo07 extends BaseDemo {
	/**
	 * @override
	 */
	protected initCamera(): void {
		const camera = new PerspectiveCamera(45, this.width / this.height, 100);
		camera.position.set(100, 200, 400); // 设置相机位置
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
		const ambientLight = new AmbientLight(0xff0000);

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

		// 辅助工具
		const axesHelper = new AxesHelper(500);
		this.scene.add(axesHelper);

		const gridHelper = new GridHelper(500, 10, 'rgba(200,200,200)', 'rgba(200,200,200)');
		this.scene.add(gridHelper);
	}

	/**
	 * @override
	 */
	public render(): void {
		// this.renderer.clear();
		this.renderer.render(this.scene, this.camera);
	}
}

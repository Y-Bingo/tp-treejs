import { AmbientLight, Camera, DoubleSide, Mesh, MeshBasicMaterial, PerspectiveCamera, PointLight, Shape, ShapeGeometry, Vector3 } from 'three';
import BaseApplication from './BaseDemo';

export const DEMO_02_NAME = '02 渲染一个三角形';

/**
 *  02 渲染一个正方体
 */
export class Demo02 extends BaseApplication {
	public appName: string = DEMO_02_NAME;
	private camera: Camera;

	/** @override */
	public onCreate(): void {
		this.viewCenter = new Vector3(0, 0, 0);
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
	private triangle: Mesh;
	protected initObject(): void {
		const triangleShape = new Shape();
		triangleShape.moveTo(0, 100);
		triangleShape.lineTo(-100, -100);
		triangleShape.lineTo(100, -100);
		triangleShape.lineTo(0, 100);

		// 定义形状区域
		const geometry = new ShapeGeometry(triangleShape);
		// 定义材质，颜色
		const material = new MeshBasicMaterial({ color: 0x00ff00, side: DoubleSide });
		//
		const mesh = new Mesh(geometry, material);
		mesh.position.x = 0;
		mesh.position.y = 0;
		mesh.position.z = 1;

		this.triangle = mesh;
		this.scene.add(mesh);
	}

	/**
	 * @override
	 */
	private handle: number = -1;
	public render(): void {
		this.renderer.clear();
		this.renderer.render(this.scene, this.camera);
		// this.triangle.rotation.x += 0.005;
		// this.triangle.rotation.y += 0.005;
		this.triangle.rotation.set(0, 0.05 + this.triangle.rotation.y, 0);
		this.handle = requestAnimationFrame(this.render.bind(this));
	}

	/**
	 * @override
	 */
	public destroy(): void {
		this.scene.clear();
		this.renderer.clear();
		cancelAnimationFrame(this.handle);
		console.log(`销毁应用【${this.appName}】`);
	}
}

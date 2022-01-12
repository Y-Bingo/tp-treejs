import { AmbientLight, DoubleSide, Mesh, MeshBasicMaterial, PerspectiveCamera, PointLight, Shape, ShapeGeometry } from 'three';
import { BaseDemo } from './BaseDemo';


/**
 * 02
 * 渲染一个正方体
 */
export class Demo02 extends BaseDemo {
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
	protected initModel(): void {
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
	public render(): void {
		this.renderer.clear();
		this.renderer.render(this.scene, this.camera);
		// this.triangle.rotation.x += 0.005;
		// this.triangle.rotation.y += 0.005;
		this.triangle.rotation.set(0, 0.05 + this.triangle.rotation.y, 0);
	}
}

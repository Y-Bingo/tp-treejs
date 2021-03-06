import { BufferAttribute, BufferGeometry, Line, LineBasicMaterial, PerspectiveCamera } from 'three';
import { BaseDemo } from './BaseDemo';

/**
 * 03
 * 绘制一条线
 */
export class Demo03 extends BaseDemo {
	/**
	 * @override
	 */
	protected initCamera(): void {
		const camera = new PerspectiveCamera(74, this.width / this.height, 0.1, 100);
		camera.position.set(0, 0, 100); // 设置相机位置
		camera.up.set(0, 0, 100); // 设置相机正方向
		camera.lookAt(this.viewCenter); // 设置相机视点

		this.camera = camera;
		this.scene.add(camera);
	}

	/**
	 * @override
	 */
	protected initModel(): void {
		const material = new LineBasicMaterial({ color: 0x00ff00 });
		const vertices = new Float32Array([-10.0, 0.0, 0.0, 0.0, 10.0, 0.0, 10.0, 0.0, 0.0]);
		const geometry = new BufferGeometry();
		geometry.setAttribute('position', new BufferAttribute(vertices, 3));
		const line = new Line(geometry, material);
		this.scene.add(line);
	}

	/**
	 * @override
	 */
	public onRender(): void {
		this.renderer.render(this.scene, this.camera);
	}
}

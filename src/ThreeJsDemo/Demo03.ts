import { BufferAttribute, BufferGeometry, Line, LineBasicMaterial, PerspectiveCamera } from 'three';
import BaseApplication from './BaseDemo';

export const DEMO_03_NAME = '03 绘制一条线';

/**
 *  03 绘制一条线
 */
export class Demo03 extends BaseApplication {
	public appName: string = DEMO_03_NAME;

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
	protected initObject(): void {
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
	public render(): void {
		this.renderer;
		this.renderer.render(this.scene, this.camera);
		requestAnimationFrame(this.render.bind(this));
	}
}

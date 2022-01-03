import { Scene, Vector3, WebGLRenderer } from 'three';
import { STAGE_HEIGHT, STAGE_WIDTH } from './../Config';
/**
 * 应用基类
 */
export default class BaseApplication {
	protected width: number = STAGE_WIDTH;
	protected height: number = STAGE_HEIGHT;
	protected devicePixelRatio: number = 1;
	protected canvas: HTMLCanvasElement = null;

	protected scene: Scene;
	protected renderer: WebGLRenderer;
	protected viewCenter: Vector3 = new Vector3(0, 0, 0);

	public constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.devicePixelRatio = window.devicePixelRatio;

		this.onCreate();
	}

	/**
	 * @override 子类覆写
	 */
	protected initRender(): void {
		const renderer = new WebGLRenderer({
			antialias: true, // 抗锯齿开启
			canvas: this.canvas,
		});
		renderer.setSize(this.width, this.height); // 设置渲染器的宽度和高度
		renderer.setClearColor('#000000', 1.0); // 设置背景颜色
		renderer.setPixelRatio(this.devicePixelRatio); // 设置设备像素比

		this.renderer = renderer;
	}

	/**
	 * @override 子类覆写
	 */
	protected initScene(): void {
		const scene = new Scene();
		this.scene = scene;
	}

	/**
	 * @override 子类覆写
	 */
	protected initLight(): void {}

	/**
	 * @override 子类覆写
	 */
	protected initObject(): void {}

	/**
	 * @override 子类覆写
	 * 创建后的调用
	 */
	protected onCreate(): void {}

	/**
	 * @override 子类覆写
	 * 开始渲染
	 */
	public render(): void {}

	/**
	 * @override 子类覆写
	 * 销毁清理
	 */
	public destroy(): void {}
}

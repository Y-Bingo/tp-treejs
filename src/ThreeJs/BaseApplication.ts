import { Camera, Scene, Vector3, WebGLRenderer } from 'three';
import { STAGE_HEIGHT, STAGE_WIDTH } from '../Config';

/**
 * 应用基类
 */
export  class BaseApplication {
	public appId: string = '00';
	public appName: string = 'BASE';
	protected width: number = STAGE_WIDTH;
	protected height: number = STAGE_HEIGHT;
	protected devicePixelRatio: number = 1;
	protected canvas: HTMLCanvasElement = null;

	protected scene: Scene;
	protected camera: Camera;
	protected renderer: WebGLRenderer;
	protected viewCenter: Vector3 = new Vector3(0, 0, 0);

	public constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.devicePixelRatio = window.devicePixelRatio;

		this.create();
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
	 * @override
	 */
	protected initCamera(): void {}

	/**
	 * @override 子类覆写
	 */
	protected initLight(): void {}

	/**
	 * @override 子类覆写
	 */
	protected initModel(): void {}

	/**
	 * @override 子类复写
	 */
	protected onCreate(): void {}

	/**
	 * @override 子类覆写
	 * 开始渲染
	 */
	protected render(): void {}

	/**
	 * @protected 子类覆写
	 * 开始销毁
	 */
	protected onDestroy(): void {}

	/**
	 * 创建后的调用
	 */
	private create(): void {
		this.initRender();
		this.initScene();
		this.initCamera();
		this.initLight();
		this.initModel();
		this.onCreate();
	}

	/**
	 * 开始执行
	 */
	private handle: number = -1;
	public run(): void {
		this.render();
		this.handle = requestAnimationFrame(this.run.bind(this));
	}

	/**
	 * @override 子类覆写
	 * 销毁清理
	 */
	public destroy(): void {
		this.onDestroy();

		this.scene.clear();
		this.renderer.clear();
		cancelAnimationFrame(this.handle);
		console.log(`销毁应用【${this.appId} ${this.appName}】`);
	}
}

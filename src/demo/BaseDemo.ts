/**
 * 应用基类
 */
export default class BaseApplication {
	protected width: number = 0;
	protected height: number = 0;
	protected devicePixelRatio: number = 1;
	protected canvas: HTMLCanvasElement = null;

	public constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.width = canvas.width;
		this.height = canvas.height;
		this.devicePixelRatio = window.devicePixelRatio;

		this.onCreate();
	}

	/**
	 * @override
	 * 创建后的调用
	 */
	protected onCreate(): void {}

	/**
	 * @override
	 * 开始渲染
	 */
	public render(): void {}

	/**
	 * @override
	 * 销毁清理
	 */
	public destroy(): void {}
}

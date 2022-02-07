import { AmbientLight, BoxGeometry, DoubleSide, Mesh, MeshLambertMaterial, PerspectiveCamera, PointLight, TextureLoader } from 'three';
import { TrackballControls } from 'three-trackballcontrols-ts';
import { BaseDemo } from './BaseDemo';

/**
 * 06
 * 使用轨迹球插件（TRACKBALL）
 */
export class Demo06 extends BaseDemo {
	/**
	 * @override
	 */
	protected onCreated(): void {
		this.initController();
	}

	/**
	 * @override
	 */
	protected initCamera(): void {
		const camera = new PerspectiveCamera(45, this.width / this.height, 1, 10000);
		camera.position.set(0, 0, 400);
		camera.lookAt(this.scene.position);
		this.camera = camera;
		this.scene.add(camera);
	}

	/**
	 * @override
	 */
	protected initLight(): void {
		// 环境光
		const ambientLight = new AmbientLight(0xcccccc);
		this.scene.add(ambientLight);
		// 点光源
		const pointLight = new PointLight(0xffffff, 0.8);
		pointLight.position.set(1, 1, 1);
		this.scene.add(pointLight);
	}

	/**
	 * @override
	 */
	protected initModel(): void {
		// 加载图片，生成纹理
		const map = new TextureLoader().load('./resource/textures/UV_Grid_Sm.jpg');
		// 定义纹理在水平和垂直方向简单的重复无穷大
		// map.wrapS = map.wrapT = RepeatWrapping;
		// // 定义纹理的各向异性
		// map.anisotropy = 16;

		const material = new MeshLambertMaterial({ map: map, side: DoubleSide });
		const geometry = new BoxGeometry(100, 200, 10, 10, 10);
		const object = new Mesh(geometry, material);
		this.scene.add(object);
	}

	/**
	 * 初始化用户交互组件
	 */
	private controls: TrackballControls;
	private initController(): void {
		const controls = new TrackballControls(this.camera as any, this.renderer.domElement);
		controls.rotateSpeed = 5;
		controls.zoomSpeed = 3;
		controls.panSpeed = 0.8;
		controls.noZoom = false;
		controls.noPan = false;
		controls.staticMoving = false;
		controls.dynamicDampingFactor = 0.3;

		this.controls = controls;
	}

	/**
	 * @override
	 */
	public onRender(): void {
		this.controls?.update();
		this.renderer.render(this.scene, this.camera);
	}
}

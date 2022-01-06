import {
    AmbientLight,
    ArrowHelper,
    AxesHelper,
    BoxGeometry,
    BufferGeometry,
    CircleGeometry,
    CylinderGeometry,
    DoubleSide,
    IcosahedronGeometry,
    LatheGeometry,
    Mesh,
    MeshLambertMaterial,
    Object3D,
    OctahedronGeometry,
    PerspectiveCamera,
    PlaneGeometry,
    PointLight,
    RepeatWrapping,
    RingGeometry,
    SphereGeometry,
    TetrahedronGeometry,
    TextureLoader,
    TorusGeometry,
    TorusKnotGeometry,
    Vector2,
    Vector3
} from 'three';
import BaseApplication from './BaseDemo';

export const DEMO_05_NAME = '05 内置几何';

/**
 *  05 内置几何
 */
export class Demo05 extends BaseApplication {
	public appName: string = DEMO_05_NAME;
	/**
	 * @override
	 */
	protected initCamera(): void {
		const camera = new PerspectiveCamera(45, this.width / this.height, 1, 2000);
		camera.position.y = 400; // 设置相机位置
		camera.lookAt(this.scene.position);
		this.camera = camera;
		this.scene.add(camera);
	}

	/**
	 * @override
	 */
	protected initLight(): void {
		// 环境光
		const ambientLight = new AmbientLight(0xcccccc, 0.4);
		this.scene.add(ambientLight);
		// 点光源
		const pointLight = new PointLight(0xffffff, 0.8);
		this.scene.add(pointLight);
	}

	/**
	 * @override
	 */
	protected initModel(): void {
		// 加载图片，生成纹理
		const map = new TextureLoader().load('./resource/textures/UV_Grid_Sm.jpg');
		// 定义纹理在水平和垂直方向简单的重复无穷大
		map.wrapS = map.wrapT = RepeatWrapping;
		// 定义纹理的各向异性
		map.anisotropy = 16;

		const material = new MeshLambertMaterial({ map: map, side: DoubleSide });

		let object: Object3D,
			geometry: BufferGeometry,
			scene = this.scene;
		// 球形网络
		geometry = new SphereGeometry(75, 20, 10);
		object = new Mesh(geometry, material);
		object.position.set(-300, 0, 200);
		scene.add(object);

		// 二十面体
		geometry = new IcosahedronGeometry(75, 1);
		object = new Mesh(geometry, material);
		object.position.set(-100, 0, 200);
		scene.add(object);

		// 八面体
		geometry = new OctahedronGeometry(75, 2);
		object = new Mesh(geometry, material);
		object.position.set(100, 0, 200);
		scene.add(object);

		// 四面体
		geometry = new TetrahedronGeometry(75, 0);
		object = new Mesh(geometry, material);
		object.position.set(300, 0, 200);
		scene.add(object);

		// 长方体平面
		geometry = new PlaneGeometry(100, 100, 4, 4);
		object = new Mesh(geometry, material);
		object.position.set(-300, 0, 0);
		scene.add(object);

		// 立方体
		geometry = new BoxGeometry(100, 100, 100, 4, 4, 4);
		object = new Mesh(geometry, material);
		object.position.set(-100, 0, 0);
		scene.add(object);

		// 圆形平面
		geometry = new CircleGeometry(50, 20, 0, Math.PI * 2);
		object = new Mesh(geometry, material);
		object.position.set(100, 0, 0);
		scene.add(object);

		// 空心圆平面
		geometry = new RingGeometry(10, 50, 20, 5, 0, Math.PI * 2);
		object = new Mesh(geometry, material);
		object.position.set(300, 0, 0);
		scene.add(object);

		// 圆柱体
		geometry = new CylinderGeometry(25, 75, 100, 40, 5);
		object = new Mesh(geometry, material);
		object.position.set(-300, 0, -200);
		scene.add(object);

		// 车床模型
		const points = [];
		for (let i = 0; i < 50; i++) {
			points.push(new Vector2(Math.sin(i * 0.2) * Math.sin(i * 0.1) * 15 + 50, (i - 5) * 2));
		}
		geometry = new LatheGeometry(points, 20);
		object = new Mesh(geometry, material);
		object.position.set(-100, 0, -200);
		scene.add(object);

		// 救生圈
		geometry = new TorusGeometry(50, 20, 20, 20);
		object = new Mesh(geometry, material);
		object.position.set(100, 0, -200);
		scene.add(object);

		// 环形结构
		geometry = new TorusKnotGeometry(50, 10, 50, 20);
		object = new Mesh(geometry, material);
		object.position.set(300, 0, -200);
		scene.add(object);

		// 轴辅助
		object = new AxesHelper(50);
		object.position.set(450, 0, 200);
		scene.add(object);

		// 箭头辅助
		object = new ArrowHelper(new Vector3(0, 1, 0), new Vector3(0, 0, 0), 50, 0x00ffff);
		object.position.set(450, 0, -200);
		scene.add(object);
	}

	/**
	 * @override
	 */
	public render(): void {
		const timer = Date.now() * 0.0001;

		this.camera.position.x = Math.cos(timer) * 800;
		this.camera.position.z = Math.sin(timer) * 800;

		this.camera.lookAt(this.scene.position);

		this.scene.traverse(function (object) {
			if (object.isObject3D === true) {
				// object.rotation.x = timer * 5;
				// object.rotation.y = timer * 0.001 * 2.5;
				object.rotation.x += 0.001;
				object.rotation.y += 0.001;
			}
		});

		this.renderer.render(this.scene, this.camera);
	}
}

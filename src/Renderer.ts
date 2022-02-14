import * as THREE from 'three';
import { Application } from './Application';
import { Camera } from './Camera';
import { Sizes } from './Utils/Sizes';

/**
 * Renderer
 */
export class Renderer {
	private application: Application;
	private canvas: HTMLCanvasElement;
	private sizes: Sizes;
	private scene: THREE.Scene;
	public camera: Camera;
	public instance: THREE.WebGLRenderer;

	/**
	 * constructor
	 */
	constructor() {
		this.application = new Application();
		this.sizes = this.application.sizes;
		this.scene = this.application.scene;
		this.canvas = this.application.canvas;
		this.camera = this.application.camera;

		this.setInstance();
	}

	private setInstance(): void {
		this.instance = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
		this.instance.physicallyCorrectLights = true;
		this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
		this.instance.outputEncoding = THREE.sRGBEncoding;
		this.instance.toneMapping = THREE.CineonToneMapping;
		this.instance.toneMappingExposure = 1.75;
		this.instance.shadowMap.enabled = true;
		this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
		this.instance.setClearColor(0x211d20, 1);
		this.instance.setSize(this.sizes.width, this.sizes.height); // 设置渲染器的宽度和高度
		this.instance.setPixelRatio(this.sizes.devicePixelRatio); // 设置设备像素比
		this.instance.render(this.scene, this.camera.instance);
	}

	public resize() {
		this.instance.setSize(this.sizes.width, this.sizes.height); // 设置渲染器的宽度和高度
		this.instance.setPixelRatio(this.sizes.devicePixelRatio); // 设置设备像素比
	}

	public update() {
		// this.instance.clear();
		this.instance.render(this.scene, this.camera.instance);
	}
}

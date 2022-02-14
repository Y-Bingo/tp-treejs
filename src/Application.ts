import * as THREE from 'three';
import { Camera } from './Camera';
import { Renderer } from './Renderer';
import sources from './Source';
import { Debug } from './Utils/Debug';
import { Resource } from './Utils/Resource';
import { Sizes } from './Utils/Sizes';
import { Time } from './Utils/Time';
import { World } from './World/World';

let instance = null;

/**
 * Main Singleton
 */
export class Application {
	public canvas: HTMLCanvasElement;
	public debug: Debug;
	public sizes: Sizes;
	public time: Time;

	public scene: THREE.Scene;
	public camera: Camera;
	public renderer: Renderer;
	public world: World;
	public resource: Resource;

	constructor(canvas?: HTMLCanvasElement) {
		if (instance) {
			return instance;
		}
		instance = this;

		// Options
		this.canvas = canvas;

		// Setup
		this.debug = new Debug();
		this.sizes = new Sizes();
		this.sizes.on('resize', this.onResize.bind(this));
		this.time = new Time();
		this.time.on('tick', this.onTick.bind(this));
		this.resource = new Resource(sources);
		this.scene = new THREE.Scene();
		this.camera = new Camera();
		this.renderer = new Renderer();
		this.world = new World();

		window['application'] = this;
	}

	private onResize(): void {
		this.resize();
	}

	private onTick(): void {
		this.update();
	}

	private resize(): void {
		//
		this.camera.resize();
		this.renderer.resize();
	}

	private update(): void {
		//
		this.camera.update();
		this.world.update();
		this.renderer.update();
	}

	public destroy(): void {
		this.sizes.off('resize');
		this.time.off('tick');

		this.scene.traverse(child => {
			if (child instanceof THREE.Mesh) {
				child.geometry.dispose();

				for (const key in child.material) {
					const value = child.material[key];
					if (value && typeof value.dispose === 'function') {
						value.dispose();
					}
				}
			}
		});

		this.camera.control.dispose();
		this.renderer.instance.dispose();
		this.debug.ui?.destroy();
	}
}

import * as THREE from 'three';
import { Camera } from './Camera';
import { Renderer } from './Renderer';
import sources from './Source';
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
		this.sizes = new Sizes();
		this.sizes.on('resize', this.onResize.bind(this));
		this.time = new Time();
		this.time.on('tick', this.onTick.bind(this));
		this.resource = new Resource(sources);
		this.scene = new THREE.Scene();
		this.camera = new Camera();
		this.renderer = new Renderer();
		this.world = new World();
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
}

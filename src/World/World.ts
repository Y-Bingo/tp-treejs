import * as THREE from 'three';
import { Application } from '../Application';
import { Resource } from '../Utils/Resource';
import { Environment } from './Environment';
import { Floor } from './Floor';
import { Fox } from './Fox';

export class World {
	private application: Application;
	private scene: THREE.Scene;
	private resource: Resource;
	private floor: Floor;
	private fox: Fox;
	private environment: Environment;
	/**
	 * constructor
	 */
	constructor() {
		this.application = new Application();
		this.scene = this.application.scene;
		this.resource = this.application.resource;

		this.resource.on('loaded', this.onLoaded.bind(this));
	}

	private onLoaded(): void {
		// Setup
		this.fox = new Fox();
		this.floor = new Floor();
		this.environment = new Environment();
	}

	public update(): void {
		this.fox?.update();
	}
}

import * as THREE from 'three';
import { Application } from '../Application';
import { Resource } from '../Utils/Resource';
import { Environment } from './Environment';
import { Floor } from './Floor';

export class World {
	private application: Application;
	private scene: THREE.Scene;
	private resource: Resource;
    private floor: Floor;
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
		// test mesh
		const testMesh = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ wireframe: false }));

		this.scene.add(testMesh);

		// Setup
        this.floor = new Floor();
		this.environment = new Environment();
	}
}

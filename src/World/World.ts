import * as THREE from 'three';
import { Application } from '../Application';
import { Resource } from '../Utils/Resource';
import { Environment } from './Environment';

export class World {
	private application: Application;
	private scene: THREE.Scene;
	private environment: Environment;
	private resource: Resource;
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
		this.environment = new Environment();
	}
}

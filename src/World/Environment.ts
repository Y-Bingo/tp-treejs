import * as THREE from 'three';
import { Application } from '../Application';
import { Debug } from '../Utils/Debug';
import { Resource } from '../Utils/Resource';

export class Environment {
	private application: Application;
	private scene: THREE.Scene;
	private resource: Resource;

	private debug: Debug;
	private debugFolder: any;

	private sunLight: THREE.DirectionalLight;
	private environmentMap: any;

	/**
	 * constructor
	 */
	constructor() {
		this.application = new Application();
		this.scene = this.application.scene;
		this.resource = this.application.resource;
		this.debug = this.application.debug;

		// debug
		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('environment');
		}

		this.setSunLight();
		this.setEnvironment();
	}

	private setSunLight(): void {
		this.sunLight = new THREE.DirectionalLight(0xffffff, 4);
		this.sunLight.castShadow = true;
		this.sunLight.shadow.camera.far = 15;
		this.sunLight.shadow.mapSize.set(1024, 1024);
		this.sunLight.shadow.normalBias = 0.05;
		this.sunLight.position.set(3.5, 3, -2.25);

		this.scene.add(this.sunLight);

		if (this.debug.active) {
			this.debugFolder.add(this.sunLight, 'intensity').name('sunLightIntensity').min(0).max(10).step(0.01); //
			this.debugFolder.add(this.sunLight.position, 'x').name('sunLight-X').min(-5).max(5).step(0.01); //
			this.debugFolder.add(this.sunLight.position, 'y').name('sunLight-Y').min(-5).max(5).step(0.01); //
			this.debugFolder.add(this.sunLight.position, 'z').name('sunLight-Z').min(-5).max(5).step(0.01); //
		}
	}

	private setEnvironment(): void {
		this.environmentMap = {};
		this.environmentMap.intensity = 2.4;
		this.environmentMap.texture = this.resource.items.environmentMapTexture;
		this.environmentMap.texture.encoding = THREE.sRGBEncoding;
		this.environmentMap.updateMaterials = () => {
			this.scene.children.forEach(child => {
				if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
					child.material.envMap = this.environmentMap.texture;
					child.material.envMapIntensity = this.environmentMap.intensity;
					child.material.needsUpdate = true;
				}
			});
		};
		// this.scene.background = this.environmentMap.texture;
		this.scene.environment = this.environmentMap.texture;
		this.environmentMap.updateMaterials();

		if (this.debug.active) {
			this.debugFolder
				.add(this.environmentMap, 'intensity')
				.name('envMapIntensity')
				.min(0)
				.max(10)
				.step(0.01)
				.onChange(() => {
					this.environmentMap.updateMaterials();
				});
		}
	}
}

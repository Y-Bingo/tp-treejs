import * as THREE from 'three';
import { Application } from '../Application';
import { Resource } from '../Utils/Resource';

export class Environment {
	private application: Application;
	private scene: THREE.Scene;
	private resource: Resource;
	private sunLight: THREE.DirectionalLight;
	private environmentMap: any;

	/**
	 * constructor
	 */
	constructor() {
		this.application = new Application();
		this.scene = this.application.scene;
		this.resource = this.application.resource;

		this.setSunLight();
		this.setEnvironment();
	}

	private setSunLight(): void {
		this.sunLight = new THREE.DirectionalLight(0xffffff, 4);
		this.sunLight.castShadow = true;
		this.sunLight.shadow.camera.far = 15;
		this.sunLight.shadow.mapSize.set(1024, 1024);
		this.sunLight.shadow.normalBias = 0.05;
		this.sunLight.position.set(3.5, 2, 1.25);

		this.scene.add(this.sunLight);
	}

	private setEnvironment(): void {
		this.environmentMap = {};
		this.environmentMap.intensity = 1.4;
		this.environmentMap.texture = this.resource.items.environmentMapTexture;
		this.environmentMap.texture.encoding = THREE.sRGBEncoding;
		this.environmentMap.updateMaterial = () => {
			this.scene.children.forEach(child => {
				if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
					child.material.envMap = this.environmentMap.texture;
					child.material.envMapIntensity = this.environmentMap.intensity;
					child.material.needsUpdate = true;
				}
			});
		};
        this.scene.background = this.environmentMap.texture;
		this.scene.environment = this.environmentMap.texture;
		this.environmentMap.updateMaterial();
	}
}

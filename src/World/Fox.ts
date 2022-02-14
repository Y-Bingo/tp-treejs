import * as THREE from 'three';
import { Application } from '../Application';
import { Resource } from '../Utils/Resource';
import { Time } from '../Utils/Time';

export class Fox {
	private application: Application;
	private scene: THREE.Scene;
	private resource: Resource;
	public time: Time;

	private model: any;
	private animation: any;
	/**
	 *
	 */
	constructor() {
		this.application = new Application();
		this.scene = this.application.scene;
		this.resource = this.application.resource;
		this.time = this.application.time;

		this.setModel();
		this.setAnimation();
	}

	private setModel(): void {
		this.model = this.resource.items.foxModel.scene;
		this.model.scale.set(0.02, 0.02, 0.02);
		this.scene.add(this.model);

		this.model.traverse(child => {
			if (child instanceof THREE.Mesh) {
				child.castShadow = true;
			}
		});
	}

	private setAnimation(): void {
		this.animation = {};
		this.animation.mixer = new THREE.AnimationMixer(this.model);
		this.animation.action = this.animation.mixer.clipAction(this.resource.items.foxModel.animations[0]);
        this.animation.action.play();
	}

	public update(): void {
		this.animation?.mixer?.update(this.time.delta * 0.001);
	}
}

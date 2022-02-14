import * as THREE from 'three';
import { Application } from '../Application';
import { Debug } from '../Utils/Debug';
import { Resource } from '../Utils/Resource';
import { Time } from '../Utils/Time';

export class Fox {
	private application: Application;
	private scene: THREE.Scene;
	private resource: Resource;
	private time: Time;
	private debug: Debug;
	private debugFolder: any;

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
		this.debug = this.application.debug;

		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('fox');
		}

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
		this.animation.actions = {};

		this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.items.foxModel.animations[0]);
		this.animation.actions.walking = this.animation.mixer.clipAction(this.resource.items.foxModel.animations[1]);
		this.animation.actions.running = this.animation.mixer.clipAction(this.resource.items.foxModel.animations[2]);

		this.animation.actions.current = this.animation.actions.idle;
		this.animation.actions.current.play();

		this.animation.play = name => {
			const newAction = this.animation.actions[name];
			const oldAction = this.animation.actions.current;

			newAction.reset();
			newAction.play();
			newAction.crossFadeFrom(oldAction, 1);

			this.animation.actions.current = newAction;
		};

		if (this.debug.active) {
			const debugObj = {
				playIdle: () => {
					this.animation.play('idle');
				},
				playWalking: () => {
					this.animation.play('walking');
				},
				playRunning: () => {
					this.animation.play('running');
				},
			};

			this.debugFolder.add(debugObj, 'playIdle');
			this.debugFolder.add(debugObj, 'playWalking');
			this.debugFolder.add(debugObj, 'playRunning');
		}
	}

	public update(): void {
		this.animation?.mixer?.update(this.time.delta * 0.001);
	}
}

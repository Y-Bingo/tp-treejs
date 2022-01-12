import { PerspectiveCamera, Vector3 } from 'three';
import { BaseJourney } from './BaseJourney';

/**
 * 05 Journey Transform Objects
 */
export class Journey06 extends BaseJourney {
	/**
	 * @override
	 */
	protected initCamera(): void {
		const camera = new PerspectiveCamera(75, this.width / this.height);
		camera.position.set(0, 0, 3);
		camera.lookAt(new Vector3(0, 0, 0));
        
		this.camera = camera;
		this.scene.add(camera);
	}

	/** 
    * @override
    */
	protected initModel(): void {
         
	}

	/**
	 * @override
	 */
	protected render(): void {
		this.renderer.render(this.scene, this.camera);
	}
}

import * as THREE from 'three';
import { Application } from '../Application';
import { Resource } from '../Utils/Resource';

export class Floor {
	private application: Application;
	private scene: THREE.Scene;
	private resource: Resource;

	private texture: any;
	private mesh: THREE.Mesh;
	private geometry: THREE.CircleGeometry;
	private material: THREE.MeshStandardMaterial;
	/**
	 *
	 */
	constructor() {
		this.application = new Application();
		this.scene = this.application.scene;
		this.resource = this.application.resource;

		this.setGeometry();
		this.setTexture();
		this.setMaterial();
		this.setMesh();
	}

	private setGeometry(): void {
		//
		this.geometry = new THREE.CircleGeometry(5, 64);
	}

	private setTexture(): void {
		this.texture = {};
		this.texture.color = this.resource.items.grassColorTexture;
		this.texture.color.encoding = THREE.sRGBEncoding;
		this.texture.color.repeat.set(1.5, 1.5);
		this.texture.color.wrapS = THREE.RepeatWrapping;
		this.texture.color.wrapT = THREE.RepeatWrapping;

		this.texture.normal = this.resource.items.grassNormalTexture;
		this.texture.normal.repeat.set(1.5, 1.5);
		this.texture.normal.wrapS = THREE.RepeatWrapping;
		this.texture.normal.wrapT = THREE.RepeatWrapping;
	}

	private setMaterial(): void {
		this.material = new THREE.MeshStandardMaterial({
			map: this.texture.color,
			normalMap: this.texture.normal,
		});
	}

	private setMesh(): void {
		this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.rotation.x = - Math.PI * 0.5;
        this.scene.add(this.mesh);
	}
}

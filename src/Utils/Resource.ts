import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EventEmitter } from './EventEmitter';

/**
 *
 */
export class Resource extends EventEmitter {
	public sources: any;
	public items: any;
	private toLoad: number;
	private loaded: number;
	private loaders: any;

	/**
	 *
	 */
	constructor(source: any) {
		super();

		this.sources = source;

		// Setup
		this.items = {};
		this.toLoad = this.sources.length;
		this.loaded = 0;

		this.setLoaders();
		this.startLoading();
	}

	private setLoaders(): void {
		this.loaders = {};
		// TODO Draco Loader
		this.loaders.gltfLoader = new GLTFLoader();
		this.loaders.textureLoader = new THREE.TextureLoader();
		this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
	}

	private startLoading(): void {
		// load each source
		for (const source of this.sources) {
			if (source.type === 'gltfModel') {
				this.loaders.gltfLoader.load(source.path, file => {
					this.sourceLoaded(source, file);
				});
			} else if (source.type === 'texture') {
				this.loaders.textureLoader.load(source.path, file => {
					this.sourceLoaded(source, file);
				});
			} else if (source.type === 'cubeTexture') {
				this.loaders.cubeTextureLoader.load(source.path, file => {
					this.sourceLoaded(source, file);
				});
			}
		}
	}

	private sourceLoaded(source: any, file: any): void {
		this.items[source.name] = file;
		this.loaded++;

		if (this.loaded === this.toLoad) {
			this.trigger('loaded');
		}
	}
}

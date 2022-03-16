import * as dat from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { BaseJourney } from './BaseJourney';

/**
 * Journey - modified material
 */

export class Journey31 extends BaseJourney {
	private gui: dat.GUI;
	private clock: THREE.Clock;
	private controls: OrbitControls;
	private params: any;

	/**
	 * @override
	 */
	protected onCreating(): void {
		// params
		this.params = {
			envMapIntensity: 5,
		};

		// clock
		this.clock = new THREE.Clock();

		// GUI
		this.gui = new dat.GUI();
	}

	/**
	 * @override
	 */
	protected onCreated(): void {
		// controller
		this.controls = new OrbitControls(this.camera, this.canvas);
		this.controls.enableDamping = true;

		this.renderer.physicallyCorrectLights = true;
		this.renderer.outputEncoding = THREE.sRGBEncoding;
		this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

		this.gui
			.add(this.renderer, 'toneMapping', {
				No: THREE.NoToneMapping,
				Linear: THREE.LinearToneMapping,
				Cineon: THREE.CineonToneMapping,
				Reinhard: THREE.ReinhardToneMapping,
				ACESF: THREE.ACESFilmicToneMapping,
			})
			.onFinishChange(() => {
				this.renderer.toneMapping = Number(this.renderer.toneMapping);
				this.updateAllMaterial();
			});

		this.gui.add(this.renderer, 'toneMappingExposure').min(0).max(10).step(0.01);
	}

	/**
	 * @protected
	 */
	protected initLight(): void {
		const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
		directionalLight.position.set(0.25, 3, -2.25);
		directionalLight.shadow.mapSize.set(1024, 1024);
		directionalLight.castShadow = true;
		directionalLight.shadow.camera.far = 15;
		directionalLight.shadow.normalBias = 0.05;
		this.scene.add(directionalLight);

		this.gui.add(directionalLight, 'intensity').min(0).max(10).step(0.01).name('lightIntensity');
		this.gui.add(directionalLight.position, 'x').min(-5).max(5).step(0.01).name('lightX');
		this.gui.add(directionalLight.position, 'y').min(-5).max(5).step(0.01).name('lightY');
		this.gui.add(directionalLight.position, 'z').min(-5).max(5).step(0.01).name('lightZ');
	}

	/**
	 * @override
	 */
	protected initCamera(): void {
		const camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 100);
		camera.position.set(5, 2, -5);
		this.camera = camera;
		this.scene.add(camera);
	}

	/**
	 * @override
	 */
	protected initModel(): void {
		const scene = this.scene;
		const textureLoader = new THREE.TextureLoader();
		const cubeTextureLoader = new THREE.CubeTextureLoader();
		const environmentMap = cubeTextureLoader.load([
			'resource/journey/environmentMaps/0/px.jpg',
			'resource/journey/environmentMaps/0/nx.jpg',
			'resource/journey/environmentMaps/0/py.jpg',
			'resource/journey/environmentMaps/0/ny.jpg',
			'resource/journey/environmentMaps/0/pz.jpg',
			'resource/journey/environmentMaps/0/nz.jpg',
		]);
		environmentMap.encoding = THREE.sRGBEncoding;
		scene.background = environmentMap;
		scene.environment = environmentMap;

		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath('resource/draco/');

		const gltfLoader = new GLTFLoader();
		gltfLoader.setDRACOLoader(dracoLoader);

		const mapTexture = textureLoader.load('./resource/journey/models/LeePerrySmith/color.jpg');
		const normalTexture = textureLoader.load('./resource/journey/models/LeePerrySmith/normal.jpg');
		// Material
		const material = new THREE.MeshStandardMaterial({
			map: mapTexture,
			normalMap: normalTexture,
		});

        material.onBeforeCompile = (shader, renderer) => {
            shader.vertexShader = shader.vertexShader.replace(
				'#include <begin_vertex>',
				`
                    #include <begin_vertex>
                    
                `,
			);
        };

		gltfLoader.load(
			'./resource/journey/models/LeePerrySmith/LeePerrySmith.glb',
			gltf => {
				// Model
				const mesh: THREE.Mesh = gltf.scene.children[0] as THREE.Mesh;
				mesh.rotation.y = Math.PI * 0.5;
				mesh.material = material;
				scene.add(mesh);

				this.updateAllMaterial();
			},
			() => {
				console.log('progress');
			},
			e => {
				console.log('error', e);
			},
		);
	}

	private updateAllMaterial(): void {
		this.scene.traverse(child => {
			if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
				child.material.envMapIntensity = this.params.envMapIntensity;
				child.material.needsUpdate = true;
				child.receiveShadow = true;
				child.castShadow = true;
			}
		});
	}

	/**
	 * @override
	 */
	private lastTimeStamp: number = 0;
	protected onRender(): void {
		this.controls.update();
		this.renderer.render(this.scene, this.camera);

		const elapsedTime = this.clock.getElapsedTime();
		const deltaTime = elapsedTime - this.lastTimeStamp;
		this.lastTimeStamp = elapsedTime;
	}

	/**
	 * @protected
	 */
	protected onDestroy(): void {
		this.gui?.destroy();
	}
}

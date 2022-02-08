import * as dat from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { BaseJourney } from './BaseJourney';

/**
 * Journey - Custom Model
 */

export class Journey24 extends BaseJourney {
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
			materialColor: 0xffeded,
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

		// shadow
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	}

	/**
	 * @protected
	 */
	protected initLight(): void {
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
		this.scene.add(ambientLight);

		const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
		directionalLight.castShadow = true;
		directionalLight.shadow.mapSize.set(1024, 1024);
		directionalLight.shadow.camera.far = 15;
		directionalLight.shadow.camera.left = -7;
		directionalLight.shadow.camera.top = 7;
		directionalLight.shadow.camera.right = 7;
		directionalLight.shadow.camera.bottom = -7;
		directionalLight.position.set(5, 5, 5);
		this.scene.add(directionalLight);
	}

	/**
	 * @override
	 */
	protected initCamera(): void {
		const camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 100);
		camera.position.set(-3, 3, 0);
		this.camera = camera;
		this.scene.add(camera);
	}

	/**
	 * @override
	 */
	protected initModel(): void {
		const cubeTextureLoader = new THREE.CubeTextureLoader();

		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath('/draco/');

		const gltfLoader = new GLTFLoader();
		gltfLoader.setDRACOLoader(dracoLoader);

		gltfLoader.load(
			'./resource/journey/models/hamburger/hamburger.glb',
			gltf => {
				this.scene.add(gltf.scene);
			},
			() => {
				console.log('progress');
			},
			e => {
				console.log('error', e);
			},
		);

		// floor
		const floor = new THREE.Mesh(
			new THREE.PlaneBufferGeometry(10, 10),
			new THREE.MeshStandardMaterial({
				color: 0x777777,
				metalness: 0.3,
				roughness: 0.4,
			}),
		);
		floor.rotation.x = -Math.PI * 0.5;
		floor.receiveShadow = true;
		this.scene.add(floor);
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

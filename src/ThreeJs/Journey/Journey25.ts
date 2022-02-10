import * as dat from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { BaseJourney } from './BaseJourney';

/**
 * Journey - realist render
 */

export class Journey25 extends BaseJourney {
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

		this.renderer.physicallyCorrectLights = true;
		// shadow
		// this.renderer.shadowMap.enabled = true;
		// this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	}

	/**
	 * @protected
	 */
	protected initLight(): void {
		// const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
		// this.scene.add(ambientLight);
		// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
		// directionalLight.castShadow = true;
		// directionalLight.shadow.mapSize.set(1024, 1024);
		// directionalLight.shadow.camera.far = 15;
		// directionalLight.shadow.camera.left = -7;
		// directionalLight.shadow.camera.top = 7;
		// directionalLight.shadow.camera.right = 7;
		// directionalLight.shadow.camera.bottom = -7;
		// directionalLight.position.set(5, 5, 5);
		// this.scene.add(directionalLight);

		const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
		directionalLight.position.set(0.25, 3, -2.25);
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
		camera.position.set(-5, 5, 0);
		this.camera = camera;
		this.scene.add(camera);
	}

	/**
	 * @override
	 */
	protected initModel(): void {
		const scene = this.scene;
		const cubeTextureLoader = new THREE.CubeTextureLoader();

		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath('resource/draco/');

		const gltfLoader = new GLTFLoader();
		gltfLoader.setDRACOLoader(dracoLoader);

		gltfLoader.load(
			'./resource/journey/models/FlightHelmet/glTF/FlightHelmet.gltf',
			gltf => {
				const fightHelmet = gltf.scene;
				fightHelmet.scale.set(10, 10, 10);
				fightHelmet.position.set(0, -4, 0);
				fightHelmet.rotation.y = -Math.PI * 0.5;
				scene.add(fightHelmet);

				this.gui.add(fightHelmet.rotation, 'y').min(-Math.PI).max(Math.PI).step(0.001).name('rotationY');
			},
			() => {
				console.log('progress');
			},
			e => {
				console.log('error', e);
			},
		);

		const sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(1, 32, 32), new THREE.MeshStandardMaterial());
		scene.add(sphere);
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

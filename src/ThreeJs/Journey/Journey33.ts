import * as dat from 'dat.gui';
import Stats from 'stats.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BaseJourney } from './BaseJourney';

/**
 * Journey - performance tips
 */

export class Journey33 extends BaseJourney {
	private gui: dat.GUI;
	private stats: Stats;
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

		const stats = new Stats();
		stats.showPanel(0);
		document.body.appendChild(stats.dom);
		this.stats = stats;
	}

	/**
	 * @override
	 */
	protected onCreated(): void {
		// controller
		this.controls = new OrbitControls(this.camera, this.canvas);
		this.controls.enableDamping = true;

		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFShadowMap;
	}

	/**
	 * @protected
	 */
	protected initLight(): void {
		const directionalLight = new THREE.DirectionalLight('#ffffff', 1);
		directionalLight.castShadow = true;
		directionalLight.shadow.mapSize.set(1024, 1024);
		directionalLight.shadow.camera.far = 15;
		directionalLight.shadow.normalBias = 0.05;
		directionalLight.position.set(0.25, 3, 2.25);
		this.scene.add(directionalLight);
	}

	/**
	 * @override
	 */
	protected initCamera(): void {
		const camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 100);
		camera.position.set(2, 2, 6);
		this.camera = camera;
		this.scene.add(camera);
	}

	/**
	 * @override
	 */
	protected initModel(): void {
		const scene = this.scene;
		const cube = new THREE.Mesh(new THREE.BoxBufferGeometry(2, 2, 2), new THREE.MeshStandardMaterial());
		cube.castShadow = true;
		cube.receiveShadow = true;
		cube.position.set(-5, 0, 0);
		scene.add(cube);

		const torusKnot = new THREE.Mesh(new THREE.TorusKnotBufferGeometry(1, 0.4, 128, 32), new THREE.MeshStandardMaterial());
		torusKnot.castShadow = true;
		torusKnot.receiveShadow = true;
		scene.add(torusKnot);

		const sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(1, 32, 32), new THREE.MeshStandardMaterial());
		sphere.position.set(5, 0, 0);
		sphere.castShadow = true;
		sphere.receiveShadow = true;
		scene.add(sphere);

		const floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(10, 10), new THREE.MeshStandardMaterial());
		floor.position.set(0, -2, 0);
		floor.rotation.x = -Math.PI * 0.5;
		floor.castShadow = true;
		floor.receiveShadow = true;
		scene.add(floor);
	}

	/**
	 * @override
	 */
	private lastTimeStamp: number = 0;
	protected onRender(): void {
		this.controls.update();
		this.renderer.render(this.scene, this.camera);

		this.stats.end();
	}

	/**
	 * @protected
	 */
	protected onDestroy(): void {
		this.gui?.destroy();
		this.stats?.dom.parentElement && document.body.removeChild(this.stats.dom);
	}
}

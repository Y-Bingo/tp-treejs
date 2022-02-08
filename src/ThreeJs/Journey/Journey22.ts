import * as CANNON from 'cannon-es';
import * as dat from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BaseJourney } from './BaseJourney';

/**
 * Journey - Physics
 */

export class Journey22 extends BaseJourney {
	private gui: dat.GUI;
	private clock: THREE.Clock;
	private controls: OrbitControls;
	private params: any;
	private world: CANNON.World;

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

		// world
		const world = new CANNON.World();
		world.gravity.set(0, -9.82, 0);
		world.broadphase = new CANNON.SAPBroadphase(world);
		world.allowSleep = true;
		this.world = world;

		const defaultMaterial = new CANNON.Material('default');

		const defaultContactMaterial = new CANNON.ContactMaterial(defaultMaterial, defaultMaterial, {
			friction: 0.1,
			restitution: 0.7,
		});
		world.defaultContactMaterial = defaultContactMaterial;
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
		camera.position.set(-3, 3, 3);
		this.camera = camera;
		this.scene.add(camera);
	}

	private defaultMaterial: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial({
		metalness: 0.3,
		roughness: 0.4,
	});
	private boxGeometry: THREE.BoxBufferGeometry = new THREE.BoxBufferGeometry(1, 1, 1);
	private objectUpdate: any[] = [];
	private createBox(width, height, depth, position: { x: number; y: number; z: number }): void {
		// sphere
		const sphere = new THREE.Mesh(this.boxGeometry, this.defaultMaterial);
		sphere.castShadow = true;
		sphere.scale.set(width, height, depth);
		sphere.position.set(position.x, position.y, position.z);
		this.scene.add(sphere);

		// Cannon Body
		const sphereShape = new CANNON.Box(new CANNON.Vec3(width * 0.5, height * 0.5, depth * 0.5));
		const sphereBody = new CANNON.Body({
			mass: 1,
			position: new CANNON.Vec3(position.x, position.y, position.z),
			shape: sphereShape,
		});
		this.world.addBody(sphereBody);

		this.objectUpdate.push({
			mesh: sphere,
			body: sphereBody,
		});
	}

	private sphereGeometry: THREE.SphereBufferGeometry = new THREE.SphereBufferGeometry(1, 32, 32);
	private createSphere(radius: number, position: { x: number; y: number; z: number }): void {
		// sphere
		const sphere = new THREE.Mesh(this.sphereGeometry, this.defaultMaterial);
		sphere.castShadow = true;
		sphere.scale.set(radius, radius, radius);
		sphere.position.set(position.x, position.y, position.z);
		this.scene.add(sphere);

		// Cannon Body
		const sphereShape = new CANNON.Sphere(radius);
		const sphereBody = new CANNON.Body({
			mass: 1,
			position: new CANNON.Vec3(position.x, position.y, position.z),
			shape: sphereShape,
		});
		this.world.addBody(sphereBody);

		this.objectUpdate.push({
			mesh: sphere,
			body: sphereBody,
		});
	}

	/**
	 * @override
	 */
	protected initModel(): void {
		const cubeTextureLoader = new THREE.CubeTextureLoader();
		const environmentMapTexture = cubeTextureLoader.load(['']);

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

		const floorShape = new CANNON.Plane();
		const floorBody = new CANNON.Body({
			mass: 0,
			shape: floorShape,
		});
		floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI * 0.5);
		this.world.addBody(floorBody);

		// DEBUG
		const gui = this.gui;
		const debugObject: any = {};
		debugObject.createBox = () => {
			this.createBox(Math.random(), Math.random(), Math.random(), { x: (Math.random() - 0.5) * 3, y: 3, z: (Math.random() - 0.5) * 3 });
		};
		debugObject.createSphere = () => {
			this.createSphere(0.5, { x: (Math.random() - 0.5) * 3, y: 3, z: (Math.random() - 0.5) * 3 });
		};
		debugObject.reset = () => {
			for (let object of this.objectUpdate) {
				this.world.removeBody(object.body);
				this.scene.remove(object.mesh);
			}
		};
		gui.add(debugObject, 'createBox');
		gui.add(debugObject, 'createSphere');
		gui.add(debugObject, 'reset');
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
		this.world.step(1 / 60, deltaTime, 3);

		for (let object of this.objectUpdate) {
			object.mesh.position.copy(object.body.position);
			object.mesh.quaternion.copy(object.body.quaternion);
		}
	}

	/**
	 * @protected
	 */
	protected onDestroy(): void {
		this.gui?.destroy();
	}
}

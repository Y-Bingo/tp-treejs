import * as dat from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ColorGUIHelper, makeXYZGUI } from '../../Helper/DebugHelper';
import { BaseJourney } from './BaseJourney';

/**
 * Journey - Haunted House
 */

export class Journey17 extends BaseJourney {
	private gui: dat.GUI;
	private clock: THREE.Clock;

	/**
	 * @override
	 */
	protected onCreating(): void {
		// clock
		this.clock = new THREE.Clock();

		// GUI
		this.gui = new dat.GUI();
	}

	/**
	 * @override
	 */
	protected onCreated(): void {
		// camera controller
		this.controls = new OrbitControls(this.camera, this.canvas);
		// this.controls.autoRotate = true;
		this.controls.enableDamping = true;

		// axes
		// const axesHelp = new THREE.AxesHelper(10);
		// this.scene.add(axesHelp);
	}

	/**
	 * @override
	 */
	private controls: OrbitControls;
	protected initCamera(): void {
		const camera = new THREE.PerspectiveCamera(75, this.width / this.height);
		camera.position.set(0, 4, 8);
		camera.lookAt(new THREE.Vector3(0, 0, 0));

		this.camera = camera;
		this.scene.add(camera);
	}

	protected initLight(): void {
		const scene = this.scene;
		// Ambient Light
		const ambientLight = new THREE.AmbientLight(0xb9d5ff, 0.3);
		const ambientGui = this.gui.addFolder('AmbientLight');
		ambientGui.add(ambientLight, 'intensity', 0, 1, 0.01);
		ambientGui.add(ambientLight, 'visible');
		ambientGui.addColor(new ColorGUIHelper(ambientLight, 'color'), 'value').name('color');
		scene.add(ambientLight);

		// Direction Light
		const directionGui = this.gui.addFolder('DirectionalLight');
		const directionLight = new THREE.DirectionalLight(0xb9d5ff, 0.12);
		directionLight.shadow.mapSize.width = 256;
		directionLight.shadow.mapSize.height = 256;
		directionLight.shadow.camera.far = 15;
		directionLight.position.set(4, 5, -2);

		directionGui.add(directionLight, 'intensity').min(0).max(1.3).step(0.01);
		directionGui.add(directionLight, 'visible');
		directionGui.addColor(new ColorGUIHelper(directionLight, 'color'), 'value').name('color');
		makeXYZGUI(directionGui, directionLight.position, null, () => {
			// directionLightHelper.update();
		});
		scene.add(directionLight);
	}

	/**
	 * @override
	 */
	private ghostArr: THREE.PointLight[];
	protected initModel(): void {
		const material = new THREE.MeshStandardMaterial();
		material.roughness = 0.7;

		// Texture
		const textureLoader = new THREE.TextureLoader();

		const doorColorTexture = textureLoader.load('./resource/journey/door/color.jpg');
		const doorAlphaTexture = textureLoader.load('./resource/journey/door/alpha.jpg');
		const doorAmbientOcclusionTexture = textureLoader.load('./resource/journey/door/ambientOcclusion.jpg');
		const doorHeightTexture = textureLoader.load('./resource/journey/door/height.jpg');
		const doorNormalTexture = textureLoader.load('./resource/journey/door/normal.jpg');
		const doorMetalnessTexture = textureLoader.load('./resource/journey/door/metalness.jpg');
		const doorRoughnessTexture = textureLoader.load('./resource/journey/door/roughness.jpg');

		const bricksColorTexture = textureLoader.load('./resource/journey/bricks/color.jpg');
		const bricksAmbientTexture = textureLoader.load('./resource/journey/bricks/ambientOcclusion.jpg');
		const bricksNormalTexture = textureLoader.load('./resource/journey/bricks/normal.jpg');
		const bricksRoughnessTexture = textureLoader.load('./resource/journey/bricks/roughness.jpg');

		const grassColorTexture = textureLoader.load('./resource/journey/grass/color.jpg');
		const grassAmbientTexture = textureLoader.load('./resource/journey/grass/ambientOcclusion.jpg');
		const grassNormalTexture = textureLoader.load('./resource/journey/grass/normal.jpg');
		const grassRoughnessTexture = textureLoader.load('./resource/journey/grass/roughness.jpg');

		grassColorTexture.repeat.set(8, 8);
		grassAmbientTexture.repeat.set(8, 8);
		grassNormalTexture.repeat.set(8, 8);
		grassRoughnessTexture.repeat.set(8, 8);

		grassColorTexture.wrapS = THREE.RepeatWrapping;
		grassAmbientTexture.wrapS = THREE.RepeatWrapping;
		grassNormalTexture.wrapS = THREE.RepeatWrapping;
		grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

		grassColorTexture.wrapT = THREE.RepeatWrapping;
		grassAmbientTexture.wrapT = THREE.RepeatWrapping;
		grassNormalTexture.wrapT = THREE.RepeatWrapping;
		grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

		// Fog
		const fog = new THREE.Fog(0x262837, 1, 15);
		this.scene.fog = fog;
		this.renderer.setClearColor(0x262837);

		// House
		const house = new THREE.Group();

		const walls = new THREE.Mesh(
			new THREE.BoxBufferGeometry(4, 2.5, 4),
			new THREE.MeshStandardMaterial({
				map: bricksColorTexture,
				aoMap: bricksAmbientTexture,
				normalMap: bricksNormalTexture,
				roughnessMap: bricksRoughnessTexture,
			}),
		);
		walls.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2));
		walls.position.y = 1.25;
		house.add(walls);

		const roof = new THREE.Mesh(
			new THREE.ConeBufferGeometry(3.5, 1, 4),
			new THREE.MeshBasicMaterial({
				color: 0xb35f45,
			}),
		);
		roof.position.set(0, 3, 0);
		roof.rotation.y = Math.PI / 4;
		house.add(roof);

		const door = new THREE.Mesh(
			new THREE.PlaneBufferGeometry(2, 2, 100, 100),
			new THREE.MeshStandardMaterial({
				map: doorColorTexture,
				alphaMap: doorAlphaTexture,
				transparent: true,
				aoMap: doorAmbientOcclusionTexture,
				displacementMap: doorHeightTexture,
				displacementScale: 0.1,
				normalMap: doorNormalTexture,
				metalnessMap: doorMetalnessTexture,
				roughnessMap: doorRoughnessTexture,
			}),
		);
		door.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2));
		door.position.y = 1;
		door.position.z = 2 + 0.01;
		house.add(door);

		const bushGeometry = new THREE.SphereBufferGeometry(1, 16, 16);
		const bushMaterial = new THREE.MeshStandardMaterial({ color: 0x89c854 });
		const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
		bush1.scale.set(0.5, 0.5, 0.5);
		bush1.position.set(1.8, 0.2, 2.2);

		const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
		bush2.scale.set(0.25, 0.25, 0.25);
		bush2.position.set(1.2, 0.2, 2.2);

		const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
		bush3.scale.set(0.4, 0.4, 0.4);
		bush3.position.set(-1.6, 0.2, 2);

		const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
		bush4.scale.set(0.15, 0.15, 0.15);
		bush4.position.set(-1.6, 0.2, 2.4);

		// door light
		const doorLight = new THREE.PointLight(0xff7d46, 1, 7);
		doorLight.castShadow = true;
		doorLight.shadow.mapSize.width = 256;
		doorLight.shadow.mapSize.height = 256;
		doorLight.shadow.camera.far = 7;
		doorLight.position.set(0, 2.0, 2.7);

		house.add(bush1, bush2, bush3, bush4, doorLight);

		// graves
		const graves = new THREE.Group();
		const graveMaterial = new THREE.MeshStandardMaterial({ color: 0x727272 });
		const graveGeometry = new THREE.BoxBufferGeometry(0.6, 0.8, 0.1);

		for (let i = 0; i < 30; i++) {
			const angle = Math.random() * Math.PI * 2;
			const radius = 3 + Math.random() * 6;
			const x = Math.sin(angle) * radius;
			const z = Math.cos(angle) * radius;

			const grave = new THREE.Mesh(graveGeometry, graveMaterial);
			grave.castShadow = true;
			grave.position.set(x, 0.3, z);
			grave.rotation.y = (Math.random() - 0.5) * 0.4;
			grave.rotation.z = (Math.random() - 0.5) * 0.4;
			graves.add(grave);
		}

		// Floor
		const floor = new THREE.Mesh(
			new THREE.PlaneBufferGeometry(20, 20),
			new THREE.MeshStandardMaterial({
				map: grassColorTexture,
				aoMap: grassAmbientTexture,
				normalMap: grassNormalTexture,
				roughnessMap: grassRoughnessTexture,
			}),
		);
		floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2));
		floor.rotation.x = -Math.PI * 0.5;

		this.scene.add(floor, house, graves);

		// Ghost
		const ghost1 = new THREE.PointLight(0xff00ff, 2, 3);
		const ghost2 = new THREE.PointLight(0x00ffff, 2, 3);
		const ghost3 = new THREE.PointLight(0xffff00, 2, 3);
		this.scene.add(ghost1, ghost2, ghost3);
		this.ghostArr = [ghost1, ghost2, ghost3];

		// shadow
		ghost1.castShadow = true;
		ghost1.shadow.mapSize.width = 256;
		ghost1.shadow.mapSize.height = 256;
		ghost1.shadow.camera.far = 7;
		ghost2.castShadow = true;
		ghost2.shadow.mapSize.width = 256;
		ghost2.shadow.mapSize.height = 256;
		ghost2.shadow.camera.far = 7;
		ghost3.castShadow = true;
		ghost3.shadow.mapSize.width = 256;
		ghost3.shadow.mapSize.height = 256;
		ghost3.shadow.camera.far = 7;

		bush1.castShadow = true;
		bush2.castShadow = true;
		bush3.castShadow = true;
		bush4.castShadow = true;

		floor.receiveShadow = true;

		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	}

	/**
	 * @override
	 */
	protected render(): void {
		this.controls.update();
		this.renderer.render(this.scene, this.camera);

		const elapsedTime = this.clock.getElapsedTime();
		this.ghostArr.forEach((ghost, index) => {
			const angle = Math.pow(-1, index) * elapsedTime * (0.3 + index * 0.1);
			ghost.position.x = Math.cos(angle) * (4 + index);
			ghost.position.y = Math.sin(angle) * (4 + index);
			ghost.position.z = Math.sin(angle) * (4 + index);
		});
	}

	/**
	 * @protected
	 */
	protected onDestroy(): void {
		this.gui?.destroy();
	}
}

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { getJourneyUrl } from '../../Helper/PathHelper';
import { BaseJourney } from './BaseJourney';

/**
 * 13 Journey 3D Text
 */

export class Journey13 extends BaseJourney {
	/**
	 * @override
	 */
	private controls: OrbitControls;
	protected initCamera(): void {
		const camera = new THREE.PerspectiveCamera(75, this.width / this.height);
		camera.position.set(0, 0, 3);
		camera.lookAt(new THREE.Vector3(0, 0, 0));

		this.camera = camera;
		this.scene.add(camera);

		this.controls = new OrbitControls(camera, this.canvas);
		// this.controls.autoRotate = true;
		this.controls.enableDamping = true;
	}

	/**
	 * @override
	 */
	protected initModel(): void {
		// axes
		const axesHelp = new THREE.AxesHelper();
		// this.scene.add(axesHelp);

		// loader
		const textureLoader = new THREE.TextureLoader();
		const matcapTexture = textureLoader.load(getJourneyUrl('matcaps/7.png'));
		const fontLoader = new FontLoader();
		fontLoader.load('./resource/journey/fonts/helvetiker_regular.typeface.json', font => {
			// TextGeometry
			const str = 'Hello Three.js';
			const geometry = new TextGeometry(str, {
				font: font,
				size: 0.5,
				height: 0.2,
				curveSegments: 3,
				bevelEnabled: true,
				bevelThickness: 0.03,
				bevelSize: 0.02,
				bevelOffset: 0,
				bevelSegments: 3,
			});
			geometry.center();
			const material = new THREE.MeshMatcapMaterial();
			material.matcap = matcapTexture;
			// material.wireframe = true;
			const text = new THREE.Mesh(geometry, material);
			this.scene.add(text);

			// donut
			const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45);
			// const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
			for (let i = 0; i < 100; i++) {
				const donut = new THREE.Mesh(donutGeometry, material);
				donut.position.x = (Math.random() - 0.5) * 10;
				donut.position.y = (Math.random() - 0.5) * 10;
				donut.position.z = (Math.random() - 0.5) * 10;

				donut.rotation.x = Math.random() * Math.PI;
				donut.rotation.y = Math.random() * Math.PI;

				const scale = Math.random();
				donut.scale.set(scale, scale, scale);
				this.scene.add(donut);
			}
		});
	}

	/**
	 * @override
	 */
	protected onRender(): void {
		this.controls.update();
		this.renderer.render(this.scene, this.camera);
	}
}

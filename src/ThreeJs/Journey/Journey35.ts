import * as dat from 'dat.gui';
import { gsap } from 'gsap';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { BaseJourney } from './BaseJourney';

const loadingBarEle = document.createElement('div') as HTMLElement;
loadingBarEle.classList.add('loading-bar');
// const loadingBarEle = document.querySelector('.loading-bar') as HTMLElement;

/**
 * Journey - journey_final
 */

export class Journey35 extends BaseJourney {
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

		document.body.appendChild(loadingBarEle);
	}

	/**
	 * @override
	 */
	private overlayPanel: THREE.Mesh;
	protected onCreated(): void {
		// controller
		this.controls = new OrbitControls(this.camera, this.canvas);
		this.controls.enableDamping = true;

		this.renderer.outputEncoding = THREE.sRGBEncoding;
		// this.renderer.toneMapping = THREE.ACESFilmicToneMapping;

		// loading
		const overlayGeometry = new THREE.PlaneBufferGeometry(2, 2, 1, 1);
		const overlayMaterial = new THREE.ShaderMaterial({
			uniforms: {
				uAlpha: { value: 1 },
			},
			transparent: true,
			vertexShader: `
                void main(){
                    gl_Position = vec4(position, 1.0);
                }
            `,
			fragmentShader: `
                uniform float uAlpha;
                void main(){
                    gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
                }
            `,
		});
		const overlayMesh = new THREE.Mesh(overlayGeometry, overlayMaterial);
		this.overlayPanel = overlayMesh;
		this.scene.add(overlayMesh);
	}

	/**
	 * @protected
	 */
	protected initLight(): void {
		const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
		directionalLight.position.set(0.25, 3, -2.25);
		directionalLight.shadow.mapSize.set(1024, 1024);
		directionalLight.castShadow = true;
		directionalLight.shadow.normalBias = 0.05;
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

	/**
	 * @override
	 */
	protected initModel(): void {
		const scene = this.scene;
		const loadingMrg = new THREE.LoadingManager(
			// Loaded
			() => {
				gsap.delayedCall(0.5, () => {
					gsap.to((this.overlayPanel.material as THREE.ShaderMaterial).uniforms.uAlpha, { duration: 3, value: 0 });
					loadingBarEle.style.transform = '';
					loadingBarEle.classList.add('ended');
					// console.log('[RES] loaded');
				});
			},
			// progress
			(itemUrl, itemsLoaded, itemsTotal) => {
				const progressRatio = itemsLoaded / itemsTotal;
				loadingBarEle.style.transform = `scaleX(${progressRatio})`;
				// console.log('[RES] progress :', itemsLoaded, itemsTotal);
			},
		);

		const textureLoader = new THREE.TextureLoader(loadingMrg);

		// Draco loader
		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath('resource/draco/');

		// GLTF Loader
		const gltfLoader = new GLTFLoader(loadingMrg);
		gltfLoader.setDRACOLoader(dracoLoader);

		// Texture
		const bakeTexture = textureLoader.load('./resource/journey/models/Journey_final/journey_final_baked.jpg');
		bakeTexture.flipY = false;
		bakeTexture.encoding = THREE.sRGBEncoding;

		/** Material */
		const bakeMaterial = new THREE.MeshBasicMaterial({ map: bakeTexture });

		const portalLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

		const poleLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5 });

		// Model
		gltfLoader.load('./resource/journey/models/Journey_final/journey_final.glb', gltf => {
			const model = gltf.scene;
			// model.traverse((child: THREE.Mesh) => {
			// 	child.material = bakeMaterial;
			// });
			const bakeMesh = gltf.scene.children.find(child => child.name === 'bake') as THREE.Mesh;
			bakeMesh.material = bakeMaterial;

			const poleLightAMesh = gltf.scene.children.find(child => child.name === 'poleLightA') as THREE.Mesh;
			const poleLightBMesh = gltf.scene.children.find(child => child.name === 'poleLightB') as THREE.Mesh;
			poleLightAMesh.material = poleLightBMesh.material = poleLightMaterial;

			const poleLightMesh = gltf.scene.children.find(child => child.name === 'poleLight') as THREE.Mesh;
			poleLightMesh.material = portalLightMaterial;
			// model.rotation.y = -Math.PI * 0.5;

			scene.add(model);
		});
	}

	private updateAllMaterial(): void {
		// this.scene.traverse(child => {
		// 	if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
		// 		child.material.envMapIntensity = this.params.envMapIntensity;
		// 		child.material.needsUpdate = true;
		// 		child.receiveShadow = true;
		// 		child.castShadow = true;
		// 	}
		// });
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
		loadingBarEle.classList.remove('ended');
		document.body.removeChild(loadingBarEle);
	}
}

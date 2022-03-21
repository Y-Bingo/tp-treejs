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
 * Journey - intro and loading progress
 */

export class Journey34 extends BaseJourney {
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

		this.renderer.physicallyCorrectLights = true;
		this.renderer.outputEncoding = THREE.sRGBEncoding;
		this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

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
		camera.position.set(-7, 7, 7);
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

		const cubeTextureLoader = new THREE.CubeTextureLoader(loadingMrg);

		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath('resource/draco/');
		const gltfLoader = new GLTFLoader(loadingMrg);
		gltfLoader.setDRACOLoader(dracoLoader);

		const environmentMap = cubeTextureLoader.load([
			'resource/journey/environmentMaps/3/px.jpg',
			'resource/journey/environmentMaps/3/nx.jpg',
			'resource/journey/environmentMaps/3/py.jpg',
			'resource/journey/environmentMaps/3/ny.jpg',
			'resource/journey/environmentMaps/3/pz.jpg',
			'resource/journey/environmentMaps/3/nz.jpg',
		]);
		environmentMap.encoding = THREE.sRGBEncoding;
		scene.background = environmentMap;
		scene.environment = environmentMap;

		gltfLoader.load('./resource/journey/models/FlightHelmet/glTF/FlightHelmet.gltf', gltf => {
			const fightHelmet = gltf.scene;
			fightHelmet.scale.set(10, 10, 10);
			fightHelmet.position.set(0, -4, 0);
			fightHelmet.rotation.y = -Math.PI * 0.5;
			scene.add(fightHelmet);

			this.updateAllMaterial();
		});

		// const sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(1, 32, 32), new THREE.MeshStandardMaterial());
		// scene.add(sphere);
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
		loadingBarEle.classList.remove('ended');
		document.body.removeChild(loadingBarEle);
	}
}

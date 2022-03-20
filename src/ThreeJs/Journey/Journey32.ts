import * as dat from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader';
import { BaseJourney } from './BaseJourney';

/**
 * Journey - post-processing
 */

export class Journey32 extends BaseJourney {
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
	private effectComposer: EffectComposer;
	protected onCreated(): void {
		// controller
		this.controls = new OrbitControls(this.camera, this.canvas);
		this.controls.enableDamping = true;

		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFShadowMap;
		this.renderer.physicallyCorrectLights = true;
		this.renderer.outputEncoding = THREE.sRGBEncoding;
		this.renderer.toneMapping = THREE.ReinhardToneMapping;
		this.renderer.toneMappingExposure = 1.5;

		const renderTarget = new THREE.WebGLRenderTarget(this.width, this.height, {
			minFilter: THREE.LinearFilter,
			magFilter: THREE.LinearFilter,
			format: THREE.RGBAFormat,
			encoding: THREE.sRGBEncoding,
		});

		// effectComposer
		const effectComposer = new EffectComposer(this.renderer, renderTarget);
		// const effectComposer = new EffectComposer(this.renderer);
		effectComposer.setPixelRatio(Math.min(2, window.devicePixelRatio));
		effectComposer.setSize(this.width, this.height);
		this.effectComposer = effectComposer;

		const renderPass = new RenderPass(this.scene, this.camera);
		effectComposer.addPass(renderPass);

		const dotScreenPass = new DotScreenPass();
		dotScreenPass.enabled = false;
		effectComposer.addPass(dotScreenPass);

		const glitchPass = new GlitchPass();
		// glitchPass.goWild = true;
		glitchPass.enabled = false;
		effectComposer.addPass(glitchPass);

		const shaderPass = new ShaderPass(RGBShiftShader);
		shaderPass.enabled = false;
		effectComposer.addPass(shaderPass);

		// // Tint pass
		// const TintShader = {
		// 	uniforms: {
		// 		tDiffuse: { value: null },
		// 		uTint: { value: null },
		// 	},
		// 	vertexShader: `
		//         varying vec2, vUv;

		//         void main(){
		//             gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

		//             vUv = uv;
		//         }
		//     `,
		// 	fragmentShader: `
		//         uniform sampler2D tDiffuse;
		//         uniform vec3 uTint;

		//         varying vec2, vUv;

		//         void main() {
		//             vec4 color = texture2D(tDiffuse, vUv);
		//             color.rgb += uTint;
		//             gl_FragColor = color;
		//         }
		//     `,
		// };
		// const tintPass = new ShaderPass(TintShader);
		// tintPass.material.uniforms.uTint.value = new THREE.Vector3();
		// effectComposer.addPass(tintPass);
		const textureLoader = new THREE.TextureLoader();
		const displaceMentShader = {
			uniforms: {
				tDiffuse: { value: null },
				uNormalMap: { value: null },
			},
			vertexShader: `
                varying vec2, vUv;

                void main(){
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    
                    vUv = uv;
                }
            `,
			fragmentShader: `
                uniform sampler2D tDiffuse;
                uniform sampler2D uNormalMap;
                uniform vec3 uTint;
                                
                varying vec2, vUv;

                void main() {
                    vec3 normalColor = texture2D(uNormalMap, vUv).xyz * 2.0 - 1.0;

                    vec2 newUv = vUv + normalColor.xy * 0.1;
                    vec4 color = texture2D(tDiffuse, newUv);

                    vec3 lightDirection = normalize(vec3(-1.0, 1.0, 0.0));
                    float lightness = dot(normalColor, lightDirection);
                    color.rgb += lightness * 1.0;

                    gl_FragColor = color;
                }
            `,
		};
		const displacementPass = new ShaderPass(displaceMentShader);
		displacementPass.uniforms.uNormalMap.value = textureLoader.load('./resource/journey/interfaceNormalMap.png');
		this.effectComposer.addPass(displacementPass);
	}

	protected onResize(): void {
		this.effectComposer.setSize(this.width, this.height);
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
	}

	/**
	 * @override
	 */
	protected initCamera(): void {
		const camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 100);
		camera.position.set(4, 1, -4);
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

		gltfLoader.load(
			'./resource/journey/models/DamagedHelmet/glTF/DamagedHelmet.gltf',
			gltf => {
				gltf.scene.scale.set(2, 2, 2);
				gltf.scene.rotation.y = Math.PI * 0.5;
				scene.add(gltf.scene);

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
		// this.renderer.render(this.scene, this.camera);
		this.effectComposer.render();

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

import * as dat from 'dat.gui';
import {
    AmbientLight,
    BufferAttribute,
    CubeTextureLoader,
    LoadingManager,
    Mesh,
    MeshStandardMaterial,
    PerspectiveCamera,
    PlaneBufferGeometry,
    PointLight,
    SphereBufferGeometry,
    TextureLoader,
    TorusBufferGeometry,
    Vector3
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BaseJourney } from './BaseJourney';

const gui = new dat.GUI();

/**
 * 12 Journey materials
 */
export class Journey12 extends BaseJourney {
	/**
	 * @override
	 */
	private controls: OrbitControls;
	protected initCamera(): void {
		const camera = new PerspectiveCamera(75, this.width / this.height);
		camera.position.set(0, 0, 3);
		camera.lookAt(new Vector3(0, 0, 0));

		this.camera = camera;
		this.scene.add(camera);

		this.controls = new OrbitControls(camera, this.canvas);
		// this.controls.autoRotate = true;
		this.controls.enableDamping = true;
	}

	/**
	 * @override
	 */
	protected initLight(): void {
		const ambientLight = new AmbientLight(0xffffff, 0.5);
		this.scene.add(ambientLight);

		const light = new PointLight(0xffffff, 0.5);
		light.position.x = 2;
		light.position.y = 3;
		light.position.z = 4;
		this.scene.add(light);
	}

	/**
	 * @override
	 */
	protected initModel(): void {
		// Loader
		const loadingMrg = new LoadingManager();
		loadingMrg.onLoad = () => {
			console.log('load Complete');
		};
		loadingMrg.onError = (url: string) => {
			console.log('load error: ', url);
		};
		loadingMrg.onProgress = (url: string, loaded: number, total: number) => {
			console.info(`loading.....${loaded}/${total} - ${url}`);
		};
		const textureLoader = new TextureLoader(loadingMrg);
		const cubeTextureLoader = new CubeTextureLoader();

		const doorColorTexture = textureLoader.load('./resource/journey/door/color.jpg');
		const doorAlphaTexture = textureLoader.load('./resource/journey/door/alpha.jpg');
		const doorAmbientOcclusionTexture = textureLoader.load('./resource/journey/door/ambientOcclusion.jpg');
		const doorHeightTexture = textureLoader.load('./resource/journey/door/height.jpg');
		const doorNormalTexture = textureLoader.load('./resource/journey/door/normal.jpg');
		const doorMetalnessTexture = textureLoader.load('./resource/journey/door/metalness.jpg');
		const doorRoughnessTexture = textureLoader.load('./resource/journey/door/roughness.jpg');
		const matcapTexture = textureLoader.load('./resource/journey/matcaps/8.png');
		const gradientTexture = textureLoader.load('./resource/journey/gradients/5.jpg');
		const gradientTexture3 = textureLoader.load('./resource/journey/gradients/3.jpg');

		// const material = new MeshBasicMaterial();
		// const material = new MeshLambertMaterial();
		// const material = new MeshPhongMaterial();
		// const material = new MeshStandardMaterial();
		// material.map = doorColorTexture;
		// material.side = DoubleSide;
		// material.wireframe = true;
		// material.transparent = true;

		// const material = new MeshNormalMaterial();
		// material.flatShading = true;

		// const material = new MeshMatcapMaterial();
		// material.matcap = matcapTexture;

		// const material = new MeshDepthMaterial();

		// const material = new MeshLambertMaterial();

		// const material = new MeshPhongMaterial();
		// material.shininess = 100;
		// material.specular = new Color(0x1188ff);

		// const material = new MeshToonMaterial();
		// gradientTexture.generateMipmaps = false;
		// gradientTexture.minFilter = NearestFilter;
		// gradientTexture.magFilter = NearestFilter;
		// material.gradientMap = gradientTexture;
		// material.gradientMap = gradientTexture3;

		// const material = new MeshStandardMaterial();
		// material.metalness = 0;
		// material.roughness = 1;
		// material.map = doorColorTexture;
		// material.aoMap = doorAmbientOcclusionTexture;
		// material.aoMapIntensity = 2;
		// material.displacementMap = doorHeightTexture;
		// material.displacementScale = 0.05;
		// material.metalnessMap = doorMetalnessTexture;
		// material.roughnessMap = doorRoughnessTexture;
		// material.normalMap = doorNormalTexture;
		// material.normalScale.set(0.5, 0.5);
		// material.transparent = true;
		// material.side = DoubleSide;
		// material.alphaMap = doorAlphaTexture;

		// const material = new MeshPhysicalMaterial();
		// material.metalness = 0;
		// material.roughness = 1;
		// material.map = doorColorTexture;
		// material.aoMap = doorAmbientOcclusionTexture;
		// material.aoMapIntensity = 1;
		// material.displacementMap = doorHeightTexture;
		// material.displacementScale = 0.05;
		// material.metalnessMap = doorMetalnessTexture;
		// material.roughnessMap = doorRoughnessTexture;
		// material.normalMap = doorNormalTexture;
		// material.normalScale.set(0.5, 0.5);
		// material.transparent = true;
		// material.alphaMap = doorAlphaTexture;
		// material.clearcoat = 1;
		// material.clearcoatRoughness = 0;

		const environmentMapTexture = cubeTextureLoader.load([
			'./resource/journey/environmentMaps/1/px.jpg',
			'./resource/journey/environmentMaps/1/nx.jpg',
			'./resource/journey/environmentMaps/1/py.jpg',
			'./resource/journey/environmentMaps/1/ny.jpg',
			'./resource/journey/environmentMaps/1/pz.jpg',
			'./resource/journey/environmentMaps/1/nz.jpg',
		]);

		const material = new MeshStandardMaterial();
		material.metalness = 0.7;
		material.roughness = 0.2;
		gui.add(material, 'metalness').min(0).max(1).step(0.0001);
		gui.add(material, 'roughness').min(0).max(1).step(0.0001);
		material.envMap = environmentMapTexture;

		// mesh
		const sphere = new Mesh(new SphereBufferGeometry(0.5, 64, 64), material);
		sphere.geometry.setAttribute('uv2', new BufferAttribute(sphere.geometry.attributes.uv.array, 2));
		sphere.position.x = -1.5;

		const plane = new Mesh(new PlaneBufferGeometry(1, 1, 100, 100), material);
		plane.geometry.setAttribute('uv2', new BufferAttribute(plane.geometry.attributes.uv.array, 2));

		const torus = new Mesh(new TorusBufferGeometry(0.3, 0.2, 64, 128), material);
		torus.geometry.setAttribute('uv2', new BufferAttribute(torus.geometry.attributes.uv.array, 2));
		torus.position.x = 1.5;
		this.scene.add(sphere, plane, torus);
	}

	/**
	 * @override
	 */
	protected render(): void {
		this.controls.update();
		this.renderer.render(this.scene, this.camera);
	}
}

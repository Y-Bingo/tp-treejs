import * as dat from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BaseJourney } from './BaseJourney';

/**
 * 18 Journey Particles
 */

export class Journey18 extends BaseJourney {
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
		camera.position.set(0, 2, 2);
		camera.lookAt(new THREE.Vector3(0, 0, 0));

		this.camera = camera;
		this.scene.add(camera);
	}

	/**
	 * @override
	 */
	private particles: THREE.Points;
	protected initModel(): void {
		const scene = this.scene;
		const textureLoader = new THREE.TextureLoader();
		const particlesTexture = textureLoader.load('./resource/journey/particles/2.png');

		// particles
		// const particlesGeometry = new THREE.SphereBufferGeometry(1, 32, 32);
		const particlesGeometry = new THREE.BufferGeometry();
		const count = 20000;
		const positions = new Float32Array(count * 3);
		const colors = new Float32Array(count * 3);

		for (let i = 0; i < count * 3; i++) {
			positions[i] = (Math.random() - 0.5) * 8;
			colors[i] = Math.random();
		}
		particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

		const particlesMaterial = new THREE.PointsMaterial();
		particlesMaterial.size = 0.1;
		particlesMaterial.sizeAttenuation = true;
		// particlesMaterial.color = new THREE.Color(0xffcc88);
		particlesMaterial.transparent = true;
		particlesMaterial.alphaMap = particlesTexture;
		// particlesMaterial.alphaTest = 0.001;
		// particlesMaterial.depthTest = false;
		particlesMaterial.depthWrite = false;
		particlesMaterial.blending = THREE.AdditiveBlending;
		particlesMaterial.vertexColors = true;

		// particles points
		const particles = new THREE.Points(particlesGeometry, particlesMaterial);
		scene.add(particles);

		// const cube = new THREE.Mesh(new THREE.BoxBufferGeometry(), new THREE.MeshBasicMaterial());
		// scene.add(cube);

		this.particles = particles;
	}

	/**
	 * @override
	 */
	protected render(): void {
		this.controls.update();
		this.renderer.render(this.scene, this.camera);

		const elapsedTime = this.clock.getElapsedTime();

		// this.particles.rotation.y = elapsedTime * 0.2;
		for (let i = 0; i < 20000; i++) {
			const i3 = i * 3;

			const array: any = this.particles.geometry.attributes.position.array;
			const x = array[i3 + 0];
			array[i3 + 1] = Math.sin(elapsedTime + x);
		}
		this.particles.geometry.attributes.position.needsUpdate = true;
	}

	/**
	 * @protected
	 */
	protected onDestroy(): void {
		this.gui?.destroy();
	}
}

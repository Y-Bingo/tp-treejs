import * as dat from 'dat.gui';
import { gsap } from 'gsap';
import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { BaseJourney } from './BaseJourney';

/**
 * 10 Journey Debug UI
 */

export class Journey10 extends BaseJourney {
	/**
	 * @override
	 */
	private gui: dat.GUI;
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
	protected initModel(): void {
		const param = {
			color: '#ff0000',
			spin: () => {
				gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + 4 });
			},
		};

		const geometry = new BoxGeometry(1, 1, 1);
		const material = new MeshBasicMaterial({ color: param.color });
		const mesh = new Mesh(geometry, material);
		this.scene.add(mesh);

		// Debug UI
		const gui = new dat.GUI();
		const basegui = gui.addFolder('base');
		basegui.open();
		basegui.add(mesh.position, 'x', -3, 3, 0.001);
		basegui.add(mesh.position, 'y', -3, 3, 0.001);
		basegui.add(mesh.position, 'z', -3, 3, 0.001);
		basegui.add(mesh, 'visible');
		basegui.add(material, 'wireframe');
		basegui.addColor(param, 'color').onChange(() => {
			material.color.set(param.color);
		});
		basegui.add(param, 'spin');
		this.gui = gui;
	}

	/**
	 * @override
	 */
	protected onRender(): void {
		this.controls.update();
		this.renderer.render(this.scene, this.camera);
	}

	/**
	 * @protected
	 */
	protected onDestroy(): void {
		this.gui?.destroy();
	}
}

import * as dat from 'dat.gui';

/**
 *
 */
export class Debug {
	public active: boolean = false;
	public ui: dat.GUI;

	/**
	 *
	 */
	constructor() {
		this.active = window.location.hash === '#debug';

		if (this.active) {
			this.ui = new dat.GUI();
		}
	}
}

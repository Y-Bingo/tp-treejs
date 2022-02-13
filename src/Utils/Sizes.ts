import { EventEmitter } from './EventEmitter';

/**
 * Sizes
 */
export class Sizes extends EventEmitter {
	public width: number;
	public height: number;
	public devicePixelRatio;

	constructor() {
		super();
		// Setup
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.devicePixelRatio = Math.min(window.devicePixelRatio, 2);

		// Resize event
		window.addEventListener('resize', () => {
			this.width = window.innerWidth;
			this.height = window.innerHeight;
			this.devicePixelRatio = Math.min(window.devicePixelRatio, 2);
			this.trigger('resize');
		});
	}
}

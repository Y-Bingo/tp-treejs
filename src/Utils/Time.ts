import { EventEmitter } from './EventEmitter';

/**
 * Time
 */
export class Time extends EventEmitter {
	private start: number;
	private current: number;
	public elapsed: number;
	public delta: number;
	/**
	 * constructor
	 */
	constructor() {
		super();

		// Setup
		this.start = Date.now();
		this.current = this.start;
		this.elapsed = 0;
		this.delta = 16;

		window.requestAnimationFrame(() => {
			this.tick();
		});
	}

	/**
	 * tick
	 */
	private tick(): void {
		const currentTime = Date.now();
		this.delta = currentTime - this.current;
		this.elapsed = currentTime - this.start;
		this.current = currentTime;

		this.trigger('tick');

		window.requestAnimationFrame(() => {
			this.tick();
		});
	}
}

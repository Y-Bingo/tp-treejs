import { APP_CONFIG, EAppType } from './Config';
import { BaseApplication } from './ThreeJs/BaseApplication';

let curAppIns: BaseApplication = null;
const select: HTMLSelectElement = document.getElementById('select') as HTMLSelectElement;
const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;

function addItem(select: HTMLSelectElement, text: string, value: string = text): void {
	select.options.add(new Option(text, value));
}

function addItems(select: HTMLSelectElement): void {
	APP_CONFIG.forEach(ele => {
		const type = ele.type || EAppType.DEMO;
		addItem(select, `${type} ${ele.id} ${ele.title}`, JSON.stringify(ele));
	});
}

function runApplication(config: { id: string; title: string; type?: EAppType }): void {
	if (curAppIns) {
		curAppIns.destroy();
		curAppIns = null;
	}
	if (!config.id || config.title === '00') return;
	const type = config.type || EAppType.DEMO;
	import(`../src/ThreeJs/${type}/${type + config.id}`)
		.then(resp => {
			const appClass = resp[`${type + config.id}`];
			const appIns: BaseApplication = new appClass(canvas);
			appIns.appId = config.id;
			appIns.appName = config.title;
			appIns.run();
			curAppIns = appIns;

			window.addEventListener('resize', appIns.resize.bind(appIns));
		})
		.catch(err => {
			console.error(`加载【${type + config.id}】失败:`, err);
		});
}

function init(): void {
	addItems(select);
	select.onchange = (): void => {
		const item = JSON.parse(select.value);
		runApplication(item);
	};
	select.selectedIndex = APP_CONFIG.length - 1;
	runApplication(APP_CONFIG[select.selectedIndex]);
}

function run(): void {
	init();
	window.addEventListener('dblclick', () => {
		const fullScreenElement = document.fullscreenElement;

		if (!fullScreenElement) {
			canvas.requestFullscreen();
		} else {
			document.exitFullscreen();
		}
	});
}

run();

import { APP_CONFIG, STAGE_HEIGHT, STAGE_WIDTH } from './Config';
import BaseApplication from './ThreeJsDemo/BaseDemo';

let curAppIns: BaseApplication = null;
const select: HTMLSelectElement = document.getElementById('select') as HTMLSelectElement;
const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
canvas.width = STAGE_WIDTH;
canvas.height = STAGE_HEIGHT;

function addItem(select: HTMLSelectElement, text: string, value: string = text): void {
	select.options.add(new Option(text, value));
}

function addItems(select: HTMLSelectElement): void {
	APP_CONFIG.forEach(ele => {
		addItem(select, `${ele.id} ${ele.title}`, JSON.stringify(ele));
	});
}

function runApplication(appId: string, appName: string = appId): void {
	if (curAppIns) {
		curAppIns.destroy();
		curAppIns = null;
	}
	if (!appId || appId === '00') return;
	import(`../src/ThreeJsDemo/Demo${appId}`)
		.then(resp => {
			const appClass = resp[`Demo${appId}`];
			const appIns: BaseApplication = new appClass(canvas);
			appIns.appId = appId;
			appIns.appName = appName;
			appIns.run();
			curAppIns = appIns;
		})
		.catch(err => {
			console.error(`加载【/Demo${appId}】失败:`, err);
		});
}

function init(): void {
	addItems(select);
	select.onchange = (): void => {
		const item = JSON.parse(select.value);
		runApplication(item.id, item.title);
	};
}

function run(): void {
	init();
	select.selectedIndex = APP_CONFIG.length - 1;
	runApplication(APP_CONFIG[select.selectedIndex].id);
}

run();

import BaseApplication from './demo/BaseDemo';
import { Demo01, DEMO_01_NAME } from './demo/Demo01';

const appMap = {
	null: null,
	[DEMO_01_NAME]: Demo01,
};
let count = 0;
let curAppIns: BaseApplication = null;
const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
const select: HTMLSelectElement = document.getElementById('select') as HTMLSelectElement;

function addItem(select: HTMLSelectElement, value: string): void {
	select.options.add(new Option(value, value));
}

function addItems(select: HTMLSelectElement): void {
	for (let key in appMap) {
		count++;
		addItem(select, key);
	}
}

function runApplication(appCls: typeof BaseApplication): void {
	if (curAppIns) {
		curAppIns.destroy();
		curAppIns = null;
	}
	if (!appCls) {
		console.error(`不存在【${select.value}】的应用`);
		return;
	}
	const appIns: BaseApplication = new appCls(canvas);
	appIns.render();
	curAppIns = appIns;
}

function init(): void {
	addItems(select);
	select.onchange = (): void => {
		const appCls = appMap[select.value];
		runApplication(appCls);
	};
}

function run(): void {
	init();
	select.selectedIndex = count - 1;
	runApplication(appMap[select.value]);
}

run();

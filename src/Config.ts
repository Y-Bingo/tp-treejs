import { Demo01, DEMO_01_NAME } from './ThreeJsDemo/Demo01';
import { Demo02, DEMO_02_NAME } from './ThreeJsDemo/Demo02';
import { Demo03, DEMO_03_NAME } from './ThreeJsDemo/Demo03';
import { Demo04, DEMO_04_NAME } from './ThreeJsDemo/Demo04';
import { Demo05, DEMO_05_NAME } from './ThreeJsDemo/Demo05';
import { Demo06, DEMO_06_NAME } from './ThreeJsDemo/Demo06';

/** 舞台宽度 */
export const STAGE_WIDTH = 800;
/** 舞台高度 */
export const STAGE_HEIGHT = 600;

/**
 * 应用配置
 */
export const appMap = {
	null: null,
	[DEMO_01_NAME]: Demo01,
	[DEMO_02_NAME]: Demo02,
	[DEMO_03_NAME]: Demo03,
	[DEMO_04_NAME]: Demo04,
	[DEMO_05_NAME]: Demo05,
	[DEMO_06_NAME]: Demo06,
};

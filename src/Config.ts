/** 舞台宽度 */
export const STAGE_WIDTH = 800;
/** 舞台高度 */
export const STAGE_HEIGHT = 600;

/** 项目类型 */
export enum EAppType {
    /** demo 类型 */
    DEMO  = 'Demo',
    /** ThreeJs journey */
    JOURNEY = 'Journey'
}

export const APP_CONFIG = [
	{
		id: '00',
		title: '置空',
	},
	{
		id: '01',
		title: '渲染一个正方体',
	},
	{
		id: '02',
		title: '渲染一个三角形',
	},
	{
		id: '03',
		title: '绘制一条线',
	},
	{
		id: '04',
		title: '简单用例',
	},
	{
		id: '05',
		title: '内置几何',
	},
	{
		id: '06',
		title: '使用轨迹球插件（TRACKBALL）',
	},
	{
		id: '07',
		title: '增加场景辅助',
	},
	{
		id: '05',
		type: EAppType.JOURNEY,
		title: 'Journey Transform Objects',
	},
	{
		id: '06',
		type: EAppType.JOURNEY,
		title: 'Journey Animations',
	},
];

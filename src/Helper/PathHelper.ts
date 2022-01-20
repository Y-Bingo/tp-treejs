/**
 * Journey 资源根路径
 */
const JOURNEY_RESOURCE_ROOT = './resource/journey';

/**
 * 获得 Journey 资源路径
 * @param paths
 * @returns
 */
export function getJourneyUrl(...paths: string[]): string {
	return [JOURNEY_RESOURCE_ROOT, ...paths].join('/');
}

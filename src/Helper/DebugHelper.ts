import * as dat from 'dat.gui';
import * as THREE from 'three';

export function makeXYZGUI(gui: dat.GUI, vector3: THREE.Vector3, name?: string, onChangeFn?: () => void) {
	if (name) {
		gui = gui.addFolder(name);
	}
	gui.add(vector3, 'x', -10, 10, 0.01).onChange(onChangeFn);
	gui.add(vector3, 'y', 0, 10, 0.01).onChange(onChangeFn);
	gui.add(vector3, 'z', -10, 10, 0.01).onChange(onChangeFn);
	// gui.open();
}

/**
 * 颜色转换
 */
export class ColorGUIHelper {
	private obj: any;
	private prop: any;
	constructor(obj, prop) {
		this.obj = obj;
		this.prop = prop;
	}
	get value() {
		return `#${this.obj[this.prop].getHexString()}`;
	}
	set value(hexString) {
		this.obj[this.prop].set(hexString);
	}
}

/**
 * 角度转换
 */
export class DegRadHelper {
	private obj: any;
	private prop: any;
	constructor(obj, prop) {
		this.obj = obj;
		this.prop = prop;
	}
	get value() {
		return THREE.MathUtils.radToDeg(this.obj[this.prop]);
	}
	set value(v) {
		this.obj[this.prop] = THREE.MathUtils.degToRad(v);
	}
}

/**
 * 字符转换
 */
export class StringToNumberHelper {
	private obj: any;
	private prop: any;
	constructor(obj, prop) {
		this.obj = obj;
		this.prop = prop;
	}
	get value() {
		return this.obj[this.prop];
	}
	set value(v) {
		this.obj[this.prop] = parseFloat(v);
	}
}

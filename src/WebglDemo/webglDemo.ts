/**
 * webgl 实战
 */
// @
import { Matrix4 } from './matrix';

// 获取上下文
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const gl = canvas.getContext('webgl') as WebGLRenderingContext;

// 创建 shader
const V_SHADER_SOURCE = `
    attribute vec4 a_Position;
    uniform mat4 u_ModelMatrix;
    void main() {
        gl_Position = u_ModelMatrix  * a_Position;
    }
`;
const F_SHADER_SOURCE = `
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`;
const vertexShader = createShader(gl, V_SHADER_SOURCE, gl.VERTEX_SHADER);
const fragmentShader = createShader(gl, F_SHADER_SOURCE, gl.FRAGMENT_SHADER);

// 创建 webgl 程序
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
gl.useProgram(program);

// 创建缓冲区
let n = initVertexBuffer(gl, program);

// 绘制
gl.clearColor(0, 0, 0, 1);

const modelMatrix = new Matrix4();
const u_ModelMatrix = gl.getUniformLocation(program, 'u_ModelMatrix');

let angle = 0;
let lastTimeStamp = 0;

tick();

function tick() {
	animation();
	draw(gl, program);
	requestAnimationFrame(tick);
}

function animation() {
	// 更新角度
	const now = Date.now();
	const duration = now - lastTimeStamp;
	lastTimeStamp = now;
	angle = angle + (duration / 1000) * 180;
}

function draw(gl: WebGLRenderingContext, program: WebGLProgram) {
	modelMatrix.setRotate(angle, 0, 1, 0);
	gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
	// 清空 canvas 和 背景颜色
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, 0, 3);
}

function initVertexBuffer(gl: WebGLRenderingContext, program: WebGLProgram) {
	let vertices = new Float32Array([-0.5, -0.5, 0.5, -0.5, 0, 0.5]);
	let n = 3;
	let vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

	let a_Position = gl.getAttribLocation(program, 'a_Position');
	gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(a_Position);

	return n;
}

function createShader(gl: WebGLRenderingContext, source: string, type: GLenum) {
	const shader = gl.createShader(type);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	return shader;
}

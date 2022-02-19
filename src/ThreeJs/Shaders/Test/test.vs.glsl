uniform float uTime;
uniform vec2 uFrequency;

varying vec2 vUv;
varying float vElevation;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation = sin(modelPosition.x * uFrequency.x + uTime) * 0.3;
    elevation += sin(modelPosition.y * uFrequency.y + uTime) * 0.3;

    modelPosition.z += elevation;

    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    vUv = uv;
    vElevation = elevation;
}
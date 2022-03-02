varying vec2 vUv;

void main() {

    // pattern 3 
    // float strength = vUv.x;

    // pattern 4
    // float strength = vUv.y * 1.0;

    // pattern 5
    // float strength = mod(vUv.y * 10.0, 1.0 );

    // pattern 6
    float strength = vUv.x;
    strength = step(0.9, strength);

    gl_FragColor = vec4(strength, strength, strength, 1.0);
}
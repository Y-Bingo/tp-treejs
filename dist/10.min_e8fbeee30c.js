"use strict";(self.webpackChunktp_threejs=self.webpackChunktp_threejs||[]).push([[10,37,42,54,43,50],{1804:(e,n,t)=>{t.r(n),t.d(n,{default:()=>i});const i="void main() {\n    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));\n    float strength = 0.05 / distanceToCenter - 0.05 * 2.0;\n    gl_FragColor = vec4(1.0, 1.0, 1.0, strength);\n}"},6193:(e,n,t)=>{t.r(n),t.d(n,{default:()=>i});const i="attribute float aScale;\n\nuniform float uPixelRatio;\nuniform float uSize;\nuniform float uTime;\n\nvoid main() {\n    vec4 modelPosition = modelMatrix * vec4(position, 1.0);\n    modelPosition.y += sin(uTime + modelPosition.x * 100.0) * aScale * 0.1;\n\n    vec4 viewPosition = viewMatrix * modelPosition;\n    vec4 projectionPosition = projectionMatrix * viewPosition;\n\n    gl_Position = projectionPosition;\n    // gl_PointSize = uSize * aScale;\n    gl_PointSize = uSize * aScale * uPixelRatio;\n    gl_PointSize *= (1.0 / -viewPosition.z);\n}"},2055:(e,n,t)=>{t.r(n),t.d(n,{default:()=>i});const i="uniform float uTime;\nvarying vec2 vUv;\nuniform vec3 uColorStart;\nuniform vec3 uColorEnd;\n\n//    Classic Perlin 3D Noise \n//    by Stefan Gustavson\n//\nvec4 permute(vec4 x) {\n    return mod(((x * 34.0) + 1.0) * x, 289.0);\n}\nvec4 taylorInvSqrt(vec4 r) {\n    return 1.79284291400159 - 0.85373472095314 * r;\n}\nvec3 fade(vec3 t) {\n    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);\n}\n\nfloat cnoise(vec3 P) {\n    vec3 Pi0 = floor(P); // Integer part for indexing\n    vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1\n    Pi0 = mod(Pi0, 289.0);\n    Pi1 = mod(Pi1, 289.0);\n    vec3 Pf0 = fract(P); // Fractional part for interpolation\n    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n    vec4 iy = vec4(Pi0.yy, Pi1.yy);\n    vec4 iz0 = Pi0.zzzz;\n    vec4 iz1 = Pi1.zzzz;\n\n    vec4 ixy = permute(permute(ix) + iy);\n    vec4 ixy0 = permute(ixy + iz0);\n    vec4 ixy1 = permute(ixy + iz1);\n\n    vec4 gx0 = ixy0 / 7.0;\n    vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;\n    gx0 = fract(gx0);\n    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n    vec4 sz0 = step(gz0, vec4(0.0));\n    gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n    gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n\n    vec4 gx1 = ixy1 / 7.0;\n    vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;\n    gx1 = fract(gx1);\n    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n    vec4 sz1 = step(gz1, vec4(0.0));\n    gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n    gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n\n    vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);\n    vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);\n    vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);\n    vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);\n    vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);\n    vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);\n    vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);\n    vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);\n\n    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n    g000 *= norm0.x;\n    g010 *= norm0.y;\n    g100 *= norm0.z;\n    g110 *= norm0.w;\n    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n    g001 *= norm1.x;\n    g011 *= norm1.y;\n    g101 *= norm1.z;\n    g111 *= norm1.w;\n\n    float n000 = dot(g000, Pf0);\n    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n    float n111 = dot(g111, Pf1);\n\n    vec3 fade_xyz = fade(Pf0);\n    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);\n\n    return 2.2 * n_xyz;\n}\n\nvoid main() {\n     // Displace the UV\n    vec2 displacedUv = vUv + cnoise(vec3(vUv * 5.0, uTime * 0.1));\n\n    // Perlin noise\n    float strength = cnoise(vec3(displacedUv * 5.0, uTime * 0.2));\n\n    // Outer glow\n    float outerGlow = distance(vUv, vec2(0.5)) * 1.0 - 1.4;\n    strength += outerGlow;\n\n    // Apply cool step\n    strength += step(-0.2, strength) * 0.8;\n\n    // // Clamp the value from 0 to 1\n    // strength = clamp(strength, 0.0, 1.0);\n\n    // Final color\n    vec3 color = mix(uColorStart, uColorEnd, strength);\n\n    gl_FragColor = vec4(color, 1.0);\n}"},3966:(e,n,t)=>{t.r(n),t.d(n,{default:()=>i});const i="varying vec2 vUv;\n\nvoid main() {\n    vec4 modelPosition = modelMatrix * vec4(position, 1.0 );\n    vec4 viewPosition = viewMatrix * modelPosition;\n    vec4 projectionPosition = projectionMatrix * viewPosition;\n\n    gl_Position = projectionPosition;\n\n    vUv = uv;\n}"},752:(e,n,t)=>{t.d(n,{a:()=>a});var i=t(2212),o=t(5357);class a{constructor(e){this.appId="00",this.appName="BASE",this.width=o.c.width,this.height=o.c.height,this.canvas=null,this.viewCenter=new i.pc(0,0,0),this.handle=-1,this.canvas=e}initRender(){const e=new i.rc({antialias:!0,canvas:this.canvas});e.setSize(this.width,this.height),e.setClearColor("#000000",1),e.setPixelRatio(window.devicePixelRatio),this.renderer=e}initScene(){const e=new i.Qb;this.scene=e}initCamera(){}initLight(){}initModel(){}onCreating(){}onCreated(){}onRender(){}onDestroy(){}onResize(){}create(){this.onCreating(),this.initRender(),this.initScene(),this.initCamera(),this.initLight(),this.initModel(),this.onCreated()}render(){var e;null===(e=this.renderer)||void 0===e||e.clear(),this.onRender(),this.handle=requestAnimationFrame(this.render.bind(this))}run(){this.create(),this.render()}resize(){var e,n;this.width=window.innerWidth,this.height=window.innerHeight,this.camera&&this.camera instanceof i.zb&&(this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix()),null===(e=this.renderer)||void 0===e||e.setSize(this.width,this.height),null===(n=this.renderer)||void 0===n||n.setPixelRatio(Math.min(2,window.devicePixelRatio)),this.onResize()}destroy(){this.onDestroy(),this.scene.clear(),this.renderer.clear(),cancelAnimationFrame(this.handle),console.log(`销毁应用【${this.appId} ${this.appName}】`)}}},7079:(e,n,t)=>{t.r(n),t.d(n,{BaseJourney:()=>o});var i=t(752);class o extends i.a{}},1204:(e,n,t)=>{t.r(n),t.d(n,{Journey35:()=>u});var i=t(4376),o=t(6358),a=t(2212),r=t(9365),s=t(2854),l=t(1217),c=t(1804),d=t(6193),h=t(2055),v=t(3966),g=t(7079);const m=document.createElement("div");m.classList.add("loading-bar");class u extends g.BaseJourney{onCreating(){this.params={clearColor:1644825,portalColorStart:15126758,portalColorEnd:0},this.clock=new a.r,this.gui=new i.a,document.body.appendChild(m)}onCreated(){this.controls=new r.a(this.camera,this.canvas),this.controls.enableDamping=!0,this.renderer.outputEncoding=a.sc;const e=new a.Ab(2,2,1,1),n=new a.Rb({uniforms:{uAlpha:{value:1}},transparent:!0,vertexShader:"\n                void main(){\n                    gl_Position = vec4(position, 1.0);\n                }\n            ",fragmentShader:"\n                uniform float uAlpha;\n                void main(){\n                    gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);\n                }\n            "}),t=new a.nb(e,n);this.overlayPanel=t,this.scene.add(t)}initLight(){const e=new a.y(16777215,3);e.position.set(.25,3,-2.25),e.shadow.mapSize.set(1024,1024),e.castShadow=!0,e.shadow.normalBias=.05,this.scene.add(e)}initCamera(){const e=new a.zb(75,this.width/this.height,.1,100);e.position.set(3,3,3),this.camera=e,this.scene.add(e)}initModel(){const e=this.scene,n=new a.bb((()=>{o.b.delayedCall(.5,(()=>{o.b.to(this.overlayPanel.material.uniforms.uAlpha,{duration:3,value:0}),m.style.transform="",m.classList.add("ended")}))}),((e,n,t)=>{const i=n/t;m.style.transform=`scaleX(${i})`})),t=new a.ec(n),i=new s.a;i.setDecoderPath("resource/draco/");const r=new l.a(n);r.setDRACOLoader(i);const g=t.load("./resource/journey/models/Journey_final/journey_final_baked.jpg");g.flipY=!1,g.encoding=a.sc;const u=new a.gb({map:g}),f=new a.Rb({uniforms:{uTime:{value:0},uColorStart:{value:new a.s(this.params.portalColorStart)},uColorEnd:{value:new a.s(this.params.portalColorEnd)}},vertexShader:v.default,fragmentShader:h.default});this.portalLightMaterial=f;const p=new a.gb({color:16777189});r.load("./resource/journey/models/Journey_final/journey_final.glb",(n=>{const t=n.scene;n.scene.children.find((e=>"baked"===e.name)).material=u;const i=n.scene.children.find((e=>"poleLightA"===e.name)),o=n.scene.children.find((e=>"poleLightB"===e.name));i.material=o.material=p;n.scene.children.find((e=>"poleLight"===e.name)).material=f,e.add(t)}));const x=new a.m,y=new Float32Array(150),z=new Float32Array(50);for(let e=0;e<50;e++)y[3*e+0]=4*(Math.random()-.5),y[3*e+1]=2*(Math.random()-.1),y[3*e+2]=4*(Math.random()-.5),z[e]=Math.random();x.setAttribute("position",new a.l(y,3)),x.setAttribute("aScale",new a.l(z,1));const P=new a.Rb({uniforms:{uPixelRatio:{value:Math.min(window.devicePixelRatio,1)},uSize:{value:40},uTime:{value:0}},vertexShader:d.default,fragmentShader:c.default,blending:a.b,depthWrite:!1,transparent:!0}),w=new a.Fb(x,P);e.add(w),this.fireFliesMaterial=P,this.gui.add(P.uniforms.uSize,"value").step(1).min(5).max(100),this.gui.addColor(this.params,"portalColorStart").onChange((()=>{f.uniforms.uColorStart.value.set(this.params.portalColorStart)})),this.gui.addColor(this.params,"portalColorEnd").onChange((()=>{f.uniforms.uColorEnd.value.set(this.params.portalColorEnd)}))}onResize(){this.fireFliesMaterial&&(this.fireFliesMaterial.uniforms.uPixelRatio.value=Math.min(window.devicePixelRatio,1))}onRender(){this.controls.update(),this.renderer.render(this.scene,this.camera);const e=this.clock.getElapsedTime();this.fireFliesMaterial&&(this.fireFliesMaterial.uniforms.uTime.value=e),this.portalLightMaterial&&(this.portalLightMaterial.uniforms.uTime.value=e)}onDestroy(){var e;null===(e=this.gui)||void 0===e||e.destroy(),m.classList.remove("ended"),document.body.removeChild(m)}}}}]);
//# sourceMappingURL=10.min_e8fbeee30c.js.map
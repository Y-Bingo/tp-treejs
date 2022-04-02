"use strict";(self.webpackChunktp_threejs=self.webpackChunktp_threejs||[]).push([[15,37,52,55],{4560:(e,t,n)=>{n.r(t),n.d(t,{default:()=>i});const i="varying vec3 vColor;\n\nvoid main() {\n    // float strength = distance(gl_PointCoord, vec2(0.5));\n    // strength = step(0.5, strength);\n    // strength = 1.0 - strength;\n\n    // float strength = distance(gl_PointCoord, vec2(0.5));\n    // strength = strength * 2.0;\n    // strength = 1.0 - strength;\n\n    float strength = distance(gl_PointCoord, vec2(0.5));\n    strength = 1.0 - strength;\n    strength = pow(strength, 10.0);\n\n    vec3 color = mix(vec3(0.0), vColor, strength);\n\n    gl_FragColor = vec4(color, 1.0);\n}"},6593:(e,t,n)=>{n.r(t),n.d(t,{default:()=>i});const i="uniform float uSize;\nuniform float uTime;\n\nattribute float aScale;\nattribute vec3 aRandomness;\n\nvarying vec3 vColor;\n\nvoid main() {\n    vec4 modelPosition = modelMatrix * vec4(position, 1.0);\n\n    // Rotate\n    float angle = atan(modelPosition.x, modelPosition.z);\n    float distanceToCenter = length(modelPosition.xz);\n    float angleOffset = (1.0 / distanceToCenter) * uTime;\n    angle += angleOffset;\n    modelPosition.x = cos(angle) * distanceToCenter;\n    modelPosition.z = sin(angle) * distanceToCenter;\n\n    modelPosition.xyz += aRandomness;\n\n    vec4 viewPosition = viewMatrix * modelPosition;\n    gl_Position = projectionMatrix * viewPosition;\n\n    gl_PointSize = uSize * aScale;\n    gl_PointSize *= (1.0 / -viewPosition.z);\n\n    vColor = color;\n}"},752:(e,t,n)=>{n.d(t,{a:()=>a});var i=n(2212),s=n(5357);class a{constructor(e){this.appId="00",this.appName="BASE",this.width=s.c.width,this.height=s.c.height,this.canvas=null,this.viewCenter=new i.pc(0,0,0),this.handle=-1,this.canvas=e}initRender(){const e=new i.rc({antialias:!0,canvas:this.canvas});e.setSize(this.width,this.height),e.setClearColor("#000000",1),e.setPixelRatio(window.devicePixelRatio),this.renderer=e}initScene(){const e=new i.Qb;this.scene=e}initCamera(){}initLight(){}initModel(){}onCreating(){}onCreated(){}onRender(){}onDestroy(){}onResize(){}create(){this.onCreating(),this.initRender(),this.initScene(),this.initCamera(),this.initLight(),this.initModel(),this.onCreated()}render(){var e;null===(e=this.renderer)||void 0===e||e.clear(),this.onRender(),this.handle=requestAnimationFrame(this.render.bind(this))}run(){this.create(),this.render()}resize(){var e,t;this.width=window.innerWidth,this.height=window.innerHeight,this.camera&&this.camera instanceof i.zb&&(this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix()),null===(e=this.renderer)||void 0===e||e.setSize(this.width,this.height),null===(t=this.renderer)||void 0===t||t.setPixelRatio(Math.min(2,window.devicePixelRatio)),this.onResize()}destroy(){this.onDestroy(),this.scene.clear(),this.renderer.clear(),cancelAnimationFrame(this.handle),console.log(`销毁应用【${this.appId} ${this.appName}】`)}}},7079:(e,t,n)=>{n.r(t),n.d(t,{BaseJourney:()=>s});var i=n(752);class s extends i.a{}},1905:(e,t,n)=>{n.r(t),n.d(t,{Journey30:()=>d});var i=n(4376),s=n(2212),a=n(9365),o=n(4560),r=n(6593),h=n(7079);class d extends h.BaseJourney{onCreating(){this.clock=new s.r,this.gui=new i.a}onCreated(){this.controls=new a.a(this.camera,this.canvas),this.controls.enableDamping=!0}initCamera(){const e=new s.zb(75,this.width/this.height);e.position.set(4,4,4),e.lookAt(new s.pc(0,0,0)),this.camera=e,this.scene.add(e)}generateGalaxy(){var e,t,n,i;null!=this.points&&(null===(e=this.geometry)||void 0===e||e.dispose(),null===(t=this.material)||void 0===t||t.dispose(),null===(n=this.scene)||void 0===n||n.remove(this.points));const a=this.parameters,o=this.geometry,r=this.points,h=new Float32Array(3*a.count),d=new Float32Array(3*a.count),l=new Float32Array(1*a.count),c=new Float32Array(3*a.count),m=new s.s(a.insideColor),g=new s.s(a.outsideColor);for(let e=0;e<a.count;e++){const t=3*e,n=Math.random()*a.radius,i=e%a.branches/a.branches*Math.PI*2;h[t+0]=Math.cos(i)*n,h[t+1]=0,h[t+2]=Math.sin(i)*n;const s=Math.pow(Math.random(),a.randomnessPower)*(Math.random()>.5?1:-1)*a.randomness*n,o=Math.pow(Math.random(),a.randomnessPower)*(Math.random()>.5?1:-1)*a.randomness*n,r=Math.pow(Math.random(),a.randomnessPower)*(Math.random()>.5?1:-1)*a.randomness*n;c[t+0]=s,c[t+1]=o,c[t+2]=r;const u=m.clone();u.lerp(g,n/a.radius),d[t+0]=u.r,d[t+1]=u.g,d[t+2]=u.b,l[e]=Math.random()}o.setAttribute("position",new s.l(h,3)),o.setAttribute("color",new s.l(d,3)),o.setAttribute("aScale",new s.l(l,1)),o.setAttribute("aRandomness",new s.l(c,3)),null===(i=this.scene)||void 0===i||i.add(r)}initModel(){const e=this.gui,t={count:2e4,radius:5,branches:3,randomness:.5,randomnessPower:3,insideColor:16736304,outsideColor:1784196};this.parameters=t;const n=new s.m;this.geometry=n;const i=new s.Rb({depthWrite:!1,blending:s.b,vertexColors:!0,vertexShader:r.default,fragmentShader:o.default,uniforms:{uTime:{value:0},uSize:{value:30*this.renderer.getPixelRatio()}}});this.material=i;const a=new s.Fb(n,i);this.points=a,this.generateGalaxy(),e.add(t,"count").min(100).max(1e5).step(100).onFinishChange(this.generateGalaxy.bind(this)),e.add(t,"radius").min(.01).max(20).step(.001).onFinishChange(this.generateGalaxy.bind(this)),e.add(t,"branches").min(1).max(6).step(1).onFinishChange(this.generateGalaxy.bind(this)),e.add(t,"randomness").min(.01).max(3).step(.01).onFinishChange(this.generateGalaxy.bind(this)),e.add(t,"randomnessPower").min(1).max(5).step(.1).onFinishChange(this.generateGalaxy.bind(this)),e.addColor(t,"insideColor").onFinishChange(this.generateGalaxy.bind(this)),e.addColor(t,"outsideColor").onFinishChange(this.generateGalaxy.bind(this))}onRender(){this.controls.update(),this.renderer.render(this.scene,this.camera);const e=this.clock.getElapsedTime();this.material.uniforms.uTime.value=e}onDestroy(){var e;null===(e=this.gui)||void 0===e||e.destroy(),this.gui=null}}}}]);
//# sourceMappingURL=15.min_6893e175e3.js.map
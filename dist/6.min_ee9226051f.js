"use strict";(self.webpackChunktp_threejs=self.webpackChunktp_threejs||[]).push([[6,37],{752:(e,i,t)=>{t.d(i,{a:()=>a});var n=t(2212),s=t(5357);class a{constructor(e){this.appId="00",this.appName="BASE",this.width=s.c.width,this.height=s.c.height,this.canvas=null,this.viewCenter=new n.pc(0,0,0),this.handle=-1,this.canvas=e}initRender(){const e=new n.rc({antialias:!0,canvas:this.canvas});e.setSize(this.width,this.height),e.setClearColor("#000000",1),e.setPixelRatio(window.devicePixelRatio),this.renderer=e}initScene(){const e=new n.Qb;this.scene=e}initCamera(){}initLight(){}initModel(){}onCreating(){}onCreated(){}onRender(){}onDestroy(){}onResize(){}create(){this.onCreating(),this.initRender(),this.initScene(),this.initCamera(),this.initLight(),this.initModel(),this.onCreated()}render(){var e;null===(e=this.renderer)||void 0===e||e.clear(),this.onRender(),this.handle=requestAnimationFrame(this.render.bind(this))}run(){this.create(),this.render()}resize(){var e,i;this.width=window.innerWidth,this.height=window.innerHeight,this.camera&&this.camera instanceof n.zb&&(this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix()),null===(e=this.renderer)||void 0===e||e.setSize(this.width,this.height),null===(i=this.renderer)||void 0===i||i.setPixelRatio(Math.min(2,window.devicePixelRatio)),this.onResize()}destroy(){this.onDestroy(),this.scene.clear(),this.renderer.clear(),cancelAnimationFrame(this.handle),console.log(`销毁应用【${this.appId} ${this.appName}】`)}}},7079:(e,i,t)=>{t.r(i),t.d(i,{BaseJourney:()=>s});var n=t(752);class s extends n.a{}},161:(e,i,t)=>{t.r(i),t.d(i,{Journey19:()=>r});var n=t(4376),s=t(2212),a=t(9365),h=t(7079);class r extends h.BaseJourney{onCreating(){this.clock=new s.r,this.gui=new n.a}onCreated(){this.controls=new a.a(this.camera,this.canvas),this.controls.enableDamping=!0}initCamera(){const e=new s.zb(75,this.width/this.height);e.position.set(0,4,4),e.lookAt(new s.pc(0,0,0)),this.camera=e,this.scene.add(e)}generateGalaxy(){var e,i,t,n;null!=this.points&&(null===(e=this.geometry)||void 0===e||e.dispose(),null===(i=this.material)||void 0===i||i.dispose(),null===(t=this.scene)||void 0===t||t.remove(this.points));const a=this.parameters,h=this.geometry,r=this.material,o=this.points,d=new Float32Array(3*a.count),l=new Float32Array(3*a.count),c=new s.s(a.insideColor),m=new s.s(a.outsideColor);for(let e=0;e<a.count;e++){const i=3*e,t=Math.random()*a.radius,n=e%a.branches/a.branches*Math.PI*2,s=a.spin*t,h=Math.pow(Math.random(),a.randomnessPower)*(Math.random()>.5?1:-1)*a.randomness,r=Math.pow(Math.random(),a.randomnessPower)*(Math.random()>.5?1:-1)*a.randomness,o=Math.pow(Math.random(),a.randomnessPower)*(Math.random()>.5?1:-1)*a.randomness;d[i+0]=Math.cos(n+s)*t+h,d[i+1]=r,d[i+2]=Math.sin(n+s)*t+o;const p=c.clone();p.lerp(m,t/a.radius),l[i+0]=p.r,l[i+1]=p.g,l[i+2]=p.b}h.setAttribute("position",new s.l(d,3)),h.setAttribute("color",new s.l(l,3)),r.size=a.size,r.sizeAttenuation=!0,r.depthWrite=!1,r.blending=s.b,null===(n=this.scene)||void 0===n||n.add(o)}initModel(){const e=this.gui,i=(this.scene,(new s.ec).load("./resource/journey/particles/2.png"),{count:2e4,size:.02,radius:5,branches:3,spin:1,randomness:.5,randomnessPower:2,insideColor:16736304,outsideColor:1784196});this.parameters=i;const t=new s.m;this.geometry=t;const n=new s.Eb;n.depthWrite=!1,n.blending=s.b,n.vertexColors=!0,this.material=n;const a=new s.Fb(t,n);this.points=a,this.generateGalaxy(),e.add(i,"count").min(100).max(1e5).step(100).onFinishChange(this.generateGalaxy.bind(this)),e.add(i,"size").min(.001).max(.1).step(.001).onFinishChange(this.generateGalaxy.bind(this)),e.add(i,"radius").min(.01).max(20).step(.001).onFinishChange(this.generateGalaxy.bind(this)),e.add(i,"branches").min(1).max(6).step(1).onFinishChange(this.generateGalaxy.bind(this)),e.add(i,"spin").min(-5).max(5).step(.01).onFinishChange(this.generateGalaxy.bind(this)),e.add(i,"randomness").min(.01).max(3).step(.01).onFinishChange(this.generateGalaxy.bind(this)),e.add(i,"randomnessPower").min(1).max(5).step(.1).onFinishChange(this.generateGalaxy.bind(this)),e.addColor(i,"insideColor").onFinishChange(this.generateGalaxy.bind(this)),e.addColor(i,"outsideColor").onFinishChange(this.generateGalaxy.bind(this))}onRender(){this.controls.update(),this.renderer.render(this.scene,this.camera);this.clock.getElapsedTime()}onDestroy(){var e;null===(e=this.gui)||void 0===e||e.destroy(),this.gui=null}}}}]);
//# sourceMappingURL=6.min_ee9226051f.js.map
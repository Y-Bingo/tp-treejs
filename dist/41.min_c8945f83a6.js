"use strict";(self.webpackChunktp_threejs=self.webpackChunktp_threejs||[]).push([[41,37],{752:(e,t,i)=>{i.d(t,{a:()=>a});var s=i(2212),n=i(5357);class a{constructor(e){this.appId="00",this.appName="BASE",this.width=n.c.width,this.height=n.c.height,this.canvas=null,this.viewCenter=new s.pc(0,0,0),this.handle=-1,this.canvas=e}initRender(){const e=new s.rc({antialias:!0,canvas:this.canvas});e.setSize(this.width,this.height),e.setClearColor("#000000",1),e.setPixelRatio(window.devicePixelRatio),this.renderer=e}initScene(){const e=new s.Qb;this.scene=e}initCamera(){}initLight(){}initModel(){}onCreating(){}onCreated(){}onRender(){}onDestroy(){}onResize(){}create(){this.onCreating(),this.initRender(),this.initScene(),this.initCamera(),this.initLight(),this.initModel(),this.onCreated()}render(){var e;null===(e=this.renderer)||void 0===e||e.clear(),this.onRender(),this.handle=requestAnimationFrame(this.render.bind(this))}run(){this.create(),this.render()}resize(){var e,t;this.width=window.innerWidth,this.height=window.innerHeight,this.camera&&this.camera instanceof s.zb&&(this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix()),null===(e=this.renderer)||void 0===e||e.setSize(this.width,this.height),null===(t=this.renderer)||void 0===t||t.setPixelRatio(Math.min(2,window.devicePixelRatio)),this.onResize()}destroy(){this.onDestroy(),this.scene.clear(),this.renderer.clear(),cancelAnimationFrame(this.handle),console.log(`销毁应用【${this.appId} ${this.appName}】`)}}},7079:(e,t,i)=>{i.r(t),i.d(t,{BaseJourney:()=>n});var s=i(752);class n extends s.a{}},9783:(e,t,i)=>{i.r(t),i.d(t,{Journey23:()=>c});var s=i(4376),n=i(2212),a=i(9365),r=i(2854),h=i(1217),o=i(7079);class c extends o.BaseJourney{constructor(){super(...arguments),this.lastTimeStamp=0}onCreating(){this.params={materialColor:16772589},this.clock=new n.r,this.gui=new s.a}onCreated(){this.controls=new a.a(this.camera,this.canvas),this.controls.enableDamping=!0,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=n.yb}initLight(){const e=new n.c(16777215,.7);this.scene.add(e);const t=new n.y(16777215,.2);t.castShadow=!0,t.shadow.mapSize.set(1024,1024),t.shadow.camera.far=15,t.shadow.camera.left=-7,t.shadow.camera.top=7,t.shadow.camera.right=7,t.shadow.camera.bottom=-7,t.position.set(5,5,5),this.scene.add(t)}initCamera(){const e=new n.zb(75,this.width/this.height,.1,100);e.position.set(-3,3,0),this.camera=e,this.scene.add(e)}initModel(){new n.u;const e=new r.a;e.setDecoderPath("/draco/");const t=new h.a;t.setDRACOLoader(e),t.load("./resource/journey/models/Fox/glTF/Fox.gltf",(e=>{console.log("success:",e);const t=new n.e(e.scene);t.clipAction(e.animations[1]).play(),this.mixer=t,e.scene.scale.set(.025,.025,.025),this.scene.add(e.scene)}),(()=>{console.log("progress")}),(e=>{console.log("error",e)}));const i=new n.nb(new n.Ab(10,10),new n.lb({color:7829367,metalness:.3,roughness:.4}));i.rotation.x=.5*-Math.PI,i.receiveShadow=!0,this.scene.add(i)}onRender(){var e;this.controls.update(),this.renderer.render(this.scene,this.camera);const t=this.clock.getElapsedTime(),i=t-this.lastTimeStamp;this.lastTimeStamp=t,null===(e=this.mixer)||void 0===e||e.update(i)}onDestroy(){var e;null===(e=this.gui)||void 0===e||e.destroy()}}}}]);
//# sourceMappingURL=41.min_c8945f83a6.js.map
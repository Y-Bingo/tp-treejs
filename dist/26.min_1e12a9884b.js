"use strict";(self.webpackChunktp_threejs=self.webpackChunktp_threejs||[]).push([[26,37],{752:(e,i,t)=>{t.d(i,{a:()=>h});var s=t(2212),n=t(5357);class h{constructor(e){this.appId="00",this.appName="BASE",this.width=n.c.width,this.height=n.c.height,this.canvas=null,this.viewCenter=new s.pc(0,0,0),this.handle=-1,this.canvas=e}initRender(){const e=new s.rc({antialias:!0,canvas:this.canvas});e.setSize(this.width,this.height),e.setClearColor("#000000",1),e.setPixelRatio(window.devicePixelRatio),this.renderer=e}initScene(){const e=new s.Qb;this.scene=e}initCamera(){}initLight(){}initModel(){}onCreating(){}onCreated(){}onRender(){}onDestroy(){}onResize(){}create(){this.onCreating(),this.initRender(),this.initScene(),this.initCamera(),this.initLight(),this.initModel(),this.onCreated()}render(){var e;null===(e=this.renderer)||void 0===e||e.clear(),this.onRender(),this.handle=requestAnimationFrame(this.render.bind(this))}run(){this.create(),this.render()}resize(){var e,i;this.width=window.innerWidth,this.height=window.innerHeight,this.camera&&this.camera instanceof s.zb&&(this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix()),null===(e=this.renderer)||void 0===e||e.setSize(this.width,this.height),null===(i=this.renderer)||void 0===i||i.setPixelRatio(Math.min(2,window.devicePixelRatio)),this.onResize()}destroy(){this.onDestroy(),this.scene.clear(),this.renderer.clear(),cancelAnimationFrame(this.handle),console.log(`销毁应用【${this.appId} ${this.appName}】`)}}},7079:(e,i,t)=>{t.r(i),t.d(i,{BaseJourney:()=>n});var s=t(752);class n extends s.a{}},4172:(e,i,t)=>{t.r(i),t.d(i,{Journey06:()=>a});var s=t(6358),n=t(2212),h=t(7079);class a extends h.BaseJourney{initCamera(){const e=new n.zb(75,this.width/this.height);e.position.set(0,0,3),e.lookAt(new n.pc(0,0,0)),this.camera=e,this.scene.add(e)}initModel(){const e=new n.nb(new n.j(1,1,1),new n.gb({color:16711680}));this.cube=e,this.scene.add(e);const i=new n.r;this.clock=i,s.a.to(this.cube.position,{delay:1,x:3,duration:2}),s.a.to(this.cube.position,{delay:3,x:0,duration:2})}onRender(){this.renderer.render(this.scene,this.camera)}}}}]);
//# sourceMappingURL=26.min_1e12a9884b.js.map
"use strict";(self.webpackChunktp_threejs=self.webpackChunktp_threejs||[]).push([[40,37],{752:(e,t,n)=>{n.d(t,{a:()=>r});var s=n(2212),i=n(5357);class r{constructor(e){this.appId="00",this.appName="BASE",this.width=i.c.width,this.height=i.c.height,this.canvas=null,this.viewCenter=new s.pc(0,0,0),this.handle=-1,this.canvas=e}initRender(){const e=new s.rc({antialias:!0,canvas:this.canvas});e.setSize(this.width,this.height),e.setClearColor("#000000",1),e.setPixelRatio(window.devicePixelRatio),this.renderer=e}initScene(){const e=new s.Qb;this.scene=e}initCamera(){}initLight(){}initModel(){}onCreating(){}onCreated(){}onRender(){}onDestroy(){}onResize(){}create(){this.onCreating(),this.initRender(),this.initScene(),this.initCamera(),this.initLight(),this.initModel(),this.onCreated()}render(){var e;null===(e=this.renderer)||void 0===e||e.clear(),this.onRender(),this.handle=requestAnimationFrame(this.render.bind(this))}run(){this.create(),this.render()}resize(){var e,t;this.width=window.innerWidth,this.height=window.innerHeight,this.camera&&this.camera instanceof s.zb&&(this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix()),null===(e=this.renderer)||void 0===e||e.setSize(this.width,this.height),null===(t=this.renderer)||void 0===t||t.setPixelRatio(Math.min(2,window.devicePixelRatio)),this.onResize()}destroy(){this.onDestroy(),this.scene.clear(),this.renderer.clear(),cancelAnimationFrame(this.handle),console.log(`销毁应用【${this.appId} ${this.appName}】`)}}},7079:(e,t,n)=>{n.r(t),n.d(t,{BaseJourney:()=>i});var s=n(752);class i extends s.a{}},9689:(e,t,n)=>{n.r(t),n.d(t,{Journey13:()=>l});var s=n(2212),i=n(9365);class r extends s.B{constructor(e,t={}){const n=t.font;if(!n||!n.isFont)return console.error("THREE.TextGeometry: font parameter is not an instance of THREE.Font."),new s.m;const i=n.generateShapes(e,t.size);t.depth=void 0!==t.height?t.height:50,void 0===t.bevelThickness&&(t.bevelThickness=10),void 0===t.bevelSize&&(t.bevelSize=8),void 0===t.bevelEnabled&&(t.bevelEnabled=!1),super(i,t),this.type="TextGeometry"}}class a extends s.ab{constructor(e){super(e)}load(e,t,n,i){const r=this,a=new s.C(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(r.withCredentials),a.load(e,(function(e){let n;try{n=JSON.parse(e)}catch(t){console.warn("THREE.FontLoader: typeface.js support is being deprecated. Use typeface.json instead."),n=JSON.parse(e.substring(65,e.length-2))}const s=r.parse(n);t&&t(s)}),n,i)}parse(e){return new o(e)}}class o{constructor(e){this.type="Font",this.data=e}generateShapes(e,t=100){const n=[],s=function(e,t,n){const s=Array.from(e),i=t/n.resolution,r=(n.boundingBox.yMax-n.boundingBox.yMin+n.underlineThickness)*i,a=[];let o=0,c=0;for(let e=0;e<s.length;e++){const t=s[e];if("\n"===t)o=0,c-=r;else{const e=h(t,i,o,c,n);o+=e.offsetX,a.push(e.path)}}return a}(e,t,this.data);for(let e=0,t=s.length;e<t;e++)Array.prototype.push.apply(n,s[e].toShapes());return n}}function h(e,t,n,i,r){const a=r.glyphs[e]||r.glyphs["?"];if(!a)return void console.error('THREE.Font: character "'+e+'" does not exists in font family '+r.familyName+".");const o=new s.Tb;let h,c,d,l,p,u,w,m;if(a.o){const e=a._cachedOutline||(a._cachedOutline=a.o.split(" "));for(let s=0,r=e.length;s<r;){switch(e[s++]){case"m":h=e[s++]*t+n,c=e[s++]*t+i,o.moveTo(h,c);break;case"l":h=e[s++]*t+n,c=e[s++]*t+i,o.lineTo(h,c);break;case"q":d=e[s++]*t+n,l=e[s++]*t+i,p=e[s++]*t+n,u=e[s++]*t+i,o.quadraticCurveTo(p,u,d,l);break;case"b":d=e[s++]*t+n,l=e[s++]*t+i,p=e[s++]*t+n,u=e[s++]*t+i,w=e[s++]*t+n,m=e[s++]*t+i,o.bezierCurveTo(p,u,w,m,d,l)}}}return{offsetX:a.ha*t,path:o}}o.prototype.isFont=!0;const c="./resource/journey";var d=n(7079);class l extends d.BaseJourney{initCamera(){const e=new s.zb(75,this.width/this.height);e.position.set(0,0,3),e.lookAt(new s.pc(0,0,0)),this.camera=e,this.scene.add(e),this.controls=new i.a(e,this.canvas),this.controls.enableDamping=!0}initModel(){new s.g;const e=(new s.ec).load(function(...e){return[c,...e].join("/")}("matcaps/7.png"));(new a).load("./resource/journey/fonts/helvetiker_regular.typeface.json",(t=>{const n=new r("Hello Three.js",{font:t,size:.5,height:.2,curveSegments:3,bevelEnabled:!0,bevelThickness:.03,bevelSize:.02,bevelOffset:0,bevelSegments:3});n.center();const i=new s.ib;i.matcap=e;const a=new s.nb(n,i);this.scene.add(a);const o=new s.gc(.3,.2,20,45);for(let e=0;e<100;e++){const e=new s.nb(o,i);e.position.x=10*(Math.random()-.5),e.position.y=10*(Math.random()-.5),e.position.z=10*(Math.random()-.5),e.rotation.x=Math.random()*Math.PI,e.rotation.y=Math.random()*Math.PI;const t=Math.random();e.scale.set(t,t,t),this.scene.add(e)}}))}onRender(){this.controls.update(),this.renderer.render(this.scene,this.camera)}}}}]);
//# sourceMappingURL=40.min_62a1cc93c1.js.map
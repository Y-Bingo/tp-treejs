(()=>{var e,r,t={5357:(e,r,t)=>{"use strict";t.d(r,{c:()=>o,b:()=>n,a:()=>u});const o={width:window.innerWidth,height:window.innerHeight};var n;!function(e){e.DEMO="Demo",e.JOURNEY="Journey"}(n||(n={}));const u=[{id:"00",title:"置空"},{id:"01",title:"渲染一个正方体"},{id:"02",title:"渲染一个三角形"},{id:"03",title:"绘制一条线"},{id:"04",title:"简单用例"},{id:"05",title:"内置几何"},{id:"06",title:"使用轨迹球插件（TRACKBALL）"},{id:"07",title:"增加场景辅助"},{id:"05",type:n.JOURNEY,title:"Journey - Transform Objects"},{id:"06",type:n.JOURNEY,title:"Journey - Animations"},{id:"07",type:n.JOURNEY,title:"Journey - Camera"},{id:"09",type:n.JOURNEY,title:"Journey - Geometry"},{id:"10",type:n.JOURNEY,title:"Journey - Debug UI"},{id:"11",type:n.JOURNEY,title:"Journey - Textures"},{id:"12",type:n.JOURNEY,title:"Journey - Material"},{id:"13",type:n.JOURNEY,title:"Journey - 3D Text"},{id:"15",type:n.JOURNEY,title:"Journey - Light"},{id:"16",type:n.JOURNEY,title:"Journey - Shadow"},{id:"17",type:n.JOURNEY,title:"Journey - Haunted House"},{id:"18",type:n.JOURNEY,title:"Journey - Particles"},{id:"19",type:n.JOURNEY,title:"Journey - Galaxy Generator"},{id:"20",type:n.JOURNEY,title:"Journey - RayCaster"},{id:"21",type:n.JOURNEY,title:"Journey - Scroll Base Animation"},{id:"22",type:n.JOURNEY,title:"Journey - Physics"},{id:"23",type:n.JOURNEY,title:"Journey - Imported Models"},{id:"24",type:n.JOURNEY,title:"Journey - Custom Models"},{id:"25",type:n.JOURNEY,title:"Journey - Custom Models"},{id:"27",type:n.JOURNEY,title:"Journey - Shaders"},{id:"28",type:n.JOURNEY,title:"Journey - Shaders Patterns"},{id:"29",type:n.JOURNEY,title:"Journey - Raging sea"},{id:"30",type:n.JOURNEY,title:"Journey - Animated Galaxy"},{id:"31",type:n.JOURNEY,title:"Journey - modified material"},{id:"32",type:n.JOURNEY,title:"Journey - post-processing"},{id:"33",type:n.JOURNEY,title:"Journey - performance"},{id:"34",type:n.JOURNEY,title:"Journey - intro and loading progress"},{id:"35",type:n.JOURNEY,title:"Journey - journey_final"}]},5463:(e,r,t)=>{var o={"./Demo/BaseDemo":[4682,0,29],"./Demo/BaseDemo.ts":[4682,0,29],"./Demo/Demo01":[9422,0,33],"./Demo/Demo01.ts":[9422,0,33],"./Demo/Demo02":[7991,0,32],"./Demo/Demo02.ts":[7991,0,32],"./Demo/Demo03":[2523,0,20],"./Demo/Demo03.ts":[2523,0,20],"./Demo/Demo04":[106,0,5],"./Demo/Demo04.ts":[106,0,5],"./Demo/Demo05":[1044,0,8],"./Demo/Demo05.ts":[1044,0,8],"./Demo/Demo06":[6381,0,44,30],"./Demo/Demo06.ts":[6381,0,44,30],"./Demo/Demo07":[7547,0,31],"./Demo/Demo07.ts":[7547,0,31],"./Journey/BaseJourney":[7079,0,37],"./Journey/BaseJourney.ts":[7079,0,37],"./Journey/Journey05":[958,0,7],"./Journey/Journey05.ts":[958,0,7],"./Journey/Journey06":[4172,0,4,26],"./Journey/Journey06.ts":[4172,0,4,26],"./Journey/Journey07":[1430,0,1,12],"./Journey/Journey07.ts":[1430,0,1,12],"./Journey/Journey09":[8995,0,1,39],"./Journey/Journey09.ts":[8995,0,1,39],"./Journey/Journey10":[4058,0,1,2,4,24],"./Journey/Journey10.ts":[4058,0,1,2,4,24],"./Journey/Journey11":[6460,0,1,36],"./Journey/Journey11.ts":[6460,0,1,36],"./Journey/Journey12":[5115,0,1,2,34],"./Journey/Journey12.ts":[5115,0,1,2,34],"./Journey/Journey13":[9689,0,1,40],"./Journey/Journey13.ts":[9689,0,1,40],"./Journey/Journey15":[2063,0,1,2,17],"./Journey/Journey15.ts":[2063,0,1,2,17],"./Journey/Journey16":[9500,0,1,2,38],"./Journey/Journey16.ts":[9500,0,1,2,38],"./Journey/Journey17":[4620,0,1,2,27],"./Journey/Journey17.ts":[4620,0,1,2,27],"./Journey/Journey18":[1812,0,1,2,14],"./Journey/Journey18.ts":[1812,0,1,2,14],"./Journey/Journey19":[161,0,1,2,6],"./Journey/Journey19.ts":[161,0,1,2,6],"./Journey/Journey20":[5724,0,1,2,35],"./Journey/Journey20.ts":[5724,0,1,2,35],"./Journey/Journey21":[1543,0,2,13],"./Journey/Journey21.ts":[1543,0,2,13],"./Journey/Journey22":[3447,0,1,2,48,21],"./Journey/Journey22.ts":[3447,0,1,2,48,21],"./Journey/Journey23":[9783,0,1,2,3,41],"./Journey/Journey23.ts":[9783,0,1,2,3,41],"./Journey/Journey24":[4646,0,1,2,3,28],"./Journey/Journey24.ts":[4646,0,1,2,3,28],"./Journey/Journey25":[1211,0,1,2,3,11],"./Journey/Journey25.ts":[1211,0,1,2,3,11],"./Journey/Journey27":[8773,0,1,2,22],"./Journey/Journey27.ts":[8773,0,1,2,22],"./Journey/Journey28":[6475,0,1,2,18],"./Journey/Journey28.ts":[6475,0,1,2,18],"./Journey/Journey29":[1154,0,1,2,9],"./Journey/Journey29.ts":[1154,0,1,2,9],"./Journey/Journey30":[1905,0,1,2,15],"./Journey/Journey30.ts":[1905,0,1,2,15],"./Journey/Journey31":[3953,0,1,2,3,23],"./Journey/Journey31.ts":[3953,0,1,2,3,23],"./Journey/Journey32":[4083,0,1,2,3,47,25],"./Journey/Journey32.ts":[4083,0,1,2,3,47,25],"./Journey/Journey33":[1958,0,1,2,16],"./Journey/Journey33.ts":[1958,0,1,2,16],"./Journey/Journey34":[2459,0,1,2,3,4,19],"./Journey/Journey34.ts":[2459,0,1,2,3,4,19],"./Journey/Journey35":[1204,0,1,2,3,4,10],"./Journey/Journey35.ts":[1204,0,1,2,3,4,10],"./Shaders/FireFlies/fireFlies.fs.":[1804,42],"./Shaders/FireFlies/fireFlies.fs.glsl":[1804,42],"./Shaders/FireFlies/fireFlies.vs.":[6193,54],"./Shaders/FireFlies/fireFlies.vs.glsl":[6193,54],"./Shaders/Galaxy/galaxy.fs.":[4560,52],"./Shaders/Galaxy/galaxy.fs.glsl":[4560,52],"./Shaders/Galaxy/galaxy.vs.":[6593,55],"./Shaders/Galaxy/galaxy.vs.glsl":[6593,55],"./Shaders/Pattern/pattern.fs.":[4349,51],"./Shaders/Pattern/pattern.fs.glsl":[4349,51],"./Shaders/Pattern/pattern.vs.":[2384,45],"./Shaders/Pattern/pattern.vs.glsl":[2384,45],"./Shaders/Portal/portal.fs.":[2055,43],"./Shaders/Portal/portal.fs.glsl":[2055,43],"./Shaders/Portal/portal.vs.":[3966,50],"./Shaders/Portal/portal.vs.glsl":[3966,50],"./Shaders/Test/test.fs.":[5160,53],"./Shaders/Test/test.fs.glsl":[5160,53],"./Shaders/Test/test.vs.":[3876,49],"./Shaders/Test/test.vs.glsl":[3876,49],"./Shaders/Water/water.fs.":[2990,46],"./Shaders/Water/water.fs.glsl":[2990,46],"./Shaders/Water/water.vs.":[7660,56],"./Shaders/Water/water.vs.glsl":[7660,56]};function n(e){if(!t.o(o,e))return Promise.resolve().then((()=>{var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}));var r=o[e],n=r[0];return Promise.all(r.slice(1).map(t.e)).then((()=>t(n)))}n.keys=()=>Object.keys(o),n.id=5463,e.exports=n}},o={};function n(e){var r=o[e];if(void 0!==r)return r.exports;var u=o[e]={exports:{}};return t[e].call(u.exports,u,u.exports,n),u.exports}n.m=t,n.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return n.d(r,{a:r}),r},n.d=(e,r)=>{for(var t in r)n.o(r,t)&&!n.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},n.f={},n.e=e=>Promise.all(Object.keys(n.f).reduce(((r,t)=>(n.f[t](e,r),r)),[])),n.u=e=>e+".min_"+{0:"72ded00b68",1:"11115a916c",2:"87a1992bd1",3:"77eb8e84e7",4:"94218a0434",5:"cddda04f4d",6:"ee9226051f",7:"c5b4ee9e6c",8:"9fed355fba",9:"1ebf92dd66",10:"e8fbeee30c",11:"4813b927d5",12:"acb9c4b8fb",13:"909208e2fc",14:"d8aeb96e8d",15:"6893e175e3",16:"3cad1de7ca",17:"206de243b9",18:"a89c1fa259",19:"2b93f37c54",20:"e07f5c8ecf",21:"cf02189c98",22:"2ed37d3149",23:"9ed80271c5",24:"10bc024e9d",25:"8a97acf178",26:"1e12a9884b",27:"352fc7ae32",28:"d7099b351e",29:"e1cfb89e6d",30:"257aa4ae44",31:"6f0242efd1",32:"dddfdb85b2",33:"ff7b7bd38e",34:"5a5800dba4",35:"e7df6a8864",36:"7c98eb42b0",37:"c697d6a8b2",38:"7d05418347",39:"6359428751",40:"62a1cc93c1",41:"c8945f83a6",42:"e559f7c5cb",43:"fe88527942",44:"3133e83440",45:"36f7a6fa1d",46:"9d28e3d5f8",47:"6efc893d87",48:"152ca33ffa",49:"ba9a243cd6",50:"6ccecb2546",51:"9c6fec78cd",52:"32eb7b1096",53:"8712d3dd57",54:"ae1a101c6b",55:"723041b484",56:"e8d28d288d"}[e]+".js",n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),e={},r="tp_threejs:",n.l=(t,o,u,a)=>{if(e[t])e[t].push(o);else{var s,i;if(void 0!==u)for(var y=document.getElementsByTagName("script"),d=0;d<y.length;d++){var l=y[d];if(l.getAttribute("src")==t||l.getAttribute("data-webpack")==r+u){s=l;break}}s||(i=!0,(s=document.createElement("script")).charset="utf-8",s.timeout=120,n.nc&&s.setAttribute("nonce",n.nc),s.setAttribute("data-webpack",r+u),s.src=t),e[t]=[o];var J=(r,o)=>{s.onerror=s.onload=null,clearTimeout(c);var n=e[t];if(delete e[t],s.parentNode&&s.parentNode.removeChild(s),n&&n.forEach((e=>e(o))),r)return r(o)},c=setTimeout(J.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=J.bind(null,s.onerror),s.onload=J.bind(null,s.onload),i&&document.head.appendChild(s)}},n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;n.g.importScripts&&(e=n.g.location+"");var r=n.g.document;if(!e&&r&&(r.currentScript&&(e=r.currentScript.src),!e)){var t=r.getElementsByTagName("script");t.length&&(e=t[t.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e})(),(()=>{var e={57:0};n.f.j=(r,t)=>{var o=n.o(e,r)?e[r]:void 0;if(0!==o)if(o)t.push(o[2]);else{var u=new Promise(((t,n)=>o=e[r]=[t,n]));t.push(o[2]=u);var a=n.p+n.u(r),s=new Error;n.l(a,(t=>{if(n.o(e,r)&&(0!==(o=e[r])&&(e[r]=void 0),o)){var u=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;s.message="Loading chunk "+r+" failed.\n("+u+": "+a+")",s.name="ChunkLoadError",s.type=u,s.request=a,o[1](s)}}),"chunk-"+r,r)}};var r=(r,t)=>{var o,u,[a,s,i]=t,y=0;if(a.some((r=>0!==e[r]))){for(o in s)n.o(s,o)&&(n.m[o]=s[o]);if(i)i(n)}for(r&&r(t);y<a.length;y++)u=a[y],n.o(e,u)&&e[u]&&e[u][0](),e[a[y]]=0},t=self.webpackChunktp_threejs=self.webpackChunktp_threejs||[];t.forEach(r.bind(null,0)),t.push=r.bind(null,t.push.bind(t))})(),(()=>{"use strict";var e=n(5357);let r=null;const t=document.getElementById("select"),o=document.getElementById("canvas");function u(r){e.a.forEach((t=>{const o=t.type||e.b.DEMO;!function(e,r,t=r){e.options.add(new Option(r,t))}(r,`${o} ${t.id} ${t.title}`,JSON.stringify(t))}))}function a(t){if(r&&(r.destroy(),r=null),!t.id||"00"===t.title)return;const u=t.type||e.b.DEMO;n(5463)(`./${u}/${u+t.id}`).then((e=>{const n=new(0,e[`${u+t.id}`])(o);n.appId=t.id,n.appName=t.title,n.run(),r=n,window.addEventListener("resize",n.resize.bind(n))})).catch((e=>{console.error(`加载【${u+t.id}】失败:`,e)}))}u(t),t.onchange=()=>{a(JSON.parse(t.value))},t.selectedIndex=e.a.length-1,a(e.a[t.selectedIndex]),o.addEventListener("dblclick",(()=>{document.fullscreenElement?document.exitFullscreen():o.requestFullscreen()}))})()})();
//# sourceMappingURL=main.min_a0bcd346f6.js.map
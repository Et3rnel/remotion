// Auto-generated by build.mjs
export const src =
// eslint-disable-next-line no-template-curly-in-string
  "\"use strict\";(()=>{var ee=Object.create;var R=Object.defineProperty;var re=Object.getOwnPropertyDescriptor;var te=Object.getOwnPropertyNames;var ae=Object.getPrototypeOf,ne=Object.prototype.hasOwnProperty;var S=(a,e)=>()=>(e||a((e={exports:{}}).exports,e),e.exports);var ie=(a,e,r,t)=>{if(e&&typeof e==\"object\"||typeof e==\"function\")for(let n of te(e))!ne.call(a,n)&&n!==r&&R(a,n,{get:()=>e[n],enumerable:!(t=re(e,n))||t.enumerable});return a};var K=(a,e,r)=>(r=a!=null?ee(ae(a)):{},ie(e||!a||!a.__esModule?R(r,\"default\",{value:a,enumerable:!0}):r,a));var D=S(m=>{\"use strict\";Object.defineProperty(m,\"__esModule\",{value:!0});m.loop=m.conditional=m.parse=void 0;var oe=function a(e,r){var t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},n=arguments.length>3&&arguments[3]!==void 0?arguments[3]:t;if(Array.isArray(r))r.forEach(function(o){return a(e,o,t,n)});else if(typeof r==\"function\")r(e,t,n,a);else{var i=Object.keys(r)[0];Array.isArray(r[i])?(n[i]={},a(e,r[i],t,n[i])):n[i]=r[i](e,t,n,a)}return t};m.parse=oe;var se=function(e,r){return function(t,n,i,o){r(t,n,i)&&o(t,e,n,i)}};m.conditional=se;var de=function(e,r){return function(t,n,i,o){for(var s=[],c=t.pos;r(t,n,i);){var u={};if(o(t,e,n,u),t.pos===c)break;c=t.pos,s.push(u)}return s}};m.loop=de});var E=S(f=>{\"use strict\";Object.defineProperty(f,\"__esModule\",{value:!0});f.readBits=f.readArray=f.readUnsigned=f.readString=f.peekBytes=f.readBytes=f.peekByte=f.readByte=f.buildStream=void 0;var ce=function(e){return{data:e,pos:0}};f.buildStream=ce;var L=function(){return function(e){return e.data[e.pos++]}};f.readByte=L;var ue=function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:0;return function(r){return r.data[r.pos+e]}};f.peekByte=ue;var M=function(e){return function(r){return r.data.subarray(r.pos,r.pos+=e)}};f.readBytes=M;var le=function(e){return function(r){return r.data.subarray(r.pos,r.pos+e)}};f.peekBytes=le;var fe=function(e){return function(r){return Array.from(M(e)(r)).map(function(t){return String.fromCharCode(t)}).join(\"\")}};f.readString=fe;var pe=function(e){return function(r){var t=M(2)(r);return e?(t[1]<<8)+t[0]:(t[0]<<8)+t[1]}};f.readUnsigned=pe;var ve=function(e,r){return function(t,n,i){for(var o=typeof r==\"function\"?r(t,n,i):r,s=M(e),c=new Array(o),u=0;u<o;u++)c[u]=s(t);return c}};f.readArray=ve;var ge=function(e,r,t){for(var n=0,i=0;i<t;i++)n+=e[r+i]&&Math.pow(2,t-i-1);return n},ye=function(e){return function(r){for(var t=L()(r),n=new Array(8),i=0;i<8;i++)n[7-i]=!!(t&1<<i);return Object.keys(e).reduce(function(o,s){var c=e[s];return c.length?o[s]=ge(n,c.index,c.length):o[s]=n[c.index],o},{})}};f.readBits=ye});var X=S(G=>{\"use strict\";Object.defineProperty(G,\"__esModule\",{value:!0});G.default=void 0;var h=D(),d=E(),z={blocks:function(e){for(var r=0,t=[],n=e.data.length,i=0,o=(0,d.readByte)()(e);o!==r&&o;o=(0,d.readByte)()(e)){if(e.pos+o>=n){var s=n-e.pos;t.push((0,d.readBytes)(s)(e)),i+=s;break}t.push((0,d.readBytes)(o)(e)),i+=o}for(var c=new Uint8Array(i),u=0,p=0;p<t.length;p++)c.set(t[p],u),u+=t[p].length;return c}},me=(0,h.conditional)({gce:[{codes:(0,d.readBytes)(2)},{byteSize:(0,d.readByte)()},{extras:(0,d.readBits)({future:{index:0,length:3},disposal:{index:3,length:3},userInput:{index:6},transparentColorGiven:{index:7}})},{delay:(0,d.readUnsigned)(!0)},{transparentColorIndex:(0,d.readByte)()},{terminator:(0,d.readByte)()}]},function(a){var e=(0,d.peekBytes)(2)(a);return e[0]===33&&e[1]===249}),he=(0,h.conditional)({image:[{code:(0,d.readByte)()},{descriptor:[{left:(0,d.readUnsigned)(!0)},{top:(0,d.readUnsigned)(!0)},{width:(0,d.readUnsigned)(!0)},{height:(0,d.readUnsigned)(!0)},{lct:(0,d.readBits)({exists:{index:0},interlaced:{index:1},sort:{index:2},future:{index:3,length:2},size:{index:5,length:3}})}]},(0,h.conditional)({lct:(0,d.readArray)(3,function(a,e,r){return Math.pow(2,r.descriptor.lct.size+1)})},function(a,e,r){return r.descriptor.lct.exists}),{data:[{minCodeSize:(0,d.readByte)()},z]}]},function(a){return(0,d.peekByte)()(a)===44}),xe=(0,h.conditional)({text:[{codes:(0,d.readBytes)(2)},{blockSize:(0,d.readByte)()},{preData:function(e,r,t){return(0,d.readBytes)(t.text.blockSize)(e)}},z]},function(a){var e=(0,d.peekBytes)(2)(a);return e[0]===33&&e[1]===1}),be=(0,h.conditional)({application:[{codes:(0,d.readBytes)(2)},{blockSize:(0,d.readByte)()},{id:function(e,r,t){return(0,d.readString)(t.blockSize)(e)}},z]},function(a){var e=(0,d.peekBytes)(2)(a);return e[0]===33&&e[1]===255}),Be=(0,h.conditional)({comment:[{codes:(0,d.readBytes)(2)},z]},function(a){var e=(0,d.peekBytes)(2)(a);return e[0]===33&&e[1]===254}),we=[{header:[{signature:(0,d.readString)(3)},{version:(0,d.readString)(3)}]},{lsd:[{width:(0,d.readUnsigned)(!0)},{height:(0,d.readUnsigned)(!0)},{gct:(0,d.readBits)({exists:{index:0},resolution:{index:1,length:3},sort:{index:4},size:{index:5,length:3}})},{backgroundColorIndex:(0,d.readByte)()},{pixelAspectRatio:(0,d.readByte)()}]},(0,h.conditional)({gct:(0,d.readArray)(3,function(a,e){return Math.pow(2,e.lsd.gct.size+1)})},function(a,e){return e.lsd.gct.exists}),{frames:(0,h.loop)([me,be,Be,he,xe],function(a){var e=(0,d.peekByte)()(a);return e===33||e===44})}],_e=we;G.default=_e});var Z=S(T=>{\"use strict\";Object.defineProperty(T,\"__esModule\",{value:!0});T.deinterlace=void 0;var Se=function(e,r){for(var t=new Array(e.length),n=e.length/r,i=function(g,v){var l=e.slice(v*r,(v+1)*r);t.splice.apply(t,[g*r,r].concat(l))},o=[0,4,2,1],s=[8,8,4,2],c=0,u=0;u<4;u++)for(var p=o[u];p<n;p+=s[u])i(p,c),c++;return t};T.deinterlace=Se});var $=S(j=>{\"use strict\";Object.defineProperty(j,\"__esModule\",{value:!0});j.lzw=void 0;var Ae=function(e,r,t){var n=4096,i=-1,o=t,s,c,u,p,w,g,v,_,l,b,F,C,B,y,I,U,q=new Array(t),O=new Array(n),k=new Array(n),P=new Array(n+1);for(C=e,c=1<<C,w=c+1,s=c+2,v=i,p=C+1,u=(1<<p)-1,l=0;l<c;l++)O[l]=0,k[l]=l;var F,_,Y,B,y,U,I;for(F=_=Y=B=y=U=I=0,b=0;b<o;){if(y===0){if(_<p){F+=r[I]<<_,_+=8,I++;continue}if(l=F&u,F>>=p,_-=p,l>s||l==w)break;if(l==c){p=C+1,u=(1<<p)-1,s=c+2,v=i;continue}if(v==i){P[y++]=k[l],v=l,B=l;continue}for(g=l,l==s&&(P[y++]=B,l=v);l>c;)P[y++]=k[l],l=O[l];B=k[l]&255,P[y++]=B,s<n&&(O[s]=v,k[s]=B,s++,!(s&u)&&s<n&&(p++,u+=s)),v=g}y--,q[U++]=P[y],b++}for(b=U;b<o;b++)q[b]=0;return q};j.lzw=Ae});var W=S(x=>{\"use strict\";Object.defineProperty(x,\"__esModule\",{value:!0});x.decompressFrames=x.decompressFrame=x.parseGIF=void 0;var ke=Ie(X()),Pe=D(),Fe=E(),Ce=Z(),Ue=$();function Ie(a){return a&&a.__esModule?a:{default:a}}var Me=function(e){var r=new Uint8Array(e);return(0,Pe.parse)((0,Fe.buildStream)(r),ke.default)};x.parseGIF=Me;var ze=function(e){for(var r=e.pixels.length,t=new Uint8ClampedArray(r*4),n=0;n<r;n++){var i=n*4,o=e.pixels[n],s=e.colorTable[o]||[0,0,0];t[i]=s[0],t[i+1]=s[1],t[i+2]=s[2],t[i+3]=o!==e.transparentIndex?255:0}return t},H=function(e,r,t){if(!e.image){console.warn(\"gif frame does not have associated image.\");return}var n=e.image,i=n.descriptor.width*n.descriptor.height,o=(0,Ue.lzw)(n.data.minCodeSize,n.data.blocks,i);n.descriptor.lct.interlaced&&(o=(0,Ce.deinterlace)(o,n.descriptor.width));var s={pixels:o,dims:{top:e.image.descriptor.top,left:e.image.descriptor.left,width:e.image.descriptor.width,height:e.image.descriptor.height}};return n.descriptor.lct&&n.descriptor.lct.exists?s.colorTable=n.lct:s.colorTable=r,e.gce&&(s.delay=(e.gce.delay||10)*10,s.disposalType=e.gce.extras.disposal,e.gce.extras.transparentColorGiven&&(s.transparentIndex=e.gce.transparentColorIndex)),t&&(s.patch=ze(s)),s};x.decompressFrame=H;var Ge=function(e,r){return e.frames.filter(function(t){return t.image}).map(function(t){return H(t,e.gct,r)})};x.decompressFrames=Ge});var Q=K(W());var J=K(W()),N=a=>a.frames.filter(e=>!(\"application\"in e)).map(e=>(0,J.decompressFrame)(e,a.gct,!1));var Te=a=>{let e=null;for(let r of a.frames)e=r.gce?r.gce:e,\"image\"in r&&!(\"gce\"in r)&&e!==null&&(r.gce=e)},V=(a,{signal:e})=>fetch(a,{signal:e}).then(r=>{var t;if(!((t=r.headers.get(\"Content-Type\"))!=null&&t.includes(\"image/gif\")))throw Error(`Wrong content type: \"${r.headers.get(\"Content-Type\")}\"`);return r.arrayBuffer()}).then(r=>(0,Q.parseGIF)(r)).then(r=>(Te(r),r)).then(r=>Promise.all([N(r),{width:r.lsd.width,height:r.lsd.height}])).then(([r,t])=>{let n=[],i=t.width*t.height*4;for(let o=0;o<r.length;++o){let s=r[o],c=o===0||r[o-1].disposalType===2?new Uint8ClampedArray(i):n[o-1].slice();n.push(je(c,s,t))}return{...t,loaded:!0,delays:r.map(o=>o.delay),frames:n}}),je=(a,e,r)=>{let{width:t,height:n,top:i,left:o}=e.dims,s=i*r.width+o;for(let c=0;c<n;c++)for(let u=0;u<t;u++){let p=c*t+u,w=e.pixels[p];if(w!==e.transparentIndex){let g=s+c*r.width+u,v=e.colorTable[w]||[0,0,0];a[g*4]=v[0],a[g*4+1]=v[1],a[g*4+2]=v[2],a[g*4+3]=255}}return a};var A=new Map;self.addEventListener(\"message\",a=>{let{type:e,src:r}=a.data||a;switch(e){case\"parse\":{if(!A.has(r)){let t=new AbortController,n={signal:t.signal};A.set(r,t),V(r,n).then(i=>{self.postMessage(Object.assign(i,{src:r}),i.frames.map(o=>o.buffer))}).catch(i=>{self.postMessage({src:r,error:i,loaded:!0})}).finally(()=>{A.delete(r)})}break}case\"cancel\":{A.has(r)&&(A.get(r).abort(),A.delete(r));break}default:break}});})();\n";
function vd(e,t){for(var n=0;n<t.length;n++){const r=t[n];if(typeof r!="string"&&!Array.isArray(r)){for(const s in r)if(s!=="default"&&!(s in e)){const o=Object.getOwnPropertyDescriptor(r,s);o&&Object.defineProperty(e,s,o.get?o:{enumerable:!0,get:()=>r[s]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();function yd(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Bl={exports:{}},Is={},Fl={exports:{}},M={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var yr=Symbol.for("react.element"),wd=Symbol.for("react.portal"),kd=Symbol.for("react.fragment"),xd=Symbol.for("react.strict_mode"),bd=Symbol.for("react.profiler"),Sd=Symbol.for("react.provider"),_d=Symbol.for("react.context"),Nd=Symbol.for("react.forward_ref"),Cd=Symbol.for("react.suspense"),Pd=Symbol.for("react.memo"),jd=Symbol.for("react.lazy"),ka=Symbol.iterator;function Id(e){return e===null||typeof e!="object"?null:(e=ka&&e[ka]||e["@@iterator"],typeof e=="function"?e:null)}var Ol={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Wl=Object.assign,$l={};function Pn(e,t,n){this.props=e,this.context=t,this.refs=$l,this.updater=n||Ol}Pn.prototype.isReactComponent={};Pn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Pn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Ul(){}Ul.prototype=Pn.prototype;function bi(e,t,n){this.props=e,this.context=t,this.refs=$l,this.updater=n||Ol}var Si=bi.prototype=new Ul;Si.constructor=bi;Wl(Si,Pn.prototype);Si.isPureReactComponent=!0;var xa=Array.isArray,ql=Object.prototype.hasOwnProperty,_i={current:null},Vl={key:!0,ref:!0,__self:!0,__source:!0};function Hl(e,t,n){var r,s={},o=null,i=null;if(t!=null)for(r in t.ref!==void 0&&(i=t.ref),t.key!==void 0&&(o=""+t.key),t)ql.call(t,r)&&!Vl.hasOwnProperty(r)&&(s[r]=t[r]);var l=arguments.length-2;if(l===1)s.children=n;else if(1<l){for(var u=Array(l),c=0;c<l;c++)u[c]=arguments[c+2];s.children=u}if(e&&e.defaultProps)for(r in l=e.defaultProps,l)s[r]===void 0&&(s[r]=l[r]);return{$$typeof:yr,type:e,key:o,ref:i,props:s,_owner:_i.current}}function Ed(e,t){return{$$typeof:yr,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Ni(e){return typeof e=="object"&&e!==null&&e.$$typeof===yr}function Ad(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var ba=/\/+/g;function Ks(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Ad(""+e.key):t.toString(36)}function qr(e,t,n,r,s){var o=typeof e;(o==="undefined"||o==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(o){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case yr:case wd:i=!0}}if(i)return i=e,s=s(i),e=r===""?"."+Ks(i,0):r,xa(s)?(n="",e!=null&&(n=e.replace(ba,"$&/")+"/"),qr(s,t,n,"",function(c){return c})):s!=null&&(Ni(s)&&(s=Ed(s,n+(!s.key||i&&i.key===s.key?"":(""+s.key).replace(ba,"$&/")+"/")+e)),t.push(s)),1;if(i=0,r=r===""?".":r+":",xa(e))for(var l=0;l<e.length;l++){o=e[l];var u=r+Ks(o,l);i+=qr(o,t,n,u,s)}else if(u=Id(e),typeof u=="function")for(e=u.call(e),l=0;!(o=e.next()).done;)o=o.value,u=r+Ks(o,l++),i+=qr(o,t,n,u,s);else if(o==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return i}function Pr(e,t,n){if(e==null)return e;var r=[],s=0;return qr(e,r,"","",function(o){return t.call(n,o,s++)}),r}function Td(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var ke={current:null},Vr={transition:null},Rd={ReactCurrentDispatcher:ke,ReactCurrentBatchConfig:Vr,ReactCurrentOwner:_i};function Gl(){throw Error("act(...) is not supported in production builds of React.")}M.Children={map:Pr,forEach:function(e,t,n){Pr(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Pr(e,function(){t++}),t},toArray:function(e){return Pr(e,function(t){return t})||[]},only:function(e){if(!Ni(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};M.Component=Pn;M.Fragment=kd;M.Profiler=bd;M.PureComponent=bi;M.StrictMode=xd;M.Suspense=Cd;M.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Rd;M.act=Gl;M.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Wl({},e.props),s=e.key,o=e.ref,i=e._owner;if(t!=null){if(t.ref!==void 0&&(o=t.ref,i=_i.current),t.key!==void 0&&(s=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(u in t)ql.call(t,u)&&!Vl.hasOwnProperty(u)&&(r[u]=t[u]===void 0&&l!==void 0?l[u]:t[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){l=Array(u);for(var c=0;c<u;c++)l[c]=arguments[c+2];r.children=l}return{$$typeof:yr,type:e.type,key:s,ref:o,props:r,_owner:i}};M.createContext=function(e){return e={$$typeof:_d,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Sd,_context:e},e.Consumer=e};M.createElement=Hl;M.createFactory=function(e){var t=Hl.bind(null,e);return t.type=e,t};M.createRef=function(){return{current:null}};M.forwardRef=function(e){return{$$typeof:Nd,render:e}};M.isValidElement=Ni;M.lazy=function(e){return{$$typeof:jd,_payload:{_status:-1,_result:e},_init:Td}};M.memo=function(e,t){return{$$typeof:Pd,type:e,compare:t===void 0?null:t}};M.startTransition=function(e){var t=Vr.transition;Vr.transition={};try{e()}finally{Vr.transition=t}};M.unstable_act=Gl;M.useCallback=function(e,t){return ke.current.useCallback(e,t)};M.useContext=function(e){return ke.current.useContext(e)};M.useDebugValue=function(){};M.useDeferredValue=function(e){return ke.current.useDeferredValue(e)};M.useEffect=function(e,t){return ke.current.useEffect(e,t)};M.useId=function(){return ke.current.useId()};M.useImperativeHandle=function(e,t,n){return ke.current.useImperativeHandle(e,t,n)};M.useInsertionEffect=function(e,t){return ke.current.useInsertionEffect(e,t)};M.useLayoutEffect=function(e,t){return ke.current.useLayoutEffect(e,t)};M.useMemo=function(e,t){return ke.current.useMemo(e,t)};M.useReducer=function(e,t,n){return ke.current.useReducer(e,t,n)};M.useRef=function(e){return ke.current.useRef(e)};M.useState=function(e){return ke.current.useState(e)};M.useSyncExternalStore=function(e,t,n){return ke.current.useSyncExternalStore(e,t,n)};M.useTransition=function(){return ke.current.useTransition()};M.version="18.3.1";Fl.exports=M;var b=Fl.exports;const Ql=yd(b),Ld=vd({__proto__:null,default:Ql},[b]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Dd=b,Md=Symbol.for("react.element"),zd=Symbol.for("react.fragment"),Bd=Object.prototype.hasOwnProperty,Fd=Dd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Od={key:!0,ref:!0,__self:!0,__source:!0};function Yl(e,t,n){var r,s={},o=null,i=null;n!==void 0&&(o=""+n),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(i=t.ref);for(r in t)Bd.call(t,r)&&!Od.hasOwnProperty(r)&&(s[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)s[r]===void 0&&(s[r]=t[r]);return{$$typeof:Md,type:e,key:o,ref:i,props:s,_owner:Fd.current}}Is.Fragment=zd;Is.jsx=Yl;Is.jsxs=Yl;Bl.exports=Is;var a=Bl.exports,Co={},Kl={exports:{}},Te={},Xl={exports:{}},Zl={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(I,R){var L=I.length;I.push(R);e:for(;0<L;){var ee=L-1>>>1,ie=I[ee];if(0<s(ie,R))I[ee]=R,I[L]=ie,L=ee;else break e}}function n(I){return I.length===0?null:I[0]}function r(I){if(I.length===0)return null;var R=I[0],L=I.pop();if(L!==R){I[0]=L;e:for(var ee=0,ie=I.length,Nr=ie>>>1;ee<Nr;){var Lt=2*(ee+1)-1,Ys=I[Lt],Dt=Lt+1,Cr=I[Dt];if(0>s(Ys,L))Dt<ie&&0>s(Cr,Ys)?(I[ee]=Cr,I[Dt]=L,ee=Dt):(I[ee]=Ys,I[Lt]=L,ee=Lt);else if(Dt<ie&&0>s(Cr,L))I[ee]=Cr,I[Dt]=L,ee=Dt;else break e}}return R}function s(I,R){var L=I.sortIndex-R.sortIndex;return L!==0?L:I.id-R.id}if(typeof performance=="object"&&typeof performance.now=="function"){var o=performance;e.unstable_now=function(){return o.now()}}else{var i=Date,l=i.now();e.unstable_now=function(){return i.now()-l}}var u=[],c=[],m=1,h=null,g=3,y=!1,v=!1,w=!1,k=typeof setTimeout=="function"?setTimeout:null,f=typeof clearTimeout=="function"?clearTimeout:null,d=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function p(I){for(var R=n(c);R!==null;){if(R.callback===null)r(c);else if(R.startTime<=I)r(c),R.sortIndex=R.expirationTime,t(u,R);else break;R=n(c)}}function x(I){if(w=!1,p(I),!v)if(n(u)!==null)v=!0,Gs(S);else{var R=n(c);R!==null&&Qs(x,R.startTime-I)}}function S(I,R){v=!1,w&&(w=!1,f(E),E=-1),y=!0;var L=g;try{for(p(R),h=n(u);h!==null&&(!(h.expirationTime>R)||I&&!$());){var ee=h.callback;if(typeof ee=="function"){h.callback=null,g=h.priorityLevel;var ie=ee(h.expirationTime<=R);R=e.unstable_now(),typeof ie=="function"?h.callback=ie:h===n(u)&&r(u),p(R)}else r(u);h=n(u)}if(h!==null)var Nr=!0;else{var Lt=n(c);Lt!==null&&Qs(x,Lt.startTime-R),Nr=!1}return Nr}finally{h=null,g=L,y=!1}}var P=!1,N=null,E=-1,z=5,A=-1;function $(){return!(e.unstable_now()-A<z)}function Rt(){if(N!==null){var I=e.unstable_now();A=I;var R=!0;try{R=N(!0,I)}finally{R?Qe():(P=!1,N=null)}}else P=!1}var Qe;if(typeof d=="function")Qe=function(){d(Rt)};else if(typeof MessageChannel<"u"){var _r=new MessageChannel,gd=_r.port2;_r.port1.onmessage=Rt,Qe=function(){gd.postMessage(null)}}else Qe=function(){k(Rt,0)};function Gs(I){N=I,P||(P=!0,Qe())}function Qs(I,R){E=k(function(){I(e.unstable_now())},R)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(I){I.callback=null},e.unstable_continueExecution=function(){v||y||(v=!0,Gs(S))},e.unstable_forceFrameRate=function(I){0>I||125<I?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):z=0<I?Math.floor(1e3/I):5},e.unstable_getCurrentPriorityLevel=function(){return g},e.unstable_getFirstCallbackNode=function(){return n(u)},e.unstable_next=function(I){switch(g){case 1:case 2:case 3:var R=3;break;default:R=g}var L=g;g=R;try{return I()}finally{g=L}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(I,R){switch(I){case 1:case 2:case 3:case 4:case 5:break;default:I=3}var L=g;g=I;try{return R()}finally{g=L}},e.unstable_scheduleCallback=function(I,R,L){var ee=e.unstable_now();switch(typeof L=="object"&&L!==null?(L=L.delay,L=typeof L=="number"&&0<L?ee+L:ee):L=ee,I){case 1:var ie=-1;break;case 2:ie=250;break;case 5:ie=1073741823;break;case 4:ie=1e4;break;default:ie=5e3}return ie=L+ie,I={id:m++,callback:R,priorityLevel:I,startTime:L,expirationTime:ie,sortIndex:-1},L>ee?(I.sortIndex=L,t(c,I),n(u)===null&&I===n(c)&&(w?(f(E),E=-1):w=!0,Qs(x,L-ee))):(I.sortIndex=ie,t(u,I),v||y||(v=!0,Gs(S))),I},e.unstable_shouldYield=$,e.unstable_wrapCallback=function(I){var R=g;return function(){var L=g;g=R;try{return I.apply(this,arguments)}finally{g=L}}}})(Zl);Xl.exports=Zl;var Wd=Xl.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $d=b,Ae=Wd;function _(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Jl=new Set,Jn={};function Yt(e,t){kn(e,t),kn(e+"Capture",t)}function kn(e,t){for(Jn[e]=t,e=0;e<t.length;e++)Jl.add(t[e])}var ot=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Po=Object.prototype.hasOwnProperty,Ud=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Sa={},_a={};function qd(e){return Po.call(_a,e)?!0:Po.call(Sa,e)?!1:Ud.test(e)?_a[e]=!0:(Sa[e]=!0,!1)}function Vd(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Hd(e,t,n,r){if(t===null||typeof t>"u"||Vd(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function xe(e,t,n,r,s,o,i){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=s,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=i}var fe={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){fe[e]=new xe(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];fe[t]=new xe(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){fe[e]=new xe(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){fe[e]=new xe(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){fe[e]=new xe(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){fe[e]=new xe(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){fe[e]=new xe(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){fe[e]=new xe(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){fe[e]=new xe(e,5,!1,e.toLowerCase(),null,!1,!1)});var Ci=/[\-:]([a-z])/g;function Pi(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Ci,Pi);fe[t]=new xe(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Ci,Pi);fe[t]=new xe(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Ci,Pi);fe[t]=new xe(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){fe[e]=new xe(e,1,!1,e.toLowerCase(),null,!1,!1)});fe.xlinkHref=new xe("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){fe[e]=new xe(e,1,!1,e.toLowerCase(),null,!0,!0)});function ji(e,t,n,r){var s=fe.hasOwnProperty(t)?fe[t]:null;(s!==null?s.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Hd(t,n,s,r)&&(n=null),r||s===null?qd(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):s.mustUseProperty?e[s.propertyName]=n===null?s.type===3?!1:"":n:(t=s.attributeName,r=s.attributeNamespace,n===null?e.removeAttribute(t):(s=s.type,n=s===3||s===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var ut=$d.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,jr=Symbol.for("react.element"),en=Symbol.for("react.portal"),tn=Symbol.for("react.fragment"),Ii=Symbol.for("react.strict_mode"),jo=Symbol.for("react.profiler"),eu=Symbol.for("react.provider"),tu=Symbol.for("react.context"),Ei=Symbol.for("react.forward_ref"),Io=Symbol.for("react.suspense"),Eo=Symbol.for("react.suspense_list"),Ai=Symbol.for("react.memo"),dt=Symbol.for("react.lazy"),nu=Symbol.for("react.offscreen"),Na=Symbol.iterator;function An(e){return e===null||typeof e!="object"?null:(e=Na&&e[Na]||e["@@iterator"],typeof e=="function"?e:null)}var X=Object.assign,Xs;function On(e){if(Xs===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Xs=t&&t[1]||""}return`
`+Xs+e}var Zs=!1;function Js(e,t){if(!e||Zs)return"";Zs=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var r=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){r=c}e.call(t.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var s=c.stack.split(`
`),o=r.stack.split(`
`),i=s.length-1,l=o.length-1;1<=i&&0<=l&&s[i]!==o[l];)l--;for(;1<=i&&0<=l;i--,l--)if(s[i]!==o[l]){if(i!==1||l!==1)do if(i--,l--,0>l||s[i]!==o[l]){var u=`
`+s[i].replace(" at new "," at ");return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}while(1<=i&&0<=l);break}}}finally{Zs=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?On(e):""}function Gd(e){switch(e.tag){case 5:return On(e.type);case 16:return On("Lazy");case 13:return On("Suspense");case 19:return On("SuspenseList");case 0:case 2:case 15:return e=Js(e.type,!1),e;case 11:return e=Js(e.type.render,!1),e;case 1:return e=Js(e.type,!0),e;default:return""}}function Ao(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case tn:return"Fragment";case en:return"Portal";case jo:return"Profiler";case Ii:return"StrictMode";case Io:return"Suspense";case Eo:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case tu:return(e.displayName||"Context")+".Consumer";case eu:return(e._context.displayName||"Context")+".Provider";case Ei:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Ai:return t=e.displayName||null,t!==null?t:Ao(e.type)||"Memo";case dt:t=e._payload,e=e._init;try{return Ao(e(t))}catch{}}return null}function Qd(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ao(t);case 8:return t===Ii?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Pt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function ru(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Yd(e){var t=ru(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var s=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(i){r=""+i,o.call(this,i)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(i){r=""+i},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Ir(e){e._valueTracker||(e._valueTracker=Yd(e))}function su(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=ru(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function rs(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function To(e,t){var n=t.checked;return X({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Ca(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Pt(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function ou(e,t){t=t.checked,t!=null&&ji(e,"checked",t,!1)}function Ro(e,t){ou(e,t);var n=Pt(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Lo(e,t.type,n):t.hasOwnProperty("defaultValue")&&Lo(e,t.type,Pt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Pa(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Lo(e,t,n){(t!=="number"||rs(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Wn=Array.isArray;function hn(e,t,n,r){if(e=e.options,t){t={};for(var s=0;s<n.length;s++)t["$"+n[s]]=!0;for(n=0;n<e.length;n++)s=t.hasOwnProperty("$"+e[n].value),e[n].selected!==s&&(e[n].selected=s),s&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Pt(n),t=null,s=0;s<e.length;s++){if(e[s].value===n){e[s].selected=!0,r&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function Do(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(_(91));return X({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function ja(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(_(92));if(Wn(n)){if(1<n.length)throw Error(_(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Pt(n)}}function iu(e,t){var n=Pt(t.value),r=Pt(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Ia(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function au(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Mo(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?au(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Er,lu=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,s){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,s)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Er=Er||document.createElement("div"),Er.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Er.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function er(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var qn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Kd=["Webkit","ms","Moz","O"];Object.keys(qn).forEach(function(e){Kd.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),qn[t]=qn[e]})});function uu(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||qn.hasOwnProperty(e)&&qn[e]?(""+t).trim():t+"px"}function cu(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,s=uu(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,s):e[n]=s}}var Xd=X({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function zo(e,t){if(t){if(Xd[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(_(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(_(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(_(61))}if(t.style!=null&&typeof t.style!="object")throw Error(_(62))}}function Bo(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Fo=null;function Ti(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Oo=null,mn=null,gn=null;function Ea(e){if(e=xr(e)){if(typeof Oo!="function")throw Error(_(280));var t=e.stateNode;t&&(t=Ls(t),Oo(e.stateNode,e.type,t))}}function du(e){mn?gn?gn.push(e):gn=[e]:mn=e}function fu(){if(mn){var e=mn,t=gn;if(gn=mn=null,Ea(e),t)for(e=0;e<t.length;e++)Ea(t[e])}}function pu(e,t){return e(t)}function hu(){}var eo=!1;function mu(e,t,n){if(eo)return e(t,n);eo=!0;try{return pu(e,t,n)}finally{eo=!1,(mn!==null||gn!==null)&&(hu(),fu())}}function tr(e,t){var n=e.stateNode;if(n===null)return null;var r=Ls(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(_(231,t,typeof n));return n}var Wo=!1;if(ot)try{var Tn={};Object.defineProperty(Tn,"passive",{get:function(){Wo=!0}}),window.addEventListener("test",Tn,Tn),window.removeEventListener("test",Tn,Tn)}catch{Wo=!1}function Zd(e,t,n,r,s,o,i,l,u){var c=Array.prototype.slice.call(arguments,3);try{t.apply(n,c)}catch(m){this.onError(m)}}var Vn=!1,ss=null,os=!1,$o=null,Jd={onError:function(e){Vn=!0,ss=e}};function e1(e,t,n,r,s,o,i,l,u){Vn=!1,ss=null,Zd.apply(Jd,arguments)}function t1(e,t,n,r,s,o,i,l,u){if(e1.apply(this,arguments),Vn){if(Vn){var c=ss;Vn=!1,ss=null}else throw Error(_(198));os||(os=!0,$o=c)}}function Kt(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function gu(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Aa(e){if(Kt(e)!==e)throw Error(_(188))}function n1(e){var t=e.alternate;if(!t){if(t=Kt(e),t===null)throw Error(_(188));return t!==e?null:e}for(var n=e,r=t;;){var s=n.return;if(s===null)break;var o=s.alternate;if(o===null){if(r=s.return,r!==null){n=r;continue}break}if(s.child===o.child){for(o=s.child;o;){if(o===n)return Aa(s),e;if(o===r)return Aa(s),t;o=o.sibling}throw Error(_(188))}if(n.return!==r.return)n=s,r=o;else{for(var i=!1,l=s.child;l;){if(l===n){i=!0,n=s,r=o;break}if(l===r){i=!0,r=s,n=o;break}l=l.sibling}if(!i){for(l=o.child;l;){if(l===n){i=!0,n=o,r=s;break}if(l===r){i=!0,r=o,n=s;break}l=l.sibling}if(!i)throw Error(_(189))}}if(n.alternate!==r)throw Error(_(190))}if(n.tag!==3)throw Error(_(188));return n.stateNode.current===n?e:t}function vu(e){return e=n1(e),e!==null?yu(e):null}function yu(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=yu(e);if(t!==null)return t;e=e.sibling}return null}var wu=Ae.unstable_scheduleCallback,Ta=Ae.unstable_cancelCallback,r1=Ae.unstable_shouldYield,s1=Ae.unstable_requestPaint,te=Ae.unstable_now,o1=Ae.unstable_getCurrentPriorityLevel,Ri=Ae.unstable_ImmediatePriority,ku=Ae.unstable_UserBlockingPriority,is=Ae.unstable_NormalPriority,i1=Ae.unstable_LowPriority,xu=Ae.unstable_IdlePriority,Es=null,Ze=null;function a1(e){if(Ze&&typeof Ze.onCommitFiberRoot=="function")try{Ze.onCommitFiberRoot(Es,e,void 0,(e.current.flags&128)===128)}catch{}}var Ve=Math.clz32?Math.clz32:c1,l1=Math.log,u1=Math.LN2;function c1(e){return e>>>=0,e===0?32:31-(l1(e)/u1|0)|0}var Ar=64,Tr=4194304;function $n(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function as(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,s=e.suspendedLanes,o=e.pingedLanes,i=n&268435455;if(i!==0){var l=i&~s;l!==0?r=$n(l):(o&=i,o!==0&&(r=$n(o)))}else i=n&~s,i!==0?r=$n(i):o!==0&&(r=$n(o));if(r===0)return 0;if(t!==0&&t!==r&&!(t&s)&&(s=r&-r,o=t&-t,s>=o||s===16&&(o&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Ve(t),s=1<<n,r|=e[n],t&=~s;return r}function d1(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function f1(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,s=e.expirationTimes,o=e.pendingLanes;0<o;){var i=31-Ve(o),l=1<<i,u=s[i];u===-1?(!(l&n)||l&r)&&(s[i]=d1(l,t)):u<=t&&(e.expiredLanes|=l),o&=~l}}function Uo(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function bu(){var e=Ar;return Ar<<=1,!(Ar&4194240)&&(Ar=64),e}function to(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function wr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Ve(t),e[t]=n}function p1(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var s=31-Ve(n),o=1<<s;t[s]=0,r[s]=-1,e[s]=-1,n&=~o}}function Li(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Ve(n),s=1<<r;s&t|e[r]&t&&(e[r]|=t),n&=~s}}var W=0;function Su(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var _u,Di,Nu,Cu,Pu,qo=!1,Rr=[],yt=null,wt=null,kt=null,nr=new Map,rr=new Map,pt=[],h1="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Ra(e,t){switch(e){case"focusin":case"focusout":yt=null;break;case"dragenter":case"dragleave":wt=null;break;case"mouseover":case"mouseout":kt=null;break;case"pointerover":case"pointerout":nr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":rr.delete(t.pointerId)}}function Rn(e,t,n,r,s,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[s]},t!==null&&(t=xr(t),t!==null&&Di(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function m1(e,t,n,r,s){switch(t){case"focusin":return yt=Rn(yt,e,t,n,r,s),!0;case"dragenter":return wt=Rn(wt,e,t,n,r,s),!0;case"mouseover":return kt=Rn(kt,e,t,n,r,s),!0;case"pointerover":var o=s.pointerId;return nr.set(o,Rn(nr.get(o)||null,e,t,n,r,s)),!0;case"gotpointercapture":return o=s.pointerId,rr.set(o,Rn(rr.get(o)||null,e,t,n,r,s)),!0}return!1}function ju(e){var t=Bt(e.target);if(t!==null){var n=Kt(t);if(n!==null){if(t=n.tag,t===13){if(t=gu(n),t!==null){e.blockedOn=t,Pu(e.priority,function(){Nu(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Hr(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Vo(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Fo=r,n.target.dispatchEvent(r),Fo=null}else return t=xr(n),t!==null&&Di(t),e.blockedOn=n,!1;t.shift()}return!0}function La(e,t,n){Hr(e)&&n.delete(t)}function g1(){qo=!1,yt!==null&&Hr(yt)&&(yt=null),wt!==null&&Hr(wt)&&(wt=null),kt!==null&&Hr(kt)&&(kt=null),nr.forEach(La),rr.forEach(La)}function Ln(e,t){e.blockedOn===t&&(e.blockedOn=null,qo||(qo=!0,Ae.unstable_scheduleCallback(Ae.unstable_NormalPriority,g1)))}function sr(e){function t(s){return Ln(s,e)}if(0<Rr.length){Ln(Rr[0],e);for(var n=1;n<Rr.length;n++){var r=Rr[n];r.blockedOn===e&&(r.blockedOn=null)}}for(yt!==null&&Ln(yt,e),wt!==null&&Ln(wt,e),kt!==null&&Ln(kt,e),nr.forEach(t),rr.forEach(t),n=0;n<pt.length;n++)r=pt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<pt.length&&(n=pt[0],n.blockedOn===null);)ju(n),n.blockedOn===null&&pt.shift()}var vn=ut.ReactCurrentBatchConfig,ls=!0;function v1(e,t,n,r){var s=W,o=vn.transition;vn.transition=null;try{W=1,Mi(e,t,n,r)}finally{W=s,vn.transition=o}}function y1(e,t,n,r){var s=W,o=vn.transition;vn.transition=null;try{W=4,Mi(e,t,n,r)}finally{W=s,vn.transition=o}}function Mi(e,t,n,r){if(ls){var s=Vo(e,t,n,r);if(s===null)fo(e,t,r,us,n),Ra(e,r);else if(m1(s,e,t,n,r))r.stopPropagation();else if(Ra(e,r),t&4&&-1<h1.indexOf(e)){for(;s!==null;){var o=xr(s);if(o!==null&&_u(o),o=Vo(e,t,n,r),o===null&&fo(e,t,r,us,n),o===s)break;s=o}s!==null&&r.stopPropagation()}else fo(e,t,r,null,n)}}var us=null;function Vo(e,t,n,r){if(us=null,e=Ti(r),e=Bt(e),e!==null)if(t=Kt(e),t===null)e=null;else if(n=t.tag,n===13){if(e=gu(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return us=e,null}function Iu(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(o1()){case Ri:return 1;case ku:return 4;case is:case i1:return 16;case xu:return 536870912;default:return 16}default:return 16}}var mt=null,zi=null,Gr=null;function Eu(){if(Gr)return Gr;var e,t=zi,n=t.length,r,s="value"in mt?mt.value:mt.textContent,o=s.length;for(e=0;e<n&&t[e]===s[e];e++);var i=n-e;for(r=1;r<=i&&t[n-r]===s[o-r];r++);return Gr=s.slice(e,1<r?1-r:void 0)}function Qr(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Lr(){return!0}function Da(){return!1}function Re(e){function t(n,r,s,o,i){this._reactName=n,this._targetInst=s,this.type=r,this.nativeEvent=o,this.target=i,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(n=e[l],this[l]=n?n(o):o[l]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?Lr:Da,this.isPropagationStopped=Da,this}return X(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Lr)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Lr)},persist:function(){},isPersistent:Lr}),t}var jn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Bi=Re(jn),kr=X({},jn,{view:0,detail:0}),w1=Re(kr),no,ro,Dn,As=X({},kr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Fi,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Dn&&(Dn&&e.type==="mousemove"?(no=e.screenX-Dn.screenX,ro=e.screenY-Dn.screenY):ro=no=0,Dn=e),no)},movementY:function(e){return"movementY"in e?e.movementY:ro}}),Ma=Re(As),k1=X({},As,{dataTransfer:0}),x1=Re(k1),b1=X({},kr,{relatedTarget:0}),so=Re(b1),S1=X({},jn,{animationName:0,elapsedTime:0,pseudoElement:0}),_1=Re(S1),N1=X({},jn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),C1=Re(N1),P1=X({},jn,{data:0}),za=Re(P1),j1={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},I1={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},E1={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function A1(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=E1[e])?!!t[e]:!1}function Fi(){return A1}var T1=X({},kr,{key:function(e){if(e.key){var t=j1[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Qr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?I1[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Fi,charCode:function(e){return e.type==="keypress"?Qr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Qr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),R1=Re(T1),L1=X({},As,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ba=Re(L1),D1=X({},kr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Fi}),M1=Re(D1),z1=X({},jn,{propertyName:0,elapsedTime:0,pseudoElement:0}),B1=Re(z1),F1=X({},As,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),O1=Re(F1),W1=[9,13,27,32],Oi=ot&&"CompositionEvent"in window,Hn=null;ot&&"documentMode"in document&&(Hn=document.documentMode);var $1=ot&&"TextEvent"in window&&!Hn,Au=ot&&(!Oi||Hn&&8<Hn&&11>=Hn),Fa=" ",Oa=!1;function Tu(e,t){switch(e){case"keyup":return W1.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Ru(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var nn=!1;function U1(e,t){switch(e){case"compositionend":return Ru(t);case"keypress":return t.which!==32?null:(Oa=!0,Fa);case"textInput":return e=t.data,e===Fa&&Oa?null:e;default:return null}}function q1(e,t){if(nn)return e==="compositionend"||!Oi&&Tu(e,t)?(e=Eu(),Gr=zi=mt=null,nn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Au&&t.locale!=="ko"?null:t.data;default:return null}}var V1={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Wa(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!V1[e.type]:t==="textarea"}function Lu(e,t,n,r){du(r),t=cs(t,"onChange"),0<t.length&&(n=new Bi("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Gn=null,or=null;function H1(e){Vu(e,0)}function Ts(e){var t=on(e);if(su(t))return e}function G1(e,t){if(e==="change")return t}var Du=!1;if(ot){var oo;if(ot){var io="oninput"in document;if(!io){var $a=document.createElement("div");$a.setAttribute("oninput","return;"),io=typeof $a.oninput=="function"}oo=io}else oo=!1;Du=oo&&(!document.documentMode||9<document.documentMode)}function Ua(){Gn&&(Gn.detachEvent("onpropertychange",Mu),or=Gn=null)}function Mu(e){if(e.propertyName==="value"&&Ts(or)){var t=[];Lu(t,or,e,Ti(e)),mu(H1,t)}}function Q1(e,t,n){e==="focusin"?(Ua(),Gn=t,or=n,Gn.attachEvent("onpropertychange",Mu)):e==="focusout"&&Ua()}function Y1(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Ts(or)}function K1(e,t){if(e==="click")return Ts(t)}function X1(e,t){if(e==="input"||e==="change")return Ts(t)}function Z1(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ge=typeof Object.is=="function"?Object.is:Z1;function ir(e,t){if(Ge(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var s=n[r];if(!Po.call(t,s)||!Ge(e[s],t[s]))return!1}return!0}function qa(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Va(e,t){var n=qa(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=qa(n)}}function zu(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?zu(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Bu(){for(var e=window,t=rs();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=rs(e.document)}return t}function Wi(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function J1(e){var t=Bu(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&zu(n.ownerDocument.documentElement,n)){if(r!==null&&Wi(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var s=n.textContent.length,o=Math.min(r.start,s);r=r.end===void 0?o:Math.min(r.end,s),!e.extend&&o>r&&(s=r,r=o,o=s),s=Va(n,o);var i=Va(n,r);s&&i&&(e.rangeCount!==1||e.anchorNode!==s.node||e.anchorOffset!==s.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(t=t.createRange(),t.setStart(s.node,s.offset),e.removeAllRanges(),o>r?(e.addRange(t),e.extend(i.node,i.offset)):(t.setEnd(i.node,i.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var e0=ot&&"documentMode"in document&&11>=document.documentMode,rn=null,Ho=null,Qn=null,Go=!1;function Ha(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Go||rn==null||rn!==rs(r)||(r=rn,"selectionStart"in r&&Wi(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Qn&&ir(Qn,r)||(Qn=r,r=cs(Ho,"onSelect"),0<r.length&&(t=new Bi("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=rn)))}function Dr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var sn={animationend:Dr("Animation","AnimationEnd"),animationiteration:Dr("Animation","AnimationIteration"),animationstart:Dr("Animation","AnimationStart"),transitionend:Dr("Transition","TransitionEnd")},ao={},Fu={};ot&&(Fu=document.createElement("div").style,"AnimationEvent"in window||(delete sn.animationend.animation,delete sn.animationiteration.animation,delete sn.animationstart.animation),"TransitionEvent"in window||delete sn.transitionend.transition);function Rs(e){if(ao[e])return ao[e];if(!sn[e])return e;var t=sn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Fu)return ao[e]=t[n];return e}var Ou=Rs("animationend"),Wu=Rs("animationiteration"),$u=Rs("animationstart"),Uu=Rs("transitionend"),qu=new Map,Ga="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function It(e,t){qu.set(e,t),Yt(t,[e])}for(var lo=0;lo<Ga.length;lo++){var uo=Ga[lo],t0=uo.toLowerCase(),n0=uo[0].toUpperCase()+uo.slice(1);It(t0,"on"+n0)}It(Ou,"onAnimationEnd");It(Wu,"onAnimationIteration");It($u,"onAnimationStart");It("dblclick","onDoubleClick");It("focusin","onFocus");It("focusout","onBlur");It(Uu,"onTransitionEnd");kn("onMouseEnter",["mouseout","mouseover"]);kn("onMouseLeave",["mouseout","mouseover"]);kn("onPointerEnter",["pointerout","pointerover"]);kn("onPointerLeave",["pointerout","pointerover"]);Yt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Yt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Yt("onBeforeInput",["compositionend","keypress","textInput","paste"]);Yt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Yt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Yt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Un="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),r0=new Set("cancel close invalid load scroll toggle".split(" ").concat(Un));function Qa(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,t1(r,t,void 0,e),e.currentTarget=null}function Vu(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],s=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var i=r.length-1;0<=i;i--){var l=r[i],u=l.instance,c=l.currentTarget;if(l=l.listener,u!==o&&s.isPropagationStopped())break e;Qa(s,l,c),o=u}else for(i=0;i<r.length;i++){if(l=r[i],u=l.instance,c=l.currentTarget,l=l.listener,u!==o&&s.isPropagationStopped())break e;Qa(s,l,c),o=u}}}if(os)throw e=$o,os=!1,$o=null,e}function V(e,t){var n=t[Zo];n===void 0&&(n=t[Zo]=new Set);var r=e+"__bubble";n.has(r)||(Hu(t,e,2,!1),n.add(r))}function co(e,t,n){var r=0;t&&(r|=4),Hu(n,e,r,t)}var Mr="_reactListening"+Math.random().toString(36).slice(2);function ar(e){if(!e[Mr]){e[Mr]=!0,Jl.forEach(function(n){n!=="selectionchange"&&(r0.has(n)||co(n,!1,e),co(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Mr]||(t[Mr]=!0,co("selectionchange",!1,t))}}function Hu(e,t,n,r){switch(Iu(t)){case 1:var s=v1;break;case 4:s=y1;break;default:s=Mi}n=s.bind(null,t,n,e),s=void 0,!Wo||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),r?s!==void 0?e.addEventListener(t,n,{capture:!0,passive:s}):e.addEventListener(t,n,!0):s!==void 0?e.addEventListener(t,n,{passive:s}):e.addEventListener(t,n,!1)}function fo(e,t,n,r,s){var o=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var i=r.tag;if(i===3||i===4){var l=r.stateNode.containerInfo;if(l===s||l.nodeType===8&&l.parentNode===s)break;if(i===4)for(i=r.return;i!==null;){var u=i.tag;if((u===3||u===4)&&(u=i.stateNode.containerInfo,u===s||u.nodeType===8&&u.parentNode===s))return;i=i.return}for(;l!==null;){if(i=Bt(l),i===null)return;if(u=i.tag,u===5||u===6){r=o=i;continue e}l=l.parentNode}}r=r.return}mu(function(){var c=o,m=Ti(n),h=[];e:{var g=qu.get(e);if(g!==void 0){var y=Bi,v=e;switch(e){case"keypress":if(Qr(n)===0)break e;case"keydown":case"keyup":y=R1;break;case"focusin":v="focus",y=so;break;case"focusout":v="blur",y=so;break;case"beforeblur":case"afterblur":y=so;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":y=Ma;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":y=x1;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":y=M1;break;case Ou:case Wu:case $u:y=_1;break;case Uu:y=B1;break;case"scroll":y=w1;break;case"wheel":y=O1;break;case"copy":case"cut":case"paste":y=C1;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":y=Ba}var w=(t&4)!==0,k=!w&&e==="scroll",f=w?g!==null?g+"Capture":null:g;w=[];for(var d=c,p;d!==null;){p=d;var x=p.stateNode;if(p.tag===5&&x!==null&&(p=x,f!==null&&(x=tr(d,f),x!=null&&w.push(lr(d,x,p)))),k)break;d=d.return}0<w.length&&(g=new y(g,v,null,n,m),h.push({event:g,listeners:w}))}}if(!(t&7)){e:{if(g=e==="mouseover"||e==="pointerover",y=e==="mouseout"||e==="pointerout",g&&n!==Fo&&(v=n.relatedTarget||n.fromElement)&&(Bt(v)||v[it]))break e;if((y||g)&&(g=m.window===m?m:(g=m.ownerDocument)?g.defaultView||g.parentWindow:window,y?(v=n.relatedTarget||n.toElement,y=c,v=v?Bt(v):null,v!==null&&(k=Kt(v),v!==k||v.tag!==5&&v.tag!==6)&&(v=null)):(y=null,v=c),y!==v)){if(w=Ma,x="onMouseLeave",f="onMouseEnter",d="mouse",(e==="pointerout"||e==="pointerover")&&(w=Ba,x="onPointerLeave",f="onPointerEnter",d="pointer"),k=y==null?g:on(y),p=v==null?g:on(v),g=new w(x,d+"leave",y,n,m),g.target=k,g.relatedTarget=p,x=null,Bt(m)===c&&(w=new w(f,d+"enter",v,n,m),w.target=p,w.relatedTarget=k,x=w),k=x,y&&v)t:{for(w=y,f=v,d=0,p=w;p;p=Zt(p))d++;for(p=0,x=f;x;x=Zt(x))p++;for(;0<d-p;)w=Zt(w),d--;for(;0<p-d;)f=Zt(f),p--;for(;d--;){if(w===f||f!==null&&w===f.alternate)break t;w=Zt(w),f=Zt(f)}w=null}else w=null;y!==null&&Ya(h,g,y,w,!1),v!==null&&k!==null&&Ya(h,k,v,w,!0)}}e:{if(g=c?on(c):window,y=g.nodeName&&g.nodeName.toLowerCase(),y==="select"||y==="input"&&g.type==="file")var S=G1;else if(Wa(g))if(Du)S=X1;else{S=Y1;var P=Q1}else(y=g.nodeName)&&y.toLowerCase()==="input"&&(g.type==="checkbox"||g.type==="radio")&&(S=K1);if(S&&(S=S(e,c))){Lu(h,S,n,m);break e}P&&P(e,g,c),e==="focusout"&&(P=g._wrapperState)&&P.controlled&&g.type==="number"&&Lo(g,"number",g.value)}switch(P=c?on(c):window,e){case"focusin":(Wa(P)||P.contentEditable==="true")&&(rn=P,Ho=c,Qn=null);break;case"focusout":Qn=Ho=rn=null;break;case"mousedown":Go=!0;break;case"contextmenu":case"mouseup":case"dragend":Go=!1,Ha(h,n,m);break;case"selectionchange":if(e0)break;case"keydown":case"keyup":Ha(h,n,m)}var N;if(Oi)e:{switch(e){case"compositionstart":var E="onCompositionStart";break e;case"compositionend":E="onCompositionEnd";break e;case"compositionupdate":E="onCompositionUpdate";break e}E=void 0}else nn?Tu(e,n)&&(E="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(E="onCompositionStart");E&&(Au&&n.locale!=="ko"&&(nn||E!=="onCompositionStart"?E==="onCompositionEnd"&&nn&&(N=Eu()):(mt=m,zi="value"in mt?mt.value:mt.textContent,nn=!0)),P=cs(c,E),0<P.length&&(E=new za(E,e,null,n,m),h.push({event:E,listeners:P}),N?E.data=N:(N=Ru(n),N!==null&&(E.data=N)))),(N=$1?U1(e,n):q1(e,n))&&(c=cs(c,"onBeforeInput"),0<c.length&&(m=new za("onBeforeInput","beforeinput",null,n,m),h.push({event:m,listeners:c}),m.data=N))}Vu(h,t)})}function lr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function cs(e,t){for(var n=t+"Capture",r=[];e!==null;){var s=e,o=s.stateNode;s.tag===5&&o!==null&&(s=o,o=tr(e,n),o!=null&&r.unshift(lr(e,o,s)),o=tr(e,t),o!=null&&r.push(lr(e,o,s))),e=e.return}return r}function Zt(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Ya(e,t,n,r,s){for(var o=t._reactName,i=[];n!==null&&n!==r;){var l=n,u=l.alternate,c=l.stateNode;if(u!==null&&u===r)break;l.tag===5&&c!==null&&(l=c,s?(u=tr(n,o),u!=null&&i.unshift(lr(n,u,l))):s||(u=tr(n,o),u!=null&&i.push(lr(n,u,l)))),n=n.return}i.length!==0&&e.push({event:t,listeners:i})}var s0=/\r\n?/g,o0=/\u0000|\uFFFD/g;function Ka(e){return(typeof e=="string"?e:""+e).replace(s0,`
`).replace(o0,"")}function zr(e,t,n){if(t=Ka(t),Ka(e)!==t&&n)throw Error(_(425))}function ds(){}var Qo=null,Yo=null;function Ko(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Xo=typeof setTimeout=="function"?setTimeout:void 0,i0=typeof clearTimeout=="function"?clearTimeout:void 0,Xa=typeof Promise=="function"?Promise:void 0,a0=typeof queueMicrotask=="function"?queueMicrotask:typeof Xa<"u"?function(e){return Xa.resolve(null).then(e).catch(l0)}:Xo;function l0(e){setTimeout(function(){throw e})}function po(e,t){var n=t,r=0;do{var s=n.nextSibling;if(e.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(r===0){e.removeChild(s),sr(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=s}while(n);sr(t)}function xt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Za(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var In=Math.random().toString(36).slice(2),Xe="__reactFiber$"+In,ur="__reactProps$"+In,it="__reactContainer$"+In,Zo="__reactEvents$"+In,u0="__reactListeners$"+In,c0="__reactHandles$"+In;function Bt(e){var t=e[Xe];if(t)return t;for(var n=e.parentNode;n;){if(t=n[it]||n[Xe]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Za(e);e!==null;){if(n=e[Xe])return n;e=Za(e)}return t}e=n,n=e.parentNode}return null}function xr(e){return e=e[Xe]||e[it],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function on(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(_(33))}function Ls(e){return e[ur]||null}var Jo=[],an=-1;function Et(e){return{current:e}}function H(e){0>an||(e.current=Jo[an],Jo[an]=null,an--)}function q(e,t){an++,Jo[an]=e.current,e.current=t}var jt={},ge=Et(jt),_e=Et(!1),qt=jt;function xn(e,t){var n=e.type.contextTypes;if(!n)return jt;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var s={},o;for(o in n)s[o]=t[o];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=s),s}function Ne(e){return e=e.childContextTypes,e!=null}function fs(){H(_e),H(ge)}function Ja(e,t,n){if(ge.current!==jt)throw Error(_(168));q(ge,t),q(_e,n)}function Gu(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var s in r)if(!(s in t))throw Error(_(108,Qd(e)||"Unknown",s));return X({},n,r)}function ps(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||jt,qt=ge.current,q(ge,e),q(_e,_e.current),!0}function el(e,t,n){var r=e.stateNode;if(!r)throw Error(_(169));n?(e=Gu(e,t,qt),r.__reactInternalMemoizedMergedChildContext=e,H(_e),H(ge),q(ge,e)):H(_e),q(_e,n)}var tt=null,Ds=!1,ho=!1;function Qu(e){tt===null?tt=[e]:tt.push(e)}function d0(e){Ds=!0,Qu(e)}function At(){if(!ho&&tt!==null){ho=!0;var e=0,t=W;try{var n=tt;for(W=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}tt=null,Ds=!1}catch(s){throw tt!==null&&(tt=tt.slice(e+1)),wu(Ri,At),s}finally{W=t,ho=!1}}return null}var ln=[],un=0,hs=null,ms=0,Le=[],De=0,Vt=null,nt=1,rt="";function Mt(e,t){ln[un++]=ms,ln[un++]=hs,hs=e,ms=t}function Yu(e,t,n){Le[De++]=nt,Le[De++]=rt,Le[De++]=Vt,Vt=e;var r=nt;e=rt;var s=32-Ve(r)-1;r&=~(1<<s),n+=1;var o=32-Ve(t)+s;if(30<o){var i=s-s%5;o=(r&(1<<i)-1).toString(32),r>>=i,s-=i,nt=1<<32-Ve(t)+s|n<<s|r,rt=o+e}else nt=1<<o|n<<s|r,rt=e}function $i(e){e.return!==null&&(Mt(e,1),Yu(e,1,0))}function Ui(e){for(;e===hs;)hs=ln[--un],ln[un]=null,ms=ln[--un],ln[un]=null;for(;e===Vt;)Vt=Le[--De],Le[De]=null,rt=Le[--De],Le[De]=null,nt=Le[--De],Le[De]=null}var Ee=null,Ie=null,Q=!1,qe=null;function Ku(e,t){var n=Me(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function tl(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Ee=e,Ie=xt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Ee=e,Ie=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Vt!==null?{id:nt,overflow:rt}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Me(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Ee=e,Ie=null,!0):!1;default:return!1}}function ei(e){return(e.mode&1)!==0&&(e.flags&128)===0}function ti(e){if(Q){var t=Ie;if(t){var n=t;if(!tl(e,t)){if(ei(e))throw Error(_(418));t=xt(n.nextSibling);var r=Ee;t&&tl(e,t)?Ku(r,n):(e.flags=e.flags&-4097|2,Q=!1,Ee=e)}}else{if(ei(e))throw Error(_(418));e.flags=e.flags&-4097|2,Q=!1,Ee=e}}}function nl(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Ee=e}function Br(e){if(e!==Ee)return!1;if(!Q)return nl(e),Q=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Ko(e.type,e.memoizedProps)),t&&(t=Ie)){if(ei(e))throw Xu(),Error(_(418));for(;t;)Ku(e,t),t=xt(t.nextSibling)}if(nl(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(_(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Ie=xt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Ie=null}}else Ie=Ee?xt(e.stateNode.nextSibling):null;return!0}function Xu(){for(var e=Ie;e;)e=xt(e.nextSibling)}function bn(){Ie=Ee=null,Q=!1}function qi(e){qe===null?qe=[e]:qe.push(e)}var f0=ut.ReactCurrentBatchConfig;function Mn(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(_(309));var r=n.stateNode}if(!r)throw Error(_(147,e));var s=r,o=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===o?t.ref:(t=function(i){var l=s.refs;i===null?delete l[o]:l[o]=i},t._stringRef=o,t)}if(typeof e!="string")throw Error(_(284));if(!n._owner)throw Error(_(290,e))}return e}function Fr(e,t){throw e=Object.prototype.toString.call(t),Error(_(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function rl(e){var t=e._init;return t(e._payload)}function Zu(e){function t(f,d){if(e){var p=f.deletions;p===null?(f.deletions=[d],f.flags|=16):p.push(d)}}function n(f,d){if(!e)return null;for(;d!==null;)t(f,d),d=d.sibling;return null}function r(f,d){for(f=new Map;d!==null;)d.key!==null?f.set(d.key,d):f.set(d.index,d),d=d.sibling;return f}function s(f,d){return f=Nt(f,d),f.index=0,f.sibling=null,f}function o(f,d,p){return f.index=p,e?(p=f.alternate,p!==null?(p=p.index,p<d?(f.flags|=2,d):p):(f.flags|=2,d)):(f.flags|=1048576,d)}function i(f){return e&&f.alternate===null&&(f.flags|=2),f}function l(f,d,p,x){return d===null||d.tag!==6?(d=xo(p,f.mode,x),d.return=f,d):(d=s(d,p),d.return=f,d)}function u(f,d,p,x){var S=p.type;return S===tn?m(f,d,p.props.children,x,p.key):d!==null&&(d.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===dt&&rl(S)===d.type)?(x=s(d,p.props),x.ref=Mn(f,d,p),x.return=f,x):(x=ts(p.type,p.key,p.props,null,f.mode,x),x.ref=Mn(f,d,p),x.return=f,x)}function c(f,d,p,x){return d===null||d.tag!==4||d.stateNode.containerInfo!==p.containerInfo||d.stateNode.implementation!==p.implementation?(d=bo(p,f.mode,x),d.return=f,d):(d=s(d,p.children||[]),d.return=f,d)}function m(f,d,p,x,S){return d===null||d.tag!==7?(d=$t(p,f.mode,x,S),d.return=f,d):(d=s(d,p),d.return=f,d)}function h(f,d,p){if(typeof d=="string"&&d!==""||typeof d=="number")return d=xo(""+d,f.mode,p),d.return=f,d;if(typeof d=="object"&&d!==null){switch(d.$$typeof){case jr:return p=ts(d.type,d.key,d.props,null,f.mode,p),p.ref=Mn(f,null,d),p.return=f,p;case en:return d=bo(d,f.mode,p),d.return=f,d;case dt:var x=d._init;return h(f,x(d._payload),p)}if(Wn(d)||An(d))return d=$t(d,f.mode,p,null),d.return=f,d;Fr(f,d)}return null}function g(f,d,p,x){var S=d!==null?d.key:null;if(typeof p=="string"&&p!==""||typeof p=="number")return S!==null?null:l(f,d,""+p,x);if(typeof p=="object"&&p!==null){switch(p.$$typeof){case jr:return p.key===S?u(f,d,p,x):null;case en:return p.key===S?c(f,d,p,x):null;case dt:return S=p._init,g(f,d,S(p._payload),x)}if(Wn(p)||An(p))return S!==null?null:m(f,d,p,x,null);Fr(f,p)}return null}function y(f,d,p,x,S){if(typeof x=="string"&&x!==""||typeof x=="number")return f=f.get(p)||null,l(d,f,""+x,S);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case jr:return f=f.get(x.key===null?p:x.key)||null,u(d,f,x,S);case en:return f=f.get(x.key===null?p:x.key)||null,c(d,f,x,S);case dt:var P=x._init;return y(f,d,p,P(x._payload),S)}if(Wn(x)||An(x))return f=f.get(p)||null,m(d,f,x,S,null);Fr(d,x)}return null}function v(f,d,p,x){for(var S=null,P=null,N=d,E=d=0,z=null;N!==null&&E<p.length;E++){N.index>E?(z=N,N=null):z=N.sibling;var A=g(f,N,p[E],x);if(A===null){N===null&&(N=z);break}e&&N&&A.alternate===null&&t(f,N),d=o(A,d,E),P===null?S=A:P.sibling=A,P=A,N=z}if(E===p.length)return n(f,N),Q&&Mt(f,E),S;if(N===null){for(;E<p.length;E++)N=h(f,p[E],x),N!==null&&(d=o(N,d,E),P===null?S=N:P.sibling=N,P=N);return Q&&Mt(f,E),S}for(N=r(f,N);E<p.length;E++)z=y(N,f,E,p[E],x),z!==null&&(e&&z.alternate!==null&&N.delete(z.key===null?E:z.key),d=o(z,d,E),P===null?S=z:P.sibling=z,P=z);return e&&N.forEach(function($){return t(f,$)}),Q&&Mt(f,E),S}function w(f,d,p,x){var S=An(p);if(typeof S!="function")throw Error(_(150));if(p=S.call(p),p==null)throw Error(_(151));for(var P=S=null,N=d,E=d=0,z=null,A=p.next();N!==null&&!A.done;E++,A=p.next()){N.index>E?(z=N,N=null):z=N.sibling;var $=g(f,N,A.value,x);if($===null){N===null&&(N=z);break}e&&N&&$.alternate===null&&t(f,N),d=o($,d,E),P===null?S=$:P.sibling=$,P=$,N=z}if(A.done)return n(f,N),Q&&Mt(f,E),S;if(N===null){for(;!A.done;E++,A=p.next())A=h(f,A.value,x),A!==null&&(d=o(A,d,E),P===null?S=A:P.sibling=A,P=A);return Q&&Mt(f,E),S}for(N=r(f,N);!A.done;E++,A=p.next())A=y(N,f,E,A.value,x),A!==null&&(e&&A.alternate!==null&&N.delete(A.key===null?E:A.key),d=o(A,d,E),P===null?S=A:P.sibling=A,P=A);return e&&N.forEach(function(Rt){return t(f,Rt)}),Q&&Mt(f,E),S}function k(f,d,p,x){if(typeof p=="object"&&p!==null&&p.type===tn&&p.key===null&&(p=p.props.children),typeof p=="object"&&p!==null){switch(p.$$typeof){case jr:e:{for(var S=p.key,P=d;P!==null;){if(P.key===S){if(S=p.type,S===tn){if(P.tag===7){n(f,P.sibling),d=s(P,p.props.children),d.return=f,f=d;break e}}else if(P.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===dt&&rl(S)===P.type){n(f,P.sibling),d=s(P,p.props),d.ref=Mn(f,P,p),d.return=f,f=d;break e}n(f,P);break}else t(f,P);P=P.sibling}p.type===tn?(d=$t(p.props.children,f.mode,x,p.key),d.return=f,f=d):(x=ts(p.type,p.key,p.props,null,f.mode,x),x.ref=Mn(f,d,p),x.return=f,f=x)}return i(f);case en:e:{for(P=p.key;d!==null;){if(d.key===P)if(d.tag===4&&d.stateNode.containerInfo===p.containerInfo&&d.stateNode.implementation===p.implementation){n(f,d.sibling),d=s(d,p.children||[]),d.return=f,f=d;break e}else{n(f,d);break}else t(f,d);d=d.sibling}d=bo(p,f.mode,x),d.return=f,f=d}return i(f);case dt:return P=p._init,k(f,d,P(p._payload),x)}if(Wn(p))return v(f,d,p,x);if(An(p))return w(f,d,p,x);Fr(f,p)}return typeof p=="string"&&p!==""||typeof p=="number"?(p=""+p,d!==null&&d.tag===6?(n(f,d.sibling),d=s(d,p),d.return=f,f=d):(n(f,d),d=xo(p,f.mode,x),d.return=f,f=d),i(f)):n(f,d)}return k}var Sn=Zu(!0),Ju=Zu(!1),gs=Et(null),vs=null,cn=null,Vi=null;function Hi(){Vi=cn=vs=null}function Gi(e){var t=gs.current;H(gs),e._currentValue=t}function ni(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function yn(e,t){vs=e,Vi=cn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(Se=!0),e.firstContext=null)}function Be(e){var t=e._currentValue;if(Vi!==e)if(e={context:e,memoizedValue:t,next:null},cn===null){if(vs===null)throw Error(_(308));cn=e,vs.dependencies={lanes:0,firstContext:e}}else cn=cn.next=e;return t}var Ft=null;function Qi(e){Ft===null?Ft=[e]:Ft.push(e)}function ec(e,t,n,r){var s=t.interleaved;return s===null?(n.next=n,Qi(t)):(n.next=s.next,s.next=n),t.interleaved=n,at(e,r)}function at(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var ft=!1;function Yi(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function tc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function st(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function bt(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,F&2){var s=r.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),r.pending=t,at(e,n)}return s=r.interleaved,s===null?(t.next=t,Qi(r)):(t.next=s.next,s.next=t),r.interleaved=t,at(e,n)}function Yr(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Li(e,n)}}function sl(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var s=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var i={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?s=o=i:o=o.next=i,n=n.next}while(n!==null);o===null?s=o=t:o=o.next=t}else s=o=t;n={baseState:r.baseState,firstBaseUpdate:s,lastBaseUpdate:o,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function ys(e,t,n,r){var s=e.updateQueue;ft=!1;var o=s.firstBaseUpdate,i=s.lastBaseUpdate,l=s.shared.pending;if(l!==null){s.shared.pending=null;var u=l,c=u.next;u.next=null,i===null?o=c:i.next=c,i=u;var m=e.alternate;m!==null&&(m=m.updateQueue,l=m.lastBaseUpdate,l!==i&&(l===null?m.firstBaseUpdate=c:l.next=c,m.lastBaseUpdate=u))}if(o!==null){var h=s.baseState;i=0,m=c=u=null,l=o;do{var g=l.lane,y=l.eventTime;if((r&g)===g){m!==null&&(m=m.next={eventTime:y,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var v=e,w=l;switch(g=t,y=n,w.tag){case 1:if(v=w.payload,typeof v=="function"){h=v.call(y,h,g);break e}h=v;break e;case 3:v.flags=v.flags&-65537|128;case 0:if(v=w.payload,g=typeof v=="function"?v.call(y,h,g):v,g==null)break e;h=X({},h,g);break e;case 2:ft=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,g=s.effects,g===null?s.effects=[l]:g.push(l))}else y={eventTime:y,lane:g,tag:l.tag,payload:l.payload,callback:l.callback,next:null},m===null?(c=m=y,u=h):m=m.next=y,i|=g;if(l=l.next,l===null){if(l=s.shared.pending,l===null)break;g=l,l=g.next,g.next=null,s.lastBaseUpdate=g,s.shared.pending=null}}while(!0);if(m===null&&(u=h),s.baseState=u,s.firstBaseUpdate=c,s.lastBaseUpdate=m,t=s.shared.interleaved,t!==null){s=t;do i|=s.lane,s=s.next;while(s!==t)}else o===null&&(s.shared.lanes=0);Gt|=i,e.lanes=i,e.memoizedState=h}}function ol(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],s=r.callback;if(s!==null){if(r.callback=null,r=n,typeof s!="function")throw Error(_(191,s));s.call(r)}}}var br={},Je=Et(br),cr=Et(br),dr=Et(br);function Ot(e){if(e===br)throw Error(_(174));return e}function Ki(e,t){switch(q(dr,t),q(cr,e),q(Je,br),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Mo(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Mo(t,e)}H(Je),q(Je,t)}function _n(){H(Je),H(cr),H(dr)}function nc(e){Ot(dr.current);var t=Ot(Je.current),n=Mo(t,e.type);t!==n&&(q(cr,e),q(Je,n))}function Xi(e){cr.current===e&&(H(Je),H(cr))}var Y=Et(0);function ws(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var mo=[];function Zi(){for(var e=0;e<mo.length;e++)mo[e]._workInProgressVersionPrimary=null;mo.length=0}var Kr=ut.ReactCurrentDispatcher,go=ut.ReactCurrentBatchConfig,Ht=0,K=null,se=null,le=null,ks=!1,Yn=!1,fr=0,p0=0;function pe(){throw Error(_(321))}function Ji(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Ge(e[n],t[n]))return!1;return!0}function ea(e,t,n,r,s,o){if(Ht=o,K=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Kr.current=e===null||e.memoizedState===null?v0:y0,e=n(r,s),Yn){o=0;do{if(Yn=!1,fr=0,25<=o)throw Error(_(301));o+=1,le=se=null,t.updateQueue=null,Kr.current=w0,e=n(r,s)}while(Yn)}if(Kr.current=xs,t=se!==null&&se.next!==null,Ht=0,le=se=K=null,ks=!1,t)throw Error(_(300));return e}function ta(){var e=fr!==0;return fr=0,e}function Ke(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return le===null?K.memoizedState=le=e:le=le.next=e,le}function Fe(){if(se===null){var e=K.alternate;e=e!==null?e.memoizedState:null}else e=se.next;var t=le===null?K.memoizedState:le.next;if(t!==null)le=t,se=e;else{if(e===null)throw Error(_(310));se=e,e={memoizedState:se.memoizedState,baseState:se.baseState,baseQueue:se.baseQueue,queue:se.queue,next:null},le===null?K.memoizedState=le=e:le=le.next=e}return le}function pr(e,t){return typeof t=="function"?t(e):t}function vo(e){var t=Fe(),n=t.queue;if(n===null)throw Error(_(311));n.lastRenderedReducer=e;var r=se,s=r.baseQueue,o=n.pending;if(o!==null){if(s!==null){var i=s.next;s.next=o.next,o.next=i}r.baseQueue=s=o,n.pending=null}if(s!==null){o=s.next,r=r.baseState;var l=i=null,u=null,c=o;do{var m=c.lane;if((Ht&m)===m)u!==null&&(u=u.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:e(r,c.action);else{var h={lane:m,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};u===null?(l=u=h,i=r):u=u.next=h,K.lanes|=m,Gt|=m}c=c.next}while(c!==null&&c!==o);u===null?i=r:u.next=l,Ge(r,t.memoizedState)||(Se=!0),t.memoizedState=r,t.baseState=i,t.baseQueue=u,n.lastRenderedState=r}if(e=n.interleaved,e!==null){s=e;do o=s.lane,K.lanes|=o,Gt|=o,s=s.next;while(s!==e)}else s===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function yo(e){var t=Fe(),n=t.queue;if(n===null)throw Error(_(311));n.lastRenderedReducer=e;var r=n.dispatch,s=n.pending,o=t.memoizedState;if(s!==null){n.pending=null;var i=s=s.next;do o=e(o,i.action),i=i.next;while(i!==s);Ge(o,t.memoizedState)||(Se=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function rc(){}function sc(e,t){var n=K,r=Fe(),s=t(),o=!Ge(r.memoizedState,s);if(o&&(r.memoizedState=s,Se=!0),r=r.queue,na(ac.bind(null,n,r,e),[e]),r.getSnapshot!==t||o||le!==null&&le.memoizedState.tag&1){if(n.flags|=2048,hr(9,ic.bind(null,n,r,s,t),void 0,null),ue===null)throw Error(_(349));Ht&30||oc(n,t,s)}return s}function oc(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=K.updateQueue,t===null?(t={lastEffect:null,stores:null},K.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function ic(e,t,n,r){t.value=n,t.getSnapshot=r,lc(t)&&uc(e)}function ac(e,t,n){return n(function(){lc(t)&&uc(e)})}function lc(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Ge(e,n)}catch{return!0}}function uc(e){var t=at(e,1);t!==null&&He(t,e,1,-1)}function il(e){var t=Ke();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:pr,lastRenderedState:e},t.queue=e,e=e.dispatch=g0.bind(null,K,e),[t.memoizedState,e]}function hr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=K.updateQueue,t===null?(t={lastEffect:null,stores:null},K.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function cc(){return Fe().memoizedState}function Xr(e,t,n,r){var s=Ke();K.flags|=e,s.memoizedState=hr(1|t,n,void 0,r===void 0?null:r)}function Ms(e,t,n,r){var s=Fe();r=r===void 0?null:r;var o=void 0;if(se!==null){var i=se.memoizedState;if(o=i.destroy,r!==null&&Ji(r,i.deps)){s.memoizedState=hr(t,n,o,r);return}}K.flags|=e,s.memoizedState=hr(1|t,n,o,r)}function al(e,t){return Xr(8390656,8,e,t)}function na(e,t){return Ms(2048,8,e,t)}function dc(e,t){return Ms(4,2,e,t)}function fc(e,t){return Ms(4,4,e,t)}function pc(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function hc(e,t,n){return n=n!=null?n.concat([e]):null,Ms(4,4,pc.bind(null,t,e),n)}function ra(){}function mc(e,t){var n=Fe();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Ji(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function gc(e,t){var n=Fe();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Ji(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function vc(e,t,n){return Ht&21?(Ge(n,t)||(n=bu(),K.lanes|=n,Gt|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,Se=!0),e.memoizedState=n)}function h0(e,t){var n=W;W=n!==0&&4>n?n:4,e(!0);var r=go.transition;go.transition={};try{e(!1),t()}finally{W=n,go.transition=r}}function yc(){return Fe().memoizedState}function m0(e,t,n){var r=_t(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},wc(e))kc(t,n);else if(n=ec(e,t,n,r),n!==null){var s=we();He(n,e,r,s),xc(n,t,r)}}function g0(e,t,n){var r=_t(e),s={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(wc(e))kc(t,s);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var i=t.lastRenderedState,l=o(i,n);if(s.hasEagerState=!0,s.eagerState=l,Ge(l,i)){var u=t.interleaved;u===null?(s.next=s,Qi(t)):(s.next=u.next,u.next=s),t.interleaved=s;return}}catch{}finally{}n=ec(e,t,s,r),n!==null&&(s=we(),He(n,e,r,s),xc(n,t,r))}}function wc(e){var t=e.alternate;return e===K||t!==null&&t===K}function kc(e,t){Yn=ks=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function xc(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Li(e,n)}}var xs={readContext:Be,useCallback:pe,useContext:pe,useEffect:pe,useImperativeHandle:pe,useInsertionEffect:pe,useLayoutEffect:pe,useMemo:pe,useReducer:pe,useRef:pe,useState:pe,useDebugValue:pe,useDeferredValue:pe,useTransition:pe,useMutableSource:pe,useSyncExternalStore:pe,useId:pe,unstable_isNewReconciler:!1},v0={readContext:Be,useCallback:function(e,t){return Ke().memoizedState=[e,t===void 0?null:t],e},useContext:Be,useEffect:al,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Xr(4194308,4,pc.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Xr(4194308,4,e,t)},useInsertionEffect:function(e,t){return Xr(4,2,e,t)},useMemo:function(e,t){var n=Ke();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Ke();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=m0.bind(null,K,e),[r.memoizedState,e]},useRef:function(e){var t=Ke();return e={current:e},t.memoizedState=e},useState:il,useDebugValue:ra,useDeferredValue:function(e){return Ke().memoizedState=e},useTransition:function(){var e=il(!1),t=e[0];return e=h0.bind(null,e[1]),Ke().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=K,s=Ke();if(Q){if(n===void 0)throw Error(_(407));n=n()}else{if(n=t(),ue===null)throw Error(_(349));Ht&30||oc(r,t,n)}s.memoizedState=n;var o={value:n,getSnapshot:t};return s.queue=o,al(ac.bind(null,r,o,e),[e]),r.flags|=2048,hr(9,ic.bind(null,r,o,n,t),void 0,null),n},useId:function(){var e=Ke(),t=ue.identifierPrefix;if(Q){var n=rt,r=nt;n=(r&~(1<<32-Ve(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=fr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=p0++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},y0={readContext:Be,useCallback:mc,useContext:Be,useEffect:na,useImperativeHandle:hc,useInsertionEffect:dc,useLayoutEffect:fc,useMemo:gc,useReducer:vo,useRef:cc,useState:function(){return vo(pr)},useDebugValue:ra,useDeferredValue:function(e){var t=Fe();return vc(t,se.memoizedState,e)},useTransition:function(){var e=vo(pr)[0],t=Fe().memoizedState;return[e,t]},useMutableSource:rc,useSyncExternalStore:sc,useId:yc,unstable_isNewReconciler:!1},w0={readContext:Be,useCallback:mc,useContext:Be,useEffect:na,useImperativeHandle:hc,useInsertionEffect:dc,useLayoutEffect:fc,useMemo:gc,useReducer:yo,useRef:cc,useState:function(){return yo(pr)},useDebugValue:ra,useDeferredValue:function(e){var t=Fe();return se===null?t.memoizedState=e:vc(t,se.memoizedState,e)},useTransition:function(){var e=yo(pr)[0],t=Fe().memoizedState;return[e,t]},useMutableSource:rc,useSyncExternalStore:sc,useId:yc,unstable_isNewReconciler:!1};function $e(e,t){if(e&&e.defaultProps){t=X({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function ri(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:X({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var zs={isMounted:function(e){return(e=e._reactInternals)?Kt(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=we(),s=_t(e),o=st(r,s);o.payload=t,n!=null&&(o.callback=n),t=bt(e,o,s),t!==null&&(He(t,e,s,r),Yr(t,e,s))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=we(),s=_t(e),o=st(r,s);o.tag=1,o.payload=t,n!=null&&(o.callback=n),t=bt(e,o,s),t!==null&&(He(t,e,s,r),Yr(t,e,s))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=we(),r=_t(e),s=st(n,r);s.tag=2,t!=null&&(s.callback=t),t=bt(e,s,r),t!==null&&(He(t,e,r,n),Yr(t,e,r))}};function ll(e,t,n,r,s,o,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,o,i):t.prototype&&t.prototype.isPureReactComponent?!ir(n,r)||!ir(s,o):!0}function bc(e,t,n){var r=!1,s=jt,o=t.contextType;return typeof o=="object"&&o!==null?o=Be(o):(s=Ne(t)?qt:ge.current,r=t.contextTypes,o=(r=r!=null)?xn(e,s):jt),t=new t(n,o),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=zs,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=s,e.__reactInternalMemoizedMaskedChildContext=o),t}function ul(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&zs.enqueueReplaceState(t,t.state,null)}function si(e,t,n,r){var s=e.stateNode;s.props=n,s.state=e.memoizedState,s.refs={},Yi(e);var o=t.contextType;typeof o=="object"&&o!==null?s.context=Be(o):(o=Ne(t)?qt:ge.current,s.context=xn(e,o)),s.state=e.memoizedState,o=t.getDerivedStateFromProps,typeof o=="function"&&(ri(e,t,o,n),s.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(t=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),t!==s.state&&zs.enqueueReplaceState(s,s.state,null),ys(e,n,s,r),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4194308)}function Nn(e,t){try{var n="",r=t;do n+=Gd(r),r=r.return;while(r);var s=n}catch(o){s=`
Error generating stack: `+o.message+`
`+o.stack}return{value:e,source:t,stack:s,digest:null}}function wo(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function oi(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var k0=typeof WeakMap=="function"?WeakMap:Map;function Sc(e,t,n){n=st(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Ss||(Ss=!0,mi=r),oi(e,t)},n}function _c(e,t,n){n=st(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var s=t.value;n.payload=function(){return r(s)},n.callback=function(){oi(e,t)}}var o=e.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){oi(e,t),typeof r!="function"&&(St===null?St=new Set([this]):St.add(this));var i=t.stack;this.componentDidCatch(t.value,{componentStack:i!==null?i:""})}),n}function cl(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new k0;var s=new Set;r.set(t,s)}else s=r.get(t),s===void 0&&(s=new Set,r.set(t,s));s.has(n)||(s.add(n),e=L0.bind(null,e,t,n),t.then(e,e))}function dl(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function fl(e,t,n,r,s){return e.mode&1?(e.flags|=65536,e.lanes=s,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=st(-1,1),t.tag=2,bt(n,t,1))),n.lanes|=1),e)}var x0=ut.ReactCurrentOwner,Se=!1;function ve(e,t,n,r){t.child=e===null?Ju(t,null,n,r):Sn(t,e.child,n,r)}function pl(e,t,n,r,s){n=n.render;var o=t.ref;return yn(t,s),r=ea(e,t,n,r,o,s),n=ta(),e!==null&&!Se?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,lt(e,t,s)):(Q&&n&&$i(t),t.flags|=1,ve(e,t,r,s),t.child)}function hl(e,t,n,r,s){if(e===null){var o=n.type;return typeof o=="function"&&!da(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=o,Nc(e,t,o,r,s)):(e=ts(n.type,null,r,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,!(e.lanes&s)){var i=o.memoizedProps;if(n=n.compare,n=n!==null?n:ir,n(i,r)&&e.ref===t.ref)return lt(e,t,s)}return t.flags|=1,e=Nt(o,r),e.ref=t.ref,e.return=t,t.child=e}function Nc(e,t,n,r,s){if(e!==null){var o=e.memoizedProps;if(ir(o,r)&&e.ref===t.ref)if(Se=!1,t.pendingProps=r=o,(e.lanes&s)!==0)e.flags&131072&&(Se=!0);else return t.lanes=e.lanes,lt(e,t,s)}return ii(e,t,n,r,s)}function Cc(e,t,n){var r=t.pendingProps,s=r.children,o=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},q(fn,je),je|=n;else{if(!(n&1073741824))return e=o!==null?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,q(fn,je),je|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:n,q(fn,je),je|=r}else o!==null?(r=o.baseLanes|n,t.memoizedState=null):r=n,q(fn,je),je|=r;return ve(e,t,s,n),t.child}function Pc(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function ii(e,t,n,r,s){var o=Ne(n)?qt:ge.current;return o=xn(t,o),yn(t,s),n=ea(e,t,n,r,o,s),r=ta(),e!==null&&!Se?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~s,lt(e,t,s)):(Q&&r&&$i(t),t.flags|=1,ve(e,t,n,s),t.child)}function ml(e,t,n,r,s){if(Ne(n)){var o=!0;ps(t)}else o=!1;if(yn(t,s),t.stateNode===null)Zr(e,t),bc(t,n,r),si(t,n,r,s),r=!0;else if(e===null){var i=t.stateNode,l=t.memoizedProps;i.props=l;var u=i.context,c=n.contextType;typeof c=="object"&&c!==null?c=Be(c):(c=Ne(n)?qt:ge.current,c=xn(t,c));var m=n.getDerivedStateFromProps,h=typeof m=="function"||typeof i.getSnapshotBeforeUpdate=="function";h||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(l!==r||u!==c)&&ul(t,i,r,c),ft=!1;var g=t.memoizedState;i.state=g,ys(t,r,i,s),u=t.memoizedState,l!==r||g!==u||_e.current||ft?(typeof m=="function"&&(ri(t,n,m,r),u=t.memoizedState),(l=ft||ll(t,n,l,r,g,u,c))?(h||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=u),i.props=r,i.state=u,i.context=c,r=l):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{i=t.stateNode,tc(e,t),l=t.memoizedProps,c=t.type===t.elementType?l:$e(t.type,l),i.props=c,h=t.pendingProps,g=i.context,u=n.contextType,typeof u=="object"&&u!==null?u=Be(u):(u=Ne(n)?qt:ge.current,u=xn(t,u));var y=n.getDerivedStateFromProps;(m=typeof y=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(l!==h||g!==u)&&ul(t,i,r,u),ft=!1,g=t.memoizedState,i.state=g,ys(t,r,i,s);var v=t.memoizedState;l!==h||g!==v||_e.current||ft?(typeof y=="function"&&(ri(t,n,y,r),v=t.memoizedState),(c=ft||ll(t,n,c,r,g,v,u)||!1)?(m||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(r,v,u),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(r,v,u)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||l===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=v),i.props=r,i.state=v,i.context=u,r=c):(typeof i.componentDidUpdate!="function"||l===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),r=!1)}return ai(e,t,n,r,o,s)}function ai(e,t,n,r,s,o){Pc(e,t);var i=(t.flags&128)!==0;if(!r&&!i)return s&&el(t,n,!1),lt(e,t,o);r=t.stateNode,x0.current=t;var l=i&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&i?(t.child=Sn(t,e.child,null,o),t.child=Sn(t,null,l,o)):ve(e,t,l,o),t.memoizedState=r.state,s&&el(t,n,!0),t.child}function jc(e){var t=e.stateNode;t.pendingContext?Ja(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Ja(e,t.context,!1),Ki(e,t.containerInfo)}function gl(e,t,n,r,s){return bn(),qi(s),t.flags|=256,ve(e,t,n,r),t.child}var li={dehydrated:null,treeContext:null,retryLane:0};function ui(e){return{baseLanes:e,cachePool:null,transitions:null}}function Ic(e,t,n){var r=t.pendingProps,s=Y.current,o=!1,i=(t.flags&128)!==0,l;if((l=i)||(l=e!==null&&e.memoizedState===null?!1:(s&2)!==0),l?(o=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(s|=1),q(Y,s&1),e===null)return ti(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(i=r.children,e=r.fallback,o?(r=t.mode,o=t.child,i={mode:"hidden",children:i},!(r&1)&&o!==null?(o.childLanes=0,o.pendingProps=i):o=Os(i,r,0,null),e=$t(e,r,n,null),o.return=t,e.return=t,o.sibling=e,t.child=o,t.child.memoizedState=ui(n),t.memoizedState=li,e):sa(t,i));if(s=e.memoizedState,s!==null&&(l=s.dehydrated,l!==null))return b0(e,t,i,r,l,s,n);if(o){o=r.fallback,i=t.mode,s=e.child,l=s.sibling;var u={mode:"hidden",children:r.children};return!(i&1)&&t.child!==s?(r=t.child,r.childLanes=0,r.pendingProps=u,t.deletions=null):(r=Nt(s,u),r.subtreeFlags=s.subtreeFlags&14680064),l!==null?o=Nt(l,o):(o=$t(o,i,n,null),o.flags|=2),o.return=t,r.return=t,r.sibling=o,t.child=r,r=o,o=t.child,i=e.child.memoizedState,i=i===null?ui(n):{baseLanes:i.baseLanes|n,cachePool:null,transitions:i.transitions},o.memoizedState=i,o.childLanes=e.childLanes&~n,t.memoizedState=li,r}return o=e.child,e=o.sibling,r=Nt(o,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function sa(e,t){return t=Os({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Or(e,t,n,r){return r!==null&&qi(r),Sn(t,e.child,null,n),e=sa(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function b0(e,t,n,r,s,o,i){if(n)return t.flags&256?(t.flags&=-257,r=wo(Error(_(422))),Or(e,t,i,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(o=r.fallback,s=t.mode,r=Os({mode:"visible",children:r.children},s,0,null),o=$t(o,s,i,null),o.flags|=2,r.return=t,o.return=t,r.sibling=o,t.child=r,t.mode&1&&Sn(t,e.child,null,i),t.child.memoizedState=ui(i),t.memoizedState=li,o);if(!(t.mode&1))return Or(e,t,i,null);if(s.data==="$!"){if(r=s.nextSibling&&s.nextSibling.dataset,r)var l=r.dgst;return r=l,o=Error(_(419)),r=wo(o,r,void 0),Or(e,t,i,r)}if(l=(i&e.childLanes)!==0,Se||l){if(r=ue,r!==null){switch(i&-i){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(r.suspendedLanes|i)?0:s,s!==0&&s!==o.retryLane&&(o.retryLane=s,at(e,s),He(r,e,s,-1))}return ca(),r=wo(Error(_(421))),Or(e,t,i,r)}return s.data==="$?"?(t.flags|=128,t.child=e.child,t=D0.bind(null,e),s._reactRetry=t,null):(e=o.treeContext,Ie=xt(s.nextSibling),Ee=t,Q=!0,qe=null,e!==null&&(Le[De++]=nt,Le[De++]=rt,Le[De++]=Vt,nt=e.id,rt=e.overflow,Vt=t),t=sa(t,r.children),t.flags|=4096,t)}function vl(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),ni(e.return,t,n)}function ko(e,t,n,r,s){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:s}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=s)}function Ec(e,t,n){var r=t.pendingProps,s=r.revealOrder,o=r.tail;if(ve(e,t,r.children,n),r=Y.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&vl(e,n,t);else if(e.tag===19)vl(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(q(Y,r),!(t.mode&1))t.memoizedState=null;else switch(s){case"forwards":for(n=t.child,s=null;n!==null;)e=n.alternate,e!==null&&ws(e)===null&&(s=n),n=n.sibling;n=s,n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null),ko(t,!1,s,n,o);break;case"backwards":for(n=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&ws(e)===null){t.child=s;break}e=s.sibling,s.sibling=n,n=s,s=e}ko(t,!0,n,null,o);break;case"together":ko(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Zr(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function lt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Gt|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(_(153));if(t.child!==null){for(e=t.child,n=Nt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Nt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function S0(e,t,n){switch(t.tag){case 3:jc(t),bn();break;case 5:nc(t);break;case 1:Ne(t.type)&&ps(t);break;case 4:Ki(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,s=t.memoizedProps.value;q(gs,r._currentValue),r._currentValue=s;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(q(Y,Y.current&1),t.flags|=128,null):n&t.child.childLanes?Ic(e,t,n):(q(Y,Y.current&1),e=lt(e,t,n),e!==null?e.sibling:null);q(Y,Y.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return Ec(e,t,n);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),q(Y,Y.current),r)break;return null;case 22:case 23:return t.lanes=0,Cc(e,t,n)}return lt(e,t,n)}var Ac,ci,Tc,Rc;Ac=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};ci=function(){};Tc=function(e,t,n,r){var s=e.memoizedProps;if(s!==r){e=t.stateNode,Ot(Je.current);var o=null;switch(n){case"input":s=To(e,s),r=To(e,r),o=[];break;case"select":s=X({},s,{value:void 0}),r=X({},r,{value:void 0}),o=[];break;case"textarea":s=Do(e,s),r=Do(e,r),o=[];break;default:typeof s.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=ds)}zo(n,r);var i;n=null;for(c in s)if(!r.hasOwnProperty(c)&&s.hasOwnProperty(c)&&s[c]!=null)if(c==="style"){var l=s[c];for(i in l)l.hasOwnProperty(i)&&(n||(n={}),n[i]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Jn.hasOwnProperty(c)?o||(o=[]):(o=o||[]).push(c,null));for(c in r){var u=r[c];if(l=s!=null?s[c]:void 0,r.hasOwnProperty(c)&&u!==l&&(u!=null||l!=null))if(c==="style")if(l){for(i in l)!l.hasOwnProperty(i)||u&&u.hasOwnProperty(i)||(n||(n={}),n[i]="");for(i in u)u.hasOwnProperty(i)&&l[i]!==u[i]&&(n||(n={}),n[i]=u[i])}else n||(o||(o=[]),o.push(c,n)),n=u;else c==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,l=l?l.__html:void 0,u!=null&&l!==u&&(o=o||[]).push(c,u)):c==="children"?typeof u!="string"&&typeof u!="number"||(o=o||[]).push(c,""+u):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Jn.hasOwnProperty(c)?(u!=null&&c==="onScroll"&&V("scroll",e),o||l===u||(o=[])):(o=o||[]).push(c,u))}n&&(o=o||[]).push("style",n);var c=o;(t.updateQueue=c)&&(t.flags|=4)}};Rc=function(e,t,n,r){n!==r&&(t.flags|=4)};function zn(e,t){if(!Q)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function he(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var s=e.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags&14680064,r|=s.flags&14680064,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags,r|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function _0(e,t,n){var r=t.pendingProps;switch(Ui(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return he(t),null;case 1:return Ne(t.type)&&fs(),he(t),null;case 3:return r=t.stateNode,_n(),H(_e),H(ge),Zi(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Br(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,qe!==null&&(yi(qe),qe=null))),ci(e,t),he(t),null;case 5:Xi(t);var s=Ot(dr.current);if(n=t.type,e!==null&&t.stateNode!=null)Tc(e,t,n,r,s),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(_(166));return he(t),null}if(e=Ot(Je.current),Br(t)){r=t.stateNode,n=t.type;var o=t.memoizedProps;switch(r[Xe]=t,r[ur]=o,e=(t.mode&1)!==0,n){case"dialog":V("cancel",r),V("close",r);break;case"iframe":case"object":case"embed":V("load",r);break;case"video":case"audio":for(s=0;s<Un.length;s++)V(Un[s],r);break;case"source":V("error",r);break;case"img":case"image":case"link":V("error",r),V("load",r);break;case"details":V("toggle",r);break;case"input":Ca(r,o),V("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},V("invalid",r);break;case"textarea":ja(r,o),V("invalid",r)}zo(n,o),s=null;for(var i in o)if(o.hasOwnProperty(i)){var l=o[i];i==="children"?typeof l=="string"?r.textContent!==l&&(o.suppressHydrationWarning!==!0&&zr(r.textContent,l,e),s=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(o.suppressHydrationWarning!==!0&&zr(r.textContent,l,e),s=["children",""+l]):Jn.hasOwnProperty(i)&&l!=null&&i==="onScroll"&&V("scroll",r)}switch(n){case"input":Ir(r),Pa(r,o,!0);break;case"textarea":Ir(r),Ia(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=ds)}r=s,t.updateQueue=r,r!==null&&(t.flags|=4)}else{i=s.nodeType===9?s:s.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=au(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=i.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=i.createElement(n,{is:r.is}):(e=i.createElement(n),n==="select"&&(i=e,r.multiple?i.multiple=!0:r.size&&(i.size=r.size))):e=i.createElementNS(e,n),e[Xe]=t,e[ur]=r,Ac(e,t,!1,!1),t.stateNode=e;e:{switch(i=Bo(n,r),n){case"dialog":V("cancel",e),V("close",e),s=r;break;case"iframe":case"object":case"embed":V("load",e),s=r;break;case"video":case"audio":for(s=0;s<Un.length;s++)V(Un[s],e);s=r;break;case"source":V("error",e),s=r;break;case"img":case"image":case"link":V("error",e),V("load",e),s=r;break;case"details":V("toggle",e),s=r;break;case"input":Ca(e,r),s=To(e,r),V("invalid",e);break;case"option":s=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},s=X({},r,{value:void 0}),V("invalid",e);break;case"textarea":ja(e,r),s=Do(e,r),V("invalid",e);break;default:s=r}zo(n,s),l=s;for(o in l)if(l.hasOwnProperty(o)){var u=l[o];o==="style"?cu(e,u):o==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&lu(e,u)):o==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&er(e,u):typeof u=="number"&&er(e,""+u):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(Jn.hasOwnProperty(o)?u!=null&&o==="onScroll"&&V("scroll",e):u!=null&&ji(e,o,u,i))}switch(n){case"input":Ir(e),Pa(e,r,!1);break;case"textarea":Ir(e),Ia(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Pt(r.value));break;case"select":e.multiple=!!r.multiple,o=r.value,o!=null?hn(e,!!r.multiple,o,!1):r.defaultValue!=null&&hn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof s.onClick=="function"&&(e.onclick=ds)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return he(t),null;case 6:if(e&&t.stateNode!=null)Rc(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(_(166));if(n=Ot(dr.current),Ot(Je.current),Br(t)){if(r=t.stateNode,n=t.memoizedProps,r[Xe]=t,(o=r.nodeValue!==n)&&(e=Ee,e!==null))switch(e.tag){case 3:zr(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&zr(r.nodeValue,n,(e.mode&1)!==0)}o&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Xe]=t,t.stateNode=r}return he(t),null;case 13:if(H(Y),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Q&&Ie!==null&&t.mode&1&&!(t.flags&128))Xu(),bn(),t.flags|=98560,o=!1;else if(o=Br(t),r!==null&&r.dehydrated!==null){if(e===null){if(!o)throw Error(_(318));if(o=t.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(_(317));o[Xe]=t}else bn(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;he(t),o=!1}else qe!==null&&(yi(qe),qe=null),o=!0;if(!o)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||Y.current&1?oe===0&&(oe=3):ca())),t.updateQueue!==null&&(t.flags|=4),he(t),null);case 4:return _n(),ci(e,t),e===null&&ar(t.stateNode.containerInfo),he(t),null;case 10:return Gi(t.type._context),he(t),null;case 17:return Ne(t.type)&&fs(),he(t),null;case 19:if(H(Y),o=t.memoizedState,o===null)return he(t),null;if(r=(t.flags&128)!==0,i=o.rendering,i===null)if(r)zn(o,!1);else{if(oe!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(i=ws(e),i!==null){for(t.flags|=128,zn(o,!1),r=i.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)o=n,e=r,o.flags&=14680066,i=o.alternate,i===null?(o.childLanes=0,o.lanes=e,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=i.childLanes,o.lanes=i.lanes,o.child=i.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=i.memoizedProps,o.memoizedState=i.memoizedState,o.updateQueue=i.updateQueue,o.type=i.type,e=i.dependencies,o.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return q(Y,Y.current&1|2),t.child}e=e.sibling}o.tail!==null&&te()>Cn&&(t.flags|=128,r=!0,zn(o,!1),t.lanes=4194304)}else{if(!r)if(e=ws(i),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),zn(o,!0),o.tail===null&&o.tailMode==="hidden"&&!i.alternate&&!Q)return he(t),null}else 2*te()-o.renderingStartTime>Cn&&n!==1073741824&&(t.flags|=128,r=!0,zn(o,!1),t.lanes=4194304);o.isBackwards?(i.sibling=t.child,t.child=i):(n=o.last,n!==null?n.sibling=i:t.child=i,o.last=i)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=te(),t.sibling=null,n=Y.current,q(Y,r?n&1|2:n&1),t):(he(t),null);case 22:case 23:return ua(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?je&1073741824&&(he(t),t.subtreeFlags&6&&(t.flags|=8192)):he(t),null;case 24:return null;case 25:return null}throw Error(_(156,t.tag))}function N0(e,t){switch(Ui(t),t.tag){case 1:return Ne(t.type)&&fs(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return _n(),H(_e),H(ge),Zi(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Xi(t),null;case 13:if(H(Y),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(_(340));bn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return H(Y),null;case 4:return _n(),null;case 10:return Gi(t.type._context),null;case 22:case 23:return ua(),null;case 24:return null;default:return null}}var Wr=!1,me=!1,C0=typeof WeakSet=="function"?WeakSet:Set,j=null;function dn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){J(e,t,r)}else n.current=null}function di(e,t,n){try{n()}catch(r){J(e,t,r)}}var yl=!1;function P0(e,t){if(Qo=ls,e=Bu(),Wi(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var s=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var i=0,l=-1,u=-1,c=0,m=0,h=e,g=null;t:for(;;){for(var y;h!==n||s!==0&&h.nodeType!==3||(l=i+s),h!==o||r!==0&&h.nodeType!==3||(u=i+r),h.nodeType===3&&(i+=h.nodeValue.length),(y=h.firstChild)!==null;)g=h,h=y;for(;;){if(h===e)break t;if(g===n&&++c===s&&(l=i),g===o&&++m===r&&(u=i),(y=h.nextSibling)!==null)break;h=g,g=h.parentNode}h=y}n=l===-1||u===-1?null:{start:l,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(Yo={focusedElem:e,selectionRange:n},ls=!1,j=t;j!==null;)if(t=j,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,j=e;else for(;j!==null;){t=j;try{var v=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(v!==null){var w=v.memoizedProps,k=v.memoizedState,f=t.stateNode,d=f.getSnapshotBeforeUpdate(t.elementType===t.type?w:$e(t.type,w),k);f.__reactInternalSnapshotBeforeUpdate=d}break;case 3:var p=t.stateNode.containerInfo;p.nodeType===1?p.textContent="":p.nodeType===9&&p.documentElement&&p.removeChild(p.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(_(163))}}catch(x){J(t,t.return,x)}if(e=t.sibling,e!==null){e.return=t.return,j=e;break}j=t.return}return v=yl,yl=!1,v}function Kn(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var s=r=r.next;do{if((s.tag&e)===e){var o=s.destroy;s.destroy=void 0,o!==void 0&&di(t,n,o)}s=s.next}while(s!==r)}}function Bs(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function fi(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Lc(e){var t=e.alternate;t!==null&&(e.alternate=null,Lc(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Xe],delete t[ur],delete t[Zo],delete t[u0],delete t[c0])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Dc(e){return e.tag===5||e.tag===3||e.tag===4}function wl(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Dc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function pi(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=ds));else if(r!==4&&(e=e.child,e!==null))for(pi(e,t,n),e=e.sibling;e!==null;)pi(e,t,n),e=e.sibling}function hi(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(hi(e,t,n),e=e.sibling;e!==null;)hi(e,t,n),e=e.sibling}var ce=null,Ue=!1;function ct(e,t,n){for(n=n.child;n!==null;)Mc(e,t,n),n=n.sibling}function Mc(e,t,n){if(Ze&&typeof Ze.onCommitFiberUnmount=="function")try{Ze.onCommitFiberUnmount(Es,n)}catch{}switch(n.tag){case 5:me||dn(n,t);case 6:var r=ce,s=Ue;ce=null,ct(e,t,n),ce=r,Ue=s,ce!==null&&(Ue?(e=ce,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):ce.removeChild(n.stateNode));break;case 18:ce!==null&&(Ue?(e=ce,n=n.stateNode,e.nodeType===8?po(e.parentNode,n):e.nodeType===1&&po(e,n),sr(e)):po(ce,n.stateNode));break;case 4:r=ce,s=Ue,ce=n.stateNode.containerInfo,Ue=!0,ct(e,t,n),ce=r,Ue=s;break;case 0:case 11:case 14:case 15:if(!me&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){s=r=r.next;do{var o=s,i=o.destroy;o=o.tag,i!==void 0&&(o&2||o&4)&&di(n,t,i),s=s.next}while(s!==r)}ct(e,t,n);break;case 1:if(!me&&(dn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){J(n,t,l)}ct(e,t,n);break;case 21:ct(e,t,n);break;case 22:n.mode&1?(me=(r=me)||n.memoizedState!==null,ct(e,t,n),me=r):ct(e,t,n);break;default:ct(e,t,n)}}function kl(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new C0),t.forEach(function(r){var s=M0.bind(null,e,r);n.has(r)||(n.add(r),r.then(s,s))})}}function Oe(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var s=n[r];try{var o=e,i=t,l=i;e:for(;l!==null;){switch(l.tag){case 5:ce=l.stateNode,Ue=!1;break e;case 3:ce=l.stateNode.containerInfo,Ue=!0;break e;case 4:ce=l.stateNode.containerInfo,Ue=!0;break e}l=l.return}if(ce===null)throw Error(_(160));Mc(o,i,s),ce=null,Ue=!1;var u=s.alternate;u!==null&&(u.return=null),s.return=null}catch(c){J(s,t,c)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)zc(t,e),t=t.sibling}function zc(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Oe(t,e),Ye(e),r&4){try{Kn(3,e,e.return),Bs(3,e)}catch(w){J(e,e.return,w)}try{Kn(5,e,e.return)}catch(w){J(e,e.return,w)}}break;case 1:Oe(t,e),Ye(e),r&512&&n!==null&&dn(n,n.return);break;case 5:if(Oe(t,e),Ye(e),r&512&&n!==null&&dn(n,n.return),e.flags&32){var s=e.stateNode;try{er(s,"")}catch(w){J(e,e.return,w)}}if(r&4&&(s=e.stateNode,s!=null)){var o=e.memoizedProps,i=n!==null?n.memoizedProps:o,l=e.type,u=e.updateQueue;if(e.updateQueue=null,u!==null)try{l==="input"&&o.type==="radio"&&o.name!=null&&ou(s,o),Bo(l,i);var c=Bo(l,o);for(i=0;i<u.length;i+=2){var m=u[i],h=u[i+1];m==="style"?cu(s,h):m==="dangerouslySetInnerHTML"?lu(s,h):m==="children"?er(s,h):ji(s,m,h,c)}switch(l){case"input":Ro(s,o);break;case"textarea":iu(s,o);break;case"select":var g=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!o.multiple;var y=o.value;y!=null?hn(s,!!o.multiple,y,!1):g!==!!o.multiple&&(o.defaultValue!=null?hn(s,!!o.multiple,o.defaultValue,!0):hn(s,!!o.multiple,o.multiple?[]:"",!1))}s[ur]=o}catch(w){J(e,e.return,w)}}break;case 6:if(Oe(t,e),Ye(e),r&4){if(e.stateNode===null)throw Error(_(162));s=e.stateNode,o=e.memoizedProps;try{s.nodeValue=o}catch(w){J(e,e.return,w)}}break;case 3:if(Oe(t,e),Ye(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{sr(t.containerInfo)}catch(w){J(e,e.return,w)}break;case 4:Oe(t,e),Ye(e);break;case 13:Oe(t,e),Ye(e),s=e.child,s.flags&8192&&(o=s.memoizedState!==null,s.stateNode.isHidden=o,!o||s.alternate!==null&&s.alternate.memoizedState!==null||(aa=te())),r&4&&kl(e);break;case 22:if(m=n!==null&&n.memoizedState!==null,e.mode&1?(me=(c=me)||m,Oe(t,e),me=c):Oe(t,e),Ye(e),r&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!m&&e.mode&1)for(j=e,m=e.child;m!==null;){for(h=j=m;j!==null;){switch(g=j,y=g.child,g.tag){case 0:case 11:case 14:case 15:Kn(4,g,g.return);break;case 1:dn(g,g.return);var v=g.stateNode;if(typeof v.componentWillUnmount=="function"){r=g,n=g.return;try{t=r,v.props=t.memoizedProps,v.state=t.memoizedState,v.componentWillUnmount()}catch(w){J(r,n,w)}}break;case 5:dn(g,g.return);break;case 22:if(g.memoizedState!==null){bl(h);continue}}y!==null?(y.return=g,j=y):bl(h)}m=m.sibling}e:for(m=null,h=e;;){if(h.tag===5){if(m===null){m=h;try{s=h.stateNode,c?(o=s.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(l=h.stateNode,u=h.memoizedProps.style,i=u!=null&&u.hasOwnProperty("display")?u.display:null,l.style.display=uu("display",i))}catch(w){J(e,e.return,w)}}}else if(h.tag===6){if(m===null)try{h.stateNode.nodeValue=c?"":h.memoizedProps}catch(w){J(e,e.return,w)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===e)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===e)break e;for(;h.sibling===null;){if(h.return===null||h.return===e)break e;m===h&&(m=null),h=h.return}m===h&&(m=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:Oe(t,e),Ye(e),r&4&&kl(e);break;case 21:break;default:Oe(t,e),Ye(e)}}function Ye(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Dc(n)){var r=n;break e}n=n.return}throw Error(_(160))}switch(r.tag){case 5:var s=r.stateNode;r.flags&32&&(er(s,""),r.flags&=-33);var o=wl(e);hi(e,o,s);break;case 3:case 4:var i=r.stateNode.containerInfo,l=wl(e);pi(e,l,i);break;default:throw Error(_(161))}}catch(u){J(e,e.return,u)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function j0(e,t,n){j=e,Bc(e)}function Bc(e,t,n){for(var r=(e.mode&1)!==0;j!==null;){var s=j,o=s.child;if(s.tag===22&&r){var i=s.memoizedState!==null||Wr;if(!i){var l=s.alternate,u=l!==null&&l.memoizedState!==null||me;l=Wr;var c=me;if(Wr=i,(me=u)&&!c)for(j=s;j!==null;)i=j,u=i.child,i.tag===22&&i.memoizedState!==null?Sl(s):u!==null?(u.return=i,j=u):Sl(s);for(;o!==null;)j=o,Bc(o),o=o.sibling;j=s,Wr=l,me=c}xl(e)}else s.subtreeFlags&8772&&o!==null?(o.return=s,j=o):xl(e)}}function xl(e){for(;j!==null;){var t=j;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:me||Bs(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!me)if(n===null)r.componentDidMount();else{var s=t.elementType===t.type?n.memoizedProps:$e(t.type,n.memoizedProps);r.componentDidUpdate(s,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=t.updateQueue;o!==null&&ol(t,o,r);break;case 3:var i=t.updateQueue;if(i!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}ol(t,i,n)}break;case 5:var l=t.stateNode;if(n===null&&t.flags&4){n=l;var u=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var c=t.alternate;if(c!==null){var m=c.memoizedState;if(m!==null){var h=m.dehydrated;h!==null&&sr(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(_(163))}me||t.flags&512&&fi(t)}catch(g){J(t,t.return,g)}}if(t===e){j=null;break}if(n=t.sibling,n!==null){n.return=t.return,j=n;break}j=t.return}}function bl(e){for(;j!==null;){var t=j;if(t===e){j=null;break}var n=t.sibling;if(n!==null){n.return=t.return,j=n;break}j=t.return}}function Sl(e){for(;j!==null;){var t=j;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Bs(4,t)}catch(u){J(t,n,u)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var s=t.return;try{r.componentDidMount()}catch(u){J(t,s,u)}}var o=t.return;try{fi(t)}catch(u){J(t,o,u)}break;case 5:var i=t.return;try{fi(t)}catch(u){J(t,i,u)}}}catch(u){J(t,t.return,u)}if(t===e){j=null;break}var l=t.sibling;if(l!==null){l.return=t.return,j=l;break}j=t.return}}var I0=Math.ceil,bs=ut.ReactCurrentDispatcher,oa=ut.ReactCurrentOwner,ze=ut.ReactCurrentBatchConfig,F=0,ue=null,ne=null,de=0,je=0,fn=Et(0),oe=0,mr=null,Gt=0,Fs=0,ia=0,Xn=null,be=null,aa=0,Cn=1/0,et=null,Ss=!1,mi=null,St=null,$r=!1,gt=null,_s=0,Zn=0,gi=null,Jr=-1,es=0;function we(){return F&6?te():Jr!==-1?Jr:Jr=te()}function _t(e){return e.mode&1?F&2&&de!==0?de&-de:f0.transition!==null?(es===0&&(es=bu()),es):(e=W,e!==0||(e=window.event,e=e===void 0?16:Iu(e.type)),e):1}function He(e,t,n,r){if(50<Zn)throw Zn=0,gi=null,Error(_(185));wr(e,n,r),(!(F&2)||e!==ue)&&(e===ue&&(!(F&2)&&(Fs|=n),oe===4&&ht(e,de)),Ce(e,r),n===1&&F===0&&!(t.mode&1)&&(Cn=te()+500,Ds&&At()))}function Ce(e,t){var n=e.callbackNode;f1(e,t);var r=as(e,e===ue?de:0);if(r===0)n!==null&&Ta(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&Ta(n),t===1)e.tag===0?d0(_l.bind(null,e)):Qu(_l.bind(null,e)),a0(function(){!(F&6)&&At()}),n=null;else{switch(Su(r)){case 1:n=Ri;break;case 4:n=ku;break;case 16:n=is;break;case 536870912:n=xu;break;default:n=is}n=Hc(n,Fc.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Fc(e,t){if(Jr=-1,es=0,F&6)throw Error(_(327));var n=e.callbackNode;if(wn()&&e.callbackNode!==n)return null;var r=as(e,e===ue?de:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=Ns(e,r);else{t=r;var s=F;F|=2;var o=Wc();(ue!==e||de!==t)&&(et=null,Cn=te()+500,Wt(e,t));do try{T0();break}catch(l){Oc(e,l)}while(!0);Hi(),bs.current=o,F=s,ne!==null?t=0:(ue=null,de=0,t=oe)}if(t!==0){if(t===2&&(s=Uo(e),s!==0&&(r=s,t=vi(e,s))),t===1)throw n=mr,Wt(e,0),ht(e,r),Ce(e,te()),n;if(t===6)ht(e,r);else{if(s=e.current.alternate,!(r&30)&&!E0(s)&&(t=Ns(e,r),t===2&&(o=Uo(e),o!==0&&(r=o,t=vi(e,o))),t===1))throw n=mr,Wt(e,0),ht(e,r),Ce(e,te()),n;switch(e.finishedWork=s,e.finishedLanes=r,t){case 0:case 1:throw Error(_(345));case 2:zt(e,be,et);break;case 3:if(ht(e,r),(r&130023424)===r&&(t=aa+500-te(),10<t)){if(as(e,0)!==0)break;if(s=e.suspendedLanes,(s&r)!==r){we(),e.pingedLanes|=e.suspendedLanes&s;break}e.timeoutHandle=Xo(zt.bind(null,e,be,et),t);break}zt(e,be,et);break;case 4:if(ht(e,r),(r&4194240)===r)break;for(t=e.eventTimes,s=-1;0<r;){var i=31-Ve(r);o=1<<i,i=t[i],i>s&&(s=i),r&=~o}if(r=s,r=te()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*I0(r/1960))-r,10<r){e.timeoutHandle=Xo(zt.bind(null,e,be,et),r);break}zt(e,be,et);break;case 5:zt(e,be,et);break;default:throw Error(_(329))}}}return Ce(e,te()),e.callbackNode===n?Fc.bind(null,e):null}function vi(e,t){var n=Xn;return e.current.memoizedState.isDehydrated&&(Wt(e,t).flags|=256),e=Ns(e,t),e!==2&&(t=be,be=n,t!==null&&yi(t)),e}function yi(e){be===null?be=e:be.push.apply(be,e)}function E0(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var s=n[r],o=s.getSnapshot;s=s.value;try{if(!Ge(o(),s))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function ht(e,t){for(t&=~ia,t&=~Fs,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Ve(t),r=1<<n;e[n]=-1,t&=~r}}function _l(e){if(F&6)throw Error(_(327));wn();var t=as(e,0);if(!(t&1))return Ce(e,te()),null;var n=Ns(e,t);if(e.tag!==0&&n===2){var r=Uo(e);r!==0&&(t=r,n=vi(e,r))}if(n===1)throw n=mr,Wt(e,0),ht(e,t),Ce(e,te()),n;if(n===6)throw Error(_(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,zt(e,be,et),Ce(e,te()),null}function la(e,t){var n=F;F|=1;try{return e(t)}finally{F=n,F===0&&(Cn=te()+500,Ds&&At())}}function Qt(e){gt!==null&&gt.tag===0&&!(F&6)&&wn();var t=F;F|=1;var n=ze.transition,r=W;try{if(ze.transition=null,W=1,e)return e()}finally{W=r,ze.transition=n,F=t,!(F&6)&&At()}}function ua(){je=fn.current,H(fn)}function Wt(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,i0(n)),ne!==null)for(n=ne.return;n!==null;){var r=n;switch(Ui(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&fs();break;case 3:_n(),H(_e),H(ge),Zi();break;case 5:Xi(r);break;case 4:_n();break;case 13:H(Y);break;case 19:H(Y);break;case 10:Gi(r.type._context);break;case 22:case 23:ua()}n=n.return}if(ue=e,ne=e=Nt(e.current,null),de=je=t,oe=0,mr=null,ia=Fs=Gt=0,be=Xn=null,Ft!==null){for(t=0;t<Ft.length;t++)if(n=Ft[t],r=n.interleaved,r!==null){n.interleaved=null;var s=r.next,o=n.pending;if(o!==null){var i=o.next;o.next=s,r.next=i}n.pending=r}Ft=null}return e}function Oc(e,t){do{var n=ne;try{if(Hi(),Kr.current=xs,ks){for(var r=K.memoizedState;r!==null;){var s=r.queue;s!==null&&(s.pending=null),r=r.next}ks=!1}if(Ht=0,le=se=K=null,Yn=!1,fr=0,oa.current=null,n===null||n.return===null){oe=1,mr=t,ne=null;break}e:{var o=e,i=n.return,l=n,u=t;if(t=de,l.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var c=u,m=l,h=m.tag;if(!(m.mode&1)&&(h===0||h===11||h===15)){var g=m.alternate;g?(m.updateQueue=g.updateQueue,m.memoizedState=g.memoizedState,m.lanes=g.lanes):(m.updateQueue=null,m.memoizedState=null)}var y=dl(i);if(y!==null){y.flags&=-257,fl(y,i,l,o,t),y.mode&1&&cl(o,c,t),t=y,u=c;var v=t.updateQueue;if(v===null){var w=new Set;w.add(u),t.updateQueue=w}else v.add(u);break e}else{if(!(t&1)){cl(o,c,t),ca();break e}u=Error(_(426))}}else if(Q&&l.mode&1){var k=dl(i);if(k!==null){!(k.flags&65536)&&(k.flags|=256),fl(k,i,l,o,t),qi(Nn(u,l));break e}}o=u=Nn(u,l),oe!==4&&(oe=2),Xn===null?Xn=[o]:Xn.push(o),o=i;do{switch(o.tag){case 3:o.flags|=65536,t&=-t,o.lanes|=t;var f=Sc(o,u,t);sl(o,f);break e;case 1:l=u;var d=o.type,p=o.stateNode;if(!(o.flags&128)&&(typeof d.getDerivedStateFromError=="function"||p!==null&&typeof p.componentDidCatch=="function"&&(St===null||!St.has(p)))){o.flags|=65536,t&=-t,o.lanes|=t;var x=_c(o,l,t);sl(o,x);break e}}o=o.return}while(o!==null)}Uc(n)}catch(S){t=S,ne===n&&n!==null&&(ne=n=n.return);continue}break}while(!0)}function Wc(){var e=bs.current;return bs.current=xs,e===null?xs:e}function ca(){(oe===0||oe===3||oe===2)&&(oe=4),ue===null||!(Gt&268435455)&&!(Fs&268435455)||ht(ue,de)}function Ns(e,t){var n=F;F|=2;var r=Wc();(ue!==e||de!==t)&&(et=null,Wt(e,t));do try{A0();break}catch(s){Oc(e,s)}while(!0);if(Hi(),F=n,bs.current=r,ne!==null)throw Error(_(261));return ue=null,de=0,oe}function A0(){for(;ne!==null;)$c(ne)}function T0(){for(;ne!==null&&!r1();)$c(ne)}function $c(e){var t=Vc(e.alternate,e,je);e.memoizedProps=e.pendingProps,t===null?Uc(e):ne=t,oa.current=null}function Uc(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=N0(n,t),n!==null){n.flags&=32767,ne=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{oe=6,ne=null;return}}else if(n=_0(n,t,je),n!==null){ne=n;return}if(t=t.sibling,t!==null){ne=t;return}ne=t=e}while(t!==null);oe===0&&(oe=5)}function zt(e,t,n){var r=W,s=ze.transition;try{ze.transition=null,W=1,R0(e,t,n,r)}finally{ze.transition=s,W=r}return null}function R0(e,t,n,r){do wn();while(gt!==null);if(F&6)throw Error(_(327));n=e.finishedWork;var s=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(_(177));e.callbackNode=null,e.callbackPriority=0;var o=n.lanes|n.childLanes;if(p1(e,o),e===ue&&(ne=ue=null,de=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||$r||($r=!0,Hc(is,function(){return wn(),null})),o=(n.flags&15990)!==0,n.subtreeFlags&15990||o){o=ze.transition,ze.transition=null;var i=W;W=1;var l=F;F|=4,oa.current=null,P0(e,n),zc(n,e),J1(Yo),ls=!!Qo,Yo=Qo=null,e.current=n,j0(n),s1(),F=l,W=i,ze.transition=o}else e.current=n;if($r&&($r=!1,gt=e,_s=s),o=e.pendingLanes,o===0&&(St=null),a1(n.stateNode),Ce(e,te()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)s=t[n],r(s.value,{componentStack:s.stack,digest:s.digest});if(Ss)throw Ss=!1,e=mi,mi=null,e;return _s&1&&e.tag!==0&&wn(),o=e.pendingLanes,o&1?e===gi?Zn++:(Zn=0,gi=e):Zn=0,At(),null}function wn(){if(gt!==null){var e=Su(_s),t=ze.transition,n=W;try{if(ze.transition=null,W=16>e?16:e,gt===null)var r=!1;else{if(e=gt,gt=null,_s=0,F&6)throw Error(_(331));var s=F;for(F|=4,j=e.current;j!==null;){var o=j,i=o.child;if(j.flags&16){var l=o.deletions;if(l!==null){for(var u=0;u<l.length;u++){var c=l[u];for(j=c;j!==null;){var m=j;switch(m.tag){case 0:case 11:case 15:Kn(8,m,o)}var h=m.child;if(h!==null)h.return=m,j=h;else for(;j!==null;){m=j;var g=m.sibling,y=m.return;if(Lc(m),m===c){j=null;break}if(g!==null){g.return=y,j=g;break}j=y}}}var v=o.alternate;if(v!==null){var w=v.child;if(w!==null){v.child=null;do{var k=w.sibling;w.sibling=null,w=k}while(w!==null)}}j=o}}if(o.subtreeFlags&2064&&i!==null)i.return=o,j=i;else e:for(;j!==null;){if(o=j,o.flags&2048)switch(o.tag){case 0:case 11:case 15:Kn(9,o,o.return)}var f=o.sibling;if(f!==null){f.return=o.return,j=f;break e}j=o.return}}var d=e.current;for(j=d;j!==null;){i=j;var p=i.child;if(i.subtreeFlags&2064&&p!==null)p.return=i,j=p;else e:for(i=d;j!==null;){if(l=j,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:Bs(9,l)}}catch(S){J(l,l.return,S)}if(l===i){j=null;break e}var x=l.sibling;if(x!==null){x.return=l.return,j=x;break e}j=l.return}}if(F=s,At(),Ze&&typeof Ze.onPostCommitFiberRoot=="function")try{Ze.onPostCommitFiberRoot(Es,e)}catch{}r=!0}return r}finally{W=n,ze.transition=t}}return!1}function Nl(e,t,n){t=Nn(n,t),t=Sc(e,t,1),e=bt(e,t,1),t=we(),e!==null&&(wr(e,1,t),Ce(e,t))}function J(e,t,n){if(e.tag===3)Nl(e,e,n);else for(;t!==null;){if(t.tag===3){Nl(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(St===null||!St.has(r))){e=Nn(n,e),e=_c(t,e,1),t=bt(t,e,1),e=we(),t!==null&&(wr(t,1,e),Ce(t,e));break}}t=t.return}}function L0(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=we(),e.pingedLanes|=e.suspendedLanes&n,ue===e&&(de&n)===n&&(oe===4||oe===3&&(de&130023424)===de&&500>te()-aa?Wt(e,0):ia|=n),Ce(e,t)}function qc(e,t){t===0&&(e.mode&1?(t=Tr,Tr<<=1,!(Tr&130023424)&&(Tr=4194304)):t=1);var n=we();e=at(e,t),e!==null&&(wr(e,t,n),Ce(e,n))}function D0(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),qc(e,n)}function M0(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,s=e.memoizedState;s!==null&&(n=s.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(_(314))}r!==null&&r.delete(t),qc(e,n)}var Vc;Vc=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||_e.current)Se=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return Se=!1,S0(e,t,n);Se=!!(e.flags&131072)}else Se=!1,Q&&t.flags&1048576&&Yu(t,ms,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Zr(e,t),e=t.pendingProps;var s=xn(t,ge.current);yn(t,n),s=ea(null,t,r,e,s,n);var o=ta();return t.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Ne(r)?(o=!0,ps(t)):o=!1,t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,Yi(t),s.updater=zs,t.stateNode=s,s._reactInternals=t,si(t,r,e,n),t=ai(null,t,r,!0,o,n)):(t.tag=0,Q&&o&&$i(t),ve(null,t,s,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Zr(e,t),e=t.pendingProps,s=r._init,r=s(r._payload),t.type=r,s=t.tag=B0(r),e=$e(r,e),s){case 0:t=ii(null,t,r,e,n);break e;case 1:t=ml(null,t,r,e,n);break e;case 11:t=pl(null,t,r,e,n);break e;case 14:t=hl(null,t,r,$e(r.type,e),n);break e}throw Error(_(306,r,""))}return t;case 0:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:$e(r,s),ii(e,t,r,s,n);case 1:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:$e(r,s),ml(e,t,r,s,n);case 3:e:{if(jc(t),e===null)throw Error(_(387));r=t.pendingProps,o=t.memoizedState,s=o.element,tc(e,t),ys(t,r,null,n);var i=t.memoizedState;if(r=i.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){s=Nn(Error(_(423)),t),t=gl(e,t,r,n,s);break e}else if(r!==s){s=Nn(Error(_(424)),t),t=gl(e,t,r,n,s);break e}else for(Ie=xt(t.stateNode.containerInfo.firstChild),Ee=t,Q=!0,qe=null,n=Ju(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(bn(),r===s){t=lt(e,t,n);break e}ve(e,t,r,n)}t=t.child}return t;case 5:return nc(t),e===null&&ti(t),r=t.type,s=t.pendingProps,o=e!==null?e.memoizedProps:null,i=s.children,Ko(r,s)?i=null:o!==null&&Ko(r,o)&&(t.flags|=32),Pc(e,t),ve(e,t,i,n),t.child;case 6:return e===null&&ti(t),null;case 13:return Ic(e,t,n);case 4:return Ki(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Sn(t,null,r,n):ve(e,t,r,n),t.child;case 11:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:$e(r,s),pl(e,t,r,s,n);case 7:return ve(e,t,t.pendingProps,n),t.child;case 8:return ve(e,t,t.pendingProps.children,n),t.child;case 12:return ve(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,s=t.pendingProps,o=t.memoizedProps,i=s.value,q(gs,r._currentValue),r._currentValue=i,o!==null)if(Ge(o.value,i)){if(o.children===s.children&&!_e.current){t=lt(e,t,n);break e}}else for(o=t.child,o!==null&&(o.return=t);o!==null;){var l=o.dependencies;if(l!==null){i=o.child;for(var u=l.firstContext;u!==null;){if(u.context===r){if(o.tag===1){u=st(-1,n&-n),u.tag=2;var c=o.updateQueue;if(c!==null){c=c.shared;var m=c.pending;m===null?u.next=u:(u.next=m.next,m.next=u),c.pending=u}}o.lanes|=n,u=o.alternate,u!==null&&(u.lanes|=n),ni(o.return,n,t),l.lanes|=n;break}u=u.next}}else if(o.tag===10)i=o.type===t.type?null:o.child;else if(o.tag===18){if(i=o.return,i===null)throw Error(_(341));i.lanes|=n,l=i.alternate,l!==null&&(l.lanes|=n),ni(i,n,t),i=o.sibling}else i=o.child;if(i!==null)i.return=o;else for(i=o;i!==null;){if(i===t){i=null;break}if(o=i.sibling,o!==null){o.return=i.return,i=o;break}i=i.return}o=i}ve(e,t,s.children,n),t=t.child}return t;case 9:return s=t.type,r=t.pendingProps.children,yn(t,n),s=Be(s),r=r(s),t.flags|=1,ve(e,t,r,n),t.child;case 14:return r=t.type,s=$e(r,t.pendingProps),s=$e(r.type,s),hl(e,t,r,s,n);case 15:return Nc(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,s=t.pendingProps,s=t.elementType===r?s:$e(r,s),Zr(e,t),t.tag=1,Ne(r)?(e=!0,ps(t)):e=!1,yn(t,n),bc(t,r,s),si(t,r,s,n),ai(null,t,r,!0,e,n);case 19:return Ec(e,t,n);case 22:return Cc(e,t,n)}throw Error(_(156,t.tag))};function Hc(e,t){return wu(e,t)}function z0(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Me(e,t,n,r){return new z0(e,t,n,r)}function da(e){return e=e.prototype,!(!e||!e.isReactComponent)}function B0(e){if(typeof e=="function")return da(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Ei)return 11;if(e===Ai)return 14}return 2}function Nt(e,t){var n=e.alternate;return n===null?(n=Me(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function ts(e,t,n,r,s,o){var i=2;if(r=e,typeof e=="function")da(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case tn:return $t(n.children,s,o,t);case Ii:i=8,s|=8;break;case jo:return e=Me(12,n,t,s|2),e.elementType=jo,e.lanes=o,e;case Io:return e=Me(13,n,t,s),e.elementType=Io,e.lanes=o,e;case Eo:return e=Me(19,n,t,s),e.elementType=Eo,e.lanes=o,e;case nu:return Os(n,s,o,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case eu:i=10;break e;case tu:i=9;break e;case Ei:i=11;break e;case Ai:i=14;break e;case dt:i=16,r=null;break e}throw Error(_(130,e==null?e:typeof e,""))}return t=Me(i,n,t,s),t.elementType=e,t.type=r,t.lanes=o,t}function $t(e,t,n,r){return e=Me(7,e,r,t),e.lanes=n,e}function Os(e,t,n,r){return e=Me(22,e,r,t),e.elementType=nu,e.lanes=n,e.stateNode={isHidden:!1},e}function xo(e,t,n){return e=Me(6,e,null,t),e.lanes=n,e}function bo(e,t,n){return t=Me(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function F0(e,t,n,r,s){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=to(0),this.expirationTimes=to(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=to(0),this.identifierPrefix=r,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function fa(e,t,n,r,s,o,i,l,u){return e=new F0(e,t,n,l,u),t===1?(t=1,o===!0&&(t|=8)):t=0,o=Me(3,null,null,t),e.current=o,o.stateNode=e,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Yi(o),e}function O0(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:en,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function Gc(e){if(!e)return jt;e=e._reactInternals;e:{if(Kt(e)!==e||e.tag!==1)throw Error(_(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Ne(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(_(171))}if(e.tag===1){var n=e.type;if(Ne(n))return Gu(e,n,t)}return t}function Qc(e,t,n,r,s,o,i,l,u){return e=fa(n,r,!0,e,s,o,i,l,u),e.context=Gc(null),n=e.current,r=we(),s=_t(n),o=st(r,s),o.callback=t??null,bt(n,o,s),e.current.lanes=s,wr(e,s,r),Ce(e,r),e}function Ws(e,t,n,r){var s=t.current,o=we(),i=_t(s);return n=Gc(n),t.context===null?t.context=n:t.pendingContext=n,t=st(o,i),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=bt(s,t,i),e!==null&&(He(e,s,i,o),Yr(e,s,i)),i}function Cs(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Cl(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function pa(e,t){Cl(e,t),(e=e.alternate)&&Cl(e,t)}function W0(){return null}var Yc=typeof reportError=="function"?reportError:function(e){console.error(e)};function ha(e){this._internalRoot=e}$s.prototype.render=ha.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(_(409));Ws(e,t,null,null)};$s.prototype.unmount=ha.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Qt(function(){Ws(null,e,null,null)}),t[it]=null}};function $s(e){this._internalRoot=e}$s.prototype.unstable_scheduleHydration=function(e){if(e){var t=Cu();e={blockedOn:null,target:e,priority:t};for(var n=0;n<pt.length&&t!==0&&t<pt[n].priority;n++);pt.splice(n,0,e),n===0&&ju(e)}};function ma(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Us(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Pl(){}function $0(e,t,n,r,s){if(s){if(typeof r=="function"){var o=r;r=function(){var c=Cs(i);o.call(c)}}var i=Qc(t,r,e,0,null,!1,!1,"",Pl);return e._reactRootContainer=i,e[it]=i.current,ar(e.nodeType===8?e.parentNode:e),Qt(),i}for(;s=e.lastChild;)e.removeChild(s);if(typeof r=="function"){var l=r;r=function(){var c=Cs(u);l.call(c)}}var u=fa(e,0,!1,null,null,!1,!1,"",Pl);return e._reactRootContainer=u,e[it]=u.current,ar(e.nodeType===8?e.parentNode:e),Qt(function(){Ws(t,u,n,r)}),u}function qs(e,t,n,r,s){var o=n._reactRootContainer;if(o){var i=o;if(typeof s=="function"){var l=s;s=function(){var u=Cs(i);l.call(u)}}Ws(t,i,e,s)}else i=$0(n,t,e,s,r);return Cs(i)}_u=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=$n(t.pendingLanes);n!==0&&(Li(t,n|1),Ce(t,te()),!(F&6)&&(Cn=te()+500,At()))}break;case 13:Qt(function(){var r=at(e,1);if(r!==null){var s=we();He(r,e,1,s)}}),pa(e,1)}};Di=function(e){if(e.tag===13){var t=at(e,134217728);if(t!==null){var n=we();He(t,e,134217728,n)}pa(e,134217728)}};Nu=function(e){if(e.tag===13){var t=_t(e),n=at(e,t);if(n!==null){var r=we();He(n,e,t,r)}pa(e,t)}};Cu=function(){return W};Pu=function(e,t){var n=W;try{return W=e,t()}finally{W=n}};Oo=function(e,t,n){switch(t){case"input":if(Ro(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var s=Ls(r);if(!s)throw Error(_(90));su(r),Ro(r,s)}}}break;case"textarea":iu(e,n);break;case"select":t=n.value,t!=null&&hn(e,!!n.multiple,t,!1)}};pu=la;hu=Qt;var U0={usingClientEntryPoint:!1,Events:[xr,on,Ls,du,fu,la]},Bn={findFiberByHostInstance:Bt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},q0={bundleType:Bn.bundleType,version:Bn.version,rendererPackageName:Bn.rendererPackageName,rendererConfig:Bn.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ut.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=vu(e),e===null?null:e.stateNode},findFiberByHostInstance:Bn.findFiberByHostInstance||W0,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ur=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ur.isDisabled&&Ur.supportsFiber)try{Es=Ur.inject(q0),Ze=Ur}catch{}}Te.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=U0;Te.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!ma(t))throw Error(_(200));return O0(e,t,null,n)};Te.createRoot=function(e,t){if(!ma(e))throw Error(_(299));var n=!1,r="",s=Yc;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),t=fa(e,1,!1,null,null,n,!1,r,s),e[it]=t.current,ar(e.nodeType===8?e.parentNode:e),new ha(t)};Te.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(_(188)):(e=Object.keys(e).join(","),Error(_(268,e)));return e=vu(t),e=e===null?null:e.stateNode,e};Te.flushSync=function(e){return Qt(e)};Te.hydrate=function(e,t,n){if(!Us(t))throw Error(_(200));return qs(null,e,t,!0,n)};Te.hydrateRoot=function(e,t,n){if(!ma(e))throw Error(_(405));var r=n!=null&&n.hydratedSources||null,s=!1,o="",i=Yc;if(n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(i=n.onRecoverableError)),t=Qc(t,null,e,1,n??null,s,!1,o,i),e[it]=t.current,ar(e),r)for(e=0;e<r.length;e++)n=r[e],s=n._getVersion,s=s(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,s]:t.mutableSourceEagerHydrationData.push(n,s);return new $s(t)};Te.render=function(e,t,n){if(!Us(t))throw Error(_(200));return qs(null,e,t,!1,n)};Te.unmountComponentAtNode=function(e){if(!Us(e))throw Error(_(40));return e._reactRootContainer?(Qt(function(){qs(null,null,e,!1,function(){e._reactRootContainer=null,e[it]=null})}),!0):!1};Te.unstable_batchedUpdates=la;Te.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Us(n))throw Error(_(200));if(e==null||e._reactInternals===void 0)throw Error(_(38));return qs(e,t,n,!1,r)};Te.version="18.3.1-next-f1338f8080-20240426";function Kc(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Kc)}catch(e){console.error(e)}}Kc(),Kl.exports=Te;var V0=Kl.exports,jl=V0;Co.createRoot=jl.createRoot,Co.hydrateRoot=jl.hydrateRoot;/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function gr(){return gr=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},gr.apply(this,arguments)}var vt;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(vt||(vt={}));const Il="popstate";function H0(e){e===void 0&&(e={});function t(r,s){let{pathname:o,search:i,hash:l}=r.location;return wi("",{pathname:o,search:i,hash:l},s.state&&s.state.usr||null,s.state&&s.state.key||"default")}function n(r,s){return typeof s=="string"?s:Ps(s)}return Q0(t,n,null,e)}function re(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Xc(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function G0(){return Math.random().toString(36).substr(2,8)}function El(e,t){return{usr:e.state,key:e.key,idx:t}}function wi(e,t,n,r){return n===void 0&&(n=null),gr({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?En(t):t,{state:n,key:t&&t.key||r||G0()})}function Ps(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(t+=r.charAt(0)==="#"?r:"#"+r),t}function En(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function Q0(e,t,n,r){r===void 0&&(r={});let{window:s=document.defaultView,v5Compat:o=!1}=r,i=s.history,l=vt.Pop,u=null,c=m();c==null&&(c=0,i.replaceState(gr({},i.state,{idx:c}),""));function m(){return(i.state||{idx:null}).idx}function h(){l=vt.Pop;let k=m(),f=k==null?null:k-c;c=k,u&&u({action:l,location:w.location,delta:f})}function g(k,f){l=vt.Push;let d=wi(w.location,k,f);c=m()+1;let p=El(d,c),x=w.createHref(d);try{i.pushState(p,"",x)}catch(S){if(S instanceof DOMException&&S.name==="DataCloneError")throw S;s.location.assign(x)}o&&u&&u({action:l,location:w.location,delta:1})}function y(k,f){l=vt.Replace;let d=wi(w.location,k,f);c=m();let p=El(d,c),x=w.createHref(d);i.replaceState(p,"",x),o&&u&&u({action:l,location:w.location,delta:0})}function v(k){let f=s.location.origin!=="null"?s.location.origin:s.location.href,d=typeof k=="string"?k:Ps(k);return d=d.replace(/ $/,"%20"),re(f,"No window.location.(origin|href) available to create URL for href: "+d),new URL(d,f)}let w={get action(){return l},get location(){return e(s,i)},listen(k){if(u)throw new Error("A history only accepts one active listener");return s.addEventListener(Il,h),u=k,()=>{s.removeEventListener(Il,h),u=null}},createHref(k){return t(s,k)},createURL:v,encodeLocation(k){let f=v(k);return{pathname:f.pathname,search:f.search,hash:f.hash}},push:g,replace:y,go(k){return i.go(k)}};return w}var Al;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(Al||(Al={}));function Y0(e,t,n){return n===void 0&&(n="/"),K0(e,t,n)}function K0(e,t,n,r){let s=typeof t=="string"?En(t):t,o=ga(s.pathname||"/",n);if(o==null)return null;let i=Zc(e);X0(i);let l=null;for(let u=0;l==null&&u<i.length;++u){let c=cf(o);l=af(i[u],c)}return l}function Zc(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r="");let s=(o,i,l)=>{let u={relativePath:l===void 0?o.path||"":l,caseSensitive:o.caseSensitive===!0,childrenIndex:i,route:o};u.relativePath.startsWith("/")&&(re(u.relativePath.startsWith(r),'Absolute route path "'+u.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),u.relativePath=u.relativePath.slice(r.length));let c=Ct([r,u.relativePath]),m=n.concat(u);o.children&&o.children.length>0&&(re(o.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+c+'".')),Zc(o.children,t,m,c)),!(o.path==null&&!o.index)&&t.push({path:c,score:sf(c,o.index),routesMeta:m})};return e.forEach((o,i)=>{var l;if(o.path===""||!((l=o.path)!=null&&l.includes("?")))s(o,i);else for(let u of Jc(o.path))s(o,i,u)}),t}function Jc(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,s=n.endsWith("?"),o=n.replace(/\?$/,"");if(r.length===0)return s?[o,""]:[o];let i=Jc(r.join("/")),l=[];return l.push(...i.map(u=>u===""?o:[o,u].join("/"))),s&&l.push(...i),l.map(u=>e.startsWith("/")&&u===""?"/":u)}function X0(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:of(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const Z0=/^:[\w-]+$/,J0=3,ef=2,tf=1,nf=10,rf=-2,Tl=e=>e==="*";function sf(e,t){let n=e.split("/"),r=n.length;return n.some(Tl)&&(r+=rf),t&&(r+=ef),n.filter(s=>!Tl(s)).reduce((s,o)=>s+(Z0.test(o)?J0:o===""?tf:nf),r)}function of(e,t){return e.length===t.length&&e.slice(0,-1).every((r,s)=>r===t[s])?e[e.length-1]-t[t.length-1]:0}function af(e,t,n){let{routesMeta:r}=e,s={},o="/",i=[];for(let l=0;l<r.length;++l){let u=r[l],c=l===r.length-1,m=o==="/"?t:t.slice(o.length)||"/",h=lf({path:u.relativePath,caseSensitive:u.caseSensitive,end:c},m),g=u.route;if(!h)return null;Object.assign(s,h.params),i.push({params:s,pathname:Ct([o,h.pathname]),pathnameBase:hf(Ct([o,h.pathnameBase])),route:g}),h.pathnameBase!=="/"&&(o=Ct([o,h.pathnameBase]))}return i}function lf(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=uf(e.path,e.caseSensitive,e.end),s=t.match(n);if(!s)return null;let o=s[0],i=o.replace(/(.)\/+$/,"$1"),l=s.slice(1);return{params:r.reduce((c,m,h)=>{let{paramName:g,isOptional:y}=m;if(g==="*"){let w=l[h]||"";i=o.slice(0,o.length-w.length).replace(/(.)\/+$/,"$1")}const v=l[h];return y&&!v?c[g]=void 0:c[g]=(v||"").replace(/%2F/g,"/"),c},{}),pathname:o,pathnameBase:i,pattern:e}}function uf(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),Xc(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let r=[],s="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(i,l,u)=>(r.push({paramName:l,isOptional:u!=null}),u?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(r.push({paramName:"*"}),s+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?s+="\\/*$":e!==""&&e!=="/"&&(s+="(?:(?=\\/|$))"),[new RegExp(s,t?void 0:"i"),r]}function cf(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return Xc(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function ga(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}function df(e,t){t===void 0&&(t="/");let{pathname:n,search:r="",hash:s=""}=typeof e=="string"?En(e):e;return{pathname:n?n.startsWith("/")?n:ff(n,t):t,search:mf(r),hash:gf(s)}}function ff(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(s=>{s===".."?n.length>1&&n.pop():s!=="."&&n.push(s)}),n.length>1?n.join("/"):"/"}function So(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function pf(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function ed(e,t){let n=pf(e);return t?n.map((r,s)=>s===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function td(e,t,n,r){r===void 0&&(r=!1);let s;typeof e=="string"?s=En(e):(s=gr({},e),re(!s.pathname||!s.pathname.includes("?"),So("?","pathname","search",s)),re(!s.pathname||!s.pathname.includes("#"),So("#","pathname","hash",s)),re(!s.search||!s.search.includes("#"),So("#","search","hash",s)));let o=e===""||s.pathname==="",i=o?"/":s.pathname,l;if(i==null)l=n;else{let h=t.length-1;if(!r&&i.startsWith("..")){let g=i.split("/");for(;g[0]==="..";)g.shift(),h-=1;s.pathname=g.join("/")}l=h>=0?t[h]:"/"}let u=df(s,l),c=i&&i!=="/"&&i.endsWith("/"),m=(o||i===".")&&n.endsWith("/");return!u.pathname.endsWith("/")&&(c||m)&&(u.pathname+="/"),u}const Ct=e=>e.join("/").replace(/\/\/+/g,"/"),hf=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),mf=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,gf=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function vf(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const nd=["post","put","patch","delete"];new Set(nd);const yf=["get",...nd];new Set(yf);/**
 * React Router v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function vr(){return vr=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},vr.apply(this,arguments)}const va=b.createContext(null),wf=b.createContext(null),Xt=b.createContext(null),Vs=b.createContext(null),Tt=b.createContext({outlet:null,matches:[],isDataRoute:!1}),rd=b.createContext(null);function kf(e,t){let{relative:n}=t===void 0?{}:t;Sr()||re(!1);let{basename:r,navigator:s}=b.useContext(Xt),{hash:o,pathname:i,search:l}=id(e,{relative:n}),u=i;return r!=="/"&&(u=i==="/"?r:Ct([r,i])),s.createHref({pathname:u,search:l,hash:o})}function Sr(){return b.useContext(Vs)!=null}function Hs(){return Sr()||re(!1),b.useContext(Vs).location}function sd(e){b.useContext(Xt).static||b.useLayoutEffect(e)}function xf(){let{isDataRoute:e}=b.useContext(Tt);return e?Lf():bf()}function bf(){Sr()||re(!1);let e=b.useContext(va),{basename:t,future:n,navigator:r}=b.useContext(Xt),{matches:s}=b.useContext(Tt),{pathname:o}=Hs(),i=JSON.stringify(ed(s,n.v7_relativeSplatPath)),l=b.useRef(!1);return sd(()=>{l.current=!0}),b.useCallback(function(c,m){if(m===void 0&&(m={}),!l.current)return;if(typeof c=="number"){r.go(c);return}let h=td(c,JSON.parse(i),o,m.relative==="path");e==null&&t!=="/"&&(h.pathname=h.pathname==="/"?t:Ct([t,h.pathname])),(m.replace?r.replace:r.push)(h,m.state,m)},[t,r,i,o,e])}function od(){let{matches:e}=b.useContext(Tt),t=e[e.length-1];return t?t.params:{}}function id(e,t){let{relative:n}=t===void 0?{}:t,{future:r}=b.useContext(Xt),{matches:s}=b.useContext(Tt),{pathname:o}=Hs(),i=JSON.stringify(ed(s,r.v7_relativeSplatPath));return b.useMemo(()=>td(e,JSON.parse(i),o,n==="path"),[e,i,o,n])}function Sf(e,t){return _f(e,t)}function _f(e,t,n,r){Sr()||re(!1);let{navigator:s}=b.useContext(Xt),{matches:o}=b.useContext(Tt),i=o[o.length-1],l=i?i.params:{};i&&i.pathname;let u=i?i.pathnameBase:"/";i&&i.route;let c=Hs(),m;if(t){var h;let k=typeof t=="string"?En(t):t;u==="/"||(h=k.pathname)!=null&&h.startsWith(u)||re(!1),m=k}else m=c;let g=m.pathname||"/",y=g;if(u!=="/"){let k=u.replace(/^\//,"").split("/");y="/"+g.replace(/^\//,"").split("/").slice(k.length).join("/")}let v=Y0(e,{pathname:y}),w=If(v&&v.map(k=>Object.assign({},k,{params:Object.assign({},l,k.params),pathname:Ct([u,s.encodeLocation?s.encodeLocation(k.pathname).pathname:k.pathname]),pathnameBase:k.pathnameBase==="/"?u:Ct([u,s.encodeLocation?s.encodeLocation(k.pathnameBase).pathname:k.pathnameBase])})),o,n,r);return t&&w?b.createElement(Vs.Provider,{value:{location:vr({pathname:"/",search:"",hash:"",state:null,key:"default"},m),navigationType:vt.Pop}},w):w}function Nf(){let e=Rf(),t=vf(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,s={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return b.createElement(b.Fragment,null,b.createElement("h2",null,"Unexpected Application Error!"),b.createElement("h3",{style:{fontStyle:"italic"}},t),n?b.createElement("pre",{style:s},n):null,null)}const Cf=b.createElement(Nf,null);class Pf extends b.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error!==void 0?b.createElement(Tt.Provider,{value:this.props.routeContext},b.createElement(rd.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function jf(e){let{routeContext:t,match:n,children:r}=e,s=b.useContext(va);return s&&s.static&&s.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(s.staticContext._deepestRenderedBoundaryId=n.route.id),b.createElement(Tt.Provider,{value:t},r)}function If(e,t,n,r){var s;if(t===void 0&&(t=[]),n===void 0&&(n=null),r===void 0&&(r=null),e==null){var o;if(!n)return null;if(n.errors)e=n.matches;else if((o=r)!=null&&o.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let i=e,l=(s=n)==null?void 0:s.errors;if(l!=null){let m=i.findIndex(h=>h.route.id&&(l==null?void 0:l[h.route.id])!==void 0);m>=0||re(!1),i=i.slice(0,Math.min(i.length,m+1))}let u=!1,c=-1;if(n&&r&&r.v7_partialHydration)for(let m=0;m<i.length;m++){let h=i[m];if((h.route.HydrateFallback||h.route.hydrateFallbackElement)&&(c=m),h.route.id){let{loaderData:g,errors:y}=n,v=h.route.loader&&g[h.route.id]===void 0&&(!y||y[h.route.id]===void 0);if(h.route.lazy||v){u=!0,c>=0?i=i.slice(0,c+1):i=[i[0]];break}}}return i.reduceRight((m,h,g)=>{let y,v=!1,w=null,k=null;n&&(y=l&&h.route.id?l[h.route.id]:void 0,w=h.route.errorElement||Cf,u&&(c<0&&g===0?(Df("route-fallback"),v=!0,k=null):c===g&&(v=!0,k=h.route.hydrateFallbackElement||null)));let f=t.concat(i.slice(0,g+1)),d=()=>{let p;return y?p=w:v?p=k:h.route.Component?p=b.createElement(h.route.Component,null):h.route.element?p=h.route.element:p=m,b.createElement(jf,{match:h,routeContext:{outlet:m,matches:f,isDataRoute:n!=null},children:p})};return n&&(h.route.ErrorBoundary||h.route.errorElement||g===0)?b.createElement(Pf,{location:n.location,revalidation:n.revalidation,component:w,error:y,children:d(),routeContext:{outlet:null,matches:f,isDataRoute:!0}}):d()},null)}var ad=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(ad||{}),ld=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(ld||{});function Ef(e){let t=b.useContext(va);return t||re(!1),t}function Af(e){let t=b.useContext(wf);return t||re(!1),t}function Tf(e){let t=b.useContext(Tt);return t||re(!1),t}function ud(e){let t=Tf(),n=t.matches[t.matches.length-1];return n.route.id||re(!1),n.route.id}function Rf(){var e;let t=b.useContext(rd),n=Af(),r=ud();return t!==void 0?t:(e=n.errors)==null?void 0:e[r]}function Lf(){let{router:e}=Ef(ad.UseNavigateStable),t=ud(ld.UseNavigateStable),n=b.useRef(!1);return sd(()=>{n.current=!0}),b.useCallback(function(s,o){o===void 0&&(o={}),n.current&&(typeof s=="number"?e.navigate(s):e.navigate(s,vr({fromRouteId:t},o)))},[e,t])}const Rl={};function Df(e,t,n){Rl[e]||(Rl[e]=!0)}function Mf(e,t){e==null||e.v7_startTransition,e==null||e.v7_relativeSplatPath}function ns(e){re(!1)}function zf(e){let{basename:t="/",children:n=null,location:r,navigationType:s=vt.Pop,navigator:o,static:i=!1,future:l}=e;Sr()&&re(!1);let u=t.replace(/^\/*/,"/"),c=b.useMemo(()=>({basename:u,navigator:o,static:i,future:vr({v7_relativeSplatPath:!1},l)}),[u,l,o,i]);typeof r=="string"&&(r=En(r));let{pathname:m="/",search:h="",hash:g="",state:y=null,key:v="default"}=r,w=b.useMemo(()=>{let k=ga(m,u);return k==null?null:{location:{pathname:k,search:h,hash:g,state:y,key:v},navigationType:s}},[u,m,h,g,y,v,s]);return w==null?null:b.createElement(Xt.Provider,{value:c},b.createElement(Vs.Provider,{children:n,value:w}))}function Bf(e){let{children:t,location:n}=e;return Sf(ki(t),n)}new Promise(()=>{});function ki(e,t){t===void 0&&(t=[]);let n=[];return b.Children.forEach(e,(r,s)=>{if(!b.isValidElement(r))return;let o=[...t,s];if(r.type===b.Fragment){n.push.apply(n,ki(r.props.children,o));return}r.type!==ns&&re(!1),!r.props.index||!r.props.children||re(!1);let i={id:r.props.id||o.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(i.children=ki(r.props.children,o)),n.push(i)}),n}/**
 * React Router DOM v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function xi(){return xi=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},xi.apply(this,arguments)}function Ff(e,t){if(e==null)return{};var n={},r=Object.keys(e),s,o;for(o=0;o<r.length;o++)s=r[o],!(t.indexOf(s)>=0)&&(n[s]=e[s]);return n}function Of(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Wf(e,t){return e.button===0&&(!t||t==="_self")&&!Of(e)}const $f=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],Uf="6";try{window.__reactRouterVersion=Uf}catch{}const qf="startTransition",Ll=Ld[qf];function Vf(e){let{basename:t,children:n,future:r,window:s}=e,o=b.useRef();o.current==null&&(o.current=H0({window:s,v5Compat:!0}));let i=o.current,[l,u]=b.useState({action:i.action,location:i.location}),{v7_startTransition:c}=r||{},m=b.useCallback(h=>{c&&Ll?Ll(()=>u(h)):u(h)},[u,c]);return b.useLayoutEffect(()=>i.listen(m),[i,m]),b.useEffect(()=>Mf(r),[r]),b.createElement(zf,{basename:t,children:n,location:l.location,navigationType:l.action,navigator:i,future:r})}const Hf=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",Gf=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,ye=b.forwardRef(function(t,n){let{onClick:r,relative:s,reloadDocument:o,replace:i,state:l,target:u,to:c,preventScrollReset:m,viewTransition:h}=t,g=Ff(t,$f),{basename:y}=b.useContext(Xt),v,w=!1;if(typeof c=="string"&&Gf.test(c)&&(v=c,Hf))try{let p=new URL(window.location.href),x=c.startsWith("//")?new URL(p.protocol+c):new URL(c),S=ga(x.pathname,y);x.origin===p.origin&&S!=null?c=S+x.search+x.hash:w=!0}catch{}let k=kf(c,{relative:s}),f=Qf(c,{replace:i,state:l,target:u,preventScrollReset:m,relative:s,viewTransition:h});function d(p){r&&r(p),p.defaultPrevented||f(p)}return b.createElement("a",xi({},g,{href:v||k,onClick:w||o?r:d,ref:n,target:u}))});var Dl;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(Dl||(Dl={}));var Ml;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(Ml||(Ml={}));function Qf(e,t){let{target:n,replace:r,state:s,preventScrollReset:o,relative:i,viewTransition:l}=t===void 0?{}:t,u=xf(),c=Hs(),m=id(e,{relative:i});return b.useCallback(h=>{if(Wf(h,n)){h.preventDefault();let g=r!==void 0?r:Ps(c)===Ps(m);u(e,{replace:g,state:s,preventScrollReset:o,relative:i,viewTransition:l})}},[c,u,m,r,s,n,e,o,i,l])}function Yf(e,t){const[n,r]=b.useState(()=>{if(typeof window>"u")return t;try{const o=window.localStorage.getItem(e);return o?JSON.parse(o):t}catch(o){return console.error(`Error loading localStorage key "${e}":`,o),t}});return[n,o=>{try{const i=o instanceof Function?o(n):o;r(i),typeof window<"u"&&window.localStorage.setItem(e,JSON.stringify(i))}catch(i){console.error(`Error saving localStorage key "${e}":`,i)}}]}const Kf="subnet-master-progress";function Xf(){const[e,t]=Yf(Kf,{modules:{},quizScores:{},practiceCompleted:{},lastAccessed:null,startedAt:new Date().toISOString()}),n=b.useCallback((v,w)=>{t(k=>({...k,modules:{...k.modules,[v]:{...k.modules[v],...w,lastUpdated:new Date().toISOString()}},lastAccessed:new Date().toISOString()}))},[t]),r=b.useCallback(v=>{n(v,{started:!0,startedAt:new Date().toISOString(),completed:!1,progress:0})},[n]),s=b.useCallback(v=>{n(v,{completed:!0,completedAt:new Date().toISOString(),progress:100})},[n]),o=b.useCallback((v,w,k)=>{t(f=>{var d,p;return{...f,quizScores:{...f.quizScores,[v]:{score:w,totalQuestions:k,percentage:Math.round(w/k*100),attempts:(((d=f.quizScores[v])==null?void 0:d.attempts)||0)+1,bestScore:Math.max(w,((p=f.quizScores[v])==null?void 0:p.bestScore)||0),lastAttempt:new Date().toISOString()}}}})},[t]),i=b.useCallback((v,w)=>{t(k=>({...k,practiceCompleted:{...k.practiceCompleted,[v]:{...k.practiceCompleted[v],[w]:{completed:!0,completedAt:new Date().toISOString()}}}}))},[t]),l=b.useCallback(v=>e.modules[v]||{started:!1,completed:!1,progress:0},[e.modules]),u=b.useCallback(v=>e.quizScores[v]||null,[e.quizScores]),c=b.useMemo(()=>{const v=Array.from({length:10},(d,p)=>p),w=v.length;let k=0,f=0;return v.forEach(d=>{const p=e.modules[d]||{};p.completed&&k++,f+=p.progress||0}),{completedModules:k,totalModules:w,percentage:Math.round(f/w)}},[e.modules]),m=b.useCallback(()=>{for(let v=0;v<10;v++){const w=e.modules[v];if(!w||!w.completed)return v}return null},[e.modules]),h=b.useCallback(()=>{t({modules:{},quizScores:{},practiceCompleted:{},lastAccessed:null,startedAt:new Date().toISOString()})},[t]),g=b.useCallback(()=>{const v={...e,exportedAt:new Date().toISOString()},w=new Blob([JSON.stringify(v,null,2)],{type:"application/json"}),k=URL.createObjectURL(w),f=document.createElement("a");f.href=k,f.download=`subnet-master-progress-${new Date().toISOString().split("T")[0]}.json`,document.body.appendChild(f),f.click(),document.body.removeChild(f),URL.revokeObjectURL(k)},[e]),y=b.useCallback(v=>new Promise((w,k)=>{const f=new FileReader;f.onload=d=>{try{const p=JSON.parse(d.target.result);t(p),w()}catch{k(new Error("Invalid progress file"))}},f.onerror=()=>k(new Error("Failed to read file")),f.readAsText(v)}),[t]);return{progress:e,startModule:r,completeModule:s,updateModuleProgress:n,updateQuizScore:o,completePractice:i,getModuleProgress:l,getQuizScore:u,overallProgress:c,getNextModule:m,resetProgress:h,exportProgress:g,importProgress:y}}const cd=b.createContext(null);function Zf({children:e}){const t=Xf();return a.jsx(cd.Provider,{value:t,children:e})}function ya(){const e=b.useContext(cd);if(!e)throw new Error("useProgressContext must be used within a ProgressProvider");return e}const Jf="_header_1f6c5_1",ep="_container_1f6c5_10",tp="_menuButton_1f6c5_17",np="_menuIcon_1f6c5_28",rp="_logo_1f6c5_37",sp="_desktopNav_1f6c5_49",op="_navLink_1f6c5_54",We={header:Jf,container:ep,menuButton:tp,menuIcon:np,logo:rp,desktopNav:sp,navLink:op};function ip({onMenuClick:e}){return a.jsx("header",{className:We.header,children:a.jsxs("div",{className:`container ${We.container}`,children:[a.jsxs("button",{className:We.menuButton,onClick:e,"aria-label":"Toggle navigation menu",children:[a.jsx("span",{className:We.menuIcon}),a.jsx("span",{className:We.menuIcon}),a.jsx("span",{className:We.menuIcon})]}),a.jsx(ye,{to:"/",className:We.logo,children:a.jsx("h1",{children:"Subnet Pro"})}),a.jsxs("nav",{className:We.desktopNav,children:[a.jsx(ye,{to:"/",className:We.navLink,children:"Home"}),a.jsx(ye,{to:"/module/0",className:We.navLink,children:"Modules"}),a.jsx(ye,{to:"/progress",className:We.navLink,children:"Progress"})]})]})})}const ap="_overlay_1osb0_1",lp="_overlayOpen_1osb0_14",up="_nav_1osb0_19",cp="_navOpen_1osb0_34",dp="_navHeader_1osb0_38",fp="_closeButton_1osb0_53",pp="_navContent_1osb0_73",hp="_navLink_1osb0_77",mp="_navSection_1osb0_93",gp="_sectionTitle_1osb0_97",vp="_moduleLink_1osb0_106",yp="_moduleNumber_1osb0_123",Pe={overlay:ap,overlayOpen:lp,nav:up,navOpen:cp,navHeader:dp,closeButton:fp,navContent:pp,navLink:hp,navSection:mp,sectionTitle:gp,moduleLink:vp,moduleNumber:yp};function wp({isOpen:e,onClose:t}){b.useEffect(()=>(e?document.body.style.overflow="hidden":document.body.style.overflow="unset",()=>{document.body.style.overflow="unset"}),[e]);const n=[{id:0,title:"Orientation & Pre-Assessment"},{id:1,title:"Binary & Powers of Two"},{id:2,title:"Bitwise Logic"},{id:3,title:"IPv4 Address Anatomy"},{id:4,title:"Subnet Masks & CIDR"},{id:5,title:"Fixed-Length Subnets"},{id:6,title:"VLSM & Address Planning"},{id:7,title:"Routing & ACL"},{id:8,title:"IPv6 Fundamentals"},{id:9,title:"Troubleshooting Tools"}];return a.jsxs(a.Fragment,{children:[a.jsx("div",{className:`${Pe.overlay} ${e?Pe.overlayOpen:""}`,onClick:t}),a.jsxs("nav",{className:`${Pe.nav} ${e?Pe.navOpen:""}`,children:[a.jsxs("div",{className:Pe.navHeader,children:[a.jsx("h2",{children:"Navigation"}),a.jsx("button",{className:Pe.closeButton,onClick:t,"aria-label":"Close navigation",children:"×"})]}),a.jsxs("div",{className:Pe.navContent,children:[a.jsx(ye,{to:"/",className:Pe.navLink,onClick:t,children:"🏠 Home"}),a.jsx(ye,{to:"/progress",className:Pe.navLink,onClick:t,children:"📊 My Progress"}),a.jsxs("div",{className:Pe.navSection,children:[a.jsx("h3",{className:Pe.sectionTitle,children:"Modules"}),n.map(r=>a.jsxs(ye,{to:`/module/${r.id}`,className:Pe.moduleLink,onClick:t,children:[a.jsx("span",{className:Pe.moduleNumber,children:r.id}),r.title]},r.id))]})]})]})]})}const kp="_layout_1oyj0_1",xp="_main_1oyj0_7",bp="_footer_1oyj0_13",_o={layout:kp,main:xp,footer:bp};function Sp({children:e}){const[t,n]=b.useState(!1),r=()=>n(!t),s=()=>n(!1);return a.jsxs("div",{className:_o.layout,children:[a.jsx(ip,{onMenuClick:r}),a.jsx(wp,{isOpen:t,onClose:s}),a.jsx("main",{className:_o.main,children:a.jsx("div",{className:"container",children:e})}),a.jsx("footer",{className:_o.footer,children:a.jsx("div",{className:"container",children:a.jsx("p",{children:"© 2024 Subnet Pro. Built with React & Vite."})})})]})}const _p="_home_zstgw_1",Np="_hero_zstgw_6",Cp="_title_zstgw_15",Pp="_subtitle_zstgw_21",jp="_ctaButton_zstgw_30",Ip="_features_zstgw_47",Ep="_featureGrid_zstgw_57",Ap="_featureCard_zstgw_63",Tp="_featureIcon_zstgw_77",Rp="_curriculum_zstgw_93",Lp="_moduleList_zstgw_110",Dp="_startButton_zstgw_117",ae={home:_p,hero:Np,title:Cp,subtitle:Pp,ctaButton:jp,features:Ip,featureGrid:Ep,featureCard:Ap,featureIcon:Tp,curriculum:Rp,moduleList:Lp,startButton:Dp};function Mp(){return a.jsxs("div",{className:ae.home,children:[a.jsxs("section",{className:ae.hero,children:[a.jsx("h1",{className:ae.title,children:"Master Subnetting"}),a.jsx("p",{className:ae.subtitle,children:"Learn IPv4 and IPv6 subnetting from the ground up with interactive lessons, practice exercises, and real-world examples."}),a.jsx(ye,{to:"/module/0",className:ae.ctaButton,children:"Start Learning"})]}),a.jsxs("section",{className:ae.features,children:[a.jsx("h2",{children:"What You'll Learn"}),a.jsxs("div",{className:ae.featureGrid,children:[a.jsxs("div",{className:ae.featureCard,children:[a.jsx("div",{className:ae.featureIcon,children:"🔢"}),a.jsx("h3",{children:"Binary & Decimal"}),a.jsx("p",{children:"Master number conversions and understand the foundation of IP addressing."})]}),a.jsxs("div",{className:ae.featureCard,children:[a.jsx("div",{className:ae.featureIcon,children:"🌐"}),a.jsx("h3",{children:"IP Addressing"}),a.jsx("p",{children:"Learn IPv4 and IPv6 address structures, classes, and CIDR notation."})]}),a.jsxs("div",{className:ae.featureCard,children:[a.jsx("div",{className:ae.featureIcon,children:"🔀"}),a.jsx("h3",{children:"Subnet Calculations"}),a.jsx("p",{children:"Calculate subnets, hosts, and implement VLSM for efficient network design."})]}),a.jsxs("div",{className:ae.featureCard,children:[a.jsx("div",{className:ae.featureIcon,children:"🛠️"}),a.jsx("h3",{children:"Practical Tools"}),a.jsx("p",{children:"Use real-world tools for verification and troubleshooting network configurations."})]})]})]}),a.jsxs("section",{className:ae.curriculum,children:[a.jsx("h2",{children:"Curriculum Overview"}),a.jsx("p",{children:"10 comprehensive modules taking you from beginner to subnet expert:"}),a.jsxs("ol",{className:ae.moduleList,children:[a.jsx("li",{children:"Orientation & Pre-Assessment"}),a.jsx("li",{children:"Binary Math & Powers of Two"}),a.jsx("li",{children:"Bitwise Logic Operations"}),a.jsx("li",{children:"IPv4 Address Anatomy"}),a.jsx("li",{children:"Subnet Masks & CIDR Notation"}),a.jsx("li",{children:"Fixed-Length Subnet Calculations"}),a.jsx("li",{children:"Variable Length Subnet Masking (VLSM)"}),a.jsx("li",{children:"Routing & ACL Implications"}),a.jsx("li",{children:"IPv6 Subnet Fundamentals"}),a.jsx("li",{children:"Verification & Troubleshooting"})]}),a.jsx(ye,{to:"/module/0",className:ae.startButton,children:"Begin Module 0 →"})]})]})}const pn=[{id:0,title:"Orientation & Pre-Assessment",goal:"Make the student emotionally comfortable and capture a baseline",objectives:["Describe, in plain language, what 'subnetting' achieves (divide a network, control broadcast domains, conserve addresses)","Explain why even a home user benefits (e.g., IoT isolation)"],activities:[{type:"tour",title:"Five-minute tour of an IP packet",description:"Understand the basic structure and purpose of IP packets"},{type:"reflection",title:"Personal goals",description:"Write two things you hope to be able to do by the end"}],assessment:{type:"reflection",prompt:"Subnetting matters because…",description:"Write a short reflective paragraph"},stickingPoints:[{issue:"Intimidation",remedy:"Emphasize: 'We'll use only addition, subtraction, powers of 2, and some logical AND.'"}],estimatedTime:30,prerequisites:[]},{id:1,title:"Positional Number Systems & Powers of Two",goal:"Math foundation #1",objectives:["Convert numbers 0 – 255 between decimal and binary without a calculator","List the values of 2⁰ through 2⁷ from memory"],activities:[{type:"lesson",title:"Positional review",description:"Identical to decimal but base 2"},{type:"exercise",title:"Eight-bit chart",description:"Fill a row of boxes labelled 128 64 32 16 8 4 2 1"},{type:"game",title:"Mental math game",description:"What is the highest power of two less than ___?"}],assessment:{type:"worksheet",prompt:"Complete conversion exercises",description:"10 random decimals → binary and 10 random binaries → decimal in < 10 min; ≥ 90% correct",passingScore:90},stickingPoints:[{issue:"Dropping leading zeros",remedy:"Remind that each IP octet must keep all eight bits for clarity"},{issue:"Memorizing powers of two",remedy:"Create flash-cards; include 2⁸ (256) and 2¹⁶ (65,536) for later"}],estimatedTime:45,prerequisites:[0]},{id:2,title:"Bitwise Logic Without Programming",goal:"Math foundation #2",objectives:["Perform manual AND and OR operations on two eight-bit binary numbers","Explain why AND is used to discover 'network portion'"],activities:[{type:"drill",title:"Truth table drill",description:"Practice: 1 & 1 = 1, everything else = 0"},{type:"exercise",title:"Colored-pen exercise",description:"Overlay mask and address, highlight matching bits"}],assessment:{type:"problem",prompt:"Calculate network address",description:"Given IP = 11000000 10101000 00000001 00100011 (192.168.1.35) and mask = 11111111 11111111 11111111 00000000 (255.255.255.0), hand-calculate the network address",answer:"192.168.1.0"},stickingPoints:[{issue:"Writing long strings of 1s/0s incorrectly",remedy:"Teach grouping into nibbles (4 bits)"},{issue:"Mixing AND vs OR",remedy:"Mnemonic: 'AND narrows'"}],estimatedTime:45,prerequisites:[1]},{id:3,title:"IPv4 Address Anatomy",goal:"Understanding IP address structure",objectives:["Break an address into four octets, show each in binary and decimal","Describe historical class A/B/C only for context, not as current design rule"],activities:[{type:"lab",title:"32-bit string-to-dotted-quad mini-lab",description:"Convert between binary string and dotted decimal notation"},{type:"visual",title:"Network vs Host analogy",description:"Visual analogy: street (network) vs house (host)"}],assessment:{type:"labeling",prompt:"Identify network and host portions",description:"Label each part of 10.15.7.23/16 as network vs host"},stickingPoints:[{issue:"Thinking classes still matter",remedy:"Stress that CIDR replaced them in 1993"}],estimatedTime:30,prerequisites:[2]},{id:4,title:"Subnet Masks & CIDR Notation",goal:"Master mask representations",objectives:["Translate between dotted-decimal mask and slash notation up to /30","Explain why /31 and /32 behave specially"],activities:[{type:"reference",title:"Build a mask ladder",description:"Create reference: /8 = 255.0.0.0, /9 = 255.128.0.0, etc."},{type:"exercise",title:"Slide the bar",description:"Paper exercise: slide the 'bar' one bit at a time"}],assessment:{type:"conversion",prompt:"Convert between mask formats",description:"Provide five masks in either form; learner must supply the other form and number of host bits"},stickingPoints:[{issue:"/24 vs 255.255.255.0 confusion",remedy:"Repetitive drills; keep ladder sheet posted"}],estimatedTime:45,prerequisites:[3]},{id:5,title:"Fixed-Length Subnet Calculations",goal:"Core subnet math skills",objectives:["Given network & new prefix, calculate: number of subnets, hosts per subnet, block size, first & last usable, broadcast","Recognize invalid host addresses"],activities:[{type:"formula",title:"Formula review",description:"hosts = 2^(host bits) – 2, subnets = 2^(borrowed bits)"},{type:"worksheet",title:"Step-by-step practice",description:"Work through 192.168.0.0/24 subdivided into /26, /28, etc."},{type:"drill",title:"Speed rounds",description:"What subnet does 172.22.37.129/20 belong to?"}],assessment:{type:"problem-set",prompt:"Complete subnet calculations",description:"Comprehensive problem set (5 networks). Must score ≥ 80% and self-explain any error",passingScore:80},stickingPoints:[{issue:"Off-by-one: forgetting to reserve network & broadcast",remedy:"Always subtract 2 from total addresses for usable hosts"},{issue:"Using decimal math on block size",remedy:"Always derive from binary boundary first"}],estimatedTime:60,prerequisites:[4]},{id:6,title:"Variable Length Subnet Masking (VLSM) & Address Planning",goal:"Efficient network design",objectives:["Allocate subnets of different sizes from a single pool without overlap","Prioritize largest to smallest when carving","Produce a clean address plan table"],activities:[{type:"scenario",title:"Realistic network design",description:"HQ + 3 branches needing 250, 60, 30, 14 hosts"},{type:"visual",title:"Binary tree visualization",description:"Draw visual binary tree to show split points"},{type:"lab",title:"Spreadsheet planning",description:"Create address plan showing allocations and gaps"}],assessment:{type:"design",prompt:"Create VLSM plan",description:"Design a VLSM plan for 10.10.0.0/22 given four department sizes; instructor checks for no overlap, correct ranges"},stickingPoints:[{issue:"Forgetting to sort by size",remedy:"Enforce rule: 'biggest networks first'"},{issue:"Address wastage",remedy:"Calculate utilization % as feedback"}],estimatedTime:60,prerequisites:[5]},{id:7,title:"Subnetting in Practice: Routing & ACL Implications",goal:"Real-world applications",objectives:["Explain how routers use the mask to make forwarding decisions (longest-prefix match)","Predict which subnets a summarized route covers","Identify when two ACL entries overlap because of subnet math"],activities:[{type:"demo",title:"Packet tracer simulation",description:"Demo with a packet tracer / simulator (no coding)"},{type:"puzzle",title:"ACL overlap puzzle",description:"Determine which ACL rule wins in overlapping scenarios"}],assessment:{type:"routing",prompt:"Routing decisions",description:"Given a routing table, determine next-hop for three sample destinations"},stickingPoints:[{issue:"Misreading 'longest prefix'",remedy:"Analogy: exact street address vs only ZIP code"}],estimatedTime:45,prerequisites:[6]},{id:8,title:"IPv6 Subnet Fundamentals",goal:"Modern protocol skills",objectives:["Recognize 128-bit address, hexadecimal quartet notation","Explain the concept '/64 is the normal host subnet'","Calculate simple IPv6 sub-prefixes (/56 → /60, /64, /126)"],activities:[{type:"lesson",title:"Compression rules",description:"Learn :: compression and leading zero removal"},{type:"comparison",title:"IPv4 vs IPv6",description:"Compare IPv4 /30 to IPv6 /126 for point-to-point links"}],assessment:{type:"conversion",prompt:"IPv6 address manipulation",description:"Convert 2001:0db8:0000:0000:0200:00ff:fe00:0042 to compressed form and list network vs interface ID for /64"},stickingPoints:[{issue:"Hexadecimal unfamiliarity",remedy:"Quick refresher; show that hex-to-binary is 1:4 mapping"}],estimatedTime:45,prerequisites:[7]},{id:9,title:"Verification & Troubleshooting Tools",goal:"Practical validation skills",objectives:["Use ipcalc (Linux/WSL or web), ping, traceroute, and whois to verify subnet plans","Spot common misconfigurations (mask mismatch, overlapping ranges, wrong gateway)"],activities:[{type:"lab",title:"Live troubleshooting",description:"Fix mis-configured VM network adapter"},{type:"checklist",title:"Deployment checklist",description:"Create template for real deployments"}],assessment:{type:"troubleshooting",prompt:"Diagnose network issue",description:"Instructor deliberately breaks one parameter; learner diagnoses and documents fix"},stickingPoints:[{issue:"Assuming the math is wrong when the config is",remedy:"Teach to check both calculations and configuration"}],estimatedTime:45,prerequisites:[8]}],zp=e=>pn.find(t=>t.id===parseInt(e)),Bp={0:[{id:"q0-1",type:"multiple-choice",question:"What is the primary purpose of subnetting?",options:["To make networks faster","To divide networks and control broadcast domains","To encrypt network traffic","To connect to the internet"],correctAnswer:1,explanation:"Subnetting divides a network into smaller segments, controlling broadcast domains and conserving IP addresses."},{id:"q0-2",type:"multiple-choice",question:"Why might a home user benefit from subnetting?",options:["Faster internet speeds","Lower electricity bills","IoT device isolation","Better Wi-Fi range"],correctAnswer:2,explanation:"Subnetting allows home users to isolate IoT devices on separate network segments for security."},{id:"q0-3",type:"true-false",question:"Subnetting requires advanced programming knowledge.",correctAnswer:!1,explanation:"Subnetting only requires basic math: addition, subtraction, powers of 2, and logical AND operations."},{id:"q0-4",type:"multiple-choice",question:"What does subnetting help conserve?",options:["Bandwidth","IP addresses","CPU cycles","Memory"],correctAnswer:1,explanation:"Subnetting helps conserve IP addresses by allowing efficient allocation based on actual needs."},{id:"q0-5",type:"true-false",question:"Broadcast domains can be controlled through subnetting.",correctAnswer:!0,explanation:"Each subnet forms its own broadcast domain, limiting broadcast traffic to that subnet."}],1:[{id:"q1-1",type:"conversion",question:"Convert 192 to binary (8 bits):",correctAnswer:"11000000",explanation:"192 = 128 + 64 = 11000000"},{id:"q1-2",type:"conversion",question:"Convert 10101100 to decimal:",correctAnswer:"172",explanation:"10101100 = 128 + 32 + 8 + 4 = 172"},{id:"q1-3",type:"multiple-choice",question:"What is 2^5?",options:["16","32","64","128"],correctAnswer:1,explanation:"2^5 = 32"},{id:"q1-4",type:"fill-in",question:"The highest power of 2 less than 200 is ___",correctAnswer:"128",acceptableAnswers:["128","2^7"],explanation:"2^7 = 128 < 200, while 2^8 = 256 > 200"},{id:"q1-5",type:"conversion",question:"Convert 255 to binary (8 bits):",correctAnswer:"11111111",explanation:"255 = 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 11111111"}],2:[{id:"q2-1",type:"calculation",question:"Calculate: 11001100 AND 11110000",correctAnswer:"11000000",explanation:"AND operation: 1 AND 1 = 1, all other combinations = 0"},{id:"q2-2",type:"multiple-choice",question:"What is the result of 1 AND 0?",options:["0","1","10","undefined"],correctAnswer:0,explanation:"In AND operation, 1 AND 0 = 0"},{id:"q2-3",type:"true-false",question:"AND operation is used to find the network portion of an IP address.",correctAnswer:!0,explanation:"IP address AND subnet mask = network address"},{id:"q2-4",type:"calculation",question:"What is 192.168.1.100 AND 255.255.255.0?",correctAnswer:"192.168.1.0",explanation:"The AND operation with the mask zeros out the host portion"},{id:"q2-5",type:"multiple-choice",question:"Which mnemonic helps remember AND vs OR?",options:["AND adds","AND narrows","AND amplifies","AND activates"],correctAnswer:1,explanation:"AND narrows - it only outputs 1 when both inputs are 1"}],3:[{id:"q3-1",type:"multiple-choice",question:"How many octets are in an IPv4 address?",options:["2","3","4","8"],correctAnswer:2,explanation:"IPv4 addresses have 4 octets (e.g., 192.168.1.1)"},{id:"q3-2",type:"identification",question:"In 10.15.7.23/16, which octets represent the network portion?",correctAnswer:"10.15",acceptableAnswers:["10.15","first two","first 2"],explanation:"/16 means the first 16 bits (2 octets) are the network portion"},{id:"q3-3",type:"true-false",question:"Class-based addressing (A, B, C) is still the primary method used today.",correctAnswer:!1,explanation:"CIDR (Classless Inter-Domain Routing) replaced class-based addressing in 1993"},{id:"q3-4",type:"multiple-choice",question:"How many bits are in an IPv4 address?",options:["8","16","32","64"],correctAnswer:2,explanation:"IPv4 addresses are 32 bits (4 octets × 8 bits each)"},{id:"q3-5",type:"analogy",question:"In the street/house analogy, the network portion is like the:",options:["House number","Street name","City","Mailbox"],correctAnswer:1,explanation:"Network = street, Host = house number"}],4:[{id:"q4-1",type:"conversion",question:"Convert /24 to dotted decimal:",correctAnswer:"255.255.255.0",explanation:"/24 means first 24 bits are 1s: 11111111.11111111.11111111.00000000"},{id:"q4-2",type:"conversion",question:"Convert 255.255.240.0 to CIDR notation:",correctAnswer:"/20",acceptableAnswers:["/20","20"],explanation:"255.255.240.0 has 20 consecutive 1s"},{id:"q4-3",type:"multiple-choice",question:"How many host bits in a /28 network?",options:["4","8","16","28"],correctAnswer:0,explanation:"32 total bits - 28 network bits = 4 host bits"},{id:"q4-4",type:"true-false",question:"/32 represents a single host address.",correctAnswer:!0,explanation:"/32 means all 32 bits are network bits, leaving 0 host bits"},{id:"q4-5",type:"conversion",question:"What is the next mask after /16?",correctAnswer:"/17",acceptableAnswers:["/17","255.128.0.0"],explanation:"/17 = 255.128.0.0 (one more bit than /16)"}],5:[{id:"q5-1",type:"calculation",question:"How many usable host addresses in a /27 network?",correctAnswer:"30",explanation:"2^5 - 2 = 32 - 2 = 30 usable hosts"},{id:"q5-2",type:"calculation",question:"What is the block size for a /26 subnet?",correctAnswer:"64",explanation:"2^(32-26) = 2^6 = 64 addresses per block"},{id:"q5-3",type:"identification",question:"What subnet does 172.16.37.129/25 belong to?",correctAnswer:"172.16.37.128",explanation:"/25 has blocks of 128. 129 falls in the 128-255 block"},{id:"q5-4",type:"calculation",question:"If you subnet 192.168.1.0/24 into /26, how many subnets do you get?",correctAnswer:"4",explanation:"2^(26-24) = 2^2 = 4 subnets"},{id:"q5-5",type:"true-false",question:"The first and last addresses in a subnet are always usable for hosts.",correctAnswer:!1,explanation:"First address is the network address, last is the broadcast address"}],6:[{id:"q6-1",type:"ordering",question:"When implementing VLSM, allocate subnets in which order?",options:["Smallest to largest","Largest to smallest","Random order","Alphabetical order"],correctAnswer:1,explanation:"Always allocate largest subnets first to avoid fragmentation"},{id:"q6-2",type:"scenario",question:"You need subnets for 60, 30, and 250 hosts. Which gets allocated first?",correctAnswer:"250",explanation:"Largest requirement (250 hosts) must be allocated first"},{id:"q6-3",type:"calculation",question:"What size subnet is needed for 60 hosts?",correctAnswer:"/26",acceptableAnswers:["/26","64"],explanation:"2^6 = 64 addresses, 62 usable hosts (sufficient for 60)"},{id:"q6-4",type:"true-false",question:"VLSM allows different subnet sizes within the same network.",correctAnswer:!0,explanation:"Variable Length Subnet Masking enables efficient use of address space"},{id:"q6-5",type:"design",question:"What is acceptable utilization percentage for a subnet?",options:["Under 50%","Over 50%","Exactly 100%","Doesn't matter"],correctAnswer:1,explanation:"Good design aims for >50% utilization to avoid waste"}],7:[{id:"q7-1",type:"multiple-choice",question:'What does "longest prefix match" mean in routing?',options:["The oldest route wins","The most specific route wins","The shortest route wins","The newest route wins"],correctAnswer:1,explanation:"Routers choose the route with the most specific (longest) prefix"},{id:"q7-2",type:"scenario",question:"Routes exist for 10.0.0.0/8 and 10.1.0.0/16. Which matches 10.1.1.1?",correctAnswer:"10.1.0.0/16",explanation:"/16 is more specific (longer prefix) than /8"},{id:"q7-3",type:"true-false",question:"ACL rules can overlap due to subnet boundaries.",correctAnswer:!0,explanation:"Overlapping subnets in ACLs can cause unexpected behavior"},{id:"q7-4",type:"calculation",question:"What addresses does 192.168.0.0/22 summarize?",correctAnswer:"192.168.0.0 - 192.168.3.255",acceptableAnswers:["192.168.0.0-192.168.3.255","192.168.0.0 to 192.168.3.255"],explanation:"/22 covers 4 /24 networks (0, 1, 2, and 3)"},{id:"q7-5",type:"analogy",question:"Longest prefix match is like using:",options:["Only ZIP code","Full street address","Just the state","Country code"],correctAnswer:1,explanation:"More specific (longer) prefixes are like complete addresses"}],8:[{id:"q8-1",type:"multiple-choice",question:"How many bits in an IPv6 address?",options:["32","64","128","256"],correctAnswer:2,explanation:"IPv6 addresses are 128 bits long"},{id:"q8-2",type:"conversion",question:"Compress: 2001:0db8:0000:0000:0000:0000:0000:0001",correctAnswer:"2001:db8::1",explanation:"Remove leading zeros and compress consecutive zero groups with ::"},{id:"q8-3",type:"true-false",question:"/64 is the standard subnet size for IPv6 LANs.",correctAnswer:!0,explanation:"/64 leaves 64 bits for the interface ID, standard for LANs"},{id:"q8-4",type:"identification",question:"In 2001:db8::/32, how many bits are for subnetting?",correctAnswer:"32",acceptableAnswers:["32","32 bits","/32 to /64 = 32 bits"],explanation:"Between the /32 allocation and /64 subnets = 32 bits for subnetting"},{id:"q8-5",type:"comparison",question:"IPv6 /126 is equivalent to IPv4:",options:["/30","/31","/32","/24"],correctAnswer:0,explanation:"Both /126 (IPv6) and /30 (IPv4) provide 2 usable addresses"}],9:[{id:"q9-1",type:"tools",question:"Which tool calculates subnet information from CIDR notation?",options:["ping","traceroute","ipcalc","nslookup"],correctAnswer:2,explanation:"ipcalc is specifically designed for subnet calculations"},{id:"q9-2",type:"troubleshooting",question:"A host with 192.168.1.100/24 cannot reach 192.168.1.200/25. Why?",correctAnswer:"Subnet mask mismatch",acceptableAnswers:["mask mismatch","different masks","different subnets"],explanation:"/25 creates two /25 subnets within the /24, causing isolation"},{id:"q9-3",type:"true-false",question:"Always blame the subnet calculations before checking the configuration.",correctAnswer:!1,explanation:"Check both calculations AND configuration - often it's a config error"},{id:"q9-4",type:"identification",question:"What indicates overlapping subnets?",options:["Slow network speed","Duplicate IP warnings","High CPU usage","DNS failures"],correctAnswer:1,explanation:"Overlapping subnets often cause IP conflict warnings"},{id:"q9-5",type:"verification",question:"Before deployment, verify subnet plans using:",options:["Speed tests only","Calculations and tools","User feedback","Management approval"],correctAnswer:1,explanation:"Use both manual calculations and tools like ipcalc to verify"}]},Fp=e=>Bp[e]||[],zl=(e,t)=>{if(e.type==="multiple-choice"||e.type==="true-false")return t===e.correctAnswer;if(e.type==="conversion"||e.type==="calculation"||e.type==="identification"||e.type==="fill-in"){const n=t.toString().toLowerCase().trim(),r=e.correctAnswer.toString().toLowerCase().trim();if(n===r)return!0;if(e.acceptableAnswers)return e.acceptableAnswers.some(s=>n===s.toString().toLowerCase().trim())}return!1},Op={1:{title:"Binary Conversion Practice",exercises:[{type:"decimal-to-binary",problems:[{decimal:10,binary:"00001010"},{decimal:25,binary:"00011001"},{decimal:100,binary:"01100100"},{decimal:200,binary:"11001000"},{decimal:255,binary:"11111111"},{decimal:128,binary:"10000000"},{decimal:192,binary:"11000000"},{decimal:172,binary:"10101100"},{decimal:16,binary:"00010000"},{decimal:31,binary:"00011111"}]},{type:"binary-to-decimal",problems:[{binary:"00001100",decimal:12},{binary:"00110011",decimal:51},{binary:"10000001",decimal:129},{binary:"11110000",decimal:240},{binary:"01010101",decimal:85},{binary:"11111110",decimal:254},{binary:"00100000",decimal:32},{binary:"10101010",decimal:170},{binary:"11000011",decimal:195},{binary:"00001111",decimal:15}]},{type:"powers-of-two",problems:[{power:0,value:1},{power:1,value:2},{power:2,value:4},{power:3,value:8},{power:4,value:16},{power:5,value:32},{power:6,value:64},{power:7,value:128},{power:8,value:256}]}]},2:{title:"Bitwise AND Operations",exercises:[{type:"and-operation",problems:[{operand1:"11001100",operand2:"11110000",result:"11000000"},{operand1:"10101010",operand2:"11111111",result:"10101010"},{operand1:"11111111",operand2:"00000000",result:"00000000"},{operand1:"10110011",operand2:"11111000",result:"10110000"},{operand1:"11000000",operand2:"11111111",result:"11000000"}]},{type:"network-address",problems:[{ip:"192.168.1.100",mask:"255.255.255.0",network:"192.168.1.0"},{ip:"10.1.5.50",mask:"255.255.0.0",network:"10.1.0.0"},{ip:"172.16.20.100",mask:"255.255.240.0",network:"172.16.16.0"},{ip:"192.168.10.130",mask:"255.255.255.128",network:"192.168.10.128"},{ip:"10.0.0.200",mask:"255.0.0.0",network:"10.0.0.0"}]}]},3:{title:"IPv4 Address Structure",exercises:[{type:"identify-parts",problems:[{address:"192.168.1.100/24",network:"192.168.1",host:"100"},{address:"10.0.0.1/8",network:"10",host:"0.0.1"},{address:"172.16.50.25/16",network:"172.16",host:"50.25"},{address:"192.168.100.200/28",network:"192.168.100.192",host:"8"},{address:"10.20.30.40/20",network:"10.20.16.0",host:"14.40"}]}]},4:{title:"Subnet Mask Conversions",exercises:[{type:"cidr-to-mask",problems:[{cidr:"/8",mask:"255.0.0.0"},{cidr:"/16",mask:"255.255.0.0"},{cidr:"/24",mask:"255.255.255.0"},{cidr:"/25",mask:"255.255.255.128"},{cidr:"/26",mask:"255.255.255.192"},{cidr:"/27",mask:"255.255.255.224"},{cidr:"/28",mask:"255.255.255.240"},{cidr:"/29",mask:"255.255.255.248"},{cidr:"/30",mask:"255.255.255.252"},{cidr:"/20",mask:"255.255.240.0"}]},{type:"mask-to-cidr",problems:[{mask:"255.255.255.0",cidr:"/24"},{mask:"255.255.0.0",cidr:"/16"},{mask:"255.255.255.128",cidr:"/25"},{mask:"255.255.255.192",cidr:"/26"},{mask:"255.255.240.0",cidr:"/20"},{mask:"255.255.255.224",cidr:"/27"},{mask:"255.255.248.0",cidr:"/21"},{mask:"255.255.252.0",cidr:"/22"},{mask:"255.255.255.240",cidr:"/28"},{mask:"255.255.255.252",cidr:"/30"}]}]},5:{title:"Subnet Calculations",exercises:[{type:"subnet-info",problems:[{network:"192.168.1.0/24",subnets:"/26",numSubnets:4,hostsPerSubnet:62,subnetList:["192.168.1.0/26","192.168.1.64/26","192.168.1.128/26","192.168.1.192/26"]},{network:"10.0.0.0/16",subnets:"/20",numSubnets:16,hostsPerSubnet:4094,subnetList:["10.0.0.0/20","10.0.16.0/20","10.0.32.0/20","10.0.48.0/20"]},{network:"172.16.0.0/16",subnets:"/24",numSubnets:256,hostsPerSubnet:254,subnetList:["172.16.0.0/24","172.16.1.0/24","172.16.2.0/24","172.16.3.0/24"]}]},{type:"find-subnet",problems:[{address:"192.168.1.100/26",subnet:"192.168.1.64/26",firstUsable:"192.168.1.65",lastUsable:"192.168.1.126",broadcast:"192.168.1.127"},{address:"10.1.5.200/24",subnet:"10.1.5.0/24",firstUsable:"10.1.5.1",lastUsable:"10.1.5.254",broadcast:"10.1.5.255"},{address:"172.20.100.50/28",subnet:"172.20.100.48/28",firstUsable:"172.20.100.49",lastUsable:"172.20.100.62",broadcast:"172.20.100.63"}]}]},6:{title:"VLSM Design Practice",exercises:[{type:"vlsm-planning",problems:[{network:"192.168.10.0/24",requirements:[{name:"Sales",hosts:60},{name:"Engineering",hosts:30},{name:"Management",hosts:12},{name:"Servers",hosts:6}],solution:[{name:"Sales",subnet:"192.168.10.0/26",hosts:62},{name:"Engineering",subnet:"192.168.10.64/27",hosts:30},{name:"Management",subnet:"192.168.10.96/28",hosts:14},{name:"Servers",subnet:"192.168.10.112/29",hosts:6}]},{network:"10.10.0.0/22",requirements:[{name:"Building A",hosts:250},{name:"Building B",hosts:120},{name:"Building C",hosts:60},{name:"DMZ",hosts:14}],solution:[{name:"Building A",subnet:"10.10.0.0/24",hosts:254},{name:"Building B",subnet:"10.10.1.0/25",hosts:126},{name:"Building C",subnet:"10.10.1.128/26",hosts:62},{name:"DMZ",subnet:"10.10.1.192/28",hosts:14}]}]}]},7:{title:"Routing and ACL Practice",exercises:[{type:"route-selection",problems:[{destination:"10.1.5.100",routes:["10.0.0.0/8","10.1.0.0/16","10.1.5.0/24"],selected:"10.1.5.0/24",reason:"Longest prefix match"},{destination:"192.168.1.50",routes:["0.0.0.0/0","192.168.0.0/16","192.168.1.0/24","192.168.1.32/27"],selected:"192.168.1.32/27",reason:"Most specific route"}]},{type:"summarization",problems:[{networks:["192.168.0.0/24","192.168.1.0/24","192.168.2.0/24","192.168.3.0/24"],summary:"192.168.0.0/22"},{networks:["10.1.0.0/24","10.1.1.0/24"],summary:"10.1.0.0/23"}]}]},8:{title:"IPv6 Practice",exercises:[{type:"ipv6-compression",problems:[{full:"2001:0db8:0000:0000:0000:0000:0000:0001",compressed:"2001:db8::1"},{full:"fe80:0000:0000:0000:0204:0061:0000:0001",compressed:"fe80::204:61:0:1"},{full:"2001:0db8:0000:0001:0000:0000:0000:0000",compressed:"2001:db8:0:1::"}]},{type:"ipv6-subnetting",problems:[{network:"2001:db8::/32",subnet:"/48",numSubnets:65536,examples:["2001:db8:0::/48","2001:db8:1::/48","2001:db8:2::/48"]},{network:"2001:db8:1234::/48",subnet:"/64",numSubnets:65536,examples:["2001:db8:1234:0::/64","2001:db8:1234:1::/64","2001:db8:1234:2::/64"]}]}]},9:{title:"Troubleshooting Scenarios",exercises:[{type:"diagnose-issue",problems:[{scenario:"Host A (192.168.1.10/24) cannot ping Host B (192.168.1.200/25)",issue:"Subnet mask mismatch",solution:"Both hosts need the same subnet mask"},{scenario:"Router shows overlapping subnet errors",issue:"VLSM overlap",solution:"Redesign subnets to eliminate overlap"},{scenario:"New subnet 10.1.2.0/24 has no connectivity",issue:"Missing route",solution:"Add route to upstream router"}]},{type:"verification-checklist",items:["Verify IP address assignment","Check subnet mask consistency","Confirm default gateway","Test with ping and traceroute","Review routing table","Check for overlapping subnets","Verify VLAN configuration","Confirm DNS settings"]}]}},js={0:{title:"Why Subnetting Matters",sections:[{type:"introduction",title:"Welcome to Subnetting",content:`
Imagine you're organizing a large office building. You wouldn't put everyone in one giant room - you'd create departments, meeting rooms, and private offices. That's exactly what subnetting does for computer networks.

**Subnetting** is the practice of dividing a network into smaller, more manageable pieces. It's like creating neighborhoods within a city, each with its own identity and boundaries.
        `},{type:"real-world",title:"Real-World Example: Your Home Network",content:`
Let's start with something familiar - your home network. Right now, all your devices (phones, laptops, smart TVs, IoT devices) are probably on the same network. This works fine for a home, but imagine if:

- Your smart doorbell could see all the files on your laptop
- A compromised IoT device could attack your work computer
- Your kids' gaming traffic slowed down your work video calls

With subnetting, you could create separate networks:
- **Main Network**: Your work devices and important computers
- **IoT Network**: Smart home devices (isolated for security)
- **Guest Network**: Visitors' devices (no access to your files)
- **Kids Network**: Gaming consoles and tablets (with parental controls)

Each subnet is like a gated community - devices can only talk to others in their community unless you specifically allow it.
        `},{type:"business-case",title:"Why Businesses Need Subnetting",content:`
For businesses, subnetting is essential:

**1. Security**: Isolate sensitive departments
- Finance subnet: Only accounting can access
- HR subnet: Protected employee data
- Guest subnet: Visitors can't access internal resources

**2. Performance**: Reduce network congestion
- Broadcast traffic stays within subnets
- Network problems don't affect everyone
- Better bandwidth management

**3. Organization**: Logical network structure
- Building 1: 192.168.1.0/24
- Building 2: 192.168.2.0/24
- Remote office: 192.168.3.0/24

**4. Cost Savings**: Efficient IP address usage
- IPv4 addresses are limited and expensive
- Subnetting prevents waste
- Right-sized networks for each need
        `},{type:"key-concepts",title:"Core Concepts You'll Master",content:`
**1. Binary Math** (Don't worry, it's easier than it sounds!)
- Computers think in 1s and 0s
- IP addresses are just binary numbers in disguise
- You'll learn simple tricks to convert quickly

**2. Network vs Host**
- Network part: The street name (shared by all)
- Host part: The house number (unique to each)
- Subnet mask: The divider between them

**3. CIDR Notation**
- Modern way to write subnets
- Example: 192.168.1.0/24
- The /24 tells us the network size

**4. Address Calculation**
- Finding network addresses
- Calculating broadcast addresses
- Determining usable host ranges
        `},{type:"interactive-demo",title:"See Subnetting in Action",content:`
Let's visualize how a network gets divided. Imagine you have the network 192.168.1.0/24 (256 addresses).

**Without Subnetting:**
- All 254 devices on one network
- Everyone hears everyone's broadcasts
- One compromised device can scan all others

**With Subnetting (into 4 subnets):**
1. **Admin**: 192.168.1.0/26 (62 hosts)
2. **Sales**: 192.168.1.64/26 (62 hosts)
3. **Guest**: 192.168.1.128/26 (62 hosts)
4. **Servers**: 192.168.1.192/26 (62 hosts)

Each subnet is isolated - Sales can't directly access Admin computers!
        `},{type:"common-misconceptions",title:"Common Myths Debunked",content:`
**Myth 1**: "Subnetting is only for large companies"
**Reality**: Even home users benefit from network segmentation

**Myth 2**: "You need to be a math genius"
**Reality**: Basic addition and pattern recognition is all you need

**Myth 3**: "It's all done automatically now"
**Reality**: Understanding subnetting helps troubleshoot and design better networks

**Myth 4**: "IPv6 makes subnetting obsolete"
**Reality**: IPv6 still uses subnetting, just with bigger numbers
        `},{type:"summary",title:"What's Next?",content:`
By the end of this course, you'll be able to:
- Design efficient network layouts
- Troubleshoot connectivity issues
- Secure networks through segmentation
- Optimize IP address usage
- Speak confidently about networking

Ready to start? Let's begin with Module 1: Binary Basics!
        `}],practice:{title:"Check Your Understanding",questions:[{question:"Why might a coffee shop use subnetting?",hint:"Think about different types of users and security needs.",answer:"To separate customer WiFi from their point-of-sale systems and business network for security."},{question:"What's the main benefit of isolating IoT devices on their own subnet?",hint:"Consider what happens if a smart device gets hacked.",answer:"Security - if an IoT device is compromised, it can't access your main computers and files."},{question:"How is subnetting like organizing a filing cabinet?",hint:"Think about organization and access control.",answer:"Just like folders separate different types of documents, subnets separate different types of network traffic and devices."}]},keyTakeaways:["Subnetting divides networks into smaller, manageable pieces","It improves security by isolating different device groups","Reduces network congestion and improves performance","Essential for both home and business networks","Based on simple binary math and patterns"]},1:{title:"Binary Basics",sections:[{type:"introduction",title:"Why Binary Matters for Networking",content:`
Computers don't understand "192.168.1.1" - they only understand 1s and 0s. Every IP address is actually a 32-bit binary number in disguise. To truly understand subnetting, we need to peek behind the curtain and see what computers see.

Don't worry - binary is simpler than you think. It's just another way of counting, and you'll learn quick tricks to convert without doing complex math.
        `},{type:"concept",title:"Understanding Number Systems",content:`
**Decimal (Base 10)**: What humans use
- Uses digits 0-9
- Each position is a power of 10
- Example: 192 = (1×100) + (9×10) + (2×1)

**Binary (Base 2)**: What computers use
- Uses only 0 and 1
- Each position is a power of 2
- Example: 11000000 = 192 in decimal

**The Key Insight**: Each binary digit (bit) represents a power of 2:
- Position 8: 128
- Position 7: 64
- Position 6: 32
- Position 5: 16
- Position 4: 8
- Position 3: 4
- Position 2: 2
- Position 1: 1
        `},{type:"method",title:"Quick Conversion Method",content:`
**Decimal to Binary - The Subtraction Method:**

Let's convert 192 to binary:
1. Start with 192
2. Find the largest power of 2 that fits: 128 ✓
3. Subtract: 192 - 128 = 64
4. Next power that fits: 64 ✓
5. Subtract: 64 - 64 = 0
6. We're done!

Result: 128 + 64 = 11000000 in binary

**Powers of 2 to Memorize:**
- 2^7 = 128
- 2^6 = 64
- 2^5 = 32
- 2^4 = 16
- 2^3 = 8
- 2^2 = 4
- 2^1 = 2
- 2^0 = 1

**Pro Tip**: In networking, we always use 8-bit groups (octets), so 15 = 00001111 (8 bits), not just 1111 (4 bits). Always pad with leading zeros!
        `},{type:"interactive-tool",title:"Binary Converter Tool",component:"BinaryConverter"},{type:"patterns",title:"Patterns to Recognize",content:`
**Common IP Octet Values in Binary:**
- 0 = 00000000 (all zeros)
- 128 = 10000000 (just the first bit)
- 192 = 11000000 (first two bits)
- 224 = 11100000 (first three bits)
- 240 = 11110000 (first four bits)
- 248 = 11111000 (first five bits)
- 252 = 11111100 (first six bits)
- 254 = 11111110 (first seven bits)
- 255 = 11111111 (all ones)

**Notice the Pattern?** These are common subnet mask values! Each adds one more "1" bit from the left.
        `},{type:"practice-examples",title:"Let's Practice Together",content:`
**Example 1: Convert 168 to binary**
- 168 > 128? Yes! Take 128, remainder: 40
- 40 > 64? No
- 40 > 32? Yes! Take 32, remainder: 8
- 8 > 16? No
- 8 > 8? Yes! Take 8, remainder: 0
- Result: 128 + 32 + 8 = 10101000

**Example 2: Convert 11110000 to decimal**
- 1×128 = 128
- 1×64 = 64
- 1×32 = 32
- 1×16 = 16
- 0×8 = 0
- 0×4 = 0
- 0×2 = 0
- 0×1 = 0
- Total: 128 + 64 + 32 + 16 = 240

**Example 3: Full IP address**
192.168.1.100 in binary:
- 192 = 11000000
- 168 = 10101000
- 1 = 00000001
- 100 = 01100100
- Full: 11000000.10101000.00000001.01100100
        `},{type:"tips-tricks",title:"Speed Tips",content:`
**1. The Half-Way Method**
- 128 is half of 256 (the range of one octet)
- If a number is ≥ 128, the first bit is 1
- Subtract 128 and repeat with 64, 32, etc.

**2. Common Patterns**
- 255 = all 1s (8 bits on)
- 0 = all 0s (8 bits off)
- Powers of 2 = only one bit on

**3. Subnet Mask Shortcuts**
- /24 = 255.255.255.0 (3 full octets)
- /16 = 255.255.0.0 (2 full octets)
- /8 = 255.0.0.0 (1 full octet)

**4. Quick Check Method**
- Even numbers end in 0
- Odd numbers end in 1
- Numbers ≥ 128 start with 1
        `},{type:"summary",title:"Binary Mastery Achieved! 🎉",content:`
You now understand:
- How decimal and binary relate
- Quick conversion techniques
- Common patterns in IP addresses
- Why binary matters for subnetting

Next up: Module 2 - The AND Operation, where we'll use binary to find network addresses!
        `}],practice:{title:"Binary Conversion Practice",questions:[{question:"Convert 172 to binary (show all 8 bits)",hint:"Start with 128. Does it fit? Then try 64, 32, 16, 8, 4, 2, 1",answer:"10101100 (128 + 32 + 8 + 4 = 172)"},{question:"Convert 00110011 to decimal",hint:"Add up the place values where you see a 1",answer:"51 (32 + 16 + 2 + 1 = 51)"},{question:"What's the largest number you can represent with 8 bits?",hint:"All bits set to 1",answer:"255 (11111111 in binary)"},{question:"Convert 10 to binary (8 bits)",hint:"Which powers of 2 add up to 10?",answer:"00001010 (8 + 2 = 10)"},{question:"Why do subnet masks often use values like 128, 192, 224, 240, 248, 252, 254, 255?",hint:"Look at their binary representations",answer:"They represent consecutive 1s from the left: 10000000, 11000000, 11100000, etc. Perfect for defining network/host boundaries!"}],exercises:[{title:"Quick Conversions - Try these yourself:",instructions:"Use the binary converter tool above to check your work",problems:["Convert to binary (8 bits): 192, 168, 1, 100","Convert to decimal: 11111110, 01010101, 10000001, 11110000","Find the binary for all powers of 2 from 1 to 128","What do you notice about even vs odd numbers in binary?"]}]},keyTakeaways:["Binary uses only 0 and 1, with each position representing a power of 2","IP addresses are 32-bit binary numbers shown in decimal for human readability","The subtraction method makes decimal-to-binary conversion quick","Common subnet mask values follow predictable binary patterns","Memorizing powers of 2 (1, 2, 4, 8, 16, 32, 64, 128) is essential"]},2:{title:"Bitwise AND Operation",sections:[{type:"introduction",title:"The Magic Behind Finding Network Addresses",content:`
The AND operation is the secret sauce of subnetting. It's how routers instantly know which network an IP address belongs to. Understanding AND is like having X-ray vision for networks - you'll see through the decimal numbers to the binary logic underneath.

**The Golden Rule**: To find any network address, just AND the IP address with the subnet mask. That's it!
        `},{type:"concept",title:"How AND Works",content:`
The AND operation is beautifully simple:
- 1 AND 1 = 1
- 1 AND 0 = 0  
- 0 AND 1 = 0
- 0 AND 0 = 0

**Memory Trick**: "Both must be TRUE (1) for the result to be TRUE (1)"

Think of it like a security checkpoint that requires two keys:
- Both keys present (1 AND 1) = Door opens (1)
- One or no keys (any other combination) = Door stays closed (0)

**Real-World Analogy**: 
Imagine two switches in series controlling a light:
- Both switches ON = Light ON
- Any switch OFF = Light OFF
        `},{type:"visual-example",title:"Visual AND Operation",content:`
Let's see AND in action with a simple 8-bit example:

**Example 1: Basic AND**
\`\`\`
11001100  (204 in decimal)  AND
11110000  (240 in decimal)
--------
11000000  (192 in decimal)
\`\`\`

**Step-by-step breakdown:**
- Position 1: 1 AND 1 = 1 ✓
- Position 2: 1 AND 1 = 1 ✓
- Position 3: 0 AND 1 = 0 ✗
- Position 4: 0 AND 1 = 0 ✗
- Position 5: 1 AND 0 = 0 ✗
- Position 6: 1 AND 0 = 0 ✗
- Position 7: 0 AND 0 = 0 ✗
- Position 8: 0 AND 0 = 0 ✗

Notice how the AND operation "filters out" bits - only positions where BOTH inputs have a 1 will output a 1.
        `},{type:"networking-application",title:"Finding Network Addresses",content:`
Here's where it gets exciting - this is how we find network addresses!

**Example: Find the network address**
- IP Address: 192.168.1.100
- Subnet Mask: 255.255.255.0

**Step 1: Convert to binary**
- 192.168.1.100 = 11000000.10101000.00000001.01100100
- 255.255.255.0 = 11111111.11111111.11111111.00000000

**Step 2: Perform AND operation**
\`\`\`
11000000.10101000.00000001.01100100  (IP)  AND
11111111.11111111.11111111.00000000  (Mask)
------------------------------------
11000000.10101000.00000001.00000000  (Network)
\`\`\`

**Step 3: Convert back to decimal**
- Result: 192.168.1.0

**Why this works**: The subnet mask has 1s in the network portion and 0s in the host portion. When we AND:
- Network bits (1 AND original) = Original bits preserved
- Host bits (0 AND anything) = Always 0

This effectively "zeros out" the host portion, leaving only the network address!
        `},{type:"interactive-tool",title:"Network Calculator Tool",component:"NetworkCalculator"},{type:"interactive-tool",title:"AND Operation Visualizer",component:"AndVisualizer"},{type:"patterns",title:"Common Subnet Mask Patterns",content:`
Understanding how different subnet masks affect the AND operation:

**255.255.255.0 (/24)**
- Binary: 11111111.11111111.11111111.00000000
- Effect: Preserves first 3 octets, zeros out the 4th
- Example: 192.168.1.100 → 192.168.1.0

**255.255.0.0 (/16)**
- Binary: 11111111.11111111.00000000.00000000
- Effect: Preserves first 2 octets, zeros out last 2
- Example: 172.16.50.100 → 172.16.0.0

**255.255.255.128 (/25)**
- Binary: 11111111.11111111.11111111.10000000
- Effect: Preserves first 3 octets + 1 bit, zeros the rest
- Example: 192.168.1.200 → 192.168.1.128

**Pattern Recognition**: The more 1s in the mask, the smaller the network!
        `},{type:"practice-scenarios",title:"Real Network Examples",content:`
**Scenario 1: Home Network**
Your router's IP: 192.168.1.1/24
Your computer: 192.168.1.50/24

Both AND with 255.255.255.0:
- Router: 192.168.1.1 AND 255.255.255.0 = 192.168.1.0
- Computer: 192.168.1.50 AND 255.255.255.0 = 192.168.1.0
- Same network? YES! ✓

**Scenario 2: Office Network**
Server: 10.1.5.100/16
Printer: 10.1.20.5/16

Both AND with 255.255.0.0:
- Server: 10.1.5.100 AND 255.255.0.0 = 10.1.0.0
- Printer: 10.1.20.5 AND 255.255.0.0 = 10.1.0.0
- Same network? YES! ✓

**Scenario 3: Misconfigured Network**
PC1: 192.168.1.100/24 (255.255.255.0)
PC2: 192.168.1.200/25 (255.255.255.128)

- PC1: 192.168.1.100 AND 255.255.255.0 = 192.168.1.0
- PC2: 192.168.1.200 AND 255.255.255.128 = 192.168.1.128
- Same network? NO! ✗ (This is why they can't communicate!)
        `},{type:"tips",title:"Pro Tips & Shortcuts",content:`
**1. The 255 Shortcut**
- Any octet ANDed with 255 stays the same
- Any octet ANDed with 0 becomes 0
- This is why 255.255.255.0 is so common!

**2. Quick Mental Math**
For common masks, you can skip the binary:
- /24 (255.255.255.0): Just zero out the last octet
- /16 (255.255.0.0): Zero out the last two octets
- /8 (255.0.0.0): Zero out the last three octets

**3. The Boundary Check**
For /25, /26, /27, etc., check if the host octet is above or below the boundary:
- /25 boundary: 128 (below = .0 network, above = .128 network)
- /26 boundaries: 0, 64, 128, 192
- /27 boundaries: 0, 32, 64, 96, 128, 160, 192, 224

**4. Remember the Purpose**
AND doesn't change your IP - it just reveals which network it belongs to!
        `},{type:"summary",title:"AND Mastery Achieved!",content:`
You now understand:
- How the AND operation works at the bit level
- Why AND with a subnet mask gives the network address
- How to quickly identify if two IPs are on the same network
- Common patterns and shortcuts for mental calculations

The AND operation is your Swiss Army knife for subnetting. Every subnet calculation starts here!

Next up: Module 3 - IPv4 Address Anatomy, where we'll explore how IP addresses are structured and why they're divided into network and host portions.
        `}],practice:{title:"AND Operation Practice",questions:[{question:"What is 11001100 AND 11110000?",hint:"Go bit by bit: both must be 1 for the result to be 1",answer:"11000000 (only the first two positions have 1 AND 1 = 1)"},{question:"Find the network address for 192.168.5.75/24",hint:"/24 means mask is 255.255.255.0",answer:"192.168.5.0 (last octet becomes 0 when ANDed with 0)"},{question:"Are 10.1.5.100/16 and 10.1.20.5/16 on the same network?",hint:"AND both with 255.255.0.0 and compare results",answer:"Yes! Both result in network address 10.1.0.0"},{question:"What's the network address for 172.16.50.100 with mask 255.255.240.0?",hint:"240 in binary is 11110000, so it preserves the first 4 bits of the third octet",answer:"172.16.48.0 (50 AND 240 = 48)"},{question:"Why does 192.168.1.100/24 AND 255.255.255.0 = 192.168.1.0?",hint:"Think about what happens when you AND with 0",answer:"The last octet of the mask is all 0s, and anything AND 0 = 0"}],exercises:[{title:"Quick AND Calculations",instructions:"Use the Network Calculator tool to verify your answers",problems:["Find network addresses for: 10.0.5.67/8, 172.16.100.200/16, 192.168.50.50/24","Calculate: 11111111 AND 10101010, 11110000 AND 11001100","Which pairs are on the same network? (192.168.1.50/24, 192.168.1.200/24), (10.1.1.1/16, 10.2.1.1/16)","Find the network for 192.168.1.130/25 (hint: 128 is the boundary)"]}]},keyTakeaways:["AND operation: Both inputs must be 1 for output to be 1","IP Address AND Subnet Mask = Network Address","Subnet masks use 1s for network portion, 0s for host portion","Common masks (/8, /16, /24) make mental math easy","The AND operation is the foundation of all subnet calculations"]},3:{title:"IPv4 Address Anatomy",sections:[{type:"introduction",title:"Understanding IP Address Structure",content:`
Every device on a network needs a unique address - like a house needs a street address. IPv4 addresses are the most common addressing system, and understanding their structure is crucial for subnetting.

An IPv4 address isn't just a random number - it's carefully structured with two parts: the **network portion** (like a street name) and the **host portion** (like a house number). The subnet mask determines where one ends and the other begins.
        `},{type:"anatomy",title:"The Four Octets",content:`
An IPv4 address consists of 32 bits, divided into four octets (8-bit groups):

**Example: 192.168.1.100**
\`\`\`
Octet 1  |  Octet 2  |  Octet 3  |  Octet 4
   192   .    168    .     1     .    100
11000000 . 10101000  . 00000001  . 01100100
\`\`\`

**Why "Octet"?**
- Octet = 8 bits (octo = eight)
- Each octet can represent 0-255 (2^8 = 256 values)
- Separated by dots (dotted decimal notation)

**Key Facts:**
- Total address space: 2^32 = 4,294,967,296 addresses
- Format: X.X.X.X where X is 0-255
- All zeros (0.0.0.0) and all ones (255.255.255.255) are reserved
        `},{type:"network-vs-host",title:"Network vs Host Portions",content:`
Every IP address has two parts - but where's the dividing line?

**The Street Address Analogy:**
Think of an IP address like a street address:
- Network portion = Street name (shared by all houses)
- Host portion = House number (unique on that street)

**Example with /24 network (255.255.255.0):**
\`\`\`
192.168.1.100/24
│───────┘ └─┘
Network   Host
(Street) (House)
\`\`\`

**Different Subnet Masks = Different Divisions:**

**/8 (Class A):**
\`\`\`
10.1.2.3
│┘ └───┘
N    H
\`\`\`

**/16 (Class B):**
\`\`\`
172.16.5.10
│────┘ └──┘
  N      H
\`\`\`

**/24 (Class C):**
\`\`\`
192.168.1.50
│───────┘ └┘
    N      H
\`\`\`

The subnet mask determines this boundary!
        `},{type:"special-addresses",title:"Special IP Addresses",content:`
Not all IP addresses are created equal. Some have special meanings:

**Network Address (First Address):**
- All host bits are 0
- Identifies the network itself
- Cannot be assigned to a device
- Example: 192.168.1.0/24

**Broadcast Address (Last Address):**
- All host bits are 1
- Sends to all devices on the network
- Cannot be assigned to a device
- Example: 192.168.1.255/24

**Example for 192.168.1.0/24:**
\`\`\`
Network:     192.168.1.0    (00000000 host bits)
First Host:  192.168.1.1    (00000001)
...
Last Host:   192.168.1.254  (11111110)
Broadcast:   192.168.1.255  (11111111 host bits)
\`\`\`

**Other Special Addresses:**
- **127.0.0.0/8**: Loopback (localhost)
- **169.254.0.0/16**: Link-local (APIPA)
- **0.0.0.0/0**: Default route (all networks)
- **255.255.255.255**: Limited broadcast
        `},{type:"private-vs-public",title:"Private vs Public Addresses",content:`
IPv4 addresses are divided into public (internet-routable) and private (internal only) ranges.

**Private Address Ranges (RFC 1918):**
- **10.0.0.0/8** (10.0.0.0 - 10.255.255.255)
  - 16,777,216 addresses
  - Often used by large organizations
  
- **172.16.0.0/12** (172.16.0.0 - 172.31.255.255)
  - 1,048,576 addresses
  - Common in medium businesses
  
- **192.168.0.0/16** (192.168.0.0 - 192.168.255.255)
  - 65,536 addresses
  - Home routers use 192.168.1.0/24 or 192.168.0.0/24

**Why Private Addresses?**
- Not routable on the internet
- Can be reused in different networks
- Conserves public IP addresses
- NAT translates to public IPs

**Real-World Example:**
Your home network:
- Internal: Your PC has 192.168.1.100
- External: Your ISP assigns 74.125.224.72
- NAT handles the translation
        `},{type:"classful-legacy",title:"The Legacy of Classful Addressing",content:`
Before CIDR (1993), IP addresses were divided into rigid classes:

**Class A: /8 (255.0.0.0)**
- First octet: 1-126
- 126 networks, 16,777,214 hosts each
- Example: 10.0.0.0/8
- Problem: Way too many hosts!

**Class B: /16 (255.255.0.0)**
- First octet: 128-191
- 16,384 networks, 65,534 hosts each
- Example: 172.16.0.0/16
- Problem: Still too many hosts for most

**Class C: /24 (255.255.255.0)**
- First octet: 192-223
- 2,097,152 networks, 254 hosts each
- Example: 192.168.1.0/24
- Problem: Often too few hosts

**Why Classful Failed:**
- Rigid boundaries wasted addresses
- No flexibility for different sized networks
- Led to rapid IPv4 exhaustion

**CIDR to the Rescue:**
- Variable Length Subnet Masks (VLSM)
- Any mask length (/1 through /32)
- Right-sized networks
- Efficient address usage

Today, classful addressing is obsolete, but you'll still see its influence in default masks and private ranges!
        `},{type:"visual-breakdown",title:"Visual IP Breakdown",content:`
Let's visualize how different masks divide an IP address:

**192.168.10.50 with different masks:**

**/24 Mask (255.255.255.0):**
\`\`\`
IP: 192.168.10.50
Network: 192.168.10.0/24
Range: 192.168.10.0 - 192.168.10.255
50 falls in the single /24 network
\`\`\`

**/25 Mask (255.255.255.128):**
\`\`\`
IP: 192.168.10.50
Networks: 192.168.10.0/25 (0-127)
          192.168.10.128/25 (128-255)
50 falls in first network: 192.168.10.0/25
\`\`\`

**/26 Mask (255.255.255.192):**
\`\`\`
IP: 192.168.10.50
Networks: 192.168.10.0/26 (0-63)
          192.168.10.64/26 (64-127)
          192.168.10.128/26 (128-191)
          192.168.10.192/26 (192-255)
50 falls in first network: 192.168.10.0/26
\`\`\`

**/27 Mask (255.255.255.224):**
\`\`\`
IP: 192.168.10.50
Networks: 192.168.10.0/27 (0-31)
          192.168.10.32/27 (32-63)
          192.168.10.64/27 (64-95)
          ... and 5 more
50 falls in second network: 192.168.10.32/27
\`\`\`

**The Pattern:**
- Same IP, different mask = Different network membership
- Smaller masks = Larger networks (fewer divisions)
- Larger masks = Smaller networks (more divisions)
- The IP's network changes based on the mask boundaries
        `},{type:"interactive-tool",title:"Explore IP Structure",component:"NetworkCalculator"},{type:"summary",title:"IPv4 Mastery Unlocked!",content:`
You now understand:
- IPv4 addresses have 32 bits in 4 octets
- Network and host portions are divided by the subnet mask
- Special addresses (network, broadcast) can't be assigned
- Private ranges allow address reuse internally
- Classful addressing evolved into flexible CIDR

With this foundation, you're ready to start calculating subnets like a pro!

Next: Module 4 - CIDR Notation, where we'll master the modern way to write subnet masks.
        `}],practice:{title:"IPv4 Structure Practice",questions:[{question:"In the address 172.16.5.100/16, which octets represent the network portion?",hint:"/16 means the first 16 bits (2 octets)",answer:"The first two octets: 172.16"},{question:"What's the broadcast address for 192.168.1.0/24?",hint:"All host bits set to 1",answer:"192.168.1.255"},{question:"How many usable host addresses in a /24 network?",hint:"Total addresses minus network and broadcast",answer:"254 (256 total - 2 reserved = 254 usable)"},{question:"Is 172.20.0.0 a private or public address?",hint:"Check if it falls within RFC 1918 ranges",answer:"Private (falls within 172.16.0.0/12 range)"},{question:"Why can't you assign 10.1.1.0/24 to a computer?",hint:"What type of address has all host bits as 0?",answer:"It's the network address (all host bits are 0)"}],exercises:[{title:"Identify Address Components",instructions:"For each address, identify the network and host portions",problems:["Break down 10.20.30.40/8 into network and host portions","Break down 172.31.100.200/16 into network and host portions","Break down 192.168.50.75/24 into network and host portions","What changes in 192.168.1.100 when the mask changes from /24 to /25?"]}]},keyTakeaways:["IPv4 addresses have 32 bits arranged in 4 octets (X.X.X.X)","Each address has a network portion (street) and host portion (house number)","The subnet mask determines where the network/host boundary is","Network (first) and broadcast (last) addresses cannot be assigned to hosts","Private addresses (10/8, 172.16/12, 192.168/16) are for internal use only"]},4:{title:"CIDR Notation and the Mask Ladder",sections:[{type:"introduction",title:"The Evolution to CIDR",content:`
Remember the rigid classful system from Module 3? It was like having only three sizes of pizza - too small, too big, or way too big. CIDR (Classless Inter-Domain Routing) changed everything by letting us slice networks to any size we need.

CIDR notation is the modern, elegant way to write subnet masks. Instead of writing 255.255.255.0, we simply write /24. It's cleaner, faster, and universally understood.

**The Big Idea**: The number after the slash tells you how many bits are used for the network portion. The rest are for hosts.
        `},{type:"concept",title:"Understanding CIDR Notation",content:`
**What Does /24 Mean?**

The slash notation (/) indicates the number of network bits:
- /24 = 24 network bits, 8 host bits
- /16 = 16 network bits, 16 host bits
- /30 = 30 network bits, 2 host bits

**Quick Conversion Examples:**
\`\`\`
/8  = 255.0.0.0       = 11111111.00000000.00000000.00000000
/16 = 255.255.0.0     = 11111111.11111111.00000000.00000000
/24 = 255.255.255.0   = 11111111.11111111.11111111.00000000
/25 = 255.255.255.128 = 11111111.11111111.11111111.10000000
/32 = 255.255.255.255 = 11111111.11111111.11111111.11111111
\`\`\`

**The Pattern**: Each octet can have 0-8 bits set, giving us masks from /0 to /32.
        `},{type:"mask-ladder",title:"The Subnet Mask Ladder",content:`
**The Complete CIDR Mask Reference**

Here's the famous "mask ladder" - memorize the patterns and you'll subnet like a pro!

\`\`\`
CIDR | Decimal Mask      | Binary (Last Octet) | Hosts  | Networks
-----|-------------------|--------------------|---------|---------
/8   | 255.0.0.0        | 00000000           | 16.7M   | 1
/9   | 255.128.0.0      | 10000000           | 8.4M    | 2
/10  | 255.192.0.0      | 11000000           | 4.2M    | 4
/11  | 255.224.0.0      | 11100000           | 2.1M    | 8
/12  | 255.240.0.0      | 11110000           | 1M      | 16
/13  | 255.248.0.0      | 11111000           | 524K    | 32
/14  | 255.252.0.0      | 11111100           | 262K    | 64
/15  | 255.254.0.0      | 11111110           | 131K    | 128
/16  | 255.255.0.0      | 00000000           | 65,534  | 256
/17  | 255.255.128.0    | 10000000           | 32,766  | 512
/18  | 255.255.192.0    | 11000000           | 16,382  | 1K
/19  | 255.255.224.0    | 11100000           | 8,190   | 2K
/20  | 255.255.240.0    | 11110000           | 4,094   | 4K
/21  | 255.255.248.0    | 11111000           | 2,046   | 8K
/22  | 255.255.252.0    | 11111100           | 1,022   | 16K
/23  | 255.255.254.0    | 11111110           | 510     | 32K
/24  | 255.255.255.0    | 00000000           | 254     | 65K
/25  | 255.255.255.128  | 10000000           | 126     | 131K
/26  | 255.255.255.192  | 11000000           | 62      | 262K
/27  | 255.255.255.224  | 11100000           | 30      | 524K
/28  | 255.255.255.240  | 11110000           | 14      | 1M
/29  | 255.255.255.248  | 11111000           | 6       | 2M
/30  | 255.255.255.252  | 11111100           | 2       | 4M
/31  | 255.255.255.254  | 11111110           | 0*      | 8M
/32  | 255.255.255.255  | 11111111           | 0       | 16M
\`\`\`

**/31 is special**: Used for point-to-point links (RFC 3021)
        `},{type:"patterns",title:"Patterns in the Mask Ladder",content:`
**Key Patterns to Remember:**

**1. The Block Size Pattern**
Each mask creates subnets of a specific size:
- /24 = blocks of 256 addresses
- /25 = blocks of 128 addresses  
- /26 = blocks of 64 addresses
- /27 = blocks of 32 addresses
- /28 = blocks of 16 addresses
- /29 = blocks of 8 addresses
- /30 = blocks of 4 addresses

**2. The Doubling Pattern**
- Each bit you borrow doubles the number of subnets
- Each bit you borrow halves the number of hosts
- It's always a trade-off!

**3. The Octet Boundaries**
- /8, /16, /24 are "clean" boundaries (full octets)
- These are easiest to work with mentally
- Other masks require bit-level thinking

**4. Common Real-World Masks**
- /24: Standard LAN (254 hosts)
- /25-/26: Department-sized networks
- /27-/28: Small offices
- /29: Small segments (6 hosts)
- /30: Point-to-point links (2 hosts)
- /32: Single host (host route)
        `},{type:"quick-math",title:"Quick CIDR Math Tricks",content:`
**Finding Network Boundaries**

For any /n mask, networks start at multiples of the block size:

**/25 (block size 128):**
- Networks: .0, .128

**/26 (block size 64):**
- Networks: .0, .64, .128, .192

**/27 (block size 32):**
- Networks: .0, .32, .64, .96, .128, .160, .192, .224

**The Magic Formula:**
\`\`\`
Block Size = 2^(32 - mask_length)
Usable Hosts = Block Size - 2
\`\`\`

**Examples:**
- /28: Block = 2^(32-28) = 2^4 = 16
- /28: Hosts = 16 - 2 = 14

**Quick Host Counting:**
- /24 = 2^8 - 2 = 254 hosts
- /25 = 2^7 - 2 = 126 hosts
- /26 = 2^6 - 2 = 62 hosts
- /27 = 2^5 - 2 = 30 hosts
- /28 = 2^4 - 2 = 14 hosts
- /29 = 2^3 - 2 = 6 hosts
- /30 = 2^2 - 2 = 2 hosts
        `},{type:"real-world",title:"CIDR in Practice",content:`
**Scenario 1: Office Network Design**
You have 192.168.1.0/24 and need:
- Main office: 100 devices
- Branch office: 50 devices  
- Guest WiFi: 25 devices
- Servers: 10 devices

**Solution using CIDR:**
- Main: 192.168.1.0/25 (126 hosts) ✓
- Branch: 192.168.1.128/26 (62 hosts) ✓
- Guest: 192.168.1.192/27 (30 hosts) ✓
- Servers: 192.168.1.224/28 (14 hosts) ✓

**Scenario 2: ISP Address Allocation**
ISP has 10.0.0.0/8 and needs to allocate:
- Large customer: 65,000 addresses → /16
- Medium customer: 1,000 addresses → /22
- Small customer: 250 addresses → /24

**Allocation:**
- Large: 10.1.0.0/16 (65,534 hosts)
- Medium: 10.2.0.0/22 (1,022 hosts)
- Small: 10.2.4.0/24 (254 hosts)

**Scenario 3: Point-to-Point Links**
Connecting routers needs only 2 addresses:
- Old way: Waste a /24 (254 addresses)
- CIDR way: Use /30 (2 usable addresses)
- Modern way: Use /31 (both addresses usable)
        `},{type:"interactive-tool",title:"CIDR Calculator",component:"NetworkCalculator"},{type:"common-mistakes",title:"CIDR Pitfalls to Avoid",content:`
**Mistake 1: Forgetting the -2**
- /24 has 256 addresses, but only 254 usable
- Always subtract network and broadcast addresses
- Exception: /31 and /32 have special rules

**Mistake 2: Overlapping Subnets**
\`\`\`
Wrong:
10.0.0.0/25 (10.0.0.0 - 10.0.0.127)
10.0.0.64/26 (10.0.0.64 - 10.0.0.127) ← Overlaps!

Right:
10.0.0.0/25 (10.0.0.0 - 10.0.0.127)
10.0.0.128/26 (10.0.0.128 - 10.0.0.191)
\`\`\`

**Mistake 3: Wrong Block Boundaries**
- 192.168.1.50/27 is INVALID
- /27 blocks start at 0, 32, 64, 96, 128, 160, 192, 224
- Must use 192.168.1.32/27 or 192.168.1.64/27

**Mistake 4: Mixing Notation**
- Don't write "192.168.1.0/255.255.255.0"
- Use either CIDR (/24) or dotted decimal
- CIDR is preferred in modern networking
        `},{type:"summary",title:"CIDR Mastery Achieved!",content:`
You now understand:
- CIDR notation represents network bits with /n
- The mask ladder shows all possible subnet masks
- Each mask creates specific block sizes
- Networks must align on block boundaries
- Quick math tricks for finding hosts and networks

CIDR gave us the flexibility to right-size every network. No more waste, no more rigid classes - just efficient, scalable networking.

**Pro tip**: Print the mask ladder and keep it handy. With practice, you'll memorize the common masks (/24, /25, /26, /27, /28, /29, /30) and their properties.

Next: Module 5 - Subnet Calculations, where we'll put CIDR to work solving real subnet problems!
        `}],practice:{title:"CIDR Notation Practice",questions:[{question:"What subnet mask does /26 represent?",hint:"26 bits set to 1, starting from the left",answer:"255.255.255.192 (11111111.11111111.11111111.11000000)"},{question:"How many usable host addresses in a /28 network?",hint:"32 - 28 = 4 bits for hosts. Remember to subtract 2!",answer:"14 hosts (2^4 - 2 = 16 - 2 = 14)"},{question:"What CIDR notation represents subnet mask 255.255.248.0?",hint:"Count the consecutive 1s from the left",answer:"/21 (8 + 8 + 5 = 21 bits)"},{question:"What are the valid network addresses for /26 subnets in 172.16.1.0/24?",hint:"/26 has block size of 64",answer:"172.16.1.0, 172.16.1.64, 172.16.1.128, 172.16.1.192"},{question:"Why would you choose /30 for a point-to-point link?",hint:"How many hosts do you need between two routers?",answer:"It provides exactly 2 usable addresses, perfect for connecting two routers without waste"}],exercises:[{title:"CIDR Conversion Practice",instructions:"Convert between CIDR and decimal notation",problems:["Convert to CIDR: 255.255.255.128, 255.255.224.0, 255.252.0.0","Convert to decimal: /27, /20, /14, /30","List all /27 networks in 10.1.1.0/24","Calculate hosts per subnet for: /23, /25, /28, /29"]},{title:"Network Planning with CIDR",instructions:"Use CIDR to solve these network design problems",problems:["You have 172.16.0.0/16. Divide it into 4 equal subnets. What mask?","Need 500 hosts per subnet. What's the smallest mask you can use?","Design: 192.168.10.0/24 for 3 departments (120, 60, 25 hosts)","How many /29 subnets fit in a /24? How many hosts total?"]}]},keyTakeaways:["CIDR notation (/n) indicates the number of network bits","Each CIDR mask creates subnets of a specific block size","Networks must start on block boundaries (multiples of block size)","The mask ladder is your reference for all CIDR calculations","Common masks: /24 (254 hosts), /25 (126), /26 (62), /27 (30), /28 (14), /29 (6), /30 (2)"]},5:{title:"Subnet Calculations",sections:[{type:"introduction",title:"Putting It All Together",content:`
You've learned binary, the AND operation, IP structure, and CIDR notation. Now it's time to combine these skills and become a subnet calculation master!

Subnet calculations are the bread and butter of network engineering. Whether you're troubleshooting connectivity, designing a network, or taking a certification exam, these calculations are essential.

**The Core Questions We'll Answer:**
- What's the network address?
- What's the broadcast address?
- What's the usable host range?
- How many hosts can this subnet support?
- Is this IP in the same subnet as that IP?
        `},{type:"method",title:"The Universal Subnet Formula",content:`
**The 5-Step Process for Any Subnet Calculation:**

**Step 1: Convert CIDR to Binary Mask**
- /24 → 11111111.11111111.11111111.00000000
- Count the 1s to verify

**Step 2: Find the Block Size**
- Look at the last octet with both 1s and 0s
- Block size = 256 - decimal value of that octet
- Or use: Block size = 2^(host bits)

**Step 3: Find Network Address**
- IP AND Mask = Network
- Or find the block boundary below the IP

**Step 4: Find Broadcast Address**
- Network + Block Size - 1 = Broadcast
- All host bits set to 1

**Step 5: Find Usable Range**
- First Host = Network + 1
- Last Host = Broadcast - 1
- Total Hosts = Block Size - 2
        `},{type:"example-walkthrough",title:"Complete Example: 192.168.50.130/26",content:`
Let's work through a complete example step by step:

**Given:** 192.168.50.130/26

**Step 1: Convert /26 to Binary**
\`\`\`
/26 = 26 ones, 6 zeros
11111111.11111111.11111111.11000000
= 255.255.255.192
\`\`\`

**Step 2: Find Block Size**
\`\`\`
Last octet: 11000000 = 192
Block size = 256 - 192 = 64
Or: 2^6 = 64 (6 host bits)
\`\`\`

**Step 3: Find Network Address**
\`\`\`
/26 networks start at: 0, 64, 128, 192...
130 is between 128 and 192
Network: 192.168.50.128
\`\`\`

**Step 4: Find Broadcast**
\`\`\`
Network + Block Size - 1
128 + 64 - 1 = 191
Broadcast: 192.168.50.191
\`\`\`

**Step 5: Usable Range**
\`\`\`
First Host: 192.168.50.129
Last Host: 192.168.50.190
Total Hosts: 64 - 2 = 62
\`\`\`

**Summary for 192.168.50.130/26:**
- Network: 192.168.50.128
- Broadcast: 192.168.50.191
- Usable: 192.168.50.129 - 192.168.50.190
- Hosts: 62
        `},{type:"quick-methods",title:"Speed Tricks for Common Masks",content:`
**For /24, /16, /8 (Clean Boundaries):**
- Super easy - just zero out the host octets
- 172.16.50.100/16 → Network: 172.16.0.0
- Broadcast: Set host octets to 255
- 172.16.50.100/16 → Broadcast: 172.16.255.255

**For /25 (Half Networks):**
- Two networks: .0 and .128
- If IP < 128: Network = .0, Broadcast = .127
- If IP ≥ 128: Network = .128, Broadcast = .255

**For /26 (Quarter Networks):**
- Four networks: .0, .64, .128, .192
- Find which quarter your IP is in
- Add 63 for broadcast

**For /27 (Eighth Networks):**
- Eight networks: .0, .32, .64, .96, .128, .160, .192, .224
- Find which eighth, add 31 for broadcast

**The Pattern:**
- /25: Count by 128 (2 subnets)
- /26: Count by 64 (4 subnets)
- /27: Count by 32 (8 subnets)
- /28: Count by 16 (16 subnets)
- /29: Count by 8 (32 subnets)
- /30: Count by 4 (64 subnets)
        `},{type:"interactive-tool",title:"Subnet Calculator",component:"NetworkCalculator"},{type:"same-network",title:"Are These IPs in the Same Network?",content:`
**The Same-Network Test:**

To check if two IPs are in the same subnet:
1. Calculate the network address for each
2. If they match, they're in the same subnet
3. If different, they need a router to communicate

**Example 1: Can they talk directly?**
- Host A: 192.168.1.50/24
- Host B: 192.168.1.200/24

\`\`\`
Host A network: 192.168.1.0
Host B network: 192.168.1.0
Same network? YES ✓
\`\`\`

**Example 2: Can they talk directly?**
- Host A: 10.0.5.100/25
- Host B: 10.0.5.200/25

\`\`\`
Host A: 10.0.5.100 → Network: 10.0.5.0 (0-127)
Host B: 10.0.5.200 → Network: 10.0.5.128 (128-255)
Same network? NO ✗ (need router)
\`\`\`

**Example 3: Tricky one!**
- Host A: 172.16.100.50/22
- Host B: 172.16.99.200/22

\`\`\`
/22 = 255.255.252.0 (block size in 3rd octet = 4)
Host A: 172.16.100.x → Network: 172.16.100.0
Host B: 172.16.99.x → Network: 172.16.96.0
Same network? NO ✗
\`\`\`

**Remember:** The subnet mask determines the network boundary, not our human assumptions!
        `},{type:"variable-masks",title:"Working with Non-Octet Boundaries",content:`
When the mask doesn't fall on an octet boundary (/8, /16, /24), calculations get trickier:

**Example: 10.50.100.200/20**

**Step 1: Identify the "Interesting Octet"**
\`\`\`
/20 = 255.255.240.0
Third octet (240) is interesting
\`\`\`

**Step 2: Calculate Block Size**
\`\`\`
256 - 240 = 16
Networks increment by 16 in 3rd octet
\`\`\`

**Step 3: Find Network**
\`\`\`
3rd octet = 100
100 ÷ 16 = 6 remainder 4
Network starts at: 6 × 16 = 96
Network: 10.50.96.0/20
\`\`\`

**Step 4: Find Broadcast**
\`\`\`
Next network: 10.50.112.0
Broadcast: 10.50.111.255
\`\`\`

**Step 5: Summary**
\`\`\`
Network: 10.50.96.0
First Host: 10.50.96.1
Last Host: 10.50.111.254
Broadcast: 10.50.111.255
Hosts: 4094 (16 × 256 - 2)
\`\`\`

**Pro Tip:** The "interesting octet" is where the binary mask changes from 1s to 0s!
        `},{type:"practice-problems",title:"Guided Practice Problems",content:`
**Problem 1: 192.168.200.139/28**

Try it yourself first, then check the solution below.

**Solution:**
\`\`\`
/28 = 255.255.255.240
Block size = 16
139 ÷ 16 = 8 remainder 11
Network: 192.168.200.128
Broadcast: 192.168.200.143
Usable: .129 - .142 (14 hosts)
\`\`\`

**Problem 2: 172.31.80.201/21**

**Solution:**
\`\`\`
/21 = 255.255.248.0
Block size in 3rd octet = 8
80 ÷ 8 = 10 remainder 0
Network: 172.31.80.0
Broadcast: 172.31.87.255
Usable: 172.31.80.1 - 172.31.87.254 (2046 hosts)
\`\`\`

**Problem 3: Are 10.1.100.50/23 and 10.1.101.200/23 in the same subnet?**

**Solution:**
\`\`\`
/23 = 255.255.254.0
Block size in 3rd octet = 2
100 ÷ 2 = 50 (even) → Network: 10.1.100.0
101 ÷ 2 = 50 remainder 1 → Network: 10.1.100.0
Same network? YES ✓
\`\`\`
        `},{type:"common-exam-questions",title:"Exam-Style Questions",content:`
**Question Types You'll See:**

**1. "What is the valid host range?"**
- Calculate network and broadcast
- First host = Network + 1
- Last host = Broadcast - 1

**2. "Which subnet does this IP belong to?"**
- Find the network address using block size
- That's your answer!

**3. "How many subnets and hosts?"**
- Subnets = 2^(borrowed bits)
- Hosts per subnet = 2^(host bits) - 2

**4. "What is the next subnet?"**
- Current network + block size = Next network

**5. "Is this a valid host address?"**
- Cannot be network address (all host bits = 0)
- Cannot be broadcast (all host bits = 1)
- Must be within valid range

**Time-Saving Tip:** Memorize powers of 2 up to 2^10 (1024) for quick calculations!
        `},{type:"troubleshooting",title:"Real-World Troubleshooting",content:`
**Scenario: "I can't ping the server!"**

Your IP: 192.168.1.100/25
Server: 192.168.1.200/24

**Investigation:**
\`\`\`
Your network: 192.168.1.0/25 (0-127)
Your view: Server is in different subnet!

Server network: 192.168.1.0/24 (0-255)
Server view: You're in the same subnet!
\`\`\`

**Problem:** Mismatched subnet masks!
- You think server is in different network
- Server thinks you're in same network
- Result: Asymmetric routing issues

**Solution:** Fix subnet masks to match

**Lesson:** Always verify subnet masks match on all devices in the same network segment!
        `},{type:"summary",title:"Subnet Calculation Mastery!",content:`
You can now:
- Calculate any network and broadcast address
- Find usable host ranges quickly
- Determine if IPs are in the same subnet
- Work with any subnet mask (/8 to /30)
- Troubleshoot subnet mask mismatches

**Your Calculation Toolkit:**
1. Block size method for quick math
2. Binary AND for verification
3. Powers of 2 for host counting
4. Boundary checking for network membership

**Remember:** Practice makes perfect. The more calculations you do, the faster you'll become. Soon, you'll be doing /24 and /25 calculations in your head!

Next: Module 6 - VLSM Design, where we'll create efficient, scalable networks!
        `}],practice:{title:"Subnet Calculation Practice",questions:[{question:"What is the network address for 192.168.75.150/27?",hint:"/27 has block size 32. Which multiple of 32 is 150 closest to?",answer:"192.168.75.128 (150 falls in the range 128-159)"},{question:"What is the broadcast address for 10.10.10.100/28?",hint:"Find the network first, then add block size minus 1",answer:"10.10.10.111 (Network is 10.10.10.96, block size 16, so 96+15=111)"},{question:"How many usable hosts in 172.16.0.0/22?",hint:"/22 means 10 host bits. Remember to subtract 2!",answer:"1022 hosts (2^10 - 2 = 1024 - 2 = 1022)"},{question:"Are 192.168.1.50/26 and 192.168.1.100/26 in the same subnet?",hint:"/26 divides the last octet into 4 parts",answer:"No. 50 is in 192.168.1.0/26 (0-63), 100 is in 192.168.1.64/26 (64-127)"},{question:"What's the last usable host in 10.20.30.0/29?",hint:"Find broadcast, then subtract 1",answer:"10.20.30.6 (Broadcast is .7, last host is .6)"}],exercises:[{title:"Complete Subnet Analysis",instructions:"For each IP/mask, find network, broadcast, first host, last host, and total hosts",problems:["Calculate all values for: 192.168.100.100/25","Calculate all values for: 10.50.75.200/20","Calculate all values for: 172.20.150.45/30","Calculate all values for: 192.168.1.1/32"]},{title:"Same Network Challenge",instructions:"Determine if these IP pairs can communicate without a router",problems:["10.0.0.50/24 and 10.0.0.200/24","172.16.50.100/23 and 172.16.51.200/23","192.168.1.126/25 and 192.168.1.130/25","10.10.10.10/30 and 10.10.10.11/30"]}]},keyTakeaways:["The 5-step process works for any subnet calculation","Block size is key - it determines network boundaries","Network address = IP AND Mask (or find the block boundary)","Broadcast = Network + Block Size - 1","Usable hosts = First Host (.1) to Last Host (broadcast - 1)","Same subnet mask ≠ same network - check the boundaries!"]},6:{title:"VLSM Design and Implementation",sections:[{type:"introduction",title:"The Art of Efficient Network Design",content:`
Remember the old classful days? You'd get a Class C (/24) network with 254 hosts, even if you only needed 10. That's like buying a bus when you need a car!

VLSM (Variable Length Subnet Masking) lets you create different-sized subnets from a single network block. It's the key to efficient, scalable network design.

**Why VLSM Matters:**
- Prevents IP address waste
- Allows right-sized subnets
- Enables hierarchical network design
- Required for modern routing protocols (OSPF, EIGRP)
- Essential for IPv4 conservation
        `},{type:"concept",title:"VLSM Fundamentals",content:`
**The Golden Rules of VLSM:**

**Rule 1: Largest First**
Always allocate subnets from largest to smallest. This prevents fragmentation and ensures all subnets fit.

**Rule 2: Powers of 2**
Subnet sizes must be powers of 2 (2, 4, 8, 16, 32, 64, 128, 256...).

**Rule 3: Boundary Alignment**
Subnets must start on their natural boundaries:
- /25 subnets start at .0 or .128
- /26 subnets start at .0, .64, .128, or .192
- /27 subnets start at multiples of 32

**Rule 4: No Overlaps**
Once you allocate an address range, it's taken. No overlapping allowed!

**Rule 5: Document Everything**
Keep a subnet allocation table. Your future self will thank you.
        `},{type:"methodology",title:"The VLSM Design Process",content:`
**Step-by-Step VLSM Design:**

**Step 1: List Requirements**
- Identify all subnets needed
- Count hosts for each subnet
- Add growth margin (usually 20-50%)

**Step 2: Calculate Subnet Sizes**
- Round up to nearest power of 2
- Add 2 for network/broadcast
- Determine required mask

**Step 3: Order by Size**
- Sort subnets largest to smallest
- This is critical for success!

**Step 4: Allocate Sequentially**
- Start with your given network
- Assign largest subnet first
- Continue with next largest
- Track used/available space

**Step 5: Verify and Document**
- Check for overlaps
- Verify all subnets fit
- Create allocation table
        `},{type:"example-scenario",title:"Complete VLSM Example: Small Business Network",content:`
**Scenario:** Design network for 192.168.1.0/24

**Requirements:**
- Sales: 50 hosts
- Engineering: 25 hosts
- Management: 10 hosts
- Server Room: 10 hosts
- Link to ISP: 2 hosts
- Link to Branch: 2 hosts

**Step 1: Calculate Sizes with Growth**
\`\`\`
Sales: 50 + growth → 60 hosts → 64 addresses (/26)
Engineering: 25 + growth → 30 hosts → 32 addresses (/27)
Management: 10 + growth → 14 hosts → 16 addresses (/28)
Servers: 10 + growth → 14 hosts → 16 addresses (/28)
ISP Link: 2 hosts → 4 addresses (/30)
Branch Link: 2 hosts → 4 addresses (/30)
\`\`\`

**Step 2: Order by Size**
1. Sales: /26 (64 addresses)
2. Engineering: /27 (32 addresses)
3. Management: /28 (16 addresses)
4. Servers: /28 (16 addresses)
5. ISP Link: /30 (4 addresses)
6. Branch Link: /30 (4 addresses)

**Step 3: Allocate Subnets**
\`\`\`
Sales: 192.168.1.0/26 (0-63)
Engineering: 192.168.1.64/27 (64-95)
Management: 192.168.1.96/28 (96-111)
Servers: 192.168.1.112/28 (112-127)
ISP Link: 192.168.1.128/30 (128-131)
Branch Link: 192.168.1.132/30 (132-135)

Unused: 192.168.1.136/29 (136-143)
        192.168.1.144/28 (144-159)
        192.168.1.160/27 (160-191)
        192.168.1.192/26 (192-255)
\`\`\`

**Result:** Efficient use with room for 4 more subnets!
        `},{type:"visual-allocation",title:"Visualizing VLSM Allocation",content:`
**Visual Block Diagram of Our Example:**

\`\`\`
192.168.1.0/24 (256 addresses)
├── 0-63:    Sales (/26) ████████████████
├── 64-95:   Engineering (/27) ████████
├── 96-111:  Management (/28) ████
├── 112-127: Servers (/28) ████
├── 128-131: ISP Link (/30) █
├── 132-135: Branch Link (/30) █
└── 136-255: Available (120 addresses) ░░░░░░░░░░░░░░░░░░░░░░░░░░░░
\`\`\`

**Key Observations:**
- Largest subnets allocated first
- No wasted space between allocations
- Plenty of room for growth
- Easy to visualize and understand
        `},{type:"complex-scenario",title:"Enterprise VLSM Design",content:`
**Scenario:** Regional office with 10.10.0.0/16

**Requirements:**
- Headquarters: 2000 hosts
- Manufacturing: 1000 hosts
- Sales Floor: 500 hosts
- R&D Lab: 250 hosts
- Guest WiFi: 200 hosts
- DMZ Servers: 50 hosts
- Management: 25 hosts
- 10 Point-to-point links

**Solution Process:**

**1. Calculate Masks:**
\`\`\`
HQ: 2000 → 2048 → /21 (2046 hosts)
Mfg: 1000 → 1024 → /22 (1022 hosts)
Sales: 500 → 512 → /23 (510 hosts)
R&D: 250 → 256 → /24 (254 hosts)
Guest: 200 → 256 → /24 (254 hosts)
DMZ: 50 → 64 → /26 (62 hosts)
Mgmt: 25 → 32 → /27 (30 hosts)
Links: 10 × /30 (2 hosts each)
\`\`\`

**2. Allocation Table:**
\`\`\`
10.10.0.0/21   - Headquarters (0.0-7.255)
10.10.8.0/22   - Manufacturing (8.0-11.255)
10.10.12.0/23  - Sales Floor (12.0-13.255)
10.10.14.0/24  - R&D Lab
10.10.15.0/24  - Guest WiFi
10.10.16.0/26  - DMZ Servers
10.10.16.64/27 - Management
10.10.16.96/30 - Link 1
10.10.16.100/30 - Link 2
... (continuing for all links)
\`\`\`

**Summary:** Used only 10.10.0.0 - 10.10.16.135, leaving 10.10.16.136 - 10.10.255.255 available!
        `},{type:"interactive-tool",title:"VLSM Calculator",component:"NetworkCalculator"},{type:"common-mistakes",title:"VLSM Pitfalls to Avoid",content:`
**Mistake 1: Not Sorting by Size**
\`\`\`
Wrong: Allocating randomly
/24, /30, /26, /28... ❌ Creates gaps!

Right: Largest to smallest
/24, /26, /28, /30... ✓ Efficient packing
\`\`\`

**Mistake 2: Forgetting Growth**
- Current need: 50 hosts
- Allocate: /26 (62 hosts) ❌ No room!
- Better: /25 (126 hosts) ✓ Room to grow

**Mistake 3: Wrong Boundaries**
\`\`\`
Wrong: 192.168.1.50/27 ❌ Invalid start
Right: 192.168.1.32/27 ✓ Correct boundary
\`\`\`

**Mistake 4: Overlapping Subnets**
- Always check your math
- Use a subnet calculator to verify
- Keep detailed documentation

**Mistake 5: Wasting Point-to-Point Links**
- Don't use /24 for router links!
- Use /30 (or /31 for modern equipment)
- Save addresses for host subnets
        `},{type:"best-practices",title:"VLSM Best Practices",content:`
**1. Planning Standards**
- Always add 20-50% growth margin
- Reserve space for future subnets
- Group related subnets together
- Use consistent naming schemes

**2. Documentation Template**
\`\`\`
Subnet Name: [Department/Purpose]
Network: [Network Address]/[Mask]
Range: [First IP] - [Last IP]
Gateway: [Usually first or last host]
VLAN: [VLAN ID if applicable]
Purpose: [Detailed description]
Allocated: [Date]
\`\`\`

**3. Address Hierarchy**
\`\`\`
10.0.0.0/8 - Enterprise
├── 10.1.0.0/16 - Region 1
│   ├── 10.1.0.0/24 - Site A
│   └── 10.1.1.0/24 - Site B
└── 10.2.0.0/16 - Region 2
    ├── 10.2.0.0/24 - Site C
    └── 10.2.1.0/24 - Site D
\`\`\`

**4. Special Allocations**
- Reserve .1 for gateways
- Reserve last /24 for network infrastructure
- Keep management subnets separate
- Plan for summarization

**5. Tools and Verification**
- Use subnet calculators
- Verify with 'show ip route'
- Test with ping/traceroute
- Monitor utilization
        `},{type:"real-world-tips",title:"Tips from the Field",content:`
**Common Wisdom from the Field:**

These are typical practices and advice you'll hear from experienced network engineers:

**Always Leave Room**
Best practice: Allocate only 50% of available space initially. Networks grow faster than expected, and you'll need room for new subnets.

**Document Everything**
A VLSM design without documentation is a time bomb. Future engineers (including yourself) need to understand the allocation logic.

**Think in Blocks**
Visualize subnets as blocks that must fit together like Tetris pieces. Always place largest blocks first to avoid fragmentation.

**Plan for Summarization**
Good VLSM design enables efficient route summarization. Keep geographic regions and departments in contiguous address blocks.

**Test Before Production**
Always validate your design in a lab or with subnet calculators. Check for overlaps, verify routing, and test growth scenarios.
        `},{type:"summary",title:"VLSM Mastery Achieved!",content:`
You now have the skills to:
- Design efficient multi-subnet networks
- Allocate addresses without waste
- Plan for growth and changes
- Avoid common VLSM mistakes
- Document designs professionally

**Your VLSM Toolkit:**
1. Requirements gathering template
2. Largest-first allocation method
3. Boundary alignment rules
4. Documentation standards
5. Verification procedures

**Remember:** VLSM is about efficient resource use. Every saved address matters in our IPv4-constrained world!

Next: Module 7 - Routing and Subnets, where we'll see how routers use our subnet designs!
        `}],practice:{title:"VLSM Design Practice",questions:[{question:"You have 172.16.1.0/24. Which subnet should you allocate first: 30 hosts or 60 hosts?",hint:"Remember the largest-first rule",answer:"60 hosts first. Allocate 172.16.1.0/26 (64 addresses), then 172.16.1.64/27 (32 addresses) for the 30 hosts."},{question:"How many /30 subnets can you create from a /27 network?",hint:"/27 has 32 addresses, /30 has 4 addresses",answer:"8 subnets (/27 = 32 addresses, /30 = 4 addresses, 32÷4 = 8)"},{question:"What's wrong with this allocation: 10.1.1.0/26, then 10.1.1.32/27?",hint:"Check the ranges for overlap",answer:"Overlap! /26 uses 0-63, but the /27 starts at 32. The /27 should start at 64."},{question:"You need subnets for 100, 50, and 25 hosts from 192.168.10.0/24. What masks?",hint:"Round up to powers of 2, add 2 for network/broadcast",answer:"/25 for 100 hosts (128 addresses), /26 for 50 hosts (64 addresses), /27 for 25 hosts (32 addresses)"},{question:"Why is documentation critical in VLSM?",hint:"Think about troubleshooting and future changes",answer:"Without documentation, it's nearly impossible to know which addresses are allocated, available, or reserved. This leads to conflicts and inefficient use."}],exercises:[{title:"VLSM Design Challenge",instructions:"Design a complete VLSM scheme for these scenarios",problems:["Design for 192.168.100.0/24: Admin (25), Sales (50), Guest (15), 3 router links","Design for 10.50.0.0/22: Building A (200), Building B (150), Building C (100), DMZ (25)","Design for 172.20.0.0/23: Main Office (120), Branch 1 (60), Branch 2 (40), 5 WAN links","Create a growth plan: Current 192.168.1.0/24 with 3 subnets, expect to double in 2 years"]},{title:"VLSM Troubleshooting",instructions:"Find and fix the problems in these VLSM designs",problems:["Overlapping subnets: 10.1.0.0/25 and 10.1.0.64/26 - what's wrong?","Inefficient design: /24 for 5 hosts, /30 for 100 hosts - how to fix?","Can't add new subnet: Used /24, /25, /26 randomly - why is space fragmented?","Route summarization broken: Sites at 10.1.1.0/24, 10.1.5.0/24, 10.1.3.0/24 - better design?"]}]},keyTakeaways:["VLSM allows different-sized subnets from one network block","Always allocate from largest to smallest subnet","Subnets must align on proper boundaries (powers of 2)","Good documentation is essential for VLSM success","Plan for 20-50% growth to avoid future problems","Efficient VLSM design conserves precious IPv4 addresses"]},7:{title:"Routing and Subnets",sections:[{type:"introduction",title:"How Routers Use Your Subnet Design",content:`
You've mastered subnet calculations and VLSM design. But how do routers actually use this information? Understanding routing is the bridge between subnet theory and real-world networking.

Routers are like smart postal workers - they look at destination addresses and decide the best path for delivery. Your subnet design directly impacts how efficiently they can do their job.

**What You'll Learn:**
- How routers make forwarding decisions
- The relationship between subnets and routing tables
- Route summarization for efficiency
- How subnet design affects network performance
- Common routing protocols and subnets
        `},{type:"concept",title:"Routing Fundamentals",content:`
**How Routers Think:**

**1. Destination-Based Forwarding**
Routers don't care about source addresses for forwarding. They only look at where packets are going.

**2. Longest Match Wins**
When multiple routes match, the most specific (longest prefix) wins:
\`\`\`
10.1.1.0/24 (more specific) beats
10.1.0.0/16 (less specific) beats  
10.0.0.0/8  (least specific)
\`\`\`

**3. The Routing Table**
A router's brain - contains:
- Destination networks
- Next-hop addresses
- Exit interfaces
- Metrics (distance/cost)

**4. Connected vs Remote**
- Connected: Subnets directly attached to router interfaces
- Remote: Subnets learned via routing protocols or static routes

**5. The Forwarding Process**
1. Packet arrives
2. Extract destination IP
3. Search routing table for match
4. Use longest match if multiple
5. Forward to next-hop or drop
        `},{type:"routing-table",title:"Understanding Routing Tables",content:`
**Sample Routing Table:**
\`\`\`
C    192.168.1.0/24  is directly connected, GigabitEthernet0/0
C    192.168.2.0/24  is directly connected, GigabitEthernet0/1
S    192.168.3.0/24  [1/0] via 192.168.2.2
O    10.0.0.0/8      [110/10] via 192.168.1.254
S    0.0.0.0/0       [1/0] via 203.0.113.1
\`\`\`

**Reading the Table:**
- **C** = Connected (directly attached subnet)
- **S** = Static (manually configured route)
- **O** = OSPF (dynamically learned route)
- **[110/10]** = [Administrative Distance/Metric]
- **via** = Next-hop IP address

**How Subnets Appear:**
\`\`\`
# Your subnet design becomes routing entries:
Subnet Design:           Routing Table:
192.168.1.0/26    →     C  192.168.1.0/26
192.168.1.64/26   →     C  192.168.1.64/26
192.168.1.128/25  →     C  192.168.1.128/25
\`\`\`

**The router knows exactly which interface serves each subnet!**
        `},{type:"route-summarization",title:"Route Summarization Magic",content:`
**What is Route Summarization?**

Combining multiple smaller routes into one larger route. It's like saying "all houses on Elm Street" instead of listing each house number.

**Example: Summarizing Four Subnets**
\`\`\`
Detailed Routes:
172.16.0.0/24
172.16.1.0/24
172.16.2.0/24
172.16.3.0/24

Summarized Route:
172.16.0.0/22 (covers all four!)
\`\`\`

**How to Find the Summary:**
1. Convert to binary
2. Find common bits from left
3. Count common bits for mask
4. Set remaining bits to 0

**Binary Analysis:**
\`\`\`
172.16.0.0  = 10101100.00010000.00000000.00000000
172.16.1.0  = 10101100.00010000.00000001.00000000
172.16.2.0  = 10101100.00010000.00000010.00000000
172.16.3.0  = 10101100.00010000.00000011.00000000
                                  ↑
Common bits: 22 (stops here)
Summary: 172.16.0.0/22
\`\`\`

**Benefits:**
- Smaller routing tables
- Faster lookups
- Less memory usage
- Reduced routing updates
- Better scalability
        `},{type:"interactive-tool",title:"Route Calculator",component:"NetworkCalculator"},{type:"subnet-routing-relationship",title:"How Subnet Design Affects Routing",content:`
**Good Design = Efficient Routing**

**Scenario 1: Hierarchical Design (Good)**

\`\`\`
Region 1: 10.1.0.0/16
├── Site A: 10.1.0.0/24
├── Site B: 10.1.1.0/24
└── Site C: 10.1.2.0/24

Region 2: 10.2.0.0/16
├── Site D: 10.2.0.0/24
├── Site E: 10.2.1.0/24
└── Site F: 10.2.2.0/24
\`\`\`

**Result:** Can advertise just 10.1.0.0/16 and 10.2.0.0/16!

**Scenario 2: Random Design (Bad)**
\`\`\`
Site A: 10.1.0.0/24
Site B: 10.5.7.0/24
Site C: 10.2.15.0/24
Site D: 10.9.3.0/24
Site E: 10.3.22.0/24
Site F: 10.7.18.0/24
\`\`\`

**Result:** Must advertise all 6 routes individually!

**Impact on Routing:**
- Good design: 2 routes in core routing table
- Bad design: 6 routes in core routing table
- 3x more memory, processing, and updates!
        `},{type:"routing-decisions",title:"Router Decision Examples",content:`
**Example 1: Where Does This Packet Go?**

Packet destination: 192.168.1.100

\`\`\`
Routing Table:
192.168.1.0/24   via 10.0.0.2
192.168.1.0/25   via 10.0.0.3
192.168.0.0/16   via 10.0.0.4
0.0.0.0/0        via 10.0.0.1
\`\`\`

**Router's Decision Process:**
1. Does 192.168.1.100 match 192.168.1.0/24? YES ✓
2. Does 192.168.1.100 match 192.168.1.0/25? YES ✓
3. Does 192.168.1.100 match 192.168.0.0/16? YES ✓
4. Does 192.168.1.100 match 0.0.0.0/0? YES ✓

**Winner: 192.168.1.0/25** (longest match - /25 beats /24 beats /16 beats /0)
**Forward to: 10.0.0.3**

**Example 2: No Specific Route**

Packet destination: 8.8.8.8

\`\`\`
Routing Table:
192.168.1.0/24   via 10.0.0.2
10.0.0.0/8       via 10.0.0.3
0.0.0.0/0        via 10.0.0.1
\`\`\`

**Decision:** Only 0.0.0.0/0 matches → Forward to 10.0.0.1 (default gateway)
        `},{type:"routing-protocols",title:"Routing Protocols and Subnets",content:`
**How Different Protocols Handle Subnets:**

**RIP (Routing Information Protocol)**
- Classful by default (RIPv1)
- RIPv2 supports VLSM
- Advertises all known subnets
- Limited to 15 hops

**OSPF (Open Shortest Path First)**
- Full VLSM support
- Understands subnet masks
- Can summarize at area boundaries
- Scales to large networks

**EIGRP (Enhanced Interior Gateway Routing Protocol)**
- Full VLSM support
- Automatic summarization (can be disabled)
- Very efficient updates
- Cisco proprietary

**BGP (Border Gateway Protocol)**
- Internet's routing protocol
- Full CIDR support
- Aggregates routes for efficiency
- Policy-based routing

**Static Routing**
- Manual subnet configuration
- No automatic updates
- Perfect for small, stable networks
- You control every route

**Important:** Modern protocols (OSPF, EIGRP, BGP) understand VLSM. Old protocols (RIPv1) don't!
        `},{type:"troubleshooting-routing",title:"Troubleshooting Subnet Routing Issues",content:`
**Common Problems and Solutions:**

**Problem 1: Asymmetric Routing**
\`\`\`
Host A: 192.168.1.10/24
Host B: 192.168.1.200/25

A → B: Works (B is in A's subnet)
B → A: Fails (A is not in B's subnet)
\`\`\`
**Fix:** Ensure matching subnet masks

**Problem 2: Missing Routes**
\`\`\`
Can't reach 172.16.5.0/24
Routing table missing entry
\`\`\`
**Fix:** Add static route or fix routing protocol

**Problem 3: Overlapping Subnets**
\`\`\`
Router1: 10.1.0.0/24
Router2: 10.1.0.0/25
Conflict!
\`\`\`
**Fix:** Redesign to eliminate overlap

**Problem 4: Summarization Gone Wrong**
\`\`\`
Summarizing:
192.168.1.0/24
192.168.2.0/24
192.168.4.0/24 (missing .3!)

Wrong: 192.168.0.0/22 (includes .3)
Right: Advertise individually
\`\`\`
**Fix:** Only summarize contiguous blocks

**Troubleshooting Commands:**
- \`show ip route\` - View routing table
- \`traceroute\` - Follow packet path
- \`ping\` - Test connectivity
- \`show ip interface brief\` - Check interfaces
        `},{type:"best-practices",title:"Routing Best Practices",content:`
**Design for Routing Efficiency:**

**1. Hierarchical Addressing**
- Assign addresses geographically
- Group related subnets
- Plan for summarization

**2. Document Routes**
\`\`\`
# Route Documentation Template
Network: 10.1.0.0/16
Purpose: Region 1 Summary
Advertised by: Core-Router-1
Received by: ISP, Region-2
\`\`\`

**3. Reserve Space**
- Keep gaps for growth
- Don't use every subnet
- Plan for new sites

**4. Consistent Masking**
- Use same mask for similar purposes
- /30 for all point-to-point
- /24 for all user LANs

**5. Monitor and Optimize**
- Regular routing table audits
- Remove outdated routes
- Summarize where possible
- Track table size growth

**6. Security Considerations**
- Filter private addresses at borders
- Don't advertise internal structure
- Use route authentication
- Implement bogon filtering
        `},{type:"summary",title:"Routing and Subnet Mastery!",content:`
You now understand:
- How routers use subnet information for forwarding
- The longest-match rule for route selection
- Route summarization for efficiency
- How subnet design impacts routing performance
- Common routing protocols and their subnet handling
- Troubleshooting subnet-related routing issues

**Key Insights:**
1. Good subnet design = efficient routing
2. Hierarchical addressing enables summarization
3. Longest match always wins
4. Document your routing design
5. Plan for growth and changes

**Remember:** Subnets and routing are two sides of the same coin. Master both for network excellence!

Next: Module 8 - IPv6 Subnetting, where we'll apply these concepts to the future of networking!
        `}],practice:{title:"Routing and Subnets Practice",questions:[{question:"A packet to 10.1.5.100 arrives. Which route wins: 10.0.0.0/8, 10.1.0.0/16, or 10.1.5.0/24?",hint:"Remember the longest match rule",answer:"10.1.5.0/24 wins (longest match - /24 is more specific than /16 or /8)"},{question:"Can you summarize 192.168.0.0/24, 192.168.1.0/24, 192.168.2.0/24, 192.168.3.0/24?",hint:"Check if they're contiguous and share common bits",answer:"Yes! 192.168.0.0/22 covers all four networks (they share the first 22 bits)"},{question:"Why might 172.16.1.0/24 and 172.16.1.0/25 in the same routing table cause problems?",hint:"Think about overlapping address space",answer:"They overlap! The /25 is a subset of the /24. This causes ambiguous routing - which path should packets take?"},{question:"What happens if a router has no route to 8.8.8.8?",hint:"What's the last resort route?",answer:"It uses the default route (0.0.0.0/0) if one exists, otherwise drops the packet"},{question:"Why is hierarchical addressing important for large networks?",hint:"Think about routing table size and updates",answer:"It enables route summarization, reducing routing table size, memory usage, and update traffic"}],exercises:[{title:"Route Selection Challenge",instructions:"Determine which route the router will choose for each destination",problems:["Destination: 192.168.1.50, Routes: 192.168.0.0/16, 192.168.1.0/24, 192.168.1.0/28","Destination: 10.5.5.5, Routes: 10.0.0.0/8, 10.5.0.0/16, 0.0.0.0/0","Destination: 172.16.50.100, Routes: 172.16.0.0/12, 172.16.48.0/22, 172.16.50.0/24","Build a routing table that efficiently handles 8 /24 subnets in the 10.1.x.x range"]},{title:"Summarization Practice",instructions:"Find the best summary route for these subnet groups",problems:["Summarize: 10.1.0.0/24 through 10.1.7.0/24","Summarize: 192.168.16.0/24, 192.168.17.0/24, 192.168.18.0/24, 192.168.19.0/24","Can you summarize: 172.16.0.0/24, 172.16.2.0/24, 172.16.4.0/24? Why or why not?","Design a hierarchical scheme for a company with 3 regions, 4 sites per region, using 10.0.0.0/8"]}]},keyTakeaways:["Routers forward based on destination IP and longest match wins","Routing tables contain destination networks, next-hops, and metrics","Route summarization reduces table size and improves efficiency","Hierarchical subnet design enables better route aggregation","Different routing protocols handle subnets differently (classful vs classless)","Good subnet design directly impacts routing performance and scalability"]},8:{title:"IPv6 Subnetting",sections:[{type:"introduction",title:"Welcome to the Future of Networking",content:`
IPv4 is running out. With only 4.3 billion addresses and a global population of 8 billion (plus billions of devices), we need a bigger solution. Enter IPv6 - with 340 undecillion addresses, that's enough to assign 100 addresses to every atom on Earth!

But IPv6 isn't just about more addresses. It's a complete reimagining of how IP addressing works, with built-in security, simplified headers, and no more NAT.

**Key Differences from IPv4:**
- 128-bit addresses (vs 32-bit)
- Hexadecimal notation (vs decimal)
- No broadcast addresses
- Simplified subnetting
- Built-in IPsec support
- Automatic address configuration
        `},{type:"concept",title:"IPv6 Address Structure",content:`
**IPv6 Address Format:**

An IPv6 address is 128 bits long, written as 8 groups of 4 hexadecimal digits:

\`\`\`
2001:0db8:85a3:0000:0000:8a2e:0370:7334
│    │    │    │    │    │    │    │
└────┴────┴────┴────┴────┴────┴────┘
        8 groups of 16 bits each
\`\`\`

**Each hexadecimal digit represents 4 bits:**
- 0-9: Values 0-9
- A-F: Values 10-15
- Case insensitive (A = a)

**Address Parts:**
\`\`\`
Global Routing Prefix | Subnet ID | Interface ID
      (48 bits)       | (16 bits) |  (64 bits)
\`\`\`

**Common Prefixes:**
- 2000::/3 - Global Unicast (Internet routable)
- FE80::/10 - Link-Local (like 169.254.x.x)
- FC00::/7 - Unique Local (like RFC 1918)
- FF00::/8 - Multicast
- ::1/128 - Loopback (like 127.0.0.1)
        `},{type:"compression",title:"IPv6 Address Compression Rules",content:`
**Making IPv6 Addresses Human-Friendly**

IPv6 addresses are long! Fortunately, we have two compression rules:

**Rule 1: Leading Zeros**
Remove leading zeros from each group:
\`\`\`
2001:0db8:0000:0042:0000:8a2e:0370:7334
                ↓
2001:db8:0:42:0:8a2e:370:7334
\`\`\`

**Rule 2: Consecutive Zeros (::)**
Replace the longest run of all-zero groups with ::
\`\`\`
2001:db8:0:0:0:0:0:1
         ↓
2001:db8::1
\`\`\`

**Important:** You can only use :: once per address!

**Compression Examples:**
\`\`\`
Full:       2001:0db8:0000:0000:0000:0000:0000:0001
Rule 1:     2001:db8:0:0:0:0:0:1
Rule 2:     2001:db8::1

Full:       fe80:0000:0000:0000:0204:61ff:fe9d:f156
Rule 1:     fe80:0:0:0:204:61ff:fe9d:f156
Rule 2:     fe80::204:61ff:fe9d:f156

Full:       0000:0000:0000:0000:0000:0000:0000:0001
Compressed: ::1 (loopback)

Full:       0000:0000:0000:0000:0000:0000:0000:0000
Compressed: :: (all zeros)
\`\`\`

**Decompression:**
To expand ::, count existing groups and fill to 8 total:
\`\`\`
2001:db8::1
= 2001:db8:(missing groups):1
= 2001:db8:0:0:0:0:0:1 (6 groups of zeros)
\`\`\`
        `},{type:"subnetting",title:"IPv6 Subnetting Simplified",content:`
**The Beauty of IPv6 Subnetting**

IPv6 subnetting is actually easier than IPv4! Here's why:

**Standard Allocation:**
- ISP gives you a /48 prefix
- You create /64 subnets
- That's 65,536 possible subnets!
- Each subnet has 2^64 addresses

**No More Host Calculation:**
- Always use /64 for LANs
- Interface ID is always 64 bits
- No subnet/broadcast addresses
- All addresses are usable

**Example: Subnetting 2001:db8:1234::/48**

\`\`\`
Your allocation: 2001:db8:1234::/48
                               ││└─ 16 bits for subnets
                               │└── Subnet boundary
                               └─── Your prefix

Possible subnets:
2001:db8:1234:0::/64    (Subnet 0)
2001:db8:1234:1::/64    (Subnet 1)
2001:db8:1234:2::/64    (Subnet 2)
...
2001:db8:1234:ffff::/64 (Subnet 65535)
\`\`\`

**Subnet Planning Example:**
\`\`\`
2001:db8:1234:1::/64   - Building 1
2001:db8:1234:2::/64   - Building 2
2001:db8:1234:10::/64  - Servers
2001:db8:1234:20::/64  - Guest WiFi
2001:db8:1234:30::/64  - IoT Devices
2001:db8:1234:99::/64  - Management
\`\`\`

**Pro Tip:** Use hex patterns for easy identification:
- :10xx: for servers
- :20xx: for users
- :30xx: for IoT
- :99xx: for management
        `},{type:"address-types",title:"IPv6 Address Types",content:`
**Understanding IPv6 Address Types**

**1. Link-Local (FE80::/10)**
\`\`\`
fe80::1234:5678:9abc:def0
│└─┘
│ └── Always fe80 for link-local
└──── Automatically configured
\`\`\`
- Always present on every interface
- Not routable beyond local link
- Used for neighbor discovery
- Like 169.254.x.x in IPv4

**2. Unique Local (FC00::/7)**
\`\`\`
fd12:3456:789a:1::/64
│└──┘
│ └── Random 40-bit global ID
└──── fd = locally assigned
\`\`\`
- Private addresses (like RFC 1918)
- Not internet routable
- Globally unique (with high probability)

**3. Global Unicast (2000::/3)**
\`\`\`
2001:db8:1234:5678::1
│    │   │    │
│    │   │    └── Interface ID
│    │   └────── Subnet ID
│    └────────── ISP allocation
└─────────────── Global routing
\`\`\`
- Internet routable addresses
- Assigned by ISPs
- Globally unique

**4. Multicast (FF00::/8)**
\`\`\`
ff02::1     - All nodes on link
ff02::2     - All routers on link
ff02::1:2   - All DHCP servers
\`\`\`
- Replaces broadcast
- Scoped delivery
- More efficient than broadcast
        `},{type:"practical-examples",title:"Real-World IPv6 Deployment",content:`
**Scenario: Small Business IPv6 Migration**

ISP Assignment: 2001:db8:cafe::/48

**Step 1: Plan Your Subnets**
\`\`\`
Departments:
2001:db8:cafe:1::/64   - Sales (VLAN 10)
2001:db8:cafe:2::/64   - Engineering (VLAN 20)
2001:db8:cafe:3::/64   - Management (VLAN 30)

Infrastructure:
2001:db8:cafe:10::/64  - Servers
2001:db8:cafe:20::/64  - Network Equipment
2001:db8:cafe:99::/64  - Point-to-Point Links

Guest/DMZ:
2001:db8:cafe:100::/64 - Guest WiFi
2001:db8:cafe:200::/64 - DMZ Services
\`\`\`

**Step 2: Address Assignment Examples**
\`\`\`
Router Interface:
2001:db8:cafe:1::1/64  (Sales gateway)

DHCPv6 Range:
2001:db8:cafe:1::1000 to
2001:db8:cafe:1::9999

Static Server:
2001:db8:cafe:10::53   (DNS)
2001:db8:cafe:10::80   (Web)
2001:db8:cafe:10::25   (Mail)
\`\`\`

**Step 3: Dual-Stack Configuration**
\`\`\`
Interface GigabitEthernet0/1
 Description Sales Network
 IPv4: 192.168.1.1/24
 IPv6: 2001:db8:cafe:1::1/64
\`\`\`
        `},{type:"common-patterns",title:"IPv6 Addressing Patterns",content:`
**Smart IPv6 Address Planning**

**Pattern 1: Memorable Addresses**
\`\`\`
2001:db8:cafe:1::d:e:a:d    (Memorable)
2001:db8:cafe:2::bad:c0de   (Hexspeak)
2001:db8:cafe:10::80        (Port-based)
2001:db8:cafe:53::53        (Service-based)
\`\`\`

**Pattern 2: Sequential Numbering**
\`\`\`
Routers:    ::1
Switches:   ::2-::9
Servers:    ::10-::99
Printers:   ::100-::199
DHCP Start: ::1000
\`\`\`

**Pattern 3: Embed IPv4**
\`\`\`
IPv4: 192.168.1.10
IPv6: 2001:db8:cafe:1::192:168:1:10
      (Easy to remember!)
\`\`\`

**Pattern 4: VLAN Matching**
\`\`\`
VLAN 10: 2001:db8:cafe:10::/64
VLAN 20: 2001:db8:cafe:20::/64
VLAN 30: 2001:db8:cafe:30::/64
\`\`\`

**Pattern 5: Geographic/Building**
\`\`\`
Building A: 2001:db8:cafe:a00::/56
  Floor 1:  2001:db8:cafe:a01::/64
  Floor 2:  2001:db8:cafe:a02::/64
  
Building B: 2001:db8:cafe:b00::/56
  Floor 1:  2001:db8:cafe:b01::/64
  Floor 2:  2001:db8:cafe:b02::/64
\`\`\`
        `},{type:"transition",title:"IPv4 to IPv6 Transition",content:`
**Transition Strategies**

**1. Dual Stack (Recommended)**
\`\`\`
Interface Configuration:
  IPv4: 192.168.1.1/24
  IPv6: 2001:db8:cafe:1::1/64
  
Both protocols run simultaneously
\`\`\`

**2. Tunneling (6in4, 6to4)**
\`\`\`
IPv6 packets encapsulated in IPv4
Useful for crossing IPv4-only networks
\`\`\`

**3. Translation (NAT64/DNS64)**
\`\`\`
Allows IPv6-only clients to reach IPv4 services
2001:db8:cafe:64::192.168.1.10
\`\`\`

**Migration Checklist:**
- [ ] Get IPv6 allocation from ISP
- [ ] Plan addressing scheme
- [ ] Update firewall rules
- [ ] Configure routing protocols
- [ ] Enable on internal networks
- [ ] Test thoroughly
- [ ] Monitor dual-stack traffic
- [ ] Phase out IPv4 (eventually)

**Common Mistakes:**
- Forgetting to update firewall rules
- Not planning address scheme
- Ignoring IPv6 security
- Using transitional addresses permanently
- Not monitoring IPv6 traffic
        `},{type:"summary",title:"IPv6 Mastery Achieved!",content:`
You now understand:
- IPv6 address structure and notation
- Address compression and expansion rules
- Simplified /64 subnetting model
- Different IPv6 address types and their uses
- Real-world deployment strategies
- Transition mechanisms from IPv4

**Key Takeaways:**
1. IPv6 addresses are 128 bits in hexadecimal
2. Use :: to compress consecutive zeros (once only)
3. Standard practice: /64 for all LAN subnets
4. No broadcast, no subnet/network addresses
5. Plan your addressing scheme thoughtfully
6. Dual-stack is the preferred transition method

**Your IPv6 Toolkit:**
- Compression rules for readable addresses
- Standard /48 allocation, /64 subnets
- Address patterns for easy management
- Transition strategies for migration

IPv6 isn't the future - it's the present. Major providers report 40%+ IPv6 traffic. Time to join the revolution!

Next: Module 9 - Network Troubleshooting, where we'll apply everything you've learned!
        `}],practice:{title:"IPv6 Practice",questions:[{question:"Compress this IPv6 address: 2001:0db8:0000:0000:0008:0800:200c:417a",hint:"Apply both compression rules: remove leading zeros and use :: for consecutive zero groups",answer:"2001:db8::8:800:200c:417a"},{question:"How many /64 subnets can you create from a /48 prefix?",hint:"48 to 64 is how many bits?",answer:"65,536 subnets (2^16 = 65,536, because 64-48=16 bits for subnetting)"},{question:"What type of address is fe80::1234:5678:9abc:def0?",hint:"Look at the first few hex digits",answer:"Link-local address (fe80::/10 prefix)"},{question:"Expand this compressed address: 2001:db8::1",hint:"Count the groups and fill in zeros to make 8 groups total",answer:"2001:0db8:0000:0000:0000:0000:0000:0001"},{question:"If you have 2001:db8:cafe::/48, what would be the 5th /64 subnet?",hint:"Subnets start at 0, so the 5th is index 4",answer:"2001:db8:cafe:4::/64"}],exercises:[{title:"IPv6 Compression Practice",instructions:"Compress these IPv6 addresses to their shortest form",problems:["Compress: 2001:0db8:0000:0042:0000:0000:0000:0001","Compress: fe80:0000:0000:0000:0202:b3ff:fe1e:8329","Compress: 0000:0000:0000:0000:0000:0000:0000:0001","Compress: 2001:0db8:0000:0001:0002:0003:0004:0005"]},{title:"IPv6 Subnet Planning",instructions:"Design an IPv6 addressing scheme",problems:["You have 2001:db8:abcd::/48. Plan subnets for: HQ (3 VLANs), Branch1 (2 VLANs), Branch2 (2 VLANs)","Create memorable addresses for: DNS server, Web server, Mail server in subnet 2001:db8:1234:10::/64","Design a hierarchical scheme for a campus with 4 buildings, 5 floors each, using 2001:db8:campus::/48","Plan dual-stack addressing: IPv4 192.168.0.0/16 and IPv6 2001:db8::/48 for 10 departments"]}]},keyTakeaways:["IPv6 uses 128-bit addresses written in hexadecimal","Compress addresses by removing leading zeros and using :: for consecutive zero groups","Standard practice is to use /64 for all LAN subnets","IPv6 has no broadcast addresses - multicast is used instead","Link-local addresses (fe80::/10) are automatically configured","Dual-stack (running IPv4 and IPv6 together) is the recommended transition approach"]},9:{title:"Network Troubleshooting",sections:[{type:"introduction",title:"Putting It All Together",content:`
You've mastered binary, subnetting, VLSM, routing, and IPv6. Now let's apply these skills to real-world network troubleshooting. This module teaches you to think like a network engineer when problems arise.

Most network issues come down to one of these:
- IP addressing conflicts or errors
- Subnet mask mismatches
- Routing problems
- VLAN misconfigurations
- Firewall rules

With your subnet knowledge, you can quickly identify and fix these issues!
        `},{type:"methodology",title:"The Troubleshooting Method",content:`
**The 7-Layer Troubleshooting Approach**

Always start at Layer 1 and work up:

**1. Physical (Layer 1)**
- Is the cable plugged in?
- Link lights green?
- Cable damaged?

**2. Data Link (Layer 2)**
- VLAN configured correctly?
- Switch port enabled?
- Spanning tree blocking?

**3. Network (Layer 3) - Our Focus!**
- IP address correct?
- Subnet mask correct?
- In the same subnet?
- Gateway configured?
- Routes exist?

**4. Transport (Layer 4)**
- Port open?
- Service running?

**5-7. Application Layers**
- Application-specific issues

**The Subnet Checklist:**
□ IP address valid for subnet?
□ Subnet mask matches other devices?
□ Default gateway in same subnet?
□ No duplicate IPs?
□ Routing table has path?
        `},{type:"common-problems",title:"Common Subnet-Related Problems",content:`
**Problem 1: Can't Communicate on Same Network**

**Symptom:** Two devices on same switch can't ping

**Check:**

\`\`\`
Device A: 192.168.1.50/24
Device B: 192.168.1.200/25

Analysis:
A thinks network is: 192.168.1.0-255
B thinks network is: 192.168.1.128-255
A thinks B is local, B thinks A is remote!
\`\`\`

**Fix:** Ensure matching subnet masks

**Problem 2: Asymmetric Routing**

**Symptom:** Traffic works one way only

**Check:**

\`\`\`
PC: 10.1.1.100/24, GW: 10.1.1.1
Server: 10.1.1.200/25, GW: 10.1.1.129

PC→Server: Goes to 10.1.1.1 (thinks remote)
Server→PC: Direct (thinks local)
Return path different = Firewall drops!
\`\`\`

**Problem 3: Wrong Gateway**

**Symptom:** Can't reach internet/other subnets

**Check:**

\`\`\`
IP: 172.16.50.100/24
Gateway: 172.16.51.1  ← Wrong subnet!
\`\`\`

**Fix:** Gateway must be in same subnet

**Problem 4: IP Conflict**

**Symptom:** Intermittent connectivity

**Check:**

\`\`\`
ARP cache shows:
192.168.1.100 = MAC-1 (sometimes)
192.168.1.100 = MAC-2 (sometimes)
\`\`\`

**Fix:** Find duplicate, change one IP
        `},{type:"diagnostic-commands",title:"Essential Diagnostic Commands",content:`
**Windows Commands:**

\`\`\`
ipconfig /all              # Show all network config
arp -a                     # Show ARP cache
route print               # Show routing table
nslookup                  # Test DNS
ping -t                   # Continuous ping
tracert                   # Trace route to destination
pathping                  # Combination ping/tracert
netstat -an               # Show connections
\`\`\`

**Linux/Mac Commands:**

\`\`\`
ip addr show              # Show interfaces (Linux)
ifconfig                  # Show interfaces (older/Mac)
ip route show            # Show routes (Linux)
netstat -rn              # Show routes (Mac)
arp -n                   # Show ARP cache
dig                      # DNS lookup
mtr                      # Better traceroute
ss -an                   # Socket statistics
\`\`\`

**Cisco IOS Commands:**

\`\`\`
show ip interface brief   # Quick interface status
show ip route            # Routing table
show ip arp              # ARP table
show vlan                # VLAN assignments
show running-config      # Current configuration
show mac address-table   # Switch MAC table
ping                     # Test connectivity
traceroute              # Trace path
\`\`\`

**Quick Subnet Verification:**

\`\`\`
# Is .100 in same subnet as .200 with /25?
ping 192.168.1.200

# Check your IP and mask
ipconfig (Windows) or ip addr (Linux)

# Verify gateway is reachable
ping <gateway-ip>

# Check routing table for destination
route -n (Linux) or route print (Windows)
\`\`\`
        `},{type:"interactive-tool",title:"Practice Network Calculations",component:"NetworkCalculator"},{type:"troubleshooting-scenarios",title:"Real-World Troubleshooting Scenarios",content:`
**Scenario 1: The New Printer**

"The new printer (192.168.1.250) can't be reached from accounting!"

**Investigation:**

\`\`\`
Accounting PC: 192.168.1.50/25
Printer: 192.168.1.250/24
Gateway: 192.168.1.1

Analysis:
PC subnet: 192.168.1.0-127 (/25)
Printer: 192.168.1.250 (outside PC's subnet)
PC will send to gateway, but printer thinks PC is local!
\`\`\`

**Solution:** Change printer to /25 or PC to /24

**Scenario 2: The Slow Application**

"Application is slow between offices!"

**Investigation:**

\`\`\`
Office A: 10.1.0.0/16
Office B: 10.2.0.0/16

Traceroute shows:
10.1.0.100 → 10.1.0.1 → 172.16.0.1 → 
8.8.8.8 → 4.4.4.4 → 172.16.0.2 → 10.2.0.100

Going through internet instead of private WAN!
\`\`\`

**Solution:** Add static routes for private networks

**Scenario 3: The Monday Morning Mystery**

"Nobody can connect after the weekend!"

**Investigation:**

\`\`\`
DHCP scope exhausted
Scope: 192.168.1.100-200 (/24)
Leases: 101 active (scope full)

Weekend: IoT devices auto-updated, grabbed IPs
\`\`\`

**Solution:** 
- Expand DHCP scope
- Shorten lease time
- Create IoT VLAN
        `},{type:"subnet-design-review",title:"Subnet Design Problems",content:`
**Common Design Mistakes to Spot:**

**1. Wasted Address Space**

\`\`\`
Bad:
/24 for 2 servers
/24 for point-to-point link

Good:
/29 for 2 servers (6 hosts)
/30 for point-to-point (2 hosts)
\`\`\`

**2. No Growth Room**

\`\`\`
Bad:
50 users → /26 (62 hosts) ← No growth!

Good:
50 users → /25 (126 hosts) ← Room to grow
\`\`\`

**3. Poor Summarization**

\`\`\`
Bad:
Site A: 10.1.1.0/24
Site B: 10.1.3.0/24  ← Can't summarize!
Site C: 10.1.5.0/24

Good:
Site A: 10.1.0.0/24
Site B: 10.1.1.0/24  ← Summarizes to
Site C: 10.1.2.0/24  ← 10.1.0.0/22
\`\`\`

**4. Overlapping Subnets**

\`\`\`
VLAN 10: 192.168.1.0/24
VLAN 20: 192.168.1.128/25  ← Overlap!

Always check for overlaps when adding subnets
\`\`\`

**5. Wrong Mask for Purpose**

\`\`\`
Bad:
User LAN: /30 (too small)
P2P Link: /24 (too large)

Good:
User LAN: /24 (254 hosts)
P2P Link: /30 (2 hosts)
\`\`\`
        `},{type:"documentation",title:"Network Documentation",content:`
**Essential Documentation for Troubleshooting**

**1. IP Address Spreadsheet**

\`\`\`
Network     | Purpose      | VLAN | Gateway      | DHCP Range
------------|-------------|------|--------------|-------------
10.1.1.0/24 | Sales       | 10   | 10.1.1.1     | .100-.199
10.1.2.0/24 | Engineering | 20   | 10.1.2.1     | .100-.199
10.1.3.0/24 | Guest       | 30   | 10.1.3.1     | .50-.250
\`\`\`

**2. Network Diagram**
- Show all subnets
- Label IP ranges
- Mark VLANs
- Include routing paths

**3. Change Log**

\`\`\`
Date       | Change              | By    | Reason
-----------|--------------------|---------|---------
2024-01-15 | Added 10.1.4.0/24  | John  | New dept
2024-01-20 | Changed DHCP scope | Sarah | Full
\`\`\`

**4. Standard Configurations**

\`\`\`
# Standard User VLAN Config
interface vlan X
 ip address 10.1.X.1 255.255.255.0
 ip helper-address 10.1.10.10
 description User_VLAN_X
\`\`\`

**5. Emergency Contacts**
- ISP support: 1-800-XXX-XXXX
- Account #: 12345
- Circuit ID: XXXXX

**Documentation Saves Time!**
        `},{type:"best-practices",title:"Troubleshooting Best Practices",content:`
**Professional Troubleshooting Approach**

**1. Gather Information First**
- When did it start?
- What changed?
- Who is affected?
- Error messages?
- Intermittent or constant?

**2. Document Everything**
- What you checked
- Results of tests
- Configuration changes
- Create tickets

**3. Use Systematic Approach**
- Don't randomly change things
- Test one change at a time
- Have rollback plan
- Verify fix works

**4. Common Quick Checks**
- Ping gateway
- Check subnet mask
- Verify VLAN
- Check routing table
- Review recent changes

**5. Communication**
- Keep users informed
- Set realistic expectations
- Document root cause
- Plan prevention

**Remember:**
"It's always DNS... except when it's the subnet mask!"
        `},{type:"summary",title:"Troubleshooting Mastery!",content:`
Congratulations! You've completed the Subnet Pro course!

**You've Learned:**
- Binary and decimal conversion
- How subnet masks work
- IP address structure
- CIDR notation
- Subnet calculations
- VLSM design
- Routing concepts
- IPv6 addressing
- Troubleshooting methodology

**Your Subnet Toolkit:**
1. Binary/decimal conversion skills
2. Subnet calculation formulas
3. VLSM design principles
4. Diagnostic commands
5. Troubleshooting methodology
6. Documentation templates

**Key Troubleshooting Wisdom:**
- Most problems are simple (check the mask!)
- Document everything
- Verify changes work
- Learn from every issue
- Build better designs

**Next Steps:**
- Practice with real networks
- Get hands-on experience
- Study for certifications (CCNA, Network+)
- Keep learning and growing

Remember: Every expert was once a beginner. You've built a solid foundation - now go apply it!
        `}],practice:{title:"Troubleshooting Practice",questions:[{question:"PC (192.168.1.100/25) can't ping Server (192.168.1.200/24). Why?",hint:"Compare their subnet ranges",answer:"Different subnet views. PC thinks server is in different subnet (128-255), but server thinks PC is local (0-255). Asymmetric routing issue."},{question:"Users report 'Destination Host Unreachable' when pinging 8.8.8.8. Local pings work. What's wrong?",hint:"What device provides access to external networks?",answer:"Missing or incorrect default gateway. Check if gateway is configured and in the same subnet as the host."},{question:"DHCP clients getting 169.254.x.x addresses. What's happening?",hint:"What does this address range indicate?",answer:"APIPA/link-local addresses. DHCP server unreachable - check DHCP server, VLAN config, or ip helper-address."},{question:"Traceroute shows: 10.1.1.1 → 10.1.1.1 → 10.1.1.1 (repeating). What's wrong?",hint:"What would cause a packet to loop?",answer:"Routing loop. Two routers pointing to each other for the destination network."},{question:"New subnet 172.16.5.0/24 added but unreachable from 172.16.1.0/24. Same router. What's missing?",hint:"How do other networks know about the new subnet?",answer:"Missing route advertisement or static routes on other routers. The subnet exists but isn't in the routing tables."}],exercises:[{title:"Troubleshooting Scenarios",instructions:"Diagnose and solve these network issues",problems:["Printer (10.1.50.200/24) unreachable from PC (10.1.50.100/23). Find the issue and solution.","Website loads slowly. Traceroute shows 15 hops through internet for internal server. What's wrong?","After power outage, some devices connect, others don't. DHCP scope shows 90% utilization. Diagnose.","New VLAN can't reach internet. Can ping local gateway but not remote networks. What to check?"]},{title:"Design Review",instructions:"Find the problems in these subnet designs",problems:["Branch 1: 10.1.1.0/24, Branch 2: 10.1.100.0/24, Branch 3: 10.1.2.0/24 - What's wrong?","DHCP: 192.168.1.50-250, Servers: 192.168.1.10-20, Gateway: 192.168.1.1 - Potential issue?","P2P Links: All using /24 masks. 50 links total. Calculate address waste.","Growth plan: Current 100 users in /25. Expecting 50% growth. Will it fit?"]}]},keyTakeaways:["Most network issues involve IP addressing, subnet masks, or routing","Always verify subnet masks match between communicating devices","Use systematic troubleshooting: Physical → Data Link → Network → Transport → Application","Document everything: configurations, changes, and solutions","Common issues: wrong mask, wrong gateway, IP conflicts, routing loops","Good subnet design prevents many problems before they occur"]}},Wp=e=>js[String(e)]||js[e]||null,$p=e=>String(e)in js||e in js;function dd(e){if(!Number.isInteger(e)||e<0||e>255)throw new Error("Input must be an integer between 0 and 255");return e.toString(2).padStart(8,"0")}function fd(e){if(typeof e!="string"||!/^[01]+$/.test(e))throw new Error("Input must be a binary string containing only 0s and 1s");return parseInt(e,2)}function Ut(e){const t=e.split(".");if(t.length!==4)throw new Error("Invalid IP address format");return t.map(n=>{const r=parseInt(n,10);if(isNaN(r)||r<0||r>255)throw new Error("Invalid octet value: "+n);return dd(r)}).join("")}function wa(e){if(e.length!==32||!/^[01]+$/.test(e))throw new Error("Input must be a 32-bit binary string");const t=[];for(let n=0;n<32;n+=8){const r=e.substring(n,n+8);t.push(fd(r))}return t.join(".")}function Up(e,t){if(e.length!==t.length)throw new Error("Binary strings must have the same length");let n="";for(let r=0;r<e.length;r++)n+=e[r]==="1"&&t[r]==="1"?"1":"0";return n}function qp(e,t){if(e.length!==t.length)throw new Error("Binary strings must have the same length");let n="";for(let r=0;r<e.length;r++)n+=e[r]==="1"||t[r]==="1"?"1":"0";return n}function Vp(e,t){const n=Ut(e),r=Ut(t),s=Up(n,r);return wa(s)}function Hp(e,t){const n=Ut(e),s=Ut(t).split("").map(i=>i==="0"?"1":"0").join(""),o=qp(n,s);return wa(o)}const Gp="_converter_10tfc_1",Qp="_header_10tfc_10",Yp="_modeToggle_10tfc_24",Kp="_inputs_10tfc_39",Xp="_inputGroup_10tfc_46",Zp="_input_10tfc_39",Jp="_result_10tfc_73",eh="_arrow_10tfc_86",th="_error_10tfc_92",nh="_breakdown_10tfc_101",rh="_bitGrid_10tfc_113",sh="_bitRow_10tfc_117",oh="_power_10tfc_124",ih="_bit_10tfc_113",ah="_bitOn_10tfc_139",lh="_bitOff_10tfc_144",uh="_calculation_10tfc_150",G={converter:Gp,header:Qp,modeToggle:Yp,inputs:Kp,inputGroup:Xp,input:Zp,result:Jp,arrow:eh,error:th,breakdown:nh,bitGrid:rh,bitRow:sh,power:oh,bit:ih,bitOn:ah,bitOff:lh,calculation:uh};function pd(){const[e,t]=b.useState(""),[n,r]=b.useState(""),[s,o]=b.useState("decToBin"),[i,l]=b.useState(""),u=y=>{const v=y.target.value;if(t(v),l(""),v===""){r("");return}const w=parseInt(v);if(isNaN(w)||w<0||w>255){l("Please enter a number between 0 and 255"),r("");return}r(dd(w))},c=y=>{const v=y.target.value;if(r(v),l(""),v===""){t("");return}if(!/^[01]+$/.test(v)){l("Binary can only contain 0s and 1s"),t("");return}if(v.length>8){l("Binary must be 8 bits or less"),t("");return}t(fd(v).toString())},m=()=>{o(s==="decToBin"?"binToDec":"decToBin"),t(""),r(""),l("")},h=[128,64,32,16,8,4,2,1],g=n.padStart(8,"0").split("");return a.jsxs("div",{className:G.converter,children:[a.jsxs("div",{className:G.header,children:[a.jsx("h3",{children:"Binary Converter"}),a.jsx("button",{className:G.modeToggle,onClick:m,children:s==="decToBin"?"→ Binary to Decimal":"→ Decimal to Binary"})]}),a.jsx("div",{className:G.inputs,children:s==="decToBin"?a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:G.inputGroup,children:[a.jsx("label",{children:"Decimal:"}),a.jsx("input",{type:"text",value:e,onChange:u,placeholder:"Enter decimal (0-255)",className:G.input})]}),a.jsx("div",{className:G.arrow,children:"↓"}),a.jsxs("div",{className:G.inputGroup,children:[a.jsx("label",{children:"Binary:"}),a.jsx("div",{className:G.result,children:n||"--------"})]})]}):a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:G.inputGroup,children:[a.jsx("label",{children:"Binary:"}),a.jsx("input",{type:"text",value:n,onChange:c,placeholder:"Enter binary",className:G.input,maxLength:8})]}),a.jsx("div",{className:G.arrow,children:"↓"}),a.jsxs("div",{className:G.inputGroup,children:[a.jsx("label",{children:"Decimal:"}),a.jsx("div",{className:G.result,children:e||"-"})]})]})}),i&&a.jsx("div",{className:G.error,children:i}),n&&a.jsxs("div",{className:G.breakdown,children:[a.jsx("h4",{children:"Bit Values:"}),a.jsxs("div",{className:G.bitGrid,children:[a.jsx("div",{className:G.bitRow,children:h.map((y,v)=>a.jsx("div",{className:G.power,children:y},v))}),a.jsx("div",{className:G.bitRow,children:g.map((y,v)=>a.jsx("div",{className:`${G.bit} ${y==="1"?G.bitOn:G.bitOff}`,children:y},v))})]}),e&&a.jsxs("div",{className:G.calculation,children:["= ",g.map((y,v)=>y==="1"?h[v]:null).filter(Boolean).join(" + ")," = ",e]})]})]})}function ch(e){if(!Number.isInteger(e)||e<0||e>32)throw new Error("CIDR prefix must be between 0 and 32");const t="1".repeat(e).padEnd(32,"0");return wa(t)}const dh="_calculator_5h4dj_1",fh="_inputs_5h4dj_16",ph="_inputGroup_5h4dj_24",hh="_input_5h4dj_16",mh="_cidrInput_5h4dj_48",gh="_calculateBtn_5h4dj_64",vh="_error_5h4dj_80",yh="_results_5h4dj_89",wh="_resultGrid_5h4dj_100",kh="_resultItem_5h4dj_106",xh="_label_5h4dj_115",bh="_value_5h4dj_120",Sh="_binaryView_5h4dj_127",_h="_binaryGrid_5h4dj_140",Nh="_binaryRow_5h4dj_146",Ch="_binaryLabel_5h4dj_153",Ph="_binaryValue_5h4dj_159",T={calculator:dh,inputs:fh,inputGroup:ph,input:hh,cidrInput:mh,calculateBtn:gh,error:vh,results:yh,resultGrid:wh,resultItem:kh,label:xh,value:bh,binaryView:Sh,binaryGrid:_h,binaryRow:Nh,binaryLabel:Ch,binaryValue:Ph};function hd(){const[e,t]=b.useState("192.168.1.100"),[n,r]=b.useState("24"),[s,o]=b.useState(null),[i,l]=b.useState(""),u=m=>{const h=m.split(".");return h.length!==4?!1:h.every(g=>{const y=parseInt(g);return!isNaN(y)&&y>=0&&y<=255})},c=()=>{if(l(""),!u(e)){l("Please enter a valid IP address");return}const m=parseInt(n);if(isNaN(m)||m<0||m>32){l("CIDR must be between 0 and 32");return}const h=ch(m),g=Vp(e,h),y=Hp(e,h),v=32-m,w=Math.pow(2,v),k=w>2?w-2:0,f=g.split(".").map(Number),d=y.split(".").map(Number);let p=[...f],x=[...d];if(k>0){p[3]+=1,x[3]-=1;for(let S=3;S>0;S--)p[S]>255&&(p[S]=0,p[S-1]+=1);for(let S=3;S>0;S--)x[S]<0&&(x[S]=255,x[S-1]-=1)}o({network:g,mask:h,broadcast:y,firstHost:k>0?p.join("."):"N/A",lastHost:k>0?x.join("."):"N/A",totalHosts:w,usableHosts:k,ipBinary:Ut(e),maskBinary:Ut(h),networkBinary:Ut(g)})};return a.jsxs("div",{className:T.calculator,children:[a.jsx("h3",{children:"Network Calculator"}),a.jsxs("div",{className:T.inputs,children:[a.jsxs("div",{className:T.inputGroup,children:[a.jsx("label",{children:"IP Address:"}),a.jsx("input",{type:"text",value:e,onChange:m=>t(m.target.value),placeholder:"192.168.1.100",className:T.input})]}),a.jsxs("div",{className:T.inputGroup,children:[a.jsx("label",{children:"CIDR:"}),a.jsxs("div",{className:T.cidrInput,children:[a.jsx("span",{children:"/"}),a.jsx("input",{type:"number",value:n,onChange:m=>r(m.target.value),min:"0",max:"32",className:T.input})]})]}),a.jsx("button",{className:T.calculateBtn,onClick:c,children:"Calculate"})]}),i&&a.jsx("div",{className:T.error,children:i}),s&&a.jsxs("div",{className:T.results,children:[a.jsx("h4",{children:"Results"}),a.jsxs("div",{className:T.resultGrid,children:[a.jsxs("div",{className:T.resultItem,children:[a.jsx("span",{className:T.label,children:"Network Address:"}),a.jsx("span",{className:T.value,children:s.network})]}),a.jsxs("div",{className:T.resultItem,children:[a.jsx("span",{className:T.label,children:"Subnet Mask:"}),a.jsx("span",{className:T.value,children:s.mask})]}),a.jsxs("div",{className:T.resultItem,children:[a.jsx("span",{className:T.label,children:"Broadcast Address:"}),a.jsx("span",{className:T.value,children:s.broadcast})]}),a.jsxs("div",{className:T.resultItem,children:[a.jsx("span",{className:T.label,children:"First Usable Host:"}),a.jsx("span",{className:T.value,children:s.firstHost})]}),a.jsxs("div",{className:T.resultItem,children:[a.jsx("span",{className:T.label,children:"Last Usable Host:"}),a.jsx("span",{className:T.value,children:s.lastHost})]}),a.jsxs("div",{className:T.resultItem,children:[a.jsx("span",{className:T.label,children:"Total Hosts:"}),a.jsx("span",{className:T.value,children:s.totalHosts.toLocaleString()})]}),a.jsxs("div",{className:T.resultItem,children:[a.jsx("span",{className:T.label,children:"Usable Hosts:"}),a.jsx("span",{className:T.value,children:s.usableHosts.toLocaleString()})]})]}),a.jsxs("div",{className:T.binaryView,children:[a.jsx("h5",{children:"Binary Representation"}),a.jsxs("div",{className:T.binaryGrid,children:[a.jsxs("div",{className:T.binaryRow,children:[a.jsx("span",{className:T.binaryLabel,children:"IP:"}),a.jsx("span",{className:T.binaryValue,children:s.ipBinary})]}),a.jsxs("div",{className:T.binaryRow,children:[a.jsx("span",{className:T.binaryLabel,children:"Mask:"}),a.jsx("span",{className:T.binaryValue,children:s.maskBinary})]}),a.jsxs("div",{className:T.binaryRow,children:[a.jsx("span",{className:T.binaryLabel,children:"Network:"}),a.jsx("span",{className:T.binaryValue,children:s.networkBinary})]})]})]})]})]})}const jh="_visualizer_1274v_1",Ih="_inputs_1274v_16",Eh="_inputGroup_1274v_20",Ah="_binaryInput_1274v_34",Th="_decimal_1274v_50",Rh="_operation_1274v_55",Lh="_calculation_1274v_62",Dh="_row_1274v_69",Mh="_label_1274v_74",zh="_bit_1274v_83",Bh="_bitOne_1274v_90",Fh="_bitZero_1274v_95",Oh="_separator_1274v_99",Wh="_dash_1274v_104",$h="_resultDecimal_1274v_110",Uh="_toggleButton_1274v_117",qh="_steps_1274v_134",Vh="_stepGrid_1274v_146",Hh="_step_1274v_134",Gh="_stepCalc_1274v_160",Qh="_stepExplain_1274v_166",Yh="_examples_1274v_171",Kh="_exampleButtons_1274v_180",B={visualizer:jh,inputs:Ih,inputGroup:Eh,binaryInput:Ah,decimal:Th,operation:Rh,calculation:Lh,row:Dh,label:Mh,bit:zh,bitOne:Bh,bitZero:Fh,separator:Oh,dash:Wh,resultDecimal:$h,toggleButton:Uh,steps:qh,stepGrid:Vh,step:Hh,stepCalc:Gh,stepExplain:Qh,examples:Yh,exampleButtons:Kh};function md(){const[e,t]=b.useState("11001100"),[n,r]=b.useState("11110000"),[s,o]=b.useState(!1),i=y=>y.replace(/[^01]/g,"").slice(0,8),l=y=>y.padEnd(8,"0"),u=(y,v)=>y==="1"&&v==="1"?"1":"0",c=l(e),m=l(n),h=c.split("").map((y,v)=>u(y,m[v])).join(""),g=y=>parseInt(y,2);return a.jsxs("div",{className:B.visualizer,children:[a.jsx("h3",{children:"AND Operation Visualizer"}),a.jsxs("div",{className:B.inputs,children:[a.jsxs("div",{className:B.inputGroup,children:[a.jsx("label",{children:"First Binary Number:"}),a.jsx("input",{type:"text",value:e,onChange:y=>t(i(y.target.value)),placeholder:"8-bit binary",className:B.binaryInput,maxLength:8}),a.jsxs("span",{className:B.decimal,children:["= ",g(c)]})]}),a.jsxs("div",{className:B.inputGroup,children:[a.jsx("label",{children:"Second Binary Number:"}),a.jsx("input",{type:"text",value:n,onChange:y=>r(i(y.target.value)),placeholder:"8-bit binary",className:B.binaryInput,maxLength:8}),a.jsxs("span",{className:B.decimal,children:["= ",g(m)]})]})]}),a.jsxs("div",{className:B.operation,children:[a.jsxs("div",{className:B.calculation,children:[a.jsxs("div",{className:B.row,children:[a.jsx("span",{className:B.label}),c.split("").map((y,v)=>a.jsx("span",{className:B.bit,children:y},v))]}),a.jsxs("div",{className:B.row,children:[a.jsx("span",{className:B.label,children:"AND"}),m.split("").map((y,v)=>a.jsx("span",{className:B.bit,children:y},v))]}),a.jsxs("div",{className:B.separator,children:[a.jsx("span",{className:B.label}),[...Array(8)].map((y,v)=>a.jsx("span",{className:B.dash,children:"-"},v))]}),a.jsxs("div",{className:B.row,children:[a.jsx("span",{className:B.label,children:"="}),h.split("").map((y,v)=>a.jsx("span",{className:`${B.bit} ${y==="1"?B.bitOne:B.bitZero}`,children:y},v))]})]}),a.jsxs("div",{className:B.resultDecimal,children:["Result: ",h," = ",g(h)," in decimal"]})]}),a.jsxs("button",{className:B.toggleButton,onClick:()=>o(!s),children:[s?"Hide":"Show"," Step-by-Step"]}),s&&a.jsxs("div",{className:B.steps,children:[a.jsx("h4",{children:"Bit-by-bit breakdown:"}),a.jsx("div",{className:B.stepGrid,children:c.split("").map((y,v)=>{const w=m[v],k=u(y,w);return a.jsxs("div",{className:B.step,children:[a.jsxs("div",{className:B.stepCalc,children:[y," AND ",w," = ",k]}),a.jsx("div",{className:B.stepExplain,children:y==="1"&&w==="1"?"✓ Both are 1":"✗ Not both 1"})]},v)})})]}),a.jsxs("div",{className:B.examples,children:[a.jsx("h4",{children:"Try these examples:"}),a.jsxs("div",{className:B.exampleButtons,children:[a.jsx("button",{onClick:()=>{t("11111111"),r("00000000")},children:"All 1s AND All 0s"}),a.jsx("button",{onClick:()=>{t("10101010"),r("11111111")},children:"Pattern AND All 1s"}),a.jsx("button",{onClick:()=>{t("11000000"),r("11111111")},children:"192 AND 255"}),a.jsx("button",{onClick:()=>{t("10101100"),r("11110000")},children:"172 AND 240"})]})]})]})}const Xh="_moduleContent_1dm41_1",Zh="_placeholder_1dm41_6",Jh="_contentPreview_1dm41_22",em="_stickingPoints_1dm41_45",tm="_stickingPoint_1dm41_45",nm="_section_1dm41_87",rm="_sectionTitle_1dm41_91",sm="_sectionContent_1dm41_97",om="_subheading_1dm41_106",im="_list_1dm41_112",am="_numberedList_1dm41_113",lm="_practice_1dm41_124",um="_practiceQuestion_1dm41_136",cm="_question_1dm41_144",dm="_hint_1dm41_149",fm="_answer_1dm41_155",pm="_exerciseSection_1dm41_181",hm="_instructions_1dm41_194",mm="_problemList_1dm41_200",gm="_keyTakeaways_1dm41_211",vm="_codeBlock_1dm41_244",Z={moduleContent:Xh,placeholder:Zh,contentPreview:Jh,stickingPoints:em,stickingPoint:tm,section:nm,sectionTitle:rm,sectionContent:sm,subheading:om,list:im,numberedList:am,practice:lm,practiceQuestion:um,question:cm,hint:dm,answer:fm,exerciseSection:pm,instructions:hm,problemList:mm,keyTakeaways:gm,codeBlock:vm};function ym({module:e}){const t=Wp(e.id);return $p(e.id)&&t?a.jsxs("div",{className:Z.moduleContent,children:[t.sections.map((r,s)=>a.jsxs("div",{className:Z.section,children:[a.jsx("h2",{className:Z.sectionTitle,children:r.title}),r.type==="interactive-tool"&&r.component==="BinaryConverter"?a.jsx(pd,{}):r.type==="interactive-tool"&&r.component==="NetworkCalculator"?a.jsx(hd,{}):r.type==="interactive-tool"&&r.component==="AndVisualizer"?a.jsx(md,{}):a.jsx("div",{className:Z.sectionContent,children:(()=>{const o=r.content,i=/```[\s\S]*?```/g,l=[];let u;for(;(u=i.exec(o))!==null;)l.push(u[0]);const c=[];let m=o;for(;m.includes("```");){const h=m.indexOf("```"),g=m.indexOf("```",h+3)+3;h>0&&c.push({type:"text",content:m.slice(0,h)}),c.push({type:"code",content:m.slice(h+3,g-3).trim()}),m=m.slice(g)}return m&&c.push({type:"text",content:m}),c.map((h,g)=>h.type==="code"?a.jsx("pre",{className:Z.codeBlock,children:a.jsx("code",{children:h.content})},g):h.content.split(`

`).map((y,v)=>{if(y.trim()){if(y.trim().startsWith("**")&&y.trim().endsWith("**"))return a.jsx("h3",{className:Z.subheading,children:y.slice(2,-2)},`${g}-${v}`);if(y.includes(`
-`)){const w=y.split(`
-`).filter(k=>k.trim());return a.jsx("ul",{className:Z.list,children:w.map((k,f)=>a.jsx("li",{children:No(f===0?k:"-"+k)},f))},`${g}-${v}`)}if(y.match(/^\d+\./)){const w=y.split(/\n(?=\d+\.)/);return a.jsx("ol",{className:Z.numberedList,children:w.map((k,f)=>a.jsx("li",{children:No(k.replace(/^\d+\.\s*/,""))},f))},`${g}-${v}`)}return a.jsx("p",{children:No(y)},`${g}-${v}`)}return null}).filter(Boolean))})()})]},s)),t.practice&&a.jsxs("div",{className:Z.practice,children:[a.jsx("h2",{children:t.practice.title}),t.practice.questions&&t.practice.questions.map((r,s)=>a.jsxs("div",{className:Z.practiceQuestion,children:[a.jsxs("p",{className:Z.question,children:[a.jsxs("strong",{children:["Q",s+1,":"]})," ",r.question]}),r.hint&&a.jsx("p",{className:Z.hint,children:a.jsxs("em",{children:["Hint: ",r.hint]})}),a.jsxs("details",{className:Z.answer,children:[a.jsx("summary",{children:"Show Answer"}),a.jsx("p",{children:r.answer})]})]},s)),t.practice.exercises&&t.practice.exercises.map((r,s)=>a.jsxs("div",{className:Z.exerciseSection,children:[a.jsx("h3",{children:r.title}),r.instructions&&a.jsx("p",{className:Z.instructions,children:r.instructions}),r.problems&&a.jsx("ul",{className:Z.problemList,children:r.problems.map((o,i)=>a.jsx("li",{children:o},i))})]},s))]}),t.keyTakeaways&&a.jsxs("div",{className:Z.keyTakeaways,children:[a.jsx("h2",{children:"Key Takeaways"}),a.jsx("ul",{children:t.keyTakeaways.map((r,s)=>a.jsx("li",{children:r},s))})]})]}):a.jsx("div",{className:Z.moduleContent,children:a.jsxs("div",{className:Z.placeholder,children:[a.jsx("h2",{children:"Lesson Content Coming Soon"}),a.jsxs("p",{children:['This is where the full lesson content for "',e.title,'" will appear.']}),a.jsxs("div",{className:Z.contentPreview,children:[a.jsx("h3",{children:"This lesson will include:"}),a.jsxs("ul",{children:[a.jsxs("li",{children:["📖 Introduction - Why ",e.title," matters"]}),a.jsx("li",{children:"🎯 Step-by-step explanations with examples"}),a.jsx("li",{children:"📊 Visual diagrams and charts"}),a.jsx("li",{children:"✏️ Interactive practice problems"}),a.jsx("li",{children:"💡 Tips and common pitfalls"}),a.jsx("li",{children:"📝 Summary and key takeaways"})]})]}),a.jsxs("div",{className:Z.stickingPoints,children:[a.jsx("h3",{children:"Common Challenges We'll Address:"}),e.stickingPoints.map((r,s)=>a.jsxs("div",{className:Z.stickingPoint,children:[a.jsx("strong",{children:"Issue:"})," ",r.issue,a.jsx("br",{}),a.jsx("strong",{children:"Solution:"})," ",r.remedy]},s))]})]})})}function No(e){return e.split(/\*\*/).map((n,r)=>r%2===1?a.jsx("strong",{children:n},r):n)}const wm="_objectives_mutlu_1",km="_intro_mutlu_15",xm="_objectivesList_mutlu_21",bm="_objective_mutlu_1",Sm="_checkmark_mutlu_35",Fn={objectives:wm,intro:km,objectivesList:xm,objective:bm,checkmark:Sm};function _m({objectives:e}){return a.jsxs("section",{className:Fn.objectives,children:[a.jsx("h2",{children:"Learning Objectives"}),a.jsx("p",{className:Fn.intro,children:"By the end of this module, you will be able to:"}),a.jsx("ul",{className:Fn.objectivesList,children:e.map((t,n)=>a.jsxs("li",{className:Fn.objective,children:[a.jsx("span",{className:Fn.checkmark,children:"✓"}),t]},n))})]})}const Nm="_activities_2qhkg_1",Cm="_activity_2qhkg_7",Pm="_activityIcon_2qhkg_22",jm="_activityContent_2qhkg_27",Im="_activityTitle_2qhkg_31",Em="_activityDescription_2qhkg_37",Jt={activities:Nm,activity:Cm,activityIcon:Pm,activityContent:jm,activityTitle:Im,activityDescription:Em};function Am({activities:e}){const t=n=>({tour:"🚀",reflection:"💭",lesson:"📚",exercise:"✏️",game:"🎮",drill:"🎯",lab:"🔬",visual:"👁️",reference:"📋",formula:"🔢",worksheet:"📝",scenario:"🏢",demo:"🖥️",puzzle:"🧩",comparison:"🔄",checklist:"✅"})[n]||"📌";return a.jsx("div",{className:Jt.activities,children:e.map((n,r)=>a.jsxs("div",{className:Jt.activity,children:[a.jsx("div",{className:Jt.activityIcon,children:t(n.type)}),a.jsxs("div",{className:Jt.activityContent,children:[a.jsx("h3",{className:Jt.activityTitle,children:n.title}),a.jsx("p",{className:Jt.activityDescription,children:n.description})]})]},r))})}const Tm="_assessment_1qpj6_1",Rm="_assessmentInfo_1qpj6_11",Lm="_noQuiz_1qpj6_26",Dm="_quizInfo_1qpj6_33",Mm="_quizHeader_1qpj6_42",zm="_progress_1qpj6_49",Bm="_question_1qpj6_54",Fm="_options_1qpj6_66",Om="_option_1qpj6_66",Wm="_textInput_1qpj6_91",$m="_navigation_1qpj6_109",Um="_primaryButton_1qpj6_115",qm="_secondaryButton_1qpj6_116",Vm="_results_1qpj6_154",Hm="_scoreCard_1qpj6_158",Gm="_passed_1qpj6_165",Qm="_failed_1qpj6_170",Ym="_score_1qpj6_158",Km="_scoreLabel_1qpj6_189",Xm="_summary_1qpj6_194",Zm="_actions_1qpj6_209",Jm="_review_1qpj6_216",e2="_reviewItem_1qpj6_228",t2="_correct_1qpj6_236",n2="_incorrect_1qpj6_240",r2="_reviewAnswer_1qpj6_249",s2="_explanation_1qpj6_253",D={assessment:Tm,assessmentInfo:Rm,noQuiz:Lm,quizInfo:Dm,quizHeader:Mm,progress:zm,question:Bm,options:Fm,option:Om,textInput:Wm,navigation:$m,primaryButton:Um,secondaryButton:qm,results:Vm,scoreCard:Hm,passed:Gm,failed:Qm,score:Ym,scoreLabel:Km,summary:Xm,actions:Zm,review:Jm,reviewItem:e2,correct:t2,incorrect:n2,reviewAnswer:r2,explanation:s2};function o2({assessment:e,quiz:t}){const{id:n}=od(),r=parseInt(n),{updateQuizScore:s,completeModule:o}=ya(),[i,l]=b.useState(!1),[u,c]=b.useState(0),[m,h]=b.useState({}),[g,y]=b.useState(!1),[v,w]=b.useState(!1),[k,f]=b.useState(!1),d=(z,A)=>{h({...m,[z]:A})},p=()=>{u<t.length-1?c(u+1):y(!0)},x=()=>{u>0&&c(u-1)},S=()=>{if(!t)return 0;let z=0;return t.forEach(A=>{zl(A,m[A.id])&&z++}),Math.round(z/t.length*100)},P=()=>{c(0),h({}),y(!1),l(!1),w(!1),f(!1)};if(!t||t.length===0)return a.jsxs("div",{className:D.assessment,children:[a.jsx("h2",{children:"Assessment"}),a.jsxs("div",{className:D.assessmentInfo,children:[a.jsxs("p",{children:[a.jsx("strong",{children:"Type:"})," ",e.type]}),a.jsxs("p",{children:[a.jsx("strong",{children:"Task:"})," ",e.prompt]}),a.jsxs("p",{children:[a.jsx("strong",{children:"Description:"})," ",e.description]}),e.passingScore&&a.jsxs("p",{children:[a.jsx("strong",{children:"Passing Score:"})," ",e.passingScore,"%"]})]}),a.jsx("p",{className:D.noQuiz,children:"Interactive quiz coming soon!"})]});if(b.useEffect(()=>{if(g&&!v){const z=S(),A=e.passingScore?z>=e.passingScore:!0;s(r,z,t.length),A&&o(r),w(!0)}},[g,v,r,e.passingScore,s,o,t]),g){const z=S(),A=e.passingScore?z>=e.passingScore:!0;return a.jsxs("div",{className:D.assessment,children:[a.jsx("h2",{children:"Quiz Results"}),a.jsxs("div",{className:D.results,children:[a.jsxs("div",{className:`${D.scoreCard} ${A?D.passed:D.failed}`,children:[a.jsxs("div",{className:D.score,children:[z,"%"]}),a.jsx("div",{className:D.scoreLabel,children:A?"🎉 Passed!":"📚 Keep Studying"})]}),a.jsxs("div",{className:D.summary,children:[a.jsx("h3",{children:"Summary"}),a.jsxs("p",{children:["You answered ",Object.keys(m).length," out of ",t.length," questions."]}),e.passingScore&&a.jsxs("p",{children:["Passing score: ",e.passingScore,"%"]})]}),a.jsxs("div",{className:D.actions,children:[a.jsx("button",{className:D.primaryButton,onClick:P,children:"Try Again"}),a.jsx("button",{className:D.secondaryButton,onClick:()=>f(!k),children:k?"Hide Review":"Review Answers"})]}),k&&a.jsxs("div",{className:D.review,children:[a.jsx("h3",{children:"Question Review"}),t.map(($,Rt)=>{const Qe=m[$.id],_r=zl($,Qe);return a.jsxs("div",{className:`${D.reviewItem} ${_r?D.correct:D.incorrect}`,children:[a.jsxs("h4",{children:["Question ",Rt+1,": ",$.question]}),a.jsxs("div",{className:D.reviewAnswer,children:[a.jsxs("p",{children:[a.jsx("strong",{children:"Your answer:"})," ",$.type==="multiple-choice"?$.options[Qe]:$.type==="true-false"?Qe?"True":"False":Qe||"(No answer)"]}),a.jsxs("p",{children:[a.jsx("strong",{children:"Correct answer:"})," ",$.type==="multiple-choice"?$.options[$.correctAnswer]:$.type==="true-false"?$.correctAnswer?"True":"False":$.correctAnswer]}),$.explanation&&a.jsxs("p",{className:D.explanation,children:[a.jsx("strong",{children:"Explanation:"})," ",$.explanation]})]})]},$.id)})]})]})]})}if(!i)return a.jsxs("div",{className:D.assessment,children:[a.jsx("h2",{children:"Module Assessment"}),a.jsxs("div",{className:D.assessmentInfo,children:[a.jsxs("p",{children:[a.jsx("strong",{children:"Type:"})," ",e.type]}),a.jsxs("p",{children:[a.jsx("strong",{children:"Task:"})," ",e.prompt]}),a.jsxs("p",{children:[a.jsx("strong",{children:"Description:"})," ",e.description]}),e.passingScore&&a.jsxs("p",{children:[a.jsx("strong",{children:"Passing Score:"})," ",e.passingScore,"%"]})]}),a.jsxs("div",{className:D.quizInfo,children:[a.jsx("h3",{children:"Ready to Test Your Knowledge?"}),a.jsxs("p",{children:["This quiz contains ",t.length," questions covering the key concepts from this module."]}),a.jsx("button",{className:D.primaryButton,onClick:()=>l(!0),children:"Start Quiz"})]})]});const N=t[u],E=m[N.id]!==void 0;return a.jsxs("div",{className:D.assessment,children:[a.jsxs("div",{className:D.quizHeader,children:[a.jsx("h2",{children:"Module Quiz"}),a.jsxs("div",{className:D.progress,children:["Question ",u+1," of ",t.length]})]}),a.jsxs("div",{className:D.question,children:[a.jsx("h3",{children:N.question}),N.type==="multiple-choice"&&a.jsx("div",{className:D.options,children:N.options.map((z,A)=>a.jsxs("label",{className:D.option,children:[a.jsx("input",{type:"radio",name:`question-${N.id}`,value:A,checked:m[N.id]===A,onChange:()=>d(N.id,A)}),a.jsx("span",{children:z})]},A))}),N.type==="true-false"&&a.jsxs("div",{className:D.options,children:[a.jsxs("label",{className:D.option,children:[a.jsx("input",{type:"radio",name:`question-${N.id}`,value:!0,checked:m[N.id]===!0,onChange:()=>d(N.id,!0)}),a.jsx("span",{children:"True"})]}),a.jsxs("label",{className:D.option,children:[a.jsx("input",{type:"radio",name:`question-${N.id}`,value:!1,checked:m[N.id]===!1,onChange:()=>d(N.id,!1)}),a.jsx("span",{children:"False"})]})]}),(N.type==="fill-in"||N.type==="conversion")&&a.jsx("div",{className:D.textInput,children:a.jsx("input",{type:"text",placeholder:"Enter your answer...",value:m[N.id]||"",onChange:z=>d(N.id,z.target.value)})})]}),a.jsxs("div",{className:D.navigation,children:[a.jsx("button",{className:D.secondaryButton,onClick:x,disabled:u===0,children:"Previous"}),a.jsx("button",{className:D.primaryButton,onClick:p,disabled:!E,children:u===t.length-1?"Finish":"Next"})]})]})}const i2="_practice_p5n8n_1",a2="_header_p5n8n_6",l2="_progress_p5n8n_20",u2="_exerciseContent_p5n8n_29",c2="_conversionExercise_p5n8n_37",d2="_powersExercise_p5n8n_38",f2="_problem_p5n8n_49",p2="_problemRow_p5n8n_53",h2="_decimal_p5n8n_60",m2="_binary_p5n8n_61",g2="_power_p5n8n_38",v2="_arrow_p5n8n_81",y2="_input_p5n8n_86",w2="_correct_p5n8n_101",k2="_incorrect_p5n8n_106",x2="_checkBtn_p5n8n_111",b2="_feedback_p5n8n_126",S2="_success_p5n8n_132",_2="_error_p5n8n_137",N2="_navigation_p5n8n_141",C2="_navButton_p5n8n_148",P2="_tools_p5n8n_170",j2="_toolsGrid_p5n8n_186",I2="_noPractice_p5n8n_192",E2="_placeholder_p5n8n_198",A2="_andExercise_p5n8n_206",T2="_networkExercise_p5n8n_207",R2="_andProblem_p5n8n_218",L2="_operands_p5n8n_225",D2="_operator_p5n8n_232",M2="_equals_p5n8n_237",z2="_networkProblem_p5n8n_241",B2="_given_p5n8n_247",F2="_answerRow_p5n8n_254",C={practice:i2,header:a2,progress:l2,exerciseContent:u2,conversionExercise:c2,powersExercise:d2,problem:f2,problemRow:p2,decimal:h2,binary:m2,power:g2,arrow:v2,input:y2,correct:w2,incorrect:k2,checkBtn:x2,feedback:b2,success:S2,error:_2,navigation:N2,navButton:C2,tools:P2,toolsGrid:j2,noPractice:I2,placeholder:E2,andExercise:A2,networkExercise:T2,andProblem:R2,operands:L2,operator:D2,equals:M2,networkProblem:z2,given:B2,answerRow:F2};function O2({exercises:e,moduleId:t}){const[n,r]=b.useState(0),[s,o]=b.useState({}),[i,l]=b.useState({}),u=k=>k.replace(/[^01]/g,"").slice(0,8);if(!e||!e.exercises||e.exercises.length===0)return a.jsx("div",{className:C.noPractice,children:a.jsx("p",{children:"No practice exercises available for this module yet."})});const c=e.exercises[n],m=(k,f)=>{const d=`${n}-${k}`;o({...s,[d]:f})},h=k=>{const f=`${n}-${k}`;l({...i,[f]:!0})},g=()=>{n<e.exercises.length-1&&r(n+1)},y=()=>{n>0&&r(n-1)},v=()=>{switch(c.type){case"decimal-to-binary":return a.jsxs("div",{className:C.conversionExercise,children:[a.jsx("h3",{children:"Convert Decimal to Binary"}),a.jsx("p",{children:"Convert each decimal number to its 8-bit binary representation."}),c.problems.map((k,f)=>{const d=`${n}-${f}`,p=s[d]||"",x=p===k.binary,S=i[d];return a.jsxs("div",{className:C.problem,children:[a.jsxs("div",{className:C.problemRow,children:[a.jsx("span",{className:C.decimal,children:k.decimal}),a.jsx("span",{className:C.arrow,children:"→"}),a.jsx("input",{type:"text",className:`${C.input} ${S?x?C.correct:C.incorrect:""}`,value:p,onChange:P=>m(f,P.target.value),placeholder:"Binary (8 bits)",maxLength:8}),a.jsx("button",{className:C.checkBtn,onClick:()=>h(f),children:"Check"})]}),S&&a.jsx("div",{className:C.feedback,children:x?a.jsx("span",{className:C.success,children:"✓ Correct!"}):a.jsxs("span",{className:C.error,children:["✗ Incorrect. The answer is ",k.binary]})})]},f)})]});case"binary-to-decimal":return a.jsxs("div",{className:C.conversionExercise,children:[a.jsx("h3",{children:"Convert Binary to Decimal"}),a.jsx("p",{children:"Convert each binary number to its decimal equivalent."}),c.problems.map((k,f)=>{const d=`${n}-${f}`,p=s[d]||"",x=parseInt(p)===k.decimal,S=i[d];return a.jsxs("div",{className:C.problem,children:[a.jsxs("div",{className:C.problemRow,children:[a.jsx("span",{className:C.binary,children:k.binary}),a.jsx("span",{className:C.arrow,children:"→"}),a.jsx("input",{type:"text",className:`${C.input} ${S?x?C.correct:C.incorrect:""}`,value:p,onChange:P=>m(f,P.target.value),placeholder:"Decimal",maxLength:3}),a.jsx("button",{className:C.checkBtn,onClick:()=>h(f),children:"Check"})]}),S&&a.jsx("div",{className:C.feedback,children:x?a.jsx("span",{className:C.success,children:"✓ Correct!"}):a.jsxs("span",{className:C.error,children:["✗ Incorrect. The answer is ",k.decimal]})})]},f)})]});case"powers-of-two":return a.jsxs("div",{className:C.powersExercise,children:[a.jsx("h3",{children:"Powers of 2"}),a.jsx("p",{children:"Fill in the values for each power of 2."}),c.problems.map((k,f)=>{const d=`${n}-${f}`,p=s[d]||"",x=parseInt(p)===k.value,S=i[d];return a.jsxs("div",{className:C.problem,children:[a.jsxs("div",{className:C.problemRow,children:[a.jsxs("span",{className:C.power,children:["2^",k.power," ="]}),a.jsx("input",{type:"text",className:`${C.input} ${S?x?C.correct:C.incorrect:""}`,value:p,onChange:P=>m(f,P.target.value),placeholder:"Value",maxLength:3}),a.jsx("button",{className:C.checkBtn,onClick:()=>h(f),children:"Check"})]}),S&&a.jsx("div",{className:C.feedback,children:x?a.jsx("span",{className:C.success,children:"✓ Correct!"}):a.jsxs("span",{className:C.error,children:["✗ Incorrect. 2^",k.power," = ",k.value]})})]},f)})]});case"and-operation":return a.jsxs("div",{className:C.andExercise,children:[a.jsx("h3",{children:"AND Operation Practice"}),a.jsx("p",{children:"Calculate the result of each AND operation."}),c.problems.map((k,f)=>{const d=`${n}-${f}`,p=s[d]||"",x=p===k.result,S=i[d];return a.jsxs("div",{className:C.problem,children:[a.jsxs("div",{className:C.andProblem,children:[a.jsxs("div",{className:C.operands,children:[a.jsx("span",{className:C.binary,children:k.operand1}),a.jsx("span",{className:C.operator,children:"AND"}),a.jsx("span",{className:C.binary,children:k.operand2}),a.jsx("span",{className:C.equals,children:"="})]}),a.jsx("input",{type:"text",className:`${C.input} ${S?x?C.correct:C.incorrect:""}`,value:p,onChange:P=>m(f,u(P.target.value)),placeholder:"Result (8 bits)",maxLength:8}),a.jsx("button",{className:C.checkBtn,onClick:()=>h(f),children:"Check"})]}),S&&a.jsx("div",{className:C.feedback,children:x?a.jsx("span",{className:C.success,children:"✓ Correct!"}):a.jsxs("span",{className:C.error,children:["✗ Incorrect. The answer is ",k.result]})})]},f)})]});case"network-address":return a.jsxs("div",{className:C.networkExercise,children:[a.jsx("h3",{children:"Find Network Addresses"}),a.jsx("p",{children:"Calculate the network address for each IP and subnet mask."}),c.problems.map((k,f)=>{const d=`${n}-${f}`,p=s[d]||"",x=p===k.network,S=i[d];return a.jsxs("div",{className:C.problem,children:[a.jsxs("div",{className:C.networkProblem,children:[a.jsxs("div",{className:C.given,children:[a.jsxs("span",{children:["IP: ",k.ip]}),a.jsxs("span",{children:["Mask: ",k.mask]})]}),a.jsxs("div",{className:C.answerRow,children:[a.jsx("span",{children:"Network:"}),a.jsx("input",{type:"text",className:`${C.input} ${S?x?C.correct:C.incorrect:""}`,value:p,onChange:P=>m(f,P.target.value),placeholder:"x.x.x.x",style:{width:"150px"}}),a.jsx("button",{className:C.checkBtn,onClick:()=>h(f),children:"Check"})]})]}),S&&a.jsx("div",{className:C.feedback,children:x?a.jsx("span",{className:C.success,children:"✓ Correct!"}):a.jsxs("span",{className:C.error,children:["✗ Incorrect. The network address is ",k.network]})})]},f)})]});default:return a.jsx("div",{className:C.placeholder,children:a.jsxs("p",{children:['Exercise type "',c.type,'" not yet implemented.']})})}},w=t===1||t===2;return a.jsxs("div",{className:C.practice,children:[a.jsxs("div",{className:C.header,children:[a.jsx("h2",{children:e.title}),a.jsxs("div",{className:C.progress,children:["Exercise ",n+1," of ",e.exercises.length]})]}),a.jsx("div",{className:C.exerciseContent,children:v()}),a.jsxs("div",{className:C.navigation,children:[a.jsx("button",{className:C.navButton,onClick:y,disabled:n===0,children:"← Previous"}),a.jsx("button",{className:C.navButton,onClick:g,disabled:n===e.exercises.length-1,children:"Next →"})]}),w&&a.jsxs("div",{className:C.tools,children:[a.jsx("h3",{children:"Practice Tools"}),a.jsx("p",{children:"Use these tools to help check your work:"}),a.jsxs("div",{className:C.toolsGrid,children:[t===1&&a.jsx(pd,{}),t===2&&a.jsxs(a.Fragment,{children:[a.jsx(md,{}),a.jsx(hd,{})]})]})]})]})}const W2="_module_1cal5_1",$2="_breadcrumb_1cal5_6",U2="_header_1cal5_20",q2="_tabs_1cal5_34",V2="_tab_1cal5_34",H2="_activeTab_1cal5_61",G2="_content_1cal5_71",Q2="_overview_1cal5_80",Y2="_section_1cal5_85",K2="_goal_1cal5_95",X2="_prerequisites_1cal5_102",Z2="_navigation_1cal5_130",J2="_navButton_1cal5_137",eg="_navButtonNext_1cal5_157",tg="_error_1cal5_161",ng="_homeLink_1cal5_174",U={module:W2,breadcrumb:$2,header:U2,tabs:q2,tab:V2,activeTab:H2,content:G2,overview:Q2,section:Y2,goal:K2,prerequisites:X2,navigation:Z2,navButton:J2,navButtonNext:eg,error:tg,homeLink:ng};function rg(){const{id:e}=od(),t=parseInt(e),[n,r]=b.useState("overview"),{startModule:s,getModuleProgress:o,updateModuleProgress:i}=ya(),l=zp(t),u=Fp(t),c=Op[t],m=o(t),h=t>0?pn[t-1]:null,g=t<pn.length-1?pn[t+1]:null;return b.useEffect(()=>{l&&!m.started&&s(t)},[t,l,m.started,s]),b.useEffect(()=>{if(l&&m.started){let y=25;n==="content"&&(y=50),n==="practice"&&(y=75),n==="quiz"&&(y=90),i(t,{progress:y})}},[n,t,l,m.started,i]),l?a.jsxs("div",{className:U.module,children:[a.jsxs("nav",{className:U.breadcrumb,children:[a.jsx(ye,{to:"/",children:"Home"}),a.jsx("span",{children:" / "}),a.jsxs("span",{children:["Module ",t]})]}),a.jsx("header",{className:U.header,children:a.jsxs("h1",{children:["Module ",t,": ",l.title]})}),a.jsxs("div",{className:U.tabs,children:[a.jsx("button",{className:`${U.tab} ${n==="overview"?U.activeTab:""}`,onClick:()=>r("overview"),children:"Overview"}),a.jsx("button",{className:`${U.tab} ${n==="content"?U.activeTab:""}`,onClick:()=>r("content"),children:"Lesson"}),a.jsx("button",{className:`${U.tab} ${n==="practice"?U.activeTab:""}`,onClick:()=>r("practice"),children:"Practice"}),a.jsx("button",{className:`${U.tab} ${n==="quiz"?U.activeTab:""}`,onClick:()=>r("quiz"),children:"Quiz"})]}),a.jsxs("div",{className:U.content,children:[n==="overview"&&a.jsxs("div",{className:U.overview,children:[a.jsxs("section",{className:U.section,children:[a.jsx("h2",{children:"Module Goal"}),a.jsx("p",{className:U.goal,children:l.goal})]}),a.jsx(_m,{objectives:l.objectives}),a.jsxs("section",{className:U.section,children:[a.jsx("h2",{children:"What You'll Do"}),a.jsx(Am,{activities:l.activities})]}),a.jsxs("section",{className:U.section,children:[a.jsx("h2",{children:"Prerequisites"}),l.prerequisites.length>0?a.jsx("ul",{className:U.prerequisites,children:l.prerequisites.map(y=>{const v=pn.find(w=>w.id===y);return a.jsx("li",{children:a.jsxs(ye,{to:`/module/${y}`,children:["Module ",y,": ",v==null?void 0:v.title]})},y)})}):a.jsx("p",{children:"None - this is a foundational module!"})]}),a.jsxs("section",{className:U.section,children:[a.jsx("h2",{children:"Time Estimate"}),a.jsxs("p",{children:[l.estimatedTime," minutes"]})]})]}),n==="content"&&a.jsx(ym,{module:l}),n==="practice"&&a.jsx(O2,{exercises:c,moduleId:t}),n==="quiz"&&a.jsx(o2,{assessment:l.assessment,quiz:u})]}),a.jsxs("nav",{className:U.navigation,children:[h&&a.jsxs(ye,{to:`/module/${h.id}`,className:U.navButton,children:["← Module ",h.id,": ",h.title]}),g&&a.jsxs(ye,{to:`/module/${g.id}`,className:`${U.navButton} ${U.navButtonNext}`,children:["Module ",g.id,": ",g.title," →"]})]})]}):a.jsxs("div",{className:U.error,children:[a.jsx("h1",{children:"Module Not Found"}),a.jsx("p",{children:"The requested module does not exist."}),a.jsx(ye,{to:"/",className:U.homeLink,children:"Return to Home"})]})}const sg="_progress_1h3xp_1",og="_overview_1h3xp_12",ig="_stat_1h3xp_19",ag="_statValue_1h3xp_27",lg="_statLabel_1h3xp_34",ug="_modules_1h3xp_41",cg="_moduleCard_1h3xp_50",dg="_moduleHeader_1h3xp_58",fg="_moduleInfo_1h3xp_65",pg="_moduleNumber_1h3xp_69",hg="_moduleTitle_1h3xp_76",mg="_moduleStatus_1h3xp_82",gg="_completed_1h3xp_86",vg="_incomplete_1h3xp_91",yg="_notStarted_1h3xp_96",wg="_progressBar_1h3xp_102",kg="_progressFill_1h3xp_110",xg="_moduleFooter_1h3xp_116",bg="_moduleLink_1h3xp_122",Sg="_quizScore_1h3xp_135",_g="_actions_1h3xp_140",Ng="_resetButton_1h3xp_150",Cg="_exportButton_1h3xp_151",Pg="_importButton_1h3xp_152",O={progress:sg,overview:og,stat:ig,statValue:ag,statLabel:lg,modules:ug,moduleCard:cg,moduleHeader:dg,moduleInfo:fg,moduleNumber:pg,moduleTitle:hg,moduleStatus:mg,completed:gg,incomplete:vg,notStarted:yg,progressBar:wg,progressFill:kg,moduleFooter:xg,moduleLink:bg,quizScore:Sg,actions:_g,resetButton:Ng,exportButton:Cg,importButton:Pg};function jg(){const{getModuleProgress:e,getQuizScore:t,overallProgress:n,resetProgress:r,exportProgress:s,importProgress:o}=ya(),i=pn.map(c=>{const m=e(c.id),h=t(c.id);return{...c,...m,quizScore:h}}),l=c=>{const m=c.target.files[0];m&&o(m).then(()=>{alert("Progress imported successfully!"),window.location.reload()}).catch(h=>{alert("Failed to import progress: "+h.message)})},u=()=>{window.confirm("Are you sure you want to reset all progress? This cannot be undone.")&&(r(),window.location.reload())};return a.jsxs("div",{className:O.progress,children:[a.jsx("h1",{children:"Your Learning Progress"}),a.jsxs("div",{className:O.overview,children:[a.jsxs("div",{className:O.stat,children:[a.jsxs("div",{className:O.statValue,children:[n.percentage,"%"]}),a.jsx("div",{className:O.statLabel,children:"Overall Progress"})]}),a.jsxs("div",{className:O.stat,children:[a.jsxs("div",{className:O.statValue,children:[n.completedModules,"/",n.totalModules]}),a.jsx("div",{className:O.statLabel,children:"Modules Completed"})]}),a.jsxs("div",{className:O.stat,children:[a.jsx("div",{className:O.statValue,children:i.filter(c=>c.quizScore&&c.quizScore.percentage>=80).length}),a.jsx("div",{className:O.statLabel,children:"Quizzes Passed"})]})]}),a.jsxs("div",{className:O.modules,children:[a.jsx("h2",{children:"Module Progress"}),i.map(c=>a.jsxs("div",{className:O.moduleCard,children:[a.jsxs("div",{className:O.moduleHeader,children:[a.jsxs("div",{className:O.moduleInfo,children:[a.jsxs("span",{className:O.moduleNumber,children:["Module ",c.id]}),a.jsx("h3",{className:O.moduleTitle,children:c.title})]}),a.jsx("div",{className:O.moduleStatus,children:c.completed?a.jsx("span",{className:O.completed,children:"✓ Completed"}):c.started?a.jsxs("span",{className:O.incomplete,children:[c.progress||0,"% Complete"]}):a.jsx("span",{className:O.notStarted,children:"Not Started"})})]}),a.jsx("div",{className:O.progressBar,children:a.jsx("div",{className:O.progressFill,style:{width:`${c.progress||0}%`}})}),a.jsxs("div",{className:O.moduleFooter,children:[a.jsxs(ye,{to:`/module/${c.id}`,className:O.moduleLink,children:[c.completed?"Review":c.started?"Continue":"Start"," →"]}),c.quizScore&&a.jsxs("span",{className:O.quizScore,children:["Quiz: ",c.quizScore.percentage,"%",c.quizScore.attempts>1&&` (${c.quizScore.attempts} attempts)`]})]})]},c.id))]}),a.jsxs("div",{className:O.actions,children:[a.jsx("button",{className:O.resetButton,onClick:u,children:"Reset All Progress"}),a.jsx("button",{className:O.exportButton,onClick:s,children:"Export Progress"}),a.jsxs("label",{className:O.importButton,children:["Import Progress",a.jsx("input",{type:"file",accept:".json",onChange:l,style:{display:"none"}})]})]})]})}function Ig(){return a.jsx(Zf,{children:a.jsx(Vf,{basename:"/subnets",children:a.jsx(Sp,{children:a.jsxs(Bf,{children:[a.jsx(ns,{path:"/",element:a.jsx(Mp,{})}),a.jsx(ns,{path:"/module/:id",element:a.jsx(rg,{})}),a.jsx(ns,{path:"/progress",element:a.jsx(jg,{})})]})})})})}Co.createRoot(document.getElementById("root")).render(a.jsx(Ql.StrictMode,{children:a.jsx(Ig,{})}));

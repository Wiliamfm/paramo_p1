import{o as at,h as st,a as U,c as lt,u as N,b as y,T as ct,E as ut,k as z,_ as i,H as _t,$ as G,g as K,s as dt,d as mt,S as pt,w as vt}from"./q-DPFv6FGW.js";import{j as ft,c as yt,C as ht,d as Et,D as St,R as Ct,e as wt,f as Rt,h as Lt,i as bt,t as gt,k as Z,m as x,r as tt,n as et,l as ot,o as J,q as Pt,v as At,w as It,x as q,y as g,z as Dt,A as qt,B as Tt}from"./q-_PqAYfkm.js";const Ot=h=>{at(z(()=>i(()=>Promise.resolve().then(()=>W),void 0),"s_RPDJAz33WLA"));const n=ft();if(!(n!=null&&n.params))throw new Error("Missing Qwik City Env Data");const E=st("url");if(!E)throw new Error("Missing Qwik URL Env Data");const C=new URL(E),a=U({url:C,params:n.params,isNavigating:!1,prevUrl:void 0},{deep:!1}),w={},c=lt(U(n.response.loaders,{deep:!1})),p=N({type:"initial",dest:C,forceReload:!1,replaceState:!1,scroll:!0}),v=U(yt),R=U({headings:void 0,menu:void 0}),u=N(),o=n.response.action,L=o?n.response.loaders[o]:void 0,d=N(L?{id:o,data:n.response.formData,output:{result:L,status:n.response.status}}:void 0),P=z(()=>i(()=>Promise.resolve().then(()=>W),void 0),"s_fX0bDjeJa0E",[d,w,p,a]);return y(ht,R),y(Et,u),y(St,v),y(Ct,a),y(wt,P),y(Rt,c),y(Lt,d),y(bt,p),ct(z(()=>i(()=>Promise.resolve().then(()=>W),void 0),"s_02wMImzEAbk",[d,R,u,v,n,P,c,w,h,p,a])),ut(_t,null,3,"qY_0")};const l=()=>i(()=>import("./q-CHRVJ3fM.js"),[]),Q=[["/",[l,()=>i(()=>import("./q-BEiTSYW3.js"),[])]],["admin/create/",[l,()=>i(()=>import("./q-C4XDJSgE.js"),[])]],["admin/edit/[id]/",[l,()=>i(()=>import("./q-64jjZ1Pp.js"),[])]],["about/",[l,()=>i(()=>import("./q-CAeN1YAT.js"),[])]],["admin/",[l,()=>i(()=>import("./q-T4c9k4wQ.js"),[])]],["backstage-with-brands/",[l,()=>i(()=>import("./q-BfQYXLdU.js"),[])]],["fan-insights/",[l,()=>i(()=>import("./q-dSBVo0QL.js"),[])]],["ideas/",[l,()=>i(()=>import("./q-B7UxOpgO.js"),[])]],["login/",[l,()=>i(()=>import("./q-CDLnocYM.js"),[])]],["news/",[l,()=>i(()=>import("./q-DskSp-7m.js"),[])]],["news/[newId]/",[l,()=>i(()=>import("./q-Dg5-cPJ-.js"),[])]]],B=[];const $=!0;const kt=async(h,n)=>{const[E,C,a,w]=G(),{type:c="link",forceReload:p=h===void 0,replaceState:v=!1,scroll:R=!0}=typeof n=="object"?n:{forceReload:n},u=a.value.dest,o=h===void 0?u:gt(h,w.url);if(!Z(o,u)){location.href=o.href;return}if(!p&&x(o,u)){c==="link"&&o.href!==location.href&&history.pushState(null,"",o),tt(c,o,new URL(location.href),et()),c==="popstate"&&(window._qCityScrollEnabled=!0);return}return a.value={type:c,dest:o,forceReload:p,replaceState:v,scroll:R},ot(o,K()),J(Q,B,$,o.pathname),E.value=void 0,w.isNavigating=!0,new Promise(L=>{C.r=L})},Vt=({track:h})=>{const[n,E,C,a,w,c,p,v,R,u,o]=G();async function L(){var X;const[d,P]=h(()=>[u.value,n.value]),nt=dt(""),A=o.url,m=P?"form":d.type,rt=d.replaceState;let r,I,M=null,T;{r=new URL(d.dest,location),r.pathname.endsWith("/")||(r.pathname+="/");let O=J(Q,B,$,r.pathname);T=K();const k=I=await ot(r,T,{action:P,clearCache:!0});if(!k){u.untrackedValue={type:m,dest:r};return}const V=k.href,H=new URL(V,r);Pt(H,r)||(r=H,O=J(Q,B,$,r.pathname));try{M=await O}catch{window.location.href=V;return}}if(M){const[O,k,V,H]=M,D=V,it=D[D.length-1];o.prevUrl=A,o.url=r,o.params={...k},u.untrackedValue={type:m,dest:r};const b=At(I,o,D,nt);E.headings=it.headings,E.menu=H,C.value=mt(D),a.links=b.links,a.meta=b.meta,a.styles=b.styles,a.scripts=b.scripts,a.title=b.title,a.frontmatter=b.frontmatter;{R.viewTransition!==!1&&(document.__q_view_transition__=!0);let F;m==="popstate"&&(F=et()),(d.scroll&&(!d.forceReload||!x(r,A))&&(m==="link"||m==="popstate")||m==="form"&&!x(r,A))&&(document.__q_scroll_restore__=()=>tt(m,r,A,F));const Y=I==null?void 0:I.loaders,t=window;if(Y&&Object.assign(p,Y),It.clear(),!t._qCitySPA){if(t._qCitySPA=!0,history.scrollRestoration="manual",t.addEventListener("popstate",()=>{t._qCityScrollEnabled=!1,clearTimeout(t._qCityScrollDebounce),c(location.href,{type:"popstate"})}),t.removeEventListener("popstate",t._qCityInitPopstate),t._qCityInitPopstate=void 0,!t._qCityHistoryPatch){t._qCityHistoryPatch=!0;const s=history.pushState,f=history.replaceState,S=e=>(e===null||typeof e>"u"?e={}:(e==null?void 0:e.constructor)!==Object&&(e={_data:e}),e._qCityScroll=e._qCityScroll||g(document.documentElement),e);history.pushState=(e,_,j)=>(e=S(e),s.call(history,e,_,j)),history.replaceState=(e,_,j)=>(e=S(e),f.call(history,e,_,j))}document.body.addEventListener("click",s=>{if(s.defaultPrevented)return;const f=s.target.closest("a[href]");if(f&&!f.hasAttribute("preventdefault:click")){const S=f.getAttribute("href"),e=new URL(location.href),_=new URL(S,e);if(Z(_,e)&&x(_,e)){if(s.preventDefault(),!_.hash&&!_.href.endsWith("#")){_.href!==e.href&&history.pushState(null,"",_),t._qCityScrollEnabled=!1,clearTimeout(t._qCityScrollDebounce),q({...g(document.documentElement),x:0,y:0}),location.reload();return}c(f.getAttribute("href"))}}}),document.body.removeEventListener("click",t._qCityInitAnchors),t._qCityInitAnchors=void 0,window.navigation||(document.addEventListener("visibilitychange",()=>{if(t._qCityScrollEnabled&&document.visibilityState==="hidden"){const s=g(document.documentElement);q(s)}},{passive:!0}),document.removeEventListener("visibilitychange",t._qCityInitVisibility),t._qCityInitVisibility=void 0),t.addEventListener("scroll",()=>{t._qCityScrollEnabled&&(clearTimeout(t._qCityScrollDebounce),t._qCityScrollDebounce=setTimeout(()=>{const s=g(document.documentElement);q(s),t._qCityScrollDebounce=void 0},200))},{passive:!0}),removeEventListener("scroll",t._qCityInitScroll),t._qCityInitScroll=void 0,(X=t._qCityBootstrap)==null||X.remove(),t._qCityBootstrap=void 0,Dt.resolve()}if(m!=="popstate"){t._qCityScrollEnabled=!1,clearTimeout(t._qCityScrollDebounce);const s=g(document.documentElement);q(s)}qt(window,m,A,r,rt),pt(T).then(()=>{var S;Tt(T).setAttribute("q:route",O);const f=g(document.documentElement);q(f),t._qCityScrollEnabled=!0,o.isNavigating=!1,(S=v.r)==null||S.call(v)})}}}L()},Ht=":root{view-transition-name:none}",W=Object.freeze(Object.defineProperty({__proto__:null,_hW:vt,s_02wMImzEAbk:Vt,s_RPDJAz33WLA:Ht,s_TxCFOy819ag:Ot,s_fX0bDjeJa0E:kt},Symbol.toStringTag,{value:"Module"}));export{vt as _hW,Vt as s_02wMImzEAbk,Ht as s_RPDJAz33WLA,Ot as s_TxCFOy819ag,kt as s_fX0bDjeJa0E};
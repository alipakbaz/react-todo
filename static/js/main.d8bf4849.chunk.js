(this["webpackJsonpfront-end"]=this["webpackJsonpfront-end"]||[]).push([[0],[,,,,,,,,,,,,,,,function(e,t,r){},,function(e,t,r){},function(e,t,r){},function(e,t,r){},function(e,t,r){},function(e,t,r){"use strict";r.r(t);var n=r(0),a=r(1),c=r.n(a),o=r(9),i=r.n(o),s=r(5),d=function(e){var t=e.dbName,r=e.version,n=e.objectsStore;return new Promise((function(e,a){var c=window.indexedDB.open(t,r);c.onupgradeneeded=function(e){var t=e.target.result;if(Array.isArray(n)){var r,a=Object(s.a)(n);try{for(a.s();!(r=a.n()).done;){var c=r.value;if(!t.objectStoreNames.contains(c.name)){var o=t.createObjectStore(c.name,c.optionalParameters);if(Array.isArray(c.indexes)){var i,d=Object(s.a)(c.indexes);try{for(d.s();!(i=d.n()).done;){var u=i.value;o.createIndex(u.name,u.keyPath,u.options)}}catch(l){d.e(l)}finally{d.f()}}}}}catch(l){a.e(l)}finally{a.f()}}},c.onsuccess=function(t){e(t.target.result)},c.onerror=function(e){a(e.target.error.message)}}))},u=function(e,t,r){return new Promise((function(n,a){var c=e.transaction(t,"readonly");c.onerror=function(e){a(e.target.error)},void 0!==r?c.objectStore(t).index(r).getAll().onsuccess=function(e){n(e.target.result)}:c.objectStore(t).getAll().onsuccess=function(e){n(e.target.result)}}))},l=function(e,t,r){return new Promise((function(n,a){var c=e.transaction(t,"readwrite");c.onerror=function(e){a(e.target.error)},c.objectStore(t).add(r).onsuccess=function(e){n({type:"ok",key:e.target.result})}}))},f=function(e){var t=e.db,r=e.store,n=e.key,a=e.data;return new Promise((function(e,c){var o=t.transaction(r,"readwrite");o.onerror=function(e){c(e.target.error)};var i=o.objectStore(r);i.get(n).onsuccess=function(t){var r=t.target.result;r?(Object.keys(a).map((function(e){r[e]=a[e]})),i.put(r).onsuccess=function(){e("ok")}):e("error")}}))},b=function(e,t,r){return new Promise((function(n,a){var c=e.transaction(t,"readwrite");c.onerror=function(e){a(e.target.error)},c.objectStore(t).delete(r).onsuccess=function(){n("ok")}}))},p=function(e){var t=e.db,r=e.store,n=e.order,a=e.step?e.step:1;return new Promise((function(e,c){var o=t.transaction(r,"readwrite");o.onerror=function(e){c(e.target.error)},o.objectStore(r).openCursor().onsuccess=function(t){var r=t.target.result;if(r){if(r.value.order>=n){var c=r.value;c.order=c.order+a,r.update(c)}r.continue()}else e("ok")}}))},v=function(){var e=document.getElementById("loadingScreen");e.style.display="none",e.style.opacity="0"},j=function(e){var t=window.getSelection();if(t.rangeCount){var r=t.getRangeAt(0);if(r.commonAncestorContainer.parentNode===e)return r.endOffset}return-1},x=(r(15),r(2)),h=r.n(x),m=r(3),k=r(4),O=r(6),I={dbName:"todo_db",version:1,objectsStore:[{name:"todo",optionalParameters:{keyPath:"id",autoIncrement:!0},indexes:[{name:"parentId",keyPath:"parentId",options:{unique:!1}},{name:"order",keyPath:"order",options:{unique:!1}}]}]},g=c.a.createContext({}),y=function(e){var t,r={},c=Object(a.useState)(!1),o=Object(O.a)(c,2),i=o[0],j=o[1],x=Object(a.useState)({list:[],newItemId:0,activeItem:{id:0,cursorPointer:-1}}),y=Object(O.a)(x,2),w=y[0],N=y[1],P=Object(a.useState)(null),S=Object(O.a)(P,2),T=S[0],E=S[1],A=function(e,t){return e.order>t.order?1:e.order<t.order?-1:0},B=function(e,t){var r=[],n={};return function t(a){for(var c=0;c<e.length;c++)parseInt(e[c].parentId)===parseInt(a)&&(r.push(e[c].id),n[e[c].id]=c,t(e[c].id))}(t),{children:r,childrenIndex:n}};return r.todoList=(t=w.list,function e(r){var n,a={},c=Object(s.a)(t);try{for(c.s();!(n=c.n()).done;){var o=n.value;parseInt(o.parentId)===parseInt(r)&&(a["key-".concat(o.id)]=o)}}catch(f){c.e(f)}finally{c.f()}var i=Object.keys(a);if(i.length>0){var d,u=Object(s.a)(i);try{for(u.s();!(d=u.n()).done;){var l=d.value;a[l].ch=e(a[l].id)}}catch(f){u.e(f)}finally{u.f()}return a}}(0)||{}),r.newItemId=parseInt(w.newItemId),r.activeItem=w.activeItem,r.addTodoItemByAddBtn=Object(k.a)(h.a.mark((function e(){var t,r,n;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=w.list,r={parentId:0,order:t.length>0?t[t.length-1].order+1:100,title:""},e.next=4,l(T,"todo",r);case 4:"ok"===(n=e.sent).type&&(r.id=n.key,t.push(r),N((function(e){var r={list:t,newItemId:n.key,activeItem:{id:0,cursorPointer:-1}};return Object(m.a)(Object(m.a)({},e),r)})));case 6:case"end":return e.stop()}}),e)}))),r.addTodoItemByEnter=function(){var e=Object(k.a)(h.a.mark((function e(t,r,n){var a,c,o,i,s;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=w.list,e.next=3,p({db:T,store:"todo",order:n+1});case 3:for(c=0;c<a.length;c++)a[c].order>=n+1&&(a[c].order=a[c].order+1);return o={parentId:t,order:n+1,title:""},e.next=7,l(T,"todo",o);case 7:if("ok"!==(i=e.sent).type){e.next=19;break}o.id=i.key,s=0;case 11:if(!(s<a.length)){e.next=18;break}if(a[s].id!==r){e.next=15;break}return a.splice(s+1,0,o),e.abrupt("break",18);case 15:s++,e.next=11;break;case 18:N((function(e){var t={list:a,newItemId:i.key,activeItem:{id:0,cursorPointer:-1}};return Object(m.a)(Object(m.a)({},e),t)}));case 19:case"end":return e.stop()}}),e)})));return function(t,r,n){return e.apply(this,arguments)}}(),r.updateTodoTitle=function(){var e=Object(k.a)(h.a.mark((function e(t,r,n){var a,c;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=w.list,c=0;case 2:if(!(c<a.length)){e.next=9;break}if(a[c].id!==t){e.next=6;break}return a[c].title=r,e.abrupt("break",9);case 6:c++,e.next=2;break;case 9:return e.next=11,f({db:T,store:"todo",key:t,data:{title:r}});case 11:N((function(e){var r={list:a,activeItem:{id:t,cursorPointer:n}};return Object(m.a)(Object(m.a)({},e),r)}));case 12:case"end":return e.stop()}}),e)})));return function(t,r,n){return e.apply(this,arguments)}}(),r.deleteTodo=function(){var e=Object(k.a)(h.a.mark((function e(t){var r,n,a,c,o,i,d,u,l;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b(T,"todo",t);case 2:if("ok"!==e.sent){e.next=35;break}r=w.list,n=B(r,t),a=n.children,c=Object(s.a)(a),e.prev=7,c.s();case 9:if((o=c.n()).done){e.next=15;break}return i=o.value,e.next=13,b(T,"todo",i);case 13:e.next=9;break;case 15:e.next=20;break;case 17:e.prev=17,e.t0=e.catch(7),c.e(e.t0);case 20:return e.prev=20,c.f(),e.finish(20);case 23:for(d=0;d<r.length;d++)a.includes(r[d].id)&&(r.splice(d,1),d--);u=0,l=0;case 26:if(!(l<r.length)){e.next=34;break}if(parseInt(r[l].id)!==parseInt(t)){e.next=31;break}return l>0?u=r[l-1].id:l+1<r.length&&(u=r[l+1].id),r.splice(l,1),e.abrupt("break",34);case 31:l++,e.next=26;break;case 34:N((function(e){var t={list:r,activeItem:{id:u}};return Object(m.a)(Object(m.a)({},e),t)}));case 35:case"end":return e.stop()}}),e,null,[[7,17,20,23]])})));return function(t){return e.apply(this,arguments)}}(),r.forwardIndentation=function(){var e=Object(k.a)(h.a.mark((function e(t){var r,n,a,c,o,i,s,d,u,l;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(r=t.id,n=t.parentId,a=t.cursorPointer,c=w.list,o=null,i=[],s=0;s<c.length;s++)c[s].parentId===n&&i.push(c[s]),c[s].id===r&&(o=s);d=null,u=0;case 7:if(!(u<i.length)){e.next=14;break}if(i[u].id!==r){e.next=11;break}return u>0&&(d=i[u-1]),e.abrupt("break",14);case 11:u++,e.next=7;break;case 14:if(null===d){e.next=20;break}return l={parentId:d.id},e.next=18,f({db:T,store:"todo",key:r,data:l});case 18:"ok"===e.sent&&(c[o].parentId=l.parentId,N((function(e){var t={list:c,activeItem:{id:r,cursorPointer:a}};return Object(m.a)(Object(m.a)({},e),t)})));case 20:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),r.backIndentation=function(){var e=Object(k.a)(h.a.mark((function e(t){var r,n,a,c,o,i,s,d,u,l,b,v,j,x,k,O,I,g,y,P,S,E,D,C,R,L;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.id,n=t.parentId,a=t.cursorPointer,c=w.list,0===n){e.next=54;break}for(o=null,i=null,s=null,d=0;d<c.length;d++)c[d].id===n&&(i=c[d].parentId),c[d].id===r&&(o=d);u=B(c,n).children,l=o+1;case 9:if(!(l<c.length)){e.next=16;break}if(c[l].parentId===n||u.includes(c[l].id)){e.next=13;break}return s=c[l].order,e.abrupt("break",16);case 13:l++,e.next=9;break;case 16:if(null===o||null===i){e.next=54;break}if(null!==s){e.next=35;break}if(b=B(c,r),v=b.children,j=b.childrenIndex,(x=c[c.length-1]).id===r||v.includes(x.id)){e.next=33;break}s=x.order+1,k=0;case 23:if(!(k<v.length)){e.next=33;break}return O=v[k],I=j[O],g=s+k+1,c[I].order=g,e.next=30,f({db:T,store:"todo",key:O,data:{order:g}});case 30:k++,e.next=23;break;case 33:e.next=50;break;case 35:return y=B(c,r),P=y.children,S=y.childrenIndex,e.next=38,p({db:T,store:"todo",order:s,step:P.length+1});case 38:for(E=0;E<c.length;E++)c[E].order>=s&&(c[E].order=c[E].order+P.length+1);D=0;case 40:if(!(D<P.length)){e.next=50;break}return C=P[D],R=S[C],L=s+D+1,c[R].order=L,e.next=47,f({db:T,store:"todo",key:C,data:{order:L}});case 47:D++,e.next=40;break;case 50:return e.next=52,f({db:T,store:"todo",key:r,data:null!==s?{order:s,parentId:i}:{parentId:i}});case 52:"ok"===e.sent&&(c[o].parentId=i,null!==s&&(c[o].order=s,c.sort(A)),N((function(e){var t={list:c,activeItem:{id:r,cursorPointer:a}};return Object(m.a)(Object(m.a)({},e),t)})));case 54:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Object(a.useEffect)((function(){(function(){var e=Object(k.a)(h.a.mark((function e(){var t,r;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d(I);case 2:return t=e.sent,E(t),e.next=6,u(t,"todo","order");case 6:r=e.sent,N((function(e){var t={list:r};return Object(m.a)(Object(m.a)({},e),t)})),j(!0),v();case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),Object(n.jsx)(g.Provider,{value:r,children:i&&e.children})},w=(r(17),r.p+"static/media/logo.ae8e8779.svg"),N=function(){return Object(n.jsx)("header",{children:Object(n.jsx)("div",{className:"container",children:Object(n.jsxs)("nav",{className:"nav flex-row align-items-center",children:[Object(n.jsx)("div",{className:"logo",children:Object(n.jsx)("img",{src:w,alt:"To-Do App",width:28,height:28,className:"fill-primary"})}),Object(n.jsx)("h1",{className:"title",children:"To-Do"})]})})})},P=(r(18),r(19),function e(t){var r=t.data,c=Object(a.useContext)(g),o=c.activeItem,i=c.addTodoItemByEnter,s=c.updateTodoTitle,d=c.deleteTodo,u=c.newItemId,l=c.forwardIndentation,f=c.backIndentation,b=Object(a.useRef)(),p=Object(a.useState)(!1),v=Object(O.a)(p,2),x=v[0],h=v[1];return Object(a.useEffect)((function(){x||(!function(){var e=null,t=r.title,n=0,a=r.title,c=function(){n=0,t!==a&&(s(r.id,t,j(b.current)),a=t)};b.current.addEventListener("focus",(function(){e=setInterval((function(){var e=(new Date).getTime();n>0&&e-n>400&&c()}),100)})),b.current.addEventListener("blur",(function(t){clearInterval(e),c()})),b.current.addEventListener("keydown",(function(e){e.ctrlKey&&e.shiftKey&&"Delete"===e.code?(e.preventDefault(),d(r.id)):"Tab"===e.code?(e.preventDefault(),e.shiftKey?f({id:r.id,parentId:r.parentId,cursorPointer:j(b.current)}):l({id:r.id,parentId:r.parentId,cursorPointer:j(b.current)})):"Enter"===e.code||"NumpadEnter"===e.code?(e.preventDefault(),b.current.blur(),"object"===typeof r.ch&&null!==r.ch?i(r.id,r.id,r.order):i(r.parentId,r.id,r.order)):setTimeout((function(){n=(new Date).getTime(),t=e.target.innerText}),0)}))}(),h(!0)),parseInt(r.id)===o.id?(b.current.focus(),o.cursorPointer>=0?function(e,t){if(e.childNodes.length>0&&t>=0){var r=document.createRange();r.setStart(e.childNodes[0],t),r.collapse(!0);var n=window.getSelection();n.removeAllRanges(),n.addRange(r)}}(b.current,o.cursorPointer):function(e){if(e.childNodes.length>0){var t=document.createRange();t.selectNodeContents(e),t.collapse(!1);var r=window.getSelection();r.removeAllRanges(),r.addRange(t)}}(b.current)):0===o.id&&parseInt(r.id)===u&&b.current.focus()}),[o.id,r.title]),Object(n.jsxs)("div",{className:"todo-item",children:[Object(n.jsxs)("div",{className:"title flex-row",children:[Object(n.jsx)("div",{className:"bullet",children:Object(n.jsx)("svg",{viewBox:"0 0 18 18",fill:"currentColor",children:Object(n.jsx)("circle",{cx:"9",cy:"9",r:"3.5"})})}),Object(n.jsx)("div",{className:"content",ref:b,contentEditable:!0,suppressContentEditableWarning:!0,tabIndex:-1,children:r.title})]}),"object"===typeof r.ch&&null!==r.ch&&Object(n.jsx)("div",{className:"children",children:Object.keys(r.ch).map((function(t){return Object(n.jsx)(e,{data:r.ch[t]},"tdi-ch"+t)}))})]})}),S=(r(20),function(){var e=Object(a.useRef)(),t=Object(a.useContext)(g).addTodoItemByAddBtn;return Object(a.useEffect)((function(){e.current.addEventListener("click",(function(){t()}))}),[]),Object(n.jsx)("div",{className:"btn-add-todo",children:Object(n.jsxs)("svg",{className:"icon-plus",viewBox:"0 0 20 20",ref:e,children:[Object(n.jsx)("circle",{cx:"10.5",cy:"10.5",r:"9",fill:"#dce0e2",className:"circle"}),Object(n.jsx)("line",{x1:"6",y1:"10.5",x2:"15",y2:"10.5",stroke:"#868c90",strokeWidth:"1"}),Object(n.jsx)("line",{x1:"10.5",y1:"6",x2:"10.5",y2:"15",stroke:"#868c90",strokeWidth:"1"})]})})}),T=function(){var e=Object(a.useContext)(g).todoList;return Object(n.jsx)("div",{className:"container",children:Object(n.jsxs)("div",{className:"todo-list",children:[Object.keys(e).map((function(t){return Object(n.jsx)(P,{data:e[t]},"tdi"+t)})),Object(n.jsx)(S,{})]})})},E=function(){return Object(n.jsxs)(c.a.Fragment,{children:[Object(n.jsx)(N,{}),Object(n.jsx)(T,{})]})},A=function(){return"indexedDB"in window?Object(n.jsx)(y,{children:Object(n.jsx)(E,{})}):(v(),Object(n.jsx)("h1",{className:"fatal-error",children:"Your browser doesn't support a stable version of IndexedDB!"}))};i.a.render(Object(n.jsx)(A,{}),document.getElementById("root"))}],[[21,1,2]]]);
//# sourceMappingURL=main.d8bf4849.chunk.js.map
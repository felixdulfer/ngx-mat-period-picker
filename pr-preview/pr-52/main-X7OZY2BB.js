var E_=Object.defineProperty,x_=Object.defineProperties;var S_=Object.getOwnPropertyDescriptors;var bm=Object.getOwnPropertySymbols;var I_=Object.prototype.hasOwnProperty,M_=Object.prototype.propertyIsEnumerable;var vm=(e,n,t)=>n in e?E_(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,C=(e,n)=>{for(var t in n||={})I_.call(n,t)&&vm(e,t,n[t]);if(bm)for(var t of bm(n))M_.call(n,t)&&vm(e,t,n[t]);return e},B=(e,n)=>x_(e,S_(n));var St=(e,n,t)=>new Promise((r,i)=>{var o=l=>{try{s(t.next(l))}catch(c){i(c)}},a=l=>{try{s(t.throw(l))}catch(c){i(c)}},s=l=>l.done?r(l.value):Promise.resolve(l.value).then(o,a);s((t=t.apply(e,n)).next())});var Ri=[null],ta=[!1],Gn=1,N_=null,He=Symbol("SIGNAL");function S(e){let n=Ri[0];return Ri[0]=e,n}function oa(){return Ri[0]}var qn={version:0,lastCleanEpoch:0,dirty:!1,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:!1,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:"unknown",producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function _n(e){if(ta[0])throw new Error("");let n=Ri[0];if(n===null)return;n.consumerOnSignalRead(e);let t=n.producersTail;if(t!==void 0&&t.producer===e)return;let r,i=n.recomputing;if(i&&(r=t!==void 0?t.nextProducer:n.producers,r!==void 0&&r.producer===e)){n.producersTail=r,r.lastReadVersion=e.version,r.knownValidAtEpoch=Gn;return}let o=e.consumersTail;if(o!==void 0&&o.consumer===n&&(!i||o.knownValidAtEpoch===Gn))return;let a=Vr(n),s={producer:e,consumer:n,nextProducer:r,prevConsumer:void 0,knownValidAtEpoch:Gn,lastReadVersion:e.version,nextConsumer:void 0};n.producersTail=s,t!==void 0?t.nextProducer=s:n.producers=s,a&&Cm(e,s)}function ym(){Gn++}function Oi(e){if(!(Vr(e)&&!e.dirty)&&!(!e.dirty&&e.lastCleanEpoch===Gn)){if(!e.producerMustRecompute(e)&&!Lr(e)){ia(e);return}e.producerRecomputeValue(e),ia(e)}}function oc(e){if(e.consumers===void 0)return;let n=ta[0];ta[0]=!0;try{for(let t=e.consumers;t!==void 0;t=t.nextConsumer){let r=t.consumer;r.dirty||T_(r)}}finally{ta[0]=n}}function ac(){return Ri[0]?.consumerAllowSignalWrites!==!1}function T_(e){e.dirty=!0,oc(e),e.consumerMarkedDirty?.(e)}function ia(e){e.dirty=!1,e.lastCleanEpoch=Gn}function wn(e){return e&&_m(e),S(e)}function _m(e){if(e.producersTail?.knownValidAtEpoch===Gn){let n=e.producers;for(;n!==void 0;)n.knownValidAtEpoch=null,n=n.nextProducer}e.producersTail=void 0,e.recomputing=!0}function Yn(e,n){S(n),e&&wm(e)}function wm(e){e.recomputing=!1;let n=e.producersTail,t=n!==void 0?n.nextProducer:e.producers;if(t!==void 0){if(Vr(e))do t=sc(t);while(t!==void 0);n!==void 0?n.nextProducer=void 0:e.producers=void 0}}function Lr(e){for(let n=e.producers;n!==void 0;n=n.nextProducer){let t=n.producer,r=n.lastReadVersion;if(r!==t.version||(Oi(t),r!==t.version))return!0}return!1}function Cn(e){if(Vr(e)){let n=e.producers;for(;n!==void 0;)n=sc(n)}e.producers=void 0,e.producersTail=void 0,e.consumers=void 0,e.consumersTail=void 0}function Cm(e,n){let t=e.consumersTail,r=Vr(e);if(t!==void 0?(n.nextConsumer=t.nextConsumer,t.nextConsumer=n):(n.nextConsumer=void 0,e.consumers=n),n.prevConsumer=t,e.consumersTail=n,!r)for(let i=e.producers;i!==void 0;i=i.nextProducer)Cm(i.producer,i)}function sc(e){let n=e.producer,t=e.nextProducer,r=e.nextConsumer,i=e.prevConsumer;if(e.nextConsumer=void 0,e.prevConsumer=void 0,r!==void 0?r.prevConsumer=i:n.consumersTail=i,i!==void 0)i.nextConsumer=r;else if(n.consumers=r,!Vr(n)){let o=n.producers;for(;o!==void 0;)o=sc(o)}return t}function Vr(e){return e.consumerIsAlwaysLive||e.consumers!==void 0}function aa(e){N_?.(e)}function sa(e,n){return Object.is(e,n)}function Fi(e,n){let t=Object.create(A_);t.computation=e,n!==void 0&&(t.equal=n);let r=()=>{if(Oi(t),_n(t),t.value===Wn)throw t.error;return t.value};return r[He]=t,aa(t),r}var na=Symbol("UNSET"),ra=Symbol("COMPUTING"),Wn=Symbol("ERRORED"),A_=B(C({},qn),{value:na,dirty:!0,error:null,equal:sa,kind:"computed",producerMustRecompute(e){return e.value===na||e.value===ra},producerRecomputeValue(e){if(e.value===ra)throw new Error("");let n=e.value;e.value=ra;let t=wn(e),r,i=!1;try{r=e.computation(),S(null),i=n!==na&&n!==Wn&&r!==Wn&&e.equal(n,r),e.error=null}catch(o){r=Wn,e.error=o}finally{Yn(e,t)}if(i){e.value=n;return}e.value=r,e.version++}});function k_(){throw new Error}var Dm=k_;function Em(e){Dm(e)}function lc(e){Dm=e}var R_=null;function cc(e,n){let t=Object.create(jr);t.value=e,n!==void 0&&(t.equal=n);let r=()=>xm(t);return r[He]=t,aa(t),[r,a=>Zn(t,a),a=>dc(t,a)]}function xm(e){return _n(e),e.value}function Zn(e,n){ac()||Em(e),e.equal(e.value,n)||(e.value=n,O_(e))}function dc(e,n){ac()||Em(e),Zn(e,n(e.value))}var jr=B(C({},qn),{equal:sa,value:void 0,kind:"signal"});function O_(e){e.version++,ym(),oc(e),R_?.(e)}var uc=B(C({},qn),{consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,dirty:!0,kind:"effect"});function fc(e){if(e.dirty=!1,e.version>0&&!Lr(e))return;e.version++;let n=wn(e);try{e.cleanup(),e.fn()}finally{Yn(e,n)}}var mc=[void 0];function la(){return mc[0]}function Lt(e){let n=mc[0];return mc[0]=e,n}var Sm=Symbol("NotFound");function Br(e){return e===Sm||e?.name==="\u0275NotFound"}function Im(e){let n=S(null);try{return e()}finally{S(n)}}function H(e){return typeof e=="function"}function ca(e){let t=e(r=>{Error.call(r),r.stack=new Error().stack});return t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,t}var da=ca(e=>function(t){e(this),this.message=t?`${t.length} errors occurred during unsubscription:
${t.map((r,i)=>`${i+1}) ${r.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=t});function Xn(e,n){if(e){let t=e.indexOf(n);0<=t&&e.splice(t,1)}}var ue=class e{constructor(n){this.initialTeardown=n,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let n;if(!this.closed){this.closed=!0;let{_parentage:t}=this;if(t)if(this._parentage=null,Array.isArray(t))for(let o of t)o.remove(this);else t.remove(this);let{initialTeardown:r}=this;if(H(r))try{r()}catch(o){n=o instanceof da?o.errors:[o]}let{_finalizers:i}=this;if(i){this._finalizers=null;for(let o of i)try{Mm(o)}catch(a){n=n??[],a instanceof da?n=[...n,...a.errors]:n.push(a)}}if(n)throw new da(n)}}add(n){var t;if(n&&n!==this)if(this.closed)Mm(n);else{if(n instanceof e){if(n.closed||n._hasParent(this))return;n._addParent(this)}(this._finalizers=(t=this._finalizers)!==null&&t!==void 0?t:[]).push(n)}}_hasParent(n){let{_parentage:t}=this;return t===n||Array.isArray(t)&&t.includes(n)}_addParent(n){let{_parentage:t}=this;this._parentage=Array.isArray(t)?(t.push(n),t):t?[t,n]:n}_removeParent(n){let{_parentage:t}=this;t===n?this._parentage=null:Array.isArray(t)&&Xn(t,n)}remove(n){let{_finalizers:t}=this;t&&Xn(t,n),n instanceof e&&n._removeParent(this)}};ue.EMPTY=(()=>{let e=new ue;return e.closed=!0,e})();var pc=ue.EMPTY;function ua(e){return e instanceof ue||e&&"closed"in e&&H(e.remove)&&H(e.add)&&H(e.unsubscribe)}function Mm(e){H(e)?e():e.unsubscribe()}var It={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var Hr={setTimeout(e,n,...t){let{delegate:r}=Hr;return r?.setTimeout?r.setTimeout(e,n,...t):setTimeout(e,n,...t)},clearTimeout(e){let{delegate:n}=Hr;return(n?.clearTimeout||clearTimeout)(e)},delegate:void 0};function fa(e){Hr.setTimeout(()=>{let{onUnhandledError:n}=It;if(n)n(e);else throw e})}function Pi(){}var Nm=hc("C",void 0,void 0);function Tm(e){return hc("E",void 0,e)}function Am(e){return hc("N",e,void 0)}function hc(e,n,t){return{kind:e,value:n,error:t}}var Kn=null;function zr(e){if(It.useDeprecatedSynchronousErrorHandling){let n=!Kn;if(n&&(Kn={errorThrown:!1,error:null}),e(),n){let{errorThrown:t,error:r}=Kn;if(Kn=null,t)throw r}}else e()}function km(e){It.useDeprecatedSynchronousErrorHandling&&Kn&&(Kn.errorThrown=!0,Kn.error=e)}var Qn=class extends ue{constructor(n){super(),this.isStopped=!1,n?(this.destination=n,ua(n)&&n.add(this)):this.destination=L_}static create(n,t,r){return new Xt(n,t,r)}next(n){this.isStopped?bc(Am(n),this):this._next(n)}error(n){this.isStopped?bc(Tm(n),this):(this.isStopped=!0,this._error(n))}complete(){this.isStopped?bc(Nm,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(n){this.destination.next(n)}_error(n){try{this.destination.error(n)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},F_=Function.prototype.bind;function gc(e,n){return F_.call(e,n)}var vc=class{constructor(n){this.partialObserver=n}next(n){let{partialObserver:t}=this;if(t.next)try{t.next(n)}catch(r){ma(r)}}error(n){let{partialObserver:t}=this;if(t.error)try{t.error(n)}catch(r){ma(r)}else ma(n)}complete(){let{partialObserver:n}=this;if(n.complete)try{n.complete()}catch(t){ma(t)}}},Xt=class extends Qn{constructor(n,t,r){super();let i;if(H(n)||!n)i={next:n??void 0,error:t??void 0,complete:r??void 0};else{let o;this&&It.useDeprecatedNextContext?(o=Object.create(n),o.unsubscribe=()=>this.unsubscribe(),i={next:n.next&&gc(n.next,o),error:n.error&&gc(n.error,o),complete:n.complete&&gc(n.complete,o)}):i=n}this.destination=new vc(i)}};function ma(e){It.useDeprecatedSynchronousErrorHandling?km(e):fa(e)}function P_(e){throw e}function bc(e,n){let{onStoppedNotification:t}=It;t&&Hr.setTimeout(()=>t(e,n))}var L_={closed:!0,next:Pi,error:P_,complete:Pi};var Ur=typeof Symbol=="function"&&Symbol.observable||"@@observable";function Dn(e){return e}function Rm(e){return e.length===0?Dn:e.length===1?e[0]:function(t){return e.reduce((r,i)=>i(r),t)}}var W=class e{constructor(n){n&&(this._subscribe=n)}lift(n){let t=new e;return t.source=this,t.operator=n,t}subscribe(n,t,r){let i=j_(n)?n:new Xt(n,t,r);return zr(()=>{let{operator:o,source:a}=this;i.add(o?o.call(i,a):a?this._subscribe(i):this._trySubscribe(i))}),i}_trySubscribe(n){try{return this._subscribe(n)}catch(t){n.error(t)}}forEach(n,t){return t=Om(t),new t((r,i)=>{let o=new Xt({next:a=>{try{n(a)}catch(s){i(s),o.unsubscribe()}},error:i,complete:r});this.subscribe(o)})}_subscribe(n){var t;return(t=this.source)===null||t===void 0?void 0:t.subscribe(n)}[Ur](){return this}pipe(...n){return Rm(n)(this)}toPromise(n){return n=Om(n),new n((t,r)=>{let i;this.subscribe(o=>i=o,o=>r(o),()=>t(i))})}};W.create=e=>new W(e);function Om(e){var n;return(n=e??It.Promise)!==null&&n!==void 0?n:Promise}function V_(e){return e&&H(e.next)&&H(e.error)&&H(e.complete)}function j_(e){return e&&e instanceof Qn||V_(e)&&ua(e)}function B_(e){return H(e?.lift)}function ie(e){return n=>{if(B_(n))return n.lift(function(t){try{return e(t,this)}catch(r){this.error(r)}});throw new TypeError("Unable to lift unknown Observable type")}}function fe(e,n,t,r,i){return new yc(e,n,t,r,i)}var yc=class extends Qn{constructor(n,t,r,i,o,a){super(n),this.onFinalize=o,this.shouldUnsubscribe=a,this._next=t?function(s){try{t(s)}catch(l){n.error(l)}}:super._next,this._error=i?function(s){try{i(s)}catch(l){n.error(l)}finally{this.unsubscribe()}}:super._error,this._complete=r?function(){try{r()}catch(s){n.error(s)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var n;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:t}=this;super.unsubscribe(),!t&&((n=this.onFinalize)===null||n===void 0||n.call(this))}}};var Fm=ca(e=>function(){e(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var L=class extends W{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(n){let t=new pa(this,this);return t.operator=n,t}_throwIfClosed(){if(this.closed)throw new Fm}next(n){zr(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let t of this.currentObservers)t.next(n)}})}error(n){zr(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=n;let{observers:t}=this;for(;t.length;)t.shift().error(n)}})}complete(){zr(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:n}=this;for(;n.length;)n.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var n;return((n=this.observers)===null||n===void 0?void 0:n.length)>0}_trySubscribe(n){return this._throwIfClosed(),super._trySubscribe(n)}_subscribe(n){return this._throwIfClosed(),this._checkFinalizedStatuses(n),this._innerSubscribe(n)}_innerSubscribe(n){let{hasError:t,isStopped:r,observers:i}=this;return t||r?pc:(this.currentObservers=null,i.push(n),new ue(()=>{this.currentObservers=null,Xn(i,n)}))}_checkFinalizedStatuses(n){let{hasError:t,thrownError:r,isStopped:i}=this;t?n.error(r):i&&n.complete()}asObservable(){let n=new W;return n.source=this,n}};L.create=(e,n)=>new pa(e,n);var pa=class extends L{constructor(n,t){super(),this.destination=n,this.source=t}next(n){var t,r;(r=(t=this.destination)===null||t===void 0?void 0:t.next)===null||r===void 0||r.call(t,n)}error(n){var t,r;(r=(t=this.destination)===null||t===void 0?void 0:t.error)===null||r===void 0||r.call(t,n)}complete(){var n,t;(t=(n=this.destination)===null||n===void 0?void 0:n.complete)===null||t===void 0||t.call(n)}_subscribe(n){var t,r;return(r=(t=this.source)===null||t===void 0?void 0:t.subscribe(n))!==null&&r!==void 0?r:pc}};var Jn=class extends L{constructor(n){super(),this._value=n}get value(){return this.getValue()}_subscribe(n){let t=super._subscribe(n);return!t.closed&&n.next(this._value),t}getValue(){let{hasError:n,thrownError:t,_value:r}=this;if(n)throw t;return this._throwIfClosed(),r}next(n){super.next(this._value=n)}};var Li={now(){return(Li.delegate||Date).now()},delegate:void 0};var ha=class extends L{constructor(n=1/0,t=1/0,r=Li){super(),this._bufferSize=n,this._windowTime=t,this._timestampProvider=r,this._buffer=[],this._infiniteTimeWindow=!0,this._infiniteTimeWindow=t===1/0,this._bufferSize=Math.max(1,n),this._windowTime=Math.max(1,t)}next(n){let{isStopped:t,_buffer:r,_infiniteTimeWindow:i,_timestampProvider:o,_windowTime:a}=this;t||(r.push(n),!i&&r.push(o.now()+a)),this._trimBuffer(),super.next(n)}_subscribe(n){this._throwIfClosed(),this._trimBuffer();let t=this._innerSubscribe(n),{_infiniteTimeWindow:r,_buffer:i}=this,o=i.slice();for(let a=0;a<o.length&&!n.closed;a+=r?1:2)n.next(o[a]);return this._checkFinalizedStatuses(n),t}_trimBuffer(){let{_bufferSize:n,_timestampProvider:t,_buffer:r,_infiniteTimeWindow:i}=this,o=(i?1:2)*n;if(n<1/0&&o<r.length&&r.splice(0,r.length-o),!i){let a=t.now(),s=0;for(let l=1;l<r.length&&r[l]<=a;l+=2)s=l;s&&r.splice(0,s+1)}}};var ga=class extends ue{constructor(n,t){super()}schedule(n,t=0){return this}};var Vi={setInterval(e,n,...t){let{delegate:r}=Vi;return r?.setInterval?r.setInterval(e,n,...t):setInterval(e,n,...t)},clearInterval(e){let{delegate:n}=Vi;return(n?.clearInterval||clearInterval)(e)},delegate:void 0};var ba=class extends ga{constructor(n,t){super(n,t),this.scheduler=n,this.work=t,this.pending=!1}schedule(n,t=0){var r;if(this.closed)return this;this.state=n;let i=this.id,o=this.scheduler;return i!=null&&(this.id=this.recycleAsyncId(o,i,t)),this.pending=!0,this.delay=t,this.id=(r=this.id)!==null&&r!==void 0?r:this.requestAsyncId(o,this.id,t),this}requestAsyncId(n,t,r=0){return Vi.setInterval(n.flush.bind(n,this),r)}recycleAsyncId(n,t,r=0){if(r!=null&&this.delay===r&&this.pending===!1)return t;t!=null&&Vi.clearInterval(t)}execute(n,t){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;let r=this._execute(n,t);if(r)return r;this.pending===!1&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(n,t){let r=!1,i;try{this.work(n)}catch(o){r=!0,i=o||new Error("Scheduled action threw falsy error")}if(r)return this.unsubscribe(),i}unsubscribe(){if(!this.closed){let{id:n,scheduler:t}=this,{actions:r}=t;this.work=this.state=this.scheduler=null,this.pending=!1,Xn(r,this),n!=null&&(this.id=this.recycleAsyncId(t,n,null)),this.delay=null,super.unsubscribe()}}};var $r=class e{constructor(n,t=e.now){this.schedulerActionCtor=n,this.now=t}schedule(n,t=0,r){return new this.schedulerActionCtor(this,n).schedule(r,t)}};$r.now=Li.now;var va=class extends $r{constructor(n,t=$r.now){super(n,t),this.actions=[],this._active=!1}flush(n){let{actions:t}=this;if(this._active){t.push(n);return}let r;this._active=!0;do if(r=n.execute(n.state,n.delay))break;while(n=t.shift());if(this._active=!1,r){for(;n=t.shift();)n.unsubscribe();throw r}}};var _c=new va(ba),Pm=_c;var er=new W(e=>e.complete());function ya(e){return e&&H(e.schedule)}function wc(e){return e[e.length-1]}function Lm(e){return H(wc(e))?e.pop():void 0}function En(e){return ya(wc(e))?e.pop():void 0}function Vm(e,n){return typeof wc(e)=="number"?e.pop():n}function Bm(e,n,t,r){function i(o){return o instanceof t?o:new t(function(a){a(o)})}return new(t||(t=Promise))(function(o,a){function s(d){try{c(r.next(d))}catch(u){a(u)}}function l(d){try{c(r.throw(d))}catch(u){a(u)}}function c(d){d.done?o(d.value):i(d.value).then(s,l)}c((r=r.apply(e,n||[])).next())})}function jm(e){var n=typeof Symbol=="function"&&Symbol.iterator,t=n&&e[n],r=0;if(t)return t.call(e);if(e&&typeof e.length=="number")return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(n?"Object is not iterable.":"Symbol.iterator is not defined.")}function tr(e){return this instanceof tr?(this.v=e,this):new tr(e)}function Hm(e,n,t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r=t.apply(e,n||[]),i,o=[];return i=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),s("next"),s("throw"),s("return",a),i[Symbol.asyncIterator]=function(){return this},i;function a(m){return function(h){return Promise.resolve(h).then(m,u)}}function s(m,h){r[m]&&(i[m]=function(w){return new Promise(function(E,R){o.push([m,w,E,R])>1||l(m,w)})},h&&(i[m]=h(i[m])))}function l(m,h){try{c(r[m](h))}catch(w){p(o[0][3],w)}}function c(m){m.value instanceof tr?Promise.resolve(m.value.v).then(d,u):p(o[0][2],m)}function d(m){l("next",m)}function u(m){l("throw",m)}function p(m,h){m(h),o.shift(),o.length&&l(o[0][0],o[0][1])}}function zm(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n=e[Symbol.asyncIterator],t;return n?n.call(e):(e=typeof jm=="function"?jm(e):e[Symbol.iterator](),t={},r("next"),r("throw"),r("return"),t[Symbol.asyncIterator]=function(){return this},t);function r(o){t[o]=e[o]&&function(a){return new Promise(function(s,l){a=e[o](a),i(s,l,a.done,a.value)})}}function i(o,a,s,l){Promise.resolve(l).then(function(c){o({value:c,done:s})},a)}}var _a=(e=>e&&typeof e.length=="number"&&typeof e!="function");function wa(e){return H(e?.then)}function Ca(e){return H(e[Ur])}function Da(e){return Symbol.asyncIterator&&H(e?.[Symbol.asyncIterator])}function Ea(e){return new TypeError(`You provided ${e!==null&&typeof e=="object"?"an invalid object":`'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function H_(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var xa=H_();function Sa(e){return H(e?.[xa])}function Ia(e){return Hm(this,arguments,function*(){let t=e.getReader();try{for(;;){let{value:r,done:i}=yield tr(t.read());if(i)return yield tr(void 0);yield yield tr(r)}}finally{t.releaseLock()}})}function Ma(e){return H(e?.getReader)}function Ce(e){if(e instanceof W)return e;if(e!=null){if(Ca(e))return z_(e);if(_a(e))return U_(e);if(wa(e))return $_(e);if(Da(e))return Um(e);if(Sa(e))return G_(e);if(Ma(e))return W_(e)}throw Ea(e)}function z_(e){return new W(n=>{let t=e[Ur]();if(H(t.subscribe))return t.subscribe(n);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function U_(e){return new W(n=>{for(let t=0;t<e.length&&!n.closed;t++)n.next(e[t]);n.complete()})}function $_(e){return new W(n=>{e.then(t=>{n.closed||(n.next(t),n.complete())},t=>n.error(t)).then(null,fa)})}function G_(e){return new W(n=>{for(let t of e)if(n.next(t),n.closed)return;n.complete()})}function Um(e){return new W(n=>{q_(e,n).catch(t=>n.error(t))})}function W_(e){return Um(Ia(e))}function q_(e,n){var t,r,i,o;return Bm(this,void 0,void 0,function*(){try{for(t=zm(e);r=yield t.next(),!r.done;){let a=r.value;if(n.next(a),n.closed)return}}catch(a){i={error:a}}finally{try{r&&!r.done&&(o=t.return)&&(yield o.call(t))}finally{if(i)throw i.error}}n.complete()})}function ft(e,n,t,r=0,i=!1){let o=n.schedule(function(){t(),i?e.add(this.schedule(null,r)):this.unsubscribe()},r);if(e.add(o),!i)return o}function Na(e,n=0){return ie((t,r)=>{t.subscribe(fe(r,i=>ft(r,e,()=>r.next(i),n),()=>ft(r,e,()=>r.complete(),n),i=>ft(r,e,()=>r.error(i),n)))})}function Ta(e,n=0){return ie((t,r)=>{r.add(e.schedule(()=>t.subscribe(r),n))})}function $m(e,n){return Ce(e).pipe(Ta(n),Na(n))}function Gm(e,n){return Ce(e).pipe(Ta(n),Na(n))}function Wm(e,n){return new W(t=>{let r=0;return n.schedule(function(){r===e.length?t.complete():(t.next(e[r++]),t.closed||this.schedule())})})}function qm(e,n){return new W(t=>{let r;return ft(t,n,()=>{r=e[xa](),ft(t,n,()=>{let i,o;try{({value:i,done:o}=r.next())}catch(a){t.error(a);return}o?t.complete():t.next(i)},0,!0)}),()=>H(r?.return)&&r.return()})}function Aa(e,n){if(!e)throw new Error("Iterable cannot be null");return new W(t=>{ft(t,n,()=>{let r=e[Symbol.asyncIterator]();ft(t,n,()=>{r.next().then(i=>{i.done?t.complete():t.next(i.value)})},0,!0)})})}function Ym(e,n){return Aa(Ia(e),n)}function Zm(e,n){if(e!=null){if(Ca(e))return $m(e,n);if(_a(e))return Wm(e,n);if(wa(e))return Gm(e,n);if(Da(e))return Aa(e,n);if(Sa(e))return qm(e,n);if(Ma(e))return Ym(e,n)}throw Ea(e)}function Kt(e,n){return n?Zm(e,n):Ce(e)}function st(...e){let n=En(e);return Kt(e,n)}function Cc(e,n){let t=H(e)?e:()=>e,r=i=>i.error(t());return new W(n?i=>n.schedule(r,0,i):r)}function Xm(e){return e instanceof Date&&!isNaN(e)}function he(e,n){return ie((t,r)=>{let i=0;t.subscribe(fe(r,o=>{r.next(e.call(n,o,i++))}))})}var{isArray:Y_}=Array;function Z_(e,n){return Y_(n)?e(...n):e(n)}function Km(e){return he(n=>Z_(e,n))}var{isArray:X_}=Array,{getPrototypeOf:K_,prototype:Q_,keys:J_}=Object;function Qm(e){if(e.length===1){let n=e[0];if(X_(n))return{args:n,keys:null};if(ew(n)){let t=J_(n);return{args:t.map(r=>n[r]),keys:t}}}return{args:e,keys:null}}function ew(e){return e&&typeof e=="object"&&K_(e)===Q_}function Jm(e,n){return e.reduce((t,r,i)=>(t[r]=n[i],t),{})}function ep(e,n,t,r,i,o,a,s){let l=[],c=0,d=0,u=!1,p=()=>{u&&!l.length&&!c&&n.complete()},m=w=>c<r?h(w):l.push(w),h=w=>{o&&n.next(w),c++;let E=!1;Ce(t(w,d++)).subscribe(fe(n,R=>{i?.(R),o?m(R):n.next(R)},()=>{E=!0},void 0,()=>{if(E)try{for(c--;l.length&&c<r;){let R=l.shift();a?ft(n,a,()=>h(R)):h(R)}p()}catch(R){n.error(R)}}))};return e.subscribe(fe(n,m,()=>{u=!0,p()})),()=>{s?.()}}function Gr(e,n,t=1/0){return H(n)?Gr((r,i)=>he((o,a)=>n(r,o,i,a))(Ce(e(r,i))),t):(typeof n=="number"&&(t=n),ie((r,i)=>ep(r,i,e,t)))}function ka(e=1/0){return Gr(Dn,e)}function tp(){return ka(1)}function Dc(...e){return tp()(Kt(e,En(e)))}function ji(...e){let n=Lm(e),{args:t,keys:r}=Qm(e),i=new W(o=>{let{length:a}=t;if(!a){o.complete();return}let s=new Array(a),l=a,c=a;for(let d=0;d<a;d++){let u=!1;Ce(t[d]).subscribe(fe(o,p=>{u||(u=!0,c--),s[d]=p},()=>l--,void 0,()=>{(!l||!u)&&(c||o.next(r?Jm(r,s):s),o.complete())}))}});return n?i.pipe(Km(n)):i}function np(e=0,n,t=Pm){let r=-1;return n!=null&&(ya(n)?t=n:r=n),new W(i=>{let o=Xm(e)?+e-t.now():e;o<0&&(o=0);let a=0;return t.schedule(function(){i.closed||(i.next(a++),0<=r?this.schedule(void 0,r):i.complete())},o)})}function Ec(...e){let n=En(e),t=Vm(e,1/0),r=e;return r.length?r.length===1?Ce(r[0]):ka(t)(Kt(r,n)):er}function lt(e,n){return ie((t,r)=>{let i=0;t.subscribe(fe(r,o=>e.call(n,o,i++)&&r.next(o)))})}function rp(e){return ie((n,t)=>{let r=!1,i=null,o=null,a=!1,s=()=>{if(o?.unsubscribe(),o=null,r){r=!1;let c=i;i=null,t.next(c)}a&&t.complete()},l=()=>{o=null,a&&t.complete()};n.subscribe(fe(t,c=>{r=!0,i=c,o||Ce(e(c)).subscribe(o=fe(t,s,l))},()=>{a=!0,(!r||!o||o.closed)&&t.complete()}))})}function Ra(e,n=_c){return rp(()=>np(e,n))}function Oa(e){return ie((n,t)=>{let r=null,i=!1,o;r=n.subscribe(fe(t,void 0,void 0,a=>{o=Ce(e(a,Oa(e)(n))),r?(r.unsubscribe(),r=null,o.subscribe(t)):i=!0})),i&&(r.unsubscribe(),r=null,o.subscribe(t))})}function xc(e,n){return H(n)?Gr(e,n,1):Gr(e,1)}function Sc(e){return e<=0?()=>er:ie((n,t)=>{let r=0;n.subscribe(fe(t,i=>{++r<=e&&(t.next(i),e<=r&&t.complete())}))})}function Fa(e,n=Dn){return e=e??tw,ie((t,r)=>{let i,o=!0;t.subscribe(fe(r,a=>{let s=n(a);(o||!e(i,s))&&(o=!1,i=s,r.next(a))}))})}function tw(e,n){return e===n}function Bi(e){return ie((n,t)=>{try{n.subscribe(t)}finally{t.add(e)}})}function Pa(){return ie((e,n)=>{let t,r=!1;e.subscribe(fe(n,i=>{let o=t;t=i,r&&n.next([o,i]),r=!0}))})}function Hi(e={}){let{connector:n=()=>new L,resetOnError:t=!0,resetOnComplete:r=!0,resetOnRefCountZero:i=!0}=e;return o=>{let a,s,l,c=0,d=!1,u=!1,p=()=>{s?.unsubscribe(),s=void 0},m=()=>{p(),a=l=void 0,d=u=!1},h=()=>{let w=a;m(),w?.unsubscribe()};return ie((w,E)=>{c++,!u&&!d&&p();let R=l=l??n();E.add(()=>{c--,c===0&&!u&&!d&&(s=Ic(h,i))}),R.subscribe(E),!a&&c>0&&(a=new Xt({next:U=>R.next(U),error:U=>{u=!0,p(),s=Ic(m,t,U),R.error(U)},complete:()=>{d=!0,p(),s=Ic(m,r),R.complete()}}),Ce(w).subscribe(a))})(o)}}function Ic(e,n,...t){if(n===!0){e();return}if(n===!1)return;let r=new Xt({next:()=>{r.unsubscribe(),e()}});return Ce(n(...t)).subscribe(r)}function La(e,n,t){let r,i=!1;return e&&typeof e=="object"?{bufferSize:r=1/0,windowTime:n=1/0,refCount:i=!1,scheduler:t}=e:r=e??1/0,Hi({connector:()=>new ha(r,n,t),resetOnError:!0,resetOnComplete:!1,resetOnRefCountZero:i})}function Mc(e){return lt((n,t)=>e<=t)}function Va(...e){let n=En(e);return ie((t,r)=>{(n?Dc(e,t,n):Dc(e,t)).subscribe(r)})}function xn(e){return ie((n,t)=>{Ce(e).subscribe(fe(t,()=>t.complete(),Pi)),!t.closed&&n.subscribe(t)})}function zi(e,n,t){let r=H(e)||n||t?{next:e,error:n,complete:t}:e;return r?ie((i,o)=>{var a;(a=r.subscribe)===null||a===void 0||a.call(r);let s=!0;i.subscribe(fe(o,l=>{var c;(c=r.next)===null||c===void 0||c.call(r,l),o.next(l)},()=>{var l;s=!1,(l=r.complete)===null||l===void 0||l.call(r),o.complete()},l=>{var c;s=!1,(c=r.error)===null||c===void 0||c.call(r,l),o.error(l)},()=>{var l,c;s&&((l=r.unsubscribe)===null||l===void 0||l.call(r)),(c=r.finalize)===null||c===void 0||c.call(r)}))}):Dn}var zc="https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",x=class extends Error{code;constructor(n,t){super(tn(n,t)),this.code=n}};function nw(e){return`NG0${Math.abs(e)}`}function tn(e,n){return`${nw(e)}${n?": "+n:""}`}function se(e){for(let n in e)if(e[n]===se)return n;throw Error("")}function lp(e,n){for(let t in n)Object.hasOwn(n,t)&&!Object.hasOwn(e,t)&&(e[t]=n[t])}function Ga(e){if(typeof e=="string")return e;if(Array.isArray(e))return`[${e.map(Ga).join(", ")}]`;if(e==null)return""+e;let n=e.overriddenName||e.name;if(n)return`${n}`;let t=e.toString();if(t==null)return""+t;let r=t.indexOf(`
`);return r>=0?t.slice(0,r):t}function Wa(e,n){return e?n?`${e} ${n}`:e:n||""}var rw=se({__forward_ref__:se});function Le(e){return e.__forward_ref__=Le,e}function We(e){return Uc(e)?e():e}function Uc(e){return typeof e=="function"&&Object.hasOwn(e,rw)&&e.__forward_ref__===Le}function V(e){return{token:e.token,providedIn:e.providedIn||null,factory:e.factory,value:void 0}}function K(e){return{providers:e.providers||[],imports:e.imports||[]}}function qa(e){return iw(e,Ya)}function iw(e,n){return Object.hasOwn(e,n)&&e[n]||null}function ow(e){let n=e?.[Ya]??null;return n||null}function Tc(e){return e&&Object.hasOwn(e,Ba)?e[Ba]:null}var Ya=se({\u0275prov:se}),Ba=se({\u0275inj:se}),y=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(n,t){this._desc=n,this.\u0275prov=void 0,typeof t=="number"?this.__NG_ELEMENT_ID__=t:t!==void 0&&(this.\u0275prov=V({token:this,providedIn:t.providedIn||"root",factory:t.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function $c(e){return e&&!!e.\u0275providers}var qi=se({\u0275cmp:se}),Yi=se({\u0275dir:se}),Gc=se({\u0275pipe:se});var $i=se({\u0275fac:se}),ar=se({__NG_ELEMENT_ID__:se}),ip=se({__NG_ENV_ID__:se});function In(e){return Wc(e,"@Component"),e[qi]||null}function Za(e){return Wc(e,"@Directive"),e[Yi]||null}function cp(e){return Wc(e,"@Pipe"),e[Gc]||null}function Wc(e,n){if(e==null)throw new x(-919,!1)}function qc(e){return typeof e=="string"?e:e==null?"":String(e)}var dp=se({ngErrorCode:se}),aw=se({ngErrorMessage:se}),sw=se({ngTokenPath:se});function Yc(e,n){return up("",-200,n)}function Xa(e,n){throw new x(-201,!1)}function up(e,n,t){let r=new x(n,e);return r[dp]=n,r[aw]=e,t&&(r[sw]=t),r}function lw(e){return e[dp]}var Ac;function fp(){return Ac}function it(e){let n=Ac;return Ac=e,n}function Zc(e,n,t){let r=qa(e);if(r&&r.providedIn=="root")return r.value===void 0?r.value=r.factory():r.value;if(t&8)return null;if(n!==void 0)return n;Xa(e,"")}var Yr=globalThis;var cw={},nr=cw,dw="__NG_DI_FLAG__",kc=class{injector;constructor(n){this.injector=n}retrieve(n,t){let r=rr(t)||0;try{return this.injector.get(n,r&8?null:nr,r)}catch(i){if(Br(i))return i;throw i}}};function uw(e,n=0){let t=la();if(t===void 0)throw new x(-203,!1);if(t===null)return Zc(e,void 0,n);{let r=fw(n),i=t.retrieve(e,r);if(Br(i)){if(r.optional)return null;throw i}return i}}function M(e,n=0){return(fp()||uw)(We(e),n)}function f(e,n){return M(e,rr(n))}function rr(e){return typeof e>"u"||typeof e=="number"?e:0|(e.optional&&8)|(e.host&&1)|(e.self&&2)|(e.skipSelf&&4)}function fw(e){return{optional:!!(e&8),host:!!(e&1),self:!!(e&2),skipSelf:!!(e&4)}}function Rc(e){let n=[];for(let t=0;t<e.length;t++){let r=We(e[t]);if(Array.isArray(r)){if(r.length===0)throw new x(900,!1);let i,o=0;for(let a=0;a<r.length;a++){let s=r[a],l=mw(s);typeof l=="number"?l===-1?i=s.token:o|=l:i=s}n.push(M(i,o))}else n.push(M(r))}return n}function mw(e){return e[dw]}function Sn(e,n){let t=Object.hasOwn(e,$i);return t?e[$i]:null}function mp(e,n,t){if(e.length!==n.length)return!1;for(let r=0;r<e.length;r++){let i=e[r],o=n[r];if(t&&(i=t(i),o=t(o)),o!==i)return!1}return!0}function pp(e){return e.flat(Number.POSITIVE_INFINITY)}function Ka(e,n){e.forEach(t=>Array.isArray(t)?Ka(t,n):n(t))}function Xc(e,n,t){n>=e.length?e.push(t):e.splice(n,0,t)}function Zi(e,n){return n>=e.length-1?e.pop():e.splice(n,1)[0]}function hp(e,n){let t=[];for(let r=0;r<e;r++)t.push(n);return t}function gp(e,n,t,r){let i=e.length;if(i==n)e.push(t,r);else if(i===1)e.push(r,e[0]),e[0]=t;else{for(i--,e.push(e[i-1],e[i]);i>n;){let o=i-2;e[i]=e[o],i--}e[n]=t,e[n+1]=r}}function Qa(e,n,t){let r=Zr(e,n);return r>=0?e[r|1]=t:(r=~r,gp(e,r,n,t)),r}function Ja(e,n){let t=Zr(e,n);if(t>=0)return e[t|1]}function Zr(e,n){return pw(e,n,1)}function pw(e,n,t){let r=0,i=e.length>>t;for(;i!==r;){let o=r+(i-r>>1),a=e[o<<t];if(n===a)return o<<t;a>n?i=o:r=o+1}return~(i<<t)}var Mn={},Je=[],Xr=new y(""),Kc=new y("",-1),Qc=new y(""),qr=class{get(n,t=nr){if(t===nr){let i=up("",-201);throw i.name="\u0275NotFound",i}return t}};function bp(...e){return{\u0275providers:Jc(!0,e),\u0275fromNgModule:!0}}function Jc(e,...n){let t=[],r=new Set,i,o=a=>{t.push(a)};return Ka(n,a=>{let s=a;Ha(s,o,[],r)&&(i||=[],i.push(s))}),i!==void 0&&vp(i,o),t}function vp(e,n){for(let t=0;t<e.length;t++){let{ngModule:r,providers:i}=e[t];ed(i,o=>{n(o,r)})}}function Ha(e,n,t,r){if(e=We(e),!e)return!1;let i=null,o=Tc(e),a=!o&&In(e);if(!o&&!a){let l=e.ngModule;if(o=Tc(l),o)i=l;else return!1}else{if(a&&!a.standalone)return!1;i=e}let s=r.has(i);if(a){if(s)return!1;if(r.add(i),a.dependencies){let l=typeof a.dependencies=="function"?a.dependencies():a.dependencies;for(let c of l)Ha(c,n,t,r)}}else if(o){if(o.imports!=null&&!s){r.add(i);let c;Ka(o.imports,d=>{Ha(d,n,t,r)&&(c||=[],c.push(d))}),c!==void 0&&vp(c,n)}if(!s){let c=Sn(i)||(()=>new i);n({provide:i,useFactory:c,deps:Je},i),n({provide:Qc,useValue:i,multi:!0},i),n({provide:Xr,useValue:()=>M(i),multi:!0},i)}let l=o.providers;if(l!=null&&!s){let c=e;ed(l,d=>{n(d,c)})}}else return!1;return i!==e&&e.providers!==void 0}function ed(e,n){for(let t of e)$c(t)&&(t=t.\u0275providers),Array.isArray(t)?ed(t,n):n(t)}var hw=se({provide:String,useValue:se});function yp(e){return e!==null&&typeof e=="object"&&hw in e}function gw(e){return!!(e&&e.useExisting)}function bw(e){return!!(e&&e.useFactory)}function ir(e){return typeof e=="function"}function _p(e){return!!e.useClass}var Xi=new y(""),ja={},op={},Nc;function Kr(){return Nc===void 0&&(Nc=new qr),Nc}var Pe=class{},or=class extends Pe{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(n,t,r,i){super(),this.parent=t,this.source=r,this.scopes=i,Fc(n,a=>this.processProvider(a)),this.records.set(Kc,Wr(void 0,this)),i.has("environment")&&this.records.set(Pe,Wr(void 0,this));let o=this.records.get(Xi);o!=null&&typeof o.value=="string"&&this.scopes.add(o.value),this.injectorDefTypes=new Set(this.get(Qc,Je,{self:!0}))}retrieve(n,t){let r=rr(t)||0;try{return this.get(n,nr,r)}catch(i){if(Br(i))return i;throw i}}destroy(){Ui(this),this._destroyed=!0;let n=S(null);try{for(let r of this._ngOnDestroyHooks)r.ngOnDestroy();let t=this._onDestroyHooks;this._onDestroyHooks=[];for(let r of t)r()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),S(n)}}onDestroy(n){return Ui(this),this._onDestroyHooks.push(n),()=>this.removeOnDestroy(n)}runInContext(n){Ui(this);let t=Lt(this),r=it(void 0),i;try{return n()}finally{Lt(t),it(r)}}get(n,t=nr,r){if(Ui(this),Object.hasOwn(n,ip))return n[ip](this);let i=rr(r),o,a=Lt(this),s=it(void 0);try{if(!(i&4)){let c=this.records.get(n);if(c===void 0){let d=Cw(n)&&qa(n);d&&this.injectableDefInScope(d)?c=Wr(Oc(n),ja):c=null,this.records.set(n,c)}if(c!=null)return this.hydrate(n,c,i)}let l=i&2?Kr():this.parent;return t=i&8&&t===nr?null:t,l.get(n,t)}catch(l){let c=lw(l);throw c===-200||c===-201?new x(c,null):l}finally{it(s),Lt(a)}}resolveInjectorInitializers(){let n=S(null),t=Lt(this),r=it(void 0),i;try{let o=this.get(Xr,Je,{self:!0});for(let a of o)a()}finally{Lt(t),it(r),S(n)}}toString(){return"R3Injector[...]"}processProvider(n){n=We(n);let t=ir(n)?n:We(n&&n.provide),r=yw(n);if(!ir(n)&&n.multi===!0){let i=this.records.get(t);i||(i=Wr(void 0,ja,!0),i.factory=()=>Rc(i.multi),this.records.set(t,i)),t=n,i.multi.push(n)}this.records.set(t,r)}hydrate(n,t,r){let i=S(null);try{if(t.value===op)throw Yc("");return t.value===ja&&(t.value=op,t.value=t.factory(void 0,r)),typeof t.value=="object"&&t.value&&ww(t.value)&&this._ngOnDestroyHooks.add(t.value),t.value}finally{S(i)}}injectableDefInScope(n){if(!n.providedIn)return!1;let t=We(n.providedIn);return typeof t=="string"?t==="any"||this.scopes.has(t):this.injectorDefTypes.has(t)}removeOnDestroy(n){let t=this._onDestroyHooks.indexOf(n);t!==-1&&this._onDestroyHooks.splice(t,1)}};function Oc(e){let n=qa(e),t=n!==null?n.factory:Sn(e);if(t!==null)return t;if(e instanceof y)throw new x(-204,!1);if(e instanceof Function)return vw(e);throw new x(-204,!1)}function vw(e){if(e.length>0)throw new x(-204,!1);let t=ow(e);return t!==null?()=>t.factory(e):()=>new e}function yw(e){if(yp(e))return Wr(void 0,e.useValue);{let n=td(e);return Wr(n,ja)}}function td(e,n,t){let r;if(ir(e)){let i=We(e);return Sn(i)||Oc(i)}else if(yp(e))r=()=>We(e.useValue);else if(bw(e))r=()=>e.useFactory(...Rc(e.deps||[]));else if(gw(e))r=(i,o)=>M(We(e.useExisting),o!==void 0&&o&8?8:void 0);else{let i=We(e&&(e.useClass||e.provide));if(_w(e))r=()=>new i(...Rc(e.deps));else return Sn(i)||Oc(i)}return r}function Ui(e){if(e.destroyed)throw new x(-205,!1)}function Wr(e,n,t=!1){return{factory:e,value:n,multi:t?[]:void 0}}function _w(e){return!!e.deps}function ww(e){return e!==null&&typeof e=="object"&&typeof e.ngOnDestroy=="function"}function Cw(e){return typeof e=="function"||typeof e=="object"&&e.ngMetadataName==="InjectionToken"}function Fc(e,n){for(let t of e)Array.isArray(t)?Fc(t,n):t&&$c(t)?Fc(t.\u0275providers,n):n(t)}function Qr(e,n){let t;e instanceof or?(Ui(e),t=e):t=new kc(e);let r,i=Lt(t),o=it(void 0);try{return n()}finally{Lt(i),it(o)}}function wp(){return fp()!==void 0||la()!=null}var Mt=0,I=1,N=2,Te=3,mt=4,Ue=5,sr=6,Jr=7,Ie=8,nn=9,jt=10,be=11,ei=12,nd=13,Nn=14,Ye=15,Tn=16,lr=17,Bt=18,Ki=19,rd=20,Qt=21,es=22,Jt=23,ct=24,cr=25,Cp=26,ti=27,De=28,Dp=1,id=6,dr=7,Qi=8,ur=9,Me=10;function rn(e){return Array.isArray(e)&&typeof e[Dp]=="object"}function pt(e){return Array.isArray(e)&&e[Dp]===!0}function od(e){return(e.flags&4)!==0}function on(e){return e.componentOffset>-1}function Ji(e){return(e.flags&1)===1}function an(e){return!!e.template}function ni(e){return(e[N]&512)!==0}function fr(e){return(e[N]&256)===256}var tt=(function(e){return e[e.NONE=0]="NONE",e[e.HTML=1]="HTML",e[e.STYLE=2]="STYLE",e[e.SCRIPT=3]="SCRIPT",e[e.URL=4]="URL",e[e.RESOURCE_URL=5]="RESOURCE_URL",e[e.ATTRIBUTE_NO_BINDING=6]="ATTRIBUTE_NO_BINDING",e})(tt||{});var ad="svg",Ep="math";function Ze(e){for(;Array.isArray(e);)e=e[Mt];return e}function sd(e,n){return Ze(n[e])}function ht(e,n){return Ze(n[e.index])}function ts(e,n){return e.data[n]}function ld(e,n){return e[n]}function cd(e,n,t,r){t>=e.data.length&&(e.data[t]=null,e.blueprint[t]=null),n[t]=r}function gt(e,n){let t=n[e];return rn(t)?t:t[Mt]}function xp(e){return(e[N]&4)===4}function ns(e){return(e[N]&128)===128}function Sp(e){return pt(e[Te])}function bt(e,n){return n==null?null:e[n]}function dd(e){e[lr]=0}function ud(e){e[N]&1024||(e[N]|=1024,ns(e)&&mr(e))}function Ip(e,n){for(;e>0;)n=n[Nn],e--;return n}function eo(e){return!!(e[N]&5120||e[ct]?.dirty)}function rs(e){e[jt].changeDetectionScheduler?.notify(8),e[N]&64&&(e[N]|=1024),eo(e)&&mr(e)}function mr(e){e[jt].changeDetectionScheduler?.notify(0);let n=en(e);for(;n!==null&&!(n[N]&4096||(n[N]|=4096,!ns(n)));)n=en(n)}function is(e,n){if(fr(e))throw new x(911,!1);e[Qt]===null&&(e[Qt]=[]),e[Qt].push(n)}function Mp(e,n){if(e[Qt]===null)return;let t=e[Qt].indexOf(n);t!==-1&&e[Qt].splice(t,1)}function en(e){let n=e[Te];return pt(n)?n[Te]:n}function fd(e){return e[Jr]??=[]}function md(e){return e.cleanup??=[]}function Np(e,n,t,r){let i=fd(n);i.push(t),e.firstCreatePass&&md(e).push(r,i.length-1)}var z={lFrame:Hp(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var Pc=!1;function Tp(){return z.lFrame.elementDepthCount}function Ap(){z.lFrame.elementDepthCount++}function pd(){z.lFrame.elementDepthCount--}function hd(){return z.bindingsEnabled}function gd(){return z.skipHydrationRootTNode!==null}function bd(e){return z.skipHydrationRootTNode===e}function vd(){z.skipHydrationRootTNode=null}function F(){return z.lFrame.lView}function Ee(){return z.lFrame.tView}function pr(e){return z.lFrame.contextLView=e,e[Ie]}function hr(e){return z.lFrame.contextLView=null,e}function Xe(){let e=yd();for(;e!==null&&e.type===64;)e=e.parent;return e}function yd(){return z.lFrame.currentTNode}function kp(){let e=z.lFrame,n=e.currentTNode;return e.isParent?n:n.parent}function ri(e,n){let t=z.lFrame;t.currentTNode=e,t.isParent=n}function _d(){return z.lFrame.isParent}function wd(){z.lFrame.isParent=!1}function Rp(){return z.lFrame.contextLView}function Cd(){return Pc}function Gi(e){let n=Pc;return Pc=e,n}function Op(){let e=z.lFrame,n=e.bindingRootIndex;return n===-1&&(n=e.bindingRootIndex=e.tView.bindingStartIndex),n}function Fp(e){return z.lFrame.bindingIndex=e}function gr(){return z.lFrame.bindingIndex++}function Dd(e){let n=z.lFrame,t=n.bindingIndex;return n.bindingIndex=n.bindingIndex+e,t}function Pp(){return z.lFrame.inI18n}function Lp(e,n){let t=z.lFrame;t.bindingIndex=t.bindingRootIndex=e,os(n)}function Vp(){return z.lFrame.currentDirectiveIndex}function os(e){z.lFrame.currentDirectiveIndex=e}function jp(e){let n=z.lFrame.currentDirectiveIndex;return n===-1?null:e[n]}function as(){return z.lFrame.currentQueryIndex}function to(e){z.lFrame.currentQueryIndex=e}function Dw(e){let n=e[I];return n.type===2?n.declTNode:n.type===1?e[Ue]:null}function Ed(e,n,t){if(t&4){let i=n,o=e;for(;i=i.parent,i===null&&!(t&1);)if(i=Dw(o),i===null||(o=o[Nn],i.type&10))break;if(i===null)return!1;n=i,e=o}let r=z.lFrame=Bp();return r.currentTNode=n,r.lView=e,!0}function ss(e){let n=Bp(),t=e[I];z.lFrame=n,n.currentTNode=t.firstChild,n.lView=e,n.tView=t,n.contextLView=e,n.bindingIndex=t.bindingStartIndex,n.inI18n=!1}function Bp(){let e=z.lFrame,n=e===null?null:e.child;return n===null?Hp(e):n}function Hp(e){let n={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:e,child:null,inI18n:!1};return e!==null&&(e.child=n),n}function zp(){let e=z.lFrame;return z.lFrame=e.parent,e.currentTNode=null,e.lView=null,e}var xd=zp;function ls(){let e=zp();e.isParent=!0,e.tView=null,e.selectedIndex=-1,e.contextLView=null,e.elementDepthCount=0,e.currentDirectiveIndex=-1,e.currentNamespace=null,e.bindingRootIndex=-1,e.bindingIndex=-1,e.currentQueryIndex=0}function Up(e){return(z.lFrame.contextLView=Ip(e,z.lFrame.contextLView))[Ie]}function sn(){return z.lFrame.selectedIndex}function An(e){z.lFrame.selectedIndex=e}function no(){let e=z.lFrame;return ts(e.tView,e.selectedIndex)}function cs(){z.lFrame.currentNamespace=ad}function Sd(){return z.lFrame.currentNamespace}var $p=!0;function ds(){return $p}function us(e){$p=e}function Lc(e,n=null,t=null,r){let i=Gp(e,n,t,r);return i.resolveInjectorInitializers(),i}function Gp(e,n=null,t=null,r,i=new Set){let o=[t||Je,bp(e)],a;return new or(o,n||Kr(),a||null,i)}var Q=class e{static THROW_IF_NOT_FOUND=nr;static NULL=new qr;static create(n,t){if(Array.isArray(n))return Lc({name:""},t,n,"");{let r=n.name??"";return Lc({name:r},n.parent,n.providers,r)}}static \u0275prov=V({token:e,providedIn:"any",factory:()=>M(Kc)});static __NG_ELEMENT_ID__=-1},j=new y(""),qe=class{static __NG_ELEMENT_ID__=Ew;static __NG_ENV_ID__=n=>n},za=class extends qe{_lView;constructor(n){super(),this._lView=n}get destroyed(){return fr(this._lView)}onDestroy(n){let t=this._lView;return is(t,n),()=>Mp(t,n)}};function Ew(){return new za(F())}var Wp=!1,qp=new y(""),br=(()=>{class e{taskId=0;pendingTasks=new Set;destroyed=!1;pendingTask=new Jn(!1);debugTaskTracker=f(qp,{optional:!0});get hasPendingTasks(){return this.destroyed?!1:this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new W(t=>{t.next(!1),t.complete()}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(!0);let t=this.taskId++;return this.pendingTasks.add(t),this.debugTaskTracker?.add(t),t}has(t){return this.pendingTasks.has(t)}remove(t){this.pendingTasks.delete(t),this.debugTaskTracker?.remove(t),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(!1),this.destroyed=!0,this.pendingTask.unsubscribe()}static \u0275prov=V({token:e,providedIn:"root",factory:()=>new e})}return e})(),Vc=class extends L{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(n=!1){super(),this.__isAsync=n,wp()&&(this.destroyRef=f(qe,{optional:!0})??void 0,this.pendingTasks=f(br,{optional:!0})??void 0)}emit(n){let t=S(null);try{super.next(n)}finally{S(t)}}subscribe(n,t,r){let i=n,o=t||(()=>null),a=r;if(n&&typeof n=="object"){let l=n;i=l.next?.bind(l),o=l.error?.bind(l),a=l.complete?.bind(l)}this.__isAsync&&(o=this.wrapInTimeout(o),i&&(i=this.wrapInTimeout(i)),a&&(a=this.wrapInTimeout(a)));let s=super.subscribe({next:i,error:o,complete:a});return n instanceof ue&&n.add(s),s}wrapInTimeout(n){return t=>{let r=this.pendingTasks?.add();setTimeout(()=>{try{n(t)}finally{r!==void 0&&this.pendingTasks?.remove(r)}})}}},ge=Vc;function Ua(...e){}function Id(e){let n,t;function r(){e=Ua;try{t!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(t),n!==void 0&&clearTimeout(n)}catch(i){}}return n=setTimeout(()=>{e(),r()}),typeof requestAnimationFrame=="function"&&(t=requestAnimationFrame(()=>{e(),r()})),()=>r()}function Yp(e){return queueMicrotask(()=>e()),()=>{e=Ua}}var Zp="isAngularZone",A=class e{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new ge(!1);onMicrotaskEmpty=new ge(!1);onStable=new ge(!1);onError=new ge(!1);constructor(n){let{enableLongStackTrace:t=!1,shouldCoalesceEventChangeDetection:r=!1,shouldCoalesceRunChangeDetection:i=!1,scheduleInRootZone:o=Wp}=n;if(typeof Zone>"u")throw new x(908,!1);Zone.assertZonePatched();let a=this;a._nesting=0,a._outer=a._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(a._inner=a._inner.fork(new Zone.TaskTrackingZoneSpec)),t&&Zone.longStackTraceZoneSpec&&(a._inner=a._inner.fork(Zone.longStackTraceZoneSpec)),a.shouldCoalesceEventChangeDetection=!i&&r,a.shouldCoalesceRunChangeDetection=i,a.callbackScheduled=!1,a.scheduleInRootZone=o,Iw(a)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(Zp)===!0}static assertInAngularZone(){if(!e.isInAngularZone())throw new x(909,!1)}static assertNotInAngularZone(){if(e.isInAngularZone())throw new x(909,!1)}run(n,t,r){return this._inner.run(n,t,r)}runTask(n,t,r,i){let o=this._inner,a=o.scheduleEventTask("NgZoneEvent: "+i,n,xw,Ua,Ua);try{return o.runTask(a,t,r)}finally{o.cancelTask(a)}}runGuarded(n,t,r){return this._inner.runGuarded(n,t,r)}runOutsideAngular(n){return this._outer.run(n)}},xw={};function Md(e){if(e._nesting==0&&!e.hasPendingMicrotasks&&!e.isStable)try{e._nesting++,e.onMicrotaskEmpty.emit(null)}finally{if(e._nesting--,!e.hasPendingMicrotasks)try{e.runOutsideAngular(()=>e.onStable.emit(null))}finally{e.isStable=!0}}}function Sw(e){if(e.isCheckStableRunning||e.callbackScheduled)return;e.callbackScheduled=!0;function n(){Id(()=>{e.callbackScheduled=!1,jc(e),e.isCheckStableRunning=!0,Md(e),e.isCheckStableRunning=!1})}e.scheduleInRootZone?Zone.root.run(()=>{n()}):e._outer.run(()=>{n()}),jc(e)}function Iw(e){let n=()=>{Sw(e)};e._inner=e._inner.fork({name:"angular",properties:{[Zp]:!0},onInvokeTask:(t,r,i,o,a,s)=>{if(Mw(s))return t.invokeTask(i,o,a,s);try{return ap(e),t.invokeTask(i,o,a,s)}finally{(e.shouldCoalesceEventChangeDetection&&o.type==="eventTask"||e.shouldCoalesceRunChangeDetection)&&n(),sp(e)}},onInvoke:(t,r,i,o,a,s,l)=>{try{return ap(e),t.invoke(i,o,a,s,l)}finally{e.shouldCoalesceRunChangeDetection&&!e.callbackScheduled&&!Nw(s)&&n(),sp(e)}},onHasTask:(t,r,i,o)=>{t.hasTask(i,o),r===i&&(o.change=="microTask"?(e._hasPendingMicrotasks=o.microTask,jc(e),Md(e)):o.change=="macroTask"&&(e.hasPendingMacrotasks=o.macroTask))},onHandleError:(t,r,i,o)=>(t.handleError(i,o),e.runOutsideAngular(()=>e.onError.emit(o)),!1)})}function jc(e){e._hasPendingMicrotasks||(e.shouldCoalesceEventChangeDetection||e.shouldCoalesceRunChangeDetection)&&e.callbackScheduled===!0?e.hasPendingMicrotasks=!0:e.hasPendingMicrotasks=!1}function ap(e){e._nesting++,e.isStable&&(e.isStable=!1,e.onUnstable.emit(null))}function sp(e){e._nesting--,Md(e)}var Wi=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new ge;onMicrotaskEmpty=new ge;onStable=new ge;onError=new ge;run(n,t,r){return n.apply(t,r)}runGuarded(n,t,r){return n.apply(t,r)}runOutsideAngular(n){return n()}runTask(n,t,r,i){return n.apply(t,r)}};function Mw(e){return Xp(e,"__ignore_ng_zone__")}function Nw(e){return Xp(e,"__scheduler_tick__")}function Xp(e,n){return!Array.isArray(e)||e.length!==1?!1:e[0]?.data?.[n]===!0}var et=class{_console=console;handleError(n){this._console.error("ERROR",n)}};function Kp(e){return Qp(e)?e:new Bc(e)}function Qp(e){return e instanceof Error||typeof e=="object"&&e!==null&&typeof e.name=="string"&&typeof e.message=="string"}var Bc=class extends Error{constructor(n){super(String(n),{cause:n}),this.name="ErrorBoundaryWrappedError"}},kn=new y("",{factory:()=>{let e=f(A),n=f(Pe),t;return r=>{e.runOutsideAngular(()=>{n.destroyed&&!t?setTimeout(()=>{throw r}):(t??=n.get(et),t.handleError(r))})}}}),Jp={provide:Xr,useValue:()=>{let e=f(et,{optional:!0})},multi:!0};function te(e,n){let[t,r,i]=cc(e,n?.equal),o=t,a=o[He];return o.set=r,o.update=i,o.asReadonly=Nd.bind(o),o}function Nd(){let e=this[He];if(e.readonlyFn===void 0){let n=()=>this();n[He]=e,e.readonlyFn=n}return e.readonlyFn}var vr=new y("",{factory:()=>Tw}),Tw="ng";var fs=new y(""),yr=new y("",{providedIn:"platform",factory:()=>"unknown"}),ro=new y(""),Rn=new y("",{factory:()=>f(j).body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var ii=(()=>{class e{view;node;constructor(t,r){this.view=t,this.node=r}static __NG_ELEMENT_ID__=Aw}return e})();function Aw(){return new ii(F(),Xe())}var Vt=class{},io=new y("",{factory:()=>!0});var Td=new y(""),ms=(()=>{class e{static \u0275prov=V({token:e,providedIn:"root",factory:()=>new Hc})}return e})(),Hc=class{dirtyEffectCount=0;queues=new Map;add(n){this.enqueue(n),this.schedule(n)}schedule(n){n.dirty&&this.dirtyEffectCount++}remove(n){let t=n.zone,r=this.queues.get(t);r.has(n)&&(r.delete(n),n.dirty&&this.dirtyEffectCount--)}enqueue(n){let t=n.zone;this.queues.has(t)||this.queues.set(t,new Set);let r=this.queues.get(t);r.has(n)||r.add(n)}flush(){for(;this.dirtyEffectCount>0;){let n=!1;for(let[t,r]of this.queues)t===null?n||=this.flushQueue(r):n||=t.run(()=>this.flushQueue(r));n||(this.dirtyEffectCount=0)}}flushQueue(n){let t=!1;for(let r of n)r.dirty&&(this.dirtyEffectCount--,t=!0,r.run());return t}},$a=class{constructor(n){this[He]=n}destroy(){this[He].destroy()}};function Ht(e,n){let t=n?.injector??f(Q),r=n?.manualCleanup!==!0?t.get(qe):null,i,o=t.get(ii,null,{optional:!0}),a=t.get(Vt);return o!==null?(i=th(o.view,a,e),r instanceof za&&r._lView===o.view&&(r=null)):i=Ow(e,t.get(ms),a),i.injector=t,r!==null&&(i.onDestroyFns=[r.onDestroy(()=>i.destroy())]),new $a(i)}var eh=B(C({},uc),{cleanupFns:void 0,zone:null,onDestroyFns:null,run(){let e=Gi(!1);try{fc(this)}finally{Gi(e)}},cleanup(){if(!this.cleanupFns?.length)return;let e=S(null);try{for(;this.cleanupFns.length;)this.cleanupFns.pop()()}finally{this.cleanupFns=[],S(e)}}}),kw=B(C({},eh),{consumerMarkedDirty(){this.scheduler.schedule(this),this.notifier.notify(12)},destroy(){if(Cn(this),this.onDestroyFns!==null)for(let e of this.onDestroyFns)e();this.cleanup(),this.scheduler.remove(this)}}),Rw=B(C({},eh),{consumerMarkedDirty(){this.view[N]|=4096,mr(this.view),this.notifier.notify(13)},destroy(){if(Cn(this),this.onDestroyFns!==null)for(let e of this.onDestroyFns)e();this.cleanup(),this.view[Jt]?.delete(this)}});function th(e,n,t){let r=Object.create(Rw);return r.view=e,r.zone=typeof Zone<"u"?Zone.current:null,r.notifier=n,r.userFn=t,r.fn=nh(r,t),e[Jt]??=new Set,e[Jt].add(r),r.consumerMarkedDirty(r),r}function Ow(e,n,t){let r=Object.create(kw);return r.userFn=e,r.fn=nh(r,e),r.scheduler=n,r.notifier=t,r.zone=typeof Zone<"u"?Zone.current:null,r.scheduler.add(r),r.notifier.notify(12),r}function nh(e,n){return()=>{n(t=>(e.cleanupFns??=[]).push(t))}}function zt(e){return typeof e=="function"&&e[He]!==void 0}var oo=(()=>{class e{internalPendingTasks=f(br);scheduler=f(Vt);errorHandler=f(kn);add(){let t=this.internalPendingTasks.add();return()=>{this.internalPendingTasks.has(t)&&(this.scheduler.notify(11),this.internalPendingTasks.remove(t))}}run(t){let r=this.add();try{t().catch(this.errorHandler).finally(r)}catch(i){this.errorHandler(i),r()}}static \u0275prov=V({token:e,providedIn:"root",factory:()=>new e})}return e})();var Ls=Symbol("InputSignalNode#UNSET"),jh=B(C({},jr),{transformFn:void 0,applyValueToInputSignal(e,n){Zn(e,n)}});function vo(e){return{toString:e}.toString()}var J=(function(e){return e[e.TemplateCreateStart=0]="TemplateCreateStart",e[e.TemplateCreateEnd=1]="TemplateCreateEnd",e[e.TemplateUpdateStart=2]="TemplateUpdateStart",e[e.TemplateUpdateEnd=3]="TemplateUpdateEnd",e[e.LifecycleHookStart=4]="LifecycleHookStart",e[e.LifecycleHookEnd=5]="LifecycleHookEnd",e[e.OutputStart=6]="OutputStart",e[e.OutputEnd=7]="OutputEnd",e[e.BootstrapApplicationStart=8]="BootstrapApplicationStart",e[e.BootstrapApplicationEnd=9]="BootstrapApplicationEnd",e[e.BootstrapComponentStart=10]="BootstrapComponentStart",e[e.BootstrapComponentEnd=11]="BootstrapComponentEnd",e[e.ChangeDetectionStart=12]="ChangeDetectionStart",e[e.ChangeDetectionEnd=13]="ChangeDetectionEnd",e[e.ChangeDetectionSyncStart=14]="ChangeDetectionSyncStart",e[e.ChangeDetectionSyncEnd=15]="ChangeDetectionSyncEnd",e[e.AfterRenderHooksStart=16]="AfterRenderHooksStart",e[e.AfterRenderHooksEnd=17]="AfterRenderHooksEnd",e[e.ComponentStart=18]="ComponentStart",e[e.ComponentEnd=19]="ComponentEnd",e[e.DeferBlockStateStart=20]="DeferBlockStateStart",e[e.DeferBlockStateEnd=21]="DeferBlockStateEnd",e[e.DynamicComponentStart=22]="DynamicComponentStart",e[e.DynamicComponentEnd=23]="DynamicComponentEnd",e[e.HostBindingsUpdateStart=24]="HostBindingsUpdateStart",e[e.HostBindingsUpdateEnd=25]="HostBindingsUpdateEnd",e})(J||{}),ws=class{previousValue;currentValue;firstChange;constructor(n,t,r){this.previousValue=n,this.currentValue=t,this.firstChange=r}isFirstChange(){return this.firstChange}};function Bh(e,n,t,r){n!==null?n.applyValueToInputSignal(n,r):e[t]=r}var Hh=null,dt=(()=>{Hh=rh;let e=()=>rh;return e.ngInherit=!0,e})();function Yw(){return Hh}function rh(e){return e.type.prototype.ngOnChanges&&(e.setInput=Xw),Zw}function Zw(){let e=zh(this),n=e?.current;if(n){let t=e.previous;if(t===Mn)e.previous=n;else for(let r in n)t[r]=n[r];e.current=null,this.ngOnChanges(n)}}function Xw(e,n,t,r,i){let o=this.declaredInputs[r],a=zh(e)||Kw(e,{previous:Mn,current:null}),s=a.current||(a.current={}),l=a.previous,c=l[o];s[o]=new ws(c&&c.currentValue,t,l===Mn),Bh(e,n,i,t)}var Hd="__ngSimpleChanges__";function zh(e){return Object.hasOwn(e,Hd)&&e[Hd]||null}function Kw(e,n){return e[Hd]=n}var ih=[];var oe=function(e,n=null,t){for(let r=0;r<ih.length;r++){let i=ih[r];i(e,n,t)}};function Qw(e,n,t){let{ngOnChanges:r,ngOnInit:i,ngDoCheck:o}=n.type.prototype;if(r){let a=Yw()(n);(t.preOrderHooks??=[]).push(e,a),(t.preOrderCheckHooks??=[]).push(e,a)}i&&(t.preOrderHooks??=[]).push(0-e,i),o&&((t.preOrderHooks??=[]).push(e,o),(t.preOrderCheckHooks??=[]).push(e,o))}function Uh(e,n){for(let t=n.directiveStart,r=n.directiveEnd;t<r;t++){let o=e.data[t].type.prototype,{ngAfterContentInit:a,ngAfterContentChecked:s,ngAfterViewInit:l,ngAfterViewChecked:c,ngOnDestroy:d}=o;a&&(e.contentHooks??=[]).push(-t,a),s&&((e.contentHooks??=[]).push(t,s),(e.contentCheckHooks??=[]).push(t,s)),l&&(e.viewHooks??=[]).push(-t,l),c&&((e.viewHooks??=[]).push(t,c),(e.viewCheckHooks??=[]).push(t,c)),d!=null&&(e.destroyHooks??=[]).push(t,d)}}function bs(e,n,t){$h(e,n,3,t)}function vs(e,n,t,r){(e[N]&3)===t&&$h(e,n,t,r)}function Ad(e,n){let t=e[N];(t&3)===n&&(t&=8191,t+=1,e[N]=t)}function $h(e,n,t,r){let i=r!==void 0?e[lr]&65535:0,o=r??-1,a=n.length-1,s=0;for(let l=i;l<a;l++)if(typeof n[l+1]=="number"){if(s=n[l],r!=null&&s>=r)break}else n[l]<0&&(e[lr]+=65536),(s<o||o==-1)&&(Jw(e,t,n,l),e[lr]=(e[lr]&4294901760)+l+2),l++}function oh(e,n){oe(J.LifecycleHookStart,e,n);let t=S(null);try{n.call(e)}finally{S(t),oe(J.LifecycleHookEnd,e,n)}}function Jw(e,n,t,r){let i=t[r]<0,o=t[r+1],a=i?-t[r]:t[r],s=e[a];i?e[N]>>13<e[lr]>>16&&(e[N]&3)===n&&(e[N]+=8192,oh(s,o)):oh(s,o)}var si=-1,wr=class{factory;name;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(n,t,r,i){this.factory=n,this.name=i,this.canSeeViewProviders=t,this.injectImpl=r}};function eC(e){return(e.flags&8)!==0}function tC(e){return(e.flags&16)!==0}function nC(e,n,t){let r=0;for(;r<t.length;){let i=t[r];if(typeof i=="number"){if(i!==0)break;r++;let o=t[r++],a=t[r++],s=t[r++];e.setAttribute(n,a,s,o)}else{let o=i,a=t[++r];rC(o)?e.setProperty(n,o,a):e.setAttribute(n,o,a),r++}}return r}function Gh(e){return e===3||e===4||e===6}function rC(e){return e.charCodeAt(0)===64}function li(e,n){if(!(n===null||n.length===0))if(e===null||e.length===0)e=n.slice();else{let t=-1;for(let r=0;r<n.length;r++){let i=n[r];typeof i=="number"?t=i:t===0||(t===-1||t===2?ah(e,t,i,null,n[++r]):ah(e,t,i,null,null))}}return e}function ah(e,n,t,r,i){let o=0,a=e.length;if(n===-1)a=-1;else for(;o<e.length;){let s=e[o++];if(typeof s=="number"){if(s===n){a=-1;break}else if(s>n){a=o-1;break}}}for(;o<e.length;){let s=e[o];if(typeof s=="number")break;if(s===t){i!==null&&(e[o+1]=i);return}o++,i!==null&&o++}a!==-1&&(e.splice(a,0,n),o=a+1),e.splice(o++,0,t),i!==null&&e.splice(o++,0,i)}function Wh(e){return e!==si}function Cs(e){return e&32767}function iC(e){return e>>16}function Ds(e,n){let t=iC(e),r=n;for(;t>0;)r=r[Nn],t--;return r}var zd=!0;function Es(e){let n=zd;return zd=e,n}var oC=256,qh=oC-1,Yh=5,aC=0,Ut={};function sC(e,n,t){let r;typeof t=="string"?r=t.charCodeAt(0)||0:Object.hasOwn(t,ar)&&(r=t[ar]),r==null&&(r=t[ar]=aC++);let i=r&qh,o=1<<i;n.data[e+(i>>Yh)]|=o}function xs(e,n){let t=Zh(e,n);if(t!==-1)return t;let r=n[I];r.firstCreatePass&&(e.injectorIndex=n.length,kd(r.data,e),kd(n,null),kd(r.blueprint,null));let i=Du(e,n),o=e.injectorIndex;if(Wh(i)){let a=Cs(i),s=Ds(i,n),l=s[I].data;for(let c=0;c<8;c++)n[o+c]=s[a+c]|l[a+c]}return n[o+8]=i,o}function kd(e,n){e.push(0,0,0,0,0,0,0,0,n)}function Zh(e,n){return e.injectorIndex===-1||e.parent&&e.parent.injectorIndex===e.injectorIndex||n[e.injectorIndex+8]===null?-1:e.injectorIndex}function Du(e,n){if(e.parent&&e.parent.injectorIndex!==-1)return e.parent.injectorIndex;let t=0,r=null,i=n;for(;i!==null;){if(r=eg(i),r===null)return si;if(t++,i=i[Nn],r.injectorIndex!==-1)return r.injectorIndex|t<<16}return si}function Ud(e,n,t){sC(e,n,t)}function lC(e,n){if(n==="class")return e.classes;if(n==="style")return e.styles;let t=e.attrs;if(t){let r=t.length,i=0;for(;i<r;){let o=t[i];if(Gh(o))break;if(o===0)i=i+2;else if(typeof o=="number")for(i++;i<r&&typeof t[i]=="string";)i++;else{if(o===n)return t[i+1];i=i+2}}}return null}function Xh(e,n,t){if(t&8||e!==void 0)return e;Xa(n,"NodeInjector")}function Kh(e,n,t,r){if(t&8&&r===void 0&&(r=null),(t&3)===0){let i=e[nn],o=it(void 0);try{return i?i.get(n,r,t&8):Zc(n,r,t&8)}finally{it(o)}}return Xh(r,n,t)}function Qh(e,n,t,r=0,i){if(e!==null){if(n[N]&2048&&!(r&2)){let a=fC(e,n,t,r,Ut);if(a!==Ut)return a}let o=Jh(e,n,t,r,Ut);if(o!==Ut)return o}return Kh(n,t,r,i)}function Jh(e,n,t,r,i){let o=dC(t);if(typeof o=="function"){if(!Ed(n,e,r))return r&1?Xh(i,t,r):Kh(n,t,r,i);try{let a;if(a=o(r),a==null&&!(r&8))Xa(t);else return a}finally{xd()}}else if(typeof o=="number"){let a=null,s=Zh(e,n),l=si,c=r&1?n[Ye][Ue]:null;for((s===-1||r&4)&&(l=s===-1?Du(e,n):n[s+8],l===si||!lh(r,!1)?s=-1:(a=n[I],s=Cs(l),n=Ds(l,n)));s!==-1;){let d=n[I];if(sh(o,s,d.data)){let u=cC(s,n,t,a,r,c);if(u!==Ut)return u}l=n[s+8],l!==si&&lh(r,n[I].data[s+8]===c)&&sh(o,s,n)?(a=d,s=Cs(l),n=Ds(l,n)):s=-1}}return i}function cC(e,n,t,r,i,o){let a=n[I],s=a.data[e+8],l=r==null?on(s)&&zd:r!=a&&(s.type&3)!==0,c=i&1&&o===s,d=ys(s,a,t,l,c);return d!==null?co(n,a,d,s,i):Ut}function ys(e,n,t,r,i){let o=e.providerIndexes,a=n.data,s=o&1048575,l=e.directiveStart,c=e.directiveEnd,d=o>>20,u=r?s:s+d,p=i?s+d:c;for(let m=u;m<p;m++){let h=a[m];if(m<l&&t===h||m>=l&&h.type===t)return m}if(i){let m=a[l];if(m&&an(m)&&m.type===t)return l}return null}function co(e,n,t,r,i){let o=e[t],a=n.data;if(o instanceof wr){let s=o;if(s.resolving)throw Yc("");let l=Es(s.canSeeViewProviders);s.resolving=!0;let c=a[t].type||a[t],d,u=s.injectImpl?it(s.injectImpl):null,p=Ed(e,r,0);try{o=e[t]=s.factory(void 0,i,a,e,r),n.firstCreatePass&&t>=r.directiveStart&&Qw(t,a[t],n)}finally{u!==null&&it(u),Es(l),s.resolving=!1,xd()}}return o}function dC(e){if(typeof e=="string")return e.charCodeAt(0)||0;let n=Object.hasOwn(e,ar)?e[ar]:void 0;return typeof n=="number"?n>=0?n&qh:uC:n}function sh(e,n,t){let r=1<<e;return!!(t[n+(e>>Yh)]&r)}function lh(e,n){return!(e&2)&&!(e&1&&n)}var ln=class{_tNode;_lView;constructor(n,t){this._tNode=n,this._lView=t}get(n,t,r){return Qh(this._tNode,this._lView,n,rr(r),t)}};function uC(){return new ln(Xe(),F())}function xr(e){return vo(()=>{let n=e.prototype.constructor,t=n[$i]||$d(n),r=Object.prototype,i=Object.getPrototypeOf(e.prototype).constructor;for(;i&&i!==r;){let o=i[$i]||$d(i);if(o&&o!==t)return o;i=Object.getPrototypeOf(i)}return o=>new o})}function $d(e){return Uc(e)?()=>{let n=$d(We(e));return n&&n()}:Sn(e)}function fC(e,n,t,r,i){let o=e,a=n,s=r&1?n[Ye][Ue]:null;for(;o!==null&&a!==null&&a[N]&2048&&!ni(a);){let l=Jh(o,a,t,r|2,Ut);if(l!==Ut)return l;if(r&=-5,r&1&&o===s)return i;let c=o.parent;if(!c){let d=a[rd];if(d){let u=d.get(t,Ut,r);if(u!==Ut)return u}c=eg(a),a=a[Nn]}o=c}return i}function eg(e){let n=e[I],t=n.type;return t===2?n.declTNode:t===1?e[Ue]:null}function Eu(e){return lC(Xe(),e)}function k(e){return{token:e.token,providedIn:e.autoProvided===!1?null:"root",factory:e.factory,value:void 0}}function mC(){return mi(Xe(),F())}function mi(e,n){return new Z(ht(e,n))}var Z=(()=>{class e{nativeElement;constructor(t){this.nativeElement=t}static __NG_ELEMENT_ID__=mC}return e})();function tg(e){return e instanceof Z?e.nativeElement:e}function pC(){return this._results[Symbol.iterator]()}var Ss=class{_emitDistinctChangesOnly;dirty=!0;_onDirty=void 0;_results=[];_changesDetected=!1;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new L}constructor(n=!1){this._emitDistinctChangesOnly=n}get(n){return this._results[n]}map(n){return this._results.map(n)}filter(n){return this._results.filter(n)}find(n){return this._results.find(n)}reduce(n,t){return this._results.reduce(n,t)}forEach(n){this._results.forEach(n)}some(n){return this._results.some(n)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(n,t){this.dirty=!1;let r=pp(n);(this._changesDetected=!mp(this._results,r,t))&&(this._results=r,this.length=r.length,this.last=r[this.length-1],this.first=r[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this)}onDirty(n){this._onDirty=n}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}[Symbol.iterator]=pC};function ng(e){let n=e.nextSibling;if(n&&e!==n.previousSibling)throw rg(n);return n}function hC(e){let n=e.firstChild;if(n&&(n.parentNode!==e||n.previousSibling!==null))throw rg(n);return n}function ch(e){let n=e.nodeName;return typeof n=="string"?n:"FORM"}function rg(e){return new Error(`Action failed because the element is clobbered: ${e.outerHTML}`)}function ig(e){return(e.flags&128)===128}var xu=(function(e){return e[e.OnPush=0]="OnPush",e[e.Eager=1]="Eager",e[e.Default=1]="Default",e})(xu||{}),og=new Map,gC=0;function bC(){return gC++}function vC(e){og.set(e[Ki],e)}function Gd(e){og.delete(e[Ki])}var dh="__ngContext__";function ci(e,n){rn(n)?(e[dh]=n[Ki],vC(n)):e[dh]=n}function ag(e){return lg(e[ei])}function sg(e){return lg(e[mt])}function lg(e){for(;e!==null&&!pt(e);)e=e[mt];return e}var Wd;function Su(e){Wd=e}function cg(){if(Wd!==void 0)return Wd;if(typeof document<"u")return document;throw new x(210,!1)}var dg="r";var ug="di";var fg=!1,mg=new y("",{factory:()=>fg});var uh=new WeakMap;function yC(e,n){if(e==null||typeof e!="object")return;let t=uh.get(e);t||(t=new WeakSet,uh.set(e,t)),t.add(n)}var _C=(e,n,t,r)=>{};function wC(e,n,t,r){_C(e,n,t,r)}function Vs(e){return(e.flags&32)===32}var CC=()=>null;function pg(e,n,t=!1){return CC(e,n,t)}function hg(e,n){let t=e.contentQueries;if(t!==null){let r=S(null);try{for(let i=0;i<t.length;i+=2){let o=t[i],a=t[i+1];if(a!==-1){let s=e.data[a];to(o),s.contentQueries(2,n[a],a)}}}finally{S(r)}}}function qd(e,n,t){to(0);let r=S(null);try{n(e,t)}finally{S(r)}}function gg(e,n,t){if(od(n)){let r=S(null);try{let i=n.directiveStart,o=n.directiveEnd;for(let a=i;a<o;a++){let s=e.data[a];if(s.contentQueries){let l=t[a];s.contentQueries(1,l,a)}}}finally{S(r)}}}var At=(function(e){return e[e.Emulated=0]="Emulated",e[e.None=2]="None",e[e.ShadowDom=3]="ShadowDom",e[e.ExperimentalIsolatedShadowDom=4]="ExperimentalIsolatedShadowDom",e})(At||{}),cn=class{changingThisBreaksApplicationSecurity;constructor(n){this.changingThisBreaksApplicationSecurity=n}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity}`}},Yd=class extends cn{getTypeName(){return"HTML"}},Zd=class extends cn{getTypeName(){return"Style"}},Xd=class extends cn{getTypeName(){return"Script"}},Kd=class extends cn{getTypeName(){return"URL"}},Qd=class extends cn{getTypeName(){return"ResourceURL"}};function kt(e){return e instanceof cn?e.changingThisBreaksApplicationSecurity:e}function Sr(e,n){let t=bg(e);if(t!=null&&t!==n){if(t==="ResourceURL"&&n==="URL")return!0;throw new Error(`Required a safe ${n}, got a ${t} (see ${zc})`)}return t===n}function bg(e){return e instanceof cn&&e.getTypeName()||null}function Iu(e){return new Yd(e)}function Mu(e){return new Zd(e)}function Nu(e){return new Xd(e)}function Tu(e){return new Kd(e)}function Au(e){return new Qd(e)}var ps;function DC(){if(ps===void 0&&(ps=null,Yr.trustedTypes))try{ps=Yr.trustedTypes.createPolicy("angular",{createHTML:e=>e,createScript:e=>e,createScriptURL:e=>e})}catch(e){}return ps}function js(e){return DC()?.createHTML(e)||e}function EC(e){let n=new eu(e);return xC()?new Jd(n):n}var Jd=class{inertDocumentHelper;constructor(n){this.inertDocumentHelper=n}getInertBodyElement(n){n="<body><remove></remove>"+n;try{let t=new window.DOMParser().parseFromString(js(n),"text/html").body;return t===null?this.inertDocumentHelper.getInertBodyElement(n):(t.firstChild?.remove(),t)}catch(t){return null}}},eu=class{inertDocument;constructor(n){this.inertDocument=n.implementation.createHTMLDocument("sanitization-inert")}getInertBodyElement(n){let t=this.inertDocument.createElement("template");return t.innerHTML=js(n),t}};function xC(){try{return!!new window.DOMParser().parseFromString(js(""),"text/html")}catch(e){return!1}}var SC=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;function Bs(e){return e=String(e),e.match(SC)?e:"unsafe:"+e}function un(e){let n=Object.create(null);for(let t of e.split(","))n[t]=!0;return n}function yo(...e){let n=Object.create(null);for(let t of e)for(let r in t)Object.hasOwn(t,r)&&(n[r]=!0);return n}var vg=un("area,br,col,hr,img,wbr"),yg=un("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),_g=un("rp,rt"),IC=yo(_g,yg),MC=yo(yg,un("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")),NC=yo(_g,un("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")),fh=yo(vg,MC,NC,IC),wg=un("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),TC=un("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"),AC=un("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"),kC=yo(wg,TC,AC),RC=un("script,style,template"),tu=class{sanitizedSomething=!1;buf=[];sanitizeChildren(n){let t=n.firstChild,r=!0,i=[];for(;t;){if(t.nodeType===Node.ELEMENT_NODE?r=this.startElement(t):t.nodeType===Node.TEXT_NODE?this.chars(t.nodeValue):this.sanitizedSomething=!0,r&&t.firstChild){i.push(t),t=hC(t);continue}for(;t;){t.nodeType===Node.ELEMENT_NODE&&this.endElement(t);let o=ng(t);if(o){t=o;break}t=i.pop()}}return this.buf.join("")}startElement(n){let t=ch(n).toLowerCase();if(!Object.hasOwn(fh,t))return this.sanitizedSomething=!0,!Object.hasOwn(RC,t);this.buf.push("<"),this.buf.push(t);let r=n.attributes;for(let i=0;i<r.length;i++){let o=r.item(i),a=o.name,s=a.toLowerCase();if(!Object.hasOwn(kC,s)){this.sanitizedSomething=!0;continue}let l=o.value;wg[s]&&(l=Bs(l)),this.buf.push(" ",a,'="',mh(l),'"')}return this.buf.push(">"),!0}endElement(n){let t=ch(n).toLowerCase();Object.hasOwn(fh,t)&&!Object.hasOwn(vg,t)&&(this.buf.push("</"),this.buf.push(t),this.buf.push(">"))}chars(n){this.buf.push(mh(n))}},OC=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,FC=/([^\#-~ |!])/g;function mh(e){return e.replace(/&/g,"&amp;").replace(OC,function(n){let t=n.charCodeAt(0),r=n.charCodeAt(1);return"&#"+((t-55296)*1024+(r-56320)+65536)+";"}).replace(FC,function(n){return"&#"+n.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}var hs;function ku(e,n){let t=null;try{hs=hs||EC(e);let r=n?String(n):"";t=hs.getInertBodyElement(r);let i=5,o=r;do{if(i===0)throw new Error("Failed to sanitize html because the input is unstable");i--,r=o,o=t.innerHTML,ph(t),t=null,t=hs.getInertBodyElement(r)}while(r!==o);let s=new tu().sanitizeChildren(Cg(t)||t);return js(s)}finally{t&&ph(t)}}function ph(e){let n=Cg(e)||e;for(;n.firstChild;)n.firstChild.remove()}function Cg(e){return"content"in e&&PC(e)?e.content:null}function PC(e){return e.nodeType===Node.ELEMENT_NODE&&e.nodeName==="TEMPLATE"}function LC(e,n){return e.createText(n)}function VC(e,n,t){e.setValue(n,t)}function Dg(e,n,t){return e.createElement(n,t)}function _r(e,n,t,r,i){e.insertBefore(n,t,r,i)}function Eg(e,n,t){e.appendChild(n,t)}function hh(e,n,t,r,i){r!==null?_r(e,n,t,r,i):Eg(e,n,t)}function xg(e,n,t,r){e.removeChild(null,n,t,r)}function jC(e,n,t,r,i,o,a){if(o==null)a?.(o,r||"",i),e.removeAttribute(n,i,t);else{let s=a==null?qc(o):a(o,r||"",i);e.setAttribute(n,i,s,t)}}function BC(e,n,t){e.setAttribute(n,"style",t)}function HC(e,n,t){t===""?e.removeAttribute(n,"class"):e.setAttribute(n,"class",t)}function Sg(e,n,t){let{mergedAttrs:r,classes:i,styles:o}=t;r!==null&&nC(e,n,r),i!==null&&HC(e,n,i),o!==null&&BC(e,n,o)}function zC(e,n,t){let r=e.length;for(;;){let i=e.indexOf(n,t);if(i===-1)return i;if(i===0||e.charCodeAt(i-1)<=32){let o=n.length;if(i+o===r||e.charCodeAt(i+o)<=32)return i}t=i+1}}var Ig="ng-template";function UC(e,n,t,r){let i=0;if(r){for(;i<n.length&&typeof n[i]=="string";i+=2)if(n[i]==="class"&&zC(n[i+1].toLowerCase(),t,0)!==-1)return!0}else if(Ru(e))return!1;if(i=n.indexOf(1,i),i>-1){let o;for(;++i<n.length&&typeof(o=n[i])=="string";)if(o.toLowerCase()===t)return!0}return!1}function Ru(e){return e.type===4&&e.value!==Ig}function $C(e,n,t){let r=e.type===4&&!t?Ig:e.value;return n===r}function GC(e,n,t){let r=4,i=e.attrs,o=i!==null?YC(i):0,a=!1;for(let s=0;s<n.length;s++){let l=n[s];if(typeof l=="number"){if(!a&&!Nt(r)&&!Nt(l))return!1;if(a&&Nt(l))continue;a=!1,r=l|r&1;continue}if(!a)if(r&4){if(r=2|r&1,l!==""&&!$C(e,l,t)||l===""&&n.length===1){if(Nt(r))return!1;a=!0}}else if(r&8){if(i===null||!UC(e,i,l,t)){if(Nt(r))return!1;a=!0}}else{let c=n[++s],d=WC(l,i,Ru(e),t);if(d===-1){if(Nt(r))return!1;a=!0;continue}if(c!==""){let u;if(d>o?u="":u=i[d+1].toLowerCase(),r&2&&c!==u){if(Nt(r))return!1;a=!0}}}}return Nt(r)||a}function Nt(e){return(e&1)===0}function WC(e,n,t,r){if(n===null)return-1;let i=0;if(r||!t){let o=!1;for(;i<n.length;){let a=n[i];if(a===e)return i;if(a===3||a===6)o=!0;else if(a===1||a===2){let s=n[++i];for(;typeof s=="string";)s=n[++i];continue}else{if(a===4)break;if(a===0){i+=4;continue}}i+=o?1:2}return-1}else return ZC(n,e)}function Mg(e,n,t=!1){for(let r=0;r<n.length;r++)if(GC(e,n[r],t))return!0;return!1}function qC(e){let n=e.attrs;if(n!=null){let t=n.indexOf(5);if((t&1)===0)return n[t+1]}return null}function YC(e){for(let n=0;n<e.length;n++){let t=e[n];if(Gh(t))return n}return e.length}function ZC(e,n){let t=e.indexOf(4);if(t>-1)for(t++;t<e.length;){let r=e[t];if(typeof r=="number")return-1;if(r===n)return t;t++}return-1}function XC(e,n){e:for(let t=0;t<n.length;t++){let r=n[t];if(e.length===r.length){for(let i=0;i<e.length;i++)if(e[i]!==r[i])continue e;return!0}}return!1}function gh(e,n){return e?":not("+n.trim()+")":n}function KC(e){let n=e[0],t=1,r=2,i="",o=!1;for(;t<e.length;){let a=e[t];if(typeof a=="string")if(r&2){let s=e[++t];i+="["+a+(s.length>0?'="'+s+'"':"")+"]"}else r&8?i+="."+a:r&4&&(i+=" "+a);else i!==""&&!Nt(a)&&(n+=gh(o,i),i=""),r=a,o=o||!Nt(r);t++}return i!==""&&(n+=gh(o,i)),n}function QC(e){return e.map(KC).join(",")}function JC(e){let n=[],t=[],r=1,i=2;for(;r<e.length;){let o=e[r];if(typeof o=="string")i===2?o!==""&&n.push(o,e[++r]):i===8&&t.push(o);else{if(!Nt(i))break;i=o}r++}return t.length&&n.push(1,...t),n}var vt={},$t=(function(e){return e[e.Important=1]="Important",e[e.DashCase=2]="DashCase",e})($t||{}),eD;function Ou(e,n){return eD(e,n)}var Fu=new Set;var DF=typeof document<"u"&&typeof document?.documentElement?.getAnimations=="function";var nu=new WeakMap;function Ng(e){return e?e[Nn]??e:null}var oi=new WeakSet;function tD(e,n,t){let r=nu.get(e);if(!r||r.length===0)return;let i=n.parentNode,o=n.previousSibling,a=Ng(t);for(let s=r.length-1;s>=0;s--){let{el:l,declarationView:c}=r[s],d=l.parentNode;l===n?(r.splice(s,1),oi.add(l),l.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}}))):o&&l===o?(r.splice(s,1),l.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}})),l.parentNode?.removeChild(l)):d&&i&&d!==i&&(a===null||c===null||a===c)&&(r.splice(s,1),l.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}})),l.parentNode?.removeChild(l))}}function nD(e,n,t){let r=Ng(t),i=nu.get(e);i?i.some(o=>o.el===n)||i.push({el:n,declarationView:r}):nu.set(e,[{el:n,declarationView:r}])}var Hs=(function(e){return e[e.CHANGE_DETECTION=0]="CHANGE_DETECTION",e[e.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",e})(Hs||{}),Rt=new y(""),bh=new Set;function Fn(e){bh.has(e)||(bh.add(e),performance?.mark?.("mark_feature_usage",{detail:{feature:e}}))}var zs=(()=>{class e{impl=null;execute(){this.impl?.execute()}static \u0275prov=V({token:e,providedIn:"root",factory:()=>new e})}return e})(),Pu=[0,1,2,3],Lu=(()=>{class e{ngZone=f(A);scheduler=f(Vt);errorHandler=f(et,{optional:!0});sequences=new Set;deferredRegistrations=new Set;executing=!1;constructor(){f(Rt,{optional:!0})}execute(){let t=this.sequences.size>0;t&&oe(J.AfterRenderHooksStart),this.executing=!0;for(let r of Pu)for(let i of this.sequences)if(!(i.erroredOrDestroyed||!i.hooks[r]))try{i.pipelinedValue=this.ngZone.runOutsideAngular(()=>this.maybeTrace(()=>{let o=i.hooks[r];return o(i.pipelinedValue)},i.snapshot))}catch(o){i.erroredOrDestroyed=!0,this.errorHandler?.handleError(o)}this.executing=!1;for(let r of this.sequences)r.afterRun(),r.once&&(this.sequences.delete(r),r.destroy());for(let r of this.deferredRegistrations)this.sequences.add(r);this.deferredRegistrations.size>0&&this.scheduler.notify(7),this.deferredRegistrations.clear(),t&&oe(J.AfterRenderHooksEnd)}register(t){let{view:r}=t;r!==void 0?((r[cr]??=[]).push(t),mr(r),r[N]|=4096):this.addSequence(t)}addSequence(t){this.executing?this.deferredRegistrations.add(t):this.sequences.add(t),this.scheduler.notify(7)}unregister(t){this.executing&&this.sequences.has(t)?(t.erroredOrDestroyed=!0,t.pipelinedValue=void 0,t.once=!0):(this.sequences.delete(t),this.deferredRegistrations.delete(t))}maybeTrace(t,r){return r?r.run(Hs.AFTER_NEXT_RENDER,t):t()}static \u0275prov=V({token:e,providedIn:"root",factory:()=>new e})}return e})(),uo=class{impl;hooks;view;once;snapshot;erroredOrDestroyed=!1;pipelinedValue=void 0;unregisterOnDestroy;constructor(n,t,r,i,o,a=null){this.impl=n,this.hooks=t,this.view=r,this.once=i,this.snapshot=a,this.unregisterOnDestroy=o?.onDestroy(()=>this.destroy())}afterRun(){this.erroredOrDestroyed=!1,this.pipelinedValue=void 0,this.snapshot?.dispose(),this.snapshot=null}destroy(){this.impl.unregister(this),this.unregisterOnDestroy?.();let n=this.view?.[cr];n&&(this.view[cr]=n.filter(t=>t!==this))}};function pi(e,n){let t=n?.injector??f(Q);return Fn("NgAfterNextRender"),iD(e,t,n,!0)}function rD(e){return e instanceof Function?[void 0,void 0,e,void 0]:[e.earlyRead,e.write,e.mixedReadWrite,e.read]}function iD(e,n,t,r){let i=n.get(zs);i.impl??=n.get(Lu);let o=n.get(Rt,null,{optional:!0}),a=t?.manualCleanup!==!0?n.get(qe):null,s=n.get(ii,null,{optional:!0}),l=new uo(i.impl,rD(e),s?.view,r,a,o?.snapshot(null));return i.impl.register(l),l}var ru=null,Tg=null;function vh(e,n,t,r){ru?.maybeQueueEnterAnimation(e,n,t,r)}function yh(e,n,t,r){ru===null?r(!1):ru.runLeaveAnimationsWithCallback(e,n,t,r)}function oD(e){Tg?.initViewDetachAnimations(e)}function aD(e){Tg?.clearViewDetachAnimations(e)}function ai(e,n,t,r,i,o,a,s){if(i!=null){let l,c=!1;pt(i)?l=i:rn(i)&&(c=!0,i=i[Mt]);let d=Ze(i);e===0&&r!==null?(vh(s,r,o,t),a==null?Eg(n,r,d):_r(n,r,d,a||null,!0)):e===1&&r!==null?(_r(n,r,d,a||null,!0),tD(o,d,s),oi.has(d)||vh(s,r,o,t)):e===2?(s?.[Cp]?.leave?.has(o.index)&&nD(o,d,s),oi.delete(d),yh(s,o,t,u=>{if(oi.has(d)){oi.delete(d);return}xg(n,d,c,u)})):e===3&&(oi.delete(d),yh(s,o,t,()=>{n.destroyNode(d)})),l!=null&&bD(n,e,t,l,o,r,a)}}function sD(e,n){Ag(e,n),n[Mt]=null,n[Ue]=null}function lD(e,n,t,r,i,o){r[Mt]=i,r[Ue]=n,$s(e,r,t,1,i,o)}function Ag(e,n){n[jt].changeDetectionScheduler?.notify(9),$s(e,n,n[be],2,null,null)}function cD(e){let n=e[ei];if(!n)return Rd(e[I],e);for(;n;){let t=null;if(rn(n))t=n[ei];else{let r=n[Me];r&&(t=r)}if(!t){for(;n&&!n[mt]&&n!==e;)rn(n)&&Rd(n[I],n),n=n[Te];n===null&&(n=e),rn(n)&&Rd(n[I],n),t=n&&n[mt]}n=t}}function Vu(e,n){let t=e[ur],r=t.indexOf(n);t.splice(r,1)}function Us(e,n){if(fr(n))return;let t=n[be];t.destroyNode&&$s(e,n,t,3,null,null),cD(n)}function Rd(e,n){if(fr(n))return;let t=S(null);try{n[N]&=-129,n[N]|=256,n[ct]&&Cn(n[ct]),uD(e,n),dD(e,n),n[I].type===1&&n[be].destroy();let r=n[Tn];if(r!==null&&pt(n[Te])){r!==n[Te]&&Vu(r,n);let i=n[Bt];i!==null&&i.detachView(e)}Gd(n)}finally{S(t)}}function dD(e,n){let t=e.cleanup,r=n[Jr];if(t!==null)for(let a=0;a<t.length-1;a+=2)if(typeof t[a]=="string"){let s=t[a+3];s>=0?r[s]():r[-s].unsubscribe(),a+=2}else{let s=r[t[a+1]];t[a].call(s)}r!==null&&(n[Jr]=null);let i=n[Qt];if(i!==null){n[Qt]=null;for(let a=0;a<i.length;a++){let s=i[a];s()}}let o=n[Jt];if(o!==null){n[Jt]=null;for(let a of o)a.destroy()}}function uD(e,n){let t;if(e!=null&&(t=e.destroyHooks)!=null)for(let r=0;r<t.length;r+=2){let i=n[t[r]];if(!(i instanceof wr)){let o=t[r+1];if(Array.isArray(o))for(let a=0;a<o.length;a+=2){let s=i[o[a]],l=o[a+1];oe(J.LifecycleHookStart,s,l);try{l.call(s)}finally{oe(J.LifecycleHookEnd,s,l)}}else{oe(J.LifecycleHookStart,i,o);try{o.call(i)}finally{oe(J.LifecycleHookEnd,i,o)}}}}}function kg(e,n,t){if(n===null)throw new x(510,!1);return fD(e,n.parent,t)}function fD(e,n,t){let r=n;for(;r!==null&&r.type&168;)n=r,r=n.parent;if(r===null)return t[Mt];if(on(r)){let{encapsulation:i}=e.data[r.directiveStart+r.componentOffset];if(i===At.None||i===At.Emulated)return null}return ht(r,t)}function Rg(e,n,t){return pD(e,n,t)}function mD(e,n,t){return e.type&40?ht(e,t):null}var pD=mD,_h;function ju(e,n,t,r){let i=kg(e,r,n),o=n[be],a=r.parent||n[Ue],s=Rg(a,r,n);if(i!=null)if(Array.isArray(t))for(let l=0;l<t.length;l++)hh(o,i,t[l],s,!1);else hh(o,i,t,s,!1);_h!==void 0&&_h(o,r,n,t,i)}function ao(e,n){if(n!==null){let t=n.type;if(t&3)return ht(n,e);if(t&4)return iu(-1,e[n.index]);if(t&8){let r=n.child;if(r!==null)return ao(e,r);{let i=e[n.index];return pt(i)?iu(-1,i):Ze(i)}}else{if(t&128)return ao(e,n.next);if(t&32)return Ou(n,e)()||Ze(e[n.index]);{let r=Og(e,n);if(r!==null){if(Array.isArray(r))return r[0];let i=en(e[Ye]);return ao(i,r)}else return ao(e,n.next)}}}return null}function Og(e,n){if(n!==null){let r=e[Ye][Ue],i=n.projection;return r.projection[i]}return null}function iu(e,n){let t=Me+e+1;if(t<n.length){let r=n[t],i=r[I].firstChild;if(i!==null)return ao(r,i)}return n[dr]}function Bu(e,n,t,r,i,o,a){for(;t!=null;){let s=r[nn];if(t.type===128){t=t.next;continue}let l=r[t.index],c=t.type;if(a&&n===0&&(l&&ci(Ze(l),r),t.flags|=2),!Vs(t))if(c&8)Bu(e,n,t.child,r,i,o,!1),ai(n,e,s,i,l,t,o,r);else if(c&32){let d=Ou(t,r),u;for(;u=d();)ai(n,e,s,i,u,t,o,r);ai(n,e,s,i,l,t,o,r)}else c&16?Fg(e,n,r,t,i,o):ai(n,e,s,i,l,t,o,r);t=a?t.projectionNext:t.next}}function $s(e,n,t,r,i,o){e.type===3?hD(t,r,n,i,o):Bu(t,r,e.firstChild,n,i,o,!1)}function hD(e,n,t,r,i){let a=t[I].firstChild,s=a.next,l=Ze(t[a.index]),c=Ze(t[s.index]),d=s.index+1,u=t[d];if(n===1||n===0)r!==null&&(u&&u.hasChildNodes()?_r(e,r,u,i,!0):(_r(e,r,l,i,!0),_r(e,r,c,i,!0)));else if(n===2){if(u||(u=document.createDocumentFragment(),t[d]=u),l&&l.parentNode===u)return;let p=l;for(;p!==null;){let m=p.nextSibling;if(u.appendChild(p),p===c)break;p=m}}}function gD(e,n,t){let r=n[be],i=kg(e,t,n),o=t.parent||n[Ue],a=Rg(o,t,n);Fg(r,0,n,t,i,a)}function Fg(e,n,t,r,i,o){let a=t[Ye],l=a[Ue].projection[r.projection];if(Array.isArray(l))for(let c=0;c<l.length;c++){let d=l[c];ai(n,e,t[nn],i,d,r,o,t)}else{let c=l,d=a[Te];ig(r)&&(c.flags|=128),Bu(e,n,c,d,i,o,!0)}}function bD(e,n,t,r,i,o,a){let s=r[dr],l=Ze(r);if(s!==l&&ai(n,e,t,o,s,i,a),(r[N]&4)===0)for(let c=Me;c<r.length;c++){let d=r[c];$s(d[I],d,e,n,o,s)}}function vD(e,n,t,r,i){if(n)i?e.addClass(t,r):e.removeClass(t,r);else{let o=r.indexOf("-")===-1?void 0:$t.DashCase;i==null?e.removeStyle(t,r,o):(typeof i=="string"&&i.endsWith("!important")&&(i=i.slice(0,-10),o|=$t.Important),e.setStyle(t,r,i,o))}}function Hu(e,n,t,r,i,o,a,s,l,c,d){let u=De+r,p=u+i,m=yD(u,p),h=typeof c=="function"?c():c;return m[I]={type:e,blueprint:m,template:t,queries:null,viewQuery:s,declTNode:n,data:m.slice().fill(null,u),bindingStartIndex:u,expandoStartIndex:p,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof o=="function"?o():o,pipeRegistry:typeof a=="function"?a():a,firstChild:null,schemas:l,consts:h,incompleteFirstPass:!1,ssrId:d}}function yD(e,n){let t=[];for(let r=0;r<n;r++)t.push(r<e?null:vt);return t}function _D(e){let n=e.tView;return n===null||n.incompleteFirstPass?e.tView=Hu(1,null,e.template,e.decls,e.vars,e.directiveDefs,e.pipeDefs,e.viewQuery,e.schemas,e.consts,e.id):n}function zu(e,n,t,r,i,o,a,s,l,c,d){let u=n.blueprint.slice();return u[Mt]=i,u[N]=r|4|128|8|64|1024,(c!==null||e&&e[N]&2048)&&(u[N]|=2048),dd(u),u[Te]=u[Nn]=e,u[Ie]=t,u[jt]=a||e&&e[jt],u[be]=s||e&&e[be],u[nn]=l||e&&e[nn]||null,u[Ue]=o,u[Ki]=bC(),u[sr]=d,u[rd]=c,u[Ye]=n.type==2?e[Ye]:u,u}function wD(e,n,t){let r=ht(n,e),i=_D(t),o=e[jt].rendererFactory,a=Uu(e,zu(e,i,null,Pg(t),r,n,null,o.createRenderer(r,t),null,null,null));return e[n.index]=a}function Pg(e){let n=16;return e.onPush&&(n=64),n}function Lg(e,n,t,r){if(t===0)return-1;let i=n.length;for(let o=0;o<t;o++)n.push(r),e.blueprint.push(r),e.data.push(null);return i}function Uu(e,n){return e[ei]?e[nd][mt]=n:e[ei]=n,e[nd]=n,n}function _(e=1){Vg(Ee(),F(),sn()+e,!1)}function Vg(e,n,t,r){if(!r)if((n[N]&3)===3){let o=e.preOrderCheckHooks;o!==null&&bs(n,o,t)}else{let o=e.preOrderHooks;o!==null&&vs(n,o,0,t)}An(t)}var _o=(function(e){return e[e.None=0]="None",e[e.SignalBased=1]="SignalBased",e[e.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",e})(_o||{});function Cr(e,n,t,r){let i=S(null);try{let[o,a,s]=e.inputs[t],l=null;(a&_o.SignalBased)!==0&&(l=n[o][He]),l!==null&&l.transformFn!==void 0?r=l.transformFn(r):s!==null&&(r=s.call(n,r)),e.setInput!==null?e.setInput(n,l,r,t,o):Bh(n,l,o,r)}finally{S(i)}}function jg(e,n,t,r,i){let o=sn(),a=r&2;try{An(-1),a&&n.length>De&&Vg(e,n,De,!1);let s=a?J.TemplateUpdateStart:J.TemplateCreateStart;oe(s,i,t),t(r,i)}finally{An(o);let s=a?J.TemplateUpdateEnd:J.TemplateCreateEnd;oe(s,i,t)}}function $u(e,n,t){MD(e,n,t),(t.flags&64)===64&&ND(e,n,t)}function Gs(e,n,t=ht){let r=n.localNames;if(r!==null){let i=n.index+1;for(let o=0;o<r.length;o+=2){let a=r[o+1],s=a===-1?t(n,e):e[a];e[i++]=s}}}function CD(e,n,t,r){let o=r.get(mg,fg)||t===At.ShadowDom||t===At.ExperimentalIsolatedShadowDom,a=e.selectRootElement(n,o);return DD(a),a}function DD(e){ED(e)}var ED=()=>null;function xD(e){return e==="class"?"className":e==="for"?"htmlFor":e==="formaction"?"formAction":e==="innerHtml"?"innerHTML":e==="readonly"?"readOnly":e==="tabindex"?"tabIndex":e}function SD(e,n,t,r,i,o){let a=n[I];if(Gu(e,a,n,t,r)){on(e)&&ID(n,e.index);return}e.type&3&&(t=xD(t)),Bg(e,n,t,r,i,o)}function Bg(e,n,t,r,i,o){if(e.type&3){let a=ht(e,n);r=o!=null?o(r,e.value||"",t):r,r=Hg(t,a,r),i.setProperty(a,t,r)}else e.type&12}function Hg(e,n,t,r=!1){return e==="src"&&(n.tagName==="IMG"||n.tagName==="VIDEO")?t==null?r?t:"":kt(t):t}function ID(e,n){let t=gt(n,e);t[N]&16||(t[N]|=64)}function MD(e,n,t){let r=t.directiveStart,i=t.directiveEnd;on(t)&&wD(n,t,e.data[r+t.componentOffset]),e.firstCreatePass||xs(t,n);let o=t.initialInputs;for(let a=r;a<i;a++){let s=e.data[a],l=co(n,e,a,t);if(ci(l,n),o!==null&&kD(n,a-r,l,s,t,o),an(s)){let c=gt(t.index,n);c[Ie]=co(n,e,a,t)}}}function ND(e,n,t){let r=t.directiveStart,i=t.directiveEnd,o=t.index,a=Vp();try{An(o);for(let s=r;s<i;s++){let l=e.data[s],c=n[s];os(s),(l.hostBindings!==null||l.hostVars!==0||l.hostAttrs!==null)&&TD(l,c)}}finally{An(-1),os(a)}}function TD(e,n){e.hostBindings!==null&&e.hostBindings(1,n)}function zg(e,n){let t=e.directiveRegistry,r=null;if(t)for(let i=0;i<t.length;i++){let o=t[i];Mg(n,o.selectors,!1)&&(r??=[],an(o)?r.unshift(o):r.push(o))}return r}function AD(e,n,t,r,i,o){let a=ht(e,n);r=Hg(t,a,r,!0),jC(n[be],a,o,e.value,t,r,i)}function kD(e,n,t,r,i,o){let a=o[n];if(a!==null)for(let s=0;s<a.length;s+=2){let l=a[s],c=a[s+1];Cr(r,t,l,c)}}function Ug(e,n,t,r,i){let o=De+t,a=n[I],s=i(a,n,e,r,t);n[o]=s,ri(e,!0);let l=e.type===2;return l?(Sg(n[be],s,e),(Tp()===0||Ji(e))&&ci(s,n),Ap()):ci(s,n),ds()&&(!l||!Vs(e))&&ju(a,n,s,e),e}function $g(e){let n=e;return _d()?wd():(n=n.parent,ri(n,!1)),n}function RD(e,n){let t=e[nn];if(!t)return;let r;try{r=t.get(kn,null)}catch(i){r=null}r?.(n)}function Gu(e,n,t,r,i){let o=e.inputs?.[r],a=e.hostDirectiveInputs?.[r],s=!1;if(a)for(let l=0;l<a.length;l+=2){let c=a[l],d=a[l+1],u=n.data[c];Cr(u,t[c],d,i),s=!0}if(o)for(let l of o){let c=t[l],d=n.data[l];Cr(d,c,r,i),s=!0}return s}function OD(e,n,t,r,i,o){let a=null,s=null,l=null,c=!1,d=e.directiveToIndex.get(r.type);if(typeof d=="number"?a=d:[a,s,l]=d,s!==null&&l!==null&&e.hostDirectiveInputs&&Object.hasOwn(e.hostDirectiveInputs,i)){let u=e.hostDirectiveInputs[i];for(let p=0;p<u.length;p+=2){let m=u[p];if(m>=s&&m<=l){let h=n.data[m],w=u[p+1];Cr(h,t[m],w,o),c=!0}else if(m>l)break}}return a!==null&&Object.hasOwn(r.inputs,i)&&(Cr(r,t[a],i,o),c=!0),c}function FD(e,n){let t=gt(n,e),r=t[I];PD(r,t);let i=t[Mt];i!==null&&t[sr]===null&&(t[sr]=pg(i,t[nn])),oe(J.ComponentStart);try{Wu(r,t,t[Ie])}finally{oe(J.ComponentEnd,t[Ie])}}function PD(e,n){for(let t=n.length;t<e.blueprint.length;t++)n.push(e.blueprint[t])}function Wu(e,n,t){ss(n);try{let r=e.viewQuery;r!==null&&qd(1,r,t);let i=e.template;i!==null&&jg(e,n,i,1,t),e.firstCreatePass&&(e.firstCreatePass=!1),n[Bt]?.finishViewCreation(e),e.staticContentQueries&&hg(e,n),e.staticViewQueries&&qd(2,e.viewQuery,t);let o=e.components;o!==null&&LD(n,o)}catch(r){throw e.firstCreatePass&&(e.incompleteFirstPass=!0,e.firstCreatePass=!1),r}finally{n[N]&=-5,ls()}}function LD(e,n){for(let t=0;t<n.length;t++)FD(e,n[t])}function wo(e,n,t,r){let i=S(null);try{let o=n.tView,a=zu(e,o,t,16,null,n,null,null,r?.injector??null,r?.embeddedViewInjector??null,r?.dehydratedView??null),s=e[n.index];a[Tn]=s;let l=e[Bt];return l!==null&&(a[Bt]=l.createEmbeddedView(o)),Wu(o,a,t),a}finally{S(i)}}function di(e,n){return!n||n.firstChild===null||ig(e)}function fo(e,n,t,r,i=!1){if(e.type===3){let o=e.firstChild,a=o.next,s=Ze(n[o.index]),l=Ze(n[a.index]),c=s;for(;c!==null&&(r.push(c),c!==l);)c=c.nextSibling;return r}for(;t!==null;){if(t.type===128){t=i?t.projectionNext:t.next;continue}let o=n[t.index];if(o!==null)if(pt(o)){let s=o[dr];s!==o[Mt]&&r.push(Ze(o)),o[N]&4||Gg(o,r),r.push(s)}else r.push(Ze(o));let a=t.type;if(a&8)fo(e,n,t.child,r);else if(a&32){let s=Ou(t,n),l;for(;l=s();)r.push(l)}else if(a&16){let s=Og(n,t);if(Array.isArray(s))r.push(...s);else{let l=en(n[Ye]);fo(l[I],l,s,r,!0)}}t=i?t.projectionNext:t.next}return r}function Gg(e,n){for(let t=Me;t<e.length;t++){let r=e[t],i=r[I].firstChild;i!==null&&fo(r[I],r,i,n)}}function Wg(e){if(e[cr]!==null){for(let n of e[cr])n.impl.addSequence(n);e[cr].length=0}}var qg=[];function VD(e){return e[ct]??jD(e)}function jD(e){let n=qg.pop()??Object.create(HD);return n.lView=e,n}function BD(e){e.lView[ct]!==e&&(e.lView=null,qg.push(e))}var HD=B(C({},qn),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:e=>{mr(e.lView)},consumerOnSignalRead(){this.lView[ct]=this}});function zD(e){let n=e[ct]??Object.create(UD);return n.lView=e,n}var UD=B(C({},qn),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:e=>{let n=en(e.lView);for(;n&&!Yg(n[I]);)n=en(n);n&&ud(n)},consumerOnSignalRead(){this.lView[ct]=this}});function Yg(e){return e.type!==2}function Zg(e){if(e[Jt]===null)return;let n=!0;for(;n;){let t=!1;for(let r of e[Jt])if(r.dirty&&(t=!0,r.zone===null||Zone.current===r.zone?r.run():r.zone.run(()=>r.run()),e[Jt]===null))return;n=t&&!!(e[N]&4096)}}var $D=100;function Xg(e,n=0){let r=e[jt].rendererFactory,i=!1;i||r.begin?.();try{GD(e,n)}finally{i||r.end?.()}}function GD(e,n){let t=Cd();try{Gi(!0),ou(e,n);let r=0;for(;eo(e);){if(r===$D)throw new x(103,!1);r++,ou(e,1)}}finally{Gi(t)}}function WD(e,n,t,r){if(fr(n))return;let i=n[N],o=!1,a=!1;ss(n);let s=!0,l=null,c=null;o||(Yg(e)?(c=VD(n),l=wn(c)):oa()===null?(s=!1,c=zD(n),l=wn(c)):n[ct]&&(Cn(n[ct]),n[ct]=null));try{dd(n),Fp(e.bindingStartIndex),t!==null&&jg(e,n,t,2,r);let d=(i&3)===3;if(!o)if(d){let m=e.preOrderCheckHooks;m!==null&&bs(n,m,null)}else{let m=e.preOrderHooks;m!==null&&vs(n,m,0,null),Ad(n,0)}if(a||qD(n),Zg(n),Qg(n,0),e.contentQueries!==null&&hg(e,n),!o)if(d){let m=e.contentCheckHooks;m!==null&&bs(n,m)}else{let m=e.contentHooks;m!==null&&vs(n,m,1),Ad(n,1)}ZD(e,n);let u=e.components;u!==null&&eb(n,u,0);let p=e.viewQuery;if(p!==null&&qd(2,p,r),!o)if(d){let m=e.viewCheckHooks;m!==null&&bs(n,m)}else{let m=e.viewHooks;m!==null&&vs(n,m,2),Ad(n,2)}if(e.firstUpdatePass===!0&&(e.firstUpdatePass=!1),n[es]){for(let m of n[es])m();n[es]=null}o||(Wg(n),n[N]&=-73)}catch(d){Kg(n,d,o)}finally{c!==null&&(Yn(c,l),s&&BD(c)),ls()}}function Kg(e,n,t){let r=!1,i=n,o=e,a=S(null);try{for(;o!==null;){if(pt(o)){o=o[Te];continue}let s=o[ti];if(s)try{let l=e[Ye][Ie],c=l?.constructor,d={declarationInstance:l,declarationType:c,caughtBy:s},u=S(null);try{s(Kp(i),d)}finally{S(u)}r=!0;break}catch(l){i=l}o=o[Te]}}finally{S(a)}if(!r)throw t||mr(e),i}function Qg(e,n){for(let t=ag(e);t!==null;t=sg(t))for(let r=Me;r<t.length;r++){let i=t[r];Jg(i,n)}}function qD(e){for(let n=ag(e);n!==null;n=sg(n)){if(!(n[N]&2))continue;let t=n[ur];for(let r=0;r<t.length;r++){let i=t[r];ud(i)}}}function YD(e,n,t){oe(J.ComponentStart);let r=gt(n,e);try{Jg(r,t)}finally{oe(J.ComponentEnd,r[Ie])}}function Jg(e,n){ns(e)&&ou(e,n)}function ou(e,n){let r=e[I],i=e[N],o=e[ct],a=!!(n===0&&i&16);if(a||=!!(i&64&&n===0),a||=!!(i&1024),a||=!!(o?.dirty&&Lr(o)),a||=!1,o&&(o.dirty=!1),e[N]&=-5121,a)WD(r,e,r.template,e[Ie]);else if(i&4096){let s=S(null);try{try{Zg(e)}catch(c){Kg(e,c,!1)}Qg(e,1);let l=r.components;l!==null&&eb(e,l,1),Wg(e)}finally{S(s)}}}function eb(e,n,t){for(let r=0;r<n.length;r++)YD(e,n[r],t)}function ZD(e,n){let t=e.hostBindingOpCodes;if(t!==null)try{for(let r=0;r<t.length;r++){let i=t[r];if(i<0)An(~i);else{let o=i,a=t[++r],s=t[++r];Lp(a,o);let l=n[o];oe(J.HostBindingsUpdateStart,l);try{s(2,l)}finally{oe(J.HostBindingsUpdateEnd,l)}}}}finally{An(-1)}}function qu(e,n){let t=Cd()?64:1088;for(e[jt].changeDetectionScheduler?.notify(n);e;){e[N]|=t;let r=en(e);if(ni(e)&&!r)return e;e=r}return null}function tb(e,n,t,r){return[e,!0,0,n,null,r,null,t,null,null]}function nb(e,n){let t=Me+n;if(t<e.length)return e[t]}function Co(e,n,t,r=!0){let i=n[I];if(XD(i,n,e,t),r){let a=iu(t,e),s=n[be],l=s.parentNode(e[dr]);l!==null&&lD(i,e[Ue],s,n,l,a)}let o=n[sr];o!==null&&o.firstChild!==null&&(o.firstChild=null)}function rb(e,n){let t=mo(e,n);return t!==void 0&&Us(t[I],t),t}function mo(e,n){if(e.length<=Me)return;let t=Me+n,r=e[t];if(r){let i=r[Tn];i!==null&&i!==e&&Vu(i,r),n>0&&(e[t-1][mt]=r[mt]);let o=Zi(e,Me+n);sD(r[I],r);let a=o[Bt];a!==null&&a.detachView(o[I]),r[Te]=null,r[mt]=null,r[N]&=-129}return r}function XD(e,n,t,r){let i=Me+r,o=t.length;r>0&&(t[i-1][mt]=n),r<o-Me?(n[mt]=t[i],Xc(t,Me+r,n)):(t.push(n),n[mt]=null),n[Te]=t;let a=n[Tn];a!==null&&t!==a&&ib(a,n);let s=n[Bt];s!==null&&s.insertView(e),rs(n),n[N]|=128}function ib(e,n){let t=e[ur],r=n[Te];if(rn(r))e[N]|=2;else{let i=r[Te][Ye];n[Ye]!==i&&(e[N]|=2)}t===null?e[ur]=[n]:t.push(n)}var On=class{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=!1;exhaustive;get rootNodes(){let n=this._lView,t=n[I];return fo(t,n,t.firstChild,[])}constructor(n,t){this._lView=n,this._cdRefInjectingView=t}get context(){return this._lView[Ie]}set context(n){this._lView[Ie]=n}get destroyed(){return fr(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let n=this._lView[Te];if(pt(n)){let t=n[Qi],r=t?t.indexOf(this):-1;r>-1&&(mo(n,r),Zi(t,r))}this._attachedToViewContainer=!1}Us(this._lView[I],this._lView)}onDestroy(n){is(this._lView,n)}markForCheck(){qu(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[N]&=-129}reattach(){rs(this._lView),this._lView[N]|=128}detectChanges(){this._lView[N]|=1024,Xg(this._lView)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new x(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let n=ni(this._lView),t=this._lView[Tn];t!==null&&!n&&Vu(t,this._lView),Ag(this._lView[I],this._lView)}attachToAppRef(n){if(this._attachedToViewContainer)throw new x(902,!1);this._appRef=n;let t=ni(this._lView),r=this._lView[Tn];r!==null&&!t&&ib(r,this._lView),rs(this._lView)}};var dn=(()=>{class e{_declarationLView;_declarationTContainer;elementRef;static __NG_ELEMENT_ID__=KD;constructor(t,r,i){this._declarationLView=t,this._declarationTContainer=r,this.elementRef=i}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(t,r){return this.createEmbeddedViewImpl(t,r)}createEmbeddedViewImpl(t,r,i){let o=wo(this._declarationLView,this._declarationTContainer,t,{embeddedViewInjector:r,dehydratedView:i});return new On(o)}}return e})();function KD(){return Ws(Xe(),F())}function Ws(e,n){return e.type&4?new dn(n,e,mi(e,n)):null}function hi(e,n,t,r,i){let o=e.data[n];if(o===null)o=QD(e,n,t,r,i),Pp()&&(o.flags|=32);else if(o.type&64){o.type=t,o.value=r,o.attrs=i;let a=kp();o.injectorIndex=a===null?-1:a.injectorIndex}return ri(o,!0),o}function QD(e,n,t,r,i){let o=yd(),a=_d(),s=a?o:o&&o.parent,l=e.data[n]=eE(e,s,t,n,r,i);return JD(e,l,o,a),l}function JD(e,n,t,r){e.firstChild===null&&(e.firstChild=n),t!==null&&(r?t.child==null&&n.parent!==null&&(t.child=n):t.next===null&&(t.next=n,n.prev=t))}function eE(e,n,t,r,i,o){let a=n?n.injectorIndex:-1,s=0;return gd()&&(s|=128),{type:t,index:r,insertBeforeIndex:null,injectorIndex:a,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,controlDirectiveIndex:-1,customControlIndex:-1,propertyBindings:null,flags:s,providerIndexes:0,value:i,namespace:Sd(),attrs:o,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:n,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}function tE(e){let n=e[id]??[],r=e[Te][be],i=[];for(let o of n)o.data[ug]!==void 0?i.push(o):nE(o,r);e[id]=i}function nE(e,n){let t=0,r=e.firstChild;if(r){let i=e.data[dg];for(;t<i;){let o=ng(r);xg(n,r,!1),r=o,t++}}}var rE=()=>null,iE=()=>null;function Is(e,n){return rE(e,n)}function ob(e,n,t){return iE(e,n,t)}var ab=class{},Ve=class{},ze=class{destroyNode=null;static __NG_ELEMENT_ID__=()=>oE()};function oE(){let e=F(),n=Xe(),t=gt(n.index,e);return(rn(t)?t:e)[be]}var sb=(()=>{class e{static \u0275prov=V({token:e,providedIn:"root",factory:()=>null})}return e})();function lb(e){return e.debugInfo?.className||e.type.name||null}var _s={},Ms=class{injector;parentInjector;constructor(n,t){this.injector=n,this.parentInjector=t}get(n,t,r){let i=this.injector.get(n,_s,r);return i!==_s||t===_s?i:this.parentInjector.get(n,t,r)}};function aE(e,n,t){return e[n]=t}function fn(e,n,t){if(t===vt)return!1;let r=e[n];return Object.is(r,t)?!1:(e[n]=t,!0)}function so(e,n,t){return function r(i){let o=r.__ngNativeEl__;o!==void 0&&yC(i,o);let a=on(e)?gt(e.index,n):n;qu(a,5);let s=n[Ie],l=wh(n,s,t,i),c=r.__ngNextListenerFn__;for(;c;)l=wh(n,s,c,i)&&l,c=c.__ngNextListenerFn__;return l}}function wh(e,n,t,r){let i=S(null);try{return oe(J.OutputStart,n,t),t(r)!==!1}catch(o){return RD(e,o),!1}finally{oe(J.OutputEnd,n,t),S(i)}}function sE(e,n,t,r,i,o,a,s){let l=Ji(e),c=!1,d=null;if(!r&&l&&(d=cE(n,t,o,e.index)),d!==null){let u=d.__ngLastListenerFn__||d;u.__ngNextListenerFn__=a,d.__ngLastListenerFn__=a,c=!0}else{let u=ht(e,t),p=r?r(u):u;wC(t,p,o,s),r||(s.__ngNativeEl__=u);let m=i.listen(p,o,s);if(!lE(o)){let h=r?w=>r(Ze(w[e.index])):e.index;cb(h,n,t,o,s,m,!1)}}return c}function lE(e){return e.startsWith("animation")||e.startsWith("transition")}function cE(e,n,t,r){let i=e.cleanup;if(i!=null)for(let o=0;o<i.length-1;o+=2){let a=i[o];if(a===t&&i[o+1]===r){let s=n[Jr],l=i[o+2];return s&&s.length>l?s[l]:null}typeof a=="string"&&(o+=2)}return null}function cb(e,n,t,r,i,o,a){let s=n.firstCreatePass?md(n):null,l=fd(t),c=l.length;l.push(i,o),s&&s.push(r,e,c,(c+1)*(a?-1:1))}function Ch(e,n,t,r,i){let o=null,a=null,s=null,l=!1,c=e.directiveToIndex.get(t.type);if(typeof c=="number"?o=c:[o,a,s]=c,a!==null&&s!==null&&e.hostDirectiveOutputs&&Object.hasOwn(e.hostDirectiveOutputs,r)){let d=e.hostDirectiveOutputs[r];for(let u=0;u<d.length;u+=2){let p=d[u];if(p>=a&&p<=s)l=!0,Ns(e,n,p,d[u+1],r,i);else if(p>s)break}}return Object.hasOwn(t.outputs,r)&&(l=!0,Ns(e,n,o,r,r,i)),l}function Ns(e,n,t,r,i,o){let a=n[t],s=n[I],c=s.data[t].outputs[r],u=a[c].subscribe(o);cb(e.index,s,n,i,o,u,!0)}function ve(){dE()}function dE(){let e=F(),n=Ee(),t=Xe();if(n.firstCreatePass&&fE(n,t),t.controlDirectiveIndex===-1)return;Fn("NgSignalForms");let r=e[t.controlDirectiveIndex];n.data[t.controlDirectiveIndex].controlDef.create(r,new Ts(e,n,t))}function ye(){uE()}function uE(){let e=F(),n=Ee(),t=no();if(t.controlDirectiveIndex===-1)return;let r=n.data[t.controlDirectiveIndex].controlDef,i=e[t.controlDirectiveIndex];r.update(i,new Ts(e,n,t))}var Ts=class{lView;tView;tNode;hasPassThrough;constructor(n,t,r){this.lView=n,this.tView=t,this.tNode=r,this.hasPassThrough=!!(r.flags&4096)}get customControl(){return this.tNode.customControlIndex!==-1?this.lView[this.tNode.customControlIndex]:void 0}get nativeElement(){return ht(this.tNode,this.lView)}get descriptor(){return`<${this.tNode.value}>`}listenToCustomControlOutput(n,t){let r=this.tView.data[this.tNode.customControlIndex];Ch(this.tNode,this.lView,r,n,so(this.tNode,this.lView,t))}listenToCustomControlModel(n){let t=this.tNode.flags&1024?"valueChange":"checkedChange",r=this.tView.data[this.tNode.customControlIndex];Ch(this.tNode,this.lView,r,t,so(this.tNode,this.lView,n))}setInputOnDirectives(n,t,r){let i=this.tNode.inputs?.[n],o=this.tNode.hostDirectiveInputs?.[n];if(!i&&!o)return!1;let a=!1;if(i)for(let s of i){if(s===this.tNode.controlDirectiveIndex)continue;let l=this.lView[s],c=this.tView.data[s];(!r||r(Eh(l,c,n),l))&&(Cr(c,l,n,t),a=!0)}if(o)for(let s=0;s<o.length;s+=2){let l=o[s];if(l===this.tNode.controlDirectiveIndex)continue;let c=this.lView[l],d=o[s+1],u=this.tView.data[l];(!r||r(Eh(c,u,n),c))&&(Cr(u,c,d,t),a=!0)}return a}setCustomControlModelInput(n){let t=this.tView.data[this.tNode.customControlIndex],r=this.tNode.flags&1024?"value":"checked";OD(this.tNode,this.tView,this.lView,t,r,n)}customControlHasInput(n){if(this.tNode.customControlIndex===-1)return!1;let t=this.tView.data[this.tNode.customControlIndex];return(t.signalFormsInputPresence??=this._buildCustomControlInputCache(t))[n]===!0}_buildCustomControlInputCache(n){let t={};for(let r in n.inputs)t[r]=!0;if(n.hostDirectives!==null){let r=[...n.hostDirectives];for(;r.length>0;){let i=r.shift();if(typeof i!="function"){for(let a in i.inputs)t[i.inputs[a]]=!0;let o=Dh(i.directive);o!==null&&r.push(...o);continue}for(let o of i()){if(typeof o=="function")continue;if(o.inputs)for(let s=0;s<o.inputs.length;s+=2){let l=o.inputs[s+1]||o.inputs[s];t[l]=!0}let a=Dh(o.directive);a!==null&&r.push(...a)}}}return t}};function Dh(e){return typeof e=="function"&&"\u0275dir"in e?e.\u0275dir.hostDirectives??null:null}function Eh(e,n,t){if(!n.inputs||!Object.hasOwn(n.inputs,t))return;let[r,i]=n.inputs[t];if((i&_o.SignalBased)!==0){let a=e[r][He];return a.value===Ls?void 0:a.value}return e[r]}function fE(e,n,t){for(let i=n.directiveStart;i<n.directiveEnd;i++)if(e.data[i].controlDef){n.controlDirectiveIndex=i;break}if(n.controlDirectiveIndex===-1)return;let r=e.data[n.controlDirectiveIndex].controlDef;if(r.passThroughInput&&(n.inputs?.[r.passThroughInput]?.length??0)>1){n.flags|=4096;return}mE(e,n)}function mE(e,n){for(let t=n.directiveStart;t<n.directiveEnd;t++){let r=e.data[t];if(!(n.directiveToIndex&&!n.directiveToIndex.has(r.type))){if(xh(r,"value")){n.flags|=1024,n.customControlIndex=t;return}if(xh(r,"checked")){n.flags|=2048,n.customControlIndex=t;return}}}if(n.hostDirectiveInputs!==null&&n.hostDirectiveOutputs!==null&&n.directiveToIndex!==null){let t=(r,i)=>{let o=n.hostDirectiveInputs[r],a=n.hostDirectiveOutputs[r+"Change"];if(!o||!a)return!1;for(let s=0;s<o.length;s+=2){let l=o[s];for(let c=0;c<a.length;c+=2){let d=a[c];if(l===d)for(let u of n.directiveToIndex.values()){if(!Array.isArray(u))continue;let[p,m,h]=u;if(l>=m&&l<=h)return n.flags|=i,n.customControlIndex=p,!0}}}return!1};if(t("value",1024)||t("checked",2048))return}}function xh(e,n){return pE(e,n)&&hE(e,n+"Change")}function pE(e,n){return n in e.inputs}function hE(e,n){return n in e.outputs}var au=Symbol("BINDING");var Ir=new y("");function As(e,n,t){let r=t?e.styles:null,i=t?e.classes:null,o=0;if(n!==null)for(let a=0;a<n.length;a++){let s=n[a];if(typeof s=="number")o=s;else if(o==1)i=Wa(i,s);else if(o==2){let l=s,c=n[++a];r=Wa(r,l+": "+c+";")}}t?e.styles=r:e.stylesWithoutHost=r,t?e.classes=i:e.classesWithoutHost=i}function le(e,n=0){let t=F();if(t===null)return M(e,n);let r=Xe();return Qh(r,t,We(e),n)}function db(e,n,t,r,i){let o=r===null?null:{"":-1},a=i(e,t);if(a!==null){let s=a,l=null,c=null;for(let d of a)if(d.resolveHostDirectives!==null){[s,l,c]=d.resolveHostDirectives(a);break}vE(e,n,t,s,o,l,c)}o!==null&&r!==null&&gE(t,r,o)}function gE(e,n,t){let r=e.localNames=[];for(let i=0;i<n.length;i+=2){let o=t[n[i+1]];if(o==null)throw new x(-301,!1);r.push(n[i],o)}}function bE(e,n,t){n.componentOffset=t,(e.components??=[]).push(n.index)}function vE(e,n,t,r,i,o,a){let s=r.length,l=null;for(let p=0;p<s;p++){let m=r[p];l===null&&an(m)&&(l=m,bE(e,t,p)),Ud(xs(t,n),e,m.type)}EE(t,e.data.length,s),l?.viewProvidersResolver&&l.viewProvidersResolver(l);for(let p=0;p<s;p++){let m=r[p];m.providersResolver&&m.providersResolver(m)}let c=!1,d=!1,u=Lg(e,n,s,null);s>0&&(t.directiveToIndex=new Map);for(let p=0;p<s;p++){let m=r[p];if(t.mergedAttrs=li(t.mergedAttrs,m.hostAttrs),_E(e,t,n,u,m),DE(u,m,i),a!==null&&a.has(m)){let[w,E]=a.get(m);t.directiveToIndex.set(m.type,[u,w+t.directiveStart,E+t.directiveStart])}else(o===null||!o.has(m))&&t.directiveToIndex.set(m.type,u);m.contentQueries!==null&&(t.flags|=4),(m.hostBindings!==null||m.hostAttrs!==null||m.hostVars!==0)&&(t.flags|=64);let h=m.type.prototype;!c&&(h.ngOnChanges||h.ngOnInit||h.ngDoCheck)&&((e.preOrderHooks??=[]).push(t.index),c=!0),!d&&(h.ngOnChanges||h.ngDoCheck)&&((e.preOrderCheckHooks??=[]).push(t.index),d=!0),u++}yE(e,t,o)}function yE(e,n,t){for(let r=n.directiveStart;r<n.directiveEnd;r++){let i=e.data[r];if(t===null||!t.has(i))Sh(0,n,i,r),Sh(1,n,i,r),Mh(n,r,!1);else{let o=t.get(i);Ih(0,n,o,r),Ih(1,n,o,r),Mh(n,r,!0)}}}function Sh(e,n,t,r){let i=e===0?t.inputs:t.outputs;for(let o in i)if(Object.hasOwn(i,o)){let a;e===0?(a=n.inputs??={},ub(n,o)):a=n.outputs??={},a[o]??=[],a[o].push(r)}}function Ih(e,n,t,r){let i=e===0?t.inputs:t.outputs;for(let o in i)if(Object.hasOwn(i,o)){let a=i[o],s;e===0?(s=n.hostDirectiveInputs??={},ub(n,a)):s=n.hostDirectiveOutputs??={},s[a]??=[],s[a].push(r,o)}}function ub(e,n){n==="class"?e.flags|=8:n==="style"&&(e.flags|=16)}function Mh(e,n,t){let{attrs:r,inputs:i,hostDirectiveInputs:o}=e;if(r===null||!t&&i===null||t&&o===null||Ru(e)){e.initialInputs??=[],e.initialInputs.push(null);return}let a=null,s=0;for(;s<r.length;){let l=r[s];if(l===0){s+=4;continue}else if(l===5){s+=2;continue}else if(typeof l=="number")break;if(!t&&Object.hasOwn(i,l)){let c=i[l];for(let d of c)if(d===n){a??=[],a.push(l,r[s+1]);break}}else if(t&&Object.hasOwn(o,l)){let c=o[l];for(let d=0;d<c.length;d+=2)if(c[d]===n){a??=[],a.push(c[d+1],r[s+1]);break}}s+=2}e.initialInputs??=[],e.initialInputs.push(a)}function _E(e,n,t,r,i){e.data[r]=i;let o=i.factory||(i.factory=Sn(i.type,!0)),a=new wr(o,an(i),le,null);e.blueprint[r]=a,t[r]=a,wE(e,n,r,Lg(e,t,i.hostVars,vt),i)}function wE(e,n,t,r,i){let o=i.hostBindings;if(o){let a=e.hostBindingOpCodes;a===null&&(a=e.hostBindingOpCodes=[]);let s=~n.index;CE(a)!=s&&a.push(s),a.push(t,r,o)}}function CE(e){let n=e.length;for(;n>0;){let t=e[--n];if(typeof t=="number"&&t<0)return t}return 0}function DE(e,n,t){if(t){if(n.exportAs)for(let r=0;r<n.exportAs.length;r++)t[n.exportAs[r]]=e;an(n)&&(t[""]=e)}}function EE(e,n,t){e.flags|=1,e.directiveStart=n,e.directiveEnd=n+t,e.providerIndexes=n}function fb(e,n,t,r,i,o,a,s){let l=n[I],c=l.consts,d=bt(c,a),u=hi(l,e,t,r,d);return o&&db(l,n,u,bt(c,s),i),u.mergedAttrs=li(u.mergedAttrs,u.attrs),u.attrs!==null&&As(u,u.attrs,!1),u.mergedAttrs!==null&&As(u,u.mergedAttrs,!0),l.queries!==null&&l.queries.elementStart(l,u),u}function mb(e,n){Uh(e,n),od(n)&&e.queries.elementEnd(n)}function xE(e,n,t,r,i,o){let a=n.consts,s=bt(a,i),l=hi(n,e,t,r,s);if(l.mergedAttrs=li(l.mergedAttrs,l.attrs),o!=null){let c=bt(a,o);l.localNames=[];for(let d=0;d<c.length;d+=2)l.localNames.push(c[d],-1)}return l.attrs!==null&&As(l,l.attrs,!1),l.mergedAttrs!==null&&As(l,l.mergedAttrs,!0),n.queries!==null&&n.queries.elementStart(n,l),l}var Yu="en-US";function SE(){return typeof $localize<"u"&&$localize.locale||Yu}var gi=new y("",{factory:()=>f(gi,{optional:!0,skipSelf:!0})||SE()});var pb=typeof ShadowRoot<"u",IE=typeof Document<"u";function ME(e){return Object.keys(e).map(n=>{let[t,r,i]=e[n],o={propName:t,templateName:n,isSignal:(r&_o.SignalBased)!==0};return i&&(o.transform=i),o})}function NE(e){return Object.keys(e).map(n=>({propName:e[n],templateName:n}))}function TE(e,n,t){let r=n instanceof Pe?n:n?.injector;return r&&e.getStandaloneInjector!==null&&(r=e.getStandaloneInjector(r)||r),r?new Ms(t,r):t}function AE(e){let n=e.get(Ve,null);if(n===null)throw new x(407,!1);let t=e.get(sb,null),r=e.get(Vt,null),i=e.get(Rt,null,{optional:!0});return{rendererFactory:n,sanitizer:t,changeDetectionScheduler:r,ngReflect:!1,tracingService:i,locale:e.get(gi,Yu)}}function kE(e,n,t){let r=hb(e);return Dg(n,r,r==="svg"?ad:r==="math"?Ep:t)}function RE(e){if((e&&"localName"in e&&typeof e.localName=="string"?e.localName:e?.tagName)?.toLowerCase()==="script")throw new x(905,!1)}function hb(e){return(e.selectors[0][0]||"div").toLowerCase()}var ui=class{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=ME(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=NE(this.componentDef.outputs),this.cachedOutputs}constructor(n,t){this.componentDef=n,this.ngModule=t,this.componentType=n.type,this.selector=QC(n.selectors),this.ngContentSelectors=n.ngContentSelectors??[],this.isBoundToModule=!!t}create(n,t,r,i,o,a,s,l){oe(J.DynamicComponentStart);let c=S(null);try{let d=this.componentDef,u=TE(d,i||this.ngModule,n),p=AE(u),m=p.tracingService;return m&&m.componentCreate?m.componentCreate(lb(d),()=>this.createComponentRef(p,u,t,r,o,a,s,l)):this.createComponentRef(p,u,t,r,o,a,s,l)}finally{S(c)}}createComponentRef(n,t,r,i,o,a,s,l){let c=this.componentDef,d=OE(i,c,a,o,l),u=n.rendererFactory.createRenderer(null,c),p=i?CD(u,i,c.encapsulation,t):kE(c,u,s??null);RE(p);let m=t.get(Ir,null),h=FE(p,()=>t.get(j,null)??cg());m&&m.addHost(h);let w=a?.some(Nh)||o?.some(U=>typeof U!="function"&&U.bindings.some(Nh)),E=zu(null,d,null,512|Pg(c),null,null,n,u,t,null,pg(p,t,!0));m&&pb&&h instanceof ShadowRoot&&is(E,()=>{m.removeHost(h)}),E[De]=p,ss(E);let R=null;try{let U=fb(De,E,2,"#host",()=>d.directiveRegistry,!0,0);Sg(u,p,U),ci(p,E),$u(d,E,U),gg(d,U,E),mb(d,U),r!==void 0&&LE(U,this.ngContentSelectors,r),R=gt(U.index,E),E[Ie]=R[Ie],Wu(d,E,null)}catch(U){throw R!==null&&Gd(R),Gd(E),U}finally{oe(J.DynamicComponentEnd),ls()}return new ks(this.componentType,E,!!w)}};function OE(e,n,t,r,i){let o=e?["ng-version","22.3.0"]:JC(n.selectors[0]),a=null,s=null,l=0;if(t)for(let u of t)l+=u[au].requiredVars,u.create&&(u.targetIdx=0,(a??=[]).push(u)),u.update&&(u.targetIdx=0,(s??=[]).push(u));if(r)for(let u=0;u<r.length;u++){let p=r[u];if(typeof p!="function")for(let m of p.bindings){l+=m[au].requiredVars;let h=u+1;m.create&&(m.targetIdx=h,(a??=[]).push(m)),m.update&&(m.targetIdx=h,(s??=[]).push(m))}}let c=[n];if(r)for(let u of r){let p=typeof u=="function"?u:u.type,m=Za(p);c.push(m)}return Hu(0,null,PE(a,s),1,l,c,null,null,null,[o],null)}function FE(e,n){let t=e.getRootNode?.();return IE&&t instanceof Document?t.head:t&&pb&&t instanceof ShadowRoot?t:n().head}function PE(e,n){return!e&&!n?null:t=>{if(t&1&&e)for(let r of e)r.create();if(t&2&&n)for(let r of n)r.update()}}function Nh(e){let n=e[au].kind;return n==="input"||n==="twoWay"}var ks=class extends ab{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(n,t,r){super(),this._rootLView=t,this._hasInputBindings=r,this._tNode=ts(t[I],De),this.location=mi(this._tNode,t),this.instance=gt(this._tNode.index,t)[Ie],this.hostView=this.changeDetectorRef=new On(t,void 0),this.componentType=n}setInput(n,t){this._hasInputBindings;let r=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(n)&&Object.is(this.previousInputValues.get(n),t))return;let i=this._rootLView,o=Gu(r,i[I],i,n,t);this.previousInputValues.set(n,t);let a=gt(r.index,i);qu(a,1)}get injector(){return new ln(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(n){this.hostView.onDestroy(n)}};function LE(e,n,t){let r=e.projection=[];for(let i=0;i<n.length;i++){let o=t[i];r.push(o!=null&&o.length?Array.from(o):null)}}var mn=(()=>{class e{static __NG_ELEMENT_ID__=VE}return e})();function VE(){let e=Xe();return gb(e,F())}var su=class e extends mn{_lContainer;_hostTNode;_hostLView;constructor(n,t,r){super(),this._lContainer=n,this._hostTNode=t,this._hostLView=r}get element(){return mi(this._hostTNode,this._hostLView)}get injector(){return new ln(this._hostTNode,this._hostLView)}get parentInjector(){let n=Du(this._hostTNode,this._hostLView);if(Wh(n)){let t=Ds(n,this._hostLView),r=Cs(n),i=t[I].data[r+8];return new ln(i,t)}else return new ln(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(n){let t=Th(this._lContainer);return t!==null&&t[n]||null}get length(){return this._lContainer.length-Me}createEmbeddedView(n,t,r){let i,o,a;typeof r=="number"?i=r:r!=null&&(i=r.index,o=r.injector,a=r.onError);let s=Is(this._lContainer,n.ssrId),l=n.createEmbeddedViewImpl(t||{},o,s);return a&&(l._lView[ti]=a),this.insertImpl(l,i,di(this._hostTNode,s)),l}createComponent(n,t,r,i,o,a,s){let l,c,d=t||{};l=d.index,r=d.injector,i=d.projectableNodes,o=d.environmentInjector||d.ngModuleRef,a=d.directives,s=d.bindings,c=d.onError;let u=new ui(In(n)),p=r||this.parentInjector;if(!o&&u.ngModule==null){let U=this.parentInjector.get(Pe,null);U&&(o=U)}let m=In(u.componentType??{}),h=Is(this._lContainer,m?.id??null),w=h?.firstChild??null,E=u.create(p,i,w,o,a,s,this._getHostElementNamespace());return c&&(E.hostView._lView[ti]=c),this.insertImpl(E.hostView,l,di(this._hostTNode,h)),E}_getHostElementNamespace(){if(this._hostTNode.type&2){let n=this._hostTNode.parent??this._hostLView[Ue];return n!==null&&n.type&2&&typeof n.value=="string"&&n.value.toLowerCase()==="foreignobject"?null:n?.namespace??null}return this._hostTNode.namespace}insert(n,t){return this.insertImpl(n,t,!0)}insertImpl(n,t,r){let i=n._lView;if(Sp(i)){let s=this.indexOf(n);if(s!==-1)this.detach(s);else{let l=i[Te],c=new e(l,l[Ue],l[Te]);c.detach(c.indexOf(n))}}let o=this._adjustIndex(t),a=this._lContainer;return Co(a,i,o,r),n.attachToViewContainerRef(),Xc(Od(a),o,n),n}move(n,t){return this.insert(n,t)}indexOf(n){let t=Th(this._lContainer);return t!==null?t.indexOf(n):-1}remove(n){let t=this._adjustIndex(n,-1),r=mo(this._lContainer,t);r&&(Zi(Od(this._lContainer),t),Us(r[I],r))}detach(n){let t=this._adjustIndex(n,-1),r=mo(this._lContainer,t);return r&&Zi(Od(this._lContainer),t)!=null?new On(r):null}_adjustIndex(n,t=0){return n??this.length+t}};function Th(e){return e[Qi]}function Od(e){return e[Qi]||(e[Qi]=[])}function gb(e,n){let t,r=n[e.index];return pt(r)?t=r:(t=tb(r,n,null,e),n[e.index]=t,Uu(n,t)),BE(t,n,e,r),new su(t,e,n)}function jE(e,n){let t=e[be],r=t.createComment(""),i=ht(n,e),o=t.parentNode(i);return _r(t,o,r,t.nextSibling(i),!1),r}var BE=UE,HE=()=>!1;function zE(e,n,t){return HE(e,n,t)}function UE(e,n,t,r){if(e[dr])return;let i;t.type&8?i=Ze(r):i=jE(n,t),e[dr]=i}var lu=class e{queryList;matches=null;constructor(n){this.queryList=n}clone(){return new e(this.queryList)}setDirty(){this.queryList.setDirty()}},cu=class e{queries;constructor(n=[]){this.queries=n}createEmbeddedView(n){let t=n.queries;if(t!==null){let r=n.contentQueries!==null?n.contentQueries[0]:t.length,i=[];for(let o=0;o<r;o++){let a=t.getByIndex(o),s=this.queries[a.indexInDeclarationView];i.push(s.clone())}return new e(i)}return null}insertView(n){this.dirtyQueriesWithMatches(n)}detachView(n){this.dirtyQueriesWithMatches(n)}finishViewCreation(n){this.dirtyQueriesWithMatches(n)}dirtyQueriesWithMatches(n){for(let t=0;t<this.queries.length;t++)Xu(n,t).matches!==null&&this.queries[t].setDirty()}},Rs=class{flags;read;predicate;constructor(n,t,r=null){this.flags=t,this.read=r,typeof n=="string"?this.predicate=YE(n):this.predicate=n}},du=class e{queries;constructor(n=[]){this.queries=n}elementStart(n,t){for(let r=0;r<this.queries.length;r++)this.queries[r].elementStart(n,t)}elementEnd(n){for(let t=0;t<this.queries.length;t++)this.queries[t].elementEnd(n)}embeddedTView(n){let t=null;for(let r=0;r<this.length;r++){let i=t!==null?t.length:0,o=this.getByIndex(r).embeddedTView(n,i);o&&(o.indexInDeclarationView=r,t!==null?t.push(o):t=[o])}return t!==null?new e(t):null}template(n,t){for(let r=0;r<this.queries.length;r++)this.queries[r].template(n,t)}getByIndex(n){return this.queries[n]}get length(){return this.queries.length}track(n){this.queries.push(n)}},uu=class e{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=!1;_declarationNodeIndex;_appliesToNextNode=!0;constructor(n,t=-1){this.metadata=n,this._declarationNodeIndex=t}elementStart(n,t){this.isApplyingToNode(t)&&this.matchTNode(n,t)}elementEnd(n){this._declarationNodeIndex===n.index&&(this._appliesToNextNode=!1)}template(n,t){this.elementStart(n,t)}embeddedTView(n,t){return this.isApplyingToNode(n)?(this.crossesNgTemplate=!0,this.addMatch(-n.index,t),new e(this.metadata)):null}isApplyingToNode(n){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let t=this._declarationNodeIndex,r=n.parent;for(;r!==null&&r.type&8&&r.index!==t;)r=r.parent;return t===(r!==null?r.index:-1)}return this._appliesToNextNode}matchTNode(n,t){let r=this.metadata.predicate;if(Array.isArray(r))for(let i=0;i<r.length;i++){let o=r[i];this.matchTNodeWithReadOption(n,t,$E(t,o)),this.matchTNodeWithReadOption(n,t,ys(t,n,o,!1,!1))}else r===dn?t.type&4&&this.matchTNodeWithReadOption(n,t,-1):this.matchTNodeWithReadOption(n,t,ys(t,n,r,!1,!1))}matchTNodeWithReadOption(n,t,r){if(r!==null){let i=this.metadata.read;if(i!==null)if(i===Z||i===mn||i===Q||i===dn&&t.type&4)this.addMatch(t.index,-2);else{let o=ys(t,n,i,!1,!1);o!==null&&this.addMatch(t.index,o)}else this.addMatch(t.index,r)}}addMatch(n,t){this.matches===null?this.matches=[n,t]:this.matches.push(n,t)}};function $E(e,n){let t=e.localNames;if(t!==null){for(let r=0;r<t.length;r+=2)if(t[r]===n)return t[r+1]}return null}function GE(e,n){return e.type&11?mi(e,n):e.type&4?Ws(e,n):null}function WE(e,n,t,r){return t===-1?GE(n,e):t===-2?qE(e,n,r):co(e,e[I],t,n)}function qE(e,n,t){if(t===Z)return mi(n,e);if(t===dn)return Ws(n,e);if(t===mn)return gb(n,e);if(t===Q)return new ln(n,e)}function bb(e,n,t,r){let i=n[Bt].queries[r];if(i.matches===null){let o=e.data,a=t.matches,s=[];for(let l=0;a!==null&&l<a.length;l+=2){let c=a[l];if(c<0)s.push(null);else{let d=o[c];s.push(WE(n,d,a[l+1],t.metadata.read))}}i.matches=s}return i.matches}function fu(e,n,t,r){let i=e.queries.getByIndex(t),o=i.matches;if(o!==null){let a=bb(e,n,i,t);for(let s=0;s<o.length;s+=2){let l=o[s];if(l>0)r.push(a[s/2]);else{let c=o[s+1],d=n[-l];for(let u=Me;u<d.length;u++){let p=d[u];p[Tn]===p[Te]&&fu(p[I],p,c,r)}if(d[ur]!==null){let u=d[ur];for(let p=0;p<u.length;p++){let m=u[p];fu(m[I],m,c,r)}}}}}return r}function Zu(e,n){return e[Bt].queries[n].queryList}function vb(e,n,t){let r=new Ss((t&4)===4);return Np(e,n,r,r.destroy),(n[Bt]??=new cu).queries.push(new lu(r))-1}function yb(e,n,t){let r=Ee();return r.firstCreatePass&&(wb(r,new Rs(e,n,t),-1),(n&2)===2&&(r.staticViewQueries=!0)),vb(r,F(),n)}function _b(e,n,t,r){let i=Ee();if(i.firstCreatePass){let o=Xe();wb(i,new Rs(n,t,r),o.index),ZE(i,e),(t&2)===2&&(i.staticContentQueries=!0)}return vb(i,F(),t)}function YE(e){return e.split(",").map(n=>n.trim())}function wb(e,n,t){e.queries===null&&(e.queries=new du),e.queries.track(new uu(n,t))}function ZE(e,n){let t=e.contentQueries||(e.contentQueries=[]),r=t.length?t[t.length-1]:-1;n!==r&&t.push(e.queries.length-1,n)}function Xu(e,n){return e.queries.getByIndex(n)}function Cb(e,n){let t=e[I],r=Xu(t,n);return r.crossesNgTemplate?fu(t,e,n,[]):bb(t,e,r,n)}function Db(e,n,t){let r,i=Fi(()=>{r._dirtyCounter();let o=XE(r,e);if(n&&o===void 0)throw new x(-951,!1);return o});return r=i[He],r._dirtyCounter=te(0),r._flatValue=void 0,i}function Ku(e){return Db(!0,!1,e)}function Qu(e){return Db(!0,!0,e)}function Eb(e,n){let t=e[He];t._lView=F(),t._queryIndex=n,t._queryList=Zu(t._lView,n),t._queryList.onDirty(()=>t._dirtyCounter.update(r=>r+1))}function XE(e,n){let t=e._lView,r=e._queryIndex;if(t===void 0||r===void 0||t[N]&4)return n?void 0:Je;let i=Zu(t,r),o=Cb(t,r);return i.reset(o,tg),n?i.first:i._changesDetected||e._flatValue===void 0?e._flatValue=i.toArray():e._flatValue}function Mr(e){return!!e&&typeof e.then=="function"}function Ju(e){return!!e&&typeof e.subscribe=="function"}var Dr=class{};var po=class extends Dr{injector;instance=null;constructor(n){super();let t=new or([...n.providers,{provide:Dr,useValue:this}],n.parent||Kr(),n.debugName,new Set(["environment"]));this.injector=t,n.runEnvironmentInitializers&&t.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(n){this.injector.onDestroy(n)}};function xb(e,n,t=null){return new po({providers:e,parent:n,debugName:t,runEnvironmentInitializers:!0}).injector}var KE=(()=>{class e{_injector;cachedInjectors=new Map;constructor(t){this._injector=t}getOrCreateStandaloneInjector(t){if(!t.standalone)return null;if(!this.cachedInjectors.has(t)){let r=Jc(!1,t.type),i=r.length>0?xb([r],this._injector,""):null;this.cachedInjectors.set(t,i)}return this.cachedInjectors.get(t)}ngOnDestroy(){try{for(let t of this.cachedInjectors.values())t!==null&&t.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=V({token:e,providedIn:"environment",factory:()=>new e(M(Pe))})}return e})();function X(e){return vo(()=>{let n=Sb(e),t=B(C({},n),{decls:e.decls,vars:e.vars,template:e.template,consts:e.consts||null,ngContentSelectors:e.ngContentSelectors,onPush:e.changeDetection!==xu.Eager,directiveDefs:null,pipeDefs:null,dependencies:n.standalone&&e.dependencies||null,getStandaloneInjector:n.standalone?i=>i.get(KE).getOrCreateStandaloneInjector(t):null,getExternalStyles:null,data:e.data||{},encapsulation:e.encapsulation||At.Emulated,styles:e.styles||Je,_:null,schemas:e.schemas||null,tView:null,id:""});n.standalone&&Fn("NgStandalone"),Ib(t);let r=e.dependencies;return t.directiveDefs=Ah(r,QE),t.pipeDefs=Ah(r,cp),t.id=tx(t),t})}function QE(e){return In(e)||Za(e)}function ee(e){return vo(()=>({type:e.type,bootstrap:e.bootstrap||Je,declarations:e.declarations||Je,imports:e.imports||Je,exports:e.exports||Je,transitiveCompileScopes:null,schemas:e.schemas||null,id:e.id||null}))}function JE(e,n){if(e==null)return Mn;let t={};for(let r in e)if(Object.hasOwn(e,r)){let i=e[r],o,a,s,l;Array.isArray(i)?(s=i[0],o=i[1],a=i[2]??o,l=i[3]||null):(o=i,a=i,s=_o.None,l=null),t[o]=[r,s,l],n[o]=a}return t}function ex(e){if(e==null)return Mn;let n={};for(let t in e)Object.hasOwn(e,t)&&(n[e[t]]=t);return n}function q(e){return vo(()=>{let n=Sb(e);return Ib(n),n})}function ef(e){return{type:e.type,name:e.name,factory:null,pure:e.pure!==!1,standalone:e.standalone??!0,onDestroy:e.type.prototype.ngOnDestroy||null}}function Sb(e){let n={};return{type:e.type,providersResolver:null,viewProvidersResolver:null,factory:null,hostBindings:e.hostBindings||null,hostVars:e.hostVars||0,hostAttrs:e.hostAttrs||null,contentQueries:e.contentQueries||null,declaredInputs:n,inputConfig:e.inputs||Mn,exportAs:e.exportAs||null,standalone:e.standalone??!0,selectors:e.selectors||Je,viewQuery:e.viewQuery||null,features:e.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,controlDef:null,signalFormsInputPresence:null,inputs:JE(e.inputs,n),outputs:ex(e.outputs),debugInfo:null}}function Ib(e){e.features?.forEach(n=>n(e))}function Ah(e,n){return e?()=>{let t=typeof e=="function"?e():e,r=[];for(let i of t){let o=n(i);o!==null&&r.push(o)}return r}:null}function tx(e){let n=0,t=typeof e.consts=="function"?"":e.consts,r=[e.selectors,e.ngContentSelectors,e.hostVars,e.hostAttrs,t,e.vars,e.decls,e.encapsulation,e.standalone,e.exportAs,JSON.stringify(e.inputs),JSON.stringify(e.outputs),Object.getOwnPropertyNames(e.type.prototype),!!e.contentQueries,!!e.viewQuery];for(let o of r.join("|"))n=Math.imul(31,n)+o.charCodeAt(0)<<0;return n+=2147483648,"c"+n}var Mb=new y("");var tf=(()=>{class e{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((t,r)=>{this.resolve=t,this.reject=r});appInits=f(Mb,{optional:!0})??[];injector=f(Q);constructor(){}runInitializers(){if(this.initialized)return;let t=[];for(let i of this.appInits){let o=Qr(this.injector,i);if(Mr(o))t.push(o);else if(Ju(o)){let a=new Promise((s,l)=>{o.subscribe({complete:s,error:l})});t.push(a)}}let r=()=>{this.done=!0,this.resolve()};Promise.all(t).then(()=>{r()}).catch(i=>{this.reject(i)}),t.length===0&&r(),this.initialized=!0}static \u0275fac=function(r){return new(r||e)};static \u0275prov=k({token:e,factory:e.\u0275fac})}return e})();function nf(e){return n=>{n.controlDef={create:(t,r)=>{t?.\u0275ngControlCreate(r)},update:(t,r)=>{t?.\u0275ngControlUpdate?.(r)},passThroughInput:e}}}function nx(e){return Object.getPrototypeOf(e.prototype).constructor}function Ke(e){let n=nx(e.type),t=!0,r=[e];for(;n&&n!==Function.prototype&&n!==Object.prototype;){let i,o=Object.hasOwn(n,qi)?n[qi]:void 0,a=Object.hasOwn(n,Yi)?n[Yi]:void 0;if(an(e))i=o??a;else{if(o&&e.selectors&&e.selectors.length>0)throw new x(903,!1);i=o??a}if(i){if(t){r.push(i);let l=e;l.inputs=Fd(e.inputs),l.declaredInputs=Fd(e.declaredInputs),l.outputs=Fd(e.outputs);let c=i.hostBindings;c&&sx(e,c);let d=i.viewQuery,u=i.contentQueries;d&&ox(e,d),u&&ax(e,u),rx(e,i),lp(e.outputs,i.outputs);let p=i.data?.animation;if(p){let m=e.data??={};m.animation=(m.animation||[]).concat(p)}}let s=i.features;if(s)for(let l=0;l<s.length;l++){let c=s[l];c&&c.ngInherit&&c(e),c===Ke&&(t=!1)}}n=Object.getPrototypeOf(n)}ix(r)}function rx(e,n){for(let t in n.inputs){if(!Object.hasOwn(n.inputs,t)||Object.hasOwn(e.inputs,t))continue;let r=n.inputs[t];r!==void 0&&(e.inputs[t]=r,e.declaredInputs[t]=n.declaredInputs[t])}}function ix(e){let n=0,t=null;for(let r=e.length-1;r>=0;r--){let i=e[r];i.hostVars=n+=i.hostVars,i.hostAttrs=li(i.hostAttrs,t=li(t,i.hostAttrs))}}function Fd(e){return e===Mn?{}:e===Je?[]:e}function ox(e,n){let t=e.viewQuery;t?e.viewQuery=(r,i)=>{n(r,i),t(r,i)}:e.viewQuery=n}function ax(e,n){let t=e.contentQueries;t?e.contentQueries=(r,i,o)=>{n(r,i,o),t(r,i,o)}:e.contentQueries=n}function sx(e,n){let t=e.hostBindings;t?e.hostBindings=(r,i)=>{n(r,i),t(r,i)}:e.hostBindings=n}function Nb(e,n,t,r,i,o,a,s){if(t.firstCreatePass){e.mergedAttrs=li(e.mergedAttrs,e.attrs);let d=e.tView=Hu(2,e,i,o,a,t.directiveRegistry,t.pipeRegistry,null,t.schemas,t.consts,null);t.queries!==null&&(t.queries.template(t,e),d.queries=t.queries.embeddedTView(e))}s&&(e.flags|=s),ri(e,!1);let l=cx(t,n,e,r);ds()&&ju(t,n,l,e),ci(l,n);let c=tb(l,n,l,e);n[r+De]=c,Uu(n,c),zE(c,e,n)}function lx(e,n,t,r,i,o,a,s,l,c,d){let u=t+De,p;return n.firstCreatePass?(p=hi(n,u,4,a||null,s||null),hd()&&db(n,e,p,bt(n.consts,c),zg),Uh(n,p)):p=n.data[u],Nb(p,e,n,t,r,i,o,l),Ji(p)&&$u(n,e,p),c!=null&&Gs(e,p,d),p}function ho(e,n,t,r,i,o,a,s,l,c,d){let u=t+De,p;if(n.firstCreatePass){if(p=hi(n,u,4,a||null,s||null),c!=null){let m=bt(n.consts,c);p.localNames=[];for(let h=0;h<m.length;h+=2)p.localNames.push(m[h],-1)}}else p=n.data[u];return Nb(p,e,n,t,r,i,o,l),c!=null&&Gs(e,p,d),p}function bi(e,n,t,r,i,o,a,s){let l=F(),c=Ee(),d=bt(c.consts,o);return lx(l,c,e,n,t,r,i,d,void 0,a,s),bi}var cx=dx;function dx(e,n,t,r){return us(!0),n[be].createComment("")}var rf=new y("");var of=new y("");function Tb(){lc(e=>{let n="";throw new x(-600,n)})}var ux=10;var Ot=(()=>{class e{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=f(kn);afterRenderManager=f(zs);zonelessEnabled=f(io);rootEffectScheduler=f(ms);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=!1;afterTick=new L;get allViews(){return[...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=f(br);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(he(t=>!t))}constructor(){f(Rt,{optional:!0})}whenStable(){let t;return new Promise(r=>{t=this.isStable.subscribe({next:i=>{i&&r()}})}).finally(()=>{t.unsubscribe()})}_injector=f(Pe);_rendererFactory=null;get injector(){return this._injector}bootstrap(t,r){return this.bootstrapImpl(t,r)}bootstrapImpl(t,r,i=Q.NULL){return this._injector.get(A).run(()=>{if(oe(J.BootstrapComponentStart),!this._injector.get(tf).done){let R="";throw new x(405,R)}let s=In(t),l=this._injector.get(Dr),c=new ui(s,l);this.componentTypes.push(t);let{hostElement:d,directives:u,bindings:p}=fx(r),m=d||c.selector,h=c.create(i,[],m,l.injector,u,p),w=h.location.nativeElement,E=h.injector.get(rf,null);return E?.registerApplication(w),h.onDestroy(()=>{this.detachView(h.hostView),lo(this.components,h),E?.unregisterApplication(w)}),this._loadComponent(h),oe(J.BootstrapComponentEnd,h),h})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){oe(J.ChangeDetectionStart),this.tracingSnapshot!==null?this.tracingSnapshot.run(Hs.CHANGE_DETECTION,this.tickImpl):this.tickImpl()}tickImpl=()=>{if(this._runningTick)throw oe(J.ChangeDetectionEnd),new x(101,!1);let t=S(null);try{this._runningTick=!0,this.synchronize()}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,S(t),this.afterTick.next(),oe(J.ChangeDetectionEnd)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(Ve,null,{optional:!0}));let t=0;for(;this.dirtyFlags!==0&&t++<ux;){oe(J.ChangeDetectionSyncStart);try{this.synchronizeOnce()}finally{oe(J.ChangeDetectionSyncEnd)}}}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let t=!1;if(this.dirtyFlags&7){let r=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:i}of this.allViews){if(!r&&!eo(i))continue;let o=r&&!this.zonelessEnabled?0:1;Xg(i,o),t=!0}if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}t||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:t})=>eo(t))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(t){let r=t;this._views.push(r),r.attachToAppRef(this)}detachView(t){let r=t;lo(this._views,r),r.detachFromAppRef()}_loadComponent(t){this.attachView(t.hostView);try{this.tick()}catch(i){this.internalErrorHandler(i)}this.components.push(t),this._injector.get(of,[]).forEach(i=>i(t))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(t=>t()),this._views.slice().forEach(t=>t.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(t){return this._destroyListeners.push(t),()=>lo(this._destroyListeners,t)}destroy(){if(this._destroyed)throw new x(406,!1);let t=this._injector;t.destroy&&!t.destroyed&&t.destroy()}get viewCount(){return this._views.length}static \u0275fac=function(r){return new(r||e)};static \u0275prov=k({token:e,factory:e.\u0275fac})}return e})();function fx(e){return e===void 0||typeof e=="string"||e instanceof Element?{hostElement:e}:e}function lo(e,n){let t=e.indexOf(n);t>-1&&e.splice(t,1)}function je(e,n,t,r){let i=F(),o=gr();if(fn(i,o,n)){let a=Ee(),s=no();AD(s,i,e,n,t,r)}return je}var mu=class{destroy(n){}updateValue(n,t){}swap(n,t){let r=Math.min(n,t),i=Math.max(n,t),o=this.detach(i);if(i-r>1){let a=this.detach(r);this.attach(r,o),this.attach(i,a)}else this.attach(r,o)}move(n,t){this.attach(t,this.detach(n))}};function Pd(e,n,t,r,i){return e===t&&Object.is(n,r)?1:Object.is(i(e,n),i(t,r))?-1:0}function mx(e,n,t,r){let i,o,a=0,s=e.length-1,l=void 0;if(Array.isArray(n)){S(r);let c=n.length-1;for(S(null);a<=s&&a<=c;){let d=e.at(a),u=n[a],p=Pd(a,d,a,u,t);if(p!==0){p<0&&e.updateValue(a,u),a++;continue}let m=e.at(s),h=n[c],w=Pd(s,m,c,h,t);if(w!==0){w<0&&e.updateValue(s,h),s--,c--;continue}let E=t(a,d),R=t(s,m),U=t(a,u);if(Object.is(U,R)){let at=t(c,h);Object.is(at,E)?(e.swap(a,s),e.updateValue(s,h),c--,s--):e.move(s,a),e.updateValue(a,u),a++;continue}if(i??=new Os,o??=Rh(e,a,s,t),pu(e,i,a,U))e.updateValue(a,u),a++,s++;else if(o.has(U))i.set(E,e.detach(a)),s--;else{let at=e.create(a,n[a]);e.attach(a,at),a++,s++}}for(;a<=c;)kh(e,i,t,a,n[a]),a++}else if(n!=null){S(r);let c=n[Symbol.iterator]();S(null);let d=c.next();for(;!d.done&&a<=s;){let u=e.at(a),p=d.value,m=Pd(a,u,a,p,t);if(m!==0)m<0&&e.updateValue(a,p),a++,d=c.next();else{i??=new Os,o??=Rh(e,a,s,t);let h=t(a,p);if(pu(e,i,a,h))e.updateValue(a,p),a++,s++,d=c.next();else if(!o.has(h))e.attach(a,e.create(a,p)),a++,s++,d=c.next();else{let w=t(a,u);i.set(w,e.detach(a)),s--}}}for(;!d.done;)kh(e,i,t,e.length,d.value),d=c.next()}for(;a<=s;)e.destroy(e.detach(s--));i?.forEach(c=>{e.destroy(c)})}function pu(e,n,t,r){return n!==void 0&&n.has(r)?(e.attach(t,n.get(r)),n.delete(r),!0):!1}function kh(e,n,t,r,i){if(pu(e,n,r,t(r,i)))e.updateValue(r,i);else{let o=e.create(r,i);e.attach(r,o)}}function Rh(e,n,t,r){let i=new Set;for(let o=n;o<=t;o++)i.add(r(o,e.at(o)));return i}var Os=class{kvMap=new Map;_vMap=void 0;has(n){return this.kvMap.has(n)}delete(n){if(!this.has(n))return!1;let t=this.kvMap.get(n);return this._vMap!==void 0&&this._vMap.has(t)?(this.kvMap.set(n,this._vMap.get(t)),this._vMap.delete(t)):this.kvMap.delete(n),!0}get(n){return this.kvMap.get(n)}set(n,t){if(this.kvMap.has(n)){let r=this.kvMap.get(n);this._vMap===void 0&&(this._vMap=new Map);let i=this._vMap;for(;i.has(r);)r=i.get(r);i.set(r,t)}else this.kvMap.set(n,t)}forEach(n){for(let[t,r]of this.kvMap)if(n(r,t),this._vMap!==void 0){let i=this._vMap;for(;i.has(r);)r=i.get(r),n(r,t)}}};function _e(e,n,t,r,i,o,a,s){Fn("NgControlFlow");let l=F(),c=Ee(),d=bt(c.consts,o);return ho(l,c,e,n,t,r,i,d,256,a,s),af}function af(e,n,t,r,i,o,a,s){return Fn("NgControlFlow"),px(e,n,t,r,i,o,a,s),af}function px(e,n,t,r,i,o,a,s){let l=F(),c=Ee(),d=bt(c.consts,o);ho(l,c,e,n,t,r,i,d,512,a,s)}function we(e,n){Fn("NgControlFlow");let t=F(),r=gr(),i=t[r]!==vt?t[r]:-1,o=i!==-1?Fs(t,De+i):void 0,a=0;if(fn(t,r,e)){let s=S(null);try{if(o!==void 0&&rb(o,a),e!==-1){let l=De+e,c=Fs(t,l),d=vu(t[I],l),u=ob(c,d,t),p=wo(t,d,n,{dehydratedView:u});Co(c,p,a,di(d,u))}}finally{S(s)}}else if(o!==void 0){let s=nb(o,a);s!==void 0&&(s[Ie]=n)}}var hu=class{lContainer;$implicit;$index;constructor(n,t,r){this.lContainer=n,this.$implicit=t,this.$index=r}get $count(){return this.lContainer.length-Me}};function qs(e,n){return n}var gu=class{hasEmptyBlock;trackByFn;liveCollection;constructor(n,t,r){this.hasEmptyBlock=n,this.trackByFn=t,this.liveCollection=r}};function Ys(e,n,t,r,i,o,a,s,l,c,d,u,p){Fn("NgControlFlow");let m=F(),h=Ee(),w=l!==void 0,E=F(),R=s?a.bind(E[Ye][Ie]):a,U=new gu(w,R);E[De+e]=U,ho(m,h,e+1,n,t,r,i,bt(h.consts,o),256),w&&ho(m,h,e+2,l,c,d,u,bt(h.consts,p),512)}var bu=class extends mu{lContainer;hostLView;templateTNode;operationsCounter=void 0;needsIndexUpdate=!1;constructor(n,t,r){super(),this.lContainer=n,this.hostLView=t,this.templateTNode=r}get length(){return this.lContainer.length-Me}at(n){return this.getLView(n)[Ie].$implicit}attach(n,t){let r=t[sr];this.needsIndexUpdate||=n!==this.length,Co(this.lContainer,t,n,di(this.templateTNode,r)),hx(this.lContainer,n)}detach(n){return this.needsIndexUpdate||=n!==this.length-1,gx(this.lContainer,n),bx(this.lContainer,n)}create(n,t){let r=Is(this.lContainer,this.templateTNode.tView.ssrId);return wo(this.hostLView,this.templateTNode,new hu(this.lContainer,t,n),{dehydratedView:r})}destroy(n){Us(n[I],n)}updateValue(n,t){this.getLView(n)[Ie].$implicit=t}reset(){this.needsIndexUpdate=!1}updateIndexes(){if(this.needsIndexUpdate)for(let n=0;n<this.length;n++)this.getLView(n)[Ie].$index=n}getLView(n){return vx(this.lContainer,n)}};function Zs(e){let n=S(null),t=sn();try{let r=F(),i=r[I],o=r[t],a=t+1,s=Fs(r,a);if(o.liveCollection===void 0){let c=vu(i,a);o.liveCollection=new bu(s,r,c)}else o.liveCollection.reset();let l=o.liveCollection;if(mx(l,e,o.trackByFn,n),l.updateIndexes(),o.hasEmptyBlock){let c=gr(),d=l.length===0;if(fn(r,c,d)){let u=t+2,p=Fs(r,u);if(d){let m=vu(i,u),h=ob(p,m,r),w=wo(r,m,void 0,{dehydratedView:h});Co(p,w,0,di(m,h))}else i.firstUpdatePass&&tE(p),rb(p,0)}}}finally{S(n)}}function Fs(e,n){return e[n]}function hx(e,n){if(e.length<=Me)return;let t=Me+n,r=e[t];r&&aD(r)}function gx(e,n){if(e.length<=Me)return;let t=Me+n,r=e[t];r&&oD(r)}function bx(e,n){return mo(e,n)}function vx(e,n){return nb(e,n)}function vu(e,n){return ts(e,n)}function T(e,n,t){let r=F(),i=gr();if(fn(r,i,n)){let o=Ee(),a=no();SD(a,r,e,n,r[be],t)}return T}function yu(e,n,t,r,i){Gu(n,e,t,i?"class":"style",r)}function g(e,n,t,r){let i=F(),o=i[I],a=e+De,s=o.firstCreatePass?fb(a,i,2,n,zg,hd(),t,r):o.data[a];if(on(s)){let l=i[jt].tracingService;if(l&&l.componentCreate){let c=o.data[s.directiveStart+s.componentOffset];return l.componentCreate(lb(c),()=>(Oh(e,n,i,s,r),g))}}return Oh(e,n,i,s,r),g}function Oh(e,n,t,r,i){if(Ug(r,t,e,n,Ab),Ji(r)){let o=t[I];$u(o,t,r),gg(o,r,t)}i!=null&&Gs(t,r)}function b(){let e=Ee(),n=Xe(),t=$g(n);return e.firstCreatePass&&mb(e,t),bd(t)&&vd(),pd(),t.classesWithoutHost!=null&&eC(t)&&yu(e,t,F(),t.classesWithoutHost,!0),t.stylesWithoutHost!=null&&tC(t)&&yu(e,t,F(),t.stylesWithoutHost,!1),b}function Be(e,n,t,r){return g(e,n,t,r),b(),Be}function yt(e,n,t,r){let i=F(),o=i[I],a=e+De,s=o.firstCreatePass?xE(a,o,2,n,t,r):o.data[a];return Ug(s,i,e,n,Ab),r!=null&&Gs(i,s),yt}function _t(){let e=Xe(),n=$g(e);return bd(n)&&vd(),pd(),_t}function wt(e,n,t,r){return yt(e,n,t,r),_t(),wt}var Ab=(e,n,t,r,i)=>(us(!0),Dg(n[be],r,Sd()));function vi(){return F()}function Pn(e,n,t){let r=F(),i=gr();if(fn(r,i,n)){let o=Ee(),a=no();Bg(a,r,e,n,r[be],t)}return Pn}function me(e,n,t){let r=F(),i=Ee(),o=Xe();return yx(i,r,r[be],o,e,n,t),me}function yx(e,n,t,r,i,o,a){let s=!0,l=null;if((r.type&3||a)&&(l??=so(r,n,o),sE(r,e,n,a,t,i,o,l)&&(s=!1)),s){let c=r.outputs?.[i],d=r.hostDirectiveOutputs?.[i];if(d&&d.length)for(let u=0;u<d.length;u+=2){let p=d[u],m=d[u+1];l??=so(r,n,o),Ns(r,n,p,m,i,l)}if(c&&c.length)for(let u of c)l??=so(r,n,o),Ns(r,n,u,i,i,l)}}function $e(e=1){return Up(e)}function _x(e,n){let t=null,r=qC(e);for(let i=0;i<n.length;i++){let o=n[i];if(o==="*"){t=i;continue}if(r===null?Mg(e,o,!0):XC(r,o))return i}return t}function Qe(e){let n=F()[Ye][Ue];if(!n.projection){let t=e?e.length:1,r=n.projection=hp(t,null),i=r.slice(),o=n.child;for(;o!==null;){if(o.type!==128){let a=e?_x(o,e):0;a!==null&&(i[a]?i[a].projectionNext=o:r[a]=o,i[a]=o)}o=o.next}}}function ae(e,n=0,t,r,i,o){let a=F(),s=Ee(),l=r?e+1:null;l!==null&&ho(a,s,l,r,i,o,null,t);let c=hi(s,De+e,16,null,t||null);c.projection===null&&(c.projection=n),wd();let u=!a[sr]||gd();a[Ye][Ue].projection[c.projection]===null&&l!==null?wx(a,s,l):u&&!Vs(c)&&gD(s,a,c)}function wx(e,n,t){let r=De+t,i=n.data[r],o=e[r],a=Is(o,i.tView.ssrId),s=wo(e,i,void 0,{dehydratedView:a});Co(o,s,0,di(i,a))}function Xs(e,n,t,r){return _b(e,n,t,r),Xs}function Gt(e,n,t){return yb(e,n,t),Gt}function Ae(e){let n=F(),t=Ee(),r=as();to(r+1);let i=Xu(t,r);if(e.dirty&&xp(n)===((i.metadata.flags&2)===2)){if(i.matches===null)e.reset([]);else{let o=Cb(n,r);e.reset(o,tg),e.notifyOnChanges()}return!0}return!1}function ke(){return Zu(F(),as())}function Ks(e,n,t,r,i){return Eb(n,_b(e,t,r,i)),Ks}function Qs(e,n,t,r){return Eb(e,yb(n,t,r)),Qs}function Js(e=1){to(as()+e)}function yi(e){let n=Rp();return ld(n,De+e)}function gs(e,n){return e<<17|n<<2}function Er(e){return e>>17&32767}function Cx(e){return(e&2)==2}function Dx(e,n){return e&131071|n<<17}function _u(e){return e|2}function fi(e){return(e&131068)>>2}function Ld(e,n){return e&-131069|n<<2}function Ex(e){return(e&1)===1}function wu(e){return e|1}function xx(e,n,t,r,i,o){let a=o?n.classBindings:n.styleBindings,s=Er(a),l=fi(a);e[r]=t;let c=!1,d;if(Array.isArray(t)){let u=t;d=u[1],(d===null||Zr(u,d)>0)&&(c=!0)}else d=t;if(i)if(l!==0){let p=Er(e[s+1]);e[r+1]=gs(p,s),p!==0&&(e[p+1]=Ld(e[p+1],r)),e[s+1]=Dx(e[s+1],r)}else e[r+1]=gs(s,0),s!==0&&(e[s+1]=Ld(e[s+1],r)),s=r;else e[r+1]=gs(l,0),s===0?s=r:e[l+1]=Ld(e[l+1],r),l=r;c&&(e[r+1]=_u(e[r+1])),Fh(e,d,r,!0),Fh(e,d,r,!1),Sx(n,d,e,r,o),a=gs(s,l),o?n.classBindings=a:n.styleBindings=a}function Sx(e,n,t,r,i){let o=i?e.residualClasses:e.residualStyles;o!=null&&typeof n=="string"&&Zr(o,n)>=0&&(t[r+1]=wu(t[r+1]))}function Fh(e,n,t,r){let i=e[t+1],o=n===null,a=r?Er(i):fi(i),s=!1;for(;a!==0&&(s===!1||o);){let l=e[a],c=e[a+1];Ix(l,n)&&(s=!0,e[a+1]=r?wu(c):_u(c)),a=r?Er(c):fi(c)}s&&(e[t+1]=r?_u(i):wu(i))}function Ix(e,n){return e===null||n==null||(Array.isArray(e)?e[1]:e)===n?!0:Array.isArray(e)&&typeof n=="string"?Zr(e,n)>=0:!1}var Tt={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function Mx(e){return e.substring(Tt.key,Tt.keyEnd)}function Nx(e){return Tx(e),kb(e,Rb(e,0,Tt.textEnd))}function kb(e,n){let t=Tt.textEnd;return t===n?-1:(n=Tt.keyEnd=Ax(e,Tt.key=n,t),Rb(e,n,t))}function Tx(e){Tt.key=0,Tt.keyEnd=0,Tt.value=0,Tt.valueEnd=0,Tt.textEnd=e.length}function Rb(e,n,t){for(;n<t&&e.charCodeAt(n)<=32;)n++;return n}function Ax(e,n,t){for(;n<t&&e.charCodeAt(n)>32;)n++;return n}function Nr(e,n,t){return Ob(e,n,t,!1),Nr}function $(e,n){return Ob(e,n,null,!0),$}function Tr(e){Rx(jx,kx,e,!0)}function kx(e,n){for(let t=Nx(n);t>=0;t=kb(n,t))Qa(e,Mx(n),!0)}function Ob(e,n,t,r){let i=F(),o=Ee(),a=Dd(2);if(o.firstUpdatePass&&Pb(o,e,a,r),n!==vt&&fn(i,a,n)){let s=o.data[sn()];Lb(o,s,i,i[be],e,i[a+1]=Hx(n,t),r,a)}}function Rx(e,n,t,r){let i=Ee(),o=Dd(2);i.firstUpdatePass&&Pb(i,null,o,r);let a=F();if(t!==vt&&fn(a,o,t)){let s=i.data[sn()];if(Vb(s,r)&&!Fb(i,o)){let l=r?s.classesWithoutHost:s.stylesWithoutHost;l!==null&&(t=Wa(l,t||"")),yu(i,s,a,t,r)}else Bx(i,s,a,a[be],a[o+1],a[o+1]=Vx(e,n,t),r,o)}}function Fb(e,n){return n>=e.expandoStartIndex}function Pb(e,n,t,r){let i=e.data;if(i[t+1]===null){let o=i[sn()],a=Fb(e,t);Vb(o,r)&&n===null&&!a&&(n=!1),n=Ox(i,o,n,r),xx(i,o,n,t,a,r)}}function Ox(e,n,t,r){let i=jp(e),o=r?n.residualClasses:n.residualStyles;if(i===null)(r?n.classBindings:n.styleBindings)===0&&(t=Vd(null,e,n,t,r),t=go(t,n.attrs,r),o=null);else{let a=n.directiveStylingLast;if(a===-1||e[a]!==i)if(t=Vd(i,e,n,t,r),o===null){let l=Fx(e,n,r);l!==void 0&&Array.isArray(l)&&(l=Vd(null,e,n,l[1],r),l=go(l,n.attrs,r),Px(e,n,r,l))}else o=Lx(e,n,r)}return o!==void 0&&(r?n.residualClasses=o:n.residualStyles=o),t}function Fx(e,n,t){let r=t?n.classBindings:n.styleBindings;if(fi(r)!==0)return e[Er(r)]}function Px(e,n,t,r){let i=t?n.classBindings:n.styleBindings;e[Er(i)]=r}function Lx(e,n,t){let r,i=n.directiveEnd;for(let o=1+n.directiveStylingLast;o<i;o++){let a=e[o].hostAttrs;r=go(r,a,t)}return go(r,n.attrs,t)}function Vd(e,n,t,r,i){let o=null,a=t.directiveEnd,s=t.directiveStylingLast;for(s===-1?s=t.directiveStart:s++;s<a&&(o=n[s],r=go(r,o.hostAttrs,i),o!==e);)s++;return e!==null&&(t.directiveStylingLast=s),r}function go(e,n,t){let r=t?1:2,i=-1;if(n!==null)for(let o=0;o<n.length;o++){let a=n[o];typeof a=="number"?i=a:i===r&&(Array.isArray(e)||(e=e===void 0?[]:["",e]),Qa(e,a,t?!0:n[++o]))}return e===void 0?null:e}function Vx(e,n,t){if(t==null||t==="")return Je;let r=[],i=kt(t);if(Array.isArray(i))for(let o=0;o<i.length;o++)e(r,i[o],!0);else if(i instanceof Set)for(let o of i)e(r,o,!0);else if(typeof i=="object")for(let o in i)Object.hasOwn(i,o)&&e(r,o,i[o]);else typeof i=="string"&&n(r,i);return r}function jx(e,n,t){let r=String(n);r!==""&&!r.includes(" ")&&Qa(e,r,t)}function Bx(e,n,t,r,i,o,a,s){i===vt&&(i=Je);let l=0,c=0,d=0<i.length?i[0]:null,u=0<o.length?o[0]:null;for(;d!==null||u!==null;){let p=l<i.length?i[l+1]:void 0,m=c<o.length?o[c+1]:void 0,h=null,w;d===u?(l+=2,c+=2,p!==m&&(h=u,w=m)):u===null||d!==null&&d<u?(l+=2,h=d):(c+=2,h=u,w=m),h!==null&&Lb(e,n,t,r,h,w,a,s),d=l<i.length?i[l]:null,u=c<o.length?o[c]:null}}function Lb(e,n,t,r,i,o,a,s){if(!(n.type&3))return;let l=e.data,c=l[s+1],d=Ex(c)?Ph(l,n,t,i,fi(c),a):void 0;if(!Ps(d)){Ps(o)||Cx(c)&&(o=Ph(l,null,t,i,s,a));let u=sd(sn(),t);vD(r,a,u,i,o)}}function Ph(e,n,t,r,i,o){let a=n===null,s;for(;i>0;){let l=e[i],c=Array.isArray(l),d=c?l[1]:l,u=d===null,p=t[i+1];p===vt&&(p=u?Je:void 0);let m=u?Ja(p,r):d===r?p:void 0;if(c&&!Ps(m)&&(m=Ja(l,r)),Ps(m)&&(s=m,a))return s;let h=e[i+1];i=a?Er(h):fi(h)}if(n!==null){let l=o?n.residualClasses:n.residualStyles;l!=null&&(s=Ja(l,r))}return s}function Ps(e){return e!==void 0}function Hx(e,n){return e==null||e===""||(typeof n=="string"?e=kt(e)+n:typeof e=="object"&&(e=Ga(kt(e)))),e}function Vb(e,n){return(e.flags&(n?8:16))!==0}function D(e,n=""){let t=F(),r=Ee(),i=e+De,o=r.firstCreatePass?hi(r,i,1,n,null):r.data[i],a=zx(r,t,o,n);t[i]=a,ds()&&ju(r,t,a,o),ri(o,!1)}var zx=(e,n,t,r)=>(us(!0),LC(n[be],r));function Ux(e,n,t,r=""){return fn(e,gr(),t)?n+qc(t)+r:vt}function ce(e){return pn("",e),ce}function pn(e,n,t){let r=F(),i=Ux(r,e,n,t);return i!==vt&&$x(r,sn(),i),pn}function $x(e,n,t){let r=sd(n,e);VC(e[be],r,t)}function Lh(e,n,t){let r=Ee();r.firstCreatePass&&jb(n,r.data,r.blueprint,an(e),t)}function jb(e,n,t,r,i){if(e=We(e),Array.isArray(e))for(let o=0;o<e.length;o++)jb(e[o],n,t,r,i);else{let o=Ee(),a=F(),s=Xe(),l=ir(e)?e:We(e.provide),c=td(e),d=s.providerIndexes&1048575,u=s.directiveStart,p=s.providerIndexes>>20;if(ir(e)||!e.multi){let m=new wr(c,i,le,null),h=Bd(l,n,i?d:d+p,u);h===-1?(Ud(xs(s,a),o,l),jd(o,e,n.length),n.push(l),s.directiveStart++,s.directiveEnd++,i&&(s.providerIndexes+=1048576),t.push(m),a.push(m)):(t[h]=m,a[h]=m)}else{let m=Bd(l,n,d+p,u),h=Bd(l,n,d,d+p),w=m>=0&&t[m],E=h>=0&&t[h];if(i&&!E||!i&&!w){Ud(xs(s,a),o,l);let R=qx(i?Wx:Gx,t.length,i,r,c,e);!i&&E&&(t[h].providerFactory=R),jd(o,e,n.length,0),n.push(l),s.directiveStart++,s.directiveEnd++,i&&(s.providerIndexes+=1048576),t.push(R),a.push(R)}else{let R=Bb(t[i?h:m],c,!i&&r);jd(o,e,m>-1?m:h,R)}!i&&r&&E&&t[h].componentProviders++}}}function jd(e,n,t,r){let i=ir(n),o=_p(n);if(i||o){let l=(o?We(n.useClass):n).prototype.ngOnDestroy;if(l){let c=e.destroyHooks||(e.destroyHooks=[]);if(!i&&n.multi){let d=c.indexOf(t);d===-1?c.push(t,[r,l]):c[d+1].push(r,l)}else c.push(t,l)}}}function Bb(e,n,t){return t&&e.componentProviders++,e.multi.push(n)-1}function Bd(e,n,t,r){for(let i=t;i<r;i++)if(n[i]===e)return i;return-1}function Gx(e,n,t,r,i){return Cu(this.multi,[])}function Wx(e,n,t,r,i){let o=this.multi,a;if(this.providerFactory){let s=this.providerFactory.componentProviders,l=co(r,r[I],this.providerFactory.index,i);a=l.slice(0,s),Cu(o,a);for(let c=s;c<l.length;c++)a.push(l[c])}else a=[],Cu(o,a);return a}function Cu(e,n){for(let t=0;t<e.length;t++){let r=e[t];n.push(r())}return n}function qx(e,n,t,r,i,o){let a=new wr(e,t,le,null);return a.multi=[],a.index=n,a.componentProviders=0,Bb(a,i,r&&!t),a}function Ne(e,n){return t=>{t.providersResolver=(r,i)=>Lh(r,i?i(e):e,!1),n&&(t.viewProvidersResolver=(r,i)=>Lh(r,i?i(n):n,!0))}}function Yx(e,n){let t=e[n];return t===vt?void 0:t}function Zx(e,n,t,r,i,o){let a=n+t;return fn(e,a,i)?aE(e,a+1,o?r.call(o,i):r(i)):Yx(e,a+1)}function Re(e,n){let t=Ee(),r,i=e+De;t.firstCreatePass?(r=Xx(n,t.pipeRegistry),t.data[i]=r,r.onDestroy&&(t.destroyHooks??=[]).push(i,r.onDestroy)):r=t.data[i];let o=r.factory||(r.factory=Sn(r.type,!0)),a,s=it(le);try{let l=Es(!1),c=o();return Es(l),cd(t,F(),i,c),c}finally{it(s)}}function Xx(e,n){if(n)for(let t=n.length-1;t>=0;t--){let r=n[t];if(e===r.name)return r}}function Oe(e,n,t){let r=e+De,i=F(),o=ld(i,r);return Kx(i,r)?Zx(i,Op(),n,o.transform,t,o):o.transform(t)}function Kx(e,n){return e[I].data[n].pure}function sf(e,n){return Ws(e,n)}var Hb=(()=>{class e{applicationErrorHandler=f(kn);appRef=f(Ot);taskService=f(br);ngZone=f(A);zonelessEnabled=f(io);tracing=f(Rt,{optional:!0});zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new ue;innerNgZone=this.zoneIsDefined?this.ngZone._inner??null:null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(f(Td,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{let t=this.taskService.add();if(!this.runningTick&&(this.cleanup(),!this.zonelessEnabled||this.appRef.includeAllTestViews)){this.taskService.remove(t);return}this.switchToMicrotaskScheduler(),this.taskService.remove(t)})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()}))}switchToMicrotaskScheduler(){this.ngZone.runOutsideAngular(()=>{let t=this.taskService.add();this.useMicrotaskScheduler=!0,queueMicrotask(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(t)})})}notify(t){if(!this.zonelessEnabled&&t===5)return;switch(t){case 0:case 2:{this.appRef.dirtyFlags|=2;break}case 3:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2;break}case 12:{this.appRef.dirtyFlags|=16;break}case 13:{this.appRef.dirtyFlags|=2;break}case 11:break;case 9:case 8:case 7:case 10:default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick())return;let r=this.useMicrotaskScheduler?Yp:Id;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>r(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>r(()=>this.tick()))}shouldScheduleTick(){return!(this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.innerNgZone!==null&&this.isInNgZone())}isInNgZone(){let t=Zone.current;for(;t;){if(t===this.innerNgZone)return!0;t=t.parent}return!1}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let t=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(r){this.applicationErrorHandler(r)}finally{this.taskService.remove(t),this.cleanup()}}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let t=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(t)}}static \u0275fac=function(r){return new(r||e)};static \u0275prov=k({token:e,factory:e.\u0275fac})}return e})();function zb(){return[{provide:Vt,useExisting:Hb},{provide:A,useClass:Wi},{provide:io,useValue:!0}]}var el=class{destroyed=!1;listeners=null;errorHandler=f(et,{optional:!0});isEmitting=!1;hasNullListeners=!1;destroyRef=f(qe);constructor(){this.destroyRef.onDestroy(()=>{this.destroyed=!0,this.listeners=null})}subscribe(n){if(this.destroyed)throw new x(953,!1);return(this.listeners??=[]).push(n),{unsubscribe:()=>{let t=this.listeners?this.listeners.indexOf(n):-1;t>-1&&(this.isEmitting?(this.hasNullListeners=!0,this.listeners[t]=null):this.listeners.splice(t,1))}}}emit(n){if(this.destroyed){console.warn(tn(953,!1));return}if(this.listeners===null)return;this.isEmitting=!0;let t=S(null);try{for(let r of this.listeners)try{r!==null&&r(n)}catch(i){this.errorHandler?.handleError(i)}}finally{this.hasNullListeners&&(this.hasNullListeners=!1,this.listeners&&Qx(this.listeners)),S(t),this.isEmitting=!1}}};function Qx(e){let n=e.length-1;for(;n>-1;)e[n]===null&&e.splice(n,1),n--}function Ge(e,n){return Fi(e,n?.equal)}function pe(e){return Im(e)}function qb(e,n){let t=Object.create(jh);t.value=e,t.transformFn=n?.transform;function r(){if(_n(t),t.value===Ls){let i=null;throw new x(-950,i)}return t.value}return r[He]=t,r}var _i=class{attributeName;constructor(n){this.attributeName=n}__NG_ELEMENT_ID__=()=>Eu(this.attributeName);toString(){return`HostAttributeToken ${this.attributeName}`}};function wi(e){return new el}function Ub(e,n){return qb(e,n)}function hS(e){return qb(Ls,e)}var G=(Ub.required=hS,Ub);function $b(e,n){return Ku(n)}function gS(e,n){return Qu(n)}var Eo=($b.required=gS,$b);function Gb(e,n){return Ku(n)}function bS(e,n){return Qu(n)}var Yb=(Gb.required=bS,Gb);var vS=1e4;var e2=vS-1e3;var Wt=(()=>{class e{static __NG_ELEMENT_ID__=yS}return e})();function yS(e){return _S(Xe(),F(),(e&16)===16)}function _S(e,n,t){if(on(e)&&!t){let r=gt(e.index,n);return new On(r,r)}else if(e.type&175){let r=n[Ye];return new On(r,n)}return null}var cf=new y(""),wS=new y("");function Do(e){return!e.moduleRef}function CS(e){let n=Do(e)?e.r3Injector:e.moduleRef.injector,t=n.get(A);return t.run(()=>{Do(e)?e.r3Injector.resolveInjectorInitializers():e.moduleRef.resolveInjectorInitializers();let r=n.get(kn),i;if(t.runOutsideAngular(()=>{i=t.onError.subscribe({next:r})}),Do(e)){let o=()=>n.destroy(),a=e.platformInjector.get(cf);a.add(o),n.onDestroy(()=>{i.unsubscribe(),a.delete(o)})}else{let o=()=>e.moduleRef.destroy(),a=e.platformInjector.get(cf);a.add(o),e.moduleRef.onDestroy(()=>{lo(e.allPlatformModules,e.moduleRef),i.unsubscribe(),a.delete(o)})}return ES(r,t,()=>{let o=n.get(br),a=o.add(),s=n.get(tf);return s.runInitializers(),s.donePromise.then(()=>{if(!n.get(wS,!0))return Do(e)?n.get(Ot):(e.allPlatformModules.push(e.moduleRef),e.moduleRef);if(Do(e)){let c=n.get(Ot);return e.rootComponent!==void 0&&c.bootstrap(e.rootComponent),c}else return DS?.(e.moduleRef,e.allPlatformModules),e.moduleRef}).finally(()=>{o.remove(a)})})})}var DS;function ES(e,n,t){try{let r=t();return Mr(r)?r.catch(i=>{throw n.runOutsideAngular(()=>e(i)),i}):r}catch(r){throw n.runOutsideAngular(()=>e(r)),r}}var tl=null;function xS(e=[],n){return Q.create({name:n,providers:[{provide:Xi,useValue:"platform"},{provide:cf,useValue:new Set([()=>tl=null])},...e]})}function SS(e=[]){if(tl)return tl;let n=xS(e);return tl=n,Tb(),IS(n),n}function IS(e){let n=e.get(fs,null);Qr(e,()=>{n?.forEach(t=>t())})}function Zb(e){let{rootComponent:n,appProviders:t,platformProviders:r,platformRef:i}=e;oe(J.BootstrapApplicationStart);try{let o=i?.injector??SS(r),a=[zb(),Jp,...t||[]],s=new po({providers:a,parent:o,debugName:"",runEnvironmentInitializers:!1});return CS({r3Injector:s.injector,platformInjector:o,rootComponent:n})}catch(o){return Promise.reject(o)}finally{oe(J.BootstrapApplicationEnd)}}function xe(e){return typeof e=="boolean"?e:e!=null&&e!=="false"}function rl(e,n=NaN){return!isNaN(parseFloat(e))&&!isNaN(Number(e))?Number(e):n}var lf=Symbol("NOT_SET"),Xb=new Set,MS=B(C({},jr),{kind:"afterRenderEffectPhase",consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,value:lf,cleanup:null,consumerMarkedDirty(){if(this.sequence.impl.executing){if(this.sequence.lastPhase===null||this.sequence.lastPhase<this.phase)return;this.sequence.erroredOrDestroyed=!0}this.sequence.scheduler.notify(7)},phaseFn(e){if(this.sequence.lastPhase=this.phase,!this.dirty)return this.signal;if(this.dirty=!1,this.value!==lf&&!Lr(this))return this.signal;try{for(let i of this.cleanup??Xb)i()}finally{this.cleanup?.clear()}let n=[];e!==void 0&&n.push(e),n.push(this.registerCleanupFn);let t=wn(this),r;try{r=this.userFn.apply(null,n)}finally{Yn(this,t)}return(this.value===lf||!this.equal(this.value,r))&&(this.value=r,this.version++),this.signal}}),df=class extends uo{scheduler;lastPhase=null;nodes=[void 0,void 0,void 0,void 0];onDestroyFns=null;constructor(n,t,r,i,o,a=null,s){super(n,[void 0,void 0,void 0,void 0],r,!1,o.get(qe),a),this.scheduler=i;for(let l of Pu){let c=t[l];if(c===void 0)continue;let d=Object.create(MS);d.sequence=this,d.phase=l,d.userFn=c,d.dirty=!0,d.signal=()=>(_n(d),d.value),d.signal[He]=d,d.registerCleanupFn=u=>(d.cleanup??=new Set).add(u),this.nodes[l]=d,this.hooks[l]=u=>d.phaseFn(u)}}afterRun(){super.afterRun(),this.lastPhase=null}destroy(){if(this.onDestroyFns!==null)for(let n of this.onDestroyFns)n();super.destroy();for(let n of this.nodes)if(n)try{for(let t of n.cleanup??Xb)t()}finally{Cn(n)}}};function uf(e,n){let t=n?.injector??f(Q),r=t.get(Vt),i=t.get(zs),o=t.get(Rt,null,{optional:!0});i.impl??=t.get(Lu);let a=e;typeof a=="function"&&(a={mixedReadWrite:e});let s=t.get(ii,null,{optional:!0}),l=new df(i.impl,[a.earlyRead,a.write,a.mixedReadWrite,a.read],s?.view,r,t,o?.snapshot(null),void 0);return i.impl.register(l),l}function il(e,n){let t=In(e),r=n.elementInjector||Kr(),o=new ui(t).create(r,n.projectableNodes,n.hostElement,n.environmentInjector,n.directives,n.bindings);return n.onError&&(o.hostView._lView[ti]=n.onError),o}var Kb=null;function Ct(){return Kb}function ff(e){Kb??=e}var xo=class{},Ci=(()=>{class e{historyGo(t){throw new Error("")}static \u0275fac=function(r){return new(r||e)};static \u0275prov=V({token:e,factory:()=>f(Qb),providedIn:"platform"})}return e})();var Qb=(()=>{class e extends Ci{_location;_history;_doc=f(j);constructor(){super(),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return Ct().getBaseHref(this._doc)}onPopState(t){let r=Ct().getGlobalEventTarget(this._doc,"window");return r.addEventListener("popstate",t,!1),()=>r.removeEventListener("popstate",t)}onHashChange(t){let r=Ct().getGlobalEventTarget(this._doc,"window");return r.addEventListener("hashchange",t,!1),()=>r.removeEventListener("hashchange",t)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(t){this._location.pathname=t}pushState(t,r,i){this._history.pushState(t,r,i)}replaceState(t,r,i){this._history.replaceState(t,r,i)}forward(){this._history.forward()}back(){this._history.back()}historyGo(t=0){this._history.go(t)}getState(){return this._history.state}static \u0275fac=function(r){return new(r||e)};static \u0275prov=V({token:e,factory:()=>new e,providedIn:"platform"})}return e})();function tv(e,n){return e?n?e.endsWith("/")?n.startsWith("/")?e+n.slice(1):e+n:n.startsWith("/")?e+n:`${e}/${n}`:e:n}function Jb(e){let n=e.search(/#|\?|$/);return e[n-1]==="/"?e.slice(0,n-1)+e.slice(n):e}function Ln(e){return e&&e[0]!=="?"?`?${e}`:e}var ol=(()=>{class e{historyGo(t){throw new Error("")}static \u0275fac=function(r){return new(r||e)};static \u0275prov=V({token:e,factory:()=>f(TS),providedIn:"root"})}return e})(),NS=new y(""),TS=(()=>{class e extends ol{_platformLocation;_baseHref;_removeListenerFns=[];constructor(t,r){super(),this._platformLocation=t,this._baseHref=r??this._platformLocation.getBaseHrefFromDOM()??f(j).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(t){this._removeListenerFns.push(this._platformLocation.onPopState(t),this._platformLocation.onHashChange(t))}getBaseHref(){return this._baseHref}prepareExternalUrl(t){return tv(this._baseHref,t)}path(t=!1){let r=this._platformLocation.pathname+Ln(this._platformLocation.search),i=this._platformLocation.hash;return i&&t?`${r}${i}`:r}pushState(t,r,i,o){let a=this.prepareExternalUrl(i+Ln(o));this._platformLocation.pushState(t,r,a)}replaceState(t,r,i,o){let a=this.prepareExternalUrl(i+Ln(o));this._platformLocation.replaceState(t,r,a)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(t=0){this._platformLocation.historyGo?.(t)}static \u0275fac=function(r){return new(r||e)(M(Ci),M(NS,8))};static \u0275prov=V({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var al=(()=>{class e{_subject=new L;_basePath;_locationStrategy;_urlChangeListeners=[];_urlChangeSubscription=null;constructor(t){this._locationStrategy=t;let r=this._locationStrategy.getBaseHref();this._basePath=RS(Jb(ev(r))),this._locationStrategy.onPopState(i=>{let o={url:this.path(!0),pop:!0,state:i.state,type:i.type};i.hasUAVisualTransition&&(o.hasUAVisualTransition=!0),this._subject.next(o)})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(t=!1){return this.normalize(this._locationStrategy.path(t))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(t,r=""){return this.path()==this.normalize(t+Ln(r))}normalize(t){return e.stripTrailingSlash(kS(this._basePath,ev(t)))}prepareExternalUrl(t){return t&&t[0]!=="/"&&(t="/"+t),this._locationStrategy.prepareExternalUrl(t)}go(t,r="",i=null){this._locationStrategy.pushState(i,"",t,r),this._notifyUrlChangeListeners(this.prepareExternalUrl(t+Ln(r)),i)}replaceState(t,r="",i=null){this._locationStrategy.replaceState(i,"",t,r),this._notifyUrlChangeListeners(this.prepareExternalUrl(t+Ln(r)),i)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(t=0){this._locationStrategy.historyGo?.(t)}onUrlChange(t){return this._urlChangeListeners.push(t),this._urlChangeSubscription??=this.subscribe(r=>{this._notifyUrlChangeListeners(r.url,r.state)}),()=>{let r=this._urlChangeListeners.indexOf(t);this._urlChangeListeners.splice(r,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(t="",r){this._urlChangeListeners.forEach(i=>i(t,r))}subscribe(t,r,i){return this._subject.subscribe({next:t,error:r??void 0,complete:i??void 0})}static normalizeQueryParams=Ln;static joinWithSlash=tv;static stripTrailingSlash=Jb;static \u0275fac=function(r){return new(r||e)(M(ol))};static \u0275prov=V({token:e,factory:()=>AS(),providedIn:"root"})}return e})();function AS(){return new al(M(ol))}function kS(e,n){if(!e||!n.startsWith(e))return n;let t=n.substring(e.length);return t===""||["/",";","?","#"].includes(t[0])?t:n}function ev(e){return e.replace(/\/index\.html$/,"")}function RS(e){if(new RegExp("^(https?:)?//").test(e)){let[,t]=e.split(/\/\/[^\/]+/);return t}return e}var mf=(()=>{class e{_viewContainerRef;_viewRef=null;ngTemplateOutletContext=null;ngTemplateOutlet=null;ngTemplateOutletInjector=null;injector=f(Q);constructor(t){this._viewContainerRef=t}ngOnChanges(t){if(this._shouldRecreateView(t)){let r=this._viewContainerRef;if(this._viewRef&&r.remove(r.indexOf(this._viewRef)),!this.ngTemplateOutlet){this._viewRef=null;return}let i=this._createContextForwardProxy();this._viewRef=r.createEmbeddedView(this.ngTemplateOutlet,i,{injector:this._getInjector()})}}_getInjector(){return this.ngTemplateOutletInjector==="outlet"?this.injector:this.ngTemplateOutletInjector??void 0}_shouldRecreateView(t){return!!t.ngTemplateOutlet||!!t.ngTemplateOutletInjector}_createContextForwardProxy(){return new Proxy({},{set:(t,r,i)=>this.ngTemplateOutletContext?Reflect.set(this.ngTemplateOutletContext,r,i):!1,get:(t,r,i)=>{if(this.ngTemplateOutletContext)return Reflect.get(this.ngTemplateOutletContext,r,i)}})}static \u0275fac=function(r){return new(r||e)(le(mn))};static \u0275dir=q({type:e,selectors:[["","ngTemplateOutlet",""]],inputs:{ngTemplateOutletContext:"ngTemplateOutletContext",ngTemplateOutlet:"ngTemplateOutlet",ngTemplateOutletInjector:"ngTemplateOutletInjector"},features:[dt]})}return e})();var pf=(()=>{class e{transform(t){return JSON.stringify(t,null,2)}static \u0275fac=function(r){return new(r||e)};static \u0275pipe=ef({name:"json",type:e,pure:!1})}return e})();var qt=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=ee({type:e});static \u0275inj=K({})}return e})();function So(e,n){n=encodeURIComponent(n);for(let t of e.split(";")){let r=t.indexOf("="),[i,o]=r==-1?[t,""]:[t.slice(0,r),t.slice(r+1)];if(i.trim()!==n)continue;let a=o;try{a=decodeURIComponent(o)}catch(s){}return a.length>1&&a[0]==='"'&&a[a.length-1]==='"'&&(a=a.slice(1,-1)),a}return null}var hf="browser";function nv(e){return e===hf}var Io=class{_doc;constructor(n){this._doc=n}manager},sl=(()=>{class e extends Io{constructor(t){super(t)}supports(t){return!0}addEventListener(t,r,i,o){return t.addEventListener(r,i,o),()=>this.removeEventListener(t,r,i,o)}removeEventListener(t,r,i,o){return t.removeEventListener(r,i,o)}static \u0275fac=function(r){return new(r||e)(M(j))};static \u0275prov=V({token:e,factory:e.\u0275fac})}return e})(),dl=new y(""),yf=(()=>{class e{_zone;_plugins;_eventNameToPlugin=new Map;constructor(t,r){this._zone=r,t.forEach(a=>{a.manager=this});let i=t.filter(a=>!(a instanceof sl));this._plugins=i.slice().reverse();let o=t.find(a=>a instanceof sl);o&&this._plugins.push(o)}addEventListener(t,r,i,o){return this._findPluginFor(r).addEventListener(t,r,i,o)}getZone(){return this._zone}_findPluginFor(t){let r=this._eventNameToPlugin.get(t);if(r)return r;if(r=this._plugins.find(o=>o.supports(t)),!r)throw new x(-5101,!1);return this._eventNameToPlugin.set(t,r),r}static \u0275fac=function(r){return new(r||e)(M(dl),M(A))};static \u0275prov=V({token:e,factory:e.\u0275fac})}return e})(),gf="ng-app-id";function rv(e){for(let n of e)n.remove()}function iv(e,n){let t=n.createElement("style");return t.textContent=e,t}function VS(e,n,t,r){let i=e.head?.querySelectorAll(`style[${gf}="${n}"],link[${gf}="${n}"]`);if(!i||i.length===0)return!1;for(let o of i)o.removeAttribute(gf),o instanceof HTMLLinkElement?r.set(o.href.slice(o.href.lastIndexOf("/")+1),{usage:0,elements:[o]}):o.textContent&&t.set(o.textContent,{usage:0,elements:[o]});return!0}function vf(e,n){let t=n.createElement("link");return t.setAttribute("rel","stylesheet"),t.setAttribute("href",e),t}var _f=(()=>{class e{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(t,r,i,o={}){this.doc=t,this.appId=r,this.nonce=i,VS(t,r,this.inline,this.external)&&this.hosts.add(t.head)}addStyles(t,r){for(let i of t)this.addUsage(i,this.inline,iv);r?.forEach(i=>this.addUsage(i,this.external,vf))}removeStyles(t,r){for(let i of t)this.removeUsage(i,this.inline);r?.forEach(i=>this.removeUsage(i,this.external))}addUsage(t,r,i){let o=r.get(t);o?o.usage++:r.set(t,{usage:1,elements:[...this.hosts].map(a=>this.addElement(a,i(t,this.doc)))})}removeUsage(t,r){let i=r.get(t);i&&(i.usage--,i.usage<=0&&(rv(i.elements),r.delete(t)))}ngOnDestroy(){for(let[,{elements:t}]of[...this.inline,...this.external])rv(t);this.hosts.clear()}addHost(t){if(!this.hosts.has(t)){this.hosts.add(t);for(let[r,{elements:i}]of this.inline)i.push(this.addElement(t,iv(r,this.doc)));for(let[r,{elements:i}]of this.external)i.push(this.addElement(t,vf(r,this.doc)))}}removeHost(t){this.hosts.delete(t);for(let r of[...this.inline.values(),...this.external.values()]){let i=[];for(let o of r.elements)o.parentNode===t?o.remove():i.push(o);r.elements=i}}addElement(t,r){return this.nonce&&r.setAttribute("nonce",this.nonce),t.appendChild(r)}static \u0275fac=function(r){return new(r||e)(M(j),M(vr),M(Rn,8),M(yr))};static \u0275prov=V({token:e,factory:e.\u0275fac})}return e})(),bf={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},wf=/%COMP%/g;var av="%COMP%",jS=`_nghost-${av}`,BS=`_ngcontent-${av}`,HS=!0,zS=new y("",{factory:()=>HS}),US=new y("");function $S(e){return BS.replace(wf,e)}function GS(e){return jS.replace(wf,e)}function sv(e,n){return n.map(t=>t.replace(wf,e))}var Cf=(()=>{class e{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;cssVarNamespace;constructor(t,r,i,o,a,s,l=null,c=null,d=null){this.eventManager=t,this.sharedStylesHost=r,this.appId=i,this.removeStylesOnCompDestroy=o,this.doc=a,this.ngZone=s,this.nonce=l,this.tracingService=c,this.cssVarNamespace=d??"",this.defaultRenderer=new Mo(t,a,s,this.tracingService,this.cssVarNamespace)}createRenderer(t,r){if(!t||!r)return this.defaultRenderer;let i=this.getOrCreateRenderer(t,r);return i instanceof cl?i.applyToHost(t):i instanceof No&&i.applyStyles(),i}getOrCreateRenderer(t,r){let i=this.rendererByCompId,o=i.get(r.id);if(!o){let a=this.doc,s=this.ngZone,l=this.eventManager,c=this.sharedStylesHost,d=this.removeStylesOnCompDestroy,u=this.tracingService;switch(r.encapsulation){case At.Emulated:o=new cl(l,c,r,this.appId,d,a,s,u,this.cssVarNamespace);break;case At.ShadowDom:return new ll(l,t,r,a,s,this.nonce,u,this.cssVarNamespace,c);case At.ExperimentalIsolatedShadowDom:return new ll(l,t,r,a,s,this.nonce,u,this.cssVarNamespace);default:o=new No(l,c,r,d,a,s,u,this.cssVarNamespace);break}i.set(r.id,o)}return o}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(t){this.rendererByCompId.delete(t)}static \u0275fac=function(r){return new(r||e)(M(yf),M(Ir),M(vr),M(zS),M(j),M(A),M(Rn),M(Rt,8),M(US,8))};static \u0275prov=V({token:e,factory:e.\u0275fac})}return e})(),Mo=class{eventManager;doc;ngZone;tracingService;cssVarNamespace;data=Object.create(null);throwOnSyntheticProps=!0;constructor(n,t,r,i,o=""){this.eventManager=n,this.doc=t,this.ngZone=r,this.tracingService=i,this.cssVarNamespace=o}destroy(){}destroyNode=null;createElement(n,t){return t?this.doc.createElementNS(bf[t]||t,n):this.doc.createElement(n)}createComment(n){return this.doc.createComment(n)}createText(n){return this.doc.createTextNode(n)}appendChild(n,t){(ov(n)?n.content:n).appendChild(t)}insertBefore(n,t,r){if(n){let i=ov(n)?n.content:n;if(r!=null&&r.parentNode!==i)throw new x(-5106,!1);i.insertBefore(t,r)}}removeChild(n,t){t.remove()}selectRootElement(n,t){let r=typeof n=="string"?this.doc.querySelector(n):n;if(!r)throw new x(-5104,!1);return t||(r.textContent=""),r}parentNode(n){return n.parentNode}nextSibling(n){return n.nextSibling}setAttribute(n,t,r,i){if(i){t=i+":"+t;let o=bf[i];o?n.setAttributeNS(o,t,r):n.setAttribute(t,r)}else n.setAttribute(t,r)}removeAttribute(n,t,r){if(r){let i=bf[r];i?n.removeAttributeNS(i,t):n.removeAttribute(`${r}:${t}`)}else n.removeAttribute(t)}addClass(n,t){n.classList.add(t)}removeClass(n,t){n.classList.remove(t)}setStyle(n,t,r,i){let o=t.startsWith("--");o&&(t=t.replace("%NS%",this.cssVarNamespace)),o||i&($t.DashCase|$t.Important)?n.style.setProperty(t,r,i&$t.Important?"important":""):n.style[t]=r}removeStyle(n,t,r){let i=t.startsWith("--");i&&(t=t.replace("%NS%",this.cssVarNamespace)),i||r&$t.DashCase?n.style.removeProperty(t):n.style[t]=""}setProperty(n,t,r){n!=null&&(n[t]=r)}setValue(n,t){n.nodeValue=t}listen(n,t,r,i){if(typeof n=="string"&&(n=Ct().getGlobalEventTarget(this.doc,n),!n))throw new x(-5102,!1);let o=this.decoratePreventDefault(r);return this.tracingService?.wrapEventListener&&(o=this.tracingService.wrapEventListener(n,t,o)),this.eventManager.addEventListener(n,t,o,i)}decoratePreventDefault(n){return t=>{if(t==="__ngUnwrap__")return n;n(t)===!1&&t.preventDefault()}}};function ov(e){return e.tagName==="TEMPLATE"&&e.content!==void 0}var ll=class extends Mo{hostEl;sharedStylesHost;shadowRoot;constructor(n,t,r,i,o,a,s,l,c){super(n,i,o,s,l),this.hostEl=t,this.sharedStylesHost=c,this.shadowRoot=t.attachShadow({mode:"open"}),this.sharedStylesHost&&this.sharedStylesHost.addHost(this.shadowRoot);let d=r.styles;d=sv(r.id,d).map(p=>p.replace(/%NS%/g,l));for(let p of d){let m=document.createElement("style");a&&m.setAttribute("nonce",a),m.textContent=p,this.shadowRoot.appendChild(m)}let u=r.getExternalStyles?.();if(u)for(let p of u){let m=vf(p,i);a&&m.setAttribute("nonce",a),this.shadowRoot.appendChild(m)}}nodeOrShadowRoot(n){return n===this.hostEl?this.shadowRoot:n}appendChild(n,t){return super.appendChild(this.nodeOrShadowRoot(n),t)}insertBefore(n,t,r){return super.insertBefore(this.nodeOrShadowRoot(n),t,r)}removeChild(n,t){return super.removeChild(null,t)}parentNode(n){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(n)))}destroy(){this.sharedStylesHost&&this.sharedStylesHost.removeHost(this.shadowRoot)}},No=class extends Mo{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(n,t,r,i,o,a,s,l,c){super(n,o,a,s,l),this.sharedStylesHost=t,this.removeStylesOnCompDestroy=i;let d=r.styles,u=c?sv(c,d):d;this.styles=u.map(p=>p.replace(/%NS%/g,l)),this.styleUrls=r.getExternalStyles?.(c)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){this.removeStylesOnCompDestroy&&Fu.size===0&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}},cl=class extends No{contentAttr;hostAttr;constructor(n,t,r,i,o,a,s,l,c){let d=i+"-"+r.id;super(n,t,r,o,a,s,l,c,d),this.contentAttr=$S(d),this.hostAttr=GS(d)}applyToHost(n){this.applyStyles(),this.setAttribute(n,this.hostAttr,"")}createElement(n,t){let r=super.createElement(n,t);return super.setAttribute(r,this.contentAttr,""),r}};var ul=class e extends xo{supportsDOMEvents=!0;static makeCurrent(){ff(new e)}onAndCancel(n,t,r,i){return n.addEventListener(t,r,i),()=>{n.removeEventListener(t,r,i)}}dispatchEvent(n,t){n.dispatchEvent(t)}remove(n){n.remove()}createElement(n,t){return t=t||this.getDefaultDocument(),t.createElement(n)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(n){return n.nodeType===Node.ELEMENT_NODE}isShadowRoot(n){return n instanceof DocumentFragment}getGlobalEventTarget(n,t){return t==="window"?window:t==="document"?n:t==="body"?n.body:null}getBaseHref(n){let t=WS();return t==null?null:qS(t)}resetBaseElement(){To=null}getUserAgent(){return window.navigator.userAgent}getCookie(n){return So(document.cookie,n)}},To=null;function WS(){return To=To||document.head.querySelector("base"),To?To.getAttribute("href"):null}function qS(e){return new URL(e,document.baseURI).pathname}var lv=["alt","control","meta","shift"],YS={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},ZS={alt:e=>e.altKey,control:e=>e.ctrlKey,meta:e=>e.metaKey,shift:e=>e.shiftKey},cv=(()=>{class e extends Io{constructor(t){super(t)}supports(t){return e.parseEventName(t)!=null}addEventListener(t,r,i,o){let a=e.parseEventName(r),s=e.eventCallback(a.fullKey,i,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>Ct().onAndCancel(t,a.domEventName,s,o))}static parseEventName(t){let r=t.toLowerCase().split("."),i=r.shift();if(r.length===0||!(i==="keydown"||i==="keyup"))return null;let o=e._normalizeKey(r.pop()),a="",s=r.indexOf("code");if(s>-1&&(r.splice(s,1),a="code."),lv.forEach(c=>{let d=r.indexOf(c);d>-1&&(r.splice(d,1),a+=c+".")}),a+=o,r.length!=0||o.length===0)return null;let l={};return l.domEventName=i,l.fullKey=a,l}static matchEventFullKeyCode(t,r){let i=YS[t.key]||t.key,o="";return r.indexOf("code.")>-1&&(i=t.code,o="code."),i==null||!i?!1:(i=i.toLowerCase(),i===" "?i="space":i==="."&&(i="dot"),lv.forEach(a=>{if(a!==i){let s=ZS[a];s(t)&&(o+=a+".")}}),o+=i,o===r)}static eventCallback(t,r,i){return o=>{e.matchEventFullKeyCode(o,t)&&i.runGuarded(()=>r(o))}}static _normalizeKey(t){return t==="esc"?"escape":t}static \u0275fac=function(r){return new(r||e)(M(j))};static \u0275prov=V({token:e,factory:e.\u0275fac})}return e})();function Df(e,n,t){return St(this,null,function*(){let r=C({rootComponent:e},XS(n,t));return Zb(r)})}function XS(e,n){return{platformRef:n?.platformRef,appProviders:[...t0,...e?.providers??[]],platformProviders:e0}}function KS(){ul.makeCurrent()}function QS(){return new et}function JS(){return Su(document),document}var e0=[{provide:yr,useValue:hf},{provide:fs,useValue:KS,multi:!0},{provide:j,useFactory:JS}];var t0=[{provide:Xi,useValue:"root"},{provide:et,useFactory:QS},{provide:dl,useClass:sl,multi:!0},{provide:dl,useClass:cv,multi:!0},Cf,{provide:Ir,useClass:_f},{provide:_f,useExisting:Ir},yf,{provide:Ve,useExisting:Cf},[]];var gn=class e{headers;normalizedNames=new Map;lazyInit;lazyUpdate=null;constructor(n){n?typeof n=="string"?this.lazyInit=()=>{this.headers=new Map,n.split(`
`).forEach(t=>{let r=t.indexOf(":");if(r>0){let i=t.slice(0,r),o=t.slice(r+1).trim();this.addHeaderEntry(i,o)}})}:typeof Headers<"u"&&n instanceof Headers?(this.headers=new Map,n.forEach((t,r)=>{this.addHeaderEntry(r,t)})):this.lazyInit=()=>{this.headers=new Map,Object.entries(n).forEach(([t,r])=>{this.setHeaderEntries(t,r)})}:this.headers=new Map}has(n){return this.init(),this.headers.has(n.toLowerCase())}get(n){this.init();let t=this.headers.get(n.toLowerCase());return t&&t.length>0?t[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(n){return this.init(),this.headers.get(n.toLowerCase())||null}append(n,t){return this.clone({name:n,value:t,op:"a"})}set(n,t){return this.clone({name:n,value:t,op:"s"})}delete(n,t){return this.clone({name:n,value:t,op:"d"})}maybeSetNormalizedName(n,t){this.normalizedNames.has(t)||this.normalizedNames.set(t,n)}init(){this.lazyInit&&(this.lazyInit instanceof e?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(n=>this.applyUpdate(n)),this.lazyUpdate=null))}copyFrom(n){n.init();for(let[t,r]of n.headers.entries())this.headers.set(t,r),this.normalizedNames.set(t,n.normalizedNames.get(t))}clone(n){let t=new e;return t.lazyInit=this.lazyInit&&this.lazyInit instanceof e?this.lazyInit:this,t.lazyUpdate=(this.lazyUpdate||[]).concat([n]),t}applyUpdate(n){let t=n.name.toLowerCase();switch(n.op){case"a":case"s":let r=n.value;if(typeof r=="string"&&(r=[r]),r.length===0)return;this.maybeSetNormalizedName(n.name,t);let i=n.op==="a"?(this.headers.get(t)||[]).slice():[];i.push(...r),this.headers.set(t,i);break;case"d":let o=n.value;if(o===void 0)this.headers.delete(t),this.normalizedNames.delete(t);else{let a=Array.isArray(o)?o:[o],s=this.headers.get(t);if(!s)return;s=s.filter(l=>a.indexOf(l)===-1),s.length===0?(this.headers.delete(t),this.normalizedNames.delete(t)):this.headers.set(t,s)}break}}addHeaderEntry(n,t){let r=n.toLowerCase();this.maybeSetNormalizedName(n,r),this.headers.has(r)?this.headers.get(r).push(t):this.headers.set(r,[t])}setHeaderEntries(n,t){let r=(Array.isArray(t)?t:[t]).map(o=>o.toString()),i=n.toLowerCase();this.headers.set(i,r),this.maybeSetNormalizedName(n,i)}forEach(n){this.init(),Array.from(this.normalizedNames.keys()).forEach(t=>n(this.normalizedNames.get(t),this.headers.get(t)))}};var xf=class{map=new Map;set(n,t){return this.map.set(n,t),this}get(n){return this.map.has(n)||this.map.set(n,n.defaultValue()),this.map.get(n)}delete(n){return this.map.delete(n),this}has(n){return this.map.has(n)}keys(){return this.map.keys()}},Sf=class{encodeKey(n){return dv(n)}encodeValue(n){return dv(n)}decodeKey(n){return decodeURIComponent(n)}decodeValue(n){return decodeURIComponent(n)}};function r0(e,n){let t=new Map;return e.length>0&&e.replace(/^\?/,"").split("&").forEach(i=>{let o=i.indexOf("="),[a,s]=o==-1?[n.decodeKey(i),""]:[n.decodeKey(i.slice(0,o)),n.decodeValue(i.slice(o+1))],l=t.get(a)||[];l.push(s),t.set(a,l)}),t}var i0=/[&+#]/g;function dv(e){return encodeURI(e).replace(i0,encodeURIComponent)}function fl(e){return`${e}`}var hn=class e{map;encoder;updates=null;cloneFrom=null;constructor(n={}){if(this.encoder=n.encoder||new Sf,n.fromString){if(n.fromObject)throw new x(2805,!1);this.map=r0(n.fromString,this.encoder)}else n.fromObject?(this.map=new Map,Object.keys(n.fromObject).forEach(t=>{let r=n.fromObject[t],i=Array.isArray(r)?r.map(fl):[fl(r)];i.length>0&&this.map.set(t,i)})):this.map=null}has(n){return this.init(),this.map.has(n)}get(n){this.init();let t=this.map.get(n);return t?t[0]:null}getAll(n){return this.init(),this.map.get(n)||null}keys(){return this.init(),Array.from(this.map.keys())}append(n,t){return this.clone({param:n,value:t,op:"a"})}appendAll(n){let t=[];return Object.keys(n).forEach(r=>{let i=n[r];Array.isArray(i)?i.forEach(o=>{t.push({param:r,value:o,op:"a"})}):t.push({param:r,value:i,op:"a"})}),this.clone(t)}set(n,t){return this.clone({param:n,value:t,op:"s"})}delete(n,t){return this.clone({param:n,value:t,op:"d"})}toString(){return this.init(),this.keys().map(n=>{let t=this.encoder.encodeKey(n);return this.map.get(n).map(r=>t+"="+this.encoder.encodeValue(r)).join("&")}).filter(n=>n!=="").join("&")}clone(n){let t=new e({encoder:this.encoder});return t.cloneFrom=this.cloneFrom||this,t.updates=(this.updates||[]).concat(n),t}init(){if(this.map===null&&(this.map=new Map),this.cloneFrom!==null){this.cloneFrom.init();for(let[n,t]of this.cloneFrom.map.entries())this.map.set(n,t);this.updates.forEach(n=>{switch(n.op){case"a":case"s":let t=n.op==="a"?(this.map.get(n.param)||[]).slice():[];t.push(fl(n.value)),this.map.set(n.param,t);break;case"d":if(n.value!==void 0){let r=(this.map.get(n.param)||[]).slice(),i=r.indexOf(fl(n.value));i!==-1&&r.splice(i,1),r.length>0?this.map.set(n.param,r):this.map.delete(n.param)}else{this.map.delete(n.param);break}}}),this.cloneFrom=this.updates=null}}};function o0(e){switch(e){case"DELETE":case"GET":case"HEAD":case"OPTIONS":case"JSONP":return!1;default:return!0}}function uv(e){return typeof ArrayBuffer<"u"&&e instanceof ArrayBuffer}function fv(e){return typeof Blob<"u"&&e instanceof Blob}function mv(e){return typeof FormData<"u"&&e instanceof FormData}function a0(e){return typeof URLSearchParams<"u"&&e instanceof URLSearchParams}var Ef="Content-Type",pv="Accept",bv="text/plain",vv="application/json",s0=`${vv}, ${bv}, */*`,Di=class e{url;body=null;headers;context;reportProgress=!1;reportUploadProgress=!1;reportDownloadProgress=!1;withCredentials=!1;credentials;keepalive=!1;cache;priority;mode;redirect;referrer;integrity;referrerPolicy;responseType="json";method;params;urlWithParams;transferCache;timeout;constructor(n,t,r,i){this.url=t,this.method=n.toUpperCase();let o;if(o0(this.method)||i?(this.body=r!==void 0?r:null,o=i):o=r,o){if(this.reportProgress=!!o.reportProgress,this.reportUploadProgress=!!o.reportUploadProgress,this.reportDownloadProgress=!!o.reportDownloadProgress,this.withCredentials=!!o.withCredentials,this.keepalive=!!o.keepalive,o.responseType&&(this.responseType=o.responseType),o.headers&&(this.headers=o.headers),o.context&&(this.context=o.context),o.params&&(this.params=o.params),o.priority&&(this.priority=o.priority),o.cache&&(this.cache=o.cache),o.credentials&&(this.credentials=o.credentials),typeof o.timeout=="number"){if(o.timeout<1||!Number.isInteger(o.timeout))throw new x(2822,"");this.timeout=o.timeout}o.mode&&(this.mode=o.mode),o.redirect&&(this.redirect=o.redirect),o.integrity&&(this.integrity=o.integrity),o.referrer!==void 0&&(this.referrer=o.referrer),o.referrerPolicy&&(this.referrerPolicy=o.referrerPolicy),this.transferCache=o.transferCache}if(this.headers??=new gn,this.context??=new xf,!this.params)this.params=new hn,this.urlWithParams=t;else{let a=this.params.toString();if(a.length===0)this.urlWithParams=t;else{let s=t,l="",c=t.indexOf("#");c!==-1&&(l=t.substring(c),s=t.substring(0,c));let d=s.indexOf("?"),u=d===-1?"?":d<s.length-1?"&":"";this.urlWithParams=s+u+a+l}}}serializeBody(){return this.body===null?null:typeof this.body=="string"||uv(this.body)||fv(this.body)||mv(this.body)||a0(this.body)?this.body:this.body instanceof hn?this.body.toString():typeof this.body=="object"||typeof this.body=="boolean"||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return this.body===null||mv(this.body)?null:fv(this.body)?this.body.type||null:uv(this.body)?null:typeof this.body=="string"?bv:this.body instanceof hn?"application/x-www-form-urlencoded;charset=UTF-8":typeof this.body=="object"||typeof this.body=="number"||typeof this.body=="boolean"?vv:null}clone(n={}){let t=n.method||this.method,r=n.url||this.url,i=n.responseType||this.responseType,o=n.keepalive??this.keepalive,a=n.priority||this.priority,s=n.cache||this.cache,l=n.mode||this.mode,c=n.redirect||this.redirect,d=n.credentials||this.credentials,u=n.referrer??this.referrer,p=n.integrity||this.integrity,m=n.referrerPolicy||this.referrerPolicy,h=n.transferCache??this.transferCache,w=n.timeout??this.timeout,E=n.body!==void 0?n.body:this.body,R=n.withCredentials??this.withCredentials,U=n.reportProgress??this.reportProgress,at=n.reportUploadProgress??this.reportUploadProgress,zn=n.reportDownloadProgress??this.reportDownloadProgress,Ft=n.headers||this.headers,Un=n.params||this.params,$n=n.context??this.context;return n.setHeaders!==void 0&&(Ft=Object.keys(n.setHeaders).reduce((yn,Pt)=>yn.set(Pt,n.setHeaders[Pt]),Ft)),n.setParams&&(Un=Object.keys(n.setParams).reduce((yn,Pt)=>yn.set(Pt,n.setParams[Pt]),Un)),new e(t,r,E,{params:Un,headers:Ft,context:$n,reportProgress:U,reportUploadProgress:at,reportDownloadProgress:zn,responseType:i,withCredentials:R,transferCache:h,keepalive:o,cache:s,priority:a,timeout:w,mode:l,redirect:c,credentials:d,referrer:u,integrity:p,referrerPolicy:m})}},kr=(function(e){return e[e.Sent=0]="Sent",e[e.UploadProgress=1]="UploadProgress",e[e.ResponseHeader=2]="ResponseHeader",e[e.DownloadProgress=3]="DownloadProgress",e[e.Response=4]="Response",e[e.User=5]="User",e})(kr||{}),Ao=class{headers;status;statusText;url;ok;type;redirected;responseType;constructor(n,t=200,r="OK"){this.headers=n.headers||new gn,this.status=n.status!==void 0?n.status:t,this.statusText=n.statusText||r,this.url=n.url||null,this.redirected=n.redirected,this.responseType=n.responseType,this.ok=this.status>=200&&this.status<300}},If=class e extends Ao{constructor(n={}){super(n)}type=kr.ResponseHeader;clone(n={}){return new e({headers:n.headers||this.headers,status:n.status!==void 0?n.status:this.status,statusText:n.statusText||this.statusText,url:n.url||this.url||void 0})}},ko=class e extends Ao{body;constructor(n={}){super(n),this.body=n.body!==void 0?n.body:null}type=kr.Response;clone(n={}){return new e({body:n.body!==void 0?n.body:this.body,headers:n.headers||this.headers,status:n.status!==void 0?n.status:this.status,statusText:n.statusText||this.statusText,url:n.url||this.url||void 0,redirected:n.redirected??this.redirected,responseType:n.responseType??this.responseType})}},Ar=class extends Ao{name="HttpErrorResponse";message;error;ok=!1;constructor(n){super(n,0,"Unknown Error"),this.status>=200&&this.status<300?this.message=`Http failure during parsing for ${n.url||"(unknown url)"}`:this.message=`Http failure response for ${n.url||"(unknown url)"}: ${n.status} ${n.statusText}`,this.error=n.error||null}},l0=200;var c0=/^\)\]\}',?\n/,yz=1024*1024,d0=new y("",{factory:()=>null}),u0=(()=>{class e{fetchImpl=f(Mf,{optional:!0})?.fetch??((...t)=>globalThis.fetch(...t));ngZone=f(A);destroyRef=f(qe);maxResponseSize=f(d0);handle(t){return new W(r=>{let i=new AbortController,o=!1,a={next:l=>{l.type===kr.Response&&(o=!0),r.next(l)},error:l=>{o=!0,r.error(l)},complete:()=>{o=!0,r.complete()}};this.doRequest(t,i.signal,a).then(Nf,l=>a.error(new Ar({error:l})));let s;return t.timeout&&(s=this.ngZone.runOutsideAngular(()=>setTimeout(()=>{i.signal.aborted||i.abort(new DOMException("signal timed out","TimeoutError"))},t.timeout))),()=>{s!==void 0&&clearTimeout(s),!o&&!i.signal.aborted&&i.abort()}})}doRequest(t,r,i){return St(this,null,function*(){let o=this.createRequestInit(t),a;try{let E=this.ngZone.runOutsideAngular(()=>this.fetchImpl(t.urlWithParams,C({signal:r},o)));f0(E),i.next({type:kr.Sent}),a=yield E}catch(E){i.error(new Ar({error:E,status:E.status??0,statusText:E.statusText,url:t.urlWithParams,headers:E.headers}));return}let s=new gn(a.headers),l=a.statusText,c=a.url||t.urlWithParams,d=a.status,u=null,p=t.reportProgress||t.reportDownloadProgress;if(p&&i.next(new If({headers:s,status:d,statusText:l,url:c})),a.body){let E=a.headers.get(Ef)??"",R=a.headers.get("content-length"),U=R!==null?Number(R):NaN;this.maxResponseSize!==null&&Number.isFinite(U)&&U>this.maxResponseSize&&(yield a.body.cancel(),hv(this.maxResponseSize));let at=[],zn=a.body.getReader(),Ft=0,Un,$n,yn=typeof Zone<"u"&&Zone.current,Pt=!1;if(yield this.ngZone.runOutsideAngular(()=>St(this,null,function*(){for(;;){if(this.destroyRef.destroyed){yield zn.cancel(),Pt=!0;break}let{done:ne,value:v}=yield zn.read();if(ne)break;if(at.push(v),Ft+=v.length,this.maxResponseSize!==null&&Ft>this.maxResponseSize&&(yield zn.cancel(),hv(this.maxResponseSize)),p){$n=t.responseType==="text"?($n??"")+(Un??=gv(E)).decode(v,{stream:!0}):void 0;let re=()=>i.next({type:kr.DownloadProgress,total:Number.isFinite(U)?U:void 0,loaded:Ft,partialText:$n});yn?yn.run(re):re()}}})),Pt){i.complete();return}let O=this.concatChunks(at,Ft);try{u=this.parseBody(t,O,E,d)}catch(ne){i.error(new Ar({error:ne,headers:new gn(a.headers),status:a.status,statusText:a.statusText,url:a.url||t.urlWithParams}));return}}d===0&&(d=u?l0:0);let m=d>=200&&d<300,h=a.redirected,w=a.type;m?(i.next(new ko({body:u,headers:s,status:d,statusText:l,url:c,redirected:h,responseType:w})),i.complete()):i.error(new Ar({error:u,headers:s,status:d,statusText:l,url:c,redirected:h,responseType:w}))})}parseBody(t,r,i,o){switch(t.responseType){case"json":let a=new TextDecoder().decode(r).replace(c0,"");if(a==="")return null;try{return JSON.parse(a)}catch(s){if(o<200||o>=300)return a;throw s}case"text":return gv(i).decode(r);case"blob":return new Blob([r],{type:i});case"arraybuffer":return r.buffer}}createRequestInit(t){if(t.reportUploadProgress)throw new x(2824,!1);let r={},i;if(i=t.credentials,t.withCredentials&&(i="include"),t.headers.forEach((o,a)=>r[o]=a.join(",")),t.headers.has(pv)||(r[pv]=s0),!t.headers.has(Ef)){let o=t.detectContentTypeHeader();o!==null&&(r[Ef]=o)}return{body:t.serializeBody(),method:t.method,headers:r,credentials:i,keepalive:t.keepalive,cache:t.cache,priority:t.priority,mode:t.mode,redirect:t.redirect,referrer:t.referrer,integrity:t.integrity,referrerPolicy:t.referrerPolicy}}concatChunks(t,r){let i=new Uint8Array(r),o=0;for(let a of t)i.set(a,o),o+=a.length;return i}static \u0275fac=function(r){return new(r||e)};static \u0275prov=k({token:e,factory:e.\u0275fac})}return e})(),Mf=class{};function Nf(){}function f0(e){e.then(Nf,Nf)}function hv(e){throw new x(-2825,!1)}var m0=/charset=\s*["']?([^;"'\s]+)["']?/i;function gv(e){let n=e.match(m0);if(n!==null)try{return new TextDecoder(n[1])}catch(t){}return new TextDecoder}var p0=new y("",{factory:()=>!0}),h0="XSRF-TOKEN",g0=new y("",{factory:()=>h0}),b0="X-XSRF-TOKEN",v0=new y("",{factory:()=>b0}),y0=(()=>{class e{cookieName=f(g0);doc=f(j);lastCookieString="";lastToken=null;parseCount=0;getToken(){let t=this.doc.cookie||"";return t!==this.lastCookieString&&(this.parseCount++,this.lastToken=So(t,this.cookieName),this.lastCookieString=t),this.lastToken}static \u0275fac=function(r){return new(r||e)};static \u0275prov=k({token:e,factory:e.\u0275fac})}return e})(),_0=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275prov=V({token:e,factory:function(r){let i=null;return r?i=new(r||e):i=M(y0),i},providedIn:"root"})}return e})();function w0(e,n){if(!f(p0)||e.method==="GET"||e.method==="HEAD"||e.method==="QUERY")return n(e);try{let i=f(Ci).href,{origin:o}=new URL(i),{origin:a}=new URL(e.url,o);if(o!==a)return n(e)}catch(i){return n(e)}let t=f(_0).getToken(),r=f(v0);return t!=null&&!e.headers.has(r)&&(e=e.clone({headers:e.headers.set(r,t)})),n(e)}function C0(e,n){return n(e)}function D0(e,n,t){return(r,i)=>Qr(t,()=>n(r,o=>e(o,i)))}var E0=new y("",{factory:()=>[w0]}),yv=new y(""),x0=new y("",{factory:()=>!0});var S0=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275prov=V({token:e,factory:function(r){let i=null;return r?i=new(r||e):i=M(u0),i},providedIn:"root"})}return e})();var I0=(()=>{class e{backend;injector;chain=null;pendingTasks=f(oo);contributeToStability=f(x0);constructor(t,r){this.backend=t,this.injector=r}handle(t){if(this.chain===null){let i=this.injector.get(_v,null,{skipSelf:!0}),o=i!==null&&this.backend===i,a=this.injector.get(yv,[],o?{self:!0}:void 0),s=Array.from(new Set([...this.injector.get(E0),...a]));this.chain=s.reduceRight((l,c)=>D0(l,c,this.injector),C0)}let r=this.chain;if(this.contributeToStability){let i=this.pendingTasks.add();try{return pe(()=>r(t,o=>this.backend.handle(o))).pipe(Bi(i))}catch(o){throw i(),o}}else return pe(()=>r(t,i=>this.backend.handle(i)))}static \u0275fac=function(r){return new(r||e)(M(S0),M(Pe))};static \u0275prov=V({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),_v=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275prov=V({token:e,factory:function(r){let i=null;return r?i=new(r||e):i=M(I0),i},providedIn:"root"})}return e})();function ml(e,n){return C({body:n},e)}var Tf=(()=>{class e{handler;constructor(t){this.handler=t}request(t,r,i={}){let o;if(t instanceof Di)o=t;else{let l;i.headers instanceof gn?l=i.headers:l=new gn(i.headers);let c;i.params&&(i.params instanceof hn?c=i.params:c=new hn({fromObject:i.params})),o=new Di(t,r,i.body!==void 0?i.body:null,{headers:l,context:i.context,params:c,reportProgress:i.reportProgress,reportUploadProgress:i.reportUploadProgress,reportDownloadProgress:i.reportDownloadProgress,responseType:i.responseType||"json",withCredentials:i.withCredentials,transferCache:i.transferCache,keepalive:i.keepalive,priority:i.priority,cache:i.cache,mode:i.mode,redirect:i.redirect,credentials:i.credentials,referrer:i.referrer,referrerPolicy:i.referrerPolicy,integrity:i.integrity,timeout:i.timeout})}let a=st(o).pipe(xc(l=>this.handler.handle(l)));if(t instanceof Di||i.observe==="events")return a;let s=a.pipe(lt(l=>l instanceof ko));switch(i.observe||"body"){case"body":switch(o.responseType){case"arraybuffer":return s.pipe(he(l=>{if(l.body!==null&&!(l.body instanceof ArrayBuffer))throw new x(2806,!1);return l.body}));case"blob":return s.pipe(he(l=>{if(l.body!==null&&!(l.body instanceof Blob))throw new x(2807,!1);return l.body}));case"text":return s.pipe(he(l=>{if(l.body!==null&&typeof l.body!="string")throw new x(2808,!1);return l.body}));case"json":default:return s.pipe(he(l=>l.body))}case"response":return s;default:throw new x(2809,!1)}}delete(t,r={}){return this.request("DELETE",t,r)}get(t,r={}){return this.request("GET",t,r)}head(t,r={}){return this.request("HEAD",t,r)}jsonp(t,r){return this.request("JSONP",t,{params:new hn().append(r,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(t,r={}){return this.request("OPTIONS",t,r)}patch(t,r,i={}){return this.request("PATCH",t,ml(i,r))}post(t,r,i={}){return this.request("POST",t,ml(i,r))}query(t,r,i={}){return this.request("QUERY",t,ml(i,r))}put(t,r,i={}){return this.request("PUT",t,ml(i,r))}static \u0275fac=function(r){return new(r||e)(M(_v))};static \u0275prov=V({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var Af=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275prov=V({token:e,factory:function(r){let i=null;return r?i=new(r||e):i=M(N0),i},providedIn:"root"})}return e})(),N0=(()=>{class e extends Af{_doc=f(j);sanitize(t,r){if(r==null)return null;switch(t){case tt.NONE:return r;case tt.HTML:return Sr(r,"HTML")?kt(r):ku(this._doc,String(r)).toString();case tt.STYLE:return Sr(r,"Style")?kt(r):r;case tt.SCRIPT:if(Sr(r,"Script"))return kt(r);throw new x(5200,!1);case tt.URL:return Sr(r,"URL")?kt(r):Bs(String(r));case tt.RESOURCE_URL:if(Sr(r,"ResourceURL"))return kt(r);throw new x(-5201,!1);default:throw new x(5202,!1)}}bypassSecurityTrustHtml(t){return Iu(t)}bypassSecurityTrustStyle(t){return Mu(t)}bypassSecurityTrustScript(t){return Nu(t)}bypassSecurityTrustUrl(t){return Tu(t)}bypassSecurityTrustResourceUrl(t){return Au(t)}static \u0275fac=function(r){return new(r||e)};static \u0275prov=k({token:e,factory:e.\u0275fac})}return e})();var pl=new WeakMap,Dt=(()=>{class e{_appRef;_injector=f(Q);_environmentInjector=f(Pe);load(t){let r=this._appRef=this._appRef||this._injector.get(Ot),i=pl.get(r);i||(i={loaders:new Set,refs:[]},pl.set(r,i),r.onDestroy(()=>{pl.get(r)?.refs.forEach(o=>o.destroy()),pl.delete(r)})),i.loaders.has(t)||(i.loaders.add(t),i.refs.push(il(t,{environmentInjector:this._environmentInjector})))}static \u0275fac=function(r){return new(r||e)};static \u0275prov=k({token:e,factory:e.\u0275fac})}return e})();var hl;function A0(){if(hl===void 0&&(hl=null,typeof window<"u")){let e=window;if(e.trustedTypes!==void 0)try{hl=e.trustedTypes.createPolicy("angular#components",{createHTML:n=>n})}catch(n){console.error(n)}}return hl}function Ei(e){return A0()?.createHTML(e)||e}function wv(e){return Error(`Unable to find icon with the name "${e}"`)}function k0(){return Error("Could not find HttpClient for use with Angular Material icons. Please add provideHttpClient() to your providers.")}function Cv(e){return Error(`The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${e}".`)}function Dv(e){return Error(`The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${e}".`)}var bn=class{url;svgText;options;svgElement=null;constructor(n,t,r){this.url=n,this.svgText=t,this.options=r}},xv=(()=>{class e{_httpClient;_sanitizer;_errorHandler;_document;_svgIconConfigs=new Map;_iconSetConfigs=new Map;_cachedIconsByUrl=new Map;_inProgressUrlFetches=new Map;_fontCssClassesByAlias=new Map;_resolvers=[];_defaultFontSetClass;constructor(t,r,i,o){this._httpClient=t,this._sanitizer=r,this._errorHandler=o,this._document=i}addSvgIcon(t,r,i){return this.addSvgIconInNamespace("",t,r,i)}addSvgIconLiteral(t,r,i){return this.addSvgIconLiteralInNamespace("",t,r,i)}addSvgIconInNamespace(t,r,i,o){return this._addSvgIconConfig(t,r,new bn(i,null,o))}addSvgIconResolver(t){return this._resolvers.push(t),this}addSvgIconLiteralInNamespace(t,r,i,o){let a=this._sanitizer.sanitize(tt.HTML,i);if(!a)throw Dv(i);let s=Ei(a);return this._addSvgIconConfig(t,r,new bn("",s,o))}addSvgIconSet(t,r){return this.addSvgIconSetInNamespace("",t,r)}addSvgIconSetLiteral(t,r){return this.addSvgIconSetLiteralInNamespace("",t,r)}addSvgIconSetInNamespace(t,r,i){return this._addSvgIconSetConfig(t,new bn(r,null,i))}addSvgIconSetLiteralInNamespace(t,r,i){let o=this._sanitizer.sanitize(tt.HTML,r);if(!o)throw Dv(r);let a=Ei(o);return this._addSvgIconSetConfig(t,new bn("",a,i))}registerFontClassAlias(t,r=t){return this._fontCssClassesByAlias.set(t,r),this}classNameForFontAlias(t){return this._fontCssClassesByAlias.get(t)||t}setDefaultFontSetClass(...t){return this._defaultFontSetClass=t,this}getDefaultFontSetClass(){return this._defaultFontSetClass??=O0(this._document),this._defaultFontSetClass}getSvgIconFromUrl(t){let r=this._sanitizer.sanitize(tt.RESOURCE_URL,t);if(!r)throw Cv(t);let i=this._cachedIconsByUrl.get(r);return i?st(gl(i)):this._loadSvgIconFromConfig(new bn(t,null)).pipe(zi(o=>this._cachedIconsByUrl.set(r,o)),he(o=>gl(o)))}getNamedSvgIcon(t,r=""){let i=Ev(r,t),o=this._svgIconConfigs.get(i);if(o)return this._getSvgFromConfig(o);if(o=this._getIconConfigFromResolvers(r,t),o)return this._svgIconConfigs.set(i,o),this._getSvgFromConfig(o);let a=this._iconSetConfigs.get(r);return a?this._getSvgFromIconSetConfigs(t,a):Cc(wv(i))}ngOnDestroy(){this._resolvers=[],this._svgIconConfigs.clear(),this._iconSetConfigs.clear(),this._cachedIconsByUrl.clear()}_getSvgFromConfig(t){return t.svgText?st(gl(this._svgElementFromConfig(t))):this._loadSvgIconFromConfig(t).pipe(he(r=>gl(r)))}_getSvgFromIconSetConfigs(t,r){let i=this._extractIconWithNameFromAnySet(t,r);if(i)return st(i);let o=r.filter(a=>!a.svgText).map(a=>this._loadSvgIconSetFromConfig(a).pipe(Oa(s=>{let c=`Loading icon set URL: ${this._sanitizer.sanitize(tt.RESOURCE_URL,a.url)} failed: ${s.message}`;return this._errorHandler.handleError(new Error(c)),st(null)})));return ji(o).pipe(he(()=>{let a=this._extractIconWithNameFromAnySet(t,r);if(!a)throw wv(t);return a}))}_extractIconWithNameFromAnySet(t,r){for(let i=r.length-1;i>=0;i--){let o=r[i];if(o.svgText&&o.svgText.toString().indexOf(t)>-1){let a=this._svgElementFromConfig(o),s=this._extractSvgIconFromSet(a,t,o.options);if(s)return s}}return null}_loadSvgIconFromConfig(t){return this._fetchIcon(t).pipe(zi(r=>t.svgText=r),he(()=>this._svgElementFromConfig(t)))}_loadSvgIconSetFromConfig(t){return t.svgText?st(null):this._fetchIcon(t).pipe(zi(r=>t.svgText=r))}_extractSvgIconFromSet(t,r,i){let o=t.querySelector(`[id="${r}"]`);if(!o)return null;let a=o.cloneNode(!0);if(a.removeAttribute("id"),a.nodeName.toLowerCase()==="svg")return this._setSvgAttributes(a,i);if(a.nodeName.toLowerCase()==="symbol")return this._setSvgAttributes(this._toSvgElement(a),i);let s=this._svgElementFromString(Ei("<svg></svg>"));return s.appendChild(a),this._setSvgAttributes(s,i)}_svgElementFromString(t){let r=this._document.createElement("DIV");r.innerHTML=t;let i=r.querySelector("svg");if(!i)throw Error("<svg> tag not found");return i}_toSvgElement(t){let r=this._svgElementFromString(Ei("<svg></svg>")),i=t.attributes;for(let o=0;o<i.length;o++){let{name:a,value:s}=i[o],l=a.toLowerCase();l!=="id"&&!l.startsWith("on")&&r.setAttribute(a,s)}for(let o=0;o<t.childNodes.length;o++)t.childNodes[o].nodeType===this._document.ELEMENT_NODE&&r.appendChild(t.childNodes[o].cloneNode(!0));return r}_setSvgAttributes(t,r){return t.setAttribute("fit",""),t.setAttribute("height","100%"),t.setAttribute("width","100%"),t.setAttribute("preserveAspectRatio","xMidYMid meet"),t.setAttribute("focusable","false"),r&&r.viewBox&&t.setAttribute("viewBox",r.viewBox),t}_fetchIcon(t){let{url:r,options:i}=t,o=i?.withCredentials??!1;if(!this._httpClient)throw k0();if(r==null)throw Error(`Cannot fetch icon from URL "${r}".`);let a=this._sanitizer.sanitize(tt.RESOURCE_URL,r);if(!a)throw Cv(r);let s=this._inProgressUrlFetches.get(a);if(s)return s;let l=this._httpClient.get(a,{responseType:"text",withCredentials:o}).pipe(he(c=>Ei(c)),Bi(()=>this._inProgressUrlFetches.delete(a)),Hi());return this._inProgressUrlFetches.set(a,l),l}_addSvgIconConfig(t,r,i){return this._svgIconConfigs.set(Ev(t,r),i),this}_addSvgIconSetConfig(t,r){let i=this._iconSetConfigs.get(t);return i?i.push(r):this._iconSetConfigs.set(t,[r]),this}_svgElementFromConfig(t){if(!t.svgElement){let r=this._svgElementFromString(t.svgText);this._setSvgAttributes(r,t.options),t.svgElement=r}return t.svgElement}_getIconConfigFromResolvers(t,r){for(let i=0;i<this._resolvers.length;i++){let o=this._resolvers[i](r,t);if(o)return R0(o)?new bn(o.url,null,o.options):new bn(o,null)}}static \u0275fac=function(r){return new(r||e)(M(Tf,8),M(Af),M(j,8),M(et))};static \u0275prov=V({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function gl(e){return e.cloneNode(!0)}function Ev(e,n){return e+":"+n}function R0(e){return!!(e.url&&e.options)}function O0(e){let n=null,t=!1;return e.fonts&&typeof e.fonts.forEach=="function"&&e.fonts.forEach(r=>{let i=r.family.replace(/['"]/g,"").trim().toLowerCase();(i==="material icons"||i.startsWith("material icons "))&&(t=!0),i.startsWith("material symbols rounded")?n="rounded":i.startsWith("material symbols sharp")?n="sharp":i.startsWith("material symbols")&&(n="outlined")}),[n&&!t?`material-symbols-${n}`:"material-icons","mat-ligature-font"]}var F0=new y("cdk-dir-doc",{providedIn:"root",factory:()=>f(j)}),P0=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;function Sv(e){let n=e?.toLowerCase()||"";return n==="auto"&&typeof navigator<"u"&&navigator?.language?P0.test(navigator.language)?"rtl":"ltr":n==="rtl"?"rtl":"ltr"}var Ro=(()=>{class e{get value(){return this.valueSignal()}valueSignal=te("ltr");change=new ge;constructor(){let t=f(F0,{optional:!0});if(t){let r=t.body?t.body.dir:null,i=t.documentElement?t.documentElement.dir:null;this.valueSignal.set(Sv(r||i||"ltr"))}}ngOnDestroy(){this.change.complete()}static \u0275fac=function(r){return new(r||e)};static \u0275prov=k({token:e,factory:e.\u0275fac})}return e})();var nt=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=ee({type:e});static \u0275inj=K({})}return e})();var kf=new y("MAT_ICON_DEFAULT_OPTIONS"),L0=new y("mat-icon-location",{providedIn:"root",factory:()=>{let e=f(j),n=e?e.location:null;return{getPathname:()=>n?n.pathname+n.search:""}}}),Iv=["clip-path","color-profile","src","cursor","fill","filter","marker","marker-start","marker-mid","marker-end","mask","stroke"],V0=Iv.map(e=>`[${e}]`).join(", "),j0=/^url\(['"]?#(.*?)['"]?\)$/,bl=(()=>{class e{_elementRef=f(Z);_iconRegistry=f(xv);_location=f(L0);_errorHandler=f(et);_defaultColor;get color(){return this._color||this._defaultColor}set color(t){this._color=t}_color;inline=!1;get svgIcon(){return this._svgIcon}set svgIcon(t){t!==this._svgIcon&&(t?this._updateSvgIcon(t):this._svgIcon&&this._clearSvgElement(),this._svgIcon=t)}_svgIcon;get fontSet(){return this._fontSet}set fontSet(t){let r=this._cleanupFontValue(t);r!==this._fontSet&&(this._fontSet=r,this._updateFontIconClasses())}_fontSet;get fontIcon(){return this._fontIcon}set fontIcon(t){let r=this._cleanupFontValue(t);r!==this._fontIcon&&(this._fontIcon=r,this._updateFontIconClasses())}_fontIcon;_previousFontSetClass=[];_previousFontIconClass;_svgName=null;_svgNamespace=null;_previousPath;_elementsWithExternalReferences;_currentIconFetch=ue.EMPTY;constructor(){let t=f(new _i("aria-hidden"),{optional:!0}),r=f(kf,{optional:!0});r&&(r.color&&(this.color=this._defaultColor=r.color),r.fontSet&&(this.fontSet=r.fontSet)),t||this._elementRef.nativeElement.setAttribute("aria-hidden","true")}_splitIconName(t){if(!t)return["",""];let r=t.split(":");switch(r.length){case 1:return["",r[0]];case 2:return r;default:throw Error(`Invalid icon name: "${t}"`)}}ngOnInit(){this._updateFontIconClasses()}ngAfterViewChecked(){let t=this._elementsWithExternalReferences;if(t&&t.size){let r=this._location.getPathname();r!==this._previousPath&&(this._previousPath=r,this._prependPathToReferences(r))}}ngOnDestroy(){this._currentIconFetch.unsubscribe(),this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear()}_usingFontIcon(){return!this.svgIcon}_setSvgElement(t){this._clearSvgElement();let r=this._location.getPathname();this._previousPath=r,this._cacheChildrenWithExternalReferences(t),this._prependPathToReferences(r),this._elementRef.nativeElement.appendChild(t)}_clearSvgElement(){let t=this._elementRef.nativeElement,r=t.childNodes.length;for(this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear();r--;){let i=t.childNodes[r];(i.nodeType!==1||i.nodeName.toLowerCase()==="svg")&&i.remove()}}_updateFontIconClasses(){if(!this._usingFontIcon())return;let t=this._elementRef.nativeElement,r=(this.fontSet?this._iconRegistry.classNameForFontAlias(this.fontSet).split(/ +/):this._iconRegistry.getDefaultFontSetClass()).filter(i=>i.length>0);this._previousFontSetClass.forEach(i=>t.classList.remove(i)),r.forEach(i=>t.classList.add(i)),this._previousFontSetClass=r,this.fontIcon!==this._previousFontIconClass&&!r.includes("mat-ligature-font")&&(this._previousFontIconClass&&t.classList.remove(this._previousFontIconClass),this.fontIcon&&t.classList.add(this.fontIcon),this._previousFontIconClass=this.fontIcon)}_cleanupFontValue(t){return typeof t=="string"?t.trim().split(" ")[0]:t}_prependPathToReferences(t){let r=this._elementsWithExternalReferences,i=t.startsWith("//")?`/.${t}`:t;r&&r.forEach((o,a)=>{o.forEach(s=>{a.setAttribute(s.name,`url('${i}#${s.value}')`)})})}_cacheChildrenWithExternalReferences(t){let r=t.querySelectorAll(V0),i=this._elementsWithExternalReferences=this._elementsWithExternalReferences||new Map;for(let o=0;o<r.length;o++)Iv.forEach(a=>{let s=r[o],l=s.getAttribute(a),c=l?l.match(j0):null;if(c){let d=i.get(s);d||(d=[],i.set(s,d)),d.push({name:a,value:c[1]})}})}_updateSvgIcon(t){if(this._svgNamespace=null,this._svgName=null,this._currentIconFetch.unsubscribe(),t){let[r,i]=this._splitIconName(t);r&&(this._svgNamespace=r),i&&(this._svgName=i),this._currentIconFetch=this._iconRegistry.getNamedSvgIcon(i,r).pipe(Sc(1)).subscribe(o=>this._setSvgElement(o),o=>{let a=`Error retrieving icon ${r}:${i}! ${o.message}`;this._errorHandler.handleError(new Error(a))})}}static \u0275fac=function(r){return new(r||e)};static \u0275cmp=(function(){return X({type:e,selectors:[["mat-icon"]],hostAttrs:["role","img",1,"mat-icon","notranslate"],hostVars:10,hostBindings:function(i,o){i&2&&(je("data-mat-icon-type",o._usingFontIcon()?"font":"svg")("data-mat-icon-name",o._svgName||o.fontIcon)("data-mat-icon-namespace",o._svgNamespace||o.fontSet)("fontIcon",o._usingFontIcon()?o.fontIcon:null),Tr(o.color?"mat-"+o.color:""),$("mat-icon-inline",o.inline)("mat-icon-no-color",o.color!=="primary"&&o.color!=="accent"&&o.color!=="warn"))},inputs:{color:"color",inline:[2,"inline","inline",xe],svgIcon:"svgIcon",fontSet:"fontSet",fontIcon:"fontIcon"},exportAs:["matIcon"],ngContentSelectors:["*"],decls:1,vars:0,template:function(i,o){i&1&&(Qe(),ae(0))},styles:[`mat-icon, mat-icon.mat-primary, mat-icon.mat-accent, mat-icon.mat-warn {
  color: var(--%NS%mat-icon-color, inherit);
}

.mat-icon {
  -webkit-user-select: none;
  user-select: none;
  background-repeat: no-repeat;
  display: inline-block;
  fill: currentColor;
  height: 24px;
  width: 24px;
  overflow: hidden;
}
.mat-icon.mat-icon-inline {
  font-size: inherit;
  height: inherit;
  line-height: inherit;
  width: inherit;
}
.mat-icon.mat-ligature-font[fontIcon]::before {
  content: attr(fontIcon);
}

[dir=rtl] .mat-icon-rtl-mirror {
  transform: scale(-1, 1);
}

.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon {
  display: block;
}
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon {
  margin: auto;
}
`],encapsulation:2})})()}return e})(),vl=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=ee({type:e});static \u0275inj=K({imports:[nt]})}return e})();var Rf={providers:[{provide:kf,useValue:{fontSet:"material-symbols-outlined"}}]};var Fv=(()=>{class e{_renderer;_elementRef;onChange=t=>{};onTouched=()=>{};constructor(t,r){this._renderer=t,this._elementRef=r}setProperty(t,r){this._renderer.setProperty(this._elementRef.nativeElement,t,r)}registerOnTouched(t){this.onTouched=t}registerOnChange(t){this.onChange=t}setDisabledState(t){this.setProperty("disabled",t)}static \u0275fac=function(r){return new(r||e)(le(ze),le(Z))};static \u0275dir=q({type:e})}return e})(),B0=(()=>{class e extends Fv{static \u0275fac=(()=>{let t;return function(i){return(t||(t=xr(e)))(i||e)}})();static \u0275dir=q({type:e,features:[Ke]})}return e})(),Yt=new y("");var H0={provide:Yt,useExisting:Le(()=>Pv),multi:!0};function z0(){let e=Ct()?Ct().getUserAgent():"";return/android (\d+)/.test(e.toLowerCase())}var U0=new y(""),Pv=(()=>{class e extends Fv{_compositionMode;_composing=!1;constructor(t,r,i){super(t,r),this._compositionMode=i,this._compositionMode==null&&(this._compositionMode=!z0())}writeValue(t){let r=t??"";this.setProperty("value",r)}_handleInput(t){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(t)}_compositionStart(){this._composing=!0}_compositionEnd(t){this._composing=!1,this._compositionMode&&this.onChange(t)}static \u0275fac=function(r){return new(r||e)(le(ze),le(Z),le(U0,8))};static \u0275dir=q({type:e,selectors:[["input","formControlName","",3,"type","checkbox",3,"ngNoCva",""],["textarea","formControlName","",3,"ngNoCva",""],["input","formControl","",3,"type","checkbox",3,"ngNoCva",""],["textarea","formControl","",3,"ngNoCva",""],["input","ngModel","",3,"type","checkbox",3,"ngNoCva",""],["textarea","ngModel","",3,"ngNoCva",""],["","ngDefaultControl",""]],hostBindings:function(r,i){r&1&&me("input",function(a){return i._handleInput(a.target.value)})("blur",function(){return i.onTouched()})("compositionstart",function(){return i._compositionStart()})("compositionend",function(a){return i._compositionEnd(a.target.value)})},standalone:!1,features:[Ne([H0]),Ke]})}return e})();function Pf(e){return e==null||Lf(e)===0}function Lf(e){return e==null?null:Array.isArray(e)||typeof e=="string"?e.length:e instanceof Set?e.size:null}var Mi=new y(""),Vf=new y(""),$0=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,jo=class{static min(n){return G0(n)}static max(n){return W0(n)}static required(n){return Lv(n)}static requiredTrue(n){return q0(n)}static email(n){return Y0(n)}static minLength(n){return Z0(n)}static maxLength(n){return X0(n)}static pattern(n){return K0(n)}static nullValidator(n){return _l()}static compose(n){return Uv(n)}static composeAsync(n){return $v(n)}};function G0(e){return n=>{if(n.value==null||e==null)return null;let t=parseFloat(n.value);return!isNaN(t)&&t<e?{min:{min:e,actual:n.value}}:null}}function W0(e){return n=>{if(n.value==null||e==null)return null;let t=parseFloat(n.value);return!isNaN(t)&&t>e?{max:{max:e,actual:n.value}}:null}}function Lv(e){return Pf(e.value)?{required:!0}:null}function q0(e){return e.value===!0?null:{required:!0}}function Y0(e){return Pf(e.value)||$0.test(e.value)?null:{email:!0}}function Z0(e){return n=>{let t=n.value?.length??Lf(n.value);return t===null||t===0?null:t<e?{minlength:{requiredLength:e,actualLength:t}}:null}}function X0(e){return n=>{let t=n.value?.length??Lf(n.value);return t!==null&&t>e?{maxlength:{requiredLength:e,actualLength:t}}:null}}function K0(e){if(!e)return _l;let n,t;return typeof e=="string"?(t="",e.charAt(0)!=="^"&&(t+="^"),t+=e,e.charAt(e.length-1)!=="$"&&(t+="$"),n=new RegExp(t)):(t=e.toString(),n=e),r=>{if(Pf(r.value))return null;let i=r.value;return n.test(i)?null:{pattern:{requiredPattern:t,actualValue:i}}}}function _l(e){return null}function Vv(e){return e!=null}function jv(e){return Mr(e)?Kt(e):e}function Bv(e){let n={};return e.forEach(t=>{n=t!=null?C(C({},n),t):n}),Object.keys(n).length===0?null:n}function Hv(e,n){return n.map(t=>t(e))}function Q0(e){return!e.validate}function zv(e){return e.map(n=>Q0(n)?n:t=>n.validate(t))}function Uv(e){if(!e)return null;let n=e.filter(Vv);return n.length==0?null:function(t){return Bv(Hv(t,n))}}function jf(e){return e!=null?Uv(zv(e)):null}function $v(e){if(!e)return null;let n=e.filter(Vv);return n.length==0?null:function(t){let r=Hv(t,n).map(jv);return ji(r).pipe(he(Bv))}}function Bf(e){return e!=null?$v(zv(e)):null}function Nv(e,n){return e===null?[n]:Array.isArray(e)?[...e,n]:[e,n]}function Gv(e){return e._rawValidators}function Wv(e){return e._rawAsyncValidators}function Of(e){return e?Array.isArray(e)?e:[e]:[]}function wl(e,n){return Array.isArray(e)?e.includes(n):e===n}function Tv(e,n){let t=Of(n);return Of(e).forEach(i=>{wl(t,i)||t.push(i)}),t}function Av(e,n){return Of(n).filter(t=>!wl(e,t))}var Cl=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(n){this._rawValidators=n||[],this._composedValidatorFn=jf(this._rawValidators)}_setAsyncValidators(n){this._rawAsyncValidators=n||[],this._composedAsyncValidatorFn=Bf(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(n){this._onDestroyCallbacks.push(n)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(n=>n()),this._onDestroyCallbacks=[]}reset(n=void 0){this.control?.reset(n)}hasError(n,t){return this.control?this.control.hasError(n,t):!1}getError(n,t){return this.control?this.control.getError(n,t):null}},Vn=class extends Cl{name;get formDirective(){return null}get path(){return null}};var Oo="VALID",yl="INVALID",xi="PENDING",Fo="DISABLED",jn=class{},Dl=class extends jn{value;source;constructor(n,t){super(),this.value=n,this.source=t}},Lo=class extends jn{pristine;source;constructor(n,t){super(),this.pristine=n,this.source=t}},Vo=class extends jn{touched;source;constructor(n,t){super(),this.touched=n,this.source=t}},Si=class extends jn{status;source;constructor(n,t){super(),this.status=n,this.source=t}},El=class extends jn{source;constructor(n){super(),this.source=n}},Ii=class extends jn{source;constructor(n){super(),this.source=n}};function qv(e){return(Nl(e)?e.validators:e)||null}function J0(e){return Array.isArray(e)?jf(e):e||null}function Yv(e,n){return(Nl(n)?n.asyncValidators:e)||null}function eI(e){return Array.isArray(e)?Bf(e):e||null}function Nl(e){return e!=null&&!Array.isArray(e)&&typeof e=="object"}function tI(e,n,t){let r=e.controls;if(!(n?Object.keys(r):r).length)throw new x(1e3,"");if(!Zv(r,t))throw new x(1001,"")}function nI(e,n,t){e._forEachChild((r,i)=>{if(t[i]===void 0)throw new x(-1002,"")})}var rI=Symbol();var xl=class{_pendingDirty=!1;_hasOwnPendingAsyncValidator=null;_pendingTouched=!1;_onCollectionChange=()=>{};_updateOn;_hasRequired=te(!1);_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(n,t){this[rI]=!0,this._assignValidators(n),this._assignAsyncValidators(t)}get validator(){return this._composedValidatorFn}set validator(n){this._rawValidators=this._composedValidatorFn=n,this._updateHasRequiredValidator()}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(n){this._rawAsyncValidators=this._composedAsyncValidatorFn=n}get parent(){return this._parent}get status(){return pe(this.statusReactive)}set status(n){pe(()=>this.statusReactive.set(n))}_status=Ge(()=>this.statusReactive());statusReactive=te(void 0);get valid(){return this.status===Oo}get invalid(){return this.status===yl}get pending(){return this.status===xi}get disabled(){return this.status===Fo}get enabled(){return this.status!==Fo}get errors(){return pe(this.errorsReactive)}set errors(n){pe(()=>this.errorsReactive.set(n))}_errors=Ge(()=>this.errorsReactive());errorsReactive=te(null);get pristine(){return pe(this.pristineReactive)}set pristine(n){pe(()=>this.pristineReactive.set(n))}_pristine=Ge(()=>this.pristineReactive());pristineReactive=te(!0);get dirty(){return!this.pristine}get touched(){return pe(this.touchedReactive)}set touched(n){pe(()=>this.touchedReactive.set(n))}_touched=Ge(()=>this.touchedReactive());touchedReactive=te(!1);get untouched(){return!this.touched}_events=new L;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(n){this._assignValidators(n)}setAsyncValidators(n){this._assignAsyncValidators(n)}addValidators(n){this.setValidators(Tv(n,this._rawValidators))}addAsyncValidators(n){this.setAsyncValidators(Tv(n,this._rawAsyncValidators))}removeValidators(n){this.setValidators(Av(n,this._rawValidators))}removeAsyncValidators(n){this.setAsyncValidators(Av(n,this._rawAsyncValidators))}hasValidator(n){return wl(this._rawValidators,n)}hasAsyncValidator(n){return wl(this._rawAsyncValidators,n)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(n={}){let t=this.touched===!1;this.touched=!0;let r=n.sourceControl??this;n.onlySelf||this._parent?.markAsTouched(B(C({},n),{sourceControl:r})),t&&n.emitEvent!==!1&&this._events.next(new Vo(!0,r))}markAllAsDirty(n={}){this.markAsDirty({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:this}),this._forEachChild(t=>t.markAllAsDirty(n))}markAllAsTouched(n={}){this.markAsTouched({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:this}),this._forEachChild(t=>t.markAllAsTouched(n))}markAsUntouched(n={}){let t=this.touched===!0;this.touched=!1,this._pendingTouched=!1;let r=n.sourceControl??this;this._forEachChild(i=>{i.markAsUntouched({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:r})}),n.onlySelf||this._parent?._updateTouched(n,r),t&&n.emitEvent!==!1&&this._events.next(new Vo(!1,r))}markAsDirty(n={}){let t=this.pristine===!0;this.pristine=!1;let r=n.sourceControl??this;n.onlySelf||this._parent?.markAsDirty(B(C({},n),{sourceControl:r})),t&&n.emitEvent!==!1&&this._events.next(new Lo(!1,r))}markAsPristine(n={}){let t=this.pristine===!1;this.pristine=!0,this._pendingDirty=!1;let r=n.sourceControl??this;this._forEachChild(i=>{i.markAsPristine({onlySelf:!0,emitEvent:n.emitEvent})}),n.onlySelf||this._parent?._updatePristine(n,r),t&&n.emitEvent!==!1&&this._events.next(new Lo(!0,r))}markAsPending(n={}){this.status=xi;let t=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new Si(this.status,t)),this.statusChanges.emit(this.status)),n.onlySelf||this._parent?.markAsPending(B(C({},n),{sourceControl:t}))}disable(n={}){let t=this._parentMarkedDirty(n.onlySelf);this.status=Fo,this.errors=null,this._forEachChild(i=>{i.disable(B(C({},n),{onlySelf:!0}))}),this._updateValue();let r=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new Dl(this.value,r)),this._events.next(new Si(this.status,r)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(B(C({},n),{skipPristineCheck:t}),this),this._onDisabledChange.forEach(i=>i(!0))}enable(n={}){let t=this._parentMarkedDirty(n.onlySelf);this.status=Oo,this._forEachChild(r=>{r.enable(B(C({},n),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:n.emitEvent}),this._updateAncestors(B(C({},n),{skipPristineCheck:t}),this),this._onDisabledChange.forEach(r=>r(!1))}_updateAncestors(n,t){n.onlySelf||(this._parent?.updateValueAndValidity(n),n.skipPristineCheck||this._parent?._updatePristine({},t),this._parent?._updateTouched({},t))}setParent(n){this._parent=n}getRawValue(){return this.value}updateValueAndValidity(n={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let r=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===Oo||this.status===xi)&&this._runAsyncValidator(r,n.emitEvent)}let t=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new Dl(this.value,t)),this._events.next(new Si(this.status,t)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),n.onlySelf||this._parent?.updateValueAndValidity(B(C({},n),{sourceControl:t}))}_updateTreeValidity(n={emitEvent:!0}){this._forEachChild(t=>t._updateTreeValidity(n)),this.updateValueAndValidity({onlySelf:!0,emitEvent:n.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?Fo:Oo}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(n,t){if(this.asyncValidator){this.status=xi,this._hasOwnPendingAsyncValidator={emitEvent:t!==!1,shouldHaveEmitted:n!==!1};let r=jv(this.asyncValidator(this));this._asyncValidationSubscription=r.subscribe(i=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(i,{emitEvent:t,shouldHaveEmitted:n})})}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let n=(this._hasOwnPendingAsyncValidator?.emitEvent||this._hasOwnPendingAsyncValidator?.shouldHaveEmitted)??!1;return this._hasOwnPendingAsyncValidator=null,n}return!1}setErrors(n,t={}){this.errors=n,this._updateControlsErrors(t.emitEvent!==!1,this,t.shouldHaveEmitted)}get(n){let t=n;return t==null||(Array.isArray(t)||(t=t.split(".")),t.length===0)?null:t.reduce((r,i)=>r&&r._find(i),this)}getError(n,t){let r=t?this.get(t):this;return r?.errors?r.errors[n]:null}hasError(n,t){return!!this.getError(n,t)}get root(){let n=this;for(;n._parent;)n=n._parent;return n}_updateControlsErrors(n,t,r){this.status=this._calculateStatus(),n&&this.statusChanges.emit(this.status),(n||r)&&this._events.next(new Si(this.status,t)),this._parent&&this._parent._updateControlsErrors(n,t,r)}_initObservables(){this.valueChanges=new ge,this.statusChanges=new ge}_calculateStatus(){return this._allControlsDisabled()?Fo:this.errors?yl:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(xi)?xi:this._anyControlsHaveStatus(yl)?yl:Oo}_anyControlsHaveStatus(n){return this._anyControls(t=>t.status===n)}_anyControlsDirty(){return this._anyControls(n=>n.dirty)}_anyControlsTouched(){return this._anyControls(n=>n.touched)}_updatePristine(n,t){let r=!this._anyControlsDirty(),i=this.pristine!==r;this.pristine=r,n.onlySelf||this._parent?._updatePristine(n,t),i&&this._events.next(new Lo(this.pristine,t))}_updateTouched(n={},t){this.touched=this._anyControlsTouched(),this._events.next(new Vo(this.touched,t)),n.onlySelf||this._parent?._updateTouched(n,t)}_onDisabledChange=[];_registerOnCollectionChange(n){this._onCollectionChange=n}_setUpdateStrategy(n){Nl(n)&&n.updateOn!=null&&(this._updateOn=n.updateOn)}_parentMarkedDirty(n){return!n&&!!this._parent?.dirty&&!this._parent._anyControlsDirty()}_find(n){return null}_assignValidators(n){this._rawValidators=Array.isArray(n)?n.slice():n,this._composedValidatorFn=J0(this._rawValidators),this._updateHasRequiredValidator()}_assignAsyncValidators(n){this._rawAsyncValidators=Array.isArray(n)?n.slice():n,this._composedAsyncValidatorFn=eI(this._rawAsyncValidators)}_updateHasRequiredValidator(){pe(()=>this._hasRequired.set(this.hasValidator(jo.required)))}};function Zv(e,n){return Object.hasOwn(e,n)}function iI(e){return e.tagName==="INPUT"||e.tagName==="SELECT"||e.tagName==="TEXTAREA"}function oI(e,n,t,r){switch(t){case"name":e.setAttribute(n,t,r);break;case"disabled":case"readonly":case"required":r?e.setAttribute(n,t,""):e.removeAttribute(n,t);break;case"max":case"min":case"minLength":case"maxLength":r!==void 0?e.setAttribute(n,t,r.toString()):e.removeAttribute(n,t);break}}var Ff=class{kind;context;control;message;constructor({kind:n,context:t,control:r}){this.kind=n,this.context=t,this.control=r}},aI=new y(""),Tl=new y("",{factory:()=>Al}),Al="always";function sI(e,n){return[...n.path,e]}function lI(e,n,t=Al){kl(e,n),n.valueAccessor.writeValue(e.value),(e.disabled||t==="always")&&n.valueAccessor.setDisabledState?.(e.disabled),dI(e,n),fI(e,n),uI(e,n),cI(e,n)}function kv(e,n,t=!0){let r=()=>{};n?.valueAccessor?.registerOnChange(r),n?.valueAccessor?.registerOnTouched(r),Il(e,n),e&&(n._invokeOnDestroyCallbacks(),e._registerOnCollectionChange(()=>{}))}function Sl(e,n){e.forEach(t=>{t.registerOnValidatorChange&&t.registerOnValidatorChange(n)})}function cI(e,n){if(n.valueAccessor.setDisabledState){let t=r=>{n.valueAccessor.setDisabledState(r)};e.registerOnDisabledChange(t),n._registerOnDestroy(()=>{e._unregisterOnDisabledChange(t)})}}function kl(e,n){let t=Gv(e);n.validator!==null?e.setValidators(Nv(t,n.validator)):typeof t=="function"&&e.setValidators([t]);let r=Wv(e);n.asyncValidator!==null?e.setAsyncValidators(Nv(r,n.asyncValidator)):typeof r=="function"&&e.setAsyncValidators([r]);let i=()=>e.updateValueAndValidity();Sl(n._rawValidators,i),Sl(n._rawAsyncValidators,i)}function Il(e,n){let t=!1;if(e!==null){if(n.validator!==null){let i=Gv(e);if(Array.isArray(i)&&i.length>0){let o=i.filter(a=>a!==n.validator);o.length!==i.length&&(t=!0,e.setValidators(o))}}if(n.asyncValidator!==null){let i=Wv(e);if(Array.isArray(i)&&i.length>0){let o=i.filter(a=>a!==n.asyncValidator);o.length!==i.length&&(t=!0,e.setAsyncValidators(o))}}}let r=()=>{};return Sl(n._rawValidators,r),Sl(n._rawAsyncValidators,r),t}function dI(e,n){n.valueAccessor.registerOnChange(t=>{e._pendingValue=t,e._pendingChange=!0,e._pendingDirty=!0,e.updateOn==="change"&&Xv(e,n)})}function uI(e,n){n.valueAccessor.registerOnTouched(()=>{e._pendingTouched=!0,e.updateOn==="blur"&&e._pendingChange&&Xv(e,n),e.updateOn!=="submit"&&e.markAsTouched()})}function Xv(e,n){e._pendingDirty&&e.markAsDirty(),e.setValue(e._pendingValue,{emitModelToViewChange:!1}),n.viewToModelUpdate(e._pendingValue),e._pendingChange=!1}function fI(e,n){let t=(r,i)=>{n.valueAccessor.writeValue(r),i&&n.viewToModelUpdate(r)};e.registerOnChange(t),n._registerOnDestroy(()=>{e._unregisterOnChange(t)})}function Kv(e,n){e==null,kl(e,n)}function mI(e,n){return Il(e,n)}function pI(e,n){if(!Object.hasOwn(e,"model"))return!1;let t=e.model;return t.isFirstChange()?!0:!Object.is(n,t.currentValue)}function hI(e){return Object.getPrototypeOf(e.constructor)===B0}function Qv(e,n){e._syncPendingControls(),n.forEach(t=>{let r=t.control;r.updateOn==="submit"&&r._pendingChange&&(t.viewToModelUpdate(r._pendingValue),r._pendingChange=!1)})}function gI(e,n){if(!n)return null;Array.isArray(n);let t,r,i;return n.forEach(o=>{o.constructor===Pv?t=o:hI(o)?r=o:i=o}),i||r||t||null}function bI(e,n){let t=e.indexOf(n);t>-1&&e.splice(t,1)}var vI=(()=>{class e{_validator=_l;_onChange;get _enabled(){return this.enabledReactive()}enabledReactive=te(void 0);ngOnChanges(t){if(this.inputName in t){let r=this.normalizeInput(t[this.inputName].currentValue),i=this.enabled(r);this.enabledReactive.set(i),this._validator=i?this.createValidator(r):_l,this._onChange?.()}}validate(t){return this._validator(t)}registerOnValidatorChange(t){this._onChange=t}enabled(t){return t!=null}static \u0275fac=function(r){return new(r||e)};static \u0275dir=q({type:e,features:[dt]})}return e})();var yI={provide:Mi,useExisting:Le(()=>Jv),multi:!0};var Jv=(()=>{class e extends vI{required;inputName="required";normalizeInput=xe;createValidator=t=>Lv;enabled(t){return t}static \u0275fac=(()=>{let t;return function(i){return(t||(t=xr(e)))(i||e)}})();static \u0275dir=q({type:e,selectors:[["","required","","formControlName","",3,"type","checkbox"],["","required","","formControl","",3,"type","checkbox"],["","required","","ngModel","",3,"type","checkbox"]],hostVars:1,hostBindings:function(r,i){r&2&&je("required",i._enabled?"":null)},inputs:{required:"required"},standalone:!1,features:[Ne([yI]),Ke]})}return e})();var _I={provide:aI,useFactory:()=>{let e=f(Bn,{self:!0});return{setParseErrors:n=>{e.setParseErrorSource(n)},set onReset(n){e.onReset=n}}}},Bn=class extends Cl{_parent=null;name=null;valueAccessor=null;isCustomControlBased=!1;userOnReset;resetSubscription;set onReset(n){this.userOnReset=n,this.resetSubscription?.unsubscribe(),this.resetSubscription=void 0,this.control&&(this.resetSubscription=this.control.events.subscribe(t=>{t instanceof Ii&&this.control&&this.userOnReset?.(this.control.value)}),this.subscription?.add(this.resetSubscription))}isNativeFormElement=!1;rawValueAccessors;_selectedValueAccessor=null;get selectedValueAccessor(){return this._selectedValueAccessor??=gI(this,this.rawValueAccessors)}parseErrorsValidator=null;renderer;injector;requiredValidatorViaDi;subscription;customControlBindings=null;pendingCustomValue=void 0;hasPendingCustomValue=!1;constructor(n,t,r){super(),this.injector=n,this.renderer=t,this.rawValueAccessors=r,this.injector?.get(qe)?.onDestroy(()=>{this.removeParseErrorsValidator(this.control),this.subscription?.unsubscribe()})}setupCustomControl(){this.subscription?.unsubscribe();let n=this.control,t=this.injector?.get(Wt);if(!n||!t)return;kl(n,this);let r=t.markForCheck.bind(t);if(this.subscription=new ue,this.subscription.add(()=>this.discardPendingCustomValue(n)),typeof n.registerOnChange=="function"){let i=(o,a)=>{this.discardPendingCustomValue(n),a&&this.viewToModelUpdate(o),r()};n.registerOnChange(i),this.subscription.add(()=>n._unregisterOnChange(i))}this.subscription.add(n.valueChanges.subscribe(r)),this.subscription.add(n.statusChanges.subscribe(r)),this.resetSubscription?.unsubscribe(),this.resetSubscription=void 0,this.userOnReset&&(this.resetSubscription=n.events.subscribe(i=>{i instanceof Ii&&this.control&&this.userOnReset?.(this.control.value)}),this.subscription.add(this.resetSubscription)),this.parseErrorsValidator&&n.addValidators(this.parseErrorsValidator)}ngControlCreate(n){!n.nativeElement.hasAttribute?.("ngNoCva")&&(this.rawValueAccessors&&this.rawValueAccessors.length>0||this.valueAccessor!==null)||!n.customControl||(this.isCustomControlBased=!0,n.listenToCustomControlModel(i=>{let o=this.control;o&&(o._pendingValue=i,o._pendingChange=!0,o._pendingDirty=!0,this.pendingCustomValue=i,this.hasPendingCustomValue=!0,o.updateOn==="change"&&this.updateControlFromCustom(o))}),n.listenToCustomControlOutput("touch",()=>{let i=this.control;i&&(i._pendingTouched=!0,i.updateOn==="blur"&&i._pendingChange&&this.updateControlFromCustom(i),i.updateOn!=="submit"&&i.markAsTouched())}),this.customControlBindings={},this.isNativeFormElement=iI(n.nativeElement),this.requiredValidatorViaDi=this._rawValidators.find(i=>i instanceof Jv))}updateControlFromCustom(n){let t=n._pendingValue;n._pendingChange=!1,this.clearPendingCustomValue(),this.customControlBindings&&(this.customControlBindings.value=t),n._pendingDirty&&n.markAsDirty(),n.setValue(t,{emitModelToViewChange:!1}),this.viewToModelUpdate(n.value)}discardPendingCustomValue(n){this.hasPendingCustomValue&&(this.customControlBindings&&(this.customControlBindings.value=this.pendingCustomValue),this.clearPendingCustomValue(),n._pendingValue=n.value,n._pendingChange=!1,n._pendingDirty=!1)}clearPendingCustomValue(){this.pendingCustomValue=void 0,this.hasPendingCustomValue=!1}ngControlUpdate(n){if(!this.isCustomControlBased)return;let t=this.control,r=this.customControlBindings;if(!t||!r)return;this.hasPendingCustomValue&&!t._pendingChange&&(r.value=this.pendingCustomValue,this.clearPendingCustomValue()),t._status(),t._errors(),Object.is(r.value,t.value)||(this.discardPendingCustomValue(t),r.value=t.value,n.setCustomControlModelInput(t.value)),this.bindControlProperty(n,r,"touched",t.touched),this.bindControlProperty(n,r,"dirty",t.dirty),this.bindControlProperty(n,r,"valid",t.valid),this.bindControlProperty(n,r,"invalid",t.invalid),this.bindControlProperty(n,r,"pending",t.pending),this.bindControlProperty(n,r,"disabled",t.disabled);let i=this.requiredValidatorViaDi;if(i){let a=this.isRequired;n.setInputOnDirectives("required",a,(s,l)=>l!==i&&s!==a)}else this.bindControlProperty(n,r,"required",this.isRequired);let o=t.errors;if(r.errors!==o){r.errors=o;let a=this._convertErrors(o);n.setInputOnDirectives("errors",a)}}get isRequired(){return(this.requiredValidatorViaDi?._enabled||this.control?._hasRequired())??!1}bindControlProperty(n,t,r,i){if(t[r]===i)return;t[r]=i;let o=n.setInputOnDirectives(r,i);this.isNativeFormElement&&!o&&(r==="disabled"||r==="required")&&this.renderer&&oI(this.renderer,n.nativeElement,r,i)}_convertErrors(n){if(n===null)return[];let t=this.control;return Object.entries(n).map(([r,i])=>new Ff({context:i,kind:r,control:t}))}setParseErrorSource(n){if(n===void 0)return;let t=null,r=Ge(()=>{let i=n();return i.length===0?null:i.reduce((o,a)=>(o[a.kind]=a,o),{})});this.parseErrorsValidator=()=>(t=pe(r),t),Ht(()=>{let i=r();i!==t&&(t=i,this.control?.updateValueAndValidity({emitEvent:!1}),this.injector?.get(Wt)?.markForCheck())},{injector:this.injector})}removeParseErrorsValidator(n){this.parseErrorsValidator&&(n?.removeValidators(this.parseErrorsValidator),n?.updateValueAndValidity({emitEvent:!1}))}},Ml=class{_cd;constructor(n){this._cd=n}get isTouched(){return this._cd?.control?._touched?.(),!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return this._cd?.control?._pristine?.(),!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return this._cd?.control?._status?.(),!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return this._cd?._submitted?.(),!!this._cd?.submitted}};var Rl=(()=>{class e extends Ml{constructor(t){super(t)}static \u0275fac=function(r){return new(r||e)(le(Bn,2))};static \u0275dir=q({type:e,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(r,i){r&2&&$("ng-untouched",i.isUntouched)("ng-touched",i.isTouched)("ng-pristine",i.isPristine)("ng-dirty",i.isDirty)("ng-valid",i.isValid)("ng-invalid",i.isInvalid)("ng-pending",i.isPending)},standalone:!1,features:[Ke]})}return e})(),Ol=(()=>{class e extends Ml{constructor(t){super(t)}static \u0275fac=function(r){return new(r||e)(le(Vn,10))};static \u0275dir=q({type:e,selectors:[["","formGroupName",""],["","formArrayName",""],["","ngModelGroup",""],["","formGroup",""],["","formArray",""],["form",3,"ngNoForm",""],["","ngForm",""]],hostVars:16,hostBindings:function(r,i){r&2&&$("ng-untouched",i.isUntouched)("ng-touched",i.isTouched)("ng-pristine",i.isPristine)("ng-dirty",i.isDirty)("ng-valid",i.isValid)("ng-invalid",i.isInvalid)("ng-pending",i.isPending)("ng-submitted",i.isSubmitted)},standalone:!1,features:[Ke]})}return e})(),Hn=class extends xl{constructor(n,t,r){super(qv(t),Yv(r,t)),this.controls=n,this._initObservables(),this._setUpdateStrategy(t),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;registerControl(n,t){let r=this._find(n);return r||(this.controls[n]=t,t.setParent(this),t._registerOnCollectionChange(this._onCollectionChange),t)}addControl(n,t,r={}){this.registerControl(n,t),this.updateValueAndValidity({emitEvent:r.emitEvent}),this._onCollectionChange()}removeControl(n,t={}){let r=this._find(n);r&&r._registerOnCollectionChange(()=>{}),delete this.controls[n],this.updateValueAndValidity({emitEvent:t.emitEvent}),this._onCollectionChange()}setControl(n,t,r={}){let i=this._find(n);i&&i._registerOnCollectionChange(()=>{}),delete this.controls[n],t&&this.registerControl(n,t),this.updateValueAndValidity({emitEvent:r.emitEvent}),this._onCollectionChange()}contains(n){return this._find(n)?.enabled===!0}setValue(n,t={}){pe(()=>{nI(this,!0,n),Object.keys(n).forEach(r=>{tI(this,!0,r),this.controls[r].setValue(n[r],{onlySelf:!0,emitEvent:t.emitEvent})}),this.updateValueAndValidity(t)})}patchValue(n,t={}){n!=null&&(Object.keys(n).forEach(r=>{let i=this._find(r);i&&i.patchValue(n[r],{onlySelf:!0,emitEvent:t.emitEvent})}),this.updateValueAndValidity(t))}reset(n={},t={}){this._forEachChild((r,i)=>{r.reset(n?n[i]:null,B(C({},t),{onlySelf:!0}))}),this._updatePristine(t,this),this._updateTouched(t,this),this.updateValueAndValidity(t),t?.emitEvent!==!1&&this._events.next(new Ii(this))}getRawValue(){return this._reduceChildren({},(n,t,r)=>(n[r]=t.getRawValue(),n))}_syncPendingControls(){let n=this._reduceChildren(!1,(t,r)=>r._syncPendingControls()?!0:t);return n&&this.updateValueAndValidity({onlySelf:!0}),n}_forEachChild(n){Object.keys(this.controls).forEach(t=>{let r=this.controls[t];r&&n(r,t)})}_setUpControls(){this._forEachChild(n=>{n.setParent(this),n._registerOnCollectionChange(this._onCollectionChange)})}_updateValue(){this.value=this._reduceValue()}_anyControls(n){for(let[t,r]of Object.entries(this.controls))if(this.contains(t)&&n(r))return!0;return!1}_reduceValue(){let n={};return this._reduceChildren(n,(t,r,i)=>((r.enabled||this.disabled)&&(t[i]=r.value),t))}_reduceChildren(n,t){let r=n;return this._forEachChild((i,o)=>{r=t(r,i,o)}),r}_allControlsDisabled(){for(let n of Object.keys(this.controls))if(this.controls[n].enabled)return!1;return Object.keys(this.controls).length>0||this.disabled}_find(n){return Zv(this.controls,n)?this.controls[n]:null}};var wI={provide:Vn,useExisting:Le(()=>Hf)},Po=Promise.resolve(),Hf=(()=>{class e extends Vn{callSetDisabledState;get submitted(){return pe(this.submittedReactive)}_submitted=Ge(()=>this.submittedReactive());submittedReactive=te(!1);_directives=new Set;form;ngSubmit=new ge;options;constructor(t,r,i){super(),this.callSetDisabledState=i,this.form=new Hn({},jf(t),Bf(r))}ngAfterViewInit(){this._setUpdateStrategy()}get formDirective(){return this}get control(){return this.form}get path(){return[]}get controls(){return this.form.controls}addControl(t){Po.then(()=>{let r=this._findContainer(t.path);t.control=r.registerControl(t.name,t.control),t._setupWithForm(this.callSetDisabledState),t.control.updateValueAndValidity({emitEvent:!1}),this._directives.add(t)})}getControl(t){return this.form.get(t.path)}removeControl(t){Po.then(()=>{this._findContainer(t.path)?.removeControl(t.name),this._directives.delete(t)})}addFormGroup(t){Po.then(()=>{let r=this._findContainer(t.path),i=new Hn({});Kv(i,t),r.registerControl(t.name,i),i.updateValueAndValidity({emitEvent:!1})})}removeFormGroup(t){Po.then(()=>{this._findContainer(t.path)?.removeControl?.(t.name)})}getFormGroup(t){return this.form.get(t.path)}updateModel(t,r){Po.then(()=>{this.form.get(t.path).setValue(r)})}setValue(t){this.control.setValue(t)}onSubmit(t){return this.submittedReactive.set(!0),Qv(this.form,this._directives),this.ngSubmit.emit(t),this.form._events.next(new El(this.control)),t?.target?.method==="dialog"}onReset(){this.resetForm()}resetForm(t=void 0){this.form.reset(t),this.submittedReactive.set(!1)}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.form._updateOn=this.options.updateOn)}_findContainer(t){return t.pop(),t.length?this.form.get(t):this.form}static \u0275fac=function(r){return new(r||e)(le(Mi,10),le(Vf,10),le(Tl,8))};static \u0275dir=q({type:e,selectors:[["form",3,"ngNoForm","",3,"formGroup","",3,"formArray",""],["ng-form"],["","ngForm",""]],hostBindings:function(r,i){r&1&&me("submit",function(a){return i.onSubmit(a)})("reset",function(){return i.onReset()})},inputs:{options:[0,"ngFormOptions","options"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:!1,features:[Ne([wI]),Ke]})}return e})();function Rv(e,n){let t=e.indexOf(n);t>-1&&e.splice(t,1)}function Ov(e){return typeof e=="object"&&e!==null&&Object.keys(e).length===2&&"value"in e&&"disabled"in e}var de=class extends xl{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=!1;constructor(n=null,t,r){super(qv(t),Yv(r,t)),this._applyFormState(n),this._setUpdateStrategy(t),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),Nl(t)&&(t.nonNullable||t.initialValueIsDefault)&&(Ov(n)?this.defaultValue=n.value:this.defaultValue=n)}setValue(n,t={}){pe(()=>{this.value=this._pendingValue=n,this._onChange.length&&t.emitModelToViewChange!==!1&&this._onChange.forEach(r=>r(this.value,t.emitViewToModelChange!==!1)),this.updateValueAndValidity(t)})}patchValue(n,t={}){this.setValue(n,t)}reset(n=this.defaultValue,t={}){this._applyFormState(n),this.markAsPristine(t),this.markAsUntouched(t),this.setValue(this.value,t),t.overwriteDefaultValue&&(this.defaultValue=this.value),this._pendingChange=!1,t?.emitEvent!==!1&&this._events.next(new Ii(this))}_updateValue(){}_anyControls(n){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(n){this._onChange.push(n)}_unregisterOnChange(n){Rv(this._onChange,n)}registerOnDisabledChange(n){this._onDisabledChange.push(n)}_unregisterOnDisabledChange(n){Rv(this._onDisabledChange,n)}_forEachChild(n){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),!0):!1}_applyFormState(n){Ov(n)?(this.value=this._pendingValue=n.value,n.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=n}};var CI=e=>e instanceof de;var DI=(()=>{class e extends Vn{callSetDisabledState;get submitted(){return pe(this._submittedReactive)}set submitted(t){this._submittedReactive.set(t)}_submitted=Ge(()=>this._submittedReactive());_submittedReactive=te(!1);_oldForm;_onCollectionChange=()=>this._updateDomValue();directives=[];constructor(t,r,i){super(),this.callSetDisabledState=i,this._setValidators(t),this._setAsyncValidators(r)}ngOnChanges(t){this.onChanges(t)}ngOnDestroy(){this.onDestroy()}onChanges(t){if(!this.form)throw new x(1052,!1);Object.hasOwn(t,"form")&&(this._updateValidators(),this._updateDomValue(),this._updateRegistrations(),this._oldForm=this.form)}onDestroy(){this.form&&(Il(this.form,this),this.form._onCollectionChange===this._onCollectionChange&&this.form._registerOnCollectionChange(()=>{}))}get formDirective(){return this}get path(){return[]}addControl(t){let r=this.form.get(t.path);if(!r)throw new x(-1055,!1);return t._setupWithForm(r,this.callSetDisabledState),r.updateValueAndValidity({emitEvent:!1}),this.directives.push(t),r}getControl(t){return this.form.get(t.path)}removeControl(t){kv(t.control||null,t,!1),bI(this.directives,t)}addFormGroup(t){this._setUpFormContainer(t)}removeFormGroup(t){this._cleanUpFormContainer(t)}getFormGroup(t){return this.form.get(t.path)}getFormArray(t){return this.form.get(t.path)}addFormArray(t){this._setUpFormContainer(t)}removeFormArray(t){this._cleanUpFormContainer(t)}updateModel(t,r){this.form.get(t.path).setValue(r)}onReset(){this.resetForm()}resetForm(t=void 0,r={}){this.form.reset(t,r),this._submittedReactive.set(!1)}onSubmit(t){return this.submitted=!0,Qv(this.form,this.directives),this.ngSubmit.emit(t),this.form._events.next(new El(this.control)),t?.target?.method==="dialog"}_updateDomValue(){this.directives.forEach(t=>{let r=t.control,i=this.form.get(t.path);r!==i&&(kv(r||null,t),CI(i)&&t._setupWithForm(i,this.callSetDisabledState))}),this.form._updateTreeValidity({emitEvent:!1})}_setUpFormContainer(t){let r=this.form.get(t.path);Kv(r,t),r.updateValueAndValidity({emitEvent:!1})}_cleanUpFormContainer(t){let r=this.form?.get(t.path);r&&mI(r,t)&&r.updateValueAndValidity({emitEvent:!1})}_updateRegistrations(){this.form._registerOnCollectionChange(this._onCollectionChange),this._oldForm?._registerOnCollectionChange(()=>{})}_updateValidators(){kl(this.form,this),this._oldForm&&Il(this._oldForm,this)}static \u0275fac=function(r){return new(r||e)(le(Mi,10),le(Vf,10),le(Tl,8))};static \u0275dir=q({type:e,features:[Ke,dt]})}return e})(),EI={provide:Vn,useExisting:Le(()=>Rr)},Rr=(()=>{class e extends DI{form=null;ngSubmit=new ge;get control(){return this.form}static \u0275fac=(()=>{let t;return function(i){return(t||(t=xr(e)))(i||e)}})();static \u0275dir=q({type:e,selectors:[["","formGroup",""]],hostBindings:function(r,i){r&1&&me("submit",function(a){return i.onSubmit(a)})("reset",function(){return i.onReset()})},inputs:{form:[0,"formGroup","form"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:!1,features:[Ne([EI]),Ke]})}return e})();var ey=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275dir=q({type:e,selectors:[["form",3,"ngNoForm","",3,"ngNativeValidate",""]],hostAttrs:["novalidate",""],standalone:!1})}return e})();var ty=new y("");var xI={provide:Bn,useExisting:Le(()=>Bo)},Bo=(()=>{class e extends Bn{_ngModelWarningConfig;_added=!1;viewModel;control;name=null;set isDisabled(t){}model;update=new ge;static _ngModelWarningSentOnce=!1;_ngModelWarningSent=!1;constructor(t,r,i,o,a,s,l){super(l,s,o),this._ngModelWarningConfig=a,this._parent=t,this._setValidators(r),this._setAsyncValidators(i)}_setupWithForm(t,r){this.control=t,this.isCustomControlBased?this.setupCustomControl():(this.valueAccessor??=this.selectedValueAccessor,lI(t,this,r))}ngOnChanges(t){this._added||this._setUpControl(),pI(t,this.viewModel)&&(this.viewModel=this.model,this.formDirective.updateModel(this,this.model))}ngOnDestroy(){this.formDirective?.removeControl(this)}viewToModelUpdate(t){this.viewModel=t,this.update.emit(t)}get path(){return sI(this.name==null?this.name:this.name.toString(),this._parent)}get formDirective(){return this._parent?this._parent.formDirective:null}_setUpControl(){this.control=this.formDirective.addControl(this),this._added=!0}\u0275ngControlCreate(t){super.ngControlCreate(t)}\u0275ngControlUpdate(t){if(this.isCustomControlBased){if(!this.control){let r=this.formDirective?.getControl(this);if(!r)return;this.control=r}super.ngControlUpdate(t)}}static \u0275fac=function(r){return new(r||e)(le(Vn,13),le(Mi,10),le(Vf,10),le(Yt,10),le(ty,8),le(ze,8),le(Q,8))};static \u0275dir=q({type:e,selectors:[["","formControlName",""]],inputs:{name:[0,"formControlName","name"],isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"]},outputs:{update:"ngModelChange"},standalone:!1,features:[Ne([xI,_I]),Ke,dt,nf(null)]})}return e})();var ny=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=ee({type:e});static \u0275inj=K({})}return e})();var ry=(()=>{class e{static withConfig(t){return{ngModule:e,providers:[{provide:Tl,useValue:t.callSetDisabledState??Al}]}}static \u0275fac=function(r){return new(r||e)};static \u0275mod=ee({type:e});static \u0275inj=K({imports:[ny]})}return e})(),Fl=(()=>{class e{static withConfig(t){return{ngModule:e,providers:[{provide:ty,useValue:t.warnOnNgModelWithFormControl??"always"},{provide:Tl,useValue:t.callSetDisabledState??Al}]}}static \u0275fac=function(r){return new(r||e)};static \u0275mod=ee({type:e});static \u0275inj=K({imports:[ny]})}return e})();function Ho(e){return e.buttons===0||e.detail===0}function zo(e){let n=e.touches&&e.touches[0]||e.changedTouches&&e.changedTouches[0];return!!n&&n.identifier===-1&&(n.radiusX==null||n.radiusX===1)&&(n.radiusY==null||n.radiusY===1)}var zf;function oy(){if(zf==null){let e=typeof document<"u"?document.head:null;zf=!!(e&&(e.createShadowRoot||e.attachShadow))}return zf}function Uf(e){if(oy()){let n=e.getRootNode?e.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&n instanceof ShadowRoot)return n}return null}function ot(e){if(e.composedPath)try{return e.composedPath()[0]}catch(n){}return e.target}var $f;try{$f=typeof Intl<"u"&&Intl.v8BreakIterator}catch(e){$f=!1}var Se=(()=>{class e{_platformId=f(yr);isBrowser=this._platformId?nv(this._platformId):typeof document=="object"&&!!document;EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent);TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent);BLINK=this.isBrowser&&!!(window.chrome||$f)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT;WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT;IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window);FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent);ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT;SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT;static \u0275fac=function(r){return new(r||e)};static \u0275prov=k({token:e,factory:e.\u0275fac})}return e})();var Uo;function ay(){if(Uo==null&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>Uo=!0}))}finally{Uo=Uo||!1}return Uo}function Ni(e){return ay()?e:!!e.capture}function ut(e){return e instanceof Z?e.nativeElement:e}var sy=new y("cdk-input-modality-detector-options"),ly={ignoreKeys:[18,17,224,91,16]},cy=650,Gf={passive:!0,capture:!0},dy=(()=>{class e{_platform=f(Se);_listenerCleanups;modalityDetected;modalityChanged;get mostRecentModality(){return this._modality.value}_mostRecentTarget=null;_modality=new Jn(null);_options;_lastTouchMs=0;_onKeydown=t=>{this._options?.ignoreKeys?.some(r=>r===t.keyCode)||(this._modality.next("keyboard"),this._mostRecentTarget=ot(t))};_onMousedown=t=>{Date.now()-this._lastTouchMs<cy||(this._modality.next(Ho(t)?"keyboard":"mouse"),this._mostRecentTarget=ot(t))};_onTouchstart=t=>{if(zo(t)){this._modality.next("keyboard");return}this._lastTouchMs=Date.now(),this._modality.next("touch"),this._mostRecentTarget=ot(t)};constructor(){let t=f(A),r=f(j),i=f(sy,{optional:!0});if(this._options=C(C({},ly),i),this.modalityDetected=this._modality.pipe(Mc(1)),this.modalityChanged=this.modalityDetected.pipe(Fa()),this._platform.isBrowser){let o=f(Ve).createRenderer(null,null);this._listenerCleanups=t.runOutsideAngular(()=>[o.listen(r,"keydown",this._onKeydown,Gf),o.listen(r,"mousedown",this._onMousedown,Gf),o.listen(r,"touchstart",this._onTouchstart,Gf)])}}ngOnDestroy(){this._modality.complete(),this._listenerCleanups?.forEach(t=>t())}static \u0275fac=function(r){return new(r||e)};static \u0275prov=k({token:e,factory:e.\u0275fac})}return e})(),$o=(function(e){return e[e.IMMEDIATE=0]="IMMEDIATE",e[e.EVENTUAL=1]="EVENTUAL",e})($o||{}),uy=new y("cdk-focus-monitor-default-options"),Pl=Ni({passive:!0,capture:!0}),Go=(()=>{class e{_ngZone=f(A);_platform=f(Se);_inputModalityDetector=f(dy);_origin=null;_lastFocusOrigin=null;_windowFocused=!1;_windowFocusTimeoutId;_originTimeoutId;_originFromTouchInteraction=!1;_elementInfo=new Map;_monitoredElementCount=0;_rootNodeFocusListenerCount=new Map;_detectionMode;_windowFocusListener=()=>{this._windowFocused=!0,this._windowFocusTimeoutId=setTimeout(()=>this._windowFocused=!1)};_document=f(j);_stopInputModalityDetector=new L;constructor(){let t=f(uy,{optional:!0});this._detectionMode=t?.detectionMode||$o.IMMEDIATE}_rootNodeFocusAndBlurListener=t=>{let r=ot(t);for(let i=r;i;i=i.parentElement)t.type==="focus"?this._onFocus(t,i):this._onBlur(t,i)};monitor(t,r=!1){let i=ut(t);if(!this._platform.isBrowser||i.nodeType!==1)return st();let o=Uf(i)||this._document,a=this._elementInfo.get(i);if(a)return r&&(a.checkChildren=!0),a.subject;let s={checkChildren:r,subject:new L,rootNode:o};return this._elementInfo.set(i,s),this._registerGlobalListeners(s),s.subject}stopMonitoring(t){let r=ut(t),i=this._elementInfo.get(r);i&&(i.subject.complete(),this._setClasses(r),this._elementInfo.delete(r),this._removeGlobalListeners(i))}focusVia(t,r,i){let o=ut(t),a=this._document.activeElement;o===a?this._getClosestElementsInfo(o).forEach(([s,l])=>this._originChanged(s,r,l)):(this._setOrigin(r),typeof o.focus=="function"&&o.focus(i))}ngOnDestroy(){this._elementInfo.forEach((t,r)=>this.stopMonitoring(r))}_getWindow(){return this._document.defaultView||window}_getFocusOrigin(t){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(t)?"touch":"program":this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:t&&this._isLastInteractionFromInputLabel(t)?"mouse":"program"}_shouldBeAttributedToTouch(t){return this._detectionMode===$o.EVENTUAL||!!t?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(t,r){t.classList.toggle("cdk-focused",!!r),t.classList.toggle("cdk-touch-focused",r==="touch"),t.classList.toggle("cdk-keyboard-focused",r==="keyboard"),t.classList.toggle("cdk-mouse-focused",r==="mouse"),t.classList.toggle("cdk-program-focused",r==="program")}_setOrigin(t,r=!1){this._ngZone.runOutsideAngular(()=>{if(this._origin=t,this._originFromTouchInteraction=t==="touch"&&r,this._detectionMode===$o.IMMEDIATE){clearTimeout(this._originTimeoutId);let i=this._originFromTouchInteraction?cy:1;this._originTimeoutId=setTimeout(()=>this._origin=null,i)}})}_onFocus(t,r){let i=this._elementInfo.get(r),o=ot(t);!i||!i.checkChildren&&r!==o||this._originChanged(r,this._getFocusOrigin(o),i)}_onBlur(t,r){let i=this._elementInfo.get(r);!i||i.checkChildren&&t.relatedTarget instanceof Node&&r.contains(t.relatedTarget)||(this._setClasses(r),this._emitOrigin(i,null))}_emitOrigin(t,r){t.subject.observers.length&&this._ngZone.run(()=>t.subject.next(r))}_registerGlobalListeners(t){if(!this._platform.isBrowser)return;let r=t.rootNode,i=this._rootNodeFocusListenerCount.get(r)||0;i||this._ngZone.runOutsideAngular(()=>{r.addEventListener("focus",this._rootNodeFocusAndBlurListener,Pl),r.addEventListener("blur",this._rootNodeFocusAndBlurListener,Pl)}),this._rootNodeFocusListenerCount.set(r,i+1),++this._monitoredElementCount===1&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener("focus",this._windowFocusListener)}),this._inputModalityDetector.modalityDetected.pipe(xn(this._stopInputModalityDetector)).subscribe(o=>{this._setOrigin(o,!0)}))}_removeGlobalListeners(t){let r=t.rootNode;if(this._rootNodeFocusListenerCount.has(r)){let i=this._rootNodeFocusListenerCount.get(r);i>1?this._rootNodeFocusListenerCount.set(r,i-1):(r.removeEventListener("focus",this._rootNodeFocusAndBlurListener,Pl),r.removeEventListener("blur",this._rootNodeFocusAndBlurListener,Pl),this._rootNodeFocusListenerCount.delete(r))}--this._monitoredElementCount||(this._getWindow().removeEventListener("focus",this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId))}_originChanged(t,r,i){this._setClasses(t,r),this._emitOrigin(i,r),this._lastFocusOrigin=r}_getClosestElementsInfo(t){let r=[];return this._elementInfo.forEach((i,o)=>{(o===t||i.checkChildren&&o.contains(t))&&r.push([o,i])}),r}_isLastInteractionFromInputLabel(t){let{_mostRecentTarget:r,mostRecentModality:i}=this._inputModalityDetector;if(i!=="mouse"||!r||r===t||t.nodeName!=="INPUT"&&t.nodeName!=="TEXTAREA"||t.disabled)return!1;let o=t.labels;if(o){for(let a=0;a<o.length;a++)if(o[a].contains(r))return!0}return!1}static \u0275fac=function(r){return new(r||e)};static \u0275prov=k({token:e,factory:e.\u0275fac})}return e})();function Wf(e){return Array.isArray(e)?e:[e]}var fy=new Set,Or,qf=(()=>{class e{_platform=f(Se);_nonce=f(Rn,{optional:!0});_matchMedia;constructor(){this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):II}matchMedia(t){return(this._platform.WEBKIT||this._platform.BLINK)&&SI(t,this._nonce),this._matchMedia(t)}static \u0275fac=function(r){return new(r||e)};static \u0275prov=k({token:e,factory:e.\u0275fac})}return e})();function SI(e,n){if(!fy.has(e))try{Or||(Or=document.createElement("style"),n&&Or.setAttribute("nonce",n),Or.setAttribute("type","text/css"),document.head.appendChild(Or)),Or.sheet&&(Or.sheet.insertRule(`@media ${e.replace(/[{}]/g,"")} {body{ }}`,0),fy.add(e))}catch(t){console.error(t)}}function II(e){return{matches:e==="all"||e==="",media:e,addListener:()=>{},removeListener:()=>{}}}var MI=(()=>{class e{create(t){return typeof MutationObserver>"u"?null:new MutationObserver(t)}static \u0275fac=function(r){return new(r||e)};static \u0275prov=k({token:e,factory:e.\u0275fac})}return e})();var my=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=ee({type:e});static \u0275inj=K({providers:[MI]})}return e})();var py=new Map,Et=class e{_appId=f(vr);static _infix=`a${Math.floor(Math.random()*1e5).toString()}`;getId(n,t=!1){this._appId!=="ng"&&(n+=this._appId);let r=py.get(n);return r===void 0?r=0:r++,py.set(n,r),`${n}${t?e._infix+"-":""}${r}`}static \u0275fac=function(t){return new(t||e)};static \u0275prov=k({token:e,factory:e.\u0275fac})};function Fe(e){return e==null?"":typeof e=="string"?e:`${e}px`}function vn(e){return e!=null&&`${e}`!="false"}var Fr;function gy(){if(Fr==null){if(typeof document!="object"||!document||typeof Element!="function"||!Element)return Fr=!1,Fr;if(document.documentElement?.style&&"scrollBehavior"in document.documentElement.style)Fr=!0;else{let e=Element.prototype.scrollTo;e?Fr=!/\{\s*\[native code\]\s*\}/.test(e.toString()):Fr=!1}}return Fr}function Yf(){return typeof __karma__<"u"&&!!__karma__||typeof jasmine<"u"&&!!jasmine||typeof jest<"u"&&!!jest||typeof Mocha<"u"&&!!Mocha}var Ti,by=["color","button","checkbox","date","datetime-local","email","file","hidden","image","month","number","password","radio","range","reset","search","submit","tel","text","time","url","week"];function Zf(){if(Ti)return Ti;if(typeof document!="object"||!document)return Ti=new Set(by),Ti;let e=document.createElement("input");return Ti=new Set(by.filter(n=>(e.setAttribute("type",n),e.type===n))),Ti}var yy=Symbol("FIELD_TREE");var _y=Symbol("IS_ASYNC_VALIDATION_RESOURCE"),vy=class{reducer;create;brand;[_y];constructor(n,t){this.reducer=n,this.create=t}};function Wo(e){return typeof e=="function"&&e[yy]===!0}var Ll=new y("");var Xf=class{_box;_destroyed=new L;_resizeSubject=new L;_resizeObserver;_elementObservables=new Map;constructor(n){this._box=n,typeof ResizeObserver<"u"&&(this._resizeObserver=new ResizeObserver(t=>this._resizeSubject.next(t)))}observe(n){return this._elementObservables.has(n)||this._elementObservables.set(n,new W(t=>{let r=this._resizeSubject.subscribe(t);return this._resizeObserver?.observe(n,{box:this._box}),()=>{this._resizeObserver?.unobserve(n),r.unsubscribe(),this._elementObservables.delete(n)}}).pipe(he(t=>t.filter(r=>r.target===n)),lt(t=>t.length>0),La({bufferSize:1,refCount:!0}),xn(this._destroyed))),this._elementObservables.get(n)}destroy(){this._destroyed.next(),this._destroyed.complete(),this._resizeSubject.complete(),this._elementObservables.clear()}},wy=(()=>{class e{_cleanupErrorListener;_observers=new Map;_ngZone=f(A);constructor(){typeof ResizeObserver<"u"}ngOnDestroy(){for(let[,t]of this._observers)t.destroy();this._observers.clear(),this._cleanupErrorListener?.()}observe(t,r){let i=r?.box||"content-box";return this._observers.has(i)||this._observers.set(i,new Xf(i)),this._observers.get(i).observe(t)}static \u0275fac=function(r){return new(r||e)};static \u0275prov=k({token:e,factory:e.\u0275fac})}return e})();var NI=new y("MATERIAL_ANIMATIONS"),Cy=null;function TI(){return f(NI,{optional:!0})?.animationsDisabled||f(ro,{optional:!0})==="NoopAnimations"?"di-disabled":(Cy??=f(qf).matchMedia("(prefers-reduced-motion)").matches,Cy?"reduced-motion":"enabled")}function Zt(){return TI()!=="enabled"}var qo=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275dir=q({type:e,selectors:[["mat-label"]]})}return e})(),AI=new y("MatError");var Kf=(()=>{class e{align="start";id=f(Et).getId("mat-mdc-hint-");static \u0275fac=function(r){return new(r||e)};static \u0275dir=q({type:e,selectors:[["mat-hint"]],hostAttrs:[1,"mat-mdc-form-field-hint","mat-mdc-form-field-bottom-align"],hostVars:4,hostBindings:function(r,i){r&2&&(Pn("id",i.id),je("align",null),$("mat-mdc-form-field-hint-end",i.align==="end"))},inputs:{align:"align",id:"id"}})}return e})(),kI=new y("MatPrefix");var Ny=new y("MatSuffix"),Qf=(()=>{class e{set _isTextSelector(t){this._isText=!0}_isText=!1;static \u0275fac=function(r){return new(r||e)};static \u0275dir=q({type:e,selectors:[["","matSuffix",""],["","matIconSuffix",""],["","matTextSuffix",""]],inputs:{_isTextSelector:[0,"matTextSuffix","_isTextSelector"]},features:[Ne([{provide:Ny,useExisting:e}])]})}return e})(),Ty=new y("FloatingLabelParent"),Dy=(()=>{class e{_elementRef=f(Z);get floating(){return this._floating}set floating(t){this._floating=t,this.monitorResize&&this._handleResize()}_floating=!1;get monitorResize(){return this._monitorResize}set monitorResize(t){this._monitorResize=t,this._monitorResize?this._subscribeToResize():this._resizeSubscription.unsubscribe()}_monitorResize=!1;_resizeObserver=f(wy);_ngZone=f(A);_parent=f(Ty);_resizeSubscription=new ue;ngOnDestroy(){this._resizeSubscription.unsubscribe()}getWidth(){return RI(this._elementRef.nativeElement)}get element(){return this._elementRef.nativeElement}_handleResize(){setTimeout(()=>this._parent._handleLabelResized())}_subscribeToResize(){this._resizeSubscription.unsubscribe(),this._ngZone.runOutsideAngular(()=>{this._resizeSubscription=this._resizeObserver.observe(this._elementRef.nativeElement,{box:"border-box"}).subscribe(()=>this._handleResize())})}static \u0275fac=function(r){return new(r||e)};static \u0275dir=q({type:e,selectors:[["label","matFormFieldFloatingLabel",""]],hostAttrs:[1,"mdc-floating-label","mat-mdc-floating-label"],hostVars:2,hostBindings:function(r,i){r&2&&$("mdc-floating-label--float-above",i.floating)},inputs:{floating:"floating",monitorResize:"monitorResize"}})}return e})();function RI(e){let n=e;if(n.offsetParent!==null)return n.scrollWidth;let t=n.cloneNode(!0);t.style.setProperty("position","absolute"),t.style.setProperty("transform","translate(-9999px, -9999px)"),document.documentElement.appendChild(t);let r=t.scrollWidth;return t.remove(),r}var Ey="mdc-line-ripple--active",Vl="mdc-line-ripple--deactivating",xy=(()=>{class e{_elementRef=f(Z);_cleanupTransitionEnd;constructor(){let t=f(A),r=f(ze);t.runOutsideAngular(()=>{this._cleanupTransitionEnd=r.listen(this._elementRef.nativeElement,"transitionend",this._handleTransitionEnd)})}activate(){let t=this._elementRef.nativeElement.classList;t.remove(Vl),t.add(Ey)}deactivate(){this._elementRef.nativeElement.classList.add(Vl)}_handleTransitionEnd=t=>{let r=this._elementRef.nativeElement.classList,i=r.contains(Vl);t.propertyName==="opacity"&&i&&r.remove(Ey,Vl)};ngOnDestroy(){this._cleanupTransitionEnd()}static \u0275fac=function(r){return new(r||e)};static \u0275dir=q({type:e,selectors:[["div","matFormFieldLineRipple",""]],hostAttrs:[1,"mdc-line-ripple"]})}return e})(),Sy=(()=>{class e{_elementRef=f(Z);_ngZone=f(A);open=!1;_notch;ngAfterViewInit(){let t=this._elementRef.nativeElement,r=t.querySelector(".mdc-floating-label");r?(t.classList.add("mdc-notched-outline--upgraded"),typeof requestAnimationFrame=="function"&&(r.style.transitionDuration="0s",this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>r.style.transitionDuration="")}))):t.classList.add("mdc-notched-outline--no-label")}_setNotchWidth(t){let r=this._notch.nativeElement;!this.open||!t?r.style.width="":r.style.width=`calc(${t}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + 9px)`}_setMaxWidth(t){this._notch.nativeElement.style.setProperty("--mat-form-field-notch-max-width",`calc(100% - ${t}px)`)}static \u0275fac=function(r){return new(r||e)};static \u0275cmp=(function(){let t=["notch"];return X({type:e,selectors:[["div","matFormFieldNotchedOutline",""]],viewQuery:function(o,a){if(o&1&&Gt(t,5),o&2){let s;Ae(s=ke())&&(a._notch=s.first)}},hostAttrs:[1,"mdc-notched-outline"],hostVars:2,hostBindings:function(o,a){o&2&&$("mdc-notched-outline--notched",a.open)},inputs:{open:[0,"matFormFieldNotchedOutlineOpen","open"]},ngContentSelectors:["*"],decls:5,vars:0,consts:[["notch",""],[1,"mat-mdc-notch-piece","mdc-notched-outline__leading"],[1,"mat-mdc-notch-piece","mdc-notched-outline__notch"],[1,"mat-mdc-notch-piece","mdc-notched-outline__trailing"]],template:function(o,a){o&1&&(Qe(),wt(0,"div",1),yt(1,"div",2,0),ae(3),_t(),wt(4,"div",3))},encapsulation:2})})()}return e})(),Jf=(()=>{class e{id;ngField=null;ngControl=null;focused=!1;empty=!1;shouldLabelFloat=!1;required=!1;disabled=!1;errorState=!1;controlType;autofilled;userAriaDescribedBy;disableAutomaticLabeling;describedByIds;stateChanges=null;value;static \u0275fac=function(r){return new(r||e)};static \u0275dir=q({type:e})}return e})();var em=new y("MatFormField"),OI=new y("MAT_FORM_FIELD_DEFAULT_OPTIONS"),Iy="fill",FI="auto",My="fixed",PI="translateY(-50%)",jl=(()=>{class e{_elementRef=f(Z);_changeDetectorRef=f(Wt);_platform=f(Se);_idGenerator=f(Et);_ngZone=f(A);_defaults=f(OI,{optional:!0});_currentDirection;_unwrapMaybeSignal(t){return zt(t)?t():t}_textField;_iconPrefixContainer;_textPrefixContainer;_iconSuffixContainer;_textSuffixContainer;_floatingLabel;_notchedOutline;_lineRipple;_iconPrefixContainerSignal=Eo("iconPrefixContainer");_textPrefixContainerSignal=Eo("textPrefixContainer");_iconSuffixContainerSignal=Eo("iconSuffixContainer");_textSuffixContainerSignal=Eo("textSuffixContainer");_prefixSuffixContainers=Ge(()=>[this._iconPrefixContainerSignal(),this._textPrefixContainerSignal(),this._iconSuffixContainerSignal(),this._textSuffixContainerSignal()].map(t=>t?.nativeElement).filter(t=>t!==void 0));_formFieldControl;_prefixChildren;_suffixChildren;_errorChildren;_hintChildren;_labelChild=Yb(qo);get hideRequiredMarker(){return this._hideRequiredMarker}set hideRequiredMarker(t){this._hideRequiredMarker=vn(t)}_hideRequiredMarker=!1;color="primary";get floatLabel(){return this._floatLabel||this._defaults?.floatLabel||FI}set floatLabel(t){t!==this._floatLabel&&(this._floatLabel=t,this._changeDetectorRef.markForCheck())}_floatLabel;get appearance(){return this._appearanceSignal()}set appearance(t){let r=t||this._defaults?.appearance||Iy;this._appearanceSignal.set(r)}_appearanceSignal=te(Iy);get subscriptSizing(){return this._subscriptSizing||this._defaults?.subscriptSizing||My}set subscriptSizing(t){this._subscriptSizing=t||this._defaults?.subscriptSizing||My}_subscriptSizing=null;get hintLabel(){return this._hintLabel}set hintLabel(t){this._hintLabel=t,this._processHints()}_hintLabel="";_hasIconPrefix=!1;_hasTextPrefix=!1;_hasIconSuffix=!1;_hasTextSuffix=!1;_labelId=this._idGenerator.getId("mat-mdc-form-field-label-");_hintLabelId=this._idGenerator.getId("mat-mdc-hint-");_describedByIds;get _control(){return this._explicitFormFieldControl||this._formFieldControl}set _control(t){this._explicitFormFieldControl=t}_destroyed=new L;_isFocused=null;_explicitFormFieldControl;_previousControl=null;_previousControlValidatorFn=null;_stateChanges;_valueChanges;_describedByChanges;_outlineLabelOffsetResizeObserver=null;_animationsDisabled=Zt();constructor(){let t=this._defaults,r=f(Ro);t&&(t.appearance&&(this.appearance=t.appearance),this._hideRequiredMarker=!!t?.hideRequiredMarker,t.color&&(this.color=t.color)),Ht(()=>this._currentDirection=r.valueSignal()),this._syncOutlineLabelOffset()}ngAfterViewInit(){this._updateFocusState(),this._animationsDisabled||this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._elementRef.nativeElement.classList.add("mat-form-field-animations-enabled")},300)}),this._changeDetectorRef.detectChanges()}ngAfterContentInit(){this._assertFormFieldControl(),this._initializeSubscript(),this._initializePrefixAndSuffix()}ngAfterContentChecked(){this._assertFormFieldControl(),this._control!==this._previousControl&&(this._initializeControl(this._previousControl),this._control.ngControl&&this._control.ngControl.control&&(this._previousControlValidatorFn=Wo(this._control.ngField)?null:this._control.ngControl.control.validator),this._previousControl=this._control,this._changeDetectorRef.markForCheck()),this._control.ngControl&&this._control.ngControl.control&&!Wo(this._control.ngField)&&this._control.ngControl.control.validator!==this._previousControlValidatorFn&&this._changeDetectorRef.markForCheck()}ngOnDestroy(){this._outlineLabelOffsetResizeObserver?.disconnect(),this._stateChanges?.unsubscribe(),this._valueChanges?.unsubscribe(),this._describedByChanges?.unsubscribe(),this._destroyed.next(),this._destroyed.complete()}getLabelId=Ge(()=>this._hasFloatingLabel()?this._labelId:null);getConnectedOverlayOrigin(){return this._textField||this._elementRef}_animateAndLockLabel(){this._hasFloatingLabel()&&(this.floatLabel="always")}_initializeControl(t){let r=this._control,i="mat-mdc-form-field-type-";t&&this._elementRef.nativeElement.classList.remove(i+t.controlType),r.controlType&&this._elementRef.nativeElement.classList.add(i+r.controlType),this._stateChanges?.unsubscribe(),this._stateChanges=r.stateChanges?.subscribe(()=>{this._updateFocusState(),this._changeDetectorRef.markForCheck()}),this._describedByChanges?.unsubscribe(),this._describedByChanges=r.stateChanges?.pipe(Va([void 0,void 0]),he(()=>[this._unwrapMaybeSignal(r.errorState),r.userAriaDescribedBy]),Pa(),lt(([[o,a],[s,l]])=>o!==s||a!==l)).subscribe(()=>this._syncDescribedByIds()),this._valueChanges?.unsubscribe(),r.ngControl&&r.ngControl.valueChanges&&!Wo(r.ngField)&&(this._valueChanges=r.ngControl.valueChanges.pipe(xn(this._destroyed)).subscribe(()=>this._changeDetectorRef.markForCheck()))}_checkPrefixAndSuffixTypes(){this._hasIconPrefix=!!this._prefixChildren.find(t=>!t._isText),this._hasTextPrefix=!!this._prefixChildren.find(t=>t._isText),this._hasIconSuffix=!!this._suffixChildren.find(t=>!t._isText),this._hasTextSuffix=!!this._suffixChildren.find(t=>t._isText)}_initializePrefixAndSuffix(){this._checkPrefixAndSuffixTypes(),Ec(this._prefixChildren.changes,this._suffixChildren.changes).subscribe(()=>{this._checkPrefixAndSuffixTypes(),this._changeDetectorRef.markForCheck()})}_initializeSubscript(){this._hintChildren.changes.subscribe(()=>{this._processHints(),this._changeDetectorRef.markForCheck()}),this._errorChildren.changes.subscribe(()=>{this._syncDescribedByIds(),this._changeDetectorRef.markForCheck()}),this._validateHints(),this._syncDescribedByIds()}_assertFormFieldControl(){this._control}_updateFocusState(){let t=this._unwrapMaybeSignal(this._control.focused);t&&!this._isFocused?(this._isFocused=!0,this._lineRipple?.activate()):!t&&(this._isFocused||this._isFocused===null)&&(this._isFocused=!1,this._lineRipple?.deactivate()),this._elementRef.nativeElement.classList.toggle("mat-focused",t),this._textField?.nativeElement.classList.toggle("mdc-text-field--focused",t)}_syncOutlineLabelOffset(){uf({earlyRead:()=>{if(this._appearanceSignal()!=="outline")return this._outlineLabelOffsetResizeObserver?.disconnect(),null;if(globalThis.ResizeObserver){this._outlineLabelOffsetResizeObserver||=new globalThis.ResizeObserver(()=>{this._writeOutlinedLabelStyles(this._getOutlinedLabelOffset())});for(let t of this._prefixSuffixContainers())this._outlineLabelOffsetResizeObserver.observe(t,{box:"border-box"})}return this._getOutlinedLabelOffset()},write:t=>this._writeOutlinedLabelStyles(t())})}_shouldAlwaysFloat(){return this.floatLabel==="always"}_hasOutline(){return this.appearance==="outline"}_forceDisplayInfixLabel(){return!this._platform.isBrowser&&this._prefixChildren.length&&!this._shouldLabelFloat()}_hasFloatingLabel=Ge(()=>!!this._labelChild());_shouldLabelFloat(){return this._hasFloatingLabel()?this._shouldAlwaysFloat()||this._unwrapMaybeSignal(this._control.shouldLabelFloat):!1}_shouldForward(t){let r=this._control?.ngField||this._control?.ngControl;if(!r)return!1;if(Wo(r)){let i=r();return t==="valid"?i.valid():t==="dirty"?i.dirty():t==="touched"?i.touched():t==="pending"?i.pending():t==="untouched"?!i.touched():t==="pristine"?!i.dirty():t==="invalid"?!i.valid():!1}else{let i=r;return t==="valid"?i.valid:t==="dirty"?i.dirty:t==="touched"?i.touched:t==="pending"?i.pending:t==="untouched"?i.untouched:t==="pristine"?i.pristine:t==="invalid"?i.invalid:!1}}_getSubscriptMessageType(){return this._errorChildren&&this._errorChildren.length>0&&this._unwrapMaybeSignal(this._control.errorState)?"error":"hint"}_handleLabelResized(){this._refreshOutlineNotchWidth()}_refreshOutlineNotchWidth(){!this._hasOutline()||!this._floatingLabel||!this._shouldLabelFloat()?this._notchedOutline?._setNotchWidth(0):this._notchedOutline?._setNotchWidth(this._floatingLabel.getWidth())}_processHints(){this._validateHints(),this._syncDescribedByIds()}_validateHints(){this._hintChildren}_syncDescribedByIds(){if(this._control){let t=[];if(this._control.userAriaDescribedBy&&typeof this._control.userAriaDescribedBy=="string"&&t.push(...this._control.userAriaDescribedBy.split(" ")),this._getSubscriptMessageType()==="hint"){let o=this._hintChildren?this._hintChildren.find(s=>s.align==="start"):null,a=this._hintChildren?this._hintChildren.find(s=>s.align==="end"):null;o?t.push(o.id):this._hintLabel&&t.push(this._hintLabelId),a&&t.push(a.id)}else this._errorChildren&&t.push(...this._errorChildren.map(o=>o.id));let r=this._control.describedByIds,i;if(r){let o=this._describedByIds||t;i=t.concat(r.filter(a=>a&&!o.includes(a)))}else i=t;this._control.setDescribedByIds(i),this._describedByIds=t}}_getOutlinedLabelOffset(){if(!this._hasOutline()||!this._floatingLabel)return null;if(!this._iconPrefixContainer&&!this._textPrefixContainer)return["",null];if(!this._isAttachedToDom())return null;let t=this._iconPrefixContainer?.nativeElement,r=this._textPrefixContainer?.nativeElement,i=this._iconSuffixContainer?.nativeElement,o=this._textSuffixContainer?.nativeElement,a=t?.getBoundingClientRect().width??0,s=r?.getBoundingClientRect().width??0,l=i?.getBoundingClientRect().width??0,c=o?.getBoundingClientRect().width??0,d=this._currentDirection==="rtl"?"-1":"1",u=`${a+s}px`,m=`calc(${d} * (${u} + var(--mat-mdc-form-field-label-offset-x, 0px)))`,h=`var(--mat-mdc-form-field-label-transform, ${PI} translateX(${m}))`,w=a+s+l+c;return[h,w]}_writeOutlinedLabelStyles(t){if(t!==null){let[r,i]=t;this._floatingLabel&&(this._floatingLabel.element.style.transform=r),i!==null&&this._notchedOutline?._setMaxWidth(i)}}_isAttachedToDom(){let t=this._elementRef.nativeElement;if(t.getRootNode){let r=t.getRootNode();return r&&r!==t}return document.documentElement.contains(t)}static \u0275fac=function(r){return new(r||e)};static \u0275cmp=(function(){let t=["iconPrefixContainer"],r=["textPrefixContainer"],i=["iconSuffixContainer"],o=["textSuffixContainer"],a=["textField"],s=["*",[["mat-label"]],[["","matPrefix",""],["","matIconPrefix",""]],[["","matTextPrefix",""]],[["","matTextSuffix",""]],[["","matSuffix",""],["","matIconSuffix",""]],[["mat-error"],["","matError",""]],[["mat-hint",3,"align","end"]],[["mat-hint","align","end"]]],l=["*","mat-label","[matPrefix], [matIconPrefix]","[matTextPrefix]","[matTextSuffix]","[matSuffix], [matIconSuffix]","mat-error, [matError]","mat-hint:not([align='end'])","mat-hint[align='end']"];function c(O,ne){O&1&&Be(0,"span",21)}function d(O,ne){if(O&1&&(g(0,"label",20),ae(1,1),_e(2,c,1,0,"span",21),b()),O&2){let v=$e(2);T("floating",v._shouldLabelFloat())("monitorResize",v._hasOutline())("id",v._labelId),je("for",v._control.disableAutomaticLabeling?null:v._control.id),_(2),we(!v.hideRequiredMarker&&v._unwrapMaybeSignal(v._control.required)?2:-1)}}function u(O,ne){if(O&1&&_e(0,d,3,5,"label",20),O&2){let v=$e();we(v._hasFloatingLabel()?0:-1)}}function p(O,ne){O&1&&Be(0,"div",7)}function m(O,ne){}function h(O,ne){if(O&1&&bi(0,m,0,0,"ng-template",13),O&2){$e(2);let v=yi(1);T("ngTemplateOutlet",v)}}function w(O,ne){if(O&1&&(g(0,"div",9),_e(1,h,1,1,null,13),b()),O&2){let v=$e();T("matFormFieldNotchedOutlineOpen",v._shouldLabelFloat()),_(),we(v._forceDisplayInfixLabel()?-1:1)}}function E(O,ne){O&1&&(g(0,"div",10,2),ae(2,2),b())}function R(O,ne){O&1&&(g(0,"div",11,3),ae(2,3),b())}function U(O,ne){}function at(O,ne){if(O&1&&bi(0,U,0,0,"ng-template",13),O&2){$e();let v=yi(1);T("ngTemplateOutlet",v)}}function zn(O,ne){O&1&&(g(0,"div",14,4),ae(2,4),b())}function Ft(O,ne){O&1&&(g(0,"div",15,5),ae(2,5),b())}function Un(O,ne){O&1&&Be(0,"div",16)}function $n(O,ne){O&1&&(g(0,"div",18),ae(1,6),b())}function yn(O,ne){if(O&1&&(g(0,"mat-hint",22),D(1),b()),O&2){let v=$e(2);T("id",v._hintLabelId),_(),ce(v.hintLabel)}}function Pt(O,ne){if(O&1&&(g(0,"div",19),_e(1,yn,2,2,"mat-hint",22),ae(2,7),Be(3,"div",23),ae(4,8),b()),O&2){let v=$e();_(),we(v.hintLabel?1:-1)}}return X({type:e,selectors:[["mat-form-field"]],contentQueries:function(ne,v,re){if(ne&1&&(Ks(re,v._labelChild,qo,5),Xs(re,Jf,5)(re,kI,5)(re,Ny,5)(re,AI,5)(re,Kf,5)),ne&2){Js();let rt;Ae(rt=ke())&&(v._formFieldControl=rt.first),Ae(rt=ke())&&(v._prefixChildren=rt),Ae(rt=ke())&&(v._suffixChildren=rt),Ae(rt=ke())&&(v._errorChildren=rt),Ae(rt=ke())&&(v._hintChildren=rt)}},viewQuery:function(ne,v){if(ne&1&&(Qs(v._iconPrefixContainerSignal,t,5)(v._textPrefixContainerSignal,r,5)(v._iconSuffixContainerSignal,i,5)(v._textSuffixContainerSignal,o,5),Gt(a,5)(t,5)(r,5)(i,5)(o,5)(Dy,5)(Sy,5)(xy,5)),ne&2){Js(4);let re;Ae(re=ke())&&(v._textField=re.first),Ae(re=ke())&&(v._iconPrefixContainer=re.first),Ae(re=ke())&&(v._textPrefixContainer=re.first),Ae(re=ke())&&(v._iconSuffixContainer=re.first),Ae(re=ke())&&(v._textSuffixContainer=re.first),Ae(re=ke())&&(v._floatingLabel=re.first),Ae(re=ke())&&(v._notchedOutline=re.first),Ae(re=ke())&&(v._lineRipple=re.first)}},hostAttrs:[1,"mat-mdc-form-field"],hostVars:38,hostBindings:function(ne,v){ne&2&&$("mat-mdc-form-field-label-always-float",v._shouldAlwaysFloat())("mat-mdc-form-field-has-icon-prefix",v._hasIconPrefix)("mat-mdc-form-field-has-icon-suffix",v._hasIconSuffix)("mat-form-field-invalid",v._unwrapMaybeSignal(v._control.errorState))("mat-form-field-disabled",v._unwrapMaybeSignal(v._control.disabled))("mat-form-field-autofilled",v._unwrapMaybeSignal(v._control.autofilled))("mat-form-field-appearance-fill",v.appearance=="fill")("mat-form-field-appearance-outline",v.appearance=="outline")("mat-form-field-hide-placeholder",v._hasFloatingLabel()&&!v._shouldLabelFloat())("mat-primary",v.color!=="accent"&&v.color!=="warn")("mat-accent",v.color==="accent")("mat-warn",v.color==="warn")("ng-untouched",v._shouldForward("untouched"))("ng-touched",v._shouldForward("touched"))("ng-pristine",v._shouldForward("pristine"))("ng-dirty",v._shouldForward("dirty"))("ng-valid",v._shouldForward("valid"))("ng-invalid",v._shouldForward("invalid"))("ng-pending",v._shouldForward("pending"))},inputs:{hideRequiredMarker:"hideRequiredMarker",color:"color",floatLabel:"floatLabel",appearance:"appearance",subscriptSizing:"subscriptSizing",hintLabel:"hintLabel"},exportAs:["matFormField"],features:[Ne([{provide:em,useExisting:e},{provide:Ty,useExisting:e}])],ngContentSelectors:l,decls:18,vars:21,consts:[["labelTemplate",""],["textField",""],["iconPrefixContainer",""],["textPrefixContainer",""],["textSuffixContainer",""],["iconSuffixContainer",""],[1,"mat-mdc-text-field-wrapper","mdc-text-field",3,"click"],[1,"mat-mdc-form-field-focus-overlay"],[1,"mat-mdc-form-field-flex"],["matFormFieldNotchedOutline","",3,"matFormFieldNotchedOutlineOpen"],[1,"mat-mdc-form-field-icon-prefix"],[1,"mat-mdc-form-field-text-prefix"],[1,"mat-mdc-form-field-infix"],[3,"ngTemplateOutlet"],[1,"mat-mdc-form-field-text-suffix"],[1,"mat-mdc-form-field-icon-suffix"],["matFormFieldLineRipple",""],["aria-atomic","true","aria-live","polite",1,"mat-mdc-form-field-subscript-wrapper","mat-mdc-form-field-bottom-align"],[1,"mat-mdc-form-field-error-wrapper"],[1,"mat-mdc-form-field-hint-wrapper"],["matFormFieldFloatingLabel","",3,"floating","monitorResize","id"],["aria-hidden","true",1,"mat-mdc-form-field-required-marker","mdc-floating-label--required"],[3,"id"],[1,"mat-mdc-form-field-hint-spacer"]],template:function(ne,v){if(ne&1&&(Qe(s),bi(0,u,1,1,"ng-template",null,0,sf),g(2,"div",6,1),me("click",function(rt){return v._control.onContainerClick(rt)}),_e(4,p,1,0,"div",7),g(5,"div",8),_e(6,w,2,2,"div",9),_e(7,E,3,0,"div",10),_e(8,R,3,0,"div",11),g(9,"div",12),_e(10,at,1,1,null,13),ae(11),b(),_e(12,zn,3,0,"div",14),_e(13,Ft,3,0,"div",15),b(),_e(14,Un,1,0,"div",16),b(),g(15,"div",17),_e(16,$n,2,0,"div",18)(17,Pt,5,1,"div",19),b()),ne&2){let re,rt=v._unwrapMaybeSignal(v._control.disabled);_(2),$("mdc-text-field--filled",!v._hasOutline())("mdc-text-field--outlined",v._hasOutline())("mdc-text-field--no-label",!v._hasFloatingLabel())("mdc-text-field--disabled",rt)("mdc-text-field--invalid",v._unwrapMaybeSignal(v._control.errorState)),_(2),we(!v._hasOutline()&&!rt?4:-1),_(2),we(v._hasOutline()?6:-1),_(),we(v._hasIconPrefix?7:-1),_(),we(v._hasTextPrefix?8:-1),_(2),we(!v._hasOutline()||v._forceDisplayInfixLabel()?10:-1),_(2),we(v._hasTextSuffix?12:-1),_(),we(v._hasIconSuffix?13:-1),_(),we(v._hasOutline()?-1:14),_(),$("mat-mdc-form-field-subscript-dynamic-size",v.subscriptSizing==="dynamic");let D_=v._getSubscriptMessageType();_(),we((re=D_)==="error"?16:re==="hint"?17:-1)}},dependencies:[Dy,Sy,mf,xy,Kf],styles:[`.mdc-text-field {
  display: inline-flex;
  align-items: baseline;
  padding: 0 16px;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  will-change: opacity, transform, color;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.mdc-text-field__input {
  width: 100%;
  min-width: 0;
  border: none;
  border-radius: 0;
  background: none;
  padding: 0;
  -moz-appearance: none;
  -webkit-appearance: none;
  height: 28px;
}
.mdc-text-field__input::-webkit-calendar-picker-indicator, .mdc-text-field__input::-webkit-search-cancel-button {
  display: none;
}
.mdc-text-field__input::-ms-clear {
  display: none;
}
.mdc-text-field__input:focus {
  outline: none;
}
.mdc-text-field__input:invalid {
  box-shadow: none;
}
.mdc-text-field__input::placeholder {
  opacity: 0;
}
.mdc-text-field__input::-moz-placeholder {
  opacity: 0;
}
.mdc-text-field__input::-webkit-input-placeholder {
  opacity: 0;
}
.mdc-text-field__input:-ms-input-placeholder {
  opacity: 0;
}
.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mdc-text-field--focused .mdc-text-field__input::placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {
  opacity: 1;
}
.mdc-text-field--%NS%disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::placeholder {
  opacity: 0;
}
.mdc-text-field--%NS%disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-moz-placeholder {
  opacity: 0;
}
.mdc-text-field--%NS%disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-webkit-input-placeholder {
  opacity: 0;
}
.mdc-text-field--%NS%disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive:-ms-input-placeholder {
  opacity: 0;
}
.mdc-text-field--outlined .mdc-text-field__input, .mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input {
  height: 100%;
}
.mdc-text-field--outlined .mdc-text-field__input {
  display: flex;
  border: none !important;
  background-color: transparent;
}
.mdc-text-field--disabled .mdc-text-field__input {
  pointer-events: auto;
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--%NS%mat-form-field-filled-input-text-color, var(--%NS%mat-sys-on-surface));
  caret-color: var(--%NS%mat-form-field-filled-caret-color, var(--%NS%mat-sys-primary));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--%NS%mat-form-field-filled-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--%NS%mat-form-field-filled-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--%NS%mat-form-field-filled-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--%NS%mat-form-field-filled-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--%NS%mat-form-field-outlined-input-text-color, var(--%NS%mat-sys-on-surface));
  caret-color: var(--%NS%mat-form-field-outlined-caret-color, var(--%NS%mat-sys-primary));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--%NS%mat-form-field-outlined-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--%NS%mat-form-field-outlined-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--%NS%mat-form-field-outlined-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--%NS%mat-form-field-outlined-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--%NS%invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--%NS%mat-form-field-filled-error-caret-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--outlined.mdc-text-field--%NS%invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--%NS%mat-form-field-outlined-error-caret-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--%NS%mat-form-field-filled-disabled-input-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--%NS%mat-form-field-outlined-disabled-input-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-text-field--disabled .mdc-text-field__input {
    background-color: Window;
  }
}

.mdc-text-field--filled {
  height: 56px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  border-top-left-radius: var(--%NS%mat-form-field-filled-container-shape, var(--%NS%mat-sys-corner-extra-small));
  border-top-right-radius: var(--%NS%mat-form-field-filled-container-shape, var(--%NS%mat-sys-corner-extra-small));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) {
  background-color: var(--%NS%mat-form-field-filled-container-color, var(--%NS%mat-sys-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled {
  background-color: var(--%NS%mat-form-field-filled-disabled-container-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 4%, transparent));
}

.mdc-text-field--outlined {
  height: 56px;
  overflow: visible;
  padding-right: max(16px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small)));
  padding-left: max(16px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small)) + 4px);
}
[dir=rtl] .mdc-text-field--outlined {
  padding-right: max(16px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small)) + 4px);
  padding-left: max(16px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small)));
}

.mdc-floating-label {
  position: absolute;
  left: 0;
  transform-origin: left top;
  line-height: 1.15rem;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: text;
  overflow: hidden;
  will-change: transform;
}
[dir=rtl] .mdc-floating-label {
  right: 0;
  left: auto;
  transform-origin: right top;
  text-align: right;
}
.mdc-text-field .mdc-floating-label {
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}
.mdc-notched-outline .mdc-floating-label {
  display: inline-block;
  position: relative;
  max-width: 100%;
}
.mdc-text-field--outlined .mdc-floating-label {
  left: 4px;
  right: auto;
}
[dir=rtl] .mdc-text-field--outlined .mdc-floating-label {
  left: auto;
  right: 4px;
}
.mdc-text-field--filled .mdc-floating-label {
  left: 16px;
  right: auto;
}
[dir=rtl] .mdc-text-field--filled .mdc-floating-label {
  left: auto;
  right: 16px;
}
.mdc-text-field--disabled .mdc-floating-label {
  cursor: default;
}
@media (forced-colors: active) {
  .mdc-text-field--disabled .mdc-floating-label {
    z-index: 1;
  }
}
.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label {
  display: none;
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-label-text-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-focus-label-text-color, var(--%NS%mat-sys-primary));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-hover-label-text-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-error-label-text-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-error-focus-label-text-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--%NS%invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-error-hover-label-text-color, var(--%NS%mat-sys-on-error-container));
}
.mdc-text-field--filled .mdc-floating-label {
  font-family: var(--%NS%mat-form-field-filled-label-text-font, var(--%NS%mat-sys-body-large-font));
  font-size: var(--%NS%mat-form-field-filled-label-text-size, var(--%NS%mat-sys-body-large-size));
  font-weight: var(--%NS%mat-form-field-filled-label-text-weight, var(--%NS%mat-sys-body-large-weight));
  letter-spacing: var(--%NS%mat-form-field-filled-label-text-tracking, var(--%NS%mat-sys-body-large-tracking));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-label-text-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-focus-label-text-color, var(--%NS%mat-sys-primary));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-hover-label-text-color, var(--%NS%mat-sys-on-surface));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-error-label-text-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-error-focus-label-text-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--%NS%invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-error-hover-label-text-color, var(--%NS%mat-sys-on-error-container));
}
.mdc-text-field--outlined .mdc-floating-label {
  font-family: var(--%NS%mat-form-field-outlined-label-text-font, var(--%NS%mat-sys-body-large-font));
  font-size: var(--%NS%mat-form-field-outlined-label-text-size, var(--%NS%mat-sys-body-large-size));
  font-weight: var(--%NS%mat-form-field-outlined-label-text-weight, var(--%NS%mat-sys-body-large-weight));
  letter-spacing: var(--%NS%mat-form-field-outlined-label-text-tracking, var(--%NS%mat-sys-body-large-tracking));
}

.mdc-floating-label--float-above {
  cursor: auto;
  transform: translateY(-106%) scale(0.75);
}
.mdc-text-field--filled .mdc-floating-label--float-above {
  transform: translateY(-106%) scale(0.75);
}
.mdc-text-field--outlined .mdc-floating-label--float-above {
  transform: translateY(-37.25px) scale(1);
  font-size: 0.75rem;
}
.mdc-notched-outline .mdc-floating-label--float-above {
  text-overflow: clip;
}
.mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  max-width: 133.3333333333%;
}
.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  transform: translateY(-34.75px) scale(0.75);
}
.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: 1rem;
}

.mdc-floating-label--%NS%required:not(.mdc-floating-label--hide-required-marker)::after {
  margin-left: 1px;
  margin-right: 0;
  content: "*";
}
[dir=rtl] .mdc-floating-label--%NS%required:not(.mdc-floating-label--hide-required-marker)::after {
  margin-left: 0;
  margin-right: 1px;
}

.mdc-notched-outline {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  height: 100%;
  text-align: left;
  pointer-events: none;
}
[dir=rtl] .mdc-notched-outline {
  text-align: right;
}
.mdc-text-field--outlined .mdc-notched-outline {
  z-index: 1;
}

.mat-mdc-notch-piece {
  box-sizing: border-box;
  height: 100%;
  pointer-events: none;
  border: none;
  border-top: 1px solid;
  border-bottom: 1px solid;
}
.mdc-text-field--focused .mat-mdc-notch-piece {
  border-width: 2px;
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-outline-color, var(--%NS%mat-sys-outline));
  border-width: var(--%NS%mat-form-field-outlined-outline-width, 1px);
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-hover-outline-color, var(--%NS%mat-sys-on-surface));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-focus-outline-color, var(--%NS%mat-sys-primary));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-disabled-outline-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-error-outline-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--%NS%invalid:not(.mdc-text-field--focused):hover .mdc-notched-outline .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-error-hover-outline-color, var(--%NS%mat-sys-on-error-container));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-error-focus-outline-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mat-mdc-notch-piece {
  border-width: var(--%NS%mat-form-field-outlined-focus-outline-width, 2px);
}

.mdc-notched-outline__leading {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading {
  width: max(12px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small)));
}
[dir=rtl] .mdc-notched-outline__leading {
  border-left: none;
  border-right: 1px solid;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  border-top-right-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
}

.mdc-notched-outline__trailing {
  flex-grow: 1;
  border-left: none;
  border-right: 1px solid;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
}
[dir=rtl] .mdc-notched-outline__trailing {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
}

.mdc-notched-outline__notch {
  flex: 0 0 auto;
  width: auto;
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch {
  max-width: min(var(--%NS%mat-form-field-notch-max-width, 100%), calc(100% - max(12px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small))) * 2));
}
.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  max-width: min(100%, calc(100% - max(12px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small))) * 2));
}
.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-top: 1px;
}
.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-top: 2px;
}
.mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-left: 0;
  padding-right: 8px;
  border-top: none;
}
[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-left: 8px;
  padding-right: 0;
}
.mdc-notched-outline--no-label .mdc-notched-outline__notch {
  display: none;
}

.mdc-line-ripple::before, .mdc-line-ripple::after {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom-style: solid;
  content: "";
}
.mdc-line-ripple::before {
  z-index: 1;
  border-bottom-width: var(--%NS%mat-form-field-filled-active-indicator-height, 1px);
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before {
  border-bottom-color: var(--%NS%mat-form-field-filled-active-indicator-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--%NS%mat-form-field-filled-hover-active-indicator-color, var(--%NS%mat-sys-on-surface));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-line-ripple::before {
  border-bottom-color: var(--%NS%mat-form-field-filled-disabled-active-indicator-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-line-ripple::before {
  border-bottom-color: var(--%NS%mat-form-field-filled-error-active-indicator-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--%NS%invalid:not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--%NS%mat-form-field-filled-error-hover-active-indicator-color, var(--%NS%mat-sys-on-error-container));
}
.mdc-line-ripple::after {
  transform: scaleX(0);
  opacity: 0;
  z-index: 2;
}
.mdc-text-field--filled .mdc-line-ripple::after {
  border-bottom-width: var(--%NS%mat-form-field-filled-focus-active-indicator-height, 2px);
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--%NS%mat-form-field-filled-focus-active-indicator-color, var(--%NS%mat-sys-primary));
}
.mdc-text-field--filled.mdc-text-field--%NS%invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--%NS%mat-form-field-filled-error-focus-active-indicator-color, var(--%NS%mat-sys-error));
}

.mdc-line-ripple--%NS%active::after {
  transform: scaleX(1);
  opacity: 1;
}

.mdc-line-ripple--%NS%deactivating::after {
  opacity: 0;
}

.mdc-text-field--disabled {
  pointer-events: none;
}

.mat-mdc-form-field-textarea-control {
  vertical-align: middle;
  resize: vertical;
  box-sizing: border-box;
  height: auto;
  margin: 0;
  padding: 0;
  border: none;
  overflow: auto;
}

.mat-mdc-form-field-input-control.mat-mdc-form-field-input-control {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font: inherit;
  letter-spacing: inherit;
  text-decoration: inherit;
  text-transform: inherit;
  border: none;
}

.mat-mdc-form-field .mat-mdc-floating-label.mdc-floating-label {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  line-height: normal;
  pointer-events: all;
  will-change: auto;
}

.mat-mdc-form-field:not(.mat-form-field-disabled) .mat-mdc-floating-label.mdc-floating-label {
  cursor: inherit;
}

.mdc-text-field--%NS%no-label:not(.mdc-text-field--textarea) .mat-mdc-form-field-input-control.mdc-text-field__input,
.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control {
  height: auto;
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control.mdc-text-field__input[type=color] {
  height: 23px;
}

.mat-mdc-text-field-wrapper {
  height: auto;
  flex: auto;
  will-change: auto;
}

.mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {
  padding-left: 0;
  --%NS%mat-mdc-form-field-label-offset-x: -16px;
}

.mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {
  padding-right: 0;
}

[dir=rtl] .mat-mdc-text-field-wrapper {
  padding-left: 16px;
  padding-right: 16px;
}
[dir=rtl] .mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {
  padding-left: 0;
}
[dir=rtl] .mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {
  padding-right: 0;
}

.mat-form-field-disabled .mdc-text-field__input::placeholder {
  color: var(--%NS%mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-moz-placeholder {
  color: var(--%NS%mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--%NS%mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input:-ms-input-placeholder {
  color: var(--%NS%mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-form-field-label-always-float .mdc-text-field__input::placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
  opacity: 1;
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-infix .mat-mdc-floating-label {
  left: auto;
  right: auto;
}

.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-text-field__input {
  display: inline-block;
}

.mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field .mdc-notched-outline__notch {
  padding-top: 0;
}

.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {
  border-left: 1px solid transparent;
}

[dir=rtl] .mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {
  border-left: none;
  border-right: 1px solid transparent;
}

.mat-mdc-form-field-infix {
  min-height: var(--%NS%mat-form-field-container-height, 56px);
  padding-top: var(--%NS%mat-form-field-filled-with-label-container-padding-top, 24px);
  padding-bottom: var(--%NS%mat-form-field-filled-with-label-container-padding-bottom, 8px);
}
.mdc-text-field--outlined .mat-mdc-form-field-infix, .mdc-text-field--no-label .mat-mdc-form-field-infix {
  padding-top: var(--%NS%mat-form-field-container-vertical-padding, 16px);
  padding-bottom: var(--%NS%mat-form-field-container-vertical-padding, 16px);
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-mdc-floating-label {
  top: calc(var(--%NS%mat-form-field-container-height, 56px) / 2);
}

.mdc-text-field--filled .mat-mdc-floating-label {
  display: var(--%NS%mat-form-field-filled-label-display, block);
}

.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  --%NS%mat-mdc-form-field-label-transform: translateY(calc(calc(6.75px + var(--%NS%mat-form-field-container-height, 56px) / 2) * -1))
    scale(var(--%NS%mat-mdc-form-field-floating-label-scale, 0.75));
  transform: var(--%NS%mat-mdc-form-field-label-transform);
}

@keyframes _mat-form-field-subscript-animation {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.mat-mdc-form-field-subscript-wrapper {
  box-sizing: border-box;
  width: 100%;
  position: relative;
}

.mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field-error-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 16px;
  opacity: 1;
  transform: translateY(0);
  animation: _mat-form-field-subscript-animation 0ms cubic-bezier(0.55, 0, 0.55, 0.2);
}

.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-error-wrapper {
  position: static;
}

.mat-mdc-form-field-bottom-align::before {
  content: "";
  display: inline-block;
  height: 16px;
}

.mat-mdc-form-field-bottom-align.mat-mdc-form-field-subscript-dynamic-size::before {
  content: unset;
}

.mat-mdc-form-field-hint-end {
  order: 1;
}

.mat-mdc-form-field-hint-wrapper {
  display: flex;
}

.mat-mdc-form-field-hint-spacer {
  flex: 1 0 1em;
}

.mat-mdc-form-field-error {
  display: block;
  color: var(--%NS%mat-form-field-error-text-color, var(--%NS%mat-sys-error));
}

.mat-mdc-form-field-subscript-wrapper,
.mat-mdc-form-field-bottom-align::before {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--%NS%mat-form-field-subscript-text-font, var(--%NS%mat-sys-body-small-font));
  line-height: var(--%NS%mat-form-field-subscript-text-line-height, var(--%NS%mat-sys-body-small-line-height));
  font-size: var(--%NS%mat-form-field-subscript-text-size, var(--%NS%mat-sys-body-small-size));
  letter-spacing: var(--%NS%mat-form-field-subscript-text-tracking, var(--%NS%mat-sys-body-small-tracking));
  font-weight: var(--%NS%mat-form-field-subscript-text-weight, var(--%NS%mat-sys-body-small-weight));
}

.mat-mdc-form-field-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  opacity: 0;
  pointer-events: none;
  background-color: var(--%NS%mat-form-field-state-layer-color, var(--%NS%mat-sys-on-surface));
}
.mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-focus-overlay {
  opacity: var(--%NS%mat-form-field-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-mdc-form-field.mat-focused .mat-mdc-form-field-focus-overlay {
  opacity: var(--%NS%mat-form-field-focus-state-layer-opacity, 0);
}

select.mat-mdc-form-field-input-control {
  -moz-appearance: none;
  -webkit-appearance: none;
  background-color: transparent;
  display: inline-flex;
  box-sizing: border-box;
}
select.mat-mdc-form-field-input-control:not(:disabled) {
  cursor: pointer;
}
select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option {
  color: var(--%NS%mat-form-field-select-option-text-color, var(--%NS%mat-sys-neutral10));
}
select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option:disabled {
  color: var(--%NS%mat-form-field-select-disabled-option-text-color, color-mix(in srgb, var(--%NS%mat-sys-neutral10) 38%, transparent));
}

.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {
  content: "";
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid;
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -2.5px;
  pointer-events: none;
  color: var(--%NS%mat-form-field-enabled-select-arrow-color, var(--%NS%mat-sys-on-surface-variant));
}
[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {
  right: auto;
  left: 0;
}
.mat-mdc-form-field-type-mat-native-select.mat-focused .mat-mdc-form-field-infix::after {
  color: var(--%NS%mat-form-field-focus-select-arrow-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-form-field-type-mat-native-select.mat-form-field-disabled .mat-mdc-form-field-infix::after {
  color: var(--%NS%mat-form-field-disabled-select-arrow-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {
  padding-right: 15px;
}
[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {
  padding-right: 0;
  padding-left: 15px;
}

@media (forced-colors: active) {
  .mat-form-field-appearance-fill .mat-mdc-text-field-wrapper {
    outline: solid 1px;
  }
}
@media (forced-colors: active) {
  .mat-form-field-appearance-fill.mat-form-field-disabled .mat-mdc-text-field-wrapper {
    outline-color: GrayText;
  }
}

@media (forced-colors: active) {
  .mat-form-field-appearance-fill.mat-focused .mat-mdc-text-field-wrapper {
    outline: dashed 3px;
  }
}

@media (forced-colors: active) {
  .mat-mdc-form-field.mat-focused .mdc-notched-outline {
    border: dashed 3px;
  }
}

.mat-mdc-form-field-input-control[type=date], .mat-mdc-form-field-input-control[type=datetime], .mat-mdc-form-field-input-control[type=datetime-local], .mat-mdc-form-field-input-control[type=month], .mat-mdc-form-field-input-control[type=week], .mat-mdc-form-field-input-control[type=time] {
  line-height: 1;
}
.mat-mdc-form-field-input-control::-webkit-datetime-edit {
  line-height: 1;
  padding: 0;
  margin-bottom: -2px;
}

.mat-mdc-form-field {
  --%NS%mat-mdc-form-field-floating-label-scale: 0.75;
  display: inline-flex;
  flex-direction: column;
  min-width: 0;
  text-align: left;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--%NS%mat-form-field-container-text-font, var(--%NS%mat-sys-body-large-font));
  line-height: var(--%NS%mat-form-field-container-text-line-height, var(--%NS%mat-sys-body-large-line-height));
  font-size: var(--%NS%mat-form-field-container-text-size, var(--%NS%mat-sys-body-large-size));
  letter-spacing: var(--%NS%mat-form-field-container-text-tracking, var(--%NS%mat-sys-body-large-tracking));
  font-weight: var(--%NS%mat-form-field-container-text-weight, var(--%NS%mat-sys-body-large-weight));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-floating-label--float-above {
  font-size: calc(var(--%NS%mat-form-field-outlined-label-text-populated-size) * var(--%NS%mat-mdc-form-field-floating-label-scale));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: var(--%NS%mat-form-field-outlined-label-text-populated-size);
}
[dir=rtl] .mat-mdc-form-field {
  text-align: right;
}

.mat-mdc-form-field-flex {
  display: inline-flex;
  align-items: baseline;
  box-sizing: border-box;
  width: 100%;
}

.mat-mdc-text-field-wrapper {
  width: 100%;
  z-index: 0;
}

.mat-mdc-form-field-icon-prefix,
.mat-mdc-form-field-icon-suffix {
  align-self: center;
  line-height: 0;
  pointer-events: auto;
  position: relative;
  z-index: 1;
}
.mat-mdc-form-field-icon-prefix > .mat-icon,
.mat-mdc-form-field-icon-suffix > .mat-icon {
  padding: 0 12px;
  box-sizing: content-box;
}

.mat-mdc-form-field-icon-prefix {
  color: var(--%NS%mat-form-field-leading-icon-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-prefix {
  color: var(--%NS%mat-form-field-disabled-leading-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-form-field-icon-suffix {
  color: var(--%NS%mat-form-field-trailing-icon-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-suffix {
  color: var(--%NS%mat-form-field-disabled-trailing-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-invalid .mat-mdc-form-field-icon-suffix {
  color: var(--%NS%mat-form-field-error-trailing-icon-color, var(--%NS%mat-sys-error));
}
.mat-form-field-invalid:not(.mat-focused):not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-icon-suffix {
  color: var(--%NS%mat-form-field-error-hover-trailing-icon-color, var(--%NS%mat-sys-on-error-container));
}
.mat-form-field-invalid.mat-focused .mat-mdc-text-field-wrapper .mat-mdc-form-field-icon-suffix {
  color: var(--%NS%mat-form-field-error-focus-trailing-icon-color, var(--%NS%mat-sys-error));
}

.mat-mdc-form-field-icon-prefix,
[dir=rtl] .mat-mdc-form-field-icon-suffix {
  padding: 0 4px 0 0;
}

.mat-mdc-form-field-icon-suffix,
[dir=rtl] .mat-mdc-form-field-icon-prefix {
  padding: 0 0 0 4px;
}

.mat-mdc-form-field-subscript-wrapper .mat-icon,
.mat-mdc-form-field label .mat-icon {
  width: 1em;
  height: 1em;
  font-size: inherit;
}

.mat-mdc-form-field-infix {
  flex: auto;
  min-width: 0;
  width: 180px;
  position: relative;
  box-sizing: border-box;
}
.mat-mdc-form-field-infix:has(textarea[cols]) {
  width: auto;
}

.mat-mdc-form-field .mdc-notched-outline__notch {
  margin-left: -1px;
  -webkit-clip-path: inset(-9em -999em -9em 1px);
  clip-path: inset(-9em -999em -9em 1px);
}
[dir=rtl] .mat-mdc-form-field .mdc-notched-outline__notch {
  margin-left: 0;
  margin-right: -1px;
  -webkit-clip-path: inset(-9em 1px -9em -999em);
  clip-path: inset(-9em 1px -9em -999em);
}

.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-floating-label {
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input {
  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-moz-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-webkit-input-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input:-ms-input-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field--%NS%filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before {
  transition-duration: 75ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-line-ripple::after {
  transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1), opacity 180ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-error-wrapper {
  animation-duration: 300ms;
}

.mdc-notched-outline .mdc-floating-label {
  max-width: calc(100% + 1px);
}

.mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  max-width: calc(133.3333333333% + 1px);
}
`],encapsulation:2})})()}return e})();var Yo=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=ee({type:e});static \u0275inj=K({imports:[my,jl,nt]})}return e})();var VI=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275cmp=X({type:e,selectors:[["ng-component"]],hostAttrs:["cdk-text-field-style-loader",""],decls:0,vars:0,template:function(r,i){},styles:[`textarea.cdk-textarea-autosize {
  resize: none;
}

textarea.cdk-textarea-autosize-measuring {
  padding: 2px 0 !important;
  box-sizing: content-box !important;
  height: auto !important;
  overflow: hidden !important;
}

textarea.cdk-textarea-autosize-measuring-firefox {
  padding: 2px 0 !important;
  box-sizing: content-box !important;
  height: 0 !important;
}

@keyframes cdk-text-field-autofill-start { /*!*/ }
@keyframes cdk-text-field-autofill-end { /*!*/ }
.cdk-text-field-autofill-monitored:-webkit-autofill {
  animation: cdk-text-field-autofill-start 0s 1ms;
}

.cdk-text-field-autofill-monitored:not(:-webkit-autofill) {
  animation: cdk-text-field-autofill-end 0s 1ms;
}
`],encapsulation:2})}return e})(),jI={passive:!0},Ay=(()=>{class e{_platform=f(Se);_ngZone=f(A);_renderer=f(Ve).createRenderer(null,null);_styleLoader=f(Dt);_monitoredElements=new Map;monitor(t){if(!this._platform.isBrowser)return er;this._styleLoader.load(VI);let r=ut(t),i=this._monitoredElements.get(r);if(i)return i.subject;let o=new L,a="cdk-text-field-autofilled",s=c=>{c.animationName==="cdk-text-field-autofill-start"&&!r.classList.contains(a)?(r.classList.add(a),this._ngZone.run(()=>o.next({target:c.target,isAutofilled:!0}))):c.animationName==="cdk-text-field-autofill-end"&&r.classList.contains(a)&&(r.classList.remove(a),this._ngZone.run(()=>o.next({target:c.target,isAutofilled:!1})))},l=this._ngZone.runOutsideAngular(()=>(r.classList.add("cdk-text-field-autofill-monitored"),this._renderer.listen(r,"animationstart",s,jI)));return this._monitoredElements.set(r,{subject:o,unlisten:l}),o}stopMonitoring(t){let r=ut(t),i=this._monitoredElements.get(r);i&&(i.unlisten(),i.subject.complete(),r.classList.remove("cdk-text-field-autofill-monitored"),r.classList.remove("cdk-text-field-autofilled"),this._monitoredElements.delete(r))}ngOnDestroy(){this._monitoredElements.forEach((t,r)=>this.stopMonitoring(r))}static \u0275fac=function(r){return new(r||e)};static \u0275prov=k({token:e,factory:e.\u0275fac})}return e})();var ky=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=ee({type:e});static \u0275inj=K({})}return e})();var Ry=new y("MAT_INPUT_VALUE_ACCESSOR");var Oy=(()=>{class e{isErrorState(t,r){return!!(t&&t.invalid&&(t.touched||r&&r.submitted))}isSignalErrorState(t){if(!t)return!1;let r=t().invalid(),i=t().touched();return r&&i}static \u0275fac=function(r){return new(r||e)};static \u0275prov=k({token:e,factory:e.\u0275fac})}return e})();var Bl=class{_defaultMatcher;_parentFormGroup;_parentForm;_stateChanges;errorState=!1;matcher;ngControl;formField;constructor(n,t,r,i,o){this._defaultMatcher=n,this._parentFormGroup=r,this._parentForm=i,this._stateChanges=o,t?zt(t.field)&&!t.updateValueAndValidity?(this.formField=t,this.ngControl=null):(this.formField=null,this.ngControl=t):this.ngControl=this.formField=null}updateErrorState(){let n=this.errorState,t=this._getCurrentErrorState(this.matcher||this._defaultMatcher);t!==n&&(this.errorState=t,this._stateChanges.next())}_getCurrentErrorState(n){if(this.formField&&n?.isSignalErrorState)return n.isSignalErrorState(this.formField.field())??!1;let t=this._parentFormGroup||this._parentForm,r=this.ngControl?this.ngControl.control:null;return n?.isErrorState(r,t)??!1}};var BI=["button","checkbox","file","hidden","image","radio","range","reset","submit"],HI=new y("MAT_INPUT_CONFIG"),Fy=(()=>{class e{_elementRef=f(Z);_platform=f(Se);ngControl=f(Bn,{optional:!0,self:!0});_autofillMonitor=f(Ay);_ngZone=f(A);_formField=f(em,{optional:!0});_renderer=f(ze);_uid=f(Et).getId("mat-input-");_previousNativeValue;_inputValueAccessor;_signalBasedValueAccessor;_previousPlaceholder=null;_errorStateTracker;_config=f(HI,{optional:!0});_cleanupIosKeyup;_cleanupWebkitWheel;_isServer=!1;_isNativeSelect=!1;_isTextarea=!1;_isInFormField=!1;focused=!1;stateChanges=new L;controlType="mat-input";autofilled=!1;get disabled(){return this._disabled}set disabled(t){this._disabled=vn(t),this.focused&&(this.focused=!1,this.stateChanges.next())}_disabled=!1;get id(){return this._id}set id(t){this._id=t||this._uid}_id;placeholder;name;get required(){return this._required??this.ngControl?.control?.hasValidator(jo.required)??!1}set required(t){this._required=vn(t)}_required;get type(){return this._type}set type(t){this._type=t||"text",this._validateType(),!this._isTextarea&&Zf().has(this._type)&&(this._elementRef.nativeElement.type=this._type)}_type="text";get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(t){this._errorStateTracker.matcher=t}userAriaDescribedBy;get value(){return this._signalBasedValueAccessor?this._signalBasedValueAccessor.value():this._inputValueAccessor.value}set value(t){t!==this.value&&(this._signalBasedValueAccessor?this._signalBasedValueAccessor.value.set(t):this._inputValueAccessor.value=t,this.stateChanges.next())}get readonly(){return this._readonly}set readonly(t){this._readonly=vn(t)}_readonly=!1;disabledInteractive;get errorState(){return this._errorStateTracker.errorState}set errorState(t){this._errorStateTracker.errorState=t}_neverEmptyInputTypes=["date","datetime","datetime-local","month","time","week"].filter(t=>Zf().has(t));constructor(){let t=f(Hf,{optional:!0}),r=f(Rr,{optional:!0}),i=f(Oy),o=f(Ry,{optional:!0,self:!0}),a=f(Ll,{optional:!0,self:!0}),s=this._elementRef.nativeElement,l=s.nodeName.toLowerCase();o?zt(o.value)?this._signalBasedValueAccessor=o:this._inputValueAccessor=o:this._inputValueAccessor=s,this._previousNativeValue=this.value,this.id=this.id,this._platform.IOS&&this._ngZone.runOutsideAngular(()=>{this._cleanupIosKeyup=this._renderer.listen(s,"keyup",this._iOSKeyupListener)}),this._errorStateTracker=new Bl(i,a||this.ngControl,r,t,this.stateChanges),this._isServer=!this._platform.isBrowser,this._isNativeSelect=l==="select",this._isTextarea=l==="textarea",this._isInFormField=!!this._formField,this.disabledInteractive=this._config?.disabledInteractive||!1,this._isNativeSelect&&(this.controlType=s.multiple?"mat-native-select-multiple":"mat-native-select"),this._signalBasedValueAccessor&&Ht(()=>{this._signalBasedValueAccessor.value(),this.stateChanges.next()})}ngAfterViewInit(){this._platform.isBrowser&&this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe(t=>{this.autofilled=t.isAutofilled,this.stateChanges.next()})}ngOnChanges(){this.stateChanges.next()}ngOnDestroy(){this.stateChanges.complete(),this._platform.isBrowser&&this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement),this._cleanupIosKeyup?.(),this._cleanupWebkitWheel?.()}ngDoCheck(){this.ngControl&&(this.updateErrorState(),this.ngControl.disabled!==null&&this.ngControl.disabled!==this.disabled&&(this.disabled=this.ngControl.disabled,this.stateChanges.next())),this._dirtyCheckNativeValue(),this._dirtyCheckPlaceholder()}focus(t){this._elementRef.nativeElement.focus(t)}updateErrorState(){this._errorStateTracker.updateErrorState()}_focusChanged(t){if(t!==this.focused){if(!this._isNativeSelect&&t&&this.disabled&&this.disabledInteractive){let r=this._elementRef.nativeElement;r.type==="number"?(r.type="text",r.setSelectionRange(0,0),r.type="number"):r.setSelectionRange(0,0)}this.focused=t,this.stateChanges.next()}}_onInput(){}_dirtyCheckNativeValue(){let t=this._elementRef.nativeElement.value;this._previousNativeValue!==t&&(this._previousNativeValue=t,this.stateChanges.next())}_dirtyCheckPlaceholder(){let t=this._getPlaceholder();if(t!==this._previousPlaceholder){let r=this._elementRef.nativeElement;this._previousPlaceholder=t,t?r.setAttribute("placeholder",t):r.removeAttribute("placeholder")}}_getPlaceholder(){return this.placeholder||null}_validateType(){BI.indexOf(this._type)>-1}_isNeverEmpty(){return this._neverEmptyInputTypes.indexOf(this._type)>-1}_isBadInput(){let t=this._elementRef.nativeElement.validity;return t&&t.badInput}get empty(){return!this._isNeverEmpty()&&!this._elementRef.nativeElement.value&&!this._isBadInput()&&!this.autofilled}get shouldLabelFloat(){if(this._isNativeSelect){let t=this._elementRef.nativeElement,r=t.options[0];return this.focused||t.multiple||!this.empty||!!(t.selectedIndex>-1&&r&&r.label)}else return this.focused&&!this.disabled||!this.empty}get describedByIds(){return this._elementRef.nativeElement.getAttribute("aria-describedby")?.split(" ")||[]}setDescribedByIds(t){let r=this._elementRef.nativeElement;t.length?r.setAttribute("aria-describedby",t.join(" ")):r.removeAttribute("aria-describedby")}onContainerClick(){this.focused||this.focus()}_isInlineSelect(){let t=this._elementRef.nativeElement;return this._isNativeSelect&&(t.multiple||t.size>1)}_iOSKeyupListener=t=>{let r=t.target;!r.value&&r.selectionStart===0&&r.selectionEnd===0&&(r.setSelectionRange(1,1),r.setSelectionRange(0,0))};_getReadonlyAttribute(){return this._isNativeSelect?null:this.readonly||this.disabled&&this.disabledInteractive?"true":null}static \u0275fac=function(r){return new(r||e)};static \u0275dir=q({type:e,selectors:[["input","matInput",""],["textarea","matInput",""],["select","matNativeControl",""],["input","matNativeControl",""],["textarea","matNativeControl",""]],hostAttrs:[1,"mat-mdc-input-element"],hostVars:21,hostBindings:function(r,i){r&1&&me("focus",function(){return i._focusChanged(!0)})("blur",function(){return i._focusChanged(!1)})("input",function(){return i._onInput()}),r&2&&(Pn("id",i.id)("disabled",i.disabled&&!i.disabledInteractive)("required",i.required),je("name",i.name||null)("readonly",i._getReadonlyAttribute())("aria-disabled",i.disabled&&i.disabledInteractive?"true":null)("aria-invalid",i.empty&&i.required?null:i.errorState)("aria-required",i.required)("id",i.id),$("mat-input-server",i._isServer)("mat-mdc-form-field-textarea-control",i._isInFormField&&i._isTextarea)("mat-mdc-form-field-input-control",i._isInFormField)("mat-mdc-input-disabled-interactive",i.disabledInteractive)("mdc-text-field__input",i._isInFormField)("mat-mdc-native-select-inline",i._isInlineSelect()))},inputs:{disabled:"disabled",id:"id",placeholder:"placeholder",name:"name",required:"required",type:"type",errorStateMatcher:"errorStateMatcher",userAriaDescribedBy:[0,"aria-describedby","userAriaDescribedBy"],value:"value",readonly:"readonly",disabledInteractive:[2,"disabledInteractive","disabledInteractive",xe]},exportAs:["matInput"],features:[Ne([{provide:Jf,useExisting:e}]),dt]})}return e})(),Py=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=ee({type:e});static \u0275inj=K({imports:[Yo,Yo,ky,nt]})}return e})();var UI=20,tm=(()=>{class e{_ngZone=f(A);_platform=f(Se);_renderer=f(Ve).createRenderer(null,null);_cleanupGlobalListener;_scrolled=new L;_scrolledCount=0;scrollContainers=new Map;register(t){this.scrollContainers.has(t)||this.scrollContainers.set(t,t.elementScrolled().subscribe(()=>this._scrolled.next(t)))}deregister(t){let r=this.scrollContainers.get(t);r&&(r.unsubscribe(),this.scrollContainers.delete(t))}scrolled(t=UI){return this._platform.isBrowser?new W(r=>{this._cleanupGlobalListener||(this._cleanupGlobalListener=this._ngZone.runOutsideAngular(()=>this._renderer.listen("document","scroll",()=>this._scrolled.next())));let i=t>0?this._scrolled.pipe(Ra(t)).subscribe(r):this._scrolled.subscribe(r);return this._scrolledCount++,()=>{i.unsubscribe(),this._scrolledCount--,this._scrolledCount||(this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0)}}):st()}ngOnDestroy(){this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0,this.scrollContainers.forEach((t,r)=>this.deregister(r)),this._scrolled.complete()}ancestorScrolled(t,r){let i=this.getAncestorScrollContainers(t);return this.scrolled(r).pipe(lt(o=>!o||i.indexOf(o)>-1))}getAncestorScrollContainers(t){let r=[];return this.scrollContainers.forEach((i,o)=>{this._targetContainsElement(o,t)&&r.push(o)}),r}_targetContainsElement(t,r){let i=ut(r),o=t.getElementRef().nativeElement;do if(i==o)return!0;while(i=i.parentElement);return!1}static \u0275fac=function(r){return new(r||e)};static \u0275prov=k({token:e,factory:e.\u0275fac})}return e})();var $I=20,Zo=(()=>{class e{_platform=f(Se);_listeners;_viewportSize=null;_change=new L;_document=f(j);constructor(){let t=f(A),r=f(Ve).createRenderer(null,null);t.runOutsideAngular(()=>{if(this._platform.isBrowser){let i=o=>this._change.next(o);this._listeners=[r.listen("window","resize",i),r.listen("window","orientationchange",i)]}this.change().subscribe(()=>this._viewportSize=null)})}ngOnDestroy(){this._listeners?.forEach(t=>t()),this._change.complete()}getViewportSize(){this._viewportSize||this._updateViewportSize();let t={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),t}getViewportRect(){let t=this.getViewportScrollPosition(),{width:r,height:i}=this.getViewportSize();return{top:t.top,left:t.left,bottom:t.top+i,right:t.left+r,height:i,width:r}}getViewportScrollPosition(){if(!this._platform.isBrowser)return{top:0,left:0};let t=this._document,r=this._getWindow(),i=t.documentElement,o=i.getBoundingClientRect(),a=-o.top||t.body?.scrollTop||r.scrollY||i.scrollTop||0,s=-o.left||t.body?.scrollLeft||r.scrollX||i.scrollLeft||0;return{top:a,left:s}}change(t=$I){return t>0?this._change.pipe(Ra(t)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){let t=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:t.innerWidth,height:t.innerHeight}:{width:0,height:0}}static \u0275fac=function(r){return new(r||e)};static \u0275prov=k({token:e,factory:e.\u0275fac})}return e})();var Xo=class{_attachedHost=null;attach(n){return this._attachedHost=n,n.attach(this)}detach(){let n=this._attachedHost;n!=null&&(this._attachedHost=null,n.detach())}get isAttached(){return this._attachedHost!=null}setAttachedHost(n){this._attachedHost=n}},Ko=class extends Xo{component;viewContainerRef;injector;projectableNodes;bindings;directives;constructor(n,t,r,i,o,a){super(),this.component=n,this.viewContainerRef=t,this.injector=r,this.projectableNodes=i,this.bindings=o||null,this.directives=a||null}},Hl=class extends Xo{templateRef;viewContainerRef;context;injector;constructor(n,t,r,i){super(),this.templateRef=n,this.viewContainerRef=t,this.context=r,this.injector=i}get origin(){return this.templateRef.elementRef}attach(n,t=this.context){return this.context=t,super.attach(n)}detach(){return this.context=void 0,super.detach()}},nm=class extends Xo{element;constructor(n){super(),this.element=n instanceof Z?n.nativeElement:n}},rm=class{_attachedPortal=null;_disposeFn=null;_isDisposed=!1;hasAttached(){return!!this._attachedPortal}attach(n){if(n instanceof Ko)return this._attachedPortal=n,this.attachComponentPortal(n);if(n instanceof Hl)return this._attachedPortal=n,this.attachTemplatePortal(n);if(this.attachDomPortal&&n instanceof nm)return this._attachedPortal=n,this.attachDomPortal(n)}attachDomPortal=null;detach(){this._attachedPortal&&(this._attachedPortal.setAttachedHost(null),this._attachedPortal=null),this._invokeDisposeFn()}dispose(){this.hasAttached()&&this.detach(),this._invokeDisposeFn(),this._isDisposed=!0}setDisposeFn(n){this._disposeFn=n}_invokeDisposeFn(){this._disposeFn&&(this._disposeFn(),this._disposeFn=null)}},zl=class extends rm{outletElement;_appRef;_defaultInjector;constructor(n,t,r){super(),this.outletElement=n,this._appRef=t,this._defaultInjector=r}attachComponentPortal(n){let t;if(n.viewContainerRef){let r=n.injector||n.viewContainerRef.injector,i=r.get(Dr,null,{optional:!0})||void 0;t=n.viewContainerRef.createComponent(n.component,{index:n.viewContainerRef.length,injector:r,ngModuleRef:i,projectableNodes:n.projectableNodes||void 0,bindings:n.bindings||void 0,directives:n.directives||void 0}),this.setDisposeFn(()=>t.destroy())}else{let r=this._appRef,i=n.injector||this._defaultInjector||Q.NULL,o=i.get(Pe,r.injector);t=il(n.component,{elementInjector:i,environmentInjector:o,projectableNodes:n.projectableNodes||void 0,bindings:n.bindings||void 0,directives:n.directives||void 0}),r.attachView(t.hostView),this.setDisposeFn(()=>{r.viewCount>0&&r.detachView(t.hostView),t.destroy()})}return this.outletElement.appendChild(this._getComponentRootNode(t)),this._attachedPortal=n,t}attachTemplatePortal(n){let t=n.viewContainerRef,r=t.createEmbeddedView(n.templateRef,n.context,{injector:n.injector});return r.rootNodes.forEach(i=>this.outletElement.appendChild(i)),r.detectChanges(),this.setDisposeFn(()=>{let i=t.indexOf(r);i!==-1&&t.remove(i)}),this._attachedPortal=n,r}attachDomPortal=n=>{let t=n.element;t.parentNode;let r=this.outletElement.ownerDocument.createComment("dom-portal");t.parentNode.insertBefore(r,t),this.outletElement.appendChild(t),this._attachedPortal=n,super.setDisposeFn(()=>{r.parentNode&&r.parentNode.replaceChild(t,r)})};dispose(){super.dispose(),this.outletElement.remove()}_getComponentRootNode(n){return n.hostView.rootNodes[0]}};var Ly=gy();function $y(e){return new Ul(e.get(Zo),e.get(j))}var Ul=class{_viewportRuler;_previousHTMLStyles={top:"",left:""};_previousScrollPosition;_isEnabled=!1;_document;constructor(n,t){this._viewportRuler=n,this._document=t}attach(){}enable(){if(this._canBeEnabled()){let n=this._document.documentElement;this._previousScrollPosition=this._viewportRuler.getViewportScrollPosition(),this._previousHTMLStyles.left=n.style.left||"",this._previousHTMLStyles.top=n.style.top||"",n.style.left=Fe(-this._previousScrollPosition.left),n.style.top=Fe(-this._previousScrollPosition.top),n.classList.add("cdk-global-scrollblock"),this._isEnabled=!0}}disable(){if(this._isEnabled){let n=this._document.documentElement,t=this._document.body,r=n.style,i=t.style,o=r.scrollBehavior||"",a=i.scrollBehavior||"";this._isEnabled=!1,r.left=this._previousHTMLStyles.left,r.top=this._previousHTMLStyles.top,n.classList.remove("cdk-global-scrollblock"),Ly&&(r.scrollBehavior=i.scrollBehavior="auto"),window.scroll(this._previousScrollPosition.left,this._previousScrollPosition.top),Ly&&(r.scrollBehavior=o,i.scrollBehavior=a)}}_canBeEnabled(){if(this._document.documentElement.classList.contains("cdk-global-scrollblock")||this._isEnabled)return!1;let t=this._document.documentElement,r=this._viewportRuler.getViewportSize();return t.scrollHeight>r.height||t.scrollWidth>r.width}};function Gy(e,n){return new $l(e.get(tm),e.get(A),e.get(Zo),n)}var $l=class{_scrollDispatcher;_ngZone;_viewportRuler;_config;_scrollSubscription=null;_overlayRef;_initialScrollPosition;constructor(n,t,r,i){this._scrollDispatcher=n,this._ngZone=t,this._viewportRuler=r,this._config=i}attach(n){this._overlayRef,this._overlayRef=n}enable(){if(this._scrollSubscription)return;let n=this._scrollDispatcher.scrolled(0).pipe(lt(t=>!t||!this._overlayRef.overlayElement.contains(t.getElementRef().nativeElement)));this._config&&this._config.threshold&&this._config.threshold>1?(this._initialScrollPosition=this._viewportRuler.getViewportScrollPosition().top,this._scrollSubscription=n.subscribe(()=>{let t=this._viewportRuler.getViewportScrollPosition().top;Math.abs(t-this._initialScrollPosition)>this._config.threshold?this._detach():this._overlayRef.updatePosition()})):this._scrollSubscription=n.subscribe(this._detach)}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}_detach=()=>{this.disable(),this._overlayRef.hasAttached()&&this._ngZone.run(()=>this._overlayRef.detach())}};var Qo=class{enable(){}disable(){}attach(){}};function om(e,n){return n.some(t=>{let r=e.bottom<t.top,i=e.top>t.bottom,o=e.right<t.left,a=e.left>t.right;return r||i||o||a})}function Vy(e,n){return n.some(t=>{let r=e.top<t.top,i=e.bottom>t.bottom,o=e.left<t.left,a=e.right>t.right;return r||i||o||a})}function Wy(e,n){return new Gl(e.get(tm),e.get(Zo),e.get(A),n)}var Gl=class{_scrollDispatcher;_viewportRuler;_ngZone;_config;_scrollSubscription=null;_overlayRef;constructor(n,t,r,i){this._scrollDispatcher=n,this._viewportRuler=t,this._ngZone=r,this._config=i}attach(n){this._overlayRef,this._overlayRef=n}enable(){if(!this._scrollSubscription){let n=this._config?this._config.scrollThrottle:0;this._scrollSubscription=this._scrollDispatcher.scrolled(n).subscribe(()=>{if(this._overlayRef.updatePosition(),this._config&&this._config.autoClose){let t=this._overlayRef.overlayElement.getBoundingClientRect(),{width:r,height:i}=this._viewportRuler.getViewportSize();om(t,[{width:r,height:i,bottom:i,right:r,top:0,left:0}])&&(this.disable(),this._ngZone.run(()=>this._overlayRef.detach()))}})}}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}},qy=(()=>{class e{_injector=f(Q);noop=()=>new Qo;close=t=>Gy(this._injector,t);block=()=>$y(this._injector);reposition=t=>Wy(this._injector,t);static \u0275fac=function(r){return new(r||e)};static \u0275prov=k({token:e,factory:e.\u0275fac})}return e})(),Wl=class{positionStrategy;scrollStrategy=new Qo;panelClass="";hasBackdrop=!1;backdropClass="cdk-overlay-dark-backdrop";disableAnimations;width;height;minWidth;minHeight;maxWidth;maxHeight;direction;disposeOnNavigation=!1;usePopover;eventPredicate;constructor(n){if(n){let t=Object.keys(n);for(let r of t)n[r]!==void 0&&(this[r]=n[r])}}};var ql=class{connectionPair;scrollableViewProperties;constructor(n,t){this.connectionPair=n,this.scrollableViewProperties=t}};var Yy=(()=>{class e{_attachedOverlays=[];_document=f(j);_isAttached=!1;ngOnDestroy(){this.detach()}add(t){this.remove(t),this._attachedOverlays.push(t)}remove(t){let r=this._attachedOverlays.indexOf(t);r>-1&&this._attachedOverlays.splice(r,1),this._attachedOverlays.length===0&&this.detach()}canReceiveEvent(t,r,i){return i.observers.length<1?!1:t.eventPredicate?t.eventPredicate(r):!0}static \u0275fac=function(r){return new(r||e)};static \u0275prov=k({token:e,factory:e.\u0275fac})}return e})(),Zy=(()=>{class e extends Yy{_ngZone=f(A);_renderer=f(Ve).createRenderer(null,null);_cleanupKeydown;add(t){super.add(t),this._isAttached||(this._ngZone.runOutsideAngular(()=>{this._cleanupKeydown=this._renderer.listen("body","keydown",this._keydownListener)}),this._isAttached=!0)}detach(){this._isAttached&&(this._cleanupKeydown?.(),this._isAttached=!1)}_keydownListener=t=>{let r=this._attachedOverlays;for(let i=r.length-1;i>-1;i--){let o=r[i];if(this.canReceiveEvent(o,t,o._keydownEvents)){this._ngZone.run(()=>o._keydownEvents.next(t));break}}};static \u0275fac=function(r){return new(r||e)};static \u0275prov=k({token:e,factory:e.\u0275fac})}return e})(),Xy=(()=>{class e extends Yy{_platform=f(Se);_ngZone=f(A);_renderer=f(Ve).createRenderer(null,null);_cursorOriginalValue;_cursorStyleIsSet=!1;_pointerDownEventTarget=null;_cleanups;add(t){if(super.add(t),!this._isAttached){let r=this._document.body,i={capture:!0},o=this._renderer;this._cleanups=this._ngZone.runOutsideAngular(()=>[o.listen(r,"pointerdown",this._pointerDownListener,i),o.listen(r,"click",this._clickListener,i),o.listen(r,"auxclick",this._clickListener,i),o.listen(r,"contextmenu",this._clickListener,i)]),this._platform.IOS&&!this._cursorStyleIsSet&&(this._cursorOriginalValue=r.style.cursor,r.style.cursor="pointer",this._cursorStyleIsSet=!0),this._isAttached=!0}}detach(){this._isAttached&&(this._cleanups?.forEach(t=>t()),this._cleanups=void 0,this._platform.IOS&&this._cursorStyleIsSet&&(this._document.body.style.cursor=this._cursorOriginalValue,this._cursorStyleIsSet=!1),this._isAttached=!1)}_pointerDownListener=t=>{this._pointerDownEventTarget=ot(t)};_clickListener=t=>{let r=ot(t),i=t.type==="click"&&this._pointerDownEventTarget?this._pointerDownEventTarget:r;this._pointerDownEventTarget=null;let o=this._attachedOverlays.slice();for(let a=o.length-1;a>-1;a--){let s=o[a],l=s._outsidePointerEvents;if(!(!s.hasAttached()||!this.canReceiveEvent(s,t,l))){if(jy(s.overlayElement,r)||jy(s.overlayElement,i))break;this._ngZone?this._ngZone.run(()=>l.next(t)):l.next(t)}}};static \u0275fac=function(r){return new(r||e)};static \u0275prov=k({token:e,factory:e.\u0275fac})}return e})();function jy(e,n){let t=typeof ShadowRoot<"u"&&ShadowRoot,r=n;for(;r;){if(r===e)return!0;r=t&&r instanceof ShadowRoot?r.host:r.parentNode}return!1}var Ky=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275cmp=X({type:e,selectors:[["ng-component"]],hostAttrs:["cdk-overlay-style-loader",""],decls:0,vars:0,template:function(r,i){},styles:[`.cdk-overlay-container, .cdk-global-overlay-wrapper {
  pointer-events: none;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.cdk-overlay-container {
  position: fixed;
}
@layer cdk-overlay {
  .cdk-overlay-container {
    z-index: 1000;
  }
}
.cdk-overlay-container:empty {
  display: none;
}

.cdk-global-overlay-wrapper {
  display: flex;
  position: absolute;
}
@layer cdk-overlay {
  .cdk-global-overlay-wrapper {
    z-index: 1000;
  }
}

.cdk-overlay-pane {
  position: absolute;
  pointer-events: auto;
  box-sizing: border-box;
  display: flex;
  max-width: 100%;
  max-height: 100%;
}
@layer cdk-overlay {
  .cdk-overlay-pane {
    z-index: 1000;
  }
}

.cdk-overlay-backdrop {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: auto;
  -webkit-tap-highlight-color: transparent;
  opacity: 0;
  touch-action: manipulation;
}
@layer cdk-overlay {
  .cdk-overlay-backdrop {
    z-index: 1000;
    transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
  }
}
@media (prefers-reduced-motion) {
  .cdk-overlay-backdrop {
    transition-duration: 1ms;
  }
}

.cdk-overlay-backdrop-showing {
  opacity: 1;
}
@media (forced-colors: active) {
  .cdk-overlay-backdrop-showing {
    opacity: 0.6;
  }
}

@layer cdk-overlay {
  .cdk-overlay-dark-backdrop {
    background: rgba(0, 0, 0, 0.32);
  }
}

.cdk-overlay-transparent-backdrop {
  transition: visibility 1ms linear, opacity 1ms linear;
  visibility: hidden;
  opacity: 1;
}
.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing, .cdk-high-contrast-active .cdk-overlay-transparent-backdrop {
  opacity: 0;
  visibility: visible;
}

.cdk-overlay-backdrop-noop-animation {
  transition: none;
}

.cdk-overlay-connected-position-bounding-box {
  position: absolute;
  display: flex;
  flex-direction: column;
  min-width: 1px;
  min-height: 1px;
}
@layer cdk-overlay {
  .cdk-overlay-connected-position-bounding-box {
    z-index: 1000;
  }
}

.cdk-global-scrollblock {
  position: fixed;
  width: 100%;
  overflow-y: scroll;
}

.cdk-overlay-popover {
  background: none;
  border: none;
  padding: 0;
  outline: 0;
  overflow: visible;
  position: fixed;
  pointer-events: none;
  white-space: normal;
  color: inherit;
  text-decoration: none;
  width: 100%;
  height: 100%;
  inset: auto;
  top: 0;
  left: 0;
}
.cdk-overlay-popover::backdrop {
  display: none;
}
.cdk-overlay-popover .cdk-overlay-backdrop {
  position: fixed;
  z-index: auto;
}
`],encapsulation:2})}return e})(),Qy=(()=>{class e{_platform=f(Se);_containerElement;_document=f(j);_styleLoader=f(Dt);ngOnDestroy(){this._containerElement?.remove()}getContainerElement(){return this._loadStyles(),this._containerElement||this._createContainer(),this._containerElement}_createContainer(){let t="cdk-overlay-container";if(this._platform.isBrowser||Yf()){let i=this._document.querySelectorAll(`.${t}[platform="server"], .${t}[platform="test"]`);for(let o=0;o<i.length;o++)i[o].remove()}let r=this._document.createElement("div");r.classList.add(t),Yf()?r.setAttribute("platform","test"):this._platform.isBrowser||r.setAttribute("platform","server"),this._document.body.appendChild(r),this._containerElement=r}_loadStyles(){this._styleLoader.load(Ky)}static \u0275fac=function(r){return new(r||e)};static \u0275prov=k({token:e,factory:e.\u0275fac})}return e})(),am=class{_renderer;_ngZone;element;_cleanupClick;_cleanupTransitionEnd;_fallbackTimeout;constructor(n,t,r,i){this._renderer=t,this._ngZone=r,this.element=n.createElement("div"),this.element.classList.add("cdk-overlay-backdrop"),this._cleanupClick=t.listen(this.element,"click",i)}detach(){this._ngZone.runOutsideAngular(()=>{let n=this.element;clearTimeout(this._fallbackTimeout),this._cleanupTransitionEnd?.(),this._cleanupTransitionEnd=this._renderer.listen(n,"transitionend",this.dispose),this._fallbackTimeout=setTimeout(this.dispose,500),n.style.pointerEvents="none",n.classList.remove("cdk-overlay-backdrop-showing")})}dispose=()=>{clearTimeout(this._fallbackTimeout),this._cleanupClick?.(),this._cleanupTransitionEnd?.(),this._cleanupClick=this._cleanupTransitionEnd=this._fallbackTimeout=void 0,this.element.remove()}};function sm(e){return e&&e.nodeType===1}var im=te([]),Yl=class{_portalOutlet;_host;_pane;_config;_ngZone;_keyboardDispatcher;_document;_location;_outsideClickDispatcher;_animationsDisabled;_injector;_renderer;_backdropClick=new L;_attachments=new L;_detachments=new L;_positionStrategy;_scrollStrategy;_locationChanges;_backdropRef=null;_detachContentMutationObserver;_detachContentAfterRenderRef;_disposed=!1;_previousHostParent;_keydownEvents=new L;_outsidePointerEvents=new L;_afterNextRenderRef;constructor(n,t,r,i,o,a,s,l,c,d=!1,u,p){this._portalOutlet=n,this._host=t,this._pane=r,this._config=i,this._ngZone=o,this._keyboardDispatcher=a,this._document=s,this._location=l,this._outsideClickDispatcher=c,this._animationsDisabled=d,this._injector=u,this._renderer=p,i.scrollStrategy&&(this._scrollStrategy=i.scrollStrategy,this._scrollStrategy.attach(this)),this._positionStrategy=i.positionStrategy}get overlayElement(){return this._pane}get backdropElement(){return this._backdropRef?.element||null}get hostElement(){return this._host}get eventPredicate(){return this._config?.eventPredicate||null}attach(n){if(this._disposed)return null;this._attachHost();let t=this._portalOutlet.attach(n);if(this._positionStrategy?.attach(this),this._updateStackingOrder(),this._updateElementSize(),this._updateElementDirection(),pe(()=>{im.update(r=>r.includes(this)?r:[...r,this])}),this._scrollStrategy&&this._scrollStrategy.enable(),this._afterNextRenderRef?.destroy(),this._afterNextRenderRef=pi(()=>{this.hasAttached()&&this.updatePosition()},{injector:this._injector}),this._togglePointerEvents(!0),this._config.hasBackdrop&&this._attachBackdrop(),this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!0),this._attachments.next(),this._completeDetachContent(),this._keyboardDispatcher.add(this),this._config.disposeOnNavigation===!0||this._config.disposeOnNavigation==="pop-state"){let r=this._location.subscribe(()=>this.dispose());this._locationChanges=()=>r.unsubscribe()}else this._config.disposeOnNavigation==="url-change"&&(this._locationChanges=this._location.onUrlChange(()=>this.dispose()));return this._outsideClickDispatcher.add(this),typeof t?.onDestroy=="function"&&t.onDestroy(()=>{this.hasAttached()&&this._ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>this.detach()))}),t}detach(){if(!this.hasAttached())return;this.detachBackdrop(),this._togglePointerEvents(!1),this._positionStrategy&&this._positionStrategy.detach&&this._positionStrategy.detach(),this._scrollStrategy&&this._scrollStrategy.disable();let n=this._portalOutlet.detach();return this._detachments.next(),this._completeDetachContent(),this._keyboardDispatcher.remove(this),this._detachContentWhenEmpty(),this._locationChanges?.(),this._outsideClickDispatcher.remove(this),pe(()=>{im.update(t=>t.filter(r=>r!==this))}),n}dispose(){if(this._disposed)return;let n=this.hasAttached();this._positionStrategy&&this._positionStrategy.dispose(),this._disposeScrollStrategy(),this._backdropRef?.dispose(),this._locationChanges?.(),this._keyboardDispatcher.remove(this),this._portalOutlet.dispose(),this._attachments.complete(),this._backdropClick.complete(),this._keydownEvents.complete(),this._outsidePointerEvents.complete(),this._outsideClickDispatcher.remove(this),this._host?.remove(),this._afterNextRenderRef?.destroy(),this._previousHostParent=this._pane=this._host=this._backdropRef=null,n&&this._detachments.next(),this._detachments.complete(),this._completeDetachContent(),this._disposed=!0,pe(()=>{im.update(t=>t.filter(r=>r!==this))})}hasAttached(){return this._portalOutlet.hasAttached()}backdropClick(){return this._backdropClick}attachments(){return this._attachments}detachments(){return this._detachments}keydownEvents(){return this._keydownEvents}outsidePointerEvents(){return this._outsidePointerEvents}getConfig(){return this._config}updatePosition(){this._positionStrategy&&this._positionStrategy.apply()}updatePositionStrategy(n){n!==this._positionStrategy&&(this._positionStrategy&&this._positionStrategy.dispose(),this._positionStrategy=n,this.hasAttached()&&(n.attach(this),this.updatePosition()))}updateSize(n){this._config=C(C({},this._config),n),this._updateElementSize()}setDirection(n){this._config=B(C({},this._config),{direction:n}),this._updateElementDirection()}addPanelClass(n){this._pane&&this._toggleClasses(this._pane,n,!0)}removePanelClass(n){this._pane&&this._toggleClasses(this._pane,n,!1)}getDirection(){let n=this._config.direction;return n?typeof n=="string"?n:n.value:"ltr"}updateScrollStrategy(n){n!==this._scrollStrategy&&(this._disposeScrollStrategy(),this._scrollStrategy=n,this.hasAttached()&&(n.attach(this),n.enable()))}_updateElementDirection(){this._host.setAttribute("dir",this.getDirection())}_updateElementSize(){if(!this._pane)return;let n=this._pane.style;n.width=Fe(this._config.width),n.height=Fe(this._config.height),n.minWidth=Fe(this._config.minWidth),n.minHeight=Fe(this._config.minHeight),n.maxWidth=Fe(this._config.maxWidth),n.maxHeight=Fe(this._config.maxHeight)}_togglePointerEvents(n){this._pane.style.pointerEvents=n?"":"none"}_attachHost(){if(!this._host.parentElement){let n=this._config.usePopover?this._positionStrategy?.getPopoverInsertionPoint?.():null;sm(n)?n.after(this._host):n?.type==="parent"?n.element.appendChild(this._host):this._previousHostParent?.appendChild(this._host)}if(this._config.usePopover)try{this._host.showPopover()}catch(n){}}_attachBackdrop(){let n="cdk-overlay-backdrop-showing";this._backdropRef?.dispose(),this._backdropRef=new am(this._document,this._renderer,this._ngZone,t=>{this._backdropClick.next(t)}),this._animationsDisabled&&this._backdropRef.element.classList.add("cdk-overlay-backdrop-noop-animation"),this._config.backdropClass&&this._toggleClasses(this._backdropRef.element,this._config.backdropClass,!0),this._config.usePopover?this._host.prepend(this._backdropRef.element):this._host.parentElement.insertBefore(this._backdropRef.element,this._host),!this._animationsDisabled&&typeof requestAnimationFrame<"u"?this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>this._backdropRef?.element.classList.add(n))}):this._backdropRef.element.classList.add(n)}_updateStackingOrder(){!this._config.usePopover&&this._host.nextSibling&&this._host.parentNode.appendChild(this._host)}detachBackdrop(){this._animationsDisabled?(this._backdropRef?.dispose(),this._backdropRef=null):this._backdropRef?.detach()}_toggleClasses(n,t,r){let i=Wf(t||[]).filter(o=>!!o);i.length&&(r?n.classList.add(...i):n.classList.remove(...i))}_detachContentWhenEmpty(){let n=!1;try{this._detachContentAfterRenderRef=pi(()=>{n=!0,this._detachContent()},{injector:this._injector})}catch(t){if(n)throw t;this._detachContent()}globalThis.MutationObserver&&this._pane&&(this._detachContentMutationObserver||=new globalThis.MutationObserver(()=>{this._detachContent()}),this._detachContentMutationObserver.observe(this._pane,{childList:!0}))}_detachContent(){(!this._pane||!this._host||this._pane.children.length===0)&&(this._pane&&this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!1),this._host&&this._host.parentElement&&(this._previousHostParent=this._host.parentElement,this._host.remove()),this._completeDetachContent())}_completeDetachContent(){this._detachContentAfterRenderRef?.destroy(),this._detachContentAfterRenderRef=void 0,this._detachContentMutationObserver?.disconnect()}_disposeScrollStrategy(){let n=this._scrollStrategy;n?.disable(),n?.detach?.()}},By="cdk-overlay-connected-position-bounding-box",GI=/([A-Za-z%]+)$/;function Jy(e,n){return new Zl(n,e.get(Zo),e.get(j),e.get(Se),e.get(Qy))}var Zl=class{_viewportRuler;_document;_platform;_overlayContainer;_overlayRef;_isInitialRender=!1;_lastBoundingBoxSize={width:0,height:0};_isPushed=!1;_canPush=!0;_growAfterOpen=!1;_hasFlexibleDimensions=!0;_positionLocked=!1;_originRect;_overlayRect;_viewportRect;_containerRect;_viewportMargin=0;_scrollables=[];_preferredPositions=[];_origin;_pane;_isDisposed=!1;_boundingBox=null;_lastPosition=null;_lastScrollVisibility=null;_positionChanges=new L;_resizeSubscription=ue.EMPTY;_offsetX=0;_offsetY=0;_transformOriginSelector;_appliedPanelClasses=[];_previousPushAmount=null;_popoverLocation="global";positionChanges=this._positionChanges;get positions(){return this._preferredPositions}constructor(n,t,r,i,o){this._viewportRuler=t,this._document=r,this._platform=i,this._overlayContainer=o,this.setOrigin(n)}attach(n){this._overlayRef&&this._overlayRef,this._validatePositions(),n.hostElement.classList.add(By),this._overlayRef=n,this._boundingBox=n.hostElement,this._pane=n.overlayElement,this._isDisposed=!1,this._isInitialRender=!0,this._lastPosition=null,this._resizeSubscription.unsubscribe(),this._resizeSubscription=this._viewportRuler.change().subscribe(()=>{this._isInitialRender=!0,this.apply()})}apply(){if(this._isDisposed||!this._platform.isBrowser)return;if(!this._isInitialRender&&this._positionLocked&&this._lastPosition){this.reapplyLastPosition();return}this._clearPanelClasses(),this._resetOverlayElementStyles(),this._resetBoundingBoxStyles(),this._viewportRect=this._getNarrowedViewportRect(),this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._containerRect=this._getContainerRect();let n=this._originRect,t=this._overlayRect,r=this._viewportRect,i=this._containerRect,o=[],a;for(let s of this._preferredPositions){let l=this._getOriginPoint(n,i,s),c=this._getOverlayPoint(l,t,s),d=this._getOverlayFit(c,t,r,s);if(d.isCompletelyWithinViewport){this._isPushed=!1,this._applyPosition(s,l);return}if(this._canFitWithFlexibleDimensions(d,c,r)){o.push({position:s,origin:l,overlayRect:t,boundingBoxRect:this._calculateBoundingBoxRect(l,s)});continue}(!a||a.overlayFit.visibleArea<d.visibleArea)&&(a={overlayFit:d,overlayPoint:c,originPoint:l,position:s,overlayRect:t})}if(o.length){let s=null,l=-1;for(let c of o){let d=c.boundingBoxRect.width*c.boundingBoxRect.height*(c.position.weight||1);d>l&&(l=d,s=c)}this._isPushed=!1,this._applyPosition(s.position,s.origin);return}if(this._canPush){this._isPushed=!0,this._applyPosition(a.position,a.originPoint);return}this._applyPosition(a.position,a.originPoint)}detach(){this._clearPanelClasses(),this._lastPosition=null,this._previousPushAmount=null,this._resizeSubscription.unsubscribe()}dispose(){this._isDisposed||(this._boundingBox&&Pr(this._boundingBox.style,{top:"",left:"",right:"",bottom:"",height:"",width:"",alignItems:"",justifyContent:""}),this._pane&&this._resetOverlayElementStyles(),this._overlayRef&&this._overlayRef.hostElement.classList.remove(By),this.detach(),this._positionChanges.complete(),this._overlayRef=this._boundingBox=null,this._isDisposed=!0)}reapplyLastPosition(){if(this._isDisposed||!this._platform.isBrowser)return;let n=this._lastPosition;n?(this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._viewportRect=this._getNarrowedViewportRect(),this._containerRect=this._getContainerRect(),this._applyPosition(n,this._getOriginPoint(this._originRect,this._containerRect,n))):this.apply()}withScrollableContainers(n){return this._scrollables=n,this}withPositions(n){return this._preferredPositions=n,n.indexOf(this._lastPosition)===-1&&(this._lastPosition=null),this._validatePositions(),this}withViewportMargin(n){return this._viewportMargin=n,this}withFlexibleDimensions(n=!0){return this._hasFlexibleDimensions=n,this}withGrowAfterOpen(n=!0){return this._growAfterOpen=n,this}withPush(n=!0){return this._canPush=n,this}withLockedPosition(n=!0){return this._positionLocked=n,this}setOrigin(n){return this._origin=n,this}withDefaultOffsetX(n){return this._offsetX=n,this}withDefaultOffsetY(n){return this._offsetY=n,this}withTransformOriginOn(n){return this._transformOriginSelector=n,this}withPopoverLocation(n){return this._popoverLocation=n,this}getPopoverInsertionPoint(){return this._popoverLocation==="global"?null:this._popoverLocation!=="inline"?this._popoverLocation:this._origin instanceof Z?this._origin.nativeElement:sm(this._origin)?this._origin:null}_getOriginPoint(n,t,r){let i;if(r.originX=="center")i=n.left+n.width/2;else{let a=this._isRtl()?n.right:n.left,s=this._isRtl()?n.left:n.right;i=r.originX=="start"?a:s}t.left<0&&(i-=t.left);let o;return r.originY=="center"?o=n.top+n.height/2:o=r.originY=="top"?n.top:n.bottom,t.top<0&&(o-=t.top),{x:i,y:o}}_getOverlayPoint(n,t,r){let i;r.overlayX=="center"?i=-t.width/2:r.overlayX==="start"?i=this._isRtl()?-t.width:0:i=this._isRtl()?0:-t.width;let o;return r.overlayY=="center"?o=-t.height/2:o=r.overlayY=="top"?0:-t.height,{x:n.x+i,y:n.y+o}}_getOverlayFit(n,t,r,i){let o=zy(t),{x:a,y:s}=n,l=this._getOffset(i,"x"),c=this._getOffset(i,"y");l&&(a+=l),c&&(s+=c);let d=0-a,u=a+o.width-r.width,p=0-s,m=s+o.height-r.height,h=this._subtractOverflows(o.width,d,u),w=this._subtractOverflows(o.height,p,m),E=h*w;return{visibleArea:E,isCompletelyWithinViewport:o.width*o.height===E,fitsInViewportVertically:w===o.height,fitsInViewportHorizontally:h==o.width}}_canFitWithFlexibleDimensions(n,t,r){if(this._hasFlexibleDimensions){let i=r.bottom-t.y,o=r.right-t.x,a=Hy(this._overlayRef.getConfig().minHeight),s=Hy(this._overlayRef.getConfig().minWidth),l=n.fitsInViewportVertically||a!=null&&a<=i,c=n.fitsInViewportHorizontally||s!=null&&s<=o;return l&&c}return!1}_pushOverlayOnScreen(n,t,r){if(this._previousPushAmount&&this._positionLocked)return{x:n.x+this._previousPushAmount.x,y:n.y+this._previousPushAmount.y};let i=zy(t),o=this._viewportRect,a=Math.max(n.x+i.width-o.width,0),s=Math.max(n.y+i.height-o.height,0),l=Math.max(o.top-r.top-n.y,0),c=Math.max(o.left-r.left-n.x,0),d=0,u=0;return i.width<=o.width?d=c||-a:d=n.x<this._getViewportMarginStart()?o.left-r.left-n.x:0,i.height<=o.height?u=l||-s:u=n.y<this._getViewportMarginTop()?o.top-r.top-n.y:0,this._previousPushAmount={x:d,y:u},{x:n.x+d,y:n.y+u}}_applyPosition(n,t){if(this._setTransformOrigin(n),this._setOverlayElementStyles(t,n),this._setBoundingBoxStyles(t,n),n.panelClass&&this._addPanelClasses(n.panelClass),this._positionChanges.observers.length){let r=this._getScrollVisibility();if(n!==this._lastPosition||!this._lastScrollVisibility||!WI(this._lastScrollVisibility,r)){let i=new ql(n,r);this._positionChanges.next(i)}this._lastScrollVisibility=r}this._lastPosition=n,this._isInitialRender=!1}_setTransformOrigin(n){if(!this._transformOriginSelector)return;let t=this._boundingBox.querySelectorAll(this._transformOriginSelector),r,i=n.overlayY;n.overlayX==="center"?r="center":this._isRtl()?r=n.overlayX==="start"?"right":"left":r=n.overlayX==="start"?"left":"right";for(let o=0;o<t.length;o++)t[o].style.transformOrigin=`${r} ${i}`}_calculateBoundingBoxRect(n,t){let r=this._viewportRect,i=this._isRtl(),o,a,s;if(t.overlayY==="top")a=n.y,o=r.height-a+this._getViewportMarginBottom();else if(t.overlayY==="bottom")s=r.height-n.y+this._getViewportMarginTop()+this._getViewportMarginBottom(),o=r.height-s+this._getViewportMarginTop();else{let m=Math.min(r.bottom-n.y+r.top,n.y),h=this._lastBoundingBoxSize.height;o=m*2,a=n.y-m,o>h&&!this._isInitialRender&&!this._growAfterOpen&&(a=n.y-h/2)}let l=t.overlayX==="start"&&!i||t.overlayX==="end"&&i,c=t.overlayX==="end"&&!i||t.overlayX==="start"&&i,d,u,p;if(c)p=r.width-n.x+this._getViewportMarginStart()+this._getViewportMarginEnd(),d=n.x-this._getViewportMarginStart();else if(l)u=n.x,d=r.right-n.x-this._getViewportMarginEnd();else{let m=Math.min(r.right-n.x+r.left,n.x),h=this._lastBoundingBoxSize.width;d=m*2,u=n.x-m,d>h&&!this._isInitialRender&&!this._growAfterOpen&&(u=n.x-h/2)}return{top:a,left:u,bottom:s,right:p,width:d,height:o}}_setBoundingBoxStyles(n,t){let r=this._calculateBoundingBoxRect(n,t);!this._isInitialRender&&!this._growAfterOpen&&(r.height=Math.min(r.height,this._lastBoundingBoxSize.height),r.width=Math.min(r.width,this._lastBoundingBoxSize.width));let i={};if(this._hasExactPosition())i.top=i.left="0",i.bottom=i.right="auto",i.maxHeight=i.maxWidth="",i.width=i.height="100%";else{let o=this._overlayRef.getConfig().maxHeight,a=this._overlayRef.getConfig().maxWidth;i.width=Fe(r.width),i.height=Fe(r.height),i.top=Fe(r.top)||"auto",i.bottom=Fe(r.bottom)||"auto",i.left=Fe(r.left)||"auto",i.right=Fe(r.right)||"auto",t.overlayX==="center"?i.alignItems="center":i.alignItems=t.overlayX==="end"?"flex-end":"flex-start",t.overlayY==="center"?i.justifyContent="center":i.justifyContent=t.overlayY==="bottom"?"flex-end":"flex-start",o&&(i.maxHeight=Fe(o)),a&&(i.maxWidth=Fe(a))}this._lastBoundingBoxSize=r,Pr(this._boundingBox.style,i)}_resetBoundingBoxStyles(){Pr(this._boundingBox.style,{top:"0",left:"0",right:"0",bottom:"0",height:"",width:"",alignItems:"",justifyContent:""})}_resetOverlayElementStyles(){Pr(this._pane.style,{top:"",left:"",bottom:"",right:"",position:"",transform:""})}_setOverlayElementStyles(n,t){let r={},i=this._hasExactPosition(),o=this._hasFlexibleDimensions,a=this._overlayRef.getConfig();if(i){let d=this._viewportRuler.getViewportScrollPosition();Pr(r,this._getExactOverlayY(t,n,d)),Pr(r,this._getExactOverlayX(t,n,d))}else r.position="static";let s="",l=this._getOffset(t,"x"),c=this._getOffset(t,"y");l&&(s+=`translateX(${l}px) `),c&&(s+=`translateY(${c}px)`),r.transform=s.trim(),a.maxHeight&&(i?r.maxHeight=Fe(a.maxHeight):o&&(r.maxHeight="")),a.maxWidth&&(i?r.maxWidth=Fe(a.maxWidth):o&&(r.maxWidth="")),Pr(this._pane.style,r)}_getExactOverlayY(n,t,r){let i={top:"",bottom:""},o=this._getOverlayPoint(t,this._overlayRect,n);if(this._isPushed&&(o=this._pushOverlayOnScreen(o,this._overlayRect,r)),n.overlayY==="bottom"){let a=this._document.documentElement.clientHeight;i.bottom=`${a-(o.y+this._overlayRect.height)}px`}else i.top=Fe(o.y);return i}_getExactOverlayX(n,t,r){let i={left:"",right:""},o=this._getOverlayPoint(t,this._overlayRect,n);this._isPushed&&(o=this._pushOverlayOnScreen(o,this._overlayRect,r));let a;if(this._isRtl()?a=n.overlayX==="end"?"left":"right":a=n.overlayX==="end"?"right":"left",a==="right"){let s=this._document.documentElement.clientWidth;i.right=`${s-(o.x+this._overlayRect.width)}px`}else i.left=Fe(o.x);return i}_getScrollVisibility(){let n=this._getOriginRect(),t=this._pane.getBoundingClientRect(),r=this._scrollables.map(i=>i.getElementRef().nativeElement.getBoundingClientRect());return{isOriginClipped:Vy(n,r),isOriginOutsideView:om(n,r),isOverlayClipped:Vy(t,r),isOverlayOutsideView:om(t,r)}}_subtractOverflows(n,...t){return t.reduce((r,i)=>r-Math.max(i,0),n)}_getNarrowedViewportRect(){let n=this._document.documentElement.clientWidth,t=this._document.documentElement.clientHeight,r=this._viewportRuler.getViewportScrollPosition();return{top:r.top+this._getViewportMarginTop(),left:r.left+this._getViewportMarginStart(),right:r.left+n-this._getViewportMarginEnd(),bottom:r.top+t-this._getViewportMarginBottom(),width:n-this._getViewportMarginStart()-this._getViewportMarginEnd(),height:t-this._getViewportMarginTop()-this._getViewportMarginBottom()}}_isRtl(){return this._overlayRef.getDirection()==="rtl"}_hasExactPosition(){return!this._hasFlexibleDimensions||this._isPushed}_getOffset(n,t){return t==="x"?n.offsetX==null?this._offsetX:n.offsetX:n.offsetY==null?this._offsetY:n.offsetY}_validatePositions(){}_addPanelClasses(n){this._pane&&Wf(n).forEach(t=>{t!==""&&this._appliedPanelClasses.indexOf(t)===-1&&(this._appliedPanelClasses.push(t),this._pane.classList.add(t))})}_clearPanelClasses(){this._pane&&(this._appliedPanelClasses.forEach(n=>{this._pane.classList.remove(n)}),this._appliedPanelClasses=[])}_getViewportMarginStart(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.start??0}_getViewportMarginEnd(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.end??0}_getViewportMarginTop(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.top??0}_getViewportMarginBottom(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.bottom??0}_getOriginRect(){let n=this._origin;if(n instanceof Z)return n.nativeElement.getBoundingClientRect();if(n instanceof Element)return n.getBoundingClientRect();let t=n.width||0,r=n.height||0;return{top:n.y,bottom:n.y+r,left:n.x,right:n.x+t,height:r,width:t}}_getContainerRect(){let n=this._overlayRef.getConfig().usePopover&&this._popoverLocation!=="global",t=this._overlayContainer.getContainerElement();n&&(t.style.display="block");let r=t.getBoundingClientRect();return n&&(t.style.display=""),r}};function Pr(e,n){for(let t in n)Object.hasOwn(n,t)&&(e[t]=n[t]);return e}function Hy(e){if(typeof e!="number"&&e!=null){let[n,t]=e.split(GI);return!t||t==="px"?parseFloat(n):null}return e||null}function zy(e){return{top:Math.floor(e.top),right:Math.floor(e.right),bottom:Math.floor(e.bottom),left:Math.floor(e.left),width:Math.floor(e.width),height:Math.floor(e.height)}}function WI(e,n){return e===n?!0:e.isOriginClipped===n.isOriginClipped&&e.isOriginOutsideView===n.isOriginOutsideView&&e.isOverlayClipped===n.isOverlayClipped&&e.isOverlayOutsideView===n.isOverlayOutsideView}var Uy="cdk-global-overlay-wrapper";function e_(e){return new Xl}var Xl=class{_overlayRef;_cssPosition="static";_topOffset="";_bottomOffset="";_alignItems="";_xPosition="";_xOffset="";_width="";_height="";_isDisposed=!1;attach(n){let t=n.getConfig();this._overlayRef=n,this._width&&!t.width&&n.updateSize({width:this._width}),this._height&&!t.height&&n.updateSize({height:this._height}),n.hostElement.classList.add(Uy),this._isDisposed=!1}top(n=""){return this._bottomOffset="",this._topOffset=n,this._alignItems="flex-start",this}left(n=""){return this._xOffset=n,this._xPosition="left",this}bottom(n=""){return this._topOffset="",this._bottomOffset=n,this._alignItems="flex-end",this}right(n=""){return this._xOffset=n,this._xPosition="right",this}start(n=""){return this._xOffset=n,this._xPosition="start",this}end(n=""){return this._xOffset=n,this._xPosition="end",this}width(n=""){return this._overlayRef?this._overlayRef.updateSize({width:n}):this._width=n,this}height(n=""){return this._overlayRef?this._overlayRef.updateSize({height:n}):this._height=n,this}centerHorizontally(n=""){return this.left(n),this._xPosition="center",this}centerVertically(n=""){return this.top(n),this._alignItems="center",this}apply(){if(!this._overlayRef||!this._overlayRef.hasAttached())return;let n=this._overlayRef.overlayElement.style,t=this._overlayRef.hostElement.style,r=this._overlayRef.getConfig(),{width:i,height:o,maxWidth:a,maxHeight:s}=r,l=(i==="100%"||i==="100vw")&&(!a||a==="100%"||a==="100vw"),c=(o==="100%"||o==="100vh")&&(!s||s==="100%"||s==="100vh"),d=this._xPosition,u=this._xOffset,p=this._overlayRef.getConfig().direction==="rtl",m="",h="",w="";l?w="flex-start":d==="center"?(w="center",p?h=u:m=u):p?d==="left"||d==="end"?(w="flex-end",m=u):(d==="right"||d==="start")&&(w="flex-start",h=u):d==="left"||d==="start"?(w="flex-start",m=u):(d==="right"||d==="end")&&(w="flex-end",h=u),n.position=this._cssPosition,n.marginLeft=l?"0":m,n.marginTop=c?"0":this._topOffset,n.marginBottom=this._bottomOffset,n.marginRight=l?"0":h,t.justifyContent=w,t.alignItems=c?"flex-start":this._alignItems}dispose(){if(this._isDisposed||!this._overlayRef)return;let n=this._overlayRef.overlayElement.style,t=this._overlayRef.hostElement,r=t.style;t.classList.remove(Uy),r.justifyContent=r.alignItems=n.marginTop=n.marginBottom=n.marginLeft=n.marginRight=n.position="",this._overlayRef=null,this._isDisposed=!0}},t_=(()=>{class e{_injector=f(Q);global(){return e_()}flexibleConnectedTo(t){return Jy(this._injector,t)}static \u0275fac=function(r){return new(r||e)};static \u0275prov=k({token:e,factory:e.\u0275fac})}return e})(),n_=new y("OVERLAY_DEFAULT_CONFIG");function r_(e,n){e.get(Dt).load(Ky);let t=e.get(Qy),r=e.get(j),i=e.get(Et),o=e.get(Ot),a=e.get(Ro),s=e.get(ze,null,{optional:!0})||e.get(Ve).createRenderer(null,null),l=new Wl(n),c=e.get(n_,null,{optional:!0})?.usePopover??!0;l.direction=l.direction||a.value,!r.body||!("showPopover"in r.body)?l.usePopover=!1:l.usePopover=n?.usePopover??c;let d=r.createElement("div"),u=r.createElement("div");d.id=i.getId("cdk-overlay-"),d.classList.add("cdk-overlay-pane"),u.appendChild(d),l.usePopover&&(u.setAttribute("popover","manual"),u.classList.add("cdk-overlay-popover"));let p=l.usePopover?l.positionStrategy?.getPopoverInsertionPoint?.():null;return sm(p)?p.after(u):p?.type==="parent"?p.element.appendChild(u):t.getContainerElement().appendChild(u),new Yl(new zl(d,o,e),u,d,l,e.get(A),e.get(Zy),r,e.get(al),e.get(Xy),n?.disableAnimations??e.get(ro,null,{optional:!0})==="NoopAnimations",e.get(Pe),s)}var lm=(()=>{class e{scrollStrategies=f(qy);_positionBuilder=f(t_);_injector=f(Q);create(t){return r_(this._injector,t)}position(){return this._positionBuilder}static \u0275fac=function(r){return new(r||e)};static \u0275prov=k({token:e,factory:e.\u0275fac})}return e})();var xt=(function(e){return e[e.FADING_IN=0]="FADING_IN",e[e.VISIBLE=1]="VISIBLE",e[e.FADING_OUT=2]="FADING_OUT",e[e.HIDDEN=3]="HIDDEN",e})(xt||{}),cm=class{_renderer;element;config;_animationForciblyDisabledThroughCss;state=xt.HIDDEN;constructor(n,t,r,i=!1){this._renderer=n,this.element=t,this.config=r,this._animationForciblyDisabledThroughCss=i}fadeOut(){this._renderer.fadeOutRipple(this)}},i_=Ni({passive:!0,capture:!0}),dm=class{_events=new Map;addHandler(n,t,r,i){let o=this._events.get(t);if(o){let a=o.get(r);a?a.add(i):o.set(r,new Set([i]))}else this._events.set(t,new Map([[r,new Set([i])]])),n.runOutsideAngular(()=>{document.addEventListener(t,this._delegateEventHandler,i_)})}removeHandler(n,t,r){let i=this._events.get(n);if(!i)return;let o=i.get(t);o&&(o.delete(r),o.size===0&&i.delete(t),i.size===0&&(this._events.delete(n),document.removeEventListener(n,this._delegateEventHandler,i_)))}_delegateEventHandler=n=>{let t=ot(n);t&&this._events.get(n.type)?.forEach((r,i)=>{(i===t||i.contains(t))&&r.forEach(o=>o.handleEvent(n))})}},Jo={enterDuration:225,exitDuration:150},qI=800,o_=Ni({passive:!0,capture:!0}),a_=["mousedown","touchstart"],s_=["mouseup","mouseleave","touchend","touchcancel"],YI=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275cmp=X({type:e,selectors:[["ng-component"]],hostAttrs:["mat-ripple-style-loader",""],decls:0,vars:0,template:function(r,i){},styles:[`.mat-ripple {
  overflow: hidden;
  position: relative;
}
.mat-ripple:not(:empty) {
  transform: translateZ(0);
}

.mat-ripple.mat-ripple-unbounded {
  overflow: visible;
}

.mat-ripple-element {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);
  transform: scale3d(0, 0, 0);
  background-color: var(--%NS%mat-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 10%, transparent));
}
@media (forced-colors: active) {
  .mat-ripple-element {
    display: none;
  }
}
.cdk-drag-preview .mat-ripple-element, .cdk-drag-placeholder .mat-ripple-element {
  display: none;
}
`],encapsulation:2})}return e})(),ea=class e{_target;_ngZone;_platform;_containerElement;_triggerElement=null;_isPointerDown=!1;_activeRipples=new Map;_mostRecentTransientRipple=null;_lastTouchStartEvent;_pointerUpEventsRegistered=!1;_containerRect=null;static _eventManager=new dm;constructor(n,t,r,i,o){this._target=n,this._ngZone=t,this._platform=i,i.isBrowser&&(this._containerElement=ut(r)),o&&o.get(Dt).load(YI)}fadeInRipple(n,t,r={}){let i=this._containerRect=this._containerRect||this._containerElement.getBoundingClientRect(),o=C(C({},Jo),r.animation);r.centered&&(n=i.left+i.width/2,t=i.top+i.height/2);let a=r.radius||ZI(n,t,i),s=n-i.left,l=t-i.top,c=o.enterDuration,d=document.createElement("div");d.classList.add("mat-ripple-element"),d.style.left=`${s-a}px`,d.style.top=`${l-a}px`,d.style.height=`${a*2}px`,d.style.width=`${a*2}px`,r.color!=null&&(d.style.backgroundColor=r.color),d.style.transitionDuration=`${c}ms`,this._containerElement.appendChild(d);let u=window.getComputedStyle(d),p=u.transitionProperty,m=u.transitionDuration,h=p==="none"||m==="0s"||m==="0s, 0s"||i.width===0&&i.height===0,w=new cm(this,d,r,h);d.style.transform="scale3d(1, 1, 1)",w.state=xt.FADING_IN,r.persistent||(this._mostRecentTransientRipple=w);let E=null;return!h&&(c||o.exitDuration)&&this._ngZone.runOutsideAngular(()=>{let R=()=>{E&&(E.fallbackTimer=null),clearTimeout(at),this._finishRippleTransition(w)},U=()=>this._destroyRipple(w),at=setTimeout(U,c+100);d.addEventListener("transitionend",R),d.addEventListener("transitioncancel",U),E={onTransitionEnd:R,onTransitionCancel:U,fallbackTimer:at}}),this._activeRipples.set(w,E),(h||!c)&&this._finishRippleTransition(w),w}fadeOutRipple(n){if(n.state===xt.FADING_OUT||n.state===xt.HIDDEN)return;let t=n.element,r=C(C({},Jo),n.config.animation);t.style.transitionDuration=`${r.exitDuration}ms`,t.style.opacity="0",n.state=xt.FADING_OUT,(n._animationForciblyDisabledThroughCss||!r.exitDuration)&&this._finishRippleTransition(n)}fadeOutAll(){this._getActiveRipples().forEach(n=>n.fadeOut())}fadeOutAllNonPersistent(){this._getActiveRipples().forEach(n=>{n.config.persistent||n.fadeOut()})}setupTriggerEvents(n){let t=ut(n);!this._platform.isBrowser||!t||t===this._triggerElement||(this._removeTriggerEvents(),this._triggerElement=t,a_.forEach(r=>{e._eventManager.addHandler(this._ngZone,r,t,this)}))}handleEvent(n){n.type==="mousedown"?this._onMousedown(n):n.type==="touchstart"?this._onTouchStart(n):this._onPointerUp(),this._pointerUpEventsRegistered||(this._ngZone.runOutsideAngular(()=>{s_.forEach(t=>{this._triggerElement.addEventListener(t,this,o_)})}),this._pointerUpEventsRegistered=!0)}_finishRippleTransition(n){n.state===xt.FADING_IN?this._startFadeOutTransition(n):n.state===xt.FADING_OUT&&this._destroyRipple(n)}_startFadeOutTransition(n){let t=n===this._mostRecentTransientRipple,{persistent:r}=n.config;n.state=xt.VISIBLE,!r&&(!t||!this._isPointerDown)&&n.fadeOut()}_destroyRipple(n){let t=this._activeRipples.get(n)??null;this._activeRipples.delete(n),this._activeRipples.size||(this._containerRect=null),n===this._mostRecentTransientRipple&&(this._mostRecentTransientRipple=null),n.state=xt.HIDDEN,t!==null&&(n.element.removeEventListener("transitionend",t.onTransitionEnd),n.element.removeEventListener("transitioncancel",t.onTransitionCancel),t.fallbackTimer!==null&&clearTimeout(t.fallbackTimer)),n.element.remove()}_onMousedown(n){let t=Ho(n),r=this._lastTouchStartEvent&&Date.now()<this._lastTouchStartEvent+qI;!this._target.rippleDisabled&&!t&&!r&&(this._isPointerDown=!0,this.fadeInRipple(n.clientX,n.clientY,this._target.rippleConfig))}_onTouchStart(n){if(!this._target.rippleDisabled&&!zo(n)){this._lastTouchStartEvent=Date.now(),this._isPointerDown=!0;let t=n.changedTouches;if(t)for(let r=0;r<t.length;r++)this.fadeInRipple(t[r].clientX,t[r].clientY,this._target.rippleConfig)}}_onPointerUp(){this._isPointerDown&&(this._isPointerDown=!1,this._getActiveRipples().forEach(n=>{let t=n.state===xt.VISIBLE||n.config.terminateOnPointerUp&&n.state===xt.FADING_IN;!n.config.persistent&&t&&n.fadeOut()}))}_getActiveRipples(){return Array.from(this._activeRipples.keys())}_removeTriggerEvents(){let n=this._triggerElement;n&&(a_.forEach(t=>e._eventManager.removeHandler(t,n,this)),this._pointerUpEventsRegistered&&(s_.forEach(t=>n.removeEventListener(t,this,o_)),this._pointerUpEventsRegistered=!1))}};function ZI(e,n,t){let r=Math.max(Math.abs(e-t.left),Math.abs(e-t.right)),i=Math.max(Math.abs(n-t.top),Math.abs(n-t.bottom));return Math.sqrt(r*r+i*i)}var um=new y("mat-ripple-global-options"),l_=(()=>{class e{_elementRef=f(Z);_animationsDisabled=Zt();color;unbounded=!1;centered=!1;radius=0;animation;get disabled(){return this._disabled}set disabled(t){t&&this.fadeOutAllNonPersistent(),this._disabled=t,this._setupTriggerEventsIfEnabled()}_disabled=!1;get trigger(){return this._trigger||this._elementRef.nativeElement}set trigger(t){this._trigger=t,this._setupTriggerEventsIfEnabled()}_trigger;_rippleRenderer;_globalOptions;_isInitialized=!1;constructor(){let t=f(A),r=f(Se),i=f(um,{optional:!0}),o=f(Q);this._globalOptions=i||{},this._rippleRenderer=new ea(this,t,this._elementRef,r,o)}ngOnInit(){this._isInitialized=!0,this._setupTriggerEventsIfEnabled()}ngOnDestroy(){this._rippleRenderer._removeTriggerEvents()}fadeOutAll(){this._rippleRenderer.fadeOutAll()}fadeOutAllNonPersistent(){this._rippleRenderer.fadeOutAllNonPersistent()}get rippleConfig(){return{centered:this.centered,radius:this.radius,color:this.color,animation:C(C(C({},this._globalOptions.animation),this._animationsDisabled?{enterDuration:0,exitDuration:0}:{}),this.animation),terminateOnPointerUp:this._globalOptions.terminateOnPointerUp}}get rippleDisabled(){return this.disabled||!!this._globalOptions.disabled}_setupTriggerEventsIfEnabled(){!this.disabled&&this._isInitialized&&this._rippleRenderer.setupTriggerEvents(this.trigger)}launch(t,r=0,i){return typeof t=="number"?this._rippleRenderer.fadeInRipple(t,r,C(C({},this.rippleConfig),i)):this._rippleRenderer.fadeInRipple(0,0,C(C({},this.rippleConfig),t))}static \u0275fac=function(r){return new(r||e)};static \u0275dir=q({type:e,selectors:[["","mat-ripple",""],["","matRipple",""]],hostAttrs:[1,"mat-ripple"],hostVars:2,hostBindings:function(r,i){r&2&&$("mat-ripple-unbounded",i.unbounded)},inputs:{color:[0,"matRippleColor","color"],unbounded:[0,"matRippleUnbounded","unbounded"],centered:[0,"matRippleCentered","centered"],radius:[0,"matRippleRadius","radius"],animation:[0,"matRippleAnimation","animation"],disabled:[0,"matRippleDisabled","disabled"],trigger:[0,"matRippleTrigger","trigger"]},exportAs:["matRipple"]})}return e})();var XI={capture:!0},KI=["focus","mousedown","mouseenter","touchstart"],fm="mat-ripple-loader-uninitialized",mm="mat-ripple-loader-class-name",c_="mat-ripple-loader-centered",Kl="mat-ripple-loader-disabled",d_=(()=>{class e{_document=f(j);_animationsDisabled=Zt();_globalRippleOptions=f(um,{optional:!0});_platform=f(Se);_ngZone=f(A);_injector=f(Q);_eventCleanups;_hosts=new Map;constructor(){let t=f(Ve).createRenderer(null,null);this._eventCleanups=this._ngZone.runOutsideAngular(()=>KI.map(r=>t.listen(this._document,r,this._onInteraction,XI)))}ngOnDestroy(){let t=this._hosts.keys();for(let r of t)this.destroyRipple(r);this._eventCleanups.forEach(r=>r())}configureRipple(t,r){t.setAttribute(fm,this._globalRippleOptions?.namespace??""),(r.className||!t.hasAttribute(mm))&&t.setAttribute(mm,r.className||""),r.centered&&t.setAttribute(c_,""),r.disabled&&t.setAttribute(Kl,"")}setDisabled(t,r){let i=this._hosts.get(t);i?(i.target.rippleDisabled=r,!r&&!i.hasSetUpEvents&&(i.hasSetUpEvents=!0,i.renderer.setupTriggerEvents(t))):r?t.setAttribute(Kl,""):t.removeAttribute(Kl)}_onInteraction=t=>{let r=ot(t);if(r instanceof HTMLElement){let i=r.closest(`[${fm}="${this._globalRippleOptions?.namespace??""}"]`);i&&this._createRipple(i)}};_createRipple(t){if(!this._document||this._hosts.has(t))return;t.querySelector(".mat-ripple")?.remove();let r=this._document.createElement("span");r.classList.add("mat-ripple",t.getAttribute(mm)),t.append(r);let i=this._globalRippleOptions,o=this._animationsDisabled?0:i?.animation?.enterDuration??Jo.enterDuration,a=this._animationsDisabled?0:i?.animation?.exitDuration??Jo.exitDuration,s={rippleDisabled:this._animationsDisabled||i?.disabled||t.hasAttribute(Kl),rippleConfig:{centered:t.hasAttribute(c_),terminateOnPointerUp:i?.terminateOnPointerUp,animation:{enterDuration:o,exitDuration:a}}},l=new ea(s,this._ngZone,r,this._platform,this._injector),c=!s.rippleDisabled;c&&l.setupTriggerEvents(t),this._hosts.set(t,{target:s,renderer:l,hasSetUpEvents:c}),t.removeAttribute(fm)}destroyRipple(t){let r=this._hosts.get(t);r&&(r.renderer._removeTriggerEvents(),this._hosts.delete(t))}static \u0275fac=function(r){return new(r||e)};static \u0275prov=k({token:e,factory:e.\u0275fac})}return e})();var Ql=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275cmp=X({type:e,selectors:[["structural-styles"]],decls:0,vars:0,template:function(r,i){},styles:[`.mat-focus-indicator {
  position: relative;
}
.mat-focus-indicator::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  box-sizing: border-box;
  pointer-events: none;
  display: var(--%NS%mat-focus-indicator-display, none);
  border-width: var(--%NS%mat-focus-indicator-border-width, 3px);
  border-style: var(--%NS%mat-focus-indicator-border-style, solid);
  border-color: var(--%NS%mat-focus-indicator-border-color, transparent);
  border-radius: var(--%NS%mat-focus-indicator-border-radius, 4px);
}
.mat-focus-indicator:focus-visible::before {
  content: "";
}

@media (forced-colors: active) {
  html {
    --%NS%mat-focus-indicator-display: block;
    --%NS%mat-focus-indicator-fallback-border-style: none;
  }
}
`],encapsulation:2})}return e})();var QI=new y("MAT_BUTTON_CONFIG");function u_(e){return e==null?void 0:rl(e)}var pm=(()=>{class e{_elementRef=f(Z);_ngZone=f(A);_animationsDisabled=Zt();_config=f(QI,{optional:!0});_focusMonitor=f(Go);_cleanupClick;_renderer=f(ze);_rippleLoader=f(d_);_isAnchor;_isFab=!1;color;get disableRipple(){return this._disableRipple}set disableRipple(t){this._disableRipple=t,this._updateRippleDisabled()}_disableRipple=!1;get disabled(){return this._disabled}set disabled(t){this._disabled=t,this._updateRippleDisabled()}_disabled=!1;ariaDisabled;disabledInteractive;tabIndex;set _tabindex(t){this.tabIndex=t}showProgress=G(!1,{transform:xe});constructor(){f(Dt).load(Ql);let t=this._elementRef.nativeElement;this._isAnchor=t.tagName==="A",this.disabledInteractive=this._config?.disabledInteractive??!1,this.color=this._config?.color??null,this._rippleLoader?.configureRipple(t,{className:"mat-mdc-button-ripple"})}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,!0),this._isAnchor&&this._setupAsAnchor()}ngOnDestroy(){this._cleanupClick?.(),this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement)}focus(t="program",r){t?this._focusMonitor.focusVia(this._elementRef.nativeElement,t,r):this._elementRef.nativeElement.focus(r)}_getAriaDisabled(){return this.ariaDisabled!=null?this.ariaDisabled:this._isAnchor?this.disabled||null:this.disabled&&this.disabledInteractive?!0:null}_getDisabledAttribute(){return this.disabledInteractive||!this.disabled?null:!0}_updateRippleDisabled(){this._rippleLoader?.setDisabled(this._elementRef.nativeElement,this.disableRipple||this.disabled)}_getTabIndex(){return this._isAnchor?this.disabled&&!this.disabledInteractive?-1:this.tabIndex:this.tabIndex}_setupAsAnchor(){this._cleanupClick=this._ngZone.runOutsideAngular(()=>this._renderer.listen(this._elementRef.nativeElement,"click",t=>{this.disabled&&(t.preventDefault(),t.stopImmediatePropagation())}))}static \u0275fac=function(r){return new(r||e)};static \u0275dir=q({type:e,hostAttrs:[1,"mat-mdc-button-base"],hostVars:15,hostBindings:function(r,i){r&2&&(je("disabled",i._getDisabledAttribute())("aria-disabled",i._getAriaDisabled())("tabindex",i._getTabIndex()),Tr(i.color?"mat-"+i.color:""),$("mat-mdc-button-progress-indicator-shown",i.showProgress())("mat-mdc-button-disabled",i.disabled)("mat-mdc-button-disabled-interactive",i.disabledInteractive)("mat-unthemed",!i.color)("_mat-animation-noopable",i._animationsDisabled))},inputs:{color:"color",disableRipple:[2,"disableRipple","disableRipple",xe],disabled:[2,"disabled","disabled",xe],ariaDisabled:[2,"aria-disabled","ariaDisabled",xe],disabledInteractive:[2,"disabledInteractive","disabledInteractive",xe],tabIndex:[2,"tabIndex","tabIndex",u_],_tabindex:[2,"tabindex","_tabindex",u_],showProgress:[1,"showProgress"]}})}return e})(),hm=(()=>{class e extends pm{constructor(){super(),this._rippleLoader.configureRipple(this._elementRef.nativeElement,{centered:!0})}static \u0275fac=function(r){return new(r||e)};static \u0275cmp=(function(){let t=["*",[["","progressIndicator",""]]],r=["*","[progressIndicator]"];function i(o,a){o&1&&(yt(0,"div",1),ae(1,1),_t())}return X({type:e,selectors:[["button","mat-icon-button",""],["a","mat-icon-button",""],["button","matIconButton",""],["a","matIconButton",""]],hostAttrs:[1,"mdc-icon-button","mat-mdc-icon-button"],exportAs:["matButton","matAnchor"],features:[Ke],ngContentSelectors:r,decls:5,vars:1,consts:[[1,"mat-mdc-button-persistent-ripple","mdc-icon-button__ripple"],[1,"mat-mdc-button-progress-indicator-container"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(a,s){a&1&&(Qe(t),wt(0,"span",0),ae(1),_e(2,i,2,0,"div",1),wt(3,"span",2)(4,"span",3)),a&2&&(_(2),we(s.showProgress()?2:-1))},styles:[`.mat-mdc-icon-button {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  border: none;
  outline: none;
  background-color: transparent;
  fill: currentColor;
  text-decoration: none;
  cursor: pointer;
  z-index: 0;
  overflow: visible;
  border-radius: var(--%NS%mat-icon-button-container-shape, var(--%NS%mat-sys-corner-full, 50%));
  flex-shrink: 0;
  text-align: center;
  width: var(--%NS%mat-icon-button-state-layer-size, 40px);
  height: var(--%NS%mat-icon-button-state-layer-size, 40px);
  padding: calc(calc(var(--%NS%mat-icon-button-state-layer-size, 40px) - var(--%NS%mat-icon-button-icon-size, 24px)) / 2);
  font-size: var(--%NS%mat-icon-button-icon-size, 24px);
  color: var(--%NS%mat-icon-button-icon-color, var(--%NS%mat-sys-on-surface-variant));
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-icon-button .mat-mdc-button-ripple,
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple,
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}
.mat-mdc-icon-button .mat-mdc-button-ripple {
  overflow: hidden;
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  content: "";
  opacity: 0;
}
.mat-mdc-icon-button .mdc-button__label,
.mat-mdc-icon-button .mat-icon {
  z-index: 1;
  position: relative;
}
.mat-mdc-icon-button .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
}
.mat-mdc-icon-button:focus-visible > .mat-focus-indicator::before {
  content: "";
  border-radius: inherit;
}
.mat-mdc-icon-button .mat-ripple-element {
  background-color: var(--%NS%mat-icon-button-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface-variant) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-icon-button-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-icon-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-icon-button-disabled-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-icon-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-icon-button-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-mdc-icon-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-icon-button-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mat-mdc-icon-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-icon-button-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-icon-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--%NS%mat-icon-button-touch-target-size, 48px);
  display: var(--%NS%mat-icon-button-touch-target-display, block);
  left: 50%;
  width: var(--%NS%mat-icon-button-touch-target-size, 48px);
  transform: translate(-50%, -50%);
}
.mat-mdc-icon-button._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-icon-button[disabled], .mat-mdc-icon-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--%NS%mat-icon-button-disabled-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-icon-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-icon-button img,
.mat-mdc-icon-button svg {
  width: var(--%NS%mat-icon-button-icon-size, 24px);
  height: var(--%NS%mat-icon-button-icon-size, 24px);
  vertical-align: baseline;
}
.mat-mdc-icon-button .mat-mdc-button-progress-indicator-container .mdc-circular-progress__determinate-circle-graphic {
  width: inherit;
  height: inherit;
}
.mat-mdc-icon-button .mat-mdc-button-progress-indicator-container .mdc-circular-progress__indeterminate-circle-graphic {
  height: 100%;
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple {
  border-radius: var(--%NS%mat-icon-button-container-shape, var(--%NS%mat-sys-corner-full, 50%));
}
.mat-mdc-icon-button[hidden] {
  display: none;
}
.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before {
  background: transparent;
  opacity: 1;
}

.mat-mdc-button-progress-indicator-container {
  position: absolute;
  inset-inline-start: 0;
  inset-block-start: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.mat-mdc-button-progress-indicator-shown mat-icon {
  visibility: hidden;
}
`,`@media (forced-colors: active) {
  .mat-mdc-button:not(.mdc-button--outlined),
  .mat-mdc-unelevated-button:not(.mdc-button--outlined),
  .mat-mdc-raised-button:not(.mdc-button--outlined),
  .mat-mdc-outlined-button:not(.mdc-button--outlined),
  .mat-mdc-button-base.mat-tonal-button,
  .mat-mdc-icon-button.mat-mdc-icon-button,
  .mat-mdc-outlined-button .mdc-button__ripple {
    outline: solid 1px;
  }
}
`],encapsulation:2})})()}return e})();var f_=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=ee({type:e});static \u0275inj=K({imports:[nt]})}return e})();var m_=new Map([["text",["mat-mdc-button"]],["filled",["mdc-button--unelevated","mat-mdc-unelevated-button"]],["elevated",["mdc-button--raised","mat-mdc-raised-button"]],["outlined",["mdc-button--outlined","mat-mdc-outlined-button"]],["tonal",["mat-tonal-button"]]]),p_=(()=>{class e extends pm{get appearance(){return this._appearance}set appearance(t){this.setAppearance(t||this._config?.defaultAppearance||"text")}_appearance=null;constructor(){super();let t=JI(this._elementRef.nativeElement);t&&this.setAppearance(t)}setAppearance(t){if(t===this._appearance)return;let r=this._elementRef.nativeElement.classList,i=this._appearance?m_.get(this._appearance):null,o=m_.get(t);i&&r.remove(...i),r.add(...o),this._appearance=t}static \u0275fac=function(r){return new(r||e)};static \u0275cmp=(function(){let t=[[["",8,"material-icons",3,"iconPositionEnd",""],["mat-icon",3,"iconPositionEnd",""],["","matButtonIcon","",3,"iconPositionEnd",""],["",8,"material-symbols-outlined",3,"iconPositionEnd",""],["",8,"material-symbols-rounded",3,"iconPositionEnd",""],["",8,"material-symbols-sharp",3,"iconPositionEnd",""]],"*",[["","iconPositionEnd","",8,"material-icons"],["mat-icon","iconPositionEnd",""],["","matButtonIcon","","iconPositionEnd",""],["","iconPositionEnd","",8,"material-symbols-outlined"],["","iconPositionEnd","",8,"material-symbols-rounded"],["","iconPositionEnd","",8,"material-symbols-sharp"]],[["","progressIndicator",""]]],r=[".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd]), .material-symbols-outlined:not([iconPositionEnd]), .material-symbols-rounded:not([iconPositionEnd]), .material-symbols-sharp:not([iconPositionEnd])","*",".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd], .material-symbols-outlined[iconPositionEnd], .material-symbols-rounded[iconPositionEnd], .material-symbols-sharp[iconPositionEnd]","[progressIndicator]"];function i(o,a){o&1&&(yt(0,"div",2),ae(1,3),_t())}return X({type:e,selectors:[["button","matButton",""],["a","matButton",""],["button","mat-button",""],["button","mat-raised-button",""],["button","mat-flat-button",""],["button","mat-stroked-button",""],["a","mat-button",""],["a","mat-raised-button",""],["a","mat-flat-button",""],["a","mat-stroked-button",""]],hostAttrs:[1,"mdc-button"],inputs:{appearance:[0,"matButton","appearance"]},exportAs:["matButton","matAnchor"],features:[Ke],ngContentSelectors:r,decls:8,vars:5,consts:[[1,"mat-mdc-button-persistent-ripple"],[1,"mdc-button__label"],[1,"mat-mdc-button-progress-indicator-container"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(a,s){a&1&&(Qe(t),wt(0,"span",0),ae(1),yt(2,"span",1),ae(3,1),_t(),ae(4,2),_e(5,i,2,0,"div",2),wt(6,"span",3)(7,"span",4)),a&2&&($("mdc-button__ripple",!s._isFab)("mdc-fab__ripple",s._isFab),_(5),we(s.showProgress()?5:-1))},styles:[`.mat-mdc-button-base {
  text-decoration: none;
}
.mat-mdc-button-base .mat-icon {
  min-height: fit-content;
  flex-shrink: 0;
}
@media (hover: none) {
  .mat-mdc-button-base:hover > span.mat-mdc-button-persistent-ripple::before {
    opacity: 0;
  }
}

.mdc-button {
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 64px;
  border: none;
  outline: none;
  line-height: inherit;
  -webkit-appearance: none;
  overflow: visible;
  vertical-align: middle;
  background: transparent;
  padding: 0 8px;
}
.mdc-button::-moz-focus-inner {
  padding: 0;
  border: 0;
}
.mdc-button:active {
  outline: none;
}
.mdc-button:hover {
  cursor: pointer;
}
.mdc-button:disabled {
  cursor: default;
  pointer-events: none;
}
.mdc-button[hidden] {
  display: none;
}
.mdc-button .mdc-button__label {
  position: relative;
}

.mat-mdc-button {
  padding: 0 var(--%NS%mat-button-text-horizontal-padding, 12px);
  height: var(--%NS%mat-button-text-container-height, 40px);
  font-family: var(--%NS%mat-button-text-label-text-font, var(--%NS%mat-sys-label-large-font));
  font-size: var(--%NS%mat-button-text-label-text-size, var(--%NS%mat-sys-label-large-size));
  letter-spacing: var(--%NS%mat-button-text-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));
  text-transform: var(--%NS%mat-button-text-label-text-transform);
  font-weight: var(--%NS%mat-button-text-label-text-weight, var(--%NS%mat-sys-label-large-weight));
}
.mat-mdc-button, .mat-mdc-button .mdc-button__ripple {
  border-radius: var(--%NS%mat-button-text-container-shape, var(--%NS%mat-sys-corner-full));
}
.mat-mdc-button:not(:disabled) {
  color: var(--%NS%mat-button-text-label-text-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-button[disabled], .mat-mdc-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--%NS%mat-button-text-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-button:has(.material-icons, .material-symbols-outlined, .material-symbols-rounded,
.material-symbols-sharp, mat-icon, [matButtonIcon]) {
  padding: 0 var(--%NS%mat-button-text-with-icon-horizontal-padding, 16px);
}
.mat-mdc-button > .mat-icon {
  margin-right: var(--%NS%mat-button-text-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-text-icon-offset, -4px);
}
[dir=rtl] .mat-mdc-button > .mat-icon {
  margin-right: var(--%NS%mat-button-text-icon-offset, -4px);
  margin-left: var(--%NS%mat-button-text-icon-spacing, 8px);
}
.mat-mdc-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-text-icon-offset, -4px);
  margin-left: var(--%NS%mat-button-text-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-text-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-text-icon-offset, -4px);
}
.mat-mdc-button .mat-ripple-element {
  background-color: var(--%NS%mat-button-text-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-primary) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-text-state-layer-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-text-disabled-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-text-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-mdc-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-text-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mat-mdc-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-text-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--%NS%mat-button-text-touch-target-size, 48px);
  display: var(--%NS%mat-button-text-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.mat-mdc-unelevated-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--%NS%mat-button-filled-container-height, 40px);
  font-family: var(--%NS%mat-button-filled-label-text-font, var(--%NS%mat-sys-label-large-font));
  font-size: var(--%NS%mat-button-filled-label-text-size, var(--%NS%mat-sys-label-large-size));
  letter-spacing: var(--%NS%mat-button-filled-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));
  text-transform: var(--%NS%mat-button-filled-label-text-transform);
  font-weight: var(--%NS%mat-button-filled-label-text-weight, var(--%NS%mat-sys-label-large-weight));
  padding: 0 var(--%NS%mat-button-filled-horizontal-padding, 24px);
}
.mat-mdc-unelevated-button > .mat-icon {
  margin-right: var(--%NS%mat-button-filled-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-filled-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-unelevated-button > .mat-icon {
  margin-right: var(--%NS%mat-button-filled-icon-offset, -8px);
  margin-left: var(--%NS%mat-button-filled-icon-spacing, 8px);
}
.mat-mdc-unelevated-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-filled-icon-offset, -8px);
  margin-left: var(--%NS%mat-button-filled-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-unelevated-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-filled-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-filled-icon-offset, -8px);
}
.mat-mdc-unelevated-button .mat-ripple-element {
  background-color: var(--%NS%mat-button-filled-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-on-primary) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-filled-state-layer-color, var(--%NS%mat-sys-on-primary));
}
.mat-mdc-unelevated-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-filled-disabled-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-unelevated-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-filled-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-mdc-unelevated-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-filled-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mat-mdc-unelevated-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-filled-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-unelevated-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--%NS%mat-button-filled-touch-target-size, 48px);
  display: var(--%NS%mat-button-filled-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-unelevated-button:not(:disabled) {
  color: var(--%NS%mat-button-filled-label-text-color, var(--%NS%mat-sys-on-primary));
  background-color: var(--%NS%mat-button-filled-container-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-unelevated-button, .mat-mdc-unelevated-button .mdc-button__ripple {
  border-radius: var(--%NS%mat-button-filled-container-shape, var(--%NS%mat-sys-corner-full));
}
.mat-mdc-unelevated-button .mat-mdc-button-progress-indicator-container {
  --%NS%mat-progress-spinner-active-indicator-color: var(--%NS%mat-button-filled-progress-active-indicator-color, var(--%NS%mat-sys-on-primary));
}
.mat-mdc-unelevated-button[disabled], .mat-mdc-unelevated-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--%NS%mat-button-filled-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
  background-color: var(--%NS%mat-button-filled-disabled-container-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-raised-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--%NS%mat-button-protected-container-elevation-shadow, var(--%NS%mat-sys-level1));
  height: var(--%NS%mat-button-protected-container-height, 40px);
  font-family: var(--%NS%mat-button-protected-label-text-font, var(--%NS%mat-sys-label-large-font));
  font-size: var(--%NS%mat-button-protected-label-text-size, var(--%NS%mat-sys-label-large-size));
  letter-spacing: var(--%NS%mat-button-protected-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));
  text-transform: var(--%NS%mat-button-protected-label-text-transform);
  font-weight: var(--%NS%mat-button-protected-label-text-weight, var(--%NS%mat-sys-label-large-weight));
  padding: 0 var(--%NS%mat-button-protected-horizontal-padding, 24px);
}
.mat-mdc-raised-button > .mat-icon {
  margin-right: var(--%NS%mat-button-protected-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-protected-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-raised-button > .mat-icon {
  margin-right: var(--%NS%mat-button-protected-icon-offset, -8px);
  margin-left: var(--%NS%mat-button-protected-icon-spacing, 8px);
}
.mat-mdc-raised-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-protected-icon-offset, -8px);
  margin-left: var(--%NS%mat-button-protected-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-raised-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-protected-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-protected-icon-offset, -8px);
}
.mat-mdc-raised-button .mat-ripple-element {
  background-color: var(--%NS%mat-button-protected-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-primary) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-protected-state-layer-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-raised-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-protected-disabled-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-raised-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-protected-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-mdc-raised-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-protected-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mat-mdc-raised-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-protected-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-raised-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--%NS%mat-button-protected-touch-target-size, 48px);
  display: var(--%NS%mat-button-protected-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-raised-button:not(:disabled) {
  color: var(--%NS%mat-button-protected-label-text-color, var(--%NS%mat-sys-primary));
  background-color: var(--%NS%mat-button-protected-container-color, var(--%NS%mat-sys-surface));
}
.mat-mdc-raised-button, .mat-mdc-raised-button .mdc-button__ripple {
  border-radius: var(--%NS%mat-button-protected-container-shape, var(--%NS%mat-sys-corner-full));
}
@media (hover: hover) {
  .mat-mdc-raised-button:hover {
    box-shadow: var(--%NS%mat-button-protected-hover-container-elevation-shadow, var(--%NS%mat-sys-level2));
  }
}
.mat-mdc-raised-button:focus {
  box-shadow: var(--%NS%mat-button-protected-focus-container-elevation-shadow, var(--%NS%mat-sys-level1));
}
.mat-mdc-raised-button:active, .mat-mdc-raised-button:focus:active {
  box-shadow: var(--%NS%mat-button-protected-pressed-container-elevation-shadow, var(--%NS%mat-sys-level1));
}
.mat-mdc-raised-button[disabled], .mat-mdc-raised-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--%NS%mat-button-protected-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
  background-color: var(--%NS%mat-button-protected-disabled-container-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-raised-button[disabled].mat-mdc-button-disabled, .mat-mdc-raised-button.mat-mdc-button-disabled.mat-mdc-button-disabled {
  box-shadow: var(--%NS%mat-button-protected-disabled-container-elevation-shadow, var(--%NS%mat-sys-level0));
}
.mat-mdc-raised-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-outlined-button {
  border-style: solid;
  transition: border 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--%NS%mat-button-outlined-container-height, 40px);
  font-family: var(--%NS%mat-button-outlined-label-text-font, var(--%NS%mat-sys-label-large-font));
  font-size: var(--%NS%mat-button-outlined-label-text-size, var(--%NS%mat-sys-label-large-size));
  letter-spacing: var(--%NS%mat-button-outlined-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));
  text-transform: var(--%NS%mat-button-outlined-label-text-transform);
  font-weight: var(--%NS%mat-button-outlined-label-text-weight, var(--%NS%mat-sys-label-large-weight));
  border-radius: var(--%NS%mat-button-outlined-container-shape, var(--%NS%mat-sys-corner-full));
  border-width: var(--%NS%mat-button-outlined-outline-width, 1px);
  padding: 0 var(--%NS%mat-button-outlined-horizontal-padding, 24px);
}
.mat-mdc-outlined-button > .mat-icon {
  margin-right: var(--%NS%mat-button-outlined-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-outlined-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-outlined-button > .mat-icon {
  margin-right: var(--%NS%mat-button-outlined-icon-offset, -8px);
  margin-left: var(--%NS%mat-button-outlined-icon-spacing, 8px);
}
.mat-mdc-outlined-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-outlined-icon-offset, -8px);
  margin-left: var(--%NS%mat-button-outlined-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-outlined-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-outlined-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-outlined-icon-offset, -8px);
}
.mat-mdc-outlined-button .mat-ripple-element {
  background-color: var(--%NS%mat-button-outlined-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-primary) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-outlined-state-layer-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-outlined-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-outlined-disabled-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-outlined-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-outlined-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-mdc-outlined-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-outlined-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mat-mdc-outlined-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-outlined-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-outlined-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--%NS%mat-button-outlined-touch-target-size, 48px);
  display: var(--%NS%mat-button-outlined-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-outlined-button:not(:disabled) {
  color: var(--%NS%mat-button-outlined-label-text-color, var(--%NS%mat-sys-primary));
  border-color: var(--%NS%mat-button-outlined-outline-color, var(--%NS%mat-sys-outline));
}
.mat-mdc-outlined-button[disabled], .mat-mdc-outlined-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--%NS%mat-button-outlined-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
  border-color: var(--%NS%mat-button-outlined-disabled-outline-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-outlined-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-tonal-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--%NS%mat-button-tonal-container-height, 40px);
  font-family: var(--%NS%mat-button-tonal-label-text-font, var(--%NS%mat-sys-label-large-font));
  font-size: var(--%NS%mat-button-tonal-label-text-size, var(--%NS%mat-sys-label-large-size));
  letter-spacing: var(--%NS%mat-button-tonal-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));
  text-transform: var(--%NS%mat-button-tonal-label-text-transform);
  font-weight: var(--%NS%mat-button-tonal-label-text-weight, var(--%NS%mat-sys-label-large-weight));
  padding: 0 var(--%NS%mat-button-tonal-horizontal-padding, 24px);
}
.mat-tonal-button:not(:disabled) {
  color: var(--%NS%mat-button-tonal-label-text-color, var(--%NS%mat-sys-on-secondary-container));
  background-color: var(--%NS%mat-button-tonal-container-color, var(--%NS%mat-sys-secondary-container));
}
.mat-tonal-button, .mat-tonal-button .mdc-button__ripple {
  border-radius: var(--%NS%mat-button-tonal-container-shape, var(--%NS%mat-sys-corner-full));
}
.mat-tonal-button[disabled], .mat-tonal-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--%NS%mat-button-tonal-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
  background-color: var(--%NS%mat-button-tonal-disabled-container-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));
}
.mat-tonal-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-tonal-button > .mat-icon {
  margin-right: var(--%NS%mat-button-tonal-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-tonal-icon-offset, -8px);
}
[dir=rtl] .mat-tonal-button > .mat-icon {
  margin-right: var(--%NS%mat-button-tonal-icon-offset, -8px);
  margin-left: var(--%NS%mat-button-tonal-icon-spacing, 8px);
}
.mat-tonal-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-tonal-icon-offset, -8px);
  margin-left: var(--%NS%mat-button-tonal-icon-spacing, 8px);
}
[dir=rtl] .mat-tonal-button .mdc-button__label + .mat-icon {
  margin-right: var(--%NS%mat-button-tonal-icon-spacing, 8px);
  margin-left: var(--%NS%mat-button-tonal-icon-offset, -8px);
}
.mat-tonal-button .mat-ripple-element {
  background-color: var(--%NS%mat-button-tonal-ripple-color, color-mix(in srgb, var(--%NS%mat-sys-on-secondary-container) calc(var(--%NS%mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-tonal-state-layer-color, var(--%NS%mat-sys-on-secondary-container));
}
.mat-tonal-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--%NS%mat-button-tonal-disabled-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-tonal-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-tonal-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-tonal-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-tonal-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mat-tonal-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--%NS%mat-button-tonal-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
}
.mat-tonal-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--%NS%mat-button-tonal-touch-target-size, 48px);
  display: var(--%NS%mat-button-tonal-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.mat-mdc-button,
.mat-mdc-unelevated-button,
.mat-mdc-raised-button,
.mat-mdc-outlined-button,
.mat-tonal-button {
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-button .mat-mdc-button-ripple,
.mat-mdc-button .mat-mdc-button-persistent-ripple,
.mat-mdc-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-unelevated-button .mat-mdc-button-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-raised-button .mat-mdc-button-ripple,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,
.mat-tonal-button .mat-mdc-button-ripple,
.mat-tonal-button .mat-mdc-button-persistent-ripple,
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}
.mat-mdc-button .mat-mdc-button-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-ripple,
.mat-mdc-raised-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-tonal-button .mat-mdc-button-ripple {
  overflow: hidden;
}
.mat-mdc-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  content: "";
  opacity: 0;
}
.mat-mdc-button .mdc-button__label,
.mat-mdc-button .mat-icon,
.mat-mdc-unelevated-button .mdc-button__label,
.mat-mdc-unelevated-button .mat-icon,
.mat-mdc-raised-button .mdc-button__label,
.mat-mdc-raised-button .mat-icon,
.mat-mdc-outlined-button .mdc-button__label,
.mat-mdc-outlined-button .mat-icon,
.mat-tonal-button .mdc-button__label,
.mat-tonal-button .mat-icon {
  z-index: 1;
  position: relative;
}
.mat-mdc-button .mat-focus-indicator,
.mat-mdc-unelevated-button .mat-focus-indicator,
.mat-mdc-raised-button .mat-focus-indicator,
.mat-mdc-outlined-button .mat-focus-indicator,
.mat-tonal-button .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
}
.mat-mdc-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-unelevated-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-raised-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-outlined-button:focus-visible > .mat-focus-indicator::before,
.mat-tonal-button:focus-visible > .mat-focus-indicator::before {
  content: "";
  border-radius: inherit;
}
.mat-mdc-button._mat-animation-noopable,
.mat-mdc-unelevated-button._mat-animation-noopable,
.mat-mdc-raised-button._mat-animation-noopable,
.mat-mdc-outlined-button._mat-animation-noopable,
.mat-tonal-button._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-button > .mat-icon,
.mat-mdc-unelevated-button > .mat-icon,
.mat-mdc-raised-button > .mat-icon,
.mat-mdc-outlined-button > .mat-icon,
.mat-tonal-button > .mat-icon {
  display: inline-block;
  position: relative;
  vertical-align: top;
  font-size: 1.125rem;
  height: 1.125rem;
  width: 1.125rem;
}

.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mdc-button__ripple {
  top: -1px;
  left: -1px;
  bottom: -1px;
  right: -1px;
}

.mat-mdc-unelevated-button .mat-focus-indicator::before,
.mat-tonal-button .mat-focus-indicator::before,
.mat-mdc-raised-button .mat-focus-indicator::before {
  margin: calc(calc(var(--%NS%mat-focus-indicator-border-width, 3px) + 2px) * -1);
}

.mat-mdc-outlined-button .mat-focus-indicator::before {
  margin: calc(calc(var(--%NS%mat-focus-indicator-border-width, 3px) + 3px) * -1);
}

.mat-mdc-button-progress-indicator-container {
  position: absolute;
  inset-inline-start: 0;
  inset-block-start: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.mat-mdc-button-progress-indicator-shown mat-icon,
.mat-mdc-button-progress-indicator-shown [matButtonIcon],
.mat-mdc-button-progress-indicator-shown .mdc-button__label {
  visibility: hidden;
}
`,`@media (forced-colors: active) {
  .mat-mdc-button:not(.mdc-button--outlined),
  .mat-mdc-unelevated-button:not(.mdc-button--outlined),
  .mat-mdc-raised-button:not(.mdc-button--outlined),
  .mat-mdc-outlined-button:not(.mdc-button--outlined),
  .mat-mdc-button-base.mat-tonal-button,
  .mat-mdc-icon-button.mat-mdc-icon-button,
  .mat-mdc-outlined-button .mdc-button__ripple {
    outline: solid 1px;
  }
}
`],encapsulation:2})})()}return e})();function JI(e){return e.hasAttribute("mat-raised-button")?"elevated":e.hasAttribute("mat-stroked-button")?"outlined":e.hasAttribute("mat-flat-button")?"filled":e.hasAttribute("mat-button")?"text":null}var h_=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=ee({type:e});static \u0275inj=K({imports:[f_,nt]})}return e})();var tM=new y("MAT_CARD_CONFIG"),g_=(()=>{class e{appearance;constructor(){let t=f(tM,{optional:!0});this.appearance=t?.appearance||"raised"}static \u0275fac=function(r){return new(r||e)};static \u0275cmp=(function(){return X({type:e,selectors:[["mat-card"]],hostAttrs:[1,"mat-mdc-card","mdc-card"],hostVars:8,hostBindings:function(i,o){i&2&&$("mat-mdc-card-outlined",o.appearance==="outlined")("mdc-card--outlined",o.appearance==="outlined")("mat-mdc-card-filled",o.appearance==="filled")("mdc-card--filled",o.appearance==="filled")},inputs:{appearance:"appearance"},exportAs:["matCard"],ngContentSelectors:["*"],decls:1,vars:0,template:function(i,o){i&1&&(Qe(),ae(0))},styles:[`.mat-mdc-card {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
  border-style: solid;
  border-width: 0;
  background-color: var(--%NS%mat-card-elevated-container-color, var(--%NS%mat-sys-surface-container-low));
  border-color: var(--%NS%mat-card-elevated-container-color, var(--%NS%mat-sys-surface-container-low));
  border-radius: var(--%NS%mat-card-elevated-container-shape, var(--%NS%mat-sys-corner-medium));
  box-shadow: var(--%NS%mat-card-elevated-container-elevation, var(--%NS%mat-sys-level1));
}
.mat-mdc-card::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: solid 1px transparent;
  content: "";
  display: block;
  pointer-events: none;
  box-sizing: border-box;
  border-radius: var(--%NS%mat-card-elevated-container-shape, var(--%NS%mat-sys-corner-medium));
}

.mat-mdc-card-outlined {
  background-color: var(--%NS%mat-card-outlined-container-color, var(--%NS%mat-sys-surface));
  border-radius: var(--%NS%mat-card-outlined-container-shape, var(--%NS%mat-sys-corner-medium));
  border-width: var(--%NS%mat-card-outlined-outline-width, 1px);
  border-color: var(--%NS%mat-card-outlined-outline-color, var(--%NS%mat-sys-outline-variant));
  box-shadow: var(--%NS%mat-card-outlined-container-elevation, var(--%NS%mat-sys-level0));
}
.mat-mdc-card-outlined::after {
  border: none;
}

.mat-mdc-card-filled {
  background-color: var(--%NS%mat-card-filled-container-color, var(--%NS%mat-sys-surface-container-highest));
  border-radius: var(--%NS%mat-card-filled-container-shape, var(--%NS%mat-sys-corner-medium));
  box-shadow: var(--%NS%mat-card-filled-container-elevation, var(--%NS%mat-sys-level0));
}

.mdc-card__media {
  position: relative;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.mdc-card__media::before {
  display: block;
  content: "";
}
.mdc-card__media:first-child {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}
.mdc-card__media:last-child {
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
}

.mat-mdc-card-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  min-height: 52px;
  padding: 8px;
}

.mat-mdc-card-title {
  font-family: var(--%NS%mat-card-title-text-font, var(--%NS%mat-sys-title-large-font));
  line-height: var(--%NS%mat-card-title-text-line-height, var(--%NS%mat-sys-title-large-line-height));
  font-size: var(--%NS%mat-card-title-text-size, var(--%NS%mat-sys-title-large-size));
  letter-spacing: var(--%NS%mat-card-title-text-tracking, var(--%NS%mat-sys-title-large-tracking));
  font-weight: var(--%NS%mat-card-title-text-weight, var(--%NS%mat-sys-title-large-weight));
}

.mat-mdc-card-subtitle {
  color: var(--%NS%mat-card-subtitle-text-color, var(--%NS%mat-sys-on-surface));
  font-family: var(--%NS%mat-card-subtitle-text-font, var(--%NS%mat-sys-title-medium-font));
  line-height: var(--%NS%mat-card-subtitle-text-line-height, var(--%NS%mat-sys-title-medium-line-height));
  font-size: var(--%NS%mat-card-subtitle-text-size, var(--%NS%mat-sys-title-medium-size));
  letter-spacing: var(--%NS%mat-card-subtitle-text-tracking, var(--%NS%mat-sys-title-medium-tracking));
  font-weight: var(--%NS%mat-card-subtitle-text-weight, var(--%NS%mat-sys-title-medium-weight));
}

.mat-mdc-card-title,
.mat-mdc-card-subtitle {
  display: block;
  margin: 0;
}
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-title,
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-subtitle {
  padding: 16px 16px 0;
}

.mat-mdc-card-header {
  display: flex;
  padding: 16px 16px 0;
}

.mat-mdc-card-content {
  display: block;
  padding: 0 16px;
}
.mat-mdc-card-content:first-child {
  padding-top: 16px;
}
.mat-mdc-card-content:last-child {
  padding-bottom: 16px;
}

.mat-mdc-card-title-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.mat-mdc-card-avatar {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-bottom: 16px;
  object-fit: cover;
}
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-subtitle,
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-title {
  line-height: normal;
}

.mat-mdc-card-sm-image {
  width: 80px;
  height: 80px;
}

.mat-mdc-card-md-image {
  width: 112px;
  height: 112px;
}

.mat-mdc-card-lg-image {
  width: 152px;
  height: 152px;
}

.mat-mdc-card-xl-image {
  width: 240px;
  height: 240px;
}

.mat-mdc-card-subtitle ~ .mat-mdc-card-title,
.mat-mdc-card-title ~ .mat-mdc-card-subtitle,
.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-title,
.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-subtitle,
.mat-mdc-card-title-group .mat-mdc-card-title,
.mat-mdc-card-title-group .mat-mdc-card-subtitle {
  padding-top: 0;
}

.mat-mdc-card-content > :last-child:not(.mat-mdc-card-footer) {
  margin-bottom: 0;
}

.mat-mdc-card-actions-align-end {
  justify-content: flex-end;
}
`],encapsulation:2})})()}return e})();var b_=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=ee({type:e});static \u0275inj=K({imports:[nt]})}return e})();var v_=(()=>{class e{get vertical(){return this._vertical}set vertical(t){this._vertical=vn(t)}_vertical=!1;get inset(){return this._inset}set inset(t){this._inset=vn(t)}_inset=!1;static \u0275fac=function(r){return new(r||e)};static \u0275cmp=X({type:e,selectors:[["mat-divider"]],hostAttrs:["role","separator",1,"mat-divider"],hostVars:7,hostBindings:function(r,i){r&2&&(je("aria-orientation",i.vertical?"vertical":"horizontal"),$("mat-divider-vertical",i.vertical)("mat-divider-horizontal",!i.vertical)("mat-divider-inset",i.inset))},inputs:{vertical:"vertical",inset:"inset"},decls:0,vars:0,template:function(r,i){},styles:[`.mat-divider {
  display: block;
  margin: 0;
  border-top-style: solid;
  border-top-color: var(--%NS%mat-divider-color, var(--%NS%mat-sys-outline-variant));
  border-top-width: var(--%NS%mat-divider-width, 1px);
}
.mat-divider.mat-divider-vertical {
  border-top: 0;
  border-right-style: solid;
  border-right-color: var(--%NS%mat-divider-color, var(--%NS%mat-sys-outline-variant));
  border-right-width: var(--%NS%mat-divider-width, 1px);
}
.mat-divider.mat-divider-inset {
  margin-left: 80px;
}
[dir=rtl] .mat-divider.mat-divider-inset {
  margin-left: auto;
  margin-right: 80px;
}
`],encapsulation:2})}return e})(),y_=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=ee({type:e});static \u0275inj=K({imports:[nt]})}return e})();var __=(()=>{class e{labelPosition="after";static \u0275fac=function(r){return new(r||e)};static \u0275cmp=(function(){return X({type:e,selectors:[["","mat-internal-form-field",""]],hostAttrs:[1,"mdc-form-field","mat-internal-form-field"],hostVars:2,hostBindings:function(i,o){i&2&&$("mdc-form-field--align-end",o.labelPosition==="before")},inputs:{labelPosition:"labelPosition"},ngContentSelectors:["*"],decls:1,vars:0,template:function(i,o){i&1&&(Qe(),ae(0))},styles:[`.mat-internal-form-field {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
}
.mat-internal-form-field > label, .mat-internal-form-field > .mat-internal-form-field-label {
  margin-left: 0;
  margin-right: auto;
  padding-left: 4px;
  padding-right: 0;
  order: 0;
}
[dir=rtl] .mat-internal-form-field > label, [dir=rtl] .mat-internal-form-field > .mat-internal-form-field-label {
  margin-left: auto;
  margin-right: 0;
  padding-left: 0;
  padding-right: 4px;
}

.mdc-form-field--align-end > label, .mdc-form-field--align-end > .mat-internal-form-field-label {
  margin-left: auto;
  margin-right: 0;
  padding-left: 0;
  padding-right: 4px;
  order: -1;
}
[dir=rtl] .mdc-form-field--align-end .mdc-form-field--align-end label, [dir=rtl] .mdc-form-field--align-end .mdc-form-field--align-end .mat-internal-form-field-label {
  margin-left: 0;
  margin-right: auto;
  padding-left: 4px;
  padding-right: 0;
}
`],encapsulation:2})})()}return e})();var iM=new y("mat-slide-toggle-default-options",{providedIn:"root",factory:()=>({disableToggleValue:!1,hideIcon:!1,disabledInteractive:!1})}),Jl=class{source;checked;constructor(n,t){this.source=n,this.checked=t}},gm=(()=>{class e{_elementRef=f(Z);_focusMonitor=f(Go);_changeDetectorRef=f(Wt);defaults=f(iM);_injector=f(Q);_signalFormField=null;_onChange=t=>{};_onTouched=()=>{};_validatorOnChange=()=>{};_uniqueId;_checked=!1;_createChangeEvent(t){return new Jl(this,t)}_labelId;get buttonId(){return`${this.id||this._uniqueId}-button`}_switchElement;focus(){this._switchElement.nativeElement.focus()}_noopAnimations=Zt();_focused=!1;name=null;id;labelPosition="after";ariaLabel=null;ariaLabelledby=null;ariaDescribedby;required=!1;color;disabled=!1;fullWidth=!1;disableRipple=!1;tabIndex=0;get checked(){return this._checked}set checked(t){this._checked=t,this._changeDetectorRef.markForCheck()}hideIcon;disabledInteractive;change=new ge;toggleChange=new ge;get inputId(){return`${this.id||this._uniqueId}-input`}constructor(){f(Dt).load(Ql);let t=f(new _i("tabindex"),{optional:!0}),r=this.defaults;this.tabIndex=t==null?0:parseInt(t)||0,this.color=r.color||"accent",this.id=this._uniqueId=f(Et).getId("mat-mdc-slide-toggle-"),this.hideIcon=r.hideIcon??!1,this.disabledInteractive=r.disabledInteractive??!1,this._labelId=this._uniqueId+"-label"}ngOnInit(){this._signalFormField=this._injector.get(Ll,void 0,{optional:!0,self:!0})}ngAfterContentInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(t=>{t==="keyboard"||t==="program"?(this._focused=!0,this._changeDetectorRef.markForCheck()):t||Promise.resolve().then(()=>{this._focused=!1,this._onTouched(),this._changeDetectorRef.markForCheck()})})}ngOnChanges(t){t.required&&this._validatorOnChange()}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}writeValue(t){this.checked=!!t}registerOnChange(t){this._onChange=t}registerOnTouched(t){this._onTouched=t}validate(t){return this.required&&t.value!==!0&&!this._signalFormField?{required:!0}:null}registerOnValidatorChange(t){this._validatorOnChange=t}setDisabledState(t){this.disabled=t,this._changeDetectorRef.markForCheck()}toggle(){this.checked=!this.checked,this._onChange(this.checked)}_emitChangeEvent(){this._onChange(this.checked),this.change.emit(this._createChangeEvent(this.checked))}_handleClick(){this.disabled||(this.toggleChange.emit(),this.defaults.disableToggleValue||(this.checked=!this.checked,this._onChange(this.checked),this.change.emit(new Jl(this,this.checked))))}_getAriaLabelledBy(){return this.ariaLabelledby?this.ariaLabelledby:this.ariaLabel?null:this._labelId}static \u0275fac=function(r){return new(r||e)};static \u0275cmp=(function(){let t=["switch"],r=["*"];function i(o,a){o&1&&(g(0,"span",11),cs(),g(1,"svg",13),Be(2,"path",14),b(),g(3,"svg",15),Be(4,"path",16),b()())}return X({type:e,selectors:[["mat-slide-toggle"]],viewQuery:function(a,s){if(a&1&&Gt(t,5),a&2){let l;Ae(l=ke())&&(s._switchElement=l.first)}},hostAttrs:[1,"mat-mdc-slide-toggle"],hostVars:15,hostBindings:function(a,s){a&2&&(Pn("id",s.id),je("tabindex",null)("aria-label",null)("name",null)("aria-labelledby",null),Tr(s.color?"mat-"+s.color:""),$("mat-mdc-slide-toggle-focused",s._focused)("mat-mdc-slide-toggle-checked",s.checked)("mat-slide-toggle-full-width",s.fullWidth)("_mat-animation-noopable",s._noopAnimations))},inputs:{name:"name",id:"id",labelPosition:"labelPosition",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],required:[2,"required","required",xe],color:"color",disabled:[2,"disabled","disabled",xe],fullWidth:[2,"fullWidth","fullWidth",xe],disableRipple:[2,"disableRipple","disableRipple",xe],tabIndex:[2,"tabIndex","tabIndex",o=>o==null?0:rl(o)],checked:[2,"checked","checked",xe],hideIcon:[2,"hideIcon","hideIcon",xe],disabledInteractive:[2,"disabledInteractive","disabledInteractive",xe]},outputs:{change:"change",toggleChange:"toggleChange"},exportAs:["matSlideToggle"],features:[Ne([{provide:Yt,useExisting:Le(()=>e),multi:!0},{provide:Mi,useExisting:e,multi:!0}]),dt],ngContentSelectors:r,decls:14,vars:27,consts:[["switch",""],["mat-internal-form-field","",3,"labelPosition"],["role","switch","type","button",1,"mdc-switch",3,"click","tabIndex","disabled"],[1,"mat-mdc-slide-toggle-touch-target"],[1,"mdc-switch__track"],[1,"mdc-switch__handle-track"],[1,"mdc-switch__handle"],[1,"mdc-switch__shadow"],[1,"mdc-elevation-overlay"],[1,"mdc-switch__ripple"],["mat-ripple","",1,"mat-mdc-slide-toggle-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mdc-switch__icons"],[1,"mdc-label",3,"click","for"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--on"],["d","M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--off"],["d","M20 13H4v-2h16v2z"]],template:function(a,s){if(a&1&&(Qe(),g(0,"div",1)(1,"button",2,0),me("click",function(){return s._handleClick()}),Be(3,"div",3)(4,"span",4),g(5,"span",5)(6,"span",6)(7,"span",7),Be(8,"span",8),b(),g(9,"span",9),Be(10,"span",10),b(),_e(11,i,5,0,"span",11),b()()(),g(12,"label",12),me("click",function(c){return c.stopPropagation()}),ae(13),b()()),a&2){let l=yi(2);T("labelPosition",s.labelPosition),_(),$("mdc-switch--selected",s.checked)("mdc-switch--unselected",!s.checked)("mdc-switch--checked",s.checked)("mdc-switch--disabled",s.disabled)("mat-mdc-slide-toggle-disabled-interactive",s.disabledInteractive),T("tabIndex",s.disabled&&!s.disabledInteractive?-1:s.tabIndex)("disabled",s.disabled&&!s.disabledInteractive),je("id",s.buttonId)("name",s.name)("aria-label",s.ariaLabel)("aria-labelledby",s._getAriaLabelledBy())("aria-describedby",s.ariaDescribedby)("aria-required",s.required||null)("aria-checked",s.checked)("aria-disabled",s.disabled&&s.disabledInteractive?"true":null),_(9),T("matRippleTrigger",l)("matRippleDisabled",s.disableRipple||s.disabled)("matRippleCentered",!0),_(),we(s.hideIcon?-1:11),_(),T("for",s.buttonId),je("id",s._labelId)}},dependencies:[l_,__],styles:[`.mdc-switch {
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  margin: 0;
  outline: none;
  overflow: visible;
  padding: 0;
  position: relative;
  width: var(--%NS%mat-slide-toggle-track-width, 52px);
}
.mdc-switch.mdc-switch--disabled {
  cursor: default;
  pointer-events: none;
}
.mdc-switch.mat-mdc-slide-toggle-disabled-interactive {
  pointer-events: auto;
}

.mdc-switch__track {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: var(--%NS%mat-slide-toggle-track-height, 32px);
  border-radius: var(--%NS%mat-slide-toggle-track-shape, var(--%NS%mat-sys-corner-full));
}
.mdc-switch--disabled.mdc-switch .mdc-switch__track {
  opacity: var(--%NS%mat-slide-toggle-disabled-track-opacity, 0.12);
}
.mdc-switch__track::before, .mdc-switch__track::after {
  border: 1px solid transparent;
  border-radius: inherit;
  box-sizing: border-box;
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  width: 100%;
  border-width: var(--%NS%mat-slide-toggle-track-outline-width, 2px);
  border-color: var(--%NS%mat-slide-toggle-track-outline-color, var(--%NS%mat-sys-outline));
}
.mdc-switch--selected .mdc-switch__track::before, .mdc-switch--selected .mdc-switch__track::after {
  border-width: var(--%NS%mat-slide-toggle-selected-track-outline-width, 2px);
  border-color: var(--%NS%mat-slide-toggle-selected-track-outline-color, transparent);
}
.mdc-switch--disabled .mdc-switch__track::before, .mdc-switch--disabled .mdc-switch__track::after {
  border-width: var(--%NS%mat-slide-toggle-disabled-unselected-track-outline-width, 2px);
  border-color: var(--%NS%mat-slide-toggle-disabled-unselected-track-outline-color, var(--%NS%mat-sys-on-surface));
}
@media (forced-colors: active) {
  .mdc-switch__track {
    border-color: currentColor;
  }
}
.mdc-switch__track::before {
  transition: transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);
  transform: translateX(0);
  background: var(--%NS%mat-slide-toggle-unselected-track-color, var(--%NS%mat-sys-surface-variant));
}
.mdc-switch--selected .mdc-switch__track::before {
  transition: transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  transform: translateX(100%);
}
[dir=rtl] .mdc-switch--selected .mdc-switch--selected .mdc-switch__track::before {
  transform: translateX(-100%);
}
.mdc-switch--selected .mdc-switch__track::before {
  opacity: var(--%NS%mat-slide-toggle-hidden-track-opacity, 0);
  transition: var(--%NS%mat-slide-toggle-hidden-track-transition, opacity 75ms);
}
.mdc-switch--unselected .mdc-switch__track::before {
  opacity: var(--%NS%mat-slide-toggle-visible-track-opacity, 1);
  transition: var(--%NS%mat-slide-toggle-visible-track-transition, opacity 75ms);
}
.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before {
  background: var(--%NS%mat-slide-toggle-unselected-hover-track-color, var(--%NS%mat-sys-surface-variant));
}
.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before {
  background: var(--%NS%mat-slide-toggle-unselected-focus-track-color, var(--%NS%mat-sys-surface-variant));
}
.mdc-switch:enabled:active .mdc-switch__track::before {
  background: var(--%NS%mat-slide-toggle-unselected-pressed-track-color, var(--%NS%mat-sys-surface-variant));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:hover:not(:focus):not(:active) .mdc-switch__track::before, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:focus:not(:active) .mdc-switch__track::before, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:active .mdc-switch__track::before, .mdc-switch.mdc-switch--disabled .mdc-switch__track::before {
  background: var(--%NS%mat-slide-toggle-disabled-unselected-track-color, var(--%NS%mat-sys-surface-variant));
}
.mdc-switch__track::after {
  transform: translateX(-100%);
  background: var(--%NS%mat-slide-toggle-selected-track-color, var(--%NS%mat-sys-primary));
}
[dir=rtl] .mdc-switch__track::after {
  transform: translateX(100%);
}
.mdc-switch--selected .mdc-switch__track::after {
  transform: translateX(0);
}
.mdc-switch--selected .mdc-switch__track::after {
  opacity: var(--%NS%mat-slide-toggle-visible-track-opacity, 1);
  transition: var(--%NS%mat-slide-toggle-visible-track-transition, opacity 75ms);
}
.mdc-switch--unselected .mdc-switch__track::after {
  opacity: var(--%NS%mat-slide-toggle-hidden-track-opacity, 0);
  transition: var(--%NS%mat-slide-toggle-hidden-track-transition, opacity 75ms);
}
.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after {
  background: var(--%NS%mat-slide-toggle-selected-hover-track-color, var(--%NS%mat-sys-primary));
}
.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after {
  background: var(--%NS%mat-slide-toggle-selected-focus-track-color, var(--%NS%mat-sys-primary));
}
.mdc-switch:enabled:active .mdc-switch__track::after {
  background: var(--%NS%mat-slide-toggle-selected-pressed-track-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:hover:not(:focus):not(:active) .mdc-switch__track::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:focus:not(:active) .mdc-switch__track::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:active .mdc-switch__track::after, .mdc-switch.mdc-switch--disabled .mdc-switch__track::after {
  background: var(--%NS%mat-slide-toggle-disabled-selected-track-color, var(--%NS%mat-sys-on-surface));
}

.mdc-switch__handle-track {
  height: 100%;
  pointer-events: none;
  position: absolute;
  top: 0;
  transition: transform 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  left: 0;
  right: auto;
  transform: translateX(0);
  width: calc(100% - var(--%NS%mat-slide-toggle-handle-width));
}
[dir=rtl] .mdc-switch__handle-track {
  left: auto;
  right: 0;
}
.mdc-switch--selected .mdc-switch__handle-track {
  transform: translateX(100%);
}
[dir=rtl] .mdc-switch--selected .mdc-switch__handle-track {
  transform: translateX(-100%);
}

.mdc-switch__handle {
  display: flex;
  pointer-events: auto;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: auto;
  transition: width 75ms cubic-bezier(0.4, 0, 0.2, 1), height 75ms cubic-bezier(0.4, 0, 0.2, 1), margin 75ms cubic-bezier(0.4, 0, 0.2, 1);
  width: var(--%NS%mat-slide-toggle-handle-width);
  height: var(--%NS%mat-slide-toggle-handle-height);
  border-radius: var(--%NS%mat-slide-toggle-handle-shape, var(--%NS%mat-sys-corner-full));
}
[dir=rtl] .mdc-switch__handle {
  left: auto;
  right: 0;
}
.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle {
  width: var(--%NS%mat-slide-toggle-unselected-handle-size, 16px);
  height: var(--%NS%mat-slide-toggle-unselected-handle-size, 16px);
  margin: var(--%NS%mat-slide-toggle-unselected-handle-horizontal-margin, 0 8px);
}
.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle:has(.mdc-switch__icons) {
  margin: var(--%NS%mat-slide-toggle-unselected-with-icon-handle-horizontal-margin, 0 4px);
}
.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle {
  width: var(--%NS%mat-slide-toggle-selected-handle-size, 24px);
  height: var(--%NS%mat-slide-toggle-selected-handle-size, 24px);
  margin: var(--%NS%mat-slide-toggle-selected-handle-horizontal-margin, 0 24px);
}
.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle:has(.mdc-switch__icons) {
  margin: var(--%NS%mat-slide-toggle-selected-with-icon-handle-horizontal-margin, 0 24px);
}
.mat-mdc-slide-toggle .mdc-switch__handle:has(.mdc-switch__icons) {
  width: var(--%NS%mat-slide-toggle-with-icon-handle-size, 24px);
  height: var(--%NS%mat-slide-toggle-with-icon-handle-size, 24px);
}
.mat-mdc-slide-toggle .mdc-switch:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  width: var(--%NS%mat-slide-toggle-pressed-handle-size, 28px);
  height: var(--%NS%mat-slide-toggle-pressed-handle-size, 28px);
}
.mat-mdc-slide-toggle .mdc-switch--%NS%selected:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  margin: var(--%NS%mat-slide-toggle-selected-pressed-handle-horizontal-margin, 0 22px);
}
.mat-mdc-slide-toggle .mdc-switch--%NS%unselected:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  margin: var(--%NS%mat-slide-toggle-unselected-pressed-handle-horizontal-margin, 0 2px);
}
.mdc-switch--disabled.mdc-switch--selected .mdc-switch__handle::after {
  opacity: var(--%NS%mat-slide-toggle-disabled-selected-handle-opacity, 1);
}
.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__handle::after {
  opacity: var(--%NS%mat-slide-toggle-disabled-unselected-handle-opacity, 0.38);
}
.mdc-switch__handle::before, .mdc-switch__handle::after {
  border: 1px solid transparent;
  border-radius: inherit;
  box-sizing: border-box;
  content: "";
  width: 100%;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transition: background-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1), border-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}
@media (forced-colors: active) {
  .mdc-switch__handle::before, .mdc-switch__handle::after {
    border-color: currentColor;
  }
}
.mdc-switch--%NS%selected:enabled .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-selected-handle-color, var(--%NS%mat-sys-on-primary));
}
.mdc-switch--%NS%selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-selected-hover-handle-color, var(--%NS%mat-sys-primary-container));
}
.mdc-switch--%NS%selected:enabled:focus:not(:active) .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-selected-focus-handle-color, var(--%NS%mat-sys-primary-container));
}
.mdc-switch--%NS%selected:enabled:active .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-selected-pressed-handle-color, var(--%NS%mat-sys-primary-container));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--%NS%selected:hover:not(:focus):not(:active) .mdc-switch__handle::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--%NS%selected:focus:not(:active) .mdc-switch__handle::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--%NS%selected:active .mdc-switch__handle::after, .mdc-switch--selected.mdc-switch--disabled .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-disabled-selected-handle-color, var(--%NS%mat-sys-surface));
}
.mdc-switch--%NS%unselected:enabled .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-unselected-handle-color, var(--%NS%mat-sys-outline));
}
.mdc-switch--%NS%unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-unselected-hover-handle-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-switch--%NS%unselected:enabled:focus:not(:active) .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-unselected-focus-handle-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-switch--%NS%unselected:enabled:active .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-unselected-pressed-handle-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-disabled-unselected-handle-color, var(--%NS%mat-sys-on-surface));
}
.mdc-switch__handle::before {
  background: var(--%NS%mat-slide-toggle-handle-surface-color);
}

.mdc-switch__shadow {
  border-radius: inherit;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
.mdc-switch:enabled .mdc-switch__shadow {
  box-shadow: var(--%NS%mat-slide-toggle-handle-elevation-shadow);
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:hover:not(:focus):not(:active) .mdc-switch__shadow, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:focus:not(:active) .mdc-switch__shadow, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:active .mdc-switch__shadow, .mdc-switch.mdc-switch--disabled .mdc-switch__shadow {
  box-shadow: var(--%NS%mat-slide-toggle-disabled-handle-elevation-shadow);
}

.mdc-switch__ripple {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  width: var(--%NS%mat-slide-toggle-state-layer-size, 40px);
  height: var(--%NS%mat-slide-toggle-state-layer-size, 40px);
}
.mdc-switch__ripple::after {
  content: "";
  opacity: 0;
}
.mdc-switch--disabled .mdc-switch__ripple::after {
  display: none;
}
.mat-mdc-slide-toggle-disabled-interactive .mdc-switch__ripple::after {
  display: block;
}
.mdc-switch:hover .mdc-switch__ripple::after {
  transition: 75ms opacity cubic-bezier(0, 0, 0.2, 1);
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:enabled:focus .mdc-switch__ripple::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:enabled:active .mdc-switch__ripple::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:enabled:hover:not(:focus) .mdc-switch__ripple::after, .mdc-switch--%NS%unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after {
  background: var(--%NS%mat-slide-toggle-unselected-hover-state-layer-color, var(--%NS%mat-sys-on-surface));
  opacity: var(--%NS%mat-slide-toggle-unselected-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mdc-switch--%NS%unselected:enabled:focus .mdc-switch__ripple::after {
  background: var(--%NS%mat-slide-toggle-unselected-focus-state-layer-color, var(--%NS%mat-sys-on-surface));
  opacity: var(--%NS%mat-slide-toggle-unselected-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mdc-switch--%NS%unselected:enabled:active .mdc-switch__ripple::after {
  background: var(--%NS%mat-slide-toggle-unselected-pressed-state-layer-color, var(--%NS%mat-sys-on-surface));
  opacity: var(--%NS%mat-slide-toggle-unselected-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
  transition: opacity 75ms linear;
}
.mdc-switch--%NS%selected:enabled:hover:not(:focus) .mdc-switch__ripple::after {
  background: var(--%NS%mat-slide-toggle-selected-hover-state-layer-color, var(--%NS%mat-sys-primary));
  opacity: var(--%NS%mat-slide-toggle-selected-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mdc-switch--%NS%selected:enabled:focus .mdc-switch__ripple::after {
  background: var(--%NS%mat-slide-toggle-selected-focus-state-layer-color, var(--%NS%mat-sys-primary));
  opacity: var(--%NS%mat-slide-toggle-selected-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mdc-switch--%NS%selected:enabled:active .mdc-switch__ripple::after {
  background: var(--%NS%mat-slide-toggle-selected-pressed-state-layer-color, var(--%NS%mat-sys-primary));
  opacity: var(--%NS%mat-slide-toggle-selected-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
  transition: opacity 75ms linear;
}

.mdc-switch__icons {
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 1;
  transform: translateZ(0);
}
.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__icons {
  opacity: var(--%NS%mat-slide-toggle-disabled-unselected-icon-opacity, 0.38);
}
.mdc-switch--disabled.mdc-switch--selected .mdc-switch__icons {
  opacity: var(--%NS%mat-slide-toggle-disabled-selected-icon-opacity, 0.38);
}

.mdc-switch__icon {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  transition: opacity 30ms 0ms cubic-bezier(0.4, 0, 1, 1);
}
.mdc-switch--unselected .mdc-switch__icon {
  width: var(--%NS%mat-slide-toggle-unselected-icon-size, 16px);
  height: var(--%NS%mat-slide-toggle-unselected-icon-size, 16px);
  fill: var(--%NS%mat-slide-toggle-unselected-icon-color, var(--%NS%mat-sys-surface-variant));
}
.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__icon {
  fill: var(--%NS%mat-slide-toggle-disabled-unselected-icon-color, var(--%NS%mat-sys-surface-variant));
}
.mdc-switch--selected .mdc-switch__icon {
  width: var(--%NS%mat-slide-toggle-selected-icon-size, 16px);
  height: var(--%NS%mat-slide-toggle-selected-icon-size, 16px);
  fill: var(--%NS%mat-slide-toggle-selected-icon-color, var(--%NS%mat-sys-on-primary-container));
}
.mdc-switch--selected.mdc-switch--disabled .mdc-switch__icon {
  fill: var(--%NS%mat-slide-toggle-disabled-selected-icon-color, var(--%NS%mat-sys-on-surface));
}

.mdc-switch--selected .mdc-switch__icon--on,
.mdc-switch--unselected .mdc-switch__icon--off {
  opacity: 1;
  transition: opacity 45ms 30ms cubic-bezier(0, 0, 0.2, 1);
}

.mat-mdc-slide-toggle {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  -webkit-tap-highlight-color: transparent;
  outline: 0;
}
.mat-mdc-slide-toggle .mat-icon {
  min-height: fit-content;
  flex-shrink: 0;
}
.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple,
.mat-mdc-slide-toggle .mdc-switch__ripple::after {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple:not(:empty),
.mat-mdc-slide-toggle .mdc-switch__ripple::after:not(:empty) {
  transform: translateZ(0);
}
.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mat-focus-indicator::before {
  content: "";
}
.mat-mdc-slide-toggle .mat-internal-form-field {
  color: var(--%NS%mat-slide-toggle-label-text-color, var(--%NS%mat-sys-on-surface));
  font-family: var(--%NS%mat-slide-toggle-label-text-font, var(--%NS%mat-sys-body-medium-font));
  line-height: var(--%NS%mat-slide-toggle-label-text-line-height, var(--%NS%mat-sys-body-medium-line-height));
  font-size: var(--%NS%mat-slide-toggle-label-text-size, var(--%NS%mat-sys-body-medium-size));
  letter-spacing: var(--%NS%mat-slide-toggle-label-text-tracking, var(--%NS%mat-sys-body-medium-tracking));
  font-weight: var(--%NS%mat-slide-toggle-label-text-weight, var(--%NS%mat-sys-body-medium-weight));
}
.mat-mdc-slide-toggle .mat-ripple-element {
  opacity: 0.12;
}
.mat-mdc-slide-toggle .mat-focus-indicator::before {
  border-radius: 50%;
}
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle-track,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__icon,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::before,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::after,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::before,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::after {
  transition: none;
}
.mat-mdc-slide-toggle .mdc-switch:enabled + .mdc-label {
  cursor: pointer;
}
.mat-mdc-slide-toggle .mdc-switch--disabled + label {
  color: var(--%NS%mat-slide-toggle-disabled-label-text-color, var(--%NS%mat-sys-on-surface));
}
.mat-mdc-slide-toggle label:empty {
  display: none;
}

.mat-slide-toggle-full-width {
  width: 100%;
}
.mat-slide-toggle-full-width .mat-internal-form-field {
  width: 100%;
  justify-content: space-between;
}
.mat-slide-toggle-full-width .mat-internal-form-field label {
  margin: 0;
  flex-grow: 1;
  text-align: end;
}
.mat-slide-toggle-full-width .mdc-form-field--align-end label {
  text-align: start;
}

.mat-mdc-slide-toggle-touch-target {
  position: absolute;
  top: 50%;
  left: 50%;
  height: var(--%NS%mat-slide-toggle-touch-target-size, 48px);
  width: 100%;
  transform: translate(-50%, -50%);
  display: var(--%NS%mat-slide-toggle-touch-target-display, block);
}
[dir=rtl] .mat-mdc-slide-toggle-touch-target {
  left: auto;
  right: 50%;
  transform: translate(50%, -50%);
}
`],encapsulation:2})})()}return e})(),w_=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=ee({type:e});static \u0275inj=K({imports:[gm,nt]})}return e})();var C_=new y("ngx-mat-period-picker.locale-config");var Ai=class e{defaultConfig;config;constructor(){let n=f(gi,{optional:!0}),t=globalThis.$localize?.locale,r=n||t||"en-US";this.defaultConfig={locale:r,useConfiguredLocale:!0};let i=f(C_,{optional:!0});i?this.config=B(C(C({},this.defaultConfig),i),{locale:i.locale??this.defaultConfig.locale}):this.config=this.defaultConfig}setLocaleConfig(n){this.config=C(C({},this.defaultConfig),n)}getLocaleConfig(){return C({},this.config)}getLocale(){return this.config.locale}shouldUseConfiguredLocale(){return this.config.useConfiguredLocale}getEffectiveLocale(){return this.shouldUseConfiguredLocale()?this.getLocale():void 0}static \u0275fac=function(t){return new(t||e)};static \u0275prov=V({token:e,factory:e.\u0275fac,providedIn:"root"})};var ec=class e{localeService=f(Ai);getShortMonthLabels(){return Array.from({length:12},(n,t)=>new Date(2e3,t,1).toLocaleDateString(this.localeService.getEffectiveLocale(),{month:"short"}))}getShortMonthLabel(n){if(n<1||n>12)throw new Error("Month number must be between 1 and 12");return new Date(2e3,n-1,1).toLocaleDateString(this.localeService.getEffectiveLocale(),{month:"short"})}static \u0275fac=function(t){return new(t||e)};static \u0275prov=V({token:e,factory:e.\u0275fac,providedIn:"root"})};function aM(e,n){if(e&1){let t=vi();g(0,"div",1)(1,"mat-slide-toggle",11),me("change",function(i){pr(t);let o=$e();return hr(o.togglePresent(i.checked))}),D(2),b()()}if(e&2){let t=$e();_(),T("checked",t.presentValue())("disabled",t.disabled()),_(),pn(" ",t.presentLabel()," ")}}function sM(e,n){if(e&1){let t=vi();g(0,"button",12),me("click",function(){let i=pr(t).$implicit,o=$e();return hr(o.selectYear(i))}),D(1),b()}if(e&2){let t=n.$implicit,r=$e();T("matButton",r.presentValue()?"text":r.valueSignal()?.year===t?"outlined":"text")("disabled",r.disabled()||r.presentValue()),_(),pn(" ",t," ")}}function lM(e,n){if(e&1){let t=vi();g(0,"button",12),me("click",function(){let i=pr(t).$index,o=$e();return hr(o.selectMonth(i+1))}),D(1),b()}if(e&2){let t=n.$implicit,r=n.$index,i=$e();T("matButton",i.presentValue()?"text":i.valueSignal()?.month===r+1?"outlined":"text")("disabled",i.valueSignal()?.year==null||i.presentValue()),_(),pn(" ",t," ")}}function cM(e,n){if(e&1){let t=vi();g(0,"button",13),me("click",function(){pr(t);let i=$e();return hr(i.clear())}),D(1),b()}if(e&2){let t=$e();T("disabled",t.disabled()),_(),pn(" ",t.clearLabel()," ")}}function dM(e,n){e&1&&Be(0,"div")}var tc=class e{minYear=G();maxYear=G();disabled=G(!1);baseYear=G();_showPresentToggle=te(!1);showPresentToggle=this._showPresentToggle.asReadonly();_presentLabel=te("Present");presentLabel=this._presentLabel.asReadonly();_okLabel=te("OK");okLabel=this._okLabel.asReadonly();_clearLabel=te("Clear");clearLabel=this._clearLabel.asReadonly();yearsPerPage=12;currentStartYear=2e3;_baseYear=void 0;_presentValue=te(!1);presentValue=this._presentValue.asReadonly();cancelClicked=wi();okClicked=wi();presentValueChange=wi();valueSignal=te(null);originalValue=null;monthLabelService=f(ec);constructor(){this.initializeCurrentStartYear()}initializeCurrentStartYear(){let n=this._baseYear||this.baseYear()||new Date().getFullYear();this.setCurrentStartYearForYear(n)}get months(){return this.monthLabelService.getShortMonthLabels()}get years(){let n=[];for(let t=0;t<this.yearsPerPage;t++)n.push(this.currentStartYear+t);return n}get rangeLabel(){return`${this.currentStartYear} - ${this.currentStartYear+this.yearsPerPage-1}`}canGoPrev(){return this.currentStartYear>(this.minYear()||1900)}canGoNext(){let n=this.maxYear()||2100;return this.currentStartYear+this.yearsPerPage<=n}prevRange(){this.canGoPrev()&&(this.currentStartYear-=this.yearsPerPage)}nextRange(){this.canGoNext()&&(this.currentStartYear+=this.yearsPerPage)}writeValue(n){this.valueSignal.set(n),this.originalValue=n,n?.year?this.setCurrentStartYearForYear(n.year):this.initializeCurrentStartYear()}setCurrentStartYearForYear(n){let r=this.minYear()||1900;for(;r+this.yearsPerPage<=n;)r+=this.yearsPerPage;let i=this.maxYear()||2100;r+this.yearsPerPage<=i&&(this.currentStartYear=r)}onChange=()=>{};onTouched=()=>{};registerOnChange(n){this.onChange=n}registerOnTouched(n){this.onTouched=n}selectYear(n){if(this.presentValue())return;this.valueSignal()?.year===n?this.valueSignal.set(null):(this.valueSignal.set({year:n,month:null}),this.setCurrentStartYearForYear(n)),this.onChange(this.valueSignal()),this.onTouched()}selectMonth(n){if(this.presentValue())return;let t=this.valueSignal();t?.year&&(t.month===n?this.valueSignal.set({year:t.year,month:null}):this.valueSignal.set(B(C({},t),{month:n})),this.onChange(this.valueSignal()),this.onTouched())}getCurrentValue(){return this.valueSignal()}togglePresent(n){this._presentValue.set(n),this.presentValueChange.emit(n),n&&(this.valueSignal.set(null),this.onChange(null),this.onTouched())}setPresentValue(n){this._presentValue.set(n)}setShowPresentToggle(n){this._showPresentToggle.set(n)}setBaseYear(n){this._baseYear=n,this.initializeCurrentStartYear()}setPresentLabel(n){this._presentLabel.set(n)}setOkLabel(n){this._okLabel.set(n)}setClearLabel(n){this._clearLabel.set(n)}hasValidSelection(){let n=this.valueSignal();return!!(n&&n.year)||this.presentValue()}hasValue(){let n=this.valueSignal();return!!(n&&n.year)||this.presentValue()}hasChanges(){let n=this.valueSignal(),t=this.originalValue;return!n&&!t?!1:!n||!t?!0:n.year!==t.year||n.month!==t.month}clear(){this.valueSignal.set(null),this._presentValue.set(!1),this.presentValueChange.emit(!1),this.onChange(null),this.onTouched(),this.cancelClicked.emit()}ok(){let n=this.valueSignal();(n&&n.year||this.presentValue())&&this.okClicked.emit()}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=X({type:e,selectors:[["ngx-mat-year-month-picker-dialog"]],inputs:{minYear:[1,"minYear"],maxYear:[1,"maxYear"],disabled:[1,"disabled"],baseYear:[1,"baseYear"]},outputs:{cancelClicked:"cancelClicked",okClicked:"okClicked",presentValueChange:"presentValueChange"},features:[Ne([{provide:Yt,useExisting:Le(()=>e),multi:!0}])],decls:25,vars:9,consts:[[1,"ymp-card"],[1,"ymp-present-toggle"],[1,"ymp-header"],["matIconButton","",3,"click","disabled"],[1,"ymp-range"],[1,"ymp-years"],[1,"ymp-button",3,"matButton","disabled"],[1,"ymp-months"],[1,"ymp-actions"],["matButton","text",3,"disabled"],["matButton","filled",3,"click","disabled"],[3,"change","checked","disabled"],[1,"ymp-button",3,"click","matButton","disabled"],["matButton","text",3,"click","disabled"]],template:function(t,r){t&1&&(g(0,"mat-card",0),_e(1,aM,3,3,"div",1),g(2,"div",2)(3,"button",3),me("click",function(){return r.prevRange()}),g(4,"mat-icon"),D(5,"chevron_left"),b()(),g(6,"span",4),D(7),b(),g(8,"button",3),me("click",function(){return r.nextRange()}),g(9,"mat-icon"),D(10,"chevron_right"),b()()(),Be(11,"mat-divider"),g(12,"div",5),Ys(13,sM,2,3,"button",6,qs),b(),Be(15,"mat-divider"),g(16,"div",7),Ys(17,lM,2,3,"button",6,qs),b(),Be(19,"mat-divider"),g(20,"div",8),_e(21,cM,2,2,"button",9)(22,dM,1,0,"div"),g(23,"button",10),me("click",function(){return r.ok()}),D(24),b()()()),t&2&&(_(),we(r.showPresentToggle()?1:-1),_(2),T("disabled",!r.canGoPrev()||r.presentValue()),_(3),$("ymp-range-disabled",r.presentValue()),_(),ce(r.rangeLabel),_(),T("disabled",!r.canGoNext()||r.presentValue()),_(5),Zs(r.years),_(4),Zs(r.months),_(4),we(r.hasValue()?21:22),_(2),T("disabled",r.disabled()||!r.hasValidSelection()),_(),pn(" ",r.okLabel()," "))},dependencies:[qt,h_,p_,hm,b_,g_,vl,bl,y_,v_,w_,gm],styles:[".ymp-card[_ngcontent-%COMP%]{padding:16px;max-width:320px;margin:0 auto;background:var( --%NS%mat-year-month-picker-card-background-color, var(--%NS%mat-sys-surface-container-high) );box-shadow:0 2px 8px #0000000a;animation:_ngcontent-%COMP%_slideInOut .2s cubic-bezier(.25,.8,.25,1) forwards}@keyframes _ngcontent-%COMP%_slideInOut{0%{transform:scale(.8);opacity:0}to{transform:scale(1);opacity:1}}.ymp-header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}.ymp-range[_ngcontent-%COMP%]{font-weight:600;font-size:var(--%NS%mat-sys-title-small-size);letter-spacing:1px}.ymp-range-disabled[_ngcontent-%COMP%]{opacity:.5}.ymp-years[_ngcontent-%COMP%], .ymp-months[_ngcontent-%COMP%]{display:grid;gap:4px;margin:8px 0}.ymp-years[_ngcontent-%COMP%], .ymp-months[_ngcontent-%COMP%]{grid-template-columns:repeat(4,1fr)}.mdc-button.ymp-button[_ngcontent-%COMP%]{--%NS%mat-button-outlined-horizontal-padding: 6px;--%NS%mat-button-filled-horizontal-padding: 6px;--%NS%mat-button-text-horizontal-padding: 6px}.ymp-present-toggle[_ngcontent-%COMP%]{padding:8px 0 16px;display:flex;justify-content:center}.ymp-present-toggle[_ngcontent-%COMP%]   .mat-slide-toggle[_ngcontent-%COMP%]{transform:scale(.8);margin:0}.ymp-actions[_ngcontent-%COMP%]{display:flex;justify-content:space-between;padding:8px 0 0;gap:8px}"]})};var nc=class e{localeService=f(Ai);formatYearMonth(n){return!n||!n.year?"":n.month?new Date(n.year,n.month-1,1).toLocaleDateString(this.localeService.getEffectiveLocale(),{year:"numeric",month:"long"}):`${n.year}`}formatYearMonthDisplay(n,t){if(t<1||t>12)throw new Error("Month number must be between 1 and 12");return new Date(n,t-1,1).toLocaleDateString(this.localeService.getEffectiveLocale(),{year:"numeric",month:"long"})}formatYearDisplay(n){return n.toString()}static \u0275fac=function(t){return new(t||e)};static \u0275prov=V({token:e,factory:e.\u0275fac,providedIn:"root"})};var uM=["fieldRef"],ki=class e{fieldRef;label=G("Select Year/Month");placeholder=G("Click to select");minYear=G();maxYear=G();baseYear=G();disabled=G(!1);presentLabel=G("Present");presentValue=G(!1);showPresentToggle=G(!1);presentValueChange=wi();okLabel=G("OK");clearLabel=G("Clear");width=G("200px");fullWidth=G(!0);computedFullWidth=Ge(()=>this.width()==="200px"?this.fullWidth():!1);valueSignal=te(null);overlayRef=null;overlay=f(lm);displayFormatService=f(nc);getDisplayValue(n){return this.presentValue()?this.presentLabel():this.displayFormatService.formatYearMonth(n)}openPicker(n){if(this.disabled())return;this.closePicker();let t=n.currentTarget;if(!t)return;let i=t.querySelector(".mat-mdc-text-field-wrapper")||t,o=this.overlay.position().flexibleConnectedTo(i).withPositions([{originX:"start",originY:"bottom",overlayX:"start",overlayY:"top",offsetY:8},{originX:"start",originY:"top",overlayX:"start",overlayY:"bottom",offsetY:-8}]);this.overlayRef=this.overlay.create({positionStrategy:o,scrollStrategy:this.overlay.scrollStrategies.reposition(),hasBackdrop:!0,backdropClass:"cdk-overlay-transparent-backdrop"});let a=new Ko(tc),s=this.overlayRef.attach(a);s.instance.writeValue(this.valueSignal()),s.instance.setPresentLabel(this.presentLabel()),s.instance.setPresentValue(this.presentValue()),s.instance.setShowPresentToggle(this.showPresentToggle()),s.instance.setOkLabel(this.okLabel()),s.instance.setClearLabel(this.clearLabel()),this.baseYear()!==void 0&&s.instance.setBaseYear(this.baseYear()),s.instance.registerOnChange(l=>{let c=this.valueSignal();JSON.stringify(c)!==JSON.stringify(l)&&(this.valueSignal.set(l),this.onChange(l),this.onTouched())}),s.instance.presentValueChange.subscribe(l=>{this.presentValueChange.emit(l),this.onTouched(),l&&(this.valueSignal.set(null),this.onChange(null))}),s.instance.cancelClicked.subscribe(()=>{this.closePicker()}),s.instance.okClicked.subscribe(()=>{let l=s.instance.getCurrentValue();if(l&&l.year){let c=this.valueSignal();JSON.stringify(c)!==JSON.stringify(l)&&(this.valueSignal.set(l),this.onChange(l),this.onTouched())}this.closePicker()}),this.overlayRef.backdropClick().subscribe(()=>{this.closePicker()}),this.overlayRef.keydownEvents().subscribe(l=>{l.key==="Escape"&&this.closePicker()})}closePicker(){this.overlayRef&&(this.overlayRef.dispose(),this.overlayRef=null)}writeValue(n){this.valueSignal.set(n)}onChange=()=>{};onTouched=()=>{};registerOnChange(n){this.onChange=n}registerOnTouched(n){this.onTouched=n}setDisabledState(n){}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=X({type:e,selectors:[["ngx-mat-year-month-picker"]],viewQuery:function(t,r){if(t&1&&Gt(uM,7),t&2){let i;Ae(i=ke())&&(r.fieldRef=i.first)}},inputs:{label:[1,"label"],placeholder:[1,"placeholder"],minYear:[1,"minYear"],maxYear:[1,"maxYear"],baseYear:[1,"baseYear"],disabled:[1,"disabled"],presentLabel:[1,"presentLabel"],presentValue:[1,"presentValue"],showPresentToggle:[1,"showPresentToggle"],okLabel:[1,"okLabel"],clearLabel:[1,"clearLabel"],width:[1,"width"],fullWidth:[1,"fullWidth"]},outputs:{presentValueChange:"presentValueChange"},features:[Ne([{provide:Yt,useExisting:Le(()=>e),multi:!0}])],decls:7,vars:7,consts:[["fieldRef",""],["appearance","outline",1,"year-month-field",3,"click"],["matInput","","readonly","",3,"value","placeholder"],["matSuffix","","aria-hidden","true",1,"calendar-icon"]],template:function(t,r){t&1&&(g(0,"mat-form-field",1,0),me("click",function(o){return r.openPicker(o)}),g(2,"mat-label"),D(3),b(),Be(4,"input",2),g(5,"mat-icon",3),D(6,"calendar_today"),b()()),t&2&&(Nr("width",r.computedFullWidth()?"100%":typeof r.width()=="number"?r.width()+"px":r.width()),$("full-width",r.computedFullWidth()),_(3),ce(r.label()),_(),T("value",r.getDisplayValue(r.valueSignal()))("placeholder",r.placeholder()))},dependencies:[qt,Yo,jl,qo,Qf,Py,Fy,vl,bl],styles:[".year-month-field[_ngcontent-%COMP%]{min-width:200px}.year-month-field.full-width[_ngcontent-%COMP%]{width:100%!important;min-width:unset}.calendar-icon[_ngcontent-%COMP%]{pointer-events:none}"]})};var rc=class e{startLabel=G("Start Period");endLabel=G("End Period");presentLabel=G("Present");startPlaceholder=G("Select start period");endPlaceholder=G("Select end period");presentPlaceholder=G("Present");okLabel=G("OK");clearLabel=G("Clear");baseYearStart=G();baseYearEnd=G();showPresentToggle=G(!0);width=G("auto");fullWidth=G(!0);fieldWidth=G("200px");fieldFullWidth=G(!0);computedFullWidth=Ge(()=>this.width()==="auto"?this.fullWidth():!1);form;valueSignal=te(null);constructor(){this.form=new Hn({start:new de(null),end:new de(null),present:new de(!1)}),this.form.valueChanges.subscribe(()=>{let n=this.form.value,t={start:n.start,end:n.present?null:n.end,isPresent:n.present},r=this.valueSignal();JSON.stringify(r)!==JSON.stringify(t)&&(this.valueSignal.set(t),this.onChange(t),this.onTouched())}),this.form.get("present").valueChanges.subscribe(n=>{let t=this.form.get("end");n?(t?.disable({emitEvent:!1}),t?.setValue(null,{emitEvent:!1})):t?.enable({emitEvent:!1})})}writeValue(n){n?this.form.patchValue({start:n.start,end:n.isPresent?null:n.end,present:n.isPresent},{emitEvent:!1}):this.form.reset({start:null,end:null,present:!1},{emitEvent:!1})}onChange=()=>{};onTouched=()=>{};registerOnChange(n){this.onChange=n}registerOnTouched(n){this.onTouched=n}setDisabledState(n){n?this.form.disable({emitEvent:!1}):this.form.enable({emitEvent:!1})}onPresentValueChange(n){this.form.get("present")?.setValue(n,{emitEvent:!1})}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=X({type:e,selectors:[["ngx-mat-period-picker"]],inputs:{startLabel:[1,"startLabel"],endLabel:[1,"endLabel"],presentLabel:[1,"presentLabel"],startPlaceholder:[1,"startPlaceholder"],endPlaceholder:[1,"endPlaceholder"],presentPlaceholder:[1,"presentPlaceholder"],okLabel:[1,"okLabel"],clearLabel:[1,"clearLabel"],baseYearStart:[1,"baseYearStart"],baseYearEnd:[1,"baseYearEnd"],showPresentToggle:[1,"showPresentToggle"],width:[1,"width"],fullWidth:[1,"fullWidth"],fieldWidth:[1,"fieldWidth"],fieldFullWidth:[1,"fieldFullWidth"]},features:[Ne([{provide:Yt,useExisting:Le(()=>e),multi:!0}])],decls:4,vars:25,consts:[[1,"period-picker-container",3,"formGroup"],[1,"period-fields"],["formControlName","start",3,"label","placeholder","presentLabel","presentValue","showPresentToggle","baseYear","width","fullWidth","okLabel","clearLabel"],["formControlName","end",3,"presentValueChange","label","placeholder","presentLabel","presentValue","baseYear","showPresentToggle","width","fullWidth","okLabel","clearLabel"]],template:function(t,r){t&1&&(g(0,"div",0)(1,"div",1)(2,"ngx-mat-year-month-picker",2),ve(),b(),g(3,"ngx-mat-year-month-picker",3),ve(),me("presentValueChange",function(o){return r.onPresentValueChange(o)}),b()()()),t&2&&(Nr("width",r.computedFullWidth()?"100%":typeof r.width()=="number"?r.width()+"px":r.width()),$("full-width",r.computedFullWidth()),T("formGroup",r.form),_(2),T("label",r.startLabel())("placeholder",r.startPlaceholder())("presentLabel",r.presentLabel())("presentValue",!1)("showPresentToggle",!1)("baseYear",r.baseYearStart())("width",r.fieldWidth())("fullWidth",r.fieldFullWidth())("okLabel",r.okLabel())("clearLabel",r.clearLabel()),ye(),_(),T("label",r.endLabel())("placeholder",r.form.get("present")?.value?r.presentPlaceholder():r.endPlaceholder())("presentLabel",r.presentLabel())("presentValue",r.form.get("present")?.value)("baseYear",r.baseYearEnd())("showPresentToggle",r.showPresentToggle())("width",r.fieldWidth())("fullWidth",r.fieldFullWidth())("okLabel",r.okLabel())("clearLabel",r.clearLabel()),ye())},dependencies:[qt,ry,Rl,Ol,Fl,Rr,Bo,ki],styles:[".period-picker-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:1rem}.period-picker-container.full-width[_ngcontent-%COMP%]{width:100%!important}.period-fields[_ngcontent-%COMP%]{display:flex;gap:1rem;flex-wrap:wrap}.period-fields[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{flex:1;min-width:100px}@media(max-width:768px){.period-fields[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{flex:1 1 100%}}"]})};var ic=class e{form=new Hn({yearMonth:new de(null),yearMonthField:new de(null),period:new de(null),customPeriod:new de(null),educationPeriod:new de(null),germanPeriod:new de(null),spanishPeriod:new de(null),completePeriod:new de({start:{year:2020,month:3},end:{year:2023,month:12},isPresent:!1}),currentPeriod:new de({start:{year:2022,month:6},end:null,isPresent:!0}),yearOnlyPeriod:new de({start:{year:2018,month:null},end:{year:2022,month:null},isPresent:!1}),mixedPeriod:new de({start:{year:2021,month:9},end:{year:2024,month:null},isPresent:!1}),baseYear2010:new de(null),baseYear2035:new de(null),differentBaseYears:new de(null),singleBaseYear1995:new de(null),frenchField:new de(null),customWidthField:new de(null),fullWidthField:new de(null),fixedWidthFlex:new de(null),fullWidthEqual:new de(null),fixedWidthOverride:new de(null)});static \u0275fac=function(t){return new(t||e)};static \u0275cmp=X({type:e,selectors:[["app-root"]],decls:143,vars:93,consts:[[1,"locale-info"],[3,"formGroup"],["formControlName","yearMonth",3,"width"],["formControlName","yearMonthField",3,"width"],["formControlName","period",3,"width"],["formControlName","customPeriod","startLabel","Employment Start","endLabel","Employment End","presentLabel","Currently Employed","startPlaceholder","When did you start?","endPlaceholder","When did you end?","presentPlaceholder","Still working here",3,"showPresentToggle","width"],["formControlName","educationPeriod","startLabel","Study Start Date","endLabel","Graduation Date","presentLabel","Currently Studying","startPlaceholder","Select start date","endPlaceholder","Select graduation date","presentPlaceholder","Still studying",3,"showPresentToggle","width"],["formControlName","germanPeriod","startLabel","Startdatum","endLabel","Enddatum","presentLabel","Gegenw\xE4rtig","startPlaceholder","Wann haben Sie angefangen?","endPlaceholder","Wann haben Sie aufgeh\xF6rt?","presentPlaceholder","Arbeiten Sie noch hier?",3,"okLabel","clearLabel","showPresentToggle","width"],["formControlName","spanishPeriod","startLabel","Fecha de Inicio","endLabel","Fecha de Fin","presentLabel","Actualmente","startPlaceholder","\xBFCu\xE1ndo comenz\xF3?","endPlaceholder","\xBFCu\xE1ndo termin\xF3?","presentPlaceholder","\xBFTodav\xEDa trabaja aqu\xED?",3,"okLabel","clearLabel","showPresentToggle","width"],["formControlName","completePeriod","startLabel","Start Date","endLabel","End Date","presentLabel","Present",3,"width"],["formControlName","currentPeriod","startLabel","Start Date","endLabel","End Date","presentLabel","Present",3,"width"],["formControlName","yearOnlyPeriod","startLabel","Start Year","endLabel","End Year","presentLabel","Present",3,"width"],["formControlName","mixedPeriod","startLabel","Start Date","endLabel","End Year","presentLabel","Present",3,"width"],["formControlName","baseYear2010","startLabel","Start Date","endLabel","End Date","presentLabel","Present",3,"baseYearStart","baseYearEnd","width"],["formControlName","baseYear2035","startLabel","Start Date","endLabel","End Date","presentLabel","Present",3,"baseYearStart","baseYearEnd","width"],["formControlName","differentBaseYears","startLabel","Birth Year","endLabel","Retirement Year","presentLabel","Still Working",3,"baseYearStart","baseYearEnd","width"],["formControlName","singleBaseYear1995","label","Historical Date","placeholder","Select historical year/month",3,"baseYear","width"],["formControlName","frenchField","label","Date Historique","placeholder","S\xE9lectionnez l'ann\xE9e/mois",3,"okLabel","clearLabel","width"],["formControlName","customWidthField","label","Custom Width","placeholder","300px width",3,"width"],["formControlName","fullWidthField","label","Full Width","placeholder","Takes full container width",3,"fullWidth"],["formControlName","fullWidthEqual","startLabel","Start Date","endLabel","End Date"]],template:function(t,r){t&1&&(g(0,"h1"),D(1,"ngx-mat-period-picker Demo"),b(),g(2,"div",0)(3,"p")(4,"strong"),D(5,"Current Locale:"),b(),D(6," Using Angular's configured locale"),b(),g(7,"p")(8,"em"),D(9,"The library automatically uses Angular's LOCALE_ID or $localize.locale. Month names and date formatting will be displayed in the configured language."),b()()(),g(10,"form",1)(11,"h2"),D(12,"Year/Month Picker (Original)"),b(),g(13,"ngx-mat-year-month-picker",2),ve(),b(),g(14,"pre"),D(15),Re(16,"json"),b(),g(17,"h2"),D(18,"Year/Month Field (New Text Field)"),b(),g(19,"ngx-mat-year-month-picker",3),ve(),b(),g(20,"pre"),D(21),Re(22,"json"),b(),g(23,"h2"),D(24,"Period Picker (Default Labels)"),b(),g(25,"ngx-mat-period-picker",4),ve(),b(),g(26,"pre"),D(27),Re(28,"json"),b(),g(29,"h2"),D(30,"Period Picker (Employment Example)"),b(),g(31,"ngx-mat-period-picker",5),ve(),b(),g(32,"pre"),D(33),Re(34,"json"),b(),g(35,"h2"),D(36,"Period Picker (Education Example)"),b(),g(37,"ngx-mat-period-picker",6),ve(),b(),g(38,"pre"),D(39),Re(40,"json"),b(),g(41,"h2"),D(42,"Period Picker with Translated Buttons (German)"),b(),g(43,"ngx-mat-period-picker",7),ve(),b(),g(44,"pre"),D(45),Re(46,"json"),b(),g(47,"h2"),D(48,"Period Picker with Translated Buttons (Spanish)"),b(),g(49,"ngx-mat-period-picker",8),ve(),b(),g(50,"pre"),D(51),Re(52,"json"),b(),g(53,"h2"),D(54,"Pre-filled Examples"),b(),g(55,"h3"),D(56,"Complete Period (Start + End)"),b(),g(57,"ngx-mat-period-picker",9),ve(),b(),g(58,"pre"),D(59),Re(60,"json"),b(),g(61,"h3"),D(62,"Current Period (Start + Present)"),b(),g(63,"ngx-mat-period-picker",10),ve(),b(),g(64,"pre"),D(65),Re(66,"json"),b(),g(67,"h3"),D(68,"Year Only Period (Start Year + End Year)"),b(),g(69,"ngx-mat-period-picker",11),ve(),b(),g(70,"pre"),D(71),Re(72,"json"),b(),g(73,"h3"),D(74,"Mixed Period (Start Year/Month + End Year Only)"),b(),g(75,"ngx-mat-period-picker",12),ve(),b(),g(76,"pre"),D(77),Re(78,"json"),b(),g(79,"h2"),D(80,"Base Year Configuration Examples"),b(),g(81,"h3"),D(82,"Period Picker with Base Year 2010"),b(),g(83,"ngx-mat-period-picker",13),ve(),b(),g(84,"pre"),D(85),Re(86,"json"),b(),g(87,"p")(88,"small"),D(89,"When you click on empty fields above, the year picker will show an interval containing 2010."),b()(),g(90,"h3"),D(91,"Period Picker with Base Year 2035"),b(),g(92,"ngx-mat-period-picker",14),ve(),b(),g(93,"pre"),D(94),Re(95,"json"),b(),g(96,"p")(97,"small"),D(98,"When you click on empty fields above, the year picker will show an interval containing 2035."),b()(),g(99,"h3"),D(100,"Period Picker with Different Base Years"),b(),g(101,"ngx-mat-period-picker",15),ve(),b(),g(102,"pre"),D(103),Re(104,"json"),b(),g(105,"p")(106,"small"),D(107,"Start field shows 1984-1995 interval (for birth years), End field shows 2068-2079 interval (for retirement years)."),b()(),g(108,"h3"),D(109,"Single Year/Month Field with Base Year 1995"),b(),g(110,"ngx-mat-year-month-picker",16),ve(),b(),g(111,"pre"),D(112),Re(113,"json"),b(),g(114,"p")(115,"small"),D(116,"When you click above, the year picker will show an interval containing 1995."),b()(),g(117,"h3"),D(118,"Single Year/Month Field with Translated Buttons (French)"),b(),g(119,"ngx-mat-year-month-picker",17),ve(),b(),g(120,"pre"),D(121),Re(122,"json"),b(),g(123,"h2"),D(124,"Width and Layout Configuration Examples"),b(),g(125,"h3"),D(126,"Year/Month Field with Custom Width"),b(),g(127,"ngx-mat-year-month-picker",18),ve(),b(),g(128,"pre"),D(129),Re(130,"json"),b(),g(131,"h3"),D(132,"Year/Month Field with Full Width"),b(),g(133,"ngx-mat-year-month-picker",19),ve(),b(),g(134,"pre"),D(135),Re(136,"json"),b(),g(137,"h3"),D(138,"Period Picker with Full Width and Equal Field Widths (Default)"),b(),g(139,"ngx-mat-period-picker",20),ve(),b(),g(140,"pre"),D(141),Re(142,"json"),b()()),t&2&&(_(10),T("formGroup",r.form),_(3),T("width",250),ye(),_(2),ce(Oe(16,55,r.form.value.yearMonth)),_(4),T("width",250),ye(),_(2),ce(Oe(22,57,r.form.value.yearMonthField)),_(4),T("width",400),ye(),_(2),ce(Oe(28,59,r.form.value.period)),_(4),T("showPresentToggle",!0)("width",400),ye(),_(2),ce(Oe(34,61,r.form.value.customPeriod)),_(4),T("showPresentToggle",!1)("width",400),ye(),_(2),ce(Oe(40,63,r.form.value.educationPeriod)),_(4),T("okLabel","Best\xE4tigen")("clearLabel","L\xF6schen")("showPresentToggle",!0)("width",400),ye(),_(2),ce(Oe(46,65,r.form.value.germanPeriod)),_(4),T("okLabel","Confirmar")("clearLabel","Borrar")("showPresentToggle",!0)("width",400),ye(),_(2),ce(Oe(52,67,r.form.value.spanishPeriod)),_(6),T("width",400),ye(),_(2),ce(Oe(60,69,r.form.value.completePeriod)),_(4),T("width",400),ye(),_(2),ce(Oe(66,71,r.form.value.currentPeriod)),_(4),T("width",400),ye(),_(2),ce(Oe(72,73,r.form.value.yearOnlyPeriod)),_(4),T("width",400),ye(),_(2),ce(Oe(78,75,r.form.value.mixedPeriod)),_(6),T("baseYearStart",2010)("baseYearEnd",2010)("width",400),ye(),_(2),ce(Oe(86,77,r.form.value.baseYear2010)),_(7),T("baseYearStart",2035)("baseYearEnd",2035)("width",400),ye(),_(2),ce(Oe(95,79,r.form.value.baseYear2035)),_(7),T("baseYearStart",1990)("baseYearEnd",2070)("width",400),ye(),_(2),ce(Oe(104,81,r.form.value.differentBaseYears)),_(7),T("baseYear",1995)("width",250),ye(),_(2),ce(Oe(113,83,r.form.value.singleBaseYear1995)),_(7),T("okLabel","Valider")("clearLabel","Effacer")("width",250),ye(),_(2),ce(Oe(122,85,r.form.value.frenchField)),_(6),T("width",300),ye(),_(2),ce(Oe(130,87,r.form.value.customWidthField)),_(4),T("fullWidth",!0),ye(),_(2),ce(Oe(136,89,r.form.value.fullWidthField)),_(4),ye(),_(2),ce(Oe(142,91,r.form.value.fullWidthEqual)))},dependencies:[Fl,ey,Rl,Ol,Rr,Bo,qt,rc,ki,pf],styles:["[_nghost-%COMP%]{display:block;padding:2rem;max-width:720px;margin:0 auto}.locale-info[_ngcontent-%COMP%]{background:#e3f2fd;border:1px solid #2196f3;border-radius:4px;padding:1rem;margin-bottom:2rem}.locale-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:.5rem 0}"]})};Df(ic,B(C({},Rf),{providers:[...Rf.providers]})).catch(e=>console.error(e));

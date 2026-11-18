var d_=Object.defineProperty,u_=Object.defineProperties;var f_=Object.getOwnPropertyDescriptors;var fh=Object.getOwnPropertySymbols;var h_=Object.prototype.hasOwnProperty,m_=Object.prototype.propertyIsEnumerable;var hh=(e,n,t)=>n in e?d_(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,D=(e,n)=>{for(var t in n||={})h_.call(n,t)&&hh(e,t,n[t]);if(fh)for(var t of fh(n))m_.call(n,t)&&hh(e,t,n[t]);return e},H=(e,n)=>u_(e,f_(n));var St=(e,n,t)=>new Promise((r,i)=>{var o=l=>{try{a(t.next(l))}catch(c){i(c)}},s=l=>{try{a(t.throw(l))}catch(c){i(c)}},a=l=>l.done?r(l.value):Promise.resolve(l.value).then(o,s);a((t=t.apply(e,n)).next())});var qe=null,Go=!1,jn=1,p_=null,ke=Symbol("SIGNAL");function x(e){let n=qe;return qe=e,n}function Zo(){return qe}var Bn={version:0,lastCleanEpoch:0,dirty:!1,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:!1,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:"unknown",producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function Hn(e){if(Go)throw new Error("");if(qe===null)return;qe.consumerOnSignalRead(e);let n=qe.producersTail;if(n!==void 0&&n.producer===e)return;let t,r=qe.recomputing;if(r&&(t=n!==void 0?n.nextProducer:qe.producers,t!==void 0&&t.producer===e)){qe.producersTail=t,t.lastReadVersion=e.version,t.knownValidAtEpoch=jn;return}let i=e.consumersTail;if(i!==void 0&&i.consumer===qe&&(!r||i.knownValidAtEpoch===jn))return;let o=Ar(qe),s={producer:e,consumer:qe,nextProducer:t,prevConsumer:void 0,knownValidAtEpoch:jn,lastReadVersion:e.version,nextConsumer:void 0};qe.producersTail=s,n!==void 0?n.nextProducer=s:qe.producers=s,o&&vh(e,s)}function mh(){jn++}function Xo(e){if(!(Ar(e)&&!e.dirty)&&!(!e.dirty&&e.lastCleanEpoch===jn)){if(!e.producerMustRecompute(e)&&!Tr(e)){qo(e);return}e.producerRecomputeValue(e),qo(e)}}function Kl(e){if(e.consumers===void 0)return;let n=Go;Go=!0;try{for(let t=e.consumers;t!==void 0;t=t.nextConsumer){let r=t.consumer;r.dirty||g_(r)}}finally{Go=n}}function Jl(){return qe?.consumerAllowSignalWrites!==!1}function g_(e){e.dirty=!0,Kl(e),e.consumerMarkedDirty?.(e)}function qo(e){e.dirty=!1,e.lastCleanEpoch=jn}function cn(e){return e&&ph(e),x(e)}function ph(e){if(e.producersTail?.knownValidAtEpoch===jn){let n=e.producers;for(;n!==void 0;)n.knownValidAtEpoch=null,n=n.nextProducer}e.producersTail=void 0,e.recomputing=!0}function Un(e,n){x(n),e&&gh(e)}function gh(e){e.recomputing=!1;let n=e.producersTail,t=n!==void 0?n.nextProducer:e.producers;if(t!==void 0){if(Ar(e))do t=ec(t);while(t!==void 0);n!==void 0?n.nextProducer=void 0:e.producers=void 0}}function Tr(e){for(let n=e.producers;n!==void 0;n=n.nextProducer){let t=n.producer,r=n.lastReadVersion;if(r!==t.version||(Xo(t),r!==t.version))return!0}return!1}function dn(e){if(Ar(e)){let n=e.producers;for(;n!==void 0;)n=ec(n)}e.producers=void 0,e.producersTail=void 0,e.consumers=void 0,e.consumersTail=void 0}function vh(e,n){let t=e.consumersTail,r=Ar(e);if(t!==void 0?(n.nextConsumer=t.nextConsumer,t.nextConsumer=n):(n.nextConsumer=void 0,e.consumers=n),n.prevConsumer=t,e.consumersTail=n,!r)for(let i=e.producers;i!==void 0;i=i.nextProducer)vh(i.producer,i)}function ec(e){let n=e.producer,t=e.nextProducer,r=e.nextConsumer,i=e.prevConsumer;if(e.nextConsumer=void 0,e.prevConsumer=void 0,r!==void 0?r.prevConsumer=i:n.consumersTail=i,i!==void 0)i.nextConsumer=r;else if(n.consumers=r,!Ar(n)){let o=n.producers;for(;o!==void 0;)o=ec(o)}return t}function Ar(e){return e.consumerIsAlwaysLive||e.consumers!==void 0}function Qo(e){p_?.(e)}function Ko(e,n){return Object.is(e,n)}function Si(e,n){let t=Object.create(v_);t.computation=e,n!==void 0&&(t.equal=n);let r=()=>{if(Xo(t),Hn(t),t.value===Ii)throw t.error;return t.value};return r[ke]=t,Qo(t),r}var Wo=Symbol("UNSET"),Yo=Symbol("COMPUTING"),Ii=Symbol("ERRORED"),v_=H(D({},Bn),{value:Wo,dirty:!0,error:null,equal:Ko,kind:"computed",producerMustRecompute(e){return e.value===Wo||e.value===Yo},producerRecomputeValue(e){if(e.value===Yo)throw new Error("");let n=e.value;e.value=Yo;let t=cn(e),r,i=!1;try{r=e.computation(),x(null),i=n!==Wo&&n!==Ii&&r!==Ii&&e.equal(n,r)}catch(o){r=Ii,e.error=o}finally{Un(e,t)}if(i){e.value=n;return}e.value=r,e.version++}});function y_(){throw new Error}var yh=y_;function bh(e){yh(e)}function tc(e){yh=e}var b_=null;function nc(e,n){let t=Object.create(Mi);t.value=e,n!==void 0&&(t.equal=n);let r=()=>_h(t);return r[ke]=t,Qo(t),[r,s=>Nr(t,s),s=>rc(t,s)]}function _h(e){return Hn(e),e.value}function Nr(e,n){Jl()||bh(e),e.equal(e.value,n)||(e.value=n,__(e))}function rc(e,n){Jl()||bh(e),Nr(e,n(e.value))}var Mi=H(D({},Bn),{equal:Ko,value:void 0,kind:"signal"});function __(e){e.version++,mh(),Kl(e),b_?.(e)}var ic=H(D({},Bn),{consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,dirty:!0,kind:"effect"});function oc(e){if(e.dirty=!1,e.version>0&&!Tr(e))return;e.version++;let n=cn(e);try{e.cleanup(),e.fn()}finally{Un(e,n)}}var sc;function Jo(){return sc}function Mt(e){let n=sc;return sc=e,n}var Dh=Symbol("NotFound");function Rr(e){return e===Dh||e?.name==="\u0275NotFound"}function wh(e){let n=x(null);try{return e()}finally{x(n)}}function L(e){return typeof e=="function"}function es(e){let t=e(r=>{Error.call(r),r.stack=new Error().stack});return t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,t}var ts=es(e=>function(t){e(this),this.message=t?`${t.length} errors occurred during unsubscription:
${t.map((r,i)=>`${i+1}) ${r.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=t});function zn(e,n){if(e){let t=e.indexOf(n);0<=t&&e.splice(t,1)}}var oe=class e{constructor(n){this.initialTeardown=n,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let n;if(!this.closed){this.closed=!0;let{_parentage:t}=this;if(t)if(this._parentage=null,Array.isArray(t))for(let o of t)o.remove(this);else t.remove(this);let{initialTeardown:r}=this;if(L(r))try{r()}catch(o){n=o instanceof ts?o.errors:[o]}let{_finalizers:i}=this;if(i){this._finalizers=null;for(let o of i)try{Eh(o)}catch(s){n=n??[],s instanceof ts?n=[...n,...s.errors]:n.push(s)}}if(n)throw new ts(n)}}add(n){var t;if(n&&n!==this)if(this.closed)Eh(n);else{if(n instanceof e){if(n.closed||n._hasParent(this))return;n._addParent(this)}(this._finalizers=(t=this._finalizers)!==null&&t!==void 0?t:[]).push(n)}}_hasParent(n){let{_parentage:t}=this;return t===n||Array.isArray(t)&&t.includes(n)}_addParent(n){let{_parentage:t}=this;this._parentage=Array.isArray(t)?(t.push(n),t):t?[t,n]:n}_removeParent(n){let{_parentage:t}=this;t===n?this._parentage=null:Array.isArray(t)&&zn(t,n)}remove(n){let{_finalizers:t}=this;t&&zn(t,n),n instanceof e&&n._removeParent(this)}};oe.EMPTY=(()=>{let e=new oe;return e.closed=!0,e})();var ac=oe.EMPTY;function ns(e){return e instanceof oe||e&&"closed"in e&&L(e.remove)&&L(e.add)&&L(e.unsubscribe)}function Eh(e){L(e)?e():e.unsubscribe()}var Dt={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var kr={setTimeout(e,n,...t){let{delegate:r}=kr;return r?.setTimeout?r.setTimeout(e,n,...t):setTimeout(e,n,...t)},clearTimeout(e){let{delegate:n}=kr;return(n?.clearTimeout||clearTimeout)(e)},delegate:void 0};function rs(e){kr.setTimeout(()=>{let{onUnhandledError:n}=Dt;if(n)n(e);else throw e})}function Ti(){}var Ch=lc("C",void 0,void 0);function xh(e){return lc("E",void 0,e)}function Ih(e){return lc("N",e,void 0)}function lc(e,n,t){return{kind:e,value:n,error:t}}var $n=null;function Or(e){if(Dt.useDeprecatedSynchronousErrorHandling){let n=!$n;if(n&&($n={errorThrown:!1,error:null}),e(),n){let{errorThrown:t,error:r}=$n;if($n=null,t)throw r}}else e()}function Sh(e){Dt.useDeprecatedSynchronousErrorHandling&&$n&&($n.errorThrown=!0,$n.error=e)}var Gn=class extends oe{constructor(n){super(),this.isStopped=!1,n?(this.destination=n,ns(n)&&n.add(this)):this.destination=E_}static create(n,t,r){return new $t(n,t,r)}next(n){this.isStopped?dc(Ih(n),this):this._next(n)}error(n){this.isStopped?dc(xh(n),this):(this.isStopped=!0,this._error(n))}complete(){this.isStopped?dc(Ch,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(n){this.destination.next(n)}_error(n){try{this.destination.error(n)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},D_=Function.prototype.bind;function cc(e,n){return D_.call(e,n)}var uc=class{constructor(n){this.partialObserver=n}next(n){let{partialObserver:t}=this;if(t.next)try{t.next(n)}catch(r){is(r)}}error(n){let{partialObserver:t}=this;if(t.error)try{t.error(n)}catch(r){is(r)}else is(n)}complete(){let{partialObserver:n}=this;if(n.complete)try{n.complete()}catch(t){is(t)}}},$t=class extends Gn{constructor(n,t,r){super();let i;if(L(n)||!n)i={next:n??void 0,error:t??void 0,complete:r??void 0};else{let o;this&&Dt.useDeprecatedNextContext?(o=Object.create(n),o.unsubscribe=()=>this.unsubscribe(),i={next:n.next&&cc(n.next,o),error:n.error&&cc(n.error,o),complete:n.complete&&cc(n.complete,o)}):i=n}this.destination=new uc(i)}};function is(e){Dt.useDeprecatedSynchronousErrorHandling?Sh(e):rs(e)}function w_(e){throw e}function dc(e,n){let{onStoppedNotification:t}=Dt;t&&kr.setTimeout(()=>t(e,n))}var E_={closed:!0,next:Ti,error:w_,complete:Ti};var Fr=typeof Symbol=="function"&&Symbol.observable||"@@observable";function un(e){return e}function Mh(e){return e.length===0?un:e.length===1?e[0]:function(t){return e.reduce((r,i)=>i(r),t)}}var q=(()=>{class e{constructor(t){t&&(this._subscribe=t)}lift(t){let r=new e;return r.source=this,r.operator=t,r}subscribe(t,r,i){let o=x_(t)?t:new $t(t,r,i);return Or(()=>{let{operator:s,source:a}=this;o.add(s?s.call(o,a):a?this._subscribe(o):this._trySubscribe(o))}),o}_trySubscribe(t){try{return this._subscribe(t)}catch(r){t.error(r)}}forEach(t,r){return r=Th(r),new r((i,o)=>{let s=new $t({next:a=>{try{t(a)}catch(l){o(l),s.unsubscribe()}},error:o,complete:i});this.subscribe(s)})}_subscribe(t){var r;return(r=this.source)===null||r===void 0?void 0:r.subscribe(t)}[Fr](){return this}pipe(...t){return Mh(t)(this)}toPromise(t){return t=Th(t),new t((r,i)=>{let o;this.subscribe(s=>o=s,s=>i(s),()=>r(o))})}}return e.create=n=>new e(n),e})();function Th(e){var n;return(n=e??Dt.Promise)!==null&&n!==void 0?n:Promise}function C_(e){return e&&L(e.next)&&L(e.error)&&L(e.complete)}function x_(e){return e&&e instanceof Gn||C_(e)&&ns(e)}function I_(e){return L(e?.lift)}function Q(e){return n=>{if(I_(n))return n.lift(function(t){try{return e(t,this)}catch(r){this.error(r)}});throw new TypeError("Unable to lift unknown Observable type")}}function ae(e,n,t,r,i){return new fc(e,n,t,r,i)}var fc=class extends Gn{constructor(n,t,r,i,o,s){super(n),this.onFinalize=o,this.shouldUnsubscribe=s,this._next=t?function(a){try{t(a)}catch(l){n.error(l)}}:super._next,this._error=i?function(a){try{i(a)}catch(l){n.error(l)}finally{this.unsubscribe()}}:super._error,this._complete=r?function(){try{r()}catch(a){n.error(a)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var n;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:t}=this;super.unsubscribe(),!t&&((n=this.onFinalize)===null||n===void 0||n.call(this))}}};var Ah=es(e=>function(){e(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var B=(()=>{class e extends q{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(t){let r=new os(this,this);return r.operator=t,r}_throwIfClosed(){if(this.closed)throw new Ah}next(t){Or(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let r of this.currentObservers)r.next(t)}})}error(t){Or(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=t;let{observers:r}=this;for(;r.length;)r.shift().error(t)}})}complete(){Or(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:t}=this;for(;t.length;)t.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var t;return((t=this.observers)===null||t===void 0?void 0:t.length)>0}_trySubscribe(t){return this._throwIfClosed(),super._trySubscribe(t)}_subscribe(t){return this._throwIfClosed(),this._checkFinalizedStatuses(t),this._innerSubscribe(t)}_innerSubscribe(t){let{hasError:r,isStopped:i,observers:o}=this;return r||i?ac:(this.currentObservers=null,o.push(t),new oe(()=>{this.currentObservers=null,zn(o,t)}))}_checkFinalizedStatuses(t){let{hasError:r,thrownError:i,isStopped:o}=this;r?t.error(i):o&&t.complete()}asObservable(){let t=new q;return t.source=this,t}}return e.create=(n,t)=>new os(n,t),e})(),os=class extends B{constructor(n,t){super(),this.destination=n,this.source=t}next(n){var t,r;(r=(t=this.destination)===null||t===void 0?void 0:t.next)===null||r===void 0||r.call(t,n)}error(n){var t,r;(r=(t=this.destination)===null||t===void 0?void 0:t.error)===null||r===void 0||r.call(t,n)}complete(){var n,t;(t=(n=this.destination)===null||n===void 0?void 0:n.complete)===null||t===void 0||t.call(n)}_subscribe(n){var t,r;return(r=(t=this.source)===null||t===void 0?void 0:t.subscribe(n))!==null&&r!==void 0?r:ac}};var Wn=class extends B{constructor(n){super(),this._value=n}get value(){return this.getValue()}_subscribe(n){let t=super._subscribe(n);return!t.closed&&n.next(this._value),t}getValue(){let{hasError:n,thrownError:t,_value:r}=this;if(n)throw t;return this._throwIfClosed(),r}next(n){super.next(this._value=n)}};var Ai={now(){return(Ai.delegate||Date).now()},delegate:void 0};var ss=class extends B{constructor(n=1/0,t=1/0,r=Ai){super(),this._bufferSize=n,this._windowTime=t,this._timestampProvider=r,this._buffer=[],this._infiniteTimeWindow=!0,this._infiniteTimeWindow=t===1/0,this._bufferSize=Math.max(1,n),this._windowTime=Math.max(1,t)}next(n){let{isStopped:t,_buffer:r,_infiniteTimeWindow:i,_timestampProvider:o,_windowTime:s}=this;t||(r.push(n),!i&&r.push(o.now()+s)),this._trimBuffer(),super.next(n)}_subscribe(n){this._throwIfClosed(),this._trimBuffer();let t=this._innerSubscribe(n),{_infiniteTimeWindow:r,_buffer:i}=this,o=i.slice();for(let s=0;s<o.length&&!n.closed;s+=r?1:2)n.next(o[s]);return this._checkFinalizedStatuses(n),t}_trimBuffer(){let{_bufferSize:n,_timestampProvider:t,_buffer:r,_infiniteTimeWindow:i}=this,o=(i?1:2)*n;if(n<1/0&&o<r.length&&r.splice(0,r.length-o),!i){let s=t.now(),a=0;for(let l=1;l<r.length&&r[l]<=s;l+=2)a=l;a&&r.splice(0,a+1)}}};var as=class extends oe{constructor(n,t){super()}schedule(n,t=0){return this}};var Ni={setInterval(e,n,...t){let{delegate:r}=Ni;return r?.setInterval?r.setInterval(e,n,...t):setInterval(e,n,...t)},clearInterval(e){let{delegate:n}=Ni;return(n?.clearInterval||clearInterval)(e)},delegate:void 0};var ls=class extends as{constructor(n,t){super(n,t),this.scheduler=n,this.work=t,this.pending=!1}schedule(n,t=0){var r;if(this.closed)return this;this.state=n;let i=this.id,o=this.scheduler;return i!=null&&(this.id=this.recycleAsyncId(o,i,t)),this.pending=!0,this.delay=t,this.id=(r=this.id)!==null&&r!==void 0?r:this.requestAsyncId(o,this.id,t),this}requestAsyncId(n,t,r=0){return Ni.setInterval(n.flush.bind(n,this),r)}recycleAsyncId(n,t,r=0){if(r!=null&&this.delay===r&&this.pending===!1)return t;t!=null&&Ni.clearInterval(t)}execute(n,t){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;let r=this._execute(n,t);if(r)return r;this.pending===!1&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(n,t){let r=!1,i;try{this.work(n)}catch(o){r=!0,i=o||new Error("Scheduled action threw falsy error")}if(r)return this.unsubscribe(),i}unsubscribe(){if(!this.closed){let{id:n,scheduler:t}=this,{actions:r}=t;this.work=this.state=this.scheduler=null,this.pending=!1,zn(r,this),n!=null&&(this.id=this.recycleAsyncId(t,n,null)),this.delay=null,super.unsubscribe()}}};var Pr=class e{constructor(n,t=e.now){this.schedulerActionCtor=n,this.now=t}schedule(n,t=0,r){return new this.schedulerActionCtor(this,n).schedule(r,t)}};Pr.now=Ai.now;var cs=class extends Pr{constructor(n,t=Pr.now){super(n,t),this.actions=[],this._active=!1}flush(n){let{actions:t}=this;if(this._active){t.push(n);return}let r;this._active=!0;do if(r=n.execute(n.state,n.delay))break;while(n=t.shift());if(this._active=!1,r){for(;n=t.shift();)n.unsubscribe();throw r}}};var hc=new cs(ls),Nh=hc;var Yn=new q(e=>e.complete());function ds(e){return e&&L(e.schedule)}function mc(e){return e[e.length-1]}function Rh(e){return L(mc(e))?e.pop():void 0}function fn(e){return ds(mc(e))?e.pop():void 0}function kh(e,n){return typeof mc(e)=="number"?e.pop():n}function Fh(e,n,t,r){function i(o){return o instanceof t?o:new t(function(s){s(o)})}return new(t||(t=Promise))(function(o,s){function a(d){try{c(r.next(d))}catch(u){s(u)}}function l(d){try{c(r.throw(d))}catch(u){s(u)}}function c(d){d.done?o(d.value):i(d.value).then(a,l)}c((r=r.apply(e,n||[])).next())})}function Oh(e){var n=typeof Symbol=="function"&&Symbol.iterator,t=n&&e[n],r=0;if(t)return t.call(e);if(e&&typeof e.length=="number")return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(n?"Object is not iterable.":"Symbol.iterator is not defined.")}function qn(e){return this instanceof qn?(this.v=e,this):new qn(e)}function Ph(e,n,t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r=t.apply(e,n||[]),i,o=[];return i=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",s),i[Symbol.asyncIterator]=function(){return this},i;function s(h){return function(p){return Promise.resolve(p).then(h,u)}}function a(h,p){r[h]&&(i[h]=function(_){return new Promise(function(C,F){o.push([h,_,C,F])>1||l(h,_)})},p&&(i[h]=p(i[h])))}function l(h,p){try{c(r[h](p))}catch(_){m(o[0][3],_)}}function c(h){h.value instanceof qn?Promise.resolve(h.value.v).then(d,u):m(o[0][2],h)}function d(h){l("next",h)}function u(h){l("throw",h)}function m(h,p){h(p),o.shift(),o.length&&l(o[0][0],o[0][1])}}function Lh(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n=e[Symbol.asyncIterator],t;return n?n.call(e):(e=typeof Oh=="function"?Oh(e):e[Symbol.iterator](),t={},r("next"),r("throw"),r("return"),t[Symbol.asyncIterator]=function(){return this},t);function r(o){t[o]=e[o]&&function(s){return new Promise(function(a,l){s=e[o](s),i(a,l,s.done,s.value)})}}function i(o,s,a,l){Promise.resolve(l).then(function(c){o({value:c,done:a})},s)}}var us=e=>e&&typeof e.length=="number"&&typeof e!="function";function fs(e){return L(e?.then)}function hs(e){return L(e[Fr])}function ms(e){return Symbol.asyncIterator&&L(e?.[Symbol.asyncIterator])}function ps(e){return new TypeError(`You provided ${e!==null&&typeof e=="object"?"an invalid object":`'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function S_(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var gs=S_();function vs(e){return L(e?.[gs])}function ys(e){return Ph(this,arguments,function*(){let t=e.getReader();try{for(;;){let{value:r,done:i}=yield qn(t.read());if(i)return yield qn(void 0);yield yield qn(r)}}finally{t.releaseLock()}})}function bs(e){return L(e?.getReader)}function pe(e){if(e instanceof q)return e;if(e!=null){if(hs(e))return M_(e);if(us(e))return T_(e);if(fs(e))return A_(e);if(ms(e))return Vh(e);if(vs(e))return N_(e);if(bs(e))return R_(e)}throw ps(e)}function M_(e){return new q(n=>{let t=e[Fr]();if(L(t.subscribe))return t.subscribe(n);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function T_(e){return new q(n=>{for(let t=0;t<e.length&&!n.closed;t++)n.next(e[t]);n.complete()})}function A_(e){return new q(n=>{e.then(t=>{n.closed||(n.next(t),n.complete())},t=>n.error(t)).then(null,rs)})}function N_(e){return new q(n=>{for(let t of e)if(n.next(t),n.closed)return;n.complete()})}function Vh(e){return new q(n=>{k_(e,n).catch(t=>n.error(t))})}function R_(e){return Vh(ys(e))}function k_(e,n){var t,r,i,o;return Fh(this,void 0,void 0,function*(){try{for(t=Lh(e);r=yield t.next(),!r.done;){let s=r.value;if(n.next(s),n.closed)return}}catch(s){i={error:s}}finally{try{r&&!r.done&&(o=t.return)&&(yield o.call(t))}finally{if(i)throw i.error}}n.complete()})}function st(e,n,t,r=0,i=!1){let o=n.schedule(function(){t(),i?e.add(this.schedule(null,r)):this.unsubscribe()},r);if(e.add(o),!i)return o}function _s(e,n=0){return Q((t,r)=>{t.subscribe(ae(r,i=>st(r,e,()=>r.next(i),n),()=>st(r,e,()=>r.complete(),n),i=>st(r,e,()=>r.error(i),n)))})}function Ds(e,n=0){return Q((t,r)=>{r.add(e.schedule(()=>t.subscribe(r),n))})}function jh(e,n){return pe(e).pipe(Ds(n),_s(n))}function Bh(e,n){return pe(e).pipe(Ds(n),_s(n))}function Hh(e,n){return new q(t=>{let r=0;return n.schedule(function(){r===e.length?t.complete():(t.next(e[r++]),t.closed||this.schedule())})})}function Uh(e,n){return new q(t=>{let r;return st(t,n,()=>{r=e[gs](),st(t,n,()=>{let i,o;try{({value:i,done:o}=r.next())}catch(s){t.error(s);return}o?t.complete():t.next(i)},0,!0)}),()=>L(r?.return)&&r.return()})}function ws(e,n){if(!e)throw new Error("Iterable cannot be null");return new q(t=>{st(t,n,()=>{let r=e[Symbol.asyncIterator]();st(t,n,()=>{r.next().then(i=>{i.done?t.complete():t.next(i.value)})},0,!0)})})}function zh(e,n){return ws(ys(e),n)}function $h(e,n){if(e!=null){if(hs(e))return jh(e,n);if(us(e))return Hh(e,n);if(fs(e))return Bh(e,n);if(ms(e))return ws(e,n);if(vs(e))return Uh(e,n);if(bs(e))return zh(e,n)}throw ps(e)}function Gt(e,n){return n?$h(e,n):pe(e)}function et(...e){let n=fn(e);return Gt(e,n)}function pc(e,n){let t=L(e)?e:()=>e,r=i=>i.error(t());return new q(n?i=>n.schedule(r,0,i):r)}function Gh(e){return e instanceof Date&&!isNaN(e)}function _e(e,n){return Q((t,r)=>{let i=0;t.subscribe(ae(r,o=>{r.next(e.call(n,o,i++))}))})}var{isArray:O_}=Array;function F_(e,n){return O_(n)?e(...n):e(n)}function Wh(e){return _e(n=>F_(e,n))}var{isArray:P_}=Array,{getPrototypeOf:L_,prototype:V_,keys:j_}=Object;function Yh(e){if(e.length===1){let n=e[0];if(P_(n))return{args:n,keys:null};if(B_(n)){let t=j_(n);return{args:t.map(r=>n[r]),keys:t}}}return{args:e,keys:null}}function B_(e){return e&&typeof e=="object"&&L_(e)===V_}function qh(e,n){return e.reduce((t,r,i)=>(t[r]=n[i],t),{})}function Zh(e,n,t,r,i,o,s,a){let l=[],c=0,d=0,u=!1,m=()=>{u&&!l.length&&!c&&n.complete()},h=_=>c<r?p(_):l.push(_),p=_=>{o&&n.next(_),c++;let C=!1;pe(t(_,d++)).subscribe(ae(n,F=>{i?.(F),o?h(F):n.next(F)},()=>{C=!0},void 0,()=>{if(C)try{for(c--;l.length&&c<r;){let F=l.shift();s?st(n,s,()=>p(F)):p(F)}m()}catch(F){n.error(F)}}))};return e.subscribe(ae(n,h,()=>{u=!0,m()})),()=>{a?.()}}function Lr(e,n,t=1/0){return L(n)?Lr((r,i)=>_e((o,s)=>n(r,o,i,s))(pe(e(r,i))),t):(typeof n=="number"&&(t=n),Q((r,i)=>Zh(r,i,e,t)))}function Es(e=1/0){return Lr(un,e)}function Xh(){return Es(1)}function gc(...e){return Xh()(Gt(e,fn(e)))}function Ri(...e){let n=Rh(e),{args:t,keys:r}=Yh(e),i=new q(o=>{let{length:s}=t;if(!s){o.complete();return}let a=new Array(s),l=s,c=s;for(let d=0;d<s;d++){let u=!1;pe(t[d]).subscribe(ae(o,m=>{u||(u=!0,c--),a[d]=m},()=>l--,void 0,()=>{(!l||!u)&&(c||o.next(r?qh(r,a):a),o.complete())}))}});return n?i.pipe(Wh(n)):i}function Qh(e=0,n,t=Nh){let r=-1;return n!=null&&(ds(n)?t=n:r=n),new q(i=>{let o=Gh(e)?+e-t.now():e;o<0&&(o=0);let s=0;return t.schedule(function(){i.closed||(i.next(s++),0<=r?this.schedule(void 0,r):i.complete())},o)})}function vc(...e){let n=fn(e),t=kh(e,1/0),r=e;return r.length?r.length===1?pe(r[0]):Es(t)(Gt(r,n)):Yn}function tt(e,n){return Q((t,r)=>{let i=0;t.subscribe(ae(r,o=>e.call(n,o,i++)&&r.next(o)))})}function Kh(e){return Q((n,t)=>{let r=!1,i=null,o=null,s=!1,a=()=>{if(o?.unsubscribe(),o=null,r){r=!1;let c=i;i=null,t.next(c)}s&&t.complete()},l=()=>{o=null,s&&t.complete()};n.subscribe(ae(t,c=>{r=!0,i=c,o||pe(e(c)).subscribe(o=ae(t,a,l))},()=>{s=!0,(!r||!o||o.closed)&&t.complete()}))})}function Cs(e,n=hc){return Kh(()=>Qh(e,n))}function xs(e){return Q((n,t)=>{let r=null,i=!1,o;r=n.subscribe(ae(t,void 0,void 0,s=>{o=pe(e(s,xs(e)(n))),r?(r.unsubscribe(),r=null,o.subscribe(t)):i=!0})),i&&(r.unsubscribe(),r=null,o.subscribe(t))})}function yc(e,n){return L(n)?Lr(e,n,1):Lr(e,1)}function bc(e){return e<=0?()=>Yn:Q((n,t)=>{let r=0;n.subscribe(ae(t,i=>{++r<=e&&(t.next(i),e<=r&&t.complete())}))})}function Is(e,n=un){return e=e??H_,Q((t,r)=>{let i,o=!0;t.subscribe(ae(r,s=>{let a=n(s);(o||!e(i,a))&&(o=!1,i=a,r.next(s))}))})}function H_(e,n){return e===n}function ki(e){return Q((n,t)=>{try{n.subscribe(t)}finally{t.add(e)}})}function Ss(){return Q((e,n)=>{let t,r=!1;e.subscribe(ae(n,i=>{let o=t;t=i,r&&n.next([o,i]),r=!0}))})}function Oi(e={}){let{connector:n=()=>new B,resetOnError:t=!0,resetOnComplete:r=!0,resetOnRefCountZero:i=!0}=e;return o=>{let s,a,l,c=0,d=!1,u=!1,m=()=>{a?.unsubscribe(),a=void 0},h=()=>{m(),s=l=void 0,d=u=!1},p=()=>{let _=s;h(),_?.unsubscribe()};return Q((_,C)=>{c++,!u&&!d&&m();let F=l=l??n();C.add(()=>{c--,c===0&&!u&&!d&&(a=_c(p,i))}),F.subscribe(C),!s&&c>0&&(s=new $t({next:Ae=>F.next(Ae),error:Ae=>{u=!0,m(),a=_c(h,t,Ae),F.error(Ae)},complete:()=>{d=!0,m(),a=_c(h,r),F.complete()}}),pe(_).subscribe(s))})(o)}}function _c(e,n,...t){if(n===!0){e();return}if(n===!1)return;let r=new $t({next:()=>{r.unsubscribe(),e()}});return pe(n(...t)).subscribe(r)}function Ms(e,n,t){let r,i=!1;return e&&typeof e=="object"?{bufferSize:r=1/0,windowTime:n=1/0,refCount:i=!1,scheduler:t}=e:r=e??1/0,Oi({connector:()=>new ss(r,n,t),resetOnError:!0,resetOnComplete:!1,resetOnRefCountZero:i})}function Dc(e){return tt((n,t)=>e<=t)}function Ts(...e){let n=fn(e);return Q((t,r)=>{(n?gc(e,t,n):gc(e,t)).subscribe(r)})}function hn(e){return Q((n,t)=>{pe(e).subscribe(ae(t,()=>t.complete(),Ti)),!t.closed&&n.subscribe(t)})}function Fi(e,n,t){let r=L(e)||n||t?{next:e,error:n,complete:t}:e;return r?Q((i,o)=>{var s;(s=r.subscribe)===null||s===void 0||s.call(r);let a=!0;i.subscribe(ae(o,l=>{var c;(c=r.next)===null||c===void 0||c.call(r,l),o.next(l)},()=>{var l;a=!1,(l=r.complete)===null||l===void 0||l.call(r),o.complete()},l=>{var c;a=!1,(c=r.error)===null||c===void 0||c.call(r,l),o.error(l)},()=>{var l,c;a&&((l=r.unsubscribe)===null||l===void 0||l.call(r)),(c=r.finalize)===null||c===void 0||c.call(r)}))}):un}var Ps="https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",E=class extends Error{code;constructor(n,t){super(gn(n,t)),this.code=n}};function U_(e){return`NG0${Math.abs(e)}`}function gn(e,n){return`${U_(e)}${n?": "+n:""}`}function te(e){for(let n in e)if(e[n]===te)return n;throw Error("")}function rm(e,n){for(let t in n)n.hasOwnProperty(t)&&!e.hasOwnProperty(t)&&(e[t]=n[t])}function Ls(e){if(typeof e=="string")return e;if(Array.isArray(e))return`[${e.map(Ls).join(", ")}]`;if(e==null)return""+e;let n=e.overriddenName||e.name;if(n)return`${n}`;let t=e.toString();if(t==null)return""+t;let r=t.indexOf(`
`);return r>=0?t.slice(0,r):t}function Vs(e,n){return e?n?`${e} ${n}`:e:n||""}var z_=te({__forward_ref__:te});function Fe(e){return e.__forward_ref__=Fe,e}function Ve(e){return Oc(e)?e():e}function Oc(e){return typeof e=="function"&&e.hasOwnProperty(z_)&&e.__forward_ref__===Fe}function P(e){return{token:e.token,providedIn:e.providedIn||null,factory:e.factory,value:void 0}}function Y(e){return{providers:e.providers||[],imports:e.imports||[]}}function js(e){return $_(e,Bs)}function $_(e,n){return e.hasOwnProperty(n)&&e[n]||null}function G_(e){let n=e?.[Bs]??null;return n||null}function Ec(e){return e&&e.hasOwnProperty(Ns)?e[Ns]:null}var Bs=te({\u0275prov:te}),Ns=te({\u0275inj:te}),b=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(n,t){this._desc=n,this.\u0275prov=void 0,typeof t=="number"?this.__NG_ELEMENT_ID__=t:t!==void 0&&(this.\u0275prov=P({token:this,providedIn:t.providedIn||"root",factory:t.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function Fc(e){return e&&!!e.\u0275providers}var Pc=te({\u0275cmp:te}),Lc=te({\u0275dir:te}),Vc=te({\u0275pipe:te});var Li=te({\u0275fac:te}),Jn=te({__NG_ELEMENT_ID__:te}),Jh=te({__NG_ENV_ID__:te});function vn(e){return Bc(e,"@Component"),e[Pc]||null}function jc(e){return Bc(e,"@Directive"),e[Lc]||null}function im(e){return Bc(e,"@Pipe"),e[Vc]||null}function Bc(e,n){if(e==null)throw new E(-919,!1)}function Hc(e){return typeof e=="string"?e:e==null?"":String(e)}var om=te({ngErrorCode:te}),W_=te({ngErrorMessage:te}),Y_=te({ngTokenPath:te});function Uc(e,n){return sm("",-200,n)}function Hs(e,n){throw new E(-201,!1)}function sm(e,n,t){let r=new E(n,e);return r[om]=n,r[W_]=e,t&&(r[Y_]=t),r}function q_(e){return e[om]}var Cc;function am(){return Cc}function Ze(e){let n=Cc;return Cc=e,n}function zc(e,n,t){let r=js(e);if(r&&r.providedIn=="root")return r.value===void 0?r.value=r.factory():r.value;if(t&8)return null;if(n!==void 0)return n;Hs(e,"")}var Br=globalThis;var Z_={},Zn=Z_,X_="__NG_DI_FLAG__",xc=class{injector;constructor(n){this.injector=n}retrieve(n,t){let r=Xn(t)||0;try{return this.injector.get(n,r&8?null:Zn,r)}catch(i){if(Rr(i))return i;throw i}}};function Q_(e,n=0){let t=Jo();if(t===void 0)throw new E(-203,!1);if(t===null)return zc(e,void 0,n);{let r=K_(n),i=t.retrieve(e,r);if(Rr(i)){if(r.optional)return null;throw i}return i}}function S(e,n=0){return(am()||Q_)(Ve(e),n)}function f(e,n){return S(e,Xn(n))}function Xn(e){return typeof e>"u"||typeof e=="number"?e:0|(e.optional&&8)|(e.host&&1)|(e.self&&2)|(e.skipSelf&&4)}function K_(e){return{optional:!!(e&8),host:!!(e&1),self:!!(e&2),skipSelf:!!(e&4)}}function Ic(e){let n=[];for(let t=0;t<e.length;t++){let r=Ve(e[t]);if(Array.isArray(r)){if(r.length===0)throw new E(900,!1);let i,o=0;for(let s=0;s<r.length;s++){let a=r[s],l=J_(a);typeof l=="number"?l===-1?i=a.token:o|=l:i=a}n.push(S(i,o))}else n.push(S(r))}return n}function J_(e){return e[X_]}function mn(e,n){let t=e.hasOwnProperty(Li);return t?e[Li]:null}function lm(e,n,t){if(e.length!==n.length)return!1;for(let r=0;r<e.length;r++){let i=e[r],o=n[r];if(t&&(i=t(i),o=t(o)),o!==i)return!1}return!0}function cm(e){return e.flat(Number.POSITIVE_INFINITY)}function Us(e,n){e.forEach(t=>Array.isArray(t)?Us(t,n):n(t))}function $c(e,n,t){n>=e.length?e.push(t):e.splice(n,0,t)}function Hi(e,n){return n>=e.length-1?e.pop():e.splice(n,1)[0]}function dm(e,n){let t=[];for(let r=0;r<e;r++)t.push(n);return t}function um(e,n,t,r){let i=e.length;if(i==n)e.push(t,r);else if(i===1)e.push(r,e[0]),e[0]=t;else{for(i--,e.push(e[i-1],e[i]);i>n;){let o=i-2;e[i]=e[o],i--}e[n]=t,e[n+1]=r}}function zs(e,n,t){let r=Hr(e,n);return r>=0?e[r|1]=t:(r=~r,um(e,r,n,t)),r}function $s(e,n){let t=Hr(e,n);if(t>=0)return e[t|1]}function Hr(e,n){return eD(e,n,1)}function eD(e,n,t){let r=0,i=e.length>>t;for(;i!==r;){let o=r+(i-r>>1),s=e[o<<t];if(n===s)return o<<t;s>n?i=o:r=o+1}return~(i<<t)}var yn={},$e=[],Ur=new b(""),Ui=new b("",-1),Gc=new b(""),jr=class{get(n,t=Zn){if(t===Zn){let i=sm("",-201);throw i.name="\u0275NotFound",i}return t}};function fm(...e){return{\u0275providers:Wc(!0,e),\u0275fromNgModule:!0}}function Wc(e,...n){let t=[],r=new Set,i,o=s=>{t.push(s)};return Us(n,s=>{let a=s;Rs(a,o,[],r)&&(i||=[],i.push(a))}),i!==void 0&&hm(i,o),t}function hm(e,n){for(let t=0;t<e.length;t++){let{ngModule:r,providers:i}=e[t];Yc(i,o=>{n(o,r)})}}function Rs(e,n,t,r){if(e=Ve(e),!e)return!1;let i=null,o=Ec(e),s=!o&&vn(e);if(!o&&!s){let l=e.ngModule;if(o=Ec(l),o)i=l;else return!1}else{if(s&&!s.standalone)return!1;i=e}let a=r.has(i);if(s){if(a)return!1;if(r.add(i),s.dependencies){let l=typeof s.dependencies=="function"?s.dependencies():s.dependencies;for(let c of l)Rs(c,n,t,r)}}else if(o){if(o.imports!=null&&!a){r.add(i);let c;Us(o.imports,d=>{Rs(d,n,t,r)&&(c||=[],c.push(d))}),c!==void 0&&hm(c,n)}if(!a){let c=mn(i)||(()=>new i);n({provide:i,useFactory:c,deps:$e},i),n({provide:Gc,useValue:i,multi:!0},i),n({provide:Ur,useValue:()=>S(i),multi:!0},i)}let l=o.providers;if(l!=null&&!a){let c=e;Yc(l,d=>{n(d,c)})}}else return!1;return i!==e&&e.providers!==void 0}function Yc(e,n){for(let t of e)Fc(t)&&(t=t.\u0275providers),Array.isArray(t)?Yc(t,n):n(t)}var tD=te({provide:String,useValue:te});function mm(e){return e!==null&&typeof e=="object"&&tD in e}function nD(e){return!!(e&&e.useExisting)}function rD(e){return!!(e&&e.useFactory)}function Qn(e){return typeof e=="function"}function pm(e){return!!e.useClass}var zi=new b(""),As={},em={},wc;function zr(){return wc===void 0&&(wc=new jr),wc}var Ee=class{},Kn=class extends Ee{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(n,t,r,i){super(),this.parent=t,this.source=r,this.scopes=i,Mc(n,s=>this.processProvider(s)),this.records.set(Ui,Vr(void 0,this)),i.has("environment")&&this.records.set(Ee,Vr(void 0,this));let o=this.records.get(zi);o!=null&&typeof o.value=="string"&&this.scopes.add(o.value),this.injectorDefTypes=new Set(this.get(Gc,$e,{self:!0}))}retrieve(n,t){let r=Xn(t)||0;try{return this.get(n,Zn,r)}catch(i){if(Rr(i))return i;throw i}}destroy(){Pi(this),this._destroyed=!0;let n=x(null);try{for(let r of this._ngOnDestroyHooks)r.ngOnDestroy();let t=this._onDestroyHooks;this._onDestroyHooks=[];for(let r of t)r()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),x(n)}}onDestroy(n){return Pi(this),this._onDestroyHooks.push(n),()=>this.removeOnDestroy(n)}runInContext(n){Pi(this);let t=Mt(this),r=Ze(void 0),i;try{return n()}finally{Mt(t),Ze(r)}}get(n,t=Zn,r){if(Pi(this),n.hasOwnProperty(Jh))return n[Jh](this);let i=Xn(r),o,s=Mt(this),a=Ze(void 0);try{if(!(i&4)){let c=this.records.get(n);if(c===void 0){let d=lD(n)&&js(n);d&&this.injectableDefInScope(d)?c=Vr(Sc(n),As):c=null,this.records.set(n,c)}if(c!=null)return this.hydrate(n,c,i)}let l=i&2?zr():this.parent;return t=i&8&&t===Zn?null:t,l.get(n,t)}catch(l){let c=q_(l);throw c===-200||c===-201?new E(c,null):l}finally{Ze(a),Mt(s)}}resolveInjectorInitializers(){let n=x(null),t=Mt(this),r=Ze(void 0),i;try{let o=this.get(Ur,$e,{self:!0});for(let s of o)s()}finally{Mt(t),Ze(r),x(n)}}toString(){return"R3Injector[...]"}processProvider(n){n=Ve(n);let t=Qn(n)?n:Ve(n&&n.provide),r=oD(n);if(!Qn(n)&&n.multi===!0){let i=this.records.get(t);i||(i=Vr(void 0,As,!0),i.factory=()=>Ic(i.multi),this.records.set(t,i)),t=n,i.multi.push(n)}this.records.set(t,r)}hydrate(n,t,r){let i=x(null);try{if(t.value===em)throw Uc("");return t.value===As&&(t.value=em,t.value=t.factory(void 0,r)),typeof t.value=="object"&&t.value&&aD(t.value)&&this._ngOnDestroyHooks.add(t.value),t.value}finally{x(i)}}injectableDefInScope(n){if(!n.providedIn)return!1;let t=Ve(n.providedIn);return typeof t=="string"?t==="any"||this.scopes.has(t):this.injectorDefTypes.has(t)}removeOnDestroy(n){let t=this._onDestroyHooks.indexOf(n);t!==-1&&this._onDestroyHooks.splice(t,1)}};function Sc(e){let n=js(e),t=n!==null?n.factory:mn(e);if(t!==null)return t;if(e instanceof b)throw new E(-204,!1);if(e instanceof Function)return iD(e);throw new E(-204,!1)}function iD(e){if(e.length>0)throw new E(-204,!1);let t=G_(e);return t!==null?()=>t.factory(e):()=>new e}function oD(e){if(mm(e))return Vr(void 0,e.useValue);{let n=qc(e);return Vr(n,As)}}function qc(e,n,t){let r;if(Qn(e)){let i=Ve(e);return mn(i)||Sc(i)}else if(mm(e))r=()=>Ve(e.useValue);else if(rD(e))r=()=>e.useFactory(...Ic(e.deps||[]));else if(nD(e))r=(i,o)=>S(Ve(e.useExisting),o!==void 0&&o&8?8:void 0);else{let i=Ve(e&&(e.useClass||e.provide));if(sD(e))r=()=>new i(...Ic(e.deps));else return mn(i)||Sc(i)}return r}function Pi(e){if(e.destroyed)throw new E(-205,!1)}function Vr(e,n,t=!1){return{factory:e,value:n,multi:t?[]:void 0}}function sD(e){return!!e.deps}function aD(e){return e!==null&&typeof e=="object"&&typeof e.ngOnDestroy=="function"}function lD(e){return typeof e=="function"||typeof e=="object"&&e.ngMetadataName==="InjectionToken"}function Mc(e,n){for(let t of e)Array.isArray(t)?Mc(t,n):t&&Fc(t)?Mc(t.\u0275providers,n):n(t)}function $r(e,n){let t;e instanceof Kn?(Pi(e),t=e):t=new xc(e);let r,i=Mt(t),o=Ze(void 0);try{return n()}finally{Mt(i),Ze(o)}}function gm(){return am()!==void 0||Jo()!=null}var wt=0,I=1,M=2,Oe=3,at=4,We=5,er=6,Gr=7,Ce=8,At=9,Nt=10,ce=11,Wr=12,Zc=13,bn=14,Xe=15,_n=16,tr=17,Rt=18,kt=19,Xc=20,Wt=21,Gs=22,pn=23,nt=24,nr=25,Ot=26,ge=27,vm=1,Qc=6,Dn=7,$i=8,rr=9,ve=10;function qt(e){return Array.isArray(e)&&typeof e[vm]=="object"}function lt(e){return Array.isArray(e)&&e[vm]===!0}function Kc(e){return(e.flags&4)!==0}function Zt(e){return e.componentOffset>-1}function Gi(e){return(e.flags&1)===1}function Ft(e){return!!e.template}function Yr(e){return(e[M]&512)!==0}function ir(e){return(e[M]&256)===256}var Jc="svg",ym="math";function ct(e){for(;Array.isArray(e);)e=e[wt];return e}function ed(e,n){return ct(n[e])}function dt(e,n){return ct(n[e.index])}function Ws(e,n){return e.data[n]}function td(e,n){return e[n]}function nd(e,n,t,r){t>=e.data.length&&(e.data[t]=null,e.blueprint[t]=null),n[t]=r}function ut(e,n){let t=n[e];return qt(t)?t:t[wt]}function bm(e){return(e[M]&4)===4}function Ys(e){return(e[M]&128)===128}function _m(e){return lt(e[Oe])}function ft(e,n){return n==null?null:e[n]}function rd(e){e[tr]=0}function id(e){e[M]&1024||(e[M]|=1024,Ys(e)&&or(e))}function Dm(e,n){for(;e>0;)n=n[bn],e--;return n}function Wi(e){return!!(e[M]&9216||e[nt]?.dirty)}function qs(e){e[Nt].changeDetectionScheduler?.notify(8),e[M]&64&&(e[M]|=1024),Wi(e)&&or(e)}function or(e){e[Nt].changeDetectionScheduler?.notify(0);let n=Yt(e);for(;n!==null&&!(n[M]&8192||(n[M]|=8192,!Ys(n)));)n=Yt(n)}function Zs(e,n){if(ir(e))throw new E(911,!1);e[Wt]===null&&(e[Wt]=[]),e[Wt].push(n)}function wm(e,n){if(e[Wt]===null)return;let t=e[Wt].indexOf(n);t!==-1&&e[Wt].splice(t,1)}function Yt(e){let n=e[Oe];return lt(n)?n[Oe]:n}function od(e){return e[Gr]??=[]}function sd(e){return e.cleanup??=[]}function Em(e,n,t,r){let i=od(n);i.push(t),e.firstCreatePass&&sd(e).push(r,i.length-1)}var V={lFrame:Fm(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var Tc=!1;function Cm(){return V.lFrame.elementDepthCount}function xm(){V.lFrame.elementDepthCount++}function ad(){V.lFrame.elementDepthCount--}function ld(){return V.bindingsEnabled}function cd(){return V.skipHydrationRootTNode!==null}function dd(e){return V.skipHydrationRootTNode===e}function ud(){V.skipHydrationRootTNode=null}function N(){return V.lFrame.lView}function ye(){return V.lFrame.tView}function sr(e){return V.lFrame.contextLView=e,e[Ce]}function ar(e){return V.lFrame.contextLView=null,e}function je(){let e=fd();for(;e!==null&&e.type===64;)e=e.parent;return e}function fd(){return V.lFrame.currentTNode}function Im(){let e=V.lFrame,n=e.currentTNode;return e.isParent?n:n.parent}function qr(e,n){let t=V.lFrame;t.currentTNode=e,t.isParent=n}function hd(){return V.lFrame.isParent}function md(){V.lFrame.isParent=!1}function Sm(){return V.lFrame.contextLView}function pd(){return Tc}function Vi(e){let n=Tc;return Tc=e,n}function Mm(){let e=V.lFrame,n=e.bindingRootIndex;return n===-1&&(n=e.bindingRootIndex=e.tView.bindingStartIndex),n}function Tm(e){return V.lFrame.bindingIndex=e}function lr(){return V.lFrame.bindingIndex++}function gd(e){let n=V.lFrame,t=n.bindingIndex;return n.bindingIndex=n.bindingIndex+e,t}function Am(){return V.lFrame.inI18n}function Nm(e,n){let t=V.lFrame;t.bindingIndex=t.bindingRootIndex=e,Xs(n)}function Rm(){return V.lFrame.currentDirectiveIndex}function Xs(e){V.lFrame.currentDirectiveIndex=e}function km(e){let n=V.lFrame.currentDirectiveIndex;return n===-1?null:e[n]}function Qs(){return V.lFrame.currentQueryIndex}function Yi(e){V.lFrame.currentQueryIndex=e}function cD(e){let n=e[I];return n.type===2?n.declTNode:n.type===1?e[We]:null}function vd(e,n,t){if(t&4){let i=n,o=e;for(;i=i.parent,i===null&&!(t&1);)if(i=cD(o),i===null||(o=o[bn],i.type&10))break;if(i===null)return!1;n=i,e=o}let r=V.lFrame=Om();return r.currentTNode=n,r.lView=e,!0}function Ks(e){let n=Om(),t=e[I];V.lFrame=n,n.currentTNode=t.firstChild,n.lView=e,n.tView=t,n.contextLView=e,n.bindingIndex=t.bindingStartIndex,n.inI18n=!1}function Om(){let e=V.lFrame,n=e===null?null:e.child;return n===null?Fm(e):n}function Fm(e){let n={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:e,child:null,inI18n:!1};return e!==null&&(e.child=n),n}function Pm(){let e=V.lFrame;return V.lFrame=e.parent,e.currentTNode=null,e.lView=null,e}var yd=Pm;function Js(){let e=Pm();e.isParent=!0,e.tView=null,e.selectedIndex=-1,e.contextLView=null,e.elementDepthCount=0,e.currentDirectiveIndex=-1,e.currentNamespace=null,e.bindingRootIndex=-1,e.bindingIndex=-1,e.currentQueryIndex=0}function Lm(e){return(V.lFrame.contextLView=Dm(e,V.lFrame.contextLView))[Ce]}function Xt(){return V.lFrame.selectedIndex}function wn(e){V.lFrame.selectedIndex=e}function qi(){let e=V.lFrame;return Ws(e.tView,e.selectedIndex)}function ea(){V.lFrame.currentNamespace=Jc}function bd(){return V.lFrame.currentNamespace}var Vm=!0;function ta(){return Vm}function na(e){Vm=e}function Ac(e,n=null,t=null,r){let i=jm(e,n,t,r);return i.resolveInjectorInitializers(),i}function jm(e,n=null,t=null,r,i=new Set){let o=[t||$e,fm(e)],s;return new Kn(o,n||zr(),s||null,i)}var J=class e{static THROW_IF_NOT_FOUND=Zn;static NULL=new jr;static create(n,t){if(Array.isArray(n))return Ac({name:""},t,n,"");{let r=n.name??"";return Ac({name:r},n.parent,n.providers,r)}}static \u0275prov=P({token:e,providedIn:"any",factory:()=>S(Ui)});static __NG_ELEMENT_ID__=-1},j=new b(""),Qe=(()=>{class e{static __NG_ELEMENT_ID__=dD;static __NG_ENV_ID__=t=>t}return e})(),ks=class extends Qe{_lView;constructor(n){super(),this._lView=n}get destroyed(){return ir(this._lView)}onDestroy(n){let t=this._lView;return Zs(t,n),()=>wm(t,n)}};function dD(){return new ks(N())}var Bm=!1,Hm=new b(""),cr=(()=>{class e{taskId=0;pendingTasks=new Set;destroyed=!1;pendingTask=new Wn(!1);debugTaskTracker=f(Hm,{optional:!0});get hasPendingTasks(){return this.destroyed?!1:this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new q(t=>{t.next(!1),t.complete()}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(!0);let t=this.taskId++;return this.pendingTasks.add(t),this.debugTaskTracker?.add(t),t}has(t){return this.pendingTasks.has(t)}remove(t){this.pendingTasks.delete(t),this.debugTaskTracker?.remove(t),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(!1),this.destroyed=!0,this.pendingTask.unsubscribe()}static \u0275prov=P({token:e,providedIn:"root",factory:()=>new e})}return e})(),Nc=class extends B{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(n=!1){super(),this.__isAsync=n,gm()&&(this.destroyRef=f(Qe,{optional:!0})??void 0,this.pendingTasks=f(cr,{optional:!0})??void 0)}emit(n){let t=x(null);try{super.next(n)}finally{x(t)}}subscribe(n,t,r){let i=n,o=t||(()=>null),s=r;if(n&&typeof n=="object"){let l=n;i=l.next?.bind(l),o=l.error?.bind(l),s=l.complete?.bind(l)}this.__isAsync&&(o=this.wrapInTimeout(o),i&&(i=this.wrapInTimeout(i)),s&&(s=this.wrapInTimeout(s)));let a=super.subscribe({next:i,error:o,complete:s});return n instanceof oe&&n.add(a),a}wrapInTimeout(n){return t=>{let r=this.pendingTasks?.add();setTimeout(()=>{try{n(t)}finally{r!==void 0&&this.pendingTasks?.remove(r)}})}}},de=Nc;function Os(...e){}function _d(e){let n,t;function r(){e=Os;try{t!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(t),n!==void 0&&clearTimeout(n)}catch(i){}}return n=setTimeout(()=>{e(),r()}),typeof requestAnimationFrame=="function"&&(t=requestAnimationFrame(()=>{e(),r()})),()=>r()}function Um(e){return queueMicrotask(()=>e()),()=>{e=Os}}var Dd="isAngularZone",ji=Dd+"_ID",uD=0,A=class e{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new de(!1);onMicrotaskEmpty=new de(!1);onStable=new de(!1);onError=new de(!1);constructor(n){let{enableLongStackTrace:t=!1,shouldCoalesceEventChangeDetection:r=!1,shouldCoalesceRunChangeDetection:i=!1,scheduleInRootZone:o=Bm}=n;if(typeof Zone>"u")throw new E(908,!1);Zone.assertZonePatched();let s=this;s._nesting=0,s._outer=s._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(s._inner=s._inner.fork(new Zone.TaskTrackingZoneSpec)),t&&Zone.longStackTraceZoneSpec&&(s._inner=s._inner.fork(Zone.longStackTraceZoneSpec)),s.shouldCoalesceEventChangeDetection=!i&&r,s.shouldCoalesceRunChangeDetection=i,s.callbackScheduled=!1,s.scheduleInRootZone=o,mD(s)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(Dd)===!0}static assertInAngularZone(){if(!e.isInAngularZone())throw new E(909,!1)}static assertNotInAngularZone(){if(e.isInAngularZone())throw new E(909,!1)}run(n,t,r){return this._inner.run(n,t,r)}runTask(n,t,r,i){let o=this._inner,s=o.scheduleEventTask("NgZoneEvent: "+i,n,fD,Os,Os);try{return o.runTask(s,t,r)}finally{o.cancelTask(s)}}runGuarded(n,t,r){return this._inner.runGuarded(n,t,r)}runOutsideAngular(n){return this._outer.run(n)}},fD={};function wd(e){if(e._nesting==0&&!e.hasPendingMicrotasks&&!e.isStable)try{e._nesting++,e.onMicrotaskEmpty.emit(null)}finally{if(e._nesting--,!e.hasPendingMicrotasks)try{e.runOutsideAngular(()=>e.onStable.emit(null))}finally{e.isStable=!0}}}function hD(e){if(e.isCheckStableRunning||e.callbackScheduled)return;e.callbackScheduled=!0;function n(){_d(()=>{e.callbackScheduled=!1,Rc(e),e.isCheckStableRunning=!0,wd(e),e.isCheckStableRunning=!1})}e.scheduleInRootZone?Zone.root.run(()=>{n()}):e._outer.run(()=>{n()}),Rc(e)}function mD(e){let n=()=>{hD(e)},t=uD++;e._inner=e._inner.fork({name:"angular",properties:{[Dd]:!0,[ji]:t,[ji+t]:!0},onInvokeTask:(r,i,o,s,a,l)=>{if(pD(l))return r.invokeTask(o,s,a,l);try{return tm(e),r.invokeTask(o,s,a,l)}finally{(e.shouldCoalesceEventChangeDetection&&s.type==="eventTask"||e.shouldCoalesceRunChangeDetection)&&n(),nm(e)}},onInvoke:(r,i,o,s,a,l,c)=>{try{return tm(e),r.invoke(o,s,a,l,c)}finally{e.shouldCoalesceRunChangeDetection&&!e.callbackScheduled&&!gD(l)&&n(),nm(e)}},onHasTask:(r,i,o,s)=>{r.hasTask(o,s),i===o&&(s.change=="microTask"?(e._hasPendingMicrotasks=s.microTask,Rc(e),wd(e)):s.change=="macroTask"&&(e.hasPendingMacrotasks=s.macroTask))},onHandleError:(r,i,o,s)=>(r.handleError(o,s),e.runOutsideAngular(()=>e.onError.emit(s)),!1)})}function Rc(e){e._hasPendingMicrotasks||(e.shouldCoalesceEventChangeDetection||e.shouldCoalesceRunChangeDetection)&&e.callbackScheduled===!0?e.hasPendingMicrotasks=!0:e.hasPendingMicrotasks=!1}function tm(e){e._nesting++,e.isStable&&(e.isStable=!1,e.onUnstable.emit(null))}function nm(e){e._nesting--,wd(e)}var Bi=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new de;onMicrotaskEmpty=new de;onStable=new de;onError=new de;run(n,t,r){return n.apply(t,r)}runGuarded(n,t,r){return n.apply(t,r)}runOutsideAngular(n){return n()}runTask(n,t,r,i){return n.apply(t,r)}};function pD(e){return zm(e,"__ignore_ng_zone__")}function gD(e){return zm(e,"__scheduler_tick__")}function zm(e,n){return!Array.isArray(e)||e.length!==1?!1:e[0]?.data?.[n]===!0}var Ge=class{_console=console;handleError(n){this._console.error("ERROR",n)}},En=new b("",{factory:()=>{let e=f(A),n=f(Ee),t;return r=>{e.runOutsideAngular(()=>{n.destroyed&&!t?setTimeout(()=>{throw r}):(t??=n.get(Ge),t.handleError(r))})}}}),$m={provide:Ur,useValue:()=>{let e=f(Ge,{optional:!0})},multi:!0};function ne(e,n){let[t,r,i]=nc(e,n?.equal),o=t,s=o[ke];return o.set=r,o.update=i,o.asReadonly=Ed.bind(o),o}function Ed(){let e=this[ke];if(e.readonlyFn===void 0){let n=()=>this();n[ke]=e,e.readonlyFn=n}return e.readonlyFn}var dr=new b("",{factory:()=>vD}),vD="ng";var ra=new b(""),ur=new b("",{providedIn:"platform",factory:()=>"unknown"}),Zi=new b(""),Cn=new b("",{factory:()=>f(j).body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var Zr=(()=>{class e{view;node;constructor(t,r){this.view=t,this.node=r}static __NG_ELEMENT_ID__=yD}return e})();function yD(){return new Zr(N(),je())}var Tt=class{},Xi=new b("",{factory:()=>!0});var Cd=new b(""),ia=(()=>{class e{static \u0275prov=P({token:e,providedIn:"root",factory:()=>new kc})}return e})(),kc=class{dirtyEffectCount=0;queues=new Map;add(n){this.enqueue(n),this.schedule(n)}schedule(n){n.dirty&&this.dirtyEffectCount++}remove(n){let t=n.zone,r=this.queues.get(t);r.has(n)&&(r.delete(n),n.dirty&&this.dirtyEffectCount--)}enqueue(n){let t=n.zone;this.queues.has(t)||this.queues.set(t,new Set);let r=this.queues.get(t);r.has(n)||r.add(n)}flush(){for(;this.dirtyEffectCount>0;){let n=!1;for(let[t,r]of this.queues)t===null?n||=this.flushQueue(r):n||=t.run(()=>this.flushQueue(r));n||(this.dirtyEffectCount=0)}}flushQueue(n){let t=!1;for(let r of n)r.dirty&&(this.dirtyEffectCount--,t=!0,r.run());return t}},Fs=class{[ke];constructor(n){this[ke]=n}destroy(){this[ke].destroy()}};function Pt(e,n){let t=n?.injector??f(J),r=n?.manualCleanup!==!0?t.get(Qe):null,i,o=t.get(Zr,null,{optional:!0}),s=t.get(Tt);return o!==null?(i=DD(o.view,s,e),r instanceof ks&&r._lView===o.view&&(r=null)):i=wD(e,t.get(ia),s),i.injector=t,r!==null&&(i.onDestroyFns=[r.onDestroy(()=>i.destroy())]),new Fs(i)}var Gm=H(D({},ic),{cleanupFns:void 0,zone:null,onDestroyFns:null,run(){let e=Vi(!1);try{oc(this)}finally{Vi(e)}},cleanup(){if(!this.cleanupFns?.length)return;let e=x(null);try{for(;this.cleanupFns.length;)this.cleanupFns.pop()()}finally{this.cleanupFns=[],x(e)}}}),bD=H(D({},Gm),{consumerMarkedDirty(){this.scheduler.schedule(this),this.notifier.notify(12)},destroy(){if(dn(this),this.onDestroyFns!==null)for(let e of this.onDestroyFns)e();this.cleanup(),this.scheduler.remove(this)}}),_D=H(D({},Gm),{consumerMarkedDirty(){this.view[M]|=8192,or(this.view),this.notifier.notify(13)},destroy(){if(dn(this),this.onDestroyFns!==null)for(let e of this.onDestroyFns)e();this.cleanup(),this.view[pn]?.delete(this)}});function DD(e,n,t){let r=Object.create(_D);return r.view=e,r.zone=typeof Zone<"u"?Zone.current:null,r.notifier=n,r.fn=Wm(r,t),e[pn]??=new Set,e[pn].add(r),r.consumerMarkedDirty(r),r}function wD(e,n,t){let r=Object.create(bD);return r.fn=Wm(r,e),r.scheduler=n,r.notifier=t,r.zone=typeof Zone<"u"?Zone.current:null,r.scheduler.add(r),r.notifier.notify(12),r}function Wm(e,n){return()=>{n(t=>(e.cleanupFns??=[]).push(t))}}function xn(e){return typeof e=="function"&&e[ke]!==void 0}var Qi=(()=>{class e{internalPendingTasks=f(cr);scheduler=f(Tt);errorHandler=f(En);add(){let t=this.internalPendingTasks.add();return()=>{this.internalPendingTasks.has(t)&&(this.scheduler.notify(11),this.internalPendingTasks.remove(t))}}run(t){let r=this.add();try{t().catch(this.errorHandler).finally(r)}catch(i){this.errorHandler(i),r()}}static \u0275prov=P({token:e,providedIn:"root",factory:()=>new e})}return e})();function lo(e){return{toString:e}.toString()}var Z=(function(e){return e[e.TemplateCreateStart=0]="TemplateCreateStart",e[e.TemplateCreateEnd=1]="TemplateCreateEnd",e[e.TemplateUpdateStart=2]="TemplateUpdateStart",e[e.TemplateUpdateEnd=3]="TemplateUpdateEnd",e[e.LifecycleHookStart=4]="LifecycleHookStart",e[e.LifecycleHookEnd=5]="LifecycleHookEnd",e[e.OutputStart=6]="OutputStart",e[e.OutputEnd=7]="OutputEnd",e[e.BootstrapApplicationStart=8]="BootstrapApplicationStart",e[e.BootstrapApplicationEnd=9]="BootstrapApplicationEnd",e[e.BootstrapComponentStart=10]="BootstrapComponentStart",e[e.BootstrapComponentEnd=11]="BootstrapComponentEnd",e[e.ChangeDetectionStart=12]="ChangeDetectionStart",e[e.ChangeDetectionEnd=13]="ChangeDetectionEnd",e[e.ChangeDetectionSyncStart=14]="ChangeDetectionSyncStart",e[e.ChangeDetectionSyncEnd=15]="ChangeDetectionSyncEnd",e[e.AfterRenderHooksStart=16]="AfterRenderHooksStart",e[e.AfterRenderHooksEnd=17]="AfterRenderHooksEnd",e[e.ComponentStart=18]="ComponentStart",e[e.ComponentEnd=19]="ComponentEnd",e[e.DeferBlockStateStart=20]="DeferBlockStateStart",e[e.DeferBlockStateEnd=21]="DeferBlockStateEnd",e[e.DynamicComponentStart=22]="DynamicComponentStart",e[e.DynamicComponentEnd=23]="DynamicComponentEnd",e[e.HostBindingsUpdateStart=24]="HostBindingsUpdateStart",e[e.HostBindingsUpdateEnd=25]="HostBindingsUpdateEnd",e})(Z||{}),fa=class{previousValue;currentValue;firstChange;constructor(n,t,r){this.previousValue=n,this.currentValue=t,this.firstChange=r}isFirstChange(){return this.firstChange}};function Mp(e,n,t,r){n!==null?n.applyValueToInputSignal(n,r):e[t]=r}var Tp=null,rt=(()=>{Tp=Ym;let e=()=>Ym;return e.ngInherit=!0,e})();function PD(){return Tp}function Ym(e){return e.type.prototype.ngOnChanges&&(e.setInput=VD),LD}function LD(){let e=Ap(this),n=e?.current;if(n){let t=e.previous;if(t===yn)e.previous=n;else for(let r in n)t[r]=n[r];e.current=null,this.ngOnChanges(n)}}function VD(e,n,t,r,i){let o=this.declaredInputs[r],s=Ap(e)||jD(e,{previous:yn,current:null}),a=s.current||(s.current={}),l=s.previous,c=l[o];a[o]=new fa(c&&c.currentValue,t,l===yn),Mp(e,n,i,t)}var Fd="__ngSimpleChanges__";function Ap(e){return Object.hasOwn(e,Fd)&&e[Fd]||null}function jD(e,n){return e[Fd]=n}var qm=[];var K=function(e,n=null,t){for(let r=0;r<qm.length;r++){let i=qm[r];i(e,n,t)}};function BD(e,n,t){let{ngOnChanges:r,ngOnInit:i,ngDoCheck:o}=n.type.prototype;if(r){let s=PD()(n);(t.preOrderHooks??=[]).push(e,s),(t.preOrderCheckHooks??=[]).push(e,s)}i&&(t.preOrderHooks??=[]).push(0-e,i),o&&((t.preOrderHooks??=[]).push(e,o),(t.preOrderCheckHooks??=[]).push(e,o))}function Np(e,n){for(let t=n.directiveStart,r=n.directiveEnd;t<r;t++){let o=e.data[t].type.prototype,{ngAfterContentInit:s,ngAfterContentChecked:a,ngAfterViewInit:l,ngAfterViewChecked:c,ngOnDestroy:d}=o;s&&(e.contentHooks??=[]).push(-t,s),a&&((e.contentHooks??=[]).push(t,a),(e.contentCheckHooks??=[]).push(t,a)),l&&(e.viewHooks??=[]).push(-t,l),c&&((e.viewHooks??=[]).push(t,c),(e.viewCheckHooks??=[]).push(t,c)),d!=null&&(e.destroyHooks??=[]).push(t,d)}}function la(e,n,t){Rp(e,n,3,t)}function ca(e,n,t,r){(e[M]&3)===t&&Rp(e,n,t,r)}function xd(e,n){let t=e[M];(t&3)===n&&(t&=16383,t+=1,e[M]=t)}function Rp(e,n,t,r){let i=r!==void 0?e[tr]&65535:0,o=r??-1,s=n.length-1,a=0;for(let l=i;l<s;l++)if(typeof n[l+1]=="number"){if(a=n[l],r!=null&&a>=r)break}else n[l]<0&&(e[tr]+=65536),(a<o||o==-1)&&(HD(e,t,n,l),e[tr]=(e[tr]&4294901760)+l+2),l++}function Zm(e,n){K(Z.LifecycleHookStart,e,n);let t=x(null);try{n.call(e)}finally{x(t),K(Z.LifecycleHookEnd,e,n)}}function HD(e,n,t,r){let i=t[r]<0,o=t[r+1],s=i?-t[r]:t[r],a=e[s];i?e[M]>>14<e[tr]>>16&&(e[M]&3)===n&&(e[M]+=16384,Zm(a,o)):Zm(a,o)}var Qr=-1,fr=class{factory;name;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(n,t,r,i){this.factory=n,this.name=i,this.canSeeViewProviders=t,this.injectImpl=r}};function UD(e){return(e.flags&8)!==0}function zD(e){return(e.flags&16)!==0}function $D(e,n,t){let r=0;for(;r<t.length;){let i=t[r];if(typeof i=="number"){if(i!==0)break;r++;let o=t[r++],s=t[r++],a=t[r++];e.setAttribute(n,s,a,o)}else{let o=i,s=t[++r];GD(o)?e.setProperty(n,o,s):e.setAttribute(n,o,s),r++}}return r}function kp(e){return e===3||e===4||e===6}function GD(e){return e.charCodeAt(0)===64}function Jr(e,n){if(!(n===null||n.length===0))if(e===null||e.length===0)e=n.slice();else{let t=-1;for(let r=0;r<n.length;r++){let i=n[r];typeof i=="number"?t=i:t===0||(t===-1||t===2?Xm(e,t,i,null,n[++r]):Xm(e,t,i,null,null))}}return e}function Xm(e,n,t,r,i){let o=0,s=e.length;if(n===-1)s=-1;else for(;o<e.length;){let a=e[o++];if(typeof a=="number"){if(a===n){s=-1;break}else if(a>n){s=o-1;break}}}for(;o<e.length;){let a=e[o];if(typeof a=="number")break;if(a===t){i!==null&&(e[o+1]=i);return}o++,i!==null&&o++}s!==-1&&(e.splice(s,0,n),o=s+1),e.splice(o++,0,t),i!==null&&e.splice(o++,0,i)}function Op(e){return e!==Qr}function ha(e){return e&32767}function WD(e){return e>>16}function ma(e,n){let t=WD(e),r=n;for(;t>0;)r=r[bn],t--;return r}var Pd=!0;function pa(e){let n=Pd;return Pd=e,n}var YD=256,Fp=YD-1,Pp=5,qD=0,Lt={};function ZD(e,n,t){let r;typeof t=="string"?r=t.charCodeAt(0)||0:t.hasOwnProperty(Jn)&&(r=t[Jn]),r==null&&(r=t[Jn]=qD++);let i=r&Fp,o=1<<i;n.data[e+(i>>Pp)]|=o}function ga(e,n){let t=Lp(e,n);if(t!==-1)return t;let r=n[I];r.firstCreatePass&&(e.injectorIndex=n.length,Id(r.data,e),Id(n,null),Id(r.blueprint,null));let i=gu(e,n),o=e.injectorIndex;if(Op(i)){let s=ha(i),a=ma(i,n),l=a[I].data;for(let c=0;c<8;c++)n[o+c]=a[s+c]|l[s+c]}return n[o+8]=i,o}function Id(e,n){e.push(0,0,0,0,0,0,0,0,n)}function Lp(e,n){return e.injectorIndex===-1||e.parent&&e.parent.injectorIndex===e.injectorIndex||n[e.injectorIndex+8]===null?-1:e.injectorIndex}function gu(e,n){if(e.parent&&e.parent.injectorIndex!==-1)return e.parent.injectorIndex;let t=0,r=null,i=n;for(;i!==null;){if(r=Up(i),r===null)return Qr;if(t++,i=i[bn],r.injectorIndex!==-1)return r.injectorIndex|t<<16}return Qr}function Ld(e,n,t){ZD(e,n,t)}function XD(e,n){if(n==="class")return e.classes;if(n==="style")return e.styles;let t=e.attrs;if(t){let r=t.length,i=0;for(;i<r;){let o=t[i];if(kp(o))break;if(o===0)i=i+2;else if(typeof o=="number")for(i++;i<r&&typeof t[i]=="string";)i++;else{if(o===n)return t[i+1];i=i+2}}}return null}function Vp(e,n,t){if(t&8||e!==void 0)return e;Hs(n,"NodeInjector")}function jp(e,n,t,r){if(t&8&&r===void 0&&(r=null),(t&3)===0){let i=e[At],o=Ze(void 0);try{return i?i.get(n,r,t&8):zc(n,r,t&8)}finally{Ze(o)}}return Vp(r,n,t)}function Bp(e,n,t,r=0,i){if(e!==null){if(n[M]&2048&&!(r&2)){let s=ew(e,n,t,r,Lt);if(s!==Lt)return s}let o=Hp(e,n,t,r,Lt);if(o!==Lt)return o}return jp(n,t,r,i)}function Hp(e,n,t,r,i){let o=KD(t);if(typeof o=="function"){if(!vd(n,e,r))return r&1?Vp(i,t,r):jp(n,t,r,i);try{let s;if(s=o(r),s==null&&!(r&8))Hs(t);else return s}finally{yd()}}else if(typeof o=="number"){let s=null,a=Lp(e,n),l=Qr,c=r&1?n[Xe][We]:null;for((a===-1||r&4)&&(l=a===-1?gu(e,n):n[a+8],l===Qr||!Km(r,!1)?a=-1:(s=n[I],a=ha(l),n=ma(l,n)));a!==-1;){let d=n[I];if(Qm(o,a,d.data)){let u=QD(a,n,t,s,r,c);if(u!==Lt)return u}l=n[a+8],l!==Qr&&Km(r,n[I].data[a+8]===c)&&Qm(o,a,n)?(s=d,a=ha(l),n=ma(l,n)):a=-1}}return i}function QD(e,n,t,r,i,o){let s=n[I],a=s.data[e+8],l=r==null?Zt(a)&&Pd:r!=s&&(a.type&3)!==0,c=i&1&&o===a,d=da(a,s,t,l,c);return d!==null?to(n,s,d,a,i):Lt}function da(e,n,t,r,i){let o=e.providerIndexes,s=n.data,a=o&1048575,l=e.directiveStart,c=e.directiveEnd,d=o>>20,u=r?a:a+d,m=i?a+d:c;for(let h=u;h<m;h++){let p=s[h];if(h<l&&t===p||h>=l&&p.type===t)return h}if(i){let h=s[l];if(h&&Ft(h)&&h.type===t)return l}return null}function to(e,n,t,r,i){let o=e[t],s=n.data;if(o instanceof fr){let a=o;if(a.resolving)throw Uc("");let l=pa(a.canSeeViewProviders);a.resolving=!0;let c=s[t].type||s[t],d,u=a.injectImpl?Ze(a.injectImpl):null,m=vd(e,r,0);try{o=e[t]=a.factory(void 0,i,s,e,r),n.firstCreatePass&&t>=r.directiveStart&&BD(t,s[t],n)}finally{u!==null&&Ze(u),pa(l),a.resolving=!1,yd()}}return o}function KD(e){if(typeof e=="string")return e.charCodeAt(0)||0;let n=e.hasOwnProperty(Jn)?e[Jn]:void 0;return typeof n=="number"?n>=0?n&Fp:JD:n}function Qm(e,n,t){let r=1<<e;return!!(t[n+(e>>Pp)]&r)}function Km(e,n){return!(e&2)&&!(e&1&&n)}var In=class{_tNode;_lView;constructor(n,t){this._tNode=n,this._lView=t}get(n,t,r){return Bp(this._tNode,this._lView,n,Xn(r),t)}};function JD(){return new In(je(),N())}function gr(e){return lo(()=>{let n=e.prototype.constructor,t=n[Li]||Vd(n),r=Object.prototype,i=Object.getPrototypeOf(e.prototype).constructor;for(;i&&i!==r;){let o=i[Li]||Vd(i);if(o&&o!==t)return o;i=Object.getPrototypeOf(i)}return o=>new o})}function Vd(e){return Oc(e)?()=>{let n=Vd(Ve(e));return n&&n()}:mn(e)}function ew(e,n,t,r,i){let o=e,s=n;for(;o!==null&&s!==null&&s[M]&2048&&!Yr(s);){let a=Hp(o,s,t,r|2,Lt);if(a!==Lt)return a;let l=o.parent;if(!l){let c=s[Xc];if(c){let d=c.get(t,Lt,r&-5);if(d!==Lt)return d}l=Up(s),s=s[bn]}o=l}return i}function Up(e){let n=e[I],t=n.type;return t===2?n.declTNode:t===1?e[We]:null}function vu(e){return XD(je(),e)}function R(e){return{token:e.token,providedIn:e.autoProvided===!1?null:"root",factory:e.factory,value:void 0}}function tw(){return ii(je(),N())}function ii(e,n){return new G(dt(e,n))}var G=(()=>{class e{nativeElement;constructor(t){this.nativeElement=t}static __NG_ELEMENT_ID__=tw}return e})();function zp(e){return e instanceof G?e.nativeElement:e}function nw(){return this._results[Symbol.iterator]()}var va=class{_emitDistinctChangesOnly;dirty=!0;_onDirty=void 0;_results=[];_changesDetected=!1;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new B}constructor(n=!1){this._emitDistinctChangesOnly=n}get(n){return this._results[n]}map(n){return this._results.map(n)}filter(n){return this._results.filter(n)}find(n){return this._results.find(n)}reduce(n,t){return this._results.reduce(n,t)}forEach(n){this._results.forEach(n)}some(n){return this._results.some(n)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(n,t){this.dirty=!1;let r=cm(n);(this._changesDetected=!lm(this._results,r,t))&&(this._results=r,this.length=r.length,this.last=r[this.length-1],this.first=r[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this)}onDirty(n){this._onDirty=n}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}[Symbol.iterator]=nw};function $p(e){return(e.flags&128)===128}var yu=(function(e){return e[e.OnPush=0]="OnPush",e[e.Eager=1]="Eager",e[e.Default=1]="Default",e})(yu||{}),Gp=new Map,rw=0;function iw(){return rw++}function ow(e){Gp.set(e[kt],e)}function jd(e){Gp.delete(e[kt])}var Jm="__ngContext__";function ei(e,n){qt(n)?(e[Jm]=n[kt],ow(n)):e[Jm]=n}function Wp(e){return qp(e[Wr])}function Yp(e){return qp(e[at])}function qp(e){for(;e!==null&&!lt(e);)e=e[at];return e}var Bd;function bu(e){Bd=e}function Zp(){if(Bd!==void 0)return Bd;if(typeof document<"u")return document;throw new E(210,!1)}var Xp="r";var Qp="di";var Kp=!1,Jp=new b("",{factory:()=>Kp});var ep=new WeakMap;function sw(e,n){if(e==null||typeof e!="object")return;let t=ep.get(e);t||(t=new WeakSet,ep.set(e,t)),t.add(n)}var aw=(e,n,t,r)=>{};function lw(e,n,t,r){aw(e,n,t,r)}function Aa(e){return(e.flags&32)===32}var cw=()=>null;function eg(e,n,t=!1){return cw(e,n,t)}function tg(e,n){let t=e.contentQueries;if(t!==null){let r=x(null);try{for(let i=0;i<t.length;i+=2){let o=t[i],s=t[i+1];if(s!==-1){let a=e.data[s];Yi(o),a.contentQueries(2,n[s],s)}}}finally{x(r)}}}function Hd(e,n,t){Yi(0);let r=x(null);try{n(e,t)}finally{x(r)}}function ng(e,n,t){if(Kc(n)){let r=x(null);try{let i=n.directiveStart,o=n.directiveEnd;for(let s=i;s<o;s++){let a=e.data[s];if(a.contentQueries){let l=t[s];a.contentQueries(1,l,s)}}}finally{x(r)}}}var xt=(function(e){return e[e.Emulated=0]="Emulated",e[e.None=2]="None",e[e.ShadowDom=3]="ShadowDom",e[e.ExperimentalIsolatedShadowDom=4]="ExperimentalIsolatedShadowDom",e})(xt||{});var oa;function dw(){if(oa===void 0&&(oa=null,Br.trustedTypes))try{oa=Br.trustedTypes.createPolicy("angular",{createHTML:e=>e,createScript:e=>e,createScriptURL:e=>e})}catch(e){}return oa}function Na(e){return dw()?.createHTML(e)||e}var Qt=class{changingThisBreaksApplicationSecurity;constructor(n){this.changingThisBreaksApplicationSecurity=n}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Ps})`}},Ud=class extends Qt{getTypeName(){return"HTML"}},zd=class extends Qt{getTypeName(){return"Style"}},$d=class extends Qt{getTypeName(){return"Script"}},Gd=class extends Qt{getTypeName(){return"URL"}},Wd=class extends Qt{getTypeName(){return"ResourceURL"}};function Jt(e){return e instanceof Qt?e.changingThisBreaksApplicationSecurity:e}function vr(e,n){let t=rg(e);if(t!=null&&t!==n){if(t==="ResourceURL"&&n==="URL")return!0;throw new Error(`Required a safe ${n}, got a ${t} (see ${Ps})`)}return t===n}function rg(e){return e instanceof Qt&&e.getTypeName()||null}function _u(e){return new Ud(e)}function Du(e){return new zd(e)}function wu(e){return new $d(e)}function Eu(e){return new Gd(e)}function Cu(e){return new Wd(e)}function uw(e){let n=new qd(e);return fw()?new Yd(n):n}var Yd=class{inertDocumentHelper;constructor(n){this.inertDocumentHelper=n}getInertBodyElement(n){n="<body><remove></remove>"+n;try{let t=new window.DOMParser().parseFromString(Na(n),"text/html").body;return t===null?this.inertDocumentHelper.getInertBodyElement(n):(t.firstChild?.remove(),t)}catch(t){return null}}},qd=class{defaultDoc;inertDocument;constructor(n){this.defaultDoc=n,this.inertDocument=this.defaultDoc.implementation.createHTMLDocument("sanitization-inert")}getInertBodyElement(n){let t=this.inertDocument.createElement("template");return t.innerHTML=Na(n),t}};function fw(){try{return!!new window.DOMParser().parseFromString(Na(""),"text/html")}catch(e){return!1}}var hw=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;function Ra(e){return e=String(e),e.match(hw)?e:"unsafe:"+e}function en(e){let n={};for(let t of e.split(","))n[t]=!0;return n}function co(...e){let n={};for(let t of e)for(let r in t)t.hasOwnProperty(r)&&(n[r]=!0);return n}var ig=en("area,br,col,hr,img,wbr"),og=en("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),sg=en("rp,rt"),mw=co(sg,og),pw=co(og,en("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")),gw=co(sg,en("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")),tp=co(ig,pw,gw,mw),ag=en("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),vw=en("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"),yw=en("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"),bw=co(ag,vw,yw),_w=en("script,style,template"),Zd=class{sanitizedSomething=!1;buf=[];sanitizeChildren(n){let t=n.firstChild,r=!0,i=[];for(;t;){if(t.nodeType===Node.ELEMENT_NODE?r=this.startElement(t):t.nodeType===Node.TEXT_NODE?this.chars(t.nodeValue):this.sanitizedSomething=!0,r&&t.firstChild){i.push(t),t=Ew(t);continue}for(;t;){t.nodeType===Node.ELEMENT_NODE&&this.endElement(t);let o=ww(t);if(o){t=o;break}t=i.pop()}}return this.buf.join("")}startElement(n){let t=np(n).toLowerCase();if(!tp.hasOwnProperty(t))return this.sanitizedSomething=!0,!_w.hasOwnProperty(t);this.buf.push("<"),this.buf.push(t);let r=n.attributes;for(let i=0;i<r.length;i++){let o=r.item(i),s=o.name,a=s.toLowerCase();if(!bw.hasOwnProperty(a)){this.sanitizedSomething=!0;continue}let l=o.value;ag[a]&&(l=Ra(l)),this.buf.push(" ",s,'="',rp(l),'"')}return this.buf.push(">"),!0}endElement(n){let t=np(n).toLowerCase();tp.hasOwnProperty(t)&&!ig.hasOwnProperty(t)&&(this.buf.push("</"),this.buf.push(t),this.buf.push(">"))}chars(n){this.buf.push(rp(n))}};function Dw(e,n){return(e.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_CONTAINED_BY)!==Node.DOCUMENT_POSITION_CONTAINED_BY}function ww(e){let n=e.nextSibling;if(n&&e!==n.previousSibling)throw lg(n);return n}function Ew(e){let n=e.firstChild;if(n&&Dw(e,n))throw lg(n);return n}function np(e){let n=e.nodeName;return typeof n=="string"?n:"FORM"}function lg(e){return new Error(`Failed to sanitize html because the element is clobbered: ${e.outerHTML}`)}var Cw=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,xw=/([^\#-~ |!])/g;function rp(e){return e.replace(/&/g,"&amp;").replace(Cw,function(n){let t=n.charCodeAt(0),r=n.charCodeAt(1);return"&#"+((t-55296)*1024+(r-56320)+65536)+";"}).replace(xw,function(n){return"&#"+n.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}var sa;function xu(e,n){let t=null;try{sa=sa||uw(e);let r=n?String(n):"";t=sa.getInertBodyElement(r);let i=5,o=r;do{if(i===0)throw new Error("Failed to sanitize html because the input is unstable");i--,r=o,o=t.innerHTML,t=sa.getInertBodyElement(r)}while(r!==o);let a=new Zd().sanitizeChildren(ip(t)||t);return Na(a)}finally{if(t){let r=ip(t)||t;for(;r.firstChild;)r.firstChild.remove()}}}function ip(e){return"content"in e&&Iw(e)?e.content:null}function Iw(e){return e.nodeType===Node.ELEMENT_NODE&&e.nodeName==="TEMPLATE"}function Sw(e,n){return e.createText(n)}function Mw(e,n,t){e.setValue(n,t)}function cg(e,n,t){return e.createElement(n,t)}function ya(e,n,t,r,i){e.insertBefore(n,t,r,i)}function dg(e,n,t){e.appendChild(n,t)}function op(e,n,t,r,i){r!==null?ya(e,n,t,r,i):dg(e,n,t)}function ug(e,n,t,r){e.removeChild(null,n,t,r)}function Tw(e,n,t){e.setAttribute(n,"style",t)}function Aw(e,n,t){t===""?e.removeAttribute(n,"class"):e.setAttribute(n,"class",t)}function fg(e,n,t){let{mergedAttrs:r,classes:i,styles:o}=t;r!==null&&$D(e,n,r),i!==null&&Aw(e,n,i),o!==null&&Tw(e,n,o)}var Ke=(function(e){return e[e.NONE=0]="NONE",e[e.HTML=1]="HTML",e[e.STYLE=2]="STYLE",e[e.SCRIPT=3]="SCRIPT",e[e.URL=4]="URL",e[e.RESOURCE_URL=5]="RESOURCE_URL",e[e.ATTRIBUTE_NO_BINDING=6]="ATTRIBUTE_NO_BINDING",e})(Ke||{});function Nw(e,n,t){let r=e.length;for(;;){let i=e.indexOf(n,t);if(i===-1)return i;if(i===0||e.charCodeAt(i-1)<=32){let o=n.length;if(i+o===r||e.charCodeAt(i+o)<=32)return i}t=i+1}}var hg="ng-template";function Rw(e,n,t,r){let i=0;if(r){for(;i<n.length&&typeof n[i]=="string";i+=2)if(n[i]==="class"&&Nw(n[i+1].toLowerCase(),t,0)!==-1)return!0}else if(Iu(e))return!1;if(i=n.indexOf(1,i),i>-1){let o;for(;++i<n.length&&typeof(o=n[i])=="string";)if(o.toLowerCase()===t)return!0}return!1}function Iu(e){return e.type===4&&e.value!==hg}function kw(e,n,t){let r=e.type===4&&!t?hg:e.value;return n===r}function Ow(e,n,t){let r=4,i=e.attrs,o=i!==null?Lw(i):0,s=!1;for(let a=0;a<n.length;a++){let l=n[a];if(typeof l=="number"){if(!s&&!Et(r)&&!Et(l))return!1;if(s&&Et(l))continue;s=!1,r=l|r&1;continue}if(!s)if(r&4){if(r=2|r&1,l!==""&&!kw(e,l,t)||l===""&&n.length===1){if(Et(r))return!1;s=!0}}else if(r&8){if(i===null||!Rw(e,i,l,t)){if(Et(r))return!1;s=!0}}else{let c=n[++a],d=Fw(l,i,Iu(e),t);if(d===-1){if(Et(r))return!1;s=!0;continue}if(c!==""){let u;if(d>o?u="":u=i[d+1].toLowerCase(),r&2&&c!==u){if(Et(r))return!1;s=!0}}}}return Et(r)||s}function Et(e){return(e&1)===0}function Fw(e,n,t,r){if(n===null)return-1;let i=0;if(r||!t){let o=!1;for(;i<n.length;){let s=n[i];if(s===e)return i;if(s===3||s===6)o=!0;else if(s===1||s===2){let a=n[++i];for(;typeof a=="string";)a=n[++i];continue}else{if(s===4)break;if(s===0){i+=4;continue}}i+=o?1:2}return-1}else return Vw(n,e)}function mg(e,n,t=!1){for(let r=0;r<n.length;r++)if(Ow(e,n[r],t))return!0;return!1}function Pw(e){let n=e.attrs;if(n!=null){let t=n.indexOf(5);if((t&1)===0)return n[t+1]}return null}function Lw(e){for(let n=0;n<e.length;n++){let t=e[n];if(kp(t))return n}return e.length}function Vw(e,n){let t=e.indexOf(4);if(t>-1)for(t++;t<e.length;){let r=e[t];if(typeof r=="number")return-1;if(r===n)return t;t++}return-1}function jw(e,n){e:for(let t=0;t<n.length;t++){let r=n[t];if(e.length===r.length){for(let i=0;i<e.length;i++)if(e[i]!==r[i])continue e;return!0}}return!1}function sp(e,n){return e?":not("+n.trim()+")":n}function Bw(e){let n=e[0],t=1,r=2,i="",o=!1;for(;t<e.length;){let s=e[t];if(typeof s=="string")if(r&2){let a=e[++t];i+="["+s+(a.length>0?'="'+a+'"':"")+"]"}else r&8?i+="."+s:r&4&&(i+=" "+s);else i!==""&&!Et(s)&&(n+=sp(o,i),i=""),r=s,o=o||!Et(r);t++}return i!==""&&(n+=sp(o,i)),n}function Hw(e){return e.map(Bw).join(",")}function Uw(e){let n=[],t=[],r=1,i=2;for(;r<e.length;){let o=e[r];if(typeof o=="string")i===2?o!==""&&n.push(o,e[++r]):i===8&&t.push(o);else{if(!Et(i))break;i=o}r++}return t.length&&n.push(1,...t),n}var ht={},Vt=(function(e){return e[e.Important=1]="Important",e[e.DashCase=2]="DashCase",e})(Vt||{}),zw;function Su(e,n){return zw(e,n)}var LF=typeof document<"u"&&typeof document?.documentElement?.getAnimations=="function";var Xd=new WeakMap;function pg(e){return e?e[bn]??e:null}var Ki=new WeakSet;function $w(e,n,t){let r=Xd.get(e);if(!r||r.length===0)return;let i=n.parentNode,o=n.previousSibling,s=pg(t);for(let a=r.length-1;a>=0;a--){let{el:l,declarationView:c}=r[a],d=l.parentNode;l===n?(r.splice(a,1),Ki.add(l),l.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}}))):o&&l===o?(r.splice(a,1),l.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}})),l.parentNode?.removeChild(l)):d&&i&&d!==i&&(s===null||c===null||s===c)&&(r.splice(a,1),l.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}})),l.parentNode?.removeChild(l))}}function Gw(e,n,t){let r=pg(t),i=Xd.get(e);i?i.some(o=>o.el===n)||i.push({el:n,declarationView:r}):Xd.set(e,[{el:n,declarationView:r}])}var Sn=new Set,ka=(function(e){return e[e.CHANGE_DETECTION=0]="CHANGE_DETECTION",e[e.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",e})(ka||{}),jt=new b(""),ap=new Set;function Tn(e){ap.has(e)||(ap.add(e),performance?.mark?.("mark_feature_usage",{detail:{feature:e}}))}var Oa=(()=>{class e{impl=null;execute(){this.impl?.execute()}static \u0275prov=P({token:e,providedIn:"root",factory:()=>new e})}return e})(),Mu=[0,1,2,3],Tu=(()=>{class e{ngZone=f(A);scheduler=f(Tt);errorHandler=f(Ge,{optional:!0});sequences=new Set;deferredRegistrations=new Set;executing=!1;constructor(){f(jt,{optional:!0})}execute(){let t=this.sequences.size>0;t&&K(Z.AfterRenderHooksStart),this.executing=!0;for(let r of Mu)for(let i of this.sequences)if(!(i.erroredOrDestroyed||!i.hooks[r]))try{i.pipelinedValue=this.ngZone.runOutsideAngular(()=>this.maybeTrace(()=>{let o=i.hooks[r];return o(i.pipelinedValue)},i.snapshot))}catch(o){i.erroredOrDestroyed=!0,this.errorHandler?.handleError(o)}this.executing=!1;for(let r of this.sequences)r.afterRun(),r.once&&(this.sequences.delete(r),r.destroy());for(let r of this.deferredRegistrations)this.sequences.add(r);this.deferredRegistrations.size>0&&this.scheduler.notify(7),this.deferredRegistrations.clear(),t&&K(Z.AfterRenderHooksEnd)}register(t){let{view:r}=t;r!==void 0?((r[nr]??=[]).push(t),or(r),r[M]|=8192):this.executing?this.deferredRegistrations.add(t):this.addSequence(t)}addSequence(t){this.sequences.add(t),this.scheduler.notify(7)}unregister(t){this.executing&&this.sequences.has(t)?(t.erroredOrDestroyed=!0,t.pipelinedValue=void 0,t.once=!0):(this.sequences.delete(t),this.deferredRegistrations.delete(t))}maybeTrace(t,r){return r?r.run(ka.AFTER_NEXT_RENDER,t):t()}static \u0275prov=P({token:e,providedIn:"root",factory:()=>new e})}return e})(),no=class{impl;hooks;view;once;snapshot;erroredOrDestroyed=!1;pipelinedValue=void 0;unregisterOnDestroy;constructor(n,t,r,i,o,s=null){this.impl=n,this.hooks=t,this.view=r,this.once=i,this.snapshot=s,this.unregisterOnDestroy=o?.onDestroy(()=>this.destroy())}afterRun(){this.erroredOrDestroyed=!1,this.pipelinedValue=void 0,this.snapshot?.dispose(),this.snapshot=null}destroy(){this.impl.unregister(this),this.unregisterOnDestroy?.();let n=this.view?.[nr];n&&(this.view[nr]=n.filter(t=>t!==this))}};function oi(e,n){let t=n?.injector??f(J);return Tn("NgAfterNextRender"),Yw(e,t,n,!0)}function Ww(e){return e instanceof Function?[void 0,void 0,e,void 0]:[e.earlyRead,e.write,e.mixedReadWrite,e.read]}function Yw(e,n,t,r){let i=n.get(Oa);i.impl??=n.get(Tu);let o=n.get(jt,null,{optional:!0}),s=t?.manualCleanup!==!0?n.get(Qe):null,a=n.get(Zr,null,{optional:!0}),l=new no(i.impl,Ww(e),a?.view,r,s,o?.snapshot(null));return i.impl.register(l),l}var Au=new b("",{factory:()=>{let e=f(Ee),n=new Set;return e.onDestroy(()=>n.clear()),{queue:n,isScheduled:!1,scheduler:null,injector:e}}});function gg(e,n,t){let r=e.get(Au);if(Array.isArray(n))for(let i of n)r.queue.add(i),t?.detachedLeaveAnimationFns?.push(i);else r.queue.add(n),t?.detachedLeaveAnimationFns?.push(n);r.scheduler&&r.scheduler(e)}function qw(e,n){let t=e.get(Au);if(Array.isArray(n))for(let r of n)t.queue.delete(r);else t.queue.delete(n)}function Zw(e,n){let t=e.get(Au);if(n.detachedLeaveAnimationFns){for(let r of n.detachedLeaveAnimationFns)t.queue.delete(r);n.detachedLeaveAnimationFns=void 0}}function Xw(e,n){for(let[t,r]of n)gg(e,r.animateFns)}function lp(e,n,t,r){let i=e?.[Ot]?.enter;n!==null&&i&&i.has(t.index)&&Xw(r,i)}function cp(e,n,t,r){try{t.get(Ui)}catch(s){return r(!1)}let i=e?.[Ot];i?.enter?.has(n.index)&&qw(t,i.enter.get(n.index).animateFns);let o=Qw(e,n,i);if(o.size===0){let s=!1;if(e){let a=[];Fa(e,n,a),s=a.length>0}if(!s)return r(!1)}e&&Sn.add(e[kt]),gg(t,()=>Kw(e,n,i||void 0,o,r),i||void 0)}function Qw(e,n,t){let r=new Map,i=t?.leave;if(i&&i.has(n.index)&&r.set(n.index,i.get(n.index)),e&&i)for(let[o,s]of i){if(r.has(o))continue;let l=e[I].data[o].parent;for(;l;){if(l===n){r.set(o,s);break}l=l.parent}}return r}function Kw(e,n,t,r,i){let o=[];if(t&&t.leave)for(let[s]of r){if(!t.leave.has(s))continue;let a=t.leave.get(s);for(let l of a.animateFns){let{promise:c}=l();o.push(c)}t.detachedLeaveAnimationFns=void 0}if(e&&Fa(e,n,o),o.length>0){let s=t||e?.[Ot];if(s){let a=s.running;a&&o.push(a),s.running=Promise.allSettled(o),eE(e,s.running,i)}else Promise.allSettled(o).then(()=>{e&&Sn.delete(e[kt]),i(!0)})}else e&&Sn.delete(e[kt]),i(!1)}function Fa(e,n,t){if(n.type&12){let i=e[n.index];if(lt(i))for(let o=ve;o<i.length;o++){let s=i[o];s[I].type===2&&Jw(s,t)}}let r=n.child;for(;r;)Fa(e,r,t),r=r.next}function Jw(e,n){let t=e[Ot];if(t&&t.leave)for(let i of t.leave.values())for(let o of i.animateFns){let{promise:s}=o();n.push(s)}let r=e[I].firstChild;for(;r;)Fa(e,r,n),r=r.next}function eE(e,n,t){n.then(()=>{e[Ot]?.running===n&&(e[Ot].running=void 0,Sn.delete(e[kt])),t(!0)})}function Xr(e,n,t,r,i,o,s,a){if(i!=null){let l,c=!1;lt(i)?l=i:qt(i)&&(c=!0,i=i[wt]);let d=ct(i);e===0&&r!==null?(lp(a,r,o,t),s==null?dg(n,r,d):ya(n,r,d,s||null,!0)):e===1&&r!==null?(lp(a,r,o,t),ya(n,r,d,s||null,!0),$w(o,d,a)):e===2?(a?.[Ot]?.leave?.has(o.index)&&Gw(o,d,a),Ki.delete(d),cp(a,o,t,u=>{if(Ki.has(d)){Ki.delete(d);return}ug(n,d,c,u)})):e===3&&(Ki.delete(d),cp(a,o,t,()=>{n.destroyNode(d)})),l!=null&&dE(n,e,t,l,o,r,s)}}function tE(e,n){vg(e,n),n[wt]=null,n[We]=null}function nE(e,n,t,r,i,o){r[wt]=i,r[We]=n,La(e,r,t,1,i,o)}function vg(e,n){n[Nt].changeDetectionScheduler?.notify(9),La(e,n,n[ce],2,null,null)}function rE(e){let n=e[Wr];if(!n)return Sd(e[I],e);for(;n;){let t=null;if(qt(n))t=n[Wr];else{let r=n[ve];r&&(t=r)}if(!t){for(;n&&!n[at]&&n!==e;)qt(n)&&Sd(n[I],n),n=n[Oe];n===null&&(n=e),qt(n)&&Sd(n[I],n),t=n&&n[at]}n=t}}function Nu(e,n){let t=e[rr],r=t.indexOf(n);t.splice(r,1)}function Pa(e,n){if(ir(n))return;let t=n[ce];t.destroyNode&&La(e,n,t,3,null,null),rE(n)}function Sd(e,n){if(ir(n))return;let t=x(null);try{n[M]&=-129,n[M]|=256,n[nt]&&dn(n[nt]),oE(e,n),iE(e,n),n[I].type===1&&n[ce].destroy();let r=n[_n];if(r!==null&&lt(n[Oe])){r!==n[Oe]&&Nu(r,n);let i=n[Rt];i!==null&&i.detachView(e)}jd(n)}finally{x(t)}}function iE(e,n){let t=e.cleanup,r=n[Gr];if(t!==null)for(let s=0;s<t.length-1;s+=2)if(typeof t[s]=="string"){let a=t[s+3];a>=0?r[a]():r[-a].unsubscribe(),s+=2}else{let a=r[t[s+1]];t[s].call(a)}r!==null&&(n[Gr]=null);let i=n[Wt];if(i!==null){n[Wt]=null;for(let s=0;s<i.length;s++){let a=i[s];a()}}let o=n[pn];if(o!==null){n[pn]=null;for(let s of o)s.destroy()}}function oE(e,n){let t;if(e!=null&&(t=e.destroyHooks)!=null)for(let r=0;r<t.length;r+=2){let i=n[t[r]];if(!(i instanceof fr)){let o=t[r+1];if(Array.isArray(o))for(let s=0;s<o.length;s+=2){let a=i[o[s]],l=o[s+1];K(Z.LifecycleHookStart,a,l);try{l.call(a)}finally{K(Z.LifecycleHookEnd,a,l)}}else{K(Z.LifecycleHookStart,i,o);try{o.call(i)}finally{K(Z.LifecycleHookEnd,i,o)}}}}}function yg(e,n,t){return sE(e,n.parent,t)}function sE(e,n,t){let r=n;for(;r!==null&&r.type&168;)n=r,r=n.parent;if(r===null)return t[wt];if(Zt(r)){let{encapsulation:i}=e.data[r.directiveStart+r.componentOffset];if(i===xt.None||i===xt.Emulated)return null}return dt(r,t)}function bg(e,n,t){return lE(e,n,t)}function aE(e,n,t){return e.type&40?dt(e,t):null}var lE=aE,dp;function Ru(e,n,t,r){let i=yg(e,r,n),o=n[ce],s=r.parent||n[We],a=bg(s,r,n);if(i!=null)if(Array.isArray(t))for(let l=0;l<t.length;l++)op(o,i,t[l],a,!1);else op(o,i,t,a,!1);dp!==void 0&&dp(o,r,n,t,i)}function Ji(e,n){if(n!==null){let t=n.type;if(t&3)return dt(n,e);if(t&4)return Qd(-1,e[n.index]);if(t&8){let r=n.child;if(r!==null)return Ji(e,r);{let i=e[n.index];return lt(i)?Qd(-1,i):ct(i)}}else{if(t&128)return Ji(e,n.next);if(t&32)return Su(n,e)()||ct(e[n.index]);{let r=_g(e,n);if(r!==null){if(Array.isArray(r))return r[0];let i=Yt(e[Xe]);return Ji(i,r)}else return Ji(e,n.next)}}}return null}function _g(e,n){if(n!==null){let r=e[Xe][We],i=n.projection;return r.projection[i]}return null}function Qd(e,n){let t=ve+e+1;if(t<n.length){let r=n[t],i=r[I].firstChild;if(i!==null)return Ji(r,i)}return n[Dn]}function ku(e,n,t,r,i,o,s){for(;t!=null;){let a=r[At];if(t.type===128){t=t.next;continue}let l=r[t.index],c=t.type;if(s&&n===0&&(l&&ei(ct(l),r),t.flags|=2),!Aa(t))if(c&8)ku(e,n,t.child,r,i,o,!1),Xr(n,e,a,i,l,t,o,r);else if(c&32){let d=Su(t,r),u;for(;u=d();)Xr(n,e,a,i,u,t,o,r);Xr(n,e,a,i,l,t,o,r)}else c&16?Dg(e,n,r,t,i,o):Xr(n,e,a,i,l,t,o,r);t=s?t.projectionNext:t.next}}function La(e,n,t,r,i,o){ku(t,r,e.firstChild,n,i,o,!1)}function cE(e,n,t){let r=n[ce],i=yg(e,t,n),o=t.parent||n[We],s=bg(o,t,n);Dg(r,0,n,t,i,s)}function Dg(e,n,t,r,i,o){let s=t[Xe],l=s[We].projection[r.projection];if(Array.isArray(l))for(let c=0;c<l.length;c++){let d=l[c];Xr(n,e,t[At],i,d,r,o,t)}else{let c=l,d=s[Oe];$p(r)&&(c.flags|=128),ku(e,n,c,d,i,o,!0)}}function dE(e,n,t,r,i,o,s){let a=r[Dn],l=ct(r);a!==l&&Xr(n,e,t,o,a,i,s);for(let c=ve;c<r.length;c++){let d=r[c];La(d[I],d,e,n,o,a)}}function uE(e,n,t,r,i){if(n)i?e.addClass(t,r):e.removeClass(t,r);else{let o=r.indexOf("-")===-1?void 0:Vt.DashCase;i==null?e.removeStyle(t,r,o):(typeof i=="string"&&i.endsWith("!important")&&(i=i.slice(0,-10),o|=Vt.Important),e.setStyle(t,r,i,o))}}function Ou(e,n,t,r,i,o,s,a,l,c,d){let u=ge+r,m=u+i,h=fE(u,m),p=typeof c=="function"?c():c;return h[I]={type:e,blueprint:h,template:t,queries:null,viewQuery:a,declTNode:n,data:h.slice().fill(null,u),bindingStartIndex:u,expandoStartIndex:m,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof o=="function"?o():o,pipeRegistry:typeof s=="function"?s():s,firstChild:null,schemas:l,consts:p,incompleteFirstPass:!1,ssrId:d}}function fE(e,n){let t=[];for(let r=0;r<n;r++)t.push(r<e?null:ht);return t}function hE(e){let n=e.tView;return n===null||n.incompleteFirstPass?e.tView=Ou(1,null,e.template,e.decls,e.vars,e.directiveDefs,e.pipeDefs,e.viewQuery,e.schemas,e.consts,e.id):n}function Fu(e,n,t,r,i,o,s,a,l,c,d){let u=n.blueprint.slice();return u[wt]=i,u[M]=r|4|128|8|64|1024,(c!==null||e&&e[M]&2048)&&(u[M]|=2048),rd(u),u[Oe]=u[bn]=e,u[Ce]=t,u[Nt]=s||e&&e[Nt],u[ce]=a||e&&e[ce],u[At]=l||e&&e[At]||null,u[We]=o,u[kt]=iw(),u[er]=d,u[Xc]=c,u[Xe]=n.type==2?e[Xe]:u,u}function mE(e,n,t){let r=dt(n,e),i=hE(t),o=e[Nt].rendererFactory,s=Pu(e,Fu(e,i,null,wg(t),r,n,null,o.createRenderer(r,t),null,null,null));return e[n.index]=s}function wg(e){let n=16;return e.signals?n=4096:e.onPush&&(n=64),n}function Eg(e,n,t,r){if(t===0)return-1;let i=n.length;for(let o=0;o<t;o++)n.push(r),e.blueprint.push(r),e.data.push(null);return i}function Pu(e,n){return e[Wr]?e[Zc][at]=n:e[Wr]=n,e[Zc]=n,n}function y(e=1){Cg(ye(),N(),Xt()+e,!1)}function Cg(e,n,t,r){if(!r)if((n[M]&3)===3){let o=e.preOrderCheckHooks;o!==null&&la(n,o,t)}else{let o=e.preOrderHooks;o!==null&&ca(n,o,0,t)}wn(t)}var Va=(function(e){return e[e.None=0]="None",e[e.SignalBased=1]="SignalBased",e[e.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",e})(Va||{});function hr(e,n,t,r){let i=x(null);try{let[o,s,a]=e.inputs[t],l=null;(s&Va.SignalBased)!==0&&(l=n[o][ke]),l!==null&&l.transformFn!==void 0?r=l.transformFn(r):a!==null&&(r=a.call(n,r)),e.setInput!==null?e.setInput(n,l,r,t,o):Mp(n,l,o,r)}finally{x(i)}}function xg(e,n,t,r,i){let o=Xt(),s=r&2;try{wn(-1),s&&n.length>ge&&Cg(e,n,ge,!1);let a=s?Z.TemplateUpdateStart:Z.TemplateCreateStart;K(a,i,t),t(r,i)}finally{wn(o);let a=s?Z.TemplateUpdateEnd:Z.TemplateCreateEnd;K(a,i,t)}}function Lu(e,n,t){DE(e,n,t),(t.flags&64)===64&&wE(e,n,t)}function ja(e,n,t=dt){let r=n.localNames;if(r!==null){let i=n.index+1;for(let o=0;o<r.length;o+=2){let s=r[o+1],a=s===-1?t(n,e):e[s];e[i++]=a}}}function pE(e,n,t,r){let o=r.get(Jp,Kp)||t===xt.ShadowDom||t===xt.ExperimentalIsolatedShadowDom,s=e.selectRootElement(n,o);return gE(s),s}function gE(e){vE(e)}var vE=()=>null;function yE(e){return e==="class"?"className":e==="for"?"htmlFor":e==="formaction"?"formAction":e==="innerHtml"?"innerHTML":e==="readonly"?"readOnly":e==="tabindex"?"tabIndex":e}function bE(e,n,t,r,i,o){let s=n[I];if(Vu(e,s,n,t,r)){Zt(e)&&_E(n,e.index);return}e.type&3&&(t=yE(t)),Ig(e,n,t,r,i,o)}function Ig(e,n,t,r,i,o){if(e.type&3){let s=dt(e,n);r=o!=null?o(r,e.value||"",t):r,i.setProperty(s,t,r)}else e.type&12}function _E(e,n){let t=ut(n,e);t[M]&16||(t[M]|=64)}function DE(e,n,t){let r=t.directiveStart,i=t.directiveEnd;Zt(t)&&mE(n,t,e.data[r+t.componentOffset]),e.firstCreatePass||ga(t,n);let o=t.initialInputs;for(let s=r;s<i;s++){let a=e.data[s],l=to(n,e,s,t);if(ei(l,n),o!==null&&IE(n,s-r,l,a,t,o),Ft(a)){let c=ut(t.index,n);c[Ce]=to(n,e,s,t)}}}function wE(e,n,t){let r=t.directiveStart,i=t.directiveEnd,o=t.index,s=Rm();try{wn(o);for(let a=r;a<i;a++){let l=e.data[a],c=n[a];Xs(a),(l.hostBindings!==null||l.hostVars!==0||l.hostAttrs!==null)&&EE(l,c)}}finally{wn(-1),Xs(s)}}function EE(e,n){e.hostBindings!==null&&e.hostBindings(1,n)}function Sg(e,n){let t=e.directiveRegistry,r=null;if(t)for(let i=0;i<t.length;i++){let o=t[i];mg(n,o.selectors,!1)&&(r??=[],Ft(o)?r.unshift(o):r.push(o))}return r}function CE(e,n,t,r,i,o){let s=dt(e,n);xE(n[ce],s,o,e.value,t,r,i)}function xE(e,n,t,r,i,o,s){if(o==null)s?.(o,r||"",i),e.removeAttribute(n,i,t);else{let a=s==null?Hc(o):s(o,r||"",i);e.setAttribute(n,i,a,t)}}function IE(e,n,t,r,i,o){let s=o[n];if(s!==null)for(let a=0;a<s.length;a+=2){let l=s[a],c=s[a+1];hr(r,t,l,c)}}function Mg(e,n,t,r,i){let o=ge+t,s=n[I],a=i(s,n,e,r,t);n[o]=a,qr(e,!0);let l=e.type===2;return l?(fg(n[ce],a,e),(Cm()===0||Gi(e))&&ei(a,n),xm()):ei(a,n),ta()&&(!l||!Aa(e))&&Ru(s,n,a,e),e}function Tg(e){let n=e;return hd()?md():(n=n.parent,qr(n,!1)),n}function SE(e,n){let t=e[At];if(!t)return;let r;try{r=t.get(En,null)}catch(i){r=null}r?.(n)}function Vu(e,n,t,r,i){let o=e.inputs?.[r],s=e.hostDirectiveInputs?.[r],a=!1;if(s)for(let l=0;l<s.length;l+=2){let c=s[l],d=s[l+1],u=n.data[c];hr(u,t[c],d,i),a=!0}if(o)for(let l of o){let c=t[l],d=n.data[l];hr(d,c,r,i),a=!0}return a}function ME(e,n,t,r,i,o){let s=null,a=null,l=null,c=!1,d=e.directiveToIndex.get(r.type);if(typeof d=="number"?s=d:[s,a,l]=d,a!==null&&l!==null&&e.hostDirectiveInputs?.hasOwnProperty(i)){let u=e.hostDirectiveInputs[i];for(let m=0;m<u.length;m+=2){let h=u[m];if(h>=a&&h<=l){let p=n.data[h],_=u[m+1];hr(p,t[h],_,o),c=!0}else if(h>l)break}}return s!==null&&r.inputs.hasOwnProperty(i)&&(hr(r,t[s],i,o),c=!0),c}function TE(e,n){let t=ut(n,e),r=t[I];AE(r,t);let i=t[wt];i!==null&&t[er]===null&&(t[er]=eg(i,t[At])),K(Z.ComponentStart);try{ju(r,t,t[Ce])}finally{K(Z.ComponentEnd,t[Ce])}}function AE(e,n){for(let t=n.length;t<e.blueprint.length;t++)n.push(e.blueprint[t])}function ju(e,n,t){Ks(n);try{let r=e.viewQuery;r!==null&&Hd(1,r,t);let i=e.template;i!==null&&xg(e,n,i,1,t),e.firstCreatePass&&(e.firstCreatePass=!1),n[Rt]?.finishViewCreation(e),e.staticContentQueries&&tg(e,n),e.staticViewQueries&&Hd(2,e.viewQuery,t);let o=e.components;o!==null&&NE(n,o)}catch(r){throw e.firstCreatePass&&(e.incompleteFirstPass=!0,e.firstCreatePass=!1),r}finally{n[M]&=-5,Js()}}function NE(e,n){for(let t=0;t<n.length;t++)TE(e,n[t])}function uo(e,n,t,r){let i=x(null);try{let o=n.tView,a=e[M]&4096?4096:16,l=Fu(e,o,t,a,null,n,null,null,r?.injector??null,r?.embeddedViewInjector??null,r?.dehydratedView??null),c=e[n.index];l[_n]=c;let d=e[Rt];return d!==null&&(l[Rt]=d.createEmbeddedView(o)),ju(o,l,t),l}finally{x(i)}}function ti(e,n){return!n||n.firstChild===null||$p(e)}function ro(e,n,t,r,i=!1){for(;t!==null;){if(t.type===128){t=i?t.projectionNext:t.next;continue}let o=n[t.index];o!==null&&r.push(ct(o)),lt(o)&&Ag(o,r);let s=t.type;if(s&8)ro(e,n,t.child,r);else if(s&32){let a=Su(t,n),l;for(;l=a();)r.push(l)}else if(s&16){let a=_g(n,t);if(Array.isArray(a))r.push(...a);else{let l=Yt(n[Xe]);ro(l[I],l,a,r,!0)}}t=i?t.projectionNext:t.next}return r}function Ag(e,n){for(let t=ve;t<e.length;t++){let r=e[t],i=r[I].firstChild;i!==null&&ro(r[I],r,i,n)}e[Dn]!==e[wt]&&n.push(e[Dn])}function Ng(e){if(e[nr]!==null){for(let n of e[nr])n.impl.addSequence(n);e[nr].length=0}}var Rg=[];function RE(e){return e[nt]??kE(e)}function kE(e){let n=Rg.pop()??Object.create(FE);return n.lView=e,n}function OE(e){e.lView[nt]!==e&&(e.lView=null,Rg.push(e))}var FE=H(D({},Bn),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:e=>{or(e.lView)},consumerOnSignalRead(){this.lView[nt]=this}});function PE(e){let n=e[nt]??Object.create(LE);return n.lView=e,n}var LE=H(D({},Bn),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:e=>{let n=Yt(e.lView);for(;n&&!kg(n[I]);)n=Yt(n);n&&id(n)},consumerOnSignalRead(){this.lView[nt]=this}});function kg(e){return e.type!==2}function Og(e){if(e[pn]===null)return;let n=!0;for(;n;){let t=!1;for(let r of e[pn])r.dirty&&(t=!0,r.zone===null||Zone.current===r.zone?r.run():r.zone.run(()=>r.run()));n=t&&!!(e[M]&8192)}}var VE=100;function Fg(e,n=0){let r=e[Nt].rendererFactory,i=!1;i||r.begin?.();try{jE(e,n)}finally{i||r.end?.()}}function jE(e,n){let t=pd();try{Vi(!0),Kd(e,n);let r=0;for(;Wi(e);){if(r===VE)throw new E(103,!1);r++,Kd(e,1)}}finally{Vi(t)}}function BE(e,n,t,r){if(ir(n))return;let i=n[M],o=!1,s=!1;Ks(n);let a=!0,l=null,c=null;o||(kg(e)?(c=RE(n),l=cn(c)):Zo()===null?(a=!1,c=PE(n),l=cn(c)):n[nt]&&(dn(n[nt]),n[nt]=null));try{rd(n),Tm(e.bindingStartIndex),t!==null&&xg(e,n,t,2,r);let d=(i&3)===3;if(!o)if(d){let h=e.preOrderCheckHooks;h!==null&&la(n,h,null)}else{let h=e.preOrderHooks;h!==null&&ca(n,h,0,null),xd(n,0)}if(s||HE(n),Og(n),Pg(n,0),e.contentQueries!==null&&tg(e,n),!o)if(d){let h=e.contentCheckHooks;h!==null&&la(n,h)}else{let h=e.contentHooks;h!==null&&ca(n,h,1),xd(n,1)}zE(e,n);let u=e.components;u!==null&&Vg(n,u,0);let m=e.viewQuery;if(m!==null&&Hd(2,m,r),!o)if(d){let h=e.viewCheckHooks;h!==null&&la(n,h)}else{let h=e.viewHooks;h!==null&&ca(n,h,2),xd(n,2)}if(e.firstUpdatePass===!0&&(e.firstUpdatePass=!1),n[Gs]){for(let h of n[Gs])h();n[Gs]=null}o||(Ng(n),n[M]&=-73)}catch(d){throw o||or(n),d}finally{c!==null&&(Un(c,l),a&&OE(c)),Js()}}function Pg(e,n){for(let t=Wp(e);t!==null;t=Yp(t))for(let r=ve;r<t.length;r++){let i=t[r];Lg(i,n)}}function HE(e){for(let n=Wp(e);n!==null;n=Yp(n)){if(!(n[M]&2))continue;let t=n[rr];for(let r=0;r<t.length;r++){let i=t[r];id(i)}}}function UE(e,n,t){K(Z.ComponentStart);let r=ut(n,e);try{Lg(r,t)}finally{K(Z.ComponentEnd,r[Ce])}}function Lg(e,n){Ys(e)&&Kd(e,n)}function Kd(e,n){let r=e[I],i=e[M],o=e[nt],s=!!(n===0&&i&16);if(s||=!!(i&64&&n===0),s||=!!(i&1024),s||=!!(o?.dirty&&Tr(o)),s||=!1,o&&(o.dirty=!1),e[M]&=-9217,s)BE(r,e,r.template,e[Ce]);else if(i&8192){let a=x(null);try{Og(e),Pg(e,1);let l=r.components;l!==null&&Vg(e,l,1),Ng(e)}finally{x(a)}}}function Vg(e,n,t){for(let r=0;r<n.length;r++)UE(e,n[r],t)}function zE(e,n){let t=e.hostBindingOpCodes;if(t!==null)try{for(let r=0;r<t.length;r++){let i=t[r];if(i<0)wn(~i);else{let o=i,s=t[++r],a=t[++r];Nm(s,o);let l=n[o];K(Z.HostBindingsUpdateStart,l);try{a(2,l)}finally{K(Z.HostBindingsUpdateEnd,l)}}}}finally{wn(-1)}}function Bu(e,n){let t=pd()?64:1088;for(e[Nt].changeDetectionScheduler?.notify(n);e;){e[M]|=t;let r=Yt(e);if(Yr(e)&&!r)return e;e=r}return null}function jg(e,n,t,r){return[e,!0,0,n,null,r,null,t,null,null]}function Bg(e,n){let t=ve+n;if(t<e.length)return e[t]}function fo(e,n,t,r=!0){let i=n[I];if($E(i,n,e,t),r){let s=Qd(t,e),a=n[ce],l=a.parentNode(e[Dn]);l!==null&&nE(i,e[We],a,n,l,s)}let o=n[er];o!==null&&o.firstChild!==null&&(o.firstChild=null)}function Hg(e,n){let t=io(e,n);return t!==void 0&&Pa(t[I],t),t}function io(e,n){if(e.length<=ve)return;let t=ve+n,r=e[t];if(r){let i=r[_n];i!==null&&i!==e&&Nu(i,r),n>0&&(e[t-1][at]=r[at]);let o=Hi(e,ve+n);tE(r[I],r);let s=o[Rt];s!==null&&s.detachView(o[I]),r[Oe]=null,r[at]=null,r[M]&=-129}return r}function $E(e,n,t,r){let i=ve+r,o=t.length;r>0&&(t[i-1][at]=n),r<o-ve?(n[at]=t[i],$c(t,ve+r,n)):(t.push(n),n[at]=null),n[Oe]=t;let s=n[_n];s!==null&&t!==s&&Ug(s,n);let a=n[Rt];a!==null&&a.insertView(e),qs(n),n[M]|=128}function Ug(e,n){let t=e[rr],r=n[Oe];if(qt(r))e[M]|=2;else{let i=r[Oe][Xe];n[Xe]!==i&&(e[M]|=2)}t===null?e[rr]=[n]:t.push(n)}var Mn=class{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=!1;exhaustive;get rootNodes(){let n=this._lView,t=n[I];return ro(t,n,t.firstChild,[])}constructor(n,t){this._lView=n,this._cdRefInjectingView=t}get context(){return this._lView[Ce]}set context(n){this._lView[Ce]=n}get destroyed(){return ir(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let n=this._lView[Oe];if(lt(n)){let t=n[$i],r=t?t.indexOf(this):-1;r>-1&&(io(n,r),Hi(t,r))}this._attachedToViewContainer=!1}Pa(this._lView[I],this._lView)}onDestroy(n){Zs(this._lView,n)}markForCheck(){Bu(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[M]&=-129}reattach(){qs(this._lView),this._lView[M]|=128}detectChanges(){this._lView[M]|=1024,Fg(this._lView)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new E(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let n=Yr(this._lView),t=this._lView[_n];t!==null&&!n&&Nu(t,this._lView),vg(this._lView[I],this._lView)}attachToAppRef(n){if(this._attachedToViewContainer)throw new E(902,!1);this._appRef=n;let t=Yr(this._lView),r=this._lView[_n];r!==null&&!t&&Ug(r,this._lView),qs(this._lView)}};var Kt=(()=>{class e{_declarationLView;_declarationTContainer;elementRef;static __NG_ELEMENT_ID__=GE;constructor(t,r,i){this._declarationLView=t,this._declarationTContainer=r,this.elementRef=i}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(t,r){return this.createEmbeddedViewImpl(t,r)}createEmbeddedViewImpl(t,r,i){let o=uo(this._declarationLView,this._declarationTContainer,t,{embeddedViewInjector:r,dehydratedView:i});return new Mn(o)}}return e})();function GE(){return Ba(je(),N())}function Ba(e,n){return e.type&4?new Kt(n,e,ii(e,n)):null}function si(e,n,t,r,i){let o=e.data[n];if(o===null)o=WE(e,n,t,r,i),Am()&&(o.flags|=32);else if(o.type&64){o.type=t,o.value=r,o.attrs=i;let s=Im();o.injectorIndex=s===null?-1:s.injectorIndex}return qr(o,!0),o}function WE(e,n,t,r,i){let o=fd(),s=hd(),a=s?o:o&&o.parent,l=e.data[n]=qE(e,a,t,n,r,i);return YE(e,l,o,s),l}function YE(e,n,t,r){e.firstChild===null&&(e.firstChild=n),t!==null&&(r?t.child==null&&n.parent!==null&&(t.child=n):t.next===null&&(t.next=n,n.prev=t))}function qE(e,n,t,r,i,o){let s=n?n.injectorIndex:-1,a=0;return cd()&&(a|=128),{type:t,index:r,insertBeforeIndex:null,injectorIndex:s,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,controlDirectiveIndex:-1,customControlIndex:-1,propertyBindings:null,flags:a,providerIndexes:0,value:i,namespace:bd(),attrs:o,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:n,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}function ZE(e){let n=e[Qc]??[],r=e[Oe][ce],i=[];for(let o of n)o.data[Qp]!==void 0?i.push(o):XE(o,r);e[Qc]=i}function XE(e,n){let t=0,r=e.firstChild;if(r){let i=e.data[Xp];for(;t<i;){let o=r.nextSibling;ug(n,r,!1),r=o,t++}}}var QE=()=>null,KE=()=>null;function ba(e,n){return QE(e,n)}function zg(e,n,t){return KE(e,n,t)}var $g=class{},Ne=class{},Be=(()=>{class e{destroyNode=null;static __NG_ELEMENT_ID__=()=>JE()}return e})();function JE(){let e=N(),n=je(),t=ut(n.index,e);return(qt(t)?t:e)[ce]}var Gg=(()=>{class e{static \u0275prov=P({token:e,providedIn:"root",factory:()=>null})}return e})();function Wg(e){return e.debugInfo?.className||e.type.name||null}var ua={},_a=class{injector;parentInjector;constructor(n,t){this.injector=n,this.parentInjector=t}get(n,t,r){let i=this.injector.get(n,ua,r);return i!==ua||t===ua?i:this.parentInjector.get(n,t,r)}};function eC(e,n,t){return e[n]=t}function tn(e,n,t){if(t===ht)return!1;let r=e[n];return Object.is(r,t)?!1:(e[n]=t,!0)}function Kr(e,n,t){return function r(i){let o=r.__ngNativeEl__;o!==void 0&&sw(i,o);let s=Zt(e)?ut(e.index,n):n;Bu(s,5);let a=n[Ce],l=up(n,a,t,i),c=r.__ngNextListenerFn__;for(;c;)l=up(n,a,c,i)&&l,c=c.__ngNextListenerFn__;return l}}function up(e,n,t,r){let i=x(null);try{return K(Z.OutputStart,n,t),t(r)!==!1}catch(o){return SE(e,o),!1}finally{K(Z.OutputEnd,n,t),x(i)}}function Yg(e,n,t,r,i,o,s,a){let l=Gi(e),c=!1,d=null;if(!r&&l&&(d=nC(n,t,o,e.index)),d!==null){let u=d.__ngLastListenerFn__||d;u.__ngNextListenerFn__=s,d.__ngLastListenerFn__=s,c=!0}else{let u=dt(e,t),m=r?r(u):u;lw(t,m,o,a),r||(a.__ngNativeEl__=u);let h=i.listen(m,o,a);if(!tC(o)){let p=r?_=>r(ct(_[e.index])):e.index;qg(p,n,t,o,a,h,!1)}}return c}function tC(e){return e.startsWith("animation")||e.startsWith("transition")}function nC(e,n,t,r){let i=e.cleanup;if(i!=null)for(let o=0;o<i.length-1;o+=2){let s=i[o];if(s===t&&i[o+1]===r){let a=n[Gr],l=i[o+2];return a&&a.length>l?a[l]:null}typeof s=="string"&&(o+=2)}return null}function qg(e,n,t,r,i,o,s){let a=n.firstCreatePass?sd(n):null,l=od(t),c=l.length;l.push(i,o),a&&a.push(r,e,c,(c+1)*(s?-1:1))}function fp(e,n,t,r,i){let o=null,s=null,a=null,l=!1,c=e.directiveToIndex.get(t.type);if(typeof c=="number"?o=c:[o,s,a]=c,s!==null&&a!==null&&e.hostDirectiveOutputs?.hasOwnProperty(r)){let d=e.hostDirectiveOutputs[r];for(let u=0;u<d.length;u+=2){let m=d[u];if(m>=s&&m<=a)l=!0,Da(e,n,m,d[u+1],r,i);else if(m>a)break}}return t.outputs.hasOwnProperty(r)&&(l=!0,Da(e,n,o,r,r,i)),l}function Da(e,n,t,r,i,o){let s=n[t],a=n[I],c=a.data[t].outputs[r],u=s[c].subscribe(o);qg(e.index,a,n,i,o,u,!0)}function ue(){rC()}function rC(){let e=N(),n=ye(),t=je();if(n.firstCreatePass&&oC(n,t),t.controlDirectiveIndex===-1)return;Tn("NgSignalForms");let r=e[t.controlDirectiveIndex];n.data[t.controlDirectiveIndex].controlDef.create(r,new wa(e,n,t))}function fe(){iC()}function iC(){let e=N(),n=ye(),t=qi();if(t.controlDirectiveIndex===-1)return;let r=n.data[t.controlDirectiveIndex].controlDef,i=e[t.controlDirectiveIndex];r.update(i,new wa(e,n,t))}var wa=class{lView;tView;tNode;hasPassThrough;constructor(n,t,r){this.lView=n,this.tView=t,this.tNode=r,this.hasPassThrough=!!(r.flags&4096)}get customControl(){return this.tNode.customControlIndex!==-1?this.lView[this.tNode.customControlIndex]:void 0}get nativeElement(){return dt(this.tNode,this.lView)}get descriptor(){return`<${this.tNode.value}>`}listenToCustomControlOutput(n,t){let r=this.tView.data[this.tNode.customControlIndex];fp(this.tNode,this.lView,r,n,Kr(this.tNode,this.lView,t))}listenToCustomControlModel(n){let t=this.tNode.flags&1024?"valueChange":"checkedChange",r=this.tView.data[this.tNode.customControlIndex];fp(this.tNode,this.lView,r,t,Kr(this.tNode,this.lView,n))}listenToDom(n,t){Yg(this.tNode,this.tView,this.lView,void 0,this.lView[ce],n,t,Kr(this.tNode,this.lView,t))}setInputOnDirectives(n,t){let r=this.tNode.inputs?.[n],i=this.tNode.hostDirectiveInputs?.[n];if(!r&&!i)return!1;let o=!1;if(r)for(let s of r){if(s===this.tNode.controlDirectiveIndex)continue;let a=this.tView.data[s],l=this.lView[s];hr(a,l,n,t),o=!0}if(i)for(let s=0;s<i.length;s+=2){let a=i[s];if(a===this.tNode.controlDirectiveIndex)continue;let l=i[s+1],c=this.tView.data[a],d=this.lView[a];hr(c,d,l,t),o=!0}return o}setCustomControlModelInput(n){let t=this.tView.data[this.tNode.customControlIndex],r=this.tNode.flags&1024?"value":"checked";ME(this.tNode,this.tView,this.lView,t,r,n)}customControlHasInput(n){if(this.tNode.customControlIndex===-1)return!1;let t=this.tView.data[this.tNode.customControlIndex];return(t.signalFormsInputPresence??=this._buildCustomControlInputCache(t))[n]===!0}_buildCustomControlInputCache(n){let t={};for(let r in n.inputs)t[r]=!0;if(n.hostDirectives!==null){let r=[...n.hostDirectives];for(;r.length>0;){let i=r.shift();if(typeof i!="function"){for(let s in i.inputs)t[i.inputs[s]]=!0;let o=hp(i.directive);o!==null&&r.push(...o);continue}for(let o of i()){if(typeof o=="function")continue;if(o.inputs)for(let a=0;a<o.inputs.length;a+=2){let l=o.inputs[a+1]||o.inputs[a];t[l]=!0}let s=hp(o.directive);s!==null&&r.push(...s)}}}return t}};function hp(e){return typeof e=="function"&&"\u0275dir"in e?e.\u0275dir.hostDirectives??null:null}function oC(e,n,t){for(let i=n.directiveStart;i<n.directiveEnd;i++)if(e.data[i].controlDef){n.controlDirectiveIndex=i;break}if(n.controlDirectiveIndex===-1)return;let r=e.data[n.controlDirectiveIndex].controlDef;if(r.passThroughInput&&(n.inputs?.[r.passThroughInput]?.length??0)>1){n.flags|=4096;return}sC(e,n)}function sC(e,n){for(let t=n.directiveStart;t<n.directiveEnd;t++){let r=e.data[t];if(!(n.directiveToIndex&&!n.directiveToIndex.has(r.type))){if(mp(r,"value")){n.flags|=1024,n.customControlIndex=t;return}if(mp(r,"checked")){n.flags|=2048,n.customControlIndex=t;return}}}if(n.hostDirectiveInputs!==null&&n.hostDirectiveOutputs!==null&&n.directiveToIndex!==null){let t=(r,i)=>{let o=n.hostDirectiveInputs[r],s=n.hostDirectiveOutputs[r+"Change"];if(!o||!s)return!1;for(let a=0;a<o.length;a+=2){let l=o[a];for(let c=0;c<s.length;c+=2){let d=s[c];if(l===d)for(let u of n.directiveToIndex.values()){if(!Array.isArray(u))continue;let[m,h,p]=u;if(l>=h&&l<=p)return n.flags|=i,n.customControlIndex=m,!0}}}return!1};if(t("value",1024)||t("checked",2048))return}}function mp(e,n){return aC(e,n)&&lC(e,n+"Change")}function aC(e,n){return n in e.inputs}function lC(e,n){return n in e.outputs}var Jd=Symbol("BINDING");var yr=new b("");function Ea(e,n,t){let r=t?e.styles:null,i=t?e.classes:null,o=0;if(n!==null)for(let s=0;s<n.length;s++){let a=n[s];if(typeof a=="number")o=a;else if(o==1)i=Vs(i,a);else if(o==2){let l=a,c=n[++s];r=Vs(r,l+": "+c+";")}}t?e.styles=r:e.stylesWithoutHost=r,t?e.classes=i:e.classesWithoutHost=i}function re(e,n=0){let t=N();if(t===null)return S(e,n);let r=je();return Bp(r,t,Ve(e),n)}function Zg(e,n,t,r,i){let o=r===null?null:{"":-1},s=i(e,t);if(s!==null){let a=s,l=null,c=null;for(let d of s)if(d.resolveHostDirectives!==null){[a,l,c]=d.resolveHostDirectives(s);break}uC(e,n,t,a,o,l,c)}o!==null&&r!==null&&cC(t,r,o)}function cC(e,n,t){let r=e.localNames=[];for(let i=0;i<n.length;i+=2){let o=t[n[i+1]];if(o==null)throw new E(-301,!1);r.push(n[i],o)}}function dC(e,n,t){n.componentOffset=t,(e.components??=[]).push(n.index)}function uC(e,n,t,r,i,o,s){let a=r.length,l=null;for(let m=0;m<a;m++){let h=r[m];l===null&&Ft(h)&&(l=h,dC(e,t,m)),Ld(ga(t,n),e,h.type)}vC(t,e.data.length,a),l?.viewProvidersResolver&&l.viewProvidersResolver(l);for(let m=0;m<a;m++){let h=r[m];h.providersResolver&&h.providersResolver(h)}let c=!1,d=!1,u=Eg(e,n,a,null);a>0&&(t.directiveToIndex=new Map);for(let m=0;m<a;m++){let h=r[m];if(t.mergedAttrs=Jr(t.mergedAttrs,h.hostAttrs),hC(e,t,n,u,h),gC(u,h,i),s!==null&&s.has(h)){let[_,C]=s.get(h);t.directiveToIndex.set(h.type,[u,_+t.directiveStart,C+t.directiveStart])}else(o===null||!o.has(h))&&t.directiveToIndex.set(h.type,u);h.contentQueries!==null&&(t.flags|=4),(h.hostBindings!==null||h.hostAttrs!==null||h.hostVars!==0)&&(t.flags|=64);let p=h.type.prototype;!c&&(p.ngOnChanges||p.ngOnInit||p.ngDoCheck)&&((e.preOrderHooks??=[]).push(t.index),c=!0),!d&&(p.ngOnChanges||p.ngDoCheck)&&((e.preOrderCheckHooks??=[]).push(t.index),d=!0),u++}fC(e,t,o)}function fC(e,n,t){for(let r=n.directiveStart;r<n.directiveEnd;r++){let i=e.data[r];if(t===null||!t.has(i))pp(0,n,i,r),pp(1,n,i,r),vp(n,r,!1);else{let o=t.get(i);gp(0,n,o,r),gp(1,n,o,r),vp(n,r,!0)}}}function pp(e,n,t,r){let i=e===0?t.inputs:t.outputs;for(let o in i)if(i.hasOwnProperty(o)){let s;e===0?s=n.inputs??={}:s=n.outputs??={},s[o]??=[],s[o].push(r),Xg(n,o)}}function gp(e,n,t,r){let i=e===0?t.inputs:t.outputs;for(let o in i)if(i.hasOwnProperty(o)){let s=i[o],a;e===0?a=n.hostDirectiveInputs??={}:a=n.hostDirectiveOutputs??={},a[s]??=[],a[s].push(r,o),Xg(n,s)}}function Xg(e,n){n==="class"?e.flags|=8:n==="style"&&(e.flags|=16)}function vp(e,n,t){let{attrs:r,inputs:i,hostDirectiveInputs:o}=e;if(r===null||!t&&i===null||t&&o===null||Iu(e)){e.initialInputs??=[],e.initialInputs.push(null);return}let s=null,a=0;for(;a<r.length;){let l=r[a];if(l===0){a+=4;continue}else if(l===5){a+=2;continue}else if(typeof l=="number")break;if(!t&&i.hasOwnProperty(l)){let c=i[l];for(let d of c)if(d===n){s??=[],s.push(l,r[a+1]);break}}else if(t&&o.hasOwnProperty(l)){let c=o[l];for(let d=0;d<c.length;d+=2)if(c[d]===n){s??=[],s.push(c[d+1],r[a+1]);break}}a+=2}e.initialInputs??=[],e.initialInputs.push(s)}function hC(e,n,t,r,i){e.data[r]=i;let o=i.factory||(i.factory=mn(i.type,!0)),s=new fr(o,Ft(i),re,null);e.blueprint[r]=s,t[r]=s,mC(e,n,r,Eg(e,t,i.hostVars,ht),i)}function mC(e,n,t,r,i){let o=i.hostBindings;if(o){let s=e.hostBindingOpCodes;s===null&&(s=e.hostBindingOpCodes=[]);let a=~n.index;pC(s)!=a&&s.push(a),s.push(t,r,o)}}function pC(e){let n=e.length;for(;n>0;){let t=e[--n];if(typeof t=="number"&&t<0)return t}return 0}function gC(e,n,t){if(t){if(n.exportAs)for(let r=0;r<n.exportAs.length;r++)t[n.exportAs[r]]=e;Ft(n)&&(t[""]=e)}}function vC(e,n,t){e.flags|=1,e.directiveStart=n,e.directiveEnd=n+t,e.providerIndexes=n}function Qg(e,n,t,r,i,o,s,a){let l=n[I],c=l.consts,d=ft(c,s),u=si(l,e,t,r,d);return o&&Zg(l,n,u,ft(c,a),i),u.mergedAttrs=Jr(u.mergedAttrs,u.attrs),u.attrs!==null&&Ea(u,u.attrs,!1),u.mergedAttrs!==null&&Ea(u,u.mergedAttrs,!0),l.queries!==null&&l.queries.elementStart(l,u),u}function Kg(e,n){Np(e,n),Kc(n)&&e.queries.elementEnd(n)}function yC(e,n,t,r,i,o){let s=n.consts,a=ft(s,i),l=si(n,e,t,r,a);if(l.mergedAttrs=Jr(l.mergedAttrs,l.attrs),o!=null){let c=ft(s,o);l.localNames=[];for(let d=0;d<c.length;d+=2)l.localNames.push(c[d],-1)}return l.attrs!==null&&Ea(l,l.attrs,!1),l.mergedAttrs!==null&&Ea(l,l.mergedAttrs,!0),n.queries!==null&&n.queries.elementStart(n,l),l}var Jg=typeof ShadowRoot<"u",bC=typeof Document<"u";function _C(e){return Object.keys(e).map(n=>{let[t,r,i]=e[n],o={propName:t,templateName:n,isSignal:(r&Va.SignalBased)!==0};return i&&(o.transform=i),o})}function DC(e){return Object.keys(e).map(n=>({propName:e[n],templateName:n}))}function wC(e,n,t){let r=n instanceof Ee?n:n?.injector;return r&&e.getStandaloneInjector!==null&&(r=e.getStandaloneInjector(r)||r),r?new _a(t,r):t}function EC(e){let n=e.get(Ne,null);if(n===null)throw new E(407,!1);let t=e.get(Gg,null),r=e.get(Tt,null),i=e.get(jt,null,{optional:!0});return{rendererFactory:n,sanitizer:t,changeDetectionScheduler:r,ngReflect:!1,tracingService:i}}function CC(e,n){let t=ev(e);return cg(n,t,t==="svg"?Jc:t==="math"?ym:null)}function xC(e){if(e?.toLowerCase()==="script")throw new E(905,!1)}function ev(e){return(e.selectors[0][0]||"div").toLowerCase()}var ni=class{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=_C(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=DC(this.componentDef.outputs),this.cachedOutputs}constructor(n,t){this.componentDef=n,this.ngModule=t,this.componentType=n.type,this.selector=Hw(n.selectors),this.ngContentSelectors=n.ngContentSelectors??[],this.isBoundToModule=!!t}create(n,t,r,i,o,s){K(Z.DynamicComponentStart);let a=x(null);try{let l=this.componentDef,c=wC(l,i||this.ngModule,n),d=EC(c),u=d.tracingService;return u&&u.componentCreate?u.componentCreate(Wg(l),()=>this.createComponentRef(d,c,t,r,o,s)):this.createComponentRef(d,c,t,r,o,s)}finally{x(a)}}createComponentRef(n,t,r,i,o,s){let a=this.componentDef,l=IC(i,a,s,o),c=n.rendererFactory.createRenderer(null,a),d=i?pE(c,i,a.encapsulation,t):CC(a,c);xC(d?.tagName);let u=t.get(yr,null),m=SC(d,()=>t.get(j,null)??Zp());u&&u.addHost(m);let h=s?.some(yp)||o?.some(C=>typeof C!="function"&&C.bindings.some(yp)),p=Fu(null,l,null,512|wg(a),null,null,n,c,t,null,eg(d,t,!0));u&&Jg&&m instanceof ShadowRoot&&Zs(p,()=>{u.removeHost(m)}),p[ge]=d,Ks(p);let _=null;try{let C=Qg(ge,p,2,"#host",()=>l.directiveRegistry,!0,0);fg(c,d,C),ei(d,p),Lu(l,p,C),ng(l,C,p),Kg(l,C),r!==void 0&&TC(C,this.ngContentSelectors,r),_=ut(C.index,p),p[Ce]=_[Ce],ju(l,p,null)}catch(C){throw _!==null&&jd(_),jd(p),C}finally{K(Z.DynamicComponentEnd),Js()}return new Ca(this.componentType,p,!!h)}};function IC(e,n,t,r){let i=e?["ng-version","22.0.7"]:Uw(n.selectors[0]),o=null,s=null,a=0;if(t)for(let d of t)a+=d[Jd].requiredVars,d.create&&(d.targetIdx=0,(o??=[]).push(d)),d.update&&(d.targetIdx=0,(s??=[]).push(d));if(r)for(let d=0;d<r.length;d++){let u=r[d];if(typeof u!="function")for(let m of u.bindings){a+=m[Jd].requiredVars;let h=d+1;m.create&&(m.targetIdx=h,(o??=[]).push(m)),m.update&&(m.targetIdx=h,(s??=[]).push(m))}}let l=[n];if(r)for(let d of r){let u=typeof d=="function"?d:d.type,m=jc(u);l.push(m)}return Ou(0,null,MC(o,s),1,a,l,null,null,null,[i],null)}function SC(e,n){let t=e.getRootNode?.();return bC&&t instanceof Document?t.head:t&&Jg&&t instanceof ShadowRoot?t:n().head}function MC(e,n){return!e&&!n?null:t=>{if(t&1&&e)for(let r of e)r.create();if(t&2&&n)for(let r of n)r.update()}}function yp(e){let n=e[Jd].kind;return n==="input"||n==="twoWay"}var Ca=class extends $g{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(n,t,r){super(),this._rootLView=t,this._hasInputBindings=r,this._tNode=Ws(t[I],ge),this.location=ii(this._tNode,t),this.instance=ut(this._tNode.index,t)[Ce],this.hostView=this.changeDetectorRef=new Mn(t,void 0),this.componentType=n}setInput(n,t){this._hasInputBindings;let r=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(n)&&Object.is(this.previousInputValues.get(n),t))return;let i=this._rootLView,o=Vu(r,i[I],i,n,t);this.previousInputValues.set(n,t);let s=ut(r.index,i);Bu(s,1)}get injector(){return new In(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(n){this.hostView.onDestroy(n)}};function TC(e,n,t){let r=e.projection=[];for(let i=0;i<n.length;i++){let o=t[i];r.push(o!=null&&o.length?Array.from(o):null)}}var nn=(()=>{class e{static __NG_ELEMENT_ID__=AC}return e})();function AC(){let e=je();return tv(e,N())}var eu=class e extends nn{_lContainer;_hostTNode;_hostLView;constructor(n,t,r){super(),this._lContainer=n,this._hostTNode=t,this._hostLView=r}get element(){return ii(this._hostTNode,this._hostLView)}get injector(){return new In(this._hostTNode,this._hostLView)}get parentInjector(){let n=gu(this._hostTNode,this._hostLView);if(Op(n)){let t=ma(n,this._hostLView),r=ha(n),i=t[I].data[r+8];return new In(i,t)}else return new In(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(n){let t=bp(this._lContainer);return t!==null&&t[n]||null}get length(){return this._lContainer.length-ve}createEmbeddedView(n,t,r){let i,o;typeof r=="number"?i=r:r!=null&&(i=r.index,o=r.injector);let s=ba(this._lContainer,n.ssrId),a=n.createEmbeddedViewImpl(t||{},o,s);return this.insertImpl(a,i,ti(this._hostTNode,s)),a}createComponent(n,t,r,i,o,s,a){let l,c=t||{};l=c.index,r=c.injector,i=c.projectableNodes,o=c.environmentInjector||c.ngModuleRef,s=c.directives,a=c.bindings;let d=new ni(vn(n)),u=r||this.parentInjector;if(!o&&d.ngModule==null){let F=this.parentInjector.get(Ee,null);F&&(o=F)}let m=vn(d.componentType??{}),h=ba(this._lContainer,m?.id??null),p=h?.firstChild??null,_=d.create(u,i,p,o,s,a);return this.insertImpl(_.hostView,l,ti(this._hostTNode,h)),_}insert(n,t){return this.insertImpl(n,t,!0)}insertImpl(n,t,r){let i=n._lView;if(_m(i)){let a=this.indexOf(n);if(a!==-1)this.detach(a);else{let l=i[Oe],c=new e(l,l[We],l[Oe]);c.detach(c.indexOf(n))}}let o=this._adjustIndex(t),s=this._lContainer;return fo(s,i,o,r),n.attachToViewContainerRef(),$c(Md(s),o,n),n}move(n,t){return this.insert(n,t)}indexOf(n){let t=bp(this._lContainer);return t!==null?t.indexOf(n):-1}remove(n){let t=this._adjustIndex(n,-1),r=io(this._lContainer,t);r&&(Hi(Md(this._lContainer),t),Pa(r[I],r))}detach(n){let t=this._adjustIndex(n,-1),r=io(this._lContainer,t);return r&&Hi(Md(this._lContainer),t)!=null?new Mn(r):null}_adjustIndex(n,t=0){return n??this.length+t}};function bp(e){return e[$i]}function Md(e){return e[$i]||(e[$i]=[])}function tv(e,n){let t,r=n[e.index];return lt(r)?t=r:(t=jg(r,n,null,e),n[e.index]=t,Pu(n,t)),RC(t,n,e,r),new eu(t,e,n)}function NC(e,n){let t=e[ce],r=t.createComment(""),i=dt(n,e),o=t.parentNode(i);return ya(t,o,r,t.nextSibling(i),!1),r}var RC=FC,kC=()=>!1;function OC(e,n,t){return kC(e,n,t)}function FC(e,n,t,r){if(e[Dn])return;let i;t.type&8?i=ct(r):i=NC(n,t),e[Dn]=i}var tu=class e{queryList;matches=null;constructor(n){this.queryList=n}clone(){return new e(this.queryList)}setDirty(){this.queryList.setDirty()}},nu=class e{queries;constructor(n=[]){this.queries=n}createEmbeddedView(n){let t=n.queries;if(t!==null){let r=n.contentQueries!==null?n.contentQueries[0]:t.length,i=[];for(let o=0;o<r;o++){let s=t.getByIndex(o),a=this.queries[s.indexInDeclarationView];i.push(a.clone())}return new e(i)}return null}insertView(n){this.dirtyQueriesWithMatches(n)}detachView(n){this.dirtyQueriesWithMatches(n)}finishViewCreation(n){this.dirtyQueriesWithMatches(n)}dirtyQueriesWithMatches(n){for(let t=0;t<this.queries.length;t++)Uu(n,t).matches!==null&&this.queries[t].setDirty()}},xa=class{flags;read;predicate;constructor(n,t,r=null){this.flags=t,this.read=r,typeof n=="string"?this.predicate=BC(n):this.predicate=n}},ru=class e{queries;constructor(n=[]){this.queries=n}elementStart(n,t){for(let r=0;r<this.queries.length;r++)this.queries[r].elementStart(n,t)}elementEnd(n){for(let t=0;t<this.queries.length;t++)this.queries[t].elementEnd(n)}embeddedTView(n){let t=null;for(let r=0;r<this.length;r++){let i=t!==null?t.length:0,o=this.getByIndex(r).embeddedTView(n,i);o&&(o.indexInDeclarationView=r,t!==null?t.push(o):t=[o])}return t!==null?new e(t):null}template(n,t){for(let r=0;r<this.queries.length;r++)this.queries[r].template(n,t)}getByIndex(n){return this.queries[n]}get length(){return this.queries.length}track(n){this.queries.push(n)}},iu=class e{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=!1;_declarationNodeIndex;_appliesToNextNode=!0;constructor(n,t=-1){this.metadata=n,this._declarationNodeIndex=t}elementStart(n,t){this.isApplyingToNode(t)&&this.matchTNode(n,t)}elementEnd(n){this._declarationNodeIndex===n.index&&(this._appliesToNextNode=!1)}template(n,t){this.elementStart(n,t)}embeddedTView(n,t){return this.isApplyingToNode(n)?(this.crossesNgTemplate=!0,this.addMatch(-n.index,t),new e(this.metadata)):null}isApplyingToNode(n){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let t=this._declarationNodeIndex,r=n.parent;for(;r!==null&&r.type&8&&r.index!==t;)r=r.parent;return t===(r!==null?r.index:-1)}return this._appliesToNextNode}matchTNode(n,t){let r=this.metadata.predicate;if(Array.isArray(r))for(let i=0;i<r.length;i++){let o=r[i];this.matchTNodeWithReadOption(n,t,PC(t,o)),this.matchTNodeWithReadOption(n,t,da(t,n,o,!1,!1))}else r===Kt?t.type&4&&this.matchTNodeWithReadOption(n,t,-1):this.matchTNodeWithReadOption(n,t,da(t,n,r,!1,!1))}matchTNodeWithReadOption(n,t,r){if(r!==null){let i=this.metadata.read;if(i!==null)if(i===G||i===nn||i===Kt&&t.type&4)this.addMatch(t.index,-2);else{let o=da(t,n,i,!1,!1);o!==null&&this.addMatch(t.index,o)}else this.addMatch(t.index,r)}}addMatch(n,t){this.matches===null?this.matches=[n,t]:this.matches.push(n,t)}};function PC(e,n){let t=e.localNames;if(t!==null){for(let r=0;r<t.length;r+=2)if(t[r]===n)return t[r+1]}return null}function LC(e,n){return e.type&11?ii(e,n):e.type&4?Ba(e,n):null}function VC(e,n,t,r){return t===-1?LC(n,e):t===-2?jC(e,n,r):to(e,e[I],t,n)}function jC(e,n,t){if(t===G)return ii(n,e);if(t===Kt)return Ba(n,e);if(t===nn)return tv(n,e)}function nv(e,n,t,r){let i=n[Rt].queries[r];if(i.matches===null){let o=e.data,s=t.matches,a=[];for(let l=0;s!==null&&l<s.length;l+=2){let c=s[l];if(c<0)a.push(null);else{let d=o[c];a.push(VC(n,d,s[l+1],t.metadata.read))}}i.matches=a}return i.matches}function ou(e,n,t,r){let i=e.queries.getByIndex(t),o=i.matches;if(o!==null){let s=nv(e,n,i,t);for(let a=0;a<o.length;a+=2){let l=o[a];if(l>0)r.push(s[a/2]);else{let c=o[a+1],d=n[-l];for(let u=ve;u<d.length;u++){let m=d[u];m[_n]===m[Oe]&&ou(m[I],m,c,r)}if(d[rr]!==null){let u=d[rr];for(let m=0;m<u.length;m++){let h=u[m];ou(h[I],h,c,r)}}}}}return r}function Hu(e,n){return e[Rt].queries[n].queryList}function rv(e,n,t){let r=new va((t&4)===4);return Em(e,n,r,r.destroy),(n[Rt]??=new nu).queries.push(new tu(r))-1}function iv(e,n,t){let r=ye();return r.firstCreatePass&&(sv(r,new xa(e,n,t),-1),(n&2)===2&&(r.staticViewQueries=!0)),rv(r,N(),n)}function ov(e,n,t,r){let i=ye();if(i.firstCreatePass){let o=je();sv(i,new xa(n,t,r),o.index),HC(i,e),(t&2)===2&&(i.staticContentQueries=!0)}return rv(i,N(),t)}function BC(e){return e.split(",").map(n=>n.trim())}function sv(e,n,t){e.queries===null&&(e.queries=new ru),e.queries.track(new iu(n,t))}function HC(e,n){let t=e.contentQueries||(e.contentQueries=[]),r=t.length?t[t.length-1]:-1;n!==r&&t.push(e.queries.length-1,n)}function Uu(e,n){return e.queries.getByIndex(n)}function av(e,n){let t=e[I],r=Uu(t,n);return r.crossesNgTemplate?ou(t,e,n,[]):nv(t,e,r,n)}function lv(e,n,t){let r,i=Si(()=>{r._dirtyCounter();let o=UC(r,e);if(n&&o===void 0)throw new E(-951,!1);return o});return r=i[ke],r._dirtyCounter=ne(0),r._flatValue=void 0,i}function zu(e){return lv(!0,!1,e)}function $u(e){return lv(!0,!0,e)}function cv(e,n){let t=e[ke];t._lView=N(),t._queryIndex=n,t._queryList=Hu(t._lView,n),t._queryList.onDirty(()=>t._dirtyCounter.update(r=>r+1))}function UC(e,n){let t=e._lView,r=e._queryIndex;if(t===void 0||r===void 0||t[M]&4)return n?void 0:$e;let i=Hu(t,r),o=av(t,r);return i.reset(o,zp),n?i.first:i._changesDetected||e._flatValue===void 0?e._flatValue=i.toArray():e._flatValue}function br(e){return!!e&&typeof e.then=="function"}function Gu(e){return!!e&&typeof e.subscribe=="function"}var mr=class{};var oo=class extends mr{injector;instance=null;constructor(n){super();let t=new Kn([...n.providers,{provide:mr,useValue:this}],n.parent||zr(),n.debugName,new Set(["environment"]));this.injector=t,n.runEnvironmentInitializers&&t.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(n){this.injector.onDestroy(n)}};function dv(e,n,t=null){return new oo({providers:e,parent:n,debugName:t,runEnvironmentInitializers:!0}).injector}var zC=(()=>{class e{_injector;cachedInjectors=new Map;constructor(t){this._injector=t}getOrCreateStandaloneInjector(t){if(!t.standalone)return null;if(!this.cachedInjectors.has(t)){let r=Wc(!1,t.type),i=r.length>0?dv([r],this._injector,""):null;this.cachedInjectors.set(t,i)}return this.cachedInjectors.get(t)}ngOnDestroy(){try{for(let t of this.cachedInjectors.values())t!==null&&t.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=P({token:e,providedIn:"environment",factory:()=>new e(S(Ee))})}return e})();function W(e){return lo(()=>{let n=uv(e),t=H(D({},n),{decls:e.decls,vars:e.vars,template:e.template,consts:e.consts||null,ngContentSelectors:e.ngContentSelectors,onPush:e.changeDetection!==yu.Eager,directiveDefs:null,pipeDefs:null,dependencies:n.standalone&&e.dependencies||null,getStandaloneInjector:n.standalone?i=>i.get(zC).getOrCreateStandaloneInjector(t):null,getExternalStyles:null,signals:e.signals??!1,data:e.data||{},encapsulation:e.encapsulation||xt.Emulated,styles:e.styles||$e,_:null,schemas:e.schemas||null,tView:null,id:""});n.standalone&&Tn("NgStandalone"),fv(t);let r=e.dependencies;return t.directiveDefs=_p(r,$C),t.pipeDefs=_p(r,im),t.id=YC(t),t})}function $C(e){return vn(e)||jc(e)}function X(e){return lo(()=>({type:e.type,bootstrap:e.bootstrap||$e,declarations:e.declarations||$e,imports:e.imports||$e,exports:e.exports||$e,transitiveCompileScopes:null,schemas:e.schemas||null,id:e.id||null}))}function GC(e,n){if(e==null)return yn;let t={};for(let r in e)if(e.hasOwnProperty(r)){let i=e[r],o,s,a,l;Array.isArray(i)?(a=i[0],o=i[1],s=i[2]??o,l=i[3]||null):(o=i,s=i,a=Va.None,l=null),t[o]=[r,a,l],n[o]=s}return t}function WC(e){if(e==null)return yn;let n={};for(let t in e)e.hasOwnProperty(t)&&(n[e[t]]=t);return n}function $(e){return lo(()=>{let n=uv(e);return fv(n),n})}function Wu(e){return{type:e.type,name:e.name,factory:null,pure:e.pure!==!1,standalone:e.standalone??!0,onDestroy:e.type.prototype.ngOnDestroy||null}}function uv(e){let n={};return{type:e.type,providersResolver:null,viewProvidersResolver:null,factory:null,hostBindings:e.hostBindings||null,hostVars:e.hostVars||0,hostAttrs:e.hostAttrs||null,contentQueries:e.contentQueries||null,declaredInputs:n,inputConfig:e.inputs||yn,exportAs:e.exportAs||null,standalone:e.standalone??!0,signals:e.signals===!0,selectors:e.selectors||$e,viewQuery:e.viewQuery||null,features:e.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,controlDef:null,signalFormsInputPresence:null,inputs:GC(e.inputs,n),outputs:WC(e.outputs),debugInfo:null}}function fv(e){e.features?.forEach(n=>n(e))}function _p(e,n){return e?()=>{let t=typeof e=="function"?e():e,r=[];for(let i of t){let o=n(i);o!==null&&r.push(o)}return r}:null}function YC(e){let n=0,t=typeof e.consts=="function"?"":e.consts,r=[e.selectors,e.ngContentSelectors,e.hostVars,e.hostAttrs,t,e.vars,e.decls,e.encapsulation,e.standalone,e.signals,e.exportAs,JSON.stringify(e.inputs),JSON.stringify(e.outputs),Object.getOwnPropertyNames(e.type.prototype),!!e.contentQueries,!!e.viewQuery];for(let o of r.join("|"))n=Math.imul(31,n)+o.charCodeAt(0)<<0;return n+=2147483648,"c"+n}var hv=new b("");var Yu=(()=>{class e{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((t,r)=>{this.resolve=t,this.reject=r});appInits=f(hv,{optional:!0})??[];injector=f(J);constructor(){}runInitializers(){if(this.initialized)return;let t=[];for(let i of this.appInits){let o=$r(this.injector,i);if(br(o))t.push(o);else if(Gu(o)){let s=new Promise((a,l)=>{o.subscribe({complete:a,error:l})});t.push(s)}}let r=()=>{this.done=!0,this.resolve()};Promise.all(t).then(()=>{r()}).catch(i=>{this.reject(i)}),t.length===0&&r(),this.initialized=!0}static \u0275fac=function(r){return new(r||e)};static \u0275prov=R({token:e,factory:e.\u0275fac})}return e})();function qu(e){return n=>{n.controlDef={create:(t,r)=>{t?.\u0275ngControlCreate(r)},update:(t,r)=>{t?.\u0275ngControlUpdate?.(r)},passThroughInput:e}}}function qC(e){return Object.getPrototypeOf(e.prototype).constructor}function He(e){let n=qC(e.type),t=!0,r=[e];for(;n;){let i;if(Ft(e))i=n.\u0275cmp||n.\u0275dir;else{if(n.\u0275cmp)throw new E(903,!1);i=n.\u0275dir}if(i){if(t){r.push(i);let s=e;s.inputs=Td(e.inputs),s.declaredInputs=Td(e.declaredInputs),s.outputs=Td(e.outputs);let a=i.hostBindings;a&&JC(e,a);let l=i.viewQuery,c=i.contentQueries;if(l&&QC(e,l),c&&KC(e,c),ZC(e,i),rm(e.outputs,i.outputs),Ft(i)&&i.data.animation){let d=e.data;d.animation=(d.animation||[]).concat(i.data.animation)}}let o=i.features;if(o)for(let s=0;s<o.length;s++){let a=o[s];a&&a.ngInherit&&a(e),a===He&&(t=!1)}}n=Object.getPrototypeOf(n)}XC(r)}function ZC(e,n){for(let t in n.inputs){if(!n.inputs.hasOwnProperty(t)||e.inputs.hasOwnProperty(t))continue;let r=n.inputs[t];r!==void 0&&(e.inputs[t]=r,e.declaredInputs[t]=n.declaredInputs[t])}}function XC(e){let n=0,t=null;for(let r=e.length-1;r>=0;r--){let i=e[r];i.hostVars=n+=i.hostVars,i.hostAttrs=Jr(i.hostAttrs,t=Jr(t,i.hostAttrs))}}function Td(e){return e===yn?{}:e===$e?[]:e}function QC(e,n){let t=e.viewQuery;t?e.viewQuery=(r,i)=>{n(r,i),t(r,i)}:e.viewQuery=n}function KC(e,n){let t=e.contentQueries;t?e.contentQueries=(r,i,o)=>{n(r,i,o),t(r,i,o)}:e.contentQueries=n}function JC(e,n){let t=e.hostBindings;t?e.hostBindings=(r,i)=>{n(r,i),t(r,i)}:e.hostBindings=n}function mv(e,n,t,r,i,o,s,a){if(t.firstCreatePass){e.mergedAttrs=Jr(e.mergedAttrs,e.attrs);let d=e.tView=Ou(2,e,i,o,s,t.directiveRegistry,t.pipeRegistry,null,t.schemas,t.consts,null);t.queries!==null&&(t.queries.template(t,e),d.queries=t.queries.embeddedTView(e))}a&&(e.flags|=a),qr(e,!1);let l=t0(t,n,e,r);ta()&&Ru(t,n,l,e),ei(l,n);let c=jg(l,n,l,e);n[r+ge]=c,Pu(n,c),OC(c,e,n)}function e0(e,n,t,r,i,o,s,a,l,c,d){let u=t+ge,m;return n.firstCreatePass?(m=si(n,u,4,s||null,a||null),ld()&&Zg(n,e,m,ft(n.consts,c),Sg),Np(n,m)):m=n.data[u],mv(m,e,n,t,r,i,o,l),Gi(m)&&Lu(n,e,m),c!=null&&ja(e,m,d),m}function so(e,n,t,r,i,o,s,a,l,c,d){let u=t+ge,m;if(n.firstCreatePass){if(m=si(n,u,4,s||null,a||null),c!=null){let h=ft(n.consts,c);m.localNames=[];for(let p=0;p<h.length;p+=2)m.localNames.push(h[p],-1)}}else m=n.data[u];return mv(m,e,n,t,r,i,o,l),c!=null&&ja(e,m,d),m}function ai(e,n,t,r,i,o,s,a){let l=N(),c=ye(),d=ft(c.consts,o);return e0(l,c,e,n,t,r,i,d,void 0,s,a),ai}var t0=n0;function n0(e,n,t,r){return na(!0),n[ce].createComment("")}var Zu=new b("");var Xu=new b("");function pv(){tc(()=>{let e="";throw new E(600,e)})}var r0=10;var It=(()=>{class e{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=f(En);afterRenderManager=f(Oa);zonelessEnabled=f(Xi);rootEffectScheduler=f(ia);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=!1;afterTick=new B;get allViews(){return[...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=f(cr);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(_e(t=>!t))}constructor(){f(jt,{optional:!0})}whenStable(){let t;return new Promise(r=>{t=this.isStable.subscribe({next:i=>{i&&r()}})}).finally(()=>{t.unsubscribe()})}_injector=f(Ee);_rendererFactory=null;get injector(){return this._injector}bootstrap(t,r){return this.bootstrapImpl(t,r)}bootstrapImpl(t,r,i=J.NULL){return this._injector.get(A).run(()=>{if(K(Z.BootstrapComponentStart),!this._injector.get(Yu).done){let F="";throw new E(405,F)}let a=vn(t),l=this._injector.get(mr),c=new ni(a,l);this.componentTypes.push(t);let{hostElement:d,directives:u,bindings:m}=i0(r),h=d||c.selector,p=c.create(i,[],h,l.injector,u,m),_=p.location.nativeElement,C=p.injector.get(Zu,null);return C?.registerApplication(_),p.onDestroy(()=>{this.detachView(p.hostView),eo(this.components,p),C?.unregisterApplication(_)}),this._loadComponent(p),K(Z.BootstrapComponentEnd,p),p})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){K(Z.ChangeDetectionStart),this.tracingSnapshot!==null?this.tracingSnapshot.run(ka.CHANGE_DETECTION,this.tickImpl):this.tickImpl()}tickImpl=()=>{if(this._runningTick)throw K(Z.ChangeDetectionEnd),new E(101,!1);let t=x(null);try{this._runningTick=!0,this.synchronize()}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,x(t),this.afterTick.next(),K(Z.ChangeDetectionEnd)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(Ne,null,{optional:!0}));let t=0;for(;this.dirtyFlags!==0&&t++<r0;){K(Z.ChangeDetectionSyncStart);try{this.synchronizeOnce()}finally{K(Z.ChangeDetectionSyncEnd)}}}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let t=!1;if(this.dirtyFlags&7){let r=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:i}of this.allViews){if(!r&&!Wi(i))continue;let o=r&&!this.zonelessEnabled?0:1;Fg(i,o),t=!0}if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}t||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:t})=>Wi(t))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(t){let r=t;this._views.push(r),r.attachToAppRef(this)}detachView(t){let r=t;eo(this._views,r),r.detachFromAppRef()}_loadComponent(t){this.attachView(t.hostView);try{this.tick()}catch(i){this.internalErrorHandler(i)}this.components.push(t),this._injector.get(Xu,[]).forEach(i=>i(t))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(t=>t()),this._views.slice().forEach(t=>t.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(t){return this._destroyListeners.push(t),()=>eo(this._destroyListeners,t)}destroy(){if(this._destroyed)throw new E(406,!1);let t=this._injector;t.destroy&&!t.destroyed&&t.destroy()}get viewCount(){return this._views.length}static \u0275fac=function(r){return new(r||e)};static \u0275prov=R({token:e,factory:e.\u0275fac})}return e})();function i0(e){return e===void 0||typeof e=="string"||e instanceof Element?{hostElement:e}:e}function eo(e,n){let t=e.indexOf(n);t>-1&&e.splice(t,1)}function Re(e,n,t,r){let i=N(),o=lr();if(tn(i,o,n)){let s=ye(),a=qi();CE(a,i,e,n,t,r)}return Re}var su=class{destroy(n){}updateValue(n,t){}swap(n,t){let r=Math.min(n,t),i=Math.max(n,t),o=this.detach(i);if(i-r>1){let s=this.detach(r);this.attach(r,o),this.attach(i,s)}else this.attach(r,o)}move(n,t){this.attach(t,this.detach(n))}};function Ad(e,n,t,r,i){return e===t&&Object.is(n,r)?1:Object.is(i(e,n),i(t,r))?-1:0}function o0(e,n,t,r){let i,o,s=0,a=e.length-1,l=void 0;if(Array.isArray(n)){x(r);let c=n.length-1;for(x(null);s<=a&&s<=c;){let d=e.at(s),u=n[s],m=Ad(s,d,s,u,t);if(m!==0){m<0&&e.updateValue(s,u),s++;continue}let h=e.at(a),p=n[c],_=Ad(a,h,c,p,t);if(_!==0){_<0&&e.updateValue(a,p),a--,c--;continue}let C=t(s,d),F=t(a,h),Ae=t(s,u);if(Object.is(Ae,F)){let ot=t(c,p);Object.is(ot,C)?(e.swap(s,a),e.updateValue(a,p),c--,a--):e.move(a,s),e.updateValue(s,u),s++;continue}if(i??=new Ia,o??=wp(e,s,a,t),au(e,i,s,Ae))e.updateValue(s,u),s++,a++;else if(o.has(Ae))i.set(C,e.detach(s)),a--;else{let ot=e.create(s,n[s]);e.attach(s,ot),s++,a++}}for(;s<=c;)Dp(e,i,t,s,n[s]),s++}else if(n!=null){x(r);let c=n[Symbol.iterator]();x(null);let d=c.next();for(;!d.done&&s<=a;){let u=e.at(s),m=d.value,h=Ad(s,u,s,m,t);if(h!==0)h<0&&e.updateValue(s,m),s++,d=c.next();else{i??=new Ia,o??=wp(e,s,a,t);let p=t(s,m);if(au(e,i,s,p))e.updateValue(s,m),s++,a++,d=c.next();else if(!o.has(p))e.attach(s,e.create(s,m)),s++,a++,d=c.next();else{let _=t(s,u);i.set(_,e.detach(s)),a--}}}for(;!d.done;)Dp(e,i,t,e.length,d.value),d=c.next()}for(;s<=a;)e.destroy(e.detach(a--));i?.forEach(c=>{e.destroy(c)})}function au(e,n,t,r){return n!==void 0&&n.has(r)?(e.attach(t,n.get(r)),n.delete(r),!0):!1}function Dp(e,n,t,r,i){if(au(e,n,r,t(r,i)))e.updateValue(r,i);else{let o=e.create(r,i);e.attach(r,o)}}function wp(e,n,t,r){let i=new Set;for(let o=n;o<=t;o++)i.add(r(o,e.at(o)));return i}var Ia=class{kvMap=new Map;_vMap=void 0;has(n){return this.kvMap.has(n)}delete(n){if(!this.has(n))return!1;let t=this.kvMap.get(n);return this._vMap!==void 0&&this._vMap.has(t)?(this.kvMap.set(n,this._vMap.get(t)),this._vMap.delete(t)):this.kvMap.delete(n),!0}get(n){return this.kvMap.get(n)}set(n,t){if(this.kvMap.has(n)){let r=this.kvMap.get(n);this._vMap===void 0&&(this._vMap=new Map);let i=this._vMap;for(;i.has(r);)r=i.get(r);i.set(r,t)}else this.kvMap.set(n,t)}forEach(n){for(let[t,r]of this.kvMap)if(n(r,t),this._vMap!==void 0){let i=this._vMap;for(;i.has(r);)r=i.get(r),n(r,t)}}};function he(e,n,t,r,i,o,s,a){Tn("NgControlFlow");let l=N(),c=ye(),d=ft(c.consts,o);return so(l,c,e,n,t,r,i,d,256,s,a),Qu}function Qu(e,n,t,r,i,o,s,a){Tn("NgControlFlow");let l=N(),c=ye(),d=ft(c.consts,o);return so(l,c,e,n,t,r,i,d,512,s,a),Qu}function me(e,n){Tn("NgControlFlow");let t=N(),r=lr(),i=t[r]!==ht?t[r]:-1,o=i!==-1?Sa(t,ge+i):void 0,s=0;if(tn(t,r,e)){let a=x(null);try{if(o!==void 0&&Hg(o,s),e!==-1){let l=ge+e,c=Sa(t,l),d=uu(t[I],l),u=zg(c,d,t),m=uo(t,d,n,{dehydratedView:u});fo(c,m,s,ti(d,u))}}finally{x(a)}}else if(o!==void 0){let a=Bg(o,s);a!==void 0&&(a[Ce]=n)}}var lu=class{lContainer;$implicit;$index;constructor(n,t,r){this.lContainer=n,this.$implicit=t,this.$index=r}get $count(){return this.lContainer.length-ve}};function Ha(e,n){return n}var cu=class{hasEmptyBlock;trackByFn;liveCollection;constructor(n,t,r){this.hasEmptyBlock=n,this.trackByFn=t,this.liveCollection=r}};function Ua(e,n,t,r,i,o,s,a,l,c,d,u,m){Tn("NgControlFlow");let h=N(),p=ye(),_=l!==void 0,C=N(),F=a?s.bind(C[Xe][Ce]):s,Ae=new cu(_,F);C[ge+e]=Ae,so(h,p,e+1,n,t,r,i,ft(p.consts,o),256),_&&so(h,p,e+2,l,c,d,u,ft(p.consts,m),512)}var du=class extends su{lContainer;hostLView;templateTNode;operationsCounter=void 0;needsIndexUpdate=!1;constructor(n,t,r){super(),this.lContainer=n,this.hostLView=t,this.templateTNode=r}get length(){return this.lContainer.length-ve}at(n){return this.getLView(n)[Ce].$implicit}attach(n,t){let r=t[er];this.needsIndexUpdate||=n!==this.length,fo(this.lContainer,t,n,ti(this.templateTNode,r)),s0(this.lContainer,n)}detach(n){return this.needsIndexUpdate||=n!==this.length-1,a0(this.lContainer,n),l0(this.lContainer,n)}create(n,t){let r=ba(this.lContainer,this.templateTNode.tView.ssrId);return uo(this.hostLView,this.templateTNode,new lu(this.lContainer,t,n),{dehydratedView:r})}destroy(n){Pa(n[I],n)}updateValue(n,t){this.getLView(n)[Ce].$implicit=t}reset(){this.needsIndexUpdate=!1}updateIndexes(){if(this.needsIndexUpdate)for(let n=0;n<this.length;n++)this.getLView(n)[Ce].$index=n}getLView(n){return c0(this.lContainer,n)}};function za(e){let n=x(null),t=Xt();try{let r=N(),i=r[I],o=r[t],s=t+1,a=Sa(r,s);if(o.liveCollection===void 0){let c=uu(i,s);o.liveCollection=new du(a,r,c)}else o.liveCollection.reset();let l=o.liveCollection;if(o0(l,e,o.trackByFn,n),l.updateIndexes(),o.hasEmptyBlock){let c=lr(),d=l.length===0;if(tn(r,c,d)){let u=t+2,m=Sa(r,u);if(d){let h=uu(i,u),p=zg(m,h,r),_=uo(r,h,void 0,{dehydratedView:p});fo(m,_,0,ti(h,p))}else i.firstUpdatePass&&ZE(m),Hg(m,0)}}}finally{x(n)}}function Sa(e,n){return e[n]}function s0(e,n){if(e.length<=ve)return;let t=ve+n,r=e[t],i=r?r[Ot]:void 0;if(r&&i&&i.detachedLeaveAnimationFns&&i.detachedLeaveAnimationFns.length>0){let o=r[At];Zw(o,i),Sn.delete(r[kt]),i.detachedLeaveAnimationFns=void 0}}function a0(e,n){if(e.length<=ve)return;let t=ve+n,r=e[t],i=r?r[Ot]:void 0;i&&i.leave&&i.leave.size>0&&(i.detachedLeaveAnimationFns=[])}function l0(e,n){return io(e,n)}function c0(e,n){return Bg(e,n)}function uu(e,n){return Ws(e,n)}function T(e,n,t){let r=N(),i=lr();if(tn(r,i,n)){let o=ye(),s=qi();bE(s,r,e,n,r[ce],t)}return T}function fu(e,n,t,r,i){Vu(n,e,t,i?"class":"style",r)}function g(e,n,t,r){let i=N(),o=i[I],s=e+ge,a=o.firstCreatePass?Qg(s,i,2,n,Sg,ld(),t,r):o.data[s];if(Zt(a)){let l=i[Nt].tracingService;if(l&&l.componentCreate){let c=o.data[a.directiveStart+a.componentOffset];return l.componentCreate(Wg(c),()=>(Ep(e,n,i,a,r),g))}}return Ep(e,n,i,a,r),g}function Ep(e,n,t,r,i){if(Mg(r,t,e,n,gv),Gi(r)){let o=t[I];Lu(o,t,r),ng(o,r,t)}i!=null&&ja(t,r)}function v(){let e=ye(),n=je(),t=Tg(n);return e.firstCreatePass&&Kg(e,t),dd(t)&&ud(),ad(),t.classesWithoutHost!=null&&UD(t)&&fu(e,t,N(),t.classesWithoutHost,!0),t.stylesWithoutHost!=null&&zD(t)&&fu(e,t,N(),t.stylesWithoutHost,!1),v}function O(e,n,t,r){return g(e,n,t,r),v(),O}function mt(e,n,t,r){let i=N(),o=i[I],s=e+ge,a=o.firstCreatePass?yC(s,o,2,n,t,r):o.data[s];return Mg(a,i,e,n,gv),r!=null&&ja(i,a),mt}function pt(){let e=je(),n=Tg(e);return dd(n)&&ud(),ad(),pt}function gt(e,n,t,r){return mt(e,n,t,r),pt(),gt}var gv=(e,n,t,r,i)=>(na(!0),cg(n[ce],r,bd()));function li(){return N()}function An(e,n,t){let r=N(),i=lr();if(tn(r,i,n)){let o=ye(),s=qi();Ig(s,r,e,n,r[ce],t)}return An}var ho="en-US";var d0=ho;function vv(e){typeof e=="string"&&(d0=e.toLowerCase().replace(/_/g,"-"))}function le(e,n,t){let r=N(),i=ye(),o=je();return u0(i,r,r[ce],o,e,n,t),le}function u0(e,n,t,r,i,o,s){let a=!0,l=null;if((r.type&3||s)&&(l??=Kr(r,n,o),Yg(r,e,n,s,t,i,o,l)&&(a=!1)),a){let c=r.outputs?.[i],d=r.hostDirectiveOutputs?.[i];if(d&&d.length)for(let u=0;u<d.length;u+=2){let m=d[u],h=d[u+1];l??=Kr(r,n,o),Da(r,n,m,h,i,l)}if(c&&c.length)for(let u of c)l??=Kr(r,n,o),Da(r,n,u,i,i,l)}}function Le(e=1){return Lm(e)}function f0(e,n){let t=null,r=Pw(e);for(let i=0;i<n.length;i++){let o=n[i];if(o==="*"){t=i;continue}if(r===null?mg(e,o,!0):jw(r,o))return i}return t}function Ue(e){let n=N()[Xe][We];if(!n.projection){let t=e?e.length:1,r=n.projection=dm(t,null),i=r.slice(),o=n.child;for(;o!==null;){if(o.type!==128){let s=e?f0(o,e):0;s!==null&&(i[s]?i[s].projectionNext=o:r[s]=o,i[s]=o)}o=o.next}}}function ee(e,n=0,t,r,i,o){let s=N(),a=ye(),l=r?e+1:null;l!==null&&so(s,a,l,r,i,o,null,t);let c=si(a,ge+e,16,null,t||null);c.projection===null&&(c.projection=n),md();let u=!s[er]||cd();s[Xe][We].projection[c.projection]===null&&l!==null?h0(s,a,l):u&&!Aa(c)&&cE(a,s,c)}function h0(e,n,t){let r=ge+t,i=n.data[r],o=e[r],s=ba(o,i.tView.ssrId),a=uo(e,i,void 0,{dehydratedView:s});fo(o,a,0,ti(i,s))}function $a(e,n,t,r){return ov(e,n,t,r),$a}function Bt(e,n,t){return iv(e,n,t),Bt}function xe(e){let n=N(),t=ye(),r=Qs();Yi(r+1);let i=Uu(t,r);if(e.dirty&&bm(n)===((i.metadata.flags&2)===2)){if(i.matches===null)e.reset([]);else{let o=av(n,r);e.reset(o,zp),e.notifyOnChanges()}return!0}return!1}function Ie(){return Hu(N(),Qs())}function Ga(e,n,t,r,i){return cv(n,ov(e,t,r,i)),Ga}function Wa(e,n,t,r){return cv(e,iv(n,t,r)),Wa}function Ya(e=1){Yi(Qs()+e)}function ci(e){let n=Sm();return td(n,ge+e)}function aa(e,n){return e<<17|n<<2}function pr(e){return e>>17&32767}function m0(e){return(e&2)==2}function p0(e,n){return e&131071|n<<17}function hu(e){return e|2}function ri(e){return(e&131068)>>2}function Nd(e,n){return e&-131069|n<<2}function g0(e){return(e&1)===1}function mu(e){return e|1}function v0(e,n,t,r,i,o){let s=o?n.classBindings:n.styleBindings,a=pr(s),l=ri(s);e[r]=t;let c=!1,d;if(Array.isArray(t)){let u=t;d=u[1],(d===null||Hr(u,d)>0)&&(c=!0)}else d=t;if(i)if(l!==0){let m=pr(e[a+1]);e[r+1]=aa(m,a),m!==0&&(e[m+1]=Nd(e[m+1],r)),e[a+1]=p0(e[a+1],r)}else e[r+1]=aa(a,0),a!==0&&(e[a+1]=Nd(e[a+1],r)),a=r;else e[r+1]=aa(l,0),a===0?a=r:e[l+1]=Nd(e[l+1],r),l=r;c&&(e[r+1]=hu(e[r+1])),Cp(e,d,r,!0),Cp(e,d,r,!1),y0(n,d,e,r,o),s=aa(a,l),o?n.classBindings=s:n.styleBindings=s}function y0(e,n,t,r,i){let o=i?e.residualClasses:e.residualStyles;o!=null&&typeof n=="string"&&Hr(o,n)>=0&&(t[r+1]=mu(t[r+1]))}function Cp(e,n,t,r){let i=e[t+1],o=n===null,s=r?pr(i):ri(i),a=!1;for(;s!==0&&(a===!1||o);){let l=e[s],c=e[s+1];b0(l,n)&&(a=!0,e[s+1]=r?mu(c):hu(c)),s=r?pr(c):ri(c)}a&&(e[t+1]=r?hu(i):mu(i))}function b0(e,n){return e===null||n==null||(Array.isArray(e)?e[1]:e)===n?!0:Array.isArray(e)&&typeof n=="string"?Hr(e,n)>=0:!1}var Ct={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function _0(e){return e.substring(Ct.key,Ct.keyEnd)}function D0(e){return w0(e),yv(e,bv(e,0,Ct.textEnd))}function yv(e,n){let t=Ct.textEnd;return t===n?-1:(n=Ct.keyEnd=E0(e,Ct.key=n,t),bv(e,n,t))}function w0(e){Ct.key=0,Ct.keyEnd=0,Ct.value=0,Ct.valueEnd=0,Ct.textEnd=e.length}function bv(e,n,t){for(;n<t&&e.charCodeAt(n)<=32;)n++;return n}function E0(e,n,t){for(;n<t&&e.charCodeAt(n)>32;)n++;return n}function _r(e,n,t){return _v(e,n,t,!1),_r}function U(e,n){return _v(e,n,null,!0),U}function Dr(e){x0(N0,C0,e,!0)}function C0(e,n){for(let t=D0(n);t>=0;t=yv(n,t))zs(e,_0(n),!0)}function _v(e,n,t,r){let i=N(),o=ye(),s=gd(2);if(o.firstUpdatePass&&wv(o,e,s,r),n!==ht&&tn(i,s,n)){let a=o.data[Xt()];Ev(o,a,i,i[ce],e,i[s+1]=k0(n,t),r,s)}}function x0(e,n,t,r){let i=ye(),o=gd(2);i.firstUpdatePass&&wv(i,null,o,r);let s=N();if(t!==ht&&tn(s,o,t)){let a=i.data[Xt()];if(Cv(a,r)&&!Dv(i,o)){let l=r?a.classesWithoutHost:a.stylesWithoutHost;l!==null&&(t=Vs(l,t||"")),fu(i,a,s,t,r)}else R0(i,a,s,s[ce],s[o+1],s[o+1]=A0(e,n,t),r,o)}}function Dv(e,n){return n>=e.expandoStartIndex}function wv(e,n,t,r){let i=e.data;if(i[t+1]===null){let o=i[Xt()],s=Dv(e,t);Cv(o,r)&&n===null&&!s&&(n=!1),n=I0(i,o,n,r),v0(i,o,n,t,s,r)}}function I0(e,n,t,r){let i=km(e),o=r?n.residualClasses:n.residualStyles;if(i===null)(r?n.classBindings:n.styleBindings)===0&&(t=Rd(null,e,n,t,r),t=ao(t,n.attrs,r),o=null);else{let s=n.directiveStylingLast;if(s===-1||e[s]!==i)if(t=Rd(i,e,n,t,r),o===null){let l=S0(e,n,r);l!==void 0&&Array.isArray(l)&&(l=Rd(null,e,n,l[1],r),l=ao(l,n.attrs,r),M0(e,n,r,l))}else o=T0(e,n,r)}return o!==void 0&&(r?n.residualClasses=o:n.residualStyles=o),t}function S0(e,n,t){let r=t?n.classBindings:n.styleBindings;if(ri(r)!==0)return e[pr(r)]}function M0(e,n,t,r){let i=t?n.classBindings:n.styleBindings;e[pr(i)]=r}function T0(e,n,t){let r,i=n.directiveEnd;for(let o=1+n.directiveStylingLast;o<i;o++){let s=e[o].hostAttrs;r=ao(r,s,t)}return ao(r,n.attrs,t)}function Rd(e,n,t,r,i){let o=null,s=t.directiveEnd,a=t.directiveStylingLast;for(a===-1?a=t.directiveStart:a++;a<s&&(o=n[a],r=ao(r,o.hostAttrs,i),o!==e);)a++;return e!==null&&(t.directiveStylingLast=a),r}function ao(e,n,t){let r=t?1:2,i=-1;if(n!==null)for(let o=0;o<n.length;o++){let s=n[o];typeof s=="number"?i=s:i===r&&(Array.isArray(e)||(e=e===void 0?[]:["",e]),zs(e,s,t?!0:n[++o]))}return e===void 0?null:e}function A0(e,n,t){if(t==null||t==="")return $e;let r=[],i=Jt(t);if(Array.isArray(i))for(let o=0;o<i.length;o++)e(r,i[o],!0);else if(i instanceof Set)for(let o of i)e(r,o,!0);else if(typeof i=="object")for(let o in i)Object.hasOwn(i,o)&&e(r,o,i[o]);else typeof i=="string"&&n(r,i);return r}function N0(e,n,t){let r=String(n);r!==""&&!r.includes(" ")&&zs(e,r,t)}function R0(e,n,t,r,i,o,s,a){i===ht&&(i=$e);let l=0,c=0,d=0<i.length?i[0]:null,u=0<o.length?o[0]:null;for(;d!==null||u!==null;){let m=l<i.length?i[l+1]:void 0,h=c<o.length?o[c+1]:void 0,p=null,_;d===u?(l+=2,c+=2,m!==h&&(p=u,_=h)):u===null||d!==null&&d<u?(l+=2,p=d):(c+=2,p=u,_=h),p!==null&&Ev(e,n,t,r,p,_,s,a),d=l<i.length?i[l]:null,u=c<o.length?o[c]:null}}function Ev(e,n,t,r,i,o,s,a){if(!(n.type&3))return;let l=e.data,c=l[a+1],d=g0(c)?xp(l,n,t,i,ri(c),s):void 0;if(!Ma(d)){Ma(o)||m0(c)&&(o=xp(l,null,t,i,a,s));let u=ed(Xt(),t);uE(r,s,u,i,o)}}function xp(e,n,t,r,i,o){let s=n===null,a;for(;i>0;){let l=e[i],c=Array.isArray(l),d=c?l[1]:l,u=d===null,m=t[i+1];m===ht&&(m=u?$e:void 0);let h=u?$s(m,r):d===r?m:void 0;if(c&&!Ma(h)&&(h=$s(l,r)),Ma(h)&&(a=h,s))return a;let p=e[i+1];i=s?pr(p):ri(p)}if(n!==null){let l=o?n.residualClasses:n.residualStyles;l!=null&&(a=$s(l,r))}return a}function Ma(e){return e!==void 0}function k0(e,n){return e==null||e===""||(typeof n=="string"?e=e+n:typeof e=="object"&&(e=Ls(Jt(e)))),e}function Cv(e,n){return(e.flags&(n?8:16))!==0}function w(e,n=""){let t=N(),r=ye(),i=e+ge,o=r.firstCreatePass?si(r,i,1,n,null):r.data[i],s=O0(r,t,o,n);t[i]=s,ta()&&Ru(r,t,s,o),qr(o,!1)}var O0=(e,n,t,r)=>(na(!0),Sw(n[ce],r));function F0(e,n,t,r=""){return tn(e,lr(),t)?n+Hc(t)+r:ht}function ie(e){return rn("",e),ie}function rn(e,n,t){let r=N(),i=F0(r,e,n,t);return i!==ht&&P0(r,Xt(),i),rn}function P0(e,n,t){let r=ed(n,e);Mw(e[ce],r,t)}function Ip(e,n,t){let r=ye();r.firstCreatePass&&xv(n,r.data,r.blueprint,Ft(e),t)}function xv(e,n,t,r,i){if(e=Ve(e),Array.isArray(e))for(let o=0;o<e.length;o++)xv(e[o],n,t,r,i);else{let o=ye(),s=N(),a=je(),l=Qn(e)?e:Ve(e.provide),c=qc(e),d=a.providerIndexes&1048575,u=a.directiveStart,m=a.providerIndexes>>20;if(Qn(e)||!e.multi){let h=new fr(c,i,re,null),p=Od(l,n,i?d:d+m,u);p===-1?(Ld(ga(a,s),o,l),kd(o,e,n.length),n.push(l),a.directiveStart++,a.directiveEnd++,i&&(a.providerIndexes+=1048576),t.push(h),s.push(h)):(t[p]=h,s[p]=h)}else{let h=Od(l,n,d+m,u),p=Od(l,n,d,d+m),_=h>=0&&t[h],C=p>=0&&t[p];if(i&&!C||!i&&!_){Ld(ga(a,s),o,l);let F=j0(i?V0:L0,t.length,i,r,c,e);!i&&C&&(t[p].providerFactory=F),kd(o,e,n.length,0),n.push(l),a.directiveStart++,a.directiveEnd++,i&&(a.providerIndexes+=1048576),t.push(F),s.push(F)}else{let F=Iv(t[i?p:h],c,!i&&r);kd(o,e,h>-1?h:p,F)}!i&&r&&C&&t[p].componentProviders++}}}function kd(e,n,t,r){let i=Qn(n),o=pm(n);if(i||o){let l=(o?Ve(n.useClass):n).prototype.ngOnDestroy;if(l){let c=e.destroyHooks||(e.destroyHooks=[]);if(!i&&n.multi){let d=c.indexOf(t);d===-1?c.push(t,[r,l]):c[d+1].push(r,l)}else c.push(t,l)}}}function Iv(e,n,t){return t&&e.componentProviders++,e.multi.push(n)-1}function Od(e,n,t,r){for(let i=t;i<r;i++)if(n[i]===e)return i;return-1}function L0(e,n,t,r,i){return pu(this.multi,[])}function V0(e,n,t,r,i){let o=this.multi,s;if(this.providerFactory){let a=this.providerFactory.componentProviders,l=to(r,r[I],this.providerFactory.index,i);s=l.slice(0,a),pu(o,s);for(let c=a;c<l.length;c++)s.push(l[c])}else s=[],pu(o,s);return s}function pu(e,n){for(let t=0;t<e.length;t++){let r=e[t];n.push(r())}return n}function j0(e,n,t,r,i,o){let s=new fr(e,t,re,null);return s.multi=[],s.index=n,s.componentProviders=0,Iv(s,i,r&&!t),s}function De(e,n){return t=>{t.providersResolver=(r,i)=>Ip(r,i?i(e):e,!1),n&&(t.viewProvidersResolver=(r,i)=>Ip(r,i?i(n):n,!0))}}function B0(e,n){let t=e[n];return t===ht?void 0:t}function H0(e,n,t,r,i,o){let s=n+t;return tn(e,s,i)?eC(e,s+1,o?r.call(o,i):r(i)):B0(e,s+1)}function Se(e,n){let t=ye(),r,i=e+ge;t.firstCreatePass?(r=U0(n,t.pipeRegistry),t.data[i]=r,r.onDestroy&&(t.destroyHooks??=[]).push(i,r.onDestroy)):r=t.data[i];let o=r.factory||(r.factory=mn(r.type,!0)),s,a=Ze(re);try{let l=pa(!1),c=o();return pa(l),nd(t,N(),i,c),c}finally{Ze(a)}}function U0(e,n){if(n)for(let t=n.length-1;t>=0;t--){let r=n[t];if(e===r.name)return r}}function Me(e,n,t){let r=e+ge,i=N(),o=td(i,r);return z0(i,r)?H0(i,Mm(),n,o.transform,t,o):o.transform(t)}function z0(e,n){return e[I].data[n].pure}function Ku(e,n){return Ba(e,n)}var Sv=(()=>{class e{applicationErrorHandler=f(En);appRef=f(It);taskService=f(cr);ngZone=f(A);zonelessEnabled=f(Xi);tracing=f(jt,{optional:!0});zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new oe;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(ji):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(f(Cd,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{let t=this.taskService.add();if(!this.runningTick&&(this.cleanup(),!this.zonelessEnabled||this.appRef.includeAllTestViews)){this.taskService.remove(t);return}this.switchToMicrotaskScheduler(),this.taskService.remove(t)})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()}))}switchToMicrotaskScheduler(){this.ngZone.runOutsideAngular(()=>{let t=this.taskService.add();this.useMicrotaskScheduler=!0,queueMicrotask(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(t)})})}notify(t){if(!this.zonelessEnabled&&t===5)return;switch(t){case 0:case 2:{this.appRef.dirtyFlags|=2;break}case 3:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2;break}case 12:{this.appRef.dirtyFlags|=16;break}case 13:{this.appRef.dirtyFlags|=2;break}case 11:break;case 9:case 8:case 7:case 10:default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick())return;let r=this.useMicrotaskScheduler?Um:_d;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>r(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>r(()=>this.tick()))}shouldScheduleTick(){return!(this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(ji+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let t=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(r){this.applicationErrorHandler(r)}finally{this.taskService.remove(t),this.cleanup()}}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let t=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(t)}}static \u0275fac=function(r){return new(r||e)};static \u0275prov=R({token:e,factory:e.\u0275fac})}return e})();function Mv(){return[{provide:Tt,useExisting:Sv},{provide:A,useClass:Bi},{provide:Xi,useValue:!0}]}function $0(){return typeof $localize<"u"&&$localize.locale||ho}var di=new b("",{factory:()=>f(di,{optional:!0,skipSelf:!0})||$0()});var qa=class{destroyed=!1;listeners=null;errorHandler=f(Ge,{optional:!0});isEmitting=!1;hasNullListeners=!1;destroyRef=f(Qe);constructor(){this.destroyRef.onDestroy(()=>{this.destroyed=!0,this.listeners=null})}subscribe(n){if(this.destroyed)throw new E(953,!1);return(this.listeners??=[]).push(n),{unsubscribe:()=>{let t=this.listeners?this.listeners.indexOf(n):-1;t>-1&&(this.isEmitting?(this.hasNullListeners=!0,this.listeners[t]=null):this.listeners.splice(t,1))}}}emit(n){if(this.destroyed){console.warn(gn(953,!1));return}if(this.listeners===null)return;this.isEmitting=!0;let t=x(null);try{for(let r of this.listeners)try{r!==null&&r(n)}catch(i){this.errorHandler?.handleError(i)}}finally{this.hasNullListeners&&(this.hasNullListeners=!1,this.listeners&&G0(this.listeners)),x(t),this.isEmitting=!1}}};function G0(e){let n=e.length-1;for(;n>-1;)e[n]===null&&e.splice(n,1),n--}function ze(e,n){return Si(e,n?.equal)}function Pe(e){return wh(e)}var kv=Symbol("InputSignalNode#UNSET"),lx=H(D({},Mi),{transformFn:void 0,applyValueToInputSignal(e,n){Nr(e,n)}});function Ov(e,n){let t=Object.create(lx);t.value=e,t.transformFn=n?.transform;function r(){if(Hn(t),t.value===kv){let i=null;throw new E(-950,i)}return t.value}return r[ke]=t,r}var ui=class{attributeName;constructor(n){this.attributeName=n}__NG_ELEMENT_ID__=()=>vu(this.attributeName);toString(){return`HostAttributeToken ${this.attributeName}`}};function fi(e){return new qa}function Tv(e,n){return Ov(e,n)}function cx(e){return Ov(kv,e)}var z=(Tv.required=cx,Tv);function Av(e,n){return zu(n)}function dx(e,n){return $u(n)}var po=(Av.required=dx,Av);function Nv(e,n){return zu(n)}function ux(e,n){return $u(n)}var Fv=(Nv.required=ux,Nv);var fx=1e4;var r2=fx-1e3;var Nn=(()=>{class e{static __NG_ELEMENT_ID__=hx}return e})();function hx(e){return mx(je(),N(),(e&16)===16)}function mx(e,n,t){if(Zt(e)&&!t){let r=ut(e.index,n);return new Mn(r,r)}else if(e.type&175){let r=n[Xe];return new Mn(r,n)}return null}var ef=new b(""),px=new b("");function mo(e){return!e.moduleRef}function gx(e){let n=mo(e)?e.r3Injector:e.moduleRef.injector,t=n.get(A);return t.run(()=>{mo(e)?e.r3Injector.resolveInjectorInitializers():e.moduleRef.resolveInjectorInitializers();let r=n.get(En),i;if(t.runOutsideAngular(()=>{i=t.onError.subscribe({next:r})}),mo(e)){let o=()=>n.destroy(),s=e.platformInjector.get(ef);s.add(o),n.onDestroy(()=>{i.unsubscribe(),s.delete(o)})}else{let o=()=>e.moduleRef.destroy(),s=e.platformInjector.get(ef);s.add(o),e.moduleRef.onDestroy(()=>{eo(e.allPlatformModules,e.moduleRef),i.unsubscribe(),s.delete(o)})}return yx(r,t,()=>{let o=n.get(cr),s=o.add(),a=n.get(Yu);return a.runInitializers(),a.donePromise.then(()=>{let l=n.get(di,ho);if(vv(l||ho),!n.get(px,!0))return mo(e)?n.get(It):(e.allPlatformModules.push(e.moduleRef),e.moduleRef);if(mo(e)){let d=n.get(It);return e.rootComponent!==void 0&&d.bootstrap(e.rootComponent),d}else return vx?.(e.moduleRef,e.allPlatformModules),e.moduleRef}).finally(()=>{o.remove(s)})})})}var vx;function yx(e,n,t){try{let r=t();return br(r)?r.catch(i=>{throw n.runOutsideAngular(()=>e(i)),i}):r}catch(r){throw n.runOutsideAngular(()=>e(r)),r}}var Za=null;function bx(e=[],n){return J.create({name:n,providers:[{provide:zi,useValue:"platform"},{provide:ef,useValue:new Set([()=>Za=null])},...e]})}function _x(e=[]){if(Za)return Za;let n=bx(e);return Za=n,pv(),Dx(n),n}function Dx(e){let n=e.get(ra,null);$r(e,()=>{n?.forEach(t=>t())})}function Pv(e){let{rootComponent:n,appProviders:t,platformProviders:r,platformRef:i}=e;K(Z.BootstrapApplicationStart);try{let o=i?.injector??_x(r),s=[Mv(),$m,...t||[]],a=new oo({providers:s,parent:o,debugName:"",runEnvironmentInitializers:!1});return gx({r3Injector:a.injector,platformInjector:o,rootComponent:n})}catch(o){return Promise.reject(o)}finally{K(Z.BootstrapApplicationEnd)}}function we(e){return typeof e=="boolean"?e:e!=null&&e!=="false"}function Qa(e,n=NaN){return!isNaN(parseFloat(e))&&!isNaN(Number(e))?Number(e):n}var Ju=Symbol("NOT_SET"),Lv=new Set,wx=H(D({},Mi),{kind:"afterRenderEffectPhase",consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,value:Ju,cleanup:null,consumerMarkedDirty(){if(this.sequence.impl.executing){if(this.sequence.lastPhase===null||this.sequence.lastPhase<this.phase)return;this.sequence.erroredOrDestroyed=!0}this.sequence.scheduler.notify(7)},phaseFn(e){if(this.sequence.lastPhase=this.phase,!this.dirty)return this.signal;if(this.dirty=!1,this.value!==Ju&&!Tr(this))return this.signal;try{for(let i of this.cleanup??Lv)i()}finally{this.cleanup?.clear()}let n=[];e!==void 0&&n.push(e),n.push(this.registerCleanupFn);let t=cn(this),r;try{r=this.userFn.apply(null,n)}finally{Un(this,t)}return(this.value===Ju||!this.equal(this.value,r))&&(this.value=r,this.version++),this.signal}}),tf=class extends no{scheduler;lastPhase=null;nodes=[void 0,void 0,void 0,void 0];onDestroyFns=null;constructor(n,t,r,i,o,s=null){super(n,[void 0,void 0,void 0,void 0],r,!1,o.get(Qe),s),this.scheduler=i;for(let a of Mu){let l=t[a];if(l===void 0)continue;let c=Object.create(wx);c.sequence=this,c.phase=a,c.userFn=l,c.dirty=!0,c.signal=()=>(Hn(c),c.value),c.signal[ke]=c,c.registerCleanupFn=d=>(c.cleanup??=new Set).add(d),this.nodes[a]=c,this.hooks[a]=d=>c.phaseFn(d)}}afterRun(){super.afterRun(),this.lastPhase=null}destroy(){if(this.onDestroyFns!==null)for(let n of this.onDestroyFns)n();super.destroy();for(let n of this.nodes)if(n)try{for(let t of n.cleanup??Lv)t()}finally{dn(n)}}};function nf(e,n){let t=n?.injector??f(J),r=t.get(Tt),i=t.get(Oa),o=t.get(jt,null,{optional:!0});i.impl??=t.get(Tu);let s=e;typeof s=="function"&&(s={mixedReadWrite:e});let a=t.get(Zr,null,{optional:!0}),l=new tf(i.impl,[s.earlyRead,s.write,s.mixedReadWrite,s.read],a?.view,r,t,o?.snapshot(null));return i.impl.register(l),l}function Ka(e,n){let t=vn(e),r=n.elementInjector||zr();return new ni(t).create(r,n.projectableNodes,n.hostElement,n.environmentInjector,n.directives,n.bindings)}var Vv=null;function vt(){return Vv}function rf(e){Vv??=e}var go=class{},Ja=(()=>{class e{historyGo(t){throw new Error("")}static \u0275fac=function(r){return new(r||e)};static \u0275prov=P({token:e,factory:()=>f(jv),providedIn:"platform"})}return e})();var jv=(()=>{class e extends Ja{_location;_history;_doc=f(j);constructor(){super(),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return vt().getBaseHref(this._doc)}onPopState(t){let r=vt().getGlobalEventTarget(this._doc,"window");return r.addEventListener("popstate",t,!1),()=>r.removeEventListener("popstate",t)}onHashChange(t){let r=vt().getGlobalEventTarget(this._doc,"window");return r.addEventListener("hashchange",t,!1),()=>r.removeEventListener("hashchange",t)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(t){this._location.pathname=t}pushState(t,r,i){this._history.pushState(t,r,i)}replaceState(t,r,i){this._history.replaceState(t,r,i)}forward(){this._history.forward()}back(){this._history.back()}historyGo(t=0){this._history.go(t)}getState(){return this._history.state}static \u0275fac=function(r){return new(r||e)};static \u0275prov=P({token:e,factory:()=>new e,providedIn:"platform"})}return e})();function Uv(e,n){return e?n?e.endsWith("/")?n.startsWith("/")?e+n.slice(1):e+n:n.startsWith("/")?e+n:`${e}/${n}`:e:n}function Bv(e){let n=e.search(/#|\?|$/);return e[n-1]==="/"?e.slice(0,n-1)+e.slice(n):e}function Rn(e){return e&&e[0]!=="?"?`?${e}`:e}var el=(()=>{class e{historyGo(t){throw new Error("")}static \u0275fac=function(r){return new(r||e)};static \u0275prov=P({token:e,factory:()=>f(Cx),providedIn:"root"})}return e})(),Ex=new b(""),Cx=(()=>{class e extends el{_platformLocation;_baseHref;_removeListenerFns=[];constructor(t,r){super(),this._platformLocation=t,this._baseHref=r??this._platformLocation.getBaseHrefFromDOM()??f(j).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(t){this._removeListenerFns.push(this._platformLocation.onPopState(t),this._platformLocation.onHashChange(t))}getBaseHref(){return this._baseHref}prepareExternalUrl(t){return Uv(this._baseHref,t)}path(t=!1){let r=this._platformLocation.pathname+Rn(this._platformLocation.search),i=this._platformLocation.hash;return i&&t?`${r}${i}`:r}pushState(t,r,i,o){let s=this.prepareExternalUrl(i+Rn(o));this._platformLocation.pushState(t,r,s)}replaceState(t,r,i,o){let s=this.prepareExternalUrl(i+Rn(o));this._platformLocation.replaceState(t,r,s)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(t=0){this._platformLocation.historyGo?.(t)}static \u0275fac=function(r){return new(r||e)(S(Ja),S(Ex,8))};static \u0275prov=P({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var tl=(()=>{class e{_subject=new B;_basePath;_locationStrategy;_urlChangeListeners=[];_urlChangeSubscription=null;constructor(t){this._locationStrategy=t;let r=this._locationStrategy.getBaseHref();this._basePath=Sx(Bv(Hv(r))),this._locationStrategy.onPopState(i=>{this._subject.next({url:this.path(!0),pop:!0,state:i.state,type:i.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(t=!1){return this.normalize(this._locationStrategy.path(t))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(t,r=""){return this.path()==this.normalize(t+Rn(r))}normalize(t){return e.stripTrailingSlash(Ix(this._basePath,Hv(t)))}prepareExternalUrl(t){return t&&t[0]!=="/"&&(t="/"+t),this._locationStrategy.prepareExternalUrl(t)}go(t,r="",i=null){this._locationStrategy.pushState(i,"",t,r),this._notifyUrlChangeListeners(this.prepareExternalUrl(t+Rn(r)),i)}replaceState(t,r="",i=null){this._locationStrategy.replaceState(i,"",t,r),this._notifyUrlChangeListeners(this.prepareExternalUrl(t+Rn(r)),i)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(t=0){this._locationStrategy.historyGo?.(t)}onUrlChange(t){return this._urlChangeListeners.push(t),this._urlChangeSubscription??=this.subscribe(r=>{this._notifyUrlChangeListeners(r.url,r.state)}),()=>{let r=this._urlChangeListeners.indexOf(t);this._urlChangeListeners.splice(r,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(t="",r){this._urlChangeListeners.forEach(i=>i(t,r))}subscribe(t,r,i){return this._subject.subscribe({next:t,error:r??void 0,complete:i??void 0})}static normalizeQueryParams=Rn;static joinWithSlash=Uv;static stripTrailingSlash=Bv;static \u0275fac=function(r){return new(r||e)(S(el))};static \u0275prov=P({token:e,factory:()=>xx(),providedIn:"root"})}return e})();function xx(){return new tl(S(el))}function Ix(e,n){if(!e||!n.startsWith(e))return n;let t=n.substring(e.length);return t===""||["/",";","?","#"].includes(t[0])?t:n}function Hv(e){return e.replace(/\/index\.html$/,"")}function Sx(e){if(new RegExp("^(https?:)?//").test(e)){let[,t]=e.split(/\/\/[^\/]+/);return t}return e}var of=(()=>{class e{_viewContainerRef;_viewRef=null;ngTemplateOutletContext=null;ngTemplateOutlet=null;ngTemplateOutletInjector=null;injector=f(J);constructor(t){this._viewContainerRef=t}ngOnChanges(t){if(this._shouldRecreateView(t)){let r=this._viewContainerRef;if(this._viewRef&&r.remove(r.indexOf(this._viewRef)),!this.ngTemplateOutlet){this._viewRef=null;return}let i=this._createContextForwardProxy();this._viewRef=r.createEmbeddedView(this.ngTemplateOutlet,i,{injector:this._getInjector()})}}_getInjector(){return this.ngTemplateOutletInjector==="outlet"?this.injector:this.ngTemplateOutletInjector??void 0}_shouldRecreateView(t){return!!t.ngTemplateOutlet||!!t.ngTemplateOutletInjector}_createContextForwardProxy(){return new Proxy({},{set:(t,r,i)=>this.ngTemplateOutletContext?Reflect.set(this.ngTemplateOutletContext,r,i):!1,get:(t,r,i)=>{if(this.ngTemplateOutletContext)return Reflect.get(this.ngTemplateOutletContext,r,i)}})}static \u0275fac=function(r){return new(r||e)(re(nn))};static \u0275dir=$({type:e,selectors:[["","ngTemplateOutlet",""]],inputs:{ngTemplateOutletContext:"ngTemplateOutletContext",ngTemplateOutlet:"ngTemplateOutlet",ngTemplateOutletInjector:"ngTemplateOutletInjector"},features:[rt]})}return e})();var sf=(()=>{class e{transform(t){return JSON.stringify(t,null,2)}static \u0275fac=function(r){return new(r||e)};static \u0275pipe=Wu({name:"json",type:e,pure:!1})}return e})();var Ht=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=X({type:e});static \u0275inj=Y({})}return e})();function af(e,n){n=encodeURIComponent(n);for(let t of e.split(";")){let r=t.indexOf("="),[i,o]=r==-1?[t,""]:[t.slice(0,r),t.slice(r+1)];if(i.trim()===n)return decodeURIComponent(o)}return null}var lf="browser";function zv(e){return e===lf}var vo=class{_doc;constructor(n){this._doc=n}manager},nl=(()=>{class e extends vo{constructor(t){super(t)}supports(t){return!0}addEventListener(t,r,i,o){return t.addEventListener(r,i,o),()=>this.removeEventListener(t,r,i,o)}removeEventListener(t,r,i,o){return t.removeEventListener(r,i,o)}static \u0275fac=function(r){return new(r||e)(S(j))};static \u0275prov=P({token:e,factory:e.\u0275fac})}return e})(),ol=new b(""),ff=(()=>{class e{_zone;_plugins;_eventNameToPlugin=new Map;constructor(t,r){this._zone=r,t.forEach(s=>{s.manager=this});let i=t.filter(s=>!(s instanceof nl));this._plugins=i.slice().reverse();let o=t.find(s=>s instanceof nl);o&&this._plugins.push(o)}addEventListener(t,r,i,o){return this._findPluginFor(r).addEventListener(t,r,i,o)}getZone(){return this._zone}_findPluginFor(t){let r=this._eventNameToPlugin.get(t);if(r)return r;if(r=this._plugins.find(o=>o.supports(t)),!r)throw new E(-5101,!1);return this._eventNameToPlugin.set(t,r),r}static \u0275fac=function(r){return new(r||e)(S(ol),S(A))};static \u0275prov=P({token:e,factory:e.\u0275fac})}return e})(),cf="ng-app-id";function $v(e){for(let n of e)n.remove()}function Gv(e,n){let t=n.createElement("style");return t.textContent=e,t}function Nx(e,n,t,r){let i=e.head?.querySelectorAll(`style[${cf}="${n}"],link[${cf}="${n}"]`);if(!i||i.length===0)return!1;for(let o of i)o.removeAttribute(cf),o instanceof HTMLLinkElement?r.set(o.href.slice(o.href.lastIndexOf("/")+1),{usage:0,elements:[o]}):o.textContent&&t.set(o.textContent,{usage:0,elements:[o]});return!0}function uf(e,n){let t=n.createElement("link");return t.setAttribute("rel","stylesheet"),t.setAttribute("href",e),t}var hf=(()=>{class e{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(t,r,i,o={}){this.doc=t,this.appId=r,this.nonce=i,Nx(t,r,this.inline,this.external)&&this.hosts.add(t.head)}addStyles(t,r){for(let i of t)this.addUsage(i,this.inline,Gv);r?.forEach(i=>this.addUsage(i,this.external,uf))}removeStyles(t,r){for(let i of t)this.removeUsage(i,this.inline);r?.forEach(i=>this.removeUsage(i,this.external))}addUsage(t,r,i){let o=r.get(t);o?o.usage++:r.set(t,{usage:1,elements:[...this.hosts].map(s=>this.addElement(s,i(t,this.doc)))})}removeUsage(t,r){let i=r.get(t);i&&(i.usage--,i.usage<=0&&($v(i.elements),r.delete(t)))}ngOnDestroy(){for(let[,{elements:t}]of[...this.inline,...this.external])$v(t);this.hosts.clear()}addHost(t){if(!this.hosts.has(t)){this.hosts.add(t);for(let[r,{elements:i}]of this.inline)i.push(this.addElement(t,Gv(r,this.doc)));for(let[r,{elements:i}]of this.external)i.push(this.addElement(t,uf(r,this.doc)))}}removeHost(t){this.hosts.delete(t);for(let r of[...this.inline.values(),...this.external.values()]){let i=[];for(let o of r.elements)o.parentNode===t?o.remove():i.push(o);r.elements=i}}addElement(t,r){return this.nonce&&r.setAttribute("nonce",this.nonce),t.appendChild(r)}static \u0275fac=function(r){return new(r||e)(S(j),S(dr),S(Cn,8),S(ur))};static \u0275prov=P({token:e,factory:e.\u0275fac})}return e})(),df={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},mf=/%COMP%/g;var Yv="%COMP%",Rx=`_nghost-${Yv}`,kx=`_ngcontent-${Yv}`,Ox=!0,Fx=new b("",{factory:()=>Ox});function Px(e){return kx.replace(mf,e)}function Lx(e){return Rx.replace(mf,e)}function qv(e,n){return n.map(t=>t.replace(mf,e))}var pf=(()=>{class e{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;constructor(t,r,i,o,s,a,l=null,c=null){this.eventManager=t,this.sharedStylesHost=r,this.appId=i,this.removeStylesOnCompDestroy=o,this.doc=s,this.ngZone=a,this.nonce=l,this.tracingService=c,this.defaultRenderer=new yo(t,s,a,this.tracingService)}createRenderer(t,r){if(!t||!r)return this.defaultRenderer;let i=this.getOrCreateRenderer(t,r);return i instanceof il?i.applyToHost(t):i instanceof bo&&i.applyStyles(),i}getOrCreateRenderer(t,r){let i=this.rendererByCompId,o=i.get(r.id);if(!o){let s=this.doc,a=this.ngZone,l=this.eventManager,c=this.sharedStylesHost,d=this.removeStylesOnCompDestroy,u=this.tracingService;switch(r.encapsulation){case xt.Emulated:o=new il(l,c,r,this.appId,d,s,a,u);break;case xt.ShadowDom:return new rl(l,t,r,s,a,this.nonce,u,c);case xt.ExperimentalIsolatedShadowDom:return new rl(l,t,r,s,a,this.nonce,u);default:o=new bo(l,c,r,d,s,a,u);break}i.set(r.id,o)}return o}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(t){this.rendererByCompId.delete(t)}static \u0275fac=function(r){return new(r||e)(S(ff),S(yr),S(dr),S(Fx),S(j),S(A),S(Cn),S(jt,8))};static \u0275prov=P({token:e,factory:e.\u0275fac})}return e})(),yo=class{eventManager;doc;ngZone;tracingService;data=Object.create(null);throwOnSyntheticProps=!0;constructor(n,t,r,i){this.eventManager=n,this.doc=t,this.ngZone=r,this.tracingService=i}destroy(){}destroyNode=null;createElement(n,t){return t?this.doc.createElementNS(df[t]||t,n):this.doc.createElement(n)}createComment(n){return this.doc.createComment(n)}createText(n){return this.doc.createTextNode(n)}appendChild(n,t){(Wv(n)?n.content:n).appendChild(t)}insertBefore(n,t,r){n&&(Wv(n)?n.content:n).insertBefore(t,r)}removeChild(n,t){t.remove()}selectRootElement(n,t){let r=typeof n=="string"?this.doc.querySelector(n):n;if(!r)throw new E(-5104,!1);return t||(r.textContent=""),r}parentNode(n){return n.parentNode}nextSibling(n){return n.nextSibling}setAttribute(n,t,r,i){if(i){t=i+":"+t;let o=df[i];o?n.setAttributeNS(o,t,r):n.setAttribute(t,r)}else n.setAttribute(t,r)}removeAttribute(n,t,r){if(r){let i=df[r];i?n.removeAttributeNS(i,t):n.removeAttribute(`${r}:${t}`)}else n.removeAttribute(t)}addClass(n,t){n.classList.add(t)}removeClass(n,t){n.classList.remove(t)}setStyle(n,t,r,i){i&(Vt.DashCase|Vt.Important)?n.style.setProperty(t,r,i&Vt.Important?"important":""):n.style[t]=r}removeStyle(n,t,r){r&Vt.DashCase?n.style.removeProperty(t):n.style[t]=""}setProperty(n,t,r){n!=null&&(n[t]=r)}setValue(n,t){n.nodeValue=t}listen(n,t,r,i){if(typeof n=="string"&&(n=vt().getGlobalEventTarget(this.doc,n),!n))throw new E(-5102,!1);let o=this.decoratePreventDefault(r);return this.tracingService?.wrapEventListener&&(o=this.tracingService.wrapEventListener(n,t,o)),this.eventManager.addEventListener(n,t,o,i)}decoratePreventDefault(n){return t=>{if(t==="__ngUnwrap__")return n;n(t)===!1&&t.preventDefault()}}};function Wv(e){return e.tagName==="TEMPLATE"&&e.content!==void 0}var rl=class extends yo{hostEl;sharedStylesHost;shadowRoot;constructor(n,t,r,i,o,s,a,l){super(n,i,o,a),this.hostEl=t,this.sharedStylesHost=l,this.shadowRoot=t.attachShadow({mode:"open"}),this.sharedStylesHost&&this.sharedStylesHost.addHost(this.shadowRoot);let c=r.styles;c=qv(r.id,c);for(let u of c){let m=document.createElement("style");s&&m.setAttribute("nonce",s),m.textContent=u,this.shadowRoot.appendChild(m)}let d=r.getExternalStyles?.();if(d)for(let u of d){let m=uf(u,i);s&&m.setAttribute("nonce",s),this.shadowRoot.appendChild(m)}}nodeOrShadowRoot(n){return n===this.hostEl?this.shadowRoot:n}appendChild(n,t){return super.appendChild(this.nodeOrShadowRoot(n),t)}insertBefore(n,t,r){return super.insertBefore(this.nodeOrShadowRoot(n),t,r)}removeChild(n,t){return super.removeChild(null,t)}parentNode(n){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(n)))}destroy(){this.sharedStylesHost&&this.sharedStylesHost.removeHost(this.shadowRoot)}},bo=class extends yo{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(n,t,r,i,o,s,a,l){super(n,o,s,a),this.sharedStylesHost=t,this.removeStylesOnCompDestroy=i;let c=r.styles;this.styles=l?qv(l,c):c,this.styleUrls=r.getExternalStyles?.(l)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){this.removeStylesOnCompDestroy&&Sn.size===0&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}},il=class extends bo{contentAttr;hostAttr;constructor(n,t,r,i,o,s,a,l){let c=i+"-"+r.id;super(n,t,r,o,s,a,l,c),this.contentAttr=Px(c),this.hostAttr=Lx(c)}applyToHost(n){this.applyStyles(),this.setAttribute(n,this.hostAttr,"")}createElement(n,t){let r=super.createElement(n,t);return super.setAttribute(r,this.contentAttr,""),r}};var sl=class e extends go{supportsDOMEvents=!0;static makeCurrent(){rf(new e)}onAndCancel(n,t,r,i){return n.addEventListener(t,r,i),()=>{n.removeEventListener(t,r,i)}}dispatchEvent(n,t){n.dispatchEvent(t)}remove(n){n.remove()}createElement(n,t){return t=t||this.getDefaultDocument(),t.createElement(n)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(n){return n.nodeType===Node.ELEMENT_NODE}isShadowRoot(n){return n instanceof DocumentFragment}getGlobalEventTarget(n,t){return t==="window"?window:t==="document"?n:t==="body"?n.body:null}getBaseHref(n){let t=Vx();return t==null?null:jx(t)}resetBaseElement(){_o=null}getUserAgent(){return window.navigator.userAgent}getCookie(n){return af(document.cookie,n)}},_o=null;function Vx(){return _o=_o||document.head.querySelector("base"),_o?_o.getAttribute("href"):null}function jx(e){return new URL(e,document.baseURI).pathname}var Zv=["alt","control","meta","shift"],Bx={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},Hx={alt:e=>e.altKey,control:e=>e.ctrlKey,meta:e=>e.metaKey,shift:e=>e.shiftKey},Xv=(()=>{class e extends vo{constructor(t){super(t)}supports(t){return e.parseEventName(t)!=null}addEventListener(t,r,i,o){let s=e.parseEventName(r),a=e.eventCallback(s.fullKey,i,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>vt().onAndCancel(t,s.domEventName,a,o))}static parseEventName(t){let r=t.toLowerCase().split("."),i=r.shift();if(r.length===0||!(i==="keydown"||i==="keyup"))return null;let o=e._normalizeKey(r.pop()),s="",a=r.indexOf("code");if(a>-1&&(r.splice(a,1),s="code."),Zv.forEach(c=>{let d=r.indexOf(c);d>-1&&(r.splice(d,1),s+=c+".")}),s+=o,r.length!=0||o.length===0)return null;let l={};return l.domEventName=i,l.fullKey=s,l}static matchEventFullKeyCode(t,r){let i=Bx[t.key]||t.key,o="";return r.indexOf("code.")>-1&&(i=t.code,o="code."),i==null||!i?!1:(i=i.toLowerCase(),i===" "?i="space":i==="."&&(i="dot"),Zv.forEach(s=>{if(s!==i){let a=Hx[s];a(t)&&(o+=s+".")}}),o+=i,o===r)}static eventCallback(t,r,i){return o=>{e.matchEventFullKeyCode(o,t)&&i.runGuarded(()=>r(o))}}static _normalizeKey(t){return t==="esc"?"escape":t}static \u0275fac=function(r){return new(r||e)(S(j))};static \u0275prov=P({token:e,factory:e.\u0275fac})}return e})();function gf(e,n,t){return St(this,null,function*(){let r=D({rootComponent:e},Ux(n,t));return Pv(r)})}function Ux(e,n){return{platformRef:n?.platformRef,appProviders:[...Yx,...e?.providers??[]],platformProviders:Wx}}function zx(){sl.makeCurrent()}function $x(){return new Ge}function Gx(){return bu(document),document}var Wx=[{provide:ur,useValue:lf},{provide:ra,useValue:zx,multi:!0},{provide:j,useFactory:Gx}];var Yx=[{provide:zi,useValue:"root"},{provide:Ge,useFactory:$x},{provide:ol,useClass:nl,multi:!0},{provide:ol,useClass:Xv,multi:!0},pf,{provide:yr,useClass:hf},{provide:hf,useExisting:yr},ff,{provide:Ne,useExisting:pf},[]];var sn=class e{headers;normalizedNames=new Map;lazyInit;lazyUpdate=null;constructor(n){n?typeof n=="string"?this.lazyInit=()=>{this.headers=new Map,n.split(`
`).forEach(t=>{let r=t.indexOf(":");if(r>0){let i=t.slice(0,r),o=t.slice(r+1).trim();this.addHeaderEntry(i,o)}})}:typeof Headers<"u"&&n instanceof Headers?(this.headers=new Map,n.forEach((t,r)=>{this.addHeaderEntry(r,t)})):this.lazyInit=()=>{this.headers=new Map,Object.entries(n).forEach(([t,r])=>{this.setHeaderEntries(t,r)})}:this.headers=new Map}has(n){return this.init(),this.headers.has(n.toLowerCase())}get(n){this.init();let t=this.headers.get(n.toLowerCase());return t&&t.length>0?t[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(n){return this.init(),this.headers.get(n.toLowerCase())||null}append(n,t){return this.clone({name:n,value:t,op:"a"})}set(n,t){return this.clone({name:n,value:t,op:"s"})}delete(n,t){return this.clone({name:n,value:t,op:"d"})}maybeSetNormalizedName(n,t){this.normalizedNames.has(t)||this.normalizedNames.set(t,n)}init(){this.lazyInit&&(this.lazyInit instanceof e?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(n=>this.applyUpdate(n)),this.lazyUpdate=null))}copyFrom(n){n.init(),Array.from(n.headers.keys()).forEach(t=>{this.headers.set(t,n.headers.get(t)),this.normalizedNames.set(t,n.normalizedNames.get(t))})}clone(n){let t=new e;return t.lazyInit=this.lazyInit&&this.lazyInit instanceof e?this.lazyInit:this,t.lazyUpdate=(this.lazyUpdate||[]).concat([n]),t}applyUpdate(n){let t=n.name.toLowerCase();switch(n.op){case"a":case"s":let r=n.value;if(typeof r=="string"&&(r=[r]),r.length===0)return;this.maybeSetNormalizedName(n.name,t);let i=(n.op==="a"?this.headers.get(t):void 0)||[];i.push(...r),this.headers.set(t,i);break;case"d":let o=n.value;if(!o)this.headers.delete(t),this.normalizedNames.delete(t);else{let s=this.headers.get(t);if(!s)return;s=s.filter(a=>o.indexOf(a)===-1),s.length===0?(this.headers.delete(t),this.normalizedNames.delete(t)):this.headers.set(t,s)}break}}addHeaderEntry(n,t){let r=n.toLowerCase();this.maybeSetNormalizedName(n,r),this.headers.has(r)?this.headers.get(r).push(t):this.headers.set(r,[t])}setHeaderEntries(n,t){let r=(Array.isArray(t)?t:[t]).map(o=>o.toString()),i=n.toLowerCase();this.headers.set(i,r),this.maybeSetNormalizedName(n,i)}forEach(n){this.init(),Array.from(this.normalizedNames.keys()).forEach(t=>n(this.normalizedNames.get(t),this.headers.get(t)))}};var bf=class{map=new Map;set(n,t){return this.map.set(n,t),this}get(n){return this.map.has(n)||this.map.set(n,n.defaultValue()),this.map.get(n)}delete(n){return this.map.delete(n),this}has(n){return this.map.has(n)}keys(){return this.map.keys()}},_f=class{encodeKey(n){return Qv(n)}encodeValue(n){return Qv(n)}decodeKey(n){return decodeURIComponent(n)}decodeValue(n){return decodeURIComponent(n)}};function Zx(e,n){let t=new Map;return e.length>0&&e.replace(/^\?/,"").split("&").forEach(i=>{let o=i.indexOf("="),[s,a]=o==-1?[n.decodeKey(i),""]:[n.decodeKey(i.slice(0,o)),n.decodeValue(i.slice(o+1))],l=t.get(s)||[];l.push(a),t.set(s,l)}),t}var Xx=/%(\d[a-f0-9])/gi,Qx={40:"@","3A":":",24:"$","2C":",","3B":";","3D":"=","3F":"?","2F":"/"};function Qv(e){return encodeURIComponent(e).replace(Xx,(n,t)=>Qx[t]??n)}function al(e){return`${e}`}var on=class e{map;encoder;updates=null;cloneFrom=null;constructor(n={}){if(this.encoder=n.encoder||new _f,n.fromString){if(n.fromObject)throw new E(2805,!1);this.map=Zx(n.fromString,this.encoder)}else n.fromObject?(this.map=new Map,Object.keys(n.fromObject).forEach(t=>{let r=n.fromObject[t],i=Array.isArray(r)?r.map(al):[al(r)];this.map.set(t,i)})):this.map=null}has(n){return this.init(),this.map.has(n)}get(n){this.init();let t=this.map.get(n);return t?t[0]:null}getAll(n){return this.init(),this.map.get(n)||null}keys(){return this.init(),Array.from(this.map.keys())}append(n,t){return this.clone({param:n,value:t,op:"a"})}appendAll(n){let t=[];return Object.keys(n).forEach(r=>{let i=n[r];Array.isArray(i)?i.forEach(o=>{t.push({param:r,value:o,op:"a"})}):t.push({param:r,value:i,op:"a"})}),this.clone(t)}set(n,t){return this.clone({param:n,value:t,op:"s"})}delete(n,t){return this.clone({param:n,value:t,op:"d"})}toString(){return this.init(),this.keys().map(n=>{let t=this.encoder.encodeKey(n);return this.map.get(n).map(r=>t+"="+this.encoder.encodeValue(r)).join("&")}).filter(n=>n!=="").join("&")}clone(n){let t=new e({encoder:this.encoder});return t.cloneFrom=this.cloneFrom||this,t.updates=(this.updates||[]).concat(n),t}init(){this.map===null&&(this.map=new Map),this.cloneFrom!==null&&(this.cloneFrom.init(),this.cloneFrom.keys().forEach(n=>this.map.set(n,this.cloneFrom.map.get(n))),this.updates.forEach(n=>{switch(n.op){case"a":case"s":let t=(n.op==="a"?this.map.get(n.param):void 0)||[];t.push(al(n.value)),this.map.set(n.param,t);break;case"d":if(n.value!==void 0){let r=this.map.get(n.param)||[],i=r.indexOf(al(n.value));i!==-1&&r.splice(i,1),r.length>0?this.map.set(n.param,r):this.map.delete(n.param)}else{this.map.delete(n.param);break}}}),this.cloneFrom=this.updates=null)}};function Kx(e){switch(e){case"DELETE":case"GET":case"HEAD":case"OPTIONS":case"JSONP":return!1;default:return!0}}function Kv(e){return typeof ArrayBuffer<"u"&&e instanceof ArrayBuffer}function Jv(e){return typeof Blob<"u"&&e instanceof Blob}function ey(e){return typeof FormData<"u"&&e instanceof FormData}function Jx(e){return typeof URLSearchParams<"u"&&e instanceof URLSearchParams}var vf="Content-Type",ty="Accept",ry="text/plain",iy="application/json",eI=`${iy}, ${ry}, */*`,hi=class e{url;body=null;headers;context;reportProgress=!1;reportUploadProgress=!1;reportDownloadProgress=!1;withCredentials=!1;credentials;keepalive=!1;cache;priority;mode;redirect;referrer;integrity;referrerPolicy;responseType="json";method;params;urlWithParams;transferCache;timeout;constructor(n,t,r,i){this.url=t,this.method=n.toUpperCase();let o;if(Kx(this.method)||i?(this.body=r!==void 0?r:null,o=i):o=r,o){if(this.reportProgress=!!o.reportProgress,this.reportUploadProgress=!!o.reportUploadProgress,this.reportDownloadProgress=!!o.reportDownloadProgress,this.withCredentials=!!o.withCredentials,this.keepalive=!!o.keepalive,o.responseType&&(this.responseType=o.responseType),o.headers&&(this.headers=o.headers),o.context&&(this.context=o.context),o.params&&(this.params=o.params),o.priority&&(this.priority=o.priority),o.cache&&(this.cache=o.cache),o.credentials&&(this.credentials=o.credentials),typeof o.timeout=="number"){if(o.timeout<1||!Number.isInteger(o.timeout))throw new E(2822,"");this.timeout=o.timeout}o.mode&&(this.mode=o.mode),o.redirect&&(this.redirect=o.redirect),o.integrity&&(this.integrity=o.integrity),o.referrer!==void 0&&(this.referrer=o.referrer),o.referrerPolicy&&(this.referrerPolicy=o.referrerPolicy),this.transferCache=o.transferCache}if(this.headers??=new sn,this.context??=new bf,!this.params)this.params=new on,this.urlWithParams=t;else{let s=this.params.toString();if(s.length===0)this.urlWithParams=t;else{let a=t,l="",c=t.indexOf("#");c!==-1&&(l=t.substring(c),a=t.substring(0,c));let d=a.indexOf("?"),u=d===-1?"?":d<a.length-1?"&":"";this.urlWithParams=a+u+s+l}}}serializeBody(){return this.body===null?null:typeof this.body=="string"||Kv(this.body)||Jv(this.body)||ey(this.body)||Jx(this.body)?this.body:this.body instanceof on?this.body.toString():typeof this.body=="object"||typeof this.body=="boolean"||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return this.body===null||ey(this.body)?null:Jv(this.body)?this.body.type||null:Kv(this.body)?null:typeof this.body=="string"?ry:this.body instanceof on?"application/x-www-form-urlencoded;charset=UTF-8":typeof this.body=="object"||typeof this.body=="number"||typeof this.body=="boolean"?iy:null}clone(n={}){let t=n.method||this.method,r=n.url||this.url,i=n.responseType||this.responseType,o=n.keepalive??this.keepalive,s=n.priority||this.priority,a=n.cache||this.cache,l=n.mode||this.mode,c=n.redirect||this.redirect,d=n.credentials||this.credentials,u=n.referrer??this.referrer,m=n.integrity||this.integrity,h=n.referrerPolicy||this.referrerPolicy,p=n.transferCache??this.transferCache,_=n.timeout??this.timeout,C=n.body!==void 0?n.body:this.body,F=n.withCredentials??this.withCredentials,Ae=n.reportProgress??this.reportProgress,ot=n.reportUploadProgress??this.reportUploadProgress,Sr=n.reportDownloadProgress??this.reportDownloadProgress,Ci=n.headers||this.headers,Ln=n.params||this.params,$o=n.context??this.context;return n.setHeaders!==void 0&&(Ci=Object.keys(n.setHeaders).reduce((Mr,Vn)=>Mr.set(Vn,n.setHeaders[Vn]),Ci)),n.setParams&&(Ln=Object.keys(n.setParams).reduce((Mr,Vn)=>Mr.set(Vn,n.setParams[Vn]),Ln)),new e(t,r,C,{params:Ln,headers:Ci,context:$o,reportProgress:Ae,reportUploadProgress:ot,reportDownloadProgress:Sr,responseType:i,withCredentials:F,transferCache:p,keepalive:o,cache:a,priority:s,timeout:_,mode:l,redirect:c,credentials:d,referrer:u,integrity:m,referrerPolicy:h})}},mi=(function(e){return e[e.Sent=0]="Sent",e[e.UploadProgress=1]="UploadProgress",e[e.ResponseHeader=2]="ResponseHeader",e[e.DownloadProgress=3]="DownloadProgress",e[e.Response=4]="Response",e[e.User=5]="User",e})(mi||{}),Do=class{headers;status;statusText;url;ok;type;redirected;responseType;constructor(n,t=200,r="OK"){this.headers=n.headers||new sn,this.status=n.status!==void 0?n.status:t,this.statusText=n.statusText||r,this.url=n.url||null,this.redirected=n.redirected,this.responseType=n.responseType,this.ok=this.status>=200&&this.status<300}},Df=class e extends Do{constructor(n={}){super(n)}type=mi.ResponseHeader;clone(n={}){return new e({headers:n.headers||this.headers,status:n.status!==void 0?n.status:this.status,statusText:n.statusText||this.statusText,url:n.url||this.url||void 0})}},wo=class e extends Do{body;constructor(n={}){super(n),this.body=n.body!==void 0?n.body:null}type=mi.Response;clone(n={}){return new e({body:n.body!==void 0?n.body:this.body,headers:n.headers||this.headers,status:n.status!==void 0?n.status:this.status,statusText:n.statusText||this.statusText,url:n.url||this.url||void 0,redirected:n.redirected??this.redirected,responseType:n.responseType??this.responseType})}},wr=class extends Do{name="HttpErrorResponse";message;error;ok=!1;constructor(n){super(n,0,"Unknown Error"),this.status>=200&&this.status<300?this.message=`Http failure during parsing for ${n.url||"(unknown url)"}`:this.message=`Http failure response for ${n.url||"(unknown url)"}: ${n.status} ${n.statusText}`,this.error=n.error||null}},tI=200;var nI=/^\)\]\}',?\n/,_U=1024*1024,rI=new b("",{factory:()=>null}),iI=(()=>{class e{fetchImpl=f(wf,{optional:!0})?.fetch??((...t)=>globalThis.fetch(...t));ngZone=f(A);destroyRef=f(Qe);maxResponseSize=f(rI);handle(t){return new q(r=>{let i=new AbortController;this.doRequest(t,i.signal,r).then(Ef,s=>r.error(new wr({error:s})));let o;return t.timeout&&(o=this.ngZone.runOutsideAngular(()=>setTimeout(()=>{i.signal.aborted||i.abort(new DOMException("signal timed out","TimeoutError"))},t.timeout))),()=>{o!==void 0&&clearTimeout(o),i.abort()}})}doRequest(t,r,i){return St(this,null,function*(){let o=this.createRequestInit(t),s;try{let C=this.ngZone.runOutsideAngular(()=>this.fetchImpl(t.urlWithParams,D({signal:r},o)));oI(C),i.next({type:mi.Sent}),s=yield C}catch(C){i.error(new wr({error:C,status:C.status??0,statusText:C.statusText,url:t.urlWithParams,headers:C.headers}));return}let a=new sn(s.headers),l=s.statusText,c=s.url||t.urlWithParams,d=s.status,u=null,m=t.reportProgress||t.reportDownloadProgress;if(m&&i.next(new Df({headers:a,status:d,statusText:l,url:c})),s.body){let C=s.headers.get("content-length"),F=C!==null?Number(C):NaN;this.maxResponseSize!==null&&Number.isFinite(F)&&F>this.maxResponseSize&&ny(this.maxResponseSize);let Ae=[],ot=s.body.getReader(),Sr=0,Ci,Ln,$o=typeof Zone<"u"&&Zone.current,Mr=!1;if(yield this.ngZone.runOutsideAngular(()=>St(this,null,function*(){for(;;){if(this.destroyRef.destroyed){yield ot.cancel(),Mr=!0;break}let{done:xi,value:Ql}=yield ot.read();if(xi)break;if(Ae.push(Ql),Sr+=Ql.length,this.maxResponseSize!==null&&Sr>this.maxResponseSize&&(yield ot.cancel(),ny(this.maxResponseSize)),m){Ln=t.responseType==="text"?(Ln??"")+(Ci??=new TextDecoder).decode(Ql,{stream:!0}):void 0;let uh=()=>i.next({type:mi.DownloadProgress,total:Number.isFinite(F)?F:void 0,loaded:Sr,partialText:Ln});$o?$o.run(uh):uh()}}})),Mr){i.complete();return}let Vn=this.concatChunks(Ae,Sr);try{let xi=s.headers.get(vf)??"";u=this.parseBody(t,Vn,xi,d)}catch(xi){i.error(new wr({error:xi,headers:new sn(s.headers),status:s.status,statusText:s.statusText,url:s.url||t.urlWithParams}));return}}d===0&&(d=u?tI:0);let h=d>=200&&d<300,p=s.redirected,_=s.type;h?(i.next(new wo({body:u,headers:a,status:d,statusText:l,url:c,redirected:p,responseType:_})),i.complete()):i.error(new wr({error:u,headers:a,status:d,statusText:l,url:c,redirected:p,responseType:_}))})}parseBody(t,r,i,o){switch(t.responseType){case"json":let s=new TextDecoder().decode(r).replace(nI,"");if(s==="")return null;try{return JSON.parse(s)}catch(a){if(o<200||o>=300)return s;throw a}case"text":return new TextDecoder().decode(r);case"blob":return new Blob([r],{type:i});case"arraybuffer":return r.buffer}}createRequestInit(t){if(t.reportUploadProgress)throw new E(2824,!1);let r={},i;if(i=t.credentials,t.withCredentials&&(i="include"),t.headers.forEach((o,s)=>r[o]=s.join(",")),t.headers.has(ty)||(r[ty]=eI),!t.headers.has(vf)){let o=t.detectContentTypeHeader();o!==null&&(r[vf]=o)}return{body:t.serializeBody(),method:t.method,headers:r,credentials:i,keepalive:t.keepalive,cache:t.cache,priority:t.priority,mode:t.mode,redirect:t.redirect,referrer:t.referrer,integrity:t.integrity,referrerPolicy:t.referrerPolicy}}concatChunks(t,r){let i=new Uint8Array(r),o=0;for(let s of t)i.set(s,o),o+=s.length;return i}static \u0275fac=function(r){return new(r||e)};static \u0275prov=R({token:e,factory:e.\u0275fac})}return e})(),wf=class{};function Ef(){}function oI(e){e.then(Ef,Ef)}function ny(e){throw new E(-2825,!1)}function sI(e,n){return n(e)}function aI(e,n,t){return(r,i)=>$r(t,()=>n(r,o=>e(o,i)))}var lI=new b("",{factory:()=>[]}),oy=new b(""),cI=new b("",{factory:()=>!0});var dI=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275prov=P({token:e,factory:function(r){let i=null;return r?i=new(r||e):i=S(iI),i},providedIn:"root"})}return e})();var uI=(()=>{class e{backend;injector;chain=null;pendingTasks=f(Qi);contributeToStability=f(cI);constructor(t,r){this.backend=t,this.injector=r}handle(t){if(this.chain===null){let i=Array.from(new Set([...this.injector.get(lI),...this.injector.get(oy,[])]));this.chain=i.reduceRight((o,s)=>aI(o,s,this.injector),sI)}let r=this.chain;if(this.contributeToStability){let i=this.pendingTasks.add();return Pe(()=>r(t,o=>this.backend.handle(o))).pipe(ki(i))}else return Pe(()=>r(t,i=>this.backend.handle(i)))}static \u0275fac=function(r){return new(r||e)(S(dI),S(Ee))};static \u0275prov=P({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),fI=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275prov=P({token:e,factory:function(r){let i=null;return r?i=new(r||e):i=S(uI),i},providedIn:"root"})}return e})();function yf(e,n){return D({body:n},e)}var Cf=(()=>{class e{handler;constructor(t){this.handler=t}request(t,r,i={}){let o;if(t instanceof hi)o=t;else{let l;i.headers instanceof sn?l=i.headers:l=new sn(i.headers);let c;i.params&&(i.params instanceof on?c=i.params:c=new on({fromObject:i.params})),o=new hi(t,r,i.body!==void 0?i.body:null,{headers:l,context:i.context,params:c,reportProgress:i.reportProgress,reportUploadProgress:i.reportUploadProgress,reportDownloadProgress:i.reportDownloadProgress,responseType:i.responseType||"json",withCredentials:i.withCredentials,transferCache:i.transferCache,keepalive:i.keepalive,priority:i.priority,cache:i.cache,mode:i.mode,redirect:i.redirect,credentials:i.credentials,referrer:i.referrer,referrerPolicy:i.referrerPolicy,integrity:i.integrity,timeout:i.timeout})}let s=et(o).pipe(yc(l=>this.handler.handle(l)));if(t instanceof hi||i.observe==="events")return s;let a=s.pipe(tt(l=>l instanceof wo));switch(i.observe||"body"){case"body":switch(o.responseType){case"arraybuffer":return a.pipe(_e(l=>{if(l.body!==null&&!(l.body instanceof ArrayBuffer))throw new E(2806,!1);return l.body}));case"blob":return a.pipe(_e(l=>{if(l.body!==null&&!(l.body instanceof Blob))throw new E(2807,!1);return l.body}));case"text":return a.pipe(_e(l=>{if(l.body!==null&&typeof l.body!="string")throw new E(2808,!1);return l.body}));case"json":default:return a.pipe(_e(l=>l.body))}case"response":return a;default:throw new E(2809,!1)}}delete(t,r={}){return this.request("DELETE",t,r)}get(t,r={}){return this.request("GET",t,r)}head(t,r={}){return this.request("HEAD",t,r)}jsonp(t,r){return this.request("JSONP",t,{params:new on().append(r,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(t,r={}){return this.request("OPTIONS",t,r)}patch(t,r,i={}){return this.request("PATCH",t,yf(i,r))}post(t,r,i={}){return this.request("POST",t,yf(i,r))}put(t,r,i={}){return this.request("PUT",t,yf(i,r))}static \u0275fac=function(r){return new(r||e)(S(fI))};static \u0275prov=P({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var xf=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275prov=P({token:e,factory:function(r){let i=null;return r?i=new(r||e):i=S(mI),i},providedIn:"root"})}return e})(),mI=(()=>{class e extends xf{_doc=f(j);sanitize(t,r){if(r==null)return null;switch(t){case Ke.NONE:return r;case Ke.HTML:return vr(r,"HTML")?Jt(r):xu(this._doc,String(r)).toString();case Ke.STYLE:return vr(r,"Style")?Jt(r):r;case Ke.SCRIPT:if(vr(r,"Script"))return Jt(r);throw new E(5200,!1);case Ke.URL:return vr(r,"URL")?Jt(r):Ra(String(r));case Ke.RESOURCE_URL:if(vr(r,"ResourceURL"))return Jt(r);throw new E(-5201,!1);default:throw new E(5202,!1)}}bypassSecurityTrustHtml(t){return _u(t)}bypassSecurityTrustStyle(t){return Du(t)}bypassSecurityTrustScript(t){return wu(t)}bypassSecurityTrustUrl(t){return Eu(t)}bypassSecurityTrustResourceUrl(t){return Cu(t)}static \u0275fac=function(r){return new(r||e)};static \u0275prov=R({token:e,factory:e.\u0275fac})}return e})();var ll=new WeakMap,yt=(()=>{class e{_appRef;_injector=f(J);_environmentInjector=f(Ee);load(t){let r=this._appRef=this._appRef||this._injector.get(It),i=ll.get(r);i||(i={loaders:new Set,refs:[]},ll.set(r,i),r.onDestroy(()=>{ll.get(r)?.refs.forEach(o=>o.destroy()),ll.delete(r)})),i.loaders.has(t)||(i.loaders.add(t),i.refs.push(Ka(t,{environmentInjector:this._environmentInjector})))}static \u0275fac=function(r){return new(r||e)};static \u0275prov=R({token:e,factory:e.\u0275fac})}return e})();var cl;function gI(){if(cl===void 0&&(cl=null,typeof window<"u")){let e=window;if(e.trustedTypes!==void 0)try{cl=e.trustedTypes.createPolicy("angular#components",{createHTML:n=>n})}catch(n){console.error(n)}}return cl}function pi(e){return gI()?.createHTML(e)||e}function sy(e){return Error(`Unable to find icon with the name "${e}"`)}function vI(){return Error("Could not find HttpClient for use with Angular Material icons. Please add provideHttpClient() to your providers.")}function ay(e){return Error(`The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${e}".`)}function ly(e){return Error(`The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${e}".`)}var an=class{url;svgText;options;svgElement=null;constructor(n,t,r){this.url=n,this.svgText=t,this.options=r}},dy=(()=>{class e{_httpClient;_sanitizer;_errorHandler;_document;_svgIconConfigs=new Map;_iconSetConfigs=new Map;_cachedIconsByUrl=new Map;_inProgressUrlFetches=new Map;_fontCssClassesByAlias=new Map;_resolvers=[];_defaultFontSetClass=["material-icons","mat-ligature-font"];constructor(t,r,i,o){this._httpClient=t,this._sanitizer=r,this._errorHandler=o,this._document=i}addSvgIcon(t,r,i){return this.addSvgIconInNamespace("",t,r,i)}addSvgIconLiteral(t,r,i){return this.addSvgIconLiteralInNamespace("",t,r,i)}addSvgIconInNamespace(t,r,i,o){return this._addSvgIconConfig(t,r,new an(i,null,o))}addSvgIconResolver(t){return this._resolvers.push(t),this}addSvgIconLiteralInNamespace(t,r,i,o){let s=this._sanitizer.sanitize(Ke.HTML,i);if(!s)throw ly(i);let a=pi(s);return this._addSvgIconConfig(t,r,new an("",a,o))}addSvgIconSet(t,r){return this.addSvgIconSetInNamespace("",t,r)}addSvgIconSetLiteral(t,r){return this.addSvgIconSetLiteralInNamespace("",t,r)}addSvgIconSetInNamespace(t,r,i){return this._addSvgIconSetConfig(t,new an(r,null,i))}addSvgIconSetLiteralInNamespace(t,r,i){let o=this._sanitizer.sanitize(Ke.HTML,r);if(!o)throw ly(r);let s=pi(o);return this._addSvgIconSetConfig(t,new an("",s,i))}registerFontClassAlias(t,r=t){return this._fontCssClassesByAlias.set(t,r),this}classNameForFontAlias(t){return this._fontCssClassesByAlias.get(t)||t}setDefaultFontSetClass(...t){return this._defaultFontSetClass=t,this}getDefaultFontSetClass(){return this._defaultFontSetClass}getSvgIconFromUrl(t){let r=this._sanitizer.sanitize(Ke.RESOURCE_URL,t);if(!r)throw ay(t);let i=this._cachedIconsByUrl.get(r);return i?et(dl(i)):this._loadSvgIconFromConfig(new an(t,null)).pipe(Fi(o=>this._cachedIconsByUrl.set(r,o)),_e(o=>dl(o)))}getNamedSvgIcon(t,r=""){let i=cy(r,t),o=this._svgIconConfigs.get(i);if(o)return this._getSvgFromConfig(o);if(o=this._getIconConfigFromResolvers(r,t),o)return this._svgIconConfigs.set(i,o),this._getSvgFromConfig(o);let s=this._iconSetConfigs.get(r);return s?this._getSvgFromIconSetConfigs(t,s):pc(sy(i))}ngOnDestroy(){this._resolvers=[],this._svgIconConfigs.clear(),this._iconSetConfigs.clear(),this._cachedIconsByUrl.clear()}_getSvgFromConfig(t){return t.svgText?et(dl(this._svgElementFromConfig(t))):this._loadSvgIconFromConfig(t).pipe(_e(r=>dl(r)))}_getSvgFromIconSetConfigs(t,r){let i=this._extractIconWithNameFromAnySet(t,r);if(i)return et(i);let o=r.filter(s=>!s.svgText).map(s=>this._loadSvgIconSetFromConfig(s).pipe(xs(a=>{let c=`Loading icon set URL: ${this._sanitizer.sanitize(Ke.RESOURCE_URL,s.url)} failed: ${a.message}`;return this._errorHandler.handleError(new Error(c)),et(null)})));return Ri(o).pipe(_e(()=>{let s=this._extractIconWithNameFromAnySet(t,r);if(!s)throw sy(t);return s}))}_extractIconWithNameFromAnySet(t,r){for(let i=r.length-1;i>=0;i--){let o=r[i];if(o.svgText&&o.svgText.toString().indexOf(t)>-1){let s=this._svgElementFromConfig(o),a=this._extractSvgIconFromSet(s,t,o.options);if(a)return a}}return null}_loadSvgIconFromConfig(t){return this._fetchIcon(t).pipe(Fi(r=>t.svgText=r),_e(()=>this._svgElementFromConfig(t)))}_loadSvgIconSetFromConfig(t){return t.svgText?et(null):this._fetchIcon(t).pipe(Fi(r=>t.svgText=r))}_extractSvgIconFromSet(t,r,i){let o=t.querySelector(`[id="${r}"]`);if(!o)return null;let s=o.cloneNode(!0);if(s.removeAttribute("id"),s.nodeName.toLowerCase()==="svg")return this._setSvgAttributes(s,i);if(s.nodeName.toLowerCase()==="symbol")return this._setSvgAttributes(this._toSvgElement(s),i);let a=this._svgElementFromString(pi("<svg></svg>"));return a.appendChild(s),this._setSvgAttributes(a,i)}_svgElementFromString(t){let r=this._document.createElement("DIV");r.innerHTML=t;let i=r.querySelector("svg");if(!i)throw Error("<svg> tag not found");return i}_toSvgElement(t){let r=this._svgElementFromString(pi("<svg></svg>")),i=t.attributes;for(let o=0;o<i.length;o++){let{name:s,value:a}=i[o];s!=="id"&&r.setAttribute(s,a)}for(let o=0;o<t.childNodes.length;o++)t.childNodes[o].nodeType===this._document.ELEMENT_NODE&&r.appendChild(t.childNodes[o].cloneNode(!0));return r}_setSvgAttributes(t,r){return t.setAttribute("fit",""),t.setAttribute("height","100%"),t.setAttribute("width","100%"),t.setAttribute("preserveAspectRatio","xMidYMid meet"),t.setAttribute("focusable","false"),r&&r.viewBox&&t.setAttribute("viewBox",r.viewBox),t}_fetchIcon(t){let{url:r,options:i}=t,o=i?.withCredentials??!1;if(!this._httpClient)throw vI();if(r==null)throw Error(`Cannot fetch icon from URL "${r}".`);let s=this._sanitizer.sanitize(Ke.RESOURCE_URL,r);if(!s)throw ay(r);let a=this._inProgressUrlFetches.get(s);if(a)return a;let l=this._httpClient.get(s,{responseType:"text",withCredentials:o}).pipe(_e(c=>pi(c)),ki(()=>this._inProgressUrlFetches.delete(s)),Oi());return this._inProgressUrlFetches.set(s,l),l}_addSvgIconConfig(t,r,i){return this._svgIconConfigs.set(cy(t,r),i),this}_addSvgIconSetConfig(t,r){let i=this._iconSetConfigs.get(t);return i?i.push(r):this._iconSetConfigs.set(t,[r]),this}_svgElementFromConfig(t){if(!t.svgElement){let r=this._svgElementFromString(t.svgText);this._setSvgAttributes(r,t.options),t.svgElement=r}return t.svgElement}_getIconConfigFromResolvers(t,r){for(let i=0;i<this._resolvers.length;i++){let o=this._resolvers[i](r,t);if(o)return yI(o)?new an(o.url,null,o.options):new an(o,null)}}static \u0275fac=function(r){return new(r||e)(S(Cf,8),S(xf),S(j,8),S(Ge))};static \u0275prov=P({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function dl(e){return e.cloneNode(!0)}function cy(e,n){return e+":"+n}function yI(e){return!!(e.url&&e.options)}var bI=new b("cdk-dir-doc",{providedIn:"root",factory:()=>f(j)}),_I=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;function uy(e){let n=e?.toLowerCase()||"";return n==="auto"&&typeof navigator<"u"&&navigator?.language?_I.test(navigator.language)?"rtl":"ltr":n==="rtl"?"rtl":"ltr"}var Eo=(()=>{class e{get value(){return this.valueSignal()}valueSignal=ne("ltr");change=new de;constructor(){let t=f(bI,{optional:!0});if(t){let r=t.body?t.body.dir:null,i=t.documentElement?t.documentElement.dir:null;this.valueSignal.set(uy(r||i||"ltr"))}}ngOnDestroy(){this.change.complete()}static \u0275fac=function(r){return new(r||e)};static \u0275prov=R({token:e,factory:e.\u0275fac})}return e})();var Ye=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=X({type:e});static \u0275inj=Y({})}return e})();var DI=["*"],If=new b("MAT_ICON_DEFAULT_OPTIONS"),wI=new b("mat-icon-location",{providedIn:"root",factory:()=>{let e=f(j),n=e?e.location:null;return{getPathname:()=>n?n.pathname+n.search:""}}}),fy=["clip-path","color-profile","src","cursor","fill","filter","marker","marker-start","marker-mid","marker-end","mask","stroke"],EI=fy.map(e=>`[${e}]`).join(", "),CI=/^url\(['"]?#(.*?)['"]?\)$/,ul=(()=>{class e{_elementRef=f(G);_iconRegistry=f(dy);_location=f(wI);_errorHandler=f(Ge);_defaultColor;get color(){return this._color||this._defaultColor}set color(t){this._color=t}_color;inline=!1;get svgIcon(){return this._svgIcon}set svgIcon(t){t!==this._svgIcon&&(t?this._updateSvgIcon(t):this._svgIcon&&this._clearSvgElement(),this._svgIcon=t)}_svgIcon;get fontSet(){return this._fontSet}set fontSet(t){let r=this._cleanupFontValue(t);r!==this._fontSet&&(this._fontSet=r,this._updateFontIconClasses())}_fontSet;get fontIcon(){return this._fontIcon}set fontIcon(t){let r=this._cleanupFontValue(t);r!==this._fontIcon&&(this._fontIcon=r,this._updateFontIconClasses())}_fontIcon;_previousFontSetClass=[];_previousFontIconClass;_svgName=null;_svgNamespace=null;_previousPath;_elementsWithExternalReferences;_currentIconFetch=oe.EMPTY;constructor(){let t=f(new ui("aria-hidden"),{optional:!0}),r=f(If,{optional:!0});r&&(r.color&&(this.color=this._defaultColor=r.color),r.fontSet&&(this.fontSet=r.fontSet)),t||this._elementRef.nativeElement.setAttribute("aria-hidden","true")}_splitIconName(t){if(!t)return["",""];let r=t.split(":");switch(r.length){case 1:return["",r[0]];case 2:return r;default:throw Error(`Invalid icon name: "${t}"`)}}ngOnInit(){this._updateFontIconClasses()}ngAfterViewChecked(){let t=this._elementsWithExternalReferences;if(t&&t.size){let r=this._location.getPathname();r!==this._previousPath&&(this._previousPath=r,this._prependPathToReferences(r))}}ngOnDestroy(){this._currentIconFetch.unsubscribe(),this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear()}_usingFontIcon(){return!this.svgIcon}_setSvgElement(t){this._clearSvgElement();let r=this._location.getPathname();this._previousPath=r,this._cacheChildrenWithExternalReferences(t),this._prependPathToReferences(r),this._elementRef.nativeElement.appendChild(t)}_clearSvgElement(){let t=this._elementRef.nativeElement,r=t.childNodes.length;for(this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear();r--;){let i=t.childNodes[r];(i.nodeType!==1||i.nodeName.toLowerCase()==="svg")&&i.remove()}}_updateFontIconClasses(){if(!this._usingFontIcon())return;let t=this._elementRef.nativeElement,r=(this.fontSet?this._iconRegistry.classNameForFontAlias(this.fontSet).split(/ +/):this._iconRegistry.getDefaultFontSetClass()).filter(i=>i.length>0);this._previousFontSetClass.forEach(i=>t.classList.remove(i)),r.forEach(i=>t.classList.add(i)),this._previousFontSetClass=r,this.fontIcon!==this._previousFontIconClass&&!r.includes("mat-ligature-font")&&(this._previousFontIconClass&&t.classList.remove(this._previousFontIconClass),this.fontIcon&&t.classList.add(this.fontIcon),this._previousFontIconClass=this.fontIcon)}_cleanupFontValue(t){return typeof t=="string"?t.trim().split(" ")[0]:t}_prependPathToReferences(t){let r=this._elementsWithExternalReferences;r&&r.forEach((i,o)=>{i.forEach(s=>{o.setAttribute(s.name,`url('${t}#${s.value}')`)})})}_cacheChildrenWithExternalReferences(t){let r=t.querySelectorAll(EI),i=this._elementsWithExternalReferences=this._elementsWithExternalReferences||new Map;for(let o=0;o<r.length;o++)fy.forEach(s=>{let a=r[o],l=a.getAttribute(s),c=l?l.match(CI):null;if(c){let d=i.get(a);d||(d=[],i.set(a,d)),d.push({name:s,value:c[1]})}})}_updateSvgIcon(t){if(this._svgNamespace=null,this._svgName=null,this._currentIconFetch.unsubscribe(),t){let[r,i]=this._splitIconName(t);r&&(this._svgNamespace=r),i&&(this._svgName=i),this._currentIconFetch=this._iconRegistry.getNamedSvgIcon(i,r).pipe(bc(1)).subscribe(o=>this._setSvgElement(o),o=>{let s=`Error retrieving icon ${r}:${i}! ${o.message}`;this._errorHandler.handleError(new Error(s))})}}static \u0275fac=function(r){return new(r||e)};static \u0275cmp=W({type:e,selectors:[["mat-icon"]],hostAttrs:["role","img",1,"mat-icon","notranslate"],hostVars:10,hostBindings:function(r,i){r&2&&(Re("data-mat-icon-type",i._usingFontIcon()?"font":"svg")("data-mat-icon-name",i._svgName||i.fontIcon)("data-mat-icon-namespace",i._svgNamespace||i.fontSet)("fontIcon",i._usingFontIcon()?i.fontIcon:null),Dr(i.color?"mat-"+i.color:""),U("mat-icon-inline",i.inline)("mat-icon-no-color",i.color!=="primary"&&i.color!=="accent"&&i.color!=="warn"))},inputs:{color:"color",inline:[2,"inline","inline",we],svgIcon:"svgIcon",fontSet:"fontSet",fontIcon:"fontIcon"},exportAs:["matIcon"],ngContentSelectors:DI,decls:1,vars:0,template:function(r,i){r&1&&(Ue(),ee(0))},styles:[`mat-icon, mat-icon.mat-primary, mat-icon.mat-accent, mat-icon.mat-warn {
  color: var(--mat-icon-color, inherit);
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
`],encapsulation:2})}return e})(),fl=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=X({type:e});static \u0275inj=Y({imports:[Ye]})}return e})();var Sf={providers:[{provide:If,useValue:{fontSet:"material-symbols-outlined"}}]};var _y=(()=>{class e{_renderer;_elementRef;onChange=t=>{};onTouched=()=>{};constructor(t,r){this._renderer=t,this._elementRef=r}setProperty(t,r){this._renderer.setProperty(this._elementRef.nativeElement,t,r)}registerOnTouched(t){this.onTouched=t}registerOnChange(t){this.onChange=t}setDisabledState(t){this.setProperty("disabled",t)}static \u0275fac=function(r){return new(r||e)(re(Be),re(G))};static \u0275dir=$({type:e})}return e})(),xI=(()=>{class e extends _y{static \u0275fac=(()=>{let t;return function(i){return(t||(t=gr(e)))(i||e)}})();static \u0275dir=$({type:e,features:[He]})}return e})(),Ut=new b("");var II={provide:Ut,useExisting:Fe(()=>Dy),multi:!0};function SI(){let e=vt()?vt().getUserAgent():"";return/android (\d+)/.test(e.toLowerCase())}var MI=new b(""),Dy=(()=>{class e extends _y{_compositionMode;_composing=!1;constructor(t,r,i){super(t,r),this._compositionMode=i,this._compositionMode==null&&(this._compositionMode=!SI())}writeValue(t){let r=t??"";this.setProperty("value",r)}_handleInput(t){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(t)}_compositionStart(){this._composing=!0}_compositionEnd(t){this._composing=!1,this._compositionMode&&this.onChange(t)}static \u0275fac=function(r){return new(r||e)(re(Be),re(G),re(MI,8))};static \u0275dir=$({type:e,selectors:[["input","formControlName","",3,"type","checkbox",3,"ngNoCva",""],["textarea","formControlName","",3,"ngNoCva",""],["input","formControl","",3,"type","checkbox",3,"ngNoCva",""],["textarea","formControl","",3,"ngNoCva",""],["input","ngModel","",3,"type","checkbox",3,"ngNoCva",""],["textarea","ngModel","",3,"ngNoCva",""],["","ngDefaultControl",""]],hostBindings:function(r,i){r&1&&le("input",function(s){return i._handleInput(s.target.value)})("blur",function(){return i.onTouched()})("compositionstart",function(){return i._compositionStart()})("compositionend",function(s){return i._compositionEnd(s.target.value)})},standalone:!1,features:[De([II]),He]})}return e})();function Af(e){return e==null||Nf(e)===0}function Nf(e){return e==null?null:Array.isArray(e)||typeof e=="string"?e.length:e instanceof Set?e.size:null}var bi=new b(""),Rf=new b(""),TI=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,To=class{static min(n){return AI(n)}static max(n){return NI(n)}static required(n){return wy(n)}static requiredTrue(n){return RI(n)}static email(n){return kI(n)}static minLength(n){return OI(n)}static maxLength(n){return FI(n)}static pattern(n){return PI(n)}static nullValidator(n){return ml()}static compose(n){return My(n)}static composeAsync(n){return Ty(n)}};function AI(e){return n=>{if(n.value==null||e==null)return null;let t=parseFloat(n.value);return!isNaN(t)&&t<e?{min:{min:e,actual:n.value}}:null}}function NI(e){return n=>{if(n.value==null||e==null)return null;let t=parseFloat(n.value);return!isNaN(t)&&t>e?{max:{max:e,actual:n.value}}:null}}function wy(e){return Af(e.value)?{required:!0}:null}function RI(e){return e.value===!0?null:{required:!0}}function kI(e){return Af(e.value)||TI.test(e.value)?null:{email:!0}}function OI(e){return n=>{let t=n.value?.length??Nf(n.value);return t===null||t===0?null:t<e?{minlength:{requiredLength:e,actualLength:t}}:null}}function FI(e){return n=>{let t=n.value?.length??Nf(n.value);return t!==null&&t>e?{maxlength:{requiredLength:e,actualLength:t}}:null}}function PI(e){if(!e)return ml;let n,t;return typeof e=="string"?(t="",e.charAt(0)!=="^"&&(t+="^"),t+=e,e.charAt(e.length-1)!=="$"&&(t+="$"),n=new RegExp(t)):(t=e.toString(),n=e),r=>{if(Af(r.value))return null;let i=r.value;return n.test(i)?null:{pattern:{requiredPattern:t,actualValue:i}}}}function ml(e){return null}function Ey(e){return e!=null}function Cy(e){return br(e)?Gt(e):e}function xy(e){let n={};return e.forEach(t=>{n=t!=null?D(D({},n),t):n}),Object.keys(n).length===0?null:n}function Iy(e,n){return n.map(t=>t(e))}function LI(e){return!e.validate}function Sy(e){return e.map(n=>LI(n)?n:t=>n.validate(t))}function My(e){if(!e)return null;let n=e.filter(Ey);return n.length==0?null:function(t){return xy(Iy(t,n))}}function kf(e){return e!=null?My(Sy(e)):null}function Ty(e){if(!e)return null;let n=e.filter(Ey);return n.length==0?null:function(t){let r=Iy(t,n).map(Cy);return Ri(r).pipe(_e(xy))}}function Of(e){return e!=null?Ty(Sy(e)):null}function my(e,n){return e===null?[n]:Array.isArray(e)?[...e,n]:[e,n]}function Ay(e){return e._rawValidators}function Ny(e){return e._rawAsyncValidators}function Mf(e){return e?Array.isArray(e)?e:[e]:[]}function pl(e,n){return Array.isArray(e)?e.includes(n):e===n}function py(e,n){let t=Mf(n);return Mf(e).forEach(i=>{pl(t,i)||t.push(i)}),t}function gy(e,n){return Mf(n).filter(t=>!pl(e,t))}var gl=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(n){this._rawValidators=n||[],this._composedValidatorFn=kf(this._rawValidators)}_setAsyncValidators(n){this._rawAsyncValidators=n||[],this._composedAsyncValidatorFn=Of(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(n){this._onDestroyCallbacks.push(n)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(n=>n()),this._onDestroyCallbacks=[]}reset(n=void 0){this.control?.reset(n)}hasError(n,t){return this.control?this.control.hasError(n,t):!1}getError(n,t){return this.control?this.control.getError(n,t):null}},kn=class extends gl{name;get formDirective(){return null}get path(){return null}};var Co="VALID",hl="INVALID",gi="PENDING",xo="DISABLED",On=class{},vl=class extends On{value;source;constructor(n,t){super(),this.value=n,this.source=t}},So=class extends On{pristine;source;constructor(n,t){super(),this.pristine=n,this.source=t}},Mo=class extends On{touched;source;constructor(n,t){super(),this.touched=n,this.source=t}},vi=class extends On{status;source;constructor(n,t){super(),this.status=n,this.source=t}},yl=class extends On{source;constructor(n){super(),this.source=n}},yi=class extends On{source;constructor(n){super(),this.source=n}};function Ry(e){return(El(e)?e.validators:e)||null}function VI(e){return Array.isArray(e)?kf(e):e||null}function ky(e,n){return(El(n)?n.asyncValidators:e)||null}function jI(e){return Array.isArray(e)?Of(e):e||null}function El(e){return e!=null&&!Array.isArray(e)&&typeof e=="object"}function BI(e,n,t){let r=e.controls;if(!(n?Object.keys(r):r).length)throw new E(1e3,"");if(!Oy(r,t))throw new E(1001,"")}function HI(e,n,t){e._forEachChild((r,i)=>{if(t[i]===void 0)throw new E(-1002,"")})}var bl=class{_pendingDirty=!1;_hasOwnPendingAsyncValidator=null;_pendingTouched=!1;_onCollectionChange=()=>{};_updateOn;_hasRequired=ne(!1);_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(n,t){this._assignValidators(n),this._assignAsyncValidators(t)}get validator(){return this._composedValidatorFn}set validator(n){this._rawValidators=this._composedValidatorFn=n,this._updateHasRequiredValidator()}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(n){this._rawAsyncValidators=this._composedAsyncValidatorFn=n}get parent(){return this._parent}get status(){return Pe(this.statusReactive)}set status(n){Pe(()=>this.statusReactive.set(n))}_status=ze(()=>this.statusReactive());statusReactive=ne(void 0);get valid(){return this.status===Co}get invalid(){return this.status===hl}get pending(){return this.status===gi}get disabled(){return this.status===xo}get enabled(){return this.status!==xo}errors;get pristine(){return Pe(this.pristineReactive)}set pristine(n){Pe(()=>this.pristineReactive.set(n))}_pristine=ze(()=>this.pristineReactive());pristineReactive=ne(!0);get dirty(){return!this.pristine}get touched(){return Pe(this.touchedReactive)}set touched(n){Pe(()=>this.touchedReactive.set(n))}_touched=ze(()=>this.touchedReactive());touchedReactive=ne(!1);get untouched(){return!this.touched}_events=new B;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(n){this._assignValidators(n)}setAsyncValidators(n){this._assignAsyncValidators(n)}addValidators(n){this.setValidators(py(n,this._rawValidators))}addAsyncValidators(n){this.setAsyncValidators(py(n,this._rawAsyncValidators))}removeValidators(n){this.setValidators(gy(n,this._rawValidators))}removeAsyncValidators(n){this.setAsyncValidators(gy(n,this._rawAsyncValidators))}hasValidator(n){return pl(this._rawValidators,n)}hasAsyncValidator(n){return pl(this._rawAsyncValidators,n)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(n={}){let t=this.touched===!1;this.touched=!0;let r=n.sourceControl??this;n.onlySelf||this._parent?.markAsTouched(H(D({},n),{sourceControl:r})),t&&n.emitEvent!==!1&&this._events.next(new Mo(!0,r))}markAllAsDirty(n={}){this.markAsDirty({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:this}),this._forEachChild(t=>t.markAllAsDirty(n))}markAllAsTouched(n={}){this.markAsTouched({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:this}),this._forEachChild(t=>t.markAllAsTouched(n))}markAsUntouched(n={}){let t=this.touched===!0;this.touched=!1,this._pendingTouched=!1;let r=n.sourceControl??this;this._forEachChild(i=>{i.markAsUntouched({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:r})}),n.onlySelf||this._parent?._updateTouched(n,r),t&&n.emitEvent!==!1&&this._events.next(new Mo(!1,r))}markAsDirty(n={}){let t=this.pristine===!0;this.pristine=!1;let r=n.sourceControl??this;n.onlySelf||this._parent?.markAsDirty(H(D({},n),{sourceControl:r})),t&&n.emitEvent!==!1&&this._events.next(new So(!1,r))}markAsPristine(n={}){let t=this.pristine===!1;this.pristine=!0,this._pendingDirty=!1;let r=n.sourceControl??this;this._forEachChild(i=>{i.markAsPristine({onlySelf:!0,emitEvent:n.emitEvent})}),n.onlySelf||this._parent?._updatePristine(n,r),t&&n.emitEvent!==!1&&this._events.next(new So(!0,r))}markAsPending(n={}){this.status=gi;let t=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new vi(this.status,t)),this.statusChanges.emit(this.status)),n.onlySelf||this._parent?.markAsPending(H(D({},n),{sourceControl:t}))}disable(n={}){let t=this._parentMarkedDirty(n.onlySelf);this.status=xo,this.errors=null,this._forEachChild(i=>{i.disable(H(D({},n),{onlySelf:!0}))}),this._updateValue();let r=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new vl(this.value,r)),this._events.next(new vi(this.status,r)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(H(D({},n),{skipPristineCheck:t}),this),this._onDisabledChange.forEach(i=>i(!0))}enable(n={}){let t=this._parentMarkedDirty(n.onlySelf);this.status=Co,this._forEachChild(r=>{r.enable(H(D({},n),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:n.emitEvent}),this._updateAncestors(H(D({},n),{skipPristineCheck:t}),this),this._onDisabledChange.forEach(r=>r(!1))}_updateAncestors(n,t){n.onlySelf||(this._parent?.updateValueAndValidity(n),n.skipPristineCheck||this._parent?._updatePristine({},t),this._parent?._updateTouched({},t))}setParent(n){this._parent=n}getRawValue(){return this.value}updateValueAndValidity(n={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let r=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===Co||this.status===gi)&&this._runAsyncValidator(r,n.emitEvent)}let t=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new vl(this.value,t)),this._events.next(new vi(this.status,t)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),n.onlySelf||this._parent?.updateValueAndValidity(H(D({},n),{sourceControl:t}))}_updateTreeValidity(n={emitEvent:!0}){this._forEachChild(t=>t._updateTreeValidity(n)),this.updateValueAndValidity({onlySelf:!0,emitEvent:n.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?xo:Co}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(n,t){if(this.asyncValidator){this.status=gi,this._hasOwnPendingAsyncValidator={emitEvent:t!==!1,shouldHaveEmitted:n!==!1};let r=Cy(this.asyncValidator(this));this._asyncValidationSubscription=r.subscribe(i=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(i,{emitEvent:t,shouldHaveEmitted:n})})}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let n=(this._hasOwnPendingAsyncValidator?.emitEvent||this._hasOwnPendingAsyncValidator?.shouldHaveEmitted)??!1;return this._hasOwnPendingAsyncValidator=null,n}return!1}setErrors(n,t={}){this.errors=n,this._updateControlsErrors(t.emitEvent!==!1,this,t.shouldHaveEmitted)}get(n){let t=n;return t==null||(Array.isArray(t)||(t=t.split(".")),t.length===0)?null:t.reduce((r,i)=>r&&r._find(i),this)}getError(n,t){let r=t?this.get(t):this;return r?.errors?r.errors[n]:null}hasError(n,t){return!!this.getError(n,t)}get root(){let n=this;for(;n._parent;)n=n._parent;return n}_updateControlsErrors(n,t,r){this.status=this._calculateStatus(),n&&this.statusChanges.emit(this.status),(n||r)&&this._events.next(new vi(this.status,t)),this._parent&&this._parent._updateControlsErrors(n,t,r)}_initObservables(){this.valueChanges=new de,this.statusChanges=new de}_calculateStatus(){return this._allControlsDisabled()?xo:this.errors?hl:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(gi)?gi:this._anyControlsHaveStatus(hl)?hl:Co}_anyControlsHaveStatus(n){return this._anyControls(t=>t.status===n)}_anyControlsDirty(){return this._anyControls(n=>n.dirty)}_anyControlsTouched(){return this._anyControls(n=>n.touched)}_updatePristine(n,t){let r=!this._anyControlsDirty(),i=this.pristine!==r;this.pristine=r,n.onlySelf||this._parent?._updatePristine(n,t),i&&this._events.next(new So(this.pristine,t))}_updateTouched(n={},t){this.touched=this._anyControlsTouched(),this._events.next(new Mo(this.touched,t)),n.onlySelf||this._parent?._updateTouched(n,t)}_onDisabledChange=[];_registerOnCollectionChange(n){this._onCollectionChange=n}_setUpdateStrategy(n){El(n)&&n.updateOn!=null&&(this._updateOn=n.updateOn)}_parentMarkedDirty(n){return!n&&!!this._parent?.dirty&&!this._parent._anyControlsDirty()}_find(n){return null}_assignValidators(n){this._rawValidators=Array.isArray(n)?n.slice():n,this._composedValidatorFn=VI(this._rawValidators),this._updateHasRequiredValidator()}_assignAsyncValidators(n){this._rawAsyncValidators=Array.isArray(n)?n.slice():n,this._composedAsyncValidatorFn=jI(this._rawAsyncValidators)}_updateHasRequiredValidator(){Pe(()=>this._hasRequired.set(this.hasValidator(To.required)))}};function Oy(e,n){return Object.hasOwn(e,n)}function UI(e){return e.tagName==="INPUT"||e.tagName==="SELECT"||e.tagName==="TEXTAREA"}function zI(e,n,t,r){switch(t){case"name":e.setAttribute(n,t,r);break;case"disabled":case"readonly":case"required":r?e.setAttribute(n,t,""):e.removeAttribute(n,t);break;case"max":case"min":case"minLength":case"maxLength":r!==void 0?e.setAttribute(n,t,r.toString()):e.removeAttribute(n,t);break}}var Tf=class{kind;context;control;message;constructor({kind:n,context:t,control:r}){this.kind=n,this.context=t,this.control=r}};var $I=(()=>{class e{_validator=ml;_onChange;_enabled;ngOnChanges(t){if(this.inputName in t){let r=this.normalizeInput(t[this.inputName].currentValue);this._enabled=this.enabled(r),this._validator=this._enabled?this.createValidator(r):ml,this._onChange?.()}}validate(t){return this._validator(t)}registerOnValidatorChange(t){this._onChange=t}enabled(t){return t!=null}static \u0275fac=function(r){return new(r||e)};static \u0275dir=$({type:e,features:[rt]})}return e})();var GI={provide:bi,useExisting:Fe(()=>Fy),multi:!0};var Fy=(()=>{class e extends $I{required;inputName="required";normalizeInput=we;createValidator=t=>wy;enabled(t){return t}static \u0275fac=(()=>{let t;return function(i){return(t||(t=gr(e)))(i||e)}})();static \u0275dir=$({type:e,selectors:[["","required","","formControlName","",3,"type","checkbox"],["","required","","formControl","",3,"type","checkbox"],["","required","","ngModel","",3,"type","checkbox"]],hostVars:1,hostBindings:function(r,i){r&2&&Re("required",i._enabled?"":null)},inputs:{required:"required"},standalone:!1,features:[De([GI]),He]})}return e})();var WI=new b(""),Cl=new b("",{factory:()=>xl}),xl="always";function YI(e,n){return[...n.path,e]}function qI(e,n,t=xl){Ff(e,n),n.valueAccessor.writeValue(e.value),(e.disabled||t==="always")&&n.valueAccessor.setDisabledState?.(e.disabled),XI(e,n),KI(e,n),QI(e,n),ZI(e,n)}function vy(e,n,t=!0){let r=()=>{};n?.valueAccessor?.registerOnChange(r),n?.valueAccessor?.registerOnTouched(r),Dl(e,n),e&&(n._invokeOnDestroyCallbacks(),e._registerOnCollectionChange(()=>{}))}function _l(e,n){e.forEach(t=>{t.registerOnValidatorChange&&t.registerOnValidatorChange(n)})}function ZI(e,n){if(n.valueAccessor.setDisabledState){let t=r=>{n.valueAccessor.setDisabledState(r)};e.registerOnDisabledChange(t),n._registerOnDestroy(()=>{e._unregisterOnDisabledChange(t)})}}function Ff(e,n){let t=Ay(e);n.validator!==null?e.setValidators(my(t,n.validator)):typeof t=="function"&&e.setValidators([t]);let r=Ny(e);n.asyncValidator!==null?e.setAsyncValidators(my(r,n.asyncValidator)):typeof r=="function"&&e.setAsyncValidators([r]);let i=()=>e.updateValueAndValidity();_l(n._rawValidators,i),_l(n._rawAsyncValidators,i)}function Dl(e,n){let t=!1;if(e!==null){if(n.validator!==null){let i=Ay(e);if(Array.isArray(i)&&i.length>0){let o=i.filter(s=>s!==n.validator);o.length!==i.length&&(t=!0,e.setValidators(o))}}if(n.asyncValidator!==null){let i=Ny(e);if(Array.isArray(i)&&i.length>0){let o=i.filter(s=>s!==n.asyncValidator);o.length!==i.length&&(t=!0,e.setAsyncValidators(o))}}}let r=()=>{};return _l(n._rawValidators,r),_l(n._rawAsyncValidators,r),t}function XI(e,n){n.valueAccessor.registerOnChange(t=>{e._pendingValue=t,e._pendingChange=!0,e._pendingDirty=!0,e.updateOn==="change"&&Py(e,n)})}function QI(e,n){n.valueAccessor.registerOnTouched(()=>{e._pendingTouched=!0,e.updateOn==="blur"&&e._pendingChange&&Py(e,n),e.updateOn!=="submit"&&e.markAsTouched()})}function Py(e,n){e._pendingDirty&&e.markAsDirty(),e.setValue(e._pendingValue,{emitModelToViewChange:!1}),n.viewToModelUpdate(e._pendingValue),e._pendingChange=!1}function KI(e,n){let t=(r,i)=>{n.valueAccessor.writeValue(r),i&&n.viewToModelUpdate(r)};e.registerOnChange(t),n._registerOnDestroy(()=>{e._unregisterOnChange(t)})}function Ly(e,n){e==null,Ff(e,n)}function JI(e,n){return Dl(e,n)}function eS(e,n){if(!e.hasOwnProperty("model"))return!1;let t=e.model;return t.isFirstChange()?!0:!Object.is(n,t.currentValue)}function tS(e){return Object.getPrototypeOf(e.constructor)===xI}function Vy(e,n){e._syncPendingControls(),n.forEach(t=>{let r=t.control;r.updateOn==="submit"&&r._pendingChange&&(t.viewToModelUpdate(r._pendingValue),r._pendingChange=!1)})}function nS(e,n){if(!n)return null;Array.isArray(n);let t,r,i;return n.forEach(o=>{o.constructor===Dy?t=o:tS(o)?r=o:i=o}),i||r||t||null}function rS(e,n){let t=e.indexOf(n);t>-1&&e.splice(t,1)}var iS={provide:WI,useFactory:()=>{let e=f(Fn,{self:!0});return{setParseErrors:n=>{e.setParseErrorSource(n)},set onReset(n){e.onReset=n}}}},Fn=class extends gl{_parent=null;name=null;valueAccessor=null;isCustomControlBased=!1;userOnReset;resetSubscription;set onReset(n){this.userOnReset=n,this.resetSubscription?.unsubscribe(),this.resetSubscription=void 0,this.control&&(this.resetSubscription=this.control.events.subscribe(t=>{t instanceof yi&&this.control&&this.userOnReset?.(this.control.value)}),this.subscription?.add(this.resetSubscription))}isNativeFormElement=!1;rawValueAccessors;_selectedValueAccessor=null;get selectedValueAccessor(){return this._selectedValueAccessor??=nS(this,this.rawValueAccessors)}parseErrorsValidator=null;renderer;injector;requiredValidatorViaDi;subscription;customControlBindings=null;constructor(n,t,r){super(),this.injector=n,this.renderer=t,this.rawValueAccessors=r,this.injector?.get(Qe)?.onDestroy(()=>{this.removeParseErrorsValidator(this.control),this.subscription?.unsubscribe()})}setupCustomControl(){this.subscription?.unsubscribe();let n=this.injector?.get(Nn);if(!this.control||!n)return;let t=n.markForCheck.bind(n);this.subscription=new oe,this.subscription.add(this.control.valueChanges.subscribe(t)),this.subscription.add(this.control.statusChanges.subscribe(t)),this.resetSubscription?.unsubscribe(),this.resetSubscription=void 0,this.userOnReset&&(this.resetSubscription=this.control.events.subscribe(r=>{r instanceof yi&&this.control&&this.userOnReset?.(this.control.value)}),this.subscription.add(this.resetSubscription)),this.parseErrorsValidator&&this.control.addValidators(this.parseErrorsValidator)}ngControlCreate(n){!n.nativeElement.hasAttribute?.("ngNoCva")&&(this.rawValueAccessors&&this.rawValueAccessors.length>0||this.valueAccessor!==null)||!n.customControl||(this.isCustomControlBased=!0,n.listenToCustomControlModel(i=>{this.control?.setValue(i,{emitModelToViewChange:!1}),this.control?.markAsDirty(),this.viewToModelUpdate(i)}),n.listenToCustomControlOutput("touch",()=>{this.control?.markAsTouched()}),this.customControlBindings={},this.isNativeFormElement=UI(n.nativeElement),this.requiredValidatorViaDi=this._rawValidators.find(i=>i instanceof Fy))}ngControlUpdate(n,t){if(!this.isCustomControlBased)return;let r=this.control,i=this.customControlBindings;Object.is(i.value,r.value)||(i.value=r.value,n.setCustomControlModelInput(r.value)),this.bindControlProperty(n,i,"touched",r.touched),this.bindControlProperty(n,i,"dirty",r.dirty),this.bindControlProperty(n,i,"valid",r.valid),this.bindControlProperty(n,i,"invalid",r.invalid),this.bindControlProperty(n,i,"pending",r.pending),this.bindControlProperty(n,i,"disabled",r.disabled),this.shouldBindRequired&&this.bindControlProperty(n,i,"required",this.isRequired);let o=r.errors;if(i.errors!==o){i.errors=o;let s=this._convertErrors(o);n.setInputOnDirectives("errors",s)}}get isRequired(){return(this.requiredValidatorViaDi?._enabled||this.control?._hasRequired())??!1}get shouldBindRequired(){return!0}bindControlProperty(n,t,r,i){if(t[r]===i)return;t[r]=i;let o=n.setInputOnDirectives(r,i);this.isNativeFormElement&&!o&&(r==="disabled"||r==="required")&&this.renderer&&zI(this.renderer,n.nativeElement,r,i)}_convertErrors(n){if(n===null)return[];let t=this.control;return Object.entries(n).map(([r,i])=>new Tf({context:i,kind:r,control:t}))}setParseErrorSource(n){if(n===void 0)return;let t=null,r=ze(()=>{let i=n();return i.length===0?null:i.reduce((o,s)=>(o[s.kind]=s,o),{})});this.parseErrorsValidator=(()=>t).bind(this),Pt(()=>{t=r(),this.control?.updateValueAndValidity({emitEvent:!1})},{injector:this.injector})}removeParseErrorsValidator(n){this.parseErrorsValidator&&(n?.removeValidators(this.parseErrorsValidator),n?.updateValueAndValidity({emitEvent:!1}))}},wl=class{_cd;constructor(n){this._cd=n}get isTouched(){return this._cd?.control?._touched?.(),!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return this._cd?.control?._pristine?.(),!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return this._cd?.control?._status?.(),!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return this._cd?._submitted?.(),!!this._cd?.submitted}};var Il=(()=>{class e extends wl{constructor(t){super(t)}static \u0275fac=function(r){return new(r||e)(re(Fn,2))};static \u0275dir=$({type:e,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(r,i){r&2&&U("ng-untouched",i.isUntouched)("ng-touched",i.isTouched)("ng-pristine",i.isPristine)("ng-dirty",i.isDirty)("ng-valid",i.isValid)("ng-invalid",i.isInvalid)("ng-pending",i.isPending)},standalone:!1,features:[He]})}return e})(),Sl=(()=>{class e extends wl{constructor(t){super(t)}static \u0275fac=function(r){return new(r||e)(re(kn,10))};static \u0275dir=$({type:e,selectors:[["","formGroupName",""],["","formArrayName",""],["","ngModelGroup",""],["","formGroup",""],["","formArray",""],["form",3,"ngNoForm",""],["","ngForm",""]],hostVars:16,hostBindings:function(r,i){r&2&&U("ng-untouched",i.isUntouched)("ng-touched",i.isTouched)("ng-pristine",i.isPristine)("ng-dirty",i.isDirty)("ng-valid",i.isValid)("ng-invalid",i.isInvalid)("ng-pending",i.isPending)("ng-submitted",i.isSubmitted)},standalone:!1,features:[He]})}return e})(),Pn=class extends bl{constructor(n,t,r){super(Ry(t),ky(r,t)),this.controls=n,this._initObservables(),this._setUpdateStrategy(t),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;registerControl(n,t){let r=this._find(n);return r||(this.controls[n]=t,t.setParent(this),t._registerOnCollectionChange(this._onCollectionChange),t)}addControl(n,t,r={}){this.registerControl(n,t),this.updateValueAndValidity({emitEvent:r.emitEvent}),this._onCollectionChange()}removeControl(n,t={}){let r=this._find(n);r&&r._registerOnCollectionChange(()=>{}),delete this.controls[n],this.updateValueAndValidity({emitEvent:t.emitEvent}),this._onCollectionChange()}setControl(n,t,r={}){let i=this._find(n);i&&i._registerOnCollectionChange(()=>{}),delete this.controls[n],t&&this.registerControl(n,t),this.updateValueAndValidity({emitEvent:r.emitEvent}),this._onCollectionChange()}contains(n){return this._find(n)?.enabled===!0}setValue(n,t={}){Pe(()=>{HI(this,!0,n),Object.keys(n).forEach(r=>{BI(this,!0,r),this.controls[r].setValue(n[r],{onlySelf:!0,emitEvent:t.emitEvent})}),this.updateValueAndValidity(t)})}patchValue(n,t={}){n!=null&&(Object.keys(n).forEach(r=>{let i=this._find(r);i&&i.patchValue(n[r],{onlySelf:!0,emitEvent:t.emitEvent})}),this.updateValueAndValidity(t))}reset(n={},t={}){this._forEachChild((r,i)=>{r.reset(n?n[i]:null,H(D({},t),{onlySelf:!0}))}),this._updatePristine(t,this),this._updateTouched(t,this),this.updateValueAndValidity(t),t?.emitEvent!==!1&&this._events.next(new yi(this))}getRawValue(){return this._reduceChildren({},(n,t,r)=>(n[r]=t.getRawValue(),n))}_syncPendingControls(){let n=this._reduceChildren(!1,(t,r)=>r._syncPendingControls()?!0:t);return n&&this.updateValueAndValidity({onlySelf:!0}),n}_forEachChild(n){Object.keys(this.controls).forEach(t=>{let r=this.controls[t];r&&n(r,t)})}_setUpControls(){this._forEachChild(n=>{n.setParent(this),n._registerOnCollectionChange(this._onCollectionChange)})}_updateValue(){this.value=this._reduceValue()}_anyControls(n){for(let[t,r]of Object.entries(this.controls))if(this.contains(t)&&n(r))return!0;return!1}_reduceValue(){let n={};return this._reduceChildren(n,(t,r,i)=>((r.enabled||this.disabled)&&(t[i]=r.value),t))}_reduceChildren(n,t){let r=n;return this._forEachChild((i,o)=>{r=t(r,i,o)}),r}_allControlsDisabled(){for(let n of Object.keys(this.controls))if(this.controls[n].enabled)return!1;return Object.keys(this.controls).length>0||this.disabled}_find(n){return Oy(this.controls,n)?this.controls[n]:null}};var oS={provide:kn,useExisting:Fe(()=>Pf)},Io=Promise.resolve(),Pf=(()=>{class e extends kn{callSetDisabledState;get submitted(){return Pe(this.submittedReactive)}_submitted=ze(()=>this.submittedReactive());submittedReactive=ne(!1);_directives=new Set;form;ngSubmit=new de;options;constructor(t,r,i){super(),this.callSetDisabledState=i,this.form=new Pn({},kf(t),Of(r))}ngAfterViewInit(){this._setUpdateStrategy()}get formDirective(){return this}get control(){return this.form}get path(){return[]}get controls(){return this.form.controls}addControl(t){Io.then(()=>{let r=this._findContainer(t.path);t.control=r.registerControl(t.name,t.control),t._setupWithForm(this.callSetDisabledState),t.control.updateValueAndValidity({emitEvent:!1}),this._directives.add(t)})}getControl(t){return this.form.get(t.path)}removeControl(t){Io.then(()=>{this._findContainer(t.path)?.removeControl(t.name),this._directives.delete(t)})}addFormGroup(t){Io.then(()=>{let r=this._findContainer(t.path),i=new Pn({});Ly(i,t),r.registerControl(t.name,i),i.updateValueAndValidity({emitEvent:!1})})}removeFormGroup(t){Io.then(()=>{this._findContainer(t.path)?.removeControl?.(t.name)})}getFormGroup(t){return this.form.get(t.path)}updateModel(t,r){Io.then(()=>{this.form.get(t.path).setValue(r)})}setValue(t){this.control.setValue(t)}onSubmit(t){return this.submittedReactive.set(!0),Vy(this.form,this._directives),this.ngSubmit.emit(t),this.form._events.next(new yl(this.control)),t?.target?.method==="dialog"}onReset(){this.resetForm()}resetForm(t=void 0){this.form.reset(t),this.submittedReactive.set(!1)}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.form._updateOn=this.options.updateOn)}_findContainer(t){return t.pop(),t.length?this.form.get(t):this.form}static \u0275fac=function(r){return new(r||e)(re(bi,10),re(Rf,10),re(Cl,8))};static \u0275dir=$({type:e,selectors:[["form",3,"ngNoForm","",3,"formGroup","",3,"formArray",""],["ng-form"],["","ngForm",""]],hostBindings:function(r,i){r&1&&le("submit",function(s){return i.onSubmit(s)})("reset",function(){return i.onReset()})},inputs:{options:[0,"ngFormOptions","options"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:!1,features:[De([oS]),He]})}return e})();function yy(e,n){let t=e.indexOf(n);t>-1&&e.splice(t,1)}function by(e){return typeof e=="object"&&e!==null&&Object.keys(e).length===2&&"value"in e&&"disabled"in e}var se=class extends bl{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=!1;constructor(n=null,t,r){super(Ry(t),ky(r,t)),this._applyFormState(n),this._setUpdateStrategy(t),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),El(t)&&(t.nonNullable||t.initialValueIsDefault)&&(by(n)?this.defaultValue=n.value:this.defaultValue=n)}setValue(n,t={}){Pe(()=>{this.value=this._pendingValue=n,this._onChange.length&&t.emitModelToViewChange!==!1&&this._onChange.forEach(r=>r(this.value,t.emitViewToModelChange!==!1)),this.updateValueAndValidity(t)})}patchValue(n,t={}){this.setValue(n,t)}reset(n=this.defaultValue,t={}){this._applyFormState(n),this.markAsPristine(t),this.markAsUntouched(t),this.setValue(this.value,t),t.overwriteDefaultValue&&(this.defaultValue=this.value),this._pendingChange=!1,t?.emitEvent!==!1&&this._events.next(new yi(this))}_updateValue(){}_anyControls(n){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(n){this._onChange.push(n)}_unregisterOnChange(n){yy(this._onChange,n)}registerOnDisabledChange(n){this._onDisabledChange.push(n)}_unregisterOnDisabledChange(n){yy(this._onDisabledChange,n)}_forEachChild(n){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),!0):!1}_applyFormState(n){by(n)?(this.value=this._pendingValue=n.value,n.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=n}};var sS=e=>e instanceof se;var jy=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275dir=$({type:e,selectors:[["form",3,"ngNoForm","",3,"ngNativeValidate",""]],hostAttrs:["novalidate",""],standalone:!1})}return e})();var aS=(()=>{class e extends kn{callSetDisabledState;get submitted(){return Pe(this._submittedReactive)}set submitted(t){this._submittedReactive.set(t)}_submitted=ze(()=>this._submittedReactive());_submittedReactive=ne(!1);_oldForm;_onCollectionChange=()=>this._updateDomValue();directives=[];constructor(t,r,i){super(),this.callSetDisabledState=i,this._setValidators(t),this._setAsyncValidators(r)}ngOnChanges(t){this.onChanges(t)}ngOnDestroy(){this.onDestroy()}onChanges(t){this._checkFormPresent(),t.hasOwnProperty("form")&&(this._updateValidators(),this._updateDomValue(),this._updateRegistrations(),this._oldForm=this.form)}onDestroy(){this.form&&(Dl(this.form,this),this.form._onCollectionChange===this._onCollectionChange&&this.form._registerOnCollectionChange(()=>{}))}get formDirective(){return this}get path(){return[]}addControl(t){let r=this.form.get(t.path);return t._setupWithForm(r,this.callSetDisabledState),r.updateValueAndValidity({emitEvent:!1}),this.directives.push(t),r}getControl(t){return this.form.get(t.path)}removeControl(t){vy(t.control||null,t,!1),rS(this.directives,t)}addFormGroup(t){this._setUpFormContainer(t)}removeFormGroup(t){this._cleanUpFormContainer(t)}getFormGroup(t){return this.form.get(t.path)}getFormArray(t){return this.form.get(t.path)}addFormArray(t){this._setUpFormContainer(t)}removeFormArray(t){this._cleanUpFormContainer(t)}updateModel(t,r){this.form.get(t.path).setValue(r)}onReset(){this.resetForm()}resetForm(t=void 0,r={}){this.form.reset(t,r),this._submittedReactive.set(!1)}onSubmit(t){return this.submitted=!0,Vy(this.form,this.directives),this.ngSubmit.emit(t),this.form._events.next(new yl(this.control)),t?.target?.method==="dialog"}_updateDomValue(){this.directives.forEach(t=>{let r=t.control,i=this.form.get(t.path);r!==i&&(vy(r||null,t),sS(i)&&t._setupWithForm(i,this.callSetDisabledState))}),this.form._updateTreeValidity({emitEvent:!1})}_setUpFormContainer(t){let r=this.form.get(t.path);Ly(r,t),r.updateValueAndValidity({emitEvent:!1})}_cleanUpFormContainer(t){let r=this.form?.get(t.path);r&&JI(r,t)&&r.updateValueAndValidity({emitEvent:!1})}_updateRegistrations(){this.form._registerOnCollectionChange(this._onCollectionChange),this._oldForm?._registerOnCollectionChange(()=>{})}_updateValidators(){Ff(this.form,this),this._oldForm&&Dl(this._oldForm,this)}_checkFormPresent(){this.form}static \u0275fac=function(r){return new(r||e)(re(bi,10),re(Rf,10),re(Cl,8))};static \u0275dir=$({type:e,features:[He,rt]})}return e})();var By=new b("");var lS={provide:Fn,useExisting:Fe(()=>Ao)},Ao=(()=>{class e extends Fn{_ngModelWarningConfig;_added=!1;viewModel;control;name=null;set isDisabled(t){}model;update=new de;static _ngModelWarningSentOnce=!1;_ngModelWarningSent=!1;constructor(t,r,i,o,s,a,l){super(l,a,o),this._ngModelWarningConfig=s,this._parent=t,this._setValidators(r),this._setAsyncValidators(i)}_setupWithForm(t,r){this.control=t,this.isCustomControlBased?this.setupCustomControl():(this.valueAccessor??=this.selectedValueAccessor,qI(t,this,r))}ngOnChanges(t){this._added||this._setUpControl(),eS(t,this.viewModel)&&(this.viewModel=this.model,this.formDirective.updateModel(this,this.model))}ngOnDestroy(){this.formDirective?.removeControl(this)}viewToModelUpdate(t){this.viewModel=t,this.update.emit(t)}get path(){return YI(this.name==null?this.name:this.name.toString(),this._parent)}get formDirective(){return this._parent?this._parent.formDirective:null}_setUpControl(){this.control=this.formDirective.addControl(this),this._added=!0}\u0275ngControlCreate(t){super.ngControlCreate(t)}\u0275ngControlUpdate(t){this.isCustomControlBased&&(this._added||this._setUpControl(),super.ngControlUpdate(t,!0))}static \u0275fac=function(r){return new(r||e)(re(kn,13),re(bi,10),re(Rf,10),re(Ut,10),re(By,8),re(Be,8),re(J,8))};static \u0275dir=$({type:e,selectors:[["","formControlName",""]],inputs:{name:[0,"formControlName","name"],isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"]},outputs:{update:"ngModelChange"},standalone:!1,features:[De([lS,iS]),He,rt,qu(null)]})}return e})();var cS={provide:kn,useExisting:Fe(()=>Er)},Er=(()=>{class e extends aS{form=null;ngSubmit=new de;get control(){return this.form}static \u0275fac=(()=>{let t;return function(i){return(t||(t=gr(e)))(i||e)}})();static \u0275dir=$({type:e,selectors:[["","formGroup",""]],hostBindings:function(r,i){r&1&&le("submit",function(s){return i.onSubmit(s)})("reset",function(){return i.onReset()})},inputs:{form:[0,"formGroup","form"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:!1,features:[De([cS]),He]})}return e})();var Hy=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=X({type:e});static \u0275inj=Y({})}return e})();var Uy=(()=>{class e{static withConfig(t){return{ngModule:e,providers:[{provide:Cl,useValue:t.callSetDisabledState??xl}]}}static \u0275fac=function(r){return new(r||e)};static \u0275mod=X({type:e});static \u0275inj=Y({imports:[Hy]})}return e})(),Ml=(()=>{class e{static withConfig(t){return{ngModule:e,providers:[{provide:By,useValue:t.warnOnNgModelWithFormControl??"always"},{provide:Cl,useValue:t.callSetDisabledState??xl}]}}static \u0275fac=function(r){return new(r||e)};static \u0275mod=X({type:e});static \u0275inj=Y({imports:[Hy]})}return e})();function No(e){return e.buttons===0||e.detail===0}function Ro(e){let n=e.touches&&e.touches[0]||e.changedTouches&&e.changedTouches[0];return!!n&&n.identifier===-1&&(n.radiusX==null||n.radiusX===1)&&(n.radiusY==null||n.radiusY===1)}var Lf;function $y(){if(Lf==null){let e=typeof document<"u"?document.head:null;Lf=!!(e&&(e.createShadowRoot||e.attachShadow))}return Lf}function Vf(e){if($y()){let n=e.getRootNode?e.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&n instanceof ShadowRoot)return n}return null}function Je(e){if(e.composedPath)try{return e.composedPath()[0]}catch(n){}return e.target}var jf;try{jf=typeof Intl<"u"&&Intl.v8BreakIterator}catch(e){jf=!1}var be=(()=>{class e{_platformId=f(ur);isBrowser=this._platformId?zv(this._platformId):typeof document=="object"&&!!document;EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent);TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent);BLINK=this.isBrowser&&!!(window.chrome||jf)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT;WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT;IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window);FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent);ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT;SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT;static \u0275fac=function(r){return new(r||e)};static \u0275prov=R({token:e,factory:e.\u0275fac})}return e})();var ko;function Gy(){if(ko==null&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>ko=!0}))}finally{ko=ko||!1}return ko}function _i(e){return Gy()?e:!!e.capture}function it(e){return e instanceof G?e.nativeElement:e}var Wy=new b("cdk-input-modality-detector-options"),Yy={ignoreKeys:[18,17,224,91,16]},qy=650,Bf={passive:!0,capture:!0},Zy=(()=>{class e{_platform=f(be);_listenerCleanups;modalityDetected;modalityChanged;get mostRecentModality(){return this._modality.value}_mostRecentTarget=null;_modality=new Wn(null);_options;_lastTouchMs=0;_onKeydown=t=>{this._options?.ignoreKeys?.some(r=>r===t.keyCode)||(this._modality.next("keyboard"),this._mostRecentTarget=Je(t))};_onMousedown=t=>{Date.now()-this._lastTouchMs<qy||(this._modality.next(No(t)?"keyboard":"mouse"),this._mostRecentTarget=Je(t))};_onTouchstart=t=>{if(Ro(t)){this._modality.next("keyboard");return}this._lastTouchMs=Date.now(),this._modality.next("touch"),this._mostRecentTarget=Je(t)};constructor(){let t=f(A),r=f(j),i=f(Wy,{optional:!0});if(this._options=D(D({},Yy),i),this.modalityDetected=this._modality.pipe(Dc(1)),this.modalityChanged=this.modalityDetected.pipe(Is()),this._platform.isBrowser){let o=f(Ne).createRenderer(null,null);this._listenerCleanups=t.runOutsideAngular(()=>[o.listen(r,"keydown",this._onKeydown,Bf),o.listen(r,"mousedown",this._onMousedown,Bf),o.listen(r,"touchstart",this._onTouchstart,Bf)])}}ngOnDestroy(){this._modality.complete(),this._listenerCleanups?.forEach(t=>t())}static \u0275fac=function(r){return new(r||e)};static \u0275prov=R({token:e,factory:e.\u0275fac})}return e})(),Oo=(function(e){return e[e.IMMEDIATE=0]="IMMEDIATE",e[e.EVENTUAL=1]="EVENTUAL",e})(Oo||{}),Xy=new b("cdk-focus-monitor-default-options"),Tl=_i({passive:!0,capture:!0}),Fo=(()=>{class e{_ngZone=f(A);_platform=f(be);_inputModalityDetector=f(Zy);_origin=null;_lastFocusOrigin=null;_windowFocused=!1;_windowFocusTimeoutId;_originTimeoutId;_originFromTouchInteraction=!1;_elementInfo=new Map;_monitoredElementCount=0;_rootNodeFocusListenerCount=new Map;_detectionMode;_windowFocusListener=()=>{this._windowFocused=!0,this._windowFocusTimeoutId=setTimeout(()=>this._windowFocused=!1)};_document=f(j);_stopInputModalityDetector=new B;constructor(){let t=f(Xy,{optional:!0});this._detectionMode=t?.detectionMode||Oo.IMMEDIATE}_rootNodeFocusAndBlurListener=t=>{let r=Je(t);for(let i=r;i;i=i.parentElement)t.type==="focus"?this._onFocus(t,i):this._onBlur(t,i)};monitor(t,r=!1){let i=it(t);if(!this._platform.isBrowser||i.nodeType!==1)return et();let o=Vf(i)||this._document,s=this._elementInfo.get(i);if(s)return r&&(s.checkChildren=!0),s.subject;let a={checkChildren:r,subject:new B,rootNode:o};return this._elementInfo.set(i,a),this._registerGlobalListeners(a),a.subject}stopMonitoring(t){let r=it(t),i=this._elementInfo.get(r);i&&(i.subject.complete(),this._setClasses(r),this._elementInfo.delete(r),this._removeGlobalListeners(i))}focusVia(t,r,i){let o=it(t),s=this._document.activeElement;o===s?this._getClosestElementsInfo(o).forEach(([a,l])=>this._originChanged(a,r,l)):(this._setOrigin(r),typeof o.focus=="function"&&o.focus(i))}ngOnDestroy(){this._elementInfo.forEach((t,r)=>this.stopMonitoring(r))}_getWindow(){return this._document.defaultView||window}_getFocusOrigin(t){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(t)?"touch":"program":this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:t&&this._isLastInteractionFromInputLabel(t)?"mouse":"program"}_shouldBeAttributedToTouch(t){return this._detectionMode===Oo.EVENTUAL||!!t?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(t,r){t.classList.toggle("cdk-focused",!!r),t.classList.toggle("cdk-touch-focused",r==="touch"),t.classList.toggle("cdk-keyboard-focused",r==="keyboard"),t.classList.toggle("cdk-mouse-focused",r==="mouse"),t.classList.toggle("cdk-program-focused",r==="program")}_setOrigin(t,r=!1){this._ngZone.runOutsideAngular(()=>{if(this._origin=t,this._originFromTouchInteraction=t==="touch"&&r,this._detectionMode===Oo.IMMEDIATE){clearTimeout(this._originTimeoutId);let i=this._originFromTouchInteraction?qy:1;this._originTimeoutId=setTimeout(()=>this._origin=null,i)}})}_onFocus(t,r){let i=this._elementInfo.get(r),o=Je(t);!i||!i.checkChildren&&r!==o||this._originChanged(r,this._getFocusOrigin(o),i)}_onBlur(t,r){let i=this._elementInfo.get(r);!i||i.checkChildren&&t.relatedTarget instanceof Node&&r.contains(t.relatedTarget)||(this._setClasses(r),this._emitOrigin(i,null))}_emitOrigin(t,r){t.subject.observers.length&&this._ngZone.run(()=>t.subject.next(r))}_registerGlobalListeners(t){if(!this._platform.isBrowser)return;let r=t.rootNode,i=this._rootNodeFocusListenerCount.get(r)||0;i||this._ngZone.runOutsideAngular(()=>{r.addEventListener("focus",this._rootNodeFocusAndBlurListener,Tl),r.addEventListener("blur",this._rootNodeFocusAndBlurListener,Tl)}),this._rootNodeFocusListenerCount.set(r,i+1),++this._monitoredElementCount===1&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener("focus",this._windowFocusListener)}),this._inputModalityDetector.modalityDetected.pipe(hn(this._stopInputModalityDetector)).subscribe(o=>{this._setOrigin(o,!0)}))}_removeGlobalListeners(t){let r=t.rootNode;if(this._rootNodeFocusListenerCount.has(r)){let i=this._rootNodeFocusListenerCount.get(r);i>1?this._rootNodeFocusListenerCount.set(r,i-1):(r.removeEventListener("focus",this._rootNodeFocusAndBlurListener,Tl),r.removeEventListener("blur",this._rootNodeFocusAndBlurListener,Tl),this._rootNodeFocusListenerCount.delete(r))}--this._monitoredElementCount||(this._getWindow().removeEventListener("focus",this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId))}_originChanged(t,r,i){this._setClasses(t,r),this._emitOrigin(i,r),this._lastFocusOrigin=r}_getClosestElementsInfo(t){let r=[];return this._elementInfo.forEach((i,o)=>{(o===t||i.checkChildren&&o.contains(t))&&r.push([o,i])}),r}_isLastInteractionFromInputLabel(t){let{_mostRecentTarget:r,mostRecentModality:i}=this._inputModalityDetector;if(i!=="mouse"||!r||r===t||t.nodeName!=="INPUT"&&t.nodeName!=="TEXTAREA"||t.disabled)return!1;let o=t.labels;if(o){for(let s=0;s<o.length;s++)if(o[s].contains(r))return!0}return!1}static \u0275fac=function(r){return new(r||e)};static \u0275prov=R({token:e,factory:e.\u0275fac})}return e})();function Hf(e){return Array.isArray(e)?e:[e]}var Qy=new Set,Cr,Uf=(()=>{class e{_platform=f(be);_nonce=f(Cn,{optional:!0});_matchMedia;constructor(){this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):uS}matchMedia(t){return(this._platform.WEBKIT||this._platform.BLINK)&&dS(t,this._nonce),this._matchMedia(t)}static \u0275fac=function(r){return new(r||e)};static \u0275prov=R({token:e,factory:e.\u0275fac})}return e})();function dS(e,n){if(!Qy.has(e))try{Cr||(Cr=document.createElement("style"),n&&Cr.setAttribute("nonce",n),Cr.setAttribute("type","text/css"),document.head.appendChild(Cr)),Cr.sheet&&(Cr.sheet.insertRule(`@media ${e.replace(/[{}]/g,"")} {body{ }}`,0),Qy.add(e))}catch(t){console.error(t)}}function uS(e){return{matches:e==="all"||e==="",media:e,addListener:()=>{},removeListener:()=>{}}}var fS=(()=>{class e{create(t){return typeof MutationObserver>"u"?null:new MutationObserver(t)}static \u0275fac=function(r){return new(r||e)};static \u0275prov=R({token:e,factory:e.\u0275fac})}return e})();var Ky=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=X({type:e});static \u0275inj=Y({providers:[fS]})}return e})();var Jy=new Map,bt=class e{_appId=f(dr);static _infix=`a${Math.floor(Math.random()*1e5).toString()}`;getId(n,t=!1){this._appId!=="ng"&&(n+=this._appId);let r=Jy.get(n);return r===void 0?r=0:r++,Jy.set(n,r),`${n}${t?e._infix+"-":""}${r}`}static \u0275fac=function(t){return new(t||e)};static \u0275prov=R({token:e,factory:e.\u0275fac})};function Te(e){return e==null?"":typeof e=="string"?e:`${e}px`}function ln(e){return e!=null&&`${e}`!="false"}var xr;function tb(){if(xr==null){if(typeof document!="object"||!document||typeof Element!="function"||!Element)return xr=!1,xr;if(document.documentElement?.style&&"scrollBehavior"in document.documentElement.style)xr=!0;else{let e=Element.prototype.scrollTo;e?xr=!/\{\s*\[native code\]\s*\}/.test(e.toString()):xr=!1}}return xr}function zf(){return typeof __karma__<"u"&&!!__karma__||typeof jasmine<"u"&&!!jasmine||typeof jest<"u"&&!!jest||typeof Mocha<"u"&&!!Mocha}var Di,nb=["color","button","checkbox","date","datetime-local","email","file","hidden","image","month","number","password","radio","range","reset","search","submit","tel","text","time","url","week"];function $f(){if(Di)return Di;if(typeof document!="object"||!document)return Di=new Set(nb),Di;let e=document.createElement("input");return Di=new Set(nb.filter(n=>(e.setAttribute("type",n),e.type===n))),Di}var Gf=class{_box;_destroyed=new B;_resizeSubject=new B;_resizeObserver;_elementObservables=new Map;constructor(n){this._box=n,typeof ResizeObserver<"u"&&(this._resizeObserver=new ResizeObserver(t=>this._resizeSubject.next(t)))}observe(n){return this._elementObservables.has(n)||this._elementObservables.set(n,new q(t=>{let r=this._resizeSubject.subscribe(t);return this._resizeObserver?.observe(n,{box:this._box}),()=>{this._resizeObserver?.unobserve(n),r.unsubscribe(),this._elementObservables.delete(n)}}).pipe(tt(t=>t.some(r=>r.target===n)),Ms({bufferSize:1,refCount:!0}),hn(this._destroyed))),this._elementObservables.get(n)}destroy(){this._destroyed.next(),this._destroyed.complete(),this._resizeSubject.complete(),this._elementObservables.clear()}},rb=(()=>{class e{_cleanupErrorListener;_observers=new Map;_ngZone=f(A);constructor(){typeof ResizeObserver<"u"}ngOnDestroy(){for(let[,t]of this._observers)t.destroy();this._observers.clear(),this._cleanupErrorListener?.()}observe(t,r){let i=r?.box||"content-box";return this._observers.has(i)||this._observers.set(i,new Gf(i)),this._observers.get(i).observe(t)}static \u0275fac=function(r){return new(r||e)};static \u0275prov=R({token:e,factory:e.\u0275fac})}return e})();var hS=new b("MATERIAL_ANIMATIONS"),ib=null;function mS(){return f(hS,{optional:!0})?.animationsDisabled||f(Zi,{optional:!0})==="NoopAnimations"?"di-disabled":(ib??=f(Uf).matchMedia("(prefers-reduced-motion)").matches,ib?"reduced-motion":"enabled")}function zt(){return mS()!=="enabled"}var pS=["notch"],gS=["*"],ob=["iconPrefixContainer"],sb=["textPrefixContainer"],ab=["iconSuffixContainer"],lb=["textSuffixContainer"],vS=["textField"],yS=["*",[["mat-label"]],[["","matPrefix",""],["","matIconPrefix",""]],[["","matTextPrefix",""]],[["","matTextSuffix",""]],[["","matSuffix",""],["","matIconSuffix",""]],[["mat-error"],["","matError",""]],[["mat-hint",3,"align","end"]],[["mat-hint","align","end"]]],bS=["*","mat-label","[matPrefix], [matIconPrefix]","[matTextPrefix]","[matTextSuffix]","[matSuffix], [matIconSuffix]","mat-error, [matError]","mat-hint:not([align='end'])","mat-hint[align='end']"];function _S(e,n){e&1&&O(0,"span",21)}function DS(e,n){if(e&1&&(g(0,"label",20),ee(1,1),he(2,_S,1,0,"span",21),v()),e&2){let t=Le(2);T("floating",t._shouldLabelFloat())("monitorResize",t._hasOutline())("id",t._labelId),Re("for",t._control.disableAutomaticLabeling?null:t._control.id),y(2),me(!t.hideRequiredMarker&&t._control.required?2:-1)}}function wS(e,n){if(e&1&&he(0,DS,3,5,"label",20),e&2){let t=Le();me(t._hasFloatingLabel()?0:-1)}}function ES(e,n){e&1&&O(0,"div",7)}function CS(e,n){}function xS(e,n){if(e&1&&ai(0,CS,0,0,"ng-template",13),e&2){Le(2);let t=ci(1);T("ngTemplateOutlet",t)}}function IS(e,n){if(e&1&&(g(0,"div",9),he(1,xS,1,1,null,13),v()),e&2){let t=Le();T("matFormFieldNotchedOutlineOpen",t._shouldLabelFloat()),y(),me(t._forceDisplayInfixLabel()?-1:1)}}function SS(e,n){e&1&&(g(0,"div",10,2),ee(2,2),v())}function MS(e,n){e&1&&(g(0,"div",11,3),ee(2,3),v())}function TS(e,n){}function AS(e,n){if(e&1&&ai(0,TS,0,0,"ng-template",13),e&2){Le();let t=ci(1);T("ngTemplateOutlet",t)}}function NS(e,n){e&1&&(g(0,"div",14,4),ee(2,4),v())}function RS(e,n){e&1&&(g(0,"div",15,5),ee(2,5),v())}function kS(e,n){e&1&&O(0,"div",16)}function OS(e,n){e&1&&(g(0,"div",18),ee(1,6),v())}function FS(e,n){if(e&1&&(g(0,"mat-hint",22),w(1),v()),e&2){let t=Le(2);T("id",t._hintLabelId),y(),ie(t.hintLabel)}}function PS(e,n){if(e&1&&(g(0,"div",19),he(1,FS,2,2,"mat-hint",22),ee(2,7),O(3,"div",23),ee(4,8),v()),e&2){let t=Le();y(),me(t.hintLabel?1:-1)}}var Po=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275dir=$({type:e,selectors:[["mat-label"]]})}return e})(),LS=new b("MatError");var Wf=(()=>{class e{align="start";id=f(bt).getId("mat-mdc-hint-");static \u0275fac=function(r){return new(r||e)};static \u0275dir=$({type:e,selectors:[["mat-hint"]],hostAttrs:[1,"mat-mdc-form-field-hint","mat-mdc-form-field-bottom-align"],hostVars:4,hostBindings:function(r,i){r&2&&(An("id",i.id),Re("align",null),U("mat-mdc-form-field-hint-end",i.align==="end"))},inputs:{align:"align",id:"id"}})}return e})(),VS=new b("MatPrefix");var pb=new b("MatSuffix"),Yf=(()=>{class e{set _isTextSelector(t){this._isText=!0}_isText=!1;static \u0275fac=function(r){return new(r||e)};static \u0275dir=$({type:e,selectors:[["","matSuffix",""],["","matIconSuffix",""],["","matTextSuffix",""]],inputs:{_isTextSelector:[0,"matTextSuffix","_isTextSelector"]},features:[De([{provide:pb,useExisting:e}])]})}return e})(),gb=new b("FloatingLabelParent"),cb=(()=>{class e{_elementRef=f(G);get floating(){return this._floating}set floating(t){this._floating=t,this.monitorResize&&this._handleResize()}_floating=!1;get monitorResize(){return this._monitorResize}set monitorResize(t){this._monitorResize=t,this._monitorResize?this._subscribeToResize():this._resizeSubscription.unsubscribe()}_monitorResize=!1;_resizeObserver=f(rb);_ngZone=f(A);_parent=f(gb);_resizeSubscription=new oe;ngOnDestroy(){this._resizeSubscription.unsubscribe()}getWidth(){return jS(this._elementRef.nativeElement)}get element(){return this._elementRef.nativeElement}_handleResize(){setTimeout(()=>this._parent._handleLabelResized())}_subscribeToResize(){this._resizeSubscription.unsubscribe(),this._ngZone.runOutsideAngular(()=>{this._resizeSubscription=this._resizeObserver.observe(this._elementRef.nativeElement,{box:"border-box"}).subscribe(()=>this._handleResize())})}static \u0275fac=function(r){return new(r||e)};static \u0275dir=$({type:e,selectors:[["label","matFormFieldFloatingLabel",""]],hostAttrs:[1,"mdc-floating-label","mat-mdc-floating-label"],hostVars:2,hostBindings:function(r,i){r&2&&U("mdc-floating-label--float-above",i.floating)},inputs:{floating:"floating",monitorResize:"monitorResize"}})}return e})();function jS(e){let n=e;if(n.offsetParent!==null)return n.scrollWidth;let t=n.cloneNode(!0);t.style.setProperty("position","absolute"),t.style.setProperty("transform","translate(-9999px, -9999px)"),document.documentElement.appendChild(t);let r=t.scrollWidth;return t.remove(),r}var db="mdc-line-ripple--active",Al="mdc-line-ripple--deactivating",ub=(()=>{class e{_elementRef=f(G);_cleanupTransitionEnd;constructor(){let t=f(A),r=f(Be);t.runOutsideAngular(()=>{this._cleanupTransitionEnd=r.listen(this._elementRef.nativeElement,"transitionend",this._handleTransitionEnd)})}activate(){let t=this._elementRef.nativeElement.classList;t.remove(Al),t.add(db)}deactivate(){this._elementRef.nativeElement.classList.add(Al)}_handleTransitionEnd=t=>{let r=this._elementRef.nativeElement.classList,i=r.contains(Al);t.propertyName==="opacity"&&i&&r.remove(db,Al)};ngOnDestroy(){this._cleanupTransitionEnd()}static \u0275fac=function(r){return new(r||e)};static \u0275dir=$({type:e,selectors:[["div","matFormFieldLineRipple",""]],hostAttrs:[1,"mdc-line-ripple"]})}return e})(),fb=(()=>{class e{_elementRef=f(G);_ngZone=f(A);open=!1;_notch;ngAfterViewInit(){let t=this._elementRef.nativeElement,r=t.querySelector(".mdc-floating-label");r?(t.classList.add("mdc-notched-outline--upgraded"),typeof requestAnimationFrame=="function"&&(r.style.transitionDuration="0s",this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>r.style.transitionDuration="")}))):t.classList.add("mdc-notched-outline--no-label")}_setNotchWidth(t){let r=this._notch.nativeElement;!this.open||!t?r.style.width="":r.style.width=`calc(${t}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + 9px)`}_setMaxWidth(t){this._notch.nativeElement.style.setProperty("--mat-form-field-notch-max-width",`calc(100% - ${t}px)`)}static \u0275fac=function(r){return new(r||e)};static \u0275cmp=W({type:e,selectors:[["div","matFormFieldNotchedOutline",""]],viewQuery:function(r,i){if(r&1&&Bt(pS,5),r&2){let o;xe(o=Ie())&&(i._notch=o.first)}},hostAttrs:[1,"mdc-notched-outline"],hostVars:2,hostBindings:function(r,i){r&2&&U("mdc-notched-outline--notched",i.open)},inputs:{open:[0,"matFormFieldNotchedOutlineOpen","open"]},ngContentSelectors:gS,decls:5,vars:0,consts:[["notch",""],[1,"mat-mdc-notch-piece","mdc-notched-outline__leading"],[1,"mat-mdc-notch-piece","mdc-notched-outline__notch"],[1,"mat-mdc-notch-piece","mdc-notched-outline__trailing"]],template:function(r,i){r&1&&(Ue(),gt(0,"div",1),mt(1,"div",2,0),ee(3),pt(),gt(4,"div",3))},encapsulation:2})}return e})(),qf=(()=>{class e{value=null;stateChanges;id;placeholder;ngControl=null;focused=!1;empty=!1;shouldLabelFloat=!1;required=!1;disabled=!1;errorState=!1;controlType;autofilled;userAriaDescribedBy;disableAutomaticLabeling;describedByIds;static \u0275fac=function(r){return new(r||e)};static \u0275dir=$({type:e})}return e})();var Zf=new b("MatFormField"),BS=new b("MAT_FORM_FIELD_DEFAULT_OPTIONS"),hb="fill",HS="auto",mb="fixed",US="translateY(-50%)",Nl=(()=>{class e{_elementRef=f(G);_changeDetectorRef=f(Nn);_platform=f(be);_idGenerator=f(bt);_ngZone=f(A);_defaults=f(BS,{optional:!0});_currentDirection;_textField;_iconPrefixContainer;_textPrefixContainer;_iconSuffixContainer;_textSuffixContainer;_floatingLabel;_notchedOutline;_lineRipple;_iconPrefixContainerSignal=po("iconPrefixContainer");_textPrefixContainerSignal=po("textPrefixContainer");_iconSuffixContainerSignal=po("iconSuffixContainer");_textSuffixContainerSignal=po("textSuffixContainer");_prefixSuffixContainers=ze(()=>[this._iconPrefixContainerSignal(),this._textPrefixContainerSignal(),this._iconSuffixContainerSignal(),this._textSuffixContainerSignal()].map(t=>t?.nativeElement).filter(t=>t!==void 0));_formFieldControl;_prefixChildren;_suffixChildren;_errorChildren;_hintChildren;_labelChild=Fv(Po);get hideRequiredMarker(){return this._hideRequiredMarker}set hideRequiredMarker(t){this._hideRequiredMarker=ln(t)}_hideRequiredMarker=!1;color="primary";get floatLabel(){return this._floatLabel||this._defaults?.floatLabel||HS}set floatLabel(t){t!==this._floatLabel&&(this._floatLabel=t,this._changeDetectorRef.markForCheck())}_floatLabel;get appearance(){return this._appearanceSignal()}set appearance(t){let r=t||this._defaults?.appearance||hb;this._appearanceSignal.set(r)}_appearanceSignal=ne(hb);get subscriptSizing(){return this._subscriptSizing||this._defaults?.subscriptSizing||mb}set subscriptSizing(t){this._subscriptSizing=t||this._defaults?.subscriptSizing||mb}_subscriptSizing=null;get hintLabel(){return this._hintLabel}set hintLabel(t){this._hintLabel=t,this._processHints()}_hintLabel="";_hasIconPrefix=!1;_hasTextPrefix=!1;_hasIconSuffix=!1;_hasTextSuffix=!1;_labelId=this._idGenerator.getId("mat-mdc-form-field-label-");_hintLabelId=this._idGenerator.getId("mat-mdc-hint-");_describedByIds;get _control(){return this._explicitFormFieldControl||this._formFieldControl}set _control(t){this._explicitFormFieldControl=t}_destroyed=new B;_isFocused=null;_explicitFormFieldControl;_previousControl=null;_previousControlValidatorFn=null;_stateChanges;_valueChanges;_describedByChanges;_outlineLabelOffsetResizeObserver=null;_animationsDisabled=zt();constructor(){let t=this._defaults,r=f(Eo);t&&(t.appearance&&(this.appearance=t.appearance),this._hideRequiredMarker=!!t?.hideRequiredMarker,t.color&&(this.color=t.color)),Pt(()=>this._currentDirection=r.valueSignal()),this._syncOutlineLabelOffset()}ngAfterViewInit(){this._updateFocusState(),this._animationsDisabled||this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._elementRef.nativeElement.classList.add("mat-form-field-animations-enabled")},300)}),this._changeDetectorRef.detectChanges()}ngAfterContentInit(){this._assertFormFieldControl(),this._initializeSubscript(),this._initializePrefixAndSuffix()}ngAfterContentChecked(){this._assertFormFieldControl(),this._control!==this._previousControl&&(this._initializeControl(this._previousControl),this._control.ngControl&&this._control.ngControl.control&&(this._previousControlValidatorFn=this._control.ngControl.control.validator),this._previousControl=this._control),this._control.ngControl&&this._control.ngControl.control&&this._control.ngControl.control.validator!==this._previousControlValidatorFn&&this._changeDetectorRef.markForCheck()}ngOnDestroy(){this._outlineLabelOffsetResizeObserver?.disconnect(),this._stateChanges?.unsubscribe(),this._valueChanges?.unsubscribe(),this._describedByChanges?.unsubscribe(),this._destroyed.next(),this._destroyed.complete()}getLabelId=ze(()=>this._hasFloatingLabel()?this._labelId:null);getConnectedOverlayOrigin(){return this._textField||this._elementRef}_animateAndLockLabel(){this._hasFloatingLabel()&&(this.floatLabel="always")}_initializeControl(t){let r=this._control,i="mat-mdc-form-field-type-";t&&this._elementRef.nativeElement.classList.remove(i+t.controlType),r.controlType&&this._elementRef.nativeElement.classList.add(i+r.controlType),this._stateChanges?.unsubscribe(),this._stateChanges=r.stateChanges.subscribe(()=>{this._updateFocusState(),this._changeDetectorRef.markForCheck()}),this._describedByChanges?.unsubscribe(),this._describedByChanges=r.stateChanges.pipe(Ts([void 0,void 0]),_e(()=>[r.errorState,r.userAriaDescribedBy]),Ss(),tt(([[o,s],[a,l]])=>o!==a||s!==l)).subscribe(()=>this._syncDescribedByIds()),this._valueChanges?.unsubscribe(),r.ngControl&&r.ngControl.valueChanges&&(this._valueChanges=r.ngControl.valueChanges.pipe(hn(this._destroyed)).subscribe(()=>this._changeDetectorRef.markForCheck()))}_checkPrefixAndSuffixTypes(){this._hasIconPrefix=!!this._prefixChildren.find(t=>!t._isText),this._hasTextPrefix=!!this._prefixChildren.find(t=>t._isText),this._hasIconSuffix=!!this._suffixChildren.find(t=>!t._isText),this._hasTextSuffix=!!this._suffixChildren.find(t=>t._isText)}_initializePrefixAndSuffix(){this._checkPrefixAndSuffixTypes(),vc(this._prefixChildren.changes,this._suffixChildren.changes).subscribe(()=>{this._checkPrefixAndSuffixTypes(),this._changeDetectorRef.markForCheck()})}_initializeSubscript(){this._hintChildren.changes.subscribe(()=>{this._processHints(),this._changeDetectorRef.markForCheck()}),this._errorChildren.changes.subscribe(()=>{this._syncDescribedByIds(),this._changeDetectorRef.markForCheck()}),this._validateHints(),this._syncDescribedByIds()}_assertFormFieldControl(){this._control}_updateFocusState(){let t=this._control.focused;t&&!this._isFocused?(this._isFocused=!0,this._lineRipple?.activate()):!t&&(this._isFocused||this._isFocused===null)&&(this._isFocused=!1,this._lineRipple?.deactivate()),this._elementRef.nativeElement.classList.toggle("mat-focused",t),this._textField?.nativeElement.classList.toggle("mdc-text-field--focused",t)}_syncOutlineLabelOffset(){nf({earlyRead:()=>{if(this._appearanceSignal()!=="outline")return this._outlineLabelOffsetResizeObserver?.disconnect(),null;if(globalThis.ResizeObserver){this._outlineLabelOffsetResizeObserver||=new globalThis.ResizeObserver(()=>{this._writeOutlinedLabelStyles(this._getOutlinedLabelOffset())});for(let t of this._prefixSuffixContainers())this._outlineLabelOffsetResizeObserver.observe(t,{box:"border-box"})}return this._getOutlinedLabelOffset()},write:t=>this._writeOutlinedLabelStyles(t())})}_shouldAlwaysFloat(){return this.floatLabel==="always"}_hasOutline(){return this.appearance==="outline"}_forceDisplayInfixLabel(){return!this._platform.isBrowser&&this._prefixChildren.length&&!this._shouldLabelFloat()}_hasFloatingLabel=ze(()=>!!this._labelChild());_shouldLabelFloat(){return this._hasFloatingLabel()?this._control.shouldLabelFloat||this._shouldAlwaysFloat():!1}_shouldForward(t){let r=this._control?this._control.ngControl:null;return r&&r[t]}_getSubscriptMessageType(){return this._errorChildren&&this._errorChildren.length>0&&this._control.errorState?"error":"hint"}_handleLabelResized(){this._refreshOutlineNotchWidth()}_refreshOutlineNotchWidth(){!this._hasOutline()||!this._floatingLabel||!this._shouldLabelFloat()?this._notchedOutline?._setNotchWidth(0):this._notchedOutline?._setNotchWidth(this._floatingLabel.getWidth())}_processHints(){this._validateHints(),this._syncDescribedByIds()}_validateHints(){this._hintChildren}_syncDescribedByIds(){if(this._control){let t=[];if(this._control.userAriaDescribedBy&&typeof this._control.userAriaDescribedBy=="string"&&t.push(...this._control.userAriaDescribedBy.split(" ")),this._getSubscriptMessageType()==="hint"){let o=this._hintChildren?this._hintChildren.find(a=>a.align==="start"):null,s=this._hintChildren?this._hintChildren.find(a=>a.align==="end"):null;o?t.push(o.id):this._hintLabel&&t.push(this._hintLabelId),s&&t.push(s.id)}else this._errorChildren&&t.push(...this._errorChildren.map(o=>o.id));let r=this._control.describedByIds,i;if(r){let o=this._describedByIds||t;i=t.concat(r.filter(s=>s&&!o.includes(s)))}else i=t;this._control.setDescribedByIds(i),this._describedByIds=t}}_getOutlinedLabelOffset(){if(!this._hasOutline()||!this._floatingLabel)return null;if(!this._iconPrefixContainer&&!this._textPrefixContainer)return["",null];if(!this._isAttachedToDom())return null;let t=this._iconPrefixContainer?.nativeElement,r=this._textPrefixContainer?.nativeElement,i=this._iconSuffixContainer?.nativeElement,o=this._textSuffixContainer?.nativeElement,s=t?.getBoundingClientRect().width??0,a=r?.getBoundingClientRect().width??0,l=i?.getBoundingClientRect().width??0,c=o?.getBoundingClientRect().width??0,d=this._currentDirection==="rtl"?"-1":"1",u=`${s+a}px`,h=`calc(${d} * (${u} + var(--mat-mdc-form-field-label-offset-x, 0px)))`,p=`var(--mat-mdc-form-field-label-transform, ${US} translateX(${h}))`,_=s+a+l+c;return[p,_]}_writeOutlinedLabelStyles(t){if(t!==null){let[r,i]=t;this._floatingLabel&&(this._floatingLabel.element.style.transform=r),i!==null&&this._notchedOutline?._setMaxWidth(i)}}_isAttachedToDom(){let t=this._elementRef.nativeElement;if(t.getRootNode){let r=t.getRootNode();return r&&r!==t}return document.documentElement.contains(t)}static \u0275fac=function(r){return new(r||e)};static \u0275cmp=W({type:e,selectors:[["mat-form-field"]],contentQueries:function(r,i,o){if(r&1&&(Ga(o,i._labelChild,Po,5),$a(o,qf,5)(o,VS,5)(o,pb,5)(o,LS,5)(o,Wf,5)),r&2){Ya();let s;xe(s=Ie())&&(i._formFieldControl=s.first),xe(s=Ie())&&(i._prefixChildren=s),xe(s=Ie())&&(i._suffixChildren=s),xe(s=Ie())&&(i._errorChildren=s),xe(s=Ie())&&(i._hintChildren=s)}},viewQuery:function(r,i){if(r&1&&(Wa(i._iconPrefixContainerSignal,ob,5)(i._textPrefixContainerSignal,sb,5)(i._iconSuffixContainerSignal,ab,5)(i._textSuffixContainerSignal,lb,5),Bt(vS,5)(ob,5)(sb,5)(ab,5)(lb,5)(cb,5)(fb,5)(ub,5)),r&2){Ya(4);let o;xe(o=Ie())&&(i._textField=o.first),xe(o=Ie())&&(i._iconPrefixContainer=o.first),xe(o=Ie())&&(i._textPrefixContainer=o.first),xe(o=Ie())&&(i._iconSuffixContainer=o.first),xe(o=Ie())&&(i._textSuffixContainer=o.first),xe(o=Ie())&&(i._floatingLabel=o.first),xe(o=Ie())&&(i._notchedOutline=o.first),xe(o=Ie())&&(i._lineRipple=o.first)}},hostAttrs:[1,"mat-mdc-form-field"],hostVars:38,hostBindings:function(r,i){r&2&&U("mat-mdc-form-field-label-always-float",i._shouldAlwaysFloat())("mat-mdc-form-field-has-icon-prefix",i._hasIconPrefix)("mat-mdc-form-field-has-icon-suffix",i._hasIconSuffix)("mat-form-field-invalid",i._control.errorState)("mat-form-field-disabled",i._control.disabled)("mat-form-field-autofilled",i._control.autofilled)("mat-form-field-appearance-fill",i.appearance=="fill")("mat-form-field-appearance-outline",i.appearance=="outline")("mat-form-field-hide-placeholder",i._hasFloatingLabel()&&!i._shouldLabelFloat())("mat-primary",i.color!=="accent"&&i.color!=="warn")("mat-accent",i.color==="accent")("mat-warn",i.color==="warn")("ng-untouched",i._shouldForward("untouched"))("ng-touched",i._shouldForward("touched"))("ng-pristine",i._shouldForward("pristine"))("ng-dirty",i._shouldForward("dirty"))("ng-valid",i._shouldForward("valid"))("ng-invalid",i._shouldForward("invalid"))("ng-pending",i._shouldForward("pending"))},inputs:{hideRequiredMarker:"hideRequiredMarker",color:"color",floatLabel:"floatLabel",appearance:"appearance",subscriptSizing:"subscriptSizing",hintLabel:"hintLabel"},exportAs:["matFormField"],features:[De([{provide:Zf,useExisting:e},{provide:gb,useExisting:e}])],ngContentSelectors:bS,decls:18,vars:21,consts:[["labelTemplate",""],["textField",""],["iconPrefixContainer",""],["textPrefixContainer",""],["textSuffixContainer",""],["iconSuffixContainer",""],[1,"mat-mdc-text-field-wrapper","mdc-text-field",3,"click"],[1,"mat-mdc-form-field-focus-overlay"],[1,"mat-mdc-form-field-flex"],["matFormFieldNotchedOutline","",3,"matFormFieldNotchedOutlineOpen"],[1,"mat-mdc-form-field-icon-prefix"],[1,"mat-mdc-form-field-text-prefix"],[1,"mat-mdc-form-field-infix"],[3,"ngTemplateOutlet"],[1,"mat-mdc-form-field-text-suffix"],[1,"mat-mdc-form-field-icon-suffix"],["matFormFieldLineRipple",""],["aria-atomic","true","aria-live","polite",1,"mat-mdc-form-field-subscript-wrapper","mat-mdc-form-field-bottom-align"],[1,"mat-mdc-form-field-error-wrapper"],[1,"mat-mdc-form-field-hint-wrapper"],["matFormFieldFloatingLabel","",3,"floating","monitorResize","id"],["aria-hidden","true",1,"mat-mdc-form-field-required-marker","mdc-floating-label--required"],[3,"id"],[1,"mat-mdc-form-field-hint-spacer"]],template:function(r,i){if(r&1&&(Ue(yS),ai(0,wS,1,1,"ng-template",null,0,Ku),g(2,"div",6,1),le("click",function(s){return i._control.onContainerClick(s)}),he(4,ES,1,0,"div",7),g(5,"div",8),he(6,IS,2,2,"div",9),he(7,SS,3,0,"div",10),he(8,MS,3,0,"div",11),g(9,"div",12),he(10,AS,1,1,null,13),ee(11),v(),he(12,NS,3,0,"div",14),he(13,RS,3,0,"div",15),v(),he(14,kS,1,0,"div",16),v(),g(15,"div",17),he(16,OS,2,0,"div",18)(17,PS,5,1,"div",19),v()),r&2){let o;y(2),U("mdc-text-field--filled",!i._hasOutline())("mdc-text-field--outlined",i._hasOutline())("mdc-text-field--no-label",!i._hasFloatingLabel())("mdc-text-field--disabled",i._control.disabled)("mdc-text-field--invalid",i._control.errorState),y(2),me(!i._hasOutline()&&!i._control.disabled?4:-1),y(2),me(i._hasOutline()?6:-1),y(),me(i._hasIconPrefix?7:-1),y(),me(i._hasTextPrefix?8:-1),y(2),me(!i._hasOutline()||i._forceDisplayInfixLabel()?10:-1),y(2),me(i._hasTextSuffix?12:-1),y(),me(i._hasIconSuffix?13:-1),y(),me(i._hasOutline()?-1:14),y(),U("mat-mdc-form-field-subscript-dynamic-size",i.subscriptSizing==="dynamic");let s=i._getSubscriptMessageType();y(),me((o=s)==="error"?16:o==="hint"?17:-1)}},dependencies:[cb,fb,of,ub,Wf],styles:[`.mdc-text-field {
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
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-moz-placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-webkit-input-placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive:-ms-input-placeholder {
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
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--mat-form-field-filled-input-text-color, var(--mat-sys-on-surface));
  caret-color: var(--mat-form-field-filled-caret-color, var(--mat-sys-primary));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--mat-form-field-outlined-input-text-color, var(--mat-sys-on-surface));
  caret-color: var(--mat-form-field-outlined-caret-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--mat-form-field-filled-error-caret-color, var(--mat-sys-error));
}
.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--mat-form-field-outlined-error-caret-color, var(--mat-sys-error));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--mat-form-field-filled-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--mat-form-field-outlined-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
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
  border-top-left-radius: var(--mat-form-field-filled-container-shape, var(--mat-sys-corner-extra-small));
  border-top-right-radius: var(--mat-form-field-filled-container-shape, var(--mat-sys-corner-extra-small));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) {
  background-color: var(--mat-form-field-filled-container-color, var(--mat-sys-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled {
  background-color: var(--mat-form-field-filled-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 4%, transparent));
}

.mdc-text-field--outlined {
  height: 56px;
  overflow: visible;
  padding-right: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
  padding-left: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)) + 4px);
}
[dir=rtl] .mdc-text-field--outlined {
  padding-right: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)) + 4px);
  padding-left: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
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
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--mat-form-field-filled-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-filled-focus-label-text-color, var(--mat-sys-primary));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--mat-form-field-filled-hover-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label {
  color: var(--mat-form-field-filled-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--mat-form-field-filled-error-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-filled-error-focus-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--mat-form-field-filled-error-hover-label-text-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--filled .mdc-floating-label {
  font-family: var(--mat-form-field-filled-label-text-font, var(--mat-sys-body-large-font));
  font-size: var(--mat-form-field-filled-label-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-form-field-filled-label-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-form-field-filled-label-text-tracking, var(--mat-sys-body-large-tracking));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--mat-form-field-outlined-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-outlined-focus-label-text-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--mat-form-field-outlined-hover-label-text-color, var(--mat-sys-on-surface));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label {
  color: var(--mat-form-field-outlined-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-focus-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-hover-label-text-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--outlined .mdc-floating-label {
  font-family: var(--mat-form-field-outlined-label-text-font, var(--mat-sys-body-large-font));
  font-size: var(--mat-form-field-outlined-label-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-form-field-outlined-label-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-form-field-outlined-label-text-tracking, var(--mat-sys-body-large-tracking));
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

.mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after {
  margin-left: 1px;
  margin-right: 0;
  content: "*";
}
[dir=rtl] .mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after {
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
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-outline-color, var(--mat-sys-outline));
  border-width: var(--mat-form-field-outlined-outline-width, 1px);
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-hover-outline-color, var(--mat-sys-on-surface));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-focus-outline-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-outline-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-notched-outline .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-hover-outline-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-focus-outline-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mat-mdc-notch-piece {
  border-width: var(--mat-form-field-outlined-focus-outline-width, 2px);
}

.mdc-notched-outline__leading {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading {
  width: max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
}
[dir=rtl] .mdc-notched-outline__leading {
  border-left: none;
  border-right: 1px solid;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  border-top-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}

.mdc-notched-outline__trailing {
  flex-grow: 1;
  border-left: none;
  border-right: 1px solid;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}
[dir=rtl] .mdc-notched-outline__trailing {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}

.mdc-notched-outline__notch {
  flex: 0 0 auto;
  width: auto;
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch {
  max-width: min(var(--mat-form-field-notch-max-width, 100%), calc(100% - max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))) * 2));
}
.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  max-width: min(100%, calc(100% - max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))) * 2));
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
  border-bottom-width: var(--mat-form-field-filled-active-indicator-height, 1px);
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-active-indicator-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-hover-active-indicator-color, var(--mat-sys-on-surface));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-disabled-active-indicator-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-error-active-indicator-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-error-hover-active-indicator-color, var(--mat-sys-on-error-container));
}
.mdc-line-ripple::after {
  transform: scaleX(0);
  opacity: 0;
  z-index: 2;
}
.mdc-text-field--filled .mdc-line-ripple::after {
  border-bottom-width: var(--mat-form-field-filled-focus-active-indicator-height, 2px);
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--mat-form-field-filled-focus-active-indicator-color, var(--mat-sys-primary));
}
.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--mat-form-field-filled-error-focus-active-indicator-color, var(--mat-sys-error));
}

.mdc-line-ripple--active::after {
  transform: scaleX(1);
  opacity: 1;
}

.mdc-line-ripple--deactivating::after {
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

.mdc-text-field--no-label:not(.mdc-text-field--textarea) .mat-mdc-form-field-input-control.mdc-text-field__input,
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
  --mat-mdc-form-field-label-offset-x: -16px;
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
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
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
  min-height: var(--mat-form-field-container-height, 56px);
  padding-top: var(--mat-form-field-filled-with-label-container-padding-top, 24px);
  padding-bottom: var(--mat-form-field-filled-with-label-container-padding-bottom, 8px);
}
.mdc-text-field--outlined .mat-mdc-form-field-infix, .mdc-text-field--no-label .mat-mdc-form-field-infix {
  padding-top: var(--mat-form-field-container-vertical-padding, 16px);
  padding-bottom: var(--mat-form-field-container-vertical-padding, 16px);
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-mdc-floating-label {
  top: calc(var(--mat-form-field-container-height, 56px) / 2);
}

.mdc-text-field--filled .mat-mdc-floating-label {
  display: var(--mat-form-field-filled-label-display, block);
}

.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  --mat-mdc-form-field-label-transform: translateY(calc(calc(6.75px + var(--mat-form-field-container-height, 56px) / 2) * -1))
    scale(var(--mat-mdc-form-field-floating-label-scale, 0.75));
  transform: var(--mat-mdc-form-field-label-transform);
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
  color: var(--mat-form-field-error-text-color, var(--mat-sys-error));
}

.mat-mdc-form-field-subscript-wrapper,
.mat-mdc-form-field-bottom-align::before {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--mat-form-field-subscript-text-font, var(--mat-sys-body-small-font));
  line-height: var(--mat-form-field-subscript-text-line-height, var(--mat-sys-body-small-line-height));
  font-size: var(--mat-form-field-subscript-text-size, var(--mat-sys-body-small-size));
  letter-spacing: var(--mat-form-field-subscript-text-tracking, var(--mat-sys-body-small-tracking));
  font-weight: var(--mat-form-field-subscript-text-weight, var(--mat-sys-body-small-weight));
}

.mat-mdc-form-field-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  opacity: 0;
  pointer-events: none;
  background-color: var(--mat-form-field-state-layer-color, var(--mat-sys-on-surface));
}
.mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-focus-overlay {
  opacity: var(--mat-form-field-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-form-field.mat-focused .mat-mdc-form-field-focus-overlay {
  opacity: var(--mat-form-field-focus-state-layer-opacity, 0);
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
  color: var(--mat-form-field-select-option-text-color, var(--mat-sys-neutral10));
}
select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option:disabled {
  color: var(--mat-form-field-select-disabled-option-text-color, color-mix(in srgb, var(--mat-sys-neutral10) 38%, transparent));
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
  color: var(--mat-form-field-enabled-select-arrow-color, var(--mat-sys-on-surface-variant));
}
[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {
  right: auto;
  left: 0;
}
.mat-mdc-form-field-type-mat-native-select.mat-focused .mat-mdc-form-field-infix::after {
  color: var(--mat-form-field-focus-select-arrow-color, var(--mat-sys-primary));
}
.mat-mdc-form-field-type-mat-native-select.mat-form-field-disabled .mat-mdc-form-field-infix::after {
  color: var(--mat-form-field-disabled-select-arrow-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
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
  --mat-mdc-form-field-floating-label-scale: 0.75;
  display: inline-flex;
  flex-direction: column;
  min-width: 0;
  text-align: left;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--mat-form-field-container-text-font, var(--mat-sys-body-large-font));
  line-height: var(--mat-form-field-container-text-line-height, var(--mat-sys-body-large-line-height));
  font-size: var(--mat-form-field-container-text-size, var(--mat-sys-body-large-size));
  letter-spacing: var(--mat-form-field-container-text-tracking, var(--mat-sys-body-large-tracking));
  font-weight: var(--mat-form-field-container-text-weight, var(--mat-sys-body-large-weight));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-floating-label--float-above {
  font-size: calc(var(--mat-form-field-outlined-label-text-populated-size) * var(--mat-mdc-form-field-floating-label-scale));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: var(--mat-form-field-outlined-label-text-populated-size);
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
  color: var(--mat-form-field-leading-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-prefix {
  color: var(--mat-form-field-disabled-leading-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-trailing-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-disabled-trailing-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-invalid .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-trailing-icon-color, var(--mat-sys-error));
}
.mat-form-field-invalid:not(.mat-focused):not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-hover-trailing-icon-color, var(--mat-sys-on-error-container));
}
.mat-form-field-invalid.mat-focused .mat-mdc-text-field-wrapper .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-focus-trailing-icon-color, var(--mat-sys-error));
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
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field--filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before {
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
`],encapsulation:2})}return e})();var Lo=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=X({type:e});static \u0275inj=Y({imports:[Ky,Nl,Ye]})}return e})();var $S=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275cmp=W({type:e,selectors:[["ng-component"]],hostAttrs:["cdk-text-field-style-loader",""],decls:0,vars:0,template:function(r,i){},styles:[`textarea.cdk-textarea-autosize {
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
`],encapsulation:2})}return e})(),GS={passive:!0},vb=(()=>{class e{_platform=f(be);_ngZone=f(A);_renderer=f(Ne).createRenderer(null,null);_styleLoader=f(yt);_monitoredElements=new Map;monitor(t){if(!this._platform.isBrowser)return Yn;this._styleLoader.load($S);let r=it(t),i=this._monitoredElements.get(r);if(i)return i.subject;let o=new B,s="cdk-text-field-autofilled",a=c=>{c.animationName==="cdk-text-field-autofill-start"&&!r.classList.contains(s)?(r.classList.add(s),this._ngZone.run(()=>o.next({target:c.target,isAutofilled:!0}))):c.animationName==="cdk-text-field-autofill-end"&&r.classList.contains(s)&&(r.classList.remove(s),this._ngZone.run(()=>o.next({target:c.target,isAutofilled:!1})))},l=this._ngZone.runOutsideAngular(()=>(r.classList.add("cdk-text-field-autofill-monitored"),this._renderer.listen(r,"animationstart",a,GS)));return this._monitoredElements.set(r,{subject:o,unlisten:l}),o}stopMonitoring(t){let r=it(t),i=this._monitoredElements.get(r);i&&(i.unlisten(),i.subject.complete(),r.classList.remove("cdk-text-field-autofill-monitored"),r.classList.remove("cdk-text-field-autofilled"),this._monitoredElements.delete(r))}ngOnDestroy(){this._monitoredElements.forEach((t,r)=>this.stopMonitoring(r))}static \u0275fac=function(r){return new(r||e)};static \u0275prov=R({token:e,factory:e.\u0275fac})}return e})();var yb=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=X({type:e});static \u0275inj=Y({})}return e})();var bb=new b("");var _b=new b("MAT_INPUT_VALUE_ACCESSOR");var Db=(()=>{class e{isErrorState(t,r){return!!(t&&t.invalid&&(t.touched||r&&r.submitted))}isSignalErrorState(t){if(!t)return!1;let r=t().invalid(),i=t().touched();return r&&i}static \u0275fac=function(r){return new(r||e)};static \u0275prov=R({token:e,factory:e.\u0275fac})}return e})();var Rl=class{_defaultMatcher;_parentFormGroup;_parentForm;_stateChanges;errorState=!1;matcher;ngControl;formField;constructor(n,t,r,i,o){this._defaultMatcher=n,this._parentFormGroup=r,this._parentForm=i,this._stateChanges=o,t?xn(t.field)&&!t.updateValueAndValidity?(this.formField=t,this.ngControl=null):(this.formField=null,this.ngControl=t):this.ngControl=this.formField=null}updateErrorState(){let n=this.errorState,t=this._getCurrentErrorState(this.matcher||this._defaultMatcher);t!==n&&(this.errorState=t,this._stateChanges.next())}_getCurrentErrorState(n){if(this.formField&&n?.isSignalErrorState)return n.isSignalErrorState(this.formField.field())??!1;let t=this._parentFormGroup||this._parentForm,r=this.ngControl?this.ngControl.control:null;return n?.isErrorState(r,t)??!1}};var WS=["button","checkbox","file","hidden","image","radio","range","reset","submit"],YS=new b("MAT_INPUT_CONFIG"),wb=(()=>{class e{_elementRef=f(G);_platform=f(be);ngControl=f(Fn,{optional:!0,self:!0});_autofillMonitor=f(vb);_ngZone=f(A);_formField=f(Zf,{optional:!0});_renderer=f(Be);_uid=f(bt).getId("mat-input-");_previousNativeValue;_inputValueAccessor;_signalBasedValueAccessor;_previousPlaceholder=null;_errorStateTracker;_config=f(YS,{optional:!0});_cleanupIosKeyup;_cleanupWebkitWheel;_isServer=!1;_isNativeSelect=!1;_isTextarea=!1;_isInFormField=!1;focused=!1;stateChanges=new B;controlType="mat-input";autofilled=!1;get disabled(){return this._disabled}set disabled(t){this._disabled=ln(t),this.focused&&(this.focused=!1,this.stateChanges.next())}_disabled=!1;get id(){return this._id}set id(t){this._id=t||this._uid}_id;placeholder;name;get required(){return this._required??this.ngControl?.control?.hasValidator(To.required)??!1}set required(t){this._required=ln(t)}_required;get type(){return this._type}set type(t){this._type=t||"text",this._validateType(),!this._isTextarea&&$f().has(this._type)&&(this._elementRef.nativeElement.type=this._type)}_type="text";get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(t){this._errorStateTracker.matcher=t}userAriaDescribedBy;get value(){return this._signalBasedValueAccessor?this._signalBasedValueAccessor.value():this._inputValueAccessor.value}set value(t){t!==this.value&&(this._signalBasedValueAccessor?this._signalBasedValueAccessor.value.set(t):this._inputValueAccessor.value=t,this.stateChanges.next())}get readonly(){return this._readonly}set readonly(t){this._readonly=ln(t)}_readonly=!1;disabledInteractive;get errorState(){return this._errorStateTracker.errorState}set errorState(t){this._errorStateTracker.errorState=t}_neverEmptyInputTypes=["date","datetime","datetime-local","month","time","week"].filter(t=>$f().has(t));constructor(){let t=f(Pf,{optional:!0}),r=f(Er,{optional:!0}),i=f(Db),o=f(_b,{optional:!0,self:!0}),s=f(bb,{optional:!0,self:!0}),a=this._elementRef.nativeElement,l=a.nodeName.toLowerCase();o?xn(o.value)?this._signalBasedValueAccessor=o:this._inputValueAccessor=o:this._inputValueAccessor=a,this._previousNativeValue=this.value,this.id=this.id,this._platform.IOS&&this._ngZone.runOutsideAngular(()=>{this._cleanupIosKeyup=this._renderer.listen(a,"keyup",this._iOSKeyupListener)}),this._errorStateTracker=new Rl(i,s||this.ngControl,r,t,this.stateChanges),this._isServer=!this._platform.isBrowser,this._isNativeSelect=l==="select",this._isTextarea=l==="textarea",this._isInFormField=!!this._formField,this.disabledInteractive=this._config?.disabledInteractive||!1,this._isNativeSelect&&(this.controlType=a.multiple?"mat-native-select-multiple":"mat-native-select"),this._signalBasedValueAccessor&&Pt(()=>{this._signalBasedValueAccessor.value(),this.stateChanges.next()})}ngAfterViewInit(){this._platform.isBrowser&&this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe(t=>{this.autofilled=t.isAutofilled,this.stateChanges.next()})}ngOnChanges(){this.stateChanges.next()}ngOnDestroy(){this.stateChanges.complete(),this._platform.isBrowser&&this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement),this._cleanupIosKeyup?.(),this._cleanupWebkitWheel?.()}ngDoCheck(){this.ngControl&&(this.updateErrorState(),this.ngControl.disabled!==null&&this.ngControl.disabled!==this.disabled&&(this.disabled=this.ngControl.disabled,this.stateChanges.next())),this._dirtyCheckNativeValue(),this._dirtyCheckPlaceholder()}focus(t){this._elementRef.nativeElement.focus(t)}updateErrorState(){this._errorStateTracker.updateErrorState()}_focusChanged(t){if(t!==this.focused){if(!this._isNativeSelect&&t&&this.disabled&&this.disabledInteractive){let r=this._elementRef.nativeElement;r.type==="number"?(r.type="text",r.setSelectionRange(0,0),r.type="number"):r.setSelectionRange(0,0)}this.focused=t,this.stateChanges.next()}}_onInput(){}_dirtyCheckNativeValue(){let t=this._elementRef.nativeElement.value;this._previousNativeValue!==t&&(this._previousNativeValue=t,this.stateChanges.next())}_dirtyCheckPlaceholder(){let t=this._getPlaceholder();if(t!==this._previousPlaceholder){let r=this._elementRef.nativeElement;this._previousPlaceholder=t,t?r.setAttribute("placeholder",t):r.removeAttribute("placeholder")}}_getPlaceholder(){return this.placeholder||null}_validateType(){WS.indexOf(this._type)>-1}_isNeverEmpty(){return this._neverEmptyInputTypes.indexOf(this._type)>-1}_isBadInput(){let t=this._elementRef.nativeElement.validity;return t&&t.badInput}get empty(){return!this._isNeverEmpty()&&!this._elementRef.nativeElement.value&&!this._isBadInput()&&!this.autofilled}get shouldLabelFloat(){if(this._isNativeSelect){let t=this._elementRef.nativeElement,r=t.options[0];return this.focused||t.multiple||!this.empty||!!(t.selectedIndex>-1&&r&&r.label)}else return this.focused&&!this.disabled||!this.empty}get describedByIds(){return this._elementRef.nativeElement.getAttribute("aria-describedby")?.split(" ")||[]}setDescribedByIds(t){let r=this._elementRef.nativeElement;t.length?r.setAttribute("aria-describedby",t.join(" ")):r.removeAttribute("aria-describedby")}onContainerClick(){this.focused||this.focus()}_isInlineSelect(){let t=this._elementRef.nativeElement;return this._isNativeSelect&&(t.multiple||t.size>1)}_iOSKeyupListener=t=>{let r=t.target;!r.value&&r.selectionStart===0&&r.selectionEnd===0&&(r.setSelectionRange(1,1),r.setSelectionRange(0,0))};_getReadonlyAttribute(){return this._isNativeSelect?null:this.readonly||this.disabled&&this.disabledInteractive?"true":null}static \u0275fac=function(r){return new(r||e)};static \u0275dir=$({type:e,selectors:[["input","matInput",""],["textarea","matInput",""],["select","matNativeControl",""],["input","matNativeControl",""],["textarea","matNativeControl",""]],hostAttrs:[1,"mat-mdc-input-element"],hostVars:21,hostBindings:function(r,i){r&1&&le("focus",function(){return i._focusChanged(!0)})("blur",function(){return i._focusChanged(!1)})("input",function(){return i._onInput()}),r&2&&(An("id",i.id)("disabled",i.disabled&&!i.disabledInteractive)("required",i.required),Re("name",i.name||null)("readonly",i._getReadonlyAttribute())("aria-disabled",i.disabled&&i.disabledInteractive?"true":null)("aria-invalid",i.empty&&i.required?null:i.errorState)("aria-required",i.required)("id",i.id),U("mat-input-server",i._isServer)("mat-mdc-form-field-textarea-control",i._isInFormField&&i._isTextarea)("mat-mdc-form-field-input-control",i._isInFormField)("mat-mdc-input-disabled-interactive",i.disabledInteractive)("mdc-text-field__input",i._isInFormField)("mat-mdc-native-select-inline",i._isInlineSelect()))},inputs:{disabled:"disabled",id:"id",placeholder:"placeholder",name:"name",required:"required",type:"type",errorStateMatcher:"errorStateMatcher",userAriaDescribedBy:[0,"aria-describedby","userAriaDescribedBy"],value:"value",readonly:"readonly",disabledInteractive:[2,"disabledInteractive","disabledInteractive",we]},exportAs:["matInput"],features:[De([{provide:qf,useExisting:e}]),rt]})}return e})(),Eb=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=X({type:e});static \u0275inj=Y({imports:[Lo,Lo,yb,Ye]})}return e})();var ZS=20,Xf=(()=>{class e{_ngZone=f(A);_platform=f(be);_renderer=f(Ne).createRenderer(null,null);_cleanupGlobalListener;_scrolled=new B;_scrolledCount=0;scrollContainers=new Map;register(t){this.scrollContainers.has(t)||this.scrollContainers.set(t,t.elementScrolled().subscribe(()=>this._scrolled.next(t)))}deregister(t){let r=this.scrollContainers.get(t);r&&(r.unsubscribe(),this.scrollContainers.delete(t))}scrolled(t=ZS){return this._platform.isBrowser?new q(r=>{this._cleanupGlobalListener||(this._cleanupGlobalListener=this._ngZone.runOutsideAngular(()=>this._renderer.listen("document","scroll",()=>this._scrolled.next())));let i=t>0?this._scrolled.pipe(Cs(t)).subscribe(r):this._scrolled.subscribe(r);return this._scrolledCount++,()=>{i.unsubscribe(),this._scrolledCount--,this._scrolledCount||(this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0)}}):et()}ngOnDestroy(){this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0,this.scrollContainers.forEach((t,r)=>this.deregister(r)),this._scrolled.complete()}ancestorScrolled(t,r){let i=this.getAncestorScrollContainers(t);return this.scrolled(r).pipe(tt(o=>!o||i.indexOf(o)>-1))}getAncestorScrollContainers(t){let r=[];return this.scrollContainers.forEach((i,o)=>{this._targetContainsElement(o,t)&&r.push(o)}),r}_targetContainsElement(t,r){let i=it(r),o=t.getElementRef().nativeElement;do if(i==o)return!0;while(i=i.parentElement);return!1}static \u0275fac=function(r){return new(r||e)};static \u0275prov=R({token:e,factory:e.\u0275fac})}return e})();var XS=20,Vo=(()=>{class e{_platform=f(be);_listeners;_viewportSize=null;_change=new B;_document=f(j);constructor(){let t=f(A),r=f(Ne).createRenderer(null,null);t.runOutsideAngular(()=>{if(this._platform.isBrowser){let i=o=>this._change.next(o);this._listeners=[r.listen("window","resize",i),r.listen("window","orientationchange",i)]}this.change().subscribe(()=>this._viewportSize=null)})}ngOnDestroy(){this._listeners?.forEach(t=>t()),this._change.complete()}getViewportSize(){this._viewportSize||this._updateViewportSize();let t={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),t}getViewportRect(){let t=this.getViewportScrollPosition(),{width:r,height:i}=this.getViewportSize();return{top:t.top,left:t.left,bottom:t.top+i,right:t.left+r,height:i,width:r}}getViewportScrollPosition(){if(!this._platform.isBrowser)return{top:0,left:0};let t=this._document,r=this._getWindow(),i=t.documentElement,o=i.getBoundingClientRect(),s=-o.top||t.body?.scrollTop||r.scrollY||i.scrollTop||0,a=-o.left||t.body?.scrollLeft||r.scrollX||i.scrollLeft||0;return{top:s,left:a}}change(t=XS){return t>0?this._change.pipe(Cs(t)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){let t=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:t.innerWidth,height:t.innerHeight}:{width:0,height:0}}static \u0275fac=function(r){return new(r||e)};static \u0275prov=R({token:e,factory:e.\u0275fac})}return e})();var jo=class{_attachedHost=null;attach(n){return this._attachedHost=n,n.attach(this)}detach(){let n=this._attachedHost;n!=null&&(this._attachedHost=null,n.detach())}get isAttached(){return this._attachedHost!=null}setAttachedHost(n){this._attachedHost=n}},Bo=class extends jo{component;viewContainerRef;injector;projectableNodes;bindings;directives;constructor(n,t,r,i,o,s){super(),this.component=n,this.viewContainerRef=t,this.injector=r,this.projectableNodes=i,this.bindings=o||null,this.directives=s||null}},kl=class extends jo{templateRef;viewContainerRef;context;injector;constructor(n,t,r,i){super(),this.templateRef=n,this.viewContainerRef=t,this.context=r,this.injector=i}get origin(){return this.templateRef.elementRef}attach(n,t=this.context){return this.context=t,super.attach(n)}detach(){return this.context=void 0,super.detach()}},Qf=class extends jo{element;constructor(n){super(),this.element=n instanceof G?n.nativeElement:n}},Kf=class{_attachedPortal=null;_disposeFn=null;_isDisposed=!1;hasAttached(){return!!this._attachedPortal}attach(n){if(n instanceof Bo)return this._attachedPortal=n,this.attachComponentPortal(n);if(n instanceof kl)return this._attachedPortal=n,this.attachTemplatePortal(n);if(this.attachDomPortal&&n instanceof Qf)return this._attachedPortal=n,this.attachDomPortal(n)}attachDomPortal=null;detach(){this._attachedPortal&&(this._attachedPortal.setAttachedHost(null),this._attachedPortal=null),this._invokeDisposeFn()}dispose(){this.hasAttached()&&this.detach(),this._invokeDisposeFn(),this._isDisposed=!0}setDisposeFn(n){this._disposeFn=n}_invokeDisposeFn(){this._disposeFn&&(this._disposeFn(),this._disposeFn=null)}},Ol=class extends Kf{outletElement;_appRef;_defaultInjector;constructor(n,t,r){super(),this.outletElement=n,this._appRef=t,this._defaultInjector=r}attachComponentPortal(n){let t;if(n.viewContainerRef){let r=n.injector||n.viewContainerRef.injector,i=r.get(mr,null,{optional:!0})||void 0;t=n.viewContainerRef.createComponent(n.component,{index:n.viewContainerRef.length,injector:r,ngModuleRef:i,projectableNodes:n.projectableNodes||void 0,bindings:n.bindings||void 0,directives:n.directives||void 0}),this.setDisposeFn(()=>t.destroy())}else{let r=this._appRef,i=n.injector||this._defaultInjector||J.NULL,o=i.get(Ee,r.injector);t=Ka(n.component,{elementInjector:i,environmentInjector:o,projectableNodes:n.projectableNodes||void 0,bindings:n.bindings||void 0,directives:n.directives||void 0}),r.attachView(t.hostView),this.setDisposeFn(()=>{r.viewCount>0&&r.detachView(t.hostView),t.destroy()})}return this.outletElement.appendChild(this._getComponentRootNode(t)),this._attachedPortal=n,t}attachTemplatePortal(n){let t=n.viewContainerRef,r=t.createEmbeddedView(n.templateRef,n.context,{injector:n.injector});return r.rootNodes.forEach(i=>this.outletElement.appendChild(i)),r.detectChanges(),this.setDisposeFn(()=>{let i=t.indexOf(r);i!==-1&&t.remove(i)}),this._attachedPortal=n,r}attachDomPortal=n=>{let t=n.element;t.parentNode;let r=this.outletElement.ownerDocument.createComment("dom-portal");t.parentNode.insertBefore(r,t),this.outletElement.appendChild(t),this._attachedPortal=n,super.setDisposeFn(()=>{r.parentNode&&r.parentNode.replaceChild(t,r)})};dispose(){super.dispose(),this.outletElement.remove()}_getComponentRootNode(n){return n.hostView.rootNodes[0]}};var Cb=tb();function Nb(e){return new Fl(e.get(Vo),e.get(j))}var Fl=class{_viewportRuler;_previousHTMLStyles={top:"",left:""};_previousScrollPosition;_isEnabled=!1;_document;constructor(n,t){this._viewportRuler=n,this._document=t}attach(){}enable(){if(this._canBeEnabled()){let n=this._document.documentElement;this._previousScrollPosition=this._viewportRuler.getViewportScrollPosition(),this._previousHTMLStyles.left=n.style.left||"",this._previousHTMLStyles.top=n.style.top||"",n.style.left=Te(-this._previousScrollPosition.left),n.style.top=Te(-this._previousScrollPosition.top),n.classList.add("cdk-global-scrollblock"),this._isEnabled=!0}}disable(){if(this._isEnabled){let n=this._document.documentElement,t=this._document.body,r=n.style,i=t.style,o=r.scrollBehavior||"",s=i.scrollBehavior||"";this._isEnabled=!1,r.left=this._previousHTMLStyles.left,r.top=this._previousHTMLStyles.top,n.classList.remove("cdk-global-scrollblock"),Cb&&(r.scrollBehavior=i.scrollBehavior="auto"),window.scroll(this._previousScrollPosition.left,this._previousScrollPosition.top),Cb&&(r.scrollBehavior=o,i.scrollBehavior=s)}}_canBeEnabled(){if(this._document.documentElement.classList.contains("cdk-global-scrollblock")||this._isEnabled)return!1;let t=this._document.documentElement,r=this._viewportRuler.getViewportSize();return t.scrollHeight>r.height||t.scrollWidth>r.width}};function Rb(e,n){return new Pl(e.get(Xf),e.get(A),e.get(Vo),n)}var Pl=class{_scrollDispatcher;_ngZone;_viewportRuler;_config;_scrollSubscription=null;_overlayRef;_initialScrollPosition;constructor(n,t,r,i){this._scrollDispatcher=n,this._ngZone=t,this._viewportRuler=r,this._config=i}attach(n){this._overlayRef,this._overlayRef=n}enable(){if(this._scrollSubscription)return;let n=this._scrollDispatcher.scrolled(0).pipe(tt(t=>!t||!this._overlayRef.overlayElement.contains(t.getElementRef().nativeElement)));this._config&&this._config.threshold&&this._config.threshold>1?(this._initialScrollPosition=this._viewportRuler.getViewportScrollPosition().top,this._scrollSubscription=n.subscribe(()=>{let t=this._viewportRuler.getViewportScrollPosition().top;Math.abs(t-this._initialScrollPosition)>this._config.threshold?this._detach():this._overlayRef.updatePosition()})):this._scrollSubscription=n.subscribe(this._detach)}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}_detach=()=>{this.disable(),this._overlayRef.hasAttached()&&this._ngZone.run(()=>this._overlayRef.detach())}};var Ho=class{enable(){}disable(){}attach(){}};function Jf(e,n){return n.some(t=>{let r=e.bottom<t.top,i=e.top>t.bottom,o=e.right<t.left,s=e.left>t.right;return r||i||o||s})}function xb(e,n){return n.some(t=>{let r=e.top<t.top,i=e.bottom>t.bottom,o=e.left<t.left,s=e.right>t.right;return r||i||o||s})}function kb(e,n){return new Ll(e.get(Xf),e.get(Vo),e.get(A),n)}var Ll=class{_scrollDispatcher;_viewportRuler;_ngZone;_config;_scrollSubscription=null;_overlayRef;constructor(n,t,r,i){this._scrollDispatcher=n,this._viewportRuler=t,this._ngZone=r,this._config=i}attach(n){this._overlayRef,this._overlayRef=n}enable(){if(!this._scrollSubscription){let n=this._config?this._config.scrollThrottle:0;this._scrollSubscription=this._scrollDispatcher.scrolled(n).subscribe(()=>{if(this._overlayRef.updatePosition(),this._config&&this._config.autoClose){let t=this._overlayRef.overlayElement.getBoundingClientRect(),{width:r,height:i}=this._viewportRuler.getViewportSize();Jf(t,[{width:r,height:i,bottom:i,right:r,top:0,left:0}])&&(this.disable(),this._ngZone.run(()=>this._overlayRef.detach()))}})}}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}},Ob=(()=>{class e{_injector=f(J);noop=()=>new Ho;close=t=>Rb(this._injector,t);block=()=>Nb(this._injector);reposition=t=>kb(this._injector,t);static \u0275fac=function(r){return new(r||e)};static \u0275prov=R({token:e,factory:e.\u0275fac})}return e})(),Vl=class{positionStrategy;scrollStrategy=new Ho;panelClass="";hasBackdrop=!1;backdropClass="cdk-overlay-dark-backdrop";disableAnimations;width;height;minWidth;minHeight;maxWidth;maxHeight;direction;disposeOnNavigation=!1;usePopover;eventPredicate;constructor(n){if(n){let t=Object.keys(n);for(let r of t)n[r]!==void 0&&(this[r]=n[r])}}};var jl=class{connectionPair;scrollableViewProperties;constructor(n,t){this.connectionPair=n,this.scrollableViewProperties=t}};var Fb=(()=>{class e{_attachedOverlays=[];_document=f(j);_isAttached=!1;ngOnDestroy(){this.detach()}add(t){this.remove(t),this._attachedOverlays.push(t)}remove(t){let r=this._attachedOverlays.indexOf(t);r>-1&&this._attachedOverlays.splice(r,1),this._attachedOverlays.length===0&&this.detach()}canReceiveEvent(t,r,i){return i.observers.length<1?!1:t.eventPredicate?t.eventPredicate(r):!0}static \u0275fac=function(r){return new(r||e)};static \u0275prov=R({token:e,factory:e.\u0275fac})}return e})(),Pb=(()=>{class e extends Fb{_ngZone=f(A);_renderer=f(Ne).createRenderer(null,null);_cleanupKeydown;add(t){super.add(t),this._isAttached||(this._ngZone.runOutsideAngular(()=>{this._cleanupKeydown=this._renderer.listen("body","keydown",this._keydownListener)}),this._isAttached=!0)}detach(){this._isAttached&&(this._cleanupKeydown?.(),this._isAttached=!1)}_keydownListener=t=>{let r=this._attachedOverlays;for(let i=r.length-1;i>-1;i--){let o=r[i];if(this.canReceiveEvent(o,t,o._keydownEvents)){this._ngZone.run(()=>o._keydownEvents.next(t));break}}};static \u0275fac=function(r){return new(r||e)};static \u0275prov=R({token:e,factory:e.\u0275fac})}return e})(),Lb=(()=>{class e extends Fb{_platform=f(be);_ngZone=f(A);_renderer=f(Ne).createRenderer(null,null);_cursorOriginalValue;_cursorStyleIsSet=!1;_pointerDownEventTarget=null;_cleanups;add(t){if(super.add(t),!this._isAttached){let r=this._document.body,i={capture:!0},o=this._renderer;this._cleanups=this._ngZone.runOutsideAngular(()=>[o.listen(r,"pointerdown",this._pointerDownListener,i),o.listen(r,"click",this._clickListener,i),o.listen(r,"auxclick",this._clickListener,i),o.listen(r,"contextmenu",this._clickListener,i)]),this._platform.IOS&&!this._cursorStyleIsSet&&(this._cursorOriginalValue=r.style.cursor,r.style.cursor="pointer",this._cursorStyleIsSet=!0),this._isAttached=!0}}detach(){this._isAttached&&(this._cleanups?.forEach(t=>t()),this._cleanups=void 0,this._platform.IOS&&this._cursorStyleIsSet&&(this._document.body.style.cursor=this._cursorOriginalValue,this._cursorStyleIsSet=!1),this._isAttached=!1)}_pointerDownListener=t=>{this._pointerDownEventTarget=Je(t)};_clickListener=t=>{let r=Je(t),i=t.type==="click"&&this._pointerDownEventTarget?this._pointerDownEventTarget:r;this._pointerDownEventTarget=null;let o=this._attachedOverlays.slice();for(let s=o.length-1;s>-1;s--){let a=o[s],l=a._outsidePointerEvents;if(!(!a.hasAttached()||!this.canReceiveEvent(a,t,l))){if(Ib(a.overlayElement,r)||Ib(a.overlayElement,i))break;this._ngZone?this._ngZone.run(()=>l.next(t)):l.next(t)}}};static \u0275fac=function(r){return new(r||e)};static \u0275prov=R({token:e,factory:e.\u0275fac})}return e})();function Ib(e,n){let t=typeof ShadowRoot<"u"&&ShadowRoot,r=n;for(;r;){if(r===e)return!0;r=t&&r instanceof ShadowRoot?r.host:r.parentNode}return!1}var Vb=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275cmp=W({type:e,selectors:[["ng-component"]],hostAttrs:["cdk-overlay-style-loader",""],decls:0,vars:0,template:function(r,i){},styles:[`.cdk-overlay-container, .cdk-global-overlay-wrapper {
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
`],encapsulation:2})}return e})(),jb=(()=>{class e{_platform=f(be);_containerElement;_document=f(j);_styleLoader=f(yt);ngOnDestroy(){this._containerElement?.remove()}getContainerElement(){return this._loadStyles(),this._containerElement||this._createContainer(),this._containerElement}_createContainer(){let t="cdk-overlay-container";if(this._platform.isBrowser||zf()){let i=this._document.querySelectorAll(`.${t}[platform="server"], .${t}[platform="test"]`);for(let o=0;o<i.length;o++)i[o].remove()}let r=this._document.createElement("div");r.classList.add(t),zf()?r.setAttribute("platform","test"):this._platform.isBrowser||r.setAttribute("platform","server"),this._document.body.appendChild(r),this._containerElement=r}_loadStyles(){this._styleLoader.load(Vb)}static \u0275fac=function(r){return new(r||e)};static \u0275prov=R({token:e,factory:e.\u0275fac})}return e})(),eh=class{_renderer;_ngZone;element;_cleanupClick;_cleanupTransitionEnd;_fallbackTimeout;constructor(n,t,r,i){this._renderer=t,this._ngZone=r,this.element=n.createElement("div"),this.element.classList.add("cdk-overlay-backdrop"),this._cleanupClick=t.listen(this.element,"click",i)}detach(){this._ngZone.runOutsideAngular(()=>{let n=this.element;clearTimeout(this._fallbackTimeout),this._cleanupTransitionEnd?.(),this._cleanupTransitionEnd=this._renderer.listen(n,"transitionend",this.dispose),this._fallbackTimeout=setTimeout(this.dispose,500),n.style.pointerEvents="none",n.classList.remove("cdk-overlay-backdrop-showing")})}dispose=()=>{clearTimeout(this._fallbackTimeout),this._cleanupClick?.(),this._cleanupTransitionEnd?.(),this._cleanupClick=this._cleanupTransitionEnd=this._fallbackTimeout=void 0,this.element.remove()}};function th(e){return e&&e.nodeType===1}var Bl=class{_portalOutlet;_host;_pane;_config;_ngZone;_keyboardDispatcher;_document;_location;_outsideClickDispatcher;_animationsDisabled;_injector;_renderer;_backdropClick=new B;_attachments=new B;_detachments=new B;_positionStrategy;_scrollStrategy;_locationChanges=oe.EMPTY;_backdropRef=null;_detachContentMutationObserver;_detachContentAfterRenderRef;_disposed=!1;_previousHostParent;_keydownEvents=new B;_outsidePointerEvents=new B;_afterNextRenderRef;constructor(n,t,r,i,o,s,a,l,c,d=!1,u,m){this._portalOutlet=n,this._host=t,this._pane=r,this._config=i,this._ngZone=o,this._keyboardDispatcher=s,this._document=a,this._location=l,this._outsideClickDispatcher=c,this._animationsDisabled=d,this._injector=u,this._renderer=m,i.scrollStrategy&&(this._scrollStrategy=i.scrollStrategy,this._scrollStrategy.attach(this)),this._positionStrategy=i.positionStrategy}get overlayElement(){return this._pane}get backdropElement(){return this._backdropRef?.element||null}get hostElement(){return this._host}get eventPredicate(){return this._config?.eventPredicate||null}attach(n){if(this._disposed)return null;this._attachHost();let t=this._portalOutlet.attach(n);return this._positionStrategy?.attach(this),this._updateStackingOrder(),this._updateElementSize(),this._updateElementDirection(),this._scrollStrategy&&this._scrollStrategy.enable(),this._afterNextRenderRef?.destroy(),this._afterNextRenderRef=oi(()=>{this.hasAttached()&&this.updatePosition()},{injector:this._injector}),this._togglePointerEvents(!0),this._config.hasBackdrop&&this._attachBackdrop(),this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!0),this._attachments.next(),this._completeDetachContent(),this._keyboardDispatcher.add(this),this._config.disposeOnNavigation&&(this._locationChanges=this._location.subscribe(()=>this.dispose())),this._outsideClickDispatcher.add(this),typeof t?.onDestroy=="function"&&t.onDestroy(()=>{this.hasAttached()&&this._ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>this.detach()))}),t}detach(){if(!this.hasAttached())return;this.detachBackdrop(),this._togglePointerEvents(!1),this._positionStrategy&&this._positionStrategy.detach&&this._positionStrategy.detach(),this._scrollStrategy&&this._scrollStrategy.disable();let n=this._portalOutlet.detach();return this._detachments.next(),this._completeDetachContent(),this._keyboardDispatcher.remove(this),this._detachContentWhenEmpty(),this._locationChanges.unsubscribe(),this._outsideClickDispatcher.remove(this),n}dispose(){if(this._disposed)return;let n=this.hasAttached();this._positionStrategy&&this._positionStrategy.dispose(),this._disposeScrollStrategy(),this._backdropRef?.dispose(),this._locationChanges.unsubscribe(),this._keyboardDispatcher.remove(this),this._portalOutlet.dispose(),this._attachments.complete(),this._backdropClick.complete(),this._keydownEvents.complete(),this._outsidePointerEvents.complete(),this._outsideClickDispatcher.remove(this),this._host?.remove(),this._afterNextRenderRef?.destroy(),this._previousHostParent=this._pane=this._host=this._backdropRef=null,n&&this._detachments.next(),this._detachments.complete(),this._completeDetachContent(),this._disposed=!0}hasAttached(){return this._portalOutlet.hasAttached()}backdropClick(){return this._backdropClick}attachments(){return this._attachments}detachments(){return this._detachments}keydownEvents(){return this._keydownEvents}outsidePointerEvents(){return this._outsidePointerEvents}getConfig(){return this._config}updatePosition(){this._positionStrategy&&this._positionStrategy.apply()}updatePositionStrategy(n){n!==this._positionStrategy&&(this._positionStrategy&&this._positionStrategy.dispose(),this._positionStrategy=n,this.hasAttached()&&(n.attach(this),this.updatePosition()))}updateSize(n){this._config=D(D({},this._config),n),this._updateElementSize()}setDirection(n){this._config=H(D({},this._config),{direction:n}),this._updateElementDirection()}addPanelClass(n){this._pane&&this._toggleClasses(this._pane,n,!0)}removePanelClass(n){this._pane&&this._toggleClasses(this._pane,n,!1)}getDirection(){let n=this._config.direction;return n?typeof n=="string"?n:n.value:"ltr"}updateScrollStrategy(n){n!==this._scrollStrategy&&(this._disposeScrollStrategy(),this._scrollStrategy=n,this.hasAttached()&&(n.attach(this),n.enable()))}_updateElementDirection(){this._host.setAttribute("dir",this.getDirection())}_updateElementSize(){if(!this._pane)return;let n=this._pane.style;n.width=Te(this._config.width),n.height=Te(this._config.height),n.minWidth=Te(this._config.minWidth),n.minHeight=Te(this._config.minHeight),n.maxWidth=Te(this._config.maxWidth),n.maxHeight=Te(this._config.maxHeight)}_togglePointerEvents(n){this._pane.style.pointerEvents=n?"":"none"}_attachHost(){if(!this._host.parentElement){let n=this._config.usePopover?this._positionStrategy?.getPopoverInsertionPoint?.():null;th(n)?n.after(this._host):n?.type==="parent"?n.element.appendChild(this._host):this._previousHostParent?.appendChild(this._host)}if(this._config.usePopover)try{this._host.showPopover()}catch(n){}}_attachBackdrop(){let n="cdk-overlay-backdrop-showing";this._backdropRef?.dispose(),this._backdropRef=new eh(this._document,this._renderer,this._ngZone,t=>{this._backdropClick.next(t)}),this._animationsDisabled&&this._backdropRef.element.classList.add("cdk-overlay-backdrop-noop-animation"),this._config.backdropClass&&this._toggleClasses(this._backdropRef.element,this._config.backdropClass,!0),this._config.usePopover?this._host.prepend(this._backdropRef.element):this._host.parentElement.insertBefore(this._backdropRef.element,this._host),!this._animationsDisabled&&typeof requestAnimationFrame<"u"?this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>this._backdropRef?.element.classList.add(n))}):this._backdropRef.element.classList.add(n)}_updateStackingOrder(){!this._config.usePopover&&this._host.nextSibling&&this._host.parentNode.appendChild(this._host)}detachBackdrop(){this._animationsDisabled?(this._backdropRef?.dispose(),this._backdropRef=null):this._backdropRef?.detach()}_toggleClasses(n,t,r){let i=Hf(t||[]).filter(o=>!!o);i.length&&(r?n.classList.add(...i):n.classList.remove(...i))}_detachContentWhenEmpty(){let n=!1;try{this._detachContentAfterRenderRef=oi(()=>{n=!0,this._detachContent()},{injector:this._injector})}catch(t){if(n)throw t;this._detachContent()}globalThis.MutationObserver&&this._pane&&(this._detachContentMutationObserver||=new globalThis.MutationObserver(()=>{this._detachContent()}),this._detachContentMutationObserver.observe(this._pane,{childList:!0}))}_detachContent(){(!this._pane||!this._host||this._pane.children.length===0)&&(this._pane&&this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!1),this._host&&this._host.parentElement&&(this._previousHostParent=this._host.parentElement,this._host.remove()),this._completeDetachContent())}_completeDetachContent(){this._detachContentAfterRenderRef?.destroy(),this._detachContentAfterRenderRef=void 0,this._detachContentMutationObserver?.disconnect()}_disposeScrollStrategy(){let n=this._scrollStrategy;n?.disable(),n?.detach?.()}},Sb="cdk-overlay-connected-position-bounding-box",QS=/([A-Za-z%]+)$/;function Bb(e,n){return new Hl(n,e.get(Vo),e.get(j),e.get(be),e.get(jb))}var Hl=class{_viewportRuler;_document;_platform;_overlayContainer;_overlayRef;_isInitialRender=!1;_lastBoundingBoxSize={width:0,height:0};_isPushed=!1;_canPush=!0;_growAfterOpen=!1;_hasFlexibleDimensions=!0;_positionLocked=!1;_originRect;_overlayRect;_viewportRect;_containerRect;_viewportMargin=0;_scrollables=[];_preferredPositions=[];_origin;_pane;_isDisposed=!1;_boundingBox=null;_lastPosition=null;_lastScrollVisibility=null;_positionChanges=new B;_resizeSubscription=oe.EMPTY;_offsetX=0;_offsetY=0;_transformOriginSelector;_appliedPanelClasses=[];_previousPushAmount=null;_popoverLocation="global";positionChanges=this._positionChanges;get positions(){return this._preferredPositions}constructor(n,t,r,i,o){this._viewportRuler=t,this._document=r,this._platform=i,this._overlayContainer=o,this.setOrigin(n)}attach(n){this._overlayRef&&this._overlayRef,this._validatePositions(),n.hostElement.classList.add(Sb),this._overlayRef=n,this._boundingBox=n.hostElement,this._pane=n.overlayElement,this._isDisposed=!1,this._isInitialRender=!0,this._lastPosition=null,this._resizeSubscription.unsubscribe(),this._resizeSubscription=this._viewportRuler.change().subscribe(()=>{this._isInitialRender=!0,this.apply()})}apply(){if(this._isDisposed||!this._platform.isBrowser)return;if(!this._isInitialRender&&this._positionLocked&&this._lastPosition){this.reapplyLastPosition();return}this._clearPanelClasses(),this._resetOverlayElementStyles(),this._resetBoundingBoxStyles(),this._viewportRect=this._getNarrowedViewportRect(),this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._containerRect=this._getContainerRect();let n=this._originRect,t=this._overlayRect,r=this._viewportRect,i=this._containerRect,o=[],s;for(let a of this._preferredPositions){let l=this._getOriginPoint(n,i,a),c=this._getOverlayPoint(l,t,a),d=this._getOverlayFit(c,t,r,a);if(d.isCompletelyWithinViewport){this._isPushed=!1,this._applyPosition(a,l);return}if(this._canFitWithFlexibleDimensions(d,c,r)){o.push({position:a,origin:l,overlayRect:t,boundingBoxRect:this._calculateBoundingBoxRect(l,a)});continue}(!s||s.overlayFit.visibleArea<d.visibleArea)&&(s={overlayFit:d,overlayPoint:c,originPoint:l,position:a,overlayRect:t})}if(o.length){let a=null,l=-1;for(let c of o){let d=c.boundingBoxRect.width*c.boundingBoxRect.height*(c.position.weight||1);d>l&&(l=d,a=c)}this._isPushed=!1,this._applyPosition(a.position,a.origin);return}if(this._canPush){this._isPushed=!0,this._applyPosition(s.position,s.originPoint);return}this._applyPosition(s.position,s.originPoint)}detach(){this._clearPanelClasses(),this._lastPosition=null,this._previousPushAmount=null,this._resizeSubscription.unsubscribe()}dispose(){this._isDisposed||(this._boundingBox&&Ir(this._boundingBox.style,{top:"",left:"",right:"",bottom:"",height:"",width:"",alignItems:"",justifyContent:""}),this._pane&&this._resetOverlayElementStyles(),this._overlayRef&&this._overlayRef.hostElement.classList.remove(Sb),this.detach(),this._positionChanges.complete(),this._overlayRef=this._boundingBox=null,this._isDisposed=!0)}reapplyLastPosition(){if(this._isDisposed||!this._platform.isBrowser)return;let n=this._lastPosition;n?(this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._viewportRect=this._getNarrowedViewportRect(),this._containerRect=this._getContainerRect(),this._applyPosition(n,this._getOriginPoint(this._originRect,this._containerRect,n))):this.apply()}withScrollableContainers(n){return this._scrollables=n,this}withPositions(n){return this._preferredPositions=n,n.indexOf(this._lastPosition)===-1&&(this._lastPosition=null),this._validatePositions(),this}withViewportMargin(n){return this._viewportMargin=n,this}withFlexibleDimensions(n=!0){return this._hasFlexibleDimensions=n,this}withGrowAfterOpen(n=!0){return this._growAfterOpen=n,this}withPush(n=!0){return this._canPush=n,this}withLockedPosition(n=!0){return this._positionLocked=n,this}setOrigin(n){return this._origin=n,this}withDefaultOffsetX(n){return this._offsetX=n,this}withDefaultOffsetY(n){return this._offsetY=n,this}withTransformOriginOn(n){return this._transformOriginSelector=n,this}withPopoverLocation(n){return this._popoverLocation=n,this}getPopoverInsertionPoint(){return this._popoverLocation==="global"?null:this._popoverLocation!=="inline"?this._popoverLocation:this._origin instanceof G?this._origin.nativeElement:th(this._origin)?this._origin:null}_getOriginPoint(n,t,r){let i;if(r.originX=="center")i=n.left+n.width/2;else{let s=this._isRtl()?n.right:n.left,a=this._isRtl()?n.left:n.right;i=r.originX=="start"?s:a}t.left<0&&(i-=t.left);let o;return r.originY=="center"?o=n.top+n.height/2:o=r.originY=="top"?n.top:n.bottom,t.top<0&&(o-=t.top),{x:i,y:o}}_getOverlayPoint(n,t,r){let i;r.overlayX=="center"?i=-t.width/2:r.overlayX==="start"?i=this._isRtl()?-t.width:0:i=this._isRtl()?0:-t.width;let o;return r.overlayY=="center"?o=-t.height/2:o=r.overlayY=="top"?0:-t.height,{x:n.x+i,y:n.y+o}}_getOverlayFit(n,t,r,i){let o=Tb(t),{x:s,y:a}=n,l=this._getOffset(i,"x"),c=this._getOffset(i,"y");l&&(s+=l),c&&(a+=c);let d=0-s,u=s+o.width-r.width,m=0-a,h=a+o.height-r.height,p=this._subtractOverflows(o.width,d,u),_=this._subtractOverflows(o.height,m,h),C=p*_;return{visibleArea:C,isCompletelyWithinViewport:o.width*o.height===C,fitsInViewportVertically:_===o.height,fitsInViewportHorizontally:p==o.width}}_canFitWithFlexibleDimensions(n,t,r){if(this._hasFlexibleDimensions){let i=r.bottom-t.y,o=r.right-t.x,s=Mb(this._overlayRef.getConfig().minHeight),a=Mb(this._overlayRef.getConfig().minWidth),l=n.fitsInViewportVertically||s!=null&&s<=i,c=n.fitsInViewportHorizontally||a!=null&&a<=o;return l&&c}return!1}_pushOverlayOnScreen(n,t,r){if(this._previousPushAmount&&this._positionLocked)return{x:n.x+this._previousPushAmount.x,y:n.y+this._previousPushAmount.y};let i=Tb(t),o=this._viewportRect,s=Math.max(n.x+i.width-o.width,0),a=Math.max(n.y+i.height-o.height,0),l=Math.max(o.top-r.top-n.y,0),c=Math.max(o.left-r.left-n.x,0),d=0,u=0;return i.width<=o.width?d=c||-s:d=n.x<this._getViewportMarginStart()?o.left-r.left-n.x:0,i.height<=o.height?u=l||-a:u=n.y<this._getViewportMarginTop()?o.top-r.top-n.y:0,this._previousPushAmount={x:d,y:u},{x:n.x+d,y:n.y+u}}_applyPosition(n,t){if(this._setTransformOrigin(n),this._setOverlayElementStyles(t,n),this._setBoundingBoxStyles(t,n),n.panelClass&&this._addPanelClasses(n.panelClass),this._positionChanges.observers.length){let r=this._getScrollVisibility();if(n!==this._lastPosition||!this._lastScrollVisibility||!KS(this._lastScrollVisibility,r)){let i=new jl(n,r);this._positionChanges.next(i)}this._lastScrollVisibility=r}this._lastPosition=n,this._isInitialRender=!1}_setTransformOrigin(n){if(!this._transformOriginSelector)return;let t=this._boundingBox.querySelectorAll(this._transformOriginSelector),r,i=n.overlayY;n.overlayX==="center"?r="center":this._isRtl()?r=n.overlayX==="start"?"right":"left":r=n.overlayX==="start"?"left":"right";for(let o=0;o<t.length;o++)t[o].style.transformOrigin=`${r} ${i}`}_calculateBoundingBoxRect(n,t){let r=this._viewportRect,i=this._isRtl(),o,s,a;if(t.overlayY==="top")s=n.y,o=r.height-s+this._getViewportMarginBottom();else if(t.overlayY==="bottom")a=r.height-n.y+this._getViewportMarginTop()+this._getViewportMarginBottom(),o=r.height-a+this._getViewportMarginTop();else{let h=Math.min(r.bottom-n.y+r.top,n.y),p=this._lastBoundingBoxSize.height;o=h*2,s=n.y-h,o>p&&!this._isInitialRender&&!this._growAfterOpen&&(s=n.y-p/2)}let l=t.overlayX==="start"&&!i||t.overlayX==="end"&&i,c=t.overlayX==="end"&&!i||t.overlayX==="start"&&i,d,u,m;if(c)m=r.width-n.x+this._getViewportMarginStart()+this._getViewportMarginEnd(),d=n.x-this._getViewportMarginStart();else if(l)u=n.x,d=r.right-n.x-this._getViewportMarginEnd();else{let h=Math.min(r.right-n.x+r.left,n.x),p=this._lastBoundingBoxSize.width;d=h*2,u=n.x-h,d>p&&!this._isInitialRender&&!this._growAfterOpen&&(u=n.x-p/2)}return{top:s,left:u,bottom:a,right:m,width:d,height:o}}_setBoundingBoxStyles(n,t){let r=this._calculateBoundingBoxRect(n,t);!this._isInitialRender&&!this._growAfterOpen&&(r.height=Math.min(r.height,this._lastBoundingBoxSize.height),r.width=Math.min(r.width,this._lastBoundingBoxSize.width));let i={};if(this._hasExactPosition())i.top=i.left="0",i.bottom=i.right="auto",i.maxHeight=i.maxWidth="",i.width=i.height="100%";else{let o=this._overlayRef.getConfig().maxHeight,s=this._overlayRef.getConfig().maxWidth;i.width=Te(r.width),i.height=Te(r.height),i.top=Te(r.top)||"auto",i.bottom=Te(r.bottom)||"auto",i.left=Te(r.left)||"auto",i.right=Te(r.right)||"auto",t.overlayX==="center"?i.alignItems="center":i.alignItems=t.overlayX==="end"?"flex-end":"flex-start",t.overlayY==="center"?i.justifyContent="center":i.justifyContent=t.overlayY==="bottom"?"flex-end":"flex-start",o&&(i.maxHeight=Te(o)),s&&(i.maxWidth=Te(s))}this._lastBoundingBoxSize=r,Ir(this._boundingBox.style,i)}_resetBoundingBoxStyles(){Ir(this._boundingBox.style,{top:"0",left:"0",right:"0",bottom:"0",height:"",width:"",alignItems:"",justifyContent:""})}_resetOverlayElementStyles(){Ir(this._pane.style,{top:"",left:"",bottom:"",right:"",position:"",transform:""})}_setOverlayElementStyles(n,t){let r={},i=this._hasExactPosition(),o=this._hasFlexibleDimensions,s=this._overlayRef.getConfig();if(i){let d=this._viewportRuler.getViewportScrollPosition();Ir(r,this._getExactOverlayY(t,n,d)),Ir(r,this._getExactOverlayX(t,n,d))}else r.position="static";let a="",l=this._getOffset(t,"x"),c=this._getOffset(t,"y");l&&(a+=`translateX(${l}px) `),c&&(a+=`translateY(${c}px)`),r.transform=a.trim(),s.maxHeight&&(i?r.maxHeight=Te(s.maxHeight):o&&(r.maxHeight="")),s.maxWidth&&(i?r.maxWidth=Te(s.maxWidth):o&&(r.maxWidth="")),Ir(this._pane.style,r)}_getExactOverlayY(n,t,r){let i={top:"",bottom:""},o=this._getOverlayPoint(t,this._overlayRect,n);if(this._isPushed&&(o=this._pushOverlayOnScreen(o,this._overlayRect,r)),n.overlayY==="bottom"){let s=this._document.documentElement.clientHeight;i.bottom=`${s-(o.y+this._overlayRect.height)}px`}else i.top=Te(o.y);return i}_getExactOverlayX(n,t,r){let i={left:"",right:""},o=this._getOverlayPoint(t,this._overlayRect,n);this._isPushed&&(o=this._pushOverlayOnScreen(o,this._overlayRect,r));let s;if(this._isRtl()?s=n.overlayX==="end"?"left":"right":s=n.overlayX==="end"?"right":"left",s==="right"){let a=this._document.documentElement.clientWidth;i.right=`${a-(o.x+this._overlayRect.width)}px`}else i.left=Te(o.x);return i}_getScrollVisibility(){let n=this._getOriginRect(),t=this._pane.getBoundingClientRect(),r=this._scrollables.map(i=>i.getElementRef().nativeElement.getBoundingClientRect());return{isOriginClipped:xb(n,r),isOriginOutsideView:Jf(n,r),isOverlayClipped:xb(t,r),isOverlayOutsideView:Jf(t,r)}}_subtractOverflows(n,...t){return t.reduce((r,i)=>r-Math.max(i,0),n)}_getNarrowedViewportRect(){let n=this._document.documentElement.clientWidth,t=this._document.documentElement.clientHeight,r=this._viewportRuler.getViewportScrollPosition();return{top:r.top+this._getViewportMarginTop(),left:r.left+this._getViewportMarginStart(),right:r.left+n-this._getViewportMarginEnd(),bottom:r.top+t-this._getViewportMarginBottom(),width:n-this._getViewportMarginStart()-this._getViewportMarginEnd(),height:t-this._getViewportMarginTop()-this._getViewportMarginBottom()}}_isRtl(){return this._overlayRef.getDirection()==="rtl"}_hasExactPosition(){return!this._hasFlexibleDimensions||this._isPushed}_getOffset(n,t){return t==="x"?n.offsetX==null?this._offsetX:n.offsetX:n.offsetY==null?this._offsetY:n.offsetY}_validatePositions(){}_addPanelClasses(n){this._pane&&Hf(n).forEach(t=>{t!==""&&this._appliedPanelClasses.indexOf(t)===-1&&(this._appliedPanelClasses.push(t),this._pane.classList.add(t))})}_clearPanelClasses(){this._pane&&(this._appliedPanelClasses.forEach(n=>{this._pane.classList.remove(n)}),this._appliedPanelClasses=[])}_getViewportMarginStart(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.start??0}_getViewportMarginEnd(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.end??0}_getViewportMarginTop(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.top??0}_getViewportMarginBottom(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.bottom??0}_getOriginRect(){let n=this._origin;if(n instanceof G)return n.nativeElement.getBoundingClientRect();if(n instanceof Element)return n.getBoundingClientRect();let t=n.width||0,r=n.height||0;return{top:n.y,bottom:n.y+r,left:n.x,right:n.x+t,height:r,width:t}}_getContainerRect(){let n=this._overlayRef.getConfig().usePopover&&this._popoverLocation!=="global",t=this._overlayContainer.getContainerElement();n&&(t.style.display="block");let r=t.getBoundingClientRect();return n&&(t.style.display=""),r}};function Ir(e,n){for(let t in n)n.hasOwnProperty(t)&&(e[t]=n[t]);return e}function Mb(e){if(typeof e!="number"&&e!=null){let[n,t]=e.split(QS);return!t||t==="px"?parseFloat(n):null}return e||null}function Tb(e){return{top:Math.floor(e.top),right:Math.floor(e.right),bottom:Math.floor(e.bottom),left:Math.floor(e.left),width:Math.floor(e.width),height:Math.floor(e.height)}}function KS(e,n){return e===n?!0:e.isOriginClipped===n.isOriginClipped&&e.isOriginOutsideView===n.isOriginOutsideView&&e.isOverlayClipped===n.isOverlayClipped&&e.isOverlayOutsideView===n.isOverlayOutsideView}var Ab="cdk-global-overlay-wrapper";function Hb(e){return new Ul}var Ul=class{_overlayRef;_cssPosition="static";_topOffset="";_bottomOffset="";_alignItems="";_xPosition="";_xOffset="";_width="";_height="";_isDisposed=!1;attach(n){let t=n.getConfig();this._overlayRef=n,this._width&&!t.width&&n.updateSize({width:this._width}),this._height&&!t.height&&n.updateSize({height:this._height}),n.hostElement.classList.add(Ab),this._isDisposed=!1}top(n=""){return this._bottomOffset="",this._topOffset=n,this._alignItems="flex-start",this}left(n=""){return this._xOffset=n,this._xPosition="left",this}bottom(n=""){return this._topOffset="",this._bottomOffset=n,this._alignItems="flex-end",this}right(n=""){return this._xOffset=n,this._xPosition="right",this}start(n=""){return this._xOffset=n,this._xPosition="start",this}end(n=""){return this._xOffset=n,this._xPosition="end",this}width(n=""){return this._overlayRef?this._overlayRef.updateSize({width:n}):this._width=n,this}height(n=""){return this._overlayRef?this._overlayRef.updateSize({height:n}):this._height=n,this}centerHorizontally(n=""){return this.left(n),this._xPosition="center",this}centerVertically(n=""){return this.top(n),this._alignItems="center",this}apply(){if(!this._overlayRef||!this._overlayRef.hasAttached())return;let n=this._overlayRef.overlayElement.style,t=this._overlayRef.hostElement.style,r=this._overlayRef.getConfig(),{width:i,height:o,maxWidth:s,maxHeight:a}=r,l=(i==="100%"||i==="100vw")&&(!s||s==="100%"||s==="100vw"),c=(o==="100%"||o==="100vh")&&(!a||a==="100%"||a==="100vh"),d=this._xPosition,u=this._xOffset,m=this._overlayRef.getConfig().direction==="rtl",h="",p="",_="";l?_="flex-start":d==="center"?(_="center",m?p=u:h=u):m?d==="left"||d==="end"?(_="flex-end",h=u):(d==="right"||d==="start")&&(_="flex-start",p=u):d==="left"||d==="start"?(_="flex-start",h=u):(d==="right"||d==="end")&&(_="flex-end",p=u),n.position=this._cssPosition,n.marginLeft=l?"0":h,n.marginTop=c?"0":this._topOffset,n.marginBottom=this._bottomOffset,n.marginRight=l?"0":p,t.justifyContent=_,t.alignItems=c?"flex-start":this._alignItems}dispose(){if(this._isDisposed||!this._overlayRef)return;let n=this._overlayRef.overlayElement.style,t=this._overlayRef.hostElement,r=t.style;t.classList.remove(Ab),r.justifyContent=r.alignItems=n.marginTop=n.marginBottom=n.marginLeft=n.marginRight=n.position="",this._overlayRef=null,this._isDisposed=!0}},Ub=(()=>{class e{_injector=f(J);global(){return Hb()}flexibleConnectedTo(t){return Bb(this._injector,t)}static \u0275fac=function(r){return new(r||e)};static \u0275prov=R({token:e,factory:e.\u0275fac})}return e})(),zb=new b("OVERLAY_DEFAULT_CONFIG");function $b(e,n){e.get(yt).load(Vb);let t=e.get(jb),r=e.get(j),i=e.get(bt),o=e.get(It),s=e.get(Eo),a=e.get(Be,null,{optional:!0})||e.get(Ne).createRenderer(null,null),l=new Vl(n),c=e.get(zb,null,{optional:!0})?.usePopover??!0;l.direction=l.direction||s.value,!r.body||!("showPopover"in r.body)?l.usePopover=!1:l.usePopover=n?.usePopover??c;let d=r.createElement("div"),u=r.createElement("div");d.id=i.getId("cdk-overlay-"),d.classList.add("cdk-overlay-pane"),u.appendChild(d),l.usePopover&&(u.setAttribute("popover","manual"),u.classList.add("cdk-overlay-popover"));let m=l.usePopover?l.positionStrategy?.getPopoverInsertionPoint?.():null;return th(m)?m.after(u):m?.type==="parent"?m.element.appendChild(u):t.getContainerElement().appendChild(u),new Bl(new Ol(d,o,e),u,d,l,e.get(A),e.get(Pb),r,e.get(tl),e.get(Lb),n?.disableAnimations??e.get(Zi,null,{optional:!0})==="NoopAnimations",e.get(Ee),a)}var nh=(()=>{class e{scrollStrategies=f(Ob);_positionBuilder=f(Ub);_injector=f(J);create(t){return $b(this._injector,t)}position(){return this._positionBuilder}static \u0275fac=function(r){return new(r||e)};static \u0275prov=R({token:e,factory:e.\u0275fac})}return e})();var _t=(function(e){return e[e.FADING_IN=0]="FADING_IN",e[e.VISIBLE=1]="VISIBLE",e[e.FADING_OUT=2]="FADING_OUT",e[e.HIDDEN=3]="HIDDEN",e})(_t||{}),rh=class{_renderer;element;config;_animationForciblyDisabledThroughCss;state=_t.HIDDEN;constructor(n,t,r,i=!1){this._renderer=n,this.element=t,this.config=r,this._animationForciblyDisabledThroughCss=i}fadeOut(){this._renderer.fadeOutRipple(this)}},Gb=_i({passive:!0,capture:!0}),ih=class{_events=new Map;addHandler(n,t,r,i){let o=this._events.get(t);if(o){let s=o.get(r);s?s.add(i):o.set(r,new Set([i]))}else this._events.set(t,new Map([[r,new Set([i])]])),n.runOutsideAngular(()=>{document.addEventListener(t,this._delegateEventHandler,Gb)})}removeHandler(n,t,r){let i=this._events.get(n);if(!i)return;let o=i.get(t);o&&(o.delete(r),o.size===0&&i.delete(t),i.size===0&&(this._events.delete(n),document.removeEventListener(n,this._delegateEventHandler,Gb)))}_delegateEventHandler=n=>{let t=Je(n);t&&this._events.get(n.type)?.forEach((r,i)=>{(i===t||i.contains(t))&&r.forEach(o=>o.handleEvent(n))})}},Uo={enterDuration:225,exitDuration:150},JS=800,Wb=_i({passive:!0,capture:!0}),Yb=["mousedown","touchstart"],qb=["mouseup","mouseleave","touchend","touchcancel"],eM=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275cmp=W({type:e,selectors:[["ng-component"]],hostAttrs:["mat-ripple-style-loader",""],decls:0,vars:0,template:function(r,i){},styles:[`.mat-ripple {
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
  background-color: var(--mat-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface) 10%, transparent));
}
@media (forced-colors: active) {
  .mat-ripple-element {
    display: none;
  }
}
.cdk-drag-preview .mat-ripple-element, .cdk-drag-placeholder .mat-ripple-element {
  display: none;
}
`],encapsulation:2})}return e})(),zo=class e{_target;_ngZone;_platform;_containerElement;_triggerElement=null;_isPointerDown=!1;_activeRipples=new Map;_mostRecentTransientRipple=null;_lastTouchStartEvent;_pointerUpEventsRegistered=!1;_containerRect=null;static _eventManager=new ih;constructor(n,t,r,i,o){this._target=n,this._ngZone=t,this._platform=i,i.isBrowser&&(this._containerElement=it(r)),o&&o.get(yt).load(eM)}fadeInRipple(n,t,r={}){let i=this._containerRect=this._containerRect||this._containerElement.getBoundingClientRect(),o=D(D({},Uo),r.animation);r.centered&&(n=i.left+i.width/2,t=i.top+i.height/2);let s=r.radius||tM(n,t,i),a=n-i.left,l=t-i.top,c=o.enterDuration,d=document.createElement("div");d.classList.add("mat-ripple-element"),d.style.left=`${a-s}px`,d.style.top=`${l-s}px`,d.style.height=`${s*2}px`,d.style.width=`${s*2}px`,r.color!=null&&(d.style.backgroundColor=r.color),d.style.transitionDuration=`${c}ms`,this._containerElement.appendChild(d);let u=window.getComputedStyle(d),m=u.transitionProperty,h=u.transitionDuration,p=m==="none"||h==="0s"||h==="0s, 0s"||i.width===0&&i.height===0,_=new rh(this,d,r,p);d.style.transform="scale3d(1, 1, 1)",_.state=_t.FADING_IN,r.persistent||(this._mostRecentTransientRipple=_);let C=null;return!p&&(c||o.exitDuration)&&this._ngZone.runOutsideAngular(()=>{let F=()=>{C&&(C.fallbackTimer=null),clearTimeout(ot),this._finishRippleTransition(_)},Ae=()=>this._destroyRipple(_),ot=setTimeout(Ae,c+100);d.addEventListener("transitionend",F),d.addEventListener("transitioncancel",Ae),C={onTransitionEnd:F,onTransitionCancel:Ae,fallbackTimer:ot}}),this._activeRipples.set(_,C),(p||!c)&&this._finishRippleTransition(_),_}fadeOutRipple(n){if(n.state===_t.FADING_OUT||n.state===_t.HIDDEN)return;let t=n.element,r=D(D({},Uo),n.config.animation);t.style.transitionDuration=`${r.exitDuration}ms`,t.style.opacity="0",n.state=_t.FADING_OUT,(n._animationForciblyDisabledThroughCss||!r.exitDuration)&&this._finishRippleTransition(n)}fadeOutAll(){this._getActiveRipples().forEach(n=>n.fadeOut())}fadeOutAllNonPersistent(){this._getActiveRipples().forEach(n=>{n.config.persistent||n.fadeOut()})}setupTriggerEvents(n){let t=it(n);!this._platform.isBrowser||!t||t===this._triggerElement||(this._removeTriggerEvents(),this._triggerElement=t,Yb.forEach(r=>{e._eventManager.addHandler(this._ngZone,r,t,this)}))}handleEvent(n){n.type==="mousedown"?this._onMousedown(n):n.type==="touchstart"?this._onTouchStart(n):this._onPointerUp(),this._pointerUpEventsRegistered||(this._ngZone.runOutsideAngular(()=>{qb.forEach(t=>{this._triggerElement.addEventListener(t,this,Wb)})}),this._pointerUpEventsRegistered=!0)}_finishRippleTransition(n){n.state===_t.FADING_IN?this._startFadeOutTransition(n):n.state===_t.FADING_OUT&&this._destroyRipple(n)}_startFadeOutTransition(n){let t=n===this._mostRecentTransientRipple,{persistent:r}=n.config;n.state=_t.VISIBLE,!r&&(!t||!this._isPointerDown)&&n.fadeOut()}_destroyRipple(n){let t=this._activeRipples.get(n)??null;this._activeRipples.delete(n),this._activeRipples.size||(this._containerRect=null),n===this._mostRecentTransientRipple&&(this._mostRecentTransientRipple=null),n.state=_t.HIDDEN,t!==null&&(n.element.removeEventListener("transitionend",t.onTransitionEnd),n.element.removeEventListener("transitioncancel",t.onTransitionCancel),t.fallbackTimer!==null&&clearTimeout(t.fallbackTimer)),n.element.remove()}_onMousedown(n){let t=No(n),r=this._lastTouchStartEvent&&Date.now()<this._lastTouchStartEvent+JS;!this._target.rippleDisabled&&!t&&!r&&(this._isPointerDown=!0,this.fadeInRipple(n.clientX,n.clientY,this._target.rippleConfig))}_onTouchStart(n){if(!this._target.rippleDisabled&&!Ro(n)){this._lastTouchStartEvent=Date.now(),this._isPointerDown=!0;let t=n.changedTouches;if(t)for(let r=0;r<t.length;r++)this.fadeInRipple(t[r].clientX,t[r].clientY,this._target.rippleConfig)}}_onPointerUp(){this._isPointerDown&&(this._isPointerDown=!1,this._getActiveRipples().forEach(n=>{let t=n.state===_t.VISIBLE||n.config.terminateOnPointerUp&&n.state===_t.FADING_IN;!n.config.persistent&&t&&n.fadeOut()}))}_getActiveRipples(){return Array.from(this._activeRipples.keys())}_removeTriggerEvents(){let n=this._triggerElement;n&&(Yb.forEach(t=>e._eventManager.removeHandler(t,n,this)),this._pointerUpEventsRegistered&&(qb.forEach(t=>n.removeEventListener(t,this,Wb)),this._pointerUpEventsRegistered=!1))}};function tM(e,n,t){let r=Math.max(Math.abs(e-t.left),Math.abs(e-t.right)),i=Math.max(Math.abs(n-t.top),Math.abs(n-t.bottom));return Math.sqrt(r*r+i*i)}var oh=new b("mat-ripple-global-options"),Zb=(()=>{class e{_elementRef=f(G);_animationsDisabled=zt();color;unbounded=!1;centered=!1;radius=0;animation;get disabled(){return this._disabled}set disabled(t){t&&this.fadeOutAllNonPersistent(),this._disabled=t,this._setupTriggerEventsIfEnabled()}_disabled=!1;get trigger(){return this._trigger||this._elementRef.nativeElement}set trigger(t){this._trigger=t,this._setupTriggerEventsIfEnabled()}_trigger;_rippleRenderer;_globalOptions;_isInitialized=!1;constructor(){let t=f(A),r=f(be),i=f(oh,{optional:!0}),o=f(J);this._globalOptions=i||{},this._rippleRenderer=new zo(this,t,this._elementRef,r,o)}ngOnInit(){this._isInitialized=!0,this._setupTriggerEventsIfEnabled()}ngOnDestroy(){this._rippleRenderer._removeTriggerEvents()}fadeOutAll(){this._rippleRenderer.fadeOutAll()}fadeOutAllNonPersistent(){this._rippleRenderer.fadeOutAllNonPersistent()}get rippleConfig(){return{centered:this.centered,radius:this.radius,color:this.color,animation:D(D(D({},this._globalOptions.animation),this._animationsDisabled?{enterDuration:0,exitDuration:0}:{}),this.animation),terminateOnPointerUp:this._globalOptions.terminateOnPointerUp}}get rippleDisabled(){return this.disabled||!!this._globalOptions.disabled}_setupTriggerEventsIfEnabled(){!this.disabled&&this._isInitialized&&this._rippleRenderer.setupTriggerEvents(this.trigger)}launch(t,r=0,i){return typeof t=="number"?this._rippleRenderer.fadeInRipple(t,r,D(D({},this.rippleConfig),i)):this._rippleRenderer.fadeInRipple(0,0,D(D({},this.rippleConfig),t))}static \u0275fac=function(r){return new(r||e)};static \u0275dir=$({type:e,selectors:[["","mat-ripple",""],["","matRipple",""]],hostAttrs:[1,"mat-ripple"],hostVars:2,hostBindings:function(r,i){r&2&&U("mat-ripple-unbounded",i.unbounded)},inputs:{color:[0,"matRippleColor","color"],unbounded:[0,"matRippleUnbounded","unbounded"],centered:[0,"matRippleCentered","centered"],radius:[0,"matRippleRadius","radius"],animation:[0,"matRippleAnimation","animation"],disabled:[0,"matRippleDisabled","disabled"],trigger:[0,"matRippleTrigger","trigger"]},exportAs:["matRipple"]})}return e})();var nM={capture:!0},rM=["focus","mousedown","mouseenter","touchstart"],sh="mat-ripple-loader-uninitialized",ah="mat-ripple-loader-class-name",Xb="mat-ripple-loader-centered",zl="mat-ripple-loader-disabled",Qb=(()=>{class e{_document=f(j);_animationsDisabled=zt();_globalRippleOptions=f(oh,{optional:!0});_platform=f(be);_ngZone=f(A);_injector=f(J);_eventCleanups;_hosts=new Map;constructor(){let t=f(Ne).createRenderer(null,null);this._eventCleanups=this._ngZone.runOutsideAngular(()=>rM.map(r=>t.listen(this._document,r,this._onInteraction,nM)))}ngOnDestroy(){let t=this._hosts.keys();for(let r of t)this.destroyRipple(r);this._eventCleanups.forEach(r=>r())}configureRipple(t,r){t.setAttribute(sh,this._globalRippleOptions?.namespace??""),(r.className||!t.hasAttribute(ah))&&t.setAttribute(ah,r.className||""),r.centered&&t.setAttribute(Xb,""),r.disabled&&t.setAttribute(zl,"")}setDisabled(t,r){let i=this._hosts.get(t);i?(i.target.rippleDisabled=r,!r&&!i.hasSetUpEvents&&(i.hasSetUpEvents=!0,i.renderer.setupTriggerEvents(t))):r?t.setAttribute(zl,""):t.removeAttribute(zl)}_onInteraction=t=>{let r=Je(t);if(r instanceof HTMLElement){let i=r.closest(`[${sh}="${this._globalRippleOptions?.namespace??""}"]`);i&&this._createRipple(i)}};_createRipple(t){if(!this._document||this._hosts.has(t))return;t.querySelector(".mat-ripple")?.remove();let r=this._document.createElement("span");r.classList.add("mat-ripple",t.getAttribute(ah)),t.append(r);let i=this._globalRippleOptions,o=this._animationsDisabled?0:i?.animation?.enterDuration??Uo.enterDuration,s=this._animationsDisabled?0:i?.animation?.exitDuration??Uo.exitDuration,a={rippleDisabled:this._animationsDisabled||i?.disabled||t.hasAttribute(zl),rippleConfig:{centered:t.hasAttribute(Xb),terminateOnPointerUp:i?.terminateOnPointerUp,animation:{enterDuration:o,exitDuration:s}}},l=new zo(a,this._ngZone,r,this._platform,this._injector),c=!a.rippleDisabled;c&&l.setupTriggerEvents(t),this._hosts.set(t,{target:a,renderer:l,hasSetUpEvents:c}),t.removeAttribute(sh)}destroyRipple(t){let r=this._hosts.get(t);r&&(r.renderer._removeTriggerEvents(),this._hosts.delete(t))}static \u0275fac=function(r){return new(r||e)};static \u0275prov=R({token:e,factory:e.\u0275fac})}return e})();var $l=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275cmp=W({type:e,selectors:[["structural-styles"]],decls:0,vars:0,template:function(r,i){},styles:[`.mat-focus-indicator {
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
  display: var(--mat-focus-indicator-display, none);
  border-width: var(--mat-focus-indicator-border-width, 3px);
  border-style: var(--mat-focus-indicator-border-style, solid);
  border-color: var(--mat-focus-indicator-border-color, transparent);
  border-radius: var(--mat-focus-indicator-border-radius, 4px);
}
.mat-focus-indicator:focus-visible::before {
  content: "";
}

@media (forced-colors: active) {
  html {
    --mat-focus-indicator-display: block;
    --mat-focus-indicator-fallback-border-style: none;
  }
}
`],encapsulation:2})}return e})();var iM=["*",[["","progressIndicator",""]]],oM=["*","[progressIndicator]"];function sM(e,n){e&1&&(mt(0,"div",1),ee(1,1),pt())}var aM=new b("MAT_BUTTON_CONFIG");function Kb(e){return e==null?void 0:Qa(e)}var lh=(()=>{class e{_elementRef=f(G);_ngZone=f(A);_animationsDisabled=zt();_config=f(aM,{optional:!0});_focusMonitor=f(Fo);_cleanupClick;_renderer=f(Be);_rippleLoader=f(Qb);_isAnchor;_isFab=!1;color;get disableRipple(){return this._disableRipple}set disableRipple(t){this._disableRipple=t,this._updateRippleDisabled()}_disableRipple=!1;get disabled(){return this._disabled}set disabled(t){this._disabled=t,this._updateRippleDisabled()}_disabled=!1;ariaDisabled;disabledInteractive;tabIndex;set _tabindex(t){this.tabIndex=t}showProgress=z(!1,{transform:we});constructor(){f(yt).load($l);let t=this._elementRef.nativeElement;this._isAnchor=t.tagName==="A",this.disabledInteractive=this._config?.disabledInteractive??!1,this.color=this._config?.color??null,this._rippleLoader?.configureRipple(t,{className:"mat-mdc-button-ripple"})}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,!0),this._isAnchor&&this._setupAsAnchor()}ngOnDestroy(){this._cleanupClick?.(),this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement)}focus(t="program",r){t?this._focusMonitor.focusVia(this._elementRef.nativeElement,t,r):this._elementRef.nativeElement.focus(r)}_getAriaDisabled(){return this.ariaDisabled!=null?this.ariaDisabled:this._isAnchor?this.disabled||null:this.disabled&&this.disabledInteractive?!0:null}_getDisabledAttribute(){return this.disabledInteractive||!this.disabled?null:!0}_updateRippleDisabled(){this._rippleLoader?.setDisabled(this._elementRef.nativeElement,this.disableRipple||this.disabled)}_getTabIndex(){return this._isAnchor?this.disabled&&!this.disabledInteractive?-1:this.tabIndex:this.tabIndex}_setupAsAnchor(){this._cleanupClick=this._ngZone.runOutsideAngular(()=>this._renderer.listen(this._elementRef.nativeElement,"click",t=>{this.disabled&&(t.preventDefault(),t.stopImmediatePropagation())}))}static \u0275fac=function(r){return new(r||e)};static \u0275dir=$({type:e,hostAttrs:[1,"mat-mdc-button-base"],hostVars:15,hostBindings:function(r,i){r&2&&(Re("disabled",i._getDisabledAttribute())("aria-disabled",i._getAriaDisabled())("tabindex",i._getTabIndex()),Dr(i.color?"mat-"+i.color:""),U("mat-mdc-button-progress-indicator-shown",i.showProgress())("mat-mdc-button-disabled",i.disabled)("mat-mdc-button-disabled-interactive",i.disabledInteractive)("mat-unthemed",!i.color)("_mat-animation-noopable",i._animationsDisabled))},inputs:{color:"color",disableRipple:[2,"disableRipple","disableRipple",we],disabled:[2,"disabled","disabled",we],ariaDisabled:[2,"aria-disabled","ariaDisabled",we],disabledInteractive:[2,"disabledInteractive","disabledInteractive",we],tabIndex:[2,"tabIndex","tabIndex",Kb],_tabindex:[2,"tabindex","_tabindex",Kb],showProgress:[1,"showProgress"]}})}return e})(),ch=(()=>{class e extends lh{constructor(){super(),this._rippleLoader.configureRipple(this._elementRef.nativeElement,{centered:!0})}static \u0275fac=function(r){return new(r||e)};static \u0275cmp=W({type:e,selectors:[["button","mat-icon-button",""],["a","mat-icon-button",""],["button","matIconButton",""],["a","matIconButton",""]],hostAttrs:[1,"mdc-icon-button","mat-mdc-icon-button"],exportAs:["matButton","matAnchor"],features:[He],ngContentSelectors:oM,decls:5,vars:1,consts:[[1,"mat-mdc-button-persistent-ripple","mdc-icon-button__ripple"],[1,"mat-mdc-button-progress-indicator-container"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(r,i){r&1&&(Ue(iM),gt(0,"span",0),ee(1),he(2,sM,2,0,"div",1),gt(3,"span",2)(4,"span",3)),r&2&&(y(2),me(i.showProgress()?2:-1))},styles:[`.mat-mdc-icon-button {
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
  border-radius: var(--mat-icon-button-container-shape, var(--mat-sys-corner-full, 50%));
  flex-shrink: 0;
  text-align: center;
  width: var(--mat-icon-button-state-layer-size, 40px);
  height: var(--mat-icon-button-state-layer-size, 40px);
  padding: calc(calc(var(--mat-icon-button-state-layer-size, 40px) - var(--mat-icon-button-icon-size, 24px)) / 2);
  font-size: var(--mat-icon-button-icon-size, 24px);
  color: var(--mat-icon-button-icon-color, var(--mat-sys-on-surface-variant));
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
  background-color: var(--mat-icon-button-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface-variant) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-icon-button-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-icon-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-icon-button-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-icon-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-icon-button-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-icon-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-icon-button-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-icon-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-icon-button-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-icon-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-icon-button-touch-target-size, 48px);
  display: var(--mat-icon-button-touch-target-display, block);
  left: 50%;
  width: var(--mat-icon-button-touch-target-size, 48px);
  transform: translate(-50%, -50%);
}
.mat-mdc-icon-button._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-icon-button[disabled], .mat-mdc-icon-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-icon-button-disabled-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-icon-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-icon-button img,
.mat-mdc-icon-button svg {
  width: var(--mat-icon-button-icon-size, 24px);
  height: var(--mat-icon-button-icon-size, 24px);
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
  border-radius: var(--mat-icon-button-container-shape, var(--mat-sys-corner-full, 50%));
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
`],encapsulation:2})}return e})();var Jb=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=X({type:e});static \u0275inj=Y({imports:[Ye]})}return e})();var lM=[[["",8,"material-icons",3,"iconPositionEnd",""],["mat-icon",3,"iconPositionEnd",""],["","matButtonIcon","",3,"iconPositionEnd",""]],"*",[["","iconPositionEnd","",8,"material-icons"],["mat-icon","iconPositionEnd",""],["","matButtonIcon","","iconPositionEnd",""]],[["","progressIndicator",""]]],cM=[".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd])","*",".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd]","[progressIndicator]"];function dM(e,n){e&1&&(mt(0,"div",2),ee(1,3),pt())}var e_=new Map([["text",["mat-mdc-button"]],["filled",["mdc-button--unelevated","mat-mdc-unelevated-button"]],["elevated",["mdc-button--raised","mat-mdc-raised-button"]],["outlined",["mdc-button--outlined","mat-mdc-outlined-button"]],["tonal",["mat-tonal-button"]]]),t_=(()=>{class e extends lh{get appearance(){return this._appearance}set appearance(t){this.setAppearance(t||this._config?.defaultAppearance||"text")}_appearance=null;constructor(){super();let t=uM(this._elementRef.nativeElement);t&&this.setAppearance(t)}setAppearance(t){if(t===this._appearance)return;let r=this._elementRef.nativeElement.classList,i=this._appearance?e_.get(this._appearance):null,o=e_.get(t);i&&r.remove(...i),r.add(...o),this._appearance=t}static \u0275fac=function(r){return new(r||e)};static \u0275cmp=W({type:e,selectors:[["button","matButton",""],["a","matButton",""],["button","mat-button",""],["button","mat-raised-button",""],["button","mat-flat-button",""],["button","mat-stroked-button",""],["a","mat-button",""],["a","mat-raised-button",""],["a","mat-flat-button",""],["a","mat-stroked-button",""]],hostAttrs:[1,"mdc-button"],inputs:{appearance:[0,"matButton","appearance"]},exportAs:["matButton","matAnchor"],features:[He],ngContentSelectors:cM,decls:8,vars:5,consts:[[1,"mat-mdc-button-persistent-ripple"],[1,"mdc-button__label"],[1,"mat-mdc-button-progress-indicator-container"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(r,i){r&1&&(Ue(lM),gt(0,"span",0),ee(1),mt(2,"span",1),ee(3,1),pt(),ee(4,2),he(5,dM,2,0,"div",2),gt(6,"span",3)(7,"span",4)),r&2&&(U("mdc-button__ripple",!i._isFab)("mdc-fab__ripple",i._isFab),y(5),me(i.showProgress()?5:-1))},styles:[`.mat-mdc-button-base {
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
  padding: 0 var(--mat-button-text-horizontal-padding, 12px);
  height: var(--mat-button-text-container-height, 40px);
  font-family: var(--mat-button-text-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-text-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-text-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-text-label-text-transform);
  font-weight: var(--mat-button-text-label-text-weight, var(--mat-sys-label-large-weight));
}
.mat-mdc-button, .mat-mdc-button .mdc-button__ripple {
  border-radius: var(--mat-button-text-container-shape, var(--mat-sys-corner-full));
}
.mat-mdc-button:not(:disabled) {
  color: var(--mat-button-text-label-text-color, var(--mat-sys-primary));
}
.mat-mdc-button[disabled], .mat-mdc-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-text-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-button:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding: 0 var(--mat-button-text-with-icon-horizontal-padding, 16px);
}
.mat-mdc-button > .mat-icon {
  margin-right: var(--mat-button-text-icon-spacing, 8px);
  margin-left: var(--mat-button-text-icon-offset, -4px);
}
[dir=rtl] .mat-mdc-button > .mat-icon {
  margin-right: var(--mat-button-text-icon-offset, -4px);
  margin-left: var(--mat-button-text-icon-spacing, 8px);
}
.mat-mdc-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-text-icon-offset, -4px);
  margin-left: var(--mat-button-text-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-text-icon-spacing, 8px);
  margin-left: var(--mat-button-text-icon-offset, -4px);
}
.mat-mdc-button .mat-ripple-element {
  background-color: var(--mat-button-text-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-text-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-text-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-text-touch-target-size, 48px);
  display: var(--mat-button-text-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.mat-mdc-unelevated-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-filled-container-height, 40px);
  font-family: var(--mat-button-filled-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-filled-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-filled-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-filled-label-text-transform);
  font-weight: var(--mat-button-filled-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-filled-horizontal-padding, 24px);
}
.mat-mdc-unelevated-button > .mat-icon {
  margin-right: var(--mat-button-filled-icon-spacing, 8px);
  margin-left: var(--mat-button-filled-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-unelevated-button > .mat-icon {
  margin-right: var(--mat-button-filled-icon-offset, -8px);
  margin-left: var(--mat-button-filled-icon-spacing, 8px);
}
.mat-mdc-unelevated-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-filled-icon-offset, -8px);
  margin-left: var(--mat-button-filled-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-unelevated-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-filled-icon-spacing, 8px);
  margin-left: var(--mat-button-filled-icon-offset, -8px);
}
.mat-mdc-unelevated-button .mat-ripple-element {
  background-color: var(--mat-button-filled-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-filled-state-layer-color, var(--mat-sys-on-primary));
}
.mat-mdc-unelevated-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-filled-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-unelevated-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-unelevated-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-unelevated-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-unelevated-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-filled-touch-target-size, 48px);
  display: var(--mat-button-filled-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-unelevated-button:not(:disabled) {
  color: var(--mat-button-filled-label-text-color, var(--mat-sys-on-primary));
  background-color: var(--mat-button-filled-container-color, var(--mat-sys-primary));
}
.mat-mdc-unelevated-button, .mat-mdc-unelevated-button .mdc-button__ripple {
  border-radius: var(--mat-button-filled-container-shape, var(--mat-sys-corner-full));
}
.mat-mdc-unelevated-button .mat-mdc-button-progress-indicator-container {
  --mat-progress-spinner-active-indicator-color: var(--mat-button-filled-progress-active-indicator-color, var(--mat-sys-on-primary));
}
.mat-mdc-unelevated-button[disabled], .mat-mdc-unelevated-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-filled-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-filled-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-raised-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--mat-button-protected-container-elevation-shadow, var(--mat-sys-level1));
  height: var(--mat-button-protected-container-height, 40px);
  font-family: var(--mat-button-protected-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-protected-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-protected-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-protected-label-text-transform);
  font-weight: var(--mat-button-protected-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-protected-horizontal-padding, 24px);
}
.mat-mdc-raised-button > .mat-icon {
  margin-right: var(--mat-button-protected-icon-spacing, 8px);
  margin-left: var(--mat-button-protected-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-raised-button > .mat-icon {
  margin-right: var(--mat-button-protected-icon-offset, -8px);
  margin-left: var(--mat-button-protected-icon-spacing, 8px);
}
.mat-mdc-raised-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-protected-icon-offset, -8px);
  margin-left: var(--mat-button-protected-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-raised-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-protected-icon-spacing, 8px);
  margin-left: var(--mat-button-protected-icon-offset, -8px);
}
.mat-mdc-raised-button .mat-ripple-element {
  background-color: var(--mat-button-protected-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-protected-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-raised-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-protected-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-raised-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-raised-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-raised-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-raised-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-protected-touch-target-size, 48px);
  display: var(--mat-button-protected-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-raised-button:not(:disabled) {
  color: var(--mat-button-protected-label-text-color, var(--mat-sys-primary));
  background-color: var(--mat-button-protected-container-color, var(--mat-sys-surface));
}
.mat-mdc-raised-button, .mat-mdc-raised-button .mdc-button__ripple {
  border-radius: var(--mat-button-protected-container-shape, var(--mat-sys-corner-full));
}
@media (hover: hover) {
  .mat-mdc-raised-button:hover {
    box-shadow: var(--mat-button-protected-hover-container-elevation-shadow, var(--mat-sys-level2));
  }
}
.mat-mdc-raised-button:focus {
  box-shadow: var(--mat-button-protected-focus-container-elevation-shadow, var(--mat-sys-level1));
}
.mat-mdc-raised-button:active, .mat-mdc-raised-button:focus:active {
  box-shadow: var(--mat-button-protected-pressed-container-elevation-shadow, var(--mat-sys-level1));
}
.mat-mdc-raised-button[disabled], .mat-mdc-raised-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-protected-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-protected-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-raised-button[disabled].mat-mdc-button-disabled, .mat-mdc-raised-button.mat-mdc-button-disabled.mat-mdc-button-disabled {
  box-shadow: var(--mat-button-protected-disabled-container-elevation-shadow, var(--mat-sys-level0));
}
.mat-mdc-raised-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-outlined-button {
  border-style: solid;
  transition: border 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-outlined-container-height, 40px);
  font-family: var(--mat-button-outlined-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-outlined-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-outlined-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-outlined-label-text-transform);
  font-weight: var(--mat-button-outlined-label-text-weight, var(--mat-sys-label-large-weight));
  border-radius: var(--mat-button-outlined-container-shape, var(--mat-sys-corner-full));
  border-width: var(--mat-button-outlined-outline-width, 1px);
  padding: 0 var(--mat-button-outlined-horizontal-padding, 24px);
}
.mat-mdc-outlined-button > .mat-icon {
  margin-right: var(--mat-button-outlined-icon-spacing, 8px);
  margin-left: var(--mat-button-outlined-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-outlined-button > .mat-icon {
  margin-right: var(--mat-button-outlined-icon-offset, -8px);
  margin-left: var(--mat-button-outlined-icon-spacing, 8px);
}
.mat-mdc-outlined-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-outlined-icon-offset, -8px);
  margin-left: var(--mat-button-outlined-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-outlined-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-outlined-icon-spacing, 8px);
  margin-left: var(--mat-button-outlined-icon-offset, -8px);
}
.mat-mdc-outlined-button .mat-ripple-element {
  background-color: var(--mat-button-outlined-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-outlined-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-outlined-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-outlined-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-outlined-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-outlined-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-outlined-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-outlined-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-outlined-touch-target-size, 48px);
  display: var(--mat-button-outlined-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-outlined-button:not(:disabled) {
  color: var(--mat-button-outlined-label-text-color, var(--mat-sys-primary));
  border-color: var(--mat-button-outlined-outline-color, var(--mat-sys-outline));
}
.mat-mdc-outlined-button[disabled], .mat-mdc-outlined-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-outlined-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  border-color: var(--mat-button-outlined-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-outlined-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-tonal-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-tonal-container-height, 40px);
  font-family: var(--mat-button-tonal-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-tonal-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-tonal-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-tonal-label-text-transform);
  font-weight: var(--mat-button-tonal-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-tonal-horizontal-padding, 24px);
}
.mat-tonal-button:not(:disabled) {
  color: var(--mat-button-tonal-label-text-color, var(--mat-sys-on-secondary-container));
  background-color: var(--mat-button-tonal-container-color, var(--mat-sys-secondary-container));
}
.mat-tonal-button, .mat-tonal-button .mdc-button__ripple {
  border-radius: var(--mat-button-tonal-container-shape, var(--mat-sys-corner-full));
}
.mat-tonal-button[disabled], .mat-tonal-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-tonal-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-tonal-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-tonal-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-tonal-button > .mat-icon {
  margin-right: var(--mat-button-tonal-icon-spacing, 8px);
  margin-left: var(--mat-button-tonal-icon-offset, -8px);
}
[dir=rtl] .mat-tonal-button > .mat-icon {
  margin-right: var(--mat-button-tonal-icon-offset, -8px);
  margin-left: var(--mat-button-tonal-icon-spacing, 8px);
}
.mat-tonal-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-tonal-icon-offset, -8px);
  margin-left: var(--mat-button-tonal-icon-spacing, 8px);
}
[dir=rtl] .mat-tonal-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-tonal-icon-spacing, 8px);
  margin-left: var(--mat-button-tonal-icon-offset, -8px);
}
.mat-tonal-button .mat-ripple-element {
  background-color: var(--mat-button-tonal-ripple-color, color-mix(in srgb, var(--mat-sys-on-secondary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-tonal-state-layer-color, var(--mat-sys-on-secondary-container));
}
.mat-tonal-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-tonal-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-tonal-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-tonal-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-tonal-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-tonal-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-tonal-touch-target-size, 48px);
  display: var(--mat-button-tonal-touch-target-display, block);
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
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);
}

.mat-mdc-outlined-button .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 3px) * -1);
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
`],encapsulation:2})}return e})();function uM(e){return e.hasAttribute("mat-raised-button")?"elevated":e.hasAttribute("mat-stroked-button")?"outlined":e.hasAttribute("mat-flat-button")?"filled":e.hasAttribute("mat-button")?"text":null}var n_=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=X({type:e});static \u0275inj=Y({imports:[Jb,Ye]})}return e})();var hM=["*"];var mM=new b("MAT_CARD_CONFIG"),r_=(()=>{class e{appearance;constructor(){let t=f(mM,{optional:!0});this.appearance=t?.appearance||"raised"}static \u0275fac=function(r){return new(r||e)};static \u0275cmp=W({type:e,selectors:[["mat-card"]],hostAttrs:[1,"mat-mdc-card","mdc-card"],hostVars:8,hostBindings:function(r,i){r&2&&U("mat-mdc-card-outlined",i.appearance==="outlined")("mdc-card--outlined",i.appearance==="outlined")("mat-mdc-card-filled",i.appearance==="filled")("mdc-card--filled",i.appearance==="filled")},inputs:{appearance:"appearance"},exportAs:["matCard"],ngContentSelectors:hM,decls:1,vars:0,template:function(r,i){r&1&&(Ue(),ee(0))},styles:[`.mat-mdc-card {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
  border-style: solid;
  border-width: 0;
  background-color: var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));
  border-color: var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));
  border-radius: var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium));
  box-shadow: var(--mat-card-elevated-container-elevation, var(--mat-sys-level1));
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
  border-radius: var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium));
}

.mat-mdc-card-outlined {
  background-color: var(--mat-card-outlined-container-color, var(--mat-sys-surface));
  border-radius: var(--mat-card-outlined-container-shape, var(--mat-sys-corner-medium));
  border-width: var(--mat-card-outlined-outline-width, 1px);
  border-color: var(--mat-card-outlined-outline-color, var(--mat-sys-outline-variant));
  box-shadow: var(--mat-card-outlined-container-elevation, var(--mat-sys-level0));
}
.mat-mdc-card-outlined::after {
  border: none;
}

.mat-mdc-card-filled {
  background-color: var(--mat-card-filled-container-color, var(--mat-sys-surface-container-highest));
  border-radius: var(--mat-card-filled-container-shape, var(--mat-sys-corner-medium));
  box-shadow: var(--mat-card-filled-container-elevation, var(--mat-sys-level0));
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
  font-family: var(--mat-card-title-text-font, var(--mat-sys-title-large-font));
  line-height: var(--mat-card-title-text-line-height, var(--mat-sys-title-large-line-height));
  font-size: var(--mat-card-title-text-size, var(--mat-sys-title-large-size));
  letter-spacing: var(--mat-card-title-text-tracking, var(--mat-sys-title-large-tracking));
  font-weight: var(--mat-card-title-text-weight, var(--mat-sys-title-large-weight));
}

.mat-mdc-card-subtitle {
  color: var(--mat-card-subtitle-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-card-subtitle-text-font, var(--mat-sys-title-medium-font));
  line-height: var(--mat-card-subtitle-text-line-height, var(--mat-sys-title-medium-line-height));
  font-size: var(--mat-card-subtitle-text-size, var(--mat-sys-title-medium-size));
  letter-spacing: var(--mat-card-subtitle-text-tracking, var(--mat-sys-title-medium-tracking));
  font-weight: var(--mat-card-subtitle-text-weight, var(--mat-sys-title-medium-weight));
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
`],encapsulation:2})}return e})();var i_=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=X({type:e});static \u0275inj=Y({imports:[Ye]})}return e})();var o_=(()=>{class e{get vertical(){return this._vertical}set vertical(t){this._vertical=ln(t)}_vertical=!1;get inset(){return this._inset}set inset(t){this._inset=ln(t)}_inset=!1;static \u0275fac=function(r){return new(r||e)};static \u0275cmp=W({type:e,selectors:[["mat-divider"]],hostAttrs:["role","separator",1,"mat-divider"],hostVars:7,hostBindings:function(r,i){r&2&&(Re("aria-orientation",i.vertical?"vertical":"horizontal"),U("mat-divider-vertical",i.vertical)("mat-divider-horizontal",!i.vertical)("mat-divider-inset",i.inset))},inputs:{vertical:"vertical",inset:"inset"},decls:0,vars:0,template:function(r,i){},styles:[`.mat-divider {
  display: block;
  margin: 0;
  border-top-style: solid;
  border-top-color: var(--mat-divider-color, var(--mat-sys-outline-variant));
  border-top-width: var(--mat-divider-width, 1px);
}
.mat-divider.mat-divider-vertical {
  border-top: 0;
  border-right-style: solid;
  border-right-color: var(--mat-divider-color, var(--mat-sys-outline-variant));
  border-right-width: var(--mat-divider-width, 1px);
}
.mat-divider.mat-divider-inset {
  margin-left: 80px;
}
[dir=rtl] .mat-divider.mat-divider-inset {
  margin-left: auto;
  margin-right: 80px;
}
`],encapsulation:2})}return e})(),s_=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=X({type:e});static \u0275inj=Y({imports:[Ye]})}return e})();var vM=["*"],a_=(()=>{class e{labelPosition="after";static \u0275fac=function(r){return new(r||e)};static \u0275cmp=W({type:e,selectors:[["div","mat-internal-form-field",""]],hostAttrs:[1,"mdc-form-field","mat-internal-form-field"],hostVars:2,hostBindings:function(r,i){r&2&&U("mdc-form-field--align-end",i.labelPosition==="before")},inputs:{labelPosition:"labelPosition"},ngContentSelectors:vM,decls:1,vars:0,template:function(r,i){r&1&&(Ue(),ee(0))},styles:[`.mat-internal-form-field {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
}
.mat-internal-form-field > label {
  margin-left: 0;
  margin-right: auto;
  padding-left: 4px;
  padding-right: 0;
  order: 0;
}
[dir=rtl] .mat-internal-form-field > label {
  margin-left: auto;
  margin-right: 0;
  padding-left: 0;
  padding-right: 4px;
}

.mdc-form-field--align-end > label {
  margin-left: auto;
  margin-right: 0;
  padding-left: 0;
  padding-right: 4px;
  order: -1;
}
[dir=rtl] .mdc-form-field--align-end .mdc-form-field--align-end label {
  margin-left: 0;
  margin-right: auto;
  padding-left: 4px;
  padding-right: 0;
}
`],encapsulation:2})}return e})();var yM=["switch"],bM=["*"];function _M(e,n){e&1&&(g(0,"span",11),ea(),g(1,"svg",13),O(2,"path",14),v(),g(3,"svg",15),O(4,"path",16),v()())}var DM=new b("mat-slide-toggle-default-options",{providedIn:"root",factory:()=>({disableToggleValue:!1,hideIcon:!1,disabledInteractive:!1})}),Gl=class{source;checked;constructor(n,t){this.source=n,this.checked=t}},dh=(()=>{class e{_elementRef=f(G);_focusMonitor=f(Fo);_changeDetectorRef=f(Nn);defaults=f(DM);_onChange=t=>{};_onTouched=()=>{};_validatorOnChange=()=>{};_uniqueId;_checked=!1;_createChangeEvent(t){return new Gl(this,t)}_labelId;get buttonId(){return`${this.id||this._uniqueId}-button`}_switchElement;focus(){this._switchElement.nativeElement.focus()}_noopAnimations=zt();_focused=!1;name=null;id;labelPosition="after";ariaLabel=null;ariaLabelledby=null;ariaDescribedby;required=!1;color;disabled=!1;disableRipple=!1;tabIndex=0;get checked(){return this._checked}set checked(t){this._checked=t,this._changeDetectorRef.markForCheck()}hideIcon;disabledInteractive;change=new de;toggleChange=new de;get inputId(){return`${this.id||this._uniqueId}-input`}constructor(){f(yt).load($l);let t=f(new ui("tabindex"),{optional:!0}),r=this.defaults;this.tabIndex=t==null?0:parseInt(t)||0,this.color=r.color||"accent",this.id=this._uniqueId=f(bt).getId("mat-mdc-slide-toggle-"),this.hideIcon=r.hideIcon??!1,this.disabledInteractive=r.disabledInteractive??!1,this._labelId=this._uniqueId+"-label"}ngAfterContentInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(t=>{t==="keyboard"||t==="program"?(this._focused=!0,this._changeDetectorRef.markForCheck()):t||Promise.resolve().then(()=>{this._focused=!1,this._onTouched(),this._changeDetectorRef.markForCheck()})})}ngOnChanges(t){t.required&&this._validatorOnChange()}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}writeValue(t){this.checked=!!t}registerOnChange(t){this._onChange=t}registerOnTouched(t){this._onTouched=t}validate(t){return this.required&&t.value!==!0?{required:!0}:null}registerOnValidatorChange(t){this._validatorOnChange=t}setDisabledState(t){this.disabled=t,this._changeDetectorRef.markForCheck()}toggle(){this.checked=!this.checked,this._onChange(this.checked)}_emitChangeEvent(){this._onChange(this.checked),this.change.emit(this._createChangeEvent(this.checked))}_handleClick(){this.disabled||(this.toggleChange.emit(),this.defaults.disableToggleValue||(this.checked=!this.checked,this._onChange(this.checked),this.change.emit(new Gl(this,this.checked))))}_getAriaLabelledBy(){return this.ariaLabelledby?this.ariaLabelledby:this.ariaLabel?null:this._labelId}static \u0275fac=function(r){return new(r||e)};static \u0275cmp=W({type:e,selectors:[["mat-slide-toggle"]],viewQuery:function(r,i){if(r&1&&Bt(yM,5),r&2){let o;xe(o=Ie())&&(i._switchElement=o.first)}},hostAttrs:[1,"mat-mdc-slide-toggle"],hostVars:13,hostBindings:function(r,i){r&2&&(An("id",i.id),Re("tabindex",null)("aria-label",null)("name",null)("aria-labelledby",null),Dr(i.color?"mat-"+i.color:""),U("mat-mdc-slide-toggle-focused",i._focused)("mat-mdc-slide-toggle-checked",i.checked)("_mat-animation-noopable",i._noopAnimations))},inputs:{name:"name",id:"id",labelPosition:"labelPosition",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],required:[2,"required","required",we],color:"color",disabled:[2,"disabled","disabled",we],disableRipple:[2,"disableRipple","disableRipple",we],tabIndex:[2,"tabIndex","tabIndex",t=>t==null?0:Qa(t)],checked:[2,"checked","checked",we],hideIcon:[2,"hideIcon","hideIcon",we],disabledInteractive:[2,"disabledInteractive","disabledInteractive",we]},outputs:{change:"change",toggleChange:"toggleChange"},exportAs:["matSlideToggle"],features:[De([{provide:Ut,useExisting:Fe(()=>e),multi:!0},{provide:bi,useExisting:e,multi:!0}]),rt],ngContentSelectors:bM,decls:14,vars:27,consts:[["switch",""],["mat-internal-form-field","",3,"labelPosition"],["role","switch","type","button",1,"mdc-switch",3,"click","tabIndex","disabled"],[1,"mat-mdc-slide-toggle-touch-target"],[1,"mdc-switch__track"],[1,"mdc-switch__handle-track"],[1,"mdc-switch__handle"],[1,"mdc-switch__shadow"],[1,"mdc-elevation-overlay"],[1,"mdc-switch__ripple"],["mat-ripple","",1,"mat-mdc-slide-toggle-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mdc-switch__icons"],[1,"mdc-label",3,"click","for"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--on"],["d","M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--off"],["d","M20 13H4v-2h16v2z"]],template:function(r,i){if(r&1&&(Ue(),g(0,"div",1)(1,"button",2,0),le("click",function(){return i._handleClick()}),O(3,"div",3)(4,"span",4),g(5,"span",5)(6,"span",6)(7,"span",7),O(8,"span",8),v(),g(9,"span",9),O(10,"span",10),v(),he(11,_M,5,0,"span",11),v()()(),g(12,"label",12),le("click",function(s){return s.stopPropagation()}),ee(13),v()()),r&2){let o=ci(2);T("labelPosition",i.labelPosition),y(),U("mdc-switch--selected",i.checked)("mdc-switch--unselected",!i.checked)("mdc-switch--checked",i.checked)("mdc-switch--disabled",i.disabled)("mat-mdc-slide-toggle-disabled-interactive",i.disabledInteractive),T("tabIndex",i.disabled&&!i.disabledInteractive?-1:i.tabIndex)("disabled",i.disabled&&!i.disabledInteractive),Re("id",i.buttonId)("name",i.name)("aria-label",i.ariaLabel)("aria-labelledby",i._getAriaLabelledBy())("aria-describedby",i.ariaDescribedby)("aria-required",i.required||null)("aria-checked",i.checked)("aria-disabled",i.disabled&&i.disabledInteractive?"true":null),y(9),T("matRippleTrigger",o)("matRippleDisabled",i.disableRipple||i.disabled)("matRippleCentered",!0),y(),me(i.hideIcon?-1:11),y(),T("for",i.buttonId),Re("id",i._labelId)}},dependencies:[Zb,a_],styles:[`.mdc-switch {
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
  width: var(--mat-slide-toggle-track-width, 52px);
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
  height: var(--mat-slide-toggle-track-height, 32px);
  border-radius: var(--mat-slide-toggle-track-shape, var(--mat-sys-corner-full));
}
.mdc-switch--disabled.mdc-switch .mdc-switch__track {
  opacity: var(--mat-slide-toggle-disabled-track-opacity, 0.12);
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
  border-width: var(--mat-slide-toggle-track-outline-width, 2px);
  border-color: var(--mat-slide-toggle-track-outline-color, var(--mat-sys-outline));
}
.mdc-switch--selected .mdc-switch__track::before, .mdc-switch--selected .mdc-switch__track::after {
  border-width: var(--mat-slide-toggle-selected-track-outline-width, 2px);
  border-color: var(--mat-slide-toggle-selected-track-outline-color, transparent);
}
.mdc-switch--disabled .mdc-switch__track::before, .mdc-switch--disabled .mdc-switch__track::after {
  border-width: var(--mat-slide-toggle-disabled-unselected-track-outline-width, 2px);
  border-color: var(--mat-slide-toggle-disabled-unselected-track-outline-color, var(--mat-sys-on-surface));
}
@media (forced-colors: active) {
  .mdc-switch__track {
    border-color: currentColor;
  }
}
.mdc-switch__track::before {
  transition: transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);
  transform: translateX(0);
  background: var(--mat-slide-toggle-unselected-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch--selected .mdc-switch__track::before {
  transition: transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  transform: translateX(100%);
}
[dir=rtl] .mdc-switch--selected .mdc-switch--selected .mdc-switch__track::before {
  transform: translateX(-100%);
}
.mdc-switch--selected .mdc-switch__track::before {
  opacity: var(--mat-slide-toggle-hidden-track-opacity, 0);
  transition: var(--mat-slide-toggle-hidden-track-transition, opacity 75ms);
}
.mdc-switch--unselected .mdc-switch__track::before {
  opacity: var(--mat-slide-toggle-visible-track-opacity, 1);
  transition: var(--mat-slide-toggle-visible-track-transition, opacity 75ms);
}
.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before {
  background: var(--mat-slide-toggle-unselected-hover-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before {
  background: var(--mat-slide-toggle-unselected-focus-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch:enabled:active .mdc-switch__track::before {
  background: var(--mat-slide-toggle-unselected-pressed-track-color, var(--mat-sys-surface-variant));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::before, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::before, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::before, .mdc-switch.mdc-switch--disabled .mdc-switch__track::before {
  background: var(--mat-slide-toggle-disabled-unselected-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch__track::after {
  transform: translateX(-100%);
  background: var(--mat-slide-toggle-selected-track-color, var(--mat-sys-primary));
}
[dir=rtl] .mdc-switch__track::after {
  transform: translateX(100%);
}
.mdc-switch--selected .mdc-switch__track::after {
  transform: translateX(0);
}
.mdc-switch--selected .mdc-switch__track::after {
  opacity: var(--mat-slide-toggle-visible-track-opacity, 1);
  transition: var(--mat-slide-toggle-visible-track-transition, opacity 75ms);
}
.mdc-switch--unselected .mdc-switch__track::after {
  opacity: var(--mat-slide-toggle-hidden-track-opacity, 0);
  transition: var(--mat-slide-toggle-hidden-track-transition, opacity 75ms);
}
.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after {
  background: var(--mat-slide-toggle-selected-hover-track-color, var(--mat-sys-primary));
}
.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after {
  background: var(--mat-slide-toggle-selected-focus-track-color, var(--mat-sys-primary));
}
.mdc-switch:enabled:active .mdc-switch__track::after {
  background: var(--mat-slide-toggle-selected-pressed-track-color, var(--mat-sys-primary));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::after, .mdc-switch.mdc-switch--disabled .mdc-switch__track::after {
  background: var(--mat-slide-toggle-disabled-selected-track-color, var(--mat-sys-on-surface));
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
  width: calc(100% - var(--mat-slide-toggle-handle-width));
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
  width: var(--mat-slide-toggle-handle-width);
  height: var(--mat-slide-toggle-handle-height);
  border-radius: var(--mat-slide-toggle-handle-shape, var(--mat-sys-corner-full));
}
[dir=rtl] .mdc-switch__handle {
  left: auto;
  right: 0;
}
.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle {
  width: var(--mat-slide-toggle-unselected-handle-size, 16px);
  height: var(--mat-slide-toggle-unselected-handle-size, 16px);
  margin: var(--mat-slide-toggle-unselected-handle-horizontal-margin, 0 8px);
}
.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle:has(.mdc-switch__icons) {
  margin: var(--mat-slide-toggle-unselected-with-icon-handle-horizontal-margin, 0 4px);
}
.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle {
  width: var(--mat-slide-toggle-selected-handle-size, 24px);
  height: var(--mat-slide-toggle-selected-handle-size, 24px);
  margin: var(--mat-slide-toggle-selected-handle-horizontal-margin, 0 24px);
}
.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle:has(.mdc-switch__icons) {
  margin: var(--mat-slide-toggle-selected-with-icon-handle-horizontal-margin, 0 24px);
}
.mat-mdc-slide-toggle .mdc-switch__handle:has(.mdc-switch__icons) {
  width: var(--mat-slide-toggle-with-icon-handle-size, 24px);
  height: var(--mat-slide-toggle-with-icon-handle-size, 24px);
}
.mat-mdc-slide-toggle .mdc-switch:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  width: var(--mat-slide-toggle-pressed-handle-size, 28px);
  height: var(--mat-slide-toggle-pressed-handle-size, 28px);
}
.mat-mdc-slide-toggle .mdc-switch--selected:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  margin: var(--mat-slide-toggle-selected-pressed-handle-horizontal-margin, 0 22px);
}
.mat-mdc-slide-toggle .mdc-switch--unselected:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  margin: var(--mat-slide-toggle-unselected-pressed-handle-horizontal-margin, 0 2px);
}
.mdc-switch--disabled.mdc-switch--selected .mdc-switch__handle::after {
  opacity: var(--mat-slide-toggle-disabled-selected-handle-opacity, 1);
}
.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__handle::after {
  opacity: var(--mat-slide-toggle-disabled-unselected-handle-opacity, 0.38);
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
.mdc-switch--selected:enabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-handle-color, var(--mat-sys-on-primary));
}
.mdc-switch--selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-hover-handle-color, var(--mat-sys-primary-container));
}
.mdc-switch--selected:enabled:focus:not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-focus-handle-color, var(--mat-sys-primary-container));
}
.mdc-switch--selected:enabled:active .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-pressed-handle-color, var(--mat-sys-primary-container));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:hover:not(:focus):not(:active) .mdc-switch__handle::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:focus:not(:active) .mdc-switch__handle::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:active .mdc-switch__handle::after, .mdc-switch--selected.mdc-switch--disabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-disabled-selected-handle-color, var(--mat-sys-surface));
}
.mdc-switch--unselected:enabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-handle-color, var(--mat-sys-outline));
}
.mdc-switch--unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-hover-handle-color, var(--mat-sys-on-surface-variant));
}
.mdc-switch--unselected:enabled:focus:not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-focus-handle-color, var(--mat-sys-on-surface-variant));
}
.mdc-switch--unselected:enabled:active .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-pressed-handle-color, var(--mat-sys-on-surface-variant));
}
.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-disabled-unselected-handle-color, var(--mat-sys-on-surface));
}
.mdc-switch__handle::before {
  background: var(--mat-slide-toggle-handle-surface-color);
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
  box-shadow: var(--mat-slide-toggle-handle-elevation-shadow);
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__shadow, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__shadow, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__shadow, .mdc-switch.mdc-switch--disabled .mdc-switch__shadow {
  box-shadow: var(--mat-slide-toggle-disabled-handle-elevation-shadow);
}

.mdc-switch__ripple {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  width: var(--mat-slide-toggle-state-layer-size, 40px);
  height: var(--mat-slide-toggle-state-layer-size, 40px);
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
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:focus .mdc-switch__ripple::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:active .mdc-switch__ripple::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:hover:not(:focus) .mdc-switch__ripple::after, .mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-slide-toggle-unselected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-unselected-focus-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-slide-toggle-unselected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mdc-switch--unselected:enabled:active .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-unselected-pressed-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-slide-toggle-unselected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  transition: opacity 75ms linear;
}
.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-selected-hover-state-layer-color, var(--mat-sys-primary));
  opacity: var(--mat-slide-toggle-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mdc-switch--selected:enabled:focus .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-selected-focus-state-layer-color, var(--mat-sys-primary));
  opacity: var(--mat-slide-toggle-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mdc-switch--selected:enabled:active .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-selected-pressed-state-layer-color, var(--mat-sys-primary));
  opacity: var(--mat-slide-toggle-selected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
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
  opacity: var(--mat-slide-toggle-disabled-unselected-icon-opacity, 0.38);
}
.mdc-switch--disabled.mdc-switch--selected .mdc-switch__icons {
  opacity: var(--mat-slide-toggle-disabled-selected-icon-opacity, 0.38);
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
  width: var(--mat-slide-toggle-unselected-icon-size, 16px);
  height: var(--mat-slide-toggle-unselected-icon-size, 16px);
  fill: var(--mat-slide-toggle-unselected-icon-color, var(--mat-sys-surface-variant));
}
.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__icon {
  fill: var(--mat-slide-toggle-disabled-unselected-icon-color, var(--mat-sys-surface-variant));
}
.mdc-switch--selected .mdc-switch__icon {
  width: var(--mat-slide-toggle-selected-icon-size, 16px);
  height: var(--mat-slide-toggle-selected-icon-size, 16px);
  fill: var(--mat-slide-toggle-selected-icon-color, var(--mat-sys-on-primary-container));
}
.mdc-switch--selected.mdc-switch--disabled .mdc-switch__icon {
  fill: var(--mat-slide-toggle-disabled-selected-icon-color, var(--mat-sys-on-surface));
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
  color: var(--mat-slide-toggle-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-slide-toggle-label-text-font, var(--mat-sys-body-medium-font));
  line-height: var(--mat-slide-toggle-label-text-line-height, var(--mat-sys-body-medium-line-height));
  font-size: var(--mat-slide-toggle-label-text-size, var(--mat-sys-body-medium-size));
  letter-spacing: var(--mat-slide-toggle-label-text-tracking, var(--mat-sys-body-medium-tracking));
  font-weight: var(--mat-slide-toggle-label-text-weight, var(--mat-sys-body-medium-weight));
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
  color: var(--mat-slide-toggle-disabled-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-slide-toggle label:empty {
  display: none;
}

.mat-mdc-slide-toggle-touch-target {
  position: absolute;
  top: 50%;
  left: 50%;
  height: var(--mat-slide-toggle-touch-target-size, 48px);
  width: 100%;
  transform: translate(-50%, -50%);
  display: var(--mat-slide-toggle-touch-target-display, block);
}
[dir=rtl] .mat-mdc-slide-toggle-touch-target {
  left: auto;
  right: 50%;
  transform: translate(50%, -50%);
}
`],encapsulation:2})}return e})(),l_=(()=>{class e{static \u0275fac=function(r){return new(r||e)};static \u0275mod=X({type:e});static \u0275inj=Y({imports:[dh,Ye]})}return e})();var c_=new b("ngx-mat-period-picker.locale-config");var wi=class e{defaultConfig;config;constructor(){let n=f(di,{optional:!0}),t=globalThis.$localize?.locale,r=n||t||"en-US";this.defaultConfig={locale:r,useConfiguredLocale:!0};let i=f(c_,{optional:!0});i?this.config=H(D(D({},this.defaultConfig),i),{locale:i.locale??this.defaultConfig.locale}):this.config=this.defaultConfig}setLocaleConfig(n){this.config=D(D({},this.defaultConfig),n)}getLocaleConfig(){return D({},this.config)}getLocale(){return this.config.locale}shouldUseConfiguredLocale(){return this.config.useConfiguredLocale}getEffectiveLocale(){return this.shouldUseConfiguredLocale()?this.getLocale():void 0}static \u0275fac=function(t){return new(t||e)};static \u0275prov=P({token:e,factory:e.\u0275fac,providedIn:"root"})};var Wl=class e{localeService=f(wi);getShortMonthLabels(){return Array.from({length:12},(n,t)=>new Date(2e3,t,1).toLocaleDateString(this.localeService.getEffectiveLocale(),{month:"short"}))}getShortMonthLabel(n){if(n<1||n>12)throw new Error("Month number must be between 1 and 12");return new Date(2e3,n-1,1).toLocaleDateString(this.localeService.getEffectiveLocale(),{month:"short"})}static \u0275fac=function(t){return new(t||e)};static \u0275prov=P({token:e,factory:e.\u0275fac,providedIn:"root"})};function EM(e,n){if(e&1){let t=li();g(0,"div",1)(1,"mat-slide-toggle",11),le("change",function(i){sr(t);let o=Le();return ar(o.togglePresent(i.checked))}),w(2),v()()}if(e&2){let t=Le();y(),T("checked",t.presentValue())("disabled",t.disabled()),y(),rn(" ",t.presentLabel()," ")}}function CM(e,n){if(e&1){let t=li();g(0,"button",12),le("click",function(){let i=sr(t).$implicit,o=Le();return ar(o.selectYear(i))}),w(1),v()}if(e&2){let t=n.$implicit,r=Le();T("matButton",r.presentValue()?"text":r.valueSignal()?.year===t?"outlined":"text")("disabled",r.disabled()||r.presentValue()),y(),rn(" ",t," ")}}function xM(e,n){if(e&1){let t=li();g(0,"button",12),le("click",function(){let i=sr(t).$index,o=Le();return ar(o.selectMonth(i+1))}),w(1),v()}if(e&2){let t=n.$implicit,r=n.$index,i=Le();T("matButton",i.presentValue()?"text":i.valueSignal()?.month===r+1?"outlined":"text")("disabled",i.valueSignal()?.year==null||i.presentValue()),y(),rn(" ",t," ")}}function IM(e,n){if(e&1){let t=li();g(0,"button",13),le("click",function(){sr(t);let i=Le();return ar(i.clear())}),w(1),v()}if(e&2){let t=Le();T("disabled",t.disabled()),y(),rn(" ",t.clearLabel()," ")}}function SM(e,n){e&1&&O(0,"div")}var Yl=class e{minYear=z();maxYear=z();disabled=z(!1);baseYear=z();_showPresentToggle=ne(!1);showPresentToggle=this._showPresentToggle.asReadonly();_presentLabel=ne("Present");presentLabel=this._presentLabel.asReadonly();_okLabel=ne("OK");okLabel=this._okLabel.asReadonly();_clearLabel=ne("Clear");clearLabel=this._clearLabel.asReadonly();yearsPerPage=12;currentStartYear=2e3;_baseYear=void 0;_presentValue=ne(!1);presentValue=this._presentValue.asReadonly();cancelClicked=fi();okClicked=fi();presentValueChange=fi();valueSignal=ne(null);originalValue=null;monthLabelService=f(Wl);constructor(){this.initializeCurrentStartYear()}initializeCurrentStartYear(){let n=this._baseYear||this.baseYear()||new Date().getFullYear();this.setCurrentStartYearForYear(n)}get months(){return this.monthLabelService.getShortMonthLabels()}get years(){let n=[];for(let t=0;t<this.yearsPerPage;t++)n.push(this.currentStartYear+t);return n}get rangeLabel(){return`${this.currentStartYear} - ${this.currentStartYear+this.yearsPerPage-1}`}canGoPrev(){return this.currentStartYear>(this.minYear()||1900)}canGoNext(){let n=this.maxYear()||2100;return this.currentStartYear+this.yearsPerPage<=n}prevRange(){this.canGoPrev()&&(this.currentStartYear-=this.yearsPerPage)}nextRange(){this.canGoNext()&&(this.currentStartYear+=this.yearsPerPage)}writeValue(n){this.valueSignal.set(n),this.originalValue=n,n?.year?this.setCurrentStartYearForYear(n.year):this.initializeCurrentStartYear()}setCurrentStartYearForYear(n){let r=this.minYear()||1900;for(;r+this.yearsPerPage<=n;)r+=this.yearsPerPage;let i=this.maxYear()||2100;r+this.yearsPerPage<=i&&(this.currentStartYear=r)}onChange=()=>{};onTouched=()=>{};registerOnChange(n){this.onChange=n}registerOnTouched(n){this.onTouched=n}selectYear(n){if(this.presentValue())return;this.valueSignal()?.year===n?this.valueSignal.set(null):(this.valueSignal.set({year:n,month:null}),this.setCurrentStartYearForYear(n)),this.onChange(this.valueSignal()),this.onTouched()}selectMonth(n){if(this.presentValue())return;let t=this.valueSignal();t?.year&&(t.month===n?this.valueSignal.set({year:t.year,month:null}):this.valueSignal.set(H(D({},t),{month:n})),this.onChange(this.valueSignal()),this.onTouched())}getCurrentValue(){return this.valueSignal()}togglePresent(n){this._presentValue.set(n),this.presentValueChange.emit(n),n&&(this.valueSignal.set(null),this.onChange(null),this.onTouched())}setPresentValue(n){this._presentValue.set(n)}setShowPresentToggle(n){this._showPresentToggle.set(n)}setBaseYear(n){this._baseYear=n,this.initializeCurrentStartYear()}setPresentLabel(n){this._presentLabel.set(n)}setOkLabel(n){this._okLabel.set(n)}setClearLabel(n){this._clearLabel.set(n)}hasValidSelection(){let n=this.valueSignal();return!!(n&&n.year)||this.presentValue()}hasValue(){let n=this.valueSignal();return!!(n&&n.year)||this.presentValue()}hasChanges(){let n=this.valueSignal(),t=this.originalValue;return!n&&!t?!1:!n||!t?!0:n.year!==t.year||n.month!==t.month}clear(){this.valueSignal.set(null),this._presentValue.set(!1),this.presentValueChange.emit(!1),this.onChange(null),this.onTouched(),this.cancelClicked.emit()}ok(){let n=this.valueSignal();(n&&n.year||this.presentValue())&&this.okClicked.emit()}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=W({type:e,selectors:[["ngx-mat-year-month-picker-dialog"]],inputs:{minYear:[1,"minYear"],maxYear:[1,"maxYear"],disabled:[1,"disabled"],baseYear:[1,"baseYear"]},outputs:{cancelClicked:"cancelClicked",okClicked:"okClicked",presentValueChange:"presentValueChange"},features:[De([{provide:Ut,useExisting:Fe(()=>e),multi:!0}])],decls:25,vars:9,consts:[[1,"ymp-card"],[1,"ymp-present-toggle"],[1,"ymp-header"],["matIconButton","",3,"click","disabled"],[1,"ymp-range"],[1,"ymp-years"],[1,"ymp-button",3,"matButton","disabled"],[1,"ymp-months"],[1,"ymp-actions"],["matButton","text",3,"disabled"],["matButton","filled",3,"click","disabled"],[3,"change","checked","disabled"],[1,"ymp-button",3,"click","matButton","disabled"],["matButton","text",3,"click","disabled"]],template:function(t,r){t&1&&(g(0,"mat-card",0),he(1,EM,3,3,"div",1),g(2,"div",2)(3,"button",3),le("click",function(){return r.prevRange()}),g(4,"mat-icon"),w(5,"chevron_left"),v()(),g(6,"span",4),w(7),v(),g(8,"button",3),le("click",function(){return r.nextRange()}),g(9,"mat-icon"),w(10,"chevron_right"),v()()(),O(11,"mat-divider"),g(12,"div",5),Ua(13,CM,2,3,"button",6,Ha),v(),O(15,"mat-divider"),g(16,"div",7),Ua(17,xM,2,3,"button",6,Ha),v(),O(19,"mat-divider"),g(20,"div",8),he(21,IM,2,2,"button",9)(22,SM,1,0,"div"),g(23,"button",10),le("click",function(){return r.ok()}),w(24),v()()()),t&2&&(y(),me(r.showPresentToggle()?1:-1),y(2),T("disabled",!r.canGoPrev()||r.presentValue()),y(3),U("ymp-range-disabled",r.presentValue()),y(),ie(r.rangeLabel),y(),T("disabled",!r.canGoNext()||r.presentValue()),y(5),za(r.years),y(4),za(r.months),y(4),me(r.hasValue()?21:22),y(2),T("disabled",r.disabled()||!r.hasValidSelection()),y(),rn(" ",r.okLabel()," "))},dependencies:[Ht,n_,t_,ch,i_,r_,fl,ul,s_,o_,l_,dh],styles:[".ymp-card[_ngcontent-%COMP%]{padding:16px;max-width:320px;margin:0 auto;background:var( --mat-year-month-picker-card-background-color, var(--mat-sys-surface-container-high) );box-shadow:0 2px 8px #0000000a;animation:_ngcontent-%COMP%_slideInOut .2s cubic-bezier(.25,.8,.25,1) forwards}@keyframes _ngcontent-%COMP%_slideInOut{0%{transform:scale(.8);opacity:0}to{transform:scale(1);opacity:1}}.ymp-header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}.ymp-range[_ngcontent-%COMP%]{font-weight:600;font-size:var(--mat-sys-title-small-size);letter-spacing:1px}.ymp-range-disabled[_ngcontent-%COMP%]{opacity:.5}.ymp-years[_ngcontent-%COMP%], .ymp-months[_ngcontent-%COMP%]{display:grid;gap:4px;margin:8px 0}.ymp-years[_ngcontent-%COMP%], .ymp-months[_ngcontent-%COMP%]{grid-template-columns:repeat(4,1fr)}.mdc-button.ymp-button[_ngcontent-%COMP%]{--mat-button-outlined-horizontal-padding: 6px;--mat-button-filled-horizontal-padding: 6px;--mat-button-text-horizontal-padding: 6px}.ymp-present-toggle[_ngcontent-%COMP%]{padding:8px 0 16px;display:flex;justify-content:center}.ymp-present-toggle[_ngcontent-%COMP%]   .mat-slide-toggle[_ngcontent-%COMP%]{transform:scale(.8);margin:0}.ymp-actions[_ngcontent-%COMP%]{display:flex;justify-content:space-between;padding:8px 0 0;gap:8px}"]})};var ql=class e{localeService=f(wi);formatYearMonth(n){return!n||!n.year?"":n.month?new Date(n.year,n.month-1,1).toLocaleDateString(this.localeService.getEffectiveLocale(),{year:"numeric",month:"long"}):`${n.year}`}formatYearMonthDisplay(n,t){if(t<1||t>12)throw new Error("Month number must be between 1 and 12");return new Date(n,t-1,1).toLocaleDateString(this.localeService.getEffectiveLocale(),{year:"numeric",month:"long"})}formatYearDisplay(n){return n.toString()}static \u0275fac=function(t){return new(t||e)};static \u0275prov=P({token:e,factory:e.\u0275fac,providedIn:"root"})};var MM=["fieldRef"],Ei=class e{fieldRef;label=z("Select Year/Month");placeholder=z("Click to select");minYear=z();maxYear=z();baseYear=z();disabled=z(!1);presentLabel=z("Present");presentValue=z(!1);showPresentToggle=z(!1);presentValueChange=fi();okLabel=z("OK");clearLabel=z("Clear");width=z("200px");fullWidth=z(!0);computedFullWidth=ze(()=>this.width()==="200px"?this.fullWidth():!1);valueSignal=ne(null);overlayRef=null;overlay=f(nh);displayFormatService=f(ql);getDisplayValue(n){return this.presentValue()?this.presentLabel():this.displayFormatService.formatYearMonth(n)}openPicker(n){if(this.disabled())return;this.closePicker();let t=n.currentTarget;if(!t)return;let i=t.querySelector(".mat-mdc-text-field-wrapper")||t,o=this.overlay.position().flexibleConnectedTo(i).withPositions([{originX:"start",originY:"bottom",overlayX:"start",overlayY:"top",offsetY:8},{originX:"start",originY:"top",overlayX:"start",overlayY:"bottom",offsetY:-8}]);this.overlayRef=this.overlay.create({positionStrategy:o,scrollStrategy:this.overlay.scrollStrategies.reposition(),hasBackdrop:!0,backdropClass:"cdk-overlay-transparent-backdrop"});let s=new Bo(Yl),a=this.overlayRef.attach(s);a.instance.writeValue(this.valueSignal()),a.instance.setPresentLabel(this.presentLabel()),a.instance.setPresentValue(this.presentValue()),a.instance.setShowPresentToggle(this.showPresentToggle()),a.instance.setOkLabel(this.okLabel()),a.instance.setClearLabel(this.clearLabel()),this.baseYear()!==void 0&&a.instance.setBaseYear(this.baseYear()),a.instance.registerOnChange(l=>{let c=this.valueSignal();JSON.stringify(c)!==JSON.stringify(l)&&(this.valueSignal.set(l),this.onChange(l),this.onTouched())}),a.instance.presentValueChange.subscribe(l=>{this.presentValueChange.emit(l),this.onTouched(),l&&(this.valueSignal.set(null),this.onChange(null))}),a.instance.cancelClicked.subscribe(()=>{this.closePicker()}),a.instance.okClicked.subscribe(()=>{let l=a.instance.getCurrentValue();if(l&&l.year){let c=this.valueSignal();JSON.stringify(c)!==JSON.stringify(l)&&(this.valueSignal.set(l),this.onChange(l),this.onTouched())}this.closePicker()}),this.overlayRef.backdropClick().subscribe(()=>{this.closePicker()}),this.overlayRef.keydownEvents().subscribe(l=>{l.key==="Escape"&&this.closePicker()})}closePicker(){this.overlayRef&&(this.overlayRef.dispose(),this.overlayRef=null)}writeValue(n){this.valueSignal.set(n)}onChange=()=>{};onTouched=()=>{};registerOnChange(n){this.onChange=n}registerOnTouched(n){this.onTouched=n}setDisabledState(n){}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=W({type:e,selectors:[["ngx-mat-year-month-picker"]],viewQuery:function(t,r){if(t&1&&Bt(MM,7),t&2){let i;xe(i=Ie())&&(r.fieldRef=i.first)}},inputs:{label:[1,"label"],placeholder:[1,"placeholder"],minYear:[1,"minYear"],maxYear:[1,"maxYear"],baseYear:[1,"baseYear"],disabled:[1,"disabled"],presentLabel:[1,"presentLabel"],presentValue:[1,"presentValue"],showPresentToggle:[1,"showPresentToggle"],okLabel:[1,"okLabel"],clearLabel:[1,"clearLabel"],width:[1,"width"],fullWidth:[1,"fullWidth"]},outputs:{presentValueChange:"presentValueChange"},features:[De([{provide:Ut,useExisting:Fe(()=>e),multi:!0}])],decls:7,vars:7,consts:[["fieldRef",""],["appearance","outline",1,"year-month-field",3,"click"],["matInput","","readonly","",3,"value","placeholder"],["matSuffix","","aria-hidden","true",1,"calendar-icon"]],template:function(t,r){t&1&&(g(0,"mat-form-field",1,0),le("click",function(o){return r.openPicker(o)}),g(2,"mat-label"),w(3),v(),O(4,"input",2),g(5,"mat-icon",3),w(6,"calendar_today"),v()()),t&2&&(_r("width",r.computedFullWidth()?"100%":typeof r.width()=="number"?r.width()+"px":r.width()),U("full-width",r.computedFullWidth()),y(3),ie(r.label()),y(),T("value",r.getDisplayValue(r.valueSignal()))("placeholder",r.placeholder()))},dependencies:[Ht,Lo,Nl,Po,Yf,Eb,wb,fl,ul],styles:[".year-month-field[_ngcontent-%COMP%]{min-width:200px}.year-month-field.full-width[_ngcontent-%COMP%]{width:100%!important;min-width:unset}.calendar-icon[_ngcontent-%COMP%]{pointer-events:none}"]})};var Zl=class e{startLabel=z("Start Period");endLabel=z("End Period");presentLabel=z("Present");startPlaceholder=z("Select start period");endPlaceholder=z("Select end period");presentPlaceholder=z("Present");okLabel=z("OK");clearLabel=z("Clear");baseYearStart=z();baseYearEnd=z();showPresentToggle=z(!0);width=z("auto");fullWidth=z(!0);fieldWidth=z("200px");fieldFullWidth=z(!0);computedFullWidth=ze(()=>this.width()==="auto"?this.fullWidth():!1);form;valueSignal=ne(null);constructor(){this.form=new Pn({start:new se(null),end:new se(null),present:new se(!1)}),this.form.valueChanges.subscribe(()=>{let n=this.form.value,t={start:n.start,end:n.present?null:n.end,isPresent:n.present},r=this.valueSignal();JSON.stringify(r)!==JSON.stringify(t)&&(this.valueSignal.set(t),this.onChange(t),this.onTouched())}),this.form.get("present").valueChanges.subscribe(n=>{let t=this.form.get("end");n?(t?.disable({emitEvent:!1}),t?.setValue(null,{emitEvent:!1})):t?.enable({emitEvent:!1})})}writeValue(n){n?this.form.patchValue({start:n.start,end:n.isPresent?null:n.end,present:n.isPresent},{emitEvent:!1}):this.form.reset({start:null,end:null,present:!1},{emitEvent:!1})}onChange=()=>{};onTouched=()=>{};registerOnChange(n){this.onChange=n}registerOnTouched(n){this.onTouched=n}setDisabledState(n){n?this.form.disable({emitEvent:!1}):this.form.enable({emitEvent:!1})}onPresentValueChange(n){this.form.get("present")?.setValue(n,{emitEvent:!1})}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=W({type:e,selectors:[["ngx-mat-period-picker"]],inputs:{startLabel:[1,"startLabel"],endLabel:[1,"endLabel"],presentLabel:[1,"presentLabel"],startPlaceholder:[1,"startPlaceholder"],endPlaceholder:[1,"endPlaceholder"],presentPlaceholder:[1,"presentPlaceholder"],okLabel:[1,"okLabel"],clearLabel:[1,"clearLabel"],baseYearStart:[1,"baseYearStart"],baseYearEnd:[1,"baseYearEnd"],showPresentToggle:[1,"showPresentToggle"],width:[1,"width"],fullWidth:[1,"fullWidth"],fieldWidth:[1,"fieldWidth"],fieldFullWidth:[1,"fieldFullWidth"]},features:[De([{provide:Ut,useExisting:Fe(()=>e),multi:!0}])],decls:4,vars:25,consts:[[1,"period-picker-container",3,"formGroup"],[1,"period-fields"],["formControlName","start",3,"label","placeholder","presentLabel","presentValue","showPresentToggle","baseYear","width","fullWidth","okLabel","clearLabel"],["formControlName","end",3,"presentValueChange","label","placeholder","presentLabel","presentValue","baseYear","showPresentToggle","width","fullWidth","okLabel","clearLabel"]],template:function(t,r){t&1&&(g(0,"div",0)(1,"div",1),O(2,"ngx-mat-year-month-picker",2),ue(),g(3,"ngx-mat-year-month-picker",3),le("presentValueChange",function(o){return r.onPresentValueChange(o)}),v(),ue(),v()()),t&2&&(_r("width",r.computedFullWidth()?"100%":typeof r.width()=="number"?r.width()+"px":r.width()),U("full-width",r.computedFullWidth()),T("formGroup",r.form),y(2),T("label",r.startLabel())("placeholder",r.startPlaceholder())("presentLabel",r.presentLabel())("presentValue",!1)("showPresentToggle",!1)("baseYear",r.baseYearStart())("width",r.fieldWidth())("fullWidth",r.fieldFullWidth())("okLabel",r.okLabel())("clearLabel",r.clearLabel()),fe(),y(),T("label",r.endLabel())("placeholder",r.form.get("present")?.value?r.presentPlaceholder():r.endPlaceholder())("presentLabel",r.presentLabel())("presentValue",r.form.get("present")?.value)("baseYear",r.baseYearEnd())("showPresentToggle",r.showPresentToggle())("width",r.fieldWidth())("fullWidth",r.fieldFullWidth())("okLabel",r.okLabel())("clearLabel",r.clearLabel()),fe())},dependencies:[Ht,Uy,Il,Sl,Ml,Er,Ao,Ei],styles:[".period-picker-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:1rem}.period-picker-container.full-width[_ngcontent-%COMP%]{width:100%!important}.period-fields[_ngcontent-%COMP%]{display:flex;gap:1rem;flex-wrap:wrap}.period-fields[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{flex:1;min-width:100px}@media(max-width:768px){.period-fields[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{flex:1 1 100%}}"]})};var Xl=class e{form=new Pn({yearMonth:new se(null),yearMonthField:new se(null),period:new se(null),customPeriod:new se(null),educationPeriod:new se(null),germanPeriod:new se(null),spanishPeriod:new se(null),completePeriod:new se({start:{year:2020,month:3},end:{year:2023,month:12},isPresent:!1}),currentPeriod:new se({start:{year:2022,month:6},end:null,isPresent:!0}),yearOnlyPeriod:new se({start:{year:2018,month:null},end:{year:2022,month:null},isPresent:!1}),mixedPeriod:new se({start:{year:2021,month:9},end:{year:2024,month:null},isPresent:!1}),baseYear2010:new se(null),baseYear2035:new se(null),differentBaseYears:new se(null),singleBaseYear1995:new se(null),frenchField:new se(null),customWidthField:new se(null),fullWidthField:new se(null),fixedWidthFlex:new se(null),fullWidthEqual:new se(null),fixedWidthOverride:new se(null)});static \u0275fac=function(t){return new(t||e)};static \u0275cmp=W({type:e,selectors:[["app-root"]],decls:143,vars:93,consts:[[1,"locale-info"],[3,"formGroup"],["formControlName","yearMonth",3,"width"],["formControlName","yearMonthField",3,"width"],["formControlName","period",3,"width"],["formControlName","customPeriod","startLabel","Employment Start","endLabel","Employment End","presentLabel","Currently Employed","startPlaceholder","When did you start?","endPlaceholder","When did you end?","presentPlaceholder","Still working here",3,"showPresentToggle","width"],["formControlName","educationPeriod","startLabel","Study Start Date","endLabel","Graduation Date","presentLabel","Currently Studying","startPlaceholder","Select start date","endPlaceholder","Select graduation date","presentPlaceholder","Still studying",3,"showPresentToggle","width"],["formControlName","germanPeriod","startLabel","Startdatum","endLabel","Enddatum","presentLabel","Gegenw\xE4rtig","startPlaceholder","Wann haben Sie angefangen?","endPlaceholder","Wann haben Sie aufgeh\xF6rt?","presentPlaceholder","Arbeiten Sie noch hier?",3,"okLabel","clearLabel","showPresentToggle","width"],["formControlName","spanishPeriod","startLabel","Fecha de Inicio","endLabel","Fecha de Fin","presentLabel","Actualmente","startPlaceholder","\xBFCu\xE1ndo comenz\xF3?","endPlaceholder","\xBFCu\xE1ndo termin\xF3?","presentPlaceholder","\xBFTodav\xEDa trabaja aqu\xED?",3,"okLabel","clearLabel","showPresentToggle","width"],["formControlName","completePeriod","startLabel","Start Date","endLabel","End Date","presentLabel","Present",3,"width"],["formControlName","currentPeriod","startLabel","Start Date","endLabel","End Date","presentLabel","Present",3,"width"],["formControlName","yearOnlyPeriod","startLabel","Start Year","endLabel","End Year","presentLabel","Present",3,"width"],["formControlName","mixedPeriod","startLabel","Start Date","endLabel","End Year","presentLabel","Present",3,"width"],["formControlName","baseYear2010","startLabel","Start Date","endLabel","End Date","presentLabel","Present",3,"baseYearStart","baseYearEnd","width"],["formControlName","baseYear2035","startLabel","Start Date","endLabel","End Date","presentLabel","Present",3,"baseYearStart","baseYearEnd","width"],["formControlName","differentBaseYears","startLabel","Birth Year","endLabel","Retirement Year","presentLabel","Still Working",3,"baseYearStart","baseYearEnd","width"],["formControlName","singleBaseYear1995","label","Historical Date","placeholder","Select historical year/month",3,"baseYear","width"],["formControlName","frenchField","label","Date Historique","placeholder","S\xE9lectionnez l'ann\xE9e/mois",3,"okLabel","clearLabel","width"],["formControlName","customWidthField","label","Custom Width","placeholder","300px width",3,"width"],["formControlName","fullWidthField","label","Full Width","placeholder","Takes full container width",3,"fullWidth"],["formControlName","fullWidthEqual","startLabel","Start Date","endLabel","End Date"]],template:function(t,r){t&1&&(g(0,"h1"),w(1,"ngx-mat-period-picker Demo"),v(),g(2,"div",0)(3,"p")(4,"strong"),w(5,"Current Locale:"),v(),w(6," Using Angular's configured locale"),v(),g(7,"p")(8,"em"),w(9,"The library automatically uses Angular's LOCALE_ID or $localize.locale. Month names and date formatting will be displayed in the configured language."),v()()(),g(10,"form",1)(11,"h2"),w(12,"Year/Month Picker (Original)"),v(),O(13,"ngx-mat-year-month-picker",2),ue(),g(14,"pre"),w(15),Se(16,"json"),v(),g(17,"h2"),w(18,"Year/Month Field (New Text Field)"),v(),O(19,"ngx-mat-year-month-picker",3),ue(),g(20,"pre"),w(21),Se(22,"json"),v(),g(23,"h2"),w(24,"Period Picker (Default Labels)"),v(),O(25,"ngx-mat-period-picker",4),ue(),g(26,"pre"),w(27),Se(28,"json"),v(),g(29,"h2"),w(30,"Period Picker (Employment Example)"),v(),O(31,"ngx-mat-period-picker",5),ue(),g(32,"pre"),w(33),Se(34,"json"),v(),g(35,"h2"),w(36,"Period Picker (Education Example)"),v(),O(37,"ngx-mat-period-picker",6),ue(),g(38,"pre"),w(39),Se(40,"json"),v(),g(41,"h2"),w(42,"Period Picker with Translated Buttons (German)"),v(),O(43,"ngx-mat-period-picker",7),ue(),g(44,"pre"),w(45),Se(46,"json"),v(),g(47,"h2"),w(48,"Period Picker with Translated Buttons (Spanish)"),v(),O(49,"ngx-mat-period-picker",8),ue(),g(50,"pre"),w(51),Se(52,"json"),v(),g(53,"h2"),w(54,"Pre-filled Examples"),v(),g(55,"h3"),w(56,"Complete Period (Start + End)"),v(),O(57,"ngx-mat-period-picker",9),ue(),g(58,"pre"),w(59),Se(60,"json"),v(),g(61,"h3"),w(62,"Current Period (Start + Present)"),v(),O(63,"ngx-mat-period-picker",10),ue(),g(64,"pre"),w(65),Se(66,"json"),v(),g(67,"h3"),w(68,"Year Only Period (Start Year + End Year)"),v(),O(69,"ngx-mat-period-picker",11),ue(),g(70,"pre"),w(71),Se(72,"json"),v(),g(73,"h3"),w(74,"Mixed Period (Start Year/Month + End Year Only)"),v(),O(75,"ngx-mat-period-picker",12),ue(),g(76,"pre"),w(77),Se(78,"json"),v(),g(79,"h2"),w(80,"Base Year Configuration Examples"),v(),g(81,"h3"),w(82,"Period Picker with Base Year 2010"),v(),O(83,"ngx-mat-period-picker",13),ue(),g(84,"pre"),w(85),Se(86,"json"),v(),g(87,"p")(88,"small"),w(89,"When you click on empty fields above, the year picker will show an interval containing 2010."),v()(),g(90,"h3"),w(91,"Period Picker with Base Year 2035"),v(),O(92,"ngx-mat-period-picker",14),ue(),g(93,"pre"),w(94),Se(95,"json"),v(),g(96,"p")(97,"small"),w(98,"When you click on empty fields above, the year picker will show an interval containing 2035."),v()(),g(99,"h3"),w(100,"Period Picker with Different Base Years"),v(),O(101,"ngx-mat-period-picker",15),ue(),g(102,"pre"),w(103),Se(104,"json"),v(),g(105,"p")(106,"small"),w(107,"Start field shows 1984-1995 interval (for birth years), End field shows 2068-2079 interval (for retirement years)."),v()(),g(108,"h3"),w(109,"Single Year/Month Field with Base Year 1995"),v(),O(110,"ngx-mat-year-month-picker",16),ue(),g(111,"pre"),w(112),Se(113,"json"),v(),g(114,"p")(115,"small"),w(116,"When you click above, the year picker will show an interval containing 1995."),v()(),g(117,"h3"),w(118,"Single Year/Month Field with Translated Buttons (French)"),v(),O(119,"ngx-mat-year-month-picker",17),ue(),g(120,"pre"),w(121),Se(122,"json"),v(),g(123,"h2"),w(124,"Width and Layout Configuration Examples"),v(),g(125,"h3"),w(126,"Year/Month Field with Custom Width"),v(),O(127,"ngx-mat-year-month-picker",18),ue(),g(128,"pre"),w(129),Se(130,"json"),v(),g(131,"h3"),w(132,"Year/Month Field with Full Width"),v(),O(133,"ngx-mat-year-month-picker",19),ue(),g(134,"pre"),w(135),Se(136,"json"),v(),g(137,"h3"),w(138,"Period Picker with Full Width and Equal Field Widths (Default)"),v(),O(139,"ngx-mat-period-picker",20),ue(),g(140,"pre"),w(141),Se(142,"json"),v()()),t&2&&(y(10),T("formGroup",r.form),y(3),T("width",250),fe(),y(2),ie(Me(16,55,r.form.value.yearMonth)),y(4),T("width",250),fe(),y(2),ie(Me(22,57,r.form.value.yearMonthField)),y(4),T("width",400),fe(),y(2),ie(Me(28,59,r.form.value.period)),y(4),T("showPresentToggle",!0)("width",400),fe(),y(2),ie(Me(34,61,r.form.value.customPeriod)),y(4),T("showPresentToggle",!1)("width",400),fe(),y(2),ie(Me(40,63,r.form.value.educationPeriod)),y(4),T("okLabel","Best\xE4tigen")("clearLabel","L\xF6schen")("showPresentToggle",!0)("width",400),fe(),y(2),ie(Me(46,65,r.form.value.germanPeriod)),y(4),T("okLabel","Confirmar")("clearLabel","Borrar")("showPresentToggle",!0)("width",400),fe(),y(2),ie(Me(52,67,r.form.value.spanishPeriod)),y(6),T("width",400),fe(),y(2),ie(Me(60,69,r.form.value.completePeriod)),y(4),T("width",400),fe(),y(2),ie(Me(66,71,r.form.value.currentPeriod)),y(4),T("width",400),fe(),y(2),ie(Me(72,73,r.form.value.yearOnlyPeriod)),y(4),T("width",400),fe(),y(2),ie(Me(78,75,r.form.value.mixedPeriod)),y(6),T("baseYearStart",2010)("baseYearEnd",2010)("width",400),fe(),y(2),ie(Me(86,77,r.form.value.baseYear2010)),y(7),T("baseYearStart",2035)("baseYearEnd",2035)("width",400),fe(),y(2),ie(Me(95,79,r.form.value.baseYear2035)),y(7),T("baseYearStart",1990)("baseYearEnd",2070)("width",400),fe(),y(2),ie(Me(104,81,r.form.value.differentBaseYears)),y(7),T("baseYear",1995)("width",250),fe(),y(2),ie(Me(113,83,r.form.value.singleBaseYear1995)),y(7),T("okLabel","Valider")("clearLabel","Effacer")("width",250),fe(),y(2),ie(Me(122,85,r.form.value.frenchField)),y(6),T("width",300),fe(),y(2),ie(Me(130,87,r.form.value.customWidthField)),y(4),T("fullWidth",!0),fe(),y(2),ie(Me(136,89,r.form.value.fullWidthField)),y(4),fe(),y(2),ie(Me(142,91,r.form.value.fullWidthEqual)))},dependencies:[Ml,jy,Il,Sl,Er,Ao,Ht,Zl,Ei,sf],styles:["[_nghost-%COMP%]{display:block;padding:2rem;max-width:720px;margin:0 auto}.locale-info[_ngcontent-%COMP%]{background:#e3f2fd;border:1px solid #2196f3;border-radius:4px;padding:1rem;margin-bottom:2rem}.locale-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:.5rem 0}"]})};gf(Xl,H(D({},Sf),{providers:[...Sf.providers]})).catch(e=>console.error(e));

var zw=Object.defineProperty,Uw=Object.defineProperties;var $w=Object.getOwnPropertyDescriptors;var mf=Object.getOwnPropertySymbols;var Gw=Object.prototype.hasOwnProperty,Ww=Object.prototype.propertyIsEnumerable;var pf=(t,n,e)=>n in t?zw(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e,C=(t,n)=>{for(var e in n||={})Gw.call(n,e)&&pf(t,e,n[e]);if(mf)for(var e of mf(n))Ww.call(n,e)&&pf(t,e,n[e]);return t},Q=(t,n)=>Uw(t,$w(n));var Pt=(t,n,e)=>new Promise((i,o)=>{var r=c=>{try{s(e.next(c))}catch(l){o(l)}},a=c=>{try{s(e.throw(c))}catch(l){o(l)}},s=c=>c.done?i(c.value):Promise.resolve(c.value).then(r,a);s((e=e.apply(t,n)).next())});var nr=[null],Ia=[!1],ri=1,qw=null,qe=Symbol("SIGNAL");function I(t){let n=nr[0];return nr[0]=t,n}function ka(){return nr[0]}var si={version:0,lastCleanEpoch:0,dirty:!1,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:!1,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:"unknown",producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function Fn(t){if(Ia[0])throw new Error("");let n=nr[0];if(n===null)return;n.consumerOnSignalRead(t);let e=n.producersTail;if(e!==void 0&&e.producer===t)return;let i,o=n.recomputing;if(o&&(i=e!==void 0?e.nextProducer:n.producers,i!==void 0&&i.producer===t)){n.producersTail=i,i.lastReadVersion=t.version,i.knownValidAtEpoch=ri;return}let r=t.consumersTail;if(r!==void 0&&r.consumer===n&&(!o||r.knownValidAtEpoch===ri))return;let a=Xi(n),s={producer:t,consumer:n,nextProducer:i,prevConsumer:void 0,knownValidAtEpoch:ri,lastReadVersion:t.version,nextConsumer:void 0};n.producersTail=s,e!==void 0?e.nextProducer=s:n.producers=s,a&&vf(t,s)}function ff(){ri++}function ir(t){if(!(Xi(t)&&!t.dirty)&&!(!t.dirty&&t.lastCleanEpoch===ri)){if(!t.producerMustRecompute(t)&&!Zi(t)){Ta(t);return}t.producerRecomputeValue(t),Ta(t)}}function Ql(t){if(t.consumers===void 0)return;let n=Ia[0];Ia[0]=!0;try{for(let e=t.consumers;e!==void 0;e=e.nextConsumer){let i=e.consumer;i.dirty||Yw(i)}}finally{Ia[0]=n}}function Jl(){return nr[0]?.consumerAllowSignalWrites!==!1}function Yw(t){t.dirty=!0,Ql(t),t.consumerMarkedDirty?.(t)}function Ta(t){t.dirty=!1,t.lastCleanEpoch=ri}function Pn(t){return t&&hf(t),I(t)}function hf(t){if(t.producersTail?.knownValidAtEpoch===ri){let n=t.producers;for(;n!==void 0;)n.knownValidAtEpoch=null,n=n.nextProducer}t.producersTail=void 0,t.recomputing=!0}function ci(t,n){I(n),t&&gf(t)}function gf(t){t.recomputing=!1;let n=t.producersTail,e=n!==void 0?n.nextProducer:t.producers;if(e!==void 0){if(Xi(t))do e=ed(e);while(e!==void 0);n!==void 0?n.nextProducer=void 0:t.producers=void 0}}function Zi(t){for(let n=t.producers;n!==void 0;n=n.nextProducer){let e=n.producer,i=n.lastReadVersion;if(i!==e.version||(ir(e),i!==e.version))return!0}return!1}function Ln(t){if(Xi(t)){let n=t.producers;for(;n!==void 0;)n=ed(n)}t.producers=void 0,t.producersTail=void 0,t.consumers=void 0,t.consumersTail=void 0}function vf(t,n){let e=t.consumersTail,i=Xi(t);if(e!==void 0?(n.nextConsumer=e.nextConsumer,e.nextConsumer=n):(n.nextConsumer=void 0,t.consumers=n),n.prevConsumer=e,t.consumersTail=n,!i)for(let o=t.producers;o!==void 0;o=o.nextProducer)vf(o.producer,o)}function ed(t){let n=t.producer,e=t.nextProducer,i=t.nextConsumer,o=t.prevConsumer;if(t.nextConsumer=void 0,t.prevConsumer=void 0,i!==void 0?i.prevConsumer=o:n.consumersTail=o,o!==void 0)o.nextConsumer=i;else if(n.consumers=i,!Xi(n)){let r=n.producers;for(;r!==void 0;)r=ed(r)}return e}function Xi(t){return t.consumerIsAlwaysLive||t.consumers!==void 0}function Aa(t){qw?.(t)}function Ra(t,n){return Object.is(t,n)}function or(t,n){let e=Object.create(Kw);e.computation=t,n!==void 0&&(e.equal=n);let i=()=>{if(ir(e),Fn(e),e.value===ai)throw e.error;return e.value};return i[qe]=e,Aa(e),i}var Ma=Symbol("UNSET"),Na=Symbol("COMPUTING"),ai=Symbol("ERRORED"),Kw=Q(C({},si),{value:Ma,dirty:!0,error:null,equal:Ra,kind:"computed",producerMustRecompute(t){return t.value===Ma||t.value===Na},producerRecomputeValue(t){if(t.value===Na)throw new Error("");let n=t.value;t.value=Na;let e=Pn(t),i,o=!1;try{i=t.computation(),I(null),o=n!==Ma&&n!==ai&&i!==ai&&t.equal(n,i),t.error=null}catch(r){i=ai,t.error=r}finally{ci(t,e)}if(o){t.value=n;return}t.value=i,t.version++}});function Zw(){throw new Error}var bf=Zw;function yf(t){bf(t)}function td(t){bf=t}var Xw=null;function nd(t,n){let e=Object.create(Qi);e.value=t,n!==void 0&&(e.equal=n);let i=()=>_f(e);return i[qe]=e,Aa(e),[i,a=>li(e,a),a=>id(e,a)]}function _f(t){return Fn(t),t.value}function li(t,n){Jl()||yf(t),t.equal(t.value,n)||(t.value=n,Qw(t))}function id(t,n){Jl()||yf(t),li(t,n(t.value))}var Qi=Q(C({},si),{equal:Ra,value:void 0,kind:"signal"});function Qw(t){t.version++,ff(),Ql(t),Xw?.(t)}var od=Q(C({},si),{consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,dirty:!0,kind:"effect"});function rd(t){if(t.dirty=!1,t.version>0&&!Zi(t))return;t.version++;let n=Pn(t);try{t.cleanup(),t.fn()}finally{ci(t,n)}}var ad=[void 0];function Oa(){return ad[0]}function en(t){let n=ad[0];return ad[0]=t,n}var wf=Symbol("NotFound");function Ji(t){return t===wf||t?.name==="\u0275NotFound"}function xf(t){let n=I(null);try{return t()}finally{I(n)}}function J(t){return typeof t=="function"}function Fa(t){let e=t(i=>{Error.call(i),i.stack=new Error().stack});return e.prototype=Object.create(Error.prototype),e.prototype.constructor=e,e}var Pa=Fa(t=>function(e){t(this),this.message=e?`${e.length} errors occurred during unsubscription:
${e.map((i,o)=>`${o+1}) ${i.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=e});function di(t,n){if(t){let e=t.indexOf(n);0<=e&&t.splice(e,1)}}var we=class t{constructor(n){this.initialTeardown=n,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let n;if(!this.closed){this.closed=!0;let{_parentage:e}=this;if(e)if(this._parentage=null,Array.isArray(e))for(let r of e)r.remove(this);else e.remove(this);let{initialTeardown:i}=this;if(J(i))try{i()}catch(r){n=r instanceof Pa?r.errors:[r]}let{_finalizers:o}=this;if(o){this._finalizers=null;for(let r of o)try{Cf(r)}catch(a){n=n??[],a instanceof Pa?n=[...n,...a.errors]:n.push(a)}}if(n)throw new Pa(n)}}add(n){var e;if(n&&n!==this)if(this.closed)Cf(n);else{if(n instanceof t){if(n.closed||n._hasParent(this))return;n._addParent(this)}(this._finalizers=(e=this._finalizers)!==null&&e!==void 0?e:[]).push(n)}}_hasParent(n){let{_parentage:e}=this;return e===n||Array.isArray(e)&&e.includes(n)}_addParent(n){let{_parentage:e}=this;this._parentage=Array.isArray(e)?(e.push(n),e):e?[e,n]:n}_removeParent(n){let{_parentage:e}=this;e===n?this._parentage=null:Array.isArray(e)&&di(e,n)}remove(n){let{_finalizers:e}=this;e&&di(e,n),n instanceof t&&n._removeParent(this)}};we.EMPTY=(()=>{let t=new we;return t.closed=!0,t})();var sd=we.EMPTY;function La(t){return t instanceof we||t&&"closed"in t&&J(t.remove)&&J(t.add)&&J(t.unsubscribe)}function Cf(t){J(t)?t():t.unsubscribe()}var Lt={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var eo={setTimeout(t,n,...e){let{delegate:i}=eo;return i?.setTimeout?i.setTimeout(t,n,...e):setTimeout(t,n,...e)},clearTimeout(t){let{delegate:n}=eo;return(n?.clearTimeout||clearTimeout)(t)},delegate:void 0};function Va(t){eo.setTimeout(()=>{let{onUnhandledError:n}=Lt;if(n)n(t);else throw t})}function rr(){}var Sf=cd("C",void 0,void 0);function Ef(t){return cd("E",void 0,t)}function Df(t){return cd("N",t,void 0)}function cd(t,n,e){return{kind:t,value:n,error:e}}var ui=null;function to(t){if(Lt.useDeprecatedSynchronousErrorHandling){let n=!ui;if(n&&(ui={errorThrown:!1,error:null}),t(),n){let{errorThrown:e,error:i}=ui;if(ui=null,e)throw i}}else t()}function If(t){Lt.useDeprecatedSynchronousErrorHandling&&ui&&(ui.errorThrown=!0,ui.error=t)}var mi=class extends we{constructor(n){super(),this.isStopped=!1,n?(this.destination=n,La(n)&&n.add(this)):this.destination=tx}static create(n,e,i){return new mn(n,e,i)}next(n){this.isStopped?dd(Df(n),this):this._next(n)}error(n){this.isStopped?dd(Ef(n),this):(this.isStopped=!0,this._error(n))}complete(){this.isStopped?dd(Sf,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(n){this.destination.next(n)}_error(n){try{this.destination.error(n)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},Jw=Function.prototype.bind;function ld(t,n){return Jw.call(t,n)}var ud=class{constructor(n){this.partialObserver=n}next(n){let{partialObserver:e}=this;if(e.next)try{e.next(n)}catch(i){ja(i)}}error(n){let{partialObserver:e}=this;if(e.error)try{e.error(n)}catch(i){ja(i)}else ja(n)}complete(){let{partialObserver:n}=this;if(n.complete)try{n.complete()}catch(e){ja(e)}}},mn=class extends mi{constructor(n,e,i){super();let o;if(J(n)||!n)o={next:n??void 0,error:e??void 0,complete:i??void 0};else{let r;this&&Lt.useDeprecatedNextContext?(r=Object.create(n),r.unsubscribe=()=>this.unsubscribe(),o={next:n.next&&ld(n.next,r),error:n.error&&ld(n.error,r),complete:n.complete&&ld(n.complete,r)}):o=n}this.destination=new ud(o)}};function ja(t){Lt.useDeprecatedSynchronousErrorHandling?If(t):Va(t)}function ex(t){throw t}function dd(t,n){let{onStoppedNotification:e}=Lt;e&&eo.setTimeout(()=>e(t,n))}var tx={closed:!0,next:rr,error:ex,complete:rr};var no=typeof Symbol=="function"&&Symbol.observable||"@@observable";function Vt(t){return t}function Mf(t){return t.length===0?Vt:t.length===1?t[0]:function(e){return t.reduce((i,o)=>o(i),e)}}var K=class t{constructor(n){n&&(this._subscribe=n)}lift(n){let e=new t;return e.source=this,e.operator=n,e}subscribe(n,e,i){let o=ix(n)?n:new mn(n,e,i);return to(()=>{let{operator:r,source:a}=this;o.add(r?r.call(o,a):a?this._subscribe(o):this._trySubscribe(o))}),o}_trySubscribe(n){try{return this._subscribe(n)}catch(e){n.error(e)}}forEach(n,e){return e=Nf(e),new e((i,o)=>{let r=new mn({next:a=>{try{n(a)}catch(s){o(s),r.unsubscribe()}},error:o,complete:i});this.subscribe(r)})}_subscribe(n){var e;return(e=this.source)===null||e===void 0?void 0:e.subscribe(n)}[no](){return this}pipe(...n){return Mf(n)(this)}toPromise(n){return n=Nf(n),new n((e,i)=>{let o;this.subscribe(r=>o=r,r=>i(r),()=>e(o))})}};K.create=t=>new K(t);function Nf(t){var n;return(n=t??Lt.Promise)!==null&&n!==void 0?n:Promise}function nx(t){return t&&J(t.next)&&J(t.error)&&J(t.complete)}function ix(t){return t&&t instanceof mi||nx(t)&&La(t)}function ox(t){return J(t?.lift)}function ae(t){return n=>{if(ox(n))return n.lift(function(e){try{return t(e,this)}catch(i){this.error(i)}});throw new TypeError("Unable to lift unknown Observable type")}}function se(t,n,e,i,o){return new md(t,n,e,i,o)}var md=class extends mi{constructor(n,e,i,o,r,a){super(n),this.onFinalize=r,this.shouldUnsubscribe=a,this._next=e?function(s){try{e(s)}catch(c){n.error(c)}}:super._next,this._error=o?function(s){try{o(s)}catch(c){n.error(c)}finally{this.unsubscribe()}}:super._error,this._complete=i?function(){try{i()}catch(s){n.error(s)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var n;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:e}=this;super.unsubscribe(),!e&&((n=this.onFinalize)===null||n===void 0||n.call(this))}}};var Tf=Fa(t=>function(){t(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var D=class extends K{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(n){let e=new Ba(this,this);return e.operator=n,e}_throwIfClosed(){if(this.closed)throw new Tf}next(n){to(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let e of this.currentObservers)e.next(n)}})}error(n){to(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=n;let{observers:e}=this;for(;e.length;)e.shift().error(n)}})}complete(){to(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:n}=this;for(;n.length;)n.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var n;return((n=this.observers)===null||n===void 0?void 0:n.length)>0}_trySubscribe(n){return this._throwIfClosed(),super._trySubscribe(n)}_subscribe(n){return this._throwIfClosed(),this._checkFinalizedStatuses(n),this._innerSubscribe(n)}_innerSubscribe(n){let{hasError:e,isStopped:i,observers:o}=this;return e||i?sd:(this.currentObservers=null,o.push(n),new we(()=>{this.currentObservers=null,di(o,n)}))}_checkFinalizedStatuses(n){let{hasError:e,thrownError:i,isStopped:o}=this;e?n.error(i):o&&n.complete()}asObservable(){let n=new K;return n.source=this,n}};D.create=(t,n)=>new Ba(t,n);var Ba=class extends D{constructor(n,e){super(),this.destination=n,this.source=e}next(n){var e,i;(i=(e=this.destination)===null||e===void 0?void 0:e.next)===null||i===void 0||i.call(e,n)}error(n){var e,i;(i=(e=this.destination)===null||e===void 0?void 0:e.error)===null||i===void 0||i.call(e,n)}complete(){var n,e;(e=(n=this.destination)===null||n===void 0?void 0:n.complete)===null||e===void 0||e.call(n)}_subscribe(n){var e,i;return(i=(e=this.source)===null||e===void 0?void 0:e.subscribe(n))!==null&&i!==void 0?i:sd}};var pi=class extends D{constructor(n){super(),this._value=n}get value(){return this.getValue()}_subscribe(n){let e=super._subscribe(n);return!e.closed&&n.next(this._value),e}getValue(){let{hasError:n,thrownError:e,_value:i}=this;if(n)throw e;return this._throwIfClosed(),i}next(n){super.next(this._value=n)}};var ar={now(){return(ar.delegate||Date).now()},delegate:void 0};var Ha=class extends D{constructor(n=1/0,e=1/0,i=ar){super(),this._bufferSize=n,this._windowTime=e,this._timestampProvider=i,this._buffer=[],this._infiniteTimeWindow=!0,this._infiniteTimeWindow=e===1/0,this._bufferSize=Math.max(1,n),this._windowTime=Math.max(1,e)}next(n){let{isStopped:e,_buffer:i,_infiniteTimeWindow:o,_timestampProvider:r,_windowTime:a}=this;e||(i.push(n),!o&&i.push(r.now()+a)),this._trimBuffer(),super.next(n)}_subscribe(n){this._throwIfClosed(),this._trimBuffer();let e=this._innerSubscribe(n),{_infiniteTimeWindow:i,_buffer:o}=this,r=o.slice();for(let a=0;a<r.length&&!n.closed;a+=i?1:2)n.next(r[a]);return this._checkFinalizedStatuses(n),e}_trimBuffer(){let{_bufferSize:n,_timestampProvider:e,_buffer:i,_infiniteTimeWindow:o}=this,r=(o?1:2)*n;if(n<1/0&&r<i.length&&i.splice(0,i.length-r),!o){let a=e.now(),s=0;for(let c=1;c<i.length&&i[c]<=a;c+=2)s=c;s&&i.splice(0,s+1)}}};var za=class extends we{constructor(n,e){super()}schedule(n,e=0){return this}};var sr={setInterval(t,n,...e){let{delegate:i}=sr;return i?.setInterval?i.setInterval(t,n,...e):setInterval(t,n,...e)},clearInterval(t){let{delegate:n}=sr;return(n?.clearInterval||clearInterval)(t)},delegate:void 0};var Ua=class extends za{constructor(n,e){super(n,e),this.scheduler=n,this.work=e,this.pending=!1}schedule(n,e=0){var i;if(this.closed)return this;this.state=n;let o=this.id,r=this.scheduler;return o!=null&&(this.id=this.recycleAsyncId(r,o,e)),this.pending=!0,this.delay=e,this.id=(i=this.id)!==null&&i!==void 0?i:this.requestAsyncId(r,this.id,e),this}requestAsyncId(n,e,i=0){return sr.setInterval(n.flush.bind(n,this),i)}recycleAsyncId(n,e,i=0){if(i!=null&&this.delay===i&&this.pending===!1)return e;e!=null&&sr.clearInterval(e)}execute(n,e){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;let i=this._execute(n,e);if(i)return i;this.pending===!1&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(n,e){let i=!1,o;try{this.work(n)}catch(r){i=!0,o=r||new Error("Scheduled action threw falsy error")}if(i)return this.unsubscribe(),o}unsubscribe(){if(!this.closed){let{id:n,scheduler:e}=this,{actions:i}=e;this.work=this.state=this.scheduler=null,this.pending=!1,di(i,this),n!=null&&(this.id=this.recycleAsyncId(e,n,null)),this.delay=null,super.unsubscribe()}}};var io=class t{constructor(n,e=t.now){this.schedulerActionCtor=n,this.now=e}schedule(n,e=0,i){return new this.schedulerActionCtor(this,n).schedule(i,e)}};io.now=ar.now;var $a=class extends io{constructor(n,e=io.now){super(n,e),this.actions=[],this._active=!1}flush(n){let{actions:e}=this;if(this._active){e.push(n);return}let i;this._active=!0;do if(i=n.execute(n.state,n.delay))break;while(n=e.shift());if(this._active=!1,i){for(;n=e.shift();)n.unsubscribe();throw i}}};var cr=new $a(Ua),kf=cr;var fi=new K(t=>t.complete());function Ga(t){return t&&J(t.schedule)}function pd(t){return t[t.length-1]}function Wa(t){return J(pd(t))?t.pop():void 0}function tn(t){return Ga(pd(t))?t.pop():void 0}function Af(t,n){return typeof pd(t)=="number"?t.pop():n}function Of(t,n,e,i){function o(r){return r instanceof e?r:new e(function(a){a(r)})}return new(e||(e=Promise))(function(r,a){function s(d){try{l(i.next(d))}catch(u){a(u)}}function c(d){try{l(i.throw(d))}catch(u){a(u)}}function l(d){d.done?r(d.value):o(d.value).then(s,c)}l((i=i.apply(t,n||[])).next())})}function Rf(t){var n=typeof Symbol=="function"&&Symbol.iterator,e=n&&t[n],i=0;if(e)return e.call(t);if(t&&typeof t.length=="number")return{next:function(){return t&&i>=t.length&&(t=void 0),{value:t&&t[i++],done:!t}}};throw new TypeError(n?"Object is not iterable.":"Symbol.iterator is not defined.")}function hi(t){return this instanceof hi?(this.v=t,this):new hi(t)}function Ff(t,n,e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i=e.apply(t,n||[]),o,r=[];return o=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),s("next"),s("throw"),s("return",a),o[Symbol.asyncIterator]=function(){return this},o;function a(p){return function(v){return Promise.resolve(v).then(p,u)}}function s(p,v){i[p]&&(o[p]=function(x){return new Promise(function(E,$){r.push([p,x,E,$])>1||c(p,x)})},v&&(o[p]=v(o[p])))}function c(p,v){try{l(i[p](v))}catch(x){f(r[0][3],x)}}function l(p){p.value instanceof hi?Promise.resolve(p.value.v).then(d,u):f(r[0][2],p)}function d(p){c("next",p)}function u(p){c("throw",p)}function f(p,v){p(v),r.shift(),r.length&&c(r[0][0],r[0][1])}}function Pf(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n=t[Symbol.asyncIterator],e;return n?n.call(t):(t=typeof Rf=="function"?Rf(t):t[Symbol.iterator](),e={},i("next"),i("throw"),i("return"),e[Symbol.asyncIterator]=function(){return this},e);function i(r){e[r]=t[r]&&function(a){return new Promise(function(s,c){a=t[r](a),o(s,c,a.done,a.value)})}}function o(r,a,s,c){Promise.resolve(c).then(function(l){r({value:l,done:s})},a)}}var qa=(t=>t&&typeof t.length=="number"&&typeof t!="function");function Ya(t){return J(t?.then)}function Ka(t){return J(t[no])}function Za(t){return Symbol.asyncIterator&&J(t?.[Symbol.asyncIterator])}function Xa(t){return new TypeError(`You provided ${t!==null&&typeof t=="object"?"an invalid object":`'${t}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function rx(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var Qa=rx();function Ja(t){return J(t?.[Qa])}function es(t){return Ff(this,arguments,function*(){let e=t.getReader();try{for(;;){let{value:i,done:o}=yield hi(e.read());if(o)return yield hi(void 0);yield yield hi(i)}}finally{e.releaseLock()}})}function ts(t){return J(t?.getReader)}function De(t){if(t instanceof K)return t;if(t!=null){if(Ka(t))return ax(t);if(qa(t))return sx(t);if(Ya(t))return cx(t);if(Za(t))return Lf(t);if(Ja(t))return lx(t);if(ts(t))return dx(t)}throw Xa(t)}function ax(t){return new K(n=>{let e=t[no]();if(J(e.subscribe))return e.subscribe(n);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function sx(t){return new K(n=>{for(let e=0;e<t.length&&!n.closed;e++)n.next(t[e]);n.complete()})}function cx(t){return new K(n=>{t.then(e=>{n.closed||(n.next(e),n.complete())},e=>n.error(e)).then(null,Va)})}function lx(t){return new K(n=>{for(let e of t)if(n.next(e),n.closed)return;n.complete()})}function Lf(t){return new K(n=>{ux(t,n).catch(e=>n.error(e))})}function dx(t){return Lf(es(t))}function ux(t,n){var e,i,o,r;return Of(this,void 0,void 0,function*(){try{for(e=Pf(t);i=yield e.next(),!i.done;){let a=i.value;if(n.next(a),n.closed)return}}catch(a){o={error:a}}finally{try{i&&!i.done&&(r=e.return)&&(yield r.call(e))}finally{if(o)throw o.error}}n.complete()})}function ht(t,n,e,i=0,o=!1){let r=n.schedule(function(){e(),o?t.add(this.schedule(null,i)):this.unsubscribe()},i);if(t.add(r),!o)return r}function ns(t,n=0){return ae((e,i)=>{e.subscribe(se(i,o=>ht(i,t,()=>i.next(o),n),()=>ht(i,t,()=>i.complete(),n),o=>ht(i,t,()=>i.error(o),n)))})}function is(t,n=0){return ae((e,i)=>{i.add(t.schedule(()=>e.subscribe(i),n))})}function Vf(t,n){return De(t).pipe(is(n),ns(n))}function jf(t,n){return De(t).pipe(is(n),ns(n))}function Bf(t,n){return new K(e=>{let i=0;return n.schedule(function(){i===t.length?e.complete():(e.next(t[i++]),e.closed||this.schedule())})})}function Hf(t,n){return new K(e=>{let i;return ht(e,n,()=>{i=t[Qa](),ht(e,n,()=>{let o,r;try{({value:o,done:r}=i.next())}catch(a){e.error(a);return}r?e.complete():e.next(o)},0,!0)}),()=>J(i?.return)&&i.return()})}function os(t,n){if(!t)throw new Error("Iterable cannot be null");return new K(e=>{ht(e,n,()=>{let i=t[Symbol.asyncIterator]();ht(e,n,()=>{i.next().then(o=>{o.done?e.complete():e.next(o.value)})},0,!0)})})}function zf(t,n){return os(es(t),n)}function Uf(t,n){if(t!=null){if(Ka(t))return Vf(t,n);if(qa(t))return Bf(t,n);if(Ya(t))return jf(t,n);if(Za(t))return os(t,n);if(Ja(t))return Hf(t,n);if(ts(t))return zf(t,n)}throw Xa(t)}function St(t,n){return n?Uf(t,n):De(t)}function yt(...t){let n=tn(t);return St(t,n)}function fd(t,n){let e=J(t)?t:()=>t,i=o=>o.error(e());return new K(n?o=>n.schedule(i,0,o):i)}function $f(t){return t instanceof Date&&!isNaN(t)}function ge(t,n){return ae((e,i)=>{let o=0;e.subscribe(se(i,r=>{i.next(t.call(n,r,o++))}))})}var{isArray:mx}=Array;function px(t,n){return mx(n)?t(...n):t(n)}function rs(t){return ge(n=>px(t,n))}var{isArray:fx}=Array,{getPrototypeOf:hx,prototype:gx,keys:vx}=Object;function as(t){if(t.length===1){let n=t[0];if(fx(n))return{args:n,keys:null};if(bx(n)){let e=vx(n);return{args:e.map(i=>n[i]),keys:e}}}return{args:t,keys:null}}function bx(t){return t&&typeof t=="object"&&hx(t)===gx}function ss(t,n){return t.reduce((e,i,o)=>(e[i]=n[o],e),{})}function hd(...t){let n=tn(t),e=Wa(t),{args:i,keys:o}=as(t);if(i.length===0)return St([],n);let r=new K(yx(i,n,o?a=>ss(o,a):Vt));return e?r.pipe(rs(e)):r}function yx(t,n,e=Vt){return i=>{Gf(n,()=>{let{length:o}=t,r=new Array(o),a=o,s=o;for(let c=0;c<o;c++)Gf(n,()=>{let l=St(t[c],n),d=!1;l.subscribe(se(i,u=>{r[c]=u,d||(d=!0,s--),s||i.next(e(r.slice()))},()=>{--a||i.complete()}))},i)},i)}}function Gf(t,n,e){t?ht(e,t,n):n()}function Wf(t,n,e,i,o,r,a,s){let c=[],l=0,d=0,u=!1,f=()=>{u&&!c.length&&!l&&n.complete()},p=x=>l<i?v(x):c.push(x),v=x=>{r&&n.next(x),l++;let E=!1;De(e(x,d++)).subscribe(se(n,$=>{o?.($),r?p($):n.next($)},()=>{E=!0},void 0,()=>{if(E)try{for(l--;c.length&&l<i;){let $=c.shift();a?ht(n,a,()=>v($)):v($)}f()}catch($){n.error($)}}))};return t.subscribe(se(n,p,()=>{u=!0,f()})),()=>{s?.()}}function oo(t,n,e=1/0){return J(n)?oo((i,o)=>ge((r,a)=>n(i,r,o,a))(De(t(i,o))),e):(typeof n=="number"&&(e=n),ae((i,o)=>Wf(i,o,t,e)))}function cs(t=1/0){return oo(Vt,t)}function qf(){return cs(1)}function ro(...t){return qf()(St(t,tn(t)))}function lr(...t){let n=Wa(t),{args:e,keys:i}=as(t),o=new K(r=>{let{length:a}=e;if(!a){r.complete();return}let s=new Array(a),c=a,l=a;for(let d=0;d<a;d++){let u=!1;De(e[d]).subscribe(se(r,f=>{u||(u=!0,l--),s[d]=f},()=>c--,void 0,()=>{(!c||!u)&&(l||r.next(i?ss(i,s):s),r.complete())}))}});return n?o.pipe(rs(n)):o}function Yf(t=0,n,e=kf){let i=-1;return n!=null&&(Ga(n)?e=n:i=n),new K(o=>{let r=$f(t)?+t-e.now():t;r<0&&(r=0);let a=0;return e.schedule(function(){o.closed||(o.next(a++),0<=i?this.schedule(void 0,i):o.complete())},r)})}function ao(...t){let n=tn(t),e=Af(t,1/0),i=t;return i.length?i.length===1?De(i[0]):cs(e)(St(i,n)):fi}function mt(t,n){return ae((e,i)=>{let o=0;e.subscribe(se(i,r=>t.call(n,r,o++)&&i.next(r)))})}function Kf(t){return ae((n,e)=>{let i=!1,o=null,r=null,a=!1,s=()=>{if(r?.unsubscribe(),r=null,i){i=!1;let l=o;o=null,e.next(l)}a&&e.complete()},c=()=>{r=null,a&&e.complete()};n.subscribe(se(e,l=>{i=!0,o=l,r||De(t(l)).subscribe(r=se(e,s,c))},()=>{a=!0,(!i||!r||r.closed)&&e.complete()}))})}function ls(t,n=cr){return Kf(()=>Yf(t,n))}function ds(t){return ae((n,e)=>{let i=null,o=!1,r;i=n.subscribe(se(e,void 0,void 0,a=>{r=De(t(a,ds(t)(n))),i?(i.unsubscribe(),i=null,r.subscribe(e)):o=!0})),o&&(i.unsubscribe(),i=null,r.subscribe(e))})}function gd(t,n){return J(n)?oo(t,n,1):oo(t,1)}function dr(t,n=cr){return ae((e,i)=>{let o=null,r=null,a=null,s=()=>{if(o){o.unsubscribe(),o=null;let l=r;r=null,i.next(l)}};function c(){let l=a+t,d=n.now();if(d<l){o=this.schedule(void 0,l-d),i.add(o);return}s()}e.subscribe(se(i,l=>{r=l,a=n.now(),o||(o=n.schedule(c,t),i.add(o))},()=>{s(),i.complete()},void 0,()=>{r=o=null}))})}function ur(t){return t<=0?()=>fi:ae((n,e)=>{let i=0;n.subscribe(se(e,o=>{++i<=t&&(e.next(o),t<=i&&e.complete())}))})}function us(t,n=Vt){return t=t??_x,ae((e,i)=>{let o,r=!0;e.subscribe(se(i,a=>{let s=n(a);(r||!t(o,s))&&(r=!1,o=s,i.next(a))}))})}function _x(t,n){return t===n}function mr(t){return ae((n,e)=>{try{n.subscribe(e)}finally{e.add(t)}})}function ms(){return ae((t,n)=>{let e,i=!1;t.subscribe(se(n,o=>{let r=e;e=o,i&&n.next([r,o]),i=!0}))})}function pr(t={}){let{connector:n=()=>new D,resetOnError:e=!0,resetOnComplete:i=!0,resetOnRefCountZero:o=!0}=t;return r=>{let a,s,c,l=0,d=!1,u=!1,f=()=>{s?.unsubscribe(),s=void 0},p=()=>{f(),a=c=void 0,d=u=!1},v=()=>{let x=a;p(),x?.unsubscribe()};return ae((x,E)=>{l++,!u&&!d&&f();let $=c=c??n();E.add(()=>{l--,l===0&&!u&&!d&&(s=vd(v,o))}),$.subscribe(E),!a&&l>0&&(a=new mn({next:ie=>$.next(ie),error:ie=>{u=!0,f(),s=vd(p,e,ie),$.error(ie)},complete:()=>{d=!0,f(),s=vd(p,i),$.complete()}}),De(x).subscribe(a))})(r)}}function vd(t,n,...e){if(n===!0){t();return}if(n===!1)return;let i=new mn({next:()=>{i.unsubscribe(),t()}});return De(n(...e)).subscribe(i)}function ps(t,n,e){let i,o=!1;return t&&typeof t=="object"?{bufferSize:i=1/0,windowTime:n=1/0,refCount:o=!1,scheduler:e}=t:i=t??1/0,pr({connector:()=>new Ha(i,n,e),resetOnError:!0,resetOnComplete:!1,resetOnRefCountZero:o})}function fr(t){return mt((n,e)=>t<=e)}function nn(...t){let n=tn(t);return ae((e,i)=>{(n?ro(t,e,n):ro(t,e)).subscribe(i)})}function hr(t,n){return ae((e,i)=>{let o=null,r=0,a=!1,s=()=>a&&!o&&i.complete();e.subscribe(se(i,c=>{o?.unsubscribe();let l=0,d=r++;De(t(c,d)).subscribe(o=se(i,u=>i.next(n?n(c,u,d,l++):u),()=>{o=null,s()}))},()=>{a=!0,s()}))})}function Re(t){return ae((n,e)=>{De(t).subscribe(se(e,()=>e.complete(),rr)),!e.closed&&n.subscribe(e)})}function gi(t,n,e){let i=J(t)||n||e?{next:t,error:n,complete:e}:t;return i?ae((o,r)=>{var a;(a=i.subscribe)===null||a===void 0||a.call(i);let s=!0;o.subscribe(se(r,c=>{var l;(l=i.next)===null||l===void 0||l.call(i,c),r.next(c)},()=>{var c;s=!1,(c=i.complete)===null||c===void 0||c.call(i),r.complete()},c=>{var l;s=!1,(l=i.error)===null||l===void 0||l.call(i,c),r.error(c)},()=>{var c,l;s&&((c=i.unsubscribe)===null||c===void 0||c.call(i)),(l=i.finalize)===null||l===void 0||l.call(i)}))}):Vt}var kd="https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",S=class extends Error{code;constructor(n,e){super(gn(n,e)),this.code=n}};function wx(t){return`NG0${Math.abs(t)}`}function gn(t,n){return`${wx(t)}${n?": "+n:""}`}function xe(t){for(let n in t)if(t[n]===xe)return n;throw Error("")}function eh(t,n){for(let e in n)Object.hasOwn(n,e)&&!Object.hasOwn(t,e)&&(t[e]=n[e])}function _s(t){if(typeof t=="string")return t;if(Array.isArray(t))return`[${t.map(_s).join(", ")}]`;if(t==null)return""+t;let n=t.overriddenName||t.name;if(n)return`${n}`;let e=t.toString();if(e==null)return""+e;let i=e.indexOf(`
`);return i>=0?e.slice(0,i):e}function ws(t,n){return t?n?`${t} ${n}`:t:n||""}var xx=xe({__forward_ref__:xe});function Oe(t){return t.__forward_ref__=Oe,t}function tt(t){return Ad(t)?t():t}function Ad(t){return typeof t=="function"&&Object.hasOwn(t,xx)&&t.__forward_ref__===Oe}function W(t){return{token:t.token,providedIn:t.providedIn||null,factory:t.factory,value:void 0}}function P(t){return{providers:t.providers||[],imports:t.imports||[]}}function xs(t){return Cx(t,Cs)}function Cx(t,n){return Object.hasOwn(t,n)&&t[n]||null}function Sx(t){let n=t?.[Cs]??null;return n||null}function yd(t){return t&&Object.hasOwn(t,hs)?t[hs]:null}var Cs=xe({\u0275prov:xe}),hs=xe({\u0275inj:xe}),b=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(n,e){this._desc=n,this.\u0275prov=void 0,typeof e=="number"?this.__NG_ELEMENT_ID__=e:e!==void 0&&(this.\u0275prov=W({token:this,providedIn:e.providedIn||"root",factory:e.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function Rd(t){return t&&!!t.\u0275providers}var _r=xe({\u0275cmp:xe}),wr=xe({\u0275dir:xe}),Od=xe({\u0275pipe:xe});var vr=xe({\u0275fac:xe}),wi=xe({__NG_ELEMENT_ID__:xe}),Zf=xe({__NG_ENV_ID__:xe});function jn(t){return Fd(t,"@Component"),t[_r]||null}function Ss(t){return Fd(t,"@Directive"),t[wr]||null}function th(t){return Fd(t,"@Pipe"),t[Od]||null}function Fd(t,n){if(t==null)throw new S(-919,!1)}function Pd(t){return typeof t=="string"?t:t==null?"":String(t)}var nh=xe({ngErrorCode:xe}),Ex=xe({ngErrorMessage:xe}),Dx=xe({ngTokenPath:xe});function Ld(t,n){return ih("",-200,n)}function Es(t,n){throw new S(-201,!1)}function ih(t,n,e){let i=new S(n,t);return i[nh]=n,i[Ex]=t,e&&(i[Dx]=e),i}function Ix(t){return t[nh]}var _d;function oh(){return _d}function pt(t){let n=_d;return _d=t,n}function Vd(t,n,e){let i=xs(t);if(i&&i.providedIn=="root")return i.value===void 0?i.value=i.factory():i.value;if(e&8)return null;if(n!==void 0)return n;Es(t,"")}var lo=globalThis;var Mx={},vi=Mx,Nx="__NG_DI_FLAG__",wd=class{injector;constructor(n){this.injector=n}retrieve(n,e){let i=bi(e)||0;try{return this.injector.get(n,i&8?null:vi,i)}catch(o){if(Ji(o))return o;throw o}}};function Tx(t,n=0){let e=Oa();if(e===void 0)throw new S(-203,!1);if(e===null)return Vd(t,void 0,n);{let i=kx(n),o=e.retrieve(t,i);if(Ji(o)){if(i.optional)return null;throw o}return o}}function R(t,n=0){return(oh()||Tx)(tt(t),n)}function m(t,n){return R(t,bi(n))}function bi(t){return typeof t>"u"||typeof t=="number"?t:0|(t.optional&&8)|(t.host&&1)|(t.self&&2)|(t.skipSelf&&4)}function kx(t){return{optional:!!(t&8),host:!!(t&1),self:!!(t&2),skipSelf:!!(t&4)}}function xd(t){let n=[];for(let e=0;e<t.length;e++){let i=tt(t[e]);if(Array.isArray(i)){if(i.length===0)throw new S(900,!1);let o,r=0;for(let a=0;a<i.length;a++){let s=i[a],c=Ax(s);typeof c=="number"?c===-1?o=s.token:r|=c:o=s}n.push(R(o,r))}else n.push(R(i))}return n}function Ax(t){return t[Nx]}function Vn(t,n){let e=Object.hasOwn(t,vr);return e?t[vr]:null}function rh(t,n,e){if(t.length!==n.length)return!1;for(let i=0;i<t.length;i++){let o=t[i],r=n[i];if(e&&(o=e(o),r=e(r)),r!==o)return!1}return!0}function ah(t){return t.flat(Number.POSITIVE_INFINITY)}function Ds(t,n){t.forEach(e=>Array.isArray(e)?Ds(e,n):n(e))}function jd(t,n,e){n>=t.length?t.push(e):t.splice(n,0,e)}function xr(t,n){return n>=t.length-1?t.pop():t.splice(n,1)[0]}function sh(t,n){let e=[];for(let i=0;i<t;i++)e.push(n);return e}function ch(t,n,e,i){let o=t.length;if(o==n)t.push(e,i);else if(o===1)t.push(i,t[0]),t[0]=e;else{for(o--,t.push(t[o-1],t[o]);o>n;){let r=o-2;t[o]=t[r],o--}t[n]=e,t[n+1]=i}}function Is(t,n,e){let i=uo(t,n);return i>=0?t[i|1]=e:(i=~i,ch(t,i,n,e)),i}function Ms(t,n){let e=uo(t,n);if(e>=0)return t[e|1]}function uo(t,n){return Rx(t,n,1)}function Rx(t,n,e){let i=0,o=t.length>>e;for(;o!==i;){let r=i+(o-i>>1),a=t[r<<e];if(n===a)return r<<e;a>n?o=r:i=r+1}return~(o<<e)}var Bn={},st=[],mo=new b(""),Bd=new b("",-1),Hd=new b(""),co=class{get(n,e=vi){if(e===vi){let o=ih("",-201);throw o.name="\u0275NotFound",o}return e}};function lh(...t){return{\u0275providers:zd(!0,t),\u0275fromNgModule:!0}}function zd(t,...n){let e=[],i=new Set,o,r=a=>{e.push(a)};return Ds(n,a=>{let s=a;gs(s,r,[],i)&&(o||=[],o.push(s))}),o!==void 0&&dh(o,r),e}function dh(t,n){for(let e=0;e<t.length;e++){let{ngModule:i,providers:o}=t[e];Ud(o,r=>{n(r,i)})}}function gs(t,n,e,i){if(t=tt(t),!t)return!1;let o=null,r=yd(t),a=!r&&jn(t);if(!r&&!a){let c=t.ngModule;if(r=yd(c),r)o=c;else return!1}else{if(a&&!a.standalone)return!1;o=t}let s=i.has(o);if(a){if(s)return!1;if(i.add(o),a.dependencies){let c=typeof a.dependencies=="function"?a.dependencies():a.dependencies;for(let l of c)gs(l,n,e,i)}}else if(r){if(r.imports!=null&&!s){i.add(o);let l;Ds(r.imports,d=>{gs(d,n,e,i)&&(l||=[],l.push(d))}),l!==void 0&&dh(l,n)}if(!s){let l=Vn(o)||(()=>new o);n({provide:o,useFactory:l,deps:st},o),n({provide:Hd,useValue:o,multi:!0},o),n({provide:mo,useValue:()=>R(o),multi:!0},o)}let c=r.providers;if(c!=null&&!s){let l=t;Ud(c,d=>{n(d,l)})}}else return!1;return o!==t&&t.providers!==void 0}function Ud(t,n){for(let e of t)Rd(e)&&(e=e.\u0275providers),Array.isArray(e)?Ud(e,n):n(e)}var Ox=xe({provide:String,useValue:xe});function uh(t){return t!==null&&typeof t=="object"&&Ox in t}function Fx(t){return!!(t&&t.useExisting)}function Px(t){return!!(t&&t.useFactory)}function yi(t){return typeof t=="function"}function mh(t){return!!t.useClass}var Cr=new b(""),fs={},Xf={},bd;function po(){return bd===void 0&&(bd=new co),bd}var $e=class{},_i=class extends $e{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(n,e,i,o){super(),this.parent=e,this.source=i,this.scopes=o,Sd(n,a=>this.processProvider(a)),this.records.set(Bd,so(void 0,this)),o.has("environment")&&this.records.set($e,so(void 0,this));let r=this.records.get(Cr);r!=null&&typeof r.value=="string"&&this.scopes.add(r.value),this.injectorDefTypes=new Set(this.get(Hd,st,{self:!0}))}retrieve(n,e){let i=bi(e)||0;try{return this.get(n,vi,i)}catch(o){if(Ji(o))return o;throw o}}destroy(){gr(this),this._destroyed=!0;let n=I(null);try{for(let i of this._ngOnDestroyHooks)i.ngOnDestroy();let e=this._onDestroyHooks;this._onDestroyHooks=[];for(let i of e)i()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),I(n)}}onDestroy(n){return gr(this),this._onDestroyHooks.push(n),()=>this.removeOnDestroy(n)}runInContext(n){gr(this);let e=en(this),i=pt(void 0),o;try{return n()}finally{en(e),pt(i)}}get(n,e=vi,i){if(gr(this),Object.hasOwn(n,Zf))return n[Zf](this);let o=bi(i),r,a=en(this),s=pt(void 0);try{if(!(o&4)){let l=this.records.get(n);if(l===void 0){let d=Hx(n)&&xs(n);d&&this.injectableDefInScope(d)?l=so(Cd(n),fs):l=null,this.records.set(n,l)}if(l!=null)return this.hydrate(n,l,o)}let c=o&2?po():this.parent;return e=o&8&&e===vi?null:e,c.get(n,e)}catch(c){let l=Ix(c);throw l===-200||l===-201?new S(l,null):c}finally{pt(s),en(a)}}resolveInjectorInitializers(){let n=I(null),e=en(this),i=pt(void 0),o;try{let r=this.get(mo,st,{self:!0});for(let a of r)a()}finally{en(e),pt(i),I(n)}}toString(){return"R3Injector[...]"}processProvider(n){n=tt(n);let e=yi(n)?n:tt(n&&n.provide),i=Vx(n);if(!yi(n)&&n.multi===!0){let o=this.records.get(e);o||(o=so(void 0,fs,!0),o.factory=()=>xd(o.multi),this.records.set(e,o)),e=n,o.multi.push(n)}this.records.set(e,i)}hydrate(n,e,i){let o=I(null);try{if(e.value===Xf)throw Ld("");return e.value===fs&&(e.value=Xf,e.value=e.factory(void 0,i)),typeof e.value=="object"&&e.value&&Bx(e.value)&&this._ngOnDestroyHooks.add(e.value),e.value}finally{I(o)}}injectableDefInScope(n){if(!n.providedIn)return!1;let e=tt(n.providedIn);return typeof e=="string"?e==="any"||this.scopes.has(e):this.injectorDefTypes.has(e)}removeOnDestroy(n){let e=this._onDestroyHooks.indexOf(n);e!==-1&&this._onDestroyHooks.splice(e,1)}};function Cd(t){let n=xs(t),e=n!==null?n.factory:Vn(t);if(e!==null)return e;if(t instanceof b)throw new S(-204,!1);if(t instanceof Function)return Lx(t);throw new S(-204,!1)}function Lx(t){if(t.length>0)throw new S(-204,!1);let e=Sx(t);return e!==null?()=>e.factory(t):()=>new t}function Vx(t){if(uh(t))return so(void 0,t.useValue);{let n=$d(t);return so(n,fs)}}function $d(t,n,e){let i;if(yi(t)){let o=tt(t);return Vn(o)||Cd(o)}else if(uh(t))i=()=>tt(t.useValue);else if(Px(t))i=()=>t.useFactory(...xd(t.deps||[]));else if(Fx(t))i=(o,r)=>R(tt(t.useExisting),r!==void 0&&r&8?8:void 0);else{let o=tt(t&&(t.useClass||t.provide));if(jx(t))i=()=>new o(...xd(t.deps));else return Vn(o)||Cd(o)}return i}function gr(t){if(t.destroyed)throw new S(-205,!1)}function so(t,n,e=!1){return{factory:t,value:n,multi:e?[]:void 0}}function jx(t){return!!t.deps}function Bx(t){return t!==null&&typeof t=="object"&&typeof t.ngOnDestroy=="function"}function Hx(t){return typeof t=="function"||typeof t=="object"&&t.ngMetadataName==="InjectionToken"}function Sd(t,n){for(let e of t)Array.isArray(e)?Sd(e,n):e&&Rd(e)?Sd(e.\u0275providers,n):n(e)}function fo(t,n){let e;t instanceof _i?(gr(t),e=t):e=new wd(t);let i,o=en(e),r=pt(void 0);try{return n()}finally{en(o),pt(r)}}function ph(){return oh()!==void 0||Oa()!=null}var jt=0,T=1,V=2,je=3,Et=4,Xe=5,xi=6,ho=7,Pe=8,vn=9,rn=10,Ie=11,go=12,Gd=13,Hn=14,it=15,zn=16,Ci=17,an=18,Sr=19,Wd=20,pn=21,Ns=22,fn=23,_t=24,Si=25,fh=26,vo=27,Fe=28,hh=1,qd=6,Ei=7,Er=8,Di=9,Le=10;function bn(t){return Array.isArray(t)&&typeof t[hh]=="object"}function Dt(t){return Array.isArray(t)&&t[hh]===!0}function Yd(t){return(t.flags&4)!==0}function yn(t){return t.componentOffset>-1}function Dr(t){return(t.flags&1)===1}function _n(t){return!!t.template}function bo(t){return(t[V]&512)!==0}function Ii(t){return(t[V]&256)===256}var lt=(function(t){return t[t.NONE=0]="NONE",t[t.HTML=1]="HTML",t[t.STYLE=2]="STYLE",t[t.SCRIPT=3]="SCRIPT",t[t.URL=4]="URL",t[t.RESOURCE_URL=5]="RESOURCE_URL",t[t.ATTRIBUTE_NO_BINDING=6]="ATTRIBUTE_NO_BINDING",t})(lt||{});var Kd="svg",gh="math";function ot(t){for(;Array.isArray(t);)t=t[jt];return t}function Zd(t,n){return ot(n[t])}function It(t,n){return ot(n[t.index])}function Ts(t,n){return t.data[n]}function Xd(t,n){return t[n]}function Qd(t,n,e,i){e>=t.data.length&&(t.data[e]=null,t.blueprint[e]=null),n[e]=i}function Mt(t,n){let e=n[t];return bn(e)?e:e[jt]}function vh(t){return(t[V]&4)===4}function ks(t){return(t[V]&128)===128}function bh(t){return Dt(t[je])}function Nt(t,n){return n==null?null:t[n]}function Jd(t){t[Ci]=0}function eu(t){t[V]&1024||(t[V]|=1024,ks(t)&&Mi(t))}function yh(t,n){for(;t>0;)n=n[Hn],t--;return n}function Ir(t){return!!(t[V]&5120||t[_t]?.dirty)}function As(t){t[rn].changeDetectionScheduler?.notify(8),t[V]&64&&(t[V]|=1024),Ir(t)&&Mi(t)}function Mi(t){t[rn].changeDetectionScheduler?.notify(0);let n=hn(t);for(;n!==null&&!(n[V]&4096||(n[V]|=4096,!ks(n)));)n=hn(n)}function Rs(t,n){if(Ii(t))throw new S(911,!1);t[pn]===null&&(t[pn]=[]),t[pn].push(n)}function _h(t,n){if(t[pn]===null)return;let e=t[pn].indexOf(n);e!==-1&&t[pn].splice(e,1)}function hn(t){let n=t[je];return Dt(n)?n[je]:n}function tu(t){return t[ho]??=[]}function nu(t){return t.cleanup??=[]}function wh(t,n,e,i){let o=tu(n);o.push(e),t.firstCreatePass&&nu(t).push(i,o.length-1)}var ee={lFrame:Rh(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var Ed=!1;function xh(){return ee.lFrame.elementDepthCount}function Ch(){ee.lFrame.elementDepthCount++}function iu(){ee.lFrame.elementDepthCount--}function ou(){return ee.bindingsEnabled}function ru(){return ee.skipHydrationRootTNode!==null}function au(t){return ee.skipHydrationRootTNode===t}function su(){ee.skipHydrationRootTNode=null}function U(){return ee.lFrame.lView}function Te(){return ee.lFrame.tView}function Ni(t){return ee.lFrame.contextLView=t,t[Pe]}function Ti(t){return ee.lFrame.contextLView=null,t}function Ye(){let t=cu();for(;t!==null&&t.type===64;)t=t.parent;return t}function cu(){return ee.lFrame.currentTNode}function Sh(){let t=ee.lFrame,n=t.currentTNode;return t.isParent?n:n.parent}function yo(t,n){let e=ee.lFrame;e.currentTNode=t,e.isParent=n}function lu(){return ee.lFrame.isParent}function du(){ee.lFrame.isParent=!1}function Eh(){return ee.lFrame.contextLView}function uu(){return Ed}function br(t){let n=Ed;return Ed=t,n}function Dh(){let t=ee.lFrame,n=t.bindingRootIndex;return n===-1&&(n=t.bindingRootIndex=t.tView.bindingStartIndex),n}function Ih(t){return ee.lFrame.bindingIndex=t}function ki(){return ee.lFrame.bindingIndex++}function mu(t){let n=ee.lFrame,e=n.bindingIndex;return n.bindingIndex=n.bindingIndex+t,e}function Mh(){return ee.lFrame.inI18n}function Nh(t,n){let e=ee.lFrame;e.bindingIndex=e.bindingRootIndex=t,Os(n)}function Th(){return ee.lFrame.currentDirectiveIndex}function Os(t){ee.lFrame.currentDirectiveIndex=t}function kh(t){let n=ee.lFrame.currentDirectiveIndex;return n===-1?null:t[n]}function Fs(){return ee.lFrame.currentQueryIndex}function Mr(t){ee.lFrame.currentQueryIndex=t}function zx(t){let n=t[T];return n.type===2?n.declTNode:n.type===1?t[Xe]:null}function pu(t,n,e){if(e&4){let o=n,r=t;for(;o=o.parent,o===null&&!(e&1);)if(o=zx(r),o===null||(r=r[Hn],o.type&10))break;if(o===null)return!1;n=o,t=r}let i=ee.lFrame=Ah();return i.currentTNode=n,i.lView=t,!0}function Ps(t){let n=Ah(),e=t[T];ee.lFrame=n,n.currentTNode=e.firstChild,n.lView=t,n.tView=e,n.contextLView=t,n.bindingIndex=e.bindingStartIndex,n.inI18n=!1}function Ah(){let t=ee.lFrame,n=t===null?null:t.child;return n===null?Rh(t):n}function Rh(t){let n={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:t,child:null,inI18n:!1};return t!==null&&(t.child=n),n}function Oh(){let t=ee.lFrame;return ee.lFrame=t.parent,t.currentTNode=null,t.lView=null,t}var fu=Oh;function Ls(){let t=Oh();t.isParent=!0,t.tView=null,t.selectedIndex=-1,t.contextLView=null,t.elementDepthCount=0,t.currentDirectiveIndex=-1,t.currentNamespace=null,t.bindingRootIndex=-1,t.bindingIndex=-1,t.currentQueryIndex=0}function Fh(t){return(ee.lFrame.contextLView=yh(t,ee.lFrame.contextLView))[Pe]}function wn(){return ee.lFrame.selectedIndex}function Un(t){ee.lFrame.selectedIndex=t}function Nr(){let t=ee.lFrame;return Ts(t.tView,t.selectedIndex)}function Tr(){ee.lFrame.currentNamespace=Kd}function hu(){return ee.lFrame.currentNamespace}var Ph=!0;function Vs(){return Ph}function js(t){Ph=t}function Dd(t,n=null,e=null,i){let o=Lh(t,n,e,i);return o.resolveInjectorInitializers(),o}function Lh(t,n=null,e=null,i,o=new Set){let r=[e||st,lh(t)],a;return new _i(r,n||po(),a||null,o)}var te=class t{static THROW_IF_NOT_FOUND=vi;static NULL=new co;static create(n,e){if(Array.isArray(n))return Dd({name:""},e,n,"");{let i=n.name??"";return Dd({name:i},n.parent,n.providers,i)}}static \u0275prov=W({token:t,providedIn:"any",factory:()=>R(Bd)});static __NG_ELEMENT_ID__=-1},A=new b(""),nt=class{static __NG_ELEMENT_ID__=Ux;static __NG_ENV_ID__=n=>n},vs=class extends nt{_lView;constructor(n){super(),this._lView=n}get destroyed(){return Ii(this._lView)}onDestroy(n){let e=this._lView;return Rs(e,n),()=>_h(e,n)}};function Ux(){return new vs(U())}var Vh=!1,jh=new b(""),Ai=(()=>{class t{taskId=0;pendingTasks=new Set;destroyed=!1;pendingTask=new pi(!1);debugTaskTracker=m(jh,{optional:!0});get hasPendingTasks(){return this.destroyed?!1:this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new K(e=>{e.next(!1),e.complete()}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(!0);let e=this.taskId++;return this.pendingTasks.add(e),this.debugTaskTracker?.add(e),e}has(e){return this.pendingTasks.has(e)}remove(e){this.pendingTasks.delete(e),this.debugTaskTracker?.remove(e),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(!1),this.destroyed=!0,this.pendingTask.unsubscribe()}static \u0275prov=W({token:t,providedIn:"root",factory:()=>new t})}return t})(),Id=class extends D{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(n=!1){super(),this.__isAsync=n,ph()&&(this.destroyRef=m(nt,{optional:!0})??void 0,this.pendingTasks=m(Ai,{optional:!0})??void 0)}emit(n){let e=I(null);try{super.next(n)}finally{I(e)}}subscribe(n,e,i){let o=n,r=e||(()=>null),a=i;if(n&&typeof n=="object"){let c=n;o=c.next?.bind(c),r=c.error?.bind(c),a=c.complete?.bind(c)}this.__isAsync&&(r=this.wrapInTimeout(r),o&&(o=this.wrapInTimeout(o)),a&&(a=this.wrapInTimeout(a)));let s=super.subscribe({next:o,error:r,complete:a});return n instanceof we&&n.add(s),s}wrapInTimeout(n){return e=>{let i=this.pendingTasks?.add();setTimeout(()=>{try{n(e)}finally{i!==void 0&&this.pendingTasks?.remove(i)}})}}},de=Id;function bs(...t){}function gu(t){let n,e;function i(){t=bs;try{e!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(e),n!==void 0&&clearTimeout(n)}catch(o){}}return n=setTimeout(()=>{t(),i()}),typeof requestAnimationFrame=="function"&&(e=requestAnimationFrame(()=>{t(),i()})),()=>i()}function Bh(t){return queueMicrotask(()=>t()),()=>{t=bs}}var Hh="isAngularZone",N=class t{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new de(!1);onMicrotaskEmpty=new de(!1);onStable=new de(!1);onError=new de(!1);constructor(n){let{enableLongStackTrace:e=!1,shouldCoalesceEventChangeDetection:i=!1,shouldCoalesceRunChangeDetection:o=!1,scheduleInRootZone:r=Vh}=n;if(typeof Zone>"u")throw new S(908,!1);Zone.assertZonePatched();let a=this;a._nesting=0,a._outer=a._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(a._inner=a._inner.fork(new Zone.TaskTrackingZoneSpec)),e&&Zone.longStackTraceZoneSpec&&(a._inner=a._inner.fork(Zone.longStackTraceZoneSpec)),a.shouldCoalesceEventChangeDetection=!o&&i,a.shouldCoalesceRunChangeDetection=o,a.callbackScheduled=!1,a.scheduleInRootZone=r,Wx(a)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(Hh)===!0}static assertInAngularZone(){if(!t.isInAngularZone())throw new S(909,!1)}static assertNotInAngularZone(){if(t.isInAngularZone())throw new S(909,!1)}run(n,e,i){return this._inner.run(n,e,i)}runTask(n,e,i,o){let r=this._inner,a=r.scheduleEventTask("NgZoneEvent: "+o,n,$x,bs,bs);try{return r.runTask(a,e,i)}finally{r.cancelTask(a)}}runGuarded(n,e,i){return this._inner.runGuarded(n,e,i)}runOutsideAngular(n){return this._outer.run(n)}},$x={};function vu(t){if(t._nesting==0&&!t.hasPendingMicrotasks&&!t.isStable)try{t._nesting++,t.onMicrotaskEmpty.emit(null)}finally{if(t._nesting--,!t.hasPendingMicrotasks)try{t.runOutsideAngular(()=>t.onStable.emit(null))}finally{t.isStable=!0}}}function Gx(t){if(t.isCheckStableRunning||t.callbackScheduled)return;t.callbackScheduled=!0;function n(){gu(()=>{t.callbackScheduled=!1,Md(t),t.isCheckStableRunning=!0,vu(t),t.isCheckStableRunning=!1})}t.scheduleInRootZone?Zone.root.run(()=>{n()}):t._outer.run(()=>{n()}),Md(t)}function Wx(t){let n=()=>{Gx(t)};t._inner=t._inner.fork({name:"angular",properties:{[Hh]:!0},onInvokeTask:(e,i,o,r,a,s)=>{if(qx(s))return e.invokeTask(o,r,a,s);try{return Qf(t),e.invokeTask(o,r,a,s)}finally{(t.shouldCoalesceEventChangeDetection&&r.type==="eventTask"||t.shouldCoalesceRunChangeDetection)&&n(),Jf(t)}},onInvoke:(e,i,o,r,a,s,c)=>{try{return Qf(t),e.invoke(o,r,a,s,c)}finally{t.shouldCoalesceRunChangeDetection&&!t.callbackScheduled&&!Yx(s)&&n(),Jf(t)}},onHasTask:(e,i,o,r)=>{e.hasTask(o,r),i===o&&(r.change=="microTask"?(t._hasPendingMicrotasks=r.microTask,Md(t),vu(t)):r.change=="macroTask"&&(t.hasPendingMacrotasks=r.macroTask))},onHandleError:(e,i,o,r)=>(e.handleError(o,r),t.runOutsideAngular(()=>t.onError.emit(r)),!1)})}function Md(t){t._hasPendingMicrotasks||(t.shouldCoalesceEventChangeDetection||t.shouldCoalesceRunChangeDetection)&&t.callbackScheduled===!0?t.hasPendingMicrotasks=!0:t.hasPendingMicrotasks=!1}function Qf(t){t._nesting++,t.isStable&&(t.isStable=!1,t.onUnstable.emit(null))}function Jf(t){t._nesting--,vu(t)}var yr=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new de;onMicrotaskEmpty=new de;onStable=new de;onError=new de;run(n,e,i){return n.apply(e,i)}runGuarded(n,e,i){return n.apply(e,i)}runOutsideAngular(n){return n()}runTask(n,e,i,o){return n.apply(e,i)}};function qx(t){return zh(t,"__ignore_ng_zone__")}function Yx(t){return zh(t,"__scheduler_tick__")}function zh(t,n){return!Array.isArray(t)||t.length!==1?!1:t[0]?.data?.[n]===!0}var ct=class{_console=console;handleError(n){this._console.error("ERROR",n)}};function Uh(t){return $h(t)?t:new Nd(t)}function $h(t){return t instanceof Error||typeof t=="object"&&t!==null&&typeof t.name=="string"&&typeof t.message=="string"}var Nd=class extends Error{constructor(n){super(String(n),{cause:n}),this.name="ErrorBoundaryWrappedError"}},$n=new b("",{factory:()=>{let t=m(N),n=m($e),e;return i=>{t.runOutsideAngular(()=>{n.destroyed&&!e?setTimeout(()=>{throw i}):(e??=n.get(ct),e.handleError(i))})}}}),Gh={provide:mo,useValue:()=>{let t=m(ct,{optional:!0})},multi:!0};function ne(t,n){let[e,i,o]=nd(t,n?.equal),r=e,a=r[qe];return r.set=i,r.update=o,r.asReadonly=bu.bind(r),r}function bu(){let t=this[qe];if(t.readonlyFn===void 0){let n=()=>this();n[qe]=t,t.readonlyFn=n}return t.readonlyFn}var xn=new b("",{factory:()=>Kx}),Kx="ng";var Bs=new b(""),Cn=new b("",{providedIn:"platform",factory:()=>"unknown"}),kr=new b(""),Gn=new b("",{factory:()=>m(A).body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var _o=(()=>{class t{view;node;constructor(e,i){this.view=e,this.node=i}static __NG_ELEMENT_ID__=Zx}return t})();function Zx(){return new _o(U(),Ye())}var on=class{},Ar=new b("",{factory:()=>!0});var yu=new b(""),Hs=(()=>{class t{static \u0275prov=W({token:t,providedIn:"root",factory:()=>new Td})}return t})(),Td=class{dirtyEffectCount=0;queues=new Map;add(n){this.enqueue(n),this.schedule(n)}schedule(n){n.dirty&&this.dirtyEffectCount++}remove(n){let e=n.zone,i=this.queues.get(e);i.has(n)&&(i.delete(n),n.dirty&&this.dirtyEffectCount--)}enqueue(n){let e=n.zone;this.queues.has(e)||this.queues.set(e,new Set);let i=this.queues.get(e);i.has(n)||i.add(n)}flush(){for(;this.dirtyEffectCount>0;){let n=!1;for(let[e,i]of this.queues)e===null?n||=this.flushQueue(i):n||=e.run(()=>this.flushQueue(i));n||(this.dirtyEffectCount=0)}}flushQueue(n){let e=!1;for(let i of n)i.dirty&&(this.dirtyEffectCount--,e=!0,i.run());return e}},ys=class{constructor(n){this[qe]=n}destroy(){this[qe].destroy()}};function gt(t,n){let e=n?.injector??m(te),i=n?.manualCleanup!==!0?e.get(nt):null,o,r=e.get(_o,null,{optional:!0}),a=e.get(on);return r!==null?(o=qh(r.view,a,t),i instanceof vs&&i._lView===r.view&&(i=null)):o=Jx(t,e.get(Hs),a),o.injector=e,i!==null&&(o.onDestroyFns=[i.onDestroy(()=>o.destroy())]),new ys(o)}var Wh=Q(C({},od),{cleanupFns:void 0,zone:null,onDestroyFns:null,run(){let t=br(!1);try{rd(this)}finally{br(t)}},cleanup(){if(!this.cleanupFns?.length)return;let t=I(null);try{for(;this.cleanupFns.length;)this.cleanupFns.pop()()}finally{this.cleanupFns=[],I(t)}}}),Xx=Q(C({},Wh),{consumerMarkedDirty(){this.scheduler.schedule(this),this.notifier.notify(12)},destroy(){if(Ln(this),this.onDestroyFns!==null)for(let t of this.onDestroyFns)t();this.cleanup(),this.scheduler.remove(this)}}),Qx=Q(C({},Wh),{consumerMarkedDirty(){this.view[V]|=4096,Mi(this.view),this.notifier.notify(13)},destroy(){if(Ln(this),this.onDestroyFns!==null)for(let t of this.onDestroyFns)t();this.cleanup(),this.view[fn]?.delete(this)}});function qh(t,n,e){let i=Object.create(Qx);return i.view=t,i.zone=typeof Zone<"u"?Zone.current:null,i.notifier=n,i.userFn=e,i.fn=Yh(i,e),t[fn]??=new Set,t[fn].add(i),i.consumerMarkedDirty(i),i}function Jx(t,n,e){let i=Object.create(Xx);return i.userFn=t,i.fn=Yh(i,t),i.scheduler=n,i.notifier=e,i.zone=typeof Zone<"u"?Zone.current:null,i.scheduler.add(i),i.notifier.notify(12),i}function Yh(t,n){return()=>{n(e=>(t.cleanupFns??=[]).push(e))}}function wt(t){return typeof t=="function"&&t[qe]!==void 0}var Rr=(()=>{class t{internalPendingTasks=m(Ai);scheduler=m(on);errorHandler=m($n);add(){let e=this.internalPendingTasks.add();return()=>{this.internalPendingTasks.has(e)&&(this.scheduler.notify(11),this.internalPendingTasks.remove(e))}}run(e){let i=this.add();try{e().catch(this.errorHandler).finally(i)}catch(o){this.errorHandler(o),i()}}static \u0275prov=W({token:t,providedIn:"root",factory:()=>new t})}return t})();var dc=Symbol("InputSignalNode#UNSET"),kg=Q(C({},Qi),{transformFn:void 0,applyValueToInputSignal(t,n){li(t,n)}});function $r(t){return{toString:t}.toString()}var ce=(function(t){return t[t.TemplateCreateStart=0]="TemplateCreateStart",t[t.TemplateCreateEnd=1]="TemplateCreateEnd",t[t.TemplateUpdateStart=2]="TemplateUpdateStart",t[t.TemplateUpdateEnd=3]="TemplateUpdateEnd",t[t.LifecycleHookStart=4]="LifecycleHookStart",t[t.LifecycleHookEnd=5]="LifecycleHookEnd",t[t.OutputStart=6]="OutputStart",t[t.OutputEnd=7]="OutputEnd",t[t.BootstrapApplicationStart=8]="BootstrapApplicationStart",t[t.BootstrapApplicationEnd=9]="BootstrapApplicationEnd",t[t.BootstrapComponentStart=10]="BootstrapComponentStart",t[t.BootstrapComponentEnd=11]="BootstrapComponentEnd",t[t.ChangeDetectionStart=12]="ChangeDetectionStart",t[t.ChangeDetectionEnd=13]="ChangeDetectionEnd",t[t.ChangeDetectionSyncStart=14]="ChangeDetectionSyncStart",t[t.ChangeDetectionSyncEnd=15]="ChangeDetectionSyncEnd",t[t.AfterRenderHooksStart=16]="AfterRenderHooksStart",t[t.AfterRenderHooksEnd=17]="AfterRenderHooksEnd",t[t.ComponentStart=18]="ComponentStart",t[t.ComponentEnd=19]="ComponentEnd",t[t.DeferBlockStateStart=20]="DeferBlockStateStart",t[t.DeferBlockStateEnd=21]="DeferBlockStateEnd",t[t.DynamicComponentStart=22]="DynamicComponentStart",t[t.DynamicComponentEnd=23]="DynamicComponentEnd",t[t.HostBindingsUpdateStart=24]="HostBindingsUpdateStart",t[t.HostBindingsUpdateEnd=25]="HostBindingsUpdateEnd",t})(ce||{}),Ks=class{previousValue;currentValue;firstChange;constructor(n,e,i){this.previousValue=n,this.currentValue=e,this.firstChange=i}isFirstChange(){return this.firstChange}};function Ag(t,n,e,i){n!==null?n.applyValueToInputSignal(n,i):t[e]=i}var Rg=null,ft=(()=>{Rg=Kh;let t=()=>Kh;return t.ngInherit=!0,t})();function p0(){return Rg}function Kh(t){return t.type.prototype.ngOnChanges&&(t.setInput=h0),f0}function f0(){let t=Og(this),n=t?.current;if(n){let e=t.previous;if(e===Bn)t.previous=n;else for(let i in n)e[i]=n[i];t.current=null,this.ngOnChanges(n)}}function h0(t,n,e,i,o){let r=this.declaredInputs[i],a=Og(t)||g0(t,{previous:Bn,current:null}),s=a.current||(a.current={}),c=a.previous,l=c[r];s[r]=new Ks(l&&l.currentValue,e,c===Bn),Ag(t,n,o,e)}var Tu="__ngSimpleChanges__";function Og(t){return Object.hasOwn(t,Tu)&&t[Tu]||null}function g0(t,n){return t[Tu]=n}var Zh=[];var pe=function(t,n=null,e){for(let i=0;i<Zh.length;i++){let o=Zh[i];o(t,n,e)}};function v0(t,n,e){let{ngOnChanges:i,ngOnInit:o,ngDoCheck:r}=n.type.prototype;if(i){let a=p0()(n);(e.preOrderHooks??=[]).push(t,a),(e.preOrderCheckHooks??=[]).push(t,a)}o&&(e.preOrderHooks??=[]).push(0-t,o),r&&((e.preOrderHooks??=[]).push(t,r),(e.preOrderCheckHooks??=[]).push(t,r))}function Fg(t,n){for(let e=n.directiveStart,i=n.directiveEnd;e<i;e++){let r=t.data[e].type.prototype,{ngAfterContentInit:a,ngAfterContentChecked:s,ngAfterViewInit:c,ngAfterViewChecked:l,ngOnDestroy:d}=r;a&&(t.contentHooks??=[]).push(-e,a),s&&((t.contentHooks??=[]).push(e,s),(t.contentCheckHooks??=[]).push(e,s)),c&&(t.viewHooks??=[]).push(-e,c),l&&((t.viewHooks??=[]).push(e,l),(t.viewCheckHooks??=[]).push(e,l)),d!=null&&(t.destroyHooks??=[]).push(e,d)}}function Gs(t,n,e){Pg(t,n,3,e)}function Ws(t,n,e,i){(t[V]&3)===e&&Pg(t,n,e,i)}function _u(t,n){let e=t[V];(e&3)===n&&(e&=8191,e+=1,t[V]=e)}function Pg(t,n,e,i){let o=i!==void 0?t[Ci]&65535:0,r=i??-1,a=n.length-1,s=0;for(let c=o;c<a;c++)if(typeof n[c+1]=="number"){if(s=n[c],i!=null&&s>=i)break}else n[c]<0&&(t[Ci]+=65536),(s<r||r==-1)&&(b0(t,e,n,c),t[Ci]=(t[Ci]&4294901760)+c+2),c++}function Xh(t,n){pe(ce.LifecycleHookStart,t,n);let e=I(null);try{n.call(t)}finally{I(e),pe(ce.LifecycleHookEnd,t,n)}}function b0(t,n,e,i){let o=e[i]<0,r=e[i+1],a=o?-e[i]:e[i],s=t[a];o?t[V]>>13<t[Ci]>>16&&(t[V]&3)===n&&(t[V]+=8192,Xh(s,r)):Xh(s,r)}var Co=-1,Oi=class{factory;name;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(n,e,i,o){this.factory=n,this.name=o,this.canSeeViewProviders=e,this.injectImpl=i}};function y0(t){return(t.flags&8)!==0}function _0(t){return(t.flags&16)!==0}function w0(t,n,e){let i=0;for(;i<e.length;){let o=e[i];if(typeof o=="number"){if(o!==0)break;i++;let r=e[i++],a=e[i++],s=e[i++];t.setAttribute(n,a,s,r)}else{let r=o,a=e[++i];x0(r)?t.setProperty(n,r,a):t.setAttribute(n,r,a),i++}}return i}function Lg(t){return t===3||t===4||t===6}function x0(t){return t.charCodeAt(0)===64}function Eo(t,n){if(!(n===null||n.length===0))if(t===null||t.length===0)t=n.slice();else{let e=-1;for(let i=0;i<n.length;i++){let o=n[i];typeof o=="number"?e=o:e===0||(e===-1||e===2?Qh(t,e,o,null,n[++i]):Qh(t,e,o,null,null))}}return t}function Qh(t,n,e,i,o){let r=0,a=t.length;if(n===-1)a=-1;else for(;r<t.length;){let s=t[r++];if(typeof s=="number"){if(s===n){a=-1;break}else if(s>n){a=r-1;break}}}for(;r<t.length;){let s=t[r];if(typeof s=="number")break;if(s===e){o!==null&&(t[r+1]=o);return}r++,o!==null&&r++}a!==-1&&(t.splice(a,0,n),r=a+1),t.splice(r++,0,e),o!==null&&t.splice(r++,0,o)}function Vg(t){return t!==Co}function Zs(t){return t&32767}function C0(t){return t>>16}function Xs(t,n){let e=C0(t),i=n;for(;e>0;)i=i[Hn],e--;return i}var ku=!0;function Qs(t){let n=ku;return ku=t,n}var S0=256,jg=S0-1,Bg=5,E0=0,sn={};function D0(t,n,e){let i;typeof e=="string"?i=e.charCodeAt(0)||0:Object.hasOwn(e,wi)&&(i=e[wi]),i==null&&(i=e[wi]=E0++);let o=i&jg,r=1<<o;n.data[t+(o>>Bg)]|=r}function Js(t,n){let e=Hg(t,n);if(e!==-1)return e;let i=n[T];i.firstCreatePass&&(t.injectorIndex=n.length,wu(i.data,t),wu(n,null),wu(i.blueprint,null));let o=mm(t,n),r=t.injectorIndex;if(Vg(o)){let a=Zs(o),s=Xs(o,n),c=s[T].data;for(let l=0;l<8;l++)n[r+l]=s[a+l]|c[a+l]}return n[r+8]=o,r}function wu(t,n){t.push(0,0,0,0,0,0,0,0,n)}function Hg(t,n){return t.injectorIndex===-1||t.parent&&t.parent.injectorIndex===t.injectorIndex||n[t.injectorIndex+8]===null?-1:t.injectorIndex}function mm(t,n){if(t.parent&&t.parent.injectorIndex!==-1)return t.parent.injectorIndex;let e=0,i=null,o=n;for(;o!==null;){if(i=Wg(o),i===null)return Co;if(e++,o=o[Hn],i.injectorIndex!==-1)return i.injectorIndex|e<<16}return Co}function Au(t,n,e){D0(t,n,e)}function I0(t,n){if(n==="class")return t.classes;if(n==="style")return t.styles;let e=t.attrs;if(e){let i=e.length,o=0;for(;o<i;){let r=e[o];if(Lg(r))break;if(r===0)o=o+2;else if(typeof r=="number")for(o++;o<i&&typeof e[o]=="string";)o++;else{if(r===n)return e[o+1];o=o+2}}}return null}function zg(t,n,e){if(e&8||t!==void 0)return t;Es(n,"NodeInjector")}function Ug(t,n,e,i){if(e&8&&i===void 0&&(i=null),(e&3)===0){let o=t[vn],r=pt(void 0);try{return o?o.get(n,i,e&8):Vd(n,i,e&8)}finally{pt(r)}}return zg(i,n,e)}function $g(t,n,e,i=0,o){if(t!==null){if(n[V]&2048&&!(i&2)){let a=k0(t,n,e,i,sn);if(a!==sn)return a}let r=Gg(t,n,e,i,sn);if(r!==sn)return r}return Ug(n,e,i,o)}function Gg(t,n,e,i,o){let r=N0(e);if(typeof r=="function"){if(!pu(n,t,i))return i&1?zg(o,e,i):Ug(n,e,i,o);try{let a;if(a=r(i),a==null&&!(i&8))Es(e);else return a}finally{fu()}}else if(typeof r=="number"){let a=null,s=Hg(t,n),c=Co,l=i&1?n[it][Xe]:null;for((s===-1||i&4)&&(c=s===-1?mm(t,n):n[s+8],c===Co||!eg(i,!1)?s=-1:(a=n[T],s=Zs(c),n=Xs(c,n)));s!==-1;){let d=n[T];if(Jh(r,s,d.data)){let u=M0(s,n,e,a,i,l);if(u!==sn)return u}c=n[s+8],c!==Co&&eg(i,n[T].data[s+8]===l)&&Jh(r,s,n)?(a=d,s=Zs(c),n=Xs(c,n)):s=-1}}return o}function M0(t,n,e,i,o,r){let a=n[T],s=a.data[t+8],c=i==null?yn(s)&&ku:i!=a&&(s.type&3)!==0,l=o&1&&r===s,d=qs(s,a,e,c,l);return d!==null?Pr(n,a,d,s,o):sn}function qs(t,n,e,i,o){let r=t.providerIndexes,a=n.data,s=r&1048575,c=t.directiveStart,l=t.directiveEnd,d=r>>20,u=i?s:s+d,f=o?s+d:l;for(let p=u;p<f;p++){let v=a[p];if(p<c&&e===v||p>=c&&v.type===e)return p}if(o){let p=a[c];if(p&&_n(p)&&p.type===e)return c}return null}function Pr(t,n,e,i,o){let r=t[e],a=n.data;if(r instanceof Oi){let s=r;if(s.resolving)throw Ld("");let c=Qs(s.canSeeViewProviders);s.resolving=!0;let l=a[e].type||a[e],d,u=s.injectImpl?pt(s.injectImpl):null,f=pu(t,i,0);try{r=t[e]=s.factory(void 0,o,a,t,i),n.firstCreatePass&&e>=i.directiveStart&&v0(e,a[e],n)}finally{u!==null&&pt(u),Qs(c),s.resolving=!1,fu()}}return r}function N0(t){if(typeof t=="string")return t.charCodeAt(0)||0;let n=Object.hasOwn(t,wi)?t[wi]:void 0;return typeof n=="number"?n>=0?n&jg:T0:n}function Jh(t,n,e){let i=1<<t;return!!(e[n+(t>>Bg)]&i)}function eg(t,n){return!(t&2)&&!(t&1&&n)}var Sn=class{_tNode;_lView;constructor(n,e){this._tNode=n,this._lView=e}get(n,e,i){return $g(this._tNode,this._lView,n,bi(i),e)}};function T0(){return new Sn(Ye(),U())}function ln(t){return $r(()=>{let n=t.prototype.constructor,e=n[vr]||Ru(n),i=Object.prototype,o=Object.getPrototypeOf(t.prototype).constructor;for(;o&&o!==i;){let r=o[vr]||Ru(o);if(r&&r!==e)return r;o=Object.getPrototypeOf(o)}return r=>new r})}function Ru(t){return Ad(t)?()=>{let n=Ru(tt(t));return n&&n()}:Vn(t)}function k0(t,n,e,i,o){let r=t,a=n,s=i&1?n[it][Xe]:null;for(;r!==null&&a!==null&&a[V]&2048&&!bo(a);){let c=Gg(r,a,e,i|2,sn);if(c!==sn)return c;if(i&=-5,i&1&&r===s)return o;let l=r.parent;if(!l){let d=a[Wd];if(d){let u=d.get(e,sn,i);if(u!==sn)return u}l=Wg(a),a=a[Hn]}r=l}return o}function Wg(t){let n=t[T],e=n.type;return e===2?n.declTNode:e===1?t[Xe]:null}function pm(t){return I0(Ye(),t)}function O(t){return{token:t.token,providedIn:t.autoProvided===!1?null:"root",factory:t.factory,value:void 0}}function A0(){return To(Ye(),U())}function To(t,n){return new j(It(t,n))}var j=(()=>{class t{nativeElement;constructor(e){this.nativeElement=e}static __NG_ELEMENT_ID__=A0}return t})();function qg(t){return t instanceof j?t.nativeElement:t}function R0(){return this._results[Symbol.iterator]()}var En=class{_emitDistinctChangesOnly;dirty=!0;_onDirty=void 0;_results=[];_changesDetected=!1;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new D}constructor(n=!1){this._emitDistinctChangesOnly=n}get(n){return this._results[n]}map(n){return this._results.map(n)}filter(n){return this._results.filter(n)}find(n){return this._results.find(n)}reduce(n,e){return this._results.reduce(n,e)}forEach(n){this._results.forEach(n)}some(n){return this._results.some(n)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(n,e){this.dirty=!1;let i=ah(n);(this._changesDetected=!rh(this._results,i,e))&&(this._results=i,this.length=i.length,this.last=i[this.length-1],this.first=i[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this)}onDirty(n){this._onDirty=n}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}[Symbol.iterator]=R0};function Yg(t){let n=t.nextSibling;if(n&&t!==n.previousSibling)throw Kg(n);return n}function O0(t){let n=t.firstChild;if(n&&(n.parentNode!==t||n.previousSibling!==null))throw Kg(n);return n}function tg(t){let n=t.nodeName;return typeof n=="string"?n:"FORM"}function Kg(t){return new Error(`Action failed because the element is clobbered: ${t.outerHTML}`)}function Zg(t){return(t.flags&128)===128}var fm=(function(t){return t[t.OnPush=0]="OnPush",t[t.Eager=1]="Eager",t[t.Default=1]="Default",t})(fm||{}),Xg=new Map,F0=0;function P0(){return F0++}function L0(t){Xg.set(t[Sr],t)}function Ou(t){Xg.delete(t[Sr])}var ng="__ngContext__";function Do(t,n){bn(n)?(t[ng]=n[Sr],L0(n)):t[ng]=n}function Qg(t){return ev(t[go])}function Jg(t){return ev(t[Et])}function ev(t){for(;t!==null&&!Dt(t);)t=t[Et];return t}var Fu;function hm(t){Fu=t}function tv(){if(Fu!==void 0)return Fu;if(typeof document<"u")return document;throw new S(210,!1)}var nv="r";var iv="di";var ov=!1,rv=new b("",{factory:()=>ov});var ig=new WeakMap;function V0(t,n){if(t==null||typeof t!="object")return;let e=ig.get(t);e||(e=new WeakSet,ig.set(t,e)),e.add(n)}var j0=(t,n,e,i)=>{};function B0(t,n,e,i){j0(t,n,e,i)}function uc(t){return(t.flags&32)===32}var H0=()=>null;function av(t,n,e=!1){return H0(t,n,e)}function sv(t,n){let e=t.contentQueries;if(e!==null){let i=I(null);try{for(let o=0;o<e.length;o+=2){let r=e[o],a=e[o+1];if(a!==-1){let s=t.data[a];Mr(r),s.contentQueries(2,n[a],a)}}}finally{I(i)}}}function Pu(t,n,e){Mr(0);let i=I(null);try{n(t,e)}finally{I(i)}}function cv(t,n,e){if(Yd(n)){let i=I(null);try{let o=n.directiveStart,r=n.directiveEnd;for(let a=o;a<r;a++){let s=t.data[a];if(s.contentQueries){let c=e[a];s.contentQueries(1,c,a)}}}finally{I(i)}}}var zt=(function(t){return t[t.Emulated=0]="Emulated",t[t.None=2]="None",t[t.ShadowDom=3]="ShadowDom",t[t.ExperimentalIsolatedShadowDom=4]="ExperimentalIsolatedShadowDom",t})(zt||{}),Dn=class{changingThisBreaksApplicationSecurity;constructor(n){this.changingThisBreaksApplicationSecurity=n}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity}`}},Lu=class extends Dn{getTypeName(){return"HTML"}},Vu=class extends Dn{getTypeName(){return"Style"}},ju=class extends Dn{getTypeName(){return"Script"}},Bu=class extends Dn{getTypeName(){return"URL"}},Hu=class extends Dn{getTypeName(){return"ResourceURL"}};function Ut(t){return t instanceof Dn?t.changingThisBreaksApplicationSecurity:t}function Vi(t,n){let e=lv(t);if(e!=null&&e!==n){if(e==="ResourceURL"&&n==="URL")return!0;throw new Error(`Required a safe ${n}, got a ${e} (see ${kd})`)}return e===n}function lv(t){return t instanceof Dn&&t.getTypeName()||null}function gm(t){return new Lu(t)}function vm(t){return new Vu(t)}function bm(t){return new ju(t)}function ym(t){return new Bu(t)}function _m(t){return new Hu(t)}var zs;function z0(){if(zs===void 0&&(zs=null,lo.trustedTypes))try{zs=lo.trustedTypes.createPolicy("angular",{createHTML:t=>t,createScript:t=>t,createScriptURL:t=>t})}catch(t){}return zs}function mc(t){return z0()?.createHTML(t)||t}function U0(t){let n=new Uu(t);return $0()?new zu(n):n}var zu=class{inertDocumentHelper;constructor(n){this.inertDocumentHelper=n}getInertBodyElement(n){n="<body><remove></remove>"+n;try{let e=new window.DOMParser().parseFromString(mc(n),"text/html").body;return e===null?this.inertDocumentHelper.getInertBodyElement(n):(e.firstChild?.remove(),e)}catch(e){return null}}},Uu=class{inertDocument;constructor(n){this.inertDocument=n.implementation.createHTMLDocument("sanitization-inert")}getInertBodyElement(n){let e=this.inertDocument.createElement("template");return e.innerHTML=mc(n),e}};function $0(){try{return!!new window.DOMParser().parseFromString(mc(""),"text/html")}catch(t){return!1}}var G0=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;function pc(t){return t=String(t),t.match(G0)?t:"unsafe:"+t}function Mn(t){let n=Object.create(null);for(let e of t.split(","))n[e]=!0;return n}function Gr(...t){let n=Object.create(null);for(let e of t)for(let i in e)Object.hasOwn(e,i)&&(n[i]=!0);return n}var dv=Mn("area,br,col,hr,img,wbr"),uv=Mn("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),mv=Mn("rp,rt"),W0=Gr(mv,uv),q0=Gr(uv,Mn("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")),Y0=Gr(mv,Mn("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")),og=Gr(dv,q0,Y0,W0),pv=Mn("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),K0=Mn("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"),Z0=Mn("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"),X0=Gr(pv,K0,Z0),Q0=Mn("script,style,template"),$u=class{sanitizedSomething=!1;buf=[];sanitizeChildren(n){let e=n.firstChild,i=!0,o=[];for(;e;){if(e.nodeType===Node.ELEMENT_NODE?i=this.startElement(e):e.nodeType===Node.TEXT_NODE?this.chars(e.nodeValue):this.sanitizedSomething=!0,i&&e.firstChild){o.push(e),e=O0(e);continue}for(;e;){e.nodeType===Node.ELEMENT_NODE&&this.endElement(e);let r=Yg(e);if(r){e=r;break}e=o.pop()}}return this.buf.join("")}startElement(n){let e=tg(n).toLowerCase();if(!Object.hasOwn(og,e))return this.sanitizedSomething=!0,!Object.hasOwn(Q0,e);this.buf.push("<"),this.buf.push(e);let i=n.attributes;for(let o=0;o<i.length;o++){let r=i.item(o),a=r.name,s=a.toLowerCase();if(!Object.hasOwn(X0,s)){this.sanitizedSomething=!0;continue}let c=r.value;pv[s]&&(c=pc(c)),this.buf.push(" ",a,'="',rg(c),'"')}return this.buf.push(">"),!0}endElement(n){let e=tg(n).toLowerCase();Object.hasOwn(og,e)&&!Object.hasOwn(dv,e)&&(this.buf.push("</"),this.buf.push(e),this.buf.push(">"))}chars(n){this.buf.push(rg(n))}},J0=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,eC=/([^\#-~ |!])/g;function rg(t){return t.replace(/&/g,"&amp;").replace(J0,function(n){let e=n.charCodeAt(0),i=n.charCodeAt(1);return"&#"+((e-55296)*1024+(i-56320)+65536)+";"}).replace(eC,function(n){return"&#"+n.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}var Us;function wm(t,n){let e=null;try{Us=Us||U0(t);let i=n?String(n):"";e=Us.getInertBodyElement(i);let o=5,r=i;do{if(o===0)throw new Error("Failed to sanitize html because the input is unstable");o--,i=r,r=e.innerHTML,ag(e),e=null,e=Us.getInertBodyElement(i)}while(i!==r);let s=new $u().sanitizeChildren(fv(e)||e);return mc(s)}finally{e&&ag(e)}}function ag(t){let n=fv(t)||t;for(;n.firstChild;)n.firstChild.remove()}function fv(t){return"content"in t&&tC(t)?t.content:null}function tC(t){return t.nodeType===Node.ELEMENT_NODE&&t.nodeName==="TEMPLATE"}function nC(t,n){return t.createText(n)}function iC(t,n,e){t.setValue(n,e)}function hv(t,n,e){return t.createElement(n,e)}function Ri(t,n,e,i,o){t.insertBefore(n,e,i,o)}function gv(t,n,e){t.appendChild(n,e)}function sg(t,n,e,i,o){i!==null?Ri(t,n,e,i,o):gv(t,n,e)}function vv(t,n,e,i){t.removeChild(null,n,e,i)}function oC(t,n,e,i,o,r,a){if(r==null)a?.(r,i||"",o),t.removeAttribute(n,o,e);else{let s=a==null?Pd(r):a(r,i||"",o);t.setAttribute(n,o,s,e)}}function rC(t,n,e){t.setAttribute(n,"style",e)}function aC(t,n,e){e===""?t.removeAttribute(n,"class"):t.setAttribute(n,"class",e)}function bv(t,n,e){let{mergedAttrs:i,classes:o,styles:r}=e;i!==null&&w0(t,n,i),o!==null&&aC(t,n,o),r!==null&&rC(t,n,r)}function sC(t,n,e){let i=t.length;for(;;){let o=t.indexOf(n,e);if(o===-1)return o;if(o===0||t.charCodeAt(o-1)<=32){let r=n.length;if(o+r===i||t.charCodeAt(o+r)<=32)return o}e=o+1}}var yv="ng-template";function cC(t,n,e,i){let o=0;if(i){for(;o<n.length&&typeof n[o]=="string";o+=2)if(n[o]==="class"&&sC(n[o+1].toLowerCase(),e,0)!==-1)return!0}else if(xm(t))return!1;if(o=n.indexOf(1,o),o>-1){let r;for(;++o<n.length&&typeof(r=n[o])=="string";)if(r.toLowerCase()===e)return!0}return!1}function xm(t){return t.type===4&&t.value!==yv}function lC(t,n,e){let i=t.type===4&&!e?yv:t.value;return n===i}function dC(t,n,e){let i=4,o=t.attrs,r=o!==null?pC(o):0,a=!1;for(let s=0;s<n.length;s++){let c=n[s];if(typeof c=="number"){if(!a&&!Bt(i)&&!Bt(c))return!1;if(a&&Bt(c))continue;a=!1,i=c|i&1;continue}if(!a)if(i&4){if(i=2|i&1,c!==""&&!lC(t,c,e)||c===""&&n.length===1){if(Bt(i))return!1;a=!0}}else if(i&8){if(o===null||!cC(t,o,c,e)){if(Bt(i))return!1;a=!0}}else{let l=n[++s],d=uC(c,o,xm(t),e);if(d===-1){if(Bt(i))return!1;a=!0;continue}if(l!==""){let u;if(d>r?u="":u=o[d+1].toLowerCase(),i&2&&l!==u){if(Bt(i))return!1;a=!0}}}}return Bt(i)||a}function Bt(t){return(t&1)===0}function uC(t,n,e,i){if(n===null)return-1;let o=0;if(i||!e){let r=!1;for(;o<n.length;){let a=n[o];if(a===t)return o;if(a===3||a===6)r=!0;else if(a===1||a===2){let s=n[++o];for(;typeof s=="string";)s=n[++o];continue}else{if(a===4)break;if(a===0){o+=4;continue}}o+=r?1:2}return-1}else return fC(n,t)}function _v(t,n,e=!1){for(let i=0;i<n.length;i++)if(dC(t,n[i],e))return!0;return!1}function mC(t){let n=t.attrs;if(n!=null){let e=n.indexOf(5);if((e&1)===0)return n[e+1]}return null}function pC(t){for(let n=0;n<t.length;n++){let e=t[n];if(Lg(e))return n}return t.length}function fC(t,n){let e=t.indexOf(4);if(e>-1)for(e++;e<t.length;){let i=t[e];if(typeof i=="number")return-1;if(i===n)return e;e++}return-1}function hC(t,n){e:for(let e=0;e<n.length;e++){let i=n[e];if(t.length===i.length){for(let o=0;o<t.length;o++)if(t[o]!==i[o])continue e;return!0}}return!1}function cg(t,n){return t?":not("+n.trim()+")":n}function gC(t){let n=t[0],e=1,i=2,o="",r=!1;for(;e<t.length;){let a=t[e];if(typeof a=="string")if(i&2){let s=t[++e];o+="["+a+(s.length>0?'="'+s+'"':"")+"]"}else i&8?o+="."+a:i&4&&(o+=" "+a);else o!==""&&!Bt(a)&&(n+=cg(r,o),o=""),i=a,r=r||!Bt(i);e++}return o!==""&&(n+=cg(r,o)),n}function vC(t){return t.map(gC).join(",")}function bC(t){let n=[],e=[],i=1,o=2;for(;i<t.length;){let r=t[i];if(typeof r=="string")o===2?r!==""&&n.push(r,t[++i]):o===8&&e.push(r);else{if(!Bt(o))break;o=r}i++}return e.length&&n.push(1,...e),n}var Tt={},cn=(function(t){return t[t.Important=1]="Important",t[t.DashCase=2]="DashCase",t})(cn||{}),yC;function Cm(t,n){return yC(t,n)}var Sm=new Set;var EP=typeof document<"u"&&typeof document?.documentElement?.getAnimations=="function";var Gu=new WeakMap;function wv(t){return t?t[Hn]??t:null}var wo=new WeakSet;function _C(t,n,e){let i=Gu.get(t);if(!i||i.length===0)return;let o=n.parentNode,r=n.previousSibling,a=wv(e);for(let s=i.length-1;s>=0;s--){let{el:c,declarationView:l}=i[s],d=c.parentNode;c===n?(i.splice(s,1),wo.add(c),c.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}}))):r&&c===r?(i.splice(s,1),c.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}})),c.parentNode?.removeChild(c)):d&&o&&d!==o&&(a===null||l===null||a===l)&&(i.splice(s,1),c.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}})),c.parentNode?.removeChild(c))}}function wC(t,n,e){let i=wv(e),o=Gu.get(t);o?o.some(r=>r.el===n)||o.push({el:n,declarationView:i}):Gu.set(t,[{el:n,declarationView:i}])}var fc=(function(t){return t[t.CHANGE_DETECTION=0]="CHANGE_DETECTION",t[t.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",t})(fc||{}),$t=new b(""),lg=new Set;function qn(t){lg.has(t)||(lg.add(t),performance?.mark?.("mark_feature_usage",{detail:{feature:t}}))}var hc=(()=>{class t{impl=null;execute(){this.impl?.execute()}static \u0275prov=W({token:t,providedIn:"root",factory:()=>new t})}return t})(),Em=[0,1,2,3],Dm=(()=>{class t{ngZone=m(N);scheduler=m(on);errorHandler=m(ct,{optional:!0});sequences=new Set;deferredRegistrations=new Set;executing=!1;constructor(){m($t,{optional:!0})}execute(){let e=this.sequences.size>0;e&&pe(ce.AfterRenderHooksStart),this.executing=!0;for(let i of Em)for(let o of this.sequences)if(!(o.erroredOrDestroyed||!o.hooks[i]))try{o.pipelinedValue=this.ngZone.runOutsideAngular(()=>this.maybeTrace(()=>{let r=o.hooks[i];return r(o.pipelinedValue)},o.snapshot))}catch(r){o.erroredOrDestroyed=!0,this.errorHandler?.handleError(r)}this.executing=!1;for(let i of this.sequences)i.afterRun(),i.once&&(this.sequences.delete(i),i.destroy());for(let i of this.deferredRegistrations)this.sequences.add(i);this.deferredRegistrations.size>0&&this.scheduler.notify(7),this.deferredRegistrations.clear(),e&&pe(ce.AfterRenderHooksEnd)}register(e){let{view:i}=e;i!==void 0?((i[Si]??=[]).push(e),Mi(i),i[V]|=4096):this.addSequence(e)}addSequence(e){this.executing?this.deferredRegistrations.add(e):this.sequences.add(e),this.scheduler.notify(7)}unregister(e){this.executing&&this.sequences.has(e)?(e.erroredOrDestroyed=!0,e.pipelinedValue=void 0,e.once=!0):(this.sequences.delete(e),this.deferredRegistrations.delete(e))}maybeTrace(e,i){return i?i.run(fc.AFTER_NEXT_RENDER,e):e()}static \u0275prov=W({token:t,providedIn:"root",factory:()=>new t})}return t})(),Lr=class{impl;hooks;view;once;snapshot;erroredOrDestroyed=!1;pipelinedValue=void 0;unregisterOnDestroy;constructor(n,e,i,o,r,a=null){this.impl=n,this.hooks=e,this.view=i,this.once=o,this.snapshot=a,this.unregisterOnDestroy=r?.onDestroy(()=>this.destroy())}afterRun(){this.erroredOrDestroyed=!1,this.pipelinedValue=void 0,this.snapshot?.dispose(),this.snapshot=null}destroy(){this.impl.unregister(this),this.unregisterOnDestroy?.();let n=this.view?.[Si];n&&(this.view[Si]=n.filter(e=>e!==this))}};function Gt(t,n){let e=n?.injector??m(te);return qn("NgAfterNextRender"),CC(t,e,n,!0)}function xC(t){return t instanceof Function?[void 0,void 0,t,void 0]:[t.earlyRead,t.write,t.mixedReadWrite,t.read]}function CC(t,n,e,i){let o=n.get(hc);o.impl??=n.get(Dm);let r=n.get($t,null,{optional:!0}),a=e?.manualCleanup!==!0?n.get(nt):null,s=n.get(_o,null,{optional:!0}),c=new Lr(o.impl,xC(t),s?.view,i,a,r?.snapshot(null));return o.impl.register(c),c}var Wu=null,xv=null;function dg(t,n,e,i){Wu?.maybeQueueEnterAnimation(t,n,e,i)}function ug(t,n,e,i){Wu===null?i(!1):Wu.runLeaveAnimationsWithCallback(t,n,e,i)}function SC(t){xv?.initViewDetachAnimations(t)}function EC(t){xv?.clearViewDetachAnimations(t)}function xo(t,n,e,i,o,r,a,s){if(o!=null){let c,l=!1;Dt(o)?c=o:bn(o)&&(l=!0,o=o[jt]);let d=ot(o);t===0&&i!==null?(dg(s,i,r,e),a==null?gv(n,i,d):Ri(n,i,d,a||null,!0)):t===1&&i!==null?(Ri(n,i,d,a||null,!0),_C(r,d,s),wo.has(d)||dg(s,i,r,e)):t===2?(s?.[fh]?.leave?.has(r.index)&&wC(r,d,s),wo.delete(d),ug(s,r,e,u=>{if(wo.has(d)){wo.delete(d);return}vv(n,d,l,u)})):t===3&&(wo.delete(d),ug(s,r,e,()=>{n.destroyNode(d)})),c!=null&&PC(n,t,e,c,r,i,a)}}function DC(t,n){Cv(t,n),n[jt]=null,n[Xe]=null}function IC(t,n,e,i,o,r){i[jt]=o,i[Xe]=n,vc(t,i,e,1,o,r)}function Cv(t,n){n[rn].changeDetectionScheduler?.notify(9),vc(t,n,n[Ie],2,null,null)}function MC(t){let n=t[go];if(!n)return xu(t[T],t);for(;n;){let e=null;if(bn(n))e=n[go];else{let i=n[Le];i&&(e=i)}if(!e){for(;n&&!n[Et]&&n!==t;)bn(n)&&xu(n[T],n),n=n[je];n===null&&(n=t),bn(n)&&xu(n[T],n),e=n&&n[Et]}n=e}}function Im(t,n){let e=t[Di],i=e.indexOf(n);e.splice(i,1)}function gc(t,n){if(Ii(n))return;let e=n[Ie];e.destroyNode&&vc(t,n,e,3,null,null),MC(n)}function xu(t,n){if(Ii(n))return;let e=I(null);try{n[V]&=-129,n[V]|=256,n[_t]&&Ln(n[_t]),TC(t,n),NC(t,n),n[T].type===1&&n[Ie].destroy();let i=n[zn];if(i!==null&&Dt(n[je])){i!==n[je]&&Im(i,n);let o=n[an];o!==null&&o.detachView(t)}Ou(n)}finally{I(e)}}function NC(t,n){let e=t.cleanup,i=n[ho];if(e!==null)for(let a=0;a<e.length-1;a+=2)if(typeof e[a]=="string"){let s=e[a+3];s>=0?i[s]():i[-s].unsubscribe(),a+=2}else{let s=i[e[a+1]];e[a].call(s)}i!==null&&(n[ho]=null);let o=n[pn];if(o!==null){n[pn]=null;for(let a=0;a<o.length;a++){let s=o[a];s()}}let r=n[fn];if(r!==null){n[fn]=null;for(let a of r)a.destroy()}}function TC(t,n){let e;if(t!=null&&(e=t.destroyHooks)!=null)for(let i=0;i<e.length;i+=2){let o=n[e[i]];if(!(o instanceof Oi)){let r=e[i+1];if(Array.isArray(r))for(let a=0;a<r.length;a+=2){let s=o[r[a]],c=r[a+1];pe(ce.LifecycleHookStart,s,c);try{c.call(s)}finally{pe(ce.LifecycleHookEnd,s,c)}}else{pe(ce.LifecycleHookStart,o,r);try{r.call(o)}finally{pe(ce.LifecycleHookEnd,o,r)}}}}}function Sv(t,n,e){if(n===null)throw new S(510,!1);return kC(t,n.parent,e)}function kC(t,n,e){let i=n;for(;i!==null&&i.type&168;)n=i,i=n.parent;if(i===null)return e[jt];if(yn(i)){let{encapsulation:o}=t.data[i.directiveStart+i.componentOffset];if(o===zt.None||o===zt.Emulated)return null}return It(i,e)}function Ev(t,n,e){return RC(t,n,e)}function AC(t,n,e){return t.type&40?It(t,e):null}var RC=AC,mg;function Mm(t,n,e,i){let o=Sv(t,i,n),r=n[Ie],a=i.parent||n[Xe],s=Ev(a,i,n);if(o!=null)if(Array.isArray(e))for(let c=0;c<e.length;c++)sg(r,o,e[c],s,!1);else sg(r,o,e,s,!1);mg!==void 0&&mg(r,i,n,e,o)}function Or(t,n){if(n!==null){let e=n.type;if(e&3)return It(n,t);if(e&4)return qu(-1,t[n.index]);if(e&8){let i=n.child;if(i!==null)return Or(t,i);{let o=t[n.index];return Dt(o)?qu(-1,o):ot(o)}}else{if(e&128)return Or(t,n.next);if(e&32)return Cm(n,t)()||ot(t[n.index]);{let i=Dv(t,n);if(i!==null){if(Array.isArray(i))return i[0];let o=hn(t[it]);return Or(o,i)}else return Or(t,n.next)}}}return null}function Dv(t,n){if(n!==null){let i=t[it][Xe],o=n.projection;return i.projection[o]}return null}function qu(t,n){let e=Le+t+1;if(e<n.length){let i=n[e],o=i[T].firstChild;if(o!==null)return Or(i,o)}return n[Ei]}function Nm(t,n,e,i,o,r,a){for(;e!=null;){let s=i[vn];if(e.type===128){e=e.next;continue}let c=i[e.index],l=e.type;if(a&&n===0&&(c&&Do(ot(c),i),e.flags|=2),!uc(e))if(l&8)Nm(t,n,e.child,i,o,r,!1),xo(n,t,s,o,c,e,r,i);else if(l&32){let d=Cm(e,i),u;for(;u=d();)xo(n,t,s,o,u,e,r,i);xo(n,t,s,o,c,e,r,i)}else l&16?Iv(t,n,i,e,o,r):xo(n,t,s,o,c,e,r,i);e=a?e.projectionNext:e.next}}function vc(t,n,e,i,o,r){t.type===3?OC(e,i,n,o,r):Nm(e,i,t.firstChild,n,o,r,!1)}function OC(t,n,e,i,o){let a=e[T].firstChild,s=a.next,c=ot(e[a.index]),l=ot(e[s.index]),d=s.index+1,u=e[d];if(n===1||n===0)i!==null&&(u&&u.hasChildNodes()?Ri(t,i,u,o,!0):(Ri(t,i,c,o,!0),Ri(t,i,l,o,!0)));else if(n===2){if(u||(u=document.createDocumentFragment(),e[d]=u),c&&c.parentNode===u)return;let f=c;for(;f!==null;){let p=f.nextSibling;if(u.appendChild(f),f===l)break;f=p}}}function FC(t,n,e){let i=n[Ie],o=Sv(t,e,n),r=e.parent||n[Xe],a=Ev(r,e,n);Iv(i,0,n,e,o,a)}function Iv(t,n,e,i,o,r){let a=e[it],c=a[Xe].projection[i.projection];if(Array.isArray(c))for(let l=0;l<c.length;l++){let d=c[l];xo(n,t,e[vn],o,d,i,r,e)}else{let l=c,d=a[je];Zg(i)&&(l.flags|=128),Nm(t,n,l,d,o,r,!0)}}function PC(t,n,e,i,o,r,a){let s=i[Ei],c=ot(i);if(s!==c&&xo(n,t,e,r,s,o,a),(i[V]&4)===0)for(let l=Le;l<i.length;l++){let d=i[l];vc(d[T],d,t,n,r,s)}}function LC(t,n,e,i,o){if(n)o?t.addClass(e,i):t.removeClass(e,i);else{let r=i.indexOf("-")===-1?void 0:cn.DashCase;o==null?t.removeStyle(e,i,r):(typeof o=="string"&&o.endsWith("!important")&&(o=o.slice(0,-10),r|=cn.Important),t.setStyle(e,i,o,r))}}function Tm(t,n,e,i,o,r,a,s,c,l,d){let u=Fe+i,f=u+o,p=VC(u,f),v=typeof l=="function"?l():l;return p[T]={type:t,blueprint:p,template:e,queries:null,viewQuery:s,declTNode:n,data:p.slice().fill(null,u),bindingStartIndex:u,expandoStartIndex:f,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof r=="function"?r():r,pipeRegistry:typeof a=="function"?a():a,firstChild:null,schemas:c,consts:v,incompleteFirstPass:!1,ssrId:d}}function VC(t,n){let e=[];for(let i=0;i<n;i++)e.push(i<t?null:Tt);return e}function jC(t){let n=t.tView;return n===null||n.incompleteFirstPass?t.tView=Tm(1,null,t.template,t.decls,t.vars,t.directiveDefs,t.pipeDefs,t.viewQuery,t.schemas,t.consts,t.id):n}function km(t,n,e,i,o,r,a,s,c,l,d){let u=n.blueprint.slice();return u[jt]=o,u[V]=i|4|128|8|64|1024,(l!==null||t&&t[V]&2048)&&(u[V]|=2048),Jd(u),u[je]=u[Hn]=t,u[Pe]=e,u[rn]=a||t&&t[rn],u[Ie]=s||t&&t[Ie],u[vn]=c||t&&t[vn]||null,u[Xe]=r,u[Sr]=P0(),u[xi]=d,u[Wd]=l,u[it]=n.type==2?t[it]:u,u}function BC(t,n,e){let i=It(n,t),o=jC(e),r=t[rn].rendererFactory,a=Am(t,km(t,o,null,Mv(e),i,n,null,r.createRenderer(i,e),null,null,null));return t[n.index]=a}function Mv(t){let n=16;return t.onPush&&(n=64),n}function Nv(t,n,e,i){if(e===0)return-1;let o=n.length;for(let r=0;r<e;r++)n.push(i),t.blueprint.push(i),t.data.push(null);return o}function Am(t,n){return t[go]?t[Gd][Et]=n:t[go]=n,t[Gd]=n,n}function _(t=1){Tv(Te(),U(),wn()+t,!1)}function Tv(t,n,e,i){if(!i)if((n[V]&3)===3){let r=t.preOrderCheckHooks;r!==null&&Gs(n,r,e)}else{let r=t.preOrderHooks;r!==null&&Ws(n,r,0,e)}Un(e)}var Wr=(function(t){return t[t.None=0]="None",t[t.SignalBased=1]="SignalBased",t[t.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",t})(Wr||{});function Fi(t,n,e,i){let o=I(null);try{let[r,a,s]=t.inputs[e],c=null;(a&Wr.SignalBased)!==0&&(c=n[r][qe]),c!==null&&c.transformFn!==void 0?i=c.transformFn(i):s!==null&&(i=s.call(n,i)),t.setInput!==null?t.setInput(n,c,i,e,r):Ag(n,c,r,i)}finally{I(o)}}function kv(t,n,e,i,o){let r=wn(),a=i&2;try{Un(-1),a&&n.length>Fe&&Tv(t,n,Fe,!1);let s=a?ce.TemplateUpdateStart:ce.TemplateCreateStart;pe(s,o,e),e(i,o)}finally{Un(r);let s=a?ce.TemplateUpdateEnd:ce.TemplateCreateEnd;pe(s,o,e)}}function Rm(t,n,e){qC(t,n,e),(e.flags&64)===64&&YC(t,n,e)}function bc(t,n,e=It){let i=n.localNames;if(i!==null){let o=n.index+1;for(let r=0;r<i.length;r+=2){let a=i[r+1],s=a===-1?e(n,t):t[a];t[o++]=s}}}function HC(t,n,e,i){let r=i.get(rv,ov)||e===zt.ShadowDom||e===zt.ExperimentalIsolatedShadowDom,a=t.selectRootElement(n,r);return zC(a),a}function zC(t){UC(t)}var UC=()=>null;function $C(t){return t==="class"?"className":t==="for"?"htmlFor":t==="formaction"?"formAction":t==="innerHtml"?"innerHTML":t==="readonly"?"readOnly":t==="tabindex"?"tabIndex":t}function GC(t,n,e,i,o,r){let a=n[T];if(Om(t,a,n,e,i)){yn(t)&&WC(n,t.index);return}t.type&3&&(e=$C(e)),Av(t,n,e,i,o,r)}function Av(t,n,e,i,o,r){if(t.type&3){let a=It(t,n);i=r!=null?r(i,t.value||"",e):i,i=Rv(e,a,i),o.setProperty(a,e,i)}else t.type&12}function Rv(t,n,e,i=!1){return t==="src"&&(n.tagName==="IMG"||n.tagName==="VIDEO")?e==null?i?e:"":Ut(e):e}function WC(t,n){let e=Mt(n,t);e[V]&16||(e[V]|=64)}function qC(t,n,e){let i=e.directiveStart,o=e.directiveEnd;yn(e)&&BC(n,e,t.data[i+e.componentOffset]),t.firstCreatePass||Js(e,n);let r=e.initialInputs;for(let a=i;a<o;a++){let s=t.data[a],c=Pr(n,t,a,e);if(Do(c,n),r!==null&&XC(n,a-i,c,s,e,r),_n(s)){let l=Mt(e.index,n);l[Pe]=Pr(n,t,a,e)}}}function YC(t,n,e){let i=e.directiveStart,o=e.directiveEnd,r=e.index,a=Th();try{Un(r);for(let s=i;s<o;s++){let c=t.data[s],l=n[s];Os(s),(c.hostBindings!==null||c.hostVars!==0||c.hostAttrs!==null)&&KC(c,l)}}finally{Un(-1),Os(a)}}function KC(t,n){t.hostBindings!==null&&t.hostBindings(1,n)}function Ov(t,n){let e=t.directiveRegistry,i=null;if(e)for(let o=0;o<e.length;o++){let r=e[o];_v(n,r.selectors,!1)&&(i??=[],_n(r)?i.unshift(r):i.push(r))}return i}function ZC(t,n,e,i,o,r){let a=It(t,n);i=Rv(e,a,i,!0),oC(n[Ie],a,r,t.value,e,i,o)}function XC(t,n,e,i,o,r){let a=r[n];if(a!==null)for(let s=0;s<a.length;s+=2){let c=a[s],l=a[s+1];Fi(i,e,c,l)}}function Fv(t,n,e,i,o){let r=Fe+e,a=n[T],s=o(a,n,t,i,e);n[r]=s,yo(t,!0);let c=t.type===2;return c?(bv(n[Ie],s,t),(xh()===0||Dr(t))&&Do(s,n),Ch()):Do(s,n),Vs()&&(!c||!uc(t))&&Mm(a,n,s,t),t}function Pv(t){let n=t;return lu()?du():(n=n.parent,yo(n,!1)),n}function QC(t,n){let e=t[vn];if(!e)return;let i;try{i=e.get($n,null)}catch(o){i=null}i?.(n)}function Om(t,n,e,i,o){let r=t.inputs?.[i],a=t.hostDirectiveInputs?.[i],s=!1;if(a)for(let c=0;c<a.length;c+=2){let l=a[c],d=a[c+1],u=n.data[l];Fi(u,e[l],d,o),s=!0}if(r)for(let c of r){let l=e[c],d=n.data[c];Fi(d,l,i,o),s=!0}return s}function JC(t,n,e,i,o,r){let a=null,s=null,c=null,l=!1,d=t.directiveToIndex.get(i.type);if(typeof d=="number"?a=d:[a,s,c]=d,s!==null&&c!==null&&t.hostDirectiveInputs&&Object.hasOwn(t.hostDirectiveInputs,o)){let u=t.hostDirectiveInputs[o];for(let f=0;f<u.length;f+=2){let p=u[f];if(p>=s&&p<=c){let v=n.data[p],x=u[f+1];Fi(v,e[p],x,r),l=!0}else if(p>c)break}}return a!==null&&Object.hasOwn(i.inputs,o)&&(Fi(i,e[a],o,r),l=!0),l}function eS(t,n){let e=Mt(n,t),i=e[T];tS(i,e);let o=e[jt];o!==null&&e[xi]===null&&(e[xi]=av(o,e[vn])),pe(ce.ComponentStart);try{Fm(i,e,e[Pe])}finally{pe(ce.ComponentEnd,e[Pe])}}function tS(t,n){for(let e=n.length;e<t.blueprint.length;e++)n.push(t.blueprint[e])}function Fm(t,n,e){Ps(n);try{let i=t.viewQuery;i!==null&&Pu(1,i,e);let o=t.template;o!==null&&kv(t,n,o,1,e),t.firstCreatePass&&(t.firstCreatePass=!1),n[an]?.finishViewCreation(t),t.staticContentQueries&&sv(t,n),t.staticViewQueries&&Pu(2,t.viewQuery,e);let r=t.components;r!==null&&nS(n,r)}catch(i){throw t.firstCreatePass&&(t.incompleteFirstPass=!0,t.firstCreatePass=!1),i}finally{n[V]&=-5,Ls()}}function nS(t,n){for(let e=0;e<n.length;e++)eS(t,n[e])}function qr(t,n,e,i){let o=I(null);try{let r=n.tView,a=km(t,r,e,16,null,n,null,null,i?.injector??null,i?.embeddedViewInjector??null,i?.dehydratedView??null),s=t[n.index];a[zn]=s;let c=t[an];return c!==null&&(a[an]=c.createEmbeddedView(r)),Fm(r,a,e),a}finally{I(o)}}function Io(t,n){return!n||n.firstChild===null||Zg(t)}function Vr(t,n,e,i,o=!1){if(t.type===3){let r=t.firstChild,a=r.next,s=ot(n[r.index]),c=ot(n[a.index]),l=s;for(;l!==null&&(i.push(l),l!==c);)l=l.nextSibling;return i}for(;e!==null;){if(e.type===128){e=o?e.projectionNext:e.next;continue}let r=n[e.index];if(r!==null)if(Dt(r)){let s=r[Ei];s!==r[jt]&&i.push(ot(r)),r[V]&4||Lv(r,i),i.push(s)}else i.push(ot(r));let a=e.type;if(a&8)Vr(t,n,e.child,i);else if(a&32){let s=Cm(e,n),c;for(;c=s();)i.push(c)}else if(a&16){let s=Dv(n,e);if(Array.isArray(s))i.push(...s);else{let c=hn(n[it]);Vr(c[T],c,s,i,!0)}}e=o?e.projectionNext:e.next}return i}function Lv(t,n){for(let e=Le;e<t.length;e++){let i=t[e],o=i[T].firstChild;o!==null&&Vr(i[T],i,o,n)}}function Vv(t){if(t[Si]!==null){for(let n of t[Si])n.impl.addSequence(n);t[Si].length=0}}var jv=[];function iS(t){return t[_t]??oS(t)}function oS(t){let n=jv.pop()??Object.create(aS);return n.lView=t,n}function rS(t){t.lView[_t]!==t&&(t.lView=null,jv.push(t))}var aS=Q(C({},si),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:t=>{Mi(t.lView)},consumerOnSignalRead(){this.lView[_t]=this}});function sS(t){let n=t[_t]??Object.create(cS);return n.lView=t,n}var cS=Q(C({},si),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:t=>{let n=hn(t.lView);for(;n&&!Bv(n[T]);)n=hn(n);n&&eu(n)},consumerOnSignalRead(){this.lView[_t]=this}});function Bv(t){return t.type!==2}function Hv(t){if(t[fn]===null)return;let n=!0;for(;n;){let e=!1;for(let i of t[fn])if(i.dirty&&(e=!0,i.zone===null||Zone.current===i.zone?i.run():i.zone.run(()=>i.run()),t[fn]===null))return;n=e&&!!(t[V]&4096)}}var lS=100;function zv(t,n=0){let i=t[rn].rendererFactory,o=!1;o||i.begin?.();try{dS(t,n)}finally{o||i.end?.()}}function dS(t,n){let e=uu();try{br(!0),Yu(t,n);let i=0;for(;Ir(t);){if(i===lS)throw new S(103,!1);i++,Yu(t,1)}}finally{br(e)}}function uS(t,n,e,i){if(Ii(n))return;let o=n[V],r=!1,a=!1;Ps(n);let s=!0,c=null,l=null;r||(Bv(t)?(l=iS(n),c=Pn(l)):ka()===null?(s=!1,l=sS(n),c=Pn(l)):n[_t]&&(Ln(n[_t]),n[_t]=null));try{Jd(n),Ih(t.bindingStartIndex),e!==null&&kv(t,n,e,2,i);let d=(o&3)===3;if(!r)if(d){let p=t.preOrderCheckHooks;p!==null&&Gs(n,p,null)}else{let p=t.preOrderHooks;p!==null&&Ws(n,p,0,null),_u(n,0)}if(a||mS(n),Hv(n),$v(n,0),t.contentQueries!==null&&sv(t,n),!r)if(d){let p=t.contentCheckHooks;p!==null&&Gs(n,p)}else{let p=t.contentHooks;p!==null&&Ws(n,p,1),_u(n,1)}fS(t,n);let u=t.components;u!==null&&Wv(n,u,0);let f=t.viewQuery;if(f!==null&&Pu(2,f,i),!r)if(d){let p=t.viewCheckHooks;p!==null&&Gs(n,p)}else{let p=t.viewHooks;p!==null&&Ws(n,p,2),_u(n,2)}if(t.firstUpdatePass===!0&&(t.firstUpdatePass=!1),n[Ns]){for(let p of n[Ns])p();n[Ns]=null}r||(Vv(n),n[V]&=-73)}catch(d){Uv(n,d,r)}finally{l!==null&&(ci(l,c),s&&rS(l)),Ls()}}function Uv(t,n,e){let i=!1,o=n,r=t,a=I(null);try{for(;r!==null;){if(Dt(r)){r=r[je];continue}let s=r[vo];if(s)try{let c=t[it][Pe],l=c?.constructor,d={declarationInstance:c,declarationType:l,caughtBy:s},u=I(null);try{s(Uh(o),d)}finally{I(u)}i=!0;break}catch(c){o=c}r=r[je]}}finally{I(a)}if(!i)throw e||Mi(t),o}function $v(t,n){for(let e=Qg(t);e!==null;e=Jg(e))for(let i=Le;i<e.length;i++){let o=e[i];Gv(o,n)}}function mS(t){for(let n=Qg(t);n!==null;n=Jg(n)){if(!(n[V]&2))continue;let e=n[Di];for(let i=0;i<e.length;i++){let o=e[i];eu(o)}}}function pS(t,n,e){pe(ce.ComponentStart);let i=Mt(n,t);try{Gv(i,e)}finally{pe(ce.ComponentEnd,i[Pe])}}function Gv(t,n){ks(t)&&Yu(t,n)}function Yu(t,n){let i=t[T],o=t[V],r=t[_t],a=!!(n===0&&o&16);if(a||=!!(o&64&&n===0),a||=!!(o&1024),a||=!!(r?.dirty&&Zi(r)),a||=!1,r&&(r.dirty=!1),t[V]&=-5121,a)uS(i,t,i.template,t[Pe]);else if(o&4096){let s=I(null);try{try{Hv(t)}catch(l){Uv(t,l,!1)}$v(t,1);let c=i.components;c!==null&&Wv(t,c,1),Vv(t)}finally{I(s)}}}function Wv(t,n,e){for(let i=0;i<n.length;i++)pS(t,n[i],e)}function fS(t,n){let e=t.hostBindingOpCodes;if(e!==null)try{for(let i=0;i<e.length;i++){let o=e[i];if(o<0)Un(~o);else{let r=o,a=e[++i],s=e[++i];Nh(a,r);let c=n[r];pe(ce.HostBindingsUpdateStart,c);try{s(2,c)}finally{pe(ce.HostBindingsUpdateEnd,c)}}}}finally{Un(-1)}}function Pm(t,n){let e=uu()?64:1088;for(t[rn].changeDetectionScheduler?.notify(n);t;){t[V]|=e;let i=hn(t);if(bo(t)&&!i)return t;t=i}return null}function qv(t,n,e,i){return[t,!0,0,n,null,i,null,e,null,null]}function Yv(t,n){let e=Le+n;if(e<t.length)return t[e]}function Yr(t,n,e,i=!0){let o=n[T];if(hS(o,n,t,e),i){let a=qu(e,t),s=n[Ie],c=s.parentNode(t[Ei]);c!==null&&IC(o,t[Xe],s,n,c,a)}let r=n[xi];r!==null&&r.firstChild!==null&&(r.firstChild=null)}function Kv(t,n){let e=jr(t,n);return e!==void 0&&gc(e[T],e),e}function jr(t,n){if(t.length<=Le)return;let e=Le+n,i=t[e];if(i){let o=i[zn];o!==null&&o!==t&&Im(o,i),n>0&&(t[e-1][Et]=i[Et]);let r=xr(t,Le+n);DC(i[T],i);let a=r[an];a!==null&&a.detachView(r[T]),i[je]=null,i[Et]=null,i[V]&=-129}return i}function hS(t,n,e,i){let o=Le+i,r=e.length;i>0&&(e[o-1][Et]=n),i<r-Le?(n[Et]=e[o],jd(e,Le+i,n)):(e.push(n),n[Et]=null),n[je]=e;let a=n[zn];a!==null&&e!==a&&Zv(a,n);let s=n[an];s!==null&&s.insertView(t),As(n),n[V]|=128}function Zv(t,n){let e=t[Di],i=n[je];if(bn(i))t[V]|=2;else{let o=i[je][it];n[it]!==o&&(t[V]|=2)}e===null?t[Di]=[n]:e.push(n)}var Wn=class{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=!1;exhaustive;get rootNodes(){let n=this._lView,e=n[T];return Vr(e,n,e.firstChild,[])}constructor(n,e){this._lView=n,this._cdRefInjectingView=e}get context(){return this._lView[Pe]}set context(n){this._lView[Pe]=n}get destroyed(){return Ii(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let n=this._lView[je];if(Dt(n)){let e=n[Er],i=e?e.indexOf(this):-1;i>-1&&(jr(n,i),xr(e,i))}this._attachedToViewContainer=!1}gc(this._lView[T],this._lView)}onDestroy(n){Rs(this._lView,n)}markForCheck(){Pm(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[V]&=-129}reattach(){As(this._lView),this._lView[V]|=128}detectChanges(){this._lView[V]|=1024,zv(this._lView)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new S(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let n=bo(this._lView),e=this._lView[zn];e!==null&&!n&&Im(e,this._lView),Cv(this._lView[T],this._lView)}attachToAppRef(n){if(this._attachedToViewContainer)throw new S(902,!1);this._appRef=n;let e=bo(this._lView),i=this._lView[zn];i!==null&&!e&&Zv(i,this._lView),As(this._lView)}};var In=(()=>{class t{_declarationLView;_declarationTContainer;elementRef;static __NG_ELEMENT_ID__=gS;constructor(e,i,o){this._declarationLView=e,this._declarationTContainer=i,this.elementRef=o}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(e,i){return this.createEmbeddedViewImpl(e,i)}createEmbeddedViewImpl(e,i,o){let r=qr(this._declarationLView,this._declarationTContainer,e,{embeddedViewInjector:i,dehydratedView:o});return new Wn(r)}}return t})();function gS(){return yc(Ye(),U())}function yc(t,n){return t.type&4?new In(n,t,To(t,n)):null}function ko(t,n,e,i,o){let r=t.data[n];if(r===null)r=vS(t,n,e,i,o),Mh()&&(r.flags|=32);else if(r.type&64){r.type=e,r.value=i,r.attrs=o;let a=Sh();r.injectorIndex=a===null?-1:a.injectorIndex}return yo(r,!0),r}function vS(t,n,e,i,o){let r=cu(),a=lu(),s=a?r:r&&r.parent,c=t.data[n]=yS(t,s,e,n,i,o);return bS(t,c,r,a),c}function bS(t,n,e,i){t.firstChild===null&&(t.firstChild=n),e!==null&&(i?e.child==null&&n.parent!==null&&(e.child=n):e.next===null&&(e.next=n,n.prev=e))}function yS(t,n,e,i,o,r){let a=n?n.injectorIndex:-1,s=0;return ru()&&(s|=128),{type:e,index:i,insertBeforeIndex:null,injectorIndex:a,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,controlDirectiveIndex:-1,customControlIndex:-1,propertyBindings:null,flags:s,providerIndexes:0,value:o,namespace:hu(),attrs:r,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:n,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}function _S(t){let n=t[qd]??[],i=t[je][Ie],o=[];for(let r of n)r.data[iv]!==void 0?o.push(r):wS(r,i);t[qd]=o}function wS(t,n){let e=0,i=t.firstChild;if(i){let o=t.data[nv];for(;e<o;){let r=Yg(i);vv(n,i,!1),i=r,e++}}}var xS=()=>null,CS=()=>null;function ec(t,n){return xS(t,n)}function Xv(t,n,e){return CS(t,n,e)}var Qv=class{},Ge=class{},Ve=class{destroyNode=null;static __NG_ELEMENT_ID__=()=>SS()};function SS(){let t=U(),n=Ye(),e=Mt(n.index,t);return(bn(e)?e:t)[Ie]}var Jv=(()=>{class t{static \u0275prov=W({token:t,providedIn:"root",factory:()=>null})}return t})();function eb(t){return t.debugInfo?.className||t.type.name||null}var Ys={},tc=class{injector;parentInjector;constructor(n,e){this.injector=n,this.parentInjector=e}get(n,e,i){let o=this.injector.get(n,Ys,i);return o!==Ys||e===Ys?o:this.parentInjector.get(n,e,i)}};function ES(t,n,e){return t[n]=e}function Nn(t,n,e){if(e===Tt)return!1;let i=t[n];return Object.is(i,e)?!1:(t[n]=e,!0)}function So(t,n,e){return function i(o){let r=i.__ngNativeEl__;r!==void 0&&V0(o,r);let a=yn(t)?Mt(t.index,n):n;Pm(a,5);let s=n[Pe],c=pg(n,s,e,o),l=i.__ngNextListenerFn__;for(;l;)c=pg(n,s,l,o)&&c,l=l.__ngNextListenerFn__;return c}}function pg(t,n,e,i){let o=I(null);try{return pe(ce.OutputStart,n,e),e(i)!==!1}catch(r){return QC(t,r),!1}finally{pe(ce.OutputEnd,n,e),I(o)}}function tb(t,n,e,i,o,r,a,s){let c=Dr(t),l=!1,d=null;if(!i&&c&&(d=IS(n,e,r,t.index)),d!==null){let u=d.__ngLastListenerFn__||d;u.__ngNextListenerFn__=a,d.__ngLastListenerFn__=a,l=!0}else{let u=It(t,e),f=i?i(u):u;B0(e,f,r,s),i||(s.__ngNativeEl__=u);let p=o.listen(f,r,s);if(!DS(r)){let v=i?x=>i(ot(x[t.index])):t.index;nb(v,n,e,r,s,p,!1)}}return l}function DS(t){return t.startsWith("animation")||t.startsWith("transition")}function IS(t,n,e,i){let o=t.cleanup;if(o!=null)for(let r=0;r<o.length-1;r+=2){let a=o[r];if(a===e&&o[r+1]===i){let s=n[ho],c=o[r+2];return s&&s.length>c?s[c]:null}typeof a=="string"&&(r+=2)}return null}function nb(t,n,e,i,o,r,a){let s=n.firstCreatePass?nu(n):null,c=tu(e),l=c.length;c.push(o,r),s&&s.push(i,t,l,(l+1)*(a?-1:1))}function fg(t,n,e,i,o){let r=null,a=null,s=null,c=!1,l=t.directiveToIndex.get(e.type);if(typeof l=="number"?r=l:[r,a,s]=l,a!==null&&s!==null&&t.hostDirectiveOutputs&&Object.hasOwn(t.hostDirectiveOutputs,i)){let d=t.hostDirectiveOutputs[i];for(let u=0;u<d.length;u+=2){let f=d[u];if(f>=a&&f<=s)c=!0,nc(t,n,f,d[u+1],i,o);else if(f>s)break}}return Object.hasOwn(e.outputs,i)&&(c=!0,nc(t,n,r,i,i,o)),c}function nc(t,n,e,i,o,r){let a=n[e],s=n[T],l=s.data[e].outputs[i],u=a[l].subscribe(r);nb(t.index,s,n,o,r,u,!0)}function ke(){MS()}function MS(){let t=U(),n=Te(),e=Ye();if(n.firstCreatePass&&TS(n,e),e.controlDirectiveIndex===-1)return;qn("NgSignalForms");let i=t[e.controlDirectiveIndex];n.data[e.controlDirectiveIndex].controlDef.create(i,new ic(t,n,e))}function Ae(){NS()}function NS(){let t=U(),n=Te(),e=Nr();if(e.controlDirectiveIndex===-1)return;let i=n.data[e.controlDirectiveIndex].controlDef,o=t[e.controlDirectiveIndex];i.update(o,new ic(t,n,e))}var ic=class{lView;tView;tNode;hasPassThrough;constructor(n,e,i){this.lView=n,this.tView=e,this.tNode=i,this.hasPassThrough=!!(i.flags&4096)}get customControl(){return this.tNode.customControlIndex!==-1?this.lView[this.tNode.customControlIndex]:void 0}get nativeElement(){return It(this.tNode,this.lView)}get descriptor(){return`<${this.tNode.value}>`}listenToCustomControlOutput(n,e){let i=this.tView.data[this.tNode.customControlIndex];fg(this.tNode,this.lView,i,n,So(this.tNode,this.lView,e))}listenToCustomControlModel(n){let e=this.tNode.flags&1024?"valueChange":"checkedChange",i=this.tView.data[this.tNode.customControlIndex];fg(this.tNode,this.lView,i,e,So(this.tNode,this.lView,n))}setInputOnDirectives(n,e,i){let o=this.tNode.inputs?.[n],r=this.tNode.hostDirectiveInputs?.[n];if(!o&&!r)return!1;let a=!1;if(o)for(let s of o){if(s===this.tNode.controlDirectiveIndex)continue;let c=this.lView[s],l=this.tView.data[s];(!i||i(gg(c,l,n),c))&&(Fi(l,c,n,e),a=!0)}if(r)for(let s=0;s<r.length;s+=2){let c=r[s];if(c===this.tNode.controlDirectiveIndex)continue;let l=this.lView[c],d=r[s+1],u=this.tView.data[c];(!i||i(gg(l,u,n),l))&&(Fi(u,l,d,e),a=!0)}return a}setCustomControlModelInput(n){let e=this.tView.data[this.tNode.customControlIndex],i=this.tNode.flags&1024?"value":"checked";JC(this.tNode,this.tView,this.lView,e,i,n)}customControlHasInput(n){if(this.tNode.customControlIndex===-1)return!1;let e=this.tView.data[this.tNode.customControlIndex];return(e.signalFormsInputPresence??=this._buildCustomControlInputCache(e))[n]===!0}_buildCustomControlInputCache(n){let e={};for(let i in n.inputs)e[i]=!0;if(n.hostDirectives!==null){let i=[...n.hostDirectives];for(;i.length>0;){let o=i.shift();if(typeof o!="function"){for(let a in o.inputs)e[o.inputs[a]]=!0;let r=hg(o.directive);r!==null&&i.push(...r);continue}for(let r of o()){if(typeof r=="function")continue;if(r.inputs)for(let s=0;s<r.inputs.length;s+=2){let c=r.inputs[s+1]||r.inputs[s];e[c]=!0}let a=hg(r.directive);a!==null&&i.push(...a)}}}return e}};function hg(t){return typeof t=="function"&&"\u0275dir"in t?t.\u0275dir.hostDirectives??null:null}function gg(t,n,e){if(!n.inputs||!Object.hasOwn(n.inputs,e))return;let[i,o]=n.inputs[e];if((o&Wr.SignalBased)!==0){let a=t[i][qe];return a.value===dc?void 0:a.value}return t[i]}function TS(t,n,e){for(let o=n.directiveStart;o<n.directiveEnd;o++)if(t.data[o].controlDef){n.controlDirectiveIndex=o;break}if(n.controlDirectiveIndex===-1)return;let i=t.data[n.controlDirectiveIndex].controlDef;if(i.passThroughInput&&(n.inputs?.[i.passThroughInput]?.length??0)>1){n.flags|=4096;return}kS(t,n)}function kS(t,n){for(let e=n.directiveStart;e<n.directiveEnd;e++){let i=t.data[e];if(!(n.directiveToIndex&&!n.directiveToIndex.has(i.type))){if(vg(i,"value")){n.flags|=1024,n.customControlIndex=e;return}if(vg(i,"checked")){n.flags|=2048,n.customControlIndex=e;return}}}if(n.hostDirectiveInputs!==null&&n.hostDirectiveOutputs!==null&&n.directiveToIndex!==null){let e=(i,o)=>{let r=n.hostDirectiveInputs[i],a=n.hostDirectiveOutputs[i+"Change"];if(!r||!a)return!1;for(let s=0;s<r.length;s+=2){let c=r[s];for(let l=0;l<a.length;l+=2){let d=a[l];if(c===d)for(let u of n.directiveToIndex.values()){if(!Array.isArray(u))continue;let[f,p,v]=u;if(c>=p&&c<=v)return n.flags|=o,n.customControlIndex=f,!0}}}return!1};if(e("value",1024)||e("checked",2048))return}}function vg(t,n){return AS(t,n)&&RS(t,n+"Change")}function AS(t,n){return n in t.inputs}function RS(t,n){return n in t.outputs}var Ku=Symbol("BINDING");var ji=new b("");function oc(t,n,e){let i=e?t.styles:null,o=e?t.classes:null,r=0;if(n!==null)for(let a=0;a<n.length;a++){let s=n[a];if(typeof s=="number")r=s;else if(r==1)o=ws(o,s);else if(r==2){let c=s,l=n[++a];i=ws(i,c+": "+l+";")}}e?t.styles=i:t.stylesWithoutHost=i,e?t.classes=o:t.classesWithoutHost=o}function Ce(t,n=0){let e=U();if(e===null)return R(t,n);let i=Ye();return $g(i,e,tt(t),n)}function ib(t,n,e,i,o){let r=i===null?null:{"":-1},a=o(t,e);if(a!==null){let s=a,c=null,l=null;for(let d of a)if(d.resolveHostDirectives!==null){[s,c,l]=d.resolveHostDirectives(a);break}PS(t,n,e,s,r,c,l)}r!==null&&i!==null&&OS(e,i,r)}function OS(t,n,e){let i=t.localNames=[];for(let o=0;o<n.length;o+=2){let r=e[n[o+1]];if(r==null)throw new S(-301,!1);i.push(n[o],r)}}function FS(t,n,e){n.componentOffset=e,(t.components??=[]).push(n.index)}function PS(t,n,e,i,o,r,a){let s=i.length,c=null;for(let f=0;f<s;f++){let p=i[f];c===null&&_n(p)&&(c=p,FS(t,e,f)),Au(Js(e,n),t,p.type)}zS(e,t.data.length,s),c?.viewProvidersResolver&&c.viewProvidersResolver(c);for(let f=0;f<s;f++){let p=i[f];p.providersResolver&&p.providersResolver(p)}let l=!1,d=!1,u=Nv(t,n,s,null);s>0&&(e.directiveToIndex=new Map);for(let f=0;f<s;f++){let p=i[f];if(e.mergedAttrs=Eo(e.mergedAttrs,p.hostAttrs),VS(t,e,n,u,p),HS(u,p,o),a!==null&&a.has(p)){let[x,E]=a.get(p);e.directiveToIndex.set(p.type,[u,x+e.directiveStart,E+e.directiveStart])}else(r===null||!r.has(p))&&e.directiveToIndex.set(p.type,u);p.contentQueries!==null&&(e.flags|=4),(p.hostBindings!==null||p.hostAttrs!==null||p.hostVars!==0)&&(e.flags|=64);let v=p.type.prototype;!l&&(v.ngOnChanges||v.ngOnInit||v.ngDoCheck)&&((t.preOrderHooks??=[]).push(e.index),l=!0),!d&&(v.ngOnChanges||v.ngDoCheck)&&((t.preOrderCheckHooks??=[]).push(e.index),d=!0),u++}LS(t,e,r)}function LS(t,n,e){for(let i=n.directiveStart;i<n.directiveEnd;i++){let o=t.data[i];if(e===null||!e.has(o))bg(0,n,o,i),bg(1,n,o,i),_g(n,i,!1);else{let r=e.get(o);yg(0,n,r,i),yg(1,n,r,i),_g(n,i,!0)}}}function bg(t,n,e,i){let o=t===0?e.inputs:e.outputs;for(let r in o)if(Object.hasOwn(o,r)){let a;t===0?(a=n.inputs??={},ob(n,r)):a=n.outputs??={},a[r]??=[],a[r].push(i)}}function yg(t,n,e,i){let o=t===0?e.inputs:e.outputs;for(let r in o)if(Object.hasOwn(o,r)){let a=o[r],s;t===0?(s=n.hostDirectiveInputs??={},ob(n,a)):s=n.hostDirectiveOutputs??={},s[a]??=[],s[a].push(i,r)}}function ob(t,n){n==="class"?t.flags|=8:n==="style"&&(t.flags|=16)}function _g(t,n,e){let{attrs:i,inputs:o,hostDirectiveInputs:r}=t;if(i===null||!e&&o===null||e&&r===null||xm(t)){t.initialInputs??=[],t.initialInputs.push(null);return}let a=null,s=0;for(;s<i.length;){let c=i[s];if(c===0){s+=4;continue}else if(c===5){s+=2;continue}else if(typeof c=="number")break;if(!e&&Object.hasOwn(o,c)){let l=o[c];for(let d of l)if(d===n){a??=[],a.push(c,i[s+1]);break}}else if(e&&Object.hasOwn(r,c)){let l=r[c];for(let d=0;d<l.length;d+=2)if(l[d]===n){a??=[],a.push(l[d+1],i[s+1]);break}}s+=2}t.initialInputs??=[],t.initialInputs.push(a)}function VS(t,n,e,i,o){t.data[i]=o;let r=o.factory||(o.factory=Vn(o.type,!0)),a=new Oi(r,_n(o),Ce,null);t.blueprint[i]=a,e[i]=a,jS(t,n,i,Nv(t,e,o.hostVars,Tt),o)}function jS(t,n,e,i,o){let r=o.hostBindings;if(r){let a=t.hostBindingOpCodes;a===null&&(a=t.hostBindingOpCodes=[]);let s=~n.index;BS(a)!=s&&a.push(s),a.push(e,i,r)}}function BS(t){let n=t.length;for(;n>0;){let e=t[--n];if(typeof e=="number"&&e<0)return e}return 0}function HS(t,n,e){if(e){if(n.exportAs)for(let i=0;i<n.exportAs.length;i++)e[n.exportAs[i]]=t;_n(n)&&(e[""]=t)}}function zS(t,n,e){t.flags|=1,t.directiveStart=n,t.directiveEnd=n+e,t.providerIndexes=n}function rb(t,n,e,i,o,r,a,s){let c=n[T],l=c.consts,d=Nt(l,a),u=ko(c,t,e,i,d);return r&&ib(c,n,u,Nt(l,s),o),u.mergedAttrs=Eo(u.mergedAttrs,u.attrs),u.attrs!==null&&oc(u,u.attrs,!1),u.mergedAttrs!==null&&oc(u,u.mergedAttrs,!0),c.queries!==null&&c.queries.elementStart(c,u),u}function ab(t,n){Fg(t,n),Yd(n)&&t.queries.elementEnd(n)}function US(t,n,e,i,o,r){let a=n.consts,s=Nt(a,o),c=ko(n,t,e,i,s);if(c.mergedAttrs=Eo(c.mergedAttrs,c.attrs),r!=null){let l=Nt(a,r);c.localNames=[];for(let d=0;d<l.length;d+=2)c.localNames.push(l[d],-1)}return c.attrs!==null&&oc(c,c.attrs,!1),c.mergedAttrs!==null&&oc(c,c.mergedAttrs,!0),n.queries!==null&&n.queries.elementStart(n,c),c}var Lm="en-US";function $S(){return typeof $localize<"u"&&$localize.locale||Lm}var Ao=new b("",{factory:()=>m(Ao,{optional:!0,skipSelf:!0})||$S()});var sb=typeof ShadowRoot<"u",GS=typeof Document<"u";function WS(t){return Object.keys(t).map(n=>{let[e,i,o]=t[n],r={propName:e,templateName:n,isSignal:(i&Wr.SignalBased)!==0};return o&&(r.transform=o),r})}function qS(t){return Object.keys(t).map(n=>({propName:t[n],templateName:n}))}function YS(t,n,e){let i=n instanceof $e?n:n?.injector;return i&&t.getStandaloneInjector!==null&&(i=t.getStandaloneInjector(i)||i),i?new tc(e,i):e}function KS(t){let n=t.get(Ge,null);if(n===null)throw new S(407,!1);let e=t.get(Jv,null),i=t.get(on,null),o=t.get($t,null,{optional:!0});return{rendererFactory:n,sanitizer:e,changeDetectionScheduler:i,ngReflect:!1,tracingService:o,locale:t.get(Ao,Lm)}}function ZS(t,n,e){let i=cb(t);return hv(n,i,i==="svg"?Kd:i==="math"?gh:e)}function XS(t){if((t&&"localName"in t&&typeof t.localName=="string"?t.localName:t?.tagName)?.toLowerCase()==="script")throw new S(905,!1)}function cb(t){return(t.selectors[0][0]||"div").toLowerCase()}var Mo=class{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=WS(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=qS(this.componentDef.outputs),this.cachedOutputs}constructor(n,e){this.componentDef=n,this.ngModule=e,this.componentType=n.type,this.selector=vC(n.selectors),this.ngContentSelectors=n.ngContentSelectors??[],this.isBoundToModule=!!e}create(n,e,i,o,r,a,s,c){pe(ce.DynamicComponentStart);let l=I(null);try{let d=this.componentDef,u=YS(d,o||this.ngModule,n),f=KS(u),p=f.tracingService;return p&&p.componentCreate?p.componentCreate(eb(d),()=>this.createComponentRef(f,u,e,i,r,a,s,c)):this.createComponentRef(f,u,e,i,r,a,s,c)}finally{I(l)}}createComponentRef(n,e,i,o,r,a,s,c){let l=this.componentDef,d=QS(o,l,a,r,c),u=n.rendererFactory.createRenderer(null,l),f=o?HC(u,o,l.encapsulation,e):ZS(l,u,s??null);XS(f);let p=e.get(ji,null),v=JS(f,()=>e.get(A,null)??tv());p&&p.addHost(v);let x=a?.some(wg)||r?.some(ie=>typeof ie!="function"&&ie.bindings.some(wg)),E=km(null,d,null,512|Mv(l),null,null,n,u,e,null,av(f,e,!0));p&&sb&&v instanceof ShadowRoot&&Rs(E,()=>{p.removeHost(v)}),E[Fe]=f,Ps(E);let $=null;try{let ie=rb(Fe,E,2,"#host",()=>d.directiveRegistry,!0,0);bv(u,f,ie),Do(f,E),Rm(d,E,ie),cv(d,ie,E),ab(d,ie),i!==void 0&&tE(ie,this.ngContentSelectors,i),$=Mt(ie.index,E),E[Pe]=$[Pe],Fm(d,E,null)}catch(ie){throw $!==null&&Ou($),Ou(E),ie}finally{pe(ce.DynamicComponentEnd),Ls()}return new rc(this.componentType,E,!!x)}};function QS(t,n,e,i,o){let r=t?["ng-version","22.3.0"]:bC(n.selectors[0]),a=null,s=null,c=0;if(e)for(let u of e)c+=u[Ku].requiredVars,u.create&&(u.targetIdx=0,(a??=[]).push(u)),u.update&&(u.targetIdx=0,(s??=[]).push(u));if(i)for(let u=0;u<i.length;u++){let f=i[u];if(typeof f!="function")for(let p of f.bindings){c+=p[Ku].requiredVars;let v=u+1;p.create&&(p.targetIdx=v,(a??=[]).push(p)),p.update&&(p.targetIdx=v,(s??=[]).push(p))}}let l=[n];if(i)for(let u of i){let f=typeof u=="function"?u:u.type,p=Ss(f);l.push(p)}return Tm(0,null,eE(a,s),1,c,l,null,null,null,[r],null)}function JS(t,n){let e=t.getRootNode?.();return GS&&e instanceof Document?e.head:e&&sb&&e instanceof ShadowRoot?e:n().head}function eE(t,n){return!t&&!n?null:e=>{if(e&1&&t)for(let i of t)i.create();if(e&2&&n)for(let i of n)i.update()}}function wg(t){let n=t[Ku].kind;return n==="input"||n==="twoWay"}var rc=class extends Qv{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(n,e,i){super(),this._rootLView=e,this._hasInputBindings=i,this._tNode=Ts(e[T],Fe),this.location=To(this._tNode,e),this.instance=Mt(this._tNode.index,e)[Pe],this.hostView=this.changeDetectorRef=new Wn(e,void 0),this.componentType=n}setInput(n,e){this._hasInputBindings;let i=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(n)&&Object.is(this.previousInputValues.get(n),e))return;let o=this._rootLView,r=Om(i,o[T],o,n,e);this.previousInputValues.set(n,e);let a=Mt(i.index,o);Pm(a,1)}get injector(){return new Sn(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(n){this.hostView.onDestroy(n)}};function tE(t,n,e){let i=t.projection=[];for(let o=0;o<n.length;o++){let r=e[o];i.push(r!=null&&r.length?Array.from(r):null)}}var Wt=(()=>{class t{static __NG_ELEMENT_ID__=nE}return t})();function nE(){let t=Ye();return lb(t,U())}var Zu=class t extends Wt{_lContainer;_hostTNode;_hostLView;constructor(n,e,i){super(),this._lContainer=n,this._hostTNode=e,this._hostLView=i}get element(){return To(this._hostTNode,this._hostLView)}get injector(){return new Sn(this._hostTNode,this._hostLView)}get parentInjector(){let n=mm(this._hostTNode,this._hostLView);if(Vg(n)){let e=Xs(n,this._hostLView),i=Zs(n),o=e[T].data[i+8];return new Sn(o,e)}else return new Sn(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(n){let e=xg(this._lContainer);return e!==null&&e[n]||null}get length(){return this._lContainer.length-Le}createEmbeddedView(n,e,i){let o,r,a;typeof i=="number"?o=i:i!=null&&(o=i.index,r=i.injector,a=i.onError);let s=ec(this._lContainer,n.ssrId),c=n.createEmbeddedViewImpl(e||{},r,s);return a&&(c._lView[vo]=a),this.insertImpl(c,o,Io(this._hostTNode,s)),c}createComponent(n,e,i,o,r,a,s){let c,l,d=e||{};c=d.index,i=d.injector,o=d.projectableNodes,r=d.environmentInjector||d.ngModuleRef,a=d.directives,s=d.bindings,l=d.onError;let u=new Mo(jn(n)),f=i||this.parentInjector;if(!r&&u.ngModule==null){let ie=this.parentInjector.get($e,null);ie&&(r=ie)}let p=jn(u.componentType??{}),v=ec(this._lContainer,p?.id??null),x=v?.firstChild??null,E=u.create(f,o,x,r,a,s,this._getHostElementNamespace());return l&&(E.hostView._lView[vo]=l),this.insertImpl(E.hostView,c,Io(this._hostTNode,v)),E}_getHostElementNamespace(){if(this._hostTNode.type&2){let n=this._hostTNode.parent??this._hostLView[Xe];return n!==null&&n.type&2&&typeof n.value=="string"&&n.value.toLowerCase()==="foreignobject"?null:n?.namespace??null}return this._hostTNode.namespace}insert(n,e){return this.insertImpl(n,e,!0)}insertImpl(n,e,i){let o=n._lView;if(bh(o)){let s=this.indexOf(n);if(s!==-1)this.detach(s);else{let c=o[je],l=new t(c,c[Xe],c[je]);l.detach(l.indexOf(n))}}let r=this._adjustIndex(e),a=this._lContainer;return Yr(a,o,r,i),n.attachToViewContainerRef(),jd(Cu(a),r,n),n}move(n,e){return this.insert(n,e)}indexOf(n){let e=xg(this._lContainer);return e!==null?e.indexOf(n):-1}remove(n){let e=this._adjustIndex(n,-1),i=jr(this._lContainer,e);i&&(xr(Cu(this._lContainer),e),gc(i[T],i))}detach(n){let e=this._adjustIndex(n,-1),i=jr(this._lContainer,e);return i&&xr(Cu(this._lContainer),e)!=null?new Wn(i):null}_adjustIndex(n,e=0){return n??this.length+e}};function xg(t){return t[Er]}function Cu(t){return t[Er]||(t[Er]=[])}function lb(t,n){let e,i=n[t.index];return Dt(i)?e=i:(e=qv(i,n,null,t),n[t.index]=e,Am(n,e)),oE(e,n,t,i),new Zu(e,t,n)}function iE(t,n){let e=t[Ie],i=e.createComment(""),o=It(n,t),r=e.parentNode(o);return Ri(e,r,i,e.nextSibling(o),!1),i}var oE=sE,rE=()=>!1;function aE(t,n,e){return rE(t,n,e)}function sE(t,n,e,i){if(t[Ei])return;let o;e.type&8?o=ot(i):o=iE(n,e),t[Ei]=o}var Xu=class t{queryList;matches=null;constructor(n){this.queryList=n}clone(){return new t(this.queryList)}setDirty(){this.queryList.setDirty()}},Qu=class t{queries;constructor(n=[]){this.queries=n}createEmbeddedView(n){let e=n.queries;if(e!==null){let i=n.contentQueries!==null?n.contentQueries[0]:e.length,o=[];for(let r=0;r<i;r++){let a=e.getByIndex(r),s=this.queries[a.indexInDeclarationView];o.push(s.clone())}return new t(o)}return null}insertView(n){this.dirtyQueriesWithMatches(n)}detachView(n){this.dirtyQueriesWithMatches(n)}finishViewCreation(n){this.dirtyQueriesWithMatches(n)}dirtyQueriesWithMatches(n){for(let e=0;e<this.queries.length;e++)jm(n,e).matches!==null&&this.queries[e].setDirty()}},ac=class{flags;read;predicate;constructor(n,e,i=null){this.flags=e,this.read=i,typeof n=="string"?this.predicate=mE(n):this.predicate=n}},Ju=class t{queries;constructor(n=[]){this.queries=n}elementStart(n,e){for(let i=0;i<this.queries.length;i++)this.queries[i].elementStart(n,e)}elementEnd(n){for(let e=0;e<this.queries.length;e++)this.queries[e].elementEnd(n)}embeddedTView(n){let e=null;for(let i=0;i<this.length;i++){let o=e!==null?e.length:0,r=this.getByIndex(i).embeddedTView(n,o);r&&(r.indexInDeclarationView=i,e!==null?e.push(r):e=[r])}return e!==null?new t(e):null}template(n,e){for(let i=0;i<this.queries.length;i++)this.queries[i].template(n,e)}getByIndex(n){return this.queries[n]}get length(){return this.queries.length}track(n){this.queries.push(n)}},em=class t{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=!1;_declarationNodeIndex;_appliesToNextNode=!0;constructor(n,e=-1){this.metadata=n,this._declarationNodeIndex=e}elementStart(n,e){this.isApplyingToNode(e)&&this.matchTNode(n,e)}elementEnd(n){this._declarationNodeIndex===n.index&&(this._appliesToNextNode=!1)}template(n,e){this.elementStart(n,e)}embeddedTView(n,e){return this.isApplyingToNode(n)?(this.crossesNgTemplate=!0,this.addMatch(-n.index,e),new t(this.metadata)):null}isApplyingToNode(n){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let e=this._declarationNodeIndex,i=n.parent;for(;i!==null&&i.type&8&&i.index!==e;)i=i.parent;return e===(i!==null?i.index:-1)}return this._appliesToNextNode}matchTNode(n,e){let i=this.metadata.predicate;if(Array.isArray(i))for(let o=0;o<i.length;o++){let r=i[o];this.matchTNodeWithReadOption(n,e,cE(e,r)),this.matchTNodeWithReadOption(n,e,qs(e,n,r,!1,!1))}else i===In?e.type&4&&this.matchTNodeWithReadOption(n,e,-1):this.matchTNodeWithReadOption(n,e,qs(e,n,i,!1,!1))}matchTNodeWithReadOption(n,e,i){if(i!==null){let o=this.metadata.read;if(o!==null)if(o===j||o===Wt||o===te||o===In&&e.type&4)this.addMatch(e.index,-2);else{let r=qs(e,n,o,!1,!1);r!==null&&this.addMatch(e.index,r)}else this.addMatch(e.index,i)}}addMatch(n,e){this.matches===null?this.matches=[n,e]:this.matches.push(n,e)}};function cE(t,n){let e=t.localNames;if(e!==null){for(let i=0;i<e.length;i+=2)if(e[i]===n)return e[i+1]}return null}function lE(t,n){return t.type&11?To(t,n):t.type&4?yc(t,n):null}function dE(t,n,e,i){return e===-1?lE(n,t):e===-2?uE(t,n,i):Pr(t,t[T],e,n)}function uE(t,n,e){if(e===j)return To(n,t);if(e===In)return yc(n,t);if(e===Wt)return lb(n,t);if(e===te)return new Sn(n,t)}function db(t,n,e,i){let o=n[an].queries[i];if(o.matches===null){let r=t.data,a=e.matches,s=[];for(let c=0;a!==null&&c<a.length;c+=2){let l=a[c];if(l<0)s.push(null);else{let d=r[l];s.push(dE(n,d,a[c+1],e.metadata.read))}}o.matches=s}return o.matches}function tm(t,n,e,i){let o=t.queries.getByIndex(e),r=o.matches;if(r!==null){let a=db(t,n,o,e);for(let s=0;s<r.length;s+=2){let c=r[s];if(c>0)i.push(a[s/2]);else{let l=r[s+1],d=n[-c];for(let u=Le;u<d.length;u++){let f=d[u];f[zn]===f[je]&&tm(f[T],f,l,i)}if(d[Di]!==null){let u=d[Di];for(let f=0;f<u.length;f++){let p=u[f];tm(p[T],p,l,i)}}}}}return i}function Vm(t,n){return t[an].queries[n].queryList}function ub(t,n,e){let i=new En((e&4)===4);return wh(t,n,i,i.destroy),(n[an]??=new Qu).queries.push(new Xu(i))-1}function mb(t,n,e){let i=Te();return i.firstCreatePass&&(fb(i,new ac(t,n,e),-1),(n&2)===2&&(i.staticViewQueries=!0)),ub(i,U(),n)}function pb(t,n,e,i){let o=Te();if(o.firstCreatePass){let r=Ye();fb(o,new ac(n,e,i),r.index),pE(o,t),(e&2)===2&&(o.staticContentQueries=!0)}return ub(o,U(),e)}function mE(t){return t.split(",").map(n=>n.trim())}function fb(t,n,e){t.queries===null&&(t.queries=new Ju),t.queries.track(new em(n,e))}function pE(t,n){let e=t.contentQueries||(t.contentQueries=[]),i=e.length?e[e.length-1]:-1;n!==i&&e.push(t.queries.length-1,n)}function jm(t,n){return t.queries.getByIndex(n)}function hb(t,n){let e=t[T],i=jm(e,n);return i.crossesNgTemplate?tm(e,t,n,[]):db(e,t,i,n)}function gb(t,n,e){let i,o=or(()=>{i._dirtyCounter();let r=fE(i,t);if(n&&r===void 0)throw new S(-951,!1);return r});return i=o[qe],i._dirtyCounter=ne(0),i._flatValue=void 0,o}function Bm(t){return gb(!0,!1,t)}function Hm(t){return gb(!0,!0,t)}function vb(t,n){let e=t[qe];e._lView=U(),e._queryIndex=n,e._queryList=Vm(e._lView,n),e._queryList.onDirty(()=>e._dirtyCounter.update(i=>i+1))}function fE(t,n){let e=t._lView,i=t._queryIndex;if(e===void 0||i===void 0||e[V]&4)return n?void 0:st;let o=Vm(e,i),r=hb(e,i);return o.reset(r,qg),n?o.first:o._changesDetected||t._flatValue===void 0?t._flatValue=o.toArray():t._flatValue}function Bi(t){return!!t&&typeof t.then=="function"}function zm(t){return!!t&&typeof t.subscribe=="function"}var Pi=class{};var Br=class extends Pi{injector;instance=null;constructor(n){super();let e=new _i([...n.providers,{provide:Pi,useValue:this}],n.parent||po(),n.debugName,new Set(["environment"]));this.injector=e,n.runEnvironmentInitializers&&e.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(n){this.injector.onDestroy(n)}};function bb(t,n,e=null){return new Br({providers:t,parent:n,debugName:e,runEnvironmentInitializers:!0}).injector}var hE=(()=>{class t{_injector;cachedInjectors=new Map;constructor(e){this._injector=e}getOrCreateStandaloneInjector(e){if(!e.standalone)return null;if(!this.cachedInjectors.has(e)){let i=zd(!1,e.type),o=i.length>0?bb([i],this._injector,""):null;this.cachedInjectors.set(e,o)}return this.cachedInjectors.get(e)}ngOnDestroy(){try{for(let e of this.cachedInjectors.values())e!==null&&e.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=W({token:t,providedIn:"environment",factory:()=>new t(R($e))})}return t})();function L(t){return $r(()=>{let n=yb(t),e=Q(C({},n),{decls:t.decls,vars:t.vars,template:t.template,consts:t.consts||null,ngContentSelectors:t.ngContentSelectors,onPush:t.changeDetection!==fm.Eager,directiveDefs:null,pipeDefs:null,dependencies:n.standalone&&t.dependencies||null,getStandaloneInjector:n.standalone?o=>o.get(hE).getOrCreateStandaloneInjector(e):null,getExternalStyles:null,data:t.data||{},encapsulation:t.encapsulation||zt.Emulated,styles:t.styles||st,_:null,schemas:t.schemas||null,tView:null,id:""});n.standalone&&qn("NgStandalone"),_b(e);let i=t.dependencies;return e.directiveDefs=Cg(i,gE),e.pipeDefs=Cg(i,th),e.id=yE(e),e})}function gE(t){return jn(t)||Ss(t)}function B(t){return $r(()=>({type:t.type,bootstrap:t.bootstrap||st,declarations:t.declarations||st,imports:t.imports||st,exports:t.exports||st,transitiveCompileScopes:null,schemas:t.schemas||null,id:t.id||null}))}function vE(t,n){if(t==null)return Bn;let e={};for(let i in t)if(Object.hasOwn(t,i)){let o=t[i],r,a,s,c;Array.isArray(o)?(s=o[0],r=o[1],a=o[2]??r,c=o[3]||null):(r=o,a=o,s=Wr.None,c=null),e[r]=[i,s,c],n[r]=a}return e}function bE(t){if(t==null)return Bn;let n={};for(let e in t)Object.hasOwn(t,e)&&(n[t[e]]=e);return n}function F(t){return $r(()=>{let n=yb(t);return _b(n),n})}function Um(t){return{type:t.type,name:t.name,factory:null,pure:t.pure!==!1,standalone:t.standalone??!0,onDestroy:t.type.prototype.ngOnDestroy||null}}function yb(t){let n={};return{type:t.type,providersResolver:null,viewProvidersResolver:null,factory:null,hostBindings:t.hostBindings||null,hostVars:t.hostVars||0,hostAttrs:t.hostAttrs||null,contentQueries:t.contentQueries||null,declaredInputs:n,inputConfig:t.inputs||Bn,exportAs:t.exportAs||null,standalone:t.standalone??!0,selectors:t.selectors||st,viewQuery:t.viewQuery||null,features:t.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,controlDef:null,signalFormsInputPresence:null,inputs:vE(t.inputs,n),outputs:bE(t.outputs),debugInfo:null}}function _b(t){t.features?.forEach(n=>n(t))}function Cg(t,n){return t?()=>{let e=typeof t=="function"?t():t,i=[];for(let o of e){let r=n(o);r!==null&&i.push(r)}return i}:null}function yE(t){let n=0,e=typeof t.consts=="function"?"":t.consts,i=[t.selectors,t.ngContentSelectors,t.hostVars,t.hostAttrs,e,t.vars,t.decls,t.encapsulation,t.standalone,t.exportAs,JSON.stringify(t.inputs),JSON.stringify(t.outputs),Object.getOwnPropertyNames(t.type.prototype),!!t.contentQueries,!!t.viewQuery];for(let r of i.join("|"))n=Math.imul(31,n)+r.charCodeAt(0)<<0;return n+=2147483648,"c"+n}var wb=new b("");var $m=(()=>{class t{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((e,i)=>{this.resolve=e,this.reject=i});appInits=m(wb,{optional:!0})??[];injector=m(te);constructor(){}runInitializers(){if(this.initialized)return;let e=[];for(let o of this.appInits){let r=fo(this.injector,o);if(Bi(r))e.push(r);else if(zm(r)){let a=new Promise((s,c)=>{r.subscribe({complete:s,error:c})});e.push(a)}}let i=()=>{this.done=!0,this.resolve()};Promise.all(e).then(()=>{i()}).catch(o=>{this.reject(o)}),e.length===0&&i(),this.initialized=!0}static \u0275fac=function(i){return new(i||t)};static \u0275prov=O({token:t,factory:t.\u0275fac})}return t})();function Gm(t){return n=>{n.controlDef={create:(e,i)=>{e?.\u0275ngControlCreate(i)},update:(e,i)=>{e?.\u0275ngControlUpdate?.(i)},passThroughInput:t}}}function _E(t){return Object.getPrototypeOf(t.prototype).constructor}function We(t){let n=_E(t.type),e=!0,i=[t];for(;n&&n!==Function.prototype&&n!==Object.prototype;){let o,r=Object.hasOwn(n,_r)?n[_r]:void 0,a=Object.hasOwn(n,wr)?n[wr]:void 0;if(_n(t))o=r??a;else{if(r&&t.selectors&&t.selectors.length>0)throw new S(903,!1);o=r??a}if(o){if(e){i.push(o);let c=t;c.inputs=Su(t.inputs),c.declaredInputs=Su(t.declaredInputs),c.outputs=Su(t.outputs);let l=o.hostBindings;l&&EE(t,l);let d=o.viewQuery,u=o.contentQueries;d&&CE(t,d),u&&SE(t,u),wE(t,o),eh(t.outputs,o.outputs);let f=o.data?.animation;if(f){let p=t.data??={};p.animation=(p.animation||[]).concat(f)}}let s=o.features;if(s)for(let c=0;c<s.length;c++){let l=s[c];l&&l.ngInherit&&l(t),l===We&&(e=!1)}}n=Object.getPrototypeOf(n)}xE(i)}function wE(t,n){for(let e in n.inputs){if(!Object.hasOwn(n.inputs,e)||Object.hasOwn(t.inputs,e))continue;let i=n.inputs[e];i!==void 0&&(t.inputs[e]=i,t.declaredInputs[e]=n.declaredInputs[e])}}function xE(t){let n=0,e=null;for(let i=t.length-1;i>=0;i--){let o=t[i];o.hostVars=n+=o.hostVars,o.hostAttrs=Eo(o.hostAttrs,e=Eo(e,o.hostAttrs))}}function Su(t){return t===Bn?{}:t===st?[]:t}function CE(t,n){let e=t.viewQuery;e?t.viewQuery=(i,o)=>{n(i,o),e(i,o)}:t.viewQuery=n}function SE(t,n){let e=t.contentQueries;e?t.contentQueries=(i,o,r)=>{n(i,o,r),e(i,o,r)}:t.contentQueries=n}function EE(t,n){let e=t.hostBindings;e?t.hostBindings=(i,o)=>{n(i,o),e(i,o)}:t.hostBindings=n}function xb(t,n,e,i,o,r,a,s){if(e.firstCreatePass){t.mergedAttrs=Eo(t.mergedAttrs,t.attrs);let d=t.tView=Tm(2,t,o,r,a,e.directiveRegistry,e.pipeRegistry,null,e.schemas,e.consts,null);e.queries!==null&&(e.queries.template(e,t),d.queries=e.queries.embeddedTView(t))}s&&(t.flags|=s),yo(t,!1);let c=IE(e,n,t,i);Vs()&&Mm(e,n,c,t),Do(c,n);let l=qv(c,n,c,t);n[i+Fe]=l,Am(n,l),aE(l,t,n)}function DE(t,n,e,i,o,r,a,s,c,l,d){let u=e+Fe,f;return n.firstCreatePass?(f=ko(n,u,4,a||null,s||null),ou()&&ib(n,t,f,Nt(n.consts,l),Ov),Fg(n,f)):f=n.data[u],xb(f,t,n,e,i,o,r,c),Dr(f)&&Rm(n,t,f),l!=null&&bc(t,f,d),f}function Hr(t,n,e,i,o,r,a,s,c,l,d){let u=e+Fe,f;if(n.firstCreatePass){if(f=ko(n,u,4,a||null,s||null),l!=null){let p=Nt(n.consts,l);f.localNames=[];for(let v=0;v<p.length;v+=2)f.localNames.push(p[v],-1)}}else f=n.data[u];return xb(f,t,n,e,i,o,r,c),l!=null&&bc(t,f,d),f}function Ro(t,n,e,i,o,r,a,s){let c=U(),l=Te(),d=Nt(l.consts,r);return DE(c,l,t,n,e,i,o,d,void 0,a,s),Ro}var IE=ME;function ME(t,n,e,i){return js(!0),n[Ie].createComment("")}var Wm=new b("");var qm=new b("");function Cb(){td(t=>{let n="";throw new S(-600,n)})}var NE=10;var qt=(()=>{class t{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=m($n);afterRenderManager=m(hc);zonelessEnabled=m(Ar);rootEffectScheduler=m(Hs);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=!1;afterTick=new D;get allViews(){return[...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=m(Ai);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(ge(e=>!e))}constructor(){m($t,{optional:!0})}whenStable(){let e;return new Promise(i=>{e=this.isStable.subscribe({next:o=>{o&&i()}})}).finally(()=>{e.unsubscribe()})}_injector=m($e);_rendererFactory=null;get injector(){return this._injector}bootstrap(e,i){return this.bootstrapImpl(e,i)}bootstrapImpl(e,i,o=te.NULL){return this._injector.get(N).run(()=>{if(pe(ce.BootstrapComponentStart),!this._injector.get($m).done){let $="";throw new S(405,$)}let s=jn(e),c=this._injector.get(Pi),l=new Mo(s,c);this.componentTypes.push(e);let{hostElement:d,directives:u,bindings:f}=TE(i),p=d||l.selector,v=l.create(o,[],p,c.injector,u,f),x=v.location.nativeElement,E=v.injector.get(Wm,null);return E?.registerApplication(x),v.onDestroy(()=>{this.detachView(v.hostView),Fr(this.components,v),E?.unregisterApplication(x)}),this._loadComponent(v),pe(ce.BootstrapComponentEnd,v),v})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){pe(ce.ChangeDetectionStart),this.tracingSnapshot!==null?this.tracingSnapshot.run(fc.CHANGE_DETECTION,this.tickImpl):this.tickImpl()}tickImpl=()=>{if(this._runningTick)throw pe(ce.ChangeDetectionEnd),new S(101,!1);let e=I(null);try{this._runningTick=!0,this.synchronize()}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,I(e),this.afterTick.next(),pe(ce.ChangeDetectionEnd)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(Ge,null,{optional:!0}));let e=0;for(;this.dirtyFlags!==0&&e++<NE;){pe(ce.ChangeDetectionSyncStart);try{this.synchronizeOnce()}finally{pe(ce.ChangeDetectionSyncEnd)}}}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let e=!1;if(this.dirtyFlags&7){let i=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:o}of this.allViews){if(!i&&!Ir(o))continue;let r=i&&!this.zonelessEnabled?0:1;zv(o,r),e=!0}if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}e||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:e})=>Ir(e))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(e){let i=e;this._views.push(i),i.attachToAppRef(this)}detachView(e){let i=e;Fr(this._views,i),i.detachFromAppRef()}_loadComponent(e){this.attachView(e.hostView);try{this.tick()}catch(o){this.internalErrorHandler(o)}this.components.push(e),this._injector.get(qm,[]).forEach(o=>o(e))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(e=>e()),this._views.slice().forEach(e=>e.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(e){return this._destroyListeners.push(e),()=>Fr(this._destroyListeners,e)}destroy(){if(this._destroyed)throw new S(406,!1);let e=this._injector;e.destroy&&!e.destroyed&&e.destroy()}get viewCount(){return this._views.length}static \u0275fac=function(i){return new(i||t)};static \u0275prov=O({token:t,factory:t.\u0275fac})}return t})();function TE(t){return t===void 0||typeof t=="string"||t instanceof Element?{hostElement:t}:t}function Fr(t,n){let e=t.indexOf(n);e>-1&&t.splice(e,1)}function ve(t,n,e,i){let o=U(),r=ki();if(Nn(o,r,n)){let a=Te(),s=Nr();ZC(s,o,t,n,e,i)}return ve}var nm=class{destroy(n){}updateValue(n,e){}swap(n,e){let i=Math.min(n,e),o=Math.max(n,e),r=this.detach(o);if(o-i>1){let a=this.detach(i);this.attach(i,r),this.attach(o,a)}else this.attach(i,r)}move(n,e){this.attach(e,this.detach(n))}};function Eu(t,n,e,i,o){return t===e&&Object.is(n,i)?1:Object.is(o(t,n),o(e,i))?-1:0}function kE(t,n,e,i){let o,r,a=0,s=t.length-1,c=void 0;if(Array.isArray(n)){I(i);let l=n.length-1;for(I(null);a<=s&&a<=l;){let d=t.at(a),u=n[a],f=Eu(a,d,a,u,e);if(f!==0){f<0&&t.updateValue(a,u),a++;continue}let p=t.at(s),v=n[l],x=Eu(s,p,l,v,e);if(x!==0){x<0&&t.updateValue(s,v),s--,l--;continue}let E=e(a,d),$=e(s,p),ie=e(a,u);if(Object.is(ie,$)){let bt=e(l,v);Object.is(bt,E)?(t.swap(a,s),t.updateValue(s,v),l--,s--):t.move(s,a),t.updateValue(a,u),a++;continue}if(o??=new sc,r??=Eg(t,a,s,e),im(t,o,a,ie))t.updateValue(a,u),a++,s++;else if(r.has(ie))o.set(E,t.detach(a)),s--;else{let bt=t.create(a,n[a]);t.attach(a,bt),a++,s++}}for(;a<=l;)Sg(t,o,e,a,n[a]),a++}else if(n!=null){I(i);let l=n[Symbol.iterator]();I(null);let d=l.next();for(;!d.done&&a<=s;){let u=t.at(a),f=d.value,p=Eu(a,u,a,f,e);if(p!==0)p<0&&t.updateValue(a,f),a++,d=l.next();else{o??=new sc,r??=Eg(t,a,s,e);let v=e(a,f);if(im(t,o,a,v))t.updateValue(a,f),a++,s++,d=l.next();else if(!r.has(v))t.attach(a,t.create(a,f)),a++,s++,d=l.next();else{let x=e(a,u);o.set(x,t.detach(a)),s--}}}for(;!d.done;)Sg(t,o,e,t.length,d.value),d=l.next()}for(;a<=s;)t.destroy(t.detach(s--));o?.forEach(l=>{t.destroy(l)})}function im(t,n,e,i){return n!==void 0&&n.has(i)?(t.attach(e,n.get(i)),n.delete(i),!0):!1}function Sg(t,n,e,i,o){if(im(t,n,i,e(i,o)))t.updateValue(i,o);else{let r=t.create(i,o);t.attach(i,r)}}function Eg(t,n,e,i){let o=new Set;for(let r=n;r<=e;r++)o.add(i(r,t.at(r)));return o}var sc=class{kvMap=new Map;_vMap=void 0;has(n){return this.kvMap.has(n)}delete(n){if(!this.has(n))return!1;let e=this.kvMap.get(n);return this._vMap!==void 0&&this._vMap.has(e)?(this.kvMap.set(n,this._vMap.get(e)),this._vMap.delete(e)):this.kvMap.delete(n),!0}get(n){return this.kvMap.get(n)}set(n,e){if(this.kvMap.has(n)){let i=this.kvMap.get(n);this._vMap===void 0&&(this._vMap=new Map);let o=this._vMap;for(;o.has(i);)i=o.get(i);o.set(i,e)}else this.kvMap.set(n,e)}forEach(n){for(let[e,i]of this.kvMap)if(n(i,e),this._vMap!==void 0){let o=this._vMap;for(;o.has(i);)i=o.get(i),n(i,e)}}};function be(t,n,e,i,o,r,a,s){qn("NgControlFlow");let c=U(),l=Te(),d=Nt(l.consts,r);return Hr(c,l,t,n,e,i,o,d,256,a,s),Ym}function Ym(t,n,e,i,o,r,a,s){return qn("NgControlFlow"),AE(t,n,e,i,o,r,a,s),Ym}function AE(t,n,e,i,o,r,a,s){let c=U(),l=Te(),d=Nt(l.consts,r);Hr(c,l,t,n,e,i,o,d,512,a,s)}function ye(t,n){qn("NgControlFlow");let e=U(),i=ki(),o=e[i]!==Tt?e[i]:-1,r=o!==-1?cc(e,Fe+o):void 0,a=0;if(Nn(e,i,t)){let s=I(null);try{if(r!==void 0&&Kv(r,a),t!==-1){let c=Fe+t,l=cc(e,c),d=sm(e[T],c),u=Xv(l,d,e),f=qr(e,d,n,{dehydratedView:u});Yr(l,f,a,Io(d,u))}}finally{I(s)}}else if(r!==void 0){let s=Yv(r,a);s!==void 0&&(s[Pe]=n)}}var om=class{lContainer;$implicit;$index;constructor(n,e,i){this.lContainer=n,this.$implicit=e,this.$index=i}get $count(){return this.lContainer.length-Le}};function _c(t,n){return n}var rm=class{hasEmptyBlock;trackByFn;liveCollection;constructor(n,e,i){this.hasEmptyBlock=n,this.trackByFn=e,this.liveCollection=i}};function wc(t,n,e,i,o,r,a,s,c,l,d,u,f){qn("NgControlFlow");let p=U(),v=Te(),x=c!==void 0,E=U(),$=s?a.bind(E[it][Pe]):a,ie=new rm(x,$);E[Fe+t]=ie,Hr(p,v,t+1,n,e,i,o,Nt(v.consts,r),256),x&&Hr(p,v,t+2,c,l,d,u,Nt(v.consts,f),512)}var am=class extends nm{lContainer;hostLView;templateTNode;operationsCounter=void 0;needsIndexUpdate=!1;constructor(n,e,i){super(),this.lContainer=n,this.hostLView=e,this.templateTNode=i}get length(){return this.lContainer.length-Le}at(n){return this.getLView(n)[Pe].$implicit}attach(n,e){let i=e[xi];this.needsIndexUpdate||=n!==this.length,Yr(this.lContainer,e,n,Io(this.templateTNode,i)),RE(this.lContainer,n)}detach(n){return this.needsIndexUpdate||=n!==this.length-1,OE(this.lContainer,n),FE(this.lContainer,n)}create(n,e){let i=ec(this.lContainer,this.templateTNode.tView.ssrId);return qr(this.hostLView,this.templateTNode,new om(this.lContainer,e,n),{dehydratedView:i})}destroy(n){gc(n[T],n)}updateValue(n,e){this.getLView(n)[Pe].$implicit=e}reset(){this.needsIndexUpdate=!1}updateIndexes(){if(this.needsIndexUpdate)for(let n=0;n<this.length;n++)this.getLView(n)[Pe].$index=n}getLView(n){return PE(this.lContainer,n)}};function xc(t){let n=I(null),e=wn();try{let i=U(),o=i[T],r=i[e],a=e+1,s=cc(i,a);if(r.liveCollection===void 0){let l=sm(o,a);r.liveCollection=new am(s,i,l)}else r.liveCollection.reset();let c=r.liveCollection;if(kE(c,t,r.trackByFn,n),c.updateIndexes(),r.hasEmptyBlock){let l=ki(),d=c.length===0;if(Nn(i,l,d)){let u=e+2,f=cc(i,u);if(d){let p=sm(o,u),v=Xv(f,p,i),x=qr(i,p,void 0,{dehydratedView:v});Yr(f,x,0,Io(p,v))}else o.firstUpdatePass&&_S(f),Kv(f,0)}}}finally{I(n)}}function cc(t,n){return t[n]}function RE(t,n){if(t.length<=Le)return;let e=Le+n,i=t[e];i&&EC(i)}function OE(t,n){if(t.length<=Le)return;let e=Le+n,i=t[e];i&&SC(i)}function FE(t,n){return jr(t,n)}function PE(t,n){return Yv(t,n)}function sm(t,n){return Ts(t,n)}function H(t,n,e){let i=U(),o=ki();if(Nn(i,o,n)){let r=Te(),a=Nr();GC(a,i,t,n,i[Ie],e)}return H}function cm(t,n,e,i,o){Om(n,t,e,o?"class":"style",i)}function h(t,n,e,i){let o=U(),r=o[T],a=t+Fe,s=r.firstCreatePass?rb(a,o,2,n,Ov,ou(),e,i):r.data[a];if(yn(s)){let c=o[rn].tracingService;if(c&&c.componentCreate){let l=r.data[s.directiveStart+s.componentOffset];return c.componentCreate(eb(l),()=>(Dg(t,n,o,s,i),h))}}return Dg(t,n,o,s,i),h}function Dg(t,n,e,i,o){if(Fv(i,e,t,n,Sb),Dr(i)){let r=e[T];Rm(r,e,i),cv(r,i,e)}o!=null&&bc(e,i)}function g(){let t=Te(),n=Ye(),e=Pv(n);return t.firstCreatePass&&ab(t,e),au(e)&&su(),iu(),e.classesWithoutHost!=null&&y0(e)&&cm(t,e,U(),e.classesWithoutHost,!0),e.stylesWithoutHost!=null&&_0(e)&&cm(t,e,U(),e.stylesWithoutHost,!1),g}function fe(t,n,e,i){return h(t,n,e,i),g(),fe}function Qe(t,n,e,i){let o=U(),r=o[T],a=t+Fe,s=r.firstCreatePass?US(a,r,2,n,e,i):r.data[a];return Fv(s,o,t,n,Sb),i!=null&&bc(o,s),Qe}function rt(){let t=Ye(),n=Pv(t);return au(n)&&su(),iu(),rt}function kt(t,n,e,i){return Qe(t,n,e,i),rt(),kt}var Sb=(t,n,e,i,o)=>(js(!0),hv(n[Ie],i,hu()));function Oo(){return U()}function dn(t,n,e){let i=U(),o=ki();if(Nn(i,o,n)){let r=Te(),a=Nr();Av(a,i,t,n,i[Ie],e)}return dn}function oe(t,n,e){let i=U(),o=Te(),r=Ye();return LE(o,i,i[Ie],r,t,n,e),oe}function Cc(t,n,e){let i=U(),o=Te(),r=Ye();return(r.type&3||e)&&tb(r,o,i,e,i[Ie],t,n,So(r,i,n)),Cc}function LE(t,n,e,i,o,r,a){let s=!0,c=null;if((i.type&3||a)&&(c??=So(i,n,r),tb(i,t,n,a,e,o,r,c)&&(s=!1)),s){let l=i.outputs?.[o],d=i.hostDirectiveOutputs?.[o];if(d&&d.length)for(let u=0;u<d.length;u+=2){let f=d[u],p=d[u+1];c??=So(i,n,r),nc(i,n,f,p,o,c)}if(l&&l.length)for(let u of l)c??=So(i,n,r),nc(i,n,u,o,o,c)}}function Be(t=1){return Fh(t)}function VE(t,n){let e=null,i=mC(t);for(let o=0;o<n.length;o++){let r=n[o];if(r==="*"){e=o;continue}if(i===null?_v(t,r,!0):hC(i,r))return o}return e}function Me(t){let n=U()[it][Xe];if(!n.projection){let e=t?t.length:1,i=n.projection=sh(e,null),o=i.slice(),r=n.child;for(;r!==null;){if(r.type!==128){let a=t?VE(r,t):0;a!==null&&(o[a]?o[a].projectionNext=r:i[a]=r,o[a]=r)}r=r.next}}}function q(t,n=0,e,i,o,r){let a=U(),s=Te(),c=i?t+1:null;c!==null&&Hr(a,s,c,i,o,r,null,e);let l=ko(s,Fe+t,16,null,e||null);l.projection===null&&(l.projection=n),du();let u=!a[xi]||ru();a[it][Xe].projection[l.projection]===null&&c!==null?jE(a,s,c):u&&!uc(l)&&FC(s,a,l)}function jE(t,n,e){let i=Fe+e,o=n.data[i],r=t[i],a=ec(r,o.tView.ssrId),s=qr(t,o,void 0,{dehydratedView:a});Yr(r,s,0,Io(o,a))}function Yt(t,n,e,i){return pb(t,n,e,i),Yt}function dt(t,n,e){return mb(t,n,e),dt}function Z(t){let n=U(),e=Te(),i=Fs();Mr(i+1);let o=jm(e,i);if(t.dirty&&vh(n)===((o.metadata.flags&2)===2)){if(o.matches===null)t.reset([]);else{let r=hb(n,i);t.reset(r,qg),t.notifyOnChanges()}return!0}return!1}function X(){return Vm(U(),Fs())}function Sc(t,n,e,i,o){return vb(n,pb(t,e,i,o)),Sc}function Ec(t,n,e,i){return vb(t,mb(n,e,i)),Ec}function Dc(t=1){Mr(Fs()+t)}function Yn(t){let n=Eh();return Xd(n,Fe+t)}function $s(t,n){return t<<17|n<<2}function Li(t){return t>>17&32767}function BE(t){return(t&2)==2}function HE(t,n){return t&131071|n<<17}function lm(t){return t|2}function No(t){return(t&131068)>>2}function Du(t,n){return t&-131069|n<<2}function zE(t){return(t&1)===1}function dm(t){return t|1}function UE(t,n,e,i,o,r){let a=r?n.classBindings:n.styleBindings,s=Li(a),c=No(a);t[i]=e;let l=!1,d;if(Array.isArray(e)){let u=e;d=u[1],(d===null||uo(u,d)>0)&&(l=!0)}else d=e;if(o)if(c!==0){let f=Li(t[s+1]);t[i+1]=$s(f,s),f!==0&&(t[f+1]=Du(t[f+1],i)),t[s+1]=HE(t[s+1],i)}else t[i+1]=$s(s,0),s!==0&&(t[s+1]=Du(t[s+1],i)),s=i;else t[i+1]=$s(c,0),s===0?s=i:t[c+1]=Du(t[c+1],i),c=i;l&&(t[i+1]=lm(t[i+1])),Ig(t,d,i,!0),Ig(t,d,i,!1),$E(n,d,t,i,r),a=$s(s,c),r?n.classBindings=a:n.styleBindings=a}function $E(t,n,e,i,o){let r=o?t.residualClasses:t.residualStyles;r!=null&&typeof n=="string"&&uo(r,n)>=0&&(e[i+1]=dm(e[i+1]))}function Ig(t,n,e,i){let o=t[e+1],r=n===null,a=i?Li(o):No(o),s=!1;for(;a!==0&&(s===!1||r);){let c=t[a],l=t[a+1];GE(c,n)&&(s=!0,t[a+1]=i?dm(l):lm(l)),a=i?Li(l):No(l)}s&&(t[e+1]=i?lm(o):dm(o))}function GE(t,n){return t===null||n==null||(Array.isArray(t)?t[1]:t)===n?!0:Array.isArray(t)&&typeof n=="string"?uo(t,n)>=0:!1}var Ht={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function WE(t){return t.substring(Ht.key,Ht.keyEnd)}function qE(t){return YE(t),Eb(t,Db(t,0,Ht.textEnd))}function Eb(t,n){let e=Ht.textEnd;return e===n?-1:(n=Ht.keyEnd=KE(t,Ht.key=n,e),Db(t,n,e))}function YE(t){Ht.key=0,Ht.keyEnd=0,Ht.value=0,Ht.valueEnd=0,Ht.textEnd=t.length}function Db(t,n,e){for(;n<e&&t.charCodeAt(n)<=32;)n++;return n}function KE(t,n,e){for(;n<e&&t.charCodeAt(n)>32;)n++;return n}function Hi(t,n,e){return Ib(t,n,e,!1),Hi}function k(t,n){return Ib(t,n,null,!0),k}function xt(t){XE(iD,ZE,t,!0)}function ZE(t,n){for(let e=qE(n);e>=0;e=Eb(n,e))Is(t,WE(n),!0)}function Ib(t,n,e,i){let o=U(),r=Te(),a=mu(2);if(r.firstUpdatePass&&Nb(r,t,a,i),n!==Tt&&Nn(o,a,n)){let s=r.data[wn()];Tb(r,s,o,o[Ie],t,o[a+1]=rD(n,e),i,a)}}function XE(t,n,e,i){let o=Te(),r=mu(2);o.firstUpdatePass&&Nb(o,null,r,i);let a=U();if(e!==Tt&&Nn(a,r,e)){let s=o.data[wn()];if(kb(s,i)&&!Mb(o,r)){let c=i?s.classesWithoutHost:s.stylesWithoutHost;c!==null&&(e=ws(c,e||"")),cm(o,s,a,e,i)}else oD(o,s,a,a[Ie],a[r+1],a[r+1]=nD(t,n,e),i,r)}}function Mb(t,n){return n>=t.expandoStartIndex}function Nb(t,n,e,i){let o=t.data;if(o[e+1]===null){let r=o[wn()],a=Mb(t,e);kb(r,i)&&n===null&&!a&&(n=!1),n=QE(o,r,n,i),UE(o,r,n,e,a,i)}}function QE(t,n,e,i){let o=kh(t),r=i?n.residualClasses:n.residualStyles;if(o===null)(i?n.classBindings:n.styleBindings)===0&&(e=Iu(null,t,n,e,i),e=zr(e,n.attrs,i),r=null);else{let a=n.directiveStylingLast;if(a===-1||t[a]!==o)if(e=Iu(o,t,n,e,i),r===null){let c=JE(t,n,i);c!==void 0&&Array.isArray(c)&&(c=Iu(null,t,n,c[1],i),c=zr(c,n.attrs,i),eD(t,n,i,c))}else r=tD(t,n,i)}return r!==void 0&&(i?n.residualClasses=r:n.residualStyles=r),e}function JE(t,n,e){let i=e?n.classBindings:n.styleBindings;if(No(i)!==0)return t[Li(i)]}function eD(t,n,e,i){let o=e?n.classBindings:n.styleBindings;t[Li(o)]=i}function tD(t,n,e){let i,o=n.directiveEnd;for(let r=1+n.directiveStylingLast;r<o;r++){let a=t[r].hostAttrs;i=zr(i,a,e)}return zr(i,n.attrs,e)}function Iu(t,n,e,i,o){let r=null,a=e.directiveEnd,s=e.directiveStylingLast;for(s===-1?s=e.directiveStart:s++;s<a&&(r=n[s],i=zr(i,r.hostAttrs,o),r!==t);)s++;return t!==null&&(e.directiveStylingLast=s),i}function zr(t,n,e){let i=e?1:2,o=-1;if(n!==null)for(let r=0;r<n.length;r++){let a=n[r];typeof a=="number"?o=a:o===i&&(Array.isArray(t)||(t=t===void 0?[]:["",t]),Is(t,a,e?!0:n[++r]))}return t===void 0?null:t}function nD(t,n,e){if(e==null||e==="")return st;let i=[],o=Ut(e);if(Array.isArray(o))for(let r=0;r<o.length;r++)t(i,o[r],!0);else if(o instanceof Set)for(let r of o)t(i,r,!0);else if(typeof o=="object")for(let r in o)Object.hasOwn(o,r)&&t(i,r,o[r]);else typeof o=="string"&&n(i,o);return i}function iD(t,n,e){let i=String(n);i!==""&&!i.includes(" ")&&Is(t,i,e)}function oD(t,n,e,i,o,r,a,s){o===Tt&&(o=st);let c=0,l=0,d=0<o.length?o[0]:null,u=0<r.length?r[0]:null;for(;d!==null||u!==null;){let f=c<o.length?o[c+1]:void 0,p=l<r.length?r[l+1]:void 0,v=null,x;d===u?(c+=2,l+=2,f!==p&&(v=u,x=p)):u===null||d!==null&&d<u?(c+=2,v=d):(l+=2,v=u,x=p),v!==null&&Tb(t,n,e,i,v,x,a,s),d=c<o.length?o[c]:null,u=l<r.length?r[l]:null}}function Tb(t,n,e,i,o,r,a,s){if(!(n.type&3))return;let c=t.data,l=c[s+1],d=zE(l)?Mg(c,n,e,o,No(l),a):void 0;if(!lc(d)){lc(r)||BE(l)&&(r=Mg(c,null,e,o,s,a));let u=Zd(wn(),e);LC(i,a,u,o,r)}}function Mg(t,n,e,i,o,r){let a=n===null,s;for(;o>0;){let c=t[o],l=Array.isArray(c),d=l?c[1]:c,u=d===null,f=e[o+1];f===Tt&&(f=u?st:void 0);let p=u?Ms(f,i):d===i?f:void 0;if(l&&!lc(p)&&(p=Ms(c,i)),lc(p)&&(s=p,a))return s;let v=t[o+1];o=a?Li(v):No(v)}if(n!==null){let c=r?n.residualClasses:n.residualStyles;c!=null&&(s=Ms(c,i))}return s}function lc(t){return t!==void 0}function rD(t,n){return t==null||t===""||(typeof n=="string"?t=Ut(t)+n:typeof t=="object"&&(t=_s(Ut(t)))),t}function kb(t,n){return(t.flags&(n?8:16))!==0}function y(t,n=""){let e=U(),i=Te(),o=t+Fe,r=i.firstCreatePass?ko(i,o,1,n,null):i.data[o],a=aD(i,e,r,n);e[o]=a,Vs()&&Mm(i,e,a,r),yo(r,!1)}var aD=(t,n,e,i)=>(js(!0),nC(n[Ie],i));function sD(t,n,e,i=""){return Nn(t,ki(),e)?n+Pd(e)+i:Tt}function he(t){return Kt("",t),he}function Kt(t,n,e){let i=U(),o=sD(i,t,n,e);return o!==Tt&&cD(i,wn(),o),Kt}function cD(t,n,e){let i=Zd(n,t);iC(t[Ie],i,e)}function Ng(t,n,e){let i=Te();i.firstCreatePass&&Ab(n,i.data,i.blueprint,_n(t),e)}function Ab(t,n,e,i,o){if(t=tt(t),Array.isArray(t))for(let r=0;r<t.length;r++)Ab(t[r],n,e,i,o);else{let r=Te(),a=U(),s=Ye(),c=yi(t)?t:tt(t.provide),l=$d(t),d=s.providerIndexes&1048575,u=s.directiveStart,f=s.providerIndexes>>20;if(yi(t)||!t.multi){let p=new Oi(l,o,Ce,null),v=Nu(c,n,o?d:d+f,u);v===-1?(Au(Js(s,a),r,c),Mu(r,t,n.length),n.push(c),s.directiveStart++,s.directiveEnd++,o&&(s.providerIndexes+=1048576),e.push(p),a.push(p)):(e[v]=p,a[v]=p)}else{let p=Nu(c,n,d+f,u),v=Nu(c,n,d,d+f),x=p>=0&&e[p],E=v>=0&&e[v];if(o&&!E||!o&&!x){Au(Js(s,a),r,c);let $=uD(o?dD:lD,e.length,o,i,l,t);!o&&E&&(e[v].providerFactory=$),Mu(r,t,n.length,0),n.push(c),s.directiveStart++,s.directiveEnd++,o&&(s.providerIndexes+=1048576),e.push($),a.push($)}else{let $=Rb(e[o?v:p],l,!o&&i);Mu(r,t,p>-1?p:v,$)}!o&&i&&E&&e[v].componentProviders++}}}function Mu(t,n,e,i){let o=yi(n),r=mh(n);if(o||r){let c=(r?tt(n.useClass):n).prototype.ngOnDestroy;if(c){let l=t.destroyHooks||(t.destroyHooks=[]);if(!o&&n.multi){let d=l.indexOf(e);d===-1?l.push(e,[i,c]):l[d+1].push(i,c)}else l.push(e,c)}}}function Rb(t,n,e){return e&&t.componentProviders++,t.multi.push(n)-1}function Nu(t,n,e,i){for(let o=e;o<i;o++)if(n[o]===t)return o;return-1}function lD(t,n,e,i,o){return um(this.multi,[])}function dD(t,n,e,i,o){let r=this.multi,a;if(this.providerFactory){let s=this.providerFactory.componentProviders,c=Pr(i,i[T],this.providerFactory.index,o);a=c.slice(0,s),um(r,a);for(let l=s;l<c.length;l++)a.push(c[l])}else a=[],um(r,a);return a}function um(t,n){for(let e=0;e<t.length;e++){let i=t[e];n.push(i())}return n}function uD(t,n,e,i,o,r){let a=new Oi(t,e,Ce,null);return a.multi=[],a.index=n,a.componentProviders=0,Rb(a,o,i&&!e),a}function Se(t,n){return e=>{e.providersResolver=(i,o)=>Ng(i,o?o(t):t,!1),n&&(e.viewProvidersResolver=(i,o)=>Ng(i,o?o(n):n,!0))}}function mD(t,n){let e=t[n];return e===Tt?void 0:e}function pD(t,n,e,i,o,r){let a=n+e;return Nn(t,a,o)?ES(t,a+1,r?i.call(r,o):i(o)):mD(t,a+1)}function He(t,n){let e=Te(),i,o=t+Fe;e.firstCreatePass?(i=fD(n,e.pipeRegistry),e.data[o]=i,i.onDestroy&&(e.destroyHooks??=[]).push(o,i.onDestroy)):i=e.data[o];let r=i.factory||(i.factory=Vn(i.type,!0)),a,s=pt(Ce);try{let c=Qs(!1),l=r();return Qs(c),Qd(e,U(),o,l),l}finally{pt(s)}}function fD(t,n){if(n)for(let e=n.length-1;e>=0;e--){let i=n[e];if(t===i.name)return i}}function ze(t,n,e){let i=t+Fe,o=U(),r=Xd(o,i);return hD(o,i)?pD(o,Dh(),n,r.transform,e,r):r.transform(e)}function hD(t,n){return t[T].data[n].pure}function Km(t,n){return yc(t,n)}var Ob=(()=>{class t{applicationErrorHandler=m($n);appRef=m(qt);taskService=m(Ai);ngZone=m(N);zonelessEnabled=m(Ar);tracing=m($t,{optional:!0});zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new we;innerNgZone=this.zoneIsDefined?this.ngZone._inner??null:null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(m(yu,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{let e=this.taskService.add();if(!this.runningTick&&(this.cleanup(),!this.zonelessEnabled||this.appRef.includeAllTestViews)){this.taskService.remove(e);return}this.switchToMicrotaskScheduler(),this.taskService.remove(e)})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()}))}switchToMicrotaskScheduler(){this.ngZone.runOutsideAngular(()=>{let e=this.taskService.add();this.useMicrotaskScheduler=!0,queueMicrotask(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(e)})})}notify(e){if(!this.zonelessEnabled&&e===5)return;switch(e){case 0:case 2:{this.appRef.dirtyFlags|=2;break}case 3:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2;break}case 12:{this.appRef.dirtyFlags|=16;break}case 13:{this.appRef.dirtyFlags|=2;break}case 11:break;default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick())return;let i=this.useMicrotaskScheduler?Bh:gu;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>i(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>i(()=>this.tick()))}shouldScheduleTick(){return!(this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.innerNgZone!==null&&this.isInNgZone())}isInNgZone(){let e=Zone.current;for(;e;){if(e===this.innerNgZone)return!0;e=e.parent}return!1}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let e=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(i){this.applicationErrorHandler(i)}finally{this.taskService.remove(e),this.cleanup()}}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let e=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(e)}}static \u0275fac=function(i){return new(i||t)};static \u0275prov=O({token:t,factory:t.\u0275fac})}return t})();function Fb(){return[{provide:on,useExisting:Ob},{provide:N,useClass:yr},{provide:Ar,useValue:!0}]}var Ic=class{destroyed=!1;listeners=null;errorHandler=m(ct,{optional:!0});isEmitting=!1;hasNullListeners=!1;destroyRef=m(nt);constructor(){this.destroyRef.onDestroy(()=>{this.destroyed=!0,this.listeners=null})}subscribe(n){if(this.destroyed)throw new S(953,!1);return(this.listeners??=[]).push(n),{unsubscribe:()=>{let e=this.listeners?this.listeners.indexOf(n):-1;e>-1&&(this.isEmitting?(this.hasNullListeners=!0,this.listeners[e]=null):this.listeners.splice(e,1))}}}emit(n){if(this.destroyed){console.warn(gn(953,!1));return}if(this.listeners===null)return;this.isEmitting=!0;let e=I(null);try{for(let i of this.listeners)try{i!==null&&i(n)}catch(o){this.errorHandler?.handleError(o)}}finally{this.hasNullListeners&&(this.hasNullListeners=!1,this.listeners&&gD(this.listeners)),I(e),this.isEmitting=!1}}};function gD(t){let n=t.length-1;for(;n>-1;)t[n]===null&&t.splice(n,1),n--}function Je(t,n){return or(t,n?.equal)}function Ee(t){return xf(t)}function Bb(t,n){let e=Object.create(kg);e.value=t,e.transformFn=n?.transform;function i(){if(Fn(e),e.value===dc){let o=null;throw new S(-950,o)}return e.value}return i[qe]=e,i}var Kn=class{attributeName;constructor(n){this.attributeName=n}__NG_ELEMENT_ID__=()=>pm(this.attributeName);toString(){return`HostAttributeToken ${this.attributeName}`}},Hb=(()=>{let t=new b("");return t.__NG_ELEMENT_ID__=n=>{let e=Ye();if(e===null)throw new S(-204,!1);if(e.type&2)return e.value;if(n&8)return null;throw new S(-204,!1)},t})();function Fo(t){return new Ic}function Pb(t,n){return Bb(t,n)}function RD(t){return Bb(dc,t)}var re=(Pb.required=RD,Pb);function Lb(t,n){return Bm(n)}function OD(t,n){return Hm(n)}var Zr=(Lb.required=OD,Lb);function Vb(t,n){return Bm(n)}function FD(t,n){return Hm(n)}var zb=(Vb.required=FD,Vb);var PD=1e4;var tz=PD-1e3;var et=(()=>{class t{static __NG_ELEMENT_ID__=LD}return t})();function LD(t){return VD(Ye(),U(),(t&16)===16)}function VD(t,n,e){if(yn(t)&&!e){let i=Mt(t.index,n);return new Wn(i,i)}else if(t.type&175){let i=n[it];return new Wn(i,n)}return null}var Xm=new b(""),jD=new b("");function Kr(t){return!t.moduleRef}function BD(t){let n=Kr(t)?t.r3Injector:t.moduleRef.injector,e=n.get(N);return e.run(()=>{Kr(t)?t.r3Injector.resolveInjectorInitializers():t.moduleRef.resolveInjectorInitializers();let i=n.get($n),o;if(e.runOutsideAngular(()=>{o=e.onError.subscribe({next:i})}),Kr(t)){let r=()=>n.destroy(),a=t.platformInjector.get(Xm);a.add(r),n.onDestroy(()=>{o.unsubscribe(),a.delete(r)})}else{let r=()=>t.moduleRef.destroy(),a=t.platformInjector.get(Xm);a.add(r),t.moduleRef.onDestroy(()=>{Fr(t.allPlatformModules,t.moduleRef),o.unsubscribe(),a.delete(r)})}return zD(i,e,()=>{let r=n.get(Ai),a=r.add(),s=n.get($m);return s.runInitializers(),s.donePromise.then(()=>{if(!n.get(jD,!0))return Kr(t)?n.get(qt):(t.allPlatformModules.push(t.moduleRef),t.moduleRef);if(Kr(t)){let l=n.get(qt);return t.rootComponent!==void 0&&l.bootstrap(t.rootComponent),l}else return HD?.(t.moduleRef,t.allPlatformModules),t.moduleRef}).finally(()=>{r.remove(a)})})})}var HD;function zD(t,n,e){try{let i=e();return Bi(i)?i.catch(o=>{throw n.runOutsideAngular(()=>t(o)),o}):i}catch(i){throw n.runOutsideAngular(()=>t(i)),i}}var Mc=null;function UD(t=[],n){return te.create({name:n,providers:[{provide:Cr,useValue:"platform"},{provide:Xm,useValue:new Set([()=>Mc=null])},...t]})}function $D(t=[]){if(Mc)return Mc;let n=UD(t);return Mc=n,Cb(),GD(n),n}function GD(t){let n=t.get(Bs,null);fo(t,()=>{n?.forEach(e=>e())})}function Ub(t){let{rootComponent:n,appProviders:e,platformProviders:i,platformRef:o}=t;pe(ce.BootstrapApplicationStart);try{let r=o?.injector??$D(i),a=[Fb(),Gh,...e||[]],s=new Br({providers:a,parent:r,debugName:"",runEnvironmentInitializers:!1});return BD({r3Injector:s.injector,platformInjector:r,rootComponent:n})}catch(r){return Promise.reject(r)}finally{pe(ce.BootstrapApplicationEnd)}}function Y(t){return typeof t=="boolean"?t:t!=null&&t!=="false"}function zi(t,n=NaN){return!isNaN(parseFloat(t))&&!isNaN(Number(t))?Number(t):n}var Zm=Symbol("NOT_SET"),$b=new Set,WD=Q(C({},Qi),{kind:"afterRenderEffectPhase",consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,value:Zm,cleanup:null,consumerMarkedDirty(){if(this.sequence.impl.executing){if(this.sequence.lastPhase===null||this.sequence.lastPhase<this.phase)return;this.sequence.erroredOrDestroyed=!0}this.sequence.scheduler.notify(7)},phaseFn(t){if(this.sequence.lastPhase=this.phase,!this.dirty)return this.signal;if(this.dirty=!1,this.value!==Zm&&!Zi(this))return this.signal;try{for(let o of this.cleanup??$b)o()}finally{this.cleanup?.clear()}let n=[];t!==void 0&&n.push(t),n.push(this.registerCleanupFn);let e=Pn(this),i;try{i=this.userFn.apply(null,n)}finally{ci(this,e)}return(this.value===Zm||!this.equal(this.value,i))&&(this.value=i,this.version++),this.signal}}),Qm=class extends Lr{scheduler;lastPhase=null;nodes=[void 0,void 0,void 0,void 0];onDestroyFns=null;constructor(n,e,i,o,r,a=null,s){super(n,[void 0,void 0,void 0,void 0],i,!1,r.get(nt),a),this.scheduler=o;for(let c of Em){let l=e[c];if(l===void 0)continue;let d=Object.create(WD);d.sequence=this,d.phase=c,d.userFn=l,d.dirty=!0,d.signal=()=>(Fn(d),d.value),d.signal[qe]=d,d.registerCleanupFn=u=>(d.cleanup??=new Set).add(u),this.nodes[c]=d,this.hooks[c]=u=>d.phaseFn(u)}}afterRun(){super.afterRun(),this.lastPhase=null}destroy(){if(this.onDestroyFns!==null)for(let n of this.onDestroyFns)n();super.destroy();for(let n of this.nodes)if(n)try{for(let e of n.cleanup??$b)e()}finally{Ln(n)}}};function Jm(t,n){let e=n?.injector??m(te),i=e.get(on),o=e.get(hc),r=e.get($t,null,{optional:!0});o.impl??=e.get(Dm);let a=t;typeof a=="function"&&(a={mixedReadWrite:t});let s=e.get(_o,null,{optional:!0}),c=new Qm(o.impl,[a.earlyRead,a.write,a.mixedReadWrite,a.read],s?.view,i,e,r?.snapshot(null),void 0);return o.impl.register(c),c}function Tc(t,n){let e=jn(t),i=n.elementInjector||po(),r=new Mo(e).create(i,n.projectableNodes,n.hostElement,n.environmentInjector,n.directives,n.bindings);return n.onError&&(r.hostView._lView[vo]=n.onError),r}var Gb=null;function At(){return Gb}function ep(t){Gb??=t}var Xr=class{},Po=(()=>{class t{historyGo(e){throw new Error("")}static \u0275fac=function(i){return new(i||t)};static \u0275prov=W({token:t,factory:()=>m(Wb),providedIn:"platform"})}return t})();var Wb=(()=>{class t extends Po{_location;_history;_doc=m(A);constructor(){super(),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return At().getBaseHref(this._doc)}onPopState(e){let i=At().getGlobalEventTarget(this._doc,"window");return i.addEventListener("popstate",e,!1),()=>i.removeEventListener("popstate",e)}onHashChange(e){let i=At().getGlobalEventTarget(this._doc,"window");return i.addEventListener("hashchange",e,!1),()=>i.removeEventListener("hashchange",e)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(e){this._location.pathname=e}pushState(e,i,o){this._history.pushState(e,i,o)}replaceState(e,i,o){this._history.replaceState(e,i,o)}forward(){this._history.forward()}back(){this._history.back()}historyGo(e=0){this._history.go(e)}getState(){return this._history.state}static \u0275fac=function(i){return new(i||t)};static \u0275prov=W({token:t,factory:()=>new t,providedIn:"platform"})}return t})();function Kb(t,n){return t?n?t.endsWith("/")?n.startsWith("/")?t+n.slice(1):t+n:n.startsWith("/")?t+n:`${t}/${n}`:t:n}function qb(t){let n=t.search(/#|\?|$/);return t[n-1]==="/"?t.slice(0,n-1)+t.slice(n):t}function Zn(t){return t&&t[0]!=="?"?`?${t}`:t}var kc=(()=>{class t{historyGo(e){throw new Error("")}static \u0275fac=function(i){return new(i||t)};static \u0275prov=W({token:t,factory:()=>m(YD),providedIn:"root"})}return t})(),qD=new b(""),YD=(()=>{class t extends kc{_platformLocation;_baseHref;_removeListenerFns=[];constructor(e,i){super(),this._platformLocation=e,this._baseHref=i??this._platformLocation.getBaseHrefFromDOM()??m(A).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(e){this._removeListenerFns.push(this._platformLocation.onPopState(e),this._platformLocation.onHashChange(e))}getBaseHref(){return this._baseHref}prepareExternalUrl(e){return Kb(this._baseHref,e)}path(e=!1){let i=this._platformLocation.pathname+Zn(this._platformLocation.search),o=this._platformLocation.hash;return o&&e?`${i}${o}`:i}pushState(e,i,o,r){let a=this.prepareExternalUrl(o+Zn(r));this._platformLocation.pushState(e,i,a)}replaceState(e,i,o,r){let a=this.prepareExternalUrl(o+Zn(r));this._platformLocation.replaceState(e,i,a)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(e=0){this._platformLocation.historyGo?.(e)}static \u0275fac=function(i){return new(i||t)(R(Po),R(qD,8))};static \u0275prov=W({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Ac=(()=>{class t{_subject=new D;_basePath;_locationStrategy;_urlChangeListeners=[];_urlChangeSubscription=null;constructor(e){this._locationStrategy=e;let i=this._locationStrategy.getBaseHref();this._basePath=XD(qb(Yb(i))),this._locationStrategy.onPopState(o=>{let r={url:this.path(!0),pop:!0,state:o.state,type:o.type};o.hasUAVisualTransition&&(r.hasUAVisualTransition=!0),this._subject.next(r)})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(e=!1){return this.normalize(this._locationStrategy.path(e))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(e,i=""){return this.path()==this.normalize(e+Zn(i))}normalize(e){return t.stripTrailingSlash(ZD(this._basePath,Yb(e)))}prepareExternalUrl(e){return e&&e[0]!=="/"&&(e="/"+e),this._locationStrategy.prepareExternalUrl(e)}go(e,i="",o=null){this._locationStrategy.pushState(o,"",e,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+Zn(i)),o)}replaceState(e,i="",o=null){this._locationStrategy.replaceState(o,"",e,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+Zn(i)),o)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(e=0){this._locationStrategy.historyGo?.(e)}onUrlChange(e){return this._urlChangeListeners.push(e),this._urlChangeSubscription??=this.subscribe(i=>{this._notifyUrlChangeListeners(i.url,i.state)}),()=>{let i=this._urlChangeListeners.indexOf(e);this._urlChangeListeners.splice(i,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(e="",i){this._urlChangeListeners.forEach(o=>o(e,i))}subscribe(e,i,o){return this._subject.subscribe({next:e,error:i??void 0,complete:o??void 0})}static normalizeQueryParams=Zn;static joinWithSlash=Kb;static stripTrailingSlash=qb;static \u0275fac=function(i){return new(i||t)(R(kc))};static \u0275prov=W({token:t,factory:()=>KD(),providedIn:"root"})}return t})();function KD(){return new Ac(R(kc))}function ZD(t,n){if(!t||!n.startsWith(t))return n;let e=n.substring(t.length);return e===""||["/",";","?","#"].includes(e[0])?e:n}function Yb(t){return t.replace(/\/index\.html$/,"")}function XD(t){if(new RegExp("^(https?:)?//").test(t)){let[,e]=t.split(/\/\/[^\/]+/);return e}return t}var tp=(()=>{class t{_viewContainerRef;_viewRef=null;ngTemplateOutletContext=null;ngTemplateOutlet=null;ngTemplateOutletInjector=null;injector=m(te);constructor(e){this._viewContainerRef=e}ngOnChanges(e){if(this._shouldRecreateView(e)){let i=this._viewContainerRef;if(this._viewRef&&i.remove(i.indexOf(this._viewRef)),!this.ngTemplateOutlet){this._viewRef=null;return}let o=this._createContextForwardProxy();this._viewRef=i.createEmbeddedView(this.ngTemplateOutlet,o,{injector:this._getInjector()})}}_getInjector(){return this.ngTemplateOutletInjector==="outlet"?this.injector:this.ngTemplateOutletInjector??void 0}_shouldRecreateView(e){return!!e.ngTemplateOutlet||!!e.ngTemplateOutletInjector}_createContextForwardProxy(){return new Proxy({},{set:(e,i,o)=>this.ngTemplateOutletContext?Reflect.set(this.ngTemplateOutletContext,i,o):!1,get:(e,i,o)=>{if(this.ngTemplateOutletContext)return Reflect.get(this.ngTemplateOutletContext,i,o)}})}static \u0275fac=function(i){return new(i||t)(Ce(Wt))};static \u0275dir=F({type:t,selectors:[["","ngTemplateOutlet",""]],inputs:{ngTemplateOutletContext:"ngTemplateOutletContext",ngTemplateOutlet:"ngTemplateOutlet",ngTemplateOutletInjector:"ngTemplateOutletInjector"},features:[ft]})}return t})();var np=(()=>{class t{transform(e){return JSON.stringify(e,null,2)}static \u0275fac=function(i){return new(i||t)};static \u0275pipe=Um({name:"json",type:t,pure:!1})}return t})();var un=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=P({})}return t})();function Qr(t,n){n=encodeURIComponent(n);for(let e of t.split(";")){let i=e.indexOf("="),[o,r]=i==-1?[e,""]:[e.slice(0,i),e.slice(i+1)];if(o.trim()!==n)continue;let a=r;try{a=decodeURIComponent(r)}catch(s){}return a.length>1&&a[0]==='"'&&a[a.length-1]==='"'&&(a=a.slice(1,-1)),a}return null}var ip="browser";function Rc(t){return t===ip}var Jr=class{_doc;constructor(n){this._doc=n}manager},Oc=(()=>{class t extends Jr{constructor(e){super(e)}supports(e){return!0}addEventListener(e,i,o,r){return e.addEventListener(i,o,r),()=>this.removeEventListener(e,i,o,r)}removeEventListener(e,i,o,r){return e.removeEventListener(i,o,r)}static \u0275fac=function(i){return new(i||t)(R(A))};static \u0275prov=W({token:t,factory:t.\u0275fac})}return t})(),Lc=new b(""),sp=(()=>{class t{_zone;_plugins;_eventNameToPlugin=new Map;constructor(e,i){this._zone=i,e.forEach(a=>{a.manager=this});let o=e.filter(a=>!(a instanceof Oc));this._plugins=o.slice().reverse();let r=e.find(a=>a instanceof Oc);r&&this._plugins.push(r)}addEventListener(e,i,o,r){return this._findPluginFor(i).addEventListener(e,i,o,r)}getZone(){return this._zone}_findPluginFor(e){let i=this._eventNameToPlugin.get(e);if(i)return i;if(i=this._plugins.find(r=>r.supports(e)),!i)throw new S(-5101,!1);return this._eventNameToPlugin.set(e,i),i}static \u0275fac=function(i){return new(i||t)(R(Lc),R(N))};static \u0275prov=W({token:t,factory:t.\u0275fac})}return t})(),op="ng-app-id";function Zb(t){for(let n of t)n.remove()}function Xb(t,n){let e=n.createElement("style");return e.textContent=t,e}function nI(t,n,e,i){let o=t.head?.querySelectorAll(`style[${op}="${n}"],link[${op}="${n}"]`);if(!o||o.length===0)return!1;for(let r of o)r.removeAttribute(op),r instanceof HTMLLinkElement?i.set(r.href.slice(r.href.lastIndexOf("/")+1),{usage:0,elements:[r]}):r.textContent&&e.set(r.textContent,{usage:0,elements:[r]});return!0}function ap(t,n){let e=n.createElement("link");return e.setAttribute("rel","stylesheet"),e.setAttribute("href",t),e}var cp=(()=>{class t{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(e,i,o,r={}){this.doc=e,this.appId=i,this.nonce=o,nI(e,i,this.inline,this.external)&&this.hosts.add(e.head)}addStyles(e,i){for(let o of e)this.addUsage(o,this.inline,Xb);i?.forEach(o=>this.addUsage(o,this.external,ap))}removeStyles(e,i){for(let o of e)this.removeUsage(o,this.inline);i?.forEach(o=>this.removeUsage(o,this.external))}addUsage(e,i,o){let r=i.get(e);r?r.usage++:i.set(e,{usage:1,elements:[...this.hosts].map(a=>this.addElement(a,o(e,this.doc)))})}removeUsage(e,i){let o=i.get(e);o&&(o.usage--,o.usage<=0&&(Zb(o.elements),i.delete(e)))}ngOnDestroy(){for(let[,{elements:e}]of[...this.inline,...this.external])Zb(e);this.hosts.clear()}addHost(e){if(!this.hosts.has(e)){this.hosts.add(e);for(let[i,{elements:o}]of this.inline)o.push(this.addElement(e,Xb(i,this.doc)));for(let[i,{elements:o}]of this.external)o.push(this.addElement(e,ap(i,this.doc)))}}removeHost(e){this.hosts.delete(e);for(let i of[...this.inline.values(),...this.external.values()]){let o=[];for(let r of i.elements)r.parentNode===e?r.remove():o.push(r);i.elements=o}}addElement(e,i){return this.nonce&&i.setAttribute("nonce",this.nonce),e.appendChild(i)}static \u0275fac=function(i){return new(i||t)(R(A),R(xn),R(Gn,8),R(Cn))};static \u0275prov=W({token:t,factory:t.\u0275fac})}return t})(),rp={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},lp=/%COMP%/g;var Jb="%COMP%",iI=`_nghost-${Jb}`,oI=`_ngcontent-${Jb}`,rI=!0,aI=new b("",{factory:()=>rI}),sI=new b("");function cI(t){return oI.replace(lp,t)}function lI(t){return iI.replace(lp,t)}function ey(t,n){return n.map(e=>e.replace(lp,t))}var dp=(()=>{class t{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;cssVarNamespace;constructor(e,i,o,r,a,s,c=null,l=null,d=null){this.eventManager=e,this.sharedStylesHost=i,this.appId=o,this.removeStylesOnCompDestroy=r,this.doc=a,this.ngZone=s,this.nonce=c,this.tracingService=l,this.cssVarNamespace=d??"",this.defaultRenderer=new ea(e,a,s,this.tracingService,this.cssVarNamespace)}createRenderer(e,i){if(!e||!i)return this.defaultRenderer;let o=this.getOrCreateRenderer(e,i);return o instanceof Pc?o.applyToHost(e):o instanceof ta&&o.applyStyles(),o}getOrCreateRenderer(e,i){let o=this.rendererByCompId,r=o.get(i.id);if(!r){let a=this.doc,s=this.ngZone,c=this.eventManager,l=this.sharedStylesHost,d=this.removeStylesOnCompDestroy,u=this.tracingService;switch(i.encapsulation){case zt.Emulated:r=new Pc(c,l,i,this.appId,d,a,s,u,this.cssVarNamespace);break;case zt.ShadowDom:return new Fc(c,e,i,a,s,this.nonce,u,this.cssVarNamespace,l);case zt.ExperimentalIsolatedShadowDom:return new Fc(c,e,i,a,s,this.nonce,u,this.cssVarNamespace);default:r=new ta(c,l,i,d,a,s,u,this.cssVarNamespace);break}o.set(i.id,r)}return r}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(e){this.rendererByCompId.delete(e)}static \u0275fac=function(i){return new(i||t)(R(sp),R(ji),R(xn),R(aI),R(A),R(N),R(Gn),R($t,8),R(sI,8))};static \u0275prov=W({token:t,factory:t.\u0275fac})}return t})(),ea=class{eventManager;doc;ngZone;tracingService;cssVarNamespace;data=Object.create(null);throwOnSyntheticProps=!0;constructor(n,e,i,o,r=""){this.eventManager=n,this.doc=e,this.ngZone=i,this.tracingService=o,this.cssVarNamespace=r}destroy(){}destroyNode=null;createElement(n,e){return e?this.doc.createElementNS(rp[e]||e,n):this.doc.createElement(n)}createComment(n){return this.doc.createComment(n)}createText(n){return this.doc.createTextNode(n)}appendChild(n,e){(Qb(n)?n.content:n).appendChild(e)}insertBefore(n,e,i){if(n){let o=Qb(n)?n.content:n;if(i!=null&&i.parentNode!==o)throw new S(-5106,!1);o.insertBefore(e,i)}}removeChild(n,e){e.remove()}selectRootElement(n,e){let i=typeof n=="string"?this.doc.querySelector(n):n;if(!i)throw new S(-5104,!1);return e||(i.textContent=""),i}parentNode(n){return n.parentNode}nextSibling(n){return n.nextSibling}setAttribute(n,e,i,o){if(o){e=o+":"+e;let r=rp[o];r?n.setAttributeNS(r,e,i):n.setAttribute(e,i)}else n.setAttribute(e,i)}removeAttribute(n,e,i){if(i){let o=rp[i];o?n.removeAttributeNS(o,e):n.removeAttribute(`${i}:${e}`)}else n.removeAttribute(e)}addClass(n,e){n.classList.add(e)}removeClass(n,e){n.classList.remove(e)}setStyle(n,e,i,o){let r=e.startsWith("--");r&&(e=e.replace("%NS%",this.cssVarNamespace)),r||o&(cn.DashCase|cn.Important)?n.style.setProperty(e,i,o&cn.Important?"important":""):n.style[e]=i}removeStyle(n,e,i){let o=e.startsWith("--");o&&(e=e.replace("%NS%",this.cssVarNamespace)),o||i&cn.DashCase?n.style.removeProperty(e):n.style[e]=""}setProperty(n,e,i){n!=null&&(n[e]=i)}setValue(n,e){n.nodeValue=e}listen(n,e,i,o){if(typeof n=="string"&&(n=At().getGlobalEventTarget(this.doc,n),!n))throw new S(-5102,!1);let r=this.decoratePreventDefault(i);return this.tracingService?.wrapEventListener&&(r=this.tracingService.wrapEventListener(n,e,r)),this.eventManager.addEventListener(n,e,r,o)}decoratePreventDefault(n){return e=>{if(e==="__ngUnwrap__")return n;n(e)===!1&&e.preventDefault()}}};function Qb(t){return t.tagName==="TEMPLATE"&&t.content!==void 0}var Fc=class extends ea{hostEl;sharedStylesHost;shadowRoot;constructor(n,e,i,o,r,a,s,c,l){super(n,o,r,s,c),this.hostEl=e,this.sharedStylesHost=l,this.shadowRoot=e.attachShadow({mode:"open"}),this.sharedStylesHost&&this.sharedStylesHost.addHost(this.shadowRoot);let d=i.styles;d=ey(i.id,d).map(f=>f.replace(/%NS%/g,c));for(let f of d){let p=document.createElement("style");a&&p.setAttribute("nonce",a),p.textContent=f,this.shadowRoot.appendChild(p)}let u=i.getExternalStyles?.();if(u)for(let f of u){let p=ap(f,o);a&&p.setAttribute("nonce",a),this.shadowRoot.appendChild(p)}}nodeOrShadowRoot(n){return n===this.hostEl?this.shadowRoot:n}appendChild(n,e){return super.appendChild(this.nodeOrShadowRoot(n),e)}insertBefore(n,e,i){return super.insertBefore(this.nodeOrShadowRoot(n),e,i)}removeChild(n,e){return super.removeChild(null,e)}parentNode(n){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(n)))}destroy(){this.sharedStylesHost&&this.sharedStylesHost.removeHost(this.shadowRoot)}},ta=class extends ea{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(n,e,i,o,r,a,s,c,l){super(n,r,a,s,c),this.sharedStylesHost=e,this.removeStylesOnCompDestroy=o;let d=i.styles,u=l?ey(l,d):d;this.styles=u.map(f=>f.replace(/%NS%/g,c)),this.styleUrls=i.getExternalStyles?.(l)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){this.removeStylesOnCompDestroy&&Sm.size===0&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}},Pc=class extends ta{contentAttr;hostAttr;constructor(n,e,i,o,r,a,s,c,l){let d=o+"-"+i.id;super(n,e,i,r,a,s,c,l,d),this.contentAttr=cI(d),this.hostAttr=lI(d)}applyToHost(n){this.applyStyles(),this.setAttribute(n,this.hostAttr,"")}createElement(n,e){let i=super.createElement(n,e);return super.setAttribute(i,this.contentAttr,""),i}};var Vc=class t extends Xr{supportsDOMEvents=!0;static makeCurrent(){ep(new t)}onAndCancel(n,e,i,o){return n.addEventListener(e,i,o),()=>{n.removeEventListener(e,i,o)}}dispatchEvent(n,e){n.dispatchEvent(e)}remove(n){n.remove()}createElement(n,e){return e=e||this.getDefaultDocument(),e.createElement(n)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(n){return n.nodeType===Node.ELEMENT_NODE}isShadowRoot(n){return n instanceof DocumentFragment}getGlobalEventTarget(n,e){return e==="window"?window:e==="document"?n:e==="body"?n.body:null}getBaseHref(n){let e=dI();return e==null?null:uI(e)}resetBaseElement(){na=null}getUserAgent(){return window.navigator.userAgent}getCookie(n){return Qr(document.cookie,n)}},na=null;function dI(){return na=na||document.head.querySelector("base"),na?na.getAttribute("href"):null}function uI(t){return new URL(t,document.baseURI).pathname}var ty=["alt","control","meta","shift"],mI={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},pI={alt:t=>t.altKey,control:t=>t.ctrlKey,meta:t=>t.metaKey,shift:t=>t.shiftKey},ny=(()=>{class t extends Jr{constructor(e){super(e)}supports(e){return t.parseEventName(e)!=null}addEventListener(e,i,o,r){let a=t.parseEventName(i),s=t.eventCallback(a.fullKey,o,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>At().onAndCancel(e,a.domEventName,s,r))}static parseEventName(e){let i=e.toLowerCase().split("."),o=i.shift();if(i.length===0||!(o==="keydown"||o==="keyup"))return null;let r=t._normalizeKey(i.pop()),a="",s=i.indexOf("code");if(s>-1&&(i.splice(s,1),a="code."),ty.forEach(l=>{let d=i.indexOf(l);d>-1&&(i.splice(d,1),a+=l+".")}),a+=r,i.length!=0||r.length===0)return null;let c={};return c.domEventName=o,c.fullKey=a,c}static matchEventFullKeyCode(e,i){let o=mI[e.key]||e.key,r="";return i.indexOf("code.")>-1&&(o=e.code,r="code."),o==null||!o?!1:(o=o.toLowerCase(),o===" "?o="space":o==="."&&(o="dot"),ty.forEach(a=>{if(a!==o){let s=pI[a];s(e)&&(r+=a+".")}}),r+=o,r===i)}static eventCallback(e,i,o){return r=>{t.matchEventFullKeyCode(r,e)&&o.runGuarded(()=>i(r))}}static _normalizeKey(e){return e==="esc"?"escape":e}static \u0275fac=function(i){return new(i||t)(R(A))};static \u0275prov=W({token:t,factory:t.\u0275fac})}return t})();function up(t,n,e){return Pt(this,null,function*(){let i=C({rootComponent:t},fI(n,e));return Ub(i)})}function fI(t,n){return{platformRef:n?.platformRef,appProviders:[...yI,...t?.providers??[]],platformProviders:bI}}function hI(){Vc.makeCurrent()}function gI(){return new ct}function vI(){return hm(document),document}var bI=[{provide:Cn,useValue:ip},{provide:Bs,useValue:hI,multi:!0},{provide:A,useFactory:vI}];var yI=[{provide:Cr,useValue:"root"},{provide:ct,useFactory:gI},{provide:Lc,useClass:Oc,multi:!0},{provide:Lc,useClass:ny,multi:!0},dp,{provide:ji,useClass:cp},{provide:cp,useExisting:ji},sp,{provide:Ge,useExisting:dp},[]];var kn=class t{headers;normalizedNames=new Map;lazyInit;lazyUpdate=null;constructor(n){n?typeof n=="string"?this.lazyInit=()=>{this.headers=new Map,n.split(`
`).forEach(e=>{let i=e.indexOf(":");if(i>0){let o=e.slice(0,i),r=e.slice(i+1).trim();this.addHeaderEntry(o,r)}})}:typeof Headers<"u"&&n instanceof Headers?(this.headers=new Map,n.forEach((e,i)=>{this.addHeaderEntry(i,e)})):this.lazyInit=()=>{this.headers=new Map,Object.entries(n).forEach(([e,i])=>{this.setHeaderEntries(e,i)})}:this.headers=new Map}has(n){return this.init(),this.headers.has(n.toLowerCase())}get(n){this.init();let e=this.headers.get(n.toLowerCase());return e&&e.length>0?e[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(n){return this.init(),this.headers.get(n.toLowerCase())||null}append(n,e){return this.clone({name:n,value:e,op:"a"})}set(n,e){return this.clone({name:n,value:e,op:"s"})}delete(n,e){return this.clone({name:n,value:e,op:"d"})}maybeSetNormalizedName(n,e){this.normalizedNames.has(e)||this.normalizedNames.set(e,n)}init(){this.lazyInit&&(this.lazyInit instanceof t?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(n=>this.applyUpdate(n)),this.lazyUpdate=null))}copyFrom(n){n.init();for(let[e,i]of n.headers.entries())this.headers.set(e,i),this.normalizedNames.set(e,n.normalizedNames.get(e))}clone(n){let e=new t;return e.lazyInit=this.lazyInit&&this.lazyInit instanceof t?this.lazyInit:this,e.lazyUpdate=(this.lazyUpdate||[]).concat([n]),e}applyUpdate(n){let e=n.name.toLowerCase();switch(n.op){case"a":case"s":let i=n.value;if(typeof i=="string"&&(i=[i]),i.length===0)return;this.maybeSetNormalizedName(n.name,e);let o=n.op==="a"?(this.headers.get(e)||[]).slice():[];o.push(...i),this.headers.set(e,o);break;case"d":let r=n.value;if(r===void 0)this.headers.delete(e),this.normalizedNames.delete(e);else{let a=Array.isArray(r)?r:[r],s=this.headers.get(e);if(!s)return;s=s.filter(c=>a.indexOf(c)===-1),s.length===0?(this.headers.delete(e),this.normalizedNames.delete(e)):this.headers.set(e,s)}break}}addHeaderEntry(n,e){let i=n.toLowerCase();this.maybeSetNormalizedName(n,i),this.headers.has(i)?this.headers.get(i).push(e):this.headers.set(i,[e])}setHeaderEntries(n,e){let i=(Array.isArray(e)?e:[e]).map(r=>r.toString()),o=n.toLowerCase();this.headers.set(o,i),this.maybeSetNormalizedName(n,o)}forEach(n){this.init(),Array.from(this.normalizedNames.keys()).forEach(e=>n(this.normalizedNames.get(e),this.headers.get(e)))}};var pp=class{map=new Map;set(n,e){return this.map.set(n,e),this}get(n){return this.map.has(n)||this.map.set(n,n.defaultValue()),this.map.get(n)}delete(n){return this.map.delete(n),this}has(n){return this.map.has(n)}keys(){return this.map.keys()}},fp=class{encodeKey(n){return iy(n)}encodeValue(n){return iy(n)}decodeKey(n){return decodeURIComponent(n)}decodeValue(n){return decodeURIComponent(n)}};function _I(t,n){let e=new Map;return t.length>0&&t.replace(/^\?/,"").split("&").forEach(o=>{let r=o.indexOf("="),[a,s]=r==-1?[n.decodeKey(o),""]:[n.decodeKey(o.slice(0,r)),n.decodeValue(o.slice(r+1))],c=e.get(a)||[];c.push(s),e.set(a,c)}),e}var wI=/[&+#]/g;function iy(t){return encodeURI(t).replace(wI,encodeURIComponent)}function jc(t){return`${t}`}var Tn=class t{map;encoder;updates=null;cloneFrom=null;constructor(n={}){if(this.encoder=n.encoder||new fp,n.fromString){if(n.fromObject)throw new S(2805,!1);this.map=_I(n.fromString,this.encoder)}else n.fromObject?(this.map=new Map,Object.keys(n.fromObject).forEach(e=>{let i=n.fromObject[e],o=Array.isArray(i)?i.map(jc):[jc(i)];o.length>0&&this.map.set(e,o)})):this.map=null}has(n){return this.init(),this.map.has(n)}get(n){this.init();let e=this.map.get(n);return e?e[0]:null}getAll(n){return this.init(),this.map.get(n)||null}keys(){return this.init(),Array.from(this.map.keys())}append(n,e){return this.clone({param:n,value:e,op:"a"})}appendAll(n){let e=[];return Object.keys(n).forEach(i=>{let o=n[i];Array.isArray(o)?o.forEach(r=>{e.push({param:i,value:r,op:"a"})}):e.push({param:i,value:o,op:"a"})}),this.clone(e)}set(n,e){return this.clone({param:n,value:e,op:"s"})}delete(n,e){return this.clone({param:n,value:e,op:"d"})}toString(){return this.init(),this.keys().map(n=>{let e=this.encoder.encodeKey(n);return this.map.get(n).map(i=>e+"="+this.encoder.encodeValue(i)).join("&")}).filter(n=>n!=="").join("&")}clone(n){let e=new t({encoder:this.encoder});return e.cloneFrom=this.cloneFrom||this,e.updates=(this.updates||[]).concat(n),e}init(){if(this.map===null&&(this.map=new Map),this.cloneFrom!==null){this.cloneFrom.init();for(let[n,e]of this.cloneFrom.map.entries())this.map.set(n,e);this.updates.forEach(n=>{switch(n.op){case"a":case"s":let e=n.op==="a"?(this.map.get(n.param)||[]).slice():[];e.push(jc(n.value)),this.map.set(n.param,e);break;case"d":if(n.value!==void 0){let i=(this.map.get(n.param)||[]).slice(),o=i.indexOf(jc(n.value));o!==-1&&i.splice(o,1),i.length>0?this.map.set(n.param,i):this.map.delete(n.param)}else{this.map.delete(n.param);break}}}),this.cloneFrom=this.updates=null}}};function xI(t){switch(t){case"DELETE":case"GET":case"HEAD":case"OPTIONS":case"JSONP":return!1;default:return!0}}function oy(t){return typeof ArrayBuffer<"u"&&t instanceof ArrayBuffer}function ry(t){return typeof Blob<"u"&&t instanceof Blob}function ay(t){return typeof FormData<"u"&&t instanceof FormData}function CI(t){return typeof URLSearchParams<"u"&&t instanceof URLSearchParams}var mp="Content-Type",sy="Accept",dy="text/plain",uy="application/json",SI=`${uy}, ${dy}, */*`,Lo=class t{url;body=null;headers;context;reportProgress=!1;reportUploadProgress=!1;reportDownloadProgress=!1;withCredentials=!1;credentials;keepalive=!1;cache;priority;mode;redirect;referrer;integrity;referrerPolicy;responseType="json";method;params;urlWithParams;transferCache;timeout;constructor(n,e,i,o){this.url=e,this.method=n.toUpperCase();let r;if(xI(this.method)||o?(this.body=i!==void 0?i:null,r=o):r=i,r){if(this.reportProgress=!!r.reportProgress,this.reportUploadProgress=!!r.reportUploadProgress,this.reportDownloadProgress=!!r.reportDownloadProgress,this.withCredentials=!!r.withCredentials,this.keepalive=!!r.keepalive,r.responseType&&(this.responseType=r.responseType),r.headers&&(this.headers=r.headers),r.context&&(this.context=r.context),r.params&&(this.params=r.params),r.priority&&(this.priority=r.priority),r.cache&&(this.cache=r.cache),r.credentials&&(this.credentials=r.credentials),typeof r.timeout=="number"){if(r.timeout<1||!Number.isInteger(r.timeout))throw new S(2822,"");this.timeout=r.timeout}r.mode&&(this.mode=r.mode),r.redirect&&(this.redirect=r.redirect),r.integrity&&(this.integrity=r.integrity),r.referrer!==void 0&&(this.referrer=r.referrer),r.referrerPolicy&&(this.referrerPolicy=r.referrerPolicy),this.transferCache=r.transferCache}if(this.headers??=new kn,this.context??=new pp,!this.params)this.params=new Tn,this.urlWithParams=e;else{let a=this.params.toString();if(a.length===0)this.urlWithParams=e;else{let s=e,c="",l=e.indexOf("#");l!==-1&&(c=e.substring(l),s=e.substring(0,l));let d=s.indexOf("?"),u=d===-1?"?":d<s.length-1?"&":"";this.urlWithParams=s+u+a+c}}}serializeBody(){return this.body===null?null:typeof this.body=="string"||oy(this.body)||ry(this.body)||ay(this.body)||CI(this.body)?this.body:this.body instanceof Tn?this.body.toString():typeof this.body=="object"||typeof this.body=="boolean"||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return this.body===null||ay(this.body)?null:ry(this.body)?this.body.type||null:oy(this.body)?null:typeof this.body=="string"?dy:this.body instanceof Tn?"application/x-www-form-urlencoded;charset=UTF-8":typeof this.body=="object"||typeof this.body=="number"||typeof this.body=="boolean"?uy:null}clone(n={}){let e=n.method||this.method,i=n.url||this.url,o=n.responseType||this.responseType,r=n.keepalive??this.keepalive,a=n.priority||this.priority,s=n.cache||this.cache,c=n.mode||this.mode,l=n.redirect||this.redirect,d=n.credentials||this.credentials,u=n.referrer??this.referrer,f=n.integrity||this.integrity,p=n.referrerPolicy||this.referrerPolicy,v=n.transferCache??this.transferCache,x=n.timeout??this.timeout,E=n.body!==void 0?n.body:this.body,$=n.withCredentials??this.withCredentials,ie=n.reportProgress??this.reportProgress,bt=n.reportUploadProgress??this.reportUploadProgress,ni=n.reportDownloadProgress??this.reportDownloadProgress,Qt=n.headers||this.headers,ii=n.params||this.params,oi=n.context??this.context;return n.setHeaders!==void 0&&(Qt=Object.keys(n.setHeaders).reduce((On,Jt)=>On.set(Jt,n.setHeaders[Jt]),Qt)),n.setParams&&(ii=Object.keys(n.setParams).reduce((On,Jt)=>On.set(Jt,n.setParams[Jt]),ii)),new t(e,i,E,{params:ii,headers:Qt,context:oi,reportProgress:ie,reportUploadProgress:bt,reportDownloadProgress:ni,responseType:o,withCredentials:$,transferCache:v,keepalive:r,cache:s,priority:a,timeout:x,mode:c,redirect:l,credentials:d,referrer:u,integrity:f,referrerPolicy:p})}},$i=(function(t){return t[t.Sent=0]="Sent",t[t.UploadProgress=1]="UploadProgress",t[t.ResponseHeader=2]="ResponseHeader",t[t.DownloadProgress=3]="DownloadProgress",t[t.Response=4]="Response",t[t.User=5]="User",t})($i||{}),ia=class{headers;status;statusText;url;ok;type;redirected;responseType;constructor(n,e=200,i="OK"){this.headers=n.headers||new kn,this.status=n.status!==void 0?n.status:e,this.statusText=n.statusText||i,this.url=n.url||null,this.redirected=n.redirected,this.responseType=n.responseType,this.ok=this.status>=200&&this.status<300}},hp=class t extends ia{constructor(n={}){super(n)}type=$i.ResponseHeader;clone(n={}){return new t({headers:n.headers||this.headers,status:n.status!==void 0?n.status:this.status,statusText:n.statusText||this.statusText,url:n.url||this.url||void 0})}},oa=class t extends ia{body;constructor(n={}){super(n),this.body=n.body!==void 0?n.body:null}type=$i.Response;clone(n={}){return new t({body:n.body!==void 0?n.body:this.body,headers:n.headers||this.headers,status:n.status!==void 0?n.status:this.status,statusText:n.statusText||this.statusText,url:n.url||this.url||void 0,redirected:n.redirected??this.redirected,responseType:n.responseType??this.responseType})}},Ui=class extends ia{name="HttpErrorResponse";message;error;ok=!1;constructor(n){super(n,0,"Unknown Error"),this.status>=200&&this.status<300?this.message=`Http failure during parsing for ${n.url||"(unknown url)"}`:this.message=`Http failure response for ${n.url||"(unknown url)"}: ${n.status} ${n.statusText}`,this.error=n.error||null}},EI=200;var DI=/^\)\]\}',?\n/,_U=1024*1024,II=new b("",{factory:()=>null}),MI=(()=>{class t{fetchImpl=m(gp,{optional:!0})?.fetch??((...e)=>globalThis.fetch(...e));ngZone=m(N);destroyRef=m(nt);maxResponseSize=m(II);handle(e){return new K(i=>{let o=new AbortController,r=!1,a={next:c=>{c.type===$i.Response&&(r=!0),i.next(c)},error:c=>{r=!0,i.error(c)},complete:()=>{r=!0,i.complete()}};this.doRequest(e,o.signal,a).then(vp,c=>a.error(new Ui({error:c})));let s;return e.timeout&&(s=this.ngZone.runOutsideAngular(()=>setTimeout(()=>{o.signal.aborted||o.abort(new DOMException("signal timed out","TimeoutError"))},e.timeout))),()=>{s!==void 0&&clearTimeout(s),!r&&!o.signal.aborted&&o.abort()}})}doRequest(e,i,o){return Pt(this,null,function*(){let r=this.createRequestInit(e),a;try{let E=this.ngZone.runOutsideAngular(()=>this.fetchImpl(e.urlWithParams,C({signal:i},r)));NI(E),o.next({type:$i.Sent}),a=yield E}catch(E){o.error(new Ui({error:E,status:E.status??0,statusText:E.statusText,url:e.urlWithParams,headers:E.headers}));return}let s=new kn(a.headers),c=a.statusText,l=a.url||e.urlWithParams,d=a.status,u=null,f=e.reportProgress||e.reportDownloadProgress;if(f&&o.next(new hp({headers:s,status:d,statusText:c,url:l})),a.body){let E=a.headers.get(mp)??"",$=a.headers.get("content-length"),ie=$!==null?Number($):NaN;this.maxResponseSize!==null&&Number.isFinite(ie)&&ie>this.maxResponseSize&&(yield a.body.cancel(),cy(this.maxResponseSize));let bt=[],ni=a.body.getReader(),Qt=0,ii,oi,On=typeof Zone<"u"&&Zone.current,Jt=!1;if(yield this.ngZone.runOutsideAngular(()=>Pt(this,null,function*(){for(;;){if(this.destroyRef.destroyed){yield ni.cancel(),Jt=!0;break}let{done:le,value:w}=yield ni.read();if(le)break;if(bt.push(w),Qt+=w.length,this.maxResponseSize!==null&&Qt>this.maxResponseSize&&(yield ni.cancel(),cy(this.maxResponseSize)),f){oi=e.responseType==="text"?(oi??"")+(ii??=ly(E)).decode(w,{stream:!0}):void 0;let me=()=>o.next({type:$i.DownloadProgress,total:Number.isFinite(ie)?ie:void 0,loaded:Qt,partialText:oi});On?On.run(me):me()}}})),Jt){o.complete();return}let G=this.concatChunks(bt,Qt);try{u=this.parseBody(e,G,E,d)}catch(le){o.error(new Ui({error:le,headers:new kn(a.headers),status:a.status,statusText:a.statusText,url:a.url||e.urlWithParams}));return}}d===0&&(d=u?EI:0);let p=d>=200&&d<300,v=a.redirected,x=a.type;p?(o.next(new oa({body:u,headers:s,status:d,statusText:c,url:l,redirected:v,responseType:x})),o.complete()):o.error(new Ui({error:u,headers:s,status:d,statusText:c,url:l,redirected:v,responseType:x}))})}parseBody(e,i,o,r){switch(e.responseType){case"json":let a=new TextDecoder().decode(i).replace(DI,"");if(a==="")return null;try{return JSON.parse(a)}catch(s){if(r<200||r>=300)return a;throw s}case"text":return ly(o).decode(i);case"blob":return new Blob([i],{type:o});case"arraybuffer":return i.buffer}}createRequestInit(e){if(e.reportUploadProgress)throw new S(2824,!1);let i={},o;if(o=e.credentials,e.withCredentials&&(o="include"),e.headers.forEach((r,a)=>i[r]=a.join(",")),e.headers.has(sy)||(i[sy]=SI),!e.headers.has(mp)){let r=e.detectContentTypeHeader();r!==null&&(i[mp]=r)}return{body:e.serializeBody(),method:e.method,headers:i,credentials:o,keepalive:e.keepalive,cache:e.cache,priority:e.priority,mode:e.mode,redirect:e.redirect,referrer:e.referrer,integrity:e.integrity,referrerPolicy:e.referrerPolicy}}concatChunks(e,i){let o=new Uint8Array(i),r=0;for(let a of e)o.set(a,r),r+=a.length;return o}static \u0275fac=function(i){return new(i||t)};static \u0275prov=O({token:t,factory:t.\u0275fac})}return t})(),gp=class{};function vp(){}function NI(t){t.then(vp,vp)}function cy(t){throw new S(-2825,!1)}var TI=/charset=\s*["']?([^;"'\s]+)["']?/i;function ly(t){let n=t.match(TI);if(n!==null)try{return new TextDecoder(n[1])}catch(e){}return new TextDecoder}var kI=new b("",{factory:()=>!0}),AI="XSRF-TOKEN",RI=new b("",{factory:()=>AI}),OI="X-XSRF-TOKEN",FI=new b("",{factory:()=>OI}),PI=(()=>{class t{cookieName=m(RI);doc=m(A);lastCookieString="";lastToken=null;parseCount=0;getToken(){let e=this.doc.cookie||"";return e!==this.lastCookieString&&(this.parseCount++,this.lastToken=Qr(e,this.cookieName),this.lastCookieString=e),this.lastToken}static \u0275fac=function(i){return new(i||t)};static \u0275prov=O({token:t,factory:t.\u0275fac})}return t})(),LI=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=W({token:t,factory:function(i){let o=null;return i?o=new(i||t):o=R(PI),o},providedIn:"root"})}return t})();function VI(t,n){if(!m(kI)||t.method==="GET"||t.method==="HEAD"||t.method==="QUERY")return n(t);try{let o=m(Po).href,{origin:r}=new URL(o),{origin:a}=new URL(t.url,r);if(r!==a)return n(t)}catch(o){return n(t)}let e=m(LI).getToken(),i=m(FI);return e!=null&&!t.headers.has(i)&&(t=t.clone({headers:t.headers.set(i,e)})),n(t)}function jI(t,n){return n(t)}function BI(t,n,e){return(i,o)=>fo(e,()=>n(i,r=>t(r,o)))}var HI=new b("",{factory:()=>[VI]}),my=new b(""),zI=new b("",{factory:()=>!0});var UI=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=W({token:t,factory:function(i){let o=null;return i?o=new(i||t):o=R(MI),o},providedIn:"root"})}return t})();var $I=(()=>{class t{backend;injector;chain=null;pendingTasks=m(Rr);contributeToStability=m(zI);constructor(e,i){this.backend=e,this.injector=i}handle(e){if(this.chain===null){let o=this.injector.get(py,null,{skipSelf:!0}),r=o!==null&&this.backend===o,a=this.injector.get(my,[],r?{self:!0}:void 0),s=Array.from(new Set([...this.injector.get(HI),...a]));this.chain=s.reduceRight((c,l)=>BI(c,l,this.injector),jI)}let i=this.chain;if(this.contributeToStability){let o=this.pendingTasks.add();try{return Ee(()=>i(e,r=>this.backend.handle(r))).pipe(mr(o))}catch(r){throw o(),r}}else return Ee(()=>i(e,o=>this.backend.handle(o)))}static \u0275fac=function(i){return new(i||t)(R(UI),R($e))};static \u0275prov=W({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),py=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=W({token:t,factory:function(i){let o=null;return i?o=new(i||t):o=R($I),o},providedIn:"root"})}return t})();function Bc(t,n){return C({body:n},t)}var bp=(()=>{class t{handler;constructor(e){this.handler=e}request(e,i,o={}){let r;if(e instanceof Lo)r=e;else{let c;o.headers instanceof kn?c=o.headers:c=new kn(o.headers);let l;o.params&&(o.params instanceof Tn?l=o.params:l=new Tn({fromObject:o.params})),r=new Lo(e,i,o.body!==void 0?o.body:null,{headers:c,context:o.context,params:l,reportProgress:o.reportProgress,reportUploadProgress:o.reportUploadProgress,reportDownloadProgress:o.reportDownloadProgress,responseType:o.responseType||"json",withCredentials:o.withCredentials,transferCache:o.transferCache,keepalive:o.keepalive,priority:o.priority,cache:o.cache,mode:o.mode,redirect:o.redirect,credentials:o.credentials,referrer:o.referrer,referrerPolicy:o.referrerPolicy,integrity:o.integrity,timeout:o.timeout})}let a=yt(r).pipe(gd(c=>this.handler.handle(c)));if(e instanceof Lo||o.observe==="events")return a;let s=a.pipe(mt(c=>c instanceof oa));switch(o.observe||"body"){case"body":switch(r.responseType){case"arraybuffer":return s.pipe(ge(c=>{if(c.body!==null&&!(c.body instanceof ArrayBuffer))throw new S(2806,!1);return c.body}));case"blob":return s.pipe(ge(c=>{if(c.body!==null&&!(c.body instanceof Blob))throw new S(2807,!1);return c.body}));case"text":return s.pipe(ge(c=>{if(c.body!==null&&typeof c.body!="string")throw new S(2808,!1);return c.body}));default:return s.pipe(ge(c=>c.body))}case"response":return s;default:throw new S(2809,!1)}}delete(e,i={}){return this.request("DELETE",e,i)}get(e,i={}){return this.request("GET",e,i)}head(e,i={}){return this.request("HEAD",e,i)}jsonp(e,i){return this.request("JSONP",e,{params:new Tn().append(i,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(e,i={}){return this.request("OPTIONS",e,i)}patch(e,i,o={}){return this.request("PATCH",e,Bc(o,i))}post(e,i,o={}){return this.request("POST",e,Bc(o,i))}query(e,i,o={}){return this.request("QUERY",e,Bc(o,i))}put(e,i,o={}){return this.request("PUT",e,Bc(o,i))}static \u0275fac=function(i){return new(i||t)(R(py))};static \u0275prov=W({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var yp=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=W({token:t,factory:function(i){let o=null;return i?o=new(i||t):o=R(WI),o},providedIn:"root"})}return t})(),WI=(()=>{class t extends yp{_doc=m(A);sanitize(e,i){if(i==null)return null;switch(e){case lt.NONE:return i;case lt.HTML:return Vi(i,"HTML")?Ut(i):wm(this._doc,String(i)).toString();case lt.STYLE:return Vi(i,"Style")?Ut(i):i;case lt.SCRIPT:if(Vi(i,"Script"))return Ut(i);throw new S(5200,!1);case lt.URL:return Vi(i,"URL")?Ut(i):pc(String(i));case lt.RESOURCE_URL:if(Vi(i,"ResourceURL"))return Ut(i);throw new S(-5201,!1);default:throw new S(5202,!1)}}bypassSecurityTrustHtml(e){return gm(e)}bypassSecurityTrustStyle(e){return vm(e)}bypassSecurityTrustScript(e){return bm(e)}bypassSecurityTrustUrl(e){return ym(e)}bypassSecurityTrustResourceUrl(e){return _m(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=O({token:t,factory:t.\u0275fac})}return t})();var Hc=new WeakMap,Ke=(()=>{class t{_appRef;_injector=m(te);_environmentInjector=m($e);load(e){let i=this._appRef=this._appRef||this._injector.get(qt),o=Hc.get(i);o||(o={loaders:new Set,refs:[]},Hc.set(i,o),i.onDestroy(()=>{Hc.get(i)?.refs.forEach(r=>r.destroy()),Hc.delete(i)})),o.loaders.has(e)||(o.loaders.add(e),o.refs.push(Tc(e,{environmentInjector:this._environmentInjector})))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=O({token:t,factory:t.\u0275fac})}return t})();var Uc=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=L({type:t,selectors:[["ng-component"]],exportAs:["cdkVisuallyHidden"],decls:0,vars:0,template:function(i,o){},styles:[`.cdk-visually-hidden {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
  outline: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  left: 0;
}
[dir=rtl] .cdk-visually-hidden {
  left: auto;
  right: 0;
}
`],encapsulation:2})}return t})(),zc;function YI(){if(zc===void 0&&(zc=null,typeof window<"u")){let t=window;if(t.trustedTypes!==void 0)try{zc=t.trustedTypes.createPolicy("angular#components",{createHTML:n=>n})}catch(n){console.error(n)}}return zc}function Vo(t){return YI()?.createHTML(t)||t}function fy(t){return Error(`Unable to find icon with the name "${t}"`)}function KI(){return Error("Could not find HttpClient for use with Angular Material icons. Please add provideHttpClient() to your providers.")}function hy(t){return Error(`The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${t}".`)}function gy(t){return Error(`The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${t}".`)}var An=class{url;svgText;options;svgElement=null;constructor(n,e,i){this.url=n,this.svgText=e,this.options=i}},by=(()=>{class t{_httpClient;_sanitizer;_errorHandler;_document;_svgIconConfigs=new Map;_iconSetConfigs=new Map;_cachedIconsByUrl=new Map;_inProgressUrlFetches=new Map;_fontCssClassesByAlias=new Map;_resolvers=[];_defaultFontSetClass;constructor(e,i,o,r){this._httpClient=e,this._sanitizer=i,this._errorHandler=r,this._document=o}addSvgIcon(e,i,o){return this.addSvgIconInNamespace("",e,i,o)}addSvgIconLiteral(e,i,o){return this.addSvgIconLiteralInNamespace("",e,i,o)}addSvgIconInNamespace(e,i,o,r){return this._addSvgIconConfig(e,i,new An(o,null,r))}addSvgIconResolver(e){return this._resolvers.push(e),this}addSvgIconLiteralInNamespace(e,i,o,r){let a=this._sanitizer.sanitize(lt.HTML,o);if(!a)throw gy(o);let s=Vo(a);return this._addSvgIconConfig(e,i,new An("",s,r))}addSvgIconSet(e,i){return this.addSvgIconSetInNamespace("",e,i)}addSvgIconSetLiteral(e,i){return this.addSvgIconSetLiteralInNamespace("",e,i)}addSvgIconSetInNamespace(e,i,o){return this._addSvgIconSetConfig(e,new An(i,null,o))}addSvgIconSetLiteralInNamespace(e,i,o){let r=this._sanitizer.sanitize(lt.HTML,i);if(!r)throw gy(i);let a=Vo(r);return this._addSvgIconSetConfig(e,new An("",a,o))}registerFontClassAlias(e,i=e){return this._fontCssClassesByAlias.set(e,i),this}classNameForFontAlias(e){return this._fontCssClassesByAlias.get(e)||e}setDefaultFontSetClass(...e){return this._defaultFontSetClass=e,this}getDefaultFontSetClass(){return this._defaultFontSetClass??=XI(this._document),this._defaultFontSetClass}getSvgIconFromUrl(e){let i=this._sanitizer.sanitize(lt.RESOURCE_URL,e);if(!i)throw hy(e);let o=this._cachedIconsByUrl.get(i);return o?yt($c(o)):this._loadSvgIconFromConfig(new An(e,null)).pipe(gi(r=>this._cachedIconsByUrl.set(i,r)),ge(r=>$c(r)))}getNamedSvgIcon(e,i=""){let o=vy(i,e),r=this._svgIconConfigs.get(o);if(r)return this._getSvgFromConfig(r);if(r=this._getIconConfigFromResolvers(i,e),r)return this._svgIconConfigs.set(o,r),this._getSvgFromConfig(r);let a=this._iconSetConfigs.get(i);return a?this._getSvgFromIconSetConfigs(e,a):fd(fy(o))}ngOnDestroy(){this._resolvers=[],this._svgIconConfigs.clear(),this._iconSetConfigs.clear(),this._cachedIconsByUrl.clear()}_getSvgFromConfig(e){return e.svgText?yt($c(this._svgElementFromConfig(e))):this._loadSvgIconFromConfig(e).pipe(ge(i=>$c(i)))}_getSvgFromIconSetConfigs(e,i){let o=this._extractIconWithNameFromAnySet(e,i);if(o)return yt(o);let r=i.filter(a=>!a.svgText).map(a=>this._loadSvgIconSetFromConfig(a).pipe(ds(s=>{let l=`Loading icon set URL: ${this._sanitizer.sanitize(lt.RESOURCE_URL,a.url)} failed: ${s.message}`;return this._errorHandler.handleError(new Error(l)),yt(null)})));return lr(r).pipe(ge(()=>{let a=this._extractIconWithNameFromAnySet(e,i);if(!a)throw fy(e);return a}))}_extractIconWithNameFromAnySet(e,i){for(let o=i.length-1;o>=0;o--){let r=i[o];if(r.svgText&&r.svgText.toString().indexOf(e)>-1){let a=this._svgElementFromConfig(r),s=this._extractSvgIconFromSet(a,e,r.options);if(s)return s}}return null}_loadSvgIconFromConfig(e){return this._fetchIcon(e).pipe(gi(i=>e.svgText=i),ge(()=>this._svgElementFromConfig(e)))}_loadSvgIconSetFromConfig(e){return e.svgText?yt(null):this._fetchIcon(e).pipe(gi(i=>e.svgText=i))}_extractSvgIconFromSet(e,i,o){let r=e.querySelector(`[id="${i}"]`);if(!r)return null;let a=r.cloneNode(!0);if(a.removeAttribute("id"),a.nodeName.toLowerCase()==="svg")return this._setSvgAttributes(a,o);if(a.nodeName.toLowerCase()==="symbol")return this._setSvgAttributes(this._toSvgElement(a),o);let s=this._svgElementFromString(Vo("<svg></svg>"));return s.appendChild(a),this._setSvgAttributes(s,o)}_svgElementFromString(e){let i=this._document.createElement("DIV");i.innerHTML=e;let o=i.querySelector("svg");if(!o)throw Error("<svg> tag not found");return o}_toSvgElement(e){let i=this._svgElementFromString(Vo("<svg></svg>")),o=e.attributes;for(let r=0;r<o.length;r++){let{name:a,value:s}=o[r],c=a.toLowerCase();c!=="id"&&!c.startsWith("on")&&i.setAttribute(a,s)}for(let r=0;r<e.childNodes.length;r++)e.childNodes[r].nodeType===this._document.ELEMENT_NODE&&i.appendChild(e.childNodes[r].cloneNode(!0));return i}_setSvgAttributes(e,i){return e.setAttribute("fit",""),e.setAttribute("height","100%"),e.setAttribute("width","100%"),e.setAttribute("preserveAspectRatio","xMidYMid meet"),e.setAttribute("focusable","false"),i&&i.viewBox&&e.setAttribute("viewBox",i.viewBox),e}_fetchIcon(e){let{url:i,options:o}=e,r=o?.withCredentials??!1;if(!this._httpClient)throw KI();if(i==null)throw Error(`Cannot fetch icon from URL "${i}".`);let a=this._sanitizer.sanitize(lt.RESOURCE_URL,i);if(!a)throw hy(i);let s=this._inProgressUrlFetches.get(a);if(s)return s;let c=this._httpClient.get(a,{responseType:"text",withCredentials:r}).pipe(ge(l=>Vo(l)),mr(()=>this._inProgressUrlFetches.delete(a)),pr());return this._inProgressUrlFetches.set(a,c),c}_addSvgIconConfig(e,i,o){return this._svgIconConfigs.set(vy(e,i),o),this}_addSvgIconSetConfig(e,i){let o=this._iconSetConfigs.get(e);return o?o.push(i):this._iconSetConfigs.set(e,[i]),this}_svgElementFromConfig(e){if(!e.svgElement){let i=this._svgElementFromString(e.svgText);this._setSvgAttributes(i,e.options),e.svgElement=i}return e.svgElement}_getIconConfigFromResolvers(e,i){for(let o=0;o<this._resolvers.length;o++){let r=this._resolvers[o](i,e);if(r)return ZI(r)?new An(r.url,null,r.options):new An(r,null)}}static \u0275fac=function(i){return new(i||t)(R(bp,8),R(yp),R(A,8),R(ct))};static \u0275prov=W({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function $c(t){return t.cloneNode(!0)}function vy(t,n){return t+":"+n}function ZI(t){return!!(t.url&&t.options)}function XI(t){let n=null,e=!1;return t.fonts&&typeof t.fonts.forEach=="function"&&t.fonts.forEach(i=>{let o=i.family.replace(/['"]/g,"").trim().toLowerCase();(o==="material icons"||o.startsWith("material icons "))&&(e=!0),o.startsWith("material symbols rounded")?n="rounded":o.startsWith("material symbols sharp")?n="sharp":o.startsWith("material symbols")&&(n="outlined")}),[n&&!e?`material-symbols-${n}`:"material-icons","mat-ligature-font"]}var QI=new b("cdk-dir-doc",{providedIn:"root",factory:()=>m(A)}),JI=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;function yy(t){let n=t?.toLowerCase()||"";return n==="auto"&&typeof navigator<"u"&&navigator?.language?JI.test(navigator.language)?"rtl":"ltr":n==="rtl"?"rtl":"ltr"}var Zt=(()=>{class t{get value(){return this.valueSignal()}valueSignal=ne("ltr");change=new de;constructor(){let e=m(QI,{optional:!0});if(e){let i=e.body?e.body.dir:null,o=e.documentElement?e.documentElement.dir:null;this.valueSignal.set(yy(i||o||"ltr"))}}ngOnDestroy(){this.change.complete()}static \u0275fac=function(i){return new(i||t)};static \u0275prov=O({token:t,factory:t.\u0275fac})}return t})();var _e=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=P({})}return t})();var _p=new b("MAT_ICON_DEFAULT_OPTIONS"),eM=new b("mat-icon-location",{providedIn:"root",factory:()=>{let t=m(A),n=t?t.location:null;return{getPathname:()=>n?n.pathname+n.search:""}}}),_y=["clip-path","color-profile","src","cursor","fill","filter","marker","marker-start","marker-mid","marker-end","mask","stroke"],tM=_y.map(t=>`[${t}]`).join(", "),nM=/^url\(['"]?#(.*?)['"]?\)$/,jo=(()=>{class t{_elementRef=m(j);_iconRegistry=m(by);_location=m(eM);_errorHandler=m(ct);_defaultColor;get color(){return this._color||this._defaultColor}set color(e){this._color=e}_color;inline=!1;get svgIcon(){return this._svgIcon}set svgIcon(e){e!==this._svgIcon&&(e?this._updateSvgIcon(e):this._svgIcon&&this._clearSvgElement(),this._svgIcon=e)}_svgIcon;get fontSet(){return this._fontSet}set fontSet(e){let i=this._cleanupFontValue(e);i!==this._fontSet&&(this._fontSet=i,this._updateFontIconClasses())}_fontSet;get fontIcon(){return this._fontIcon}set fontIcon(e){let i=this._cleanupFontValue(e);i!==this._fontIcon&&(this._fontIcon=i,this._updateFontIconClasses())}_fontIcon;_previousFontSetClass=[];_previousFontIconClass;_svgName=null;_svgNamespace=null;_previousPath;_elementsWithExternalReferences;_currentIconFetch=we.EMPTY;constructor(){let e=m(new Kn("aria-hidden"),{optional:!0}),i=m(_p,{optional:!0});i&&(i.color&&(this.color=this._defaultColor=i.color),i.fontSet&&(this.fontSet=i.fontSet)),e||this._elementRef.nativeElement.setAttribute("aria-hidden","true")}_splitIconName(e){if(!e)return["",""];let i=e.split(":");switch(i.length){case 1:return["",i[0]];case 2:return i;default:throw Error(`Invalid icon name: "${e}"`)}}ngOnInit(){this._updateFontIconClasses()}ngAfterViewChecked(){let e=this._elementsWithExternalReferences;if(e&&e.size){let i=this._location.getPathname();i!==this._previousPath&&(this._previousPath=i,this._prependPathToReferences(i))}}ngOnDestroy(){this._currentIconFetch.unsubscribe(),this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear()}_usingFontIcon(){return!this.svgIcon}_setSvgElement(e){this._clearSvgElement();let i=this._location.getPathname();this._previousPath=i,this._cacheChildrenWithExternalReferences(e),this._prependPathToReferences(i),this._elementRef.nativeElement.appendChild(e)}_clearSvgElement(){let e=this._elementRef.nativeElement,i=e.childNodes.length;for(this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear();i--;){let o=e.childNodes[i];(o.nodeType!==1||o.nodeName.toLowerCase()==="svg")&&o.remove()}}_updateFontIconClasses(){if(!this._usingFontIcon())return;let e=this._elementRef.nativeElement,i=(this.fontSet?this._iconRegistry.classNameForFontAlias(this.fontSet).split(/ +/):this._iconRegistry.getDefaultFontSetClass()).filter(o=>o.length>0);this._previousFontSetClass.forEach(o=>e.classList.remove(o)),i.forEach(o=>e.classList.add(o)),this._previousFontSetClass=i,this.fontIcon!==this._previousFontIconClass&&!i.includes("mat-ligature-font")&&(this._previousFontIconClass&&e.classList.remove(this._previousFontIconClass),this.fontIcon&&e.classList.add(this.fontIcon),this._previousFontIconClass=this.fontIcon)}_cleanupFontValue(e){return typeof e=="string"?e.trim().split(" ")[0]:e}_prependPathToReferences(e){let i=this._elementsWithExternalReferences,o=e.startsWith("//")?`/.${e}`:e;i&&i.forEach((r,a)=>{r.forEach(s=>{a.setAttribute(s.name,`url('${o}#${s.value}')`)})})}_cacheChildrenWithExternalReferences(e){let i=e.querySelectorAll(tM),o=this._elementsWithExternalReferences=this._elementsWithExternalReferences||new Map;for(let r=0;r<i.length;r++)_y.forEach(a=>{let s=i[r],c=s.getAttribute(a),l=c?c.match(nM):null;if(l){let d=o.get(s);d||(d=[],o.set(s,d)),d.push({name:a,value:l[1]})}})}_updateSvgIcon(e){if(this._svgNamespace=null,this._svgName=null,this._currentIconFetch.unsubscribe(),e){let[i,o]=this._splitIconName(e);i&&(this._svgNamespace=i),o&&(this._svgName=o),this._currentIconFetch=this._iconRegistry.getNamedSvgIcon(o,i).pipe(ur(1)).subscribe(r=>this._setSvgElement(r),r=>{let a=`Error retrieving icon ${i}:${o}! ${r.message}`;this._errorHandler.handleError(new Error(a))})}}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=(function(){return L({type:t,selectors:[["mat-icon"]],hostAttrs:["role","img",1,"mat-icon","notranslate"],hostVars:10,hostBindings:function(o,r){o&2&&(ve("data-mat-icon-type",r._usingFontIcon()?"font":"svg")("data-mat-icon-name",r._svgName||r.fontIcon)("data-mat-icon-namespace",r._svgNamespace||r.fontSet)("fontIcon",r._usingFontIcon()?r.fontIcon:null),xt(r.color?"mat-"+r.color:""),k("mat-icon-inline",r.inline)("mat-icon-no-color",r.color!=="primary"&&r.color!=="accent"&&r.color!=="warn"))},inputs:{color:"color",inline:[2,"inline","inline",Y],svgIcon:"svgIcon",fontSet:"fontSet",fontIcon:"fontIcon"},exportAs:["matIcon"],ngContentSelectors:["*"],decls:1,vars:0,template:function(o,r){o&1&&(Me(),q(0))},styles:[`mat-icon, mat-icon.mat-primary, mat-icon.mat-accent, mat-icon.mat-warn {
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
`],encapsulation:2})})()}return t})(),Bo=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=P({imports:[_e]})}return t})();var xp={providers:[{provide:_p,useValue:{fontSet:"material-symbols-outlined"}}]};var Iy=(()=>{class t{_renderer;_elementRef;onChange=e=>{};onTouched=()=>{};constructor(e,i){this._renderer=e,this._elementRef=i}setProperty(e,i){this._renderer.setProperty(this._elementRef.nativeElement,e,i)}registerOnTouched(e){this.onTouched=e}registerOnChange(e){this.onChange=e}setDisabledState(e){this.setProperty("disabled",e)}static \u0275fac=function(i){return new(i||t)(Ce(Ve),Ce(j))};static \u0275dir=F({type:t})}return t})(),iM=(()=>{class t extends Iy{static \u0275fac=(()=>{let e;return function(o){return(e||(e=ln(t)))(o||t)}})();static \u0275dir=F({type:t,features:[We]})}return t})(),Rt=new b("");var oM={provide:Rt,useExisting:Oe(()=>My),multi:!0};function rM(){let t=At()?At().getUserAgent():"";return/android (\d+)/.test(t.toLowerCase())}var aM=new b(""),My=(()=>{class t extends Iy{_compositionMode;_composing=!1;constructor(e,i,o){super(e,i),this._compositionMode=o,this._compositionMode==null&&(this._compositionMode=!rM())}writeValue(e){let i=e??"";this.setProperty("value",i)}_handleInput(e){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(e)}_compositionStart(){this._composing=!0}_compositionEnd(e){this._composing=!1,this._compositionMode&&this.onChange(e)}static \u0275fac=function(i){return new(i||t)(Ce(Ve),Ce(j),Ce(aM,8))};static \u0275dir=F({type:t,selectors:[["input","formControlName","",3,"type","checkbox",3,"ngNoCva",""],["textarea","formControlName","",3,"ngNoCva",""],["input","formControl","",3,"type","checkbox",3,"ngNoCva",""],["textarea","formControl","",3,"ngNoCva",""],["input","ngModel","",3,"type","checkbox",3,"ngNoCva",""],["textarea","ngModel","",3,"ngNoCva",""],["","ngDefaultControl",""]],hostBindings:function(i,o){i&1&&oe("input",function(a){return o._handleInput(a.target.value)})("blur",function(){return o.onTouched()})("compositionstart",function(){return o._compositionStart()})("compositionend",function(a){return o._compositionEnd(a.target.value)})},standalone:!1,features:[Se([oM]),We]})}return t})();function Ep(t){return t==null||Dp(t)===0}function Dp(t){return t==null?null:Array.isArray(t)||typeof t=="string"?t.length:t instanceof Set?t.size:null}var $o=new b(""),Ip=new b(""),sM=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,da=class{static min(n){return cM(n)}static max(n){return lM(n)}static required(n){return Ny(n)}static requiredTrue(n){return dM(n)}static email(n){return uM(n)}static minLength(n){return mM(n)}static maxLength(n){return pM(n)}static pattern(n){return fM(n)}static nullValidator(n){return Wc()}static compose(n){return Fy(n)}static composeAsync(n){return Py(n)}};function cM(t){return n=>{if(n.value==null||t==null)return null;let e=parseFloat(n.value);return!isNaN(e)&&e<t?{min:{min:t,actual:n.value}}:null}}function lM(t){return n=>{if(n.value==null||t==null)return null;let e=parseFloat(n.value);return!isNaN(e)&&e>t?{max:{max:t,actual:n.value}}:null}}function Ny(t){return Ep(t.value)?{required:!0}:null}function dM(t){return t.value===!0?null:{required:!0}}function uM(t){return Ep(t.value)||sM.test(t.value)?null:{email:!0}}function mM(t){return n=>{let e=n.value?.length??Dp(n.value);return e===null||e===0?null:e<t?{minlength:{requiredLength:t,actualLength:e}}:null}}function pM(t){return n=>{let e=n.value?.length??Dp(n.value);return e!==null&&e>t?{maxlength:{requiredLength:t,actualLength:e}}:null}}function fM(t){if(!t)return Wc;let n,e;return typeof t=="string"?(e="",t.charAt(0)!=="^"&&(e+="^"),e+=t,t.charAt(t.length-1)!=="$"&&(e+="$"),n=new RegExp(e)):(e=t.toString(),n=t),i=>{if(Ep(i.value))return null;let o=i.value;return n.test(o)?null:{pattern:{requiredPattern:e,actualValue:o}}}}function Wc(t){return null}function Ty(t){return t!=null}function ky(t){return Bi(t)?St(t):t}function Ay(t){let n={};return t.forEach(e=>{n=e!=null?C(C({},n),e):n}),Object.keys(n).length===0?null:n}function Ry(t,n){return n.map(e=>e(t))}function hM(t){return!t.validate}function Oy(t){return t.map(n=>hM(n)?n:e=>n.validate(e))}function Fy(t){if(!t)return null;let n=t.filter(Ty);return n.length==0?null:function(e){return Ay(Ry(e,n))}}function Mp(t){return t!=null?Fy(Oy(t)):null}function Py(t){if(!t)return null;let n=t.filter(Ty);return n.length==0?null:function(e){let i=Ry(e,n).map(ky);return lr(i).pipe(ge(Ay))}}function Np(t){return t!=null?Py(Oy(t)):null}function wy(t,n){return t===null?[n]:Array.isArray(t)?[...t,n]:[t,n]}function Ly(t){return t._rawValidators}function Vy(t){return t._rawAsyncValidators}function Cp(t){return t?Array.isArray(t)?t:[t]:[]}function qc(t,n){return Array.isArray(t)?t.includes(n):t===n}function xy(t,n){let e=Cp(n);return Cp(t).forEach(o=>{qc(e,o)||e.push(o)}),e}function Cy(t,n){return Cp(n).filter(e=>!qc(t,e))}var Yc=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(n){this._rawValidators=n||[],this._composedValidatorFn=Mp(this._rawValidators)}_setAsyncValidators(n){this._rawAsyncValidators=n||[],this._composedAsyncValidatorFn=Np(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(n){this._onDestroyCallbacks.push(n)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(n=>n()),this._onDestroyCallbacks=[]}reset(n=void 0){this.control?.reset(n)}hasError(n,e){return this.control?this.control.hasError(n,e):!1}getError(n,e){return this.control?this.control.getError(n,e):null}},Xn=class extends Yc{name;get formDirective(){return null}get path(){return null}};var ra="VALID",Gc="INVALID",Ho="PENDING",aa="DISABLED",Qn=class{},Kc=class extends Qn{value;source;constructor(n,e){super(),this.value=n,this.source=e}},ca=class extends Qn{pristine;source;constructor(n,e){super(),this.pristine=n,this.source=e}},la=class extends Qn{touched;source;constructor(n,e){super(),this.touched=n,this.source=e}},zo=class extends Qn{status;source;constructor(n,e){super(),this.status=n,this.source=e}},Zc=class extends Qn{source;constructor(n){super(),this.source=n}},Uo=class extends Qn{source;constructor(n){super(),this.source=n}};function jy(t){return(tl(t)?t.validators:t)||null}function gM(t){return Array.isArray(t)?Mp(t):t||null}function By(t,n){return(tl(n)?n.asyncValidators:t)||null}function vM(t){return Array.isArray(t)?Np(t):t||null}function tl(t){return t!=null&&!Array.isArray(t)&&typeof t=="object"}function bM(t,n,e){let i=t.controls;if(!(n?Object.keys(i):i).length)throw new S(1e3,"");if(!Hy(i,e))throw new S(1001,"")}function yM(t,n,e){t._forEachChild((i,o)=>{if(e[o]===void 0)throw new S(-1002,"")})}var _M=Symbol();var Xc=class{_pendingDirty=!1;_hasOwnPendingAsyncValidator=null;_pendingTouched=!1;_onCollectionChange=()=>{};_updateOn;_hasRequired=ne(!1);_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(n,e){this[_M]=!0,this._assignValidators(n),this._assignAsyncValidators(e)}get validator(){return this._composedValidatorFn}set validator(n){this._rawValidators=this._composedValidatorFn=n,this._updateHasRequiredValidator()}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(n){this._rawAsyncValidators=this._composedAsyncValidatorFn=n}get parent(){return this._parent}get status(){return Ee(this.statusReactive)}set status(n){Ee(()=>this.statusReactive.set(n))}_status=Je(()=>this.statusReactive());statusReactive=ne(void 0);get valid(){return this.status===ra}get invalid(){return this.status===Gc}get pending(){return this.status===Ho}get disabled(){return this.status===aa}get enabled(){return this.status!==aa}get errors(){return Ee(this.errorsReactive)}set errors(n){Ee(()=>this.errorsReactive.set(n))}_errors=Je(()=>this.errorsReactive());errorsReactive=ne(null);get pristine(){return Ee(this.pristineReactive)}set pristine(n){Ee(()=>this.pristineReactive.set(n))}_pristine=Je(()=>this.pristineReactive());pristineReactive=ne(!0);get dirty(){return!this.pristine}get touched(){return Ee(this.touchedReactive)}set touched(n){Ee(()=>this.touchedReactive.set(n))}_touched=Je(()=>this.touchedReactive());touchedReactive=ne(!1);get untouched(){return!this.touched}_events=new D;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(n){this._assignValidators(n)}setAsyncValidators(n){this._assignAsyncValidators(n)}addValidators(n){this.setValidators(xy(n,this._rawValidators))}addAsyncValidators(n){this.setAsyncValidators(xy(n,this._rawAsyncValidators))}removeValidators(n){this.setValidators(Cy(n,this._rawValidators))}removeAsyncValidators(n){this.setAsyncValidators(Cy(n,this._rawAsyncValidators))}hasValidator(n){return qc(this._rawValidators,n)}hasAsyncValidator(n){return qc(this._rawAsyncValidators,n)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(n={}){let e=this.touched===!1;this.touched=!0;let i=n.sourceControl??this;n.onlySelf||this._parent?.markAsTouched(Q(C({},n),{sourceControl:i})),e&&n.emitEvent!==!1&&this._events.next(new la(!0,i))}markAllAsDirty(n={}){this.markAsDirty({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsDirty(n))}markAllAsTouched(n={}){this.markAsTouched({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsTouched(n))}markAsUntouched(n={}){let e=this.touched===!0;this.touched=!1,this._pendingTouched=!1;let i=n.sourceControl??this;this._forEachChild(o=>{o.markAsUntouched({onlySelf:!0,emitEvent:n.emitEvent,sourceControl:i})}),n.onlySelf||this._parent?._updateTouched(n,i),e&&n.emitEvent!==!1&&this._events.next(new la(!1,i))}markAsDirty(n={}){let e=this.pristine===!0;this.pristine=!1;let i=n.sourceControl??this;n.onlySelf||this._parent?.markAsDirty(Q(C({},n),{sourceControl:i})),e&&n.emitEvent!==!1&&this._events.next(new ca(!1,i))}markAsPristine(n={}){let e=this.pristine===!1;this.pristine=!0,this._pendingDirty=!1;let i=n.sourceControl??this;this._forEachChild(o=>{o.markAsPristine({onlySelf:!0,emitEvent:n.emitEvent})}),n.onlySelf||this._parent?._updatePristine(n,i),e&&n.emitEvent!==!1&&this._events.next(new ca(!0,i))}markAsPending(n={}){this.status=Ho;let e=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new zo(this.status,e)),this.statusChanges.emit(this.status)),n.onlySelf||this._parent?.markAsPending(Q(C({},n),{sourceControl:e}))}disable(n={}){let e=this._parentMarkedDirty(n.onlySelf);this.status=aa,this.errors=null,this._forEachChild(o=>{o.disable(Q(C({},n),{onlySelf:!0}))}),this._updateValue();let i=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new Kc(this.value,i)),this._events.next(new zo(this.status,i)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(Q(C({},n),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(o=>o(!0))}enable(n={}){let e=this._parentMarkedDirty(n.onlySelf);this.status=ra,this._forEachChild(i=>{i.enable(Q(C({},n),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:n.emitEvent}),this._updateAncestors(Q(C({},n),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(i=>i(!1))}_updateAncestors(n,e){n.onlySelf||(this._parent?.updateValueAndValidity(n),n.skipPristineCheck||this._parent?._updatePristine({},e),this._parent?._updateTouched({},e))}setParent(n){this._parent=n}getRawValue(){return this.value}updateValueAndValidity(n={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let i=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===ra||this.status===Ho)&&this._runAsyncValidator(i,n.emitEvent)}let e=n.sourceControl??this;n.emitEvent!==!1&&(this._events.next(new Kc(this.value,e)),this._events.next(new zo(this.status,e)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),n.onlySelf||this._parent?.updateValueAndValidity(Q(C({},n),{sourceControl:e}))}_updateTreeValidity(n={emitEvent:!0}){this._forEachChild(e=>e._updateTreeValidity(n)),this.updateValueAndValidity({onlySelf:!0,emitEvent:n.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?aa:ra}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(n,e){if(this.asyncValidator){this.status=Ho,this._hasOwnPendingAsyncValidator={emitEvent:e!==!1,shouldHaveEmitted:n!==!1};let i=ky(this.asyncValidator(this));this._asyncValidationSubscription=i.subscribe(o=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(o,{emitEvent:e,shouldHaveEmitted:n})})}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let n=(this._hasOwnPendingAsyncValidator?.emitEvent||this._hasOwnPendingAsyncValidator?.shouldHaveEmitted)??!1;return this._hasOwnPendingAsyncValidator=null,n}return!1}setErrors(n,e={}){this.errors=n,this._updateControlsErrors(e.emitEvent!==!1,this,e.shouldHaveEmitted)}get(n){let e=n;return e==null||(Array.isArray(e)||(e=e.split(".")),e.length===0)?null:e.reduce((i,o)=>i&&i._find(o),this)}getError(n,e){let i=e?this.get(e):this;return i?.errors?i.errors[n]:null}hasError(n,e){return!!this.getError(n,e)}get root(){let n=this;for(;n._parent;)n=n._parent;return n}_updateControlsErrors(n,e,i){this.status=this._calculateStatus(),n&&this.statusChanges.emit(this.status),(n||i)&&this._events.next(new zo(this.status,e)),this._parent&&this._parent._updateControlsErrors(n,e,i)}_initObservables(){this.valueChanges=new de,this.statusChanges=new de}_calculateStatus(){return this._allControlsDisabled()?aa:this.errors?Gc:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(Ho)?Ho:this._anyControlsHaveStatus(Gc)?Gc:ra}_anyControlsHaveStatus(n){return this._anyControls(e=>e.status===n)}_anyControlsDirty(){return this._anyControls(n=>n.dirty)}_anyControlsTouched(){return this._anyControls(n=>n.touched)}_updatePristine(n,e){let i=!this._anyControlsDirty(),o=this.pristine!==i;this.pristine=i,n.onlySelf||this._parent?._updatePristine(n,e),o&&this._events.next(new ca(this.pristine,e))}_updateTouched(n={},e){this.touched=this._anyControlsTouched(),this._events.next(new la(this.touched,e)),n.onlySelf||this._parent?._updateTouched(n,e)}_onDisabledChange=[];_registerOnCollectionChange(n){this._onCollectionChange=n}_setUpdateStrategy(n){tl(n)&&n.updateOn!=null&&(this._updateOn=n.updateOn)}_parentMarkedDirty(n){return!n&&!!this._parent?.dirty&&!this._parent._anyControlsDirty()}_find(n){return null}_assignValidators(n){this._rawValidators=Array.isArray(n)?n.slice():n,this._composedValidatorFn=gM(this._rawValidators),this._updateHasRequiredValidator()}_assignAsyncValidators(n){this._rawAsyncValidators=Array.isArray(n)?n.slice():n,this._composedAsyncValidatorFn=vM(this._rawAsyncValidators)}_updateHasRequiredValidator(){Ee(()=>this._hasRequired.set(this.hasValidator(da.required)))}};function Hy(t,n){return Object.hasOwn(t,n)}function wM(t){return t.tagName==="INPUT"||t.tagName==="SELECT"||t.tagName==="TEXTAREA"}function xM(t,n,e,i){switch(e){case"name":t.setAttribute(n,e,i);break;case"disabled":case"readonly":case"required":i?t.setAttribute(n,e,""):t.removeAttribute(n,e);break;case"max":case"min":case"minLength":case"maxLength":i!==void 0?t.setAttribute(n,e,i.toString()):t.removeAttribute(n,e);break}}var Sp=class{kind;context;control;message;constructor({kind:n,context:e,control:i}){this.kind=n,this.context=e,this.control=i}},CM=new b(""),nl=new b("",{factory:()=>il}),il="always";function SM(t,n){return[...n.path,t]}function EM(t,n,e=il){ol(t,n),n.valueAccessor.writeValue(t.value),(t.disabled||e==="always")&&n.valueAccessor.setDisabledState?.(t.disabled),IM(t,n),NM(t,n),MM(t,n),DM(t,n)}function Sy(t,n,e=!0){let i=()=>{};n?.valueAccessor?.registerOnChange(i),n?.valueAccessor?.registerOnTouched(i),Jc(t,n),t&&(n._invokeOnDestroyCallbacks(),t._registerOnCollectionChange(()=>{}))}function Qc(t,n){t.forEach(e=>{e.registerOnValidatorChange&&e.registerOnValidatorChange(n)})}function DM(t,n){if(n.valueAccessor.setDisabledState){let e=i=>{n.valueAccessor.setDisabledState(i)};t.registerOnDisabledChange(e),n._registerOnDestroy(()=>{t._unregisterOnDisabledChange(e)})}}function ol(t,n){let e=Ly(t);n.validator!==null?t.setValidators(wy(e,n.validator)):typeof e=="function"&&t.setValidators([e]);let i=Vy(t);n.asyncValidator!==null?t.setAsyncValidators(wy(i,n.asyncValidator)):typeof i=="function"&&t.setAsyncValidators([i]);let o=()=>t.updateValueAndValidity();Qc(n._rawValidators,o),Qc(n._rawAsyncValidators,o)}function Jc(t,n){let e=!1;if(t!==null){if(n.validator!==null){let o=Ly(t);if(Array.isArray(o)&&o.length>0){let r=o.filter(a=>a!==n.validator);r.length!==o.length&&(e=!0,t.setValidators(r))}}if(n.asyncValidator!==null){let o=Vy(t);if(Array.isArray(o)&&o.length>0){let r=o.filter(a=>a!==n.asyncValidator);r.length!==o.length&&(e=!0,t.setAsyncValidators(r))}}}let i=()=>{};return Qc(n._rawValidators,i),Qc(n._rawAsyncValidators,i),e}function IM(t,n){n.valueAccessor.registerOnChange(e=>{t._pendingValue=e,t._pendingChange=!0,t._pendingDirty=!0,t.updateOn==="change"&&zy(t,n)})}function MM(t,n){n.valueAccessor.registerOnTouched(()=>{t._pendingTouched=!0,t.updateOn==="blur"&&t._pendingChange&&zy(t,n),t.updateOn!=="submit"&&t.markAsTouched()})}function zy(t,n){t._pendingDirty&&t.markAsDirty(),t.setValue(t._pendingValue,{emitModelToViewChange:!1}),n.viewToModelUpdate(t._pendingValue),t._pendingChange=!1}function NM(t,n){let e=(i,o)=>{n.valueAccessor.writeValue(i),o&&n.viewToModelUpdate(i)};t.registerOnChange(e),n._registerOnDestroy(()=>{t._unregisterOnChange(e)})}function Uy(t,n){t==null,ol(t,n)}function TM(t,n){return Jc(t,n)}function kM(t,n){if(!Object.hasOwn(t,"model"))return!1;let e=t.model;return e.isFirstChange()?!0:!Object.is(n,e.currentValue)}function AM(t){return Object.getPrototypeOf(t.constructor)===iM}function $y(t,n){t._syncPendingControls(),n.forEach(e=>{let i=e.control;i.updateOn==="submit"&&i._pendingChange&&(e.viewToModelUpdate(i._pendingValue),i._pendingChange=!1)})}function RM(t,n){if(!n)return null;Array.isArray(n);let e,i,o;return n.forEach(r=>{r.constructor===My?e=r:AM(r)?i=r:o=r}),o||i||e||null}function OM(t,n){let e=t.indexOf(n);e>-1&&t.splice(e,1)}var FM=(()=>{class t{_validator=Wc;_onChange;get _enabled(){return this.enabledReactive()}enabledReactive=ne(void 0);ngOnChanges(e){if(this.inputName in e){let i=this.normalizeInput(e[this.inputName].currentValue),o=this.enabled(i);this.enabledReactive.set(o),this._validator=o?this.createValidator(i):Wc,this._onChange?.()}}validate(e){return this._validator(e)}registerOnValidatorChange(e){this._onChange=e}enabled(e){return e!=null}static \u0275fac=function(i){return new(i||t)};static \u0275dir=F({type:t,features:[ft]})}return t})();var PM={provide:$o,useExisting:Oe(()=>Gy),multi:!0};var Gy=(()=>{class t extends FM{required;inputName="required";normalizeInput=Y;createValidator=e=>Ny;enabled(e){return e}static \u0275fac=(()=>{let e;return function(o){return(e||(e=ln(t)))(o||t)}})();static \u0275dir=F({type:t,selectors:[["","required","","formControlName","",3,"type","checkbox"],["","required","","formControl","",3,"type","checkbox"],["","required","","ngModel","",3,"type","checkbox"]],hostVars:1,hostBindings:function(i,o){i&2&&ve("required",o._enabled?"":null)},inputs:{required:"required"},standalone:!1,features:[Se([PM]),We]})}return t})();var LM={provide:CM,useFactory:()=>{let t=m(Jn,{self:!0});return{setParseErrors:n=>{t.setParseErrorSource(n)},set onReset(n){t.onReset=n}}}},Jn=class extends Yc{_parent=null;name=null;valueAccessor=null;isCustomControlBased=!1;userOnReset;resetSubscription;set onReset(n){this.userOnReset=n,this.resetSubscription?.unsubscribe(),this.resetSubscription=void 0,this.control&&(this.resetSubscription=this.control.events.subscribe(e=>{e instanceof Uo&&this.control&&this.userOnReset?.(this.control.value)}),this.subscription?.add(this.resetSubscription))}isNativeFormElement=!1;rawValueAccessors;_selectedValueAccessor=null;get selectedValueAccessor(){return this._selectedValueAccessor??=RM(this,this.rawValueAccessors)}parseErrorsValidator=null;renderer;injector;requiredValidatorViaDi;subscription;customControlBindings=null;pendingCustomValue=void 0;hasPendingCustomValue=!1;constructor(n,e,i){super(),this.injector=n,this.renderer=e,this.rawValueAccessors=i,this.injector?.get(nt)?.onDestroy(()=>{this.removeParseErrorsValidator(this.control),this.subscription?.unsubscribe()})}setupCustomControl(){this.subscription?.unsubscribe();let n=this.control,e=this.injector?.get(et);if(!n||!e)return;ol(n,this);let i=e.markForCheck.bind(e);if(this.subscription=new we,this.subscription.add(()=>this.discardPendingCustomValue(n)),typeof n.registerOnChange=="function"){let o=(r,a)=>{this.discardPendingCustomValue(n),a&&this.viewToModelUpdate(r),i()};n.registerOnChange(o),this.subscription.add(()=>n._unregisterOnChange(o))}this.subscription.add(n.valueChanges.subscribe(i)),this.subscription.add(n.statusChanges.subscribe(i)),this.resetSubscription?.unsubscribe(),this.resetSubscription=void 0,this.userOnReset&&(this.resetSubscription=n.events.subscribe(o=>{o instanceof Uo&&this.control&&this.userOnReset?.(this.control.value)}),this.subscription.add(this.resetSubscription)),this.parseErrorsValidator&&n.addValidators(this.parseErrorsValidator)}ngControlCreate(n){!n.nativeElement.hasAttribute?.("ngNoCva")&&(this.rawValueAccessors&&this.rawValueAccessors.length>0||this.valueAccessor!==null)||!n.customControl||(this.isCustomControlBased=!0,n.listenToCustomControlModel(o=>{let r=this.control;r&&(r._pendingValue=o,r._pendingChange=!0,r._pendingDirty=!0,this.pendingCustomValue=o,this.hasPendingCustomValue=!0,r.updateOn==="change"&&this.updateControlFromCustom(r))}),n.listenToCustomControlOutput("touch",()=>{let o=this.control;o&&(o._pendingTouched=!0,o.updateOn==="blur"&&o._pendingChange&&this.updateControlFromCustom(o),o.updateOn!=="submit"&&o.markAsTouched())}),this.customControlBindings={},this.isNativeFormElement=wM(n.nativeElement),this.requiredValidatorViaDi=this._rawValidators.find(o=>o instanceof Gy))}updateControlFromCustom(n){let e=n._pendingValue;n._pendingChange=!1,this.clearPendingCustomValue(),this.customControlBindings&&(this.customControlBindings.value=e),n._pendingDirty&&n.markAsDirty(),n.setValue(e,{emitModelToViewChange:!1}),this.viewToModelUpdate(n.value)}discardPendingCustomValue(n){this.hasPendingCustomValue&&(this.customControlBindings&&(this.customControlBindings.value=this.pendingCustomValue),this.clearPendingCustomValue(),n._pendingValue=n.value,n._pendingChange=!1,n._pendingDirty=!1)}clearPendingCustomValue(){this.pendingCustomValue=void 0,this.hasPendingCustomValue=!1}ngControlUpdate(n){if(!this.isCustomControlBased)return;let e=this.control,i=this.customControlBindings;if(!e||!i)return;this.hasPendingCustomValue&&!e._pendingChange&&(i.value=this.pendingCustomValue,this.clearPendingCustomValue()),e._status(),e._errors(),Object.is(i.value,e.value)||(this.discardPendingCustomValue(e),i.value=e.value,n.setCustomControlModelInput(e.value)),this.bindControlProperty(n,i,"touched",e.touched),this.bindControlProperty(n,i,"dirty",e.dirty),this.bindControlProperty(n,i,"valid",e.valid),this.bindControlProperty(n,i,"invalid",e.invalid),this.bindControlProperty(n,i,"pending",e.pending),this.bindControlProperty(n,i,"disabled",e.disabled);let o=this.requiredValidatorViaDi;if(o){let a=this.isRequired;n.setInputOnDirectives("required",a,(s,c)=>c!==o&&s!==a)}else this.bindControlProperty(n,i,"required",this.isRequired);let r=e.errors;if(i.errors!==r){i.errors=r;let a=this._convertErrors(r);n.setInputOnDirectives("errors",a)}}get isRequired(){return(this.requiredValidatorViaDi?._enabled||this.control?._hasRequired())??!1}bindControlProperty(n,e,i,o){if(e[i]===o)return;e[i]=o;let r=n.setInputOnDirectives(i,o);this.isNativeFormElement&&!r&&(i==="disabled"||i==="required")&&this.renderer&&xM(this.renderer,n.nativeElement,i,o)}_convertErrors(n){if(n===null)return[];let e=this.control;return Object.entries(n).map(([i,o])=>new Sp({context:o,kind:i,control:e}))}setParseErrorSource(n){if(n===void 0)return;let e=null,i=Je(()=>{let o=n();return o.length===0?null:o.reduce((r,a)=>(r[a.kind]=a,r),{})});this.parseErrorsValidator=()=>(e=Ee(i),e),gt(()=>{let o=i();o!==e&&(e=o,this.control?.updateValueAndValidity({emitEvent:!1}),this.injector?.get(et)?.markForCheck())},{injector:this.injector})}removeParseErrorsValidator(n){this.parseErrorsValidator&&(n?.removeValidators(this.parseErrorsValidator),n?.updateValueAndValidity({emitEvent:!1}))}},el=class{_cd;constructor(n){this._cd=n}get isTouched(){return this._cd?.control?._touched?.(),!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return this._cd?.control?._pristine?.(),!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return this._cd?.control?._status?.(),!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return this._cd?._submitted?.(),!!this._cd?.submitted}};var rl=(()=>{class t extends el{constructor(e){super(e)}static \u0275fac=function(i){return new(i||t)(Ce(Jn,2))};static \u0275dir=F({type:t,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(i,o){i&2&&k("ng-untouched",o.isUntouched)("ng-touched",o.isTouched)("ng-pristine",o.isPristine)("ng-dirty",o.isDirty)("ng-valid",o.isValid)("ng-invalid",o.isInvalid)("ng-pending",o.isPending)},standalone:!1,features:[We]})}return t})(),al=(()=>{class t extends el{constructor(e){super(e)}static \u0275fac=function(i){return new(i||t)(Ce(Xn,10))};static \u0275dir=F({type:t,selectors:[["","formGroupName",""],["","formArrayName",""],["","ngModelGroup",""],["","formGroup",""],["","formArray",""],["form",3,"ngNoForm",""],["","ngForm",""]],hostVars:16,hostBindings:function(i,o){i&2&&k("ng-untouched",o.isUntouched)("ng-touched",o.isTouched)("ng-pristine",o.isPristine)("ng-dirty",o.isDirty)("ng-valid",o.isValid)("ng-invalid",o.isInvalid)("ng-pending",o.isPending)("ng-submitted",o.isSubmitted)},standalone:!1,features:[We]})}return t})(),ei=class extends Xc{constructor(n,e,i){super(jy(e),By(i,e)),this.controls=n,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;registerControl(n,e){let i=this._find(n);return i||(this.controls[n]=e,e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange),e)}addControl(n,e,i={}){this.registerControl(n,e),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}removeControl(n,e={}){let i=this._find(n);i&&i._registerOnCollectionChange(()=>{}),delete this.controls[n],this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange()}setControl(n,e,i={}){let o=this._find(n);o&&o._registerOnCollectionChange(()=>{}),delete this.controls[n],e&&this.registerControl(n,e),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}contains(n){return this._find(n)?.enabled===!0}setValue(n,e={}){Ee(()=>{yM(this,!0,n),Object.keys(n).forEach(i=>{bM(this,!0,i),this.controls[i].setValue(n[i],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e)})}patchValue(n,e={}){n!=null&&(Object.keys(n).forEach(i=>{let o=this._find(i);o&&o.patchValue(n[i],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e))}reset(n={},e={}){this._forEachChild((i,o)=>{i.reset(n?n[o]:null,Q(C({},e),{onlySelf:!0}))}),this._updatePristine(e,this),this._updateTouched(e,this),this.updateValueAndValidity(e),e?.emitEvent!==!1&&this._events.next(new Uo(this))}getRawValue(){return this._reduceChildren({},(n,e,i)=>(n[i]=e.getRawValue(),n))}_syncPendingControls(){let n=this._reduceChildren(!1,(e,i)=>i._syncPendingControls()?!0:e);return n&&this.updateValueAndValidity({onlySelf:!0}),n}_forEachChild(n){Object.keys(this.controls).forEach(e=>{let i=this.controls[e];i&&n(i,e)})}_setUpControls(){this._forEachChild(n=>{n.setParent(this),n._registerOnCollectionChange(this._onCollectionChange)})}_updateValue(){this.value=this._reduceValue()}_anyControls(n){for(let[e,i]of Object.entries(this.controls))if(this.contains(e)&&n(i))return!0;return!1}_reduceValue(){let n={};return this._reduceChildren(n,(e,i,o)=>((i.enabled||this.disabled)&&(e[o]=i.value),e))}_reduceChildren(n,e){let i=n;return this._forEachChild((o,r)=>{i=e(i,o,r)}),i}_allControlsDisabled(){for(let n of Object.keys(this.controls))if(this.controls[n].enabled)return!1;return Object.keys(this.controls).length>0||this.disabled}_find(n){return Hy(this.controls,n)?this.controls[n]:null}};var VM={provide:Xn,useExisting:Oe(()=>Tp)},sa=Promise.resolve(),Tp=(()=>{class t extends Xn{callSetDisabledState;get submitted(){return Ee(this.submittedReactive)}_submitted=Je(()=>this.submittedReactive());submittedReactive=ne(!1);_directives=new Set;form;ngSubmit=new de;options;constructor(e,i,o){super(),this.callSetDisabledState=o,this.form=new ei({},Mp(e),Np(i))}ngAfterViewInit(){this._setUpdateStrategy()}get formDirective(){return this}get control(){return this.form}get path(){return[]}get controls(){return this.form.controls}addControl(e){sa.then(()=>{let i=this._findContainer(e.path);e.control=i.registerControl(e.name,e.control),e._setupWithForm(this.callSetDisabledState),e.control.updateValueAndValidity({emitEvent:!1}),this._directives.add(e)})}getControl(e){return this.form.get(e.path)}removeControl(e){sa.then(()=>{this._findContainer(e.path)?.removeControl(e.name),this._directives.delete(e)})}addFormGroup(e){sa.then(()=>{let i=this._findContainer(e.path),o=new ei({});Uy(o,e),i.registerControl(e.name,o),o.updateValueAndValidity({emitEvent:!1})})}removeFormGroup(e){sa.then(()=>{this._findContainer(e.path)?.removeControl?.(e.name)})}getFormGroup(e){return this.form.get(e.path)}updateModel(e,i){sa.then(()=>{this.form.get(e.path).setValue(i)})}setValue(e){this.control.setValue(e)}onSubmit(e){return this.submittedReactive.set(!0),$y(this.form,this._directives),this.ngSubmit.emit(e),this.form._events.next(new Zc(this.control)),e?.target?.method==="dialog"}onReset(){this.resetForm()}resetForm(e=void 0){this.form.reset(e),this.submittedReactive.set(!1)}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.form._updateOn=this.options.updateOn)}_findContainer(e){return e.pop(),e.length?this.form.get(e):this.form}static \u0275fac=function(i){return new(i||t)(Ce($o,10),Ce(Ip,10),Ce(nl,8))};static \u0275dir=F({type:t,selectors:[["form",3,"ngNoForm","",3,"formGroup","",3,"formArray",""],["ng-form"],["","ngForm",""]],hostBindings:function(i,o){i&1&&oe("submit",function(a){return o.onSubmit(a)})("reset",function(){return o.onReset()})},inputs:{options:[0,"ngFormOptions","options"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:!1,features:[Se([VM]),We]})}return t})();function Ey(t,n){let e=t.indexOf(n);e>-1&&t.splice(e,1)}function Dy(t){return typeof t=="object"&&t!==null&&Object.keys(t).length===2&&"value"in t&&"disabled"in t}var Ne=class extends Xc{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=!1;constructor(n=null,e,i){super(jy(e),By(i,e)),this._applyFormState(n),this._setUpdateStrategy(e),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),tl(e)&&(e.nonNullable||e.initialValueIsDefault)&&(Dy(n)?this.defaultValue=n.value:this.defaultValue=n)}setValue(n,e={}){Ee(()=>{this.value=this._pendingValue=n,this._onChange.length&&e.emitModelToViewChange!==!1&&this._onChange.forEach(i=>i(this.value,e.emitViewToModelChange!==!1)),this.updateValueAndValidity(e)})}patchValue(n,e={}){this.setValue(n,e)}reset(n=this.defaultValue,e={}){this._applyFormState(n),this.markAsPristine(e),this.markAsUntouched(e),this.setValue(this.value,e),e.overwriteDefaultValue&&(this.defaultValue=this.value),this._pendingChange=!1,e?.emitEvent!==!1&&this._events.next(new Uo(this))}_updateValue(){}_anyControls(n){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(n){this._onChange.push(n)}_unregisterOnChange(n){Ey(this._onChange,n)}registerOnDisabledChange(n){this._onDisabledChange.push(n)}_unregisterOnDisabledChange(n){Ey(this._onDisabledChange,n)}_forEachChild(n){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),!0):!1}_applyFormState(n){Dy(n)?(this.value=this._pendingValue=n.value,n.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=n}};var jM=t=>t instanceof Ne;var BM=(()=>{class t extends Xn{callSetDisabledState;get submitted(){return Ee(this._submittedReactive)}set submitted(e){this._submittedReactive.set(e)}_submitted=Je(()=>this._submittedReactive());_submittedReactive=ne(!1);_oldForm;_onCollectionChange=()=>this._updateDomValue();directives=[];constructor(e,i,o){super(),this.callSetDisabledState=o,this._setValidators(e),this._setAsyncValidators(i)}ngOnChanges(e){this.onChanges(e)}ngOnDestroy(){this.onDestroy()}onChanges(e){if(!this.form)throw new S(1052,!1);Object.hasOwn(e,"form")&&(this._updateValidators(),this._updateDomValue(),this._updateRegistrations(),this._oldForm=this.form)}onDestroy(){this.form&&(Jc(this.form,this),this.form._onCollectionChange===this._onCollectionChange&&this.form._registerOnCollectionChange(()=>{}))}get formDirective(){return this}get path(){return[]}addControl(e){let i=this.form.get(e.path);if(!i)throw new S(-1055,!1);return e._setupWithForm(i,this.callSetDisabledState),i.updateValueAndValidity({emitEvent:!1}),this.directives.push(e),i}getControl(e){return this.form.get(e.path)}removeControl(e){Sy(e.control||null,e,!1),OM(this.directives,e)}addFormGroup(e){this._setUpFormContainer(e)}removeFormGroup(e){this._cleanUpFormContainer(e)}getFormGroup(e){return this.form.get(e.path)}getFormArray(e){return this.form.get(e.path)}addFormArray(e){this._setUpFormContainer(e)}removeFormArray(e){this._cleanUpFormContainer(e)}updateModel(e,i){this.form.get(e.path).setValue(i)}onReset(){this.resetForm()}resetForm(e=void 0,i={}){this.form.reset(e,i),this._submittedReactive.set(!1)}onSubmit(e){return this.submitted=!0,$y(this.form,this.directives),this.ngSubmit.emit(e),this.form._events.next(new Zc(this.control)),e?.target?.method==="dialog"}_updateDomValue(){this.directives.forEach(e=>{let i=e.control,o=this.form.get(e.path);i!==o&&(Sy(i||null,e),jM(o)&&e._setupWithForm(o,this.callSetDisabledState))}),this.form._updateTreeValidity({emitEvent:!1})}_setUpFormContainer(e){let i=this.form.get(e.path);Uy(i,e),i.updateValueAndValidity({emitEvent:!1})}_cleanUpFormContainer(e){let i=this.form?.get(e.path);i&&TM(i,e)&&i.updateValueAndValidity({emitEvent:!1})}_updateRegistrations(){this.form._registerOnCollectionChange(this._onCollectionChange),this._oldForm?._registerOnCollectionChange(()=>{})}_updateValidators(){ol(this.form,this),this._oldForm&&Jc(this._oldForm,this)}static \u0275fac=function(i){return new(i||t)(Ce($o,10),Ce(Ip,10),Ce(nl,8))};static \u0275dir=F({type:t,features:[We,ft]})}return t})(),HM={provide:Xn,useExisting:Oe(()=>Gi)},Gi=(()=>{class t extends BM{form=null;ngSubmit=new de;get control(){return this.form}static \u0275fac=(()=>{let e;return function(o){return(e||(e=ln(t)))(o||t)}})();static \u0275dir=F({type:t,selectors:[["","formGroup",""]],hostBindings:function(i,o){i&1&&oe("submit",function(a){return o.onSubmit(a)})("reset",function(){return o.onReset()})},inputs:{form:[0,"formGroup","form"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:!1,features:[Se([HM]),We]})}return t})();var Wy=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=F({type:t,selectors:[["form",3,"ngNoForm","",3,"ngNativeValidate",""]],hostAttrs:["novalidate",""],standalone:!1})}return t})();var qy=new b("");var zM={provide:Jn,useExisting:Oe(()=>ua)},ua=(()=>{class t extends Jn{_ngModelWarningConfig;_added=!1;viewModel;control;name=null;set isDisabled(e){}model;update=new de;static _ngModelWarningSentOnce=!1;_ngModelWarningSent=!1;constructor(e,i,o,r,a,s,c){super(c,s,r),this._ngModelWarningConfig=a,this._parent=e,this._setValidators(i),this._setAsyncValidators(o)}_setupWithForm(e,i){this.control=e,this.isCustomControlBased?this.setupCustomControl():(this.valueAccessor??=this.selectedValueAccessor,EM(e,this,i))}ngOnChanges(e){this._added||this._setUpControl(),kM(e,this.viewModel)&&(this.viewModel=this.model,this.formDirective.updateModel(this,this.model))}ngOnDestroy(){this.formDirective?.removeControl(this)}viewToModelUpdate(e){this.viewModel=e,this.update.emit(e)}get path(){return SM(this.name==null?this.name:this.name.toString(),this._parent)}get formDirective(){return this._parent?this._parent.formDirective:null}_setUpControl(){this.control=this.formDirective.addControl(this),this._added=!0}\u0275ngControlCreate(e){super.ngControlCreate(e)}\u0275ngControlUpdate(e){if(this.isCustomControlBased){if(!this.control){let i=this.formDirective?.getControl(this);if(!i)return;this.control=i}super.ngControlUpdate(e)}}static \u0275fac=function(i){return new(i||t)(Ce(Xn,13),Ce($o,10),Ce(Ip,10),Ce(Rt,10),Ce(qy,8),Ce(Ve,8),Ce(te,8))};static \u0275dir=F({type:t,selectors:[["","formControlName",""]],inputs:{name:[0,"formControlName","name"],isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"]},outputs:{update:"ngModelChange"},standalone:!1,features:[Se([zM,LM]),We,ft,Gm(null)]})}return t})();var Yy=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=P({})}return t})();var Ky=(()=>{class t{static withConfig(e){return{ngModule:t,providers:[{provide:nl,useValue:e.callSetDisabledState??il}]}}static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=P({imports:[Yy]})}return t})(),sl=(()=>{class t{static withConfig(e){return{ngModule:t,providers:[{provide:qy,useValue:e.warnOnNgModelWithFormControl??"always"},{provide:nl,useValue:e.callSetDisabledState??il}]}}static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=P({imports:[Yy]})}return t})();var kp;try{kp=typeof Intl<"u"&&Intl.v8BreakIterator}catch(t){kp=!1}var ue=(()=>{class t{_platformId=m(Cn);isBrowser=this._platformId?Rc(this._platformId):typeof document=="object"&&!!document;EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent);TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent);BLINK=this.isBrowser&&!!(window.chrome||kp)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT;WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT;IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window);FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent);ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT;SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT;static \u0275fac=function(i){return new(i||t)};static \u0275prov=O({token:t,factory:t.\u0275fac})}return t})();var Wi;function Xy(){if(Wi==null){if(typeof document!="object"||!document||typeof Element!="function"||!Element)return Wi=!1,Wi;if(document.documentElement?.style&&"scrollBehavior"in document.documentElement.style)Wi=!0;else{let t=Element.prototype.scrollTo;t?Wi=!/\{\s*\[native code\]\s*\}/.test(t.toString()):Wi=!1}}return Wi}var Ap;function Qy(){if(Ap==null){let t=typeof document<"u"?document.head:null;Ap=!!(t&&(t.createShadowRoot||t.attachShadow))}return Ap}function Rp(t){if(Qy()){let n=t.getRootNode?t.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&n instanceof ShadowRoot)return n}return null}function vt(t){if(t.composedPath)try{return t.composedPath()[0]}catch(n){}return t.target}function Op(){return typeof __karma__<"u"&&!!__karma__||typeof jasmine<"u"&&!!jasmine||typeof jest<"u"&&!!jest||typeof Mocha<"u"&&!!Mocha}var ma;function Jy(){if(ma==null&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>ma=!0}))}finally{ma=ma||!1}return ma}function Go(t){return Jy()?t:!!t.capture}var Wo,e_=["color","button","checkbox","date","datetime-local","email","file","hidden","image","month","number","password","radio","range","reset","search","submit","tel","text","time","url","week"];function Fp(){if(Wo)return Wo;if(typeof document!="object"||!document)return Wo=new Set(e_),Wo;let t=document.createElement("input");return Wo=new Set(e_.filter(n=>(t.setAttribute("type",n),t.type===n))),Wo}var UM=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=F({type:t,selectors:[["mat-toolbar-row"]],hostAttrs:[1,"mat-toolbar-row"],exportAs:["matToolbarRow"]})}return t})(),t_=(()=>{class t{_elementRef=m(j);_platform=m(ue);_document=m(A);color;_toolbarRows;ngAfterViewInit(){this._platform.isBrowser&&(this._checkToolbarMixedModes(),this._toolbarRows.changes.subscribe(()=>this._checkToolbarMixedModes()))}_checkToolbarMixedModes(){this._toolbarRows.length}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=(function(){let e=["*",[["mat-toolbar-row"]]];return L({type:t,selectors:[["mat-toolbar"]],contentQueries:function(r,a,s){if(r&1&&Yt(s,UM,5),r&2){let c;Z(c=X())&&(a._toolbarRows=c)}},hostAttrs:[1,"mat-toolbar"],hostVars:6,hostBindings:function(r,a){r&2&&(xt(a.color?"mat-"+a.color:""),k("mat-toolbar-multiple-rows",a._toolbarRows.length>0)("mat-toolbar-single-row",a._toolbarRows.length===0))},inputs:{color:"color"},exportAs:["matToolbar"],ngContentSelectors:["*","mat-toolbar-row"],decls:2,vars:0,template:function(r,a){r&1&&(Me(e),q(0),q(1,1))},styles:[`.mat-toolbar {
  background: var(--%NS%mat-toolbar-container-background-color, var(--%NS%mat-sys-surface));
  color: var(--%NS%mat-toolbar-container-text-color, var(--%NS%mat-sys-on-surface));
}
.mat-toolbar, .mat-toolbar h1, .mat-toolbar h2, .mat-toolbar h3, .mat-toolbar h4, .mat-toolbar h5, .mat-toolbar h6 {
  font-family: var(--%NS%mat-toolbar-title-text-font, var(--%NS%mat-sys-title-large-font));
  font-size: var(--%NS%mat-toolbar-title-text-size, var(--%NS%mat-sys-title-large-size));
  line-height: var(--%NS%mat-toolbar-title-text-line-height, var(--%NS%mat-sys-title-large-line-height));
  font-weight: var(--%NS%mat-toolbar-title-text-weight, var(--%NS%mat-sys-title-large-weight));
  letter-spacing: var(--%NS%mat-toolbar-title-text-tracking, var(--%NS%mat-sys-title-large-tracking));
  margin: 0;
}
@media (forced-colors: active) {
  .mat-toolbar {
    outline: solid 1px;
  }
}
.mat-toolbar .mat-form-field-underline,
.mat-toolbar .mat-form-field-ripple,
.mat-toolbar .mat-focused .mat-form-field-ripple {
  background-color: currentColor;
}
.mat-toolbar .mat-form-field-label,
.mat-toolbar .mat-focused .mat-form-field-label,
.mat-toolbar .mat-select-value,
.mat-toolbar .mat-select-arrow,
.mat-toolbar .mat-form-field.mat-focused .mat-select-arrow {
  color: inherit;
}
.mat-toolbar .mat-input-element {
  caret-color: currentColor;
}
.mat-toolbar .mat-mdc-button-base.mat-mdc-button-base.mat-unthemed {
  --%NS%mat-button-text-label-text-color: var(--%NS%mat-toolbar-container-text-color, var(--%NS%mat-sys-on-surface));
  --%NS%mat-button-outlined-label-text-color: var(--%NS%mat-toolbar-container-text-color, var(--%NS%mat-sys-on-surface));
}

.mat-toolbar-row, .mat-toolbar-single-row {
  display: flex;
  box-sizing: border-box;
  padding: 0 16px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  height: var(--%NS%mat-toolbar-standard-height, 64px);
}
@media (max-width: 599px) {
  .mat-toolbar-row, .mat-toolbar-single-row {
    height: var(--%NS%mat-toolbar-mobile-height, 56px);
  }
}

.mat-toolbar-multiple-rows {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  width: 100%;
  min-height: var(--%NS%mat-toolbar-standard-height, 64px);
}
@media (max-width: 599px) {
  .mat-toolbar-multiple-rows {
    min-height: var(--%NS%mat-toolbar-mobile-height, 56px);
  }
}
`],encapsulation:2})})()}return t})();var n_=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=P({imports:[_e]})}return t})();var GM=new b("MAT_CARD_CONFIG"),cl=(()=>{class t{appearance;constructor(){let e=m(GM,{optional:!0});this.appearance=e?.appearance||"raised"}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=(function(){return L({type:t,selectors:[["mat-card"]],hostAttrs:[1,"mat-mdc-card","mdc-card"],hostVars:8,hostBindings:function(o,r){o&2&&k("mat-mdc-card-outlined",r.appearance==="outlined")("mdc-card--outlined",r.appearance==="outlined")("mat-mdc-card-filled",r.appearance==="filled")("mdc-card--filled",r.appearance==="filled")},inputs:{appearance:"appearance"},exportAs:["matCard"],ngContentSelectors:["*"],decls:1,vars:0,template:function(o,r){o&1&&(Me(),q(0))},styles:[`.mat-mdc-card {
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
`],encapsulation:2})})()}return t})(),i_=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=F({type:t,selectors:[["mat-card-title"],["","mat-card-title",""],["","matCardTitle",""]],hostAttrs:[1,"mat-mdc-card-title"]})}return t})();var o_=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=F({type:t,selectors:[["mat-card-content"]],hostAttrs:[1,"mat-mdc-card-content"]})}return t})(),r_=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=F({type:t,selectors:[["mat-card-subtitle"],["","mat-card-subtitle",""],["","matCardSubtitle",""]],hostAttrs:[1,"mat-mdc-card-subtitle"]})}return t})();var a_=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=(function(){let e=[[["","mat-card-avatar",""],["","matCardAvatar",""]],[["mat-card-title"],["mat-card-subtitle"],["","mat-card-title",""],["","mat-card-subtitle",""],["","matCardTitle",""],["","matCardSubtitle",""]],"*"];return L({type:t,selectors:[["mat-card-header"]],hostAttrs:[1,"mat-mdc-card-header"],ngContentSelectors:["[mat-card-avatar], [matCardAvatar]",`mat-card-title, mat-card-subtitle,
      [mat-card-title], [mat-card-subtitle],
      [matCardTitle], [matCardSubtitle]`,"*"],decls:4,vars:0,consts:[[1,"mat-mdc-card-header-text"]],template:function(r,a){r&1&&(Me(e),q(0),Qe(1,"div",0),q(2,1),rt(),q(3,2))},encapsulation:2})})()}return t})();var ll=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=P({imports:[_e]})}return t})();function pa(t){return t.buttons===0||t.detail===0}function fa(t){let n=t.touches&&t.touches[0]||t.changedTouches&&t.changedTouches[0];return!!n&&n.identifier===-1&&(n.radiusX==null||n.radiusX===1)&&(n.radiusY==null||n.radiusY===1)}function qo(t,n=0){return c_(t)?Number(t):arguments.length===2?n:0}function c_(t){return!isNaN(parseFloat(t))&&!isNaN(Number(t))}function Ct(t){return t instanceof j?t.nativeElement:t}var l_=new b("cdk-input-modality-detector-options"),d_={ignoreKeys:[18,17,224,91,16]},u_=650,Pp={passive:!0,capture:!0},m_=(()=>{class t{_platform=m(ue);_listenerCleanups;modalityDetected;modalityChanged;get mostRecentModality(){return this._modality.value}_mostRecentTarget=null;_modality=new pi(null);_options;_lastTouchMs=0;_onKeydown=e=>{this._options?.ignoreKeys?.some(i=>i===e.keyCode)||(this._modality.next("keyboard"),this._mostRecentTarget=vt(e))};_onMousedown=e=>{Date.now()-this._lastTouchMs<u_||(this._modality.next(pa(e)?"keyboard":"mouse"),this._mostRecentTarget=vt(e))};_onTouchstart=e=>{if(fa(e)){this._modality.next("keyboard");return}this._lastTouchMs=Date.now(),this._modality.next("touch"),this._mostRecentTarget=vt(e)};constructor(){let e=m(N),i=m(A),o=m(l_,{optional:!0});if(this._options=C(C({},d_),o),this.modalityDetected=this._modality.pipe(fr(1)),this.modalityChanged=this.modalityDetected.pipe(us()),this._platform.isBrowser){let r=m(Ge).createRenderer(null,null);this._listenerCleanups=e.runOutsideAngular(()=>[r.listen(i,"keydown",this._onKeydown,Pp),r.listen(i,"mousedown",this._onMousedown,Pp),r.listen(i,"touchstart",this._onTouchstart,Pp)])}}ngOnDestroy(){this._modality.complete(),this._listenerCleanups?.forEach(e=>e())}static \u0275fac=function(i){return new(i||t)};static \u0275prov=O({token:t,factory:t.\u0275fac})}return t})(),ha=(function(t){return t[t.IMMEDIATE=0]="IMMEDIATE",t[t.EVENTUAL=1]="EVENTUAL",t})(ha||{}),p_=new b("cdk-focus-monitor-default-options"),dl=Go({passive:!0,capture:!0}),Xt=(()=>{class t{_ngZone=m(N);_platform=m(ue);_inputModalityDetector=m(m_);_origin=null;_lastFocusOrigin=null;_windowFocused=!1;_windowFocusTimeoutId;_originTimeoutId;_originFromTouchInteraction=!1;_elementInfo=new Map;_monitoredElementCount=0;_rootNodeFocusListenerCount=new Map;_detectionMode;_windowFocusListener=()=>{this._windowFocused=!0,this._windowFocusTimeoutId=setTimeout(()=>this._windowFocused=!1)};_document=m(A);_stopInputModalityDetector=new D;constructor(){let e=m(p_,{optional:!0});this._detectionMode=e?.detectionMode||ha.IMMEDIATE}_rootNodeFocusAndBlurListener=e=>{let i=vt(e);for(let o=i;o;o=o.parentElement)e.type==="focus"?this._onFocus(e,o):this._onBlur(e,o)};monitor(e,i=!1){let o=Ct(e);if(!this._platform.isBrowser||o.nodeType!==1)return yt();let r=Rp(o)||this._document,a=this._elementInfo.get(o);if(a)return i&&(a.checkChildren=!0),a.subject;let s={checkChildren:i,subject:new D,rootNode:r};return this._elementInfo.set(o,s),this._registerGlobalListeners(s),s.subject}stopMonitoring(e){let i=Ct(e),o=this._elementInfo.get(i);o&&(o.subject.complete(),this._setClasses(i),this._elementInfo.delete(i),this._removeGlobalListeners(o))}focusVia(e,i,o){let r=Ct(e),a=this._document.activeElement;r===a?this._getClosestElementsInfo(r).forEach(([s,c])=>this._originChanged(s,i,c)):(this._setOrigin(i),typeof r.focus=="function"&&r.focus(o))}ngOnDestroy(){this._elementInfo.forEach((e,i)=>this.stopMonitoring(i))}_getWindow(){return this._document.defaultView||window}_getFocusOrigin(e){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(e)?"touch":"program":this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:e&&this._isLastInteractionFromInputLabel(e)?"mouse":"program"}_shouldBeAttributedToTouch(e){return this._detectionMode===ha.EVENTUAL||!!e?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(e,i){e.classList.toggle("cdk-focused",!!i),e.classList.toggle("cdk-touch-focused",i==="touch"),e.classList.toggle("cdk-keyboard-focused",i==="keyboard"),e.classList.toggle("cdk-mouse-focused",i==="mouse"),e.classList.toggle("cdk-program-focused",i==="program")}_setOrigin(e,i=!1){this._ngZone.runOutsideAngular(()=>{if(this._origin=e,this._originFromTouchInteraction=e==="touch"&&i,this._detectionMode===ha.IMMEDIATE){clearTimeout(this._originTimeoutId);let o=this._originFromTouchInteraction?u_:1;this._originTimeoutId=setTimeout(()=>this._origin=null,o)}})}_onFocus(e,i){let o=this._elementInfo.get(i),r=vt(e);!o||!o.checkChildren&&i!==r||this._originChanged(i,this._getFocusOrigin(r),o)}_onBlur(e,i){let o=this._elementInfo.get(i);!o||o.checkChildren&&e.relatedTarget instanceof Node&&i.contains(e.relatedTarget)||(this._setClasses(i),this._emitOrigin(o,null))}_emitOrigin(e,i){e.subject.observers.length&&this._ngZone.run(()=>e.subject.next(i))}_registerGlobalListeners(e){if(!this._platform.isBrowser)return;let i=e.rootNode,o=this._rootNodeFocusListenerCount.get(i)||0;o||this._ngZone.runOutsideAngular(()=>{i.addEventListener("focus",this._rootNodeFocusAndBlurListener,dl),i.addEventListener("blur",this._rootNodeFocusAndBlurListener,dl)}),this._rootNodeFocusListenerCount.set(i,o+1),++this._monitoredElementCount===1&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener("focus",this._windowFocusListener)}),this._inputModalityDetector.modalityDetected.pipe(Re(this._stopInputModalityDetector)).subscribe(r=>{this._setOrigin(r,!0)}))}_removeGlobalListeners(e){let i=e.rootNode;if(this._rootNodeFocusListenerCount.has(i)){let o=this._rootNodeFocusListenerCount.get(i);o>1?this._rootNodeFocusListenerCount.set(i,o-1):(i.removeEventListener("focus",this._rootNodeFocusAndBlurListener,dl),i.removeEventListener("blur",this._rootNodeFocusAndBlurListener,dl),this._rootNodeFocusListenerCount.delete(i))}--this._monitoredElementCount||(this._getWindow().removeEventListener("focus",this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId))}_originChanged(e,i,o){this._setClasses(e,i),this._emitOrigin(o,i),this._lastFocusOrigin=i}_getClosestElementsInfo(e){let i=[];return this._elementInfo.forEach((o,r)=>{(r===e||o.checkChildren&&r.contains(e))&&i.push([r,o])}),i}_isLastInteractionFromInputLabel(e){let{_mostRecentTarget:i,mostRecentModality:o}=this._inputModalityDetector;if(o!=="mouse"||!i||i===e||e.nodeName!=="INPUT"&&e.nodeName!=="TEXTAREA"||e.disabled)return!1;let r=e.labels;if(r){for(let a=0;a<r.length;a++)if(r[a].contains(i))return!0}return!1}static \u0275fac=function(i){return new(i||t)};static \u0275prov=O({token:t,factory:t.\u0275fac})}return t})();function Yo(t){return Array.isArray(t)?t:[t]}var f_=new Set,qi,Ko=(()=>{class t{_platform=m(ue);_nonce=m(Gn,{optional:!0});_matchMedia;constructor(){this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):qM}matchMedia(e){return(this._platform.WEBKIT||this._platform.BLINK)&&WM(e,this._nonce),this._matchMedia(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=O({token:t,factory:t.\u0275fac})}return t})();function WM(t,n){if(!f_.has(t))try{qi||(qi=document.createElement("style"),n&&qi.setAttribute("nonce",n),qi.setAttribute("type","text/css"),document.head.appendChild(qi)),qi.sheet&&(qi.sheet.insertRule(`@media ${t.replace(/[{}]/g,"")} {body{ }}`,0),f_.add(t))}catch(e){console.error(e)}}function qM(t){return{matches:t==="all"||t==="",media:t,addListener:()=>{},removeListener:()=>{}}}var Lp=(()=>{class t{_mediaMatcher=m(Ko);_zone=m(N);_queries=new Map;_destroySubject=new D;ngOnDestroy(){this._destroySubject.next(),this._destroySubject.complete()}isMatched(e){return h_(Yo(e)).some(o=>this._registerQuery(o).mql.matches)}observe(e){let o=h_(Yo(e)).map(a=>this._registerQuery(a).observable),r=hd(o);return r=ro(r.pipe(ur(1)),r.pipe(fr(1),dr(0))),r.pipe(ge(a=>{let s={matches:!1,breakpoints:{}};return a.forEach(({matches:c,query:l})=>{s.matches=s.matches||c,s.breakpoints[l]=c}),s}))}_registerQuery(e){if(this._queries.has(e))return this._queries.get(e);let i=this._mediaMatcher.matchMedia(e),r={observable:new K(a=>{let s=c=>this._zone.run(()=>a.next(c));return i.addListener(s),()=>{i.removeListener(s)}}).pipe(nn(i),ge(({matches:a})=>({query:e,matches:a})),Re(this._destroySubject)),mql:i};return this._queries.set(e,r),r}static \u0275fac=function(i){return new(i||t)};static \u0275prov=O({token:t,factory:t.\u0275fac})}return t})();function h_(t){return t.map(n=>n.split(",")).reduce((n,e)=>n.concat(e)).map(n=>n.trim())}var YM=(()=>{class t{create(e){return typeof MutationObserver>"u"?null:new MutationObserver(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=O({token:t,factory:t.\u0275fac})}return t})();var ul=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=P({providers:[YM]})}return t})();var ti=(function(t){return t[t.NONE=0]="NONE",t[t.BLACK_ON_WHITE=1]="BLACK_ON_WHITE",t[t.WHITE_ON_BLACK=2]="WHITE_ON_BLACK",t})(ti||{}),g_="cdk-high-contrast-black-on-white",v_="cdk-high-contrast-white-on-black",Vp="cdk-high-contrast-active",b_=(()=>{class t{_platform=m(ue);_hasCheckedHighContrastMode=!1;_document=m(A);_breakpointSubscription;constructor(){this._breakpointSubscription=m(Lp).observe("(forced-colors: active)").subscribe(()=>{this._hasCheckedHighContrastMode&&(this._hasCheckedHighContrastMode=!1,this._applyBodyHighContrastModeCssClasses())})}getHighContrastMode(){if(!this._platform.isBrowser)return ti.NONE;let e=this._document.createElement("div");e.style.backgroundColor="rgb(1,2,3)",e.style.position="absolute",this._document.body.appendChild(e);let i=this._document.defaultView||window,o=i&&i.getComputedStyle?i.getComputedStyle(e):null,r=(o&&o.backgroundColor||"").replace(/ /g,"");switch(e.remove(),r){case"rgb(0,0,0)":case"rgb(45,50,54)":case"rgb(32,32,32)":return ti.WHITE_ON_BLACK;case"rgb(255,255,255)":case"rgb(255,250,239)":return ti.BLACK_ON_WHITE}return ti.NONE}ngOnDestroy(){this._breakpointSubscription.unsubscribe()}_applyBodyHighContrastModeCssClasses(){if(!this._hasCheckedHighContrastMode&&this._platform.isBrowser&&this._document.body){let e=this._document.body.classList;e.remove(Vp,g_,v_),this._hasCheckedHighContrastMode=!0;let i=this.getHighContrastMode();i===ti.BLACK_ON_WHITE?e.add(Vp,g_):i===ti.WHITE_ON_BLACK&&e.add(Vp,v_)}}static \u0275fac=function(i){return new(i||t)};static \u0275prov=O({token:t,factory:t.\u0275fac})}return t})(),jp=(()=>{class t{constructor(){m(b_)._applyBodyHighContrastModeCssClasses()}static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=P({imports:[ul]})}return t})();var KM=200,ml=class{_letterKeyStream=new D;_items=[];_selectedItemIndex=-1;_pressedLetters=[];_skipPredicateFn;_selectedItem=new D;selectedItem=this._selectedItem;constructor(n,e){let i=typeof e?.debounceInterval=="number"?e.debounceInterval:KM;e?.skipPredicate&&(this._skipPredicateFn=e.skipPredicate),this.setItems(n),this._setupKeyHandler(i)}destroy(){this._pressedLetters=[],this._letterKeyStream.complete(),this._selectedItem.complete()}setCurrentSelectedItemIndex(n){this._selectedItemIndex=n}setItems(n){this._items=n}handleKey(n){let e=n.keyCode;n.key&&n.key.length===1?this._letterKeyStream.next(n.key.toLocaleUpperCase()):(e>=65&&e<=90||e>=48&&e<=57)&&this._letterKeyStream.next(String.fromCharCode(e))}isTyping(){return this._pressedLetters.length>0}reset(){this._pressedLetters=[]}_setupKeyHandler(n){this._letterKeyStream.pipe(gi(e=>this._pressedLetters.push(e)),dr(n),mt(()=>this._pressedLetters.length>0),ge(()=>this._pressedLetters.join("").toLocaleUpperCase())).subscribe(e=>{for(let i=1;i<this._items.length+1;i++){let o=(this._selectedItemIndex+i)%this._items.length,r=this._items[o];if(!this._skipPredicateFn?.(r)&&r.getLabel?.().toLocaleUpperCase().trim().indexOf(e)===0){this._selectedItem.next(r);break}}this._pressedLetters=[]})}};function Zo(t,...n){return n.length?n.some(e=>t[e]):t.altKey||t.shiftKey||t.ctrlKey||t.metaKey}var pl=class{_items;_activeItemIndex=ne(-1);_activeItem=ne(null);_wrap=!1;_typeaheadSubscription=we.EMPTY;_itemChangesSubscription;_vertical=!0;_horizontal=null;_allowedModifierKeys=[];_homeAndEnd=!1;_pageUpAndDown={enabled:!1,delta:10};_effectRef;_typeahead;_skipPredicateFn=n=>n.disabled;constructor(n,e){this._items=n,n instanceof En?this._itemChangesSubscription=n.changes.subscribe(i=>this._itemsChanged(i.toArray())):wt(n)&&(this._effectRef=gt(()=>this._itemsChanged(n()),{injector:e}))}tabOut=new D;change=new D;skipPredicate(n){return this._skipPredicateFn=n,this}withWrap(n=!0){return this._wrap=n,this}withVerticalOrientation(n=!0){return this._vertical=n,this}withHorizontalOrientation(n){return this._horizontal=n,this}withAllowedModifierKeys(n){return this._allowedModifierKeys=n,this}withTypeAhead(n=200){this._typeaheadSubscription.unsubscribe();let e=this._getItemsArray();return this._typeahead=new ml(e,{debounceInterval:typeof n=="number"?n:void 0,skipPredicate:i=>this._skipPredicateFn(i)}),this._typeaheadSubscription=this._typeahead.selectedItem.subscribe(i=>{this.setActiveItem(i)}),this}cancelTypeahead(){return this._typeahead?.reset(),this}withHomeAndEnd(n=!0){return this._homeAndEnd=n,this}withPageUpDown(n=!0,e=10){return this._pageUpAndDown={enabled:n,delta:e},this}setActiveItem(n){let e=this._activeItem();this.updateActiveItem(n),this._activeItem()!==e&&this.change.next(this._activeItemIndex())}onKeydown(n){let e=n.keyCode,o=["altKey","ctrlKey","metaKey","shiftKey"].every(r=>!n[r]||this._allowedModifierKeys.indexOf(r)>-1);switch(e){case 9:this.tabOut.next();return;case 40:if(this._vertical&&o){this.setNextItemActive();break}else return;case 38:if(this._vertical&&o){this.setPreviousItemActive();break}else return;case 39:if(this._horizontal&&o){this._horizontal==="rtl"?this.setPreviousItemActive():this.setNextItemActive();break}else return;case 37:if(this._horizontal&&o){this._horizontal==="rtl"?this.setNextItemActive():this.setPreviousItemActive();break}else return;case 36:if(this._homeAndEnd&&o){this.setFirstItemActive();break}else return;case 35:if(this._homeAndEnd&&o){this.setLastItemActive();break}else return;case 33:if(this._pageUpAndDown.enabled&&o){let r=this._activeItemIndex()-this._pageUpAndDown.delta;this._setActiveItemByIndex(r>0?r:0,1);break}else return;case 34:if(this._pageUpAndDown.enabled&&o){let r=this._activeItemIndex()+this._pageUpAndDown.delta,a=this._getItemsArray().length;this._setActiveItemByIndex(r<a?r:a-1,-1);break}else return;default:(o||Zo(n,"shiftKey"))&&this._typeahead?.handleKey(n);return}this._typeahead?.reset(),n.preventDefault()}get activeItemIndex(){return this._activeItemIndex()}get activeItem(){return this._activeItem()}isTyping(){return!!this._typeahead&&this._typeahead.isTyping()}setFirstItemActive(){this._setActiveItemByIndex(0,1)}setLastItemActive(){this._setActiveItemByIndex(this._getItemsArray().length-1,-1)}setNextItemActive(){this._activeItemIndex()<0?this.setFirstItemActive():this._setActiveItemByDelta(1)}setPreviousItemActive(){this._activeItemIndex()<0&&this._wrap?this.setLastItemActive():this._setActiveItemByDelta(-1)}updateActiveItem(n){let e=this._getItemsArray(),i=typeof n=="number"?n:e.indexOf(n),o=e[i];this._activeItem.set(o??null),this._activeItemIndex.set(i),this._typeahead?.setCurrentSelectedItemIndex(i)}destroy(){this._typeaheadSubscription.unsubscribe(),this._itemChangesSubscription?.unsubscribe(),this._effectRef?.destroy(),this._typeahead?.destroy(),this.tabOut.complete(),this.change.complete()}_setActiveItemByDelta(n){this._wrap?this._setActiveInWrapMode(n):this._setActiveInDefaultMode(n)}_setActiveInWrapMode(n){let e=this._getItemsArray();for(let i=1;i<=e.length;i++){let o=(this._activeItemIndex()+n*i+e.length)%e.length,r=e[o];if(!this._skipPredicateFn(r)){this.setActiveItem(o);return}}}_setActiveInDefaultMode(n){this._setActiveItemByIndex(this._activeItemIndex()+n,n)}_setActiveItemByIndex(n,e){let i=this._getItemsArray();if(i[n]){for(;this._skipPredicateFn(i[n]);)if(n+=e,!i[n])return;this.setActiveItem(n)}}_getItemsArray(){return wt(this._items)?this._items():this._items instanceof En?this._items.toArray():this._items}_itemsChanged(n){this._typeahead?.setItems(n);let e=this._activeItem();if(e){let i=n.indexOf(e);i>-1&&i!==this._activeItemIndex()&&(this._activeItemIndex.set(i),this._typeahead?.setCurrentSelectedItemIndex(i))}}};var ga=class extends pl{_origin="program";setFocusOrigin(n){return this._origin=n,this}setActiveItem(n){super.setActiveItem(n),this.activeItem&&this.activeItem.focus(this._origin)}};var C_=new Map,at=class t{_appId=m(xn);static _infix=`a${Math.floor(Math.random()*1e5).toString()}`;getId(n,e=!1){this._appId!=="ng"&&(n+=this._appId);let i=C_.get(n);return i===void 0?i=0:i++,C_.set(n,i),`${n}${e?t._infix+"-":""}${i}`}static \u0275fac=function(e){return new(e||t)};static \u0275prov=O({token:t,factory:t.\u0275fac})};var E_=" ";function ZM(t,n,e){let i=hl(t,n);e=e.trim(),!i.some(o=>o.trim()===e)&&(i.push(e),t.setAttribute(n,i.join(E_)))}function XM(t,n,e){let i=hl(t,n);e=e.trim();let o=i.filter(r=>r!==e);o.length?t.setAttribute(n,o.join(E_)):t.removeAttribute(n)}function hl(t,n){return t.getAttribute(n)?.match(/\S+/g)??[]}var D_="cdk-describedby-message",fl="cdk-describedby-host",Hp=0,I_=(()=>{class t{_platform=m(ue);_document=m(A);_messageRegistry=new Map;_messagesContainer=null;_id=`${Hp++}`;constructor(){m(Ke).load(Uc),this._id=m(xn)+"-"+Hp++}describe(e,i,o){if(!this._canBeDescribed(e,i))return;let r=Bp(i,o);typeof i!="string"?(S_(i,this._id),this._messageRegistry.set(r,{messageElement:i,referenceCount:0})):this._messageRegistry.has(r)||this._createMessageElement(i,o),this._isElementDescribedByMessage(e,r)||this._addMessageReference(e,r)}removeDescription(e,i,o){if(!i||!this._isElementNode(e))return;let r=Bp(i,o);if(this._isElementDescribedByMessage(e,r)&&this._removeMessageReference(e,r),typeof i=="string"){let a=this._messageRegistry.get(r);a&&a.referenceCount===0&&this._deleteMessageElement(r)}this._messagesContainer?.childNodes.length===0&&(this._messagesContainer.remove(),this._messagesContainer=null)}ngOnDestroy(){let e=this._document.querySelectorAll(`[${fl}="${this._id}"]`);for(let i=0;i<e.length;i++)this._removeCdkDescribedByReferenceIds(e[i]),e[i].removeAttribute(fl);this._messagesContainer?.remove(),this._messagesContainer=null,this._messageRegistry.clear()}_createMessageElement(e,i){let o=this._document.createElement("div");S_(o,this._id),o.textContent=e,i&&o.setAttribute("role",i),this._createMessagesContainer(),this._messagesContainer.appendChild(o),this._messageRegistry.set(Bp(e,i),{messageElement:o,referenceCount:0})}_deleteMessageElement(e){this._messageRegistry.get(e)?.messageElement?.remove(),this._messageRegistry.delete(e)}_createMessagesContainer(){if(this._messagesContainer)return;let e="cdk-describedby-message-container",i=this._document.querySelectorAll(`.${e}[platform="server"]`);for(let r=0;r<i.length;r++)i[r].remove();let o=this._document.createElement("div");o.style.visibility="hidden",o.classList.add(e),o.classList.add("cdk-visually-hidden"),this._platform.isBrowser||o.setAttribute("platform","server"),this._document.body.appendChild(o),this._messagesContainer=o}_removeCdkDescribedByReferenceIds(e){let i=hl(e,"aria-describedby").filter(o=>o.indexOf(D_)!=0);e.setAttribute("aria-describedby",i.join(" "))}_addMessageReference(e,i){let o=this._messageRegistry.get(i);ZM(e,"aria-describedby",o.messageElement.id),e.setAttribute(fl,this._id),o.referenceCount++}_removeMessageReference(e,i){let o=this._messageRegistry.get(i);o.referenceCount--,XM(e,"aria-describedby",o.messageElement.id),e.removeAttribute(fl)}_isElementDescribedByMessage(e,i){let o=hl(e,"aria-describedby"),r=this._messageRegistry.get(i),a=r&&r.messageElement.id;return!!a&&o.indexOf(a)!=-1}_canBeDescribed(e,i){if(!this._isElementNode(e))return!1;if(i&&typeof i=="object")return!0;let o=i==null?"":`${i}`.trim(),r=e.getAttribute("aria-label");return o?!r||r.trim()!==o:!1}_isElementNode(e){return e.nodeType===this._document.ELEMENT_NODE}static \u0275fac=function(i){return new(i||t)};static \u0275prov=O({token:t,factory:t.\u0275fac})}return t})();function Bp(t,n){return typeof t=="string"?`${n||""}/${t}`:t}function S_(t,n){t.id||(t.id=`${D_}-${n}-${Hp++}`)}var QM=new b("MATERIAL_ANIMATIONS"),M_=null;function JM(){return m(QM,{optional:!0})?.animationsDisabled||m(kr,{optional:!0})==="NoopAnimations"?"di-disabled":(M_??=m(Ko).matchMedia("(prefers-reduced-motion)").matches,M_?"reduced-motion":"enabled")}function Ze(){return JM()!=="enabled"}function Ue(t){return t==null?"":typeof t=="string"?t:`${t}px`}function Ot(t){return t!=null&&`${t}`!="false"}var Ft=(function(t){return t[t.FADING_IN=0]="FADING_IN",t[t.VISIBLE=1]="VISIBLE",t[t.FADING_OUT=2]="FADING_OUT",t[t.HIDDEN=3]="HIDDEN",t})(Ft||{}),zp=class{_renderer;element;config;_animationForciblyDisabledThroughCss;state=Ft.HIDDEN;constructor(n,e,i,o=!1){this._renderer=n,this.element=e,this.config=i,this._animationForciblyDisabledThroughCss=o}fadeOut(){this._renderer.fadeOutRipple(this)}},N_=Go({passive:!0,capture:!0}),Up=class{_events=new Map;addHandler(n,e,i,o){let r=this._events.get(e);if(r){let a=r.get(i);a?a.add(o):r.set(i,new Set([o]))}else this._events.set(e,new Map([[i,new Set([o])]])),n.runOutsideAngular(()=>{document.addEventListener(e,this._delegateEventHandler,N_)})}removeHandler(n,e,i){let o=this._events.get(n);if(!o)return;let r=o.get(e);r&&(r.delete(i),r.size===0&&o.delete(e),o.size===0&&(this._events.delete(n),document.removeEventListener(n,this._delegateEventHandler,N_)))}_delegateEventHandler=n=>{let e=vt(n);e&&this._events.get(n.type)?.forEach((i,o)=>{(o===e||o.contains(e))&&i.forEach(r=>r.handleEvent(n))})}},va={enterDuration:225,exitDuration:150},eN=800,T_=Go({passive:!0,capture:!0}),k_=["mousedown","touchstart"],A_=["mouseup","mouseleave","touchend","touchcancel"],tN=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=L({type:t,selectors:[["ng-component"]],hostAttrs:["mat-ripple-style-loader",""],decls:0,vars:0,template:function(i,o){},styles:[`.mat-ripple {
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
`],encapsulation:2})}return t})(),ba=class t{_target;_ngZone;_platform;_containerElement;_triggerElement=null;_isPointerDown=!1;_activeRipples=new Map;_mostRecentTransientRipple=null;_lastTouchStartEvent;_pointerUpEventsRegistered=!1;_containerRect=null;static _eventManager=new Up;constructor(n,e,i,o,r){this._target=n,this._ngZone=e,this._platform=o,o.isBrowser&&(this._containerElement=Ct(i)),r&&r.get(Ke).load(tN)}fadeInRipple(n,e,i={}){let o=this._containerRect=this._containerRect||this._containerElement.getBoundingClientRect(),r=C(C({},va),i.animation);i.centered&&(n=o.left+o.width/2,e=o.top+o.height/2);let a=i.radius||nN(n,e,o),s=n-o.left,c=e-o.top,l=r.enterDuration,d=document.createElement("div");d.classList.add("mat-ripple-element"),d.style.left=`${s-a}px`,d.style.top=`${c-a}px`,d.style.height=`${a*2}px`,d.style.width=`${a*2}px`,i.color!=null&&(d.style.backgroundColor=i.color),d.style.transitionDuration=`${l}ms`,this._containerElement.appendChild(d);let u=window.getComputedStyle(d),f=u.transitionProperty,p=u.transitionDuration,v=f==="none"||p==="0s"||p==="0s, 0s"||o.width===0&&o.height===0,x=new zp(this,d,i,v);d.style.transform="scale3d(1, 1, 1)",x.state=Ft.FADING_IN,i.persistent||(this._mostRecentTransientRipple=x);let E=null;return!v&&(l||r.exitDuration)&&this._ngZone.runOutsideAngular(()=>{let $=()=>{E&&(E.fallbackTimer=null),clearTimeout(bt),this._finishRippleTransition(x)},ie=()=>this._destroyRipple(x),bt=setTimeout(ie,l+100);d.addEventListener("transitionend",$),d.addEventListener("transitioncancel",ie),E={onTransitionEnd:$,onTransitionCancel:ie,fallbackTimer:bt}}),this._activeRipples.set(x,E),(v||!l)&&this._finishRippleTransition(x),x}fadeOutRipple(n){if(n.state===Ft.FADING_OUT||n.state===Ft.HIDDEN)return;let e=n.element,i=C(C({},va),n.config.animation);e.style.transitionDuration=`${i.exitDuration}ms`,e.style.opacity="0",n.state=Ft.FADING_OUT,(n._animationForciblyDisabledThroughCss||!i.exitDuration)&&this._finishRippleTransition(n)}fadeOutAll(){this._getActiveRipples().forEach(n=>n.fadeOut())}fadeOutAllNonPersistent(){this._getActiveRipples().forEach(n=>{n.config.persistent||n.fadeOut()})}setupTriggerEvents(n){let e=Ct(n);!this._platform.isBrowser||!e||e===this._triggerElement||(this._removeTriggerEvents(),this._triggerElement=e,k_.forEach(i=>{t._eventManager.addHandler(this._ngZone,i,e,this)}))}handleEvent(n){n.type==="mousedown"?this._onMousedown(n):n.type==="touchstart"?this._onTouchStart(n):this._onPointerUp(),this._pointerUpEventsRegistered||(this._ngZone.runOutsideAngular(()=>{A_.forEach(e=>{this._triggerElement.addEventListener(e,this,T_)})}),this._pointerUpEventsRegistered=!0)}_finishRippleTransition(n){n.state===Ft.FADING_IN?this._startFadeOutTransition(n):n.state===Ft.FADING_OUT&&this._destroyRipple(n)}_startFadeOutTransition(n){let e=n===this._mostRecentTransientRipple,{persistent:i}=n.config;n.state=Ft.VISIBLE,!i&&(!e||!this._isPointerDown)&&n.fadeOut()}_destroyRipple(n){let e=this._activeRipples.get(n)??null;this._activeRipples.delete(n),this._activeRipples.size||(this._containerRect=null),n===this._mostRecentTransientRipple&&(this._mostRecentTransientRipple=null),n.state=Ft.HIDDEN,e!==null&&(n.element.removeEventListener("transitionend",e.onTransitionEnd),n.element.removeEventListener("transitioncancel",e.onTransitionCancel),e.fallbackTimer!==null&&clearTimeout(e.fallbackTimer)),n.element.remove()}_onMousedown(n){let e=pa(n),i=this._lastTouchStartEvent&&Date.now()<this._lastTouchStartEvent+eN;!this._target.rippleDisabled&&!e&&!i&&(this._isPointerDown=!0,this.fadeInRipple(n.clientX,n.clientY,this._target.rippleConfig))}_onTouchStart(n){if(!this._target.rippleDisabled&&!fa(n)){this._lastTouchStartEvent=Date.now(),this._isPointerDown=!0;let e=n.changedTouches;if(e)for(let i=0;i<e.length;i++)this.fadeInRipple(e[i].clientX,e[i].clientY,this._target.rippleConfig)}}_onPointerUp(){this._isPointerDown&&(this._isPointerDown=!1,this._getActiveRipples().forEach(n=>{let e=n.state===Ft.VISIBLE||n.config.terminateOnPointerUp&&n.state===Ft.FADING_IN;!n.config.persistent&&e&&n.fadeOut()}))}_getActiveRipples(){return Array.from(this._activeRipples.keys())}_removeTriggerEvents(){let n=this._triggerElement;n&&(k_.forEach(e=>t._eventManager.removeHandler(e,n,this)),this._pointerUpEventsRegistered&&(A_.forEach(e=>n.removeEventListener(e,this,T_)),this._pointerUpEventsRegistered=!1))}};function nN(t,n,e){let i=Math.max(Math.abs(t-e.left),Math.abs(t-e.right)),o=Math.max(Math.abs(n-e.top),Math.abs(n-e.bottom));return Math.sqrt(i*i+o*o)}var ya=new b("mat-ripple-global-options"),gl=(()=>{class t{_elementRef=m(j);_animationsDisabled=Ze();color;unbounded=!1;centered=!1;radius=0;animation;get disabled(){return this._disabled}set disabled(e){e&&this.fadeOutAllNonPersistent(),this._disabled=e,this._setupTriggerEventsIfEnabled()}_disabled=!1;get trigger(){return this._trigger||this._elementRef.nativeElement}set trigger(e){this._trigger=e,this._setupTriggerEventsIfEnabled()}_trigger;_rippleRenderer;_globalOptions;_isInitialized=!1;constructor(){let e=m(N),i=m(ue),o=m(ya,{optional:!0}),r=m(te);this._globalOptions=o||{},this._rippleRenderer=new ba(this,e,this._elementRef,i,r)}ngOnInit(){this._isInitialized=!0,this._setupTriggerEventsIfEnabled()}ngOnDestroy(){this._rippleRenderer._removeTriggerEvents()}fadeOutAll(){this._rippleRenderer.fadeOutAll()}fadeOutAllNonPersistent(){this._rippleRenderer.fadeOutAllNonPersistent()}get rippleConfig(){return{centered:this.centered,radius:this.radius,color:this.color,animation:C(C(C({},this._globalOptions.animation),this._animationsDisabled?{enterDuration:0,exitDuration:0}:{}),this.animation),terminateOnPointerUp:this._globalOptions.terminateOnPointerUp}}get rippleDisabled(){return this.disabled||!!this._globalOptions.disabled}_setupTriggerEventsIfEnabled(){!this.disabled&&this._isInitialized&&this._rippleRenderer.setupTriggerEvents(this.trigger)}launch(e,i=0,o){return typeof e=="number"?this._rippleRenderer.fadeInRipple(e,i,C(C({},this.rippleConfig),o)):this._rippleRenderer.fadeInRipple(0,0,C(C({},this.rippleConfig),e))}static \u0275fac=function(i){return new(i||t)};static \u0275dir=F({type:t,selectors:[["","mat-ripple",""],["","matRipple",""]],hostAttrs:[1,"mat-ripple"],hostVars:2,hostBindings:function(i,o){i&2&&k("mat-ripple-unbounded",o.unbounded)},inputs:{color:[0,"matRippleColor","color"],unbounded:[0,"matRippleUnbounded","unbounded"],centered:[0,"matRippleCentered","centered"],radius:[0,"matRippleRadius","radius"],animation:[0,"matRippleAnimation","animation"],disabled:[0,"matRippleDisabled","disabled"],trigger:[0,"matRippleTrigger","trigger"]},exportAs:["matRipple"]})}return t})();var iN={capture:!0},oN=["focus","mousedown","mouseenter","touchstart"],$p="mat-ripple-loader-uninitialized",Gp="mat-ripple-loader-class-name",R_="mat-ripple-loader-centered",vl="mat-ripple-loader-disabled",bl=(()=>{class t{_document=m(A);_animationsDisabled=Ze();_globalRippleOptions=m(ya,{optional:!0});_platform=m(ue);_ngZone=m(N);_injector=m(te);_eventCleanups;_hosts=new Map;constructor(){let e=m(Ge).createRenderer(null,null);this._eventCleanups=this._ngZone.runOutsideAngular(()=>oN.map(i=>e.listen(this._document,i,this._onInteraction,iN)))}ngOnDestroy(){let e=this._hosts.keys();for(let i of e)this.destroyRipple(i);this._eventCleanups.forEach(i=>i())}configureRipple(e,i){e.setAttribute($p,this._globalRippleOptions?.namespace??""),(i.className||!e.hasAttribute(Gp))&&e.setAttribute(Gp,i.className||""),i.centered&&e.setAttribute(R_,""),i.disabled&&e.setAttribute(vl,"")}setDisabled(e,i){let o=this._hosts.get(e);o?(o.target.rippleDisabled=i,!i&&!o.hasSetUpEvents&&(o.hasSetUpEvents=!0,o.renderer.setupTriggerEvents(e))):i?e.setAttribute(vl,""):e.removeAttribute(vl)}_onInteraction=e=>{let i=vt(e);if(i instanceof HTMLElement){let o=i.closest(`[${$p}="${this._globalRippleOptions?.namespace??""}"]`);o&&this._createRipple(o)}};_createRipple(e){if(!this._document||this._hosts.has(e))return;e.querySelector(".mat-ripple")?.remove();let i=this._document.createElement("span");i.classList.add("mat-ripple",e.getAttribute(Gp)),e.append(i);let o=this._globalRippleOptions,r=this._animationsDisabled?0:o?.animation?.enterDuration??va.enterDuration,a=this._animationsDisabled?0:o?.animation?.exitDuration??va.exitDuration,s={rippleDisabled:this._animationsDisabled||o?.disabled||e.hasAttribute(vl),rippleConfig:{centered:e.hasAttribute(R_),terminateOnPointerUp:o?.terminateOnPointerUp,animation:{enterDuration:r,exitDuration:a}}},c=new ba(s,this._ngZone,i,this._platform,this._injector),l=!s.rippleDisabled;l&&c.setupTriggerEvents(e),this._hosts.set(e,{target:s,renderer:c,hasSetUpEvents:l}),e.removeAttribute($p)}destroyRipple(e){let i=this._hosts.get(e);i&&(i.renderer._removeTriggerEvents(),this._hosts.delete(e))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=O({token:t,factory:t.\u0275fac})}return t})();var Rn=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=L({type:t,selectors:[["structural-styles"]],decls:0,vars:0,template:function(i,o){},styles:[`.mat-focus-indicator {
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
`],encapsulation:2})}return t})();var rN=new b("MAT_BUTTON_CONFIG");function O_(t){return t==null?void 0:zi(t)}var Wp=(()=>{class t{_elementRef=m(j);_ngZone=m(N);_animationsDisabled=Ze();_config=m(rN,{optional:!0});_focusMonitor=m(Xt);_cleanupClick;_renderer=m(Ve);_rippleLoader=m(bl);_isAnchor;_isFab=!1;color;get disableRipple(){return this._disableRipple}set disableRipple(e){this._disableRipple=e,this._updateRippleDisabled()}_disableRipple=!1;get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._updateRippleDisabled()}_disabled=!1;ariaDisabled;disabledInteractive;tabIndex;set _tabindex(e){this.tabIndex=e}showProgress=re(!1,{transform:Y});constructor(){m(Ke).load(Rn);let e=this._elementRef.nativeElement;this._isAnchor=e.tagName==="A",this.disabledInteractive=this._config?.disabledInteractive??!1,this.color=this._config?.color??null,this._rippleLoader?.configureRipple(e,{className:"mat-mdc-button-ripple"})}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,!0),this._isAnchor&&this._setupAsAnchor()}ngOnDestroy(){this._cleanupClick?.(),this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement)}focus(e="program",i){e?this._focusMonitor.focusVia(this._elementRef.nativeElement,e,i):this._elementRef.nativeElement.focus(i)}_getAriaDisabled(){return this.ariaDisabled!=null?this.ariaDisabled:this._isAnchor?this.disabled||null:this.disabled&&this.disabledInteractive?!0:null}_getDisabledAttribute(){return this.disabledInteractive||!this.disabled?null:!0}_updateRippleDisabled(){this._rippleLoader?.setDisabled(this._elementRef.nativeElement,this.disableRipple||this.disabled)}_getTabIndex(){return this._isAnchor?this.disabled&&!this.disabledInteractive?-1:this.tabIndex:this.tabIndex}_setupAsAnchor(){this._cleanupClick=this._ngZone.runOutsideAngular(()=>this._renderer.listen(this._elementRef.nativeElement,"click",e=>{this.disabled&&(e.preventDefault(),e.stopImmediatePropagation())}))}static \u0275fac=function(i){return new(i||t)};static \u0275dir=F({type:t,hostAttrs:[1,"mat-mdc-button-base"],hostVars:15,hostBindings:function(i,o){i&2&&(ve("disabled",o._getDisabledAttribute())("aria-disabled",o._getAriaDisabled())("tabindex",o._getTabIndex()),xt(o.color?"mat-"+o.color:""),k("mat-mdc-button-progress-indicator-shown",o.showProgress())("mat-mdc-button-disabled",o.disabled)("mat-mdc-button-disabled-interactive",o.disabledInteractive)("mat-unthemed",!o.color)("_mat-animation-noopable",o._animationsDisabled))},inputs:{color:"color",disableRipple:[2,"disableRipple","disableRipple",Y],disabled:[2,"disabled","disabled",Y],ariaDisabled:[2,"aria-disabled","ariaDisabled",Y],disabledInteractive:[2,"disabledInteractive","disabledInteractive",Y],tabIndex:[2,"tabIndex","tabIndex",O_],_tabindex:[2,"tabindex","_tabindex",O_],showProgress:[1,"showProgress"]}})}return t})(),qp=(()=>{class t extends Wp{constructor(){super(),this._rippleLoader.configureRipple(this._elementRef.nativeElement,{centered:!0})}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=(function(){let e=["*",[["","progressIndicator",""]]],i=["*","[progressIndicator]"];function o(r,a){r&1&&(Qe(0,"div",1),q(1,1),rt())}return L({type:t,selectors:[["button","mat-icon-button",""],["a","mat-icon-button",""],["button","matIconButton",""],["a","matIconButton",""]],hostAttrs:[1,"mdc-icon-button","mat-mdc-icon-button"],exportAs:["matButton","matAnchor"],features:[We],ngContentSelectors:i,decls:5,vars:1,consts:[[1,"mat-mdc-button-persistent-ripple","mdc-icon-button__ripple"],[1,"mat-mdc-button-progress-indicator-container"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(a,s){a&1&&(Me(e),kt(0,"span",0),q(1),be(2,o,2,0,"div",1),kt(3,"span",2)(4,"span",3)),a&2&&(_(2),ye(s.showProgress()?2:-1))},styles:[`.mat-mdc-icon-button {
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
`],encapsulation:2})})()}return t})();var Xo=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=P({imports:[_e]})}return t})();var F_=new Map([["text",["mat-mdc-button"]],["filled",["mdc-button--unelevated","mat-mdc-unelevated-button"]],["elevated",["mdc-button--raised","mat-mdc-raised-button"]],["outlined",["mdc-button--outlined","mat-mdc-outlined-button"]],["tonal",["mat-tonal-button"]]]),yl=(()=>{class t extends Wp{get appearance(){return this._appearance}set appearance(e){this.setAppearance(e||this._config?.defaultAppearance||"text")}_appearance=null;constructor(){super();let e=aN(this._elementRef.nativeElement);e&&this.setAppearance(e)}setAppearance(e){if(e===this._appearance)return;let i=this._elementRef.nativeElement.classList,o=this._appearance?F_.get(this._appearance):null,r=F_.get(e);o&&i.remove(...o),i.add(...r),this._appearance=e}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=(function(){let e=[[["",8,"material-icons",3,"iconPositionEnd",""],["mat-icon",3,"iconPositionEnd",""],["","matButtonIcon","",3,"iconPositionEnd",""],["",8,"material-symbols-outlined",3,"iconPositionEnd",""],["",8,"material-symbols-rounded",3,"iconPositionEnd",""],["",8,"material-symbols-sharp",3,"iconPositionEnd",""]],"*",[["","iconPositionEnd","",8,"material-icons"],["mat-icon","iconPositionEnd",""],["","matButtonIcon","","iconPositionEnd",""],["","iconPositionEnd","",8,"material-symbols-outlined"],["","iconPositionEnd","",8,"material-symbols-rounded"],["","iconPositionEnd","",8,"material-symbols-sharp"]],[["","progressIndicator",""]]],i=[".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd]), .material-symbols-outlined:not([iconPositionEnd]), .material-symbols-rounded:not([iconPositionEnd]), .material-symbols-sharp:not([iconPositionEnd])","*",".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd], .material-symbols-outlined[iconPositionEnd], .material-symbols-rounded[iconPositionEnd], .material-symbols-sharp[iconPositionEnd]","[progressIndicator]"];function o(r,a){r&1&&(Qe(0,"div",2),q(1,3),rt())}return L({type:t,selectors:[["button","matButton",""],["a","matButton",""],["button","mat-button",""],["button","mat-raised-button",""],["button","mat-flat-button",""],["button","mat-stroked-button",""],["a","mat-button",""],["a","mat-raised-button",""],["a","mat-flat-button",""],["a","mat-stroked-button",""]],hostAttrs:[1,"mdc-button"],inputs:{appearance:[0,"matButton","appearance"]},exportAs:["matButton","matAnchor"],features:[We],ngContentSelectors:i,decls:8,vars:5,consts:[[1,"mat-mdc-button-persistent-ripple"],[1,"mdc-button__label"],[1,"mat-mdc-button-progress-indicator-container"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(a,s){a&1&&(Me(e),kt(0,"span",0),q(1),Qe(2,"span",1),q(3,1),rt(),q(4,2),be(5,o,2,0,"div",2),kt(6,"span",3)(7,"span",4)),a&2&&(k("mdc-button__ripple",!s._isFab)("mdc-fab__ripple",s._isFab),_(5),ye(s.showProgress()?5:-1))},styles:[`.mat-mdc-button-base {
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
`],encapsulation:2})})()}return t})();function aN(t){return t.hasAttribute("mat-raised-button")?"elevated":t.hasAttribute("mat-stroked-button")?"outlined":t.hasAttribute("mat-flat-button")?"filled":t.hasAttribute("mat-button")?"text":null}var _l=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=P({imports:[Xo,_e]})}return t})();var _a=class{_multiple;_emitChanges;compareWith;_selection=new Set;_deselectedToEmit=[];_selectedToEmit=[];_selected=null;get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}changed=new D;bulk={select:n=>this._select(n),deselect:n=>this._deselect(n),setSelection:n=>this._setSelection(n)};constructor(n=!1,e,i=!0,o){this._multiple=n,this._emitChanges=i,this.compareWith=o,e&&e.length&&(n?e.forEach(r=>this._markSelected(r)):this._markSelected(e[0]),this._selectedToEmit.length=0)}select(...n){return this._select(n)}deselect(...n){return this._deselect(n)}setSelection(...n){return this._setSelection(n)}toggle(n){return this.isSelected(n)?this.deselect(n):this.select(n)}clear(n=!0){this._unmarkAll();let e=this._hasQueuedChanges();return n&&this._emitChangeEvent(),e}isSelected(n){return this._selection.has(this._getConcreteValue(n))}isEmpty(){return this._selection.size===0}hasValue(){return!this.isEmpty()}sort(n){this._multiple&&this.selected&&this._selected.sort(n)}isMultipleSelection(){return this._multiple}_select(n){this._verifyValueAssignment(n),n.forEach(i=>this._markSelected(i));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}_deselect(n){this._verifyValueAssignment(n),n.forEach(i=>this._unmarkSelected(i));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}_setSelection(n){this._verifyValueAssignment(n);let e=this.selected,i=new Set(n.map(r=>this._getConcreteValue(r)));n.forEach(r=>this._markSelected(r)),e.filter(r=>!i.has(this._getConcreteValue(r,i))).forEach(r=>this._unmarkSelected(r));let o=this._hasQueuedChanges();return this._emitChangeEvent(),o}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[])}_markSelected(n){n=this._getConcreteValue(n),this.isSelected(n)||(this._multiple||this._unmarkAll(),this.isSelected(n)||this._selection.add(n),this._emitChanges&&this._selectedToEmit.push(n))}_unmarkSelected(n){n=this._getConcreteValue(n),this.isSelected(n)&&(this._selection.delete(n),this._emitChanges&&this._deselectedToEmit.push(n))}_unmarkAll(){this.isEmpty()||this._selection.forEach(n=>this._unmarkSelected(n))}_verifyValueAssignment(n){n.length>1&&this._multiple}_hasQueuedChanges(){return!!(this._deselectedToEmit.length||this._selectedToEmit.length)}_getConcreteValue(n,e){if(this.compareWith){e=e??this._selection;for(let i of e)if(this.compareWith(n,i))return i;return n}else return n}};var L_=(()=>{class t{_animationsDisabled=Ze();state="unchecked";disabled=!1;appearance="full";static \u0275fac=function(i){return new(i||t)};static \u0275cmp=L({type:t,selectors:[["mat-pseudo-checkbox"]],hostAttrs:[1,"mat-pseudo-checkbox"],hostVars:12,hostBindings:function(i,o){i&2&&k("mat-pseudo-checkbox-indeterminate",o.state==="indeterminate")("mat-pseudo-checkbox-checked",o.state==="checked")("mat-pseudo-checkbox-disabled",o.disabled)("mat-pseudo-checkbox-minimal",o.appearance==="minimal")("mat-pseudo-checkbox-full",o.appearance==="full")("_mat-animation-noopable",o._animationsDisabled)},inputs:{state:"state",disabled:"disabled",appearance:"appearance"},decls:0,vars:0,template:function(i,o){},styles:[`.mat-pseudo-checkbox {
  border-radius: 2px;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  position: relative;
  flex-shrink: 0;
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 0.1), background-color 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox::after {
  position: absolute;
  opacity: 0;
  content: "";
  border-bottom: 2px solid currentColor;
  transition: opacity 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-pseudo-checkbox._mat-animation-noopable::after {
  transition: none;
}

.mat-pseudo-checkbox-disabled {
  cursor: default;
}

.mat-pseudo-checkbox-indeterminate::after {
  left: 1px;
  opacity: 1;
  border-radius: 2px;
}

.mat-pseudo-checkbox-checked::after {
  left: 1px;
  border-left: 2px solid currentColor;
  transform: rotate(-45deg);
  opacity: 1;
  box-sizing: content-box;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  color: var(--%NS%mat-pseudo-checkbox-minimal-selected-checkmark-color, var(--%NS%mat-sys-primary));
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--%NS%mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}

.mat-pseudo-checkbox-full {
  border-color: var(--%NS%mat-pseudo-checkbox-full-unselected-icon-color, var(--%NS%mat-sys-on-surface-variant));
  border-width: 2px;
  border-style: solid;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-disabled {
  border-color: var(--%NS%mat-pseudo-checkbox-full-disabled-unselected-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate {
  background-color: var(--%NS%mat-pseudo-checkbox-full-selected-icon-color, var(--%NS%mat-sys-primary));
  border-color: transparent;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  color: var(--%NS%mat-pseudo-checkbox-full-selected-checkmark-color, var(--%NS%mat-sys-on-primary));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled {
  background-color: var(--%NS%mat-pseudo-checkbox-full-disabled-selected-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--%NS%mat-pseudo-checkbox-full-disabled-selected-checkmark-color, var(--%NS%mat-sys-surface));
}

.mat-pseudo-checkbox {
  width: 18px;
  height: 18px;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after {
  width: 14px;
  height: 6px;
  transform-origin: center;
  top: -4.2426406871px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  top: 8px;
  width: 16px;
}

.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after {
  width: 10px;
  height: 4px;
  transform-origin: center;
  top: -2.8284271247px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  top: 6px;
  width: 12px;
}
`],encapsulation:2})}return t})();var j_=new b("MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS",{providedIn:"root",factory:()=>({hideSingleSelectionIndicator:!1,hideMultipleSelectionIndicator:!1,disabledInteractive:!1})}),B_=new b("MatButtonToggleGroup"),sN={provide:Rt,useExisting:Oe(()=>Yp),multi:!0},wl=class{source;value;constructor(n,e){this.source=n,this.value=e}},Yp=(()=>{class t{_changeDetector=m(et);_dir=m(Zt,{optional:!0});_multiple=!1;_disabled=!1;_disabledInteractive=!1;_selectionModel;_rawValue;_controlValueAccessorChangeFn=()=>{};_onTouched=()=>{};_buttonToggles;appearance;get name(){return this._name}set name(e){this._name=e,this._markButtonsForCheck()}_name=m(at).getId("mat-button-toggle-group-");vertical=!1;get value(){let e=this._selectionModel?this._selectionModel.selected:[];return this.multiple?e.map(i=>i.value):e[0]?e[0].value:void 0}set value(e){this._setSelectionByValue(e),this.valueChange.emit(this.value)}valueChange=new de;get selected(){let e=this._selectionModel?this._selectionModel.selected:[];return this.multiple?e:e[0]||null}get multiple(){return this._multiple}set multiple(e){this._multiple=e,this._markButtonsForCheck()}get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._markButtonsForCheck()}get disabledInteractive(){return this._disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e,this._markButtonsForCheck()}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}change=new de;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._markButtonsForCheck()}_hideSingleSelectionIndicator;get hideMultipleSelectionIndicator(){return this._hideMultipleSelectionIndicator}set hideMultipleSelectionIndicator(e){this._hideMultipleSelectionIndicator=e,this._markButtonsForCheck()}_hideMultipleSelectionIndicator;constructor(){let e=m(j_,{optional:!0});this.appearance=e&&e.appearance?e.appearance:"standard",this._hideSingleSelectionIndicator=e?.hideSingleSelectionIndicator??!1,this._hideMultipleSelectionIndicator=e?.hideMultipleSelectionIndicator??!1}ngOnInit(){this._selectionModel=new _a(this.multiple,void 0,!1)}ngAfterContentInit(){this._selectionModel.select(...this._buttonToggles.filter(e=>e.checked)),this.multiple||this._initializeTabIndex()}writeValue(e){this.value=e,this._changeDetector.markForCheck()}registerOnChange(e){this._controlValueAccessorChangeFn=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e}_keydown(e){if(this.multiple||this.disabled||Zo(e))return;let o=e.target.id,r=this._buttonToggles.toArray().findIndex(s=>s.buttonId===o),a=null;switch(e.keyCode){case 32:case 13:a=this._buttonToggles.get(r)||null;break;case 38:a=this._getNextButton(r,-1);break;case 37:a=this._getNextButton(r,this.dir==="ltr"?-1:1);break;case 40:a=this._getNextButton(r,1);break;case 39:a=this._getNextButton(r,this.dir==="ltr"?1:-1);break;default:return}a&&(e.preventDefault(),a._onButtonClick(),a.focus())}_emitChangeEvent(e){let i=new wl(e,this.value);this._rawValue=i.value,this._controlValueAccessorChangeFn(i.value),this.change.emit(i)}_syncButtonToggle(e,i,o=!1,r=!1){!this.multiple&&this.selected&&!e.checked&&(this.selected.checked=!1),this._selectionModel?i?this._selectionModel.select(e):this._selectionModel.deselect(e):r=!0,r?Promise.resolve().then(()=>this._updateModelValue(e,o)):this._updateModelValue(e,o)}_isSelected(e){return this._selectionModel&&this._selectionModel.isSelected(e)}_isPrechecked(e){return typeof this._rawValue>"u"?!1:this.multiple&&Array.isArray(this._rawValue)?this._rawValue.some(i=>e.value!=null&&i===e.value):e.value===this._rawValue}_initializeTabIndex(){if(this._buttonToggles.forEach(e=>{e.tabIndex=-1}),this.selected)this.selected.tabIndex=0;else for(let e=0;e<this._buttonToggles.length;e++){let i=this._buttonToggles.get(e);if(!i.disabled){i.tabIndex=0;break}}}_getNextButton(e,i){let o=this._buttonToggles;for(let r=1;r<=o.length;r++){let a=(e+i*r+o.length)%o.length,s=o.get(a);if(s&&!s.disabled)return s}return null}_setSelectionByValue(e){if(this._rawValue=e,!this._buttonToggles)return;let i=this._buttonToggles.toArray();if(this.multiple&&e?(Array.isArray(e),this._clearSelection(),e.forEach(o=>this._selectValue(o,i))):(this._clearSelection(),this._selectValue(e,i)),!this.multiple&&i.every(o=>o.tabIndex===-1)){for(let o of i)if(!o.disabled){o.tabIndex=0;break}}}_clearSelection(){this._selectionModel.clear(),this._buttonToggles.forEach(e=>{e.checked=!1,this.multiple||(e.tabIndex=-1)})}_selectValue(e,i){for(let o of i)if(o.value===e){o.checked=!0,this._selectionModel.select(o),this.multiple||(o.tabIndex=0);break}}_updateModelValue(e,i){i&&this._emitChangeEvent(e),this.valueChange.emit(this.value)}_markButtonsForCheck(){this._buttonToggles?.forEach(e=>e._markForCheck())}static \u0275fac=function(i){return new(i||t)};static \u0275dir=F({type:t,selectors:[["mat-button-toggle-group"]],contentQueries:function(i,o,r){if(i&1&&Yt(r,Cl,5),i&2){let a;Z(a=X())&&(o._buttonToggles=a)}},hostAttrs:[1,"mat-button-toggle-group"],hostVars:6,hostBindings:function(i,o){i&1&&oe("keydown",function(a){return o._keydown(a)}),i&2&&(ve("role",o.multiple?"group":"radiogroup")("aria-disabled",o.disabled),k("mat-button-toggle-vertical",o.vertical)("mat-button-toggle-group-appearance-standard",o.appearance==="standard"))},inputs:{appearance:"appearance",name:"name",vertical:[2,"vertical","vertical",Y],value:"value",multiple:[2,"multiple","multiple",Y],disabled:[2,"disabled","disabled",Y],disabledInteractive:[2,"disabledInteractive","disabledInteractive",Y],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",Y],hideMultipleSelectionIndicator:[2,"hideMultipleSelectionIndicator","hideMultipleSelectionIndicator",Y]},outputs:{valueChange:"valueChange",change:"change"},exportAs:["matButtonToggleGroup"],features:[Se([sN,{provide:B_,useExisting:t}])]})}return t})(),Cl=(()=>{class t{_changeDetectorRef=m(et);_elementRef=m(j);_focusMonitor=m(Xt);_idGenerator=m(at);_animationDisabled=Ze();_checked=!1;ariaLabel;ariaLabelledby=null;_buttonElement;buttonToggleGroup;get buttonId(){return`${this.id}-button`}id;name;value;get tabIndex(){return this._tabIndex()}set tabIndex(e){this._tabIndex.set(e)}_tabIndex;disableRipple=!1;get appearance(){return this.buttonToggleGroup?this.buttonToggleGroup.appearance:this._appearance}set appearance(e){this._appearance=e}_appearance;get checked(){return this.buttonToggleGroup?this.buttonToggleGroup._isSelected(this):this._checked}set checked(e){e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&this.buttonToggleGroup._syncButtonToggle(this,this._checked),this._changeDetectorRef.markForCheck())}get disabled(){return this._disabled||this.buttonToggleGroup&&this.buttonToggleGroup.disabled}set disabled(e){this._disabled=e}_disabled=!1;get disabledInteractive(){return this._disabledInteractive||this.buttonToggleGroup!==null&&this.buttonToggleGroup.disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e}_disabledInteractive;change=new de;constructor(){m(Ke).load(Rn);let e=m(B_,{optional:!0}),i=m(new Kn("tabindex"),{optional:!0})||"",o=m(j_,{optional:!0});this._tabIndex=ne(parseInt(i)||0),this.buttonToggleGroup=e,this._appearance=o&&o.appearance?o.appearance:"standard",this._disabledInteractive=o?.disabledInteractive??!1}ngOnInit(){let e=this.buttonToggleGroup;this.id=this.id||this._idGenerator.getId("mat-button-toggle-"),e&&(e._isPrechecked(this)?this.checked=!0:e._isSelected(this)!==this._checked&&e._syncButtonToggle(this,this._checked))}ngAfterViewInit(){this._animationDisabled||this._elementRef.nativeElement.classList.add("mat-button-toggle-animations-enabled"),this._focusMonitor.monitor(this._elementRef,!0)}ngOnDestroy(){let e=this.buttonToggleGroup;this._focusMonitor.stopMonitoring(this._elementRef),e&&e._isSelected(this)&&e._syncButtonToggle(this,!1,!1,!0)}focus(e){this._buttonElement.nativeElement.focus(e)}_onButtonClick(){if(this.disabled)return;let e=this.isSingleSelector()?!0:!this._checked;if(e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&(this.buttonToggleGroup._syncButtonToggle(this,this._checked,!0),this.buttonToggleGroup._onTouched())),this.isSingleSelector()){let i=this.buttonToggleGroup._buttonToggles.find(o=>o.tabIndex===0);i&&(i.tabIndex=-1),this.tabIndex=0}this.change.emit(new wl(this,this.value))}_markForCheck(){this._changeDetectorRef.markForCheck()}_getButtonName(){return this.isSingleSelector()?this.buttonToggleGroup.name:this.name||null}isSingleSelector(){return this.buttonToggleGroup&&!this.buttonToggleGroup.multiple}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=(function(){let e=["button"],i=["*"];function o(r,a){if(r&1&&(h(0,"div",2),fe(1,"mat-pseudo-checkbox",6),g()),r&2){let s=Be();_(),H("disabled",s.disabled)}}return L({type:t,selectors:[["mat-button-toggle"]],viewQuery:function(a,s){if(a&1&&dt(e,5),a&2){let c;Z(c=X())&&(s._buttonElement=c.first)}},hostAttrs:["role","presentation",1,"mat-button-toggle"],hostVars:14,hostBindings:function(a,s){a&1&&oe("focus",function(){return s.focus()}),a&2&&(ve("aria-label",null)("aria-labelledby",null)("id",s.id)("name",null),k("mat-button-toggle-standalone",!s.buttonToggleGroup)("mat-button-toggle-checked",s.checked)("mat-button-toggle-disabled",s.disabled)("mat-button-toggle-disabled-interactive",s.disabledInteractive)("mat-button-toggle-appearance-standard",s.appearance==="standard"))},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],id:"id",name:"name",value:"value",tabIndex:"tabIndex",disableRipple:[2,"disableRipple","disableRipple",Y],appearance:"appearance",checked:[2,"checked","checked",Y],disabled:[2,"disabled","disabled",Y],disabledInteractive:[2,"disabledInteractive","disabledInteractive",Y]},outputs:{change:"change"},exportAs:["matButtonToggle"],ngContentSelectors:i,decls:7,vars:13,consts:[["button",""],["type","button",1,"mat-button-toggle-button","mat-focus-indicator",3,"click","id","disabled"],[1,"mat-button-toggle-checkbox-wrapper"],[1,"mat-button-toggle-label-content"],[1,"mat-button-toggle-focus-overlay"],["matRipple","",1,"mat-button-toggle-ripple",3,"matRippleTrigger","matRippleDisabled"],["state","checked","aria-hidden","true","appearance","minimal",3,"disabled"]],template:function(a,s){if(a&1&&(Me(),h(0,"button",1,0),oe("click",function(){return s._onButtonClick()}),be(2,o,2,1,"div",2),h(3,"span",3),q(4),g()(),fe(5,"span",4)(6,"span",5)),a&2){let c=Yn(1);H("id",s.buttonId)("disabled",s.disabled&&!s.disabledInteractive||null),ve("role",s.isSingleSelector()?"radio":"button")("tabindex",s.disabled&&!s.disabledInteractive?-1:s.tabIndex)("aria-pressed",s.isSingleSelector()?null:s.checked)("aria-checked",s.isSingleSelector()?s.checked:null)("name",s._getButtonName())("aria-label",s.ariaLabel)("aria-labelledby",s.ariaLabelledby)("aria-disabled",s.disabled&&s.disabledInteractive?"true":null),_(2),ye(s.buttonToggleGroup&&(!s.buttonToggleGroup.multiple&&!s.buttonToggleGroup.hideSingleSelectionIndicator||s.buttonToggleGroup.multiple&&!s.buttonToggleGroup.hideMultipleSelectionIndicator)?2:-1),_(4),H("matRippleTrigger",c)("matRippleDisabled",s.disableRipple||s.disabled)}},dependencies:[gl,L_],styles:[`.mat-button-toggle-standalone,
.mat-button-toggle-group {
  position: relative;
  display: inline-flex;
  flex-direction: row;
  white-space: nowrap;
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
  border-radius: var(--%NS%mat-button-toggle-legacy-shape);
  transform: translateZ(0);
}
.mat-button-toggle-standalone:not([class*=mat-elevation-z]),
.mat-button-toggle-group:not([class*=mat-elevation-z]) {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
@media (forced-colors: active) {
  .mat-button-toggle-standalone,
  .mat-button-toggle-group {
    outline: solid 1px;
  }
}

.mat-button-toggle-standalone.mat-button-toggle-appearance-standard,
.mat-button-toggle-group-appearance-standard {
  border-radius: var(--%NS%mat-button-toggle-shape, var(--%NS%mat-sys-corner-extra-large));
  border: solid 1px var(--%NS%mat-button-toggle-divider-color, var(--%NS%mat-sys-outline));
}
.mat-button-toggle-standalone.mat-button-toggle-appearance-standard .mat-pseudo-checkbox,
.mat-button-toggle-group-appearance-standard .mat-pseudo-checkbox {
  --%NS%mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--%NS%mat-button-toggle-selected-state-text-color, var(--%NS%mat-sys-on-secondary-container));
}
.mat-button-toggle-standalone.mat-button-toggle-appearance-standard:not([class*=mat-elevation-z]),
.mat-button-toggle-group-appearance-standard:not([class*=mat-elevation-z]) {
  box-shadow: none;
}
@media (forced-colors: active) {
  .mat-button-toggle-standalone.mat-button-toggle-appearance-standard,
  .mat-button-toggle-group-appearance-standard {
    outline: 0;
  }
}

.mat-button-toggle-vertical {
  flex-direction: column;
}
.mat-button-toggle-vertical .mat-button-toggle-label-content {
  display: block;
}

.mat-button-toggle {
  white-space: nowrap;
  position: relative;
  color: var(--%NS%mat-button-toggle-legacy-text-color);
  font-family: var(--%NS%mat-button-toggle-legacy-label-text-font);
  font-size: var(--%NS%mat-button-toggle-legacy-label-text-size);
  line-height: var(--%NS%mat-button-toggle-legacy-label-text-line-height);
  font-weight: var(--%NS%mat-button-toggle-legacy-label-text-weight);
  letter-spacing: var(--%NS%mat-button-toggle-legacy-label-text-tracking);
  --%NS%mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--%NS%mat-button-toggle-legacy-selected-state-text-color);
}
.mat-button-toggle.cdk-keyboard-focused .mat-button-toggle-focus-overlay {
  opacity: var(--%NS%mat-button-toggle-legacy-focus-state-layer-opacity);
}
.mat-button-toggle .mat-icon svg {
  vertical-align: top;
}

.mat-button-toggle-checkbox-wrapper {
  display: inline-block;
  justify-content: flex-start;
  align-items: center;
  width: 0;
  height: 18px;
  line-height: 18px;
  overflow: hidden;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translate3d(0, -50%, 0);
}
[dir=rtl] .mat-button-toggle-checkbox-wrapper {
  left: auto;
  right: 16px;
}
.mat-button-toggle-appearance-standard .mat-button-toggle-checkbox-wrapper {
  left: 12px;
}
[dir=rtl] .mat-button-toggle-appearance-standard .mat-button-toggle-checkbox-wrapper {
  left: auto;
  right: 12px;
}
.mat-button-toggle-checked .mat-button-toggle-checkbox-wrapper {
  width: 18px;
}
.mat-button-toggle-animations-enabled .mat-button-toggle-checkbox-wrapper {
  transition: width 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-button-toggle-vertical .mat-button-toggle-checkbox-wrapper {
  transition: none;
}

.mat-button-toggle-checked {
  color: var(--%NS%mat-button-toggle-legacy-selected-state-text-color);
  background-color: var(--%NS%mat-button-toggle-legacy-selected-state-background-color);
}

.mat-button-toggle-disabled {
  pointer-events: none;
  color: var(--%NS%mat-button-toggle-legacy-disabled-state-text-color);
  background-color: var(--%NS%mat-button-toggle-legacy-disabled-state-background-color);
  --%NS%mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color: var(--%NS%mat-button-toggle-legacy-disabled-state-text-color);
}
.mat-button-toggle-disabled.mat-button-toggle-checked {
  background-color: var(--%NS%mat-button-toggle-legacy-disabled-selected-state-background-color);
}

.mat-button-toggle-disabled-interactive {
  pointer-events: auto;
}

.mat-button-toggle-appearance-standard {
  color: var(--%NS%mat-button-toggle-text-color, var(--%NS%mat-sys-on-surface));
  background-color: var(--%NS%mat-button-toggle-background-color, transparent);
  font-family: var(--%NS%mat-button-toggle-label-text-font, var(--%NS%mat-sys-label-large-font));
  font-size: var(--%NS%mat-button-toggle-label-text-size, var(--%NS%mat-sys-label-large-size));
  line-height: var(--%NS%mat-button-toggle-label-text-line-height, var(--%NS%mat-sys-label-large-line-height));
  font-weight: var(--%NS%mat-button-toggle-label-text-weight, var(--%NS%mat-sys-label-large-weight));
  letter-spacing: var(--%NS%mat-button-toggle-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));
}
.mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard + .mat-button-toggle-appearance-standard {
  border-left: solid 1px var(--%NS%mat-button-toggle-divider-color, var(--%NS%mat-sys-outline));
}
[dir=rtl] .mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard + .mat-button-toggle-appearance-standard {
  border-left: none;
  border-right: solid 1px var(--%NS%mat-button-toggle-divider-color, var(--%NS%mat-sys-outline));
}
.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle-appearance-standard + .mat-button-toggle-appearance-standard {
  border-left: none;
  border-right: none;
  border-top: solid 1px var(--%NS%mat-button-toggle-divider-color, var(--%NS%mat-sys-outline));
}
.mat-button-toggle-appearance-standard.mat-button-toggle-checked {
  color: var(--%NS%mat-button-toggle-selected-state-text-color, var(--%NS%mat-sys-on-secondary-container));
  background-color: var(--%NS%mat-button-toggle-selected-state-background-color, var(--%NS%mat-sys-secondary-container));
}
.mat-button-toggle-appearance-standard.mat-button-toggle-disabled {
  color: var(--%NS%mat-button-toggle-disabled-state-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
  background-color: var(--%NS%mat-button-toggle-disabled-state-background-color, transparent);
}
.mat-button-toggle-appearance-standard.mat-button-toggle-disabled .mat-pseudo-checkbox {
  --%NS%mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color: var(--%NS%mat-button-toggle-disabled-selected-state-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-button-toggle-appearance-standard.mat-button-toggle-disabled.mat-button-toggle-checked {
  color: var(--%NS%mat-button-toggle-disabled-selected-state-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
  background-color: var(--%NS%mat-button-toggle-disabled-selected-state-background-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));
}
.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay {
  background-color: var(--%NS%mat-button-toggle-state-layer-color, var(--%NS%mat-sys-on-surface));
}
.mat-button-toggle-appearance-standard:hover .mat-button-toggle-focus-overlay {
  opacity: var(--%NS%mat-button-toggle-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-button-toggle-appearance-standard.cdk-keyboard-focused .mat-button-toggle-focus-overlay {
  opacity: var(--%NS%mat-button-toggle-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
@media (hover: none) {
  .mat-button-toggle-appearance-standard:hover .mat-button-toggle-focus-overlay {
    display: none;
  }
}

.mat-button-toggle-label-content {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  padding: 0 16px;
  line-height: var(--%NS%mat-button-toggle-legacy-height);
  position: relative;
}
.mat-button-toggle-appearance-standard .mat-button-toggle-label-content {
  padding: 0 12px;
  line-height: var(--%NS%mat-button-toggle-height, 40px);
}

.mat-button-toggle-label-content > * {
  vertical-align: middle;
}

.mat-button-toggle-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  background-color: var(--%NS%mat-button-toggle-legacy-state-layer-color);
}

@media (forced-colors: active) {
  .mat-button-toggle-checked .mat-button-toggle-focus-overlay {
    border-bottom: solid 500px;
    opacity: 0.5;
    height: 0;
  }
  .mat-button-toggle-checked:hover .mat-button-toggle-focus-overlay {
    opacity: 0.6;
  }
  .mat-button-toggle-checked.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay {
    border-bottom: solid 500px;
  }
}
.mat-button-toggle .mat-button-toggle-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}

.mat-button-toggle-button {
  border: 0;
  background: none;
  color: inherit;
  padding: 0;
  margin: 0;
  font: inherit;
  outline: none;
  width: 100%;
  cursor: pointer;
}
.mat-button-toggle-animations-enabled .mat-button-toggle-button {
  transition: padding 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-button-toggle-vertical .mat-button-toggle-button {
  transition: none;
}
.mat-button-toggle-disabled .mat-button-toggle-button {
  cursor: default;
}
.mat-button-toggle-button::-moz-focus-inner {
  border: 0;
}
.mat-button-toggle-checked .mat-button-toggle-button:has(.mat-button-toggle-checkbox-wrapper) {
  padding-left: 30px;
}
[dir=rtl] .mat-button-toggle-checked .mat-button-toggle-button:has(.mat-button-toggle-checkbox-wrapper) {
  padding-left: 0;
  padding-right: 30px;
}

.mat-button-toggle-standalone.mat-button-toggle-appearance-standard {
  --%NS%mat-focus-indicator-border-radius: var(--%NS%mat-button-toggle-shape, var(--%NS%mat-sys-corner-extra-large));
}

.mat-button-toggle-group-appearance-standard:not(.mat-button-toggle-vertical) .mat-button-toggle:last-of-type .mat-button-toggle-button::before {
  border-top-right-radius: var(--%NS%mat-button-toggle-shape, var(--%NS%mat-sys-corner-extra-large));
  border-bottom-right-radius: var(--%NS%mat-button-toggle-shape, var(--%NS%mat-sys-corner-extra-large));
}
.mat-button-toggle-group-appearance-standard:not(.mat-button-toggle-vertical) .mat-button-toggle:first-of-type .mat-button-toggle-button::before {
  border-top-left-radius: var(--%NS%mat-button-toggle-shape, var(--%NS%mat-sys-corner-extra-large));
  border-bottom-left-radius: var(--%NS%mat-button-toggle-shape, var(--%NS%mat-sys-corner-extra-large));
}

.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle:last-of-type .mat-button-toggle-button::before {
  border-bottom-right-radius: var(--%NS%mat-button-toggle-shape, var(--%NS%mat-sys-corner-extra-large));
  border-bottom-left-radius: var(--%NS%mat-button-toggle-shape, var(--%NS%mat-sys-corner-extra-large));
}
.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle:first-of-type .mat-button-toggle-button::before {
  border-top-right-radius: var(--%NS%mat-button-toggle-shape, var(--%NS%mat-sys-corner-extra-large));
  border-top-left-radius: var(--%NS%mat-button-toggle-shape, var(--%NS%mat-sys-corner-extra-large));
}
`],encapsulation:2})})()}return t})(),H_=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=P({imports:[Xo,Cl,_e]})}return t})();var lN=20,Qo=(()=>{class t{_ngZone=m(N);_platform=m(ue);_renderer=m(Ge).createRenderer(null,null);_cleanupGlobalListener;_scrolled=new D;_scrolledCount=0;scrollContainers=new Map;register(e){this.scrollContainers.has(e)||this.scrollContainers.set(e,e.elementScrolled().subscribe(()=>this._scrolled.next(e)))}deregister(e){let i=this.scrollContainers.get(e);i&&(i.unsubscribe(),this.scrollContainers.delete(e))}scrolled(e=lN){return this._platform.isBrowser?new K(i=>{this._cleanupGlobalListener||(this._cleanupGlobalListener=this._ngZone.runOutsideAngular(()=>this._renderer.listen("document","scroll",()=>this._scrolled.next())));let o=e>0?this._scrolled.pipe(ls(e)).subscribe(i):this._scrolled.subscribe(i);return this._scrolledCount++,()=>{o.unsubscribe(),this._scrolledCount--,this._scrolledCount||(this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0)}}):yt()}ngOnDestroy(){this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0,this.scrollContainers.forEach((e,i)=>this.deregister(i)),this._scrolled.complete()}ancestorScrolled(e,i){let o=this.getAncestorScrollContainers(e);return this.scrolled(i).pipe(mt(r=>!r||o.indexOf(r)>-1))}getAncestorScrollContainers(e){let i=[];return this.scrollContainers.forEach((o,r)=>{this._targetContainsElement(r,e)&&i.push(r)}),i}_targetContainsElement(e,i){let o=Ct(i),r=e.getElementRef().nativeElement;do if(o==r)return!0;while(o=o.parentElement);return!1}static \u0275fac=function(i){return new(i||t)};static \u0275prov=O({token:t,factory:t.\u0275fac})}return t})();var dN=20,Jo=(()=>{class t{_platform=m(ue);_listeners;_viewportSize=null;_change=new D;_document=m(A);constructor(){let e=m(N),i=m(Ge).createRenderer(null,null);e.runOutsideAngular(()=>{if(this._platform.isBrowser){let o=r=>this._change.next(r);this._listeners=[i.listen("window","resize",o),i.listen("window","orientationchange",o)]}this.change().subscribe(()=>this._viewportSize=null)})}ngOnDestroy(){this._listeners?.forEach(e=>e()),this._change.complete()}getViewportSize(){this._viewportSize||this._updateViewportSize();let e={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),e}getViewportRect(){let e=this.getViewportScrollPosition(),{width:i,height:o}=this.getViewportSize();return{top:e.top,left:e.left,bottom:e.top+o,right:e.left+i,height:o,width:i}}getViewportScrollPosition(){if(!this._platform.isBrowser)return{top:0,left:0};let e=this._document,i=this._getWindow(),o=e.documentElement,r=o.getBoundingClientRect(),a=-r.top||e.body?.scrollTop||i.scrollY||o.scrollTop||0,s=-r.left||e.body?.scrollLeft||i.scrollX||o.scrollLeft||0;return{top:a,left:s}}change(e=dN){return e>0?this._change.pipe(ls(e)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){let e=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:e.innerWidth,height:e.innerHeight}:{width:0,height:0}}static \u0275fac=function(i){return new(i||t)};static \u0275prov=O({token:t,factory:t.\u0275fac})}return t})();var wa=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=P({})}return t})(),Kp=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=P({imports:[_e,wa,_e,wa]})}return t})();var xa=class{_attachedHost=null;attach(n){return this._attachedHost=n,n.attach(this)}detach(){let n=this._attachedHost;n!=null&&(this._attachedHost=null,n.detach())}get isAttached(){return this._attachedHost!=null}setAttachedHost(n){this._attachedHost=n}},Yi=class extends xa{component;viewContainerRef;injector;projectableNodes;bindings;directives;constructor(n,e,i,o,r,a){super(),this.component=n,this.viewContainerRef=e,this.injector=i,this.projectableNodes=o,this.bindings=r||null,this.directives=a||null}},Sl=class extends xa{templateRef;viewContainerRef;context;injector;constructor(n,e,i,o){super(),this.templateRef=n,this.viewContainerRef=e,this.context=i,this.injector=o}get origin(){return this.templateRef.elementRef}attach(n,e=this.context){return this.context=e,super.attach(n)}detach(){return this.context=void 0,super.detach()}},Zp=class extends xa{element;constructor(n){super(),this.element=n instanceof j?n.nativeElement:n}},Xp=class{_attachedPortal=null;_disposeFn=null;_isDisposed=!1;hasAttached(){return!!this._attachedPortal}attach(n){if(n instanceof Yi)return this._attachedPortal=n,this.attachComponentPortal(n);if(n instanceof Sl)return this._attachedPortal=n,this.attachTemplatePortal(n);if(this.attachDomPortal&&n instanceof Zp)return this._attachedPortal=n,this.attachDomPortal(n)}attachDomPortal=null;detach(){this._attachedPortal&&(this._attachedPortal.setAttachedHost(null),this._attachedPortal=null),this._invokeDisposeFn()}dispose(){this.hasAttached()&&this.detach(),this._invokeDisposeFn(),this._isDisposed=!0}setDisposeFn(n){this._disposeFn=n}_invokeDisposeFn(){this._disposeFn&&(this._disposeFn(),this._disposeFn=null)}},El=class extends Xp{outletElement;_appRef;_defaultInjector;constructor(n,e,i){super(),this.outletElement=n,this._appRef=e,this._defaultInjector=i}attachComponentPortal(n){let e;if(n.viewContainerRef){let i=n.injector||n.viewContainerRef.injector,o=i.get(Pi,null,{optional:!0})||void 0;e=n.viewContainerRef.createComponent(n.component,{index:n.viewContainerRef.length,injector:i,ngModuleRef:o,projectableNodes:n.projectableNodes||void 0,bindings:n.bindings||void 0,directives:n.directives||void 0}),this.setDisposeFn(()=>e.destroy())}else{let i=this._appRef,o=n.injector||this._defaultInjector||te.NULL,r=o.get($e,i.injector);e=Tc(n.component,{elementInjector:o,environmentInjector:r,projectableNodes:n.projectableNodes||void 0,bindings:n.bindings||void 0,directives:n.directives||void 0}),i.attachView(e.hostView),this.setDisposeFn(()=>{i.viewCount>0&&i.detachView(e.hostView),e.destroy()})}return this.outletElement.appendChild(this._getComponentRootNode(e)),this._attachedPortal=n,e}attachTemplatePortal(n){let e=n.viewContainerRef,i=e.createEmbeddedView(n.templateRef,n.context,{injector:n.injector});return i.rootNodes.forEach(o=>this.outletElement.appendChild(o)),i.detectChanges(),this.setDisposeFn(()=>{let o=e.indexOf(i);o!==-1&&e.remove(o)}),this._attachedPortal=n,i}attachDomPortal=n=>{let e=n.element;e.parentNode;let i=this.outletElement.ownerDocument.createComment("dom-portal");e.parentNode.insertBefore(i,e),this.outletElement.appendChild(e),this._attachedPortal=n,super.setDisposeFn(()=>{i.parentNode&&i.parentNode.replaceChild(e,i)})};dispose(){super.dispose(),this.outletElement.remove()}_getComponentRootNode(n){return n.hostView.rootNodes[0]}};var z_=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=P({})}return t})();var U_=Xy();function Z_(t){return new Dl(t.get(Jo),t.get(A))}var Dl=class{_viewportRuler;_previousHTMLStyles={top:"",left:""};_previousScrollPosition;_isEnabled=!1;_document;constructor(n,e){this._viewportRuler=n,this._document=e}attach(){}enable(){if(this._canBeEnabled()){let n=this._document.documentElement;this._previousScrollPosition=this._viewportRuler.getViewportScrollPosition(),this._previousHTMLStyles.left=n.style.left||"",this._previousHTMLStyles.top=n.style.top||"",n.style.left=Ue(-this._previousScrollPosition.left),n.style.top=Ue(-this._previousScrollPosition.top),n.classList.add("cdk-global-scrollblock"),this._isEnabled=!0}}disable(){if(this._isEnabled){let n=this._document.documentElement,e=this._document.body,i=n.style,o=e.style,r=i.scrollBehavior||"",a=o.scrollBehavior||"";this._isEnabled=!1,i.left=this._previousHTMLStyles.left,i.top=this._previousHTMLStyles.top,n.classList.remove("cdk-global-scrollblock"),U_&&(i.scrollBehavior=o.scrollBehavior="auto"),window.scroll(this._previousScrollPosition.left,this._previousScrollPosition.top),U_&&(i.scrollBehavior=r,o.scrollBehavior=a)}}_canBeEnabled(){if(this._document.documentElement.classList.contains("cdk-global-scrollblock")||this._isEnabled)return!1;let e=this._document.documentElement,i=this._viewportRuler.getViewportSize();return e.scrollHeight>i.height||e.scrollWidth>i.width}};function X_(t,n){return new Il(t.get(Qo),t.get(N),t.get(Jo),n)}var Il=class{_scrollDispatcher;_ngZone;_viewportRuler;_config;_scrollSubscription=null;_overlayRef;_initialScrollPosition;constructor(n,e,i,o){this._scrollDispatcher=n,this._ngZone=e,this._viewportRuler=i,this._config=o}attach(n){this._overlayRef,this._overlayRef=n}enable(){if(this._scrollSubscription)return;let n=this._scrollDispatcher.scrolled(0).pipe(mt(e=>!e||!this._overlayRef.overlayElement.contains(e.getElementRef().nativeElement)));this._config&&this._config.threshold&&this._config.threshold>1?(this._initialScrollPosition=this._viewportRuler.getViewportScrollPosition().top,this._scrollSubscription=n.subscribe(()=>{let e=this._viewportRuler.getViewportScrollPosition().top;Math.abs(e-this._initialScrollPosition)>this._config.threshold?this._detach():this._overlayRef.updatePosition()})):this._scrollSubscription=n.subscribe(this._detach)}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}_detach=()=>{this.disable(),this._overlayRef.hasAttached()&&this._ngZone.run(()=>this._overlayRef.detach())}};var Ca=class{enable(){}disable(){}attach(){}};function Jp(t,n){return n.some(e=>{let i=t.bottom<e.top,o=t.top>e.bottom,r=t.right<e.left,a=t.left>e.right;return i||o||r||a})}function $_(t,n){return n.some(e=>{let i=t.top<e.top,o=t.bottom>e.bottom,r=t.left<e.left,a=t.right>e.right;return i||o||r||a})}function Ol(t,n){return new Ml(t.get(Qo),t.get(Jo),t.get(N),n)}var Ml=class{_scrollDispatcher;_viewportRuler;_ngZone;_config;_scrollSubscription=null;_overlayRef;constructor(n,e,i,o){this._scrollDispatcher=n,this._viewportRuler=e,this._ngZone=i,this._config=o}attach(n){this._overlayRef,this._overlayRef=n}enable(){if(!this._scrollSubscription){let n=this._config?this._config.scrollThrottle:0;this._scrollSubscription=this._scrollDispatcher.scrolled(n).subscribe(()=>{if(this._overlayRef.updatePosition(),this._config&&this._config.autoClose){let e=this._overlayRef.overlayElement.getBoundingClientRect(),{width:i,height:o}=this._viewportRuler.getViewportSize();Jp(e,[{width:i,height:o,bottom:o,right:i,top:0,left:0}])&&(this.disable(),this._ngZone.run(()=>this._overlayRef.detach()))}})}}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}},Q_=(()=>{class t{_injector=m(te);noop=()=>new Ca;close=e=>X_(this._injector,e);block=()=>Z_(this._injector);reposition=e=>Ol(this._injector,e);static \u0275fac=function(i){return new(i||t)};static \u0275prov=O({token:t,factory:t.\u0275fac})}return t})(),Nl=class{positionStrategy;scrollStrategy=new Ca;panelClass="";hasBackdrop=!1;backdropClass="cdk-overlay-dark-backdrop";disableAnimations;width;height;minWidth;minHeight;maxWidth;maxHeight;direction;disposeOnNavigation=!1;usePopover;eventPredicate;constructor(n){if(n){let e=Object.keys(n);for(let i of e)n[i]!==void 0&&(this[i]=n[i])}}};var Tl=class{connectionPair;scrollableViewProperties;constructor(n,e){this.connectionPair=n,this.scrollableViewProperties=e}};var J_=(()=>{class t{_attachedOverlays=[];_document=m(A);_isAttached=!1;ngOnDestroy(){this.detach()}add(e){this.remove(e),this._attachedOverlays.push(e)}remove(e){let i=this._attachedOverlays.indexOf(e);i>-1&&this._attachedOverlays.splice(i,1),this._attachedOverlays.length===0&&this.detach()}canReceiveEvent(e,i,o){return o.observers.length<1?!1:e.eventPredicate?e.eventPredicate(i):!0}static \u0275fac=function(i){return new(i||t)};static \u0275prov=O({token:t,factory:t.\u0275fac})}return t})(),ew=(()=>{class t extends J_{_ngZone=m(N);_renderer=m(Ge).createRenderer(null,null);_cleanupKeydown;add(e){super.add(e),this._isAttached||(this._ngZone.runOutsideAngular(()=>{this._cleanupKeydown=this._renderer.listen("body","keydown",this._keydownListener)}),this._isAttached=!0)}detach(){this._isAttached&&(this._cleanupKeydown?.(),this._isAttached=!1)}_keydownListener=e=>{let i=this._attachedOverlays;for(let o=i.length-1;o>-1;o--){let r=i[o];if(this.canReceiveEvent(r,e,r._keydownEvents)){this._ngZone.run(()=>r._keydownEvents.next(e));break}}};static \u0275fac=function(i){return new(i||t)};static \u0275prov=O({token:t,factory:t.\u0275fac})}return t})(),tw=(()=>{class t extends J_{_platform=m(ue);_ngZone=m(N);_renderer=m(Ge).createRenderer(null,null);_cursorOriginalValue;_cursorStyleIsSet=!1;_pointerDownEventTarget=null;_cleanups;add(e){if(super.add(e),!this._isAttached){let i=this._document.body,o={capture:!0},r=this._renderer;this._cleanups=this._ngZone.runOutsideAngular(()=>[r.listen(i,"pointerdown",this._pointerDownListener,o),r.listen(i,"click",this._clickListener,o),r.listen(i,"auxclick",this._clickListener,o),r.listen(i,"contextmenu",this._clickListener,o)]),this._platform.IOS&&!this._cursorStyleIsSet&&(this._cursorOriginalValue=i.style.cursor,i.style.cursor="pointer",this._cursorStyleIsSet=!0),this._isAttached=!0}}detach(){this._isAttached&&(this._cleanups?.forEach(e=>e()),this._cleanups=void 0,this._platform.IOS&&this._cursorStyleIsSet&&(this._document.body.style.cursor=this._cursorOriginalValue,this._cursorStyleIsSet=!1),this._isAttached=!1)}_pointerDownListener=e=>{this._pointerDownEventTarget=vt(e)};_clickListener=e=>{let i=vt(e),o=e.type==="click"&&this._pointerDownEventTarget?this._pointerDownEventTarget:i;this._pointerDownEventTarget=null;let r=this._attachedOverlays.slice();for(let a=r.length-1;a>-1;a--){let s=r[a],c=s._outsidePointerEvents;if(!(!s.hasAttached()||!this.canReceiveEvent(s,e,c))){if(G_(s.overlayElement,i)||G_(s.overlayElement,o))break;this._ngZone?this._ngZone.run(()=>c.next(e)):c.next(e)}}};static \u0275fac=function(i){return new(i||t)};static \u0275prov=O({token:t,factory:t.\u0275fac})}return t})();function G_(t,n){let e=typeof ShadowRoot<"u"&&ShadowRoot,i=n;for(;i;){if(i===t)return!0;i=e&&i instanceof ShadowRoot?i.host:i.parentNode}return!1}var nw=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=L({type:t,selectors:[["ng-component"]],hostAttrs:["cdk-overlay-style-loader",""],decls:0,vars:0,template:function(i,o){},styles:[`.cdk-overlay-container, .cdk-global-overlay-wrapper {
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
`],encapsulation:2})}return t})(),iw=(()=>{class t{_platform=m(ue);_containerElement;_document=m(A);_styleLoader=m(Ke);ngOnDestroy(){this._containerElement?.remove()}getContainerElement(){return this._loadStyles(),this._containerElement||this._createContainer(),this._containerElement}_createContainer(){let e="cdk-overlay-container";if(this._platform.isBrowser||Op()){let o=this._document.querySelectorAll(`.${e}[platform="server"], .${e}[platform="test"]`);for(let r=0;r<o.length;r++)o[r].remove()}let i=this._document.createElement("div");i.classList.add(e),Op()?i.setAttribute("platform","test"):this._platform.isBrowser||i.setAttribute("platform","server"),this._document.body.appendChild(i),this._containerElement=i}_loadStyles(){this._styleLoader.load(nw)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=O({token:t,factory:t.\u0275fac})}return t})(),ef=class{_renderer;_ngZone;element;_cleanupClick;_cleanupTransitionEnd;_fallbackTimeout;constructor(n,e,i,o){this._renderer=e,this._ngZone=i,this.element=n.createElement("div"),this.element.classList.add("cdk-overlay-backdrop"),this._cleanupClick=e.listen(this.element,"click",o)}detach(){this._ngZone.runOutsideAngular(()=>{let n=this.element;clearTimeout(this._fallbackTimeout),this._cleanupTransitionEnd?.(),this._cleanupTransitionEnd=this._renderer.listen(n,"transitionend",this.dispose),this._fallbackTimeout=setTimeout(this.dispose,500),n.style.pointerEvents="none",n.classList.remove("cdk-overlay-backdrop-showing")})}dispose=()=>{clearTimeout(this._fallbackTimeout),this._cleanupClick?.(),this._cleanupTransitionEnd?.(),this._cleanupClick=this._cleanupTransitionEnd=this._fallbackTimeout=void 0,this.element.remove()}};function tf(t){return t&&t.nodeType===1}var Qp=ne([]),kl=class{_portalOutlet;_host;_pane;_config;_ngZone;_keyboardDispatcher;_document;_location;_outsideClickDispatcher;_animationsDisabled;_injector;_renderer;_backdropClick=new D;_attachments=new D;_detachments=new D;_positionStrategy;_scrollStrategy;_locationChanges;_backdropRef=null;_detachContentMutationObserver;_detachContentAfterRenderRef;_disposed=!1;_previousHostParent;_keydownEvents=new D;_outsidePointerEvents=new D;_afterNextRenderRef;constructor(n,e,i,o,r,a,s,c,l,d=!1,u,f){this._portalOutlet=n,this._host=e,this._pane=i,this._config=o,this._ngZone=r,this._keyboardDispatcher=a,this._document=s,this._location=c,this._outsideClickDispatcher=l,this._animationsDisabled=d,this._injector=u,this._renderer=f,o.scrollStrategy&&(this._scrollStrategy=o.scrollStrategy,this._scrollStrategy.attach(this)),this._positionStrategy=o.positionStrategy}get overlayElement(){return this._pane}get backdropElement(){return this._backdropRef?.element||null}get hostElement(){return this._host}get eventPredicate(){return this._config?.eventPredicate||null}attach(n){if(this._disposed)return null;this._attachHost();let e=this._portalOutlet.attach(n);if(this._positionStrategy?.attach(this),this._updateStackingOrder(),this._updateElementSize(),this._updateElementDirection(),Ee(()=>{Qp.update(i=>i.includes(this)?i:[...i,this])}),this._scrollStrategy&&this._scrollStrategy.enable(),this._afterNextRenderRef?.destroy(),this._afterNextRenderRef=Gt(()=>{this.hasAttached()&&this.updatePosition()},{injector:this._injector}),this._togglePointerEvents(!0),this._config.hasBackdrop&&this._attachBackdrop(),this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!0),this._attachments.next(),this._completeDetachContent(),this._keyboardDispatcher.add(this),this._config.disposeOnNavigation===!0||this._config.disposeOnNavigation==="pop-state"){let i=this._location.subscribe(()=>this.dispose());this._locationChanges=()=>i.unsubscribe()}else this._config.disposeOnNavigation==="url-change"&&(this._locationChanges=this._location.onUrlChange(()=>this.dispose()));return this._outsideClickDispatcher.add(this),typeof e?.onDestroy=="function"&&e.onDestroy(()=>{this.hasAttached()&&this._ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>this.detach()))}),e}detach(){if(!this.hasAttached())return;this.detachBackdrop(),this._togglePointerEvents(!1),this._positionStrategy&&this._positionStrategy.detach&&this._positionStrategy.detach(),this._scrollStrategy&&this._scrollStrategy.disable();let n=this._portalOutlet.detach();return this._detachments.next(),this._completeDetachContent(),this._keyboardDispatcher.remove(this),this._detachContentWhenEmpty(),this._locationChanges?.(),this._outsideClickDispatcher.remove(this),Ee(()=>{Qp.update(e=>e.filter(i=>i!==this))}),n}dispose(){if(this._disposed)return;let n=this.hasAttached();this._positionStrategy&&this._positionStrategy.dispose(),this._disposeScrollStrategy(),this._backdropRef?.dispose(),this._locationChanges?.(),this._keyboardDispatcher.remove(this),this._portalOutlet.dispose(),this._attachments.complete(),this._backdropClick.complete(),this._keydownEvents.complete(),this._outsidePointerEvents.complete(),this._outsideClickDispatcher.remove(this),this._host?.remove(),this._afterNextRenderRef?.destroy(),this._previousHostParent=this._pane=this._host=this._backdropRef=null,n&&this._detachments.next(),this._detachments.complete(),this._completeDetachContent(),this._disposed=!0,Ee(()=>{Qp.update(e=>e.filter(i=>i!==this))})}hasAttached(){return this._portalOutlet.hasAttached()}backdropClick(){return this._backdropClick}attachments(){return this._attachments}detachments(){return this._detachments}keydownEvents(){return this._keydownEvents}outsidePointerEvents(){return this._outsidePointerEvents}getConfig(){return this._config}updatePosition(){this._positionStrategy&&this._positionStrategy.apply()}updatePositionStrategy(n){n!==this._positionStrategy&&(this._positionStrategy&&this._positionStrategy.dispose(),this._positionStrategy=n,this.hasAttached()&&(n.attach(this),this.updatePosition()))}updateSize(n){this._config=C(C({},this._config),n),this._updateElementSize()}setDirection(n){this._config=Q(C({},this._config),{direction:n}),this._updateElementDirection()}addPanelClass(n){this._pane&&this._toggleClasses(this._pane,n,!0)}removePanelClass(n){this._pane&&this._toggleClasses(this._pane,n,!1)}getDirection(){let n=this._config.direction;return n?typeof n=="string"?n:n.value:"ltr"}updateScrollStrategy(n){n!==this._scrollStrategy&&(this._disposeScrollStrategy(),this._scrollStrategy=n,this.hasAttached()&&(n.attach(this),n.enable()))}_updateElementDirection(){this._host.setAttribute("dir",this.getDirection())}_updateElementSize(){if(!this._pane)return;let n=this._pane.style;n.width=Ue(this._config.width),n.height=Ue(this._config.height),n.minWidth=Ue(this._config.minWidth),n.minHeight=Ue(this._config.minHeight),n.maxWidth=Ue(this._config.maxWidth),n.maxHeight=Ue(this._config.maxHeight)}_togglePointerEvents(n){this._pane.style.pointerEvents=n?"":"none"}_attachHost(){if(!this._host.parentElement){let n=this._config.usePopover?this._positionStrategy?.getPopoverInsertionPoint?.():null;tf(n)?n.after(this._host):n?.type==="parent"?n.element.appendChild(this._host):this._previousHostParent?.appendChild(this._host)}if(this._config.usePopover)try{this._host.showPopover()}catch(n){}}_attachBackdrop(){let n="cdk-overlay-backdrop-showing";this._backdropRef?.dispose(),this._backdropRef=new ef(this._document,this._renderer,this._ngZone,e=>{this._backdropClick.next(e)}),this._animationsDisabled&&this._backdropRef.element.classList.add("cdk-overlay-backdrop-noop-animation"),this._config.backdropClass&&this._toggleClasses(this._backdropRef.element,this._config.backdropClass,!0),this._config.usePopover?this._host.prepend(this._backdropRef.element):this._host.parentElement.insertBefore(this._backdropRef.element,this._host),!this._animationsDisabled&&typeof requestAnimationFrame<"u"?this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>this._backdropRef?.element.classList.add(n))}):this._backdropRef.element.classList.add(n)}_updateStackingOrder(){!this._config.usePopover&&this._host.nextSibling&&this._host.parentNode.appendChild(this._host)}detachBackdrop(){this._animationsDisabled?(this._backdropRef?.dispose(),this._backdropRef=null):this._backdropRef?.detach()}_toggleClasses(n,e,i){let o=Yo(e||[]).filter(r=>!!r);o.length&&(i?n.classList.add(...o):n.classList.remove(...o))}_detachContentWhenEmpty(){let n=!1;try{this._detachContentAfterRenderRef=Gt(()=>{n=!0,this._detachContent()},{injector:this._injector})}catch(e){if(n)throw e;this._detachContent()}globalThis.MutationObserver&&this._pane&&(this._detachContentMutationObserver||=new globalThis.MutationObserver(()=>{this._detachContent()}),this._detachContentMutationObserver.observe(this._pane,{childList:!0}))}_detachContent(){(!this._pane||!this._host||this._pane.children.length===0)&&(this._pane&&this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!1),this._host&&this._host.parentElement&&(this._previousHostParent=this._host.parentElement,this._host.remove()),this._completeDetachContent())}_completeDetachContent(){this._detachContentAfterRenderRef?.destroy(),this._detachContentAfterRenderRef=void 0,this._detachContentMutationObserver?.disconnect()}_disposeScrollStrategy(){let n=this._scrollStrategy;n?.disable(),n?.detach?.()}},W_="cdk-overlay-connected-position-bounding-box",uN=/([A-Za-z%]+)$/;function Fl(t,n){return new Al(n,t.get(Jo),t.get(A),t.get(ue),t.get(iw))}var Al=class{_viewportRuler;_document;_platform;_overlayContainer;_overlayRef;_isInitialRender=!1;_lastBoundingBoxSize={width:0,height:0};_isPushed=!1;_canPush=!0;_growAfterOpen=!1;_hasFlexibleDimensions=!0;_positionLocked=!1;_originRect;_overlayRect;_viewportRect;_containerRect;_viewportMargin=0;_scrollables=[];_preferredPositions=[];_origin;_pane;_isDisposed=!1;_boundingBox=null;_lastPosition=null;_lastScrollVisibility=null;_positionChanges=new D;_resizeSubscription=we.EMPTY;_offsetX=0;_offsetY=0;_transformOriginSelector;_appliedPanelClasses=[];_previousPushAmount=null;_popoverLocation="global";positionChanges=this._positionChanges;get positions(){return this._preferredPositions}constructor(n,e,i,o,r){this._viewportRuler=e,this._document=i,this._platform=o,this._overlayContainer=r,this.setOrigin(n)}attach(n){this._overlayRef&&this._overlayRef,this._validatePositions(),n.hostElement.classList.add(W_),this._overlayRef=n,this._boundingBox=n.hostElement,this._pane=n.overlayElement,this._isDisposed=!1,this._isInitialRender=!0,this._lastPosition=null,this._resizeSubscription.unsubscribe(),this._resizeSubscription=this._viewportRuler.change().subscribe(()=>{this._isInitialRender=!0,this.apply()})}apply(){if(this._isDisposed||!this._platform.isBrowser)return;if(!this._isInitialRender&&this._positionLocked&&this._lastPosition){this.reapplyLastPosition();return}this._clearPanelClasses(),this._resetOverlayElementStyles(),this._resetBoundingBoxStyles(),this._viewportRect=this._getNarrowedViewportRect(),this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._containerRect=this._getContainerRect();let n=this._originRect,e=this._overlayRect,i=this._viewportRect,o=this._containerRect,r=[],a;for(let s of this._preferredPositions){let c=this._getOriginPoint(n,o,s),l=this._getOverlayPoint(c,e,s),d=this._getOverlayFit(l,e,i,s);if(d.isCompletelyWithinViewport){this._isPushed=!1,this._applyPosition(s,c);return}if(this._canFitWithFlexibleDimensions(d,l,i)){r.push({position:s,origin:c,overlayRect:e,boundingBoxRect:this._calculateBoundingBoxRect(c,s)});continue}(!a||a.overlayFit.visibleArea<d.visibleArea)&&(a={overlayFit:d,overlayPoint:l,originPoint:c,position:s,overlayRect:e})}if(r.length){let s=null,c=-1;for(let l of r){let d=l.boundingBoxRect.width*l.boundingBoxRect.height*(l.position.weight||1);d>c&&(c=d,s=l)}this._isPushed=!1,this._applyPosition(s.position,s.origin);return}if(this._canPush){this._isPushed=!0,this._applyPosition(a.position,a.originPoint);return}this._applyPosition(a.position,a.originPoint)}detach(){this._clearPanelClasses(),this._lastPosition=null,this._previousPushAmount=null,this._resizeSubscription.unsubscribe()}dispose(){this._isDisposed||(this._boundingBox&&Ki(this._boundingBox.style,{top:"",left:"",right:"",bottom:"",height:"",width:"",alignItems:"",justifyContent:""}),this._pane&&this._resetOverlayElementStyles(),this._overlayRef&&this._overlayRef.hostElement.classList.remove(W_),this.detach(),this._positionChanges.complete(),this._overlayRef=this._boundingBox=null,this._isDisposed=!0)}reapplyLastPosition(){if(this._isDisposed||!this._platform.isBrowser)return;let n=this._lastPosition;n?(this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._viewportRect=this._getNarrowedViewportRect(),this._containerRect=this._getContainerRect(),this._applyPosition(n,this._getOriginPoint(this._originRect,this._containerRect,n))):this.apply()}withScrollableContainers(n){return this._scrollables=n,this}withPositions(n){return this._preferredPositions=n,n.indexOf(this._lastPosition)===-1&&(this._lastPosition=null),this._validatePositions(),this}withViewportMargin(n){return this._viewportMargin=n,this}withFlexibleDimensions(n=!0){return this._hasFlexibleDimensions=n,this}withGrowAfterOpen(n=!0){return this._growAfterOpen=n,this}withPush(n=!0){return this._canPush=n,this}withLockedPosition(n=!0){return this._positionLocked=n,this}setOrigin(n){return this._origin=n,this}withDefaultOffsetX(n){return this._offsetX=n,this}withDefaultOffsetY(n){return this._offsetY=n,this}withTransformOriginOn(n){return this._transformOriginSelector=n,this}withPopoverLocation(n){return this._popoverLocation=n,this}getPopoverInsertionPoint(){return this._popoverLocation==="global"?null:this._popoverLocation!=="inline"?this._popoverLocation:this._origin instanceof j?this._origin.nativeElement:tf(this._origin)?this._origin:null}_getOriginPoint(n,e,i){let o;if(i.originX=="center")o=n.left+n.width/2;else{let a=this._isRtl()?n.right:n.left,s=this._isRtl()?n.left:n.right;o=i.originX=="start"?a:s}e.left<0&&(o-=e.left);let r;return i.originY=="center"?r=n.top+n.height/2:r=i.originY=="top"?n.top:n.bottom,e.top<0&&(r-=e.top),{x:o,y:r}}_getOverlayPoint(n,e,i){let o;i.overlayX=="center"?o=-e.width/2:i.overlayX==="start"?o=this._isRtl()?-e.width:0:o=this._isRtl()?0:-e.width;let r;return i.overlayY=="center"?r=-e.height/2:r=i.overlayY=="top"?0:-e.height,{x:n.x+o,y:n.y+r}}_getOverlayFit(n,e,i,o){let r=Y_(e),{x:a,y:s}=n,c=this._getOffset(o,"x"),l=this._getOffset(o,"y");c&&(a+=c),l&&(s+=l);let d=0-a,u=a+r.width-i.width,f=0-s,p=s+r.height-i.height,v=this._subtractOverflows(r.width,d,u),x=this._subtractOverflows(r.height,f,p),E=v*x;return{visibleArea:E,isCompletelyWithinViewport:r.width*r.height===E,fitsInViewportVertically:x===r.height,fitsInViewportHorizontally:v==r.width}}_canFitWithFlexibleDimensions(n,e,i){if(this._hasFlexibleDimensions){let o=i.bottom-e.y,r=i.right-e.x,a=q_(this._overlayRef.getConfig().minHeight),s=q_(this._overlayRef.getConfig().minWidth),c=n.fitsInViewportVertically||a!=null&&a<=o,l=n.fitsInViewportHorizontally||s!=null&&s<=r;return c&&l}return!1}_pushOverlayOnScreen(n,e,i){if(this._previousPushAmount&&this._positionLocked)return{x:n.x+this._previousPushAmount.x,y:n.y+this._previousPushAmount.y};let o=Y_(e),r=this._viewportRect,a=Math.max(n.x+o.width-r.width,0),s=Math.max(n.y+o.height-r.height,0),c=Math.max(r.top-i.top-n.y,0),l=Math.max(r.left-i.left-n.x,0),d=0,u=0;return o.width<=r.width?d=l||-a:d=n.x<this._getViewportMarginStart()?r.left-i.left-n.x:0,o.height<=r.height?u=c||-s:u=n.y<this._getViewportMarginTop()?r.top-i.top-n.y:0,this._previousPushAmount={x:d,y:u},{x:n.x+d,y:n.y+u}}_applyPosition(n,e){if(this._setTransformOrigin(n),this._setOverlayElementStyles(e,n),this._setBoundingBoxStyles(e,n),n.panelClass&&this._addPanelClasses(n.panelClass),this._positionChanges.observers.length){let i=this._getScrollVisibility();if(n!==this._lastPosition||!this._lastScrollVisibility||!mN(this._lastScrollVisibility,i)){let o=new Tl(n,i);this._positionChanges.next(o)}this._lastScrollVisibility=i}this._lastPosition=n,this._isInitialRender=!1}_setTransformOrigin(n){if(!this._transformOriginSelector)return;let e=this._boundingBox.querySelectorAll(this._transformOriginSelector),i,o=n.overlayY;n.overlayX==="center"?i="center":this._isRtl()?i=n.overlayX==="start"?"right":"left":i=n.overlayX==="start"?"left":"right";for(let r=0;r<e.length;r++)e[r].style.transformOrigin=`${i} ${o}`}_calculateBoundingBoxRect(n,e){let i=this._viewportRect,o=this._isRtl(),r,a,s;if(e.overlayY==="top")a=n.y,r=i.height-a+this._getViewportMarginBottom();else if(e.overlayY==="bottom")s=i.height-n.y+this._getViewportMarginTop()+this._getViewportMarginBottom(),r=i.height-s+this._getViewportMarginTop();else{let p=Math.min(i.bottom-n.y+i.top,n.y),v=this._lastBoundingBoxSize.height;r=p*2,a=n.y-p,r>v&&!this._isInitialRender&&!this._growAfterOpen&&(a=n.y-v/2)}let c=e.overlayX==="start"&&!o||e.overlayX==="end"&&o,l=e.overlayX==="end"&&!o||e.overlayX==="start"&&o,d,u,f;if(l)f=i.width-n.x+this._getViewportMarginStart()+this._getViewportMarginEnd(),d=n.x-this._getViewportMarginStart();else if(c)u=n.x,d=i.right-n.x-this._getViewportMarginEnd();else{let p=Math.min(i.right-n.x+i.left,n.x),v=this._lastBoundingBoxSize.width;d=p*2,u=n.x-p,d>v&&!this._isInitialRender&&!this._growAfterOpen&&(u=n.x-v/2)}return{top:a,left:u,bottom:s,right:f,width:d,height:r}}_setBoundingBoxStyles(n,e){let i=this._calculateBoundingBoxRect(n,e);!this._isInitialRender&&!this._growAfterOpen&&(i.height=Math.min(i.height,this._lastBoundingBoxSize.height),i.width=Math.min(i.width,this._lastBoundingBoxSize.width));let o={};if(this._hasExactPosition())o.top=o.left="0",o.bottom=o.right="auto",o.maxHeight=o.maxWidth="",o.width=o.height="100%";else{let r=this._overlayRef.getConfig().maxHeight,a=this._overlayRef.getConfig().maxWidth;o.width=Ue(i.width),o.height=Ue(i.height),o.top=Ue(i.top)||"auto",o.bottom=Ue(i.bottom)||"auto",o.left=Ue(i.left)||"auto",o.right=Ue(i.right)||"auto",e.overlayX==="center"?o.alignItems="center":o.alignItems=e.overlayX==="end"?"flex-end":"flex-start",e.overlayY==="center"?o.justifyContent="center":o.justifyContent=e.overlayY==="bottom"?"flex-end":"flex-start",r&&(o.maxHeight=Ue(r)),a&&(o.maxWidth=Ue(a))}this._lastBoundingBoxSize=i,Ki(this._boundingBox.style,o)}_resetBoundingBoxStyles(){Ki(this._boundingBox.style,{top:"0",left:"0",right:"0",bottom:"0",height:"",width:"",alignItems:"",justifyContent:""})}_resetOverlayElementStyles(){Ki(this._pane.style,{top:"",left:"",bottom:"",right:"",position:"",transform:""})}_setOverlayElementStyles(n,e){let i={},o=this._hasExactPosition(),r=this._hasFlexibleDimensions,a=this._overlayRef.getConfig();if(o){let d=this._viewportRuler.getViewportScrollPosition();Ki(i,this._getExactOverlayY(e,n,d)),Ki(i,this._getExactOverlayX(e,n,d))}else i.position="static";let s="",c=this._getOffset(e,"x"),l=this._getOffset(e,"y");c&&(s+=`translateX(${c}px) `),l&&(s+=`translateY(${l}px)`),i.transform=s.trim(),a.maxHeight&&(o?i.maxHeight=Ue(a.maxHeight):r&&(i.maxHeight="")),a.maxWidth&&(o?i.maxWidth=Ue(a.maxWidth):r&&(i.maxWidth="")),Ki(this._pane.style,i)}_getExactOverlayY(n,e,i){let o={top:"",bottom:""},r=this._getOverlayPoint(e,this._overlayRect,n);if(this._isPushed&&(r=this._pushOverlayOnScreen(r,this._overlayRect,i)),n.overlayY==="bottom"){let a=this._document.documentElement.clientHeight;o.bottom=`${a-(r.y+this._overlayRect.height)}px`}else o.top=Ue(r.y);return o}_getExactOverlayX(n,e,i){let o={left:"",right:""},r=this._getOverlayPoint(e,this._overlayRect,n);this._isPushed&&(r=this._pushOverlayOnScreen(r,this._overlayRect,i));let a;if(this._isRtl()?a=n.overlayX==="end"?"left":"right":a=n.overlayX==="end"?"right":"left",a==="right"){let s=this._document.documentElement.clientWidth;o.right=`${s-(r.x+this._overlayRect.width)}px`}else o.left=Ue(r.x);return o}_getScrollVisibility(){let n=this._getOriginRect(),e=this._pane.getBoundingClientRect(),i=this._scrollables.map(o=>o.getElementRef().nativeElement.getBoundingClientRect());return{isOriginClipped:$_(n,i),isOriginOutsideView:Jp(n,i),isOverlayClipped:$_(e,i),isOverlayOutsideView:Jp(e,i)}}_subtractOverflows(n,...e){return e.reduce((i,o)=>i-Math.max(o,0),n)}_getNarrowedViewportRect(){let n=this._document.documentElement.clientWidth,e=this._document.documentElement.clientHeight,i=this._viewportRuler.getViewportScrollPosition();return{top:i.top+this._getViewportMarginTop(),left:i.left+this._getViewportMarginStart(),right:i.left+n-this._getViewportMarginEnd(),bottom:i.top+e-this._getViewportMarginBottom(),width:n-this._getViewportMarginStart()-this._getViewportMarginEnd(),height:e-this._getViewportMarginTop()-this._getViewportMarginBottom()}}_isRtl(){return this._overlayRef.getDirection()==="rtl"}_hasExactPosition(){return!this._hasFlexibleDimensions||this._isPushed}_getOffset(n,e){return e==="x"?n.offsetX==null?this._offsetX:n.offsetX:n.offsetY==null?this._offsetY:n.offsetY}_validatePositions(){}_addPanelClasses(n){this._pane&&Yo(n).forEach(e=>{e!==""&&this._appliedPanelClasses.indexOf(e)===-1&&(this._appliedPanelClasses.push(e),this._pane.classList.add(e))})}_clearPanelClasses(){this._pane&&(this._appliedPanelClasses.forEach(n=>{this._pane.classList.remove(n)}),this._appliedPanelClasses=[])}_getViewportMarginStart(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.start??0}_getViewportMarginEnd(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.end??0}_getViewportMarginTop(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.top??0}_getViewportMarginBottom(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.bottom??0}_getOriginRect(){let n=this._origin;if(n instanceof j)return n.nativeElement.getBoundingClientRect();if(n instanceof Element)return n.getBoundingClientRect();let e=n.width||0,i=n.height||0;return{top:n.y,bottom:n.y+i,left:n.x,right:n.x+e,height:i,width:e}}_getContainerRect(){let n=this._overlayRef.getConfig().usePopover&&this._popoverLocation!=="global",e=this._overlayContainer.getContainerElement();n&&(e.style.display="block");let i=e.getBoundingClientRect();return n&&(e.style.display=""),i}};function Ki(t,n){for(let e in n)Object.hasOwn(n,e)&&(t[e]=n[e]);return t}function q_(t){if(typeof t!="number"&&t!=null){let[n,e]=t.split(uN);return!e||e==="px"?parseFloat(n):null}return t||null}function Y_(t){return{top:Math.floor(t.top),right:Math.floor(t.right),bottom:Math.floor(t.bottom),left:Math.floor(t.left),width:Math.floor(t.width),height:Math.floor(t.height)}}function mN(t,n){return t===n?!0:t.isOriginClipped===n.isOriginClipped&&t.isOriginOutsideView===n.isOriginOutsideView&&t.isOverlayClipped===n.isOverlayClipped&&t.isOverlayOutsideView===n.isOverlayOutsideView}var K_="cdk-global-overlay-wrapper";function ow(t){return new Rl}var Rl=class{_overlayRef;_cssPosition="static";_topOffset="";_bottomOffset="";_alignItems="";_xPosition="";_xOffset="";_width="";_height="";_isDisposed=!1;attach(n){let e=n.getConfig();this._overlayRef=n,this._width&&!e.width&&n.updateSize({width:this._width}),this._height&&!e.height&&n.updateSize({height:this._height}),n.hostElement.classList.add(K_),this._isDisposed=!1}top(n=""){return this._bottomOffset="",this._topOffset=n,this._alignItems="flex-start",this}left(n=""){return this._xOffset=n,this._xPosition="left",this}bottom(n=""){return this._topOffset="",this._bottomOffset=n,this._alignItems="flex-end",this}right(n=""){return this._xOffset=n,this._xPosition="right",this}start(n=""){return this._xOffset=n,this._xPosition="start",this}end(n=""){return this._xOffset=n,this._xPosition="end",this}width(n=""){return this._overlayRef?this._overlayRef.updateSize({width:n}):this._width=n,this}height(n=""){return this._overlayRef?this._overlayRef.updateSize({height:n}):this._height=n,this}centerHorizontally(n=""){return this.left(n),this._xPosition="center",this}centerVertically(n=""){return this.top(n),this._alignItems="center",this}apply(){if(!this._overlayRef||!this._overlayRef.hasAttached())return;let n=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement.style,i=this._overlayRef.getConfig(),{width:o,height:r,maxWidth:a,maxHeight:s}=i,c=(o==="100%"||o==="100vw")&&(!a||a==="100%"||a==="100vw"),l=(r==="100%"||r==="100vh")&&(!s||s==="100%"||s==="100vh"),d=this._xPosition,u=this._xOffset,f=this._overlayRef.getConfig().direction==="rtl",p="",v="",x="";c?x="flex-start":d==="center"?(x="center",f?v=u:p=u):f?d==="left"||d==="end"?(x="flex-end",p=u):(d==="right"||d==="start")&&(x="flex-start",v=u):d==="left"||d==="start"?(x="flex-start",p=u):(d==="right"||d==="end")&&(x="flex-end",v=u),n.position=this._cssPosition,n.marginLeft=c?"0":p,n.marginTop=l?"0":this._topOffset,n.marginBottom=this._bottomOffset,n.marginRight=c?"0":v,e.justifyContent=x,e.alignItems=l?"flex-start":this._alignItems}dispose(){if(this._isDisposed||!this._overlayRef)return;let n=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement,i=e.style;e.classList.remove(K_),i.justifyContent=i.alignItems=n.marginTop=n.marginBottom=n.marginLeft=n.marginRight=n.position="",this._overlayRef=null,this._isDisposed=!0}},rw=(()=>{class t{_injector=m(te);global(){return ow()}flexibleConnectedTo(e){return Fl(this._injector,e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=O({token:t,factory:t.\u0275fac})}return t})(),aw=new b("OVERLAY_DEFAULT_CONFIG");function Pl(t,n){t.get(Ke).load(nw);let e=t.get(iw),i=t.get(A),o=t.get(at),r=t.get(qt),a=t.get(Zt),s=t.get(Ve,null,{optional:!0})||t.get(Ge).createRenderer(null,null),c=new Nl(n),l=t.get(aw,null,{optional:!0})?.usePopover??!0;c.direction=c.direction||a.value,!i.body||!("showPopover"in i.body)?c.usePopover=!1:c.usePopover=n?.usePopover??l;let d=i.createElement("div"),u=i.createElement("div");d.id=o.getId("cdk-overlay-"),d.classList.add("cdk-overlay-pane"),u.appendChild(d),c.usePopover&&(u.setAttribute("popover","manual"),u.classList.add("cdk-overlay-popover"));let f=c.usePopover?c.positionStrategy?.getPopoverInsertionPoint?.():null;return tf(f)?f.after(u):f?.type==="parent"?f.element.appendChild(u):e.getContainerElement().appendChild(u),new kl(new El(d,r,t),u,d,c,t.get(N),t.get(ew),i,t.get(Ac),t.get(tw),n?.disableAnimations??t.get(kr,null,{optional:!0})==="NoopAnimations",t.get($e),s)}var Ll=(()=>{class t{scrollStrategies=m(Q_);_positionBuilder=m(rw);_injector=m(te);create(e){return Pl(this._injector,e)}position(){return this._positionBuilder}static \u0275fac=function(i){return new(i||t)};static \u0275prov=O({token:t,factory:t.\u0275fac})}return t})();var nf=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=P({providers:[Ll],imports:[_e,z_,Kp,Kp]})}return t})();var fN=20;var hN=new b("mat-tooltip-scroll-strategy",{providedIn:"root",factory:()=>{let t=m(te);return()=>Ol(t,{scrollThrottle:fN})}}),gN=new b("mat-tooltip-default-options",{providedIn:"root",factory:()=>({showDelay:0,hideDelay:0,touchendHideDelay:1500})});var sw="tooltip-panel",vN={passive:!0},bN=8,yN=8,_N=24,wN=200,of=(()=>{class t{_elementRef=m(j);_ngZone=m(N);_platform=m(ue);_ariaDescriber=m(I_);_focusMonitor=m(Xt);_dir=m(Zt);_injector=m(te);_viewContainerRef=m(Wt);_mediaMatcher=m(Ko);_document=m(A);_renderer=m(Ve);_animationsDisabled=Ze();_defaultOptions=m(gN,{optional:!0});_overlayRef=null;_tooltipInstance=null;_overlayPanelClass;_portal;_position="below";_positionAtOrigin=!1;_disabled=!1;_tooltipClass;_viewInitialized=!1;_pointerExitEventsInitialized=!1;_tooltipComponent=cw;_viewportMargin=8;_currentPosition;_cssClassPrefix="mat-mdc";_ariaDescriptionPending=!1;_dirSubscribed=!1;get position(){return this._position}set position(e){e!==this._position&&(this._position=e,this._overlayRef&&(this._updatePosition(this._overlayRef),this._tooltipInstance?.show(0),this._overlayRef.updatePosition()))}get positionAtOrigin(){return this._positionAtOrigin}set positionAtOrigin(e){this._positionAtOrigin=Ot(e),this._detach(),this._overlayRef=null}get disabled(){return this._disabled}set disabled(e){let i=Ot(e);this._disabled!==i&&(this._disabled=i,i?this.hide(0):this._setupPointerEnterEventsIfNeeded(),this._syncAriaDescription(this.message))}get showDelay(){return this._showDelay}set showDelay(e){this._showDelay=qo(e)}_showDelay;get hideDelay(){return this._hideDelay}set hideDelay(e){this._hideDelay=qo(e),this._tooltipInstance&&(this._tooltipInstance._mouseLeaveHideDelay=this._hideDelay)}_hideDelay;touchGestures="auto";get message(){return this._message}set message(e){let i=this._message;this._message=e!=null?String(e).trim():"",!this._message&&this._isTooltipVisible()?this.hide(0):(this._setupPointerEnterEventsIfNeeded(),this._updateTooltipMessage()),this._syncAriaDescription(i)}_message="";get tooltipClass(){return this._tooltipClass}set tooltipClass(e){this._tooltipClass=e,this._tooltipInstance&&this._setTooltipClass(this._tooltipClass)}_eventCleanups=[];_touchstartTimeout=null;_destroyed=new D;_isDestroyed=!1;constructor(){let e=this._defaultOptions;e&&(this._showDelay=e.showDelay,this._hideDelay=e.hideDelay,e.position&&(this.position=e.position),e.positionAtOrigin&&(this.positionAtOrigin=e.positionAtOrigin),e.touchGestures&&(this.touchGestures=e.touchGestures),e.tooltipClass&&(this.tooltipClass=e.tooltipClass)),this._viewportMargin=bN}ngAfterViewInit(){this._viewInitialized=!0,this._setupPointerEnterEventsIfNeeded(),this._focusMonitor.monitor(this._elementRef).pipe(Re(this._destroyed)).subscribe(e=>{e?e==="keyboard"&&this._ngZone.run(()=>this.show()):this._ngZone.run(()=>this.hide(0))})}ngOnDestroy(){let e=this._elementRef.nativeElement;this._touchstartTimeout&&clearTimeout(this._touchstartTimeout),this._overlayRef&&(this._overlayRef.dispose(),this._tooltipInstance=null),this._eventCleanups.forEach(i=>i()),this._eventCleanups.length=0,this._destroyed.next(),this._destroyed.complete(),this._isDestroyed=!0,this._ariaDescriber.removeDescription(e,this.message,"tooltip"),this._focusMonitor.stopMonitoring(e)}show(e=this.showDelay,i){if(this.disabled||!this.message||this._isTooltipVisible()){this._tooltipInstance?._cancelPendingAnimations();return}let o=this._createOverlay(i);this._detach(),this._portal=this._portal||new Yi(this._tooltipComponent,this._viewContainerRef);let r=this._tooltipInstance=o.attach(this._portal).instance;r._triggerElement=this._elementRef.nativeElement,r._mouseLeaveHideDelay=this._hideDelay,r.afterHidden().pipe(Re(this._destroyed)).subscribe(()=>this._detach()),this._setTooltipClass(this._tooltipClass),this._updateTooltipMessage(),r.show(e)}hide(e=this.hideDelay){let i=this._tooltipInstance;i&&(i.isVisible()?i.hide(e):(i._cancelPendingAnimations(),this._detach()))}toggle(e){this._isTooltipVisible()?this.hide():this.show(void 0,e)}_isTooltipVisible(){return!!this._tooltipInstance&&this._tooltipInstance.isVisible()}_createOverlay(e){if(this._overlayRef){let a=this._overlayRef.getConfig().positionStrategy;if((!this.positionAtOrigin||!e)&&a._origin instanceof j)return this._overlayRef;this._detach()}let i=this._injector.get(Qo).getAncestorScrollContainers(this._elementRef),o=`${this._cssClassPrefix}-${sw}`,r=Fl(this._injector,this.positionAtOrigin?e||this._elementRef:this._elementRef).withTransformOriginOn(`.${this._cssClassPrefix}-tooltip`).withFlexibleDimensions(!1).withViewportMargin(this._viewportMargin).withScrollableContainers(i).withPopoverLocation("global");return r.positionChanges.pipe(Re(this._destroyed)).subscribe(a=>{this._updateCurrentPositionClass(a.connectionPair),this._tooltipInstance&&a.scrollableViewProperties.isOverlayClipped&&this._tooltipInstance.isVisible()&&this._ngZone.run(()=>this.hide(0))}),this._overlayRef=Pl(this._injector,{direction:this._dir,positionStrategy:r,panelClass:this._overlayPanelClass?[...this._overlayPanelClass,o]:o,scrollStrategy:this._injector.get(hN)(),disableAnimations:this._animationsDisabled,eventPredicate:this._overlayEventPredicate}),this._updatePosition(this._overlayRef),this._overlayRef.detachments().pipe(Re(this._destroyed)).subscribe(()=>this._detach()),this._overlayRef.outsidePointerEvents().pipe(Re(this._destroyed)).subscribe(()=>this._tooltipInstance?._handleBodyInteraction()),this._overlayRef.keydownEvents().pipe(Re(this._destroyed)).subscribe(a=>{a.preventDefault(),a.stopPropagation(),this._ngZone.run(()=>this.hide(0))}),this._defaultOptions?.disableTooltipInteractivity&&this._overlayRef.addPanelClass(`${this._cssClassPrefix}-tooltip-panel-non-interactive`),this._dirSubscribed||(this._dirSubscribed=!0,this._dir.change.pipe(Re(this._destroyed)).subscribe(()=>{this._overlayRef&&this._updatePosition(this._overlayRef)})),this._overlayRef}_detach(){this._overlayRef&&this._overlayRef.hasAttached()&&this._overlayRef.detach(),this._tooltipInstance=null}_updatePosition(e){let i=e.getConfig().positionStrategy,o=this._getOrigin(),r=this._getOverlayPosition();i.withPositions([this._addOffset(C(C({},o.main),r.main)),this._addOffset(C(C({},o.fallback),r.fallback))])}_addOffset(e){let i=yN,o=!this._dir||this._dir.value=="ltr";return e.originY==="top"?e.offsetY=-i:e.originY==="bottom"?e.offsetY=i:e.originX==="start"?e.offsetX=o?-i:i:e.originX==="end"&&(e.offsetX=o?i:-i),e}_getOrigin(){let e=!this._dir||this._dir.value=="ltr",i=this.position,o;i=="above"||i=="below"?o={originX:"center",originY:i=="above"?"top":"bottom"}:i=="before"||i=="left"&&e||i=="right"&&!e?o={originX:"start",originY:"center"}:(i=="after"||i=="right"&&e||i=="left"&&!e)&&(o={originX:"end",originY:"center"});let{x:r,y:a}=this._invertPosition(o.originX,o.originY);return{main:o,fallback:{originX:r,originY:a}}}_getOverlayPosition(){let e=!this._dir||this._dir.value=="ltr",i=this.position,o;i=="above"?o={overlayX:"center",overlayY:"bottom"}:i=="below"?o={overlayX:"center",overlayY:"top"}:i=="before"||i=="left"&&e||i=="right"&&!e?o={overlayX:"end",overlayY:"center"}:(i=="after"||i=="right"&&e||i=="left"&&!e)&&(o={overlayX:"start",overlayY:"center"});let{x:r,y:a}=this._invertPosition(o.overlayX,o.overlayY);return{main:o,fallback:{overlayX:r,overlayY:a}}}_updateTooltipMessage(){this._tooltipInstance&&(this._tooltipInstance.message=this.message,this._tooltipInstance._markForCheck(),Gt(()=>{this._tooltipInstance&&this._overlayRef.updatePosition()},{injector:this._injector}))}_setTooltipClass(e){this._tooltipInstance&&(this._tooltipInstance.tooltipClass=e instanceof Set?Array.from(e):e,this._tooltipInstance._markForCheck())}_invertPosition(e,i){return this.position==="above"||this.position==="below"?i==="top"?i="bottom":i==="bottom"&&(i="top"):e==="end"?e="start":e==="start"&&(e="end"),{x:e,y:i}}_updateCurrentPositionClass(e){let{overlayY:i,originX:o,originY:r}=e,a;if(i==="center"?this._dir&&this._dir.value==="rtl"?a=o==="end"?"left":"right":a=o==="start"?"left":"right":a=i==="bottom"&&r==="top"?"above":"below",a!==this._currentPosition){let s=this._overlayRef;if(s){let c=`${this._cssClassPrefix}-${sw}-`;s.removePanelClass(c+this._currentPosition),s.addPanelClass(c+a)}this._currentPosition=a}}_setupPointerEnterEventsIfNeeded(){this._disabled||!this.message||!this._viewInitialized||this._eventCleanups.length||(this._isTouchPlatform()?this.touchGestures!=="off"&&(this._disableNativeGesturesIfNecessary(),this._addListener("touchstart",e=>{let i=e.targetTouches?.[0],o=i?{x:i.clientX,y:i.clientY}:void 0;this._setupPointerExitEventsIfNeeded(),this._touchstartTimeout&&clearTimeout(this._touchstartTimeout);let r=500;this._touchstartTimeout=setTimeout(()=>{this._touchstartTimeout=null,this.show(void 0,o)},this._defaultOptions?.touchLongPressShowDelay??r)})):this._addListener("mouseenter",e=>{this._setupPointerExitEventsIfNeeded();let i;e.x!==void 0&&e.y!==void 0&&(i=e),this.show(void 0,i)}))}_setupPointerExitEventsIfNeeded(){if(!this._pointerExitEventsInitialized){if(this._pointerExitEventsInitialized=!0,!this._isTouchPlatform())this._addListener("mouseleave",e=>{let i=e.relatedTarget;(!i||!this._overlayRef?.overlayElement.contains(i))&&this.hide()}),this._addListener("wheel",e=>{if(this._isTooltipVisible()){let i=this._document.elementFromPoint(e.clientX,e.clientY),o=this._elementRef.nativeElement;i!==o&&!o.contains(i)&&this.hide()}});else if(this.touchGestures!=="off"){this._disableNativeGesturesIfNecessary();let e=()=>{this._touchstartTimeout&&clearTimeout(this._touchstartTimeout),this.hide(this._defaultOptions?.touchendHideDelay)};this._addListener("touchend",e),this._addListener("touchcancel",e)}}}_addListener(e,i){this._eventCleanups.push(this._renderer.listen(this._elementRef.nativeElement,e,i,vN))}_isTouchPlatform(){let e=this._defaultOptions?.detectHoverCapability;return typeof e=="function"?!e():this._platform.IOS||this._platform.ANDROID?!0:this._platform.isBrowser?!!e&&this._mediaMatcher.matchMedia("(any-hover: none)").matches:!1}_disableNativeGesturesIfNecessary(){let e=this.touchGestures;if(e!=="off"){let i=this._elementRef.nativeElement,o=i.style;(e==="on"||i.nodeName!=="INPUT"&&i.nodeName!=="TEXTAREA")&&(o.userSelect=o.msUserSelect=o.webkitUserSelect=o.MozUserSelect="none"),(e==="on"||!i.draggable)&&(o.webkitUserDrag="none"),o.touchAction="none",o.webkitTapHighlightColor="transparent"}}_syncAriaDescription(e){this._ariaDescriptionPending||(this._ariaDescriptionPending=!0,this._ariaDescriber.removeDescription(this._elementRef.nativeElement,e,"tooltip"),this._isDestroyed||Gt({write:()=>{this._ariaDescriptionPending=!1,this.message&&!this.disabled&&this._ariaDescriber.describe(this._elementRef.nativeElement,this.message,"tooltip")}},{injector:this._injector}))}_overlayEventPredicate=e=>e.type==="keydown"?this._isTooltipVisible()&&e.keyCode===27&&!Zo(e):!0;static \u0275fac=function(i){return new(i||t)};static \u0275dir=F({type:t,selectors:[["","matTooltip",""]],hostAttrs:[1,"mat-mdc-tooltip-trigger"],hostVars:2,hostBindings:function(i,o){i&2&&k("mat-mdc-tooltip-disabled",o.disabled)},inputs:{position:[0,"matTooltipPosition","position"],positionAtOrigin:[0,"matTooltipPositionAtOrigin","positionAtOrigin"],disabled:[0,"matTooltipDisabled","disabled"],showDelay:[0,"matTooltipShowDelay","showDelay"],hideDelay:[0,"matTooltipHideDelay","hideDelay"],touchGestures:[0,"matTooltipTouchGestures","touchGestures"],message:[0,"matTooltip","message"],tooltipClass:[0,"matTooltipClass","tooltipClass"]},exportAs:["matTooltip"]})}return t})(),cw=(()=>{class t{_changeDetectorRef=m(et);_elementRef=m(j);_isMultiline=!1;message;tooltipClass;_showTimeoutId;_hideTimeoutId;_triggerElement;_mouseLeaveHideDelay;_animationsDisabled=Ze();_tooltip;_closeOnInteraction=!1;_isVisible=!1;_onHide=new D;_showAnimation="mat-mdc-tooltip-show";_hideAnimation="mat-mdc-tooltip-hide";show(e){this._hideTimeoutId!=null&&clearTimeout(this._hideTimeoutId),this._showTimeoutId=setTimeout(()=>{this._toggleVisibility(!0),this._showTimeoutId=void 0},e)}hide(e){this._showTimeoutId!=null&&clearTimeout(this._showTimeoutId),this._hideTimeoutId=setTimeout(()=>{this._toggleVisibility(!1),this._hideTimeoutId=void 0},e)}afterHidden(){return this._onHide}isVisible(){return this._isVisible}ngOnDestroy(){this._cancelPendingAnimations(),this._onHide.complete(),this._triggerElement=null}_handleBodyInteraction(){this._closeOnInteraction&&this.hide(0)}_markForCheck(){this._changeDetectorRef.markForCheck()}_handleMouseLeave({relatedTarget:e}){(!e||!this._triggerElement.contains(e))&&(this.isVisible()?this.hide(this._mouseLeaveHideDelay):this._finalizeAnimation(!1))}_onShow(){this._isMultiline=this._isTooltipMultiline(),this._markForCheck()}_isTooltipMultiline(){let e=this._elementRef.nativeElement.getBoundingClientRect();return e.height>_N&&e.width>=wN}_handleAnimationEnd({animationName:e}){(e===this._showAnimation||e===this._hideAnimation)&&this._finalizeAnimation(e===this._showAnimation)}_cancelPendingAnimations(){this._showTimeoutId!=null&&clearTimeout(this._showTimeoutId),this._hideTimeoutId!=null&&clearTimeout(this._hideTimeoutId),this._showTimeoutId=this._hideTimeoutId=void 0}_finalizeAnimation(e){e?this._closeOnInteraction=!0:this.isVisible()||this._onHide.next()}_toggleVisibility(e){let i=this._tooltip.nativeElement,o=this._showAnimation,r=this._hideAnimation;if(i.classList.remove(e?r:o),i.classList.add(e?o:r),this._isVisible!==e&&(this._isVisible=e,this._changeDetectorRef.markForCheck()),e&&!this._animationsDisabled&&typeof getComputedStyle=="function"){let a=getComputedStyle(i);(a.getPropertyValue("animation-duration")==="0s"||a.getPropertyValue("animation-name")==="none")&&(this._animationsDisabled=!0)}e&&this._onShow(),this._animationsDisabled&&(i.classList.add("_mat-animation-noopable"),this._finalizeAnimation(e))}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=(function(){let e=["tooltip"];return L({type:t,selectors:[["mat-tooltip-component"]],viewQuery:function(o,r){if(o&1&&dt(e,7),o&2){let a;Z(a=X())&&(r._tooltip=a.first)}},hostAttrs:["aria-hidden","true"],hostBindings:function(o,r){o&1&&oe("mouseleave",function(s){return r._handleMouseLeave(s)})},decls:4,vars:5,consts:[["tooltip",""],[1,"mdc-tooltip","mat-mdc-tooltip",3,"animationend"],[1,"mat-mdc-tooltip-surface","mdc-tooltip__surface"]],template:function(o,r){o&1&&(Qe(0,"div",1,0),Cc("animationend",function(s){return r._handleAnimationEnd(s)}),Qe(2,"div",2),y(3),rt()()),o&2&&(xt(r.tooltipClass),k("mdc-tooltip--multiline",r._isMultiline),_(3),he(r.message))},styles:[`.mat-mdc-tooltip {
  position: relative;
  transform: scale(0);
  display: inline-flex;
}
.mat-mdc-tooltip::before {
  content: "";
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  position: absolute;
}
.mat-mdc-tooltip-panel-below .mat-mdc-tooltip::before {
  top: -8px;
}
.mat-mdc-tooltip-panel-above .mat-mdc-tooltip::before {
  bottom: -8px;
}
.mat-mdc-tooltip-panel-right .mat-mdc-tooltip::before {
  left: -8px;
}
.mat-mdc-tooltip-panel-left .mat-mdc-tooltip::before {
  right: -8px;
}
.mat-mdc-tooltip._mat-animation-noopable {
  animation: none;
  transform: scale(1);
}

.mat-mdc-tooltip-surface {
  word-break: normal;
  overflow-wrap: anywhere;
  padding: 4px 8px;
  min-width: 40px;
  max-width: 200px;
  min-height: 24px;
  max-height: 40vh;
  box-sizing: border-box;
  overflow: hidden;
  text-align: center;
  will-change: transform, opacity;
  background-color: var(--%NS%mat-tooltip-container-color, var(--%NS%mat-sys-inverse-surface));
  color: var(--%NS%mat-tooltip-supporting-text-color, var(--%NS%mat-sys-inverse-on-surface));
  border-radius: var(--%NS%mat-tooltip-container-shape, var(--%NS%mat-sys-corner-extra-small));
  font-family: var(--%NS%mat-tooltip-supporting-text-font, var(--%NS%mat-sys-body-small-font));
  font-size: var(--%NS%mat-tooltip-supporting-text-size, var(--%NS%mat-sys-body-small-size));
  font-weight: var(--%NS%mat-tooltip-supporting-text-weight, var(--%NS%mat-sys-body-small-weight));
  line-height: var(--%NS%mat-tooltip-supporting-text-line-height, var(--%NS%mat-sys-body-small-line-height));
  letter-spacing: var(--%NS%mat-tooltip-supporting-text-tracking, var(--%NS%mat-sys-body-small-tracking));
}
.mat-mdc-tooltip-surface::before {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 1px solid transparent;
  border-radius: inherit;
  content: "";
  pointer-events: none;
}
.mdc-tooltip--multiline .mat-mdc-tooltip-surface {
  text-align: left;
}
[dir=rtl] .mdc-tooltip--multiline .mat-mdc-tooltip-surface {
  text-align: right;
}

.mat-mdc-tooltip-panel {
  line-height: normal;
}
.mat-mdc-tooltip-panel.mat-mdc-tooltip-panel-non-interactive {
  pointer-events: none;
}

@keyframes mat-mdc-tooltip-show {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes mat-mdc-tooltip-hide {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.8);
  }
}
.mat-mdc-tooltip-show {
  animation: mat-mdc-tooltip-show 150ms cubic-bezier(0, 0, 0.2, 1) forwards;
}

.mat-mdc-tooltip-hide {
  animation: mat-mdc-tooltip-hide 75ms cubic-bezier(0.4, 0, 1, 1) forwards;
}
`],encapsulation:2})})()}return t})();var lw=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=P({imports:[jp,nf,_e,wa]})}return t})();var Vl=(()=>{class t{get vertical(){return this._vertical}set vertical(e){this._vertical=Ot(e)}_vertical=!1;get inset(){return this._inset}set inset(e){this._inset=Ot(e)}_inset=!1;static \u0275fac=function(i){return new(i||t)};static \u0275cmp=L({type:t,selectors:[["mat-divider"]],hostAttrs:["role","separator",1,"mat-divider"],hostVars:7,hostBindings:function(i,o){i&2&&(ve("aria-orientation",o.vertical?"vertical":"horizontal"),k("mat-divider-vertical",o.vertical)("mat-divider-horizontal",!o.vertical)("mat-divider-inset",o.inset))},inputs:{vertical:"vertical",inset:"inset"},decls:0,vars:0,template:function(i,o){},styles:[`.mat-divider {
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
`],encapsulation:2})}return t})(),jl=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=P({imports:[_e]})}return t})();var mw=Symbol("FIELD_TREE");var pw=Symbol("IS_ASYNC_VALIDATION_RESOURCE"),uw=class{reducer;create;brand;[pw];constructor(n,e){this.reducer=n,this.create=e}};function Sa(t){return typeof t=="function"&&t[mw]===!0}var Bl=new b("");var Hl=(()=>{class t{isErrorState(e,i){return!!(e&&e.invalid&&(e.touched||i&&i.submitted))}isSignalErrorState(e){if(!e)return!1;let i=e().invalid(),o=e().touched();return i&&o}static \u0275fac=function(i){return new(i||t)};static \u0275prov=O({token:t,factory:t.\u0275fac})}return t})();var zl=class{_defaultMatcher;_parentFormGroup;_parentForm;_stateChanges;errorState=!1;matcher;ngControl;formField;constructor(n,e,i,o,r){this._defaultMatcher=n,this._parentFormGroup=i,this._parentForm=o,this._stateChanges=r,e?wt(e.field)&&!e.updateValueAndValidity?(this.formField=e,this.ngControl=null):(this.formField=null,this.ngControl=e):this.ngControl=this.formField=null}updateErrorState(){let n=this.errorState,e=this._getCurrentErrorState(this.matcher||this._defaultMatcher);e!==n&&(this.errorState=e,this._stateChanges.next())}_getCurrentErrorState(n){if(this.formField&&n?.isSignalErrorState)return n.isSignalErrorState(this.formField.field())??!1;let e=this._parentFormGroup||this._parentForm,i=this.ngControl?this.ngControl.control:null;return n?.isErrorState(i,e)??!1}};var rf=class{_box;_destroyed=new D;_resizeSubject=new D;_resizeObserver;_elementObservables=new Map;constructor(n){this._box=n,typeof ResizeObserver<"u"&&(this._resizeObserver=new ResizeObserver(e=>this._resizeSubject.next(e)))}observe(n){return this._elementObservables.has(n)||this._elementObservables.set(n,new K(e=>{let i=this._resizeSubject.subscribe(e);return this._resizeObserver?.observe(n,{box:this._box}),()=>{this._resizeObserver?.unobserve(n),i.unsubscribe(),this._elementObservables.delete(n)}}).pipe(ge(e=>e.filter(i=>i.target===n)),mt(e=>e.length>0),ps({bufferSize:1,refCount:!0}),Re(this._destroyed))),this._elementObservables.get(n)}destroy(){this._destroyed.next(),this._destroyed.complete(),this._resizeSubject.complete(),this._elementObservables.clear()}},fw=(()=>{class t{_cleanupErrorListener;_observers=new Map;_ngZone=m(N);constructor(){typeof ResizeObserver<"u"}ngOnDestroy(){for(let[,e]of this._observers)e.destroy();this._observers.clear(),this._cleanupErrorListener?.()}observe(e,i){let o=i?.box||"content-box";return this._observers.has(o)||this._observers.set(o,new rf(o)),this._observers.get(o).observe(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=O({token:t,factory:t.\u0275fac})}return t})();var Ea=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=F({type:t,selectors:[["mat-label"]]})}return t})(),CN=new b("MatError");var af=(()=>{class t{align="start";id=m(at).getId("mat-mdc-hint-");static \u0275fac=function(i){return new(i||t)};static \u0275dir=F({type:t,selectors:[["mat-hint"]],hostAttrs:[1,"mat-mdc-form-field-hint","mat-mdc-form-field-bottom-align"],hostVars:4,hostBindings:function(i,o){i&2&&(dn("id",o.id),ve("align",null),k("mat-mdc-form-field-hint-end",o.align==="end"))},inputs:{align:"align",id:"id"}})}return t})(),SN=new b("MatPrefix");var ww=new b("MatSuffix"),sf=(()=>{class t{set _isTextSelector(e){this._isText=!0}_isText=!1;static \u0275fac=function(i){return new(i||t)};static \u0275dir=F({type:t,selectors:[["","matSuffix",""],["","matIconSuffix",""],["","matTextSuffix",""]],inputs:{_isTextSelector:[0,"matTextSuffix","_isTextSelector"]},features:[Se([{provide:ww,useExisting:t}])]})}return t})(),xw=new b("FloatingLabelParent"),hw=(()=>{class t{_elementRef=m(j);get floating(){return this._floating}set floating(e){this._floating=e,this.monitorResize&&this._handleResize()}_floating=!1;get monitorResize(){return this._monitorResize}set monitorResize(e){this._monitorResize=e,this._monitorResize?this._subscribeToResize():this._resizeSubscription.unsubscribe()}_monitorResize=!1;_resizeObserver=m(fw);_ngZone=m(N);_parent=m(xw);_resizeSubscription=new we;ngOnDestroy(){this._resizeSubscription.unsubscribe()}getWidth(){return EN(this._elementRef.nativeElement)}get element(){return this._elementRef.nativeElement}_handleResize(){setTimeout(()=>this._parent._handleLabelResized())}_subscribeToResize(){this._resizeSubscription.unsubscribe(),this._ngZone.runOutsideAngular(()=>{this._resizeSubscription=this._resizeObserver.observe(this._elementRef.nativeElement,{box:"border-box"}).subscribe(()=>this._handleResize())})}static \u0275fac=function(i){return new(i||t)};static \u0275dir=F({type:t,selectors:[["label","matFormFieldFloatingLabel",""]],hostAttrs:[1,"mdc-floating-label","mat-mdc-floating-label"],hostVars:2,hostBindings:function(i,o){i&2&&k("mdc-floating-label--float-above",o.floating)},inputs:{floating:"floating",monitorResize:"monitorResize"}})}return t})();function EN(t){let n=t;if(n.offsetParent!==null)return n.scrollWidth;let e=n.cloneNode(!0);e.style.setProperty("position","absolute"),e.style.setProperty("transform","translate(-9999px, -9999px)"),document.documentElement.appendChild(e);let i=e.scrollWidth;return e.remove(),i}var gw="mdc-line-ripple--active",Ul="mdc-line-ripple--deactivating",vw=(()=>{class t{_elementRef=m(j);_cleanupTransitionEnd;constructor(){let e=m(N),i=m(Ve);e.runOutsideAngular(()=>{this._cleanupTransitionEnd=i.listen(this._elementRef.nativeElement,"transitionend",this._handleTransitionEnd)})}activate(){let e=this._elementRef.nativeElement.classList;e.remove(Ul),e.add(gw)}deactivate(){this._elementRef.nativeElement.classList.add(Ul)}_handleTransitionEnd=e=>{let i=this._elementRef.nativeElement.classList,o=i.contains(Ul);e.propertyName==="opacity"&&o&&i.remove(gw,Ul)};ngOnDestroy(){this._cleanupTransitionEnd()}static \u0275fac=function(i){return new(i||t)};static \u0275dir=F({type:t,selectors:[["div","matFormFieldLineRipple",""]],hostAttrs:[1,"mdc-line-ripple"]})}return t})(),bw=(()=>{class t{_elementRef=m(j);_ngZone=m(N);open=!1;_notch;ngAfterViewInit(){let e=this._elementRef.nativeElement,i=e.querySelector(".mdc-floating-label");i?(e.classList.add("mdc-notched-outline--upgraded"),typeof requestAnimationFrame=="function"&&(i.style.transitionDuration="0s",this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>i.style.transitionDuration="")}))):e.classList.add("mdc-notched-outline--no-label")}_setNotchWidth(e){let i=this._notch.nativeElement;!this.open||!e?i.style.width="":i.style.width=`calc(${e}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + 9px)`}_setMaxWidth(e){this._notch.nativeElement.style.setProperty("--mat-form-field-notch-max-width",`calc(100% - ${e}px)`)}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=(function(){let e=["notch"];return L({type:t,selectors:[["div","matFormFieldNotchedOutline",""]],viewQuery:function(r,a){if(r&1&&dt(e,5),r&2){let s;Z(s=X())&&(a._notch=s.first)}},hostAttrs:[1,"mdc-notched-outline"],hostVars:2,hostBindings:function(r,a){r&2&&k("mdc-notched-outline--notched",a.open)},inputs:{open:[0,"matFormFieldNotchedOutlineOpen","open"]},ngContentSelectors:["*"],decls:5,vars:0,consts:[["notch",""],[1,"mat-mdc-notch-piece","mdc-notched-outline__leading"],[1,"mat-mdc-notch-piece","mdc-notched-outline__notch"],[1,"mat-mdc-notch-piece","mdc-notched-outline__trailing"]],template:function(r,a){r&1&&(Me(),kt(0,"div",1),Qe(1,"div",2,0),q(3),rt(),kt(4,"div",3))},encapsulation:2})})()}return t})(),cf=(()=>{class t{id;ngField=null;ngControl=null;focused=!1;empty=!1;shouldLabelFloat=!1;required=!1;disabled=!1;errorState=!1;controlType;autofilled;userAriaDescribedBy;disableAutomaticLabeling;describedByIds;stateChanges=null;value;static \u0275fac=function(i){return new(i||t)};static \u0275dir=F({type:t})}return t})();var lf=new b("MatFormField"),DN=new b("MAT_FORM_FIELD_DEFAULT_OPTIONS"),yw="fill",IN="auto",_w="fixed",MN="translateY(-50%)",$l=(()=>{class t{_elementRef=m(j);_changeDetectorRef=m(et);_platform=m(ue);_idGenerator=m(at);_ngZone=m(N);_defaults=m(DN,{optional:!0});_currentDirection;_unwrapMaybeSignal(e){return wt(e)?e():e}_textField;_iconPrefixContainer;_textPrefixContainer;_iconSuffixContainer;_textSuffixContainer;_floatingLabel;_notchedOutline;_lineRipple;_iconPrefixContainerSignal=Zr("iconPrefixContainer");_textPrefixContainerSignal=Zr("textPrefixContainer");_iconSuffixContainerSignal=Zr("iconSuffixContainer");_textSuffixContainerSignal=Zr("textSuffixContainer");_prefixSuffixContainers=Je(()=>[this._iconPrefixContainerSignal(),this._textPrefixContainerSignal(),this._iconSuffixContainerSignal(),this._textSuffixContainerSignal()].map(e=>e?.nativeElement).filter(e=>e!==void 0));_formFieldControl;_prefixChildren;_suffixChildren;_errorChildren;_hintChildren;_labelChild=zb(Ea);get hideRequiredMarker(){return this._hideRequiredMarker}set hideRequiredMarker(e){this._hideRequiredMarker=Ot(e)}_hideRequiredMarker=!1;color="primary";get floatLabel(){return this._floatLabel||this._defaults?.floatLabel||IN}set floatLabel(e){e!==this._floatLabel&&(this._floatLabel=e,this._changeDetectorRef.markForCheck())}_floatLabel;get appearance(){return this._appearanceSignal()}set appearance(e){let i=e||this._defaults?.appearance||yw;this._appearanceSignal.set(i)}_appearanceSignal=ne(yw);get subscriptSizing(){return this._subscriptSizing||this._defaults?.subscriptSizing||_w}set subscriptSizing(e){this._subscriptSizing=e||this._defaults?.subscriptSizing||_w}_subscriptSizing=null;get hintLabel(){return this._hintLabel}set hintLabel(e){this._hintLabel=e,this._processHints()}_hintLabel="";_hasIconPrefix=!1;_hasTextPrefix=!1;_hasIconSuffix=!1;_hasTextSuffix=!1;_labelId=this._idGenerator.getId("mat-mdc-form-field-label-");_hintLabelId=this._idGenerator.getId("mat-mdc-hint-");_describedByIds;get _control(){return this._explicitFormFieldControl||this._formFieldControl}set _control(e){this._explicitFormFieldControl=e}_destroyed=new D;_isFocused=null;_explicitFormFieldControl;_previousControl=null;_previousControlValidatorFn=null;_stateChanges;_valueChanges;_describedByChanges;_outlineLabelOffsetResizeObserver=null;_animationsDisabled=Ze();constructor(){let e=this._defaults,i=m(Zt);e&&(e.appearance&&(this.appearance=e.appearance),this._hideRequiredMarker=!!e?.hideRequiredMarker,e.color&&(this.color=e.color)),gt(()=>this._currentDirection=i.valueSignal()),this._syncOutlineLabelOffset()}ngAfterViewInit(){this._updateFocusState(),this._animationsDisabled||this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._elementRef.nativeElement.classList.add("mat-form-field-animations-enabled")},300)}),this._changeDetectorRef.detectChanges()}ngAfterContentInit(){this._assertFormFieldControl(),this._initializeSubscript(),this._initializePrefixAndSuffix()}ngAfterContentChecked(){this._assertFormFieldControl(),this._control!==this._previousControl&&(this._initializeControl(this._previousControl),this._control.ngControl&&this._control.ngControl.control&&(this._previousControlValidatorFn=Sa(this._control.ngField)?null:this._control.ngControl.control.validator),this._previousControl=this._control,this._changeDetectorRef.markForCheck()),this._control.ngControl&&this._control.ngControl.control&&!Sa(this._control.ngField)&&this._control.ngControl.control.validator!==this._previousControlValidatorFn&&this._changeDetectorRef.markForCheck()}ngOnDestroy(){this._outlineLabelOffsetResizeObserver?.disconnect(),this._stateChanges?.unsubscribe(),this._valueChanges?.unsubscribe(),this._describedByChanges?.unsubscribe(),this._destroyed.next(),this._destroyed.complete()}getLabelId=Je(()=>this._hasFloatingLabel()?this._labelId:null);getConnectedOverlayOrigin(){return this._textField||this._elementRef}_animateAndLockLabel(){this._hasFloatingLabel()&&(this.floatLabel="always")}_initializeControl(e){let i=this._control,o="mat-mdc-form-field-type-";e&&this._elementRef.nativeElement.classList.remove(o+e.controlType),i.controlType&&this._elementRef.nativeElement.classList.add(o+i.controlType),this._stateChanges?.unsubscribe(),this._stateChanges=i.stateChanges?.subscribe(()=>{this._updateFocusState(),this._changeDetectorRef.markForCheck()}),this._describedByChanges?.unsubscribe(),this._describedByChanges=i.stateChanges?.pipe(nn([void 0,void 0]),ge(()=>[this._unwrapMaybeSignal(i.errorState),i.userAriaDescribedBy]),ms(),mt(([[r,a],[s,c]])=>r!==s||a!==c)).subscribe(()=>this._syncDescribedByIds()),this._valueChanges?.unsubscribe(),i.ngControl&&i.ngControl.valueChanges&&!Sa(i.ngField)&&(this._valueChanges=i.ngControl.valueChanges.pipe(Re(this._destroyed)).subscribe(()=>this._changeDetectorRef.markForCheck()))}_checkPrefixAndSuffixTypes(){this._hasIconPrefix=!!this._prefixChildren.find(e=>!e._isText),this._hasTextPrefix=!!this._prefixChildren.find(e=>e._isText),this._hasIconSuffix=!!this._suffixChildren.find(e=>!e._isText),this._hasTextSuffix=!!this._suffixChildren.find(e=>e._isText)}_initializePrefixAndSuffix(){this._checkPrefixAndSuffixTypes(),ao(this._prefixChildren.changes,this._suffixChildren.changes).subscribe(()=>{this._checkPrefixAndSuffixTypes(),this._changeDetectorRef.markForCheck()})}_initializeSubscript(){this._hintChildren.changes.subscribe(()=>{this._processHints(),this._changeDetectorRef.markForCheck()}),this._errorChildren.changes.subscribe(()=>{this._syncDescribedByIds(),this._changeDetectorRef.markForCheck()}),this._validateHints(),this._syncDescribedByIds()}_assertFormFieldControl(){this._control}_updateFocusState(){let e=this._unwrapMaybeSignal(this._control.focused);e&&!this._isFocused?(this._isFocused=!0,this._lineRipple?.activate()):!e&&(this._isFocused||this._isFocused===null)&&(this._isFocused=!1,this._lineRipple?.deactivate()),this._elementRef.nativeElement.classList.toggle("mat-focused",e),this._textField?.nativeElement.classList.toggle("mdc-text-field--focused",e)}_syncOutlineLabelOffset(){Jm({earlyRead:()=>{if(this._appearanceSignal()!=="outline")return this._outlineLabelOffsetResizeObserver?.disconnect(),null;if(globalThis.ResizeObserver){this._outlineLabelOffsetResizeObserver||=new globalThis.ResizeObserver(()=>{this._writeOutlinedLabelStyles(this._getOutlinedLabelOffset())});for(let e of this._prefixSuffixContainers())this._outlineLabelOffsetResizeObserver.observe(e,{box:"border-box"})}return this._getOutlinedLabelOffset()},write:e=>this._writeOutlinedLabelStyles(e())})}_shouldAlwaysFloat(){return this.floatLabel==="always"}_hasOutline(){return this.appearance==="outline"}_forceDisplayInfixLabel(){return!this._platform.isBrowser&&this._prefixChildren.length&&!this._shouldLabelFloat()}_hasFloatingLabel=Je(()=>!!this._labelChild());_shouldLabelFloat(){return this._hasFloatingLabel()?this._shouldAlwaysFloat()||this._unwrapMaybeSignal(this._control.shouldLabelFloat):!1}_shouldForward(e){let i=this._control?.ngField||this._control?.ngControl;if(!i)return!1;if(Sa(i)){let o=i();return e==="valid"?o.valid():e==="dirty"?o.dirty():e==="touched"?o.touched():e==="pending"?o.pending():e==="untouched"?!o.touched():e==="pristine"?!o.dirty():e==="invalid"?!o.valid():!1}else{let o=i;return e==="valid"?o.valid:e==="dirty"?o.dirty:e==="touched"?o.touched:e==="pending"?o.pending:e==="untouched"?o.untouched:e==="pristine"?o.pristine:e==="invalid"?o.invalid:!1}}_getSubscriptMessageType(){return this._errorChildren&&this._errorChildren.length>0&&this._unwrapMaybeSignal(this._control.errorState)?"error":"hint"}_handleLabelResized(){this._refreshOutlineNotchWidth()}_refreshOutlineNotchWidth(){!this._hasOutline()||!this._floatingLabel||!this._shouldLabelFloat()?this._notchedOutline?._setNotchWidth(0):this._notchedOutline?._setNotchWidth(this._floatingLabel.getWidth())}_processHints(){this._validateHints(),this._syncDescribedByIds()}_validateHints(){this._hintChildren}_syncDescribedByIds(){if(this._control){let e=[];if(this._control.userAriaDescribedBy&&typeof this._control.userAriaDescribedBy=="string"&&e.push(...this._control.userAriaDescribedBy.split(" ")),this._getSubscriptMessageType()==="hint"){let r=this._hintChildren?this._hintChildren.find(s=>s.align==="start"):null,a=this._hintChildren?this._hintChildren.find(s=>s.align==="end"):null;r?e.push(r.id):this._hintLabel&&e.push(this._hintLabelId),a&&e.push(a.id)}else this._errorChildren&&e.push(...this._errorChildren.map(r=>r.id));let i=this._control.describedByIds,o;if(i){let r=this._describedByIds||e;o=e.concat(i.filter(a=>a&&!r.includes(a)))}else o=e;this._control.setDescribedByIds(o),this._describedByIds=e}}_getOutlinedLabelOffset(){if(!this._hasOutline()||!this._floatingLabel)return null;if(!this._iconPrefixContainer&&!this._textPrefixContainer)return["",null];if(!this._isAttachedToDom())return null;let e=this._iconPrefixContainer?.nativeElement,i=this._textPrefixContainer?.nativeElement,o=this._iconSuffixContainer?.nativeElement,r=this._textSuffixContainer?.nativeElement,a=e?.getBoundingClientRect().width??0,s=i?.getBoundingClientRect().width??0,c=o?.getBoundingClientRect().width??0,l=r?.getBoundingClientRect().width??0,d=this._currentDirection==="rtl"?"-1":"1",u=`${a+s}px`,p=`calc(${d} * (${u} + var(--mat-mdc-form-field-label-offset-x, 0px)))`,v=`var(--mat-mdc-form-field-label-transform, ${MN} translateX(${p}))`,x=a+s+c+l;return[v,x]}_writeOutlinedLabelStyles(e){if(e!==null){let[i,o]=e;this._floatingLabel&&(this._floatingLabel.element.style.transform=i),o!==null&&this._notchedOutline?._setMaxWidth(o)}}_isAttachedToDom(){let e=this._elementRef.nativeElement;if(e.getRootNode){let i=e.getRootNode();return i&&i!==e}return document.documentElement.contains(e)}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=(function(){let e=["iconPrefixContainer"],i=["textPrefixContainer"],o=["iconSuffixContainer"],r=["textSuffixContainer"],a=["textField"],s=["*",[["mat-label"]],[["","matPrefix",""],["","matIconPrefix",""]],[["","matTextPrefix",""]],[["","matTextSuffix",""]],[["","matSuffix",""],["","matIconSuffix",""]],[["mat-error"],["","matError",""]],[["mat-hint",3,"align","end"]],[["mat-hint","align","end"]]],c=["*","mat-label","[matPrefix], [matIconPrefix]","[matTextPrefix]","[matTextSuffix]","[matSuffix], [matIconSuffix]","mat-error, [matError]","mat-hint:not([align='end'])","mat-hint[align='end']"];function l(G,le){G&1&&fe(0,"span",21)}function d(G,le){if(G&1&&(h(0,"label",20),q(1,1),be(2,l,1,0,"span",21),g()),G&2){let w=Be(2);H("floating",w._shouldLabelFloat())("monitorResize",w._hasOutline())("id",w._labelId),ve("for",w._control.disableAutomaticLabeling?null:w._control.id),_(2),ye(!w.hideRequiredMarker&&w._unwrapMaybeSignal(w._control.required)?2:-1)}}function u(G,le){if(G&1&&be(0,d,3,5,"label",20),G&2){let w=Be();ye(w._hasFloatingLabel()?0:-1)}}function f(G,le){G&1&&fe(0,"div",7)}function p(G,le){}function v(G,le){if(G&1&&Ro(0,p,0,0,"ng-template",13),G&2){Be(2);let w=Yn(1);H("ngTemplateOutlet",w)}}function x(G,le){if(G&1&&(h(0,"div",9),be(1,v,1,1,null,13),g()),G&2){let w=Be();H("matFormFieldNotchedOutlineOpen",w._shouldLabelFloat()),_(),ye(w._forceDisplayInfixLabel()?-1:1)}}function E(G,le){G&1&&(h(0,"div",10,2),q(2,2),g())}function $(G,le){G&1&&(h(0,"div",11,3),q(2,3),g())}function ie(G,le){}function bt(G,le){if(G&1&&Ro(0,ie,0,0,"ng-template",13),G&2){Be();let w=Yn(1);H("ngTemplateOutlet",w)}}function ni(G,le){G&1&&(h(0,"div",14,4),q(2,4),g())}function Qt(G,le){G&1&&(h(0,"div",15,5),q(2,5),g())}function ii(G,le){G&1&&fe(0,"div",16)}function oi(G,le){G&1&&(h(0,"div",18),q(1,6),g())}function On(G,le){if(G&1&&(h(0,"mat-hint",22),y(1),g()),G&2){let w=Be(2);H("id",w._hintLabelId),_(),he(w.hintLabel)}}function Jt(G,le){if(G&1&&(h(0,"div",19),be(1,On,2,2,"mat-hint",22),q(2,7),fe(3,"div",23),q(4,8),g()),G&2){let w=Be();_(),ye(w.hintLabel?1:-1)}}return L({type:t,selectors:[["mat-form-field"]],contentQueries:function(le,w,me){if(le&1&&(Sc(me,w._labelChild,Ea,5),Yt(me,cf,5)(me,SN,5)(me,ww,5)(me,CN,5)(me,af,5)),le&2){Dc();let ut;Z(ut=X())&&(w._formFieldControl=ut.first),Z(ut=X())&&(w._prefixChildren=ut),Z(ut=X())&&(w._suffixChildren=ut),Z(ut=X())&&(w._errorChildren=ut),Z(ut=X())&&(w._hintChildren=ut)}},viewQuery:function(le,w){if(le&1&&(Ec(w._iconPrefixContainerSignal,e,5)(w._textPrefixContainerSignal,i,5)(w._iconSuffixContainerSignal,o,5)(w._textSuffixContainerSignal,r,5),dt(a,5)(e,5)(i,5)(o,5)(r,5)(hw,5)(bw,5)(vw,5)),le&2){Dc(4);let me;Z(me=X())&&(w._textField=me.first),Z(me=X())&&(w._iconPrefixContainer=me.first),Z(me=X())&&(w._textPrefixContainer=me.first),Z(me=X())&&(w._iconSuffixContainer=me.first),Z(me=X())&&(w._textSuffixContainer=me.first),Z(me=X())&&(w._floatingLabel=me.first),Z(me=X())&&(w._notchedOutline=me.first),Z(me=X())&&(w._lineRipple=me.first)}},hostAttrs:[1,"mat-mdc-form-field"],hostVars:38,hostBindings:function(le,w){le&2&&k("mat-mdc-form-field-label-always-float",w._shouldAlwaysFloat())("mat-mdc-form-field-has-icon-prefix",w._hasIconPrefix)("mat-mdc-form-field-has-icon-suffix",w._hasIconSuffix)("mat-form-field-invalid",w._unwrapMaybeSignal(w._control.errorState))("mat-form-field-disabled",w._unwrapMaybeSignal(w._control.disabled))("mat-form-field-autofilled",w._unwrapMaybeSignal(w._control.autofilled))("mat-form-field-appearance-fill",w.appearance=="fill")("mat-form-field-appearance-outline",w.appearance=="outline")("mat-form-field-hide-placeholder",w._hasFloatingLabel()&&!w._shouldLabelFloat())("mat-primary",w.color!=="accent"&&w.color!=="warn")("mat-accent",w.color==="accent")("mat-warn",w.color==="warn")("ng-untouched",w._shouldForward("untouched"))("ng-touched",w._shouldForward("touched"))("ng-pristine",w._shouldForward("pristine"))("ng-dirty",w._shouldForward("dirty"))("ng-valid",w._shouldForward("valid"))("ng-invalid",w._shouldForward("invalid"))("ng-pending",w._shouldForward("pending"))},inputs:{hideRequiredMarker:"hideRequiredMarker",color:"color",floatLabel:"floatLabel",appearance:"appearance",subscriptSizing:"subscriptSizing",hintLabel:"hintLabel"},exportAs:["matFormField"],features:[Se([{provide:lf,useExisting:t},{provide:xw,useExisting:t}])],ngContentSelectors:c,decls:18,vars:21,consts:[["labelTemplate",""],["textField",""],["iconPrefixContainer",""],["textPrefixContainer",""],["textSuffixContainer",""],["iconSuffixContainer",""],[1,"mat-mdc-text-field-wrapper","mdc-text-field",3,"click"],[1,"mat-mdc-form-field-focus-overlay"],[1,"mat-mdc-form-field-flex"],["matFormFieldNotchedOutline","",3,"matFormFieldNotchedOutlineOpen"],[1,"mat-mdc-form-field-icon-prefix"],[1,"mat-mdc-form-field-text-prefix"],[1,"mat-mdc-form-field-infix"],[3,"ngTemplateOutlet"],[1,"mat-mdc-form-field-text-suffix"],[1,"mat-mdc-form-field-icon-suffix"],["matFormFieldLineRipple",""],["aria-atomic","true","aria-live","polite",1,"mat-mdc-form-field-subscript-wrapper","mat-mdc-form-field-bottom-align"],[1,"mat-mdc-form-field-error-wrapper"],[1,"mat-mdc-form-field-hint-wrapper"],["matFormFieldFloatingLabel","",3,"floating","monitorResize","id"],["aria-hidden","true",1,"mat-mdc-form-field-required-marker","mdc-floating-label--required"],[3,"id"],[1,"mat-mdc-form-field-hint-spacer"]],template:function(le,w){if(le&1&&(Me(s),Ro(0,u,1,1,"ng-template",null,0,Km),h(2,"div",6,1),oe("click",function(ut){return w._control.onContainerClick(ut)}),be(4,f,1,0,"div",7),h(5,"div",8),be(6,x,2,2,"div",9),be(7,E,3,0,"div",10),be(8,$,3,0,"div",11),h(9,"div",12),be(10,bt,1,1,null,13),q(11),g(),be(12,ni,3,0,"div",14),be(13,Qt,3,0,"div",15),g(),be(14,ii,1,0,"div",16),g(),h(15,"div",17),be(16,oi,2,0,"div",18)(17,Jt,5,1,"div",19),g()),le&2){let me,ut=w._unwrapMaybeSignal(w._control.disabled);_(2),k("mdc-text-field--filled",!w._hasOutline())("mdc-text-field--outlined",w._hasOutline())("mdc-text-field--no-label",!w._hasFloatingLabel())("mdc-text-field--disabled",ut)("mdc-text-field--invalid",w._unwrapMaybeSignal(w._control.errorState)),_(2),ye(!w._hasOutline()&&!ut?4:-1),_(2),ye(w._hasOutline()?6:-1),_(),ye(w._hasIconPrefix?7:-1),_(),ye(w._hasTextPrefix?8:-1),_(2),ye(!w._hasOutline()||w._forceDisplayInfixLabel()?10:-1),_(2),ye(w._hasTextSuffix?12:-1),_(),ye(w._hasIconSuffix?13:-1),_(),ye(w._hasOutline()?-1:14),_(),k("mat-mdc-form-field-subscript-dynamic-size",w.subscriptSizing==="dynamic");let Hw=w._getSubscriptMessageType();_(),ye((me=Hw)==="error"?16:me==="hint"?17:-1)}},dependencies:[hw,bw,tp,vw,af],styles:[`.mdc-text-field {
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
`],encapsulation:2})})()}return t})();var NN=new b("mat-chips-default-options",{providedIn:"root",factory:()=>({separatorKeyCodes:[13]})}),Cw=new b("MatChipAvatar"),Sw=new b("MatChipLeadingIcon"),Ew=new b("MatChipTrailingIcon"),Dw=new b("MatChipEdit"),Iw=new b("MatChipRemove"),Mw=new b("MatChip"),Nw=(()=>{class t{_elementRef=m(j);_parentChip=m(Mw);_isPrimary=!0;_isLeading=!1;get disabled(){return this._disabled||this._parentChip?.disabled||!1}set disabled(e){this._disabled=e}_disabled=!1;tabIndex=-1;_allowFocusWhenDisabled=!1;_getDisabledAttribute(){return this.disabled&&!this._allowFocusWhenDisabled?"":null}constructor(){m(Ke).load(Rn),this._elementRef.nativeElement.nodeName==="BUTTON"&&this._elementRef.nativeElement.setAttribute("type","button")}focus(){this._elementRef.nativeElement.focus()}static \u0275fac=function(i){return new(i||t)};static \u0275dir=F({type:t,selectors:[["","matChipContent",""]],hostAttrs:[1,"mat-mdc-chip-action","mdc-evolution-chip__action","mdc-evolution-chip__action--presentational"],hostVars:8,hostBindings:function(i,o){i&2&&(ve("disabled",o._getDisabledAttribute())("aria-disabled",o.disabled),k("mdc-evolution-chip__action--primary",o._isPrimary)("mdc-evolution-chip__action--secondary",!o._isPrimary)("mdc-evolution-chip__action--trailing",!o._isPrimary&&!o._isLeading))},inputs:{disabled:[2,"disabled","disabled",Y],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?-1:zi(e)],_allowFocusWhenDisabled:"_allowFocusWhenDisabled"}})}return t})(),TN=(()=>{class t extends Nw{_getTabindex(){return this.disabled&&!this._allowFocusWhenDisabled?null:this.tabIndex.toString()}_handleClick(e){!this.disabled&&this._isPrimary&&(e.preventDefault(),this._parentChip._handlePrimaryActionInteraction())}_handleKeydown(e){(e.keyCode===13||e.keyCode===32)&&!this.disabled&&this._isPrimary&&!this._parentChip._isEditing&&(e.preventDefault(),this._parentChip._handlePrimaryActionInteraction())}static \u0275fac=(()=>{let e;return function(o){return(e||(e=ln(t)))(o||t)}})();static \u0275dir=F({type:t,selectors:[["","matChipAction",""]],hostVars:3,hostBindings:function(i,o){i&1&&oe("click",function(a){return o._handleClick(a)})("keydown",function(a){return o._handleKeydown(a)}),i&2&&(ve("tabindex",o._getTabindex()),k("mdc-evolution-chip__action--presentational",!1))},features:[We]})}return t})();var df=(()=>{class t{_changeDetectorRef=m(et);_elementRef=m(j);_tagName=m(Hb);_ngZone=m(N);_focusMonitor=m(Xt);_globalRippleOptions=m(ya,{optional:!0});_document=m(A);_onFocus=new D;_onBlur=new D;_isBasicChip=!1;role=null;_hasFocusInternal=!1;_pendingFocus=!1;_actionChanges;_animationsDisabled=Ze();_allAvatars;_allLeadingIcons;_allTrailingIcons;_allEditIcons;_allRemoveIcons;_hasFocus(){return this._hasFocusInternal}id=m(at).getId("mat-mdc-chip-");ariaLabel=null;ariaDescription=null;_chipListDisabled=!1;_hadFocusOnRemove=!1;_textElement;get value(){return this._value!==void 0?this._value:this._textElement.textContent.trim()}set value(e){this._value=e}_value;color;removable=!0;highlighted=!1;disableRipple=!1;get disabled(){return this._disabled||this._chipListDisabled}set disabled(e){this._disabled=e}_disabled=!1;removed=new de;destroyed=new de;basicChipAttrName="mat-basic-chip";avatar;leadingIcon;editIcon;trailingIcon;removeIcon;primaryAction;_rippleLoader=m(bl);_injector=m(te);constructor(){let e=m(Ke);e.load(Rn),e.load(Uc),this._monitorFocus(),this._rippleLoader?.configureRipple(this._elementRef.nativeElement,{className:"mat-mdc-chip-ripple",disabled:this._isRippleDisabled()})}ngOnInit(){this._isBasicChip=this._elementRef.nativeElement.hasAttribute(this.basicChipAttrName)||this._tagName.toLowerCase()===this.basicChipAttrName}ngAfterViewInit(){this._textElement=this._elementRef.nativeElement.querySelector(".mat-mdc-chip-action-label"),this._pendingFocus&&(this._pendingFocus=!1,this.focus())}ngAfterContentInit(){this._actionChanges=ao(this._allAvatars.changes,this._allLeadingIcons.changes,this._allTrailingIcons.changes,this._allEditIcons.changes,this._allRemoveIcons.changes).subscribe(()=>this._changeDetectorRef.markForCheck())}ngDoCheck(){this._rippleLoader.setDisabled(this._elementRef.nativeElement,this._isRippleDisabled())}ngOnDestroy(){this.destroyed.emit({chip:this}),this.destroyed.complete(),this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement),this._actionChanges?.unsubscribe()}remove(){this.removable&&(this._hadFocusOnRemove=this._hasFocus(),this.removed.emit({chip:this}))}_isRippleDisabled(){return this.disabled||this.disableRipple||this._animationsDisabled||this._isBasicChip||!this._hasInteractiveActions()||!!this._globalRippleOptions?.disabled}_hasLeadingGraphic(){return!!(this.leadingIcon||this.avatar)}_hasTrailingIcon(){return!!(this.trailingIcon||this.removeIcon)}_handleKeydown(e){(e.keyCode===8&&!e.repeat||e.keyCode===46)&&(e.preventDefault(),this.remove())}focus(){this.disabled||(this.primaryAction?this.primaryAction.focus():this._pendingFocus=!0)}_getSourceAction(e){return this._getActions().find(i=>{let o=i._elementRef.nativeElement;return o===e||o.contains(e)})}_getActions(){let e=[];return this.editIcon&&e.push(this.editIcon),this.primaryAction&&e.push(this.primaryAction),this.removeIcon&&e.push(this.removeIcon),e}_handlePrimaryActionInteraction(){}_hasInteractiveActions(){return this._getActions().length>0}_edit(e){}_monitorFocus(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(e=>{let i=e!==null;i!==this._hasFocusInternal&&(this._hasFocusInternal=i,i?this._onFocus.next({chip:this}):(this._changeDetectorRef.markForCheck(),setTimeout(()=>this._ngZone.run(()=>this._onBlur.next({chip:this})))))})}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=(function(){let e=["*",[["mat-chip-avatar"],["","matChipAvatar",""],["mat-chip-leading-icon"],["","matChipLeadingIcon",""]],[["mat-chip-trailing-icon"],["","matChipRemove",""],["","matChipTrailingIcon",""]]],i=["*","mat-chip-avatar, [matChipAvatar], mat-chip-leading-icon, [matChipLeadingIcon]","mat-chip-trailing-icon,[matChipRemove],[matChipTrailingIcon]"];function o(a,s){a&1&&(h(0,"span",3),q(1,1),g())}function r(a,s){a&1&&(h(0,"span",7),q(1,2),g())}return L({type:t,selectors:[["mat-basic-chip"],["","mat-basic-chip",""],["mat-chip"],["","mat-chip",""]],contentQueries:function(s,c,l){if(s&1&&Yt(l,Cw,5)(l,Sw,5)(l,Dw,5)(l,Ew,5)(l,Iw,5)(l,Cw,5)(l,Sw,5)(l,Ew,5)(l,Dw,5)(l,Iw,5),s&2){let d;Z(d=X())&&(c.avatar=d.first),Z(d=X())&&(c.leadingIcon=d.first),Z(d=X())&&(c.editIcon=d.first),Z(d=X())&&(c.trailingIcon=d.first),Z(d=X())&&(c.removeIcon=d.first),Z(d=X())&&(c._allAvatars=d),Z(d=X())&&(c._allLeadingIcons=d),Z(d=X())&&(c._allTrailingIcons=d),Z(d=X())&&(c._allEditIcons=d),Z(d=X())&&(c._allRemoveIcons=d)}},viewQuery:function(s,c){if(s&1&&dt(TN,5),s&2){let l;Z(l=X())&&(c.primaryAction=l.first)}},hostAttrs:[1,"mat-mdc-chip"],hostVars:33,hostBindings:function(s,c){s&1&&oe("keydown",function(d){return c._handleKeydown(d)}),s&2&&(dn("id",c.id),ve("role",c.role)("aria-label",c.ariaLabel),xt("mat-"+(c.color||"primary")),k("mdc-evolution-chip",!c._isBasicChip)("mdc-evolution-chip--disabled",c.disabled)("mdc-evolution-chip--with-trailing-action",c._hasTrailingIcon())("mdc-evolution-chip--with-primary-graphic",c._hasLeadingGraphic())("mdc-evolution-chip--with-primary-icon",c.leadingIcon||c.avatar)("mdc-evolution-chip--with-avatar",c.avatar)("mat-mdc-chip-with-avatar",c.avatar)("mat-mdc-chip-with-leading-icon",c.leadingIcon)("mat-mdc-chip-highlighted",c.highlighted)("mat-mdc-chip-disabled",c.disabled)("mat-mdc-basic-chip",c._isBasicChip)("mat-mdc-standard-chip",!c._isBasicChip)("mat-mdc-chip-with-trailing-icon",c._hasTrailingIcon())("_mat-animation-noopable",c._animationsDisabled))},inputs:{role:"role",id:"id",ariaLabel:[0,"aria-label","ariaLabel"],ariaDescription:[0,"aria-description","ariaDescription"],value:"value",color:"color",removable:[2,"removable","removable",Y],highlighted:[2,"highlighted","highlighted",Y],disableRipple:[2,"disableRipple","disableRipple",Y],disabled:[2,"disabled","disabled",Y]},outputs:{removed:"removed",destroyed:"destroyed"},exportAs:["matChip"],features:[Se([{provide:Mw,useExisting:t}])],ngContentSelectors:i,decls:9,vars:2,consts:[[1,"mat-mdc-chip-focus-overlay"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--primary"],["matChipContent",""],[1,"mdc-evolution-chip__graphic","mat-mdc-chip-graphic"],[1,"mdc-evolution-chip__text-label","mat-mdc-chip-action-label"],[1,"mat-mdc-chip-primary-focus-indicator","mat-focus-indicator"],[1,"mat-mdc-chip-touch-target"],[1,"mdc-evolution-chip__cell","mdc-evolution-chip__cell--trailing"]],template:function(s,c){s&1&&(Me(e),fe(0,"span",0),h(1,"span",1)(2,"span",2),be(3,o,2,0,"span",3),h(4,"span",4),q(5),fe(6,"span",5),g(),fe(7,"span",6),g()(),be(8,r,2,0,"span",7)),s&2&&(_(3),ye(c._hasLeadingGraphic()?3:-1),_(5),ye(c._hasTrailingIcon()?8:-1))},dependencies:[Nw],styles:[`.mdc-evolution-chip,
.mdc-evolution-chip__cell,
.mdc-evolution-chip__action {
  display: inline-flex;
  align-items: center;
}

.mdc-evolution-chip {
  position: relative;
  max-width: 100%;
}

.mat-mdc-chip-touch-target {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 48px;
  transform: translateY(-50%);
  display: var(--%NS%mat-chip-touch-target-display, block);
  pointer-events: auto;
}

.mdc-evolution-chip__cell,
.mdc-evolution-chip__action {
  height: 100%;
}

.mdc-evolution-chip__cell--primary {
  flex-basis: 100%;
  overflow-x: hidden;
}

.mdc-evolution-chip__cell--trailing {
  flex: 1 0 auto;
}

.mdc-evolution-chip__action {
  align-items: center;
  background: none;
  border: none;
  box-sizing: content-box;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  outline: none;
  padding: 0;
  text-decoration: none;
  color: inherit;
}

.mdc-evolution-chip__action--presentational {
  cursor: auto;
}

.mdc-evolution-chip--disabled,
.mdc-evolution-chip__action:disabled {
  pointer-events: none;
}
@media (forced-colors: active) {
  .mdc-evolution-chip--disabled,
  .mdc-evolution-chip__action:disabled {
    forced-color-adjust: none;
  }
}

.mdc-evolution-chip__action--primary {
  font: inherit;
  letter-spacing: inherit;
  white-space: inherit;
  overflow-x: hidden;
}
.mat-mdc-standard-chip .mdc-evolution-chip__action--%NS%primary::before {
  border-width: var(--%NS%mat-chip-outline-width, 1px);
  border-radius: var(--%NS%mat-chip-container-shape-radius, 8px);
  box-sizing: border-box;
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  pointer-events: none;
  top: 0;
  width: 100%;
  z-index: 1;
  border-style: solid;
}
.mat-mdc-standard-chip .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 12px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__action--%NS%primary::before {
  border-color: var(--%NS%mat-chip-outline-color, var(--%NS%mat-sys-outline));
}
.mdc-evolution-chip__action--%NS%primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus::before {
  border-color: var(--%NS%mat-chip-focus-outline-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__action--%NS%primary::before {
  border-color: var(--%NS%mat-chip-disabled-outline-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__action--%NS%primary::before {
  border-width: var(--%NS%mat-chip-flat-selected-outline-width, 0);
}
.mat-mdc-basic-chip .mdc-evolution-chip__action--primary {
  font: inherit;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 12px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary {
  padding-left: 12px;
  padding-right: 0;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary {
  padding-left: 0;
  padding-right: 0;
}

.mdc-evolution-chip__action--secondary {
  position: relative;
  overflow: visible;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__action--secondary {
  color: var(--%NS%mat-chip-with-trailing-icon-trailing-icon-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__action--secondary {
  color: var(--%NS%mat-chip-with-trailing-icon-disabled-trailing-icon-color, var(--%NS%mat-sys-on-surface));
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary, .mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary, .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary, .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary, [dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--secondary {
  padding-left: 8px;
  padding-right: 8px;
}

.mdc-evolution-chip__text-label {
  -webkit-user-select: none;
  user-select: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.mat-mdc-standard-chip .mdc-evolution-chip__text-label {
  font-family: var(--%NS%mat-chip-label-text-font, var(--%NS%mat-sys-label-large-font));
  line-height: var(--%NS%mat-chip-label-text-line-height, var(--%NS%mat-sys-label-large-line-height));
  font-size: var(--%NS%mat-chip-label-text-size, var(--%NS%mat-sys-label-large-size));
  font-weight: var(--%NS%mat-chip-label-text-weight, var(--%NS%mat-sys-label-large-weight));
  letter-spacing: var(--%NS%mat-chip-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label {
  color: var(--%NS%mat-chip-label-text-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--%NS%selected:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label {
  color: var(--%NS%mat-chip-selected-label-text-color, var(--%NS%mat-sys-on-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label, .mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label {
  color: var(--%NS%mat-chip-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}

.mdc-evolution-chip__graphic {
  align-items: center;
  display: inline-flex;
  justify-content: center;
  overflow: hidden;
  pointer-events: none;
  position: relative;
  flex: 1 0 auto;
}
.mat-mdc-standard-chip .mdc-evolution-chip__graphic {
  width: var(--%NS%mat-chip-with-avatar-avatar-size, 24px);
  height: var(--%NS%mat-chip-with-avatar-avatar-size, 24px);
  font-size: var(--%NS%mat-chip-with-avatar-avatar-size, 24px);
}
.mdc-evolution-chip--selecting .mdc-evolution-chip__graphic {
  transition: width 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mdc-evolution-chip--%NS%selectable:not(.mdc-evolution-chip--selected):not(.mdc-evolution-chip--with-primary-icon) .mdc-evolution-chip__graphic {
  width: 0;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {
  padding-left: 6px;
  padding-right: 6px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {
  padding-left: 4px;
  padding-right: 8px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic {
  padding-left: 8px;
  padding-right: 4px;
}
.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {
  padding-left: 6px;
  padding-right: 6px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {
  padding-left: 4px;
  padding-right: 8px;
}
[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic {
  padding-left: 8px;
  padding-right: 4px;
}
.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__graphic {
  padding-left: 0;
}

.mdc-evolution-chip__checkmark {
  position: absolute;
  opacity: 0;
  top: 50%;
  left: 50%;
  height: 20px;
  width: 20px;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__checkmark {
  color: var(--%NS%mat-chip-with-icon-selected-icon-color, var(--%NS%mat-sys-on-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__checkmark {
  color: var(--%NS%mat-chip-with-icon-disabled-icon-color, var(--%NS%mat-sys-on-surface));
}
.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark {
  transition: transform 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate(-75%, -50%);
}
.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark {
  transform: translate(-50%, -50%);
  opacity: 1;
}

.mdc-evolution-chip__checkmark-svg {
  display: block;
}

.mdc-evolution-chip__checkmark-path {
  stroke-width: 2px;
  stroke-dasharray: 29.7833385;
  stroke-dashoffset: 29.7833385;
  stroke: currentColor;
}
.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark-path {
  transition: stroke-dashoffset 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark-path {
  stroke-dashoffset: 0;
}
@media (forced-colors: active) {
  .mdc-evolution-chip__checkmark-path {
    stroke: CanvasText !important;
  }
}

.mat-mdc-standard-chip .mdc-evolution-chip__icon--trailing {
  height: 18px;
  width: 18px;
  font-size: 18px;
}
.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing.mat-mdc-chip-remove {
  opacity: calc(var(--%NS%mat-chip-trailing-action-opacity, 1) * var(--%NS%mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38));
}
.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing.mat-mdc-chip-remove:focus {
  opacity: calc(var(--%NS%mat-chip-trailing-action-focus-opacity, 1) * var(--%NS%mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38));
}

.mat-mdc-standard-chip {
  border-radius: var(--%NS%mat-chip-container-shape-radius, 8px);
  height: var(--%NS%mat-chip-container-height, 32px);
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) {
  background-color: var(--%NS%mat-chip-elevated-container-color, transparent);
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled {
  background-color: var(--%NS%mat-chip-elevated-disabled-container-color);
}
.mat-mdc-standard-chip.mdc-evolution-chip--%NS%selected:not(.mdc-evolution-chip--disabled) {
  background-color: var(--%NS%mat-chip-elevated-selected-container-color, var(--%NS%mat-sys-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled {
  background-color: var(--%NS%mat-chip-flat-disabled-selected-container-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));
}
@media (forced-colors: active) {
  .mat-mdc-standard-chip {
    outline: solid 1px;
  }
}

.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary {
  width: var(--%NS%mat-chip-with-icon-icon-size, 18px);
  height: var(--%NS%mat-chip-with-icon-icon-size, 18px);
  font-size: var(--%NS%mat-chip-with-icon-icon-size, 18px);
}
.mdc-evolution-chip--selected .mdc-evolution-chip__icon--primary {
  opacity: 0;
}
.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__icon--primary {
  color: var(--%NS%mat-chip-with-icon-icon-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--primary {
  color: var(--%NS%mat-chip-with-icon-disabled-icon-color, var(--%NS%mat-sys-on-surface));
}

.mat-mdc-chip-highlighted {
  --%NS%mat-chip-with-icon-icon-color: var(--%NS%mat-chip-with-icon-selected-icon-color, var(--%NS%mat-sys-on-secondary-container));
  --%NS%mat-chip-elevated-container-color: var(--%NS%mat-chip-elevated-selected-container-color, var(--%NS%mat-sys-secondary-container));
  --%NS%mat-chip-label-text-color: var(--%NS%mat-chip-selected-label-text-color, var(--%NS%mat-sys-on-secondary-container));
  --%NS%mat-chip-outline-width: var(--%NS%mat-chip-flat-selected-outline-width, 0);
}

.mat-mdc-chip-focus-overlay {
  background: var(--%NS%mat-chip-focus-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-chip-selected .mat-mdc-chip-focus-overlay, .mat-mdc-chip-highlighted .mat-mdc-chip-focus-overlay {
  background: var(--%NS%mat-chip-selected-focus-state-layer-color, var(--%NS%mat-sys-on-secondary-container));
}
.mat-mdc-chip:hover .mat-mdc-chip-focus-overlay {
  background: var(--%NS%mat-chip-hover-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
  opacity: var(--%NS%mat-chip-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-mdc-chip-focus-overlay .mat-mdc-chip-selected:hover, .mat-mdc-chip-highlighted:hover .mat-mdc-chip-focus-overlay {
  background: var(--%NS%mat-chip-selected-hover-state-layer-color, var(--%NS%mat-sys-on-secondary-container));
  opacity: var(--%NS%mat-chip-selected-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-mdc-chip.cdk-focused .mat-mdc-chip-focus-overlay {
  background: var(--%NS%mat-chip-focus-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
  opacity: var(--%NS%mat-chip-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mat-mdc-chip-selected.cdk-focused .mat-mdc-chip-focus-overlay, .mat-mdc-chip-highlighted.cdk-focused .mat-mdc-chip-focus-overlay {
  background: var(--%NS%mat-chip-selected-focus-state-layer-color, var(--%NS%mat-sys-on-secondary-container));
  opacity: var(--%NS%mat-chip-selected-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}

.mdc-evolution-chip--%NS%disabled:not(.mdc-evolution-chip--selected) .mat-mdc-chip-avatar {
  opacity: var(--%NS%mat-chip-with-avatar-disabled-avatar-opacity, 0.38);
}

.mdc-evolution-chip--%NS%disabled:not(.mdc-evolution-chip--selected) .mat-mdc-chip-leading-icon {
  opacity: var(--%NS%mat-chip-with-icon-disabled-icon-opacity, 0.38);
}

.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing {
  opacity: var(--%NS%mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38);
}

.mdc-evolution-chip--disabled.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark {
  opacity: var(--%NS%mat-chip-with-icon-disabled-icon-opacity, 0.38);
}

.mat-mdc-standard-chip.mdc-evolution-chip--disabled {
  opacity: var(--%NS%mat-chip-disabled-container-opacity, 1);
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__icon--trailing, .mat-mdc-standard-chip.mat-mdc-chip-highlighted .mdc-evolution-chip__icon--trailing {
  color: var(--%NS%mat-chip-selected-trailing-icon-color, var(--%NS%mat-sys-on-secondary-container));
}
.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing, .mat-mdc-standard-chip.mat-mdc-chip-highlighted.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing {
  color: var(--%NS%mat-chip-selected-disabled-trailing-icon-color, var(--%NS%mat-sys-on-surface));
}

.mat-mdc-chip-edit, .mat-mdc-chip-remove {
  opacity: var(--%NS%mat-chip-trailing-action-opacity, 1);
}
.mat-mdc-chip-edit:focus, .mat-mdc-chip-remove:focus {
  opacity: var(--%NS%mat-chip-trailing-action-focus-opacity, 1);
}
.mat-mdc-chip-edit::after, .mat-mdc-chip-remove::after {
  background-color: var(--%NS%mat-chip-trailing-action-state-layer-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-chip-edit:hover::after, .mat-mdc-chip-remove:hover::after {
  opacity: calc(var(--%NS%mat-chip-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity)) + var(--%NS%mat-chip-trailing-action-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity)));
}
.mat-mdc-chip-edit:focus::after, .mat-mdc-chip-remove:focus::after {
  opacity: calc(var(--%NS%mat-chip-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity)) + var(--%NS%mat-chip-trailing-action-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity)));
}

.mat-mdc-chip-selected .mat-mdc-chip-remove::after,
.mat-mdc-chip-highlighted .mat-mdc-chip-remove::after {
  background-color: var(--%NS%mat-chip-selected-trailing-action-state-layer-color, var(--%NS%mat-sys-on-secondary-container));
}

.mat-mdc-chip.cdk-focused .mat-mdc-chip-edit:focus::after, .mat-mdc-chip.cdk-focused .mat-mdc-chip-remove:focus::after {
  opacity: calc(var(--%NS%mat-chip-selected-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity)) + var(--%NS%mat-chip-trailing-action-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity)));
}
.mat-mdc-chip.cdk-focused .mat-mdc-chip-edit:hover::after, .mat-mdc-chip.cdk-focused .mat-mdc-chip-remove:hover::after {
  opacity: calc(var(--%NS%mat-chip-selected-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity)) + var(--%NS%mat-chip-trailing-action-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity)));
}

.mat-mdc-standard-chip {
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-standard-chip .mat-mdc-chip-graphic,
.mat-mdc-standard-chip .mat-mdc-chip-leading-icon,
.mat-mdc-standard-chip .mat-mdc-chip-trailing-icon {
  box-sizing: content-box;
}
.mat-mdc-standard-chip._mat-animation-noopable,
.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__graphic,
.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark,
.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark-path {
  transition-duration: 1ms;
  animation-duration: 1ms;
}

.mat-mdc-chip-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  opacity: 0;
  border-radius: inherit;
  transition: opacity 150ms linear;
}
._mat-animation-noopable .mat-mdc-chip-focus-overlay {
  transition: none;
}
.mat-mdc-basic-chip .mat-mdc-chip-focus-overlay {
  display: none;
}

.mat-mdc-chip .mat-ripple.mat-mdc-chip-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}

.mat-mdc-chip-avatar {
  text-align: center;
  line-height: 1;
  color: var(--%NS%mat-chip-with-icon-icon-color, currentColor);
}
.mat-mdc-standard-chip .mat-mdc-chip-avatar {
  border-radius: var(--%NS%mat-chip-with-avatar-avatar-shape-radius, 24px);
}

.mat-mdc-chip {
  position: relative;
  z-index: 0;
}

.mat-mdc-chip-action-label {
  text-align: left;
  z-index: 1;
}
[dir=rtl] .mat-mdc-chip-action-label {
  text-align: right;
}
.mat-mdc-chip.mdc-evolution-chip--with-trailing-action .mat-mdc-chip-action-label {
  position: relative;
}
.mat-mdc-chip-action-label .mat-mdc-chip-primary-focus-indicator {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
}
.mat-mdc-chip-action-label .mat-focus-indicator::before {
  margin: calc(calc(var(--%NS%mat-focus-indicator-border-width, 3px) + 2px) * -1);
}

.mat-mdc-chip-edit::before, .mat-mdc-chip-remove::before {
  margin: calc(var(--%NS%mat-focus-indicator-border-width, 3px) * -1);
  left: 8px;
  right: 8px;
}
.mat-mdc-chip-edit::after, .mat-mdc-chip-remove::after {
  content: "";
  display: block;
  opacity: 0;
  position: absolute;
  top: -3px;
  bottom: -3px;
  left: 5px;
  right: 5px;
  border-radius: 50%;
  box-sizing: border-box;
  padding: 12px;
  margin: -12px;
  background-clip: content-box;
}
.mat-mdc-chip-edit .mat-icon, .mat-mdc-chip-remove .mat-icon {
  width: 18px;
  height: 18px;
  font-size: 18px;
  box-sizing: content-box;
}

.mat-chip-edit-input {
  cursor: text;
  display: inline-block;
  color: inherit;
  outline: 0;
}

@media (forced-colors: active) {
  .mat-mdc-chip-selected:not(.mat-mdc-chip-multiple) {
    outline-width: 3px;
  }
}

.mat-mdc-chip-action:focus-visible .mat-focus-indicator::before {
  content: "";
}

.mdc-evolution-chip__icon, .mat-mdc-chip-edit .mat-icon, .mat-mdc-chip-remove .mat-icon {
  min-height: fit-content;
}

img.mdc-evolution-chip__icon {
  min-height: 0;
}
`],encapsulation:2})})()}return t})();var Tw=(()=>{class t{_elementRef=m(j);_changeDetectorRef=m(et);_dir=m(Zt,{optional:!0});_lastDestroyedFocusedChipIndex=null;_keyManager;_destroyed=new D;_defaultRole="presentation";get chipFocusChanges(){return this._getChipStream(e=>e._onFocus)}get chipDestroyedChanges(){return this._getChipStream(e=>e.destroyed)}get chipRemovedChanges(){return this._getChipStream(e=>e.removed)}get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._syncChipsState()}_disabled=!1;get empty(){return!this._chips||this._chips.length===0}get role(){return this._explicitRole?this._explicitRole:this.empty?null:this._defaultRole}tabIndex=0;set role(e){this._explicitRole=e}_explicitRole=null;get focused(){return this._hasFocusedChip()}_chips;_chipActions=new En;ngAfterViewInit(){this._setUpFocusManagement(),this._trackChipSetChanges(),this._trackDestroyedFocusedChip()}ngOnDestroy(){this._keyManager?.destroy(),this._chipActions.destroy(),this._destroyed.next(),this._destroyed.complete()}_hasFocusedChip(){return this._chips&&this._chips.some(e=>e._hasFocus())}_syncChipsState(){this._chips?.forEach(e=>{e._chipListDisabled=this._disabled,e._changeDetectorRef.markForCheck()})}focus(){}_handleKeydown(e){this._originatesFromChip(e)&&this._keyManager.onKeydown(e)}_isValidIndex(e){return e>=0&&e<this._chips.length}_allowFocusEscape(){let e=this._elementRef.nativeElement.tabIndex;e!==-1&&(this._elementRef.nativeElement.tabIndex=-1,setTimeout(()=>this._elementRef.nativeElement.tabIndex=e))}_getChipStream(e){return this._chips.changes.pipe(nn(null),hr(()=>ao(...this._chips.map(e))))}_originatesFromChip(e){let i=e.target;for(;i&&i!==this._elementRef.nativeElement;){if(i.classList.contains("mat-mdc-chip"))return!0;i=i.parentElement}return!1}_setUpFocusManagement(){this._chips.changes.pipe(nn(this._chips)).subscribe(e=>{let i=[];e.forEach(o=>o._getActions().forEach(r=>i.push(r))),this._chipActions.reset(i),this._chipActions.notifyOnChanges()}),this._keyManager=new ga(this._chipActions).withVerticalOrientation().withHorizontalOrientation(this._dir?this._dir.value:"ltr").withHomeAndEnd().skipPredicate(e=>this._skipPredicate(e)),this.chipFocusChanges.pipe(Re(this._destroyed)).subscribe(({chip:e})=>{let i=e._getSourceAction(document.activeElement);i&&this._keyManager.updateActiveItem(i)}),this._dir?.change.pipe(Re(this._destroyed)).subscribe(e=>this._keyManager.withHorizontalOrientation(e))}_skipPredicate(e){return e.disabled}_trackChipSetChanges(){this._chips.changes.pipe(nn(null),Re(this._destroyed)).subscribe(()=>{this.disabled&&Promise.resolve().then(()=>this._syncChipsState()),this._redirectDestroyedChipFocus()})}_trackDestroyedFocusedChip(){this.chipDestroyedChanges.pipe(Re(this._destroyed)).subscribe(e=>{let o=this._chips.toArray().indexOf(e.chip),r=e.chip._hasFocus(),a=e.chip._hadFocusOnRemove&&this._keyManager.activeItem&&e.chip._getActions().includes(this._keyManager.activeItem),s=r||a;this._isValidIndex(o)&&s&&(this._lastDestroyedFocusedChipIndex=o)})}_redirectDestroyedChipFocus(){if(this._lastDestroyedFocusedChipIndex!=null){if(this._chips.length){let e=Math.min(this._lastDestroyedFocusedChipIndex,this._chips.length-1),i=this._chips.toArray()[e];i.disabled?this._chips.length===1?this.focus():this._keyManager.setPreviousItemActive():i.focus()}else this.focus();this._lastDestroyedFocusedChipIndex=null}}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=(function(){return L({type:t,selectors:[["mat-chip-set"]],contentQueries:function(o,r,a){if(o&1&&Yt(a,df,5),o&2){let s;Z(s=X())&&(r._chips=s)}},hostAttrs:[1,"mat-mdc-chip-set","mdc-evolution-chip-set"],hostVars:1,hostBindings:function(o,r){o&1&&oe("keydown",function(s){return r._handleKeydown(s)}),o&2&&ve("role",r.role)},inputs:{disabled:[2,"disabled","disabled",Y],role:"role",tabIndex:[2,"tabIndex","tabIndex",i=>i==null?0:zi(i)]},ngContentSelectors:["*"],decls:2,vars:0,consts:[["role","presentation",1,"mdc-evolution-chip-set__chips"]],template:function(o,r){o&1&&(Me(),Qe(0,"div",0),q(1),rt())},styles:[`.mat-mdc-chip-set {
  display: flex;
}
.mat-mdc-chip-set:focus {
  outline: none;
}
.mat-mdc-chip-set .mdc-evolution-chip-set__chips {
  min-width: 100%;
  margin-left: -8px;
  margin-right: 0;
}
.mat-mdc-chip-set .mdc-evolution-chip {
  margin: 8px 0 8px 8px;
}
[dir=rtl] .mat-mdc-chip-set .mdc-evolution-chip-set__chips {
  margin-left: 0;
  margin-right: -8px;
}
[dir=rtl] .mat-mdc-chip-set .mdc-evolution-chip {
  margin-left: 0;
  margin-right: 8px;
}

.mdc-evolution-chip-set__chips {
  display: flex;
  flex-flow: wrap;
  min-width: 0;
}

.mat-mdc-chip-set-stacked {
  flex-direction: column;
  align-items: flex-start;
}
.mat-mdc-chip-set-stacked .mat-mdc-chip {
  width: 100%;
}
.mat-mdc-chip-set-stacked .mdc-evolution-chip__graphic {
  flex-grow: 0;
}
.mat-mdc-chip-set-stacked .mdc-evolution-chip__action--primary {
  flex-basis: 100%;
  justify-content: start;
}

input.mat-mdc-chip-input {
  flex: 1 0 150px;
  margin-left: 8px;
}
[dir=rtl] input.mat-mdc-chip-input {
  margin-left: 0;
  margin-right: 8px;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::placeholder {
  opacity: 1;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::-moz-placeholder {
  opacity: 1;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input::-webkit-input-placeholder {
  opacity: 1;
}
.mat-mdc-form-field:not(.mat-form-field-hide-placeholder) input.mat-mdc-chip-input:-ms-input-placeholder {
  opacity: 1;
}
.mat-mdc-chip-set + input.mat-mdc-chip-input {
  margin-left: 0;
  margin-right: 0;
}
`],encapsulation:2})})()}return t})();var kw=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=P({providers:[Hl,{provide:NN,useValue:{separatorKeyCodes:[13]}}],imports:[Xo,_e]})}return t})();var Da=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=P({imports:[ul,$l,_e]})}return t})();var RN=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=L({type:t,selectors:[["ng-component"]],hostAttrs:["cdk-text-field-style-loader",""],decls:0,vars:0,template:function(i,o){},styles:[`textarea.cdk-textarea-autosize {
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
`],encapsulation:2})}return t})(),ON={passive:!0},Aw=(()=>{class t{_platform=m(ue);_ngZone=m(N);_renderer=m(Ge).createRenderer(null,null);_styleLoader=m(Ke);_monitoredElements=new Map;monitor(e){if(!this._platform.isBrowser)return fi;this._styleLoader.load(RN);let i=Ct(e),o=this._monitoredElements.get(i);if(o)return o.subject;let r=new D,a="cdk-text-field-autofilled",s=l=>{l.animationName==="cdk-text-field-autofill-start"&&!i.classList.contains(a)?(i.classList.add(a),this._ngZone.run(()=>r.next({target:l.target,isAutofilled:!0}))):l.animationName==="cdk-text-field-autofill-end"&&i.classList.contains(a)&&(i.classList.remove(a),this._ngZone.run(()=>r.next({target:l.target,isAutofilled:!1})))},c=this._ngZone.runOutsideAngular(()=>(i.classList.add("cdk-text-field-autofill-monitored"),this._renderer.listen(i,"animationstart",s,ON)));return this._monitoredElements.set(i,{subject:r,unlisten:c}),r}stopMonitoring(e){let i=Ct(e),o=this._monitoredElements.get(i);o&&(o.unlisten(),o.subject.complete(),i.classList.remove("cdk-text-field-autofill-monitored"),i.classList.remove("cdk-text-field-autofilled"),this._monitoredElements.delete(i))}ngOnDestroy(){this._monitoredElements.forEach((e,i)=>this.stopMonitoring(i))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=O({token:t,factory:t.\u0275fac})}return t})();var Rw=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=P({})}return t})();var Ow=new b("MAT_INPUT_VALUE_ACCESSOR");var FN=["button","checkbox","file","hidden","image","radio","range","reset","submit"],PN=new b("MAT_INPUT_CONFIG"),Fw=(()=>{class t{_elementRef=m(j);_platform=m(ue);ngControl=m(Jn,{optional:!0,self:!0});_autofillMonitor=m(Aw);_ngZone=m(N);_formField=m(lf,{optional:!0});_renderer=m(Ve);_uid=m(at).getId("mat-input-");_previousNativeValue;_inputValueAccessor;_signalBasedValueAccessor;_previousPlaceholder=null;_errorStateTracker;_config=m(PN,{optional:!0});_cleanupIosKeyup;_cleanupWebkitWheel;_isServer=!1;_isNativeSelect=!1;_isTextarea=!1;_isInFormField=!1;focused=!1;stateChanges=new D;controlType="mat-input";autofilled=!1;get disabled(){return this._disabled}set disabled(e){this._disabled=Ot(e),this.focused&&(this.focused=!1,this.stateChanges.next())}_disabled=!1;get id(){return this._id}set id(e){this._id=e||this._uid}_id;placeholder;name;get required(){return this._required??this.ngControl?.control?.hasValidator(da.required)??!1}set required(e){this._required=Ot(e)}_required;get type(){return this._type}set type(e){this._type=e||"text",this._validateType(),!this._isTextarea&&Fp().has(this._type)&&(this._elementRef.nativeElement.type=this._type)}_type="text";get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e}userAriaDescribedBy;get value(){return this._signalBasedValueAccessor?this._signalBasedValueAccessor.value():this._inputValueAccessor.value}set value(e){e!==this.value&&(this._signalBasedValueAccessor?this._signalBasedValueAccessor.value.set(e):this._inputValueAccessor.value=e,this.stateChanges.next())}get readonly(){return this._readonly}set readonly(e){this._readonly=Ot(e)}_readonly=!1;disabledInteractive;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e}_neverEmptyInputTypes=["date","datetime","datetime-local","month","time","week"].filter(e=>Fp().has(e));constructor(){let e=m(Tp,{optional:!0}),i=m(Gi,{optional:!0}),o=m(Hl),r=m(Ow,{optional:!0,self:!0}),a=m(Bl,{optional:!0,self:!0}),s=this._elementRef.nativeElement,c=s.nodeName.toLowerCase();r?wt(r.value)?this._signalBasedValueAccessor=r:this._inputValueAccessor=r:this._inputValueAccessor=s,this._previousNativeValue=this.value,this.id=this.id,this._platform.IOS&&this._ngZone.runOutsideAngular(()=>{this._cleanupIosKeyup=this._renderer.listen(s,"keyup",this._iOSKeyupListener)}),this._errorStateTracker=new zl(o,a||this.ngControl,i,e,this.stateChanges),this._isServer=!this._platform.isBrowser,this._isNativeSelect=c==="select",this._isTextarea=c==="textarea",this._isInFormField=!!this._formField,this.disabledInteractive=this._config?.disabledInteractive||!1,this._isNativeSelect&&(this.controlType=s.multiple?"mat-native-select-multiple":"mat-native-select"),this._signalBasedValueAccessor&&gt(()=>{this._signalBasedValueAccessor.value(),this.stateChanges.next()})}ngAfterViewInit(){this._platform.isBrowser&&this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe(e=>{this.autofilled=e.isAutofilled,this.stateChanges.next()})}ngOnChanges(){this.stateChanges.next()}ngOnDestroy(){this.stateChanges.complete(),this._platform.isBrowser&&this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement),this._cleanupIosKeyup?.(),this._cleanupWebkitWheel?.()}ngDoCheck(){this.ngControl&&(this.updateErrorState(),this.ngControl.disabled!==null&&this.ngControl.disabled!==this.disabled&&(this.disabled=this.ngControl.disabled,this.stateChanges.next())),this._dirtyCheckNativeValue(),this._dirtyCheckPlaceholder()}focus(e){this._elementRef.nativeElement.focus(e)}updateErrorState(){this._errorStateTracker.updateErrorState()}_focusChanged(e){if(e!==this.focused){if(!this._isNativeSelect&&e&&this.disabled&&this.disabledInteractive){let i=this._elementRef.nativeElement;i.type==="number"?(i.type="text",i.setSelectionRange(0,0),i.type="number"):i.setSelectionRange(0,0)}this.focused=e,this.stateChanges.next()}}_onInput(){}_dirtyCheckNativeValue(){let e=this._elementRef.nativeElement.value;this._previousNativeValue!==e&&(this._previousNativeValue=e,this.stateChanges.next())}_dirtyCheckPlaceholder(){let e=this._getPlaceholder();if(e!==this._previousPlaceholder){let i=this._elementRef.nativeElement;this._previousPlaceholder=e,e?i.setAttribute("placeholder",e):i.removeAttribute("placeholder")}}_getPlaceholder(){return this.placeholder||null}_validateType(){FN.indexOf(this._type)>-1}_isNeverEmpty(){return this._neverEmptyInputTypes.indexOf(this._type)>-1}_isBadInput(){let e=this._elementRef.nativeElement.validity;return e&&e.badInput}get empty(){return!this._isNeverEmpty()&&!this._elementRef.nativeElement.value&&!this._isBadInput()&&!this.autofilled}get shouldLabelFloat(){if(this._isNativeSelect){let e=this._elementRef.nativeElement,i=e.options[0];return this.focused||e.multiple||!this.empty||!!(e.selectedIndex>-1&&i&&i.label)}else return this.focused&&!this.disabled||!this.empty}get describedByIds(){return this._elementRef.nativeElement.getAttribute("aria-describedby")?.split(" ")||[]}setDescribedByIds(e){let i=this._elementRef.nativeElement;e.length?i.setAttribute("aria-describedby",e.join(" ")):i.removeAttribute("aria-describedby")}onContainerClick(){this.focused||this.focus()}_isInlineSelect(){let e=this._elementRef.nativeElement;return this._isNativeSelect&&(e.multiple||e.size>1)}_iOSKeyupListener=e=>{let i=e.target;!i.value&&i.selectionStart===0&&i.selectionEnd===0&&(i.setSelectionRange(1,1),i.setSelectionRange(0,0))};_getReadonlyAttribute(){return this._isNativeSelect?null:this.readonly||this.disabled&&this.disabledInteractive?"true":null}static \u0275fac=function(i){return new(i||t)};static \u0275dir=F({type:t,selectors:[["input","matInput",""],["textarea","matInput",""],["select","matNativeControl",""],["input","matNativeControl",""],["textarea","matNativeControl",""]],hostAttrs:[1,"mat-mdc-input-element"],hostVars:21,hostBindings:function(i,o){i&1&&oe("focus",function(){return o._focusChanged(!0)})("blur",function(){return o._focusChanged(!1)})("input",function(){return o._onInput()}),i&2&&(dn("id",o.id)("disabled",o.disabled&&!o.disabledInteractive)("required",o.required),ve("name",o.name||null)("readonly",o._getReadonlyAttribute())("aria-disabled",o.disabled&&o.disabledInteractive?"true":null)("aria-invalid",o.empty&&o.required?null:o.errorState)("aria-required",o.required)("id",o.id),k("mat-input-server",o._isServer)("mat-mdc-form-field-textarea-control",o._isInFormField&&o._isTextarea)("mat-mdc-form-field-input-control",o._isInFormField)("mat-mdc-input-disabled-interactive",o.disabledInteractive)("mdc-text-field__input",o._isInFormField)("mat-mdc-native-select-inline",o._isInlineSelect()))},inputs:{disabled:"disabled",id:"id",placeholder:"placeholder",name:"name",required:"required",type:"type",errorStateMatcher:"errorStateMatcher",userAriaDescribedBy:[0,"aria-describedby","userAriaDescribedBy"],value:"value",readonly:"readonly",disabledInteractive:[2,"disabledInteractive","disabledInteractive",Y]},exportAs:["matInput"],features:[Se([{provide:cf,useExisting:t}]),ft]})}return t})(),Pw=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=P({imports:[Da,Da,Rw,_e]})}return t})();var Lw=(()=>{class t{labelPosition="after";static \u0275fac=function(i){return new(i||t)};static \u0275cmp=(function(){return L({type:t,selectors:[["","mat-internal-form-field",""]],hostAttrs:[1,"mdc-form-field","mat-internal-form-field"],hostVars:2,hostBindings:function(o,r){o&2&&k("mdc-form-field--align-end",r.labelPosition==="before")},inputs:{labelPosition:"labelPosition"},ngContentSelectors:["*"],decls:1,vars:0,template:function(o,r){o&1&&(Me(),q(0))},styles:[`.mat-internal-form-field {
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
`],encapsulation:2})})()}return t})();var VN=new b("mat-slide-toggle-default-options",{providedIn:"root",factory:()=>({disableToggleValue:!1,hideIcon:!1,disabledInteractive:!1})}),Gl=class{source;checked;constructor(n,e){this.source=n,this.checked=e}},uf=(()=>{class t{_elementRef=m(j);_focusMonitor=m(Xt);_changeDetectorRef=m(et);defaults=m(VN);_injector=m(te);_signalFormField=null;_onChange=e=>{};_onTouched=()=>{};_validatorOnChange=()=>{};_uniqueId;_checked=!1;_createChangeEvent(e){return new Gl(this,e)}_labelId;get buttonId(){return`${this.id||this._uniqueId}-button`}_switchElement;focus(){this._switchElement.nativeElement.focus()}_noopAnimations=Ze();_focused=!1;name=null;id;labelPosition="after";ariaLabel=null;ariaLabelledby=null;ariaDescribedby;required=!1;color;disabled=!1;fullWidth=!1;disableRipple=!1;tabIndex=0;get checked(){return this._checked}set checked(e){this._checked=e,this._changeDetectorRef.markForCheck()}hideIcon;disabledInteractive;change=new de;toggleChange=new de;get inputId(){return`${this.id||this._uniqueId}-input`}constructor(){m(Ke).load(Rn);let e=m(new Kn("tabindex"),{optional:!0}),i=this.defaults;this.tabIndex=e==null?0:parseInt(e)||0,this.color=i.color||"accent",this.id=this._uniqueId=m(at).getId("mat-mdc-slide-toggle-"),this.hideIcon=i.hideIcon??!1,this.disabledInteractive=i.disabledInteractive??!1,this._labelId=this._uniqueId+"-label"}ngOnInit(){this._signalFormField=this._injector.get(Bl,void 0,{optional:!0,self:!0})}ngAfterContentInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(e=>{e==="keyboard"||e==="program"?(this._focused=!0,this._changeDetectorRef.markForCheck()):e||Promise.resolve().then(()=>{this._focused=!1,this._onTouched(),this._changeDetectorRef.markForCheck()})})}ngOnChanges(e){e.required&&this._validatorOnChange()}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}writeValue(e){this.checked=!!e}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}validate(e){return this.required&&e.value!==!0&&!this._signalFormField?{required:!0}:null}registerOnValidatorChange(e){this._validatorOnChange=e}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck()}toggle(){this.checked=!this.checked,this._onChange(this.checked)}_emitChangeEvent(){this._onChange(this.checked),this.change.emit(this._createChangeEvent(this.checked))}_handleClick(){this.disabled||(this.toggleChange.emit(),this.defaults.disableToggleValue||(this.checked=!this.checked,this._onChange(this.checked),this.change.emit(new Gl(this,this.checked))))}_getAriaLabelledBy(){return this.ariaLabelledby?this.ariaLabelledby:this.ariaLabel?null:this._labelId}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=(function(){let e=["switch"],i=["*"];function o(r,a){r&1&&(h(0,"span",11),Tr(),h(1,"svg",13),fe(2,"path",14),g(),h(3,"svg",15),fe(4,"path",16),g()())}return L({type:t,selectors:[["mat-slide-toggle"]],viewQuery:function(a,s){if(a&1&&dt(e,5),a&2){let c;Z(c=X())&&(s._switchElement=c.first)}},hostAttrs:[1,"mat-mdc-slide-toggle"],hostVars:15,hostBindings:function(a,s){a&2&&(dn("id",s.id),ve("tabindex",null)("aria-label",null)("name",null)("aria-labelledby",null),xt(s.color?"mat-"+s.color:""),k("mat-mdc-slide-toggle-focused",s._focused)("mat-mdc-slide-toggle-checked",s.checked)("mat-slide-toggle-full-width",s.fullWidth)("_mat-animation-noopable",s._noopAnimations))},inputs:{name:"name",id:"id",labelPosition:"labelPosition",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],required:[2,"required","required",Y],color:"color",disabled:[2,"disabled","disabled",Y],fullWidth:[2,"fullWidth","fullWidth",Y],disableRipple:[2,"disableRipple","disableRipple",Y],tabIndex:[2,"tabIndex","tabIndex",r=>r==null?0:zi(r)],checked:[2,"checked","checked",Y],hideIcon:[2,"hideIcon","hideIcon",Y],disabledInteractive:[2,"disabledInteractive","disabledInteractive",Y]},outputs:{change:"change",toggleChange:"toggleChange"},exportAs:["matSlideToggle"],features:[Se([{provide:Rt,useExisting:Oe(()=>t),multi:!0},{provide:$o,useExisting:t,multi:!0}]),ft],ngContentSelectors:i,decls:14,vars:27,consts:[["switch",""],["mat-internal-form-field","",3,"labelPosition"],["role","switch","type","button",1,"mdc-switch",3,"click","tabIndex","disabled"],[1,"mat-mdc-slide-toggle-touch-target"],[1,"mdc-switch__track"],[1,"mdc-switch__handle-track"],[1,"mdc-switch__handle"],[1,"mdc-switch__shadow"],[1,"mdc-elevation-overlay"],[1,"mdc-switch__ripple"],["mat-ripple","",1,"mat-mdc-slide-toggle-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mdc-switch__icons"],[1,"mdc-label",3,"click","for"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--on"],["d","M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--off"],["d","M20 13H4v-2h16v2z"]],template:function(a,s){if(a&1&&(Me(),h(0,"div",1)(1,"button",2,0),oe("click",function(){return s._handleClick()}),fe(3,"div",3)(4,"span",4),h(5,"span",5)(6,"span",6)(7,"span",7),fe(8,"span",8),g(),h(9,"span",9),fe(10,"span",10),g(),be(11,o,5,0,"span",11),g()()(),h(12,"label",12),oe("click",function(l){return l.stopPropagation()}),q(13),g()()),a&2){let c=Yn(2);H("labelPosition",s.labelPosition),_(),k("mdc-switch--selected",s.checked)("mdc-switch--unselected",!s.checked)("mdc-switch--checked",s.checked)("mdc-switch--disabled",s.disabled)("mat-mdc-slide-toggle-disabled-interactive",s.disabledInteractive),H("tabIndex",s.disabled&&!s.disabledInteractive?-1:s.tabIndex)("disabled",s.disabled&&!s.disabledInteractive),ve("id",s.buttonId)("name",s.name)("aria-label",s.ariaLabel)("aria-labelledby",s._getAriaLabelledBy())("aria-describedby",s.ariaDescribedby)("aria-required",s.required||null)("aria-checked",s.checked)("aria-disabled",s.disabled&&s.disabledInteractive?"true":null),_(9),H("matRippleTrigger",c)("matRippleDisabled",s.disableRipple||s.disabled)("matRippleCentered",!0),_(),ye(s.hideIcon?-1:11),_(),H("for",s.buttonId),ve("id",s._labelId)}},dependencies:[gl,Lw],styles:[`.mdc-switch {
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
`],encapsulation:2})})()}return t})(),Vw=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=B({type:t});static \u0275inj=P({imports:[uf,_e]})}return t})();var jw=new b("ngx-mat-period-picker.locale-config");var er=class t{defaultConfig;config;constructor(){let n=m(Ao,{optional:!0}),e=globalThis.$localize?.locale,i=n||e||"en-US";this.defaultConfig={locale:i,useConfiguredLocale:!0};let o=m(jw,{optional:!0});o?this.config=Q(C(C({},this.defaultConfig),o),{locale:o.locale??this.defaultConfig.locale}):this.config=this.defaultConfig}setLocaleConfig(n){this.config=C(C({},this.defaultConfig),n)}getLocaleConfig(){return C({},this.config)}getLocale(){return this.config.locale}shouldUseConfiguredLocale(){return this.config.useConfiguredLocale}getEffectiveLocale(){return this.shouldUseConfiguredLocale()?this.getLocale():void 0}static \u0275fac=function(e){return new(e||t)};static \u0275prov=W({token:t,factory:t.\u0275fac,providedIn:"root"})};var Wl=class t{localeService=m(er);getShortMonthLabels(){return Array.from({length:12},(n,e)=>new Date(2e3,e,1).toLocaleDateString(this.localeService.getEffectiveLocale(),{month:"short"}))}getShortMonthLabel(n){if(n<1||n>12)throw new Error("Month number must be between 1 and 12");return new Date(2e3,n-1,1).toLocaleDateString(this.localeService.getEffectiveLocale(),{month:"short"})}static \u0275fac=function(e){return new(e||t)};static \u0275prov=W({token:t,factory:t.\u0275fac,providedIn:"root"})};function BN(t,n){if(t&1){let e=Oo();h(0,"div",1)(1,"mat-slide-toggle",11),oe("change",function(o){Ni(e);let r=Be();return Ti(r.togglePresent(o.checked))}),y(2),g()()}if(t&2){let e=Be();_(),H("checked",e.presentValue())("disabled",e.disabled()),_(),Kt(" ",e.presentLabel()," ")}}function HN(t,n){if(t&1){let e=Oo();h(0,"button",12),oe("click",function(){let o=Ni(e).$implicit,r=Be();return Ti(r.selectYear(o))}),y(1),g()}if(t&2){let e=n.$implicit,i=Be();H("matButton",i.presentValue()?"text":i.valueSignal()?.year===e?"outlined":"text")("disabled",i.disabled()||i.presentValue()),_(),Kt(" ",e," ")}}function zN(t,n){if(t&1){let e=Oo();h(0,"button",12),oe("click",function(){let o=Ni(e).$index,r=Be();return Ti(r.selectMonth(o+1))}),y(1),g()}if(t&2){let e=n.$implicit,i=n.$index,o=Be();H("matButton",o.presentValue()?"text":o.valueSignal()?.month===i+1?"outlined":"text")("disabled",o.valueSignal()?.year==null||o.presentValue()),_(),Kt(" ",e," ")}}function UN(t,n){if(t&1){let e=Oo();h(0,"button",13),oe("click",function(){Ni(e);let o=Be();return Ti(o.clear())}),y(1),g()}if(t&2){let e=Be();H("disabled",e.disabled()),_(),Kt(" ",e.clearLabel()," ")}}function $N(t,n){t&1&&fe(0,"div")}var ql=class t{minYear=re();maxYear=re();disabled=re(!1);baseYear=re();_showPresentToggle=ne(!1);showPresentToggle=this._showPresentToggle.asReadonly();_presentLabel=ne("Present");presentLabel=this._presentLabel.asReadonly();_okLabel=ne("OK");okLabel=this._okLabel.asReadonly();_clearLabel=ne("Clear");clearLabel=this._clearLabel.asReadonly();yearsPerPage=12;currentStartYear=2e3;_baseYear=void 0;_presentValue=ne(!1);presentValue=this._presentValue.asReadonly();cancelClicked=Fo();okClicked=Fo();presentValueChange=Fo();valueSignal=ne(null);originalValue=null;monthLabelService=m(Wl);constructor(){this.initializeCurrentStartYear()}initializeCurrentStartYear(){let n=this._baseYear||this.baseYear()||new Date().getFullYear();this.setCurrentStartYearForYear(n)}get months(){return this.monthLabelService.getShortMonthLabels()}get years(){let n=[];for(let e=0;e<this.yearsPerPage;e++)n.push(this.currentStartYear+e);return n}get rangeLabel(){return`${this.currentStartYear} - ${this.currentStartYear+this.yearsPerPage-1}`}canGoPrev(){return this.currentStartYear>(this.minYear()||1900)}canGoNext(){let n=this.maxYear()||2100;return this.currentStartYear+this.yearsPerPage<=n}prevRange(){this.canGoPrev()&&(this.currentStartYear-=this.yearsPerPage)}nextRange(){this.canGoNext()&&(this.currentStartYear+=this.yearsPerPage)}writeValue(n){this.valueSignal.set(n),this.originalValue=n,n?.year?this.setCurrentStartYearForYear(n.year):this.initializeCurrentStartYear()}setCurrentStartYearForYear(n){let i=this.minYear()||1900;for(;i+this.yearsPerPage<=n;)i+=this.yearsPerPage;let o=this.maxYear()||2100;i+this.yearsPerPage<=o&&(this.currentStartYear=i)}onChange=()=>{};onTouched=()=>{};registerOnChange(n){this.onChange=n}registerOnTouched(n){this.onTouched=n}selectYear(n){if(this.presentValue())return;this.valueSignal()?.year===n?this.valueSignal.set(null):(this.valueSignal.set({year:n,month:null}),this.setCurrentStartYearForYear(n)),this.onChange(this.valueSignal()),this.onTouched()}selectMonth(n){if(this.presentValue())return;let e=this.valueSignal();e?.year&&(e.month===n?this.valueSignal.set({year:e.year,month:null}):this.valueSignal.set(Q(C({},e),{month:n})),this.onChange(this.valueSignal()),this.onTouched())}getCurrentValue(){return this.valueSignal()}togglePresent(n){this._presentValue.set(n),this.presentValueChange.emit(n),n&&(this.valueSignal.set(null),this.onChange(null),this.onTouched())}setPresentValue(n){this._presentValue.set(n)}setShowPresentToggle(n){this._showPresentToggle.set(n)}setBaseYear(n){this._baseYear=n,this.initializeCurrentStartYear()}setPresentLabel(n){this._presentLabel.set(n)}setOkLabel(n){this._okLabel.set(n)}setClearLabel(n){this._clearLabel.set(n)}hasValidSelection(){let n=this.valueSignal();return!!(n&&n.year)||this.presentValue()}hasValue(){let n=this.valueSignal();return!!(n&&n.year)||this.presentValue()}hasChanges(){let n=this.valueSignal(),e=this.originalValue;return!n&&!e?!1:!n||!e?!0:n.year!==e.year||n.month!==e.month}clear(){this.valueSignal.set(null),this._presentValue.set(!1),this.presentValueChange.emit(!1),this.onChange(null),this.onTouched(),this.cancelClicked.emit()}ok(){let n=this.valueSignal();(n&&n.year||this.presentValue())&&this.okClicked.emit()}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=L({type:t,selectors:[["ngx-mat-year-month-picker-dialog"]],inputs:{minYear:[1,"minYear"],maxYear:[1,"maxYear"],disabled:[1,"disabled"],baseYear:[1,"baseYear"]},outputs:{cancelClicked:"cancelClicked",okClicked:"okClicked",presentValueChange:"presentValueChange"},features:[Se([{provide:Rt,useExisting:Oe(()=>t),multi:!0}])],decls:25,vars:9,consts:[[1,"ymp-card"],[1,"ymp-present-toggle"],[1,"ymp-header"],["matIconButton","",3,"click","disabled"],[1,"ymp-range"],[1,"ymp-years"],[1,"ymp-button",3,"matButton","disabled"],[1,"ymp-months"],[1,"ymp-actions"],["matButton","text",3,"disabled"],["matButton","filled",3,"click","disabled"],[3,"change","checked","disabled"],[1,"ymp-button",3,"click","matButton","disabled"],["matButton","text",3,"click","disabled"]],template:function(e,i){e&1&&(h(0,"mat-card",0),be(1,BN,3,3,"div",1),h(2,"div",2)(3,"button",3),oe("click",function(){return i.prevRange()}),h(4,"mat-icon"),y(5,"chevron_left"),g()(),h(6,"span",4),y(7),g(),h(8,"button",3),oe("click",function(){return i.nextRange()}),h(9,"mat-icon"),y(10,"chevron_right"),g()()(),fe(11,"mat-divider"),h(12,"div",5),wc(13,HN,2,3,"button",6,_c),g(),fe(15,"mat-divider"),h(16,"div",7),wc(17,zN,2,3,"button",6,_c),g(),fe(19,"mat-divider"),h(20,"div",8),be(21,UN,2,2,"button",9)(22,$N,1,0,"div"),h(23,"button",10),oe("click",function(){return i.ok()}),y(24),g()()()),e&2&&(_(),ye(i.showPresentToggle()?1:-1),_(2),H("disabled",!i.canGoPrev()||i.presentValue()),_(3),k("ymp-range-disabled",i.presentValue()),_(),he(i.rangeLabel),_(),H("disabled",!i.canGoNext()||i.presentValue()),_(5),xc(i.years),_(4),xc(i.months),_(4),ye(i.hasValue()?21:22),_(2),H("disabled",i.disabled()||!i.hasValidSelection()),_(),Kt(" ",i.okLabel()," "))},dependencies:[un,_l,yl,qp,ll,cl,Bo,jo,jl,Vl,Vw,uf],styles:[".ymp-card[_ngcontent-%COMP%]{padding:16px;max-width:320px;margin:0 auto;background:var( --%NS%mat-year-month-picker-card-background-color, var(--%NS%mat-sys-surface-container-high) );box-shadow:0 2px 8px #0000000a;animation:_ngcontent-%COMP%_slideInOut .2s cubic-bezier(.25,.8,.25,1) forwards}@keyframes _ngcontent-%COMP%_slideInOut{0%{transform:scale(.8);opacity:0}to{transform:scale(1);opacity:1}}.ymp-header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}.ymp-range[_ngcontent-%COMP%]{font-weight:600;font-size:var(--%NS%mat-sys-title-small-size);letter-spacing:1px}.ymp-range-disabled[_ngcontent-%COMP%]{opacity:.5}.ymp-years[_ngcontent-%COMP%], .ymp-months[_ngcontent-%COMP%]{display:grid;gap:4px;margin:8px 0}.ymp-years[_ngcontent-%COMP%], .ymp-months[_ngcontent-%COMP%]{grid-template-columns:repeat(4,1fr)}.mdc-button.ymp-button[_ngcontent-%COMP%]{--%NS%mat-button-outlined-horizontal-padding: 6px;--%NS%mat-button-filled-horizontal-padding: 6px;--%NS%mat-button-text-horizontal-padding: 6px}.ymp-present-toggle[_ngcontent-%COMP%]{padding:8px 0 16px;display:flex;justify-content:center}.ymp-present-toggle[_ngcontent-%COMP%]   .mat-slide-toggle[_ngcontent-%COMP%]{transform:scale(.8);margin:0}.ymp-actions[_ngcontent-%COMP%]{display:flex;justify-content:space-between;padding:8px 0 0;gap:8px}"]})};var Yl=class t{localeService=m(er);formatYearMonth(n){return!n||!n.year?"":n.month?new Date(n.year,n.month-1,1).toLocaleDateString(this.localeService.getEffectiveLocale(),{year:"numeric",month:"long"}):`${n.year}`}formatYearMonthDisplay(n,e){if(e<1||e>12)throw new Error("Month number must be between 1 and 12");return new Date(n,e-1,1).toLocaleDateString(this.localeService.getEffectiveLocale(),{year:"numeric",month:"long"})}formatYearDisplay(n){return n.toString()}static \u0275fac=function(e){return new(e||t)};static \u0275prov=W({token:t,factory:t.\u0275fac,providedIn:"root"})};var GN=["fieldRef"],tr=class t{fieldRef;label=re("Select Year/Month");placeholder=re("Click to select");minYear=re();maxYear=re();baseYear=re();disabled=re(!1);presentLabel=re("Present");presentValue=re(!1);showPresentToggle=re(!1);presentValueChange=Fo();okLabel=re("OK");clearLabel=re("Clear");width=re("200px");fullWidth=re(!0);computedFullWidth=Je(()=>this.width()==="200px"?this.fullWidth():!1);valueSignal=ne(null);overlayRef=null;overlay=m(Ll);displayFormatService=m(Yl);getDisplayValue(n){return this.presentValue()?this.presentLabel():this.displayFormatService.formatYearMonth(n)}openPicker(n){if(this.disabled())return;this.closePicker();let e=n.currentTarget;if(!e)return;let o=e.querySelector(".mat-mdc-text-field-wrapper")||e,r=this.overlay.position().flexibleConnectedTo(o).withPositions([{originX:"start",originY:"bottom",overlayX:"start",overlayY:"top",offsetY:8},{originX:"start",originY:"top",overlayX:"start",overlayY:"bottom",offsetY:-8}]);this.overlayRef=this.overlay.create({positionStrategy:r,scrollStrategy:this.overlay.scrollStrategies.reposition(),hasBackdrop:!0,backdropClass:"cdk-overlay-transparent-backdrop"});let a=new Yi(ql),s=this.overlayRef.attach(a);s.instance.writeValue(this.valueSignal()),s.instance.setPresentLabel(this.presentLabel()),s.instance.setPresentValue(this.presentValue()),s.instance.setShowPresentToggle(this.showPresentToggle()),s.instance.setOkLabel(this.okLabel()),s.instance.setClearLabel(this.clearLabel()),this.baseYear()!==void 0&&s.instance.setBaseYear(this.baseYear()),s.instance.registerOnChange(c=>{let l=this.valueSignal();JSON.stringify(l)!==JSON.stringify(c)&&(this.valueSignal.set(c),this.onChange(c),this.onTouched())}),s.instance.presentValueChange.subscribe(c=>{this.presentValueChange.emit(c),this.onTouched(),c&&(this.valueSignal.set(null),this.onChange(null))}),s.instance.cancelClicked.subscribe(()=>{this.closePicker()}),s.instance.okClicked.subscribe(()=>{let c=s.instance.getCurrentValue();if(c&&c.year){let l=this.valueSignal();JSON.stringify(l)!==JSON.stringify(c)&&(this.valueSignal.set(c),this.onChange(c),this.onTouched())}this.closePicker()}),this.overlayRef.backdropClick().subscribe(()=>{this.closePicker()}),this.overlayRef.keydownEvents().subscribe(c=>{c.key==="Escape"&&this.closePicker()})}closePicker(){this.overlayRef&&(this.overlayRef.dispose(),this.overlayRef=null)}writeValue(n){this.valueSignal.set(n)}onChange=()=>{};onTouched=()=>{};registerOnChange(n){this.onChange=n}registerOnTouched(n){this.onTouched=n}setDisabledState(n){}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=L({type:t,selectors:[["ngx-mat-year-month-picker"]],viewQuery:function(e,i){if(e&1&&dt(GN,7),e&2){let o;Z(o=X())&&(i.fieldRef=o.first)}},inputs:{label:[1,"label"],placeholder:[1,"placeholder"],minYear:[1,"minYear"],maxYear:[1,"maxYear"],baseYear:[1,"baseYear"],disabled:[1,"disabled"],presentLabel:[1,"presentLabel"],presentValue:[1,"presentValue"],showPresentToggle:[1,"showPresentToggle"],okLabel:[1,"okLabel"],clearLabel:[1,"clearLabel"],width:[1,"width"],fullWidth:[1,"fullWidth"]},outputs:{presentValueChange:"presentValueChange"},features:[Se([{provide:Rt,useExisting:Oe(()=>t),multi:!0}])],decls:7,vars:7,consts:[["fieldRef",""],["appearance","outline",1,"year-month-field",3,"click"],["matInput","","readonly","",3,"value","placeholder"],["matSuffix","","aria-hidden","true",1,"calendar-icon"]],template:function(e,i){e&1&&(h(0,"mat-form-field",1,0),oe("click",function(r){return i.openPicker(r)}),h(2,"mat-label"),y(3),g(),fe(4,"input",2),h(5,"mat-icon",3),y(6,"calendar_today"),g()()),e&2&&(Hi("width",i.computedFullWidth()?"100%":typeof i.width()=="number"?i.width()+"px":i.width()),k("full-width",i.computedFullWidth()),_(3),he(i.label()),_(),H("value",i.getDisplayValue(i.valueSignal()))("placeholder",i.placeholder()))},dependencies:[un,Da,$l,Ea,sf,Pw,Fw,Bo,jo],styles:[".year-month-field[_ngcontent-%COMP%]{min-width:200px}.year-month-field.full-width[_ngcontent-%COMP%]{width:100%!important;min-width:unset}.calendar-icon[_ngcontent-%COMP%]{pointer-events:none}"]})};var Kl=class t{startLabel=re("Start Period");endLabel=re("End Period");presentLabel=re("Present");startPlaceholder=re("Select start period");endPlaceholder=re("Select end period");presentPlaceholder=re("Present");okLabel=re("OK");clearLabel=re("Clear");baseYearStart=re();baseYearEnd=re();showPresentToggle=re(!0);width=re("auto");fullWidth=re(!0);fieldWidth=re("200px");fieldFullWidth=re(!0);computedFullWidth=Je(()=>this.width()==="auto"?this.fullWidth():!1);form;valueSignal=ne(null);constructor(){this.form=new ei({start:new Ne(null),end:new Ne(null),present:new Ne(!1)}),this.form.valueChanges.subscribe(()=>{let n=this.form.value,e={start:n.start,end:n.present?null:n.end,isPresent:n.present},i=this.valueSignal();JSON.stringify(i)!==JSON.stringify(e)&&(this.valueSignal.set(e),this.onChange(e),this.onTouched())}),this.form.get("present").valueChanges.subscribe(n=>{let e=this.form.get("end");n?(e?.disable({emitEvent:!1}),e?.setValue(null,{emitEvent:!1})):e?.enable({emitEvent:!1})})}writeValue(n){n?this.form.patchValue({start:n.start,end:n.isPresent?null:n.end,present:n.isPresent},{emitEvent:!1}):this.form.reset({start:null,end:null,present:!1},{emitEvent:!1})}onChange=()=>{};onTouched=()=>{};registerOnChange(n){this.onChange=n}registerOnTouched(n){this.onTouched=n}setDisabledState(n){n?this.form.disable({emitEvent:!1}):this.form.enable({emitEvent:!1})}onPresentValueChange(n){this.form.get("present")?.setValue(n,{emitEvent:!1})}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=L({type:t,selectors:[["ngx-mat-period-picker"]],inputs:{startLabel:[1,"startLabel"],endLabel:[1,"endLabel"],presentLabel:[1,"presentLabel"],startPlaceholder:[1,"startPlaceholder"],endPlaceholder:[1,"endPlaceholder"],presentPlaceholder:[1,"presentPlaceholder"],okLabel:[1,"okLabel"],clearLabel:[1,"clearLabel"],baseYearStart:[1,"baseYearStart"],baseYearEnd:[1,"baseYearEnd"],showPresentToggle:[1,"showPresentToggle"],width:[1,"width"],fullWidth:[1,"fullWidth"],fieldWidth:[1,"fieldWidth"],fieldFullWidth:[1,"fieldFullWidth"]},features:[Se([{provide:Rt,useExisting:Oe(()=>t),multi:!0}])],decls:4,vars:25,consts:[[1,"period-picker-container",3,"formGroup"],[1,"period-fields"],["formControlName","start",3,"label","placeholder","presentLabel","presentValue","showPresentToggle","baseYear","width","fullWidth","okLabel","clearLabel"],["formControlName","end",3,"presentValueChange","label","placeholder","presentLabel","presentValue","baseYear","showPresentToggle","width","fullWidth","okLabel","clearLabel"]],template:function(e,i){e&1&&(h(0,"div",0)(1,"div",1)(2,"ngx-mat-year-month-picker",2),ke(),g(),h(3,"ngx-mat-year-month-picker",3),ke(),oe("presentValueChange",function(r){return i.onPresentValueChange(r)}),g()()()),e&2&&(Hi("width",i.computedFullWidth()?"100%":typeof i.width()=="number"?i.width()+"px":i.width()),k("full-width",i.computedFullWidth()),H("formGroup",i.form),_(2),H("label",i.startLabel())("placeholder",i.startPlaceholder())("presentLabel",i.presentLabel())("presentValue",!1)("showPresentToggle",!1)("baseYear",i.baseYearStart())("width",i.fieldWidth())("fullWidth",i.fieldFullWidth())("okLabel",i.okLabel())("clearLabel",i.clearLabel()),Ae(),_(),H("label",i.endLabel())("placeholder",i.form.get("present")?.value?i.presentPlaceholder():i.endPlaceholder())("presentLabel",i.presentLabel())("presentValue",i.form.get("present")?.value)("baseYear",i.baseYearEnd())("showPresentToggle",i.showPresentToggle())("width",i.fieldWidth())("fullWidth",i.fieldFullWidth())("okLabel",i.okLabel())("clearLabel",i.clearLabel()),Ae())},dependencies:[un,Ky,rl,al,sl,Gi,ua,tr],styles:[".period-picker-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:1rem}.period-picker-container.full-width[_ngcontent-%COMP%]{width:100%!important}.period-fields[_ngcontent-%COMP%]{display:flex;gap:1rem;flex-wrap:wrap}.period-fields[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{flex:1;min-width:100px}@media(max-width:768px){.period-fields[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{flex:1 1 100%}}"]})};var Bw="ngx-mat-period-picker-theme-mode",Zl=class t{platformId=m(Cn);isBrowser=Rc(this.platformId);mode=ne(this.loadInitialMode());effectiveMode=ne(this.resolveEffectiveMode());constructor(){gt(()=>{let n=this.mode();this.applyMode(n),this.persist(n)}),this.isBrowser&&window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{this.mode()==="system"&&this.applyMode("system")})}setMode(n){this.mode.set(n)}applyMode(n){if(!this.isBrowser)return;let e=document.documentElement,i=this.resolveEffective(n);this.effectiveMode.set(i),e.style.colorScheme=n==="system"?"light dark":i}resolveEffective(n){return n==="system"?this.isBrowser&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":n}resolveEffectiveMode(){return this.resolveEffective(this.mode())}loadInitialMode(){if(this.isBrowser){let n=localStorage.getItem(Bw);if(n==="light"||n==="dark"||n==="system")return n}return"system"}persist(n){this.isBrowser&&localStorage.setItem(Bw,n)}static \u0275fac=function(e){return new(e||t)};static \u0275prov=W({token:t,factory:t.\u0275fac,providedIn:"root"})};var Xl=class t{theme=m(Zl);ngVersion="22";form=new ei({yearMonth:new Ne(null),yearMonthField:new Ne(null),period:new Ne(null),customPeriod:new Ne(null),educationPeriod:new Ne(null),germanPeriod:new Ne(null),spanishPeriod:new Ne(null),completePeriod:new Ne({start:{year:2020,month:3},end:{year:2023,month:12},isPresent:!1}),currentPeriod:new Ne({start:{year:2022,month:6},end:null,isPresent:!0}),yearOnlyPeriod:new Ne({start:{year:2018,month:null},end:{year:2022,month:null},isPresent:!1}),mixedPeriod:new Ne({start:{year:2021,month:9},end:{year:2024,month:null},isPresent:!1}),baseYear2010:new Ne(null),baseYear2035:new Ne(null),differentBaseYears:new Ne(null),singleBaseYear1995:new Ne(null),frenchField:new Ne(null),customWidthField:new Ne(null),fullWidthField:new Ne(null),fullWidthEqual:new Ne(null)});scrollToDemos(){document.querySelector(".content")?.scrollIntoView({behavior:"smooth"})}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=L({type:t,selectors:[["app-root"]],decls:299,vars:83,consts:[["demos",""],["color","primary",1,"app-toolbar"],[1,"toolbar-icon"],[1,"toolbar-title"],[1,"toolbar-subtitle"],[1,"spacer"],["aria-label","Theme mode",1,"theme-toggle",3,"change","value"],["value","light","matTooltip","Light mode"],["value","system","matTooltip","System preference"],["value","dark","matTooltip","Dark mode"],[1,"hero"],[1,"hero-inner"],["aria-label","Library highlights"],[1,"hero-title","mat-headline-2"],[1,"hero-subtitle","mat-body-1"],[1,"hero-actions"],["mat-flat-button","","color","primary","href","https://github.com/felixdulfer/ngx-mat-period-picker","target","_blank","rel","noopener"],["mat-stroked-button","","color","primary",3,"click"],[1,"content"],[1,"demo-form",3,"formGroup"],["appearance","outlined",1,"info-card"],[1,"info-card-row"],["color","primary"],[1,"demo-section"],[1,"section-title","mat-headline-5"],[1,"section-desc","mat-body-2"],[1,"card-grid"],["appearance","outlined",1,"demo-card"],[1,"mat-title-medium"],["formControlName","yearMonth",3,"width"],[1,"code-output"],["formControlName","yearMonthField",3,"width"],[1,"card-grid","card-grid-wide"],["formControlName","period"],["formControlName","customPeriod","startLabel","Employment Start","endLabel","Employment End","presentLabel","Currently Employed","startPlaceholder","When did you start?","endPlaceholder","When did you end?","presentPlaceholder","Still working here",3,"showPresentToggle"],["formControlName","educationPeriod","startLabel","Study Start Date","endLabel","Graduation Date","presentLabel","Currently Studying","startPlaceholder","Select start date","endPlaceholder","Select graduation date","presentPlaceholder","Still studying",3,"showPresentToggle"],["formControlName","germanPeriod","startLabel","Startdatum","endLabel","Enddatum","presentLabel","Gegenw\xE4rtig","startPlaceholder","Wann haben Sie angefangen?","endPlaceholder","Wann haben Sie aufgeh\xF6rt?","presentPlaceholder","Arbeiten Sie noch hier?",3,"okLabel","clearLabel","showPresentToggle"],["formControlName","spanishPeriod","startLabel","Fecha de Inicio","endLabel","Fecha de Fin","presentLabel","Actualmente","startPlaceholder","\xBFCu\xE1ndo comenz\xF3?","endPlaceholder","\xBFCu\xE1ndo termin\xF3?","presentPlaceholder","\xBFTodav\xEDa trabaja aqu\xED?",3,"okLabel","clearLabel","showPresentToggle"],["formControlName","frenchField","label","Date Historique","placeholder","S\xE9lectionnez l'ann\xE9e/mois",3,"okLabel","clearLabel","width"],["formControlName","completePeriod","startLabel","Start Date","endLabel","End Date","presentLabel","Present"],["formControlName","currentPeriod","startLabel","Start Date","endLabel","End Date","presentLabel","Present"],["formControlName","yearOnlyPeriod","startLabel","Start Year","endLabel","End Year","presentLabel","Present"],["formControlName","mixedPeriod","startLabel","Start Date","endLabel","End Year","presentLabel","Present"],["formControlName","baseYear2010","startLabel","Start Date","endLabel","End Date","presentLabel","Present",3,"baseYearStart","baseYearEnd"],["formControlName","baseYear2035","startLabel","Start Date","endLabel","End Date","presentLabel","Present",3,"baseYearStart","baseYearEnd"],["formControlName","differentBaseYears","startLabel","Birth Year","endLabel","Retirement Year","presentLabel","Still Working",3,"baseYearStart","baseYearEnd"],["formControlName","singleBaseYear1995","label","Historical Date","placeholder","Select historical year/month",3,"baseYear","width"],["formControlName","customWidthField","label","Custom Width","placeholder","300px width",3,"width"],["formControlName","fullWidthField","label","Full Width","placeholder","Takes full container width",3,"fullWidth"],["appearance","outlined",1,"demo-card","demo-card-wide"],["formControlName","fullWidthEqual","startLabel","Start Date","endLabel","End Date"],[1,"footer"],[1,"footer-inner"],[1,"mat-body-2"],[1,"mat-body-2","footer-dim"]],template:function(e,i){e&1&&(h(0,"mat-toolbar",1)(1,"mat-icon",2),y(2,"calendar_month"),g(),h(3,"span",3),y(4,"ngx-mat-period-picker"),g(),h(5,"span",4),y(6,"Live Demo"),g(),fe(7,"span",5),h(8,"mat-button-toggle-group",6),oe("change",function(r){return i.theme.setMode(r.value)}),h(9,"mat-button-toggle",7)(10,"mat-icon"),y(11,"light_mode"),g()(),h(12,"mat-button-toggle",8)(13,"mat-icon"),y(14,"brightness_auto"),g()(),h(15,"mat-button-toggle",9)(16,"mat-icon"),y(17,"dark_mode"),g()()()(),h(18,"header",10)(19,"div",11)(20,"mat-chip-set",12)(21,"mat-chip"),y(22,"Angular Material 3"),g(),h(23,"mat-chip"),y(24,"Standalone"),g(),h(25,"mat-chip"),y(26,"Reactive Forms"),g(),h(27,"mat-chip"),y(28,"i18n-ready"),g()(),h(29,"h1",13),y(30," A Material 3 period picker for Angular "),g(),h(31,"p",14),y(32,' Pick date ranges with year/month granularity, "present" toggles, custom labels, and full locale support \u2014 all built on Angular Material. '),g(),h(33,"div",15)(34,"a",16)(35,"mat-icon"),y(36,"code"),g(),y(37," View on GitHub "),g(),h(38,"button",17),oe("click",function(){return i.scrollToDemos()}),h(39,"mat-icon"),y(40,"arrow_downward"),g(),y(41," Explore demos "),g()()()(),h(42,"main",18,0)(44,"form",19)(45,"mat-card",20)(46,"mat-card-content")(47,"div",21)(48,"mat-icon",22),y(49,"translate"),g(),h(50,"div")(51,"strong"),y(52,"Locale-aware by default."),g(),y(53," Month names and date formatting follow Angular's configured "),h(54,"code"),y(55,"LOCALE_ID"),g(),y(56,". Override per-instance with custom labels and button text (see German, Spanish & French examples below). "),g()()()(),h(57,"section",23)(58,"h2",24),y(59,"Basic Pickers"),g(),h(60,"p",25),y(61," The original year/month picker and the newer text-field variant. "),g(),h(62,"div",26)(63,"mat-card",27)(64,"mat-card-header")(65,"mat-card-title",28),y(66,"Year/Month Picker"),g(),h(67,"mat-card-subtitle"),y(68,"Original component"),g()(),h(69,"mat-card-content")(70,"ngx-mat-year-month-picker",29),ke(),g(),h(71,"pre",30),y(72),He(73,"json"),g()()(),h(74,"mat-card",27)(75,"mat-card-header")(76,"mat-card-title",28),y(77,"Year/Month Field"),g(),h(78,"mat-card-subtitle"),y(79,"Text-field variant"),g()(),h(80,"mat-card-content")(81,"ngx-mat-year-month-picker",31),ke(),g(),h(82,"pre",30),y(83),He(84,"json"),g()()()()(),h(85,"section",23)(86,"h2",24),y(87,"Period Picker Variants"),g(),h(88,"p",25),y(89," Custom labels, present toggles, and internationalised buttons. "),g(),h(90,"div",32)(91,"mat-card",27)(92,"mat-card-header")(93,"mat-card-title",28),y(94,"Default Labels"),g(),h(95,"mat-card-subtitle"),y(96,"Out of the box"),g()(),h(97,"mat-card-content")(98,"ngx-mat-period-picker",33),ke(),g(),h(99,"pre",30),y(100),He(101,"json"),g()()(),h(102,"mat-card",27)(103,"mat-card-header")(104,"mat-card-title",28),y(105,"Employment"),g(),h(106,"mat-card-subtitle"),y(107,"Custom labels + present toggle"),g()(),h(108,"mat-card-content")(109,"ngx-mat-period-picker",34),ke(),g(),h(110,"pre",30),y(111),He(112,"json"),g()()(),h(113,"mat-card",27)(114,"mat-card-header")(115,"mat-card-title",28),y(116,"Education"),g(),h(117,"mat-card-subtitle"),y(118,"No present toggle"),g()(),h(119,"mat-card-content")(120,"ngx-mat-period-picker",35),ke(),g(),h(121,"pre",30),y(122),He(123,"json"),g()()(),h(124,"mat-card",27)(125,"mat-card-header")(126,"mat-card-title",28),y(127,"Deutsch \u{1F1E9}\u{1F1EA}"),g(),h(128,"mat-card-subtitle"),y(129,"German labels & buttons"),g()(),h(130,"mat-card-content")(131,"ngx-mat-period-picker",36),ke(),g(),h(132,"pre",30),y(133),He(134,"json"),g()()(),h(135,"mat-card",27)(136,"mat-card-header")(137,"mat-card-title",28),y(138,"Espa\xF1ol \u{1F1EA}\u{1F1F8}"),g(),h(139,"mat-card-subtitle"),y(140,"Spanish labels & buttons"),g()(),h(141,"mat-card-content")(142,"ngx-mat-period-picker",37),ke(),g(),h(143,"pre",30),y(144),He(145,"json"),g()()(),h(146,"mat-card",27)(147,"mat-card-header")(148,"mat-card-title",28),y(149,"Fran\xE7ais \u{1F1EB}\u{1F1F7}"),g(),h(150,"mat-card-subtitle"),y(151,"French single-field buttons"),g()(),h(152,"mat-card-content")(153,"ngx-mat-year-month-picker",38),ke(),g(),h(154,"pre",30),y(155),He(156,"json"),g()()()()(),h(157,"section",23)(158,"h2",24),y(159,"Pre-filled Examples"),g(),h(160,"p",25),y(161," Different period shapes: complete, ongoing, year-only, and mixed granularity. "),g(),h(162,"div",32)(163,"mat-card",27)(164,"mat-card-header")(165,"mat-card-title",28),y(166,"Complete Period"),g(),h(167,"mat-card-subtitle"),y(168,"Start + End"),g()(),h(169,"mat-card-content")(170,"ngx-mat-period-picker",39),ke(),g(),h(171,"pre",30),y(172),He(173,"json"),g()()(),h(174,"mat-card",27)(175,"mat-card-header")(176,"mat-card-title",28),y(177,"Current Period"),g(),h(178,"mat-card-subtitle"),y(179,"Start + Present"),g()(),h(180,"mat-card-content")(181,"ngx-mat-period-picker",40),ke(),g(),h(182,"pre",30),y(183),He(184,"json"),g()()(),h(185,"mat-card",27)(186,"mat-card-header")(187,"mat-card-title",28),y(188,"Year-Only Period"),g(),h(189,"mat-card-subtitle"),y(190,"Start year + End year"),g()(),h(191,"mat-card-content")(192,"ngx-mat-period-picker",41),ke(),g(),h(193,"pre",30),y(194),He(195,"json"),g()()(),h(196,"mat-card",27)(197,"mat-card-header")(198,"mat-card-title",28),y(199,"Mixed Granularity"),g(),h(200,"mat-card-subtitle"),y(201,"Year/Month start + Year-only end"),g()(),h(202,"mat-card-content")(203,"ngx-mat-period-picker",42),ke(),g(),h(204,"pre",30),y(205),He(206,"json"),g()()()()(),h(207,"section",23)(208,"h2",24),y(209,"Base Year Configuration"),g(),h(210,"p",25),y(211," Control which year interval the picker opens on when a field is empty. "),g(),h(212,"div",32)(213,"mat-card",27)(214,"mat-card-header")(215,"mat-card-title",28),y(216,"Base Year 2010"),g(),h(217,"mat-card-subtitle"),y(218,"Opens near 2010"),g()(),h(219,"mat-card-content")(220,"ngx-mat-period-picker",43),ke(),g(),h(221,"pre",30),y(222),He(223,"json"),g()()(),h(224,"mat-card",27)(225,"mat-card-header")(226,"mat-card-title",28),y(227,"Base Year 2035"),g(),h(228,"mat-card-subtitle"),y(229,"Opens near 2035"),g()(),h(230,"mat-card-content")(231,"ngx-mat-period-picker",44),ke(),g(),h(232,"pre",30),y(233),He(234,"json"),g()()(),h(235,"mat-card",27)(236,"mat-card-header")(237,"mat-card-title",28),y(238,"Different Base Years"),g(),h(239,"mat-card-subtitle"),y(240,"Birth 1990 / Retirement 2070"),g()(),h(241,"mat-card-content")(242,"ngx-mat-period-picker",45),ke(),g(),h(243,"pre",30),y(244),He(245,"json"),g()()(),h(246,"mat-card",27)(247,"mat-card-header")(248,"mat-card-title",28),y(249,"Single Field, Base 1995"),g(),h(250,"mat-card-subtitle"),y(251,"Historical date picker"),g()(),h(252,"mat-card-content")(253,"ngx-mat-year-month-picker",46),ke(),g(),h(254,"pre",30),y(255),He(256,"json"),g()()()()(),h(257,"section",23)(258,"h2",24),y(259,"Width & Layout"),g(),h(260,"p",25),y(261," Fixed pixel widths, custom widths, and full-width layouts. "),g(),h(262,"div",26)(263,"mat-card",27)(264,"mat-card-header")(265,"mat-card-title",28),y(266,"Custom Width (300px)"),g()(),h(267,"mat-card-content")(268,"ngx-mat-year-month-picker",47),ke(),g(),h(269,"pre",30),y(270),He(271,"json"),g()()(),h(272,"mat-card",27)(273,"mat-card-header")(274,"mat-card-title",28),y(275,"Full Width Field"),g()(),h(276,"mat-card-content")(277,"ngx-mat-year-month-picker",48),ke(),g(),h(278,"pre",30),y(279),He(280,"json"),g()()(),h(281,"mat-card",49)(282,"mat-card-header")(283,"mat-card-title",28),y(284,"Full-Width Period Picker"),g(),h(285,"mat-card-subtitle"),y(286,"Equal field widths, fills the card"),g()(),h(287,"mat-card-content")(288,"ngx-mat-period-picker",50),ke(),g(),h(289,"pre",30),y(290),He(291,"json"),g()()()()()()(),h(292,"footer",51),fe(293,"mat-divider"),h(294,"div",52)(295,"span",53),y(296,"ngx-mat-period-picker \u2014 MIT License"),g(),h(297,"span",54),y(298),g()()()),e&2&&(_(8),H("value",i.theme.mode()),_(36),H("formGroup",i.form),_(26),H("width",250),Ae(),_(2),he(ze(73,45,i.form.value.yearMonth)),_(9),H("width",250),Ae(),_(2),he(ze(84,47,i.form.value.yearMonthField)),_(15),Ae(),_(2),he(ze(101,49,i.form.value.period)),_(9),H("showPresentToggle",!0),Ae(),_(2),he(ze(112,51,i.form.value.customPeriod)),_(9),H("showPresentToggle",!1),Ae(),_(2),he(ze(123,53,i.form.value.educationPeriod)),_(9),H("okLabel","Best\xE4tigen")("clearLabel","L\xF6schen")("showPresentToggle",!0),Ae(),_(2),he(ze(134,55,i.form.value.germanPeriod)),_(9),H("okLabel","Confirmar")("clearLabel","Borrar")("showPresentToggle",!0),Ae(),_(2),he(ze(145,57,i.form.value.spanishPeriod)),_(9),H("okLabel","Valider")("clearLabel","Effacer")("width",250),Ae(),_(2),he(ze(156,59,i.form.value.frenchField)),_(15),Ae(),_(2),he(ze(173,61,i.form.value.completePeriod)),_(9),Ae(),_(2),he(ze(184,63,i.form.value.currentPeriod)),_(9),Ae(),_(2),he(ze(195,65,i.form.value.yearOnlyPeriod)),_(9),Ae(),_(2),he(ze(206,67,i.form.value.mixedPeriod)),_(15),H("baseYearStart",2010)("baseYearEnd",2010),Ae(),_(2),he(ze(223,69,i.form.value.baseYear2010)),_(9),H("baseYearStart",2035)("baseYearEnd",2035),Ae(),_(2),he(ze(234,71,i.form.value.baseYear2035)),_(9),H("baseYearStart",1990)("baseYearEnd",2070),Ae(),_(2),he(ze(245,73,i.form.value.differentBaseYears)),_(9),H("baseYear",1995)("width",250),Ae(),_(2),he(ze(256,75,i.form.value.singleBaseYear1995)),_(13),H("width",300),Ae(),_(2),he(ze(271,77,i.form.value.customWidthField)),_(7),H("fullWidth",!0),Ae(),_(2),he(ze(280,79,i.form.value.fullWidthField)),_(9),Ae(),_(2),he(ze(291,81,i.form.value.fullWidthEqual)),_(8),Kt(" Built with Angular ",i.ngVersion," & Material 3 "))},dependencies:[sl,Wy,rl,al,Gi,ua,un,n_,t_,ll,cl,o_,a_,r_,i_,_l,yl,H_,Yp,Cl,Bo,jo,lw,of,jl,Vl,kw,df,Tw,Kl,tr,np],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;min-height:100vh}.app-toolbar[_ngcontent-%COMP%]{position:sticky;top:0;z-index:100;gap:.5rem}.toolbar-icon[_ngcontent-%COMP%]{margin-right:.25rem}.toolbar-title[_ngcontent-%COMP%]{font-weight:600;font-size:1.125rem;letter-spacing:-.01em}.toolbar-subtitle[_ngcontent-%COMP%]{font-size:.75rem;opacity:.75;font-weight:400;margin-left:.25rem;padding:.125rem .5rem;border-radius:999px;background:#ffffff26}.spacer[_ngcontent-%COMP%]{flex:1 1 auto}.theme-toggle[_ngcontent-%COMP%]{--%NS%mat-standard-button-toggle-height: 36px}.theme-toggle[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:20px;width:20px;height:20px}.hero[_ngcontent-%COMP%]{background:radial-gradient(ellipse 80% 50% at 50% -20%,var(--%NS%mat-sys-primary-container) 0%,transparent 70%),var(--%NS%mat-sys-surface);padding:4rem 1.5rem 3rem;text-align:center}.hero-inner[_ngcontent-%COMP%]{max-width:760px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:1.25rem}.hero-title[_ngcontent-%COMP%]{margin:0;font-weight:700;letter-spacing:-.02em;line-height:1.15;background:linear-gradient(135deg,var(--%NS%mat-sys-primary),var(--%NS%mat-sys-tertiary));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}.hero-subtitle[_ngcontent-%COMP%]{margin:0;max-width:560px;color:var(--%NS%mat-sys-on-surface-variant);line-height:1.6}.hero-actions[_ngcontent-%COMP%]{display:flex;gap:.75rem;flex-wrap:wrap;justify-content:center;margin-top:.5rem}.hero-actions[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{margin-right:.25rem}.content[_ngcontent-%COMP%]{flex:1;width:100%;max-width:1100px;margin:0 auto;padding:2rem 1.5rem 3rem;box-sizing:border-box}.demo-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:2.5rem}.info-card[_ngcontent-%COMP%]{border-left:4px solid var(--%NS%mat-sys-primary)}.info-card-row[_ngcontent-%COMP%]{display:flex;align-items:flex-start;gap:.75rem;line-height:1.6}.info-card-row[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{flex-shrink:0;margin-top:.125rem}.info-card-row[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{font-family:Roboto Mono,monospace;font-size:.85em;background:var(--%NS%mat-sys-surface-container-highest);padding:.1em .4em;border-radius:4px}.demo-section[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:1rem}.section-title[_ngcontent-%COMP%]{margin:0;font-weight:600;letter-spacing:-.01em}.section-desc[_ngcontent-%COMP%]{margin:0;color:var(--%NS%mat-sys-on-surface-variant)}.card-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:1rem}.card-grid-wide[_ngcontent-%COMP%]{grid-template-columns:repeat(auto-fill,minmax(440px,1fr))}.demo-card[_ngcontent-%COMP%]{overflow:hidden;transition:box-shadow .2s ease,transform .2s ease}.demo-card[_ngcontent-%COMP%]:hover{box-shadow:var(--%NS%mat-sys-elevation-2, 0 3px 6px rgba(0,0,0,.1))}.demo-card-wide[_ngcontent-%COMP%]{grid-column:1 / -1}.demo-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]{padding-top:1rem;display:flex;flex-direction:column;gap:.25rem}.footer[_ngcontent-%COMP%]{margin-top:auto}.footer-inner[_ngcontent-%COMP%]{max-width:1100px;margin:0 auto;padding:1.5rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem}.footer-dim[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-on-surface-variant)}@media(max-width:600px){.hero[_ngcontent-%COMP%]{padding:2.5rem 1rem 2rem}.toolbar-subtitle[_ngcontent-%COMP%]{display:none}.card-grid[_ngcontent-%COMP%], .card-grid-wide[_ngcontent-%COMP%]{grid-template-columns:1fr}}"]})};up(Xl,Q(C({},xp),{providers:[...xp.providers]})).catch(t=>console.error(t));

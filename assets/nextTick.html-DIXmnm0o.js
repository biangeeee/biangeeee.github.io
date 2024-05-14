import{_ as i,o as e,c as n,e as s}from"./app-BYUMSSZj.js";const l={},d=s(`<h2 id="事件循环" tabindex="-1"><a class="header-anchor" href="#事件循环" aria-hidden="true">#</a> 事件循环</h2><p>Js引擎线程基于事件循环进行：同步任务推入执行栈，异步任务交给webAPI处理，处理完的结果放入异步任务队列（分宏任务与微任务）。执行栈中的同步任务处理完后，查看是否有异步任务，优先执行微任务，然后执行宏任务，在执行中遇到微任务需放进微任务队列，每执行完一个宏任务，立即执行微任务队列中的所有微任务。</p><h2 id="宏任务与微任务" tabindex="-1"><a class="header-anchor" href="#宏任务与微任务" aria-hidden="true">#</a> 宏任务与微任务</h2><p>宏任务：浏览器/Node发起，开销大。setTimeout, setInterval, Ajax, DOM事件... 微任务：Js引擎发起，可以理解是在当前 task 执行结束后立即执行的任务。也就是说，在当前task任务后，下一个task之前，在渲染之前。Promise，async/await...</p><h2 id="nexttick" tabindex="-1"><a class="header-anchor" href="#nexttick" aria-hidden="true">#</a> NextTick</h2><p>一次事件循环称为tick。Vue采用DOM异步更新策略，侦听到数据变化时，开启一个队列并缓冲同一事件循环中所有的数据变更。nextTick接受一个回调函数作为参数，该参数在下一次循环（浏览器更新DOM完毕之后）执行。</p><p>源码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/* globals MutationObserver */

import { noop } from &#39;shared/util&#39;
import { handleError } from &#39;./error&#39;
import { isIE, isIOS, isNative } from &#39;./env&#39;

// 判断nextTick是否作为微任务来执行
export let isUsingMicroTask = false

// 回调队列
const callbacks: Array&lt;Function&gt; = []
// 当执行回调队列时，为true。避免多次触发
let pending = false

// 通过 flushCallbacks 函数遍历 callbacks 数组的拷贝并执行其中的回调
function flushCallbacks() {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i &lt; copies.length; i++) {
    copies[i]()
  }
}

// 判断环境来选择所支持的异步回调的方法，会优先选择微任务
// Promise，MutationObserver，setImmediate，setTimeout
// setImmediate为适应IE10和node环境
// setTimeout会产生(&lt;=)4ms的延迟，setInnediate则是主线程执行完成后执行
let timerFunc // 调用cb的函数

if (typeof Promise !== &#39;undefined&#39; &amp;&amp; isNative(Promise)) {
  const p = Promise.resolve()
  timerFunc = () =&gt; {
    p.then(flushCallbacks)
    // 这里的 setTimeout 是用来强制刷新微任务队列的
    // 因为ios环境下promise.then后没微任务，那么微任务队列不会被刷新
    if (isIOS) setTimeout(noop)
  }
  isUsingMicroTask = true
} else if (
  !isIE &amp;&amp;
  typeof MutationObserver !== &#39;undefined&#39; &amp;&amp;
  (isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === &#39;[object MutationObserverConstructor]&#39;)
) {
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  // 监听文本节点，当数据发生变化就执行 flushCallbacks 
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () =&gt; {
    counter = (counter + 1) % 2
    textNode.data = String(counter) // 更新数据
  }
  isUsingMicroTask = true
} else if (typeof setImmediate !== &#39;undefined&#39; &amp;&amp; isNative(setImmediate)) {
  // 是否支持Immediate
  timerFunc = () =&gt; {
    setImmediate(flushCallbacks)
  }
} else {
  timerFunc = () =&gt; {
    setTimeout(flushCallbacks, 0)
  }
}

export function nextTick(): Promise&lt;void&gt;
export function nextTick&lt;T&gt;(this: T, cb: (this: T, ...args: any[]) =&gt; any): void
export function nextTick&lt;T&gt;(cb: (this: T, ...args: any[]) =&gt; any, ctx: T): void
/**
 * @internal
 */
 
// 声明 nextTick 函数，接收一个回调函数和一个执行上下文（this执行绑定）作为参数
export function nextTick(cb?: (...args: any[]) =&gt; any, ctx?: object) {
  let _resolve
  callbacks.push(() =&gt; {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e: any) {
        handleError(e, ctx, &#39;nextTick&#39;)
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  
  // 如果当前没有在 pending 的回调，
  // 就执行 timeFunc 函数选择当前环境优先支持的异步方法
  if (!pending) {
    pending = true
    timerFunc()
  }
  
  // 如果没有传入回调，并且当前环境支持 promise，就返回一个 promise
  // 在返回的这个 promise.then 中 DOM 已经更新好了
  if (!cb &amp;&amp; typeof Promise !== &#39;undefined&#39;) {
    return new Promise(resolve =&gt; {
      _resolve = resolve
    })
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>总结：</p><ol><li>根据环境选择异步回调方法：timerFunc，优先微任务。</li><li>callbacks数组，nextTick函数将在指定上下文执行回调的方法push进callbacks中</li><li>flushCallbacks中拷贝所有回调并执行，清空callbacks数组。</li></ol>`,10),a=[d];function v(r,c){return e(),n("div",null,a)}const u=i(l,[["render",v],["__file","nextTick.html.vue"]]);export{u as default};

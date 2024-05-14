import{_ as e,o as i,c as n,e as t}from"./app-BYUMSSZj.js";const l={},s=t(`<p>debounce：防抖，n 秒后在执行该事件，若在 n 秒内被重复触发，则重新计时 throttle：节流， n 秒内只运行一次</p><p>防抖实现：若是immediate: true的情况，需要控制timeout来使callNow在函数第一次执行和以后隔n秒后为true。对于不用立刻执行的，只需要简单setTimeout执行fn</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function debounce(fn, wait, immediate) {
    let timeout;
    return function() {
        let context = this;
        if (timeout) clearTimeout(timeout); //每次新触发且旧计时未结束，重新计时
        if (immediate) { //考虑immediate：true的情况
            let callNow = !timeout;
            timeout = setTimeout(() =&gt; {
                timeout = null; //使callNow为true的条件
            }, wait);
            if (callNow) fn.apply(context, arguments);
        } else {
            timeout = setTimeout(() =&gt; {
                fn.apply(context, arguments)
            }, wait);
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>节流实现：设置startTime，并获取currentTime，计算是否已隔n秒。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function throttle(fn, delay) {
    let timer = null;
    let startTime = Date.now();
    return function() {
        let currentTime = Date.now();
        let remaining = delay - (currentTime - startTime);
        let context = this;
        clearTimeout(timer)
        if (remaining &lt;= 0) {
            fn.apply(context, arguments);
            startTime = Date.now();
        } 
        else {
            timer = setTimeout(() =&gt; {
                fn.apply(context, arguments);
                startTime = Date.now();
            }, remaining);
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),d=[s];function a(r,m){return i(),n("div",null,d)}const c=e(l,[["render",a],["__file","throttole.html.vue"]]);export{c as default};

import{_ as e,o as a,c as i,e as n}from"./app-BYUMSSZj.js";const d={},s=n(`<h2 id="父子组件通信" tabindex="-1"><a class="header-anchor" href="#父子组件通信" aria-hidden="true">#</a> 父子组件通信</h2><h3 id="props-父给子传递" tabindex="-1"><a class="header-anchor" href="#props-父给子传递" aria-hidden="true">#</a> props（父给子传递）</h3><p>父组件传递</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;Student name=&quot;Lily&quot; /&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>子组件（Student.vue)</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//简单声明接收：
props: [&#39;name&#39;]
//或接收时进行类型限制
props: { name: String }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="自定义事件-子给父传递" tabindex="-1"><a class="header-anchor" href="#自定义事件-子给父传递" aria-hidden="true">#</a> 自定义事件（子给父传递）</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// children.vue
this.$emit(&#39;add&#39;, good)

// Father.vue
&lt;Student @add=&quot;callback&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>emit传递的参数可以在callback中拿到</p><h2 id="兄弟组件通信" tabindex="-1"><a class="header-anchor" href="#兄弟组件通信" aria-hidden="true">#</a> 兄弟组件通信</h2><h3 id="先-子-父-再-父-兄弟" tabindex="-1"><a class="header-anchor" href="#先-子-父-再-父-兄弟" aria-hidden="true">#</a> 先 子-&gt;父， 再 父-&gt; 兄弟</h3><h3 id="全局事件总线" tabindex="-1"><a class="header-anchor" href="#全局事件总线" aria-hidden="true">#</a> 全局事件总线</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// brother1.vue
this.$bus.$on(&#39;triggerEvent&#39;, callback)

// brother2.vue
this.$bus.$emit(&#39;triggerEvent&#39;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="祖先与后代通信" tabindex="-1"><a class="header-anchor" href="#祖先与后代通信" aria-hidden="true">#</a> 祖先与后代通信</h2><p>provide/inject</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// grand.vue
provide(key, value);

// grandson.vue
const value = inject(key)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vuex" tabindex="-1"><a class="header-anchor" href="#vuex" aria-hidden="true">#</a> Vuex</h2><p>可以看作是管理各种数据的仓库 state: 存放共享变量 mutations：修改state中的共享变量的值 actions：一些异步操作如发送axios请求数据。</p><p>当组件内修改共享变量的值时，先dispatch actions，actions内发送请求数据，后将数据commit给mutations， mutations内将state中的变量修改为数据值。</p>`,19),t=[s];function r(l,c){return a(),i("div",null,t)}const v=e(d,[["render",r],["__file","tongxin.html.vue"]]);export{v as default};

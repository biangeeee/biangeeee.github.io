import{_ as e,o as a,c as r,e as i}from"./app-BYUMSSZj.js";const n={},d=i(`<h2 id="数组" tabindex="-1"><a class="header-anchor" href="#数组" aria-hidden="true">#</a> 数组</h2><h3 id="创建数组" tabindex="-1"><a class="header-anchor" href="#创建数组" aria-hidden="true">#</a> 创建数组</h3><p>Array构造：let arr1=new Array()</p><p>直接赋值：let arr2=[]</p><h3 id="增加" tabindex="-1"><a class="header-anchor" href="#增加" aria-hidden="true">#</a> 增加</h3><p>直接索引赋值（不论数组原位置是否为空都可以）</p><p>向顶部添加：unshift()</p><p>向尾部添加: push()</p><h3 id="删除" tabindex="-1"><a class="header-anchor" href="#删除" aria-hidden="true">#</a> 删除</h3><p>删除顶部元素（类似于栈）shift()</p><p>删除尾部元素 pop()</p><h3 id="修改" tabindex="-1"><a class="header-anchor" href="#修改" aria-hidden="true">#</a> 修改</h3><p>通过下标修改</p><h3 id="访问与遍历" tabindex="-1"><a class="header-anchor" href="#访问与遍历" aria-hidden="true">#</a> 访问与遍历</h3><p>访问：索引访问</p><p>遍历： for ... of</p><p>forEach()</p><p>以上两种遍历方法只能访问不能修改</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>let arr1=new Array();
let arr2=[];

arr1[1]=1;
arr2[1]=1;
arr1.push(2)
arr2.push(2);
arr1.forEach((elem)=&gt;elem=1);
for(let item of arr1){console.log(item);}
for(let elem of arr1){elem=1;}
for(let item of arr1){console.log(item);}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过i自增下标访问（这种可以修改数组元素）</p><p>for（var i=0;i&lt;nums.length;i++)</p><h3 id="其他方法" tabindex="-1"><a class="header-anchor" href="#其他方法" aria-hidden="true">#</a> 其他方法</h3><p>reverse（）</p><p>sort</p><p>filter: 用法和sort一样，括号内为筛选条件的函数</p><p>splice，slice（和字符串一样）</p><p>indexOf, includes</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>arr4=arr1.reverse();
console.log(arr4);
let arr3=arr4.sort((a,b)=&gt;{
    return a-b;
})//从小到大排序，undefined在最后
console.log(arr3);
arr5=arr3.filter(elem=&gt;elem!=1);
console.log(arr5);//undefined也会被过滤掉
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="字符串" tabindex="-1"><a class="header-anchor" href="#字符串" aria-hidden="true">#</a> 字符串</h2><p>要注意的是，字符串并不能像数组一样通过索引对单个字符做变化，所以往往先把字符串转化为数组：arr=s.split(&#39;&#39;)；最后再把数组转化回字符串：s=arr.join();</p><h3 id="slice" tabindex="-1"><a class="header-anchor" href="#slice" aria-hidden="true">#</a> slice()</h3><p>用法：Array.slice(start, end) 用于截取数组/字符串的从下标start（包含）到end（不包含的）的部分。当没有指定end时候，从start截取到最后。</p><h3 id="splice" tabindex="-1"><a class="header-anchor" href="#splice" aria-hidden="true">#</a> splice()</h3><p>用法：Array.splice(index, num, item1,item2,item3...) 第一个参数是要开始删除的下标，第二个参数是要删除的元素个数（是0则不用删除），剩下的参数是要添加的元素。</p><h2 id="map" tabindex="-1"><a class="header-anchor" href="#map" aria-hidden="true">#</a> Map</h2><h3 id="创建" tabindex="-1"><a class="header-anchor" href="#创建" aria-hidden="true">#</a> 创建</h3><p>Let map=new Map();</p><h3 id="加入或修改元素" tabindex="-1"><a class="header-anchor" href="#加入或修改元素" aria-hidden="true">#</a> 加入或修改元素</h3><p>map.set(key,value);</p><h3 id="访问元素" tabindex="-1"><a class="header-anchor" href="#访问元素" aria-hidden="true">#</a> 访问元素</h3><p>map.get(key)</p><h3 id="遍历元素" tabindex="-1"><a class="header-anchor" href="#遍历元素" aria-hidden="true">#</a> 遍历元素</h3><p>forEach（value,key）</p><p>for(let [key,value] of map.entries())</p><p>for(let key of map.keys())</p><p>for(let value of map.values())</p>`,46),s=[d];function l(t,h){return a(),r("div",null,s)}const p=e(n,[["render",l],["__file","arrayAnndString.html.vue"]]);export{p as default};
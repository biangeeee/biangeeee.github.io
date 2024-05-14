import{_ as e,o as n,c as i,e as a}from"./app-BYUMSSZj.js";const s={},d=a(`<p>Javascript的基本类型数据存放在栈内存中，引用类型数据保存在堆内存中，引用类型的变量存在栈中，指向引用的在堆内存的（实际对象的）地址。</p><h2 id="浅拷贝与深拷贝定义" tabindex="-1"><a class="header-anchor" href="#浅拷贝与深拷贝定义" aria-hidden="true">#</a> 浅拷贝与深拷贝定义</h2><p>浅拷贝：如果属性是基本类型，拷贝的就是基本类型的值。如果属性是引用类型，拷贝的就是内存地址；即只拷贝一层，深层次的引用类型拷贝的是地址。 深拷贝： 深拷贝开辟一个新的栈，两个对象属性完全相同，但是对应两个不同的地址，修改一个对象的属性，不会改变另一个对象的属性。</p><h2 id="浅拷贝的几种方法" tabindex="-1"><a class="header-anchor" href="#浅拷贝的几种方法" aria-hidden="true">#</a> 浅拷贝的几种方法</h2><h3 id="object-assign" tabindex="-1"><a class="header-anchor" href="#object-assign" aria-hidden="true">#</a> Object.assign</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const obj = {
    name: &#39;Lily&#39;,
    hobby:[{name: &#39;swim&#39;},{name: &#39;reading&#39;}],
    lessons: [&#39;math&#39;, &#39;english&#39;]
}

var newObj = Object.assign({}, obj);
newObj.name = &#39;Job&#39;;
newObj.hobby = [{name: &#39;music&#39;}];
newObj.lessons[0] = &#39;chinese&#39;;

console.log(obj.name, obj.hobby[0], obj.lessons[0]);
// Lily {name: &#39;swim&#39;} chinese
console.log(newObj.name, newObj.hobby[0], newObj.lessons[0]);
// Job {name: &#39;music&#39;} chinese
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看出对于基本数据和一层的引用类型数据，新对象的修改不会影响原来的。修改深层次的引用则会把原来的也修改了（说明是传址）</p><h3 id="数组的slice和concat方法" tabindex="-1"><a class="header-anchor" href="#数组的slice和concat方法" aria-hidden="true">#</a> 数组的slice和concat方法</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var newHobby = obj.hobby.slice(0);
newHobby[0].name = &quot;music&quot;;
console.log(newHobby[0]);
// {name: &#39;music&#39;}
console.log(obj.hobby[0]);
// {name: &#39;music&#39;}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var newHobby1 = obj.hobby.concat();
newHobby1[0].name = &quot;kk&quot;;
console.log(newHobby1[0]); // {name: &#39;kk&#39;}
console.log(obj.hobby[0]); // {name: &#39;kk&#39;}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="扩展运算符" tabindex="-1"><a class="header-anchor" href="#扩展运算符" aria-hidden="true">#</a> 扩展运算符</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var newHobby1 = [...obj.hobby];
newHobby1[0].name = &quot;kk&quot;;
console.log(newHobby1[0]);
console.log(obj.hobby[0]);
// 结果同上
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="深拷贝的几种方法" tabindex="-1"><a class="header-anchor" href="#深拷贝的几种方法" aria-hidden="true">#</a> 深拷贝的几种方法</h2><p>_.cloneDeep()， jQuery.extend()，JSON.parse(JSON.stringify(obj1))（会忽略undefined，symbol和函数）</p><h2 id="手写浅拷贝" tabindex="-1"><a class="header-anchor" href="#手写浅拷贝" aria-hidden="true">#</a> 手写浅拷贝</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function shallowClone(obj) {
     let newObj = {};
     for (let i in obj) {
         // 只要是obj的属性，直接复制一份给newObj
         if (obj.hasOwnProperty(i)) {
             newObj[i] = obj[i];
         }
     }
     return newObj;
 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="手写深拷贝" tabindex="-1"><a class="header-anchor" href="#手写深拷贝" aria-hidden="true">#</a> 手写深拷贝</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function deepClone(obj) {
    if (obj === null) return obj; 
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    if (typeof obj !== Array &amp;&amp; typeof obj !== &#39;object&#39;) return obj; // 基本数据类型
    let newObj = typeof obj === Array? [] : {};
    for (let attr in obj) {
        if (obj.hasOwnProperty(attr)) {
            if (typeof obj[attr] === &#39;object&#39;) newObj[attr] = deepClone(obj[attr]); //递归拷贝深层次
            else newObj[attr] = obj[attr];
        }
    }
    return newObj;
} </code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,18),l=[d];function r(b,o){return n(),i("div",null,l)}const t=e(s,[["render",r],["__file","deepCopy.html.vue"]]);export{t as default};

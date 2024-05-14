import{_ as i,o as d,c as s,a as l,t as a,e}from"./app-BYUMSSZj.js";const v={},r=e(`<p>Vue是通过数据劫持的方式来做数据绑定的，核心方法：Object.defineProperty()， 实现三部分：observer， watcher和compiler——指令解析器Compile，对每个元素节点的指令进行解析，根据指令模板替换数据，以及绑定相应的更新函数 ；数据监听器observer对所有vm属性进行监听，如有变动通知订阅者watcher；watcher收到更新通知后，执行相应回调函数以更新视图。</p><h2 id="编译" tabindex="-1"><a class="header-anchor" href="#编译" aria-hidden="true">#</a> 编译</h2><p>最难理解的部分。首先将el根结点下所有原生节点转换为文档碎片进行解析编译，避免多次操作DOM节点效率低下。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>node2Fragments: function(el) {
        var fragment = document.createDocumentFragment(), child;
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }

        return fragment;
    },
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),t=e(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  compileElement: function(el) {
        var childNodes = el.childNodes,
            me = this;

        [].slice.call(childNodes).forEach(function(node) {
            var text = node.textContent;
            var reg = /\\{\\{(.*)\\}\\}/;
            
            if (me.isElementNode(node)) {
                me.compile(node);

            } else if (me.isTextNode(node) &amp;&amp; reg.test(text)) {
                console.log(&#39;node&#39;,node);
                me.compileText(node, RegExp.$1.trim());
            }

            if (node.childNodes &amp;&amp; node.childNodes.length) {
                me.compileElement(node);
            }
        });
    },
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于元素节点，判断其是否是指令（模版语法，v-XXX），再判断其为事件指令（v-on:click)还是普通指令（v-bind, v-class, v-html...)，调用相应函数. eg: v-on: click = &quot;XXX&quot;，在下面代码中，attrName = &#39;v-on: click&#39;（指令）， exp = &#39;XXX&#39;(一般为方法），name = &#39;on : click&#39;.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>compile(node) {
      var nodeAttrs = node.attributes, me = this;
      [].slice.call(nodeAttrs).forEach(function(attr) {
          var attrName = attr.name;
          if (me.isDirective(attrName)) {
              var exp = attr.value;
              var name = attrName.substring(2);
              if (me.isEventDirective(name)) compileUtils.eventHandler(node, me.$vm, exp, name);
              else {
                  compileUtils[name] &amp;&amp; compileUtils[name](node, me.$vm, exp);
              } 
              node.removeAttribute(attrName);
          }
          
      })
  },
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="事件处理" tabindex="-1"><a class="header-anchor" href="#事件处理" aria-hidden="true">#</a> 事件处理</h3><p>eventHandler中，对传入的事件指令节点，提取事件类型，在vm的$options上找到该方法（val为函数名），对该节点添加事件监听器，回调函数即为该方法（fn）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>eventHandler(node, vm, val, name) {
        let event = name.split(&#39;:&#39;)[1], 
            fn = vm.$options.methods &amp;&amp; vm.$options.methods[val];
            
        if (event &amp;&amp; fn) node.addEventListener(event, fn.bind(vm), false);
    },
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="数据绑定" tabindex="-1"><a class="header-anchor" href="#数据绑定" aria-hidden="true">#</a> 数据绑定</h3><p>对于普通指令，先调用相应函数进行数据渲染与绑定。v-model是双向数据绑定，当发现页面节点有输入且新值时，要将其设为vm对象的数据新值。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  text(node, vm, val) {
      this.bind(node, vm, val, &#39;text&#39;);
  },
  html(node, vm, val) {
      this.bind(node, vm, val, &#39;html&#39;);
  },
  model(node, vm, val) {
      var me = this;
      this.bind(node, vm, val, &#39;model&#39;);
      var data = this._getVMVal(vm, val);
      node.addEventListener(&#39;input&#39;, function (e) {
          let newData = e.target.value;
          if (data == newData) return;
          me._setVMVal(vm, val, newData);
          data = newData;
      });

  },
  class(node, vm, val) {
      this.bind(node, vm, val, &#39;class&#39;);
  },
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="更新视图" tabindex="-1"><a class="header-anchor" href="#更新视图" aria-hidden="true">#</a> 更新视图</h3><p>将数据渲染到页面上，并增加观察者，若数据发生变化，则更新页面（重新渲染），这一步靠创建新watcher，将回调函数设置为updateFn实现。（注意，代码中的val不是真正的数据值，而是属性名，所以要调用_getVMVal得到的返回值才是真正的值）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> bind(node, vm, val, name) {
     var updateFn = updater[name + &#39;Updaters&#39;];
     updateFn &amp;&amp; updateFn(node, this._getVMVal(vm, val));
     new Watcher(vm, val, function (value, oldValue) {
         updateFn &amp;&amp; updateFn(node, value, oldValue);
     });
 },
 _getVMVal(vm, val) {
     var arr = val.split(&#39;.&#39;);
     var data = vm;
     arr.forEach((elem) =&gt; {
         data = data[elem];
     })
     return data;
 },
 _setVMVal(vm, val, newData) {
     var arr = val.split(&#39;.&#39;);
     var data = vm;
     arr.forEach(function (key, index) {
         if (index &lt; arr.length - 1) {
             data = data[key];
         }
         else {
             data[key] = newData;
         }
     })
 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="updater" tabindex="-1"><a class="header-anchor" href="#updater" aria-hidden="true">#</a> updater</h3><p>若是class，则要注意可能有多个class，（:class=&quot;class1 class2 class3...&quot;)，所以要从中删去旧值加入新值</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var updater = {
   textUpdaters(node, val) {
       node.textContent = typeof val == undefined ? &#39;&#39; : val;
   },
   htmlUpdaters(node, val) {
       node.innerHTML = typeof val == undefined ? &#39;&#39; : val;
   },
   classUpdaters(node, value, oldValue) {
       var className = node.className;
       className = className.replace(oldValue, &#39;&#39;).replace(/\\s$/, &#39;&#39;);
       var space = className &amp;&amp; String(value) ? &#39; &#39; : &#39;&#39;;
       node.className = className + space + value;

   },
   modelUpdaters(node, value, oldValue) {
       node.value = typeof value == undefined ? &#39;&#39; : value;
   }

};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="observer" tabindex="-1"><a class="header-anchor" href="#observer" aria-hidden="true">#</a> Observer</h2><h3 id="observer类" tabindex="-1"><a class="header-anchor" href="#observer类" aria-hidden="true">#</a> Observer类</h3><p>成员属性是要观察的数据，对于数据对象的每个属性（递归遍历子属性），都应该利用Object.defineProperty来监听变化。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function Observer (data) {
    this.data = data;
    this.walk(data);
}

Observer.prototype = {
    constructor: Observer,
    walk(data) {
        let me = this;
        Object.keys(data).forEach(function(key) {
            me.convert(key, data[key]);
        });
    },
    convert(key, val) {
        this.defineReactive(this.data, key, val);
    },
    defineReactive(data, key, val) {
        var dep = new Dep();
        var childObj = observe(val);
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            get() {
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
            set(newVal) {
                if (newVal == val) return;
                val = newVal;
                childObj = observe(newVal);
                dep.notify();
            }
        });
    }
}

function observe (value, vm) {
    if (!value || typeof value !== &#39;object&#39;) {
        return;
    }
    new Observer(value);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="消息订阅器" tabindex="-1"><a class="header-anchor" href="#消息订阅器" aria-hidden="true">#</a> 消息订阅器</h3><p>observer监听到属性变化后，通知消息订阅器。故我们还要实现一个消息订阅器，也就是上面代码中的dep。由于有很多不同的数据对象需要监听，所以订阅器要分配一个uid，并维护一个subs列表存储订阅者。在observer代码中可以看到，当get被调用，说明该属性被订阅了，调用dep.depend为这个属性添加订阅器。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>uid = 0;
function Dep () {
    this.id = uid++;
    this.subs = [];
}

Dep.prototype = {
    depend() {
        Dep.target.addDep(this);
    },
    addSub(sub) {
        this.subs.push(sub);
    },
    notify() {
        this.subs.forEach(function(sub) {
            sub.update();
        })
    }
}
Dep.target = null;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="watcher" tabindex="-1"><a class="header-anchor" href="#watcher" aria-hidden="true">#</a> Watcher</h2><p>Watcher中传入vm对象，观察的属性（函数或表达式），以及变化后的回调；维护一个订阅器列表（订阅多个属性）。首先处理所观察的属性，如果是表达式（XX.XX.XX)，需要调用parseGetter逐步得到该子属性，函数/属性存放在this.getter中。watcher中将原本属性旧值存放在this.val。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function Watcher (vm, expOrFn, cb) {
    this.cb = cb;
    this.vm = vm;
    this.expOrFn = expOrFn;
    this.depsId = {};
    this.getter = typeof expOrFn == &#39;function&#39;? expOrFn : this.parseGetter(expOrFn.trim()); 
    this.value = this.get();
}

Watcher.prototype = {
    get: function() {
        Dep.target = this;
        var value = this.getter.call(this.vm, this.vm);
        Dep.target = null;
        return value;
    },

    parseGetter(expOrFn) {
        if (/[^\\w.$]/.test(expOrFn)) return;
        let exps = expOrFn.split(&#39;.&#39;);
        
        return function(obj) {
            for (var i = 0, len = exps.length; i &lt; len; i++) {
                if (!obj) return;
                obj = obj[exps[i]];
            }
            return obj;
        }

    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过addDep将自己加入订阅器中，同时自己的depIds属性中也加入该订阅器。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>addDep(dep) {
        if (!this.depsId.hasOwnProperty(dep.id)){
            dep.addSub(this);
            this.depsId[dep.id] = dep;
        }
    },
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当observer观察到变化并通过dep通知到watcher，watcher执行update，比较新旧值，若不同则调用回调。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Watcher.prototype = {
    ...
    update() {
        this.run();
    },
    run() {
        var newValue = this.get();
        var oldValue = this.value;
        if (newValue !== oldValue){
            this.value = newValue;
            console.log(&#39;change&#39;);
            this.cb.call(this.vm, newValue, oldValue)
        }
        
     },
   }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mvvm" tabindex="-1"><a class="header-anchor" href="#mvvm" aria-hidden="true">#</a> MVVM</h2><p>MVVM是数据绑定的入口，也就是在模仿Vue类，对传入的对象参数解析出data，method和computed，并为data和computed做数据代理, 用observe监听vm数据变化，compile编译el根节点解析模版，利用watcher实现视图与数据双向绑定。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function MVVM(options) {
    this.$options = options || {};
    var data = this._data = this.$options.data;
    var me = this;
    Object.keys(data).forEach(function(key) {
        me._proxyData(key);
    });
    this._initComputed();
    observe(data, this);
    this.$compile = new Compile(options.el || document.body, this);
}
MVVM.prototype = {
    constructor: MVVM,
    $watch: function(key, cb, options) {
        new Watcher(this, key, cb);
    },
    _proxyData(key) {
        var me = this;
        Object.defineProperty(me, key, {
            configurable:false,
            enumerable: true,
            get() {
                return me._data[key];
            },
            set(newVal) {
                me._data[key] = newVal;
            }
        })
    },
    _initComputed() {
        var me = this;
        var computed = this.$options.computed;
        if (typeof computed === &#39;object&#39;) {
            Object.keys(computed).forEach(function(key) {
                Object.defineProperty(me, key, {
                    configurable: false,
                    enumerable: true,
                    get: typeof computed[key] === &#39;function&#39; 
                            ? computed[key] 
                            : computed[key].get,
                    set: function() {}
                });
                console.log(computed[key]);
            });
        }
        
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,32);function c(n,u){return d(),s("div",null,[r,l("p",null,"对所有节点及子节点进行解析编译，判断是元素节点还是文本节点，如果是文本节点还要判断一下是否是插值语法 "+a(n.XXX)+".",1),t])}const b=i(v,[["render",c],["__file","MVVM.html.vue"]]);export{b as default};

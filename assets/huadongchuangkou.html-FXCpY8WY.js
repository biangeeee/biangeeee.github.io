import{_ as d,r,o as a,c as t,a as e,b as i,d as s,e as l}from"./app-BYUMSSZj.js";const v={},u=e("p",null,"滑动窗口也可以看出双指针法：一快一慢指针搜索数组，快指针做窗口终止位置，慢指针做起始位置，一般是求在指针滑动时满足条件的窗口长度最值。",-1),m={href:"https://leetcode.cn/problems/minimum-size-subarray-sum/description/",target:"_blank",rel:"noopener noreferrer"},c=l(`<p>思路：快指针滑动中将每次所在位置加入现有总和，当总和到达或超过目标值，快指针停止滑动，慢指针滑动，将每次滑出的所在值减去；每当总和小于目标值时，快指针继续滑动。</p><p>代码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var minSubArrayLen = function(target, nums) {
    var i=0; 
    var j=0;
    var current=0;
    var minLength=nums.length+1;//若子串存在，必定小于该值
    while(i&lt;=nums.length){
        if(current&gt;=target){
            if(j-i+1&lt;minLength) minLength=j-i+1;
            current-=nums[i++];
        }
        else if(current&lt;target){
            current+=nums[j];
        }
        if(j&lt;nums.length-1 &amp;&amp; current&lt;target) j++;
        else if(j==nums.length-1 &amp;&amp; current&lt;target) break;
    }
    return minLength==nums.length+1?0:minLength;
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),b={href:"https://leetcode.cn/problems/fruit-into-baskets/description/",target:"_blank",rel:"noopener noreferrer"},o=l(`<p>思路一：数组+滑动窗口</p><p>这是最开始没有想到hashMap时的笨方法。两个数组：bucketV：篮子，记录采摘水果种类；fruitNum：记录总共采摘的水果索引。</p><p>快指针遍历时三种情况：</p><ol><li>出现已经装入篮子中的同种水果：由于滑动窗口方法中，被替换掉的都是更早出现的水果，所以若快指针值已经存在篮子中且在篮子底部，需要从底部拿出重新放进顶部。</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>if(bucketV.includes(fruits[j])){ 
    fruitNum.unshift(fruits[j]); 
    if(bucketV.length==2 &amp;&amp; bucketV[1]==fruits[j]){ 
        var temp=bucketV.pop(); 
        bucketV.unshift(temp); 
    } 
    j++; 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>篮子中水果种类还不超过两种，可以直接装入：</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>else if(bucketV.length&lt;2){ 
    bucketV.unshift(fruits[j]); 
    fruitNum.unshift(fruits[j]); 
    j++; 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>有新水果但是篮中水果种类满了，拿出最久未出现的：</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>else{
    fruitNum.pop();
    if(!fruitNum.includes(fruits[i])) bucketV.pop();
    i++;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完整代码：</p><p>思路二：HashMap+滑动窗口。</p><p>利用map.set()在键相同的情况下会用新值覆盖旧值的特点，只需将快指针遍历的位置都map.set，就可以完成思路一中的先pop再unshift操作。当篮中水果总数超过时，找到map中最久未出现的索引值，即map中的最小值，删掉该键值对。将i移动至删去元素的后面一位。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var totalFruit = function(fruits) {
    var bucketV=new Map();
    var maxNum=0;
    var i=0;
    for(var j=0;j&lt;fruits.length;j++){
        bucketV.set(fruits[j],j);
        if(bucketV.size&gt;2){
            var minIndex=j+1;
            for(let [fruit,index] of bucketV){
                if(index&lt;minIndex) minIndex=index;
            }
            bucketV.delete(fruits[minIndex]);
            i=minIndex+1;
        }

        maxNum= Math.max(maxNum,j-i+1);
        
    }
    
    return maxNum;
    
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13),p={href:"https://leetcode.cn/problems/minimum-window-substring/description/",target:"_blank",rel:"noopener noreferrer"},g=l(`<p>思路：HashMap+滑动窗口。map记录t中出现的单个字符次数，若子串覆盖了n个，则减去n，以间接记录子串中包含的目标字符个数。type记录子串已满足个数的字符种类。这里要注意的就是type增减的条件。窗口终止位置一直滑动到type到达阈值，然后起始位置滑动，直到type小于阈值，终止位置继续滑动。循环条件也需注意。</p><p>代码</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var minWindow = function(s, t) {
    var origin=s.split(&#39;&#39;);
    var target=t.split(&#39;&#39;);
    var map=new Map();
    var type=0;
    var result=[-1];
    result.push(origin.length);
    for(item of target){
        if(map.has(item)){
            var old=map.get(item);
            old++;
            map.set(item,old);

        }
        else map.set(item,1);
    }
    var originalLen=map.size;
    var start=0;
    var end=0;
    while(start&lt;=origin.length){
        if(type==originalLen){
            if(end-start+1&lt;result[1]-result[0]+1) {
                result[0]=start;
                result[1]=end;
            }
            if(target.includes(origin[start])){
                var old=map.get(origin[start]);
                if(old==0) type--;
                old++;
                map.set(origin[start],old);
                
            }
            start++;
        }
        
        else if(type&lt;originalLen){
            if(map.has(origin[end])){
                var old=map.get(origin[end]);
                old--;
                if(old==0) {
                    type++;
                }
                map.set(origin[end],old);
            }
        }
        if(type&lt;originalLen &amp;&amp; end&lt;origin.length-1) end++;
        else if(type&lt;originalLen &amp;&amp; end==origin.length-1) break;
    }
    if(result[0]==-1) return &quot;&quot;;
    else return s.slice(result[0],result[1]+1);
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3);function f(h,x){const n=r("ExternalLinkIcon");return a(),t("div",null,[u,e("p",null,[e("a",m,[i("209. 长度最小的子数组"),s(n)])]),c,e("p",null,[e("a",b,[i("904. 水果成篮"),s(n)])]),o,e("p",null,[e("a",p,[i("76. 最小覆盖子串"),s(n)])]),g])}const k=d(v,[["render",f],["__file","huadongchuangkou.html.vue"]]);export{k as default};

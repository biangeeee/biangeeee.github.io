import{_ as r,r as d,o as a,c as v,a as e,b as n,d as s,e as l}from"./app-BYUMSSZj.js";const c={},u=e("p",null,"双指针法是处理数组、字符串问题常用的算法。",-1),t={href:"https://leetcode.cn/problems/remove-element/description/",target:"_blank",rel:"noopener noreferrer"},m=l(`<p>给你一个数组 <code>nums</code> ，移除所有数值等于 <code>val</code> 的元素，并返回移除后数组的新长度。 不要使用额外的数组空间，你必须仅使用 <code>O(1)</code> 额外空间并修改输入数组**。 元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。</p><h2 id="暴力解法" tabindex="-1"><a class="header-anchor" href="#暴力解法" aria-hidden="true">#</a> 暴力解法</h2><p>首先可以用暴力解法：用两层循环：外层循环用于遍历数组找到数值等于val的元素，内层循环从该元素开始后一位元素提前一位，即数值等于val的元素会被其后一位覆盖。</p><p>Js代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var removeElement = function(nums, val) {
    var size=nums.length;
    var i=0;
    while(i&lt;size){
        if(nums[i]==val){
            for(var k=i;k&lt;size-1;k++){
                nums[k]=nums[k+1];
            }        
            size=size-1;
            i=0; 
        }
        else i++;
    }
    return size;
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="双指针法" tabindex="-1"><a class="header-anchor" href="#双指针法" aria-hidden="true">#</a> 双指针法</h2><p>使用双指针法可以降时间复杂度为O（n）：快指针用于甄别数值等于val的元素，慢指针指向要更新的位置。 代码：i为快指针，只要找到不需要移除的元素，就赋值给k（慢指针）所在位置的元素，而后k增加用于更新下一个元素。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var removeElement = (nums, val) =&gt; {
    let k = 0;
    for(let i = 0;i &lt; nums.length;i++){
        if(nums[i] != val){
            nums[k++] = nums[i]
        }
    }
    return k;
};

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="相关问题" tabindex="-1"><a class="header-anchor" href="#相关问题" aria-hidden="true">#</a> 相关问题</h2>`,9),o={href:"https://leetcode.cn/problems/remove-duplicates-from-sorted-array/description/",target:"_blank",rel:"noopener noreferrer"},b=l(`<p>思路：因为题目中是非严格递增数组，所以判断是否重复只需要前后比较。快指针找到不与前面重复的元素，将其赋值给慢指针自增后指向的索引位置。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var removeDuplicates = function(nums) {
    var k=0;
    for(var i=1;i&lt;nums.length;i++){
        if(nums[k]!=nums[i]){
            nums[++k]=nums[i];
        }
    }
    return k+1;
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),p={href:"https://leetcode.cn/problems/move-zeroes/description/",target:"_blank",rel:"noopener noreferrer"},h=l(`<p>思路：由于题目要求所有的零移到最后面，不改变其他元素顺序，所以用快指针来指向不是0的元素，慢指针指向0元素，当该条件发生时，两个元素互换位置（将0换到后面），慢指针前进一位。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>var moveZeroes = function(nums) {
    var k=0;
    for(var i=1;i&lt;nums.length;i++){
        if(nums[k]==0 &amp;&amp; nums[i]!=0){
            var temp=nums[k];
            nums[k]=nums[i];
            nums[i]=temp;
            k++;
        }
        else if(nums[k]!=0) k++;
    }
    return nums;
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),k={href:"https://leetcode.cn/problems/backspace-string-compare/description/",target:"_blank",rel:"noopener noreferrer"},f=l(`<p>思路：1.字符串不能像数组一样通过索引修改单个字符值，所以要先将其转换成数组。2.用下标-1实现“退格”动作。3.注意由于快指针是从1开始的，所以要先对最开头是退格符的情况作处理。4.对处理后返回的新数组和实际长度（k1,k2),判断是否一致。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>function dealWithArray(arr){
    var k=0;
    if(arr[0]==&#39;#&#39;){
        arr[0]=null;
        k=-1;
    }
    for(var i=1;i&lt;arr.length;i++){
        if(arr[i]!=&#39;#&#39;){
            k++;
            arr[k]=arr[i];
            
        }
        else{
            if(k&gt;0) k--;
            else {
                arr[0]=null;
                k=-1;
            }
        }
    }
    return k;
}

var backspaceCompare = function(s, t) {
    var s_arr=s.split(&#39;&#39;);
    var t_arr=t.split(&#39;&#39;);
    var k1=dealWithArray(s_arr);
    var k2=dealWithArray(t_arr);
    
    if(k1!=k2) return false;
    else{
        if(k1==-1) return true;
        for(var i=0;i&lt;=k1;i++){          
            if(s_arr[i]!=t_arr[i]) return false;
        }
        return true;
    }

};

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function _(g,x){const i=d("ExternalLinkIcon");return a(),v("div",null,[u,e("p",null,[n("先用题目引入： "),e("a",t,[n("27.移除元素"),s(i)])]),m,e("p",null,[e("a",o,[n("26. 删除有序数组中的重复项"),s(i)])]),b,e("p",null,[e("a",p,[n("283.移动零"),s(i)])]),h,e("p",null,[e("a",k,[n("844.含退格的字符串"),s(i)])]),f])}const E=r(c,[["render",_],["__file","shuangzhizhen.html.vue"]]);export{E as default};

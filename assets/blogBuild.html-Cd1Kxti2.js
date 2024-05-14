import{_ as s,r as t,o as d,c as l,a as e,b as i,d as a,e as r}from"./app-BYUMSSZj.js";const u={},o=e("h2",{id:"基本配置",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#基本配置","aria-hidden":"true"},"#"),i(" 基本配置")],-1),c={href:"https://vuepress-theme-reco.recoluan.com",target:"_blank",rel:"noopener noreferrer"},v=r(`<h3 id="目录说明" tabindex="-1"><a class="header-anchor" href="#目录说明" aria-hidden="true">#</a> 目录说明</h3><p>开发基本上在根目录下.vuepress和blogs这两个文件夹中进行。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.
|── .vuepress
│   │—— public 放置图片资源
│   │—— config.ts 项目基本配置
│── blogs
    │—— 放置种类文件夹，下面放博客（markdown文件）

 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>进入项目，在.vuepress/config.ts中修改基本配置。 首先打开自动分类：autoSetBlogCategories: true,当我们直接发新分类的文章时，它会为我们自动添加这一新分类。 修改个人基本信息：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>title: &quot;BianBian &#39;s Blog&quot;,
logo: &quot;/logo.jpeg&quot;,
author: &quot;BianBian12345&quot;,
authorAvatar: &quot;/logo.jpeg&quot;,
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>title和logo是在博客左上角显示的信息；相关图片（/logo.jpeg）放在public文件夹下。 导航栏：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>navbar: [
      { text: &quot;Home&quot;, link: &quot;/&quot; },
      { text: &quot;刷题日志&quot;, link: &quot;/categories/shuatirizhi/1/&quot; },
      { text: &quot;项目记录&quot;, link: &quot;/categories/xianngmujilu/1&quot; },
      { text: &quot;学习笔记&quot;, link: &quot;/categories/xuexibiji/1&quot; },
      
    ],
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="项目搭建" tabindex="-1"><a class="header-anchor" href="#项目搭建" aria-hidden="true">#</a> 项目搭建</h2><p>README.md是首页内容，可以在socialLinks修改自己的联系方式。 博客以markdown文件放在blogs下，开头写明信息，如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>---
title: XXX
date: XXX
categories:
 - XXX
tags:
 - XXX
---
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="开发" tabindex="-1"><a class="header-anchor" href="#开发" aria-hidden="true">#</a> 开发</h2><p>开发模式下使用npm run dev来查看运行情况。</p><h2 id="发布" tabindex="-1"><a class="header-anchor" href="#发布" aria-hidden="true">#</a> 发布</h2><p>我的博客是部署到了github.io上。 首先在github新建public仓库，&quot;用户名.github.io&quot;为仓库名。 先用npm run build打包项目，找到在.vuepress下生成的dist（打包好的静态资源），将其拷贝到不在该项目下的路径（这是大坑！！！如果还在这个项目下的话后面访问站点会加载不出资源）。 进入dist：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//初始化仓库
$ git init
$ git add -A
$ git commit -m &quot;first commit&quot;
$ git branch -M main

//提交到远程仓库main分支
$ git push -f github地址 main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在github仓库查看源码是否都正确提交，部署成功之后点击setting-&gt;pages，在这里选择要生成页面的分支保存，然后就可以访问博客站点啦！</p>`,16),m={href:"https://biangeeee.github.io/",target:"_blank",rel:"noopener noreferrer"},b=e("p",null,"参考： https://www.it235.com/guide/notes/vuepress.html#博客背景 https://vuepress.vuejs.org/zh/ https://blog.csdn.net/xiaoxianer321/article/details/119548202",-1);function g(h,p){const n=t("ExternalLinkIcon");return d(),l("div",null,[o,e("p",null,[i("找了开源的模版："),e("a",c,[i("vuepress-theme-reco"),a(n)]),i(",在此基础上进行开发。相关环境见链接。")]),v,e("p",null,[i("欢迎访问我的博客站点（还有很多不完善的地方）："),e("a",m,[i("BianBian's Blog"),a(n)])]),b])}const q=s(u,[["render",g],["__file","blogBuild.html.vue"]]);export{q as default};

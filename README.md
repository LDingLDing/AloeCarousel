## AloeCarousel v1.0

## 介绍

最好用的轮播小插件支持**多条目内容**、**划过悬停**、**左右切换按钮**、**锚点**，样式自定义程度高,翻页宽度自动计算(优先自定义的宽度)，仅3kb的jquery小插件。

![兼容全平台](http://www.jq22.com/img/6.png)

* * *

![飞信截图20160429133108.png](https://ooo.0o0.ooo/2016/04/29/5722f2b9463ba.png)

## 使用说明

【html文件引用内容】

需要引用的文件都在dist目录下，源码供参考讨论

        <span class="hljs-tag"><<span class="hljs-title">link</span> <span class="hljs-attribute">rel</span>=<span class="hljs-value">"stylesheet"</span> <span class="hljs-attribute">href</span>=<span class="hljs-value">"dist/style.css"</span>></span>
        <span class="hljs-comment"><!--[if IE 6]>
        <script src="dist/DD_belatedPNG_0.0.8a-min.js"></script>
        <script>
            DD_belatedPNG.fix('.pagedown-icon');
        </script>
         <![endif]--></span>
        <span class="hljs-tag"><<span class="hljs-title">script</span> <span class="hljs-attribute">src</span>=<span class="hljs-value">"http://cdn.bootcss.com/jquery/1.9.1/jquery.min.js"</span>></span><span class="javascript"></span><span class="hljs-tag"></<span class="hljs-title">script</span>></span>

        <span class="hljs-tag"><<span class="hljs-title">script</span>></span><span class="javascript">
        $(<span class="hljs-string">'#container1'</span>).aloeCarousel({
            number:<span class="hljs-number">2</span>
        });
        $(<span class="hljs-string">'#container1 .show-card:nth-child(2n+1)'</span>).css(<span class="hljs-string">'margin-left'</span>,<span class="hljs-number">0</span>);
        $(<span class="hljs-string">'#container2'</span>).aloeCarousel({
            anchor: <span class="hljs-literal">false</span>,
            pageDown: <span class="hljs-literal">true</span>
        });
        </span><span class="hljs-tag"></<span class="hljs-title">script</span>></span>
    `</pre>

1.  style.css样式中只需保留base部分（轮播的基础布局和兼容处理）
2.  参数说明：
    <pre>`<span class="hljs-attribute">number</span>: [Number],                       每个翻页的条目数量
    <span class="hljs-attribute">autoplay </span>: [Bolean/Number],             是否自动播放或时间间隔
    <span class="hljs-attribute">ishover</span>: [Boolean],                     是否鼠标悬停
    <span class="hljs-attribute">anchor</span>: <span class="hljs-string">'true/flase/center/left/right'</span>, 是否显示锚点    <span class="hljs-attribute">anchorEvent </span>: <span class="hljs-string">'all/click/hover'</span>,        锚点触发事件
    <span class="hljs-attribute">duration</span>: [Number]/<span class="hljs-string">"normal/fast/slow"</span>,  动画速度曲线
    <span class="hljs-attribute">pageDown</span>: [Boolean]                     左右翻页按钮
    `</pre>

    3.引用`DD_belatedPNG_0.0.8a-min.js`是为了解决IE6下png图片的透明度问题，页面没有涉及不需要引用

    4.特别说明，可以直接设定.aloeCarousel的宽度，否则按照.show-card宽乘以条目数作为每个翻页的宽度。（考虑到padding的负值操作会影响实际展示的宽）

    【html结构说明】

    <pre>`<span class="hljs-class">.aloeCarousel</span> (最外层容器)
        <span class="hljs-class">.show-cards</span> (条目容器)
            <span class="hljs-class">.show-card</span> (条目)
            <span class="hljs-class">.show-card</span> (条目)
            <span class="hljs-class">.show-card</span> (条目)
        <span class="hljs-class">.carousel-control</span> (锚点容器，里面的内容自动生成)
            <span class="hljs-comment">//.carousel-anchor-active (当前锚点)</span>
            <span class="hljs-comment">//.carousel-anchor (锚点)</span>
            <span class="hljs-comment">//.carousel-anchor (锚点) </span>
        <span class="hljs-class">.pagedown-left</span> (向左翻页绑定在这个元素)
        <span class="hljs-class">.pagedown-right</span> (向右翻页绑定在这个元素)

# 开发者说明

要修改源码的按照以下步骤

1.  安装npm包

2.  在终端cd到源码目录下安装开发环境 `npm install`

3.  在终端下启动Gulp `gulp` (用了browser-sync，电脑卡的关掉端口打开的视口用静态的文件手动更新吧..)

4.  修改文件并保存
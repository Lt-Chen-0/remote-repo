# 说明：
1.**设计思路**：
 - 为什么做了三个：本来只打算做两个home 和 content，因为igem wiki一般就这两部分：其中home 动画比较多，其他内容展示一般都可以套模板。所以做了content（模板），home。但是home with photo scroll 有时候有点卡(js引用库比较多，图片太多，其中视差滚动也比较容易卡)而且感觉不太适合igem的home，所以做了个半成品。改做home_3(叫这个因为做了三版)

2.**文件说明**：
 - wiki_3/all final 文件为最终的文件，是其他三个文件夹的集成，不过内容版式可能有微调（将其他三个文件夹集成使其他三个网站可以超链接互相跳转，可以分开看。）
 - 其他三个文件夹为三个网站的源文件，可以分开看,没什么内容，都是随便取的名字。(其中model->home with photo scroll（unfinished）)
 - 主要看content和home_3就差不多
 - wikitry是做的过程产生的组件(我是先做组件再集成成网页),不需要看

3.**浏览model**：
- 看model最好将浏览器窗口变为接近电脑屏幕一半，比较流畅。（未最大化时，视口可能较小，浏览器只需要加载和渲染部分内容）
   
 
 # 参考网站与资料：
 1.**content**：
 - 侧边栏，back to top button，click to show more：学长们的网站
 - 配色，字体：https://2024.igem.wiki/heidelberg/
 - 动画：
    - 飞鸟，雪花：https://blog.csdn.net/frontlab/article/details/121892114
    - 雪花背景：学长分享的 [awwwards](https://www.awwwards.com/websites/)
      - 启发可以做[文字背景](https://immersive-g.com/)，但是做的和这个比肯定小巫见大巫

 2.**Home_3**：
 - 动画：
   - 资料：复旦大学线上WIKI交流活动：分享pdf中的[GSAP](https://gsap.com/)，发现了：[GASP resourese](https://gsap.com/demos/?page=1)，是三个功能的混合搭配
  * ps：其中一些库要付费，所以大多数功能都是重写的，用js和一些免费库实现的，改的都几乎没有GASP了。*
     - https://codepen.io/vanholtzco/pen/abEOead
     - https://codepen.io/GreenSock/pen/xxPNyyO
     - 还有一个忘了
   - 启发：学长分享的 [awwwards](https://www.awwwards.com/websites/)
      - 启发可以做[水平滚动](https://www.rangerak.org/)
      - 其中还有很多网站是水平滚动，pin之类的
 * ps：其中一些库要付费，所以大多数功能都是重写的，用js和一些免费库实现的。*
- 配色，字体：同上


 3.**Model/home with photo scroll（unfinished）**：
 - 动画：
    - 资料：[GASP resourese](https://codepen.io/collection/BNMEYN)，中的一个
      - https://codepen.io/GreenSock/pen/NWXgqyK
* ps：其中一些库要付费，所以大多数功能都是重写的，用js和一些免费库实现的。这个修改的很多*
    - 启发：学长分享的 [awwwards](https://www.awwwards.com/websites/)
      - 启发可以做[照片变化](https://www.rangerak.org/)
 - 配色，字体：同上
 - 这个有时候比较卡，如果刷新没用就关闭网页重试



4.**ps:参考资料自然不能忘了ai**

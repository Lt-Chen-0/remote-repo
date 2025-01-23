wiki homework 1
本来做的是飞行模拟游戏，但它有个bug，只有第一次玩是正常的，之后重新开始游戏分数一直是0，还有点卡。问了ai好几次也没解决。
所以，又做了打地鼠游戏。
但我感觉飞行模拟更好玩，（或许可以手动刷新）就保留了

wiki homework 2
1.navigation:
### 导航栏设计与实现说明

#### 需求背景
设计了一个固定顶部的导航栏。该导航栏在用户滚动页面时能够自动隐藏或显示，减少页面滚动时的视觉干扰，并且节省页面空间。同时支持鼠标悬停时保持可见。此外，导航栏还包含主菜单和子菜单，用户可以通过点击菜单项快速跳转到页面的不同部分。

#### 实现思路
1. **导航栏结构**  
   - 使用 `<nav>` 标签作为导航栏的容器，内部包含一个 `.navContainer` 用于布局。
   - 导航栏分为两部分：左侧的 Logo 区域和右侧的菜单区域。
   - 菜单区域使用 `<ul>` 和 `<li>` 标签构建主菜单和子菜单，子菜单通过 CSS 控制默认隐藏，并在鼠标悬停时显示。

2. **滚动隐藏与显示**  
   - 通过 JavaScript 监听页面的滚动事件，判断用户的滚动方向。
   - 如果用户向下滚动，隐藏导航栏；如果向上滚动，显示导航栏。
   - 当鼠标悬停在导航栏上时，保持导航栏可见；鼠标离开后，根据滚动方向决定是否隐藏。

3. **子菜单设计**  
   - 使用 CSS 的 `position: absolute` 将子菜单定位在主菜单项下方。
   - 通过 `:hover` 伪类控制子菜单的显示与隐藏。

#### 优点
- **用户体验优化**：通过滚动隐藏和显示导航栏，减少页面滚动时的视觉干扰，同时保留快速导航功能。
- **交互友好**：鼠标悬停时保持导航栏可见，避免用户需要滚动回顶部才能使用导航栏。
- **代码复用性强**：导航栏的结构和样式可以被多个页面复用.



2.side_bar_highlight_with_page_body（基本和学长一致）
#### 需求背景
a.side_bar:为了提升页面的导航体验，设计了一个动态导航栏。该导航栏能够根据用户的滚动位置自动高亮当前浏览的页面部分，并支持点击导航项快速跳转到对应内容区域。导航栏分为一级标题和二级标题，二级标题默认隐藏，当一级标题高亮时，对应的二级标题会自动展开。

b.page_body:
WIki 中主要展示文字记录，因此需要设计通用的模板便于后期各组工作完成后的内容填充。模板应该是可复用的，且对于非 Wiki 组的成员而言也应该是易于理解的，这将便于 Wiki Freeze 前各组的自行小修。

#### 实现思路
1. **导航栏结构**  
   - 使用 `<div>` 标签构建导航栏容器，包含一级标题和二级标题。
   - 一级标题通过 `onclick` 事件绑定滚动函数，点击后页面滚动到对应内容区域。
   - 二级标题默认隐藏，当一级标题高亮时，对应的二级标题展开。

2. **滚动高亮逻辑**  
   - 使用 JavaScript 监听页面滚动事件，计算当前视窗中可见的内容区域。
   - 根据内容区域的位置，动态高亮对应的导航项。
   - 如果当前高亮的一级标题有二级标题，则展开对应的二级标题。

3. **点击跳转功能**  
   - 为每个导航项绑定 `scrollToSection` 函数，点击后页面平滑滚动到对应的内容区域。

4. **模板设计**
   正文部分设计了 gird 实现的四图展示模板，只需要修改链接和描述即可实现复用，并支持 latex 公式与 pdf 文件的展示。

#### 优点
- **交互友好**：根据滚动位置自动高亮导航项，帮助用户快速定位当前浏览的页面部分。
- **动态展开**：二级标题默认隐藏，减少视觉干扰，当一级标题高亮时自动展开。
- **代码复用性强**：导航栏的结构和逻辑设计简单清晰，易于扩展和维护。
- **减轻上传压力**：在前期各组尚未供稿前就可以开始设计并逐步完善模板，减轻后期内容上传的压力。提供了尽可能完备的内容展示手段，允许团队尽可能完全地展示工作成果。

3.全景展示器：（不足在于要全景图片）
#### 需求背景
为了在网页中展示蛋白质、DNA 等生物分子的 3D 结构，或实验室环境，提供沉浸式的科学可视化体验，使用 **Pannellum** 库实现全景图像的加载和交互。用户可以通过鼠标拖动或触摸屏操作来浏览生物分子模型或实验室场景，增强用户体验效果。

#### 实现思路
1. **引入 Pannellum 库**  
   - 通过 CDN 引入 Pannellum 的 CSS 和 JavaScript 文件，快速集成全景展示功能。
   - Pannellum 是一个轻量级的全景图像查看器，支持多种全景图像格式。

2. **创建全景容器**  
   - 在 HTML 中定义一个 `<div>` 容器，用于承载全景图像。
   - 设置容器的宽度和高度，确保全景图像能够完整显示。

3. **配置全景查看器**  
   - 使用 `pannellum.viewer` 初始化全景查看器。
   - 配置全景图像的类型（如 `equirectangular`）和图像 URL。
   - 设置 `autoLoad` 为 `true`，使全景图像在页面加载时自动显示。
   - 添加热点（Hotspots）功能，用于标注生物分子结构或实验室设备的关键区域。

4. **交互功能**  
   - 用户可以通过鼠标拖动或触摸屏操作来浏览全景图像。
   - 热点功能允许用户点击特定区域，查看详细信息或跳转到相关页面。

#### 优点
- **沉浸式科学可视化**：全景图像提供 360° 的观看体验，适合展示生物分子结构或实验室环境。
- **轻量易用**：Pannellum 库体积小，集成简单，适合快速实现全景展示功能。
- **交互性强**：通过热点功能，用户可以点击关键区域，获取更多信息。
- **跨平台支持**：支持桌面端和移动端，兼容主流浏览器。


4.back-to-top 按钮（大部分和学长一样）
#### 优点：
- **交互友好**：添加了按动后scale缩小的功能，个人感觉可以增加交互感

5.mask（大部分和学长一样）
#### 实现思路
1. **实时更新loading进度** 
- 使用 window.performance.timing实时计算加载进度。使用 loadingText 显示加载进度，动态更新加载百分比。通过setInterval 每 100ms 更新一次加载进度，动态显示当前加载百分比

#### 优点：
- **交互友好**：增加了loading百分比，让用户等待时有反馈

6.team card or Collapsible Panel（基本和学长一致）
#### 优点：
- **复用性强**：不仅可以做队员展示，还可以做折叠面板，由于部分较多，每个部分的内容也很多，全部显示展示会导致页面过长，因此使用折叠面板，选择性展示主要信息，用户选择性查看


// 注册插件
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ── 主横向滚动动画 ── */
let sections = gsap.utils.toArray(".panel");
let scrollTween = gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none", // 保持匀速
  scrollTrigger: {
    trigger: ".container",
    pin: true,
    scrub: 0.1,
    end: "+=3000"
  }
});

// // 初始化部分元素位置
// gsap.set(".box-1, .box-2", { y: 100 });

// // // 默认开启标记（用于调试，可根据需要移除）
// // ScrollTrigger.defaults({
// //   markers: { startColor: "white", endColor: "white" }
// // });

// /* ── red panel 动画 ── */
// let redTween = gsap.to(".box-1", {
//   y: -130,
//   duration: 2,
//   ease: "elastic",
//   scrollTrigger: {
//     trigger: ".red",
//     start: "center center",
//     toggleActions: "play none none reset",
//     id: "1"
//   }
// });

// /* 点击按钮滚动到 red panel 开始位置
//    这里采用简单的定位：取 red panel 距页面顶部的位置，加上自身高度的一半，再减去视口高度的一半 */
// document.querySelector("#scrollTo").addEventListener("click", () => {
//   const redPanel = document.querySelector(".red");
//   const redPanelTop = redPanel.offsetTop;
//   const redPanelHeight = redPanel.offsetHeight;
//   const scrollTarget = redPanelTop + redPanelHeight / 2 - window.innerHeight / 2;
//   gsap.to(window, { scrollTo: scrollTarget, duration: 1 });
// });

// /* ── gray panel 动画 ── */
// gsap.to(".box-2", {
//   y: -120,
//   backgroundColor: "#1e90ff",
//   ease: "none",
//   scrollTrigger: {
//     trigger: ".gray",
//     start: "top center",
//     end: "bottom center",
//     scrub: true,
//     id: "2"
//   }
// });

// /* ── purple panel: 切换 CSS 类 ── */
// ScrollTrigger.create({
//   trigger: ".purple",
//   start: "center center",
//   onEnter: () => document.querySelector(".box-3").classList.add("active"),
//   onLeaveBack: () => document.querySelector(".box-3").classList.remove("active"),
//   id: "3"
// });

// /* ── green panel: 回调示例 ── */
// ScrollTrigger.create({
//   trigger: ".green",
//   start: "top center",
//   end: "bottom center",
//   onEnter: () => console.log("enter"),
//   onLeave: () => console.log("leave"),
//   onEnterBack: () => console.log("enterBack"),
//   onLeaveBack: () => console.log("leaveBack"),
//   onToggle: self => console.log("active", self.isActive),
//   id: "4"
// });

// 如果页面中引入了代码美化库（例如 Google Code Prettify），则调用
if (typeof PR !== "undefined" && PR.prettyPrint) {
  PR.prettyPrint();
}

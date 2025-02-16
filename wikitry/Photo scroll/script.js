// 初始化 Locomotive Scroll
const locoScroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
  smartphone: { smooth: true },
  tablet: { smooth: true }
});

// 配置 ScrollTrigger 与 Locomotive Scroll 的代理
ScrollTrigger.scrollerProxy("[data-scroll-container]", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  },
  pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed"
});

locoScroll.on("scroll", ScrollTrigger.update);
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();

// ----------------------
// Logo 动画
// ----------------------
let paths = gsap.utils.toArray("#logo-scroll path, #logo-smoother path, #logo-mouse");
let byGreensock = document.querySelector("#by-greensock");

let distPaths = gsap.utils.distribute({
  base: -300,
  amount: 600
});

let logoTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".logo-section",
    scroller: "[data-scroll-container]",
    scrub: 1,
    start: "bottom 95%",
    end: "bottom center"
  }
});

logoTl.to(paths, { x: distPaths })
      .to([...paths, byGreensock], { opacity: 0 }, 0);

// ----------------------
// Grid 动画
// ----------------------
let gridTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".grid-section",
    scroller: "[data-scroll-container]",
    scrub: 1,
    start: "top center",
    end: "bottom+=10% bottom"
  },
  defaults: { ease: "power1.inOut" }
});

gridTl.add("start")
  .from(".grid-layout", { ease: "power1", scale: 3 }, "start")
  .from(
    ".column-1 .grid-image",
    {
      duration: 0.6,
      xPercent: i => -((i + 1) * 40 + i * 100),
      yPercent: i => (i + 1) * 40 + i * 100
    },
    "start"
  )
  .from(
    ".column-3 .grid-image",
    {
      duration: 0.6,
      xPercent: i => (i + 1) * 40 + i * 100,
      yPercent: i => (i + 1) * 40 + i * 100
    },
    "start"
  );

// ----------------------
// Parallax 效果
// ----------------------
gsap.from(".parallax-section", {
  scale: 1 / 3,
  scrollTrigger: {
    trigger: ".parallax-section",
    scroller: "[data-scroll-container]",
    scrub: 1
  }
});

// ----------------------
// Pin 区域水平滚动
// ----------------------
let pinSection = document.querySelector(".pin-section");
let pinContent1 = document.querySelector(".pin-content-1");
let pinContent2 = document.querySelector(".pin-content-2");

let pinTl = gsap.timeline({
  scrollTrigger: {
    pin: true,
    trigger: pinSection,
    scroller: "[data-scroll-container]",
    scrub: true,
    start: "top top",
    end: () => `+=${pinContent1.offsetWidth}`,
    invalidateOnRefresh: true
  }
});

pinTl.fromTo(
  ".pin-content-1",
  {
    x: () => document.body.clientWidth * 0.9
  },
  {
    x: () => -(pinContent1.offsetWidth),
    ease: "none"
  },
  0
);

pinTl.fromTo(
  ".pin-content-2",
  {
    x: () => -pinContent2.offsetWidth + document.body.clientWidth * 0.1
  },
  {
    x: () => document.body.clientWidth,
    ease: "none"
  },
  0
);

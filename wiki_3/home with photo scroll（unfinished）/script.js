document.addEventListener("DOMContentLoaded", function() {
//navigation-----------------------------------------------
// 获取导航栏元素
const mainNav = document.getElementById('mainNav');

// 记录上次滚动位置
let lastScrollPosition = 0;

// 标记鼠标是否悬停在导航栏上
let isMouseHovering = false;

// 监听滚动事件
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    if (!isMouseHovering) { // 仅当鼠标未悬停时隐藏或显示导航栏
        if (scrollPosition > lastScrollPosition) {
            // 向下滚动，隐藏导航栏
            mainNav.classList.add('hideNav');
        } else {
            // 向上滚动，显示导航栏
            mainNav.classList.remove('hideNav');
        }
    }

    lastScrollPosition = scrollPosition;
});

// 鼠标悬停时显示导航栏
mainNav.addEventListener('mouseenter', () => {
    isMouseHovering = true;
    mainNav.classList.remove('hideNav');
});

// 鼠标离开后，根据滚动位置决定是否隐藏导航栏
mainNav.addEventListener('mouseleave', () => {
    isMouseHovering = false;
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollPosition > lastScrollPosition) {
        mainNav.classList.add('hideNav');
    }
});

// 获取所有导航链接
const navLinks = document.querySelectorAll('.navMenu li a');

// 获取所有对应的内容区域
const sections = [...navLinks].map(link => {
    const sectionId = link.getAttribute('data-section');
    return document.querySelector(`#${sectionId}`);
});

//back to top button-----------------------------------------------
// 获取按钮和进度条元素
const backToTopButton = document.getElementById('backToTop');
const progressRingCircle = document.querySelector('.progress-ring-circle');

// 设置进度条的半径和周长
const radius = progressRingCircle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

// 初始化进度条
progressRingCircle.style.strokeDasharray = `${circumference} ${circumference}`;
progressRingCircle.style.strokeDashoffset = circumference;

// 更新进度条的函数
function ringupdateProgress() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = circumference - (scrollTop / scrollHeight) * circumference;
    progressRingCircle.style.strokeDashoffset = progress;
}

// 监听滚动事件
window.addEventListener('scroll', ringupdateProgress);

// 点击按钮回到顶部
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// home 滚动效果-----------------------------------------------------
    // 初始化 Locomotive Scroll
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]'),
      smooth: true,
      multiplier: 1
    });
  
    // 注册 GSAP ScrollTrigger 插件
    gsap.registerPlugin(ScrollTrigger);
  
    // 配置 ScrollTrigger 以使用 Locomotive Scroll 的滚动容器
    ScrollTrigger.scrollerProxy('[data-scroll-container]', {
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
      }
    });
  
    // 在 Locomotive Scroll 触发滚动更新 ScrollTrigger
    locoScroll.on("scroll", ScrollTrigger.update);
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
  
    // 网格区块动画
    let gridTl = gsap.timeline({
      scrollTrigger: {
        scroller: "[data-scroll-container]",
        trigger: ".grid-section",
        scrub: 1,
        start: "top center",
        end: "bottom bottom"  // 可根据需要调整
      },
      defaults: { ease: "power1.inOut" }
    });
  
    gridTl.add("start")
      .from(".grid-layout", { scale: 3, ease: "power1" }, "start")
      .from(".column-1 .grid-image", {
        duration: 0.6,
        xPercent: (i) => -((i + 1) * 40 + i * 100),
        yPercent: (i) => (i + 1) * 40 + i * 100
      }, "start")
      .from(".column-3 .grid-image", {
        duration: 0.6,
        xPercent: (i) => (i + 1) * 40 + i * 100,
        yPercent: (i) => (i + 1) * 40 + i * 100
      }, "start");
  
    // 视差区块动画
    gsap.from(".parallax-section", {
      scale: 1 / 3,
      scrollTrigger: {
        scroller: "[data-scroll-container]",
        trigger: ".parallax-section",
        scrub: 1
      }
    });
  
    // 固定区块（横向滚动）动画
    const pinSection = document.querySelector(".pin-section");
    const pinContent1 = document.querySelector(".pin-content-1");
    const pinContent2 = document.querySelector(".pin-content-2");
  
    let pinTl = gsap.timeline({
      scrollTrigger: {
        scroller: "[data-scroll-container]",
        trigger: pinSection,
        pin: true,
        scrub: true,
        start: "top top",
        // end 值根据横向内容宽度计算：内容宽度减去视窗宽度
        end: () => "+=" + (pinContent1.offsetWidth - window.innerWidth),
        invalidateOnRefresh: true
      }
    });
  
    pinTl.fromTo(".pin-content-1", {
      x: () => document.body.clientWidth * 0.9
    }, {
      x: () => -pinContent1.offsetWidth,
      ease: "none"
    }, 0)
    .fromTo(".pin-content-2", {
      x: () => -pinContent2.offsetWidth + document.body.clientWidth * 0.1
    }, {
      x: () => document.body.clientWidth,
      ease: "none"
    }, 0);
  });
  
//   // 注册插件
// gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// /* ── 主横向滚动动画 ── */
// let sections = gsap.utils.toArray(".panel");
// let scrollTween = gsap.to(sections, {
//   xPercent: -100 * (sections.length - 1),
//   ease: "none", // 保持匀速
//   scrollTrigger: {
//     trigger: ".container",
//     pin: true,
//     scrub: 0.1,
//     end: "+=3000"
//   }
// });
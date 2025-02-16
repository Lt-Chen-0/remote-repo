

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

// 初始化部分元素位置
gsap.set(".box-1, .box-2", { y: 100 });

// // 默认开启标记（用于调试，可根据需要移除）
// ScrollTrigger.defaults({
//   markers: { startColor: "white", endColor: "white" }
// });

/* ── red panel 动画 ── */
let redTween = gsap.to(".box-1", {
  y: -130,
  ease: "none",
  scrollTrigger: {
    trigger: ".red",
    start: "right center",
    scrub: true,
    id: "1"
  }
});

/* ── gray panel 动画 ── */
gsap.to(".box-2", {
  y: -120,
  ease: "none",
  scrollTrigger: {
    trigger: ".gray",
    start: "center center",
    scrub: true,
    id: "2"
  }
});

/* ── purple panel: 切换 CSS 类 ── */
ScrollTrigger.create({
  trigger: ".purple",
  start: "center center",
  onEnter: () => document.querySelector(".box-3").classList.add("active"),
  onLeaveBack: () => document.querySelector(".box-3").classList.remove("active"),
  id: "3"
});



// 如果页面中引入了代码美化库（例如 Google Code Prettify），则调用
if (typeof PR !== "undefined" && PR.prettyPrint) {
  PR.prettyPrint();
}
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
const sections_1 = [...navLinks].map(link => {
    const sectionId = link.getAttribute('data-section');
    return document.querySelector(`#${sectionId}`);
});



//hero---------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".section1");
  let isDragging = false;
  let startX = 0;

  // ===== Intro 动画 =====
  // 模拟 gsap 的 timeline：延迟1s后触发 container 渐显，
  // 各子元素动画根据 CSS 定义的 transition-delay 自动启动
  setTimeout(() => {
    section.classList.add("animate");
  }, 1000);

  // ===== 交互（拖拽）细节 =====
  section.addEventListener("pointerdown", (e) => {
    isDragging = true;
    startX = e.clientX;
    section.style.transition = "transform 0.1s ease";
    section.style.cursor = "grabbing";
    // 拖拽时缩小
    section.style.transform = "scale(0.97)";
    // 模拟原代码中改变背景色（注意：仅影响此组件）
    section.style.backgroundColor = "#ACD5E6"; 
  });

  section.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    // 根据水平方向的偏移计算旋转角度（限制在 -3° ~ 3°）
    let rotation = deltaX / 50;
    rotation = Math.max(Math.min(rotation, 3), -3);
    section.style.transform = `scale(0.97) rotateX(${rotation}deg)`;
  });

  section.addEventListener("pointerup", () => {
    if (!isDragging) return;
    isDragging = false;
    section.style.transition = "transform 0.5s ease";
    section.style.transform = "scale(1) rotateX(0deg)";
    section.style.cursor = "grab";
    section.style.backgroundColor = "var(--green)";
  });

  section.addEventListener("pointerleave", () => {
    if (!isDragging) return;
    isDragging = false;
    section.style.transition = "transform 0.5s ease";
    section.style.transform = "scale(1) rotateX(0deg)";
    section.style.cursor = "grab";
    section.style.backgroundColor = "var(--green)";
  });

  // 设置初始光标状态
  section.style.cursor = "grab";
});


// 纯原生 JavaScript 实现 pin 效果
(function() {
  // 橙色区域的固定效果
  function updateOrangePin() {
    var orangeSection = document.getElementById("cp-orange");
    var orangeContent = document.getElementById("cp-orange-content");
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
    
    // 橙色区域的起始位置与高度
    var sectionTop = orangeSection.offsetTop;
    var sectionHeight = orangeSection.offsetHeight;
    // 当 orange 区域顶部进入视口顶部时开始 pin
    var pinStart = sectionTop;
    // 当 orange 区域底部距离视口顶部 150px 时解除 pin
    var pinEnd = sectionTop + sectionHeight - 150;
    
    if (scrollY < pinStart) {
      // 滚动未达到开始位置：恢复默认
      orangeContent.style.position = "relative";
      orangeContent.style.top = "0px";
    } else if (scrollY >= pinStart && scrollY < pinEnd) {
      // 在 pin 范围内：采用 fixed 固定
      orangeContent.style.position = "fixed";
      orangeContent.style.top = "0px";
      orangeContent.style.width = "90%"; // 保持宽度
    } else {
      // 滚动超过 pin 范围：将内容定位到橙色区域内的最终位置
      orangeContent.style.position = "absolute";
      // 此时 top 值设为 pinEnd 与区域顶部的差值
      orangeContent.style.top = (pinEnd - sectionTop) + "px";
    }
  }
  
  // 红色区域的固定效果
  function updateRedPin() {
    var redSection = document.getElementById("cp-red");
    var redContent = document.getElementById("cp-red-content");
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
    
    // 当红色区域顶部到达视口中心时开始 pin
    var pinStart = redSection.offsetTop - (window.innerHeight / 2);
    // 固定 200px 后解除 pin
    var pinEnd = pinStart + 200;
    
    if (scrollY < pinStart) {
      redContent.style.position = "relative";
      redContent.style.top = "0px";
    } else if (scrollY >= pinStart && scrollY < pinEnd) {
      // 固定期间，将元素以 fixed 方式显示，并置于视口中间
      var targetTop = (window.innerHeight - redContent.offsetHeight) / 2;
      redContent.style.position = "fixed";
      redContent.style.top = targetTop + "px";
      redContent.style.width = "90%";
    } else {
      redContent.style.position = "absolute";
      // 使其相对于红色区域处于固定区域的末尾
      redContent.style.top = "200px";
    }
  }
  
  // 同时更新所有 pin 效果
  function updatePins() {
    updateOrangePin();
    updateRedPin();
  }
  
  window.addEventListener("scroll", updatePins);
  window.addEventListener("resize", updatePins);
  // 初始调用一次
  updatePins();
})();


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
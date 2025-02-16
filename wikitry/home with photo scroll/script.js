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
  
//Hero---------------------------------------------
const container = document.getElementById('particle-container'); // 获取 div 容器
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = container.offsetWidth;   // 设置 canvas 宽度为 div 宽度
canvas.height = container.offsetHeight;  // 设置 canvas 高度为 div 高度

let particlesArray;

// 初始化粒子
function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000; // 根据屏幕大小调整粒子数量
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let directionX = (Math.random() * 0.2) - 0.1; // 水平方向速度，更小范围，模拟轻微漂移
        let directionY = (Math.random() * 0.5) + 0.1; // 垂直方向速度，正值范围，确保向下
        let color = 'rgba(101, 191, 255, 0.8)'; // 白色半透明粒子

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// 粒子类
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    // 绘制单个粒子
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    // 更新粒子位置
    update() {
        this.x += this.directionX;
        this.y += this.directionY;

        // 粒子碰到画布边缘反弹
        // 粒子碰到左右画布边缘反弹
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }

        // 粒子到达底部后，从顶部重新出现
        if (this.y > canvas.height) {
            this.y = 0 - this.size; // 从顶部稍微上方重新出现
            this.x = Math.random() * canvas.width; // 水平位置随机
        }

        // 不需要顶部边界反弹，移除或注释掉以下代码
        // if (this.y < 0) {
        //     this.directionY = -this.directionY;
        // }
        // 鼠标互动 - 检测鼠标与粒子距离
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < mouse.radius) {
            // 鼠标靠近时，粒子向反方向移动 (减弱强度)
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 3; // 减弱为 3
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 3; // 减弱为 3
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 3; // 减弱为 3
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 3; // 减弱为 3
            }
        }

        this.draw(); // 每次更新后重新绘制粒子
    }
}

// 动画循环
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空画布

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update(); // 更新每个粒子的状态
    }
    drawMouse(); // 绘制鼠标互动区域（可选，用于调试或视觉反馈）
}

// 鼠标对象，记录鼠标位置和互动半径
const mouse = {
    x: null,
    y: null,
    radius: 20 // 鼠标互动半径
}

// 监听鼠标移动事件
window.addEventListener('mousemove', function(event) {
    const canvasRect = canvas.getBoundingClientRect(); // 获取 canvas 元素的位置信息
    mouse.x = event.x - canvasRect.left;         // 修正鼠标 x 坐标
    mouse.y = event.y - canvasRect.top;          // 修正鼠标 y 坐标
});

// 监听鼠标离开事件
window.addEventListener('mouseout', function() {
    mouse.x = undefined;
    mouse.y = undefined;
});

// 可选：绘制鼠标互动区域，用于调试或视觉反馈
function drawMouse() {
    if (mouse.x && mouse.y) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
        ctx.stroke();
    }
}

// 调整窗口大小事件监听器 - 修改为调整 div 大小时重置画布和粒子
window.addEventListener('resize', function() {
    canvas.width = container.offsetWidth;  // 重新设置 canvas 宽度为 div 宽度
    canvas.height = container.offsetHeight; // 重新设置 canvas 高度为 div 高度
    init();
});

init(); // 初始化粒子
animate(); // 启动动画循环



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

//hero-----------------------------------------------------

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
    section.style.backgroundColor = "#6FAA00"; 
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

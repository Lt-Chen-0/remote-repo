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


// side bar---------------------------------------------------------------------

// 距离顶部的偏移量
var ScrollOffset = 0;

// 获取一级标题数量
var primaryHeadingCount = document.querySelectorAll(
  ".nav-section-item:not(.sub-section-item)"
).length;

let primaryHeadings = [];
for (let i = 1; i <= primaryHeadingCount; i++) {
  const heading = document.getElementById("primaryHeading" + i);
  if (heading) primaryHeadings.push(heading);
}

let secondaryHeadings = [];
for (let i = 0; i < primaryHeadingCount; i++) {
  var secondaryGroup = document.getElementById(`secondaryGroup${i + 1}`);
  secondaryHeadings.push([]);
  if (secondaryGroup) {
    var subItems = secondaryGroup.children.length;
    for (let j = 0; j < subItems; j++) {
      secondaryHeadings[i].push(
        document.getElementById(`secondaryHeading${i + 1}-${j + 1}`)
      );
    }
  }
}

// 滚动至指定部分
window.scrollToSection = function (element) {
  document.documentElement.scrollTop +=
    element.getBoundingClientRect().top - ScrollOffset;
};

let activeSubNav = null;

function updateHighlight(section, navItem, index) {
  var subNavGroup = document.getElementById(`secondaryGroup${index}`);
  var isInViewport =
    section.getBoundingClientRect().top < ScrollOffset + 1 &&
    section.getBoundingClientRect().bottom > ScrollOffset;

  if (isInViewport) {
    navItem.classList.add("active-highlight");
    if (activeSubNav !== subNavGroup) {
      if (activeSubNav) {
        activeSubNav.classList.remove("expanded");
        activeSubNav.style.display = "none";
      }
      if (subNavGroup) {
        subNavGroup.classList.add("expanded");
        subNavGroup.style.display = "block";
      }
      activeSubNav = subNavGroup;
    }
  } else {
    navItem.classList.remove("active-highlight");
  }
}

function checkHighlight() {
  for (let i = 0; i < primaryHeadings.length; i++) {
    updateHighlight(
      document.getElementById(`contentSection${i + 1}`),
      primaryHeadings[i],
      i + 1
    );
  }
}

function updateSubHighlight(section, subNavItem) {
  var isInViewport =
    section.getBoundingClientRect().top < ScrollOffset + 1 &&
    section.getBoundingClientRect().bottom > ScrollOffset;
  if (isInViewport) {
    subNavItem.classList.add("active-highlight");
  } else {
    subNavItem.classList.remove("active-highlight");
  }
}

function checkSubHighlight() {
  for (let i = 0; i < secondaryHeadings.length; i++) {
    for (let j = 0; j < secondaryHeadings[i].length; j++) {
      const section = document.getElementById(
        `contentSection${i + 1}-sub${j + 1}`
      );
      if (section) {
        updateSubHighlight(section, secondaryHeadings[i][j]);
      }
    }
  }
}

// 监听滚动事件
window.addEventListener("scroll", checkHighlight);
window.addEventListener("scroll", checkSubHighlight);


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
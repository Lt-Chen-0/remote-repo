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

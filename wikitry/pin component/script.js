//  pin 效果
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

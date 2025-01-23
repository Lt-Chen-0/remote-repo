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
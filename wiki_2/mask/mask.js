let mask = document.querySelector("#mask");
let loadingText = document.querySelector("#loading-text");

// 页面加载完成后淡出遮罩层
window.onload = function () {
    mask.style.opacity = 0;

    setTimeout(() => {
        mask.style.display = "none";
    }, 500); // 0.5秒后隐藏遮罩层
};

// 页面加载进度计算和更新
window.addEventListener("load", () => {
    const timing = window.performance.timing;

    // 定义页面加载阶段
    const stages = [
        { name: "DOM Parsing", start: timing.domLoading, end: timing.domInteractive },
        { name: "DOMContentLoaded", start: timing.domContentLoadedEventStart, end: timing.domContentLoadedEventEnd },
        { name: "Resources Loading", start: timing.domComplete, end: timing.loadEventStart },
        { name: "Page Render", start: timing.loadEventStart, end: timing.loadEventEnd },
    ];

    let interval = setInterval(() => {
        const now = Date.now();
        let total = 0;
        let elapsed = 0;

        stages.forEach((stage) => {
            const start = stage.start;
            const end = stage.end || now;

            if (start && end) {
                total += end - start;
                elapsed += Math.min(now - start, end - start);
            }
        });

        let percent = Math.round((elapsed / total) * 100);
        percent = Math.min(percent, 100);

        // 更新加载文本
        loadingText.textContent = `Loading ${percent}%`;

        if (percent >= 100) {
            clearInterval(interval);
            loadingText.textContent = "Ready";
            setTimeout(() => {
                mask.style.opacity = 0;
                setTimeout(() => mask.style.display = "none", 500); // 遮罩层淡出
            }, 1000);
        }
    }, 100); // 每100ms更新一次进度
});

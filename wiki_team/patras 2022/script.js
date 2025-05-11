document.addEventListener('DOMContentLoaded', () => {

    // ----- 平滑滚动导航 -----
    document.querySelectorAll('#navbar a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // 阻止默认跳转

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // 获取导航栏的高度
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                // 计算滚动位置，减去导航栏高度，避免内容被导航栏遮挡
                const scrollToPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: scrollToPosition,
                    behavior: 'smooth' // 平滑滚动
                });
            }
        });
    });


    // ----- 滑动进入动画 和 点变空心动画 -----
    // 现在观察的是整个 .timeline-item，因为 active-dot 类需要加到它上面
    const timelineItems = document.querySelectorAll('.timeline-item');

    // 创建 Intersection Observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const itemElement = entry.target; // 这是当前的 .timeline-item
            const contentElement = itemElement.querySelector('.timeline-content'); // 获取其内部的内容块

            // 如果元素进入视口
            if (entry.isIntersecting) {
                itemElement.classList.add('active-dot'); // 给时间线项目添加类，触发点变空心
                if (contentElement) { // 确保内容块存在
                    contentElement.classList.add('slide-in'); // 给内容块添加类，触发滑动进入
                }
                // 如果你希望动画只播放一次，可以在元素进入视口后停止观察
                // observer.unobserve(entry.target);
            }
            // 如果元素离开视口，让点和内容块恢复初始状态
            else {
                 itemElement.classList.remove('active-dot');
                 if (contentElement) {
                     contentElement.classList.remove('slide-in');
                 }
            }
        });
    }, {
        // 选项
        root: null, // 根元素为视口
        rootMargin: '0px', // 根元素的外边距
        threshold: 0.2 // 当元素20%可见时触发回调 (可以根据需要调整)
                       // 稍微提高阈值，确保点和内容块一起变化
    });

    // 观察每个时间线项目元素
    timelineItems.forEach(item => {
        observer.observe(item);
    });

});
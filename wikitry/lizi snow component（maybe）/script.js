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


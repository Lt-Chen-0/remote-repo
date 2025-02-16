const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;
const colors = [
    'rgba(255, 0, 0, 0.99)', // 白色半透明
    'rgba(255, 255, 255, 0.6)', // 浅白色半透明
    'hsla(55, 86.20%, 48.20%, 0.80)', // 浅蓝色半透明 (淡蓝)
    'rgba(100, 181, 246, 0.8)', // 浅蓝色半透明 (淡蓝)
    'rgba(147, 197, 253, 0.8)', // 浅蓝色半透明 (淡蓝)
    'rgba(135, 3, 250, 0.8)', // 浅白色半透明 (雪白)
    'rgba(220, 220, 220, 0.8)'  // 浅灰色半透明
    // 你可以添加更多颜色
];

// 初始化粒子
function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 30000; // 根据屏幕大小调整粒子数量
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let directionX = (Math.random() * 0.5) - 0.25; // 调整粒子速度范围
        let directionY = (Math.random() * 0.5) - 0.25;
        let color = colors[Math.floor(Math.random() * colors.length)]; // 从颜色数组中随机选择颜色

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
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // 鼠标互动 - 检测鼠标与粒子距离
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < mouse.radius) {
            // 鼠标靠近时，粒子向反方向移动
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
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
    radius: 30 // 鼠标互动半径
}

// 监听鼠标移动事件
window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
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

// 调整窗口大小事件监听器，重置画布和粒子
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init(); // 重新初始化粒子
});


init(); // 初始化粒子
animate(); // 启动动画循环
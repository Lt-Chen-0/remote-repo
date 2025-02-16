// ** 雪花效果 ** //
const snowContainer = document.getElementById('snow-container');
const snowCanvas = document.getElementById('snowCanvas');
const snowCtx = snowCanvas.getContext('2d');

snowCanvas.width = snowContainer.offsetWidth;
snowCanvas.height = snowContainer.offsetHeight;

let snowParticlesArray;

function initSnow() {
    snowParticlesArray = [];
    let numberOfParticles = (snowCanvas.height * snowCanvas.width) / 8000; // 雪花粒子数量可以调整
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = Math.random() * snowCanvas.width;
        let y = Math.random() * snowCanvas.height;
        let directionX = (Math.random() * 0.2) - 0.1;
        let directionY = (Math.random() * 0.5) + 0.5;
        let color = 'rgba(72, 130, 255, 0.8)';

        snowParticlesArray.push(new SnowParticle(x, y, directionX, directionY, size, color));
    }
}

class SnowParticle { // 雪花粒子类，可以与随机粒子类不同
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    draw() {
        snowCtx.beginPath(); // 注意使用 snowCtx
        snowCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        snowCtx.fillStyle = this.color;
        snowCtx.fill();
    }
    update() {
        this.x += this.directionX;
        this.y += this.directionY;

        if (this.x > snowCanvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > snowCanvas.height) {
            this.y = 0 - this.size;
            this.x = Math.random() * snowCanvas.width;
        }

        // ** 鼠标互动 - 检测鼠标与粒子距离并进行扰动 **
        if (mouse.x && mouse.y) { // 确保鼠标位置有效
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) { // 如果鼠标靠近粒子
                // 轻微扰动：让粒子向远离鼠标的方向移动
                if (mouse.x < this.x) {
                    this.x += 2; // 向右移动
                } else {
                    this.x -= 2; // 向左移动
                }
                if (mouse.y < this.y) {
                    this.y += 2; // 向下移动
                } else {
                    this.y -= 2; // 向上移动
                }
            }
        }

        this.draw();
    }
}

function animateSnow() { // 雪花动画函数
    requestAnimationFrame(animateSnow);
    snowCtx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);

    for (let i = 0; i < snowParticlesArray.length; i++) {
        snowParticlesArray[i].update();
    }
}


// ** 随机粒子效果 ** //
const randomParticlesContainer = document.getElementById('random-particles-container');
const randomParticleCanvas = document.getElementById('randomParticleCanvas');
const randomParticleCtx = randomParticleCanvas.getContext('2d');

randomParticleCanvas.width = randomParticlesContainer.offsetWidth;
randomParticleCanvas.height = randomParticlesContainer.offsetHeight;

let randomParticlesArray;

function initRandomParticles() {
    randomParticlesArray = [];
    let numberOfParticles = (randomParticleCanvas.height * randomParticleCanvas.width) / 10000; // 随机粒子数量可以调整
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 3) + 1;
        let x = Math.random() * randomParticleCanvas.width;
        let y = Math.random() * randomParticleCanvas.height;
        let directionX = (Math.random() * 1) - 0.5; // 随机粒子速度范围可以更大
        let directionY = (Math.random() * 1) - 0.5;
        let color = 'rgba(200,200,200,0.6)'; // 随机粒子颜色可以不同

        randomParticlesArray.push(new RandomParticle(x, y, directionX, directionY, size, color));
    }
}

class RandomParticle { // 随机粒子类，可以与雪花粒子类不同
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    draw() {
        randomParticleCtx.beginPath(); // 注意使用 randomParticleCtx
        randomParticleCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        randomParticleCtx.fillStyle = this.color;
        randomParticleCtx.fill();
    }
    update() {
        this.x += this.directionX;
        this.y += this.directionY;

        if (this.x > randomParticleCanvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > randomParticleCanvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // ** 鼠标互动 - 检测鼠标与粒子距离并进行扰动 (确保 RandomParticle 类也有这段代码!) **
        if (mouse.x && mouse.y) { // 确保鼠标位置有效
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) { // 如果鼠标靠近粒子
                // 轻微扰动：让粒子向远离鼠标的方向移动
                if (mouse.x < this.x) {
                    this.x += 2; // 向右移动
                } else {
                    this.x -= 2; // 向左移动
                }
                if (mouse.y < this.y) {
                    this.y += 2; // 向下移动
                } else {
                    this.y -= 2; // 向上移动
                }
            }
        }

        this.draw();
    }
}
function animateRandomParticles() { // 随机粒子动画函数
    requestAnimationFrame(animateRandomParticles);
    randomParticleCtx.clearRect(0, 0, randomParticleCanvas.width, randomParticleCanvas.height);

    for (let i = 0; i < randomParticlesArray.length; i++) {
        randomParticlesArray[i].update();
    }
}


// 鼠标对象和事件监听器 (可以共用，如果需要鼠标互动)
const mouse = { //  <-- 鼠标对象定义 **移动到这里，全局作用域**
    x: null,
    y: null,
    radius: 30  //  鼠标互动半径 现在设置为 10
}

window.addEventListener('mousemove', function(event) {
    //  如果需要鼠标互动，需要根据具体 canvas 计算鼠标在 canvas 中的相对坐标
    //  这里为了简化，假设鼠标互动是全局的，并影响两个粒子效果 (可以根据需求修改)
    const snowCanvasRect = snowCanvas.getBoundingClientRect();
    mouse.x = event.x - snowCanvasRect.left; //  使用其中一个 canvas 的位置来计算，假设两个 canvas 相对位置不影响鼠标效果
    mouse.y = event.y - snowCanvasRect.top;
});

window.addEventListener('mouseout', function() {
    mouse.x = undefined;
    mouse.y = undefined;
});


// 可选：绘制鼠标互动区域 (如果需要调试或视觉反馈，可以分别绘制两个 canvas 的鼠标互动区域)
// function drawMouse() { ... }


// 调整窗口大小事件监听器 (需要同时调整两个 canvas)
window.addEventListener('resize', function() {
    snowCanvas.width = snowContainer.offsetWidth;
    snowCanvas.height = snowContainer.offsetHeight;
    initSnow();

    randomParticleCanvas.width = randomParticlesContainer.offsetWidth;
    randomParticleCanvas.height = randomParticlesContainer.offsetHeight;
    initRandomParticles();
});


// 初始化和启动动画
initSnow();
animateSnow();

initRandomParticles();
animateRandomParticles();
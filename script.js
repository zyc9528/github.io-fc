// 等待文档加载完成
document.addEventListener('DOMContentLoaded', () => {
    // 初始化GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // 页面加载完成后移除加载动画
    setTimeout(() => {
        const loader = document.querySelector('.loader');
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 3000);
    
    // 初始化粒子系统
    initParticleSystem();
    
    // 初始化滚动动画
    initScrollAnimations();
    
    // 初始化3D卡片效果
    init3DCardEffect();
    
    // 初始化导航栏动画
    initNavAnimation();
    
    // 初始化主题切换功能
    initThemeToggle();
});

// 粒子系统初始化
function initParticleSystem() {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    
    // 设置canvas尺寸为窗口大小
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // 粒子数组
    const particles = [];
    const particleCount = 500;
    
    // 粒子类
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = getRandomColor();
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        
        // 更新粒子位置
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // 边界检查
            if (this.x < 0 || this.x > canvas.width) {
                this.speedX = -this.speedX;
            }
            
            if (this.y < 0 || this.y > canvas.height) {
                this.speedY = -this.speedY;
            }
        }
        
        // 绘制粒子
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
        }
    }
    
    // 生成随机颜色 - 限制在电影风格的色彩范围内
    function getRandomColor() {
        const colors = [
            'rgba(229, 9, 20, 0.8)',  // 电影红
            'rgba(0, 212, 255, 0.6)', // 科技蓝
            'rgba(212, 175, 55, 0.7)', // 暗金色
            'rgba(229, 229, 229, 0.5)' // 灰白色
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // 初始化粒子
    function init() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    // 动画循环
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        
        // 绘制粒子之间的连线
        connectParticles();
        
        requestAnimationFrame(animate);
    }
    
    // 连接临近的粒子
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(229, 229, 229, ${0.1 - distance/1000})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // 窗口大小变化时重置canvas尺寸
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // 启动粒子系统
    init();
    animate();
}

// 滚动动画初始化
function initScrollAnimations() {
    // 标题动画
    gsap.from('.cinematic-title', {
        duration: 1.5,
        y: 100,
        opacity: 0,
        rotationX: 45,
        ease: 'power3.out'
    });
    
    gsap.from('.subtitle', {
        duration: 1.5,
        y: 50,
        opacity: 0,
        delay: 0.5,
        ease: 'power3.out'
    });
    
    // 滚动指示动画
    gsap.from('.scroll-indicator', {
        duration: 1,
        opacity: 0,
        y: 30,
        delay: 1.5,
        ease: 'power2.out'
    });
    
    // 各部分内容动画
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        // 标题动画
        gsap.from(section.querySelector('.section-title'), {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 50%',
                toggleActions: 'play none none none'
            },
            duration: 1,
            opacity: 0,
            y: 50,
            ease: 'power3.out'
        });
        
        // 内容动画
        const elements = section.querySelectorAll('.data-card, .analysis-card, .forecast-item, .enterprise-card, .strategy-card, .gis-map, .gis-data-table');
        
        elements.forEach((element, index) => {
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    end: 'top 60%',
                    toggleActions: 'play none none none'
                },
                duration: 0.8,
                delay: index * 0.1,
                opacity: 0,
                y: 30,
                ease: 'power2.out'
            });
        });
    });
    
    // 视差滚动效果
    const parallaxSections = document.querySelectorAll('.parallax-section');
    
    parallaxSections.forEach(section => {
        gsap.to(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            },
            backgroundPosition: `50% ${-50}%`,
            ease: 'none'
        });
    });
}

// 3D卡片效果初始化
function init3DCardEffect() {
    const cards = document.querySelectorAll('.data-card, .enterprise-card, .strategy-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const cardRect = card.getBoundingClientRect();
            const centerX = cardRect.left + cardRect.width / 2;
            const centerY = cardRect.top + cardRect.height / 2;
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            const rotateY = ((mouseX - centerX) / (cardRect.width / 2)) * 30;
            const rotateX = ((centerY - mouseY) / (cardRect.height / 2)) * 15;
            
            card.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
            card.style.transition = 'transform 0.5s ease';
        });
    });
}

// 导航栏滚动动画
function initNavAnimation() {
    const nav = document.querySelector('.film-nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
            // 导航栏效果已通过CSS处理，无需额外GSAP
        } else {
            nav.classList.remove('scrolled');
            // 导航栏效果已通过CSS处理，无需额外GSAP
        }
    });
    
    // 导航链接点击动画
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            
            // 获取目标元素
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // 电影溶解过渡效果
            const overlay = document.createElement('div');
            overlay.classList.add('page-transition');
            document.body.appendChild(overlay);
            
            gsap.to(overlay, {
                opacity: 1,
                duration: 0.6,
                ease: 'power2.inOut',
                onComplete: () => {
                    // 滚动到目标位置
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'auto'
                    });
                    
                    // 溶解消失
                    gsap.to(overlay, {
                        opacity: 0,
                        duration: 0.6,
                        delay: 0.2,
                        ease: 'power2.inOut',
                        onComplete: () => {
                            overlay.remove();
                        }
                    });
                }
            });
        });
    });
}

// 主题切换功能
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    themeToggle.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            body.setAttribute('data-theme', 'light');
            themeToggle.querySelector('.mode-icon').style.backgroundImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23141414'%3E%3Cpath d='M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z'/%3E%3C/svg%3E")`;
        } else {
            body.setAttribute('data-theme', 'dark');
            themeToggle.querySelector('.mode-icon').style.backgroundImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23E5E5E5'%3E%3Cpath d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 20V4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20Z'/%3E%3C/svg%3E")`;
        }
        
        // 主题切换动画
        const themeTweenColor = body.getAttribute('data-theme') === 'dark' ? '#141414' : '#E5E5E5';
        
        const overlay = document.createElement('div');
        overlay.classList.add('theme-transition-overlay');
        document.body.appendChild(overlay);
        
        gsap.to(overlay, {
            opacity: 0.5,
            duration: 0.5,
            ease: 'power2.inOut',
            onComplete: () => {
                gsap.to(overlay, {
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        overlay.remove();
                    }
                });
            }
        });
    });
}

// 添加页面转场样式
const styleElement = document.createElement('style');
styleElement.textContent = `
.page-transition {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0;
    z-index: 9999;
    pointer-events: none;
}

.theme-transition-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--deep-space-black);
    opacity: 0;
    z-index: 9998;
    pointer-events: none;
}
`;
document.head.appendChild(styleElement);

// 按钮点击粒子爆炸效果
document.addEventListener('click', e => {
    // 检查点击的是否是按钮或者链接
    if (e.target.tagName === 'BUTTON' || e.target.classList.contains('nav-link') || e.target.closest('.data-card') || e.target.closest('.strategy-card')) {
        createParticleExplosion(e.clientX, e.clientY);
    }
});

// 创建粒子爆炸效果
function createParticleExplosion(x, y) {
    const particles = [];
    const particleCount = 100;
    const colors = ['#E50914', '#00D4FF', '#D4AF37', '#E5E5E5'];
    
    // 创建爆炸效果的canvas
    const explosionCanvas = document.createElement('canvas');
    explosionCanvas.classList.add('explosion-canvas');
    explosionCanvas.style.position = 'fixed';
    explosionCanvas.style.top = '0';
    explosionCanvas.style.left = '0';
    explosionCanvas.style.width = '100%';
    explosionCanvas.style.height = '100%';
    explosionCanvas.style.pointerEvents = 'none';
    explosionCanvas.style.zIndex = '1000';
    
    explosionCanvas.width = window.innerWidth;
    explosionCanvas.height = window.innerHeight;
    
    document.body.appendChild(explosionCanvas);
    
    const ctx = explosionCanvas.getContext('2d');
    
    // 粒子类
    class ExplosionParticle {
        constructor() {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 5 + 1;
            this.speedX = Math.random() * 6 - 3;
            this.speedY = Math.random() * 6 - 3;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.opacity = 1;
            this.gravity = 0.05;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.speedY += this.gravity;
            this.opacity -= 0.01;
            this.size -= 0.05;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
        }
    }
    
    // 初始化粒子
    for (let i = 0; i < particleCount; i++) {
        particles.push(new ExplosionParticle());
    }
    
    // 动画函数
    function animateExplosion() {
        ctx.clearRect(0, 0, explosionCanvas.width, explosionCanvas.height);
        
        particles.forEach((particle, index) => {
            if (particle.opacity > 0 && particle.size > 0) {
                particle.update();
                particle.draw();
            } else {
                particles.splice(index, 1);
            }
        });
        
        if (particles.length > 0) {
            requestAnimationFrame(animateExplosion);
        } else {
            explosionCanvas.remove();
        }
    }
    
    animateExplosion();
}

// 添加页面可访问性支持
function addAccessibilitySupport() {
    // 添加ARIA标签
    document.querySelectorAll('nav a').forEach(link => {
        link.setAttribute('role', 'menuitem');
    });
    
    document.querySelectorAll('section').forEach(section => {
        section.setAttribute('role', 'region');
        if (section.id) {
            section.setAttribute('aria-labelledby', `title-${section.id}`);
        }
    });
    
    // 键盘导航支持
    document.addEventListener('keydown', e => {
        // Tab键导航增强
        if (e.key === 'Tab') {
            const focusableElements = 'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])';
            const focusableContent = document.querySelectorAll(focusableElements);
            
            // 为焦点元素添加视觉指示
            document.addEventListener('focusin', e => {
                if (e.target.matches(focusableElements)) {
                    e.target.classList.add('keyboard-focus');
                }
            });
            
            document.addEventListener('focusout', e => {
                if (e.target.matches(focusableElements)) {
                    e.target.classList.remove('keyboard-focus');
                }
            });
        }
    });
}

// 执行可访问性支持函数
addAccessibilitySupport(); 
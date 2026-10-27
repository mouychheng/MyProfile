// Background Particle Animation ពណ៌ផ្ទៃមេឃ
const canvas = document.getElementById('bg-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const particleCount = 60;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = `rgba(0, 210, 255, ${Math.random() * 0.5 + 0.2})`;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
}

// គ្រប់គ្រង Link ក្នុង More Folder ពេលទាញយក Header មកដាក់
function setupNavLinks() {
    const linkHome = document.getElementById('link-home');
    const linkAbout = document.getElementById('link-about');
    const linkProjects = document.getElementById('link-projects');
    const linkCv = document.getElementById('link-cv');
    const linkBlog = document.getElementById('link-blog');
    const linkContact = document.getElementById('link-contact');

    if (linkHome) linkHome.href = '../index.html';
    if (linkAbout) linkAbout.href = 'about.html';
    if (linkProjects) linkProjects.href = 'projects.html';
    if (linkCv) linkCv.href = 'cv-builder.html';
    if (linkBlog) linkBlog.href = 'blog.html';
    if (linkContact) linkContact.href = 'contact.html';
}

// គ្រប់គ្រង Hamburger Mobile Menu និង Theme Toggle (ប្តូរម៉ូត ថ្ងៃ/យប់)
function initHeaderEvents() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');
    const themeBtn = document.getElementById('theme-toggle');

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const icon = themeBtn.querySelector('i');
            if (icon) {
                if (document.body.classList.contains('light-mode')) {
                    icon.className = 'fa-solid fa-sun';
                } else {
                    icon.className = 'fa-solid fa-moon';
                }
            }
        });
    }
}
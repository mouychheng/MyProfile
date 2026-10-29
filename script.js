// ==========================================
// 1.BACKGROUND PARTICLE ANIMATION
// ==========================================
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
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    animate();
}

// ==========================================
// 2. SMART NAVBAR, PATH & ACTIVE PAGE SETUP
// ==========================================
function setupNavLinks() {
    const isRoot = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
    const currentFileName = window.location.pathname.split('/').pop().toLowerCase();

    // កំណត់ Link ទៅតាមថតឯកសារដោយស្វ័យប្រវត្តិ
    const logoLink = document.getElementById('logo-link');
    const linkHome = document.getElementById('link-home');
    const linkAbout = document.getElementById('link-about');
    const linkProjects = document.getElementById('link-projects');
    const linkCv = document.getElementById('link-cv');
    const linkBlog = document.getElementById('link-blog');
    const linkContact = document.getElementById('link-contact');

    if (logoLink) logoLink.href = isRoot ? 'index.html' : '../index.html';
    if (linkHome) linkHome.href = isRoot ? 'index.html' : '../index.html';
    if (linkAbout) linkAbout.href = isRoot ? 'More/about.html' : 'about.html';
    if (linkProjects) linkProjects.href = isRoot ? 'More/projects.html' : 'projects.html';
    if (linkCv) linkCv.href = isRoot ? 'More/cv-builder.html' : 'cv-builder.html';
    if (linkBlog) linkBlog.href = isRoot ? 'More/blog.html' : 'blog.html';
    if (linkContact) linkContact.href = isRoot ? 'More/contact.html' : 'contact.html';

    // 📌 ចាប់យកទំព័របច្ចុប្បន្នស្វ័យប្រវត្តិដើម្បីដាក់បន្ទាត់ភ្លើង Active Page
    setTimeout(() => {
        if (isRoot || currentFileName === '' || currentFileName === 'index.html') {
            if (linkHome) linkHome.classList.add('active-page');
        } else if (currentFileName.includes('about')) {
            if (linkAbout) linkAbout.classList.add('active-page');
        } else if (currentFileName.includes('project')) {
            if (linkProjects) linkProjects.classList.add('active-page');
        } else if (currentFileName.includes('cv')) {
            if (linkCv) linkCv.classList.add('active-page');
        } else if (currentFileName.includes('blog')) {
            if (linkBlog) linkBlog.classList.add('active-page');
        } else if (currentFileName.includes('contact')) {
            if (linkContact) linkContact.classList.add('active-page');
        }
    }, 30);
}

// ==========================================
// 3. HEADER EVENTS (Hamburger & Theme Toggle)
// ==========================================
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

// ==========================================
// 4. SMART SEARCH LOGIC (កែសម្រួលថ្មី៖ មិនលោតផ្ដេសផ្ដាស និង Filter ចំណងជើងភ្លាមៗ)
// ==========================================
function handleGlobalSearch(e) {
    let keyword = e.target.value.toLowerCase().trim();

    // ១. ប្រសិនបើស្ថិតនៅលើទំព័រ Blog (blog.html) ឱ្យវា Filter ចំណងជើងអត្ថបទភ្លាមៗតាមការវាយ
    if (typeof filterBlog === 'function') {
        let blogSearchInput = document.getElementById('blog-search');
        if (blogSearchInput) {
            blogSearchInput.value = keyword;
            filterBlog();
        }
        return;
    }

    // ២. ប្រសិនបើស្ថិតនៅលើទំព័រ Projects (projects.html) ឱ្យវា Filter ចំណងជើង Project ភ្លាមៗ
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length > 0) {
        projectCards.forEach(card => {
            let text = card.innerText.toLowerCase();
            card.style.display = text.includes(keyword) ? 'block' : 'none';
        });
        return;
    }

    // ៣. ប្រសិនបើស្ថិតនៅលើទំព័រផ្សេង (ឧ. index.html) ហើយចុច Enter ទើបវាលោតទៅទំព័រ Blog ជាមួយពាក្យស្វែងរក
    if (e.key === 'Enter') {
        e.preventDefault();
        if (keyword.length > 0) {
            const isRoot = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
            const targetPath = isRoot ? 'More/blog.html' : 'blog.html';
            
            window.location.href = `${targetPath}?search=${encodeURIComponent(keyword)}`;
        }
    }
}
const portfolioData = [
    { id: 1, title: 'Gone', description: 'A heartfelt song about missing someone and feeling their absence.', image: 'images/Gone - CoverArt.jpg', tech: ['Piano House', 'Progressive House', 'EDM'] },
    { id: 2, title: 'Lost In Your Eyes', description: 'A emotive song that feels wistful and hopeful, as if longing for someone’s love while holding onto memories.', image: 'images/Lost In Your Eyes - CoverArt.jpg', tech: ['Progressive House', 'EDM'] },
    { id: 3, title: 'Control It', description: 'Secure decentralized storage solution using advanced encryption and distributed ledger technology.', image: 'images/Control It - CoverArt.jpg', tech: ['Pop', 'Pop/House'] },
    { id: 4, title: 'Take Me', description: 'A dreamy, inviting house‑track that feels like asking someone to take you away from your worries and into the night.', image: 'images/Take Me - CoverArt.jpg', tech: ['Future House', 'EDM'] },
    { id: 5, title: 'Remember', description: 'A pulsating synthwave track filled with retro-futuristic synths and driving rhythms, evoking the feeling of a night drive through neon-lit streets.', image: 'images/Remember - CoverArt.jpg', tech: ['Synthwave', 'Chill', 'Night Vibes'] },
    { id: 6, title: 'Easy To Love', description: 'a moody, atmospheric synth‑heavy track that feels like cruising under neon lights late at night.', image: 'images/Easy To Love - CoverArt.jpg', tech: ['Future House', 'EDM'] },
    { id: 7, title: 'Lonely', description: 'A wistful, melancholic house tune that captures the feeling of loneliness and longing.', image: 'images/Lonely - CoverArt.jpg', tech: ['Progressive House', 'House'] },
    { id: 8, title: 'Not Enough', description: 'A high-energy Slap House track with catchy drops and pulsing beats that capture the feeling of wanting more from life and love.', image: 'images/Not Enough - CoverArt.jpg', tech: ['Slap House', 'House'] },
    { id: 9, title: 'All This Time', description: 'A vibrant Future House track with uplifting melodies and driving rhythms that make you want to dance all night.', image: 'images/All This Time - CoverArt.jpg', tech: ['Future House', 'House'] },
    { id: 10, title: 'Here for Love', description: 'A soaring Progressive House track with emotive melodies and powerful drops that create an uplifting, euphoric atmosphere.', image: 'images/Here For Love - CoverArt.jpg', tech: ['Progressive House', 'EDM'] },
    { id: 11, title: 'Regret', description: 'A moody track that evokes the weight of looking back and wrestling with what could have been.', image: 'images/Regret - CoverArt.jpg', tech: ['HardStyle', 'Progressive House'] }
];

// Skills data
const skillsData = [
    { name: 'React.js', icon: '⚛️', level: 95, category: 'frontend' },
    { name: 'Node.js', icon: '🟢', level: 90, category: 'backend' },
    { name: 'TypeScript', icon: '📘', level: 88, category: 'frontend' },
    { name: 'AWS', icon: '☁️', level: 92, category: 'cloud' },
    { name: 'Docker', icon: '🐳', level: 85, category: 'cloud' },
    { name: 'Python', icon: '🐍', level: 93, category: 'backend' },
    { name: 'Kubernetes', icon: '☸️', level: 82, category: 'cloud' },
    { name: 'GraphQL', icon: '◈', level: 87, category: 'backend' },
    { name: 'TensorFlow', icon: '🤖', level: 78, category: 'emerging' },
    { name: 'Blockchain', icon: '🔗', level: 75, category: 'emerging' },
    { name: 'Vue.js', icon: '💚', level: 85, category: 'frontend' },
    { name: 'MongoDB', icon: '🍃', level: 90, category: 'backend' }
];

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    const header = document.getElementById('header');
    if (section) {
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = section.offsetTop - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
}

// Initialize particles
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 15;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (18 + Math.random() * 8) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Carousel
let currentIndex = 0;
const carousel = document.getElementById('carousel');
const indicatorsContainer = document.getElementById('indicators');

function createCarouselItem(data, index) {
    const item = document.createElement('div');
    item.className = 'carousel-item';
    item.dataset.index = index;
    
    const techBadges = data.tech.map(tech => `<span class="tech-badge">${tech}</span>`).join('');
    item.innerHTML = `
        <div class="card">
            <div class="card-number">0${data.id}</div>
            <div class="card-image"><img src="${data.image}" alt="${data.title}"></div>
            <h3 class="card-title">${data.title}</h3>
            <p class="card-description">${data.description}</p>
            <div class="card-tech">${techBadges}</div>
        </div>
    `;
    return item;
}

function initCarousel() {
    if (!carousel || !indicatorsContainer) return;

    portfolioData.forEach((data, index) => {
        const item = createCarouselItem(data, index);
        carousel.appendChild(item);

        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (index === 0) indicator.classList.add('active');
        indicator.dataset.index = index;
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });
    updateCarousel();
}

function updateCarousel() {
    if (!carousel) return;
    const items = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    const totalItems = items.length;
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024;

    items.forEach((item, index) => {
        let offset = index - currentIndex;
        if (offset > totalItems / 2) offset -= totalItems;
        else if (offset < -totalItems / 2) offset += totalItems;

        const absOffset = Math.abs(offset);
        const sign = offset < 0 ? -1 : 1;

        item.style.transform = '';
        item.style.opacity = '';
        item.style.zIndex = '';
        item.style.transition = 'all 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)';

        let spacing1 = isMobile ? 280 : isTablet ? 340 : 400;
        let spacing2 = isMobile ? 420 : isTablet ? 520 : 600;
        let spacing3 = isMobile ? 550 : isTablet ? 650 : 750;

        if (absOffset === 0) {
            item.style.transform = 'translate(-50%, -50%) translateZ(0) scale(1)';
            item.style.opacity = '1';
            item.style.zIndex = '10';
        } else if (absOffset === 1) {
            const translateX = sign * spacing1;
            const rotation = isMobile ? 25 : 30;
            const scale = isMobile ? 0.88 : 0.85;
            item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-200px) rotateY(${-sign * rotation}deg) scale(${scale})`;
            item.style.opacity = '0.8';
            item.style.zIndex = '5';
        } else if (absOffset === 2) {
            const translateX = sign * spacing2;
            const rotation = isMobile ? 35 : 40;
            const scale = isMobile ? 0.75 : 0.7;
            item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-350px) rotateY(${-sign * rotation}deg) scale(${scale})`;
            item.style.opacity = '0.5';
            item.style.zIndex = '3';
        } else if (absOffset === 3) {
            const translateX = sign * spacing3;
            const rotation = isMobile ? 40 : 45;
            const scale = isMobile ? 0.65 : 0.6;
            item.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(-450px) rotateY(${-sign * rotation}deg) scale(${scale})`;
            item.style.opacity = '0.3';
            item.style.zIndex = '2';
        } else {
            item.style.transform = 'translate(-50%, -50%) translateZ(-500px) scale(0.5)';
            item.style.opacity = '0';
            item.style.zIndex = '1';
        }
    });

    indicators.forEach((indicator, index) => indicator.classList.toggle('active', index === currentIndex));
}

function nextSlide() { currentIndex = (currentIndex + 1) % portfolioData.length; updateCarousel(); }
function prevSlide() { currentIndex = (currentIndex - 1 + portfolioData.length) % portfolioData.length; updateCarousel(); }
function goToSlide(index) { currentIndex = index; updateCarousel(); }

// Skills Grid
function initSkillsGrid() {
    const skillsGrid = document.getElementById('skillsGrid');
    const categoryTabs = document.querySelectorAll('.category-tab');
    if (!skillsGrid || categoryTabs.length === 0) return;

    function displaySkills(category = 'all') {
        skillsGrid.innerHTML = '';
        const filteredSkills = category === 'all' ? skillsData : skillsData.filter(skill => skill.category === category);
        filteredSkills.forEach((skill, index) => {
            const hexagon = document.createElement('div');
            hexagon.className = 'skill-hexagon';
            hexagon.style.animationDelay = `${index * 0.1}s`;
            hexagon.innerHTML = `
                <div class="hexagon-inner">
                    <div class="hexagon-content">
                        <div class="skill-icon-hex">${skill.icon}</div>
                        <div class="skill-name-hex">${skill.name}</div>
                        <div class="skill-level">
                            <div class="skill-level-fill" style="width: ${skill.level}%"></div>
                        </div>
                        <div class="skill-percentage-hex">${skill.level}%</div>
                    </div>
                </div>
            `;
            skillsGrid.appendChild(hexagon);
        });
    }

    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            displaySkills(tab.dataset.category);
        });
    });

    displaySkills();
}

// Event listeners (safe checks)
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
if (nextBtn) nextBtn.addEventListener('click', nextSlide);
if (prevBtn) prevBtn.addEventListener('click', prevSlide);
setInterval(nextSlide, 5000);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
});

// Window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateCarousel, 250);
});

// Initialize
initCarousel();
initSkillsGrid();
initParticles();

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (header) {
        header.classList.toggle('scrolled', window.scrollY > 100);
    }
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        if (link.classList.contains('external-link')) return; // About page

        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        const header = document.getElementById('header');
        if (!target) return;

        const headerHeight = header ? header.offsetHeight : 0;
        const top = target.offsetTop - headerHeight;

        window.scrollTo({ top: top, behavior: 'smooth' });
    });
});



function updateActiveNav() {
    const scrollPosition = window.scrollY + 100;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href').substring(1) === sectionId));
        }
    });
}
window.addEventListener('scroll', updateActiveNav);

// Animated counter
function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const counter = setInterval(() => {
        current += step;
        if (current >= target) { element.textContent = target; clearInterval(counter); }
        else element.textContent = Math.floor(current);
    }, 16);
}

// Stats section animation
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(number => {
                    if (!number.classList.contains('animated')) {
                        number.classList.add('animated');
                        animateCounter(number);
                    }
                });
            }
        });
    }, { threshold: 0.5, rootMargin: '0px 0px -100px 0px' });
    observer.observe(statsSection);
}

// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(contactForm));
        alert(`Thank you ${data.name}! Your message has been transmitted successfully. We'll respond within 24 hours.`);
        contactForm.reset();
    });
}

// Loading screen
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) setTimeout(() => loader.classList.add('hidden'), 1500);
});

// Hero parallax
window.addEventListener('scroll', () => {
    const parallax = document.querySelector('.hero');
    if (parallax) parallax.style.transform = `translateY(${window.pageYOffset * 0.5}px)`;
});

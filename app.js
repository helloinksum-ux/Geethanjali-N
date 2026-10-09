/* ==========================================================================
   GEETHANJALI N PORTFOLIO - CORE APPLICATION JS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // 2. Scroll Reveal Animations & Navigation
    initScrollReveal();
    initNavigation();

    // 3. Theme Toggle Switcher
    initThemeToggle();

    // 4. Published Articles Reader Modal
    initArticleModals();

    // 5. Contact Form Handling
    initContactForm();
});

/* -------------------------------------------------------------------------- */
/* Scroll Reveal Observer & Section Animations                                */
/* -------------------------------------------------------------------------- */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
}

/* -------------------------------------------------------------------------- */
/* Navigation & Scroll Handling                                               */
/* -------------------------------------------------------------------------- */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scrollProgress');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
        // Scroll Progress
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (scrollProgress) scrollProgress.style.width = scrolled + '%';

        // Sticky Navbar Glass
        if (winScroll > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link Highlight
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const link = document.querySelector(`.nav-item[href="#${sectionId}"]`);

            if (winScroll >= sectionTop && winScroll < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-item').forEach(l => l.classList.remove('active'));
                if (link) link.classList.add('active');
            }
        });
    });

    // Mobile Menu Toggle
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isOpen = navLinks.classList.contains('active');
            mobileMenuBtn.querySelector('.open-icon').style.display = isOpen ? 'none' : 'block';
            mobileMenuBtn.querySelector('.close-icon').style.display = isOpen ? 'block' : 'none';
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.querySelector('.open-icon').style.display = 'block';
                mobileMenuBtn.querySelector('.close-icon').style.display = 'none';
            });
        });
    }
}

/* -------------------------------------------------------------------------- */
/* Theme Toggle Switcher                                                      */
/* -------------------------------------------------------------------------- */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    document.documentElement.setAttribute('data-theme', currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);

            if (typeof initContentMixChart === 'function') {
                setTimeout(() => {
                    initContentMixChart();
                    initCompetencyChart();
                }, 100);
            }
        });
    }
}

/* -------------------------------------------------------------------------- */
/* Published Articles Modal Reader Data                                       */
/* -------------------------------------------------------------------------- */
const ARTICLES_DATA = {
    art1: {
        title: "Network Security Associate Skills Required",
        category: "Cybersecurity & Career Guidance",
        outlet: "Win in Life Academy",
        url: "https://wininlifeacademy.com/",
        summary: `
            <h4>Article Overview</h4>
            <p>A career-focused educational guide breaking down essential competencies for Network Security Associates. Covers intrusion detection, firewall configuration, SIEM monitoring, and industry certification paths.</p>
            <h4>Key Writing Focus</h4>
            <ul>
                <li>Clear technical explanations for entry and mid-level cybersecurity learners.</li>
                <li>Structured headers aligned with high-intent search queries.</li>
                <li>Practical skill checklists and recommended certifications (CompTIA Security+, CCNA).</li>
            </ul>
        `
    },
    art2: {
        title: "Supervised Learning vs Unsupervised Learning",
        category: "Machine Learning & AI",
        outlet: "Win in Life Academy",
        url: "https://wininlifeacademy.com/",
        summary: `
            <h4>Article Overview</h4>
            <p>A comprehensive comparison article explaining the core differences between supervised and unsupervised machine learning algorithms, labeled vs unlabeled datasets, and real-world enterprise use cases.</p>
            <h4>Key Writing Focus</h4>
            <ul>
                <li>Side-by-side comparative breakdown table.</li>
                <li>Accessible analogies simplifying complex mathematical concepts.</li>
                <li>Search-optimized definitions for key machine learning terminology.</li>
            </ul>
        `
    },
    art3: {
        title: "Tableau Developer vs Tableau Analyst",
        category: "Data Analytics & Business Intelligence",
        outlet: "Win in Life Academy",
        url: "https://wininlifeacademy.com/",
        summary: `
            <h4>Article Overview</h4>
            <p>An in-depth career exploration analyzing two prominent roles in the data ecosystem. Details responsibilities, ETL pipeline requirements vs visualization storytelling, and salary expectations.</p>
            <h4>Key Writing Focus</h4>
            <ul>
                <li>Targeted for data professionals seeking clear career specialization guidance.</li>
                <li>Search-focused structure targeting high-volume query intent.</li>
            </ul>
        `
    },
    art4: {
        title: "Top SQL Queries for Data Analysts",
        category: "Database & SQL",
        outlet: "Win in Life Academy",
        url: "https://wininlifeacademy.com/",
        summary: `
            <h4>Article Overview</h4>
            <p>A practical, code-focused guide covering fundamental to advanced SQL queries including SELECT statements, JOIN types, GROUP BY aggregations, CTEs, and window functions.</p>
            <h4>Key Writing Focus</h4>
            <ul>
                <li>Clean, well-formatted code snippets with practical business scenarios.</li>
                <li>Actionable insights for junior analysts preparing for technical interviews.</li>
            </ul>
        `
    },
    art5: {
        title: "Machine Learning vs Deep Learning",
        category: "Artificial Intelligence",
        outlet: "Win in Life Academy",
        url: "https://wininlifeacademy.com/",
        summary: `
            <h4>Article Overview</h4>
            <p>An accessible explainer highlighting the structural differences between traditional machine learning algorithms and multi-layered artificial neural networks (Deep Learning).</p>
            <h4>Key Writing Focus</h4>
            <ul>
                <li>Explains feature extraction vs automated feature learning.</li>
                <li>Includes hardware requirements, data volume thresholds, and industry applications.</li>
            </ul>
        `
    },
    art6: {
        title: "How to Become a Data Scientist in 2026",
        category: "Data Science Roadmap",
        outlet: "Win in Life Academy",
        url: "https://wininlifeacademy.com/",
        summary: `
            <h4>Article Overview</h4>
            <p>A forward-looking career roadmap outlining required skills in Python, statistics, machine learning, data wrangling, and portfolio creation for modern data science aspirants.</p>
            <h4>Key Writing Focus</h4>
            <ul>
                <li>Step-by-step learning progression from beginner to job-ready.</li>
                <li>Optimized for evergreen organic search traffic.</li>
            </ul>
        `
    },
    art7: {
        title: "Top AI Projects for Beginners in 2026",
        category: "AI Projects & Practice",
        outlet: "Win in Life Academy",
        url: "https://wininlifeacademy.com/",
        summary: `
            <h4>Article Overview</h4>
            <p>A curated list of beginner-friendly artificial intelligence projects, including sentiment analysis bots, computer vision classifiers, and recommendation engines.</p>
            <h4>Key Writing Focus</h4>
            <ul>
                <li>Project ideas paired with recommended Python libraries (scikit-learn, OpenCV, TensorFlow).</li>
                <li>High engagement guide encouraging practical portfolio building.</li>
            </ul>
        `
    }
};

function initArticleModals() {
    const modal = document.getElementById('articleModal');
    const closeBtn = document.getElementById('modalCloseBtn');
    const modalBody = document.getElementById('modalBodyContent');
    const readBtns = document.querySelectorAll('.read-article-btn');

    if (!modal || !modalBody) return;

    readBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = btn.getAttribute('data-id');
            const data = ARTICLES_DATA[id];

            if (data) {
                modalBody.innerHTML = `
                    <div style="font-size: 0.8rem; font-weight: 700; color: var(--emerald-primary); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem;">
                        ${data.outlet} • ${data.category}
                    </div>
                    <h2 style="font-size: 1.6rem; margin-bottom: 1.25rem;">${data.title}</h2>
                    <div style="padding: 1rem; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-glass); border-radius: var(--radius-md);">
                        ${data.summary}
                    </div>
                    <div style="margin-top: 1.5rem; text-align: right;">
                        <a href="${data.url}" target="_blank" rel="noopener" class="btn btn-emerald btn-sm">
                            <span>Visit Win in Life Academy</span>
                            <i data-lucide="arrow-up-right"></i>
                        </a>
                    </div>
                `;
                if (window.lucide) lucide.createIcons();
                modal.classList.add('active');
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

/* -------------------------------------------------------------------------- */
/* Contact Form Handling                                                      */
/* -------------------------------------------------------------------------- */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const toast = document.getElementById('toastNotification');
    const toastMsg = document.getElementById('toastMessage');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('userName').value;
        const submitBtn = document.getElementById('submitBtn');

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Sending Message...</span>`;
        }

        setTimeout(() => {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = `<span>Send Message</span><i data-lucide="send"></i>`;
                if (window.lucide) lucide.createIcons();
            }

            form.reset();

            if (toast && toastMsg) {
                toastMsg.textContent = `Thank you, ${name}! Your message has been sent to Geethanjali N.`;
                toast.classList.add('show');

                setTimeout(() => {
                    toast.classList.remove('show');
                }, 5000);
            }
        }, 1000);
    });
}

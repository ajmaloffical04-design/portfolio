// Custom Cursor Logic
const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
    });
});

const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .project-card, .service-item, .step');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
    
    // Magnetic Effect for Nav Links & Small Hover Elements
    if(el.tagName === 'A' || el.classList.contains('nav-link')) {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(el, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)"
            });
        });
    }
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Initial Load Animation
const tl = gsap.timeline();

tl.fromTo('.bg-sphere', 
    { opacity: 0, scale: 0.8 }, 
    { opacity: 0.4, scale: 1, duration: 2, ease: "power2.out" }
)
.fromTo('.top-header', 
    { opacity: 0, y: -20 }, 
    { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
    "-=1.5"
)
.fromTo('.hero-content .profile-img-container', 
    { opacity: 0, scale: 0 }, 
    { opacity: 1, scale: 1, duration: 1.2, ease: "elastic.out(1, 0.7)" },
    "-=1"
)
.fromTo('.hero-title', 
    { opacity: 0, y: 50, skewY: 5 }, 
    { opacity: 1, y: 0, skewY: 0, duration: 1.2, ease: "power4.out" },
    "-=0.8"
)
.fromTo('.hero-actions', 
    { opacity: 0, y: 20 }, 
    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
    "-=0.6"
)
.fromTo('.bottom-nav', 
    { opacity: 0, y: 50 }, 
    { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
    "-=0.5"
);

// Scroll Animations for Reveal Elements
const revealElements = document.querySelectorAll('.gsap-reveal');
revealElements.forEach(el => {
    gsap.fromTo(el, 
        { opacity: 0, y: 60 },
        { 
            opacity: 1, 
            y: 0, 
            duration: 1.2, 
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 90%", 
                toggleActions: "play none none reverse"
            }
        }
    );
});

// Staggered reveal for project cards with 3D feel
gsap.fromTo(".project-card",
    { opacity: 0, y: 100, rotateX: -10 },
    {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 80%"
        }
    }
);

// Service Items Stagger
gsap.fromTo(".service-item",
    { opacity: 0, borderBottomWidth: 0 },
    {
        opacity: 1,
        borderBottomWidth: 1,
        stagger: 0.1,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
            trigger: ".services-list",
            start: "top 80%"
        }
    }
);

// Active Nav Link Switcher
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.bottom-nav .nav-links li a');

window.addEventListener('scroll', () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

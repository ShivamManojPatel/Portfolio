// script.js
// ═══════════════════════════════════
// GSAP PLUGINS
// ═══════════════════════════════════
gsap.registerPlugin(ScrollTrigger);

// ═══════════════════════════════════
// CURSOR
// ═══════════════════════════════════
const cursor = document.getElementById("cursor");
const follower = document.getElementById("cursor-follower");
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
});

function animateFollower() {
    followerX += (mouseX - followerX) * 0.08;
    followerY += (mouseY - followerY) * 0.08;
    follower.style.left = followerX + "px";
    follower.style.top = followerY + "px";
    requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll("a, button, .project-row, .skill-card, .exp-row").forEach(el => {
    el.addEventListener("mouseenter", () => {
        cursor.classList.add("hovering");
        follower.classList.add("hovering");
    });
    el.addEventListener("mouseleave", () => {
        cursor.classList.remove("hovering");
        follower.classList.remove("hovering");
    });
});

// ═══════════════════════════════════
// NAVBAR
// ═══════════════════════════════════
window.addEventListener("scroll", () => {
    document.getElementById("navbar").classList
        .toggle("scrolled", window.scrollY > 40);
});

// ═══════════════════════════════════
// THEME TOGGLE
// ═══════════════════════════════════
const themeBtn = document.getElementById("theme-toggle");
const html = document.documentElement;

themeBtn.addEventListener("click", () => {
    const isDark = html.getAttribute("data-theme") === "dark";
    html.setAttribute("data-theme", isDark ? "light" : "dark");
    themeBtn.textContent = isDark ? "Dark" : "Light";
});

// ═══════════════════════════════════
// TYPED.JS
// ═══════════════════════════════════
new Typed("#typed-text", {
    strings: [
        "Full Stack Developer",
        "CS Grad Student",
        "Problem Solver",
        "Open to Work"
    ],
    typeSpeed: 55,
    backSpeed: 35,
    backDelay: 2000,
    loop: true
});

// ═══════════════════════════════════
// PARTICLES
// ═══════════════════════════════════
tsParticles.load("particles", {
    background: { color: { value: "transparent" } },
    particles: {
        number: { value: 120, density: { enable: true, area: 900 } },
        color: { value: ["#a855f7", "#ec4899"] },
        shape: { type: "circle" },
        opacity: {
            value: 0.4,
            random: true,
            animation: { enable: true, speed: 0.8, minimumValue: 0.2 }
        },
        size: {
            value: 2.5,
            random: true
        },
        links: {
            enable: true,
            distance: 130,
            color: "#a855f7",
            opacity: 0.20,
            width: 1
        },
        move: {
            enable: true,
            speed: 0.8,
            random: true,
            outModes: { default: "bounce" }
        }
    },
    interactivity: {
        events: {
            onHover: { enable: true, mode: "repulse" }
        },
        modes: {
            repulse: { distance: 80, duration: 0.4 }
        }
    }
});

// ═══════════════════════════════════
// MAGNETIC BUTTONS
// ═══════════════════════════════════
document.querySelectorAll(".magnetic").forEach(btn => {
    btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, {
            x: x * 0.25,
            y: y * 0.25,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    btn.addEventListener("mouseleave", () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
    });
});

// ═══════════════════════════════════
// NUMBER COUNTERS
// ═══════════════════════════════════
const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute("data-count"));
            gsap.to({ val: 0 }, {
                val: target,
                duration: 1.5,
                ease: "power2.out",
                onUpdate: function() {
                    entry.target.textContent = Math.floor(this.targets()[0].val) + "+";
                }
            });
            countObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll(".stat-val").forEach(el => countObserver.observe(el));

// ═══════════════════════════════════
// SKILL BARS
// ═══════════════════════════════════
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.getAttribute("data-width");
            gsap.to(entry.target, {
                width: width + "%",
                duration: 1.5,
                ease: "power3.out",
                delay: 0.2
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll(".skill-fill").forEach(el => skillObserver.observe(el));

// ═══════════════════════════════════
// GSAP HERO ENTRANCE
// ═══════════════════════════════════
const tl = gsap.timeline({ delay: 0.2 });

tl.from(".hero-meta", {
    y: 16, opacity: 0, duration: 0.5, ease: "power2.out"
})
.from(".hero-name .name-line", {
    y: 60, opacity: 0, duration: 0.7,
    stagger: 0.1, ease: "power3.out"
}, "-=0.2")
.from(".hero-role", {
    y: 16, opacity: 0, duration: 0.5, ease: "power2.out"
}, "-=0.3")
.from(".hero-desc", {
    y: 16, opacity: 0, duration: 0.5, ease: "power2.out"
}, "-=0.3")
.from(".hero-actions", {
    y: 16, opacity: 0, duration: 0.5, ease: "power2.out"
}, "-=0.3")
.from(".hero-scroll", {
    opacity: 0, duration: 0.5
}, "-=0.2")
.from(".hero-side", {
    x: 30, opacity: 0, duration: 0.7, ease: "power2.out"
}, "-=0.6");

// ═══════════════════════════════════
// GSAP SCROLL ANIMATIONS
// ═══════════════════════════════════

// About
gsap.from(".about-left", {
    scrollTrigger: { trigger: "#about", start: "top 75%" },
    x: -40, opacity: 0, duration: 0.8, ease: "power2.out"
});

gsap.from(".about-right", {
    scrollTrigger: { trigger: "#about", start: "top 75%" },
    x: 40, opacity: 0, duration: 0.8, ease: "power2.out"
});

// Skills
gsap.from(".skill-card", {
    scrollTrigger: { trigger: "#skills", start: "top 75%" },
    y: 20, opacity: 0, duration: 0.5,
    stagger: 0.05, ease: "power2.out"
});

// Projects
gsap.from(".project-row", {
    scrollTrigger: { trigger: "#projects", start: "top 75%" },
    y: 20, opacity: 0, duration: 0.5,
    stagger: 0.08, ease: "power2.out"
});

// Experience
gsap.from(".exp-row", {
    scrollTrigger: { trigger: "#experience", start: "top 75%" },
    y: 20, opacity: 0, duration: 0.5,
    stagger: 0.1, ease: "power2.out"
});

// Contact
gsap.from(".contact-left", {
    scrollTrigger: { trigger: "#contact", start: "top 75%" },
    x: -40, opacity: 0, duration: 0.8, ease: "power2.out"
});

gsap.from(".contact-form", {
    scrollTrigger: { trigger: "#contact", start: "top 75%" },
    x: 40, opacity: 0, duration: 0.8, ease: "power2.out"
});

// ═══════════════════════════════════
// ACTIVE NAV LINK ON SCROLL
// ═══════════════════════════════════
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 100) {
            current = section.getAttribute("id");
        }
    });
    navLinks.forEach(link => {
        link.style.color = "";
        if (link.getAttribute("href") === "#" + current) {
            link.style.color = "var(--primary)";
        }
    });
});

// ═══════════════════════════════════
// CONTACT FORM
// ═══════════════════════════════════
document.getElementById("contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = e.target.querySelector("button");
    const original = btn.textContent;
    btn.textContent = "Sent ✓";
    btn.style.background = "linear-gradient(135deg, #10b981, #059669)";
    setTimeout(() => {
        btn.textContent = original;
        btn.style.background = "";
        e.target.reset();
    }, 3000);
});

// ═══════════════════════════════════
// SKILL BAR GLOW — add filled class
// ═══════════════════════════════════
setTimeout(() => {
    document.querySelectorAll(".skill-fill").forEach(el => {
        el.classList.add("filled");
    });
}, 2000);

// ═══════════════════════════════════
// PROJECT ROW — stagger highlight
// ═══════════════════════════════════
document.querySelectorAll(".project-row").forEach((row, i) => {
    row.addEventListener("mouseenter", () => {
        gsap.to(row, {
            paddingLeft: "28px",
            duration: 0.2,
            ease: "power2.out"
        });
    });
    row.addEventListener("mouseleave", () => {
        gsap.to(row, {
            paddingLeft: "24px",
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// ═══════════════════════════════════
// EXPERIENCE ROW — subtle lift
// ═══════════════════════════════════
document.querySelectorAll(".exp-row").forEach(row => {
    row.addEventListener("mouseenter", () => {
        gsap.to(row, {
            x: 4,
            duration: 0.2,
            ease: "power2.out"
        });
    });
    row.addEventListener("mouseleave", () => {
        gsap.to(row, {
            x: 0,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});


// ═══════════════════════════════════
// LOADER — SP Split Reveal
// ═══════════════════════════════════
document.body.style.overflow = "hidden";

const lS = document.getElementById("lS");
const lP = document.getElementById("lP");
const lHivam = document.getElementById("lHivam");
const lAtel = document.getElementById("lAtel");
const lSpace = document.getElementById("lSpace");
const loaderFill = document.getElementById("loaderFill");
const loaderPct = document.getElementById("loaderPct");
const loaderStatus = document.getElementById("loaderStatus");

// Progress line
let pct = 0;
const pctInterval = setInterval(() => {
    pct = Math.min(pct + 1.2, 100);
    loaderFill.style.width = pct + "%";
    loaderPct.textContent = Math.floor(pct) + "%";
    if(pct >= 100) clearInterval(pctInterval);
}, 30);

// Status updates
setTimeout(() => { loaderStatus.textContent = "// loading assets"; }, 600);
setTimeout(() => { loaderStatus.textContent = "// building ui"; }, 1300);
setTimeout(() => { loaderStatus.textContent = "// almost ready"; }, 2000);

// Step 1 — SP pulse
setTimeout(() => {
    lS.style.transform = "scale(1.15)";
    lP.style.transform = "scale(1.15)";
}, 1900);

// Step 2 — Split apart
setTimeout(() => {
    lS.style.transform = "translateX(-6px) scale(1)";
    lP.style.transform = "translateX(6px) scale(1)";
}, 2200);

// Step 3 — Expand to full name
setTimeout(() => {
    lHivam.style.maxWidth = "220px";
    lHivam.style.opacity = "1";
    lAtel.style.maxWidth = "220px";
    lAtel.style.opacity = "1";
    lSpace.style.width = "18px";
    lS.style.transform = "translateX(0)";
    lP.style.transform = "translateX(0)";
    loaderStatus.textContent = "// ready";
}, 2500);

// Step 4 — Hide loader
window.addEventListener("load", () => {
    setTimeout(() => {
        const loader = document.getElementById("loader");
        loader.classList.add("hidden");
        document.body.style.overflow = "auto";
    }, 3200);
});

// ═══════════════════════════════════
// SCROLL PROGRESS BAR
// ═══════════════════════════════════
const scrollProgress = document.getElementById("scroll-progress");

window.addEventListener("scroll", () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / total) * 100;
    scrollProgress.style.width = progress + "%";
});

// ═══════════════════════════════════
// MOBILE MENU
// ═══════════════════════════════════
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    mobileMenu.classList.toggle("open");
});

function closeMobileMenu() {
    hamburger.classList.remove("open");
    mobileMenu.classList.remove("open");
}

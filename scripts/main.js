/* ===============================
   Feather Icons
================================ */
document.addEventListener("DOMContentLoaded", () => {
    feather.replace();
});

/* ===============================
   Smooth Scroll
================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ===============================
   Translations
================================ */
const translations = {
    de: {
        name: "Dejan Breburda",
        role: "Web- und Backend-Entwickler",
        about: "Über mich",
        greeting: "Hi, ich bin",
        "about-text": "Ich bin ein motivierter Entwickler, der bereits erste Erfahrungen in der Programmierung gesammelt hat. Mein Fokus liegt auf Python und Java. Besonders begeistert mich das kreative Lösen von Problemen und das Eintauchen in komplexe Details - ich arbeite gerne detailorientiert und bin immer bereit, Neues zu lernen.",
        "my-projects": "Meine Projekte",
        "get-in-touch": "Kontakt aufnehmen",
        "contact-message": "Hast du ein Projekt im Kopf? Ich bin immer offen für neue Möglichkeiten.",
        "contact-me":"Kontakt",
        "send-message": "Nachricht senden",
        "view-project": "Projekt Ansehen",
        "project-code": "Zum Projektcode",
        "projects-subtitle":"Eine Auswahl meiner neuesten Arbeiten",
        "netvision-description": "NetVision ist ein Netzwerkdokumentationstool, das Switch-Konfigurationen automatisch ausliest und die Netzwerktopologie übersichtlich in einer Weboberfläche darstellt - ideal zur Unterstützung von Administratoren in Bildungseinrichtungen.",
        "colline-scanner-description":"Colline Scanner ist eine Webanwendung, die QR-Codes von Produkten der Firma „Colline degli Ulivi di Daniele De Simone“ scannt und diese automatisch in einem Warenkorb erfasst. Ziel der Anwendung ist es, den Verkaufsprozess zu vereinfachen und effizienter zu gestalten."
    },
    en: {
        name: "Dejan Breburda",
        role: "Web- and Backend-Developer",
        about: "About Me",
        greeting: "Hi, I am",
        "hero-description": "I'm a motivated developer with experience in programming, specializing in Python and Java. I'm especially passionate about creatively solving problems and diving into complex details - I work with great attention to detail and always strive to learn new things.",
        "my-projects": "My Projects",
        "get-in-touch": "Get in Touch",
        "contact-message": "I'm always interested in hearing about new projects. Feel free to reach out!",
        "contact-me":"Contact",
        "send-message": "Send Message",
        "view-project": "View Project",
        "project-code": "To the project code",
        "projects-subtitle":"A selection of my latest work",
        "netvision-description": "NetVision is a network documentation tool that automatically reads switch configurations and clearly visualizes the network topology in a web interface - ideal for supporting administrators in educational environments.",
        "colline-scanner-description":"Colline Scanner is a web application that scans QR codes of products from the company “Colline degli Ulivi di Daniele De Simone” and automatically adds them to a shopping cart. The goal of the application is to streamline and simplify the sales process."
    }
};

const userLang = navigator.language.startsWith("de") ? "de" : "en";

/* ===============================
   Apply i18n
================================ */
function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.dataset.i18n;
        if (translations[userLang]?.[key]) {
            el.textContent = translations[userLang][key];
        }
    });
}

/* ===============================
   Load Projects
================================ */
async function loadProjects() {
    try {
        const response = await fetch("projects/projects.json");
        const projects = await response.json();
        const grid = document.getElementById("project-grid");
        
        projects.forEach((project, index) => {
            const card = document.createElement("div");
            card.className = "project-card";
            card.setAttribute("role", "region");
            card.setAttribute("aria-label", `${project.title} Project`);
            
            // Animation delay for stagger effect
            card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
            
            card.innerHTML = `
                <div class="project-image">
                    ${project.screenshot 
                        ? `<img src="${project.screenshot}" alt="${project.title} Screenshot" loading="lazy" />` 
                        : `<div class="project-image-fallback"><i data-feather="${project.icon}"></i></div>`
                    }
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description" data-i18n="${project.descriptionKey}"></p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
                    </div>
                    <div class="project-buttons">
                        <a href="${project.liveUrl}" class="btn btn-primary" rel="noopener noreferrer" target="_blank">
                            <span data-i18n="view-project">Ansehen</span>
                            <i data-feather="external-link"></i>
                        </a>
                        <a href="${project.codeUrl}" class="btn btn-secondary" rel="noopener noreferrer" target="_blank">
                            <span data-i18n="project-code">Code</span>
                            <i data-feather="github"></i>
                        </a>
                    </div>
                </div>
            `;
            
            grid.appendChild(card);
        });
        
        // Apply translations if function exists
        if (typeof applyTranslations === 'function') {
            applyTranslations();
        }
        
        // Replace feather icons
        feather.replace();
        
    } catch (error) {
        console.error("Error loading projects:", error);
        const grid = document.getElementById("project-grid");
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-muted);">
                <p>Projekte konnten nicht geladen werden.</p>
            </div>
        `;
    }
}

/* ===============================
   Init
================================ */
document.addEventListener("DOMContentLoaded", async () => {
    applyTranslations();
    // Load projects
    loadProjects();
    
    // Initialize feather icons
    feather.replace();
    
    // Add intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        const speed = 0.5 + (index * 0.1);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

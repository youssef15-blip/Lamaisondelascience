const showDetailsData = {
    volcans: {
        title: "🌋 Volcans en Furie",
        content: `
            <p>Un spectacle explosif où les enfants deviennent de vrais volcanologues !</p>
            <ul>
                <li>🏗️ Création d'un volcan en plâtre</li>
                <li>💥 Réaction chimique spectaculaire</li>
                <li>🌡️ Comprendre la pression magmatique</li>
                <li>🎁 Repartez avec votre volcan</li>
            </ul>
            <p><strong>⏱️ Durée :</strong> 1h30</p>
            <p><strong>👶 À partir de :</strong> 6 ans</p>
            <p><strong>💰 Prix :</strong> 25€ par enfant</p>
        `
    },
    slime: {
        title: "🧪 Laboratoire Slime",
        content: `
            <p>Fabrique tes propres boues magiques avec des couleurs néon et des textures incroyables !</p>
            <ul>
                <li>🎨 3 recettes de slime différentes</li>
                <li>✨ Ajout de paillettes et couleurs</li>
                <li>🔬 Comprendre les polymères</li>
                <li>🎁 Repartez avec 3 slimes</li>
            </ul>
            <p><strong>⏱️ Durée :</strong> 1h30</p>
            <p><strong>👶 À partir de :</strong> 5 ans</p>
            <p><strong>💰 Prix :</strong> 20€ par enfant</p>
        `
    },
    electricite: {
        title: "⚡ Magic de l'Électricité",
        content: `
            <p>Découvre les secrets de l'électricité avec des expériences bluffantes et sécurisées !</p>
            <ul>
                <li>💡 Création d'un circuit électrique</li>
                <li>🧲 Expériences avec des aimants</li>
                <li>⚡ Électricité statique</li>
                <li>🔦 Construisez une petite lampe</li>
            </ul>
            <p><strong>⏱️ Durée :</strong> 2h00</p>
            <p><strong>👶 À partir de :</strong> 8 ans</p>
            <p><strong>💰 Prix :</strong> 30€ par enfant</p>
        `
    },
    espace: {
        title: "🚀 Voyage Spatial",
        content: `
            <p>Pars à la découverte des planètes et fabrique ta propre fusée à eau !</p>
            <ul>
                <li>🪐 Maquette du système solaire</li>
                <li>🚀 Fabrication de fusée à eau</li>
                <li>🌍 Comprendre la gravité</li>
                <li>🎆 Lancement de fusée (extérieur)</li>
            </ul>
            <p><strong>⏱️ Durée :</strong> 2h00</p>
            <p><strong>👶 À partir de :</strong> 7 ans</p>
            <p><strong>💰 Prix :</strong> 35€ par enfant</p>
        `
    }
};

const galleryItems = [
    { emoji: '🧪', label: 'Chimie' },
    { emoji: '🌋', label: 'Volcan' },
    { emoji: '⚡', label: 'Électricité' },
    { emoji: '🚀', label: 'Espace' },
    { emoji: '🔬', label: 'Microscope' },
    { emoji: '🧲', label: 'Magnétisme' }
];

document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initScrollAnimations();
    initParticles();
    initSmoothScroll();
    initEmailJS();
    initVideoAutoplay();
    initShortsSlider();
});

function initEmailJS() {
    // REMPLACEZ 'YOUR_PUBLIC_KEY' par votre clé publique EmailJS
    // Allez sur emailjs.com -> Account -> API Keys -> Public Key
    emailjs.init('5syGKAWRa1HO-1NIU');
}

function initNavbar() {
    const navbar = document.getElementById('navbar');
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('navLinks');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    if (burger) {
        burger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            burger.classList.toggle('active');
        });
    }
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burger.classList.remove('active');
        });
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.show-card, .feature, .gallery-item, .short-card').forEach(el => {
        observer.observe(el);
    });
}

function initVideoAutoplay() {
    const videos = document.querySelectorAll('video');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                video.play().catch(e => console.log('Autoplay prevented:', e));
            } else {
                video.pause();
            }
        });
    }, {
        threshold: 0.5
    });
    
    videos.forEach(video => {
        observer.observe(video);
    });
    
    // Keep mute toggle functionality for shorts only
    document.querySelectorAll('.mute-toggle').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const video = this.closest('.short-container').querySelector('video');
            video.muted = !video.muted;
            this.textContent = video.muted ? '🔇' : '🔊';
            this.classList.toggle('unmuted', !video.muted);
        });
    });
}

function initShortsSlider() {
    const slider = document.querySelector('.shorts-slider');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const shortCards = document.querySelectorAll('.short-card');
    let currentIndex = 0;
    const totalCards = shortCards.length;

    function getVisibleCards() {
        const container = document.querySelector('.shorts-slider-container');
        const containerWidth = container.offsetWidth - 80; // Space for arrows
        
        // Get computed width of a card
        const computedStyle = window.getComputedStyle(shortCards[0]);
        const cardWidth = shortCards[0].offsetWidth;
        const gap = 20; // Approximate gap
        
        if (cardWidth <= 0) return 1;
        return Math.max(1, Math.floor(containerWidth / (cardWidth + gap)));
    }

    function updateSlider() {
        const gap = 20;
        const cardWidth = shortCards[0].offsetWidth;
        const visibleCards = getVisibleCards();
        
        // Calculate slide width based on card width + gap
        const slideWidth = cardWidth > 0 ? cardWidth + gap : 200;
        const translateX = -currentIndex * slideWidth;
        slider.style.transform = `translateX(${translateX}px)`;

        // Update arrow states
        const maxIndex = Math.max(0, totalCards - visibleCards);
        leftArrow.disabled = currentIndex <= 0;
        rightArrow.disabled = currentIndex >= maxIndex;
    }

    leftArrow.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    rightArrow.addEventListener('click', () => {
        const visibleCards = getVisibleCards();
        const maxIndex = Math.max(0, totalCards - visibleCards);
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }
    });

    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        const visibleCards = getVisibleCards();
        const maxIndex = Math.max(0, totalCards - visibleCards);

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentIndex < maxIndex) {
                currentIndex++;
                updateSlider();
            } else if (diff < 0 && currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        }
    }

    window.addEventListener('resize', () => {
        // Reset to safe index on resize
        const visibleCards = getVisibleCards();
        const maxIndex = Math.max(0, totalCards - visibleCards);
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }
        updateSlider();
    });

    updateSlider();
}

function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: rgba(255,255,255,${Math.random() * 0.5 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function showDetails(showId) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    const data = showDetailsData[showId];
    
    if (data) {
        modalBody.innerHTML = `<h3>${data.title}</h3>${data.content}`;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function closeModalOutside(event) {
    if (event.target.id === 'modal') {
        closeModal();
    }
}

function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const content = document.getElementById('lightboxContent');
    const item = galleryItems[index];
    content.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 10rem; margin-bottom: 1rem;">${item.emoji}</div>
            <p style="font-size: 2rem; font-weight: 600;">${item.label}</p>
        </div>
    `;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function closeLightboxOutside(event) {
    if (event.target.id === 'lightbox') {
        closeLightbox();
    }
}

function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    
    btn.textContent = '⏳ Envoi en cours...';
    btn.disabled = true;
    
    // REMPLACEZ 'YOUR_SERVICE_ID' et 'YOUR_TEMPLATE_ID' par vos IDs EmailJS
    emailjs.sendForm('service_zidt3ai', 'template_npgwzrd', form)
        .then(function(response) {
            alert('✅ Merci ! Votre demande a été envoyée avec succès. Nous vous contacterons bientôt !');
            form.reset();
            btn.textContent = originalText;
            btn.disabled = false;
        })
        .catch(function(error) {
            alert('❌ Une erreur est survenue. Veuillez réessayer.');
            console.error('EmailJS Error:', error);
            btn.textContent = originalText;
            btn.disabled = false;
        });
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
        closeLightbox();
    }
});

document.querySelectorAll('.show-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

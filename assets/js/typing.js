let typingAnimation = null;
let translations = {};
let currentLang = localStorage.getItem('language') || 'es';

// Load translations
async function loadTypingTranslations() {
    try {
        const response = await fetch('assets/js/i18n.json');
        translations = await response.json();
        startTypingWithCurrentLanguage();
    } catch (error) {
        console.error('Error loading typing translations:', error);
    }
}

function getTypingContent(lang) {
    const t = translations[lang]?.typing;
    if (!t) return [];

    return [
        t.welcome,
        {
            role: t.role,
            status: t.status,
            coffee_driven: t.coffee_driven
        },
        t.title
    ];
}

function startTypingWithCurrentLanguage() {
    const content = getTypingContent(currentLang);
    if (typingAnimation) {
        clearTimeout(typingAnimation);
    }
    startTypingEffect('typing-text', content);
}

function startTypingEffect(elementId, phrases, speed = 80, delay = 2000) {
    const element = document.getElementById(elementId);
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        let currentPhrase = phrases[phraseIndex];

        // JSON formatting
        if (typeof currentPhrase === 'object') {
            currentPhrase = JSON.stringify(currentPhrase, null, 2);
            element.style.fontFamily = "'Fira Code', monospace";
        } else {
            element.style.fontFamily = "'IBM Plex Sans', sans-serif";
        }

        const visibleText = currentPhrase.substring(0, charIndex);
        element.textContent = visibleText;

        let typeSpeed = isDeleting ? speed / 2 : speed;

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = delay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
        typingAnimation = setTimeout(type, typeSpeed);
    }

    type();
}

// Listen for language changes
window.addEventListener('languageChanged', (e) => {
    currentLang = e.detail.language;
    startTypingWithCurrentLanguage();
});

document.addEventListener('DOMContentLoaded', () => {
    loadTypingTranslations();
});

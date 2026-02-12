// Language Switcher
(function () {
    let translations = {};
    let currentLang = localStorage.getItem('language') || 'es';

    // Load translations
    async function loadTranslations() {
        try {
            const response = await fetch('assets/js/i18n.json');
            translations = await response.json();
            applyTranslations();
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    }

    // Apply translations to the page
    function applyTranslations() {
        const page = document.body.classList.contains('homepage') ? 'index' : 'extras';
        const lang = translations[currentLang];

        if (!lang) return;

        // Update language button
        // Update language toggle checkbox(es)
        document.querySelectorAll('.lang-toggle-checkbox').forEach(checkbox => {
            checkbox.checked = currentLang === 'en';
        });

        // Update navigation
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const keys = key.split('.');
            let value = lang;

            for (const k of keys) {
                value = value[k];
                if (!value) break;
            }

            if (value) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = value;
                } else if (element.hasAttribute('data-i18n-html')) {
                    element.innerHTML = value;
                } else {
                    element.textContent = value;
                }
            }
        });

        // Update meta tags
        if (lang[page] && lang[page].pageTitle) {
            document.title = lang[page].pageTitle;
        }

        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription && lang[page] && lang[page].metaDescription) {
            metaDescription.setAttribute('content', lang[page].metaDescription);
        }

        // Update html lang attribute
        document.documentElement.lang = currentLang;
    }

    // Toggle language
    function toggleLanguage() {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        localStorage.setItem('language', currentLang);
        applyTranslations();

        // Dispatch event for typing animation
        window.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: currentLang }
        }));
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', function () {
        loadTranslations();

        // Use event delegation for language toggle checkboxes (supports mobile menu)
        document.addEventListener('change', function (e) {
            if (e.target && e.target.classList.contains('lang-toggle-checkbox')) {
                // Determine new language based on checkbox state
                // If checked -> English (en), optimized for "ES (unchecked) vs EN (checked)"
                const newLang = e.target.checked ? 'en' : 'es';

                if (currentLang !== newLang) {
                    toggleLanguage();
                }
            }
        });
    });
})();

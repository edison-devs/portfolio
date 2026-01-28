function startTypingEffect(elementId, phrases, speed = 80, delay = 2000) {
    const element = document.getElementById(elementId);
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        let currentPhrase = phrases[phraseIndex];

        // Formateo de JSON
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
        setTimeout(type, typeSpeed);
    }

    type();
}

const content = [
    "Welcome to my Portfolio!",
    "I'm a Backend Engineer",
    {
        role: "Computer Engineer",
        status: "Available",
        coffee_driven: true
    },
    "I'm also a Computer Engineer"
];

document.addEventListener('DOMContentLoaded', () => {
    startTypingEffect('typing-text', content);
});

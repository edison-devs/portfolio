/**
 * Función Typing principal
 */
function startTypingEffect(elementId, phrases, speed = 80, delay = 2000) {
    const element = document.getElementById(elementId);
    if (!element) return;
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        let currentPhrase = phrases[phraseIndex];

        // Si la frase es un objeto, la convertimos a JSON string
        if (typeof currentPhrase === 'object') {
            currentPhrase = JSON.stringify(currentPhrase, null, 2);
            element.style.fontFamily = "'Fira Code', monospace";
            element.classList.add('code-mode');
        } else {
            element.style.fontFamily = "'IBM Plex Sans', sans-serif";
            element.classList.remove('code-mode');
        }

        // Determinar texto actual a mostrar
        const visibleText = currentPhrase.substring(0, charIndex);
        element.textContent = visibleText;

        // Velocidad de escritura/borrado
        let typeSpeed = isDeleting ? speed / 2 : speed;

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pausa cuando termina de escribir
            typeSpeed = delay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Cambio a la siguiente frase
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        // Avanzar o retroceder el índice de caracteres
        charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

        setTimeout(type, typeSpeed);
    }

    type();
}

// Configuración de tus líneas (Mezclando texto y JSON)
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

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    startTypingEffect('typing-text', content);
});



function switchLanguage() {
    const lang = document.getElementById('language-select').value;
    document.querySelectorAll('[data-en]').forEach(el => {
        el.innerText = el.getAttribute(`data-${lang}`);
    });
}
document.addEventListener('DOMContentLoaded', function() {
        const elements = document.querySelectorAll('.hidden');

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(element => {
            observer.observe(element);
        });
    });



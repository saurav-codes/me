// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (!sections.length || !navLinks.length) {
        return;
    }

    function updateActiveLink(currentId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === currentId) {
                link.classList.add('active');
            }
        });
    }

    if ('IntersectionObserver' in window) {
        let currentId = sections[0].id;
        const observer = new IntersectionObserver((entries) => {
            const visibleEntries = entries.filter(entry => entry.isIntersecting);

            if (!visibleEntries.length) {
                return;
            }

            visibleEntries.sort((entryA, entryB) => entryB.intersectionRatio - entryA.intersectionRatio);
            currentId = visibleEntries[0].target.id;
            updateActiveLink(currentId);
        }, {
            rootMargin: '-20% 0px -55% 0px',
            threshold: [0.1, 0.25, 0.5, 0.75],
        });

        sections.forEach(section => observer.observe(section));
        updateActiveLink(currentId);
    }
});

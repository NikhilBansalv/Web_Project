document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        easing: 'ease-in-out'
    });

    // Remove Loader
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.querySelector('.loader-wrapper').style.opacity = '0';
            setTimeout(() => {
                document.querySelector('.loader-wrapper').remove();
            }, 500);
        }, 1000);
    });

    // Particles.js Config
    particlesJS('particles', {
        particles: {
            number: { value: 80 },
            color: { value: '#00f7ff' },
            shape: { type: 'circle' },
            opacity: { value: 0.5 },
            size: { value: 3 },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                out_mode: 'out'
            }
        },
        interactivity: {
            events: {
                onhover: { enable: true, mode: 'repulse' },
                onclick: { enable: true, mode: 'push' }
            }
        }
    });

    // Typewriter Effect
    const typedText = document.getElementById('typed-text');
    const texts = [
        'Data Scientist',
        'Machine Learning Enthusiast',
        'Tech Evangelist'
    ];
    let index = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < texts[index].length) {
            typedText.textContent += texts[index].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedText.textContent = texts[index].substring(0, charIndex-1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            index = (index + 1) % texts.length;
            setTimeout(type, 500);
        }
    }
    type();

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
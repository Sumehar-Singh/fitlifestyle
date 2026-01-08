document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Toggle icon between hamburger and close (if we had an icon library, for now text or unicode)
            if (navLinks.classList.contains('active')) {
                mobileToggle.innerHTML = '&#10005;'; // X symbol
            } else {
                mobileToggle.innerHTML = '&#9776;'; // Hamburger symbol
            }
        });
    }

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileToggle.innerHTML = '&#9776;';
                }
            }
        });
    });

    // Form Submission Handling (Mock)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simulation of submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;

            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Thank you! Your message has been sent successfully.');
                form.reset();
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    });

    // Add scroll animation observer
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .post-card, .hero-text, .section-title, .contact-wrapper, .mission-text, .mission-image').forEach(el => {
        el.style.opacity = '0';
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Inject animation CSS safely for the JS-added class
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .animate-on-scroll { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
        .animate-on-scroll.animate { opacity: 1; transform: translateY(0); }
    `;
    document.head.appendChild(styleSheet);
});

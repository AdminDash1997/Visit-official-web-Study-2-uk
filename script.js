document.addEventListener('DOMContentLoaded', () => {
    // Current Year Update
    document.getElementById('year').textContent = new Date().getFullYear();

    // Sticky Navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.innerHTML = navMenu.classList.contains('active')
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: unobserve after revealing once
                // observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Form submission with Email and WhatsApp
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Details...';
            btn.style.opacity = '0.8';
            btn.style.pointerEvents = 'none';

            // Prepare values for WhatsApp
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const destination = document.getElementById('destination').value;
            const program = document.getElementById('program').value;
            const message = document.getElementById('message').value;

            // 1. Send to Email via Formspree (AJAX)
            // Note: USER needs to replace 'YOUR_FORM_ID' with their actual Formspree ID
            const formData = new FormData(contactForm);

            try {
                const response = await fetch('https://formspree.io/f/xvgzgeyw', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                // 2. Open WhatsApp (Encoded Message)
                const whatsappText = `*New Application Form*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Email:* ${email}\n*Interested Destination:* ${destination}\n*Program:* ${program}\n*Message:* ${message}`;
                const encodedText = encodeURIComponent(whatsappText);
                window.open(`https://wa.me/447903447628?text=${encodedText}`, '_blank');

                if (response.ok) {
                    btn.innerHTML = '<i class="fas fa-check"></i> Sent to Email & WhatsApp!';
                    btn.style.background = '#10B981';
                } else {
                    btn.innerHTML = '<i class="fas fa-check"></i> Redirecting to WhatsApp...';
                }
            } catch (error) {
                console.error("Form error:", error);
                // Still redirect to WhatsApp even if email fails
                const whatsappText = `*New Application Form*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Email:* ${email}\n*Interested Destination:* ${destination}\n*Program:* ${program}\n*Message:* ${message}`;
                window.open(`https://wa.me/447903447628?text=${encodeURIComponent(whatsappText)}`, '_blank');
            }

            contactForm.reset();
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style = '';
            }, 5000);
        });
    }

    // Active state for Navigation on scroll
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});

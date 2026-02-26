/**
 * Sanju A R Portfolio - Interactive Logic
 * Features: Scroll Animations, Active Navigation, & Form Handling
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Smooth Scroll for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Active Link Highlighter on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link'); // Add this class to your <a> tags

    window.addEventListener('scroll', () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('text-blue-600', 'font-bold');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('text-blue-600', 'font-bold');
            }
        });
    });

    // 3. Reveal Elements on Scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                revealObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Apply to project cards and section headers
    document.querySelectorAll('.project-card, section h2').forEach(el => {
        el.style.opacity = "0"; // Start hidden
        revealObserver.observe(el);
    });

    // 4. Contact Form Handling & Validation
    const contactForm = document.querySelector('form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            // Visual feedback
            btn.innerText = "Sending...";
            btn.disabled = true;
            btn.classList.add('opacity-50', 'cursor-not-allowed');

            // Simulate API Call
            setTimeout(() => {
                alert('Thank you, Sanju A R has received your message!');
                btn.innerText = "Message Sent!";
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                    btn.classList.remove('opacity-50', 'cursor-not-allowed');
                }, 3000);
            }, 1500);
        });
    }
});
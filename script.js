$(document).ready(function(){
	$('#go_to_bottom a').tooltip();
})

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                if (navLinks.style.display === 'flex') {
                    navLinks.style.display = 'none';
                }

                // Calculate header height for offset
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect with improved performance
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll <= 0) {
                    navbar.classList.remove('navbar-hidden');
                    navbar.classList.remove('navbar-shadow');
                    ticking = false;
                    return;
                }

                if (currentScroll > lastScroll && currentScroll > 100) {
                    // Scrolling down
                    navbar.classList.add('navbar-hidden');
                    navbar.classList.remove('navbar-shadow');
                } else {
                    // Scrolling up
                    navbar.classList.remove('navbar-hidden');
                    navbar.classList.add('navbar-shadow');
                }

                lastScroll = currentScroll;
                ticking = false;
            });

            ticking = true;
        }
    });

    // Scroll reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    const parallaxElements = document.querySelectorAll('.parallax-bg');

    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }

    // Parallax effect
    function updateParallax() {
        parallaxElements.forEach(element => {
            const scrolled = window.pageYOffset;
            const parent = element.closest('.section');
            const speed = 0.5;
            
            if (parent) {
                const parentRect = parent.getBoundingClientRect();
                if (parentRect.top < window.innerHeight && parentRect.bottom > 0) {
                    const yPos = -(scrolled - parent.offsetTop) * speed;
                    element.style.transform = `translate3d(0, ${yPos}px, 0)`;
                }
            }
        });
    }

    // Initial check
    checkReveal();
    updateParallax();

    // Throttled scroll handler
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                checkReveal();
                updateParallax();
                scrollTimeout = null;
            }, 10);
        }
    });

    // Add active state to navigation links
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});
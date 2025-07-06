// Ensure DOMContentLoaded listener is only one at the beginning of script.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded!'); // Check if the script is running

    // Automatically fills the current year in the footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // --- Typing Effect ---
    const typingTextElement = document.getElementById('typing-text');
    if (typingTextElement) { // Ensure the element exists before running the typing effect
        const texts = ["Web Developer", "Network Engineer", "IT Consultant", "Cyber Security Enthusiast"]; // Updated texts in English
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 100; // Typing speed (ms)
        const deletingSpeed = 60; // Deleting speed (ms)
        const delayBetweenTexts = 2000; // Delay between texts (ms)

        function type() {
            const currentText = texts[textIndex];
            if (isDeleting) {
                typingTextElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingTextElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let speed = isDeleting ? deletingSpeed : typingSpeed;

            if (!isDeleting && charIndex === currentText.length) {
                speed = delayBetweenTexts;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                speed = typingSpeed;
            }

            setTimeout(type, speed);
        }
        // Start typing effect after an initial delay
        setTimeout(type, delayBetweenTexts);
    }


    // --- Smooth Scroll Effect ---
    document.querySelectorAll('nav ul li a, .hero .btn').forEach(anchor => { // Add hero button
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default link behavior

            const targetId = this.getAttribute('href'); // Get the target ID (e.g., #about)
            const targetElement = document.querySelector(targetId); // Get the target element

            if (targetElement) {
                const headerOffset = document.querySelector('header').offsetHeight; // Get header height
                // Subtract a small offset so it's not too close to the header
                const offsetPosition = targetElement.offsetTop - headerOffset - 20; // Add 20px margin

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth' // Scroll with smooth animation
                });

                // Update indicator immediately on click for better responsiveness
                updateNavIndicator();
            }
        });
    });

    // --- Scroll Reveal Animation (Intersection Observer) ---
    // Ensure you add the 'reveal' class to the HTML elements you want to animate
    const revealElements = document.querySelectorAll('.reveal');

    const observerOptions = {
        root: null, // Observe the viewport
        rootMargin: '0px',
        threshold: 0.1 // Percentage of the element that must be visible to trigger the animation (10%)
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'is-visible' class to trigger CSS transitions
                entry.target.classList.add('is-visible');
                // Stop observing after it appears (so the animation only runs once)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        observer.observe(el); // Start observing each element with the 'reveal' class
    });

    // --- Hamburger Button Functionality ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul'); // Select your navigation ul element

    if (menuToggle && navUl) { // Ensure both elements exist
        menuToggle.addEventListener('click', function() {
            // Toggle the 'open' class on the hamburger button for its animation
            menuToggle.classList.toggle('open');
            // Toggle the 'nav-open' class on the navigation ul to show/hide the menu
            navUl.classList.toggle('nav-open');
        });

        // Close the menu when a navigation link is clicked (useful for mobile)
        navUl.querySelectorAll('li a').forEach(link => {
            link.addEventListener('click', function() {
                if (navUl.classList.contains('nav-open')) {
                    navUl.classList.remove('nav-open');
                    menuToggle.classList.remove('open');
                }
            });
        });
    }

    // --- Navigation Indicator Functionality ---
    const navLinks = document.querySelectorAll('nav ul li a');
    const navIndicator = document.querySelector('.nav-indicator');
    const sections = document.querySelectorAll('section[id]'); // Get all sections with an ID

    function updateNavIndicator() {
        if (!navIndicator || navLinks.length === 0 || sections.length === 0) {
            // console.warn("Navigation indicator elements not found or not enough sections.");
            return;
        }

        let currentActiveLink = null;
        // Adjust scroll position to account for the fixed header
        const headerHeight = document.querySelector('header').offsetHeight;
        const scrollPosition = window.scrollY + headerHeight + 50; // Add a buffer

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            // Check if the section is currently in view
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const targetId = `#${section.id}`;
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === targetId) {
                        currentActiveLink = link;
                    }
                });
            }
        });

        // If no section is active (e.g., at the very top before the first section), default to 'Home'
        if (!currentActiveLink && window.scrollY < sections[0].offsetTop) {
             currentActiveLink = document.querySelector('nav ul li a[href="#home"]');
        }


        if (currentActiveLink) {
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            // Add active class to the current link
            currentActiveLink.classList.add('active');

            // Set position and width of the indicator
            navIndicator.style.left = currentActiveLink.offsetLeft + 'px';
            navIndicator.style.width = currentActiveLink.offsetWidth + 'px';
            navIndicator.style.opacity = '1'; // Make it visible
        } else {
            // Hide indicator if no active link (e.g., scrolling past all sections)
            navIndicator.style.opacity = '0';
        }
    }

    // Initial update on load
    updateNavIndicator();

    // Update indicator on scroll
    window.addEventListener('scroll', updateNavIndicator);

    // --- Portfolio Flip Card Functionality ---
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            // Toggle the 'flipped' class on the clicked portfolio item
            this.classList.toggle('flipped');
        });
    });

    // --- About Me Flip Card Functionality ---
    const aboutCardContainer = document.querySelector('.about-card-container');
    if (aboutCardContainer) {
        aboutCardContainer.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    }

}); // End of DOMContentLoaded

// --- Header Scroll Effect (change background on scroll) ---
// This remains outside DOMContentLoaded because the 'scroll' event occurs repeatedly on the window
// and does not depend on the entire DOM being loaded, only the existence of the 'header' element.
const header = document.querySelector('header');
if (header) { // Ensure the header element exists
    window.addEventListener('scroll', () => {
        // Since the header is now always solid, this effect might be less noticeable or can be removed.
        // Keeping it for potential subtle changes or if you decide to reintroduce transparency.
        if (window.scrollY > 50) { // If scrolled more than 50px
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Main JavaScript file for shared functionality across all pages

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Sign up modal functionality
    const signupBtn = document.getElementById('signup-btn');
    const ctaSignupBtn = document.getElementById('cta-signup-btn');
    const signupModal = document.getElementById('signup-modal');
    const closeModal = document.getElementById('close-modal');
    
    if (signupBtn && signupModal) {
        signupBtn.addEventListener('click', function() {
            signupModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });
    }
    
    if (ctaSignupBtn && signupModal) {
        ctaSignupBtn.addEventListener('click', function() {
            signupModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeModal && signupModal) {
        closeModal.addEventListener('click', function() {
            signupModal.classList.add('hidden');
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
    }
    
    // Close modal when clicking outside
    if (signupModal) {
        signupModal.addEventListener('click', function(e) {
            if (e.target === signupModal) {
                signupModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Form submissions
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const userType = document.getElementById('user-type').value;
            
            // Validate form (simple validation)
            if (!name || !phone || !email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate form submission
            alert('Account created successfully! Welcome to Farmer Connect.');
            signupModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
            signupForm.reset();
        });
    }
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            
            if (!emailInput.value) {
                alert('Please enter your email address');
                return;
            }
            
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // Add animation classes to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                const animationClass = element.dataset.animation || 'animate__fadeIn';
                element.classList.add('animate__animated', animationClass);
                element.classList.remove('animate-on-scroll');
            }
        });
    };
    
    // Run animation check on load and scroll
    if (document.querySelectorAll('.animate-on-scroll').length > 0) {
        window.addEventListener('scroll', animateOnScroll);
        window.addEventListener('load', animateOnScroll);
    }
});
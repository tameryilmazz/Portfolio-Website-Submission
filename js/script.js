// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Cursor animation loop
function animate() {
    // Smooth cursor movement
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

    // Smooth follower movement
    followerX += (mouseX - followerX) * 0.05;
    followerY += (mouseY - followerY) * 0.05;
    cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;

    requestAnimationFrame(animate);
}
animate();

// Cursor hover effects
document.querySelectorAll('a, button, .gallery-item').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1.5)`;
        cursorFollower.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(2)`;
    });

    element.addEventListener('mouseleave', () => {
        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1)`;
        cursorFollower.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1)`;
    });
});

// Hero Slider
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentSlide = 0;
const slideInterval = 5000;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Auto slide
let slideTimer = setInterval(nextSlide, slideInterval);

// Slider controls
prevBtn.addEventListener('click', () => {
    clearInterval(slideTimer);
    prevSlide();
    slideTimer = setInterval(nextSlide, slideInterval);
});

nextBtn.addEventListener('click', () => {
    clearInterval(slideTimer);
    nextSlide();
    slideTimer = setInterval(nextSlide, slideInterval);
});

// Gallery Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filter === 'all' || filter === category) {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
                item.style.display = 'block';
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Initialize LightGallery
lightGallery(document.getElementById('lightgallery'), {
    speed: 500,
    download: false,
    counter: false,
    selector: '.gallery-item'
});

// Scroll Animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            if (entry.target.classList.contains('achievement')) {
                animateNumber(entry.target.querySelector('.number'));
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.gallery-item, .about-content, .achievement, .expedition-card, .feature, .contact-info').forEach(el => {
    observer.observe(el);
});

// Number Animation
function animateNumber(element) {
    const target = parseInt(element.textContent);
    let current = 0;
    const increment = target / 30; // Animate over 30 steps
    const duration = 1500; // Animation duration in milliseconds
    const stepTime = duration / 30;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, stepTime);
}

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const menuSpans = document.querySelectorAll('.menu-toggle span');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuSpans.forEach((span, index) => {
        if (navLinks.classList.contains('active')) {
            if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) span.style.opacity = '0';
            if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            span.style.transform = 'none';
            span.style.opacity = '1';
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        navLinks.classList.remove('active');
        menuSpans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
        });
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            menuSpans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    });
});

// Form Handling
const contactForm = document.querySelector('.contact-form');
const newsletterForm = document.querySelector('.newsletter-form');

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Form validation
    let isValid = true;
    this.querySelectorAll('input, textarea, select').forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    if (!isValid) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // Simulate form submission
    const button = this.querySelector('button');
    const originalText = button.textContent;
    button.textContent = 'Sending...';
    button.disabled = true;

    setTimeout(() => {
        showNotification('Thank you for your message! We will get back to you soon.');
        this.reset();
        button.textContent = originalText;
        button.disabled = false;
    }, 1500);
});

newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = this.querySelector('input[type="email"]');
    if (!email.value.trim()) {
        showNotification('Please enter your email address', 'error');
        return;
    }

    const button = this.querySelector('button');
    const originalText = button.textContent;
    button.textContent = 'Subscribing...';
    button.disabled = true;

    setTimeout(() => {
        showNotification('Thank you for subscribing to our newsletter!');
        this.reset();
        button.textContent = originalText;
        button.disabled = false;
    }, 1500);
}); 
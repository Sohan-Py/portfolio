// ================= SMOOTH SCROLL ================= 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = target.offsetTop - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      const navLinks = document.getElementById('navLinks');
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        document.getElementById('mobileMenuToggle').classList.remove('active');
      }
    }
  });
});

// ================= NAVBAR SCROLL EFFECT ================= 
const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Add scrolled class
  if (scrollTop > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScrollTop = scrollTop;
});

// ================= MOBILE MENU TOGGLE ================= 
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
    
    // Animate hamburger
    const spans = mobileMenuToggle.querySelectorAll('span');
    if (mobileMenuToggle.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(8px, -8px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (navLinks && navLinks.classList.contains('active')) {
    if (!e.target.closest('.navbar')) {
      navLinks.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
      
      const spans = mobileMenuToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  }
});

// ================= INTERSECTION OBSERVER FOR ANIMATIONS ================= 
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll(
    '.service-card, .pricing-card, .testimonial-card, .about-card, .section-header'
  );
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// ================= CONTACT FORM HANDLING ================= 
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    
    // Validate form
    if (!data.name || !data.email || !data.service || !data.message) {
      showFormStatus('Please fill in all required fields.', 'error');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      showFormStatus('Please enter a valid email address.', 'error');
      return;
    }
    
    // Disable submit button
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // Simulate form submission (replace with actual API call)
    try {
      // In production, replace this with your actual form submission endpoint
      await simulateFormSubmission(data);
      
      showFormStatus('Thank you! We\'ll get back to you within 24 hours.', 'success');
      contactForm.reset();
      
      // Send WhatsApp notification (optional)
      const whatsappMessage = `New Contact Form Submission:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Service: ${data.service}
Message: ${data.message}`;
      
      // Uncomment to enable WhatsApp notification
      // window.open(`https://wa.me/919883127405?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
      
    } catch (error) {
      showFormStatus('Something went wrong. Please try again or contact us via WhatsApp.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

function showFormStatus(message, type) {
  formStatus.textContent = message;
  formStatus.className = `form-status ${type}`;
  formStatus.style.display = 'block';
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    formStatus.style.display = 'none';
  }, 5000);
}

// Simulate form submission (replace with actual API call)
function simulateFormSubmission(data) {
  return new Promise((resolve) => {
    console.log('Form submitted:', data);
    setTimeout(resolve, 1500); // Simulate network delay
  });
}

// ================= ACTIVE LINK HIGHLIGHTING ================= 
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ================= TYPING EFFECT (OPTIONAL) ================= 
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// ================= COUNTER ANIMATION ================= 
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16); // 60 FPS
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Animate stat numbers when they come into view
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      const text = entry.target.textContent;
      const match = text.match(/(\d+)/);
      
      if (match) {
        const number = parseInt(match[1]);
        const suffix = text.replace(match[1], '');
        
        animateCounter(entry.target, number, 2000);
        entry.target.dataset.animated = 'true';
        
        // Add suffix back after animation
        setTimeout(() => {
          entry.target.textContent = number + suffix;
        }, 2000);
      }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
  statObserver.observe(stat);
});

// ================= PARALLAX EFFECT ================= 
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.hero-visual');
  
  parallaxElements.forEach(element => {
    const speed = 0.5;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// ================= FORM INPUT ANIMATIONS ================= 
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
  input.addEventListener('focus', () => {
    input.parentElement.classList.add('focused');
  });
  
  input.addEventListener('blur', () => {
    if (!input.value) {
      input.parentElement.classList.remove('focused');
    }
  });
});

// ================= CURSOR GLOW EFFECT (OPTIONAL) ================= 
const createCursorGlow = () => {
  const cursor = document.createElement('div');
  cursor.className = 'cursor-glow';
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(123, 44, 255, 0.6), transparent);
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.15s ease;
    display: none;
  `;
  document.body.appendChild(cursor);
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.display = 'block';
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
  });
  
  document.addEventListener('mouseleave', () => {
    cursor.style.display = 'none';
  });
};

// Uncomment to enable cursor glow effect
// createCursorGlow();

// ================= PRICING CARD INTERACTION ================= 
const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    pricingCards.forEach(c => {
      if (c !== card && !c.classList.contains('featured')) {
        c.style.opacity = '0.6';
      }
    });
  });
  
  card.addEventListener('mouseleave', () => {
    pricingCards.forEach(c => {
      c.style.opacity = '1';
    });
  });
});

// ================= LAZY LOAD IMAGES ================= 
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      imageObserver.unobserve(img);
    }
  });
});

lazyImages.forEach(img => imageObserver.observe(img));

// ================= PREVENT FLASH OF UNSTYLED CONTENT ================= 
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

// ================= CONSOLE MESSAGE ================= 
console.log('%c👋 Built by Digii Talks', 'color: #7b2cff; font-size: 16px; font-weight: bold;');
console.log('%cInterested in building something awesome? Let\'s talk!', 'color: #ff006e; font-size: 14px;');
console.log('%cWhatsApp: +91 98831 27405', 'color: #b4b9d6; font-size: 12px;');

// ================= SERVICE WORKER (PWA READY) ================= 
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Uncomment when you have a service-worker.js file
    // navigator.serviceWorker.register('/service-worker.js')
    //   .then(reg => console.log('Service Worker registered'))
    //   .catch(err => console.log('Service Worker registration failed'));
  });
}
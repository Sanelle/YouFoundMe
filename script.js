document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor effect
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    });
    
    // Make cursor bigger when hovering interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, .package-card, .add-on');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorFollower.style.width = '40px';
            cursorFollower.style.height = '40px';
            cursorFollower.style.opacity = '0.5';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorFollower.style.width = '20px';
            cursorFollower.style.height = '20px';
            cursorFollower.style.opacity = '1';
        });
    });
    
    // Package selection
    const packageCards = document.querySelectorAll('.package-card');
    const addOns = document.querySelectorAll('.add-on input');
    const selectionSummary = document.querySelector('.selection-summary');
    const packageName = document.querySelector('.package-name');
    const packagePrice = document.querySelector('.package-price');
    const selectedAddons = document.querySelector('.selected-addons');
    const totalAmount = document.querySelector('.amount');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    let selectedPackage = null;
    let selectedAddOns = [];
    let total = 0;
    
    packageCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            packageCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card
            this.classList.add('active');
            
            // Update selected package
            selectedPackage = {
                name: this.querySelector('h3').textContent,
                price: parseInt(this.querySelector('.price').textContent.replace('R', ''))
            };
            
            updateSelectionSummary();
            showSelectionSummary();
        });
    });
    
    addOns.forEach(addOn => {
        addOn.addEventListener('change', function() {
            const label = this.nextElementSibling;
            const name = label.querySelector('.add-on-name').textContent;
            const price = parseInt(label.querySelector('.add-on-price').textContent.replace('+R', ''));
            
            if (this.checked) {
                selectedAddOns.push({ name, price });
            } else {
                selectedAddOns = selectedAddOns.filter(item => item.name !== name);
            }
            
            updateSelectionSummary();
        });
    });
    
    function updateSelectionSummary() {
        // Update package info
        if (selectedPackage) {
            packageName.textContent = selectedPackage.name;
            packagePrice.textContent = `R${selectedPackage.price}`;
            total = selectedPackage.price;
        } else {
            packageName.textContent = 'No package selected';
            packagePrice.textContent = 'R0';
            total = 0;
        }
        
        // Update add-ons info
        if (selectedAddOns.length > 0) {
            selectedAddons.innerHTML = '';
            selectedAddOns.forEach(addOn => {
                const div = document.createElement('div');
                div.className = 'add-on-item';
                div.innerHTML = `
                    <span>${addOn.name}</span>
                    <span class="add-on-price">+R${addOn.price}</span>
                `;
                selectedAddons.appendChild(div);
                total += addOn.price;
            });
        } else {
            selectedAddons.innerHTML = '<p>No add-ons selected</p>';
        }
        
        // Update total
        totalAmount.textContent = `R${total}`;
        
        // Enable/disable checkout button
        checkoutBtn.disabled = !selectedPackage;
    }
    
    function showSelectionSummary() {
        selectionSummary.classList.add('active');
    }
    
    // Testimonial carousel
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        testimonials[index].classList.add('active');
        currentTestimonial = index;
    }
    
    prevBtn.addEventListener('click', () => {
        let newIndex = currentTestimonial - 1;
        if (newIndex < 0) newIndex = testimonials.length - 1;
        showTestimonial(newIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        let newIndex = currentTestimonial + 1;
        if (newIndex >= testimonials.length) newIndex = 0;
        showTestimonial(newIndex);
    });
    
    // Auto-rotate testimonials
    setInterval(() => {
        let newIndex = currentTestimonial + 1;
        if (newIndex >= testimonials.length) newIndex = 0;
        showTestimonial(newIndex);
    }, 5000);
    
    // Scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('section, .package-card, .add-ons, .section-header');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    document.querySelectorAll('section, .package-card, .add-ons, .section-header').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Confetti effect for CTA buttons
    const ctaButtons = document.querySelectorAll('.primary-cta, .select-btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', createConfetti);
    });
    
    function createConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.style.position = 'fixed';
        confettiContainer.style.top = '0';
        confettiContainer.style.left = '0';
        confettiContainer.style.width = '100%';
        confettiContainer.style.height = '100%';
        confettiContainer.style.pointerEvents = 'none';
        confettiContainer.style.zIndex = '1000';
        document.body.appendChild(confettiContainer);
        
        const colors = ['#ff6b6b', '#4ECDC4', '#FFBE76', '#A1C4FD', '#C2E9FB'];
        
        for (let i = 0; i < 150; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'absolute';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.opacity = Math.random() * 0.8 + 0.2;
            
            const animation = confetti.animate([
                { top: '-10px', transform: 'rotate(0deg) scale(1)' },
                { 
                    top: '100vh', 
                    transform: `rotate(${Math.random() * 360}deg) scale(${Math.random() * 0.5 + 0.5})`,
                    left: `${Math.random() * 100}vw`
                }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
            });
            
            confettiContainer.appendChild(confetti);
            
            animation.onfinish = () => {
                confetti.remove();
            };
        }
        
        setTimeout(() => {
            confettiContainer.remove();
        }, 5000);
    }
});

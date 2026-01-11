// 1. Custom Cursor Logic (Disabled on mobile via CSS, but safe here)
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

// 2. Mobile Menu Toggle Logic
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        const isActive = navLinks.classList.toggle('active');
        
        // Toggle body scroll - prevents "double scrolling" on mobile
        body.style.overflow = isActive ? 'hidden' : 'auto';

        // Change icon between Bars and X
        const icon = mobileMenu.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        body.style.overflow = 'auto'; // Re-enable scrolling
        const icon = mobileMenu.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// 3. Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// 4. Copy Email Function
function copyEmail() {
    const email = document.getElementById('emailVal').innerText;
    const btn = document.getElementById('copyBtn');
    
    navigator.clipboard.writeText(email).then(() => {
        const originalContent = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> <span>Copied!</span>';
        
        // Feedback duration
        setTimeout(() => { 
            btn.innerHTML = originalContent; 
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// 5. Form Submission (Web3Forms)
const contactForm = document.getElementById('contactForm');
const successMsg = document.getElementById('success-msg');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        submitBtn.innerText = "Sending...";
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            if (response.status === 200) {
                // Success state
                contactForm.style.display = "none";
                successMsg.style.display = "block";
                
                // Reset and redirect after 3 seconds (better for mobile than 5s)
                setTimeout(() => {
                    window.location.href = "#home";
                    setTimeout(() => {
                        contactForm.reset();
                        contactForm.style.display = "block";
                        successMsg.style.display = "none";
                        submitBtn.innerText = "Send Message";
                        submitBtn.disabled = false;
                    }, 800);
                }, 3000);
            } else {
                alert("Something went wrong. Please try again.");
                submitBtn.disabled = false;
                submitBtn.innerText = "Send Message";
            }
        })
        .catch(error => {
            console.error(error);
            alert("Submission failed. Check your connection.");
            submitBtn.disabled = false;
            submitBtn.innerText = "Send Message";
        });
    });
}

// 6. Smooth Scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === "#") return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
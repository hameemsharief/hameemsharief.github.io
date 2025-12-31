// Custom Cursor Logic
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
    if(cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

// Mobile Menu Toggle Logic
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change icon between Bars and X
    const icon = mobileMenu.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenu.querySelector('i').classList.add('fa-bars');
        mobileMenu.querySelector('i').classList.remove('fa-times');
    });
});

// Navbar Scroll effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 100) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
});

// Copy Email Function
function copyEmail() {
    const email = document.getElementById('emailVal').innerText;
    const btn = document.getElementById('copyBtn');
    navigator.clipboard.writeText(email).then(() => {
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> <span>Copied!</span>';
        setTimeout(() => { btn.innerHTML = original; }, 2000);
    });
}

// Form Submission
const contactForm = document.getElementById('contactForm');
const successMsg = document.getElementById('success-msg');
const submitBtn = document.getElementById('submitBtn');

if(contactForm) {
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
            if (response.status == 200) {
                contactForm.style.display = "none";
                successMsg.style.display = "block";
                setTimeout(() => {
                    window.location.href = "#home";
                    setTimeout(() => {
                        contactForm.reset();
                        contactForm.style.display = "block";
                        successMsg.style.display = "none";
                        submitBtn.innerText = "Send Message";
                        submitBtn.disabled = false;
                    }, 1000);
                }, 5000);
            } else {
                alert("Something went wrong.");
                submitBtn.disabled = false;
            }
        })
        .catch(error => {
            console.log(error);
            alert("Submission failed.");
        });
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
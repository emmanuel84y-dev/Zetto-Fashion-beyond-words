// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Intersection Observer for Scroll Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => observer.observe(el));


    // --- 2. Mobile Menu Functionality ---
    const openMenuBtn = document.getElementById('openMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        // Prevent background scrolling when menu is open
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }

    openMenuBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });


// --- 3. Header Scroll Effect ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            header.style.padding = "10px 40px";
            header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
        } else {
            header.classList.remove('scrolled');
            header.style.padding = "20px 40px";
            header.style.boxShadow = "none";
        }
    });


    // --- 4. Cart Functionality ---
    let cartCount = 0;
    const cartDisplay = document.getElementById('cartCount');
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    const shopNowBtn = document.querySelector('.btn-dark');

    function updateCart() {
        cartCount++;
        cartDisplay.innerText = cartCount;
        
        // Simple animation for the cart text
        cartDisplay.parentElement.style.transform = "scale(1.2)";
        setTimeout(() => {
            cartDisplay.parentElement.style.transform = "scale(1)";
        }, 200);
    }

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent jump to top
            updateCart();
            
            // Change button text temporarily
            const originalText = btn.innerText;
            btn.innerText = "Added!";
            btn.style.background = "#6b4c35";
            btn.style.color = "white";
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = "white";
                btn.style.color = "black";
            }, 1000);
        });
    });

    // Also make the main CTA add to cart for demo purposes
    if(shopNowBtn) {
        shopNowBtn.addEventListener('click', () => {
            // Just for effect, we won't prevent default here so it scrolls
            setTimeout(updateCart, 500); 
        });
    }

// --- 5. Category Pill Autoplay Highlight ---
const catPills = document.querySelectorAll('.cat-pill');

// Function to handle the sequencing
function runPillSequence() {
    catPills.forEach((pill, index) => {
        // Set a timeout for each pill based on its position
        setTimeout(() => {
            // Remove 'active' from all pills
            catPills.forEach(p => p.classList.remove('active'));
            
            // Add 'active' to the current pill
            pill.classList.add('active');
            
            // Optional: If you want the sequence to end with the "Collection" (last) pill
            // remaining active, we don't clear it on the last iteration.
        }, index * 1000); // 1 second interval between each
    });
}

// Start the sequence 1.5s after page load to ensure user sees it
setTimeout(runPillSequence, 1500);

// Keep your manual click functionality so users can still interact
catPills.forEach(pill => {
    pill.addEventListener('click', function(e) {
        // e.preventDefault(); // Uncomment if you want to stop the link entirely
        catPills.forEach(p => p.classList.remove('active'));
        this.classList.add('active');
    });
});
    // --- 6. Night Mode Toggle Logic ---
const nightModeBtn = document.getElementById('nightModeBtn');
const icon = nightModeBtn.querySelector('i');

// Check for saved user preference
if (localStorage.getItem('dark-mode') === 'enabled') {
    document.body.classList.add('dark-mode');
    icon.classList.replace('fa-moon', 'fa-sun');
}

nightModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('dark-mode', 'disabled');
    }
});
});

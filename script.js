// Sample products data - you can customize these with your actual Roblox items
const products = [
    {
        id: 1,
        name: "Golden Watering Can",
        description: "Premium watering can that grows plants 3x faster",
        price: 15.99,
        image: "🚿",
        category: "Tools"
    },
    {
        id: 2,
        name: "Rare Seed Pack",
        description: "Contains 10 rare seeds for exotic plants",
        price: 8.99,
        image: "🌱",
        category: "Seeds"
    },
    {
        id: 3,
        name: "Magic Fertilizer",
        description: "Instant growth boost for all plants",
        price: 12.99,
        image: "💩",
        category: "Fertilizers"
    },
    {
        id: 4,
        name: "Garden Guardian",
        description: "Protects your garden from pests and diseases",
        price: 19.99,
        image: "🛡️",
        category: "Protection"
    },
    {
        id: 5,
        name: "Rainbow Flowers Bundle",
        description: "Complete set of rainbow-colored flowers",
        price: 14.99,
        image: "🌸",
        category: "Flowers"
    },
    {
        id: 6,
        name: "Garden Expansion Kit",
        description: "Double your garden size instantly",
        price: 25.99,
        image: "🏡",
        category: "Expansion"
    },
    {
        id: 7,
        name: "Speed Growth Potion",
        description: "Makes plants grow 5x faster for 24 hours",
        price: 9.99,
        image: "⚡",
        category: "Potions"
    },
    {
        id: 8,
        name: "Premium Garden Tools",
        description: "Complete set of professional gardening tools",
        price: 29.99,
        image: "🔧",
        category: "Tools"
    }
];

// Shopping cart
let cart = [];

// DOM elements
const productsGrid = document.getElementById('products-grid');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const closeModal = document.querySelector('.close');
const checkoutBtn = document.getElementById('checkout-btn');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const cartIcon = document.querySelector('.cart-icon');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    setupEventListeners();
    updateCartCount();
});

// Display products
function displayProducts() {
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.image}</div>
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #4caf50;
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Display cart
function displayCart() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666;">Your cart is empty</p>';
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-image">${item.image}</div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                </div>
            </div>
            <div class="cart-item-actions">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span style="margin: 0 1rem; font-weight: 600;">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    updateCartTotal();
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            displayCart();
            updateCartCount();
        }
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    displayCart();
    updateCartCount();
}

// Update cart total
function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Cart modal
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        displayCart();
        cartModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Checkout button
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const message = `Thank you for your order!\n\nTotal: $${total.toFixed(2)}\n\nPlease contact us to complete your purchase:\n- Discord: GardenTreasures#1234\n- Email: contact@gardentreasures.com`;
        
        alert(message);
        cart = [];
        displayCart();
        updateCartCount();
        cartModal.style.display = 'none';
    });

    // Contact form
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .product-card {
        animation: fadeInUp 0.6s ease;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .feature {
        animation: fadeInUp 0.6s ease;
    }
    
    .contact-item {
        animation: fadeInLeft 0.6s ease;
    }
    
    @keyframes fadeInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.product-card, .feature, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}); 
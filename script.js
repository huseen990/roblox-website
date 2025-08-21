// Global variables
let currentUsername = '';
let cart = [];
let pets = [
    {
        id: 1,
        name: 'Blood Kiwi',
        price: 150,
        image: 'Blood_Kiwi_Icon.webp',
        description: 'A rare and mysterious blood kiwi pet with unique abilities.'
    },
    {
        id: 2,
        name: 'Blood Owl',
        price: 200,
        image: 'Blood_Owl_Icon.webp',
        description: 'A majestic blood owl that soars through the night sky.'
    },
    {
        id: 3,
        name: 'Capybara',
        price: 175,
        image: 'CapybaraIIcon.webp',
        description: 'A friendly and adorable capybara companion.'
    },
    {
        id: 4,
        name: 'Chicken Zombie',
        price: 125,
        image: 'Chicken_Zombie_Icon.webp',
        description: 'A spooky undead chicken with zombie powers.'
    },
    {
        id: 5,
        name: 'Cooked Owl',
        price: 100,
        image: 'Cooked_Owl.webp',
        description: 'A delicious cooked owl pet with culinary skills.'
    },
    {
        id: 6,
        name: 'Dilophosaurus',
        price: 300,
        image: 'Dilophosaurus.webp',
        description: 'A prehistoric dinosaur pet with ancient wisdom.'
    },
    {
        id: 7,
        name: 'Disco Bee',
        price: 250,
        image: 'DiscoBeeIcon.webp',
        description: 'A groovy bee that loves to dance and party.'
    },
    {
        id: 8,
        name: 'Dragonfly',
        price: 180,
        image: 'DragonflyIcon.webp',
        description: 'A swift and agile dragonfly with aerial mastery.'
    },
    {
        id: 9,
        name: 'Echo Frog',
        price: 160,
        image: 'Echo_frog.webp',
        description: 'A mystical frog that can echo through dimensions.'
    },
    {
        id: 10,
        name: 'Fennec Fox',
        price: 220,
        image: 'FennecFoxIcon.webp',
        description: 'A cute desert fox with big ears and charm.'
    },
    {
        id: 11,
        name: 'Golden Goose',
        price: 500,
        image: 'GoldenGoose.webp',
        description: 'A legendary golden goose that brings fortune.'
    },
    {
        id: 12,
        name: 'Golem',
        price: 400,
        image: 'Golem.webp',
        description: 'A powerful stone golem with earth magic.'
    },
    {
        id: 13,
        name: 'Lobster Thermidor',
        price: 275,
        image: 'LobsterThermidor.webp',
        description: 'A fancy lobster with gourmet cooking skills.'
    },
    {
        id: 14,
        name: 'Mimic Octopus',
        price: 350,
        image: 'MimicOctopusIcon.webp',
        description: 'A clever octopus that can mimic other creatures.'
    },
    {
        id: 15,
        name: 'Night Owl',
        price: 225,
        image: 'Night_Owl_Icon.webp',
        description: 'A wise nocturnal owl with night vision.'
    },
    {
        id: 16,
        name: 'Owl',
        price: 150,
        image: 'Owlpng.webp',
        description: 'A classic owl companion with wisdom and grace.'
    },
    {
        id: 17,
        name: 'Queen Bee',
        price: 450,
        image: 'Queen_bee.webp',
        description: 'A royal bee queen that rules the hive.'
    },
    {
        id: 18,
        name: 'Raccoon',
        price: 190,
        image: 'Raccoon.webp',
        description: 'A clever raccoon with mask-like markings.'
    },
    {
        id: 19,
        name: 'Red Fox',
        price: 210,
        image: 'RedFox.webp',
        description: 'A swift red fox with fiery determination.'
    },
    {
        id: 20,
        name: 'Spinosaurus',
        price: 600,
        image: 'Spinosaurus.webp',
        description: 'A massive carnivorous dinosaur with sail back.'
    },
    {
        id: 21,
        name: 'T-Rex',
        price: 800,
        image: 'T-Rex_Icon.webp',
        description: 'The king of dinosaurs with powerful jaws.'
    },
    {
        id: 22,
        name: 'Butterfly',
        price: 120,
        image: 'Thy_Butterfly_V2.webp',
        description: 'A beautiful butterfly with colorful wings.'
    },
    {
        id: 23,
        name: 'Godly Sprinkler',
        price: 1000,
        image: 'Godly_Sprinkler.webp',
        description: 'A divine sprinkler with godly watering powers.'
    },
    {
        id: 24,
        name: 'Level Up Lollipop',
        price: 75,
        image: 'LevelUpLollipop.webp',
        description: 'A sweet lollipop that helps you level up faster.'
    },
    {
        id: 25,
        name: 'Grandmaster Sprinkler',
        price: 750,
        image: 'GrandmasterSprinkler.webp',
        description: 'A master-level sprinkler with advanced techniques.'
    },
    {
        id: 26,
        name: 'Master Sprinkler',
        price: 500,
        image: 'Master_Sprinkler.webp',
        description: 'A skilled sprinkler with master-level abilities.'
    }
];

// DOM elements
const usernameInput = document.getElementById('usernameInput');
const setUsernameBtn = document.getElementById('setUsernameBtn');
const usernameDisplay = document.getElementById('usernameDisplay');
const currentUsernameSpan = document.getElementById('currentUsername');
const changeUsernameBtn = document.getElementById('changeUsernameBtn');
const petsGrid = document.getElementById('petsGrid');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const clearCartBtn = document.getElementById('clearCartBtn');
const checkoutBtn = document.getElementById('checkoutBtn');
const adminLoginBtn = document.getElementById('adminLoginBtn');
const adminModal = document.getElementById('adminModal');
const closeAdminModal = document.getElementById('closeAdminModal');
const addPetForm = document.getElementById('addPetForm');
const existingPets = document.getElementById('existingPets');
const successModal = document.getElementById('successModal');
const closeSuccessModal = document.getElementById('closeSuccessModal');
const orderUsernameSpan = document.getElementById('orderUsername');
const orderTotalSpan = document.getElementById('orderTotal');
const teleportBtn = document.getElementById('teleportBtn');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    loadPets();
    loadCart();
    setupEventListeners();
    checkUsername();
});

// Setup event listeners
function setupEventListeners() {
    setUsernameBtn.addEventListener('click', setUsername);
    changeUsernameBtn.addEventListener('click', changeUsername);
    clearCartBtn.addEventListener('click', clearCart);
    checkoutBtn.addEventListener('click', checkout);
    // Admin panel is now a separate page
    closeAdminModal.addEventListener('click', closeAdminModalFunc);
    closeSuccessModal.addEventListener('click', closeSuccessModalFunc);
    addPetForm.addEventListener('submit', addNewPet);
    teleportBtn.addEventListener('click', teleportToRoblox);
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === adminModal) {
            closeAdminModalFunc();
        }
        if (event.target === successModal) {
            closeSuccessModalFunc();
        }
    });
}

// Username management
function setUsername() {
    const username = usernameInput.value.trim();
    if (username.length < 3) {
        alert('Username must be at least 3 characters long!');
        return;
    }
    
    currentUsername = username;
    localStorage.setItem('robloxUsername', username);
    updateUsernameDisplay();
    usernameInput.value = '';
    updateCartButtons();
    
    // Load Roblox avatar
    loadRobloxAvatar(username);
}

function changeUsername() {
    currentUsername = '';
    localStorage.removeItem('robloxUsername');
    updateUsernameDisplay();
    updateCartButtons();
}

function checkUsername() {
    const savedUsername = localStorage.getItem('robloxUsername');
    if (savedUsername) {
        currentUsername = savedUsername;
        updateUsernameDisplay();
        updateCartButtons();
        
        // Load saved avatar
        loadRobloxAvatar(savedUsername);
    }
}

function updateUsernameDisplay() {
    if (currentUsername) {
        usernameDisplay.classList.remove('hidden');
        currentUsernameSpan.textContent = currentUsername;
    } else {
        usernameDisplay.classList.add('hidden');
    }
}

// Load Roblox avatar
function loadRobloxAvatar(username) {
    const avatarImg = document.getElementById('robloxAvatar');
    const avatarLoading = document.getElementById('avatarLoading');
    
    // Show loading state
    avatarLoading.classList.remove('hidden');
    avatarImg.style.display = 'none';
    
    // Roblox avatar API endpoint
    const avatarUrl = `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${username}&size=150x150&format=Png&isCircular=true`;
    
    fetch(avatarUrl)
        .then(response => response.json())
        .then(data => {
            if (data.data && data.data[0] && data.data[0].imageUrl) {
                avatarImg.src = data.data[0].imageUrl;
                avatarImg.style.display = 'block';
            } else {
                // Fallback to placeholder
                avatarImg.src = `https://via.placeholder.com/60x60?text=${username.charAt(0).toUpperCase()}`;
                avatarImg.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error loading Roblox avatar:', error);
            // Fallback to placeholder
            avatarImg.src = `https://via.placeholder.com/60x60?text=${username.charAt(0).toUpperCase()}`;
            avatarImg.style.display = 'block';
        })
        .finally(() => {
            avatarLoading.classList.add('hidden');
        });
}

// Load and display pets
function loadPets() {
    petsGrid.innerHTML = '';
    
    pets.forEach(pet => {
        const petCard = createPetCard(pet);
        petsGrid.appendChild(petCard);
    });
}

function createPetCard(pet) {
    const card = document.createElement('div');
    card.className = 'pet-card';
    
    card.innerHTML = `
        <img src="${pet.image}" alt="${pet.name}" class="pet-image" onerror="this.src='https://via.placeholder.com/250x200?text=${pet.name}'">
        <h3 class="pet-name">${pet.name}</h3>
        <p class="pet-description">${pet.description}</p>
        <div class="pet-price">${pet.price} Robux</div>
        <button class="add-to-cart-btn" data-pet-id="${pet.id}" ${!currentUsername ? 'disabled' : ''}>
            ${!currentUsername ? 'Set Username First' : 'Add to Cart'}
        </button>
    `;
    
    const addToCartBtn = card.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', () => addToCart(pet));
    
    return card;
}

// Cart management
function addToCart(pet) {
    if (!currentUsername) {
        alert('Please set your username first!');
        return;
    }
    
    const existingItem = cart.find(item => item.id === pet.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...pet,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartDisplay();
    updateCartButtons();
    
    // Show success message
    showNotification(`${pet.name} added to cart!`);
}

function removeFromCart(petId) {
    cart = cart.filter(item => item.id !== petId);
    saveCart();
    updateCartDisplay();
    updateCartButtons();
}

function clearCart() {
    cart = [];
    saveCart();
    updateCartDisplay();
    updateCartButtons();
}

function updateCartDisplay() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotal.textContent = '0';
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name} x${item.quantity}</div>
                <div class="cart-item-price">${item.price * item.quantity} Robux</div>
            </div>
            <button class="remove-item-btn" data-pet-id="${item.id}">Remove</button>
        `;
        
        const removeBtn = cartItem.querySelector('.remove-item-btn');
        removeBtn.addEventListener('click', () => removeFromCart(item.id));
        
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });
    
    cartTotal.textContent = total;
}

function updateCartButtons() {
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartBtns.forEach(btn => {
        if (!currentUsername) {
            btn.disabled = true;
            btn.textContent = 'Set Username First';
        } else {
            btn.disabled = false;
            btn.textContent = 'Add to Cart';
        }
    });
    
    checkoutBtn.disabled = cart.length === 0 || !currentUsername;
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

// Checkout process
function checkout() {
    if (!currentUsername) {
        alert('Please set your username first!');
        return;
    }
    
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Show success modal
    orderUsernameSpan.textContent = currentUsername;
    orderTotalSpan.textContent = total;
    successModal.classList.remove('hidden');
    
    // Clear cart after successful checkout
    cart = [];
    saveCart();
    updateCartDisplay();
    updateCartButtons();
}

// Admin panel functionality
function openAdminModal() {
    adminModal.classList.remove('hidden');
    loadExistingPets();
}

function closeAdminModalFunc() {
    adminModal.classList.add('hidden');
}

function closeSuccessModalFunc() {
    successModal.classList.add('hidden');
}

function addNewPet(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const petName = formData.get('petName') || document.getElementById('petName').value;
    const petPrice = parseInt(formData.get('petPrice') || document.getElementById('petPrice').value);
    const petImage = formData.get('petImage') || document.getElementById('petImage').value;
    const petDescription = formData.get('petDescription') || document.getElementById('petDescription').value;
    
    if (!petName || !petPrice || !petImage || !petDescription) {
        alert('Please fill in all fields!');
        return;
    }
    
    const newPet = {
        id: Date.now(),
        name: petName,
        price: petPrice,
        image: petImage,
        description: petDescription
    };
    
    pets.push(newPet);
    savePets();
    loadPets();
    loadExistingPets();
    
    // Reset form
    event.target.reset();
    
    showNotification('New pet added successfully!');
}

function loadExistingPets() {
    existingPets.innerHTML = '';
    
    pets.forEach(pet => {
        const petItem = document.createElement('div');
        petItem.className = 'existing-pet-item';
        
        petItem.innerHTML = `
            <div class="existing-pet-info">
                <div class="existing-pet-name">${pet.name}</div>
                <div class="existing-pet-price">${pet.price} Robux</div>
            </div>
            <div class="existing-pet-actions">
                <button class="edit-pet-btn" data-pet-id="${pet.id}">Edit</button>
                <button class="delete-pet-btn" data-pet-id="${pet.id}">Delete</button>
            </div>
        `;
        
        const editBtn = petItem.querySelector('.edit-pet-btn');
        const deleteBtn = petItem.querySelector('.delete-pet-btn');
        
        editBtn.addEventListener('click', () => editPet(pet));
        deleteBtn.addEventListener('click', () => deletePet(pet.id));
        
        existingPets.appendChild(petItem);
    });
}

function editPet(pet) {
    const newName = prompt('Enter new name:', pet.name);
    if (newName === null) return;
    
    const newPrice = prompt('Enter new price (Robux):', pet.price);
    if (newPrice === null) return;
    
    const newImage = prompt('Enter new image URL:', pet.image);
    if (newImage === null) return;
    
    const newDescription = prompt('Enter new description:', pet.description);
    if (newDescription === null) return;
    
    pet.name = newName.trim();
    pet.price = parseInt(newPrice) || pet.price;
    pet.image = newImage.trim();
    pet.description = newDescription.trim();
    
    savePets();
    loadPets();
    loadExistingPets();
    
    showNotification('Pet updated successfully!');
}

function deletePet(petId) {
    if (!confirm('Are you sure you want to delete this pet?')) return;
    
    pets = pets.filter(pet => pet.id !== petId);
    savePets();
    loadPets();
    loadExistingPets();
    
    showNotification('Pet deleted successfully!');
}

function savePets() {
    localStorage.setItem('pets', JSON.stringify(pets));
}

function loadPetsFromStorage() {
    const savedPets = localStorage.getItem('pets');
    if (savedPets) {
        pets = JSON.parse(savedPets);
    }
}

// Teleport to Roblox group
function teleportToRoblox() {
    const robloxGroupUrl = 'https://www.roblox.com/share/g/58795671';
    window.open(robloxGroupUrl, '_blank');
    closeSuccessModalFunc();
}

// Utility functions
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Load pets from storage on startup
loadPetsFromStorage();

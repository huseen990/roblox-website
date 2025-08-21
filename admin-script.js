// Firebase Configuration
const firebaseConfig = window.firebaseConfig || {
    // Fallback config - replace with your actual Firebase config
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Admin Panel Variables
let pets = [];
let orders = [];
let currentEditPet = null;
let isAuthenticated = false;

// Secret Access Code (Change this to your secret code)
const SECRET_CODE = "growagarden2024";

// DOM Elements
const secretAccess = document.getElementById('secretAccess');
const adminHeader = document.getElementById('adminHeader');
const adminMain = document.getElementById('adminMain');
const secretCodeInput = document.getElementById('secretCode');
const accessBtn = document.getElementById('accessBtn');
const logoutBtn = document.getElementById('logoutBtn');
const totalPetsSpan = document.getElementById('totalPets');
const totalValueSpan = document.getElementById('totalValue');
const navBtns = document.querySelectorAll('.nav-btn');
const adminSections = document.querySelectorAll('.admin-section');
const addPetBtn = document.getElementById('addPetBtn');
const addPetForm = document.getElementById('addPetForm');
const newPetForm = document.getElementById('newPetForm');
const cancelAddPetBtn = document.getElementById('cancelAddPetBtn');
const adminPetsGrid = document.getElementById('adminPetsGrid');
const editPetModal = document.getElementById('editPetModal');
const closeEditModal = document.getElementById('closeEditModal');
const editPetForm = document.getElementById('editPetForm');
const cancelEditBtn = document.getElementById('cancelEdit');
const deleteModal = document.getElementById('deleteModal');
const closeDeleteModal = document.getElementById('closeDeleteModal');
const cancelDeleteBtn = document.getElementById('cancelDelete');
const confirmDeleteBtn = document.getElementById('confirmDelete');
const deletePetName = document.getElementById('deletePetName');
const refreshOrdersBtn = document.getElementById('refreshOrders');
const ordersList = document.getElementById('ordersList');
const saveSettingsBtn = document.getElementById('saveSettings');

// Initialize Admin Panel
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    checkAuthentication();
});

// Setup Event Listeners
function setupEventListeners() {
    // Secret Access
    accessBtn.addEventListener('click', checkSecretCode);
    secretCodeInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') checkSecretCode();
    });
    
    // Logout
    logoutBtn.addEventListener('click', logout);
    
    // Navigation
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => switchSection(btn.dataset.section));
    });

    // Add Pet
    addPetBtn.addEventListener('click', toggleAddPetForm);
    cancelAddPetBtn.addEventListener('click', toggleAddPetForm);
    newPetForm.addEventListener('submit', handleAddPet);

    // Edit Pet
    closeEditModal.addEventListener('click', closeEditModalFunc);
    cancelEditBtn.addEventListener('click', closeEditModalFunc);
    editPetForm.addEventListener('submit', handleEditPet);

    // Delete Pet
    closeDeleteModal.addEventListener('click', closeDeleteModalFunc);
    cancelDeleteBtn.addEventListener('click', closeDeleteModalFunc);
    confirmDeleteBtn.addEventListener('click', handleDeletePet);

    // Orders
    refreshOrdersBtn.addEventListener('click', refreshOrders);

    // Settings
    saveSettingsBtn.addEventListener('click', saveSettings);

    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === editPetModal) {
            closeEditModalFunc();
        }
        if (event.target === deleteModal) {
            closeDeleteModalFunc();
        }
    });
}

// Authentication Functions
function checkSecretCode() {
    const enteredCode = secretCodeInput.value.trim();
    
    if (enteredCode === SECRET_CODE) {
        authenticate();
    } else {
        showNotification('Invalid secret code!', 'error');
        secretCodeInput.value = '';
        secretCodeInput.focus();
    }
}

function authenticate() {
    isAuthenticated = true;
    localStorage.setItem('adminAuthenticated', 'true');
    
    // Hide secret access, show admin panel
    secretAccess.classList.add('hidden');
    adminHeader.classList.remove('hidden');
    adminMain.classList.remove('hidden');
    
    // Load data
    loadPetsFromFirebase();
    loadOrdersFromFirebase();
    updateStats();
    loadAdminPets();
    
    showNotification('Access granted! Welcome to Admin Panel.', 'success');
}

function logout() {
    isAuthenticated = false;
    localStorage.removeItem('adminAuthenticated');
    
    // Hide admin panel, show secret access
    adminHeader.classList.add('hidden');
    adminMain.classList.add('hidden');
    secretAccess.classList.remove('hidden');
    
    // Clear data
    pets = [];
    orders = [];
    secretCodeInput.value = '';
    
    showNotification('Logged out successfully.', 'info');
}

function checkAuthentication() {
    const savedAuth = localStorage.getItem('adminAuthenticated');
    if (savedAuth === 'true') {
        authenticate();
    }
}

// Navigation Functions
function switchSection(sectionName) {
    // Update navigation buttons
    navBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.section === sectionName) {
            btn.classList.add('active');
        }
    });

    // Show/hide sections
    adminSections.forEach(section => {
        section.classList.remove('active');
        if (section.id === `${sectionName}-section`) {
            section.classList.add('active');
        }
    });

    // Load section-specific content
    switch(sectionName) {
        case 'pets':
            loadAdminPets();
            break;
        case 'orders':
            loadOrders();
            break;
        case 'analytics':
            loadAnalytics();
            break;
        case 'settings':
            loadSettings();
            break;
    }
}

// Add Pet Functions
function toggleAddPetForm() {
    addPetForm.classList.toggle('hidden');
    if (addPetForm.classList.contains('hidden')) {
        newPetForm.reset();
    }
}

function handleAddPet(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const petName = formData.get('petName');
    const petPrice = parseInt(formData.get('petPrice'));
    const petImage = formData.get('petImage');
    const petDescription = formData.get('petDescription');
    
    if (!petName || !petPrice || !petImage || !petDescription) {
        showNotification('Please fill in all fields!', 'error');
        return;
    }
    
    const newPet = {
        id: Date.now().toString(),
        name: petName,
        price: petPrice,
        image: petImage,
        description: petDescription,
        createdAt: new Date().toISOString()
    };
    
    // Save to Firebase
    savePetToFirebase(newPet);
}

// Edit Pet Functions
function openEditPetModal(pet) {
    currentEditPet = pet;
    
    document.getElementById('editPetName').value = pet.name;
    document.getElementById('editPetPrice').value = pet.price;
    document.getElementById('editPetImage').value = pet.image;
    document.getElementById('editPetDescription').value = pet.description;
    
    editPetModal.classList.remove('hidden');
}

function closeEditModalFunc() {
    editPetModal.classList.add('hidden');
    currentEditPet = null;
}

function handleEditPet(event) {
    event.preventDefault();
    
    if (!currentEditPet) return;
    
    const formData = new FormData(event.target);
    const petName = formData.get('petName');
    const petPrice = parseInt(formData.get('petPrice'));
    const petImage = formData.get('petImage');
    const petDescription = formData.get('petDescription');
    
    if (!petName || !petPrice || !petImage || !petDescription) {
        showNotification('Please fill in all fields!', 'error');
        return;
    }
    
    // Update pet
    const updatedPet = {
        ...currentEditPet,
        name: petName,
        price: petPrice,
        image: petImage,
        description: petDescription,
        updatedAt: new Date().toISOString()
    };
    
    updatePetInFirebase(updatedPet);
}

// Delete Pet Functions
function openDeletePetModal(pet) {
    deletePetName.textContent = pet.name;
    currentEditPet = pet;
    deleteModal.classList.remove('hidden');
}

function closeDeleteModalFunc() {
    deleteModal.classList.add('hidden');
    currentEditPet = null;
}

function handleDeletePet() {
    if (!currentEditPet) return;
    
    deletePetFromFirebase(currentEditPet.id);
}

// Load Admin Pets
function loadAdminPets() {
    adminPetsGrid.innerHTML = '';
    
    if (pets.length === 0) {
        adminPetsGrid.innerHTML = `
            <div class="no-data">
                <i class="fas fa-paw"></i>
                <p>No pets available</p>
            </div>
        `;
        return;
    }
    
    pets.forEach(pet => {
        const petCard = createAdminPetCard(pet);
        adminPetsGrid.appendChild(petCard);
    });
}

function createAdminPetCard(pet) {
    const card = document.createElement('div');
    card.className = 'pet-card';
    
    card.innerHTML = `
        <img src="${pet.image}" alt="${pet.name}" class="pet-image" onerror="this.src='https://via.placeholder.com/300x200?text=${pet.name}'">
        <h3 class="pet-name">${pet.name}</h3>
        <p class="pet-description">${pet.description}</p>
        <div class="pet-price">${pet.price} Robux</div>
        <div class="pet-actions">
            <button class="edit-pet-btn" data-pet-id="${pet.id}">
                <i class="fas fa-edit"></i> Edit
            </button>
            <button class="delete-pet-btn" data-pet-id="${pet.id}">
                <i class="fas fa-trash"></i> Delete
            </button>
        </div>
    `;
    
    const editBtn = card.querySelector('.edit-pet-btn');
    const deleteBtn = card.querySelector('.delete-pet-btn');
    
    editBtn.addEventListener('click', () => openEditPetModal(pet));
    deleteBtn.addEventListener('click', () => openDeletePetModal(pet));
    
    return card;
}

// Orders Functions
function loadOrders() {
    ordersList.innerHTML = '';
    
    if (orders.length === 0) {
        ordersList.innerHTML = `
            <div class="no-data">
                <i class="fas fa-shopping-cart"></i>
                <p>No orders yet</p>
            </div>
        `;
        return;
    }
    
    orders.forEach(order => {
        const orderItem = createOrderItem(order);
        ordersList.appendChild(orderItem);
    });
}

function createOrderItem(order) {
    const item = document.createElement('div');
    item.className = 'order-item';
    
    item.innerHTML = `
        <div class="order-info">
            <h4>${order.username}</h4>
            <p>${order.items.length} items</p>
        </div>
        <div class="order-total">${order.total} Robux</div>
    `;
    
    return item;
}

function refreshOrders() {
    loadOrdersFromFirebase();
    showNotification('Orders refreshed!', 'info');
}

// Analytics Functions
function loadAnalytics() {
    loadTopPets();
    loadRevenueChart();
}

function loadTopPets() {
    const topPetsDiv = document.getElementById('topPets');
    
    if (pets.length === 0) {
        topPetsDiv.innerHTML = '<div class="no-data">No pets available</div>';
        return;
    }
    
    // Sort pets by price (highest first)
    const sortedPets = [...pets].sort((a, b) => b.price - a.price).slice(0, 5);
    
    let html = '<div class="top-pets-list">';
    sortedPets.forEach((pet, index) => {
        html += `
            <div class="top-pet-item">
                <span class="rank">#${index + 1}</span>
                <span class="name">${pet.name}</span>
                <span class="price">${pet.price} Robux</span>
            </div>
        `;
    });
    html += '</div>';
    
    topPetsDiv.innerHTML = html;
}

function loadRevenueChart() {
    const revenueChartDiv = document.getElementById('revenueChart');
    
    if (pets.length === 0) {
        revenueChartDiv.innerHTML = '<div class="no-data">No pets available</div>';
        return;
    }
    
    const totalRevenue = pets.reduce((sum, pet) => sum + pet.price, 0);
    const averagePrice = totalRevenue / pets.length;
    
    revenueChartDiv.innerHTML = `
        <div class="revenue-stats">
            <div class="revenue-stat">
                <h4>Total Store Value</h4>
                <span class="stat-value">${totalRevenue} Robux</span>
            </div>
            <div class="revenue-stat">
                <h4>Average Pet Price</h4>
                <span class="stat-value">${Math.round(averagePrice)} Robux</span>
            </div>
            <div class="revenue-stat">
                <h4>Total Pets</h4>
                <span class="stat-value">${pets.length}</span>
            </div>
        </div>
    `;
}

// Settings Functions
function loadSettings() {
    // Settings are already loaded from HTML values
}

function saveSettings() {
    const storeName = document.getElementById('storeName').value;
    const robloxGroupUrl = document.getElementById('robloxGroupUrl').value;
    const currency = document.getElementById('currency').value;
    
    // Save to Firebase
    db.collection('settings').doc('store').set({
        storeName,
        robloxGroupUrl,
        currency,
        updatedAt: new Date().toISOString()
    }).then(() => {
        showNotification('Settings saved successfully!', 'success');
    }).catch(error => {
        showNotification('Error saving settings: ' + error.message, 'error');
    });
}

// Utility Functions
function updateStats() {
    totalPetsSpan.textContent = pets.length;
    const totalValue = pets.reduce((sum, pet) => sum + pet.price, 0);
    totalValueSpan.textContent = totalValue;
}

// Firebase Functions
function loadPetsFromFirebase() {
    db.collection('pets').orderBy('createdAt', 'desc').get()
        .then((querySnapshot) => {
            pets = [];
            querySnapshot.forEach((doc) => {
                pets.push({ id: doc.id, ...doc.data() });
            });
            loadAdminPets();
            updateStats();
        })
        .catch((error) => {
            console.error("Error loading pets: ", error);
            showNotification('Error loading pets from database', 'error');
        });
}

function savePetToFirebase(pet) {
    db.collection('pets').add(pet)
        .then(() => {
            showNotification('New pet added successfully!', 'success');
            toggleAddPetForm();
            loadPetsFromFirebase();
        })
        .catch((error) => {
            showNotification('Error adding pet: ' + error.message, 'error');
        });
}

function updatePetInFirebase(pet) {
    const { id, ...petData } = pet;
    db.collection('pets').doc(id).update(petData)
        .then(() => {
            showNotification('Pet updated successfully!', 'success');
            closeEditModalFunc();
            loadPetsFromFirebase();
        })
        .catch((error) => {
            showNotification('Error updating pet: ' + error.message, 'error');
        });
}

function deletePetFromFirebase(petId) {
    db.collection('pets').doc(petId).delete()
        .then(() => {
            showNotification('Pet deleted successfully!', 'success');
            closeDeleteModalFunc();
            loadPetsFromFirebase();
        })
        .catch((error) => {
            showNotification('Error deleting pet: ' + error.message, 'error');
        });
}

function loadOrdersFromFirebase() {
    db.collection('orders').orderBy('createdAt', 'desc').limit(50).get()
        .then((querySnapshot) => {
            orders = [];
            querySnapshot.forEach((doc) => {
                orders.push({ id: doc.id, ...doc.data() });
            });
            loadOrders();
        })
        .catch((error) => {
            console.error("Error loading orders: ", error);
            showNotification('Error loading orders from database', 'error');
        });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 25px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1001;
        animation: slideIn 0.3s ease;
        color: white;
        font-weight: 600;
        max-width: 300px;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.background = '#28a745';
            break;
        case 'error':
            notification.style.background = '#dc3545';
            break;
        case 'warning':
            notification.style.background = '#ffc107';
            notification.style.color = '#333';
            break;
        default:
            notification.style.background = '#17a2b8';
    }
    
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
